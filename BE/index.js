const express = require("express");
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require("morgan");
const helmet = require('helmet');
const { response } = require('./src/helper/common');
const app = express();
const mainRouter = require('./src/routes/index');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
const port = process.env.PORT;
app.use('/', mainRouter);
app.use(bodyParser.json());

app.all('*', (req, res, next) => {
    response(res, 404, false, null, '404 Not Found');
  });
 
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });