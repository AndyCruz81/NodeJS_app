const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/products', (req, res) => {
    db.all('SELECT * FROM Products', [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
});

router.get('/products/:id', (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM Products WHERE id = ?', [id], (err, row) => {
        if (err) {
            throw err;
        }
        res.json(row);
    });
});

router.post('/products', (req, res) => {
    const { name, description, price, image } = req.body;
    db.run('INSERT INTO Products (name, description, price, image) VALUES (?, ?, ?, ?)', [name, description, price, image], function(err) {
        if (err) {
            throw err;
        }
        res.json({ id: this.lastID });
    });
});

router.put('/products/:id', (req, res) => {
    const { name, description, price, image } = req.body;
    const id = req.params.id;
    db.run('UPDATE Products SET name = ?, description = ?, price = ?, image = ? WHERE id = ?', [name, description, price, image, id], function(err) {
        if (err) {
            throw err;
        }
        res.json({ changes: this.changes });
    });
});

router.delete('/products/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM Products WHERE id = ?', [id], function(err) {
        if (err) {
            throw err;
        }
        res.json({ changes: this.changes });
    });
});

module.exports = router;
