const test = require("node:test");
const assert = require("node:assert/strict");

const reportsRouter = require("../src/routes/reportsRoutes");

test("reports router exposes a GET / handler", () => {
  const routePaths = reportsRouter.stack
    .filter((layer) => layer.route)
    .map((layer) => layer.route.path);

  assert.ok(routePaths.includes("/"));
});
