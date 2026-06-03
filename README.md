#  UserFlow

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

**Aplicação Web Fullstack CRUD para gerenciamento de usuários.**  
Construída com Node.js, Express e MySQL, com frontend em HTML/CSS/JS.

</div>

---

##  Sobre o Projeto

O **UserFlow** é uma aplicação fullstack que implementa as quatro operações fundamentais de persistência de dados (**CRUD**):

| Operação | Descrição |
|----------|-----------|
| **C**reate | Cadastro de novos usuários |
| **R**ead | Listagem de todos os usuários |
| **U**pdate | Atualização de dados (nome, senha, e-mail) |
| **D**elete | Remoção permanente de usuários |

A comunicação entre frontend e backend ocorre via **API REST**, sem o uso de frameworks frontend usando apenas javascript.

---

##  Funcionalidades

-  Cadastro de usuários com nome, senha e e-mail
-  Listagem dinâmica de todos os usuários
-  Edição individual de campos (nome, senha, e-mail)
-  Exclusão de usuários com confirmação
-  Interface dark mode com tema neon
-  Comunicação assíncrona com a API via `fetch`

---

##  Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENTE (Browser)                      │
│              HTML + CSS + JavaScript (Vanilla)              │
└──────────────────────────┬──────────────────────────────────┘
                           │  HTTP / REST API
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  SERVIDOR (Node.js + Express)               │
│              Porta 3000 — Rotas CRUD + CORS                 │
└──────────────────────────┬──────────────────────────────────┘
                           │  mysql2
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                  BANCO DE DADOS (MySQL)                     │
│             db_registro → tabela tb_usuario                 │
└─────────────────────────────────────────────────────────────┘
```

---

##  Tecnologias

**Backend**
- [Node.js](https://nodejs.org/) — ambiente de execução JavaScript
- [Express](https://expressjs.com/) — framework para criação da API REST
- [mysql2](https://github.com/sidorares/node-mysql2) — driver de conexão com o MySQL
- [CORS](https://github.com/expressjs/cors) — middleware para requisições cross-origin

**Frontend**
- HTML5, CSS3, JavaScript (ES6+)
- Design responsivo com Flexbox
- Dark Mode com acentos em verde neon

**Banco de Dados**
- MySQL — tabela `tb_usuario` (id, nome, senha, email)

---

##   Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) v14 ou superior
- [MySQL Server](https://www.mysql.com/) (ou XAMPP / WAMP)
- [Git](https://git-scm.com/) *(opcional)*

---

##  Instalação e Uso

### 1. Clone o repositório

```bash
git clone https://github.com/PedroJona00/Sistema-de-Gestao-de-Usuarios.git
cd Sistema-de-Gestao-de-Usuarios
```

### 2. Configure o banco de dados

Abra seu gerenciador MySQL (Workbench, phpMyAdmin, DBeaver ou terminal) e execute o script SQL:

```sql
CREATE DATABASE db_registro;
USE db_registro;

CREATE TABLE tb_usuario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  email VARCHAR(150) NOT NULL
);
```
> ⚠️ **Atenção:** Verifique o arquivo `backend/server.js` e ajuste a senha e o usuário do MySQL caso seja diferente de `"12345"`:
> ```js
> password: "SUA_SENHA_AQUI"
> user: "SEU_USUÁRIO_AQUI"
> ```

### 3. Instale as dependências

```bash
npm install express mysql2 cors
```

### 4. Inicie o servidor

```bash
node backend/server.js
```

O terminal exibirá uma mensagem confirmando que o servidor está rodando na **porta 3000**.

### 5. Abra o frontend

Abra o arquivo `frontend/index.html` no navegador — ou use a extensão **Live Server** do VS Code para hot reload.

---

##  Estrutura de Pastas

```
Sistema-de-Gestao-de-Usuarios/
├── backend/
│   └── server.js          # API REST (Express + MySQL)
├── frontend/
│   ├── index.html         # Tela inicial / menu
│   ├── cadastro.html      # Formulário de cadastro
│   ├── usuarios.html      # Listagem de usuários
│   ├── style.css          # Estilos globais (dark mode)
│   └── script.js          # Lógica de consumo da API
├── package.json
└── README.md
```

---

##  Endpoints da API

Base URL: `http://localhost:3000`

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/usuarios` | Lista todos os usuários |
| `POST` | `/usuarios/cadastrar` | Cria um novo usuário |
| `PUT` | `/usuarios/editar/:id` | Atualiza dados de um usuário |
| `DELETE` | `/usuarios/deletar/:id` | Remove um usuário |

**Exemplo de corpo para POST/PUT:**
```json
{
  "nome": "Pedro",
  "senha": "minhasenha123",
  "email": "pedro@email.com"
}
```

---

##  Banco de Dados

**Banco:** `db_registro`  
**Tabela:** `tb_usuario`

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id_usuario` | INT (PK, AUTO_INCREMENT) | Identificador único |
| `nome_usuario` | VARCHAR(100) | Nome do usuário |
| `senha_usuario` | VARCHAR(255) | Senha do usuário |
| `email_usuario` | VARCHAR(150) | E-mail do usuário |

---


##  Autor

Feito por **[Pedro Jonatha](https://github.com/PedroJona00)** 

---

<div align="center">
  <sub>Projeto desenvolvido para estudo de desenvolvimento fullstack com Node.js, Express e MySQL.</sub>
</div>
