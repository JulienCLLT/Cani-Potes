require('dotenv').config();
const cors = require('cors');
const express = require('express');
const route = require('./app/router');
const multer = require('./app/middlewares/multerConfig');

const app = express();

const port = process.env.PORT || 3500;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use('/api', route);

app.post('/', multer, (req,res) => {
    console.log("ok");
    const file = req.file;
    console.log("file", file);
    res.json("yy")
})

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});


