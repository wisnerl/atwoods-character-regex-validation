# Regex Validator Tool

A small HTTP service that exposes a regex validation tool suitable for use as an external tool integration.

## Endpoints

- `GET /` – Health check.
- `GET /.well-known/opal-tools.json` – Discovery document describing the `regexValidator` tool.
- `POST /tools/validate-regex` – Validate a string against a regular expression.

### Request Body

```json
{
  "pattern": "^foo.*bar$",
  "testString": "foobarbaz",
  "flags": "i"
}
```

### Response Body

```json
{
  "isValidPattern": true,
  "isMatch": false
}
```

## Development

```bash
npm install
npm run dev
```

## Build & Run

```bash
npm run build
npm start
```

## Deploying on Render

Render reads `render.yaml`:

- **Build Command:** `npm run build`
- **Start Command:** `npm start`
