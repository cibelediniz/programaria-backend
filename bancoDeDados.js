const mongoose = require('mongoose')

async function conectaBancoDeDados() {
  try {
    console.log('Conexão com o banco de dados iniciou...')

    await mongoose.connect('mongodb+srv://cibelerbdiniz:m4rm0taa@clustermulheres.ul8bgz9.mongodb.net/?retryWrites=true&w=majority')
    
    console.log('Conexão com o banco de dados feita com sucesso!')
  } catch(erro) {
    console.log(erro)
  }
}

module.exports = conectaBancoDeDados