const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Qualquer pessoa que fizer um request ta liberado :)
app.use(cors({
  origin: "*"
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// importando todos os controllers da pasta
require('./controllers/index')(app);

// definindo a porta do localhost
app.listen(3000);
