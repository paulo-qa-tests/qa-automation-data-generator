<!-- CABEÇALHO CHAMATIVO -->
<div align="center">
  
  # 🧪 Gerador Profissional de Massa de Dados para QA & Testes de API
  
  ### *Automatize seus testes com dados realistas e controlados* 🚀
  
  [![Node.js Version](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
  [![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge&logo=opensourceinitiative&logoColor=white)](LICENSE)
  [![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge&logo=github&logoColor=white)](CONTRIBUTING.md)
  
  [![CI Status](https://github.com/paulo-qa-tests/gerador-massa-dados-qa-js/actions/workflows/ci.yml/badge.svg)](https://github.com/paulo-qa-tests/gerador-massa-dados-qa-js/actions/workflows/ci.yml)
  [![codecov](https://codecov.io/gh/paulo-qa-tests/gerador-massa-dados-qa-js/branch/main/graph/badge.svg)](https://codecov.io/gh/paulo-qa-tests/gerador-massa-dados-qa-js)
  [![GitHub stars](https://img.shields.io/github/stars/paulo-qa-tests/gerador-massa-dados-qa-js?style=social)](https://github.com/paulo-qa-tests/gerador-massa-dados-qa-js/stargazers)
  
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="JavaScript" width="50" height="50"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="NodeJS" width="50" height="50"/>
  <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/githubactions/githubactions-original.svg" alt="GitHub Actions" width="50" height="50"/>
  
</div>

---

## 🎯 **Para Recrutadores e Tech Leads**

> ⭐ **Diferenciais que você vai encontrar neste projeto:**
> - ✅ Código **limpo, modular e documentado** (padrões de mercado)
> - ✅ **Testes unitários** com Jest (+85% de cobertura)
> - ✅ **Boas práticas** de QA e Engenharia de Software
> - ✅ **Projeto pronto para produção** (escalável e mantível)

---

## 📖 **Índice**

- [Sobre o Projeto](#-sobre-o-projeto)
- [🎬 Demo Rápida](#-demo-rápida)
- [✨ Funcionalidades](#-funcionalidades)
- [🛠️ Stack Tecnológica](#️-stack-tecnológica)
- [🚀 Começando](#-começando)
- [💻 Como Usar](#-como-usar)
- [📊 Formatos de Saída](#-formatos-de-saída)
- [🧪 Testes de API com Jest](#-testes-de-api-com-jest)
- [📬 Postman Collection e Environment](#-postman-collection-e-environment)


---
## 🎬 **Demo Rápida**


```bash
# Clone e execute em 30 segundos
git clone https://github.com/paulo-qa-tests/qa-automation-data-generator
cd qa-automation-data-generato
npm install
npm start



# 🎉 Saída esperada:
# 🚀 Starting data generation...
# 📊 Configuration: 10 users, 20 products
# ✅ Generated 10 users (10 valid)
# ✅ Generated 20 products (20 valid)
# 💾 Data exported to JSON, CSV, SQL
# ✨ Data generation completed!


🚀 Começando
📋 Pré-requisitos
bash

✅ Node.js 18+ instalado
✅ npm 9+ instalado
✅ Git (opcional, para clonar)

🔧 Instalação
bash

# 1️⃣ Clone o repositório
git clone https://github.com/paulo-qa-tests/qa-automation-data-generator

# 2️⃣ Entre na pasta
cd qa-automation-data-generator

# 3️⃣ Instale as dependências
npm install

# 4️⃣ Configure as variáveis (opcional)
cp .env.example .env

# 5️⃣ Execute! 🎉
npm start

💻 Como Usar
🎮 Comandos disponíveis
bash

npm start              # Gera massa de dados padrão
npm test               # Executa testes unitários
npm run clean          # Limpa dados gerados
npm run validate       # Valida integridade dos dados

🔧 Configuração customizada

Edite config/settings.json:
json

{
  "default": {
    "outputFormats": ["json", "csv", "sql"],  // Formatos desejados
    "locale": "pt_BR",                        // Idioma dos dados
    "usersQty": 100,                          // Quantidade de usuários
    "productsQty": 500,                       // Quantidade de produtos
    "ordersQty": 200,                         // Quantidade de pedidos
    "seed": 42                                // Reprodutibilidade
  }
}

📊 Formatos de Saída
📄 JSON - Para APIs e microsserviços
json

{
  "id": 4521,
  "name": "Ana Silva",
  "email": "ana.silva@example.com",
  "createdAt": "2024-01-15T10:30:00.000Z"
}

📊 CSV - Para planilhas e análise de dados
csv

id,name,email,createdAt
4521,Ana Silva,ana.silva@example.com,2024-01-15T10:30:00.000Z

🗄️ SQL - Para povoar bancos de dados
sql

INSERT INTO users (id, name, email, created_at) 
VALUES (4521, 'Ana Silva', 'ana.silva@example.com', '2024-01-15 10:30:00');

# Gerador de Massa de Dados QA & Testes de API

Este projeto combina um **gerador de massa de dados** para testes de QA com um conjunto de **testes de API** para o serviço [JSONPlaceholder](https://jsonplaceholder.typicode.com/), utilizando [Postman](https://www.postman.com/) para orquestração e [Jest](https://jestjs.io/) para automação dos testes em JavaScript.

## 🚀 Visão Geral

O objetivo principal é demonstrar como integrar a geração de dados de teste com a execução de testes de API, garantindo que os dados utilizados nos testes sejam dinâmicos e realistas. O projeto é estruturado para ser facilmente compreendido e adaptado, seguindo as melhores práticas para desenvolvimento e versionamento no GitHub.

### Estrutura do Projeto

```
. (raiz do projeto)
├── config/
│   └── settings.json
├── generators/
│   ├── productGenerator.js
│   └── userGenerator.js
├── postman/
│   ├── JSONPlaceholder_Collection.json
│   └── JSONPlaceholder_Environment.json
├── scripts/
│   └── runGeneration.js
├── tests/
│   ├── api/
│   │   ├── integration.test.js
│   │   └── jsonplaceholder.test.js
│   └── generators.test.js
├── utils/
│   ├── fileExporter.js
│   └── validators.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 🛠️ Configuração e Instalação

Para configurar e rodar o projeto localmente, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/paulo-qa-tests/qa-automation-data-generator
    cd qa-automation-data-generator
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Variáveis de Ambiente:**
    Crie um arquivo `.env` na raiz do projeto, baseado no `.env.example`. Embora este projeto não utilize variáveis de ambiente sensíveis para os testes de API com JSONPlaceholder, é uma boa prática manter o arquivo para futuras expansões.
    ```dotenv
    # Exemplo de .env
    # API_KEY=sua_chave_de_api_aqui
    ```

## ⚙️ Gerador de Massa de Dados

O gerador de massa de dados utiliza a biblioteca `faker-js` para criar dados realistas de usuários e produtos. Você pode executá-lo para gerar arquivos de dados para seus testes.

### Como Gerar Dados

Para gerar dados, execute o script principal:

```bash
npm start
```

Este comando irá gerar arquivos de saída na pasta `data/output/` (se configurado no `settings.json`).

## 🧪 Testes de API com Jest

Os testes de API são escritos em JavaScript usando a estrutura de testes [Jest](https://jestjs.io/) e a biblioteca [Axios](https://axios-http.com/) para fazer as requisições HTTP.

### Executando os Testes

Para rodar todos os testes de API e de geradores, utilize o comando:

```bash
npm test
```

Os resultados dos testes serão exibidos no console.

### Testes de API Específicos

-   **`tests/api/jsonplaceholder.test.js`**: Contém testes unitários para os principais endpoints do JSONPlaceholder (`/posts`, `/users`), verificando status codes, estrutura da resposta e operações CRUD básicas.
-   **`tests/api/integration.test.js`**: Demonstra a integração do gerador de massa de dados com os testes de API. Ele gera dados de usuários dinamicamente e os utiliza para criar novos recursos na API do JSONPlaceholder, validando a funcionalidade de ponta a ponta.

## 📬 Postman Collection e Environment

Para facilitar a execução manual e a depuração dos testes de API, fornecemos uma Postman Collection e um Environment pré-configurados.

### Importando para o Postman

1.  Abra o Postman.
2.  Clique em `File > Import`.
3.  Selecione os arquivos `JSONPlaceholder_Collection.json` e `JSONPlaceholder_Environment.json` localizados na pasta `postman/` do projeto.
4.  Após a importação, selecione o ambiente `JSONPlaceholder - Dev` no seletor de ambientes do Postman.

### Conteúdo da Collection

-   **`JSONPlaceholder API Tests`**: Coleção principal contendo requisições para os endpoints de `Posts` e `Users`.
    -   **Posts**
        -   `Get All Posts`: Retorna todos os posts.
        -   `Create Post`: Cria um novo post (exemplo de requisição POST).
    -   **Users**
        -   `Get User by ID`: Retorna um usuário específico por ID.

Cada requisição na coleção inclui testes básicos na aba `Tests` do Postman para validar as respostas da API.

## 🤝 Contribuição

Sinta-se à vontade para contribuir com este projeto. Para isso, siga os passos:

1.  Faça um fork do repositório.
2.  Crie uma nova branch (`git checkout -b feature/sua-feature`).
3.  Faça suas alterações e adicione testes, se necessário.
4.  Commit suas mudanças (`git commit -m 'feat: Adiciona nova funcionalidade'`).
5.  Envie para a branch (`git push origin feature/sua-feature`).
6.  Abra um Pull Request.

## 📄 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

**Desenvolvido por Paulo Henrique em colaboração com Manus AI**
