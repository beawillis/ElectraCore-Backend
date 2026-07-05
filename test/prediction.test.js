const test = require("node:test");
const assert = require("node:assert/strict");

const predictor = require("../src/ml/predictor");

test("baseline predictor marks high-risk conditions critical", () => {
  const result = predictor.predict({
    avgTemp: 90,
    avgCurrent: 120,
    avgVoltage: 270,
    lowOilDetected: true
  });

  assert.equal(result.label, "critical");
  assert.ok(result.risk > 70);
  assert.equal(result.mlEnabled, false);
  assert.equal(result.modelType, "baseline_rules");
});

test("baseline predictor marks safe conditions healthy", () => {
  const result = predictor.predict({
    avgTemp: 50,
    avgCurrent: 30,
    avgVoltage: 220,
    lowOilDetected: false
  });

  assert.equal(result.label, "healthy");
  assert.equal(result.risk, 0);
});
