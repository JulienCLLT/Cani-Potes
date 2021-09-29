require('dotenv').config();
const cors = require('cors');
const express = require('express');
const route = require('./app/router');
const multer = require('multer');
const upload = multer();

const app = express();

const port = process.env.PORT || 3500;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(upload.array()); 
app.use(express.static('public'));

app.use('/api', route);



app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});

app.use(upload.array()); 
app.use(express.static('public'));

app.post('/api/user', function (req, res) {
    console.log(req.body);
    console.log(req.body.username);
});
