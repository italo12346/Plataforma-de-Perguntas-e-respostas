const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const connection = require("./database/database")
const Pergunta = require("./database/Pergunta")
const Resposta = require("./database/Resposta")
//database
connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados!")
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

//Dizendo para o express usar o ejs como view engine
app.set("view engine", 'ejs')
app.use(express.static('public'))
//body Parser decodificando os dados da url 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    Pergunta.findAll({
        raw: true, order: [
            ['id', 'DESC']
        ]
    }).then(perguntas => {
        res.render('index', {
            perguntas: perguntas
        });
    })

})
app.get('/perguntar', (req, res) => {
    res.render('perguntar')
})
app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: { id: id }
    }).then(pergunta => {
        if (pergunta != undefined) { // Pergunta encontrada

            Resposta.findAll({
                where: { perguntaId: pergunta.id },
                order: [
                    ['id', 'DESC']
                ]
            }).then(respostas => {
                res.render("pergunta", {
                    pergunta: pergunta,
                    respostas:respostas

                });
            });

        } else { // Não encontrada
            res.redirect("/");
        }
    });
})


app.post('/salvarFormulario', (req, res) => {
    let titulo = req.body.titulo
    let descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {  //Recebe o valor da promessa e continua a operação  
        res.redirect('/')
    })
})

app.post('/responder', (req, res) => {
    let corpo = req.body.corpo
    let perguntaId = req.body.perguntaId
    Resposta.create({ // insere dados na tabela
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect('/pergunta/' + perguntaId)
    })
})
app.listen(3000, () => console.log("Servidor online"))