const electron = require("electron");
const { app, Tray, Menu } = electron;
const os = require("./os");

class TimerTray extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath);

    this.mainWindow = mainWindow;

    this.setToolTip("Timer App");
    this.on("click", this.onClick.bind(this));
    this.on("right-click", this.onRightClick.bind(this));
  }

  onClick(event, bounds) {
    const size = this.mainWindow.getBounds();
    const { height, width } = size;
    const { x, y } = os.windowPosition(bounds, size);
    this.mainWindow.setBounds({
      x,
      y,
      height,
      width,
    });
    this.mainWindow.show();
  }

  onRightClick() {
    const menuConfig = Menu.buildFromTemplate([
      {
        label: "Quit",
        click: () => app.quit(),
      },
    ]);

    this.popUpContextMenu(menuConfig);
  }
}

module.exports = TimerTray;
