const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { setEnvValue, getEnvValue } = require('./setEnvValue.js');

async function createNewPosting(postInfo, selectedApp) {
  try {
    const { stdout, stderr } = await exec(
      `(cd ${__dirname}/../.. && \
          POST_JSON=$(cat <<'EOF'
${JSON.stringify(postInfo)}
EOF
) npm run create-${selectedApp})` // the whitespace is important for the EOF here
    );
    console.log(`${selectedApp} createNewPosting STDOUT: ${stdout}`);
    console.log(`${selectedApp} createNewPosting STDERR: ${stderr}`);
    return { stdout, stderr };
  } catch (err) {
    console.error(`${selectedApp} createNewPosting ERR: ${err}`);
    throw new Error(`${selectedApp}: ${err.message}`);
  }
}

async function relistActivePostings(priceDrop, selectedApp) {
  try {
    const { stdout, stderr } = await exec(
      `(cd ${__dirname}/../.. && \
          env PRICE_DROP="${priceDrop}" \
          npm run relist-${selectedApp})`
    );
    console.log(`${selectedApp} relistActivePostings STDOUT: ${stdout}`);
    console.log(`${selectedApp} relistActivePostings STDERR: ${stderr}`);
    return { stdout, stderr };
  } catch (err) {
    console.error(`${selectedApp} relistActivePostings ERR: ${err}`);
    throw new Error(`${selectedApp}: ${err.message}`);
  }
}

async function saveCredentials(credentials, app) {
  const { username, password } = credentials;

  switch (app) {
    case 'cl':
      setEnvValue('USERNAME_CL', username);
      setEnvValue('PASSWORD_CL', password);
      break;
    case 'fb':
      setEnvValue('USERNAME_FB', username);
      setEnvValue('PASSWORD_FB', password);
      break;
  }
}

async function saveFormValue(fieldName, fieldValue) {
  switch (fieldName) {
    case 'locationCL':
      setEnvValue('RELISTER_LOCATION_CL', fieldValue);
      break;
    case 'locationFB':
      setEnvValue('RELISTER_LOCATION_FB', fieldValue);
      break;
    case 'manufacturer':
      setEnvValue('RELISTER_MANUFACTURER', fieldValue);
      break;
    case 'name':
      setEnvValue('RELISTER_NAME', fieldValue);
      break;
    case 'neighborhood':
      setEnvValue('RELISTER_NEIGHBORHOOD', fieldValue);
      break;
    case 'phoneNumber':
      setEnvValue('RELISTER_PHONE_NUMBER', fieldValue);
      break;
    case 'zipCode':
      setEnvValue('RELISTER_ZIP_CODE', fieldValue);
      break;
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

ipcMain.handle('createNewPostingCL', async (e, postInfo) => {
  console.log(postInfo);
  return createNewPosting(postInfo, 'cl');
});

ipcMain.handle('createNewPostingFB', async (e, postInfo) => {
  console.log(postInfo);
  return createNewPosting(postInfo, 'fb');
});

ipcMain.handle('relistActivePostingsCL', async (e, priceDrop) => {
  console.log(`Dropping price by ${priceDrop}`);
  return relistActivePostings(priceDrop, 'cl');
});

ipcMain.handle('relistActivePostingsFB', async (e, priceDrop) => {
  console.log(`Dropping price by ${priceDrop}`);
  return relistActivePostings(priceDrop, 'fb');
});

ipcMain.on('saveCredentialsCL', async (e, credentials) => {
  return saveCredentials(credentials, 'cl');
});

ipcMain.on('saveCredentialsFB', async (e, credentials) => {
  return saveCredentials(credentials, 'fb');
});

ipcMain.on('saveEnvValue', async (e, envName, envValue) => {
  return saveFormValue(envName, envValue);
});

ipcMain.handle('getSavedFormValues', async (e) => {
  return {
    RELISTER_LOCATION_CL: getEnvValue('RELISTER_LOCATION_CL'),
    RELISTER_LOCATION_FB: getEnvValue('RELISTER_LOCATION_FB'),
    RELISTER_MANUFACTURER: getEnvValue('RELISTER_MANUFACTURER'),
    RELISTER_NAME: getEnvValue('RELISTER_NAME'),
    RELISTER_NEIGHBORHOOD: getEnvValue('RELISTER_NEIGHBORHOOD'),
    RELISTER_PHONE_NUMBER: getEnvValue('RELISTER_PHONE_NUMBER'),
    RELISTER_ZIP_CODE: getEnvValue('RELISTER_ZIP_CODE'),
  };
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
