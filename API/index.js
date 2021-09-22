require('dotenv').config();
const express = require('express');
const route = require('./app/router');

const app = express();

const port = process.env.PORT || 3500;

//app.use(express.json());
app.use(express.urlencoded());

app.use(route);



app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});