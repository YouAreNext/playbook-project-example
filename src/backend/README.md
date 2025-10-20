# Localize Backend

NestJS REST backend for the Localize travel planner. The service exposes trip-management endpoints, persists data in PostgreSQL via TypeORM, and surfaces API docs through Swagger.

## Prerequisites

- Node.js 20+
- npm 10+
- Docker (for running PostgreSQL locally)

## Installation

```bash
npm install
```

## Environment Configuration

The service reads the following variables (defaults are shown):

- `DB_HOST=localhost`
- `DB_PORT=5432`
- `DB_USERNAME=localize`
- `DB_PASSWORD=localize`
- `DB_NAME=localize`
- `PORT=3000`

Set them in your shell or in a `.env` file before starting the app.

## Database

1. Start PostgreSQL with Docker Compose:
   ```bash
   docker compose -f ../../docker-compose.yml up -d
   ```
2. Apply schema migrations:
   ```bash
   npm run migration:run
   ```
3. On first application start the trips module seeds two sample trips if the Lisbon prompt is not present.

Other migration helpers:

```bash
npm run migration:show
npm run migration:revert
```

## Running the Application

```bash
# development
npm run start

# watch mode
npm run start:dev

# production build
npm run build
npm run start:prod
```

## API Documentation

Swagger UI is available once the server is running:

- http://localhost:3000/docs

It includes schemas for status checks and the trips domain (list, detail, creation).

## Testing

```bash
npm run test         # unit tests
npm run test:watch   # watch mode
npm run test:cov     # coverage report
npm run test:e2e     # e2e tests scaffold
```

## Project Highlights

- Global validation via `ValidationPipe` with automatic DTO transformation.
- TypeORM with explicit migrations and repository-backed services.
- Automatic data seed for demo trips (`TripsSeedService`).
- Swagger annotations on controllers, DTOs, and view models.

## Troubleshooting

- Ensure the database is reachable before running migrations or starting the app.
- If migrations fail due to missing extensions, verify the PostgreSQL role can create the `uuid-ossp` extension.
