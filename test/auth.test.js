const test = require("node:test");
const assert = require("node:assert/strict");

const roles = require("../src/middleware/roleMiddleware");
const { buildDashboardScopeQueries } = require("../src/utils/dashboardScope");

test("allows users with normalized lowercase roles", () => {
  const middleware = roles("admin", "engineer");
  let nextCalled = false;

  middleware(
    { user: { role: "engineer" } },
    {},
    () => {
      nextCalled = true;
    }
  );

  assert.equal(nextCalled, true);
});

test("rejects users outside allowed roles", () => {
  const middleware = roles("admin");
  let statusCode;
  let body;

  middleware(
    { user: { role: "operator" } },
    {
      status(code) {
        statusCode = code;
        return {
          json(payload) {
            body = payload;
          }
        };
      }
    },
    () => {}
  );

  assert.equal(statusCode, 403);
  assert.equal(body.success, false);
});

test("builds scoped dashboard queries for transformer and device filters", () => {
  const scope = buildDashboardScopeQueries({
    transformerId: "507f1f77bcf86cd799439011",
    deviceId: "507f1f77bcf86cd799439012"
  });

  assert.equal(scope.transformerQuery._id.toString(), "507f1f77bcf86cd799439011");
  assert.equal(scope.deviceQuery._id.toString(), "507f1f77bcf86cd799439012");
  assert.equal(scope.sensorQuery.transformer.toString(), "507f1f77bcf86cd799439011");
  assert.equal(scope.sensorQuery.device.toString(), "507f1f77bcf86cd799439012");
});
