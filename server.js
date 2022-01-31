const express = require('express');
const bodyParser = require('body-parser');

var app = express();

require('./database/dbConnection');
const {user, business, product} = require('./routes/index');

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(user);
app.use(business);
app.use(product);

var port = process.env.PORT || 3000;

app.listen(port,() => {
    console.log(`server is upon ${port}`);
})