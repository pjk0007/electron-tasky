const path = require("path");
const electron = require("electron");
const TimerTray = require("./app/timer_tray");
const MainWindow = require("./app/main_window");
const { app, BrowserWindow } = electron;

let mainWindow;
let tray;

app.on("ready", () => {
  mainWindow = new MainWindow(`file://${__dirname}/src/index.html`);

  if (process.platform === "win32") {
    mainWindow.setSkipTaskbar(true);
  } else {
    app.dock.hide();
  }

  const iconName =
    process.platform === "win32" ? "windows-icon@2x.png" : "iconTemplate.png";
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
  tray = new TimerTray(iconPath, mainWindow);
});
