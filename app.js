const express = require('express');
const quotes_api = express();

const port = 8080;

quotes_api.get('/', function(req, res) {
    res.send('Hello World!');
});

quotes_api.listen(port, () => 
    console.log(`Quotes API listening on port ${port}...`));