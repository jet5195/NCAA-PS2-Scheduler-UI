//run this to build
//npx electron-packager . --overwrite

const {
    app,
    BrowserWindow
  } = require('electron')
  const url = require("url");
  const path = require("path");
  
  let appWindow
  var kill  = require('tree-kill');
  
  function initWindow() {
    appWindow = new BrowserWindow({
      width: 1000,
      height: 800,
      title: 'NCAA PS2 Scheduler',
      autoHideMenuBar: true,
      icon: app.getAppPath() + '\\ncaa_06_icon.ico',
      webPreferences: {
        nodeIntegration: true
      }
    })

    var jarPath = app.getAppPath() + '\\ncaa-06-scheduler.jar';
    var child = require('child_process').spawn(
    'java', ['-jar', jarPath, '']
  );
  
    // Electron Build Path
    appWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, `/dist/index.html`),
        protocol: "file:",
        slashes: true
      })
    );
  
    appWindow.on('page-title-updated', function(e) {
        e.preventDefault()
      });
    // Initialize the DevTools.
    //appWindow.webContents.openDevTools()
  
    appWindow.on('closed', function () {
    kill(child.pid);
      appWindow = null
    })
  }
  
  app.on('ready', initWindow)
  
  // Close when all windows are closed.
  app.on('window-all-closed', function () {
  
    // On macOS specific close process
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', function () {
    if (win === null) {
      initWindow()
    }
  })