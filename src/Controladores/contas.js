let { contas } = require("../bancodedados");

function listarContas(req, res) {
  const qtdcontas = contas.length
  return res.status(200).json({ mensagem: `${qtdcontas} contas encontrada(s)!`, contas })
}


function criarConta(req, res) {
  const ultimoNumero = contas.length + 1;
  const dadosConta = req.body
  const novaConta = {
    numero: ultimoNumero.toString(),
    saldo: 0,
    usuario: {
      nome: dadosConta.nome,
      cpf: dadosConta.cpf,
      data_nascimento: dadosConta.data_nascimento,
      telefone: dadosConta.telefone,
      email: dadosConta.email,
      senha: dadosConta.senha
    }
  }
  contas.push(novaConta)
  return res.status(201).json(novaConta)
}


function atualizarConta(req, res) {
  const { numeroConta } = req.params;
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body
  let contaDaAtualizacao = contas.find(conta => conta.numero === (numeroConta));
  contaDaAtualizacao.usuario.nome = nome;
  contaDaAtualizacao.usuario.cpf = cpf;
  contaDaAtualizacao.usuario.data_nascimento = data_nascimento;
  contaDaAtualizacao.usuario.telefone = telefone;
  contaDaAtualizacao.usuario.email = email;
  contaDaAtualizacao.usuario.senha = senha;
  return res.status(201).json();
}


function deletaConta(req, res) {
  const { numeroConta } = req.params
  const contaExclusao = contas.find(conta => conta.numero === numeroConta);
  const i = contas.indexOf(contaExclusao);
  contas.splice(i, 1);
  return res.status(204).json();
}


module.exports = {
  listarContas,
  criarConta,
  atualizarConta,
  deletaConta,
}