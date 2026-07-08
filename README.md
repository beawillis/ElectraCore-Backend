# ElectraCore Backend

ElectraCore Backend is a production-style Node.js and Express API for smart transformer monitoring. It ingests telemetry from ESP32-based devices, evaluates transformer health, generates alerts, exposes dashboard analytics, and supports authenticated admin/operator/engineer workflows.

## What the backend does

- Receives sensor data over MQTT and REST
- Stores and queries transformers, devices, telemetry, alerts, and notifications
- Calculates health scores and protection rules
- Supports JWT-based authentication and role-based authorization
- Provides dashboard analytics and scoped stats for transformers/devices
- Includes Swagger docs, validation, logging, rate limiting, Docker support, and CI/CD workflows

## Current capabilities

- Real-time transformer monitoring
- Rule-based anomaly detection and alerting
- Notification delivery with email templates
- Socket.IO live updates
- Dashboard analytics and trends
- Pagination, search, filtering, and query-based list endpoints
- Dockerized deployment and GitHub Actions pipelines

## Technology stack

- Node.js
- Express.js
- MongoDB + Mongoose
- MQTT
- Socket.IO
- JWT
- Winston + Morgan
- Zod + Joi
- Swagger OpenAPI
- Docker + Docker Compose
- GitHub Actions

## Project structure

```text
src/
  app.js                    Express app and route registration
  server.js                 HTTP, Socket.IO, MQTT, scheduler bootstrap
  config/                   Database, MQTT, Socket.IO, scheduler config
  controllers/              HTTP request handlers
  jobs/                     Scheduled background jobs
  middleware/               Auth, roles, rate limiting, error handling
  ml/                       Baseline predictor and future ML placeholders
  models/                   Mongoose schemas
  mqtt/                     MQTT subscriber, publisher, and topic handling
  routes/                   REST API route definitions
  services/                 Business logic
  sockets/                  Socket.IO event handlers
  utils/                    Health, alert, query, email, logging helpers
  validators/               Request validation and schemas
  tests/                    Test suite (legacy layout remains under test/)
test/                       Node.js test suite
```

## Prerequisites

- Node.js 20+
- MongoDB instance
- MQTT broker
- Docker Desktop (optional, for container builds)
- npm

## Installation

```bash
npm install
```

## Environment variables

Create a `.env` file in the project root.

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/electracore
MQTT_URL=mqtt://localhost:1883

JWT_SECRET=replace-with-a-secure-secret
JWT_EXPIRES_IN=7d

FRONTEND_URL=http://localhost:3000
API_URL=http://localhost:5000

RESEND_API_KEY=
RESEND_FROM_EMAIL=ElectraCore <alerts@yourdomain.com>
ADMIN_EMAIL=operator@example.com

EMAIL_HOST=
EMAIL_PORT=587
EMAIL_USER=
EMAIL_PASS=

ADMIN_PHONE=+000000000000
NODE_ENV=development
```

`MONGODB_URI` is also supported as an alternative to `MONGO_URI`.

## Run locally

Development:

```bash
npm run dev
```

Production-style start:

```bash
npm start
```

Run tests:

```bash
npm test
```

## Docker

Build the image:

```bash
docker build -t electracore-backend .
```

Run the container:

```bash
docker run -p 5000:5000 --env-file .env electracore-backend
```

Run with Docker Compose:

```bash
docker compose up --build
```

Stop the stack:

```bash
docker compose down
```

## Swagger docs

Once the server is running, visit:

```text
http://localhost:5000/api-docs
```

## Authentication and roles

The backend uses JWT authentication. Roles are normalized to lowercase:

- `admin`
- `engineer`
- `operator`

Protected endpoints require:

```http
Authorization: Bearer <token>
```

## API overview

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/forgot-password
POST /api/auth/reset-password
GET  /api/auth/google
```

### Devices

```http
POST   /api/devices/register
GET    /api/devices
GET    /api/devices/:id
PUT    /api/devices/:id
DELETE /api/devices/:id
```

### Transformers

```http
POST   /api/transformers/register
POST   /api/transformers
GET    /api/transformers
GET    /api/transformers/:id
PUT    /api/transformers/:id
DELETE /api/transformers/:id
```

### Sensors

```http
POST /api/sensors/ingest
GET  /api/sensors
GET  /api/sensors/transformer/:id
```

### Dashboard

```http
GET /api/dashboard/stats
GET /api/dashboard/health
GET /api/dashboard/system-status
GET /api/dashboard/activity
GET /api/dashboard/trends
GET /api/dashboard/analytics/sensor-averages
GET /api/dashboard/analytics/transformer/:id
```

## Query support for list endpoints

The list APIs support:

- `page`
- `limit`
- `search`
- `sortBy`
- `sortOrder`
- `status`
- `role`
- `transformer`
- `device`
- `healthLevel`
- `startDate`
- `endDate`

Example:

```http
GET /api/transformers?page=1&limit=10&search=feeder&status=healthy
```

## CI/CD

GitHub Actions workflows are included:

- [.github/workflows/ci.yml](.github/workflows/ci.yml)
- [.github/workflows/cd.yml](.github/workflows/cd.yml)

For the CD workflow, add these repository secrets in GitHub:

- `DOCKER_USERNAME`
- `DOCKER_PASSWORD`

## Notes

- The project includes basic rate limiting and request-size limits.
- Logs are written to the `logs/` directory and to the console.
- The backend is ready for deployment on platforms such as Railway, Render, or a VPS.


### Alerts

```http
GET /api/alerts
PUT /api/alerts/:id/acknowledge
PUT /api/alerts/:id/resolve
```

### ML Placeholder

```http
GET /api/ml/status
GET /api/ml/fault-prediction/:id
```

## Sensor Payload Example

HTTP and MQTT ingestion use the same payload shape.

```json
{
  "transformer": "507f1f77bcf86cd799439011",
  "device": "507f1f77bcf86cd799439012",
  "oilTemperature": 72.5,
  "voltage": 224.8,
  "current": 31.2,
  "oilLevel": 1,
  "ambientTemperature": 28.4,
  "humidity": 61
}
```

Legacy firmware can send `temperature`; the backend normalizes it to
`oilTemperature`.

## MQTT Topics

### Inbound Telemetry

```text
transformers/+/sensor
```

The payload should match the sensor payload example above.

### Outbound Protection Command

```text
devices/:device/protection
```

Example command:

```json
{
  "action": "ISOLATE_RELAY",
  "reason": "TEMPERATURE",
  "alert": "alert-id"
}
```

### SMS/GSM Gateway Queue

```text
gsm/alerts
```

This topic is intended for an ESP32/SIM800L gateway or similar SMS delivery
device.

## Realtime Socket Events

The backend broadcasts:

- `transformer:update`
- `dashboard:update`

Clients can subscribe to transformer-specific rooms using:

- `subscribe_transformer`
- `unsubscribe_transformer`

Alert clients can join:

- `alerts:subscribe`

## ML Roadmap

The current ML implementation is intentionally a placeholder:

- `mlEnabled: false`
- `modelType: "baseline_rules"`
- predictions are based on deterministic risk scoring

Future workflow:

1. Collect real MongoDB sensor history.
2. Export readings to `src/ml/datasets/sensor_history.csv`.
3. Train an IsolationForest anomaly model in Colab or locally.
4. Save the trained model as `src/ml/models/anomaly_model.pkl`.
5. Update `src/ml/predict.py` to load the model.
6. Connect Node.js inference to the trained Python predictor.

Relay protection should remain rule-based even after ML is added. ML should be
used first for early warning, risk scoring, anomaly detection, and maintenance
recommendations.

## Testing

The project uses Node.js built-in tests.

```bash
npm test
```

Current tests cover:

- role authorization behavior
- sensor validation and normalization
- alert rule detection
- health scoring
- baseline prediction output

## Development Notes

- Keep device-facing ingestion strict and predictable.
- Treat MQTT and HTTP readings the same by routing both through the sensor
  service.
- Keep relay isolation based on deterministic protection rules.
- Do not train ML automatically on faulty data.
- Prefer real field data before enabling trained anomaly detection.

## License

This project currently uses the ISC license as defined in `package.json`.
