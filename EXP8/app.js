
const express = require('express');

const app = express();
const PORT = 3000;

// Middleware for JSON data
app.use(express.json());

// Sample item data
let items = [
    { id: 101, name: 'Sports Bike', stock: 12 },
    { id: 102, name: 'Mountain Bike', stock: 5 }
];

// Home page
app.get('/', (req, res) => {
    res.send(`
        <html>
        <head>
            <title>SpeedX Bike Showroom</title>
        </head>
        <body>
            <h1>SpeedX Bike Showroom</h1>
            <h3>Express Server is Active</h3>
            <p>Welcome to SpeedX Bike Showroom.</p>
            <a href="/api/items">View Bike Inventory</a>
        </body>
        </html>
    `);
});

// Get all items
app.get('/api/items', (req, res) => {
    res.status(200).json({
        success: true,
        data: items
    });
});

// Add a new item
app.post('/api/items', (req, res) => {

    const { name, stock } = req.body;

    if (!name || stock === undefined) {
        return res.status(400).json({
            success: false,
            message: 'Please provide item name and stock.'
        });
    }

    const newItem = {
        id: items.length + 101,
        name: name,
        stock: Number(stock)
    };

    items.push(newItem);

    res.status(201).json({
        success: true,
        data: newItem
    });
});

// Handle invalid routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint Not Found'
    });
});

// Start server
app.listen(PORT, () => {
    console.log('Express server running at http://localhost:' + PORT);
});
