# Sistema Criador de Ebooks

Este é um sistema web para criação de ebooks que utiliza IA para gerar sugestões de capítulos e tópicos.

## Funcionalidades

- Criação de ebooks com título e descrição
- Geração automática de sugestões de capítulos usando IA
- Geração de tópicos para cada capítulo
- Interface para aceitar/rejeitar sugestões
- Persistência de dados com PostgreSQL

## Requisitos

- Python 3.11+
- Node.js 18+
- PostgreSQL 15+
- OpenAI API Key

## Configuração Local

1. Clone o repositório
2. Instale as dependências do Python:
   ```bash
   pip install -r requirements.txt
   ```
3. Copie o arquivo .env.example para .env e configure sua API key do OpenAI:
   ```bash
   cp .env.example .env
   ```

## Deployment no EasyPanel

1. Faça login no seu painel EasyPanel

2. Crie um novo projeto chamado "escritor"

3. Configure as variáveis de ambiente:
   - `OPENAI_API_KEY`: Sua chave da API OpenAI
   - `DB_PASSWORD`: Uma senha forte para o banco de dados

4. Adicione os serviços:

   ### Backend
   - Nome: escritor-backend
   - Porta: 8000
   - Dockerfile: Use o Dockerfile na raiz do projeto
   - Variáveis de ambiente:
     - DATABASE_URL=postgresql://postgres:${DB_PASSWORD}@db:5432/escritor
     - OPENAI_API_KEY=${OPENAI_API_KEY}

   ### Frontend
   - Nome: escritor-frontend
   - Porta: 3000
   - Dockerfile: Use o Dockerfile na pasta frontend
   - Variáveis de ambiente:
     - REACT_APP_API_URL=http://seu-dominio:8000

   ### Database
   - Nome: escritor-db
   - Tipo: PostgreSQL
   - Versão: 15
   - Variáveis de ambiente:
     - POSTGRES_DB=escritor
     - POSTGRES_PASSWORD=${DB_PASSWORD}

5. Configure o proxy reverso no EasyPanel:
   - Frontend: seu-dominio.com
   - Backend: api.seu-dominio.com

6. Inicie os serviços na ordem:
   1. Database
   2. Backend
   3. Frontend

## Estrutura do Projeto

```
escritor/
├── app/
│   ├── main.py
│   ├── models.py
│   └── database.py
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   └── pages/
│   └── Dockerfile
├── Dockerfile
├── docker-compose.yml
└── requirements.txt
```

## Uso

1. Acesse a interface web através do navegador
2. Clique em "Criar Novo Ebook"
3. Preencha o título e a descrição do seu ebook
4. O sistema irá gerar sugestões de capítulos
5. Aceite ou rejeite cada capítulo sugerido
6. Para capítulos aceitos, gere sugestões de tópicos
7. Aceite ou rejeite cada tópico sugerido
