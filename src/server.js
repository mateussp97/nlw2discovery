/*
    Pra trazer uma dependência de algum outro projeto é necessário utilizar o require('nomeDoarquivo')
    express é uma função

    require('express')()
    .get("/", (req, res) => {
        return res.send("Hi from NLW")
    })

    (requisição, resposta) => {} == function(requisição, resposta){} == ambas são funções

    .get("/", (req, res) => {
        return res.send("Página study")
    })
    .listen(5500)
*/

//Servidor
const express = require('express')
const server = express()
const {pageLanding, pageStudy, pageGiveClasses, saveClasses} = require('./pages')

//Configurar nunjucks (Template Engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true, //Desativa a opção de guardar em memória
})

//Inicio e configuração do servidor
server
//Receber os dados do req.body
.use(express.urlencoded({ extended: true}))
//Configurar arquivos estáticos (css, scripts, imagens)
.use(express.static("public"))
//Rotas da aplicação
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)
//Start do servidor
.listen(3000)