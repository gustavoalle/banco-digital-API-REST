const express = require('express');
const rotas = express();

const { listarContas, criarConta, atualizarConta, deletaConta } = require('./Controladores/contas');
const { depositar, sacar, transferir, consultaSaldo, consultaExtrato } = require('./Controladores/operacoes');
const { validaSenha, validaDados, validaNumero, validaSaldo, validaDeposito, validaSaque, validaTransferencia, validaExibicaoSaldo } = require('./intermediarios');


rotas.get('/contas', validaSenha, listarContas);
rotas.post('/contas', validaDados, criarConta);
rotas.put('/contas/:numeroConta/usuario', validaNumero, validaDados, atualizarConta);
rotas.delete('/contas/:numeroConta', validaNumero, validaSaldo, deletaConta);
rotas.post('/transacoes/depositar', validaDeposito, depositar);
rotas.post('/transacoes/sacar', validaSaque, sacar);
rotas.post('/transacoes/transferir', validaTransferencia, transferir);
rotas.get('/contas/saldo', validaExibicaoSaldo, consultaSaldo);
rotas.get('/contas/extrato', validaExibicaoSaldo, consultaExtrato)



module.exports = rotas;

