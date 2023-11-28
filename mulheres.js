const express = require("express") // iniciando express
const router = express.Router() //config primeira parte da rota
const { v4: uuidv4 } = require('uuid') //biblioteca Universal Unique Identifier

const app = express() //iniciando o app
app.use(express.json()) 
const porta = 3333 //definindo a porta

//lista inicial de mulheres
const mulheres = [
  {
    id: '1',
    nome: 'Simara Conceição',
    imagem: 'https://www.github.com/simaraconceicao.png',
    minibio: 'Desenvolvedora e instrutora'
  },

  {
    id: '2',
    nome: 'Iana Chan',
    imagem: 'https://media.licdn.com/dms/image/D4D03AQH94QQ7TrKasQ/profile-displayphoto-shrink_400_400/0/1686007268307?e=1706140800&v=beta&t=6GOQqnc0DQh9lU5C3bbBXKx5QIsibWInD3K01M4zUGs',
    minibio: 'Fundadora da PrograMaria'
  },

  {
    id: '3',
    nome: 'Nina da Hora',
    imagem: 'https://conteudo.imguol.com.br/c/noticias/47/2020/07/12/ana-carolina-da-hora-hackear-o-racismo-1594591816588_v2_1x1.jpg',
    minibio: 'Hacker antirracista'
  }
]

//GET 
function mostraMulheres(request, response) {
  response.json(mulheres)
}

//POST
function criaMulher(request, response) {
  const novaMulher = {
    id: uuidv4(),
    nome: request.body.nome,
    imagem: request.body.imagem,
    minibio: request.body.minibio
  };

  mulheres.push(novaMulher);

  response.json(mulheres);
}

//Encontrar mulher por ID
function encontraMulher(request, mulher) {
  return mulher.id === request.params.id;
}

// PATCH (corrigir)
function corrigeMulher(request, response) {
  const mulherEncontrada = mulheres.find(mulher => encontraMulher(request, mulher));

  if (mulherEncontrada) {
    if (request.body.nome) {
      mulherEncontrada.nome = request.body.nome;
    }

    if (request.body.minibio) {
      mulherEncontrada.minibio = request.body.minibio;
    }

    if (request.body.imagem) {
      mulherEncontrada.imagem = request.body.imagem;
    }

    response.json(mulheres);
  } else {
    response.status(404).json({ mensagem: 'Mulher não encontrada' });
  }
}

// Correção na chamada das funções no uso do roteador
router.get('/mulheres', mostraMulheres);
router.post('/mulheres', criaMulher);
router.patch('/mulheres/:id', corrigeMulher);

app.use(router);

//PORTA
function mostraPorta() {
  console.log("Servidor criado e rodando na porta", porta);
}

app.listen(porta, mostraPorta); //ouvindo porta