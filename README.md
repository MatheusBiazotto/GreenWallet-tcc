# Green Wallet

O GreenWallet é uma plataforma de gestão financeira feita para aqueles que querem economizar seu dinheiro. A plataforma possui diversas funcionalidades como registro de gastos/lucros mensais, cotação de moedas, histórico de gastos, dentre outras.
Foi feito utilizando React em seu front-end e back-end, juntamente com uma API em Python utilizando Flask, a qual fica responsável por todo o banco de dados em MySQL.

![Index do projeto](https://i.imgur.com/RaYaWBf_d.webp?maxwidth=760&fidelity=grand)

# Como instalar/rodar
> Obs.: Note que para que este projeto funcione, você deverá também
> fazer o download da API, que pode ser encontrada no repositório
> "GreenWallet-API" ou [clicando
> aqui](https://github.com/MatheusBiazotto/GreenWallet-API).

1. Faça o download do projeto, extraia os arquivos em uma pasta. Abra o powershell dentro dessa pasta, e digite o comando ````npm install```` para que sejam instaladas todas as dependências do projeto.
2. Vá para a pasta "src", depois "services" e então abra o arquivo "api.js" e edite a variável "endpoint", colocando o endereço IP da API e salvando.
3. Após, para executar, basta voltar ao powershell e digitar ````npm start```` para que inicie o servidor local.

> *Obs².: Lembre-se que para o funcionamento do projeto, sua máquina deverá ter tanto o Node instalado quanto o MySQL.
