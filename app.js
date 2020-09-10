const express = require('express');
const handlebars = require('express-handlebars');
//const mongoose = require('mongoose');

// configurações
const app = express();

// utilizando json 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//configuração handlebars

// configurando a engine e declarando o layout padrão
app.engine('handlebars', handlebars({ defaultLayout: 'main'})); // define a engine usada e o arquivo main
app.set('view engine', 'handlebars'); // setta a view engine e o outro parâmetro é o hanflebars

//mongoose

const PORT = 8081;

app.listen(PORT, () => {

    console.log('Running port 8081');
})
