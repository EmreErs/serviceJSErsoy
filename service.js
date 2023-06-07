const express = require('express');
const { MongoClient } = require('mongodb');

const service = express();
const port = 3800;

service.use(express.json());

// POST, Insert dans la base de données
service.post('/insert', async (req, res) => {
  try {
    const client = await MongoClient.connect('mongodb://localhost:27017');
    const db = client.db('tp4');

    const collection = db.collection('tp4');
    const result = await collection.insertOne(req.body);

    client.close();

    res.status(201).json({ message: 'Data inserted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Lancement du serveur
service.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
