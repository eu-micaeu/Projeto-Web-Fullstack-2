# zoneBask <img src="./frontend/public/logo.png" alt="Logo" width="30">

Um projeto criado para a disciplina de Programação Web Full Stack, onde será utilizado o seguimento do SPA - Single Page Application, 
em que todas as funcionalidades serão implementadas em uma unica página HTML, 
sem a necessidade de redirecionamento entre as páginas para atualização da interface.

## Membros do Grupo

[Maria Gabriella Victor Gomes Da Silva](https://github.com/gabriellavsx) - 2143364

[Micael Ribeiro Rocha](https://github.com/eu-micaeu) - 2454424

## Como iniciar o projeto?

- Tecnologias:
  
    - NodeJS
    - Redis 

1. Crie um '.env' na pasta './backend' e coloque o seguinte conteudo:

```
PORT=443
DB_HOST=dpg-cuj6dr0gph6c738miefg-a.oregon-postgres.render.com
DB_USER=root
DB_PASS=hQJlGaMc0lt972t7PZ8w80N9JmXdxABN
DB_NAME=fullstack_8p6s
JWT_SECRET=chavesecreta
```

2. Agora, na pasta './frontend':

```
HTTPS=true
SSL_CRT_FILE=./ssl/localhost.crt
SSL_KEY_FILE=./ssl/localhost.key
```

3. Execute o comando: ```npm install --force``` em ambas pastas, './backend' e './frontend'. E, ainda nas duas pastas, execute no comando: ```npm run dev```.

OBS: É necessário ter o redis rodando na sua máquina para aplicar a lógica da estratégia de cache no sistema.

## Prints do sistema:

- Não autenticado

![image](https://github.com/user-attachments/assets/4686388a-1bc7-4b41-a7cc-43e8fbd09a2a)

![image](https://github.com/user-attachments/assets/0122bfc7-7cdf-4b68-b6ef-d003c39d9e89)

- Autenticado

![image](https://github.com/user-attachments/assets/c43c4182-4ea2-4da2-8e32-fd2483d4b416)

![image](https://github.com/user-attachments/assets/495be1e4-59d9-43f7-bf30-7114bf470e04)



