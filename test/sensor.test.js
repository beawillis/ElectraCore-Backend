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
