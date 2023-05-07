const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const connection = require("./database/database")
//database
connection.autenticate()
.then(()=>{
    console.log("conecção feita com banco de dados ");
})
.catch(msgErro)=>{
    console.log(msgErro);
}

//Dizendo para o express usar o ejs como view engine
app.set("view engine",'ejs')
app.use(express.static('public'))
//body Parser decodificando os dados da url 
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/',(req, res)=>{
    res.render('index')
})
app.get('/perguntar',(req,res)=>{
    res.render('perguntar')
})

app.post('/salvarFormulario',(req ,res)=>{
    let titulo = req.body.titulo
    let descricao = req.body.descricao
    res.send('formulario recebido! '+ titulo +" "+"descriçao "+descricao)
})
app.listen(3000,() => console.log("Servidor online"))