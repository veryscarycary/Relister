const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function createNewPosting(postInfo, selectedApp) {
  try {
    const { stdout, stderr } = await exec(
      `(cd ${__dirname}/../.. && \
          env POST_JSON='${JSON.stringify(postInfo)}' \
          npm run create-${selectedApp})`
    );
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
  } catch (err) {
    console.error(err);
  }
}

async function runFB() {
  try {
    const { stdout, stderr } = await exec(`(cd ${__dirname} && npm run fb)`);
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
  } catch (err) {
    console.error(err);
  }
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

// const filename = `${app.getPath('userData')}/content.txt`;
// const loadContent = () => {
//   return fs.existsSync(filename) ? fs.readFileSync(filename, 'utf8') : '';
// }

// const saveContent = (content) => {
//   fs.writeFileSync(filename, content, 'utf8');
// }

ipcMain.on('createNewPostingCL', async (e, postInfo) => {
  console.log(postInfo);
  await createNewPosting(postInfo, 'cl');
});

ipcMain.on('createNewPostingFB', async (e, postInfo) => {
  console.log(postInfo);
  await createNewPosting(postInfo, 'fb');
});

// ipcMain.handle("loadContent", (e) => {
//   return loadContent();
// });

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    backgroundColor: '#263238',
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
