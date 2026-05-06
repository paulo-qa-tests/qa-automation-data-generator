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
- [🤝 Contribuição](#-contribuição)
- [📄 Licença](#-licença)

---

## 📌 **Sobre o Projeto**

Este projeto combina um **gerador de massa de dados** para testes de QA com um conjunto de **testes de API** para o serviço [JSONPlaceholder](https://jsonplaceholder.typicode.com/), utilizando [Postman](https://www.postman.com/) para orquestração e [Jest](https://jestjs.io/) para automação dos testes em JavaScript.

### 🎯 Visão Geral

O objetivo principal é demonstrar como integrar a geração de dados de teste com a execução de testes de API, garantindo que os dados utilizados nos testes sejam dinâmicos e realistas. O projeto é estruturado para ser facilmente compreendido e adaptado, seguindo as melhores práticas para desenvolvimento e versionamento no GitHub.

### 📂 Estrutura do Projeto

---

## 🎬 **Demo Rápida**

```bash
# Clone e execute em 30 segundos
git clone https://github.com/paulo-qa-tests/qa-automation-data-generator
cd qa-automation-data-generator
npm install
npm start

🚀 Starting data generation...
📊 Configuration: 10 users, 20 products
✅ Generated 10 users (10 valid)
✅ Generated 20 products (20 valid)
💾 Data exported to JSON, CSV, SQL
✨ Data generation completed!

✨ Funcionalidades
Funcionalidade	Descrição
🧑 Gerador de Usuários	Cria dados realistas de usuários (nome, email, endereço, telefone)
📦 Gerador de Produtos	Gera produtos com nome, preço, descrição e categorias variadas
📄 Múltiplos Formatos	Exporta dados em JSON, CSV e SQL simultaneamente
🌐 Localização PT-BR	Dados gerados no padrão brasileiro (CPF, telefone, endereços)
🔁 Reprodutibilidade	Suporte a seed para geração consistente de dados
🧪 Testes Automatizados	Suite completa de testes com Jest
📬 Postman Integration	Collection pronta para testes manuais de API

🛠️ Stack Tecnológica
<div align="center">
Tecnologia	Finalidade
https://img.shields.io/badge/Node.js-18.x-339933?style=flat-square&logo=node.js&logoColor=white	Runtime JavaScript
https://img.shields.io/badge/Jest-24.x-C21325?style=flat-square&logo=jest&logoColor=white	Testes unitários e de API
https://img.shields.io/badge/Axios-1.6.x-5A29E4?style=flat-square&logo=axios&logoColor=white	Requisições HTTP
https://img.shields.io/badge/Faker.js-8.x-00B4D8?style=flat-square&logo=faker&logoColor=white	Geração de dados fictícios
https://img.shields.io/badge/Postman-Collection-FF6C37?style=flat-square&logo=postman&logoColor=white	Testes manuais de API
https://img.shields.io/badge/GitHub_Actions-CI/CD-2088FF?style=flat-square&logo=github-actions&logoColor=white	Integração contínua
</div>
🚀 Começando
📋 Pré-requisitos
✅ Node.js 18+ instalado
✅ npm 9+ instalado
✅ Git (opcional, para clonar)

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
npm start              # Gera massa de dados padrão
npm test               # Executa testes unitários e de API
npm run clean          # Limpa dados gerados
npm run validate       # Valida integridade dos dados

🔧 Configuração customizada
{
  "default": {
    "outputFormats": ["json", "csv", "sql"],
    "locale": "pt_BR",
    "usersQty": 100,
    "productsQty": 500,
    "ordersQty": 200,
    "seed": 42
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

🧪 Testes de API com Jest
Executando os Testes
bash

# Rodar todos os testes
npm test

# Rodar testes específicos
npm test -- tests/api/jsonplaceholder.test.js
npm test -- tests/generators.test.js

# Rodar com coverage
npm test -- --coverage

📝 Testes Implementados
Arquivo	Descrição
jsonplaceholder.test.js	Testes unitários para endpoints /posts e /users
integration.test.js	Integração do gerador de dados com testes de API
generators.test.js	Testes dos geradores de massa de dados
📬 Postman Collection e Environment
Importando para o Postman

    Abra o Postman

    Clique em File > Import

    Selecione os arquivos na pasta postman/:

        JSONPlaceholder_Collection.json

        JSONPlaceholder_Environment.json

    Selecione o ambiente JSONPlaceholder - Dev

📋 Endpoints da Collection
Categoria	Endpoint	Método	Descrição
Posts	/posts	GET	Retorna todos os posts
	/posts	POST	Cria um novo post
Users	/users/{id}	GET	Retorna usuário por ID
🤝 Contribuição

Sinta-se à vontade para contribuir com este projeto!
bash

# 1. Faça o fork
# 2. Crie sua branch
git checkout -b feature/minha-feature

# 3. Commit suas mudanças
git commit -m 'feat: Adiciona nova funcionalidade'

# 4. Push para a branch
git push origin feature/minha-feature

# 5. Abra um Pull Request

📄 Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
<div align="center">

Desenvolvido por Paulo Henrique 💜

https://img.shields.io/badge/GitHub-paulo--qa--tests-181717?style=for-the-badge&logo=github
https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin

⭐ Se este projeto foi útil para você, considere dar uma estrela! ⭐
</div> ```
