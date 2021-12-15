const os = {
  ctrl: process.platform === "win32" ? "Ctrl" : "Command",
  // alt, shift are needed
  windowPosition: (bounds, size) => {
    return {
      x: bounds.x - size.width / 2,
      y: process.platform === "win32" ? bounds.y - size.height : bounds.y,
    };
  },
};

module.exports = os;
