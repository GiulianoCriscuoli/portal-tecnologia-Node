const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const admin = require("./routes/admin");
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');

// configurações
const app = express();

// sessao

app.use(session({
    secret: 'chidori@450',
    resave: true,
    saveUninitialized: true
}));

// flash

app.use(flash());

// middleware

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error=  req.flash("error");

    next();

});

// utilizando json 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//configuração handlebars

// configurando a engine e declarando o layout padrão
app.engine('handlebars', handlebars({ defaultLayout: 'main'})); // define a engine usada e o arquivo main
app.set('view engine', 'handlebars'); // setta a view engine e o outro parâmetro é o hanflebars

//mongoose
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/system_technology").then(() => {
    console.log("Conectado");

}).catch(err => {
    console.log("Erro ao conectar: ", err);
});

// public 

app.use(express.static(path.join(__dirname, "public")));

// rotas

app.use('/admin', admin);

const PORT = 8081;

app.listen(PORT, () => {

    console.log('Running port 8081');
})
