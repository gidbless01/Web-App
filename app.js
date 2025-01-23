const express = require('express');

const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Simple in-memory data store
let items = [];

// Create a new item (POST)
app.post('/items', (req, res) => {
    const newItem = { id: items.length + 1, name: req.body.name };
    items.push(newItem);
    res.status(201).json(newItem);
});

// Get all items (GET)
app.get('/items', (req, res) => {
    res.json(items);
});

// Get a specific item (GET)
app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id == req.params.id);
    if (item) {
        res.json(item);
    } else {
        res.status(404).send('Item not found');
    }
});

// Update an item (PUT)
app.put('/items/:id', (req, res) => {
    const item = items.find(i => i.id == req.params.id);
    if (item) {
        item.name = req.body.name;
        res.json(item);
    } else {
        res.status(404).send('Item not found');
    }
});

// Delete an item (DELETE)
app.delete('/items/:id', (req, res) => {
    const itemIndex = items.findIndex(i => i.id == req.params.id);
    if (itemIndex != -1) {
        items.splice(itemIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Item not found');
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});