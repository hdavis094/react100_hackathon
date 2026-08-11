const cors = require('cors');
const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => res.json({ message: 'hello from express' }));

module.exports = app;

