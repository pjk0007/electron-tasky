const electron = require("electron");
const { Tray } = electron;
const os = require("./os");

class TimerTray extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath);

    this.mainWindow = mainWindow;

    this.setToolTip("Timer App");
    this.on("click", this.onClick.bind(this));
  }

  onClick(event, bounds) {
    const size = this.mainWindow.getBounds();
    const { height, width } = size;
    const { x, y } = os.windowPosition(bounds, size);

    if (this.mainWindow.isVisible()) {
      this.mainWindow.hide();
    } else {
      this.mainWindow.setBounds({
        x,
        y,
        height,
        width,
      });
      this.mainWindow.show();
    }
  }
}

module.exports = TimerTray;