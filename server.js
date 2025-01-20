const express = require('express');
const app = express();
const port = 3000;
const productRoutes = require('./routes/products');
const db = require('./database');

app.use(express.json());
app.use('/api', productRoutes);

app.get('/', (req, res) => {
    res.send('Mi primera web Node.js (PRUEBA)');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
