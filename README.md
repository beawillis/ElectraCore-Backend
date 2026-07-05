# ElectraCore Backend

AI-powered smart transformer monitoring and protection backend for real-time
IoT telemetry ingestion, transformer health assessment, alerting, notification
delivery, and dashboard/mobile API support.

ElectraCore is designed for low-cost distribution transformer monitoring using
ESP32-based edge devices. The backend receives sensor data over MQTT or REST,
validates and stores readings, calculates transformer health, detects unsafe
conditions, broadcasts live updates, and exposes secure APIs for supervision
applications.

## Project Status

The backend currently provides a production-style monitoring and protection
foundation with a placeholder ML layer.

- Rule-based protection is active.
- Health scoring and alerts are implemented.
- MQTT, REST, Socket.IO, MongoDB, JWT auth, notifications, and schedulers are wired.
- ML endpoints are available, but currently return baseline rule-based risk
  results until enough real sensor history is collected for training.

## Core Capabilities

- Real-time transformer sensor ingestion over MQTT and HTTP
- MongoDB persistence for devices, transformers, readings, alerts, predictions,
  and notifications
- JWT authentication and role-based authorization
- Transformer health scoring
- Rule-based fault detection and protection triggers
- Alert lifecycle management: active, acknowledged, resolved
- Email and MQTT/SMS-style notification queueing
- Socket.IO live dashboard updates
- Dashboard analytics and trend endpoints
- ML placeholder endpoints for future trained anomaly detection

## Monitored Parameters

The system currently supports these transformer and environment readings:

- Oil temperature
- Load current
- AC voltage
- Oil level from a digital float switch
- Ambient temperature
- Relative humidity

Oil level is stored as a digital state:

- `1`, `true`, `"HIGH"` -> `"high"`
- `0`, `false`, `"LOW"` -> `"low"`

## Faults Detected

The current protection layer detects:

- Overheating
- Overloading
- Overvoltage
- Undervoltage
- Low transformer oil
- Missing sensor readings
- Communication loss

Critical alerts can publish a protection command to the device relay topic.

## Technology Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- MQTT
- Socket.IO
- JWT
- Nodemailer
- Resend
- node-cron
- Python placeholders for future ML training/inference

## Architecture

```text
ESP32 / edge device
    |
    | MQTT: transformers/:id/sensor
    | HTTP: /api/sensors/ingest
    v
Sensor ingestion service
    |
    | validate + normalize payload
    | calculate health score
    | persist reading
    | evaluate protection rules
    v
MongoDB + Alert/Notification services
    |
    | Socket.IO updates
    | Email/SMS queue
    | Relay protection MQTT commands
    v
Web dashboard / mobile app / operator tools
```

## Project Structure

```text
src/
  app.js                    Express app and route registration
  server.js                 HTTP, Socket.IO, MQTT, scheduler bootstrap
  config/                   Database, MQTT, Socket.IO, scheduler config
  controllers/              HTTP request handlers
  jobs/                     Scheduled background jobs
  middleware/               Auth, roles, and error handling
  ml/                       Baseline predictor and future ML placeholders
  models/                   Mongoose schemas
  mqtt/                     MQTT subscriber, publisher, and topic handling
  routes/                   REST API route definitions
  services/                 Business logic
  sockets/                  Socket.IO room/event handlers
  utils/                    Health, alert, feature, anomaly, forecast helpers
  validators/               Sensor payload validation and normalization
test/                       Node.js test suite
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB instance
- MQTT broker
- npm

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root.

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/electracore
MQTT_URL=mqtt://localhost:1883

JWT_SECRET=replace-with-a-secure-secret
JWT_EXPIRES_IN=7d

# Preferred email provider for alert delivery
RESEND_API_KEY=re_xxxxxxxxx
RESEND_FROM_EMAIL=ElectraCore <alerts@yourdomain.com>
ADMIN_EMAIL=operator@example.com

# Optional SMTP fallback if Resend is not configured
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=alerts@example.com
EMAIL_PASS=replace-with-email-password

ADMIN_PHONE=+000000000000
```

`MONGODB_URI` is also supported as an alternative to `MONGO_URI`.

For Resend email delivery, create an API key and use a verified sender/domain.
If `RESEND_API_KEY` is missing, the backend falls back to SMTP settings.

### Run The Backend

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

On Windows PowerShell, if script execution blocks `npm`, use:

```bash
npm.cmd test
```

## Authentication And Roles

The backend uses JWT authentication. Roles are normalized to lowercase:

- `admin`
- `engineer`
- `operator`

Protected endpoints require:

```http
Authorization: Bearer <token>
```

## REST API Overview

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
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
