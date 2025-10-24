# Scenario Tool: AI-Supported Interactive Scenarios

The "Scenario Tool" is a digital application developed by Sundsvall Municipality in Sweden to engage young people in meaningful discussions about life choices and their consequences. The tool, called "Med livet som insats" (With Life at Stake), uses AI technology to create dynamic, interactive scenarios that adapt in real-time based on the choices made by participating youth groups.

## Purpose and Concept

The tool aims to help young people navigate the pressures of modern life by allowing them to explore different life paths and their outcomes in a safe environment. Through these AI-driven scenarios, participants can:

- Experience consequences of various decisions without real-life repercussions
- Test different approaches to complex social situations
- Build decision-making skills and self-confidence

## Implementation

Each scenario session is led by a trained adult facilitator who guides the discussion. The process includes:

- Introducing a fictional scenario to the group
- Presenting multiple choice options
- Using AI to dynamically adapt the story based on group decisions
- Facilitating reflection on the outcomes

## Technical Solution and Accessibility

The tool is built using:

- Sundsvall's open web application framework
- The municipality's open AI platform (Eneo)
- OIDC authentication against the municipality's central IDP

The system is designed with safety measures to address the sensitive nature of some topics. It requires proper training for facilitators and cannot be used by young people independently. The modular design allows for additional scenarios to be added over time, making it adaptable for various educational purposes.
The entire solution is available for implementation by any municipality.

---

## Utveckling

### APIer som används

Dessa APIer används i projektet, applikationsanvändaren i WSO2 måste prenumerera på dessa. Systemet utgår ifrån /backend/api-config.ts där dessa står specificerade.

| API             | Version |
| --------------- | ------: |
| SimulatorServer |     2.0 |
| Eneo-Sundsvall  |     1.0 |

### Krav

- Node >= 20 LTS
- Yarn

### Steg för steg

1. Installera dependencies för både `backend`, `frontend` och `admin`

```
cd frontend
yarn install

cd backend
yarn install

cd admin
yarn install
```

2. Skapa .env-fil för `frontend`

```
cd frontend
cp .env-example .env
```

Redigera `.env` för behov, för utveckling bör exempelvärdet fungera.

3. Skapa .env-fil för `admin`

```
cd admin
cp .env-example .env
```

Redigera `.env` för behov, för utveckling bör exempelvärdet fungera.

4. Skapa .env-fil för `backend`

```
cd backend
cp .env.example.local .env.development.local
cp .env.example.local .env.test.local
```

redigera `.env.development.local` för behov. URLer, nycklar och cert behöver fyllas i korrekt.

- `CLIENT_KEY` och `CLIENT_SECRET` behövs för att prata med api gateway
- `AZURE_REGION` och `AZURE_SUBSCRIPTION_KEY` behövs för att använda talsyntes
- `SAML_ENTRY_SSO` behöver pekas till en SAML IDP
- `SAML_IDP_PUBLIC_CERT` ska stämma överens med IDPens cert
- `SAML_PRIVATE_KEY` och `SAML_PUBLIC_KEY` behöver bara fyllas i korrekt om man kör mot en riktig IDP

5. Initiera databas för backend

```
cd backend
yarn prisma:generate
yarn prisma:migrate
```

6. Synca datamodeller för api:er

   Se till att README och /backend/src/config/api-config.ts matchar och justera utefter de api:er som önskas användas.

   - För backend, i /backend kör `yarn generate:contracts` för att få ned de senaste datamodellerna för samtliga api:er
     -- Justera om så behövs utifrån de uppdaterade modellerna

   - För frontend, se till att backend är igång (`yarn dev`), i /frontend kör `yarn generate:contracts` för att synca backend med frontend
     -- Justera om så behövs utifrån de uppdaterade modellerna

### Språkstöd

För språkstöd används [next-i18next](https://github.com/i18next/next-i18next).

Placera dina språkfiler i `frontend/public/locales/<locale>/<namespace>.json`.

För ytterligare information om språkstöd i `admin` se [Dokumentation om Admin](./admin/README.md)

För att det ska fungera med **Next.js** och **SSR** måste du skicka med språkdatat till ServerSideProps.
Det gör du genom att lägga till följande till dina page-komponenter (behövs ej i subkomponenter).

```
export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, [<namespaces>])),
  },
});
```

För att lägga till ett ytterligare spåk, skapa en mapp med språkets namn, och lägg sedan till språket i `next-i18next.config.js`.

**Exempel för tyska:**
Skapa `frontend/public/locales/de/common.json`.
Ändra next-i18next.config.js:

```
module.exports = {
  i18n: {
    defaultLocale: 'sv',
    locales: ['sv', 'de'],
  },
 ...
};
```

Som hjälp i VSCode rekommenderas [i18n Ally](https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally).

### Testning av frontend med Cypress

För testning av frontend används Cypress. När du ska skriva tester i denna app krävs det att frontend startas med
`yarn dev:test`
