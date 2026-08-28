# ContractFlow

ContractFlow is an oil and gas contract operations platform covering bid through commissioning.

## Workspace layout

- `apps/web`: Next.js dashboard
- `apps/api`: NestJS REST API
- `packages/contracts`: shared API and domain contracts
- `infra`: local PostgreSQL, Redis, and S3-compatible object storage

## Local setup

1. Copy `apps/api/.env.example` to `apps/api/.env`.
2. Start infrastructure: `docker compose -f infra/docker-compose.yml up -d`.
3. Install dependencies: `npm install`.
4. Generate the Prisma client: `npm run prisma:generate --workspace=@contractflow/api`.
5. Apply local migrations: `npm run prisma:migrate --workspace=@contractflow/api`.
6. Run the web app: `npm run dev:web`.
7. Run the API: `npm run dev:api`.

The API is served on `http://localhost:3001/api/v1`; Swagger is available at `/api/docs`.
