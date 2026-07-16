const test = require("node:test");
const assert = require("node:assert/strict");

const { getTransformerRoomNames } = require("../src/utils/transformerRoom");

test("includes both the human-readable transformer id and its object id as socket rooms", () => {
  const rooms = getTransformerRoomNames({
    _id: "507f1f77bcf86cd799439011",
    transformerId: "EC001"
  });

  assert.deepEqual(rooms, ["EC001", "507f1f77bcf86cd799439011"]);
});
