const test = require("node:test");
const assert = require("node:assert/strict");

const service = require("../src/services/sensorService");

test("exposes a latest-by-transformer lookup helper", async () => {
  assert.equal(typeof service.getLatestByTransformer, "function");
});
