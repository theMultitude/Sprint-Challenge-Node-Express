const express    = require('express')
const bodyParser = require('body-parser');
const fetch      = require('node-fetch');

const app = express();

const PORT       = 8080;
const QUERY_HOY = 'https://api.coindesk.com/v1/bpi/currentprice.json';
const QUERY_AYER  = 'https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday';

let HOY = {};
let AYER = {};
let HOY_PRICE = ''
let AYER_PRICE = ''

app.use(bodyParser.json());

fetch(QUERY_HOY)
    .then(res => res.json())
    .then(json => HOY = json);
    

fetch(QUERY_AYER)
    .then(res => res.json())
    .then(json => AYER = json);


app.get('/hoy', (req, res) => {
    let HOY_PRICE = HOY.bpi.USD.rate;
    res.json(HOY_PRICE);
});

app.get('/ayer', (req, res) => {
    let AYER_PRICE = AYER.bpi["2018-02-15"]
    res.json(AYER_PRICE);
});

app.get('/difference', (req, res) => {
    difference = (parseInt(HOY_PRICE) - parseInt(AYER_PRICE));
    res.json(difference)
});



app.listen(PORT, err => {
    if (err) {
        console.log(`Error starting server at port: ${PORT}`);
    } else {
        console.log(`Server is running on port ${PORT}`);
    }
});

