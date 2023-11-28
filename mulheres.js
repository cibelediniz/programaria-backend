const express = require("express")
const router = express.Router()

const app = express()
const porta = 3333

const mulheres = [
  {
    nome: 'Simara Conceição',
    imagem: 'https://www.github.com/simaraconceicao.png',
    minibio: 'Desenvolvedora e instrutora'
  },

  {
    nome: 'Iana Chan',
    imagem: 'https://media.licdn.com/dms/image/D4D03AQH94QQ7TrKasQ/profile-displayphoto-shrink_400_400/0/1686007268307?e=1706140800&v=beta&t=6GOQqnc0DQh9lU5C3bbBXKx5QIsibWInD3K01M4zUGs',
    minibio: 'Fundadora da PrograMaria'
  },

  {
    nome: 'Nina da Hora',
    imagem: 'https://conteudo.imguol.com.br/c/noticias/47/2020/07/12/ana-carolina-da-hora-hackear-o-racismo-1594591816588_v2_1x1.jpg',
    minibio: 'Hacker antirracista'
  }
]

function mostraMulheres(request, response) {
  response.json(mulheres)
}

function mostraPorta() {
  console.log("Servidor criado e rodando na porta ", porta)
}

app.use(router.get('/mulheres', mostraMulheres))
app.listen(porta, mostraPorta)