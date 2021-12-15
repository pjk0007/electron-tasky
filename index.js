const path = require("path");
const electron = require("electron");
const TimerTray = require("./app/timer_tray");
const { app, BrowserWindow } = electron;

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
  tray = new TimerTray(iconPath, mainWindow);
});
