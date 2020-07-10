<h1 align="center">Chat LUIS</h1>
<p align="center">	
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/vhugoc/chat-luis">
	
  <a href="https://www.linkedin.com/in/vhugoc/">
    <img alt="Made by Victor Hugo" src="https://img.shields.io/badge/made%20by-Victor Hugo-%2304D361">
  </a>
  
  <a href="https://github.com/vhugoc/chat-luis/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/vhugoc/chat-luis">
  </a>
</p>

## 💻 O Projeto

O projeto está sendo desenvolvido para efetuar pedidos por algum canal de mensagens. Integrando a inteligência artificial do [LUIS](https://www.luis.ai/), da Microsoft, para identificar a intenção de cada mensagem, de acordo com a necessidade dos clientes.
Não há respostas reais, o retorno é apenas o nome da intenção registrada no LUIS. Além disso, a aplicação não está configurada para ser executada com multiusuários.

<h1 align="center">
    <img alt="Example" title="Exemplo" src="https://i.ibb.co/0jhY5Zs/chat-luis.png" />
</h1>


## :rocket: Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- [Node.js][nodejs]
- [React][reactjs]
- [MongoDB][mongodb]


## :information_source: Como Utilizar

Para clonar e executar a aplicação, você vai precisar do [Git](https://git-scm.com) e [Node.js][nodejs] instalados em sua máquina.

Na linha de comando:

### Instalação da API

```bashes
# Clonar o repositório
$ git clone https://github.com/vhugoc/chat-luis

# Entrar no repositório
$ cd chat-luis/api

# Instalar as dependências
$ npm install

# Inicializar o servidor
$ npm start

# running on port 3030
```

### Instalação do front-end

```bash
# Clonar o repositório (caso não tenha clonado anteriormente)
$ git clone https://github.com/vhugoc/chat-luis

# Entrar no repositório
$ cd chat-luis/public

# Instalar as dependências
$ npm install

# Iniciar o Reactjs
$ npm start

# running on port 3000
```

[nodejs]: https://nodejs.org/
[reactjs]: https://reactjs.org
[mongodb]: https://www.mongodb.com/
