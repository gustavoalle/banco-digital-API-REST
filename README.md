# API de Banco Digital

 Este projeto foi desenvolvido como cumprimento do trabalho de conclusão do módulo 2 da Cubos Academy, onde conferimos aprendizado em backend com o desenvolvimento de API's REST.

## Como Usar

### Clone este repositório:
git clone https://github.com/gustavoalle/banco-digital-API-REST

### Instale as dependências com NPM

Express,
Nodemon

### Utilize os endpoints no Insomnia, HTTPie ou outro de sua preferência

- Listar Contas Bancárias: GET /contas?senha_banco=<senha_do_banco>
- Criar Conta Bancária: POST /contas
- Atualizar Dados do Usuário da Conta Bancária: PUT /contas/:numeroConta/usuario
- Excluir Conta Bancária: DELETE /contas/:numeroConta
- Depositar: POST /transacoes/depositar
- Sacar: POST /transacoes/sacar
- Transferir: POST /transacoes/transferir
- Saldo: GET /contas/saldo?numero_conta=<numero_conta>&senha=
- Extrato: GET /contas/extrato?numero_conta=<numero_conta>&senha=

## Persistência de Dados

Os dados são armazenados em memória, utilizando objetos no arquivo bancodedados.js. Todas as contas bancárias e transações são registradas nos objetos desse arquivo.

## Enunciado do Trabalho

Descrição completa do que foi solicitado para este trabalho, em pdf:
https://bit.ly/descricao-api-rest

