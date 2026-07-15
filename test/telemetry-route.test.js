const test = require("node:test");
const assert = require("node:assert/strict");

const app = require("../src/app");
const sensorService = require("../src/services/sensorService");

test("accepts legacy telemetry POST at /api/v1/device/telemetry", async () => {
  const originalIngest = sensorService.ingest;
  sensorService.ingest = async (payload) => ({
    success: true,
    received: payload
  });

  const server = app.listen(0);

  try {
    await new Promise((resolve) => server.once("listening", resolve));

    const port = server.address().port;
    const response = await fetch(`http://127.0.0.1:${port}/api/v1/device/telemetry`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        transformer: "507f1f77bcf86cd799439011",
        device: "507f1f77bcf86cd799439012",
        oilTemperature: 80,
        voltage: 220,
        current: 30
      })
    });

    assert.equal(response.status, 201);

    const body = await response.json();
    assert.equal(body.success, true);
    assert.equal(body.message, "Sensor data received");
  } finally {
    sensorService.ingest = originalIngest;
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
});
