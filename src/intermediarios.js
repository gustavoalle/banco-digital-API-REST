const { banco, contas } = require('./bancodedados');


function validaSenha(req, res, next) {
  const { senha_banco } = req.query
  if (!senha_banco) {
    return res.status(401).json("A senha deve ser informada!");
  }
  if (senha_banco !== banco.senha) {
    return res.status(401).json("A senha do banco informada é inválida!");
  }
  next();
}


function validaDados(req, res, next) {
  const dadosConta = req.body
  if (!dadosConta.nome || !dadosConta.cpf || !dadosConta.data_nascimento || !dadosConta.telefone || !dadosConta.email || !dadosConta.senha) {

    return res.status(400).json({ mensagem: "Todos os campos são obrigatórios!" })
  }

  for (let i = 0; i < contas.length; i++) {
    if (dadosConta.cpf === contas[i].usuario.cpf || dadosConta.email === contas[i].usuario.email) {
      return res.status(400).json({ mensagem: "Já existe uma conta com o cpf ou e-mail informado!" });
    }
  }
  next();
}


function validaNumero(req, res, next) {
  const { numeroConta } = req.params
  const contaVerificar = contas.find(conta => conta.numero === numeroConta)

  if (contaVerificar === undefined) {
    return res.status(404).json({ mensagem: "Numero não encontrado!" })
  }
  next();
}


function validaSaldo(req, res, next) {
  const { numeroConta } = req.params
  const contaVerificar = contas.find(conta => conta.numero === numeroConta)
  if (contaVerificar.saldo > 0) {
    return res.status(403).json({ mensagem: "A conta só pode ser removida se o saldo for zero!" })
  }
  next();
}


function validaDeposito(req, res, next) {
  const { numero_conta, valor } = req.body
  let contaDeposito = contas.find(conta => conta.numero === numero_conta);

  if (!numero_conta || !valor) {
    return res.status(400).json({ mensagem: "O número da conta e o valor são obrigatórios" });
  }

  if (contaDeposito === undefined) {
    return res.status(404).json({ mensagem: "Numero não encontrado!" })
  }

  if (valor <= 0) {
    return res.status(400).json({ mensagem: "O valor do deposito deve ser maior que 0!" })
  }
  next();

}


function validaSaque(req, res, next) {
  const { numero_conta, valor, senha } = req.body
  let contaSaque = contas.find(conta => conta.numero === numero_conta);

  if (!numero_conta || !valor || !senha) {
    return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
  }

  if (contaSaque === undefined) {
    return res.status(404).json({ mensagem: "Numero não encontrado!" })
  }

  if (senha !== contaSaque.usuario.senha) {
    return res.status(401).json({ mensagem: "Senha incorreta!" })
  }

  if (valor <= 0) {
    return res.status(400).json({ mensagem: "O valor do deposito deve ser maior que 0!" })
  }

  if (contaSaque.saldo < valor) {
    return res.status(403).json({ mensagem: "Saldo indisponível!" })
  }
  next();
}


function validaTransferencia(req, res, next) {
  const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body

  const contaOrigem = contas.find(conta => conta.numero === numero_conta_origem);
  const contaDestino = contas.find(conta => conta.numero === numero_conta_destino);

  if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
    return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
  }

  if (contaOrigem === undefined) {
    return res.status(404).json({ mensagem: "Conta de origem não encontrada!" })
  }

  if (contaDestino === undefined) {
    return res.status(404).json({ mensagem: "Conta de destino não encontrada!" })
  }

  if (senha !== contaOrigem.usuario.senha) {
    return res.status(401).json({ mensagem: "Senha incorreta!" })
  }

  if (valor <= 0) {
    return res.status(400).json({ mensagem: "O valor da transferencia deve ser maior que 0!" })
  }

  if (contaOrigem.saldo < valor) {
    return res.status(403).json({ mensagem: "Saldo insuficiente!" })
  }
  next();
}

function validaExibicaoSaldo(req, res, next) {
  const { numero_conta, senha } = req.query;
  const conta = contas.find(conta => conta.numero === (numero_conta));

  if (!numero_conta || !senha) {
    return res.status(400).json({ mensagem: "Todos os campos são obrigatórios" });
  }
  if (conta === undefined) {
    return res.status(404).json({ mensagem: "Conta de origem não encontrada!" })
  }
  if (senha !== conta.usuario.senha) {
    return res.status(401).json("Senha inválida!");
  }

  next();
}



module.exports = {
  validaSenha,
  validaDados,
  validaNumero,
  validaSaldo,
  validaDeposito,
  validaSaque,
  validaTransferencia,
  validaExibicaoSaldo
}