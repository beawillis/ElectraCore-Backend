const test = require("node:test");
const assert = require("node:assert/strict");

const { validateRegisterInput, validateTransformerInput, validateDeviceInput } = require("../src/validators/requestValidator");
const { passwordResetTemplate, alertTemplate } = require("../src/utils/emailTemplates");

test("rejects registration payloads missing required fields", () => {
  const result = validateRegisterInput({
    name: "Ada",
    email: "ada@example.com"
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.some((error) => error.field === "password"));
});

test("accepts valid transformer registration data", () => {
  const result = validateTransformerInput({
    transformerId: "TR-100",
    name: "North Feeder",
    location: "Block A",
    capacity: 250
  });

  assert.equal(result.isValid, true);
  assert.deepEqual(result.errors, []);
});

test("rejects device registration payloads without a transformer reference", () => {
  const result = validateDeviceInput({
    deviceId: "DEV-200",
    name: "Node 1"
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.some((error) => error.field === "transformer"));
});

test("builds professional email templates for password reset and alerts", () => {
  const reset = passwordResetTemplate("https://example.com/reset");
  const alert = alertTemplate("High temperature", "Transformer 1 exceeded threshold");

  assert.match(reset.subject, /Reset your .*password/i);
  assert.match(alert.subject, /ElectraCore Alert/i);
  assert.ok(reset.html.includes("https://example.com/reset"));
  assert.ok(alert.text.includes("Transformer 1"));
});
