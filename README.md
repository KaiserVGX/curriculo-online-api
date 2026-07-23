# CurrÃ­culo Online API

API REST para cadastro e gerenciamento de currÃ­culos profissionais. O projeto permite armazenar dados pessoais, endereÃ§o, contatos, experiÃªncias profissionais, escolaridade, cursos, qualificaÃ§Ãµes e habilidades.

## Tecnologias

- [Node.js](https://nodejs.org/)
- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- REST API
- TypeScript

## Funcionalidades

### Usuários

- Cadastro com e-mail e senha;
- E-mail único;
- Senha armazenada apenas como hash;
- Controle de usuário ativo ou inativo;
- Registro das datas de criaÃ§Ã£o e atualizaÃ§Ã£o.

### Dados pessoais

- CPF;
- Nome completo;
- Data de nascimento;
- Sexo;
- Nacionalidade;
- Estado civil;
- Naturalidade;
- Endereço completo:
  - CEP;
  - Logradouro;
  - NÃºmero;
  - Complemento;
  - Bairro;
  - Cidade;
  - Estado;
- Contatos:
  - Celular;
  - Telefone fixo;
  - Telefone para recado.

### Experiências profissionais

- Nome da empresa;
- Cargo;
- Setor;
- Data de entrada;
- Data de saÃ­da;
- Indicação de emprego atual;
- Descrição das atividades do cargo.

### Escolaridade

- Instituição;
- Curso ou formação;
- Situação de conclusÃ£o;
- Ano de conclusÃ£o;
- NÃ­vel:
  - Analfabeto;
  - Ensino Fundamental;
  - Ensino MÃ©dio;
  - Graduação;
  - Especialização;
  - Mestrado;
  - Doutorado;
- Descrição do curso ou formação.

### Cursos e qualificaÃ§Ãµes

- Instituição;
- Nome do curso;
- Tipo do curso, como tÃ©cnico, profissionalizante, extensÃ£o ou certificação;
- Modalidade presencial ou on-line;
- Carga horÃ¡ria;
- Ano de conclusÃ£o;
- Descrição.

### Habilidades

- Soft skills, como comunicação, criatividade e bom humor;
- Hard skills, como programação e anÃ¡lise de dados;
- Associação de vÃ¡rias habilidades ao currÃ­culo.

## Modelo de dados

```mermaid
erDiagram
    USERS ||--o| PERSONAL_DATA : possui
    PERSONAL_DATA ||--o| ADDRESSES : possui
    PERSONAL_DATA ||--o| CONTACTS : possui
    USERS ||--o{ EXPERIENCES : registra
    USERS ||--o{ EDUCATIONS : registra
    USERS ||--o{ COURSES : registra
    USERS ||--o{ USER_SKILLS : possui
    SKILLS ||--o{ USER_SKILLS : classifica
```

O script completo para importação no dbdiagram.io estÃ¡ no arquivo [`database.dbml`](./database.dbml).

## OrganizaÃ§Ã£o sugerida

```text
src/
â”œâ”€â”€ app.module.ts
â”œâ”€â”€ common/
â”‚   â”œâ”€â”€ decorators/
â”‚   â”œâ”€â”€ filters/
â”‚   â”œâ”€â”€ guards/
â”‚   â””â”€â”€ interceptors/
â”œâ”€â”€ config/
â”‚   â””â”€â”€ database.config.ts
â”œâ”€â”€ database/
â”‚   â””â”€â”€ migrations/
â””â”€â”€ modules/
    â”œâ”€â”€ auth/
    â”œâ”€â”€ users/
    â”œâ”€â”€ personal-data/
    â”œâ”€â”€ experiences/
    â”œâ”€â”€ educations/
    â”œâ”€â”€ courses/
    â””â”€â”€ skills/
```

Cada módulo pode conter `controller`, `service`, `entity`, `dto` e seu respectivo arquivo de módulo.

## Pré-requisitos

- Node.js 20 ou superior;
- npm 10 ou superior;
- PostgreSQL 15 ou superior.

## Configuração

1. Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
cd curriculo-online-api
```

2. Instale as dependÃªncias:

```bash
npm install
```

3. Crie um arquivo `.env` com base no exemplo:

```env
NODE_ENV=development
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=curriculo_online
DB_SSL=false

JWT_SECRET=substitua-por-uma-chave-segura
JWT_EXPIRES_IN=1d
BCRYPT_SALT_ROUNDS=12
```

4. Crie o banco de dados:

```sql
CREATE DATABASE curriculo_online;
```

5. Execute as migrations:

```bash
npm run migration:run
```

6. Inicie a aplicaÃ§Ã£o:

```bash
npm run start:dev
```

A API estarÃ¡ disponÃ­vel, por padrÃ£o, em `http://localhost:3000/api`.

## Scripts sugeridos

```bash
# Desenvolvimento
npm run start:dev

# Build
npm run build

# ProduÃ§Ã£o
npm run start:prod

# Testes
npm run test
npm run test:e2e
npm run test:cov

# Qualidade
npm run lint
npm run format

# TypeORM
npm run migration:generate -- src/database/migrations/NomeDaMigration
npm run migration:run
npm run migration:revert
```

Os comandos de migration precisam ser adicionados ao `package.json` conforme a configuraÃ§Ã£o do DataSource do projeto.

## Endpoints planejados

### AutenticaÃ§Ã£o e usuÃ¡rio

| MÃ©todo | Endpoint | DescriÃ§Ã£o |
| --- | --- | --- |
| `POST` | `/api/auth/register` | Cadastra um usuÃ¡rio |
| `POST` | `/api/auth/login` | Autentica o usuÃ¡rio |
| `GET` | `/api/users/me` | Consulta o usuÃ¡rio autenticado |
| `PATCH` | `/api/users/me` | Atualiza e-mail ou senha |
| `PATCH` | `/api/users/me/status` | Ativa ou inativa o usuÃ¡rio |

### CurrÃ­culo

| MÃ©todo | Endpoint | DescriÃ§Ã£o |
| --- | --- | --- |
| `GET` | `/api/profile` | Retorna o currÃ­culo completo |
| `PUT` | `/api/profile/personal-data` | Cria ou atualiza dados pessoais |
| `PUT` | `/api/profile/address` | Cria ou atualiza o endereÃ§o |
| `PUT` | `/api/profile/contact` | Cria ou atualiza os contatos |

### ColeÃ§Ãµes do currÃ­culo

| Recurso | Endpoint base |
| --- | --- |
| ExperiÃªncias | `/api/experiences` |
| Escolaridades | `/api/educations` |
| Cursos | `/api/courses` |
| Habilidades | `/api/skills` |

Os recursos de coleÃ§Ã£o devem oferecer `POST`, `GET`, `GET /:id`, `PATCH /:id` e `DELETE /:id`, respeitando a propriedade do usuÃ¡rio autenticado.

## Regras de negócio

- Um e-mail pertence a apenas um usuÃ¡rio;
- Um CPF pertence a apenas um perfil;
- Cada usuÃ¡rio pode possuir somente um cadastro de dados pessoais;
- A data de saÃ­da da experiÃªncia deve ser igual ou posterior Ã  data de entrada;
- Quando `is_current` for `true`, `end_date` deve ser nulo;
- O ano de conclusÃ£o só deve ser obrigatório quando a formaÃ§Ã£o ou curso estiver concluÃ­do;
- Uma habilidade nÃ£o deve ser duplicada para o mesmo usuÃ¡rio;
- UsuÃ¡rios sÃ³ podem consultar e alterar os prÃ³prios dados;
- Registros relacionados ao usuÃ¡rio devem ser removidos ou anonimizados conforme a polÃ­tica definida para exclusÃ£o da conta.

## ValidaÃ§Ã£o e seguranÃ§a

- Validar os DTOs com `class-validator` e `ValidationPipe`;
- Normalizar e validar e-mail;
- Validar CPF antes de persistir;
- Armazenar senha com hash usando `bcrypt` ou `argon2`;
- Nunca retornar `password_hash` nas respostas;
- Proteger rotas privadas com JWT e guards;
- Aplicar rate limit nos endpoints de autenticaÃ§Ã£o;
- Usar migrations em vez de `synchronize: true` fora de testes locais;
- Manter credenciais somente em variÃ¡veis de ambiente;
- Configurar CORS de acordo com o frontend autorizado;
- Evitar registrar CPF, senha, token ou outros dados pessoais sensÃ­veis nos logs.

## PadrÃ£o de respostas de erro

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": [
    "email must be an email"
  ],
  "path": "/api/auth/register",
  "timestamp": "2026-07-23T15:00:00.000Z"
}
```

## DocumentaÃ§Ã£o da API

Ã‰ recomendado usar Swagger com `@nestjs/swagger`. ApÃ³s a configuraÃ§Ã£o, a documentaÃ§Ã£o pode ser publicada em:

```text
http://localhost:3000/api/docs
```

## Roadmap inicial

- [ ] Configurar NestJS, TypeORM e PostgreSQL;
- [ ] Criar migrations e entidades;
- [ ] Implementar cadastro e autenticaÃ§Ã£o;
- [ ] Implementar dados pessoais, endereÃ§o e contatos;
- [ ] Implementar experiÃªncias profissionais;
- [ ] Implementar escolaridade;
- [ ] Implementar cursos e qualificaÃ§Ãµes;
- [ ] Implementar habilidades;
- [ ] Adicionar Swagger;
- [ ] Criar testes unitÃ¡rios e end-to-end;
- [ ] Adicionar Docker e pipeline de integraÃ§Ã£o contÃ­nua.

## LicenÃ§a

Defina a licenÃ§a do projeto antes da publicaÃ§Ã£o. Para projetos privados, remova esta seÃ§Ã£o ou informe que todos os direitos sÃ£o reservados.