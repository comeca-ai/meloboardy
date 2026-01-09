# Caramelo

Caramelo é um assistente de negócios brasileiro, direto e focado em ajudar founders e donos de negócio a destravarem suas prioridades.

## Stack

- **Framework**: Next.js 15 com App Router
- **IA**: Claude (Anthropic) via AI SDK
- **Banco**: PostgreSQL (Railway)
- **Auth**: Auth.js
- **Deploy**: Railway

## Setup Local

### 1. Instalar dependências

```bash
pnpm install
```

### 2. Configurar variáveis de ambiente

```bash
cp .env.example .env.local
```

Preencha:
- `AUTH_SECRET`: gere com `openssl rand -base64 32`
- `ANTHROPIC_API_KEY`: sua API key da Anthropic
- `POSTGRES_URL`: URL do seu banco Postgres

### 3. Rodar migrations

```bash
pnpm db:migrate
```

### 4. Iniciar servidor

```bash
pnpm dev
```

Acesse: http://localhost:3000

## Deploy no Railway

### 1. Criar projeto no Railway

1. Acesse [railway.app](https://railway.app)
2. Crie um novo projeto
3. Adicione um serviço PostgreSQL
4. Adicione um serviço "Deploy from GitHub repo"

### 2. Configurar variáveis

No Railway, adicione as variáveis:
- `AUTH_SECRET`
- `ANTHROPIC_API_KEY`
- `POSTGRES_URL` (Railway preenche automaticamente se você linkar o Postgres)

### 3. Deploy

Railway faz deploy automático a cada push no GitHub.

## Estrutura do Caramelo

### Máquina de Estados

```
INICIO → PROFILING → PRIORITY → QUALIFYING → SYNTHESIZED → NEXT_STEPS → ACTIVE
```

### Prioridades

- **CLIENTES**: foco em vendas/prospecção
- **CONTRATAR**: foco em recrutamento
- **ESTRATEGIA**: foco em direção do negócio
- **OUTRA**: outras prioridades

### Tom

- PT-BR informal
- Direto, sem corporativês
- Uma pergunta por vez
- Valida entendimento antes de dar sugestões

## Arquivos Principais

- `lib/ai/caramelo-prompt.ts` - System prompt do Caramelo
- `lib/ai/providers.ts` - Configuração do Claude
- `lib/ai/prompts.ts` - Prompts gerais
- `lib/db/schema.ts` - Schema do banco

## Licença

MIT
