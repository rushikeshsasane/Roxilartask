const express = require('express');
const axios = require('axios');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3005;

app.use(cors());

app.get('/products', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;

    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const products = response.data;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const result = products.slice(startIndex, endIndex);

        res.json({
            page,
            limit,
            total: products.length,
            totalPages: Math.ceil(products.length / limit),
            data: result
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from API' });
    }
});

//2nd part statict transtion

app.get('/api/sales/:month', async (req, res) => {
    try {
        const month = req.params.month;
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const data = response.data;

        const filteredData = data.filter(item => new Date(item.dateOfSale).getMonth() + 1 == month);

        const totalSales = filteredData.reduce((sum, item) => sum + (item.sold ? item.price : 0), 0);
        const totalSoldItems = filteredData.filter(item => item.sold).length;
        const totalUnsoldItems = filteredData.filter(item => !item.sold).length;

        res.json({
            totalSales,
            totalSoldItems,
            totalUnsoldItems
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});