# Documentação do TodoList API - Back-end

## Sumário
1. [Introdução](#1-introdução)
2. [Arquitetura do Projeto](#2-arquitetura-do-projeto)
   - [Princípios Seguidos](#21-princípios-seguidos)
3. [Tecnologias Utilizadas](#3-tecnologias-utilizadas)
4. [Design do Código](#4-design-do-código)
   - [Use Cases](#41-use-cases)
   - [Testes Unitários](#42-testes-unitários)
5. [Como Executar o Projeto](#5-como-executar-o-projeto)
   - [Pré-requisitos](#51-pré-requisitos)
   - [Instalação](#52-instalação)
   - [Execução de Testes](#53-execução-de-testes)
6. [Rotas da API](#6-rotas-da-api)
   - [Usuários](#61-usuário)
   - [Tarefas](#62-tarefas)
7. [Erros Comuns](#7-erros-comuns)
8. [Considerações Finais](#8-considerações-finais)

## 1. **Introdução**
Este projeto foi desenvolvido como parte de um desafio técnico para uma vaga de desenvolvedor full-stack. A seguir, detalho as decisões técnicas, tecnologias utilizadas e o processo de desenvolvimento, destacando como as práticas de engenharia de software e padrões arquiteturais foram seguidos.

## 2. **Arquitetura do Projeto**
A estrutura do projeto segue a **Clean Architecture**, separando claramente as camadas de domínio, aplicação, infraestrutura e interfaces externas.

### 2.1 **Princípios Seguidos**
- **SOLID**: Apliquei os cinco princípios para garantir a escalabilidade e manutenção do código.
- **KISS**: Mantive o código simples e fácil de entender.
- **DRY**: Evitei repetição de lógica e código.
- **Clean Code**: Foco em legibilidade e simplicidade de compreensão.

## 3. **Tecnologias Utilizadas**
O projeto foi desenvolvido utilizando as seguintes tecnologias:
- **Node.js**: Ambiente de execução JavaScript para o back-end.
- **Express**: Framework para criar a API RESTful.
- **TypeScript**: Adotamos TypeScript para garantir tipagem estática e maior segurança durante o desenvolvimento.
- **PostgreSQL**: Banco de dados relacional utilizado no projeto.
- **Prisma ORM**: Usado para a manipulação de banco de dados e mapeamento objeto-relacional (ORM).
- **Docker**: Utilizado para facilitar o setup do ambiente.
- **Vitest**: Framework de testes utilizado para testes unitários.
- **JWT (JSON Web Token)**: Autenticação segura.
- **Zod**: Validação de dados.

## 4. **Design do Código**
### 4.1 **Use Cases**
Implementamos os **casos de uso** seguindo os princípios da Clean Architecture. Os casos de uso são independentes de detalhes de infraestrutura, facilitando o teste e a manutenção. Cada caso de uso é testado com **testes unitários**, onde utilizamos **repositórios em memória** para simular interações com o banco de dados.

### 4.2 **Testes Unitários**
- Os testes unitários foram implementados utilizando **Vitest**. O padrão de testes **spy** foi usado para monitorar interações e garantir o funcionamento correto dos casos de uso.
- Os repositórios em memória permitiram que os testes fossem executados de forma independente do banco de dados, aumentando a velocidade e confiabilidade dos testes.

## 5. **Como Executar o Projeto**

### 5.1 **Pré-requisitos**
Certifique-se de ter instalado:
- Docker
- Node.js

Para a seção de **Instalação**, você já tem uma boa estrutura. Aqui está uma sugestão com ajustes para melhorar a clareza e fluxo:

---

### 5.2 **Instalação**

1. Clone o repositório:
   ```bash
   git clone https://github.com/ghmarques-dev/challenge-todolist-api
   cd challenge-todolist-api
   ```
2. Instale as dependências do projeto:
   ```bash
   npm install
   ```

3. Configure o arquivo de ambiente:
   - Crie um arquivo `.env` com base no `.env.example` e preencha os valores necessários.

4. Suba o banco de dados PostgreSQL utilizando Docker:
   ```bash
   docker-compose up -d
   ```

5. Inicie a aplicação:
   ```bash
   npm run start:dev
   ```

### 5.3 **Execução de Testes**
Para rodar os testes unitários:
```bash
npm run test:watch
```

## 6. **Rotas da API**
### 6.1 **Usuário**
#### **POST /user**
Esta rota é responsável por criar um novo usuário no sistema. O usuário envia seus dados de nome, e-mail e senha para que a conta seja criada. Caso o e-mail já esteja em uso, será retornado um erro.

**Dados de Entrada**

```json
{
    "name": "name",
    "email": "email@email.com",
    "password": "password"
}
```
 
**Respostas**
- Sucesso - 200 OK
Caso o usuário seja criado com sucesso, a resposta será:

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzMmZlODFjMy02MjIyLTQ4NjEtYWY4My03MDVjYWQwZDUwMjQiLCJpYXQiOjE3NDE3MTY4NjJ9.kK6JwmoE07NOpynDQi7XbhiH0InLcQojHDG0NY4MTBk"
}
```

- Erro - 400 Bad Request
Se o e-mail informado já estiver registrado, será retornado o seguinte erro:

```json
{
    "message": "Email already exists"
}
```

**Regras de Negócio**
- E-mail único: O e-mail informado pelo usuário deve ser único. Se já existir um usuário com o mesmo e-mail, a operação falha e é retornada a mensagem de erro "Email already exists".
- Validação de dados: O sistema verifica se todos os campos obrigatórios foram enviados (nome, e-mail e senha) e se estão corretos.
- Criptografia da senha: A senha fornecida será criptografada antes de ser armazenada no banco de dados.

#### **POST /sessions**
Esta rota é utilizada para realizar o login de um usuário no sistema. O usuário envia seu e-mail e senha para verificar se as credenciais estão corretas. Se a autenticação for bem-sucedida, o sistema retornará um token de autenticação. Caso contrário, serão retornados erros específicos.

**Dados de Entrada**

```json
{
    "email": "email@email.com",
    "password": "password"
}
```

**Respostas**
- Sucesso - 200 OK
Se o login for bem-sucedido, a resposta será:

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmYmZjMDhiMy0yYjE1LTQ2MjgtOWY0ZS1jNTMyY2Y4NDYxNWEiLCJpYXQiOjE3NDE3MTcwNzh9.tDLrxuijhmiRelMDbMR_sJlh9RIYx32rYLUDitejOqs"
}
```

- Erro - 404 Not Found
Se o e-mail informado não estiver cadastrado no sistema, será retornado o seguinte erro:

```json
{
    "message": "User not exists"
}
```

- Erro - 401 Unauthorized
Se o e-mail estiver correto, mas a senha fornecida for inválida, será retornado o erro:

```json
{
    "message": "Invalid credentials"
}
```

**Regras de Negócio**
- Verificação de e-mail: O sistema verifica se o e-mail informado existe no banco de dados. Se o e-mail não for encontrado, será retornado o erro "User not exists".
- Validação da senha: O sistema valida se a senha fornecida corresponde à senha cadastrada para o e-mail informado. Caso contrário, será retornado o erro "Invalid credentials".
- Token de autenticação: Se as credenciais estiverem corretas, o sistema gera um token JWT para autenticar o usuário nas requisições subsequentes.

### 6.2 **Tarefas**
Observações: Todas as rotas de tarefas requerem um token JWT válido fornecido no cabeçalho da requisição (Authorization: Bearer ).

#### **POST /tasks** ####
Esta rota é usada para criar uma nova tarefa para o usuário. O usuário deve enviar os dados necessários, como título, descrição, status e data de entrega.

**Dados de Entrada**

```json
{
    "title": "title",
    "description": "description",
    "status": "Pending",
    "deliveryDate": "2025-03-10T14:30:00Z"
}
```

**Respostas**

- 201 Created (Sucesso): Caso a tarefa seja criada com sucesso, a resposta será:
```json
{
    "task": {
        "taskId": "95fe7f6f-031a-4220-8b44-80f0ff823bb0",
        "userId": "fbfc08b3-2b15-4628-9f4e-c532cf84615a",
        "title": "title", 
        "description": "description",
        "status": "Pending",
        "deliveryDate": "2025-03-10T14:30:00.000Z",
        "createdAt": "2025-03-11T18:39:06.119Z",
        "updatedAt": "2025-03-11T18:39:06.119Z"
    }
}
```

- 400 Bad Request (Erro): Caso o título da tarefa já exista para o mesmo usuário, a resposta será:
 
```json
{
    "message": "Title already exists"
}
```

**Regras de Negócio**
- Autenticação: O usuário deve incluir um Bearer Token válido para acessar esta rota.
- Título único: O título da tarefa deve ser único para cada usuário. Caso o usuário tente criar duas tarefas com o mesmo título, será retornado o erro "Title already exists".
- Status da Tarefa: O campo status pode ser um dos seguintes: Pending, In Progress, ou Completed.

#### **PUT /tasks/:taskId** ####

Esta rota permite editar uma tarefa existente. O usuário deve informar o taskId da tarefa que deseja editar na URL e pode enviar qualquer combinação dos seguintes campos para atualização: title, description, status e deliveryDate.

**Parâmetros de URL**
taskId: O ID da tarefa que será editada.

**Dados de Entrada (opcionais)**

```json
{
    "title": "title-updated",
    "description": "description",
    "status": "Pending",
    "deliveryDate": "2025-03-10T14:30:00.000Z"
}
```

**Respostas**

- 200 OK (Sucesso): Caso a tarefa seja atualizada com sucesso, a resposta será:
```json
{
    "task": {
        "taskId": "7149fb0c-fcb7-4810-b265-889b76d937e0",
        "userId": "fbfc08b3-2b15-4628-9f4e-c532cf84615a",
        "title": "title-updated",
        "description": "description",
        "status": "Pending",
        "deliveryDate": "2025-03-10T14:30:00.000Z",
        "createdAt": "2025-03-11T01:00:37.407Z",
        "updatedAt": "2025-03-11T18:48:25.831Z"
    }
}
```

- 404 Not Found (Erro): Caso o taskId informado não exista, será retornado o seguinte erro:
```json
{
    "message": "Task not exists"
}
```

- 400 Bad Request (Erro): Caso já exista outra tarefa com o mesmo título para o mesmo usuário, será retornado o erro:
```json
{
    "message": "Title already exists"
}
```

**Regras de Negócio**
- Título único: O título da tarefa deve ser único por usuário. Caso o usuário tente - atualizar a tarefa com um título que já exista, será retornado o erro "Title already exists".
- Campos opcionais: Apenas os campos fornecidos pelo usuário serão atualizados. Se algum campo não for enviado, ele permanecerá com o valor atual.
- Status da Tarefa: O campo status pode ser um dos seguintes: Pending, In Progress, ou Completed.

#### **DELETE /tasks/:taskId** ####
Esta rota permite deletar uma tarefa existente. O usuário deve informar o taskId da tarefa que deseja deletar na URL. 

**Parâmetros de URL**
taskId: O ID da tarefa que será deletada.

**Respostas**

- 200 OK (Sucesso): Caso a tarefa seja deletada com sucesso, a resposta será um status 200 OK e não haverá corpo na resposta.

- 404 Not Found (Erro): Caso o taskId informado não exista, será retornado o seguinte erro:

```json
{
    "message": "Task not exists"
}
```

**Regras de Negócio**
- Exclusão da tarefa: Quando uma tarefa é excluída, ela é permanentemente removida do banco de dados, e o usuário não poderá acessá-la novamente.

#### **GET /tasks/:taskId** ####

Esta rota permite recuperar os detalhes de uma tarefa específica, identificada pelo seu taskId. O usuário deve fornecer o taskId da tarefa na URL para acessar as informações.

**Parâmetros de URL**
taskId: O ID da tarefa cujos detalhes serão recuperados.

**Respostas**
- 200 OK (Sucesso): Se a tarefa for encontrada, a resposta será um objeto com os detalhes da tarefa:
```json
{
    "task": {
        "taskId": "fa1186a5-35a7-4c16-a454-395a66a6d973",
        "userId": "fbfc08b3-2b15-4628-9f4e-c532cf84615a",
        "title": "title-01",
        "description": "description",
        "status": "Pending",
        "deliveryDate": "2025-03-10T14:30:00.000Z",
        "createdAt": "2025-03-11T17:42:22.931Z",
        "updatedAt": "2025-03-11T17:42:22.931Z"
    }
}
```

- 404 Not Found (Erro): Se a tarefa com o taskId informado não existir, será retornado o seguinte erro:
```json
{
    "message": "Task not exists"
}
```

**Regras de Negócio**
taskId: O taskId deve ser um ID de tarefa válido presente na URL da requisição. Se a tarefa com esse ID não existir, o erro "Task not exists" será retornado.

#### **GET /tasks** ####

Esta rota permite recuperar todas as tarefas de um usuário. O usuário pode fornecer queries de consulta para filtrar as tarefas com base em um termo de pesquisa ou paginar os resultados.

**Queries de URL**
search: Termo de pesquisa usado para filtrar as tarefas com base no título.
page: Número da página para paginação, utilizado para retornar tarefas paginadas.

**Respostas**

- 200 OK (Sucesso): Se as tarefas forem encontradas, a resposta será um objeto contendo uma lista de tarefas e metadados sobre o número total de tarefas:
```json
{
    "tasks": {
        "tasks": [
            {
                "taskId": "95fe7f6f-031a-4220-8b44-80f0ff823bb0",
                "userId": "fbfc08b3-2b15-4628-9f4e-c532cf84615a",
                "title": "title-08",
                "description": "description",
                "status": "Pending",
                "deliveryDate": "2025-03-10T14:30:00.000Z",
                "createdAt": "2025-03-11T18:39:06.119Z",
                "updatedAt": "2025-03-11T18:39:06.119Z"
            },
            {
                "taskId": "63c8b82f-5556-4aca-9483-45facc6998ff",
                "userId": "fbfc08b3-2b15-4628-9f4e-c532cf84615a",
                "title": "title-03",
                "description": "description",
                "status": "Pending",
                "deliveryDate": "2025-03-10T14:30:00.000Z",
                "createdAt": "2025-03-11T17:42:29.450Z",
                "updatedAt": "2025-03-11T17:42:29.450Z"
            },
            {
                "taskId": "1af490ce-cc82-48f4-bec5-70216262c558",
                "userId": "fbfc08b3-2b15-4628-9f4e-c532cf84615a",
                "title": "title-02",
                "description": "description",
                "status": "Pending",
                "deliveryDate": "2025-03-10T14:30:00.000Z",
                "createdAt": "2025-03-11T17:42:26.090Z",
                "updatedAt": "2025-03-11T17:42:26.090Z"
            },
            {
                "taskId": "fa1186a5-35a7-4c16-a454-395a66a6d973",
                "userId": "fbfc08b3-2b15-4628-9f4e-c532cf84615a",
                "title": "title-01",
                "description": "description",
                "status": "Pending",
                "deliveryDate": "2025-03-10T14:30:00.000Z",
                "createdAt": "2025-03-11T17:42:22.931Z",
                "updatedAt": "2025-03-11T17:42:22.931Z"
            }
        ],
        "meta": {
            "count_tasks": 4
        }
    }
}
```

**Regras de Negócio**
- Autenticação: O usuário deve incluir um Bearer Token válido para acessar esta rota.
- search: Se o parâmetro search for fornecido, o sistema irá filtrar as tarefas pelo título que contém o valor passado.
- page: O parâmetro page é utilizado para determinar qual página de resultados será retornada. A resposta incluirá uma lista de tarefas dessa página.
count_tasks: O campo meta.count_tasks fornecerá o número total de tarefas encontradas, independente da paginação.

## 7. **Erros Comuns**
Erro de Autenticação (401 Unauthorized)
- **401 Unauthorized**: Retornado quando a rota precisa de um token JWT
- **404 Not Found**: Retornado quando um recurso específico (forjador ou anel) não é encontrado.
- **422 Unprocessable Entity**: Retornado quando o forjador tem a quantidade máxima de aneis permitidos.
- **500 Internal Server Error**: Quando ocorre algum erro inesperado no servidor.

## 8. **Considerações Finais**
O projeto foi desenvolvido seguindo os bons padrões de arquitetura e design de código, garantindo escalabilidade, facilidade de manutenção e testes robustos. 
Além dos requisitos principais, implementei com sucesso todos os diferenciais, como a **utilização do Docker**, os **testes unitários**, a **autenticação com JWT** e **filtros e paginação**.

Feito por Guilherme Henrique Marques.