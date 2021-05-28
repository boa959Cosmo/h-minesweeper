const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
	width: 1600,
	height: 1200,
	frame: true,
	transparent: true,
	webPreferences: {
		preload: path.join(__dirname, 'preload.js'),
		nodeIntegration: true,
		contextIsolation: false,
	}
  })

  win.loadFile('./renderer/index.html')
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