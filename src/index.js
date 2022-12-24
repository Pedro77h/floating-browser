const { app, BrowserWindow, globalShortcut } = require('electron')
const url = require('./urls/url.json')

let win;

function createWindow () {
  win = new BrowserWindow({
    width: 640,
    height: 400,
    titleBarStyle: 'hidden',
    titleBarOverlay: 'hidden',
    alwaysOnTop: true,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
    }
  })

  win.loadURL(url.vite)
}

function toggleDevTools() {
  win.webContents.toggleDevTools()
}

function createShortcuts() {
  globalShortcut.register('CmdOrCtrl+J' , toggleDevTools)
}


app.whenReady().then(() => {
  createWindow()
  createShortcuts()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})