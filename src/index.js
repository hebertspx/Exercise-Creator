require('dotenv').config()
var express = require('express');
var app = express();
const { userRouter } = require('./module/users/users.controller');
const cors = require('cors')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', function (_req, res) {
    res.json({ data: "Servidor Online!" })
})

app.use('/users', userRouter)

app.listen(3000, function () {
    console.log('Serviço liberado na porta 3000!');
});
