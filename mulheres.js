const express = require("express") // iniciando express
const router = express.Router() //config primeira parte da rota
const cors = require('cors') //trazendo pacote cors


const conectaBancoDeDados = require('./bancoDeDados') //ligando ao arquivo bancoDeDados
conectaBancoDeDados() //chamando funcao para conectar banco

const Mulher = require('./mulherModel')

const app = express() //iniciando o app
app.use(express.json()) 
app.use(cors())

const porta = 3333 //definindo a porta

//GET 
async function mostraMulheres(request, response) {
  try {
      const mulheresVindasDoBancoDeDados = await Mulher.find()

      response.json(mulheresVindasDoBancoDeDados)
  }catch (erro) {
    console.log(erro)
  }
}

//POST
async function criaMulher(request, response) {
  const novaMulher = new Mulher({
    nome: request.body.nome,
    imagem: request.body.imagem,
    minibio: request.body.minibio,
    citacao: request.body.citacao,
  })

  try {
      const mulherCriada = await novaMulher.save()
      response.status(201).json(mulherCriada)
  } catch (erro) {
      console.log(erro)
  }
}

// PATCH (corrigir)
async function corrigeMulher(request, response) {
  try {
    const mulherEncontrada = await Mulher.findById(request.params.id)

    if (request.body.nome) {
      mulherEncontrada.nome = request.body.nome;
    }

    if (request.body.minibio) {
      mulherEncontrada.minibio = request.body.minibio;
    }

    if (request.body.imagem) {
      mulherEncontrada.imagem = request.body.imagem;
    }

    if (request.body.citacao) {
      mulherEncontrada = request.body.citacao
    }

    const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()
    
    response.json(mulherAtualizadaNoBancoDeDados);
  } catch (erro) {
      console.log(erro)
  }
}

// DELETE
async function deletaMulher(request, response) {
  try {
      await Mulher.findByIdAndDelete(request.params.id)
      response.json({ mensagem: 'Mulher deletada com sucesso!'})
  } catch(erro) {
    console.log(erro)
  }
}

// Correção na chamada das funções no uso do roteador
router.get('/mulheres', mostraMulheres);
router.post('/mulheres', criaMulher);
router.patch('/mulheres/:id', corrigeMulher);
router.delete('/mulheres/:id', deletaMulher);

app.use(router);

//PORTA
function mostraPorta() {
  console.log("Servidor criado e rodando na porta", porta);
}

app.listen(porta, mostraPorta); //ouvindo porta