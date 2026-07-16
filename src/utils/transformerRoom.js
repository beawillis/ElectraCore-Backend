exports.getTransformerRoomNames = (transformer) => {
  const rooms = new Set();

  if (!transformer) {
    return [];
  }

  if (transformer.transformerId) {
    rooms.add(transformer.transformerId);
  }

  if (transformer._id) {
    rooms.add(transformer._id.toString());
  }

  return Array.from(rooms);
};
