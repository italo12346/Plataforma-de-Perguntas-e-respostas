const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const connection = require("./database/database")
const Pergunta = require("./database/Pergunta")
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

            // Resposta.findAll({
            //     where: { perguntaId: pergunta.id },
            //     order: [
            //         ['id', 'DESC']
            //     ]
            // }).then(respostas => {
                res.render("pergunta", {
                    pergunta: pergunta
                    
                });
            // });

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
    }).then(() => {
        res.redirect('/')
    })
})
app.listen(3000, () => console.log("Servidor online"))