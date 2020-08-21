const {app, BrowserWindow} = require('electron');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 980,
        height: 720,
        show: false,
        webPreferences: {
          nodeIntegration: true,
          enableRemoteModule: true
        }
    });
    mainWindow.loadURL("http://localhost:5000");

    mainWindow.removeMenu();
    mainWindow.setResizable(false);
    mainWindow.on('ready-to-show', () => {
      mainWindow.show();
      mainWindow.openDevTools({mode: 'undocked'})
    })
    mainWindow.on('closed', () => {
      mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});