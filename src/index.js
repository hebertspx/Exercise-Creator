require('dotenv').config()
var express = require('express');
const { userRouter } = require('./module/users/users.controller');
var app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.json({ data: "Servidor Online!" })
})

app.use('/users', userRouter)

app.listen(3000, function () {
    console.log('Serviço liberado na porta 3000!');
});