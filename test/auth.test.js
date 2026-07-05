const test = require("node:test");
const assert = require("node:assert/strict");

const roles = require("../src/middleware/roleMiddleware");

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
