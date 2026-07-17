const test = require("node:test");
const assert = require("node:assert/strict");

const sensorService = require("../src/services/sensorService");
const Transformer = require("../src/models/Transformer");

test("resolves an existing transformer by transformerId instead of creating a duplicate", async () => {
  const existingTransformer = {
    _id: "507f1f77bcf86cd799439011",
    transformerId: "507f1f77bcf86cd799439011",
    name: "Existing Transformer"
  };

  const originalFindOne = Transformer.findOne;
  const originalCreate = Transformer.create;
  const createCalls = [];

  Transformer.findOne = async () => existingTransformer;
  Transformer.create = async (doc) => {
    createCalls.push(doc);
    throw new Error("create should not be called for an existing transformer");
  };

  try {
    const resolved = await sensorService.resolveTransformerReference("507f1f77bcf86cd799439011");
    assert.equal(resolved, existingTransformer);
    assert.equal(createCalls.length, 0);
  } finally {
    Transformer.findOne = originalFindOne;
    Transformer.create = originalCreate;
  }
});
