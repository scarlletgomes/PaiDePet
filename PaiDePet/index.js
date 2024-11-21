const express = require('express');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const db = require('./db');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
    res.render('index.html');
});

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '/public')));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(session({  
    secret: 'secrect-token',
    name: 'sessionId',
    resave: false,
    saveUninitialized: false
}));

const usuarioRouter = require('./routers/usuarioRouter');
const autenticacaoRouter = require('./routers/autenticacaoRouter');
const enderecoRouter = require('./routers/enderecoRouter');
app.use('/', usuarioRouter);
app.use('/', autenticacaoRouter);
app.use('/', enderecoRouter);

db.sync();

const PORT = 8080;
app.listen(PORT, ()=>{
    console.log('app rodando na porta ' + PORT);
});
