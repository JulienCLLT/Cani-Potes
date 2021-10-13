require('dotenv').config();
const cors = require('cors');
const express = require('express');
const route = require('./app/router');
const cookieParser = require('cookie-parser');
const { bcrypt, jwt, apiGeo, sharpResizeImage } = require('./app/services');
const checkToken = require('./app/middlewares/checkJwt')

const app = express();

const port = process.env.PORT || 3500;

app.use(cors({
  'Access-Control-Allow-Origin': '*',
}));

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/test', (req, res) => {
  const token = jwt.signToken({ id: 1 });
  res.cookie('token', token, { httpOnly: true }).end();

});

app.use('/token', checkToken, (req, res) => {
  res.send('le checkToken marche').end();

});

app.use('/api', route);



app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});