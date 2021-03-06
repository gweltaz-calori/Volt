const { app, BrowserWindow } = require("electron");
const fs = require("fs");
const path = require("path");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 500,
    height: 500,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    resizable: true,
    show: false,
    icon: path.resolve(__dirname, "./build/icon.png"),

    backgroundColor: "#000000",
  });

  mainWindow.loadFile("index.html");
  mainWindow.setMenuBarVisibility(false);

  mainWindow.webContents.once("did-finish-load", () => {
    mainWindow.show();
    mainWindow.focus();
    mainWindow.webContents.toggleDevTools();
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
