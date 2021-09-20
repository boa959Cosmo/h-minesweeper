const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
	width: 1000,
	height: 1000,
	frame: true,
	transparent: true,
	webPreferences: {
		preload: path.join(__dirname, 'preload.js'),
		nodeIntegration: true,
		contextIsolation: false,
	}
  })

  win.loadFile('./renderer/start/start.html')
  win.loadUrl('./renderer/game/game.html')
  win.webContents.openDevTools()
}

app.whenReady().then(() => {
	createWindow()
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