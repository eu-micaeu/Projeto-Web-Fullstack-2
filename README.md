# zoneBask <img src="./public/icons/logo.png" alt="Logo" width="30">

Um projeto criado para a disciplina de Programação Web Full Stack, onde será utilizado o seguimento do SPA - Single Page Application, em que todas as funcionalidades serão
implementadas em uma unica página HTML, sem a necessidade de redirecionamento entre as páginas para atualização da interface. O projeto considera o desenvolvimento de uma 
aplicação web em 3 camadas: Front-end, Back-end HTTP e Banco de dados. 

## Membros do Grupo

[Maria Gabriella Victor Gomes Da Silva](https://github.com/gabriellavsx) - 2143364

[Micael Ribeiro Rocha](https://github.com/eu-micaeu) - 2454424

## Requisitos Funcionais:

O projeto deve implementar os seguintes requisitos funcionais:
1. Login;
2. Busca;
3. Inserção

## Arquitetura do Sistema

# Front-end : 
Deve ser implementado utilizando a biblioteca de front-end React.js. Toda a
comunicac¸ao com o Back-end deve ser realizada por meio de requisições HTTP, carac
terizando uma Single-Page Application - SPA;

#Back-end HTTP : 
Deve ser implementado utilizando Express.js. A comunicac¸ao com o Front-end
deve seguir o padrao de rotas Restful. Esse servidor ter ˜ a acesso direto ao banco de
dados;

#Banco de dados : 
Pode ser utilizado qualquer sistema de gerenciamento de banco de dados
da escolha dos alunos.


## Critérios:

• Implementac¸ao de cada requisito (Login, Busca e Inserção) no Frontend com React.js. 

• Implementac¸ao de cada requisito (Login, Busca e Inserção) no Backend com Express.js. 

• Verificac¸ao de preenchimento de campos no servidor. 

• Envio de mensagens de validação do servidor. 

• Implementac¸ao do padrão REST na API desenvolvida. 

• Implementac¸ao de regras de seguranc¸a associadas as seguintes categorias de ataques de aplicações web: 
– Falhas de criptografia (uso de HTTPS e armazenamento de senhas utilizando criptografia);
– Injec¸ao (uso de ˜ sanitizers de parametros, prevevir ataques de SQL/NoSQL inject e 
XSS);
– Falhas de identificação e autenticação (prevenir ataques automatizados, invalidar 
corretamente tokens de autenticação); 
– Falhas de registro e monitoramento de segurança (registrar erros de autenticação,
buscas e postagens em logs).

• Implementac¸ao de otimizaçãoo do Front-end: 
– Compressao de arquivos estátivos; 
– Compressao de respostas do servidor. 
• Implementação da estratégia de cache no Back-end. 
• Configuração do padrão de pool de conexões. 

## Imagens da aplicação:

![image]()

<hr>

![image]()

<hr>

![image]()

## Possivéis mensagens de erro:

![image]()

# Como rodar o projeto localmente

### 1. Clonar o repositório

Se ainda não tiver o repositório clonado, use o seguinte comando no terminal:

```bash
git clone https://github.com/eu-micaeu/Projeto-Web-Fullstack-2
```

### 2. Instalar as dependências

Entre na pasta do projeto e instale as dependências do Node.js:

```bash
npm install
```

### 3. Rodar o projeto localmente

Após instalar as dependências, execute o projeto com o comando:

```bash
npm start
```

Este comando irá rodar o servidor de desenvolvimento e você poderá acessar a aplicação localmente no endereço:

```bash
http://localhost:3000
```
