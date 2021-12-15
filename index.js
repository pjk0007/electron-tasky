const path = require("path");
const electron = require("electron");

const os = {
  ctrl: process.platform === "win32" ? "Ctrl" : "Command",
  // alt, shift are needed
  windowPosition: {
    x: x - width / 2,
    y: process.platform === "win32" ? y - height : y,
  },
};

const { app, BrowserWindow, Tray } = electron;

let mainWindow;
let tray;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 300,
    height: 500,
    frame: false,
    resizable: false,
    show: false,
  });
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);

  const iconName =
    process.platform === "win32" ? "windows-icon@2x.png" : "iconTemplate.png";
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);

  tray = new Tray(iconPath);
  tray.on("click", (event, bounds) => {
    // Click event bounds
    const { x, y } = bounds;

    // Window height and width
    const { height, width } = mainWindow.getBounds();

    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.setBounds({
        x: windowPosition.x,
        y: windowPosition.y,
        height,
        width,
      });
      mainWindow.show();
    }
  });
});
