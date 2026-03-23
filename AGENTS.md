# AGENTS.md

This document defines how an AI assistant should work in this repository. Treat these instructions as mandatory unless the user explicitly says otherwise.

The AI assistant must read and follow all skill files in .agents/skills/ before starting work.

## Purpose

This project is a scenario system with three main parts:

- `backend/`: Express + TypeScript + Prisma API.
- `frontend/`: public scenario application in Next.js.
- `admin/`: administration interface in Next.js.

The solution uses generated contracts between system parts and contains sensitive integration points for external APIs and authentication. Work conservatively with security, data minimization, and information exposure.

## Core Rules

### Secrets and Sensitive Data

Sensitive data must never be stored in code. It must be handled through `.env` files or other secure configuration mechanisms.

This includes, but is not limited to:

- API keys
- passwords
- certificates and key material
- email addresses
- personal data
- tokens, session secrets, and other credentials

Never do any of the following:

- hardcode secrets in `ts`, `tsx`, `js`, `json`, `yml`, tests, or documentation
- place real secrets in example data, fixtures, snapshots, or seed files
- move values from `.env` into frontend code unless they are explicitly meant to be public
- log sensitive values in backend, frontend, tests, or CI

If a new configuration key is needed:

1. add it to the appropriate example `.env` file
2. load it through the project's existing env pattern
3. document briefly what it is used for
4. expose it to the client only if absolutely necessary

### Data Minimization

Never send more data from backend to frontend than the UI actually needs.

Never store more information in the database than what is required for functionality, traceability, or legal requirements.

Practical consequences:

- return selected fields instead of whole objects when that is enough
- avoid sending internal metadata fields, tokens, internal ids, debug data, or relation data that is not used
- do not store duplicated, temporary, or derived data without a clear reason
- do not introduce new personal data fields without explicit justification
- when in doubt: prefer less data over more

### Frontend Exposure

Frontend and admin should receive only the minimum information required to render the page or complete the user flow.

Especially important:

- do not send internal backend models directly to the client
- create DTOs or mapping layers when backend objects contain more than the client needs
- do not expose administrative or security-related fields in public endpoints
- do not use `NEXT_PUBLIC_*` for anything that is not intended to be public

## AI Assistant Workflow

### 1. Understand the change before coding

Before changing code, identify:

- which part is affected: `backend`, `frontend`, or `admin`
- whether data contracts are affected
- whether the change can impact sensitive data, API exposure, or database schema
- which tests or checks should reasonably be run

Do not make broad refactors without a real need. Keep changes small, traceable, and consistent with the existing structure.

### 2. Preserve architecture and conventions

Follow existing patterns in the repository instead of introducing new abstractions.

Pay particular attention to:

- contract generation through `generate:contracts`
- Prisma workflows in `backend`
- Next.js structure in `frontend` and `admin`
- existing lint and test configuration
- CODEOWNERS: `@Sundsvallskommun/web-developers`

### 3. Change only what is necessary

Avoid doing these at the same time:

- changing naming style
- moving files without a strong reason
- reformatting large blocks of code without a functional reason
- editing generated files manually when they should be regenerated instead

If a generated contract or generated client is wrong:

1. change the source
2. run the correct generator
3. inspect the diff

## Repository Overview

### `backend/`

- TypeScript + Express + Routing Controllers
- Prisma is used for the database
- development via `yarn dev`
- important scripts:
  - `yarn dev`
  - `yarn build`
  - `yarn lint`
  - `yarn type-check`
  - `yarn prisma:generate`
  - `yarn prisma:migrate`
  - `yarn prisma:new-migrate`
  - `yarn generate:contracts`

### `frontend/`

- Next.js 15 + React 19
- Cypress
- internationalization via locales
- Design components from `@sk-web-gui`
- Icons from `Lucide icons`
- important scripts:
  - `yarn dev`
  - `yarn dev:test`
  - `yarn build`
  - `yarn build:test`
  - `yarn lint`
  - `yarn type-check`
  - `yarn cypress:headless`
  - `yarn generate:contracts`

### `admin/`

- Next.js 15 + React 19
- resource-oriented admin with generated API services
- internationalization via locales
- Design components from `@sk-web-gui`
- Icons from `Lucide icons`
- important scripts:
  - `yarn dev`
  - `yarn build`
  - `yarn lint`
  - `yarn generate:contracts`

## Environment Files

The project uses local env files and they are intentionally gitignored in each app.

Use the existing examples:

- `frontend/.env-example`
- `admin/.env-example`
- `backend/.env.example.local`

Backend uses, among others:

- `.env.development.local`
- `.env.test.local`
- `.env.production.local`

The AI assistant must:

- never write real secrets into the repository
- never copy content from real `.env` files into code or documentation
- prefer referring to variable names instead of values
- sanitize examples and log excerpts before showing them

## Backend Rules

### API Design

- expose the smallest possible DTO to the client
- validate input clearly
- do not return internal implementation details
- keep auth, session, and integration data on the server side

### Database

- every new Prisma field must be justified by a real requirement
- do not store data "just in case"
- avoid storing sensitive personal data if the feature can work without it
- if storing sensitive data is required, minimize fields, lifetime, and access

### Logging

- do not log personal data, tokens, certificates, headers with credentials, or full payloads with sensitive content
- use structured, restrained logging

## Frontend and Admin Rules

- assume all client-side code is public
- never place secrets in client code, `NEXT_PUBLIC_*`, fixtures, or local JSON files
- consume only the fields that are actually needed
- avoid building UI that accidentally shows internal technical fields
- for new API calls: verify that the backend response is trimmed to what is needed

## Testing and Verification

Always update test and/or write new test when needed.
Run relevant checks for the part you change.

Minimum level:

- backend: `yarn lint` and `yarn type-check`
- frontend: `yarn lint` and `yarn type-check`, plus relevant Cypress tests for UI or flow changes
- admin: `yarn lint`, and build or other relevant checks for larger changes

If you cannot run verification, explicitly say so and explain why.

## CI and Workflow

This repository has Cypress workflows for both `frontend` and `admin` on PRs to `develop` and `main`.

Take this into account when changing:

- `frontend/src/**`
- `frontend/cypress/**`
- `admin/src/**`
- `admin/cypress/**`

Avoid breaking these flows by:

- keeping env dependencies explicit
- not introducing hidden runtime requirements
- updating tests when user behavior changes

## Contracts and Generated Code

When API contracts change:

1. update the source in backend
2. regenerate backend contracts if needed
3. regenerate frontend/admin clients where needed
4. verify that only expected diffs appear

Do not manually edit generated artifacts when the generator is the correct path.

## Definition of Done for the AI Assistant

A change is not done until all of the following are true:

- the solution follows the repository's existing patterns
- no secrets or personal data were added to code or documentation
- backend does not send unnecessary data to the client
- the database is not expanded with unnecessary information
- relevant tests and documentation are updated
- relevant tests, lint, and type-checks were run, or blocking reasons were reported
- any new env variables were documented without exposing real values
- all files are formatted according to Prettier rules

## Priority Order When Unsure

If you must choose between speed and quality, choose quality.

If you must choose between convenience and security, choose security.

If you must choose between more data and less data, choose less data.
