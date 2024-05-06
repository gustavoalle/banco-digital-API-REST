let { contas, depositos, saques, transferencias } = require("../bancodedados");

function depositar(req, res) {
  const { numero_conta, valor } = req.body
  let contaDeposito = contas.find(conta => conta.numero === numero_conta);
  contaDeposito.saldo += Number(valor);
  const registro = {
    "data": new Date().toString(),
    "numero_conta": numero_conta,
    "valor": valor
  }
  depositos.push(registro);
  return res.status(204).json();
}


function sacar(req, res) {
  let { numero_conta, valor, senha } = req.body
  let contaSaque = contas.find(conta => conta.numero === numero_conta);
  contaSaque.saldo -= Number(valor);
  const registro = {
    "data": new Date().toString(),
    "numero_conta": numero_conta,
    "valor": valor
  }
  saques.push(registro);
  return res.status(204).json();
}


function transferir(req, res) {
  const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body
  const contaOrigem = contas.find(conta => conta.numero === numero_conta_origem);
  const contaDestino = contas.find(conta => conta.numero === numero_conta_destino);
  contaOrigem.saldo -= Number(valor);
  contaDestino.saldo += Number(valor);

  /*const registro = {
    "data": new Date().toString(),
    "numero_conta_origem": numero_conta_origem,
    "numero_conta_destino": numero_conta_destino,
    "valor": valor
  }
  transferencias.push(registro);*/

  const registroEnvio = {
    "data": new Date().toString(),
    "numero_conta_origem": numero_conta_origem,
    "numero_conta_destino": numero_conta_destino,
    "valor": valor
  }

  const registroRecebido = {
    "data": new Date().toString(),
    "numero_conta_origem": numero_conta_origem,
    "numero_conta_destino": numero_conta_destino,
    "valor": valor
  }
  transferencias.push(registroEnvio)
  transferencias.push(registroRecebido)


  return res.status(204).json();
}

function consultaSaldo(req, res) {
  const { numero_conta, senha } = req.query;
  const conta = contas.find(conta => conta.numero === (numero_conta));
  const saldo = conta.saldo

  return res.status(200).json({ message: "Saldo:", saldo });

}

function consultaExtrato(req, res) {
  const { numero_conta, senha } = req.query;
  const depositosConta = depositos.find(deposito => deposito.numero_conta === (numero_conta));
  const saquesConta = saques.find(saque => saque.numero_conta === (numero_conta));
  const enviosConta = transferencias.filter(transferencia => transferencia.numero_conta_origem === numero_conta)
  const recebidosConta = transferencias.filter(transferencia => transferencia.numero_conta_destino === numero_conta)

  const extrato = {
    depositos: depositosConta,
    saques: saquesConta,
    transferenciasEnviadas: enviosConta,
    TransferenciasRecebidas: recebidosConta,

  }

  return res.status(200).json(extrato);

}


module.exports = {
  depositar,
  sacar,
  transferir,
  consultaSaldo,
  consultaExtrato,

}