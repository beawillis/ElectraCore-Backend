const test = require("node:test");
const assert = require("node:assert/strict");

const { validateAndNormalize } = require("../src/validators/sensorValidator");
const alertRules = require("../src/utils/alertRules");
const calculateHealth = require("../src/utils/calculateHealth");

test("normalizes legacy temperature to oilTemperature", () => {
  const payload = validateAndNormalize({
    transformer: "507f1f77bcf86cd799439011",
    device: "507f1f77bcf86cd799439012",
    temperature: 82,
    voltage: 220,
    current: 30,
    oilLevel: 1
  });

  assert.equal(payload.oilTemperature, 82);
  assert.equal(payload.oilLevel, "high");
  assert.equal(payload.temperature, undefined);
});

test("rejects invalid numeric sensor values", () => {
  assert.throws(
    () =>
      validateAndNormalize({
        transformer: "507f1f77bcf86cd799439011",
        device: "507f1f77bcf86cd799439012",
        oilTemperature: "hot"
      }),
    /oilTemperature must be a valid number/
  );
});

test("detects overheating, undervoltage, and sensor failure", () => {
  const alerts = alertRules({
    oilTemperature: 90,
    voltage: 160,
    current: 20
  });

  assert.ok(alerts.some((alert) => alert.type === "TEMPERATURE"));
  assert.ok(alerts.some((alert) => alert.type === "UNDERVOLTAGE"));
  assert.ok(alerts.some((alert) => alert.type === "SENSOR_FAILURE"));
});

test("calculates lower health for unsafe readings", () => {
  const score = calculateHealth({
    oilTemperature: 90,
    voltage: 270,
    current: 120,
    oilLevel: "low"
  });

  assert.equal(score, 0);
});

test("accepts firmware telemetry fields without crashing", () => {
  const payload = validateAndNormalize({
    deviceId: "EC001",
    transformerId: "507f1f77bcf86cd799439011",
    timestamp: "2000-01-01 00:00:00",
    transformerTemperature: 35.16,
    ambientTemperature: 28,
    humidity: 54,
    voltage: 0.08,
    current: 8.95,
    oilLevel: "high",
    healthScore: 73,
    condition: "WARNING",
    recommendation: "High Current"
  });

  assert.equal(payload.oilTemperature, 35.16);
  assert.equal(payload.device, "EC001");
  assert.equal(payload.transformer, "507f1f77bcf86cd799439011");
  assert.equal(payload.oilLevel, "high");
});
