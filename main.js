const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const { searchVisitor, checkoutVisitor, checkinVisitor } = require("./src/services/visitorService");
const { loginUser } = require("./src/services/userService");

app.commandLine.appendSwitch("enable-logging");
app.commandLine.appendSwitch("ignore-gpu-blocklist");
app.commandLine.appendSwitch("use-gl", "swiftshader"); // software GL
app.commandLine.appendSwitch("disable-software-rasterizer");

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            sandbox: false,
            nodeIntegration: false,
            contextIsolation: true,
            webSecurity: true,
            devTools: true,
        }
    });

    win.loadFile("pages/login.html");
}

app.on("ready", createWindow);

// 🔹 IPC Handler untuk Login
ipcMain.handle("login", async (event, creds) => {
    return await loginUser(creds.username, creds.password);
});

// 🔹 IPC Handler untuk Visitor
ipcMain.handle("checkinVisitor", async (event, visitor) => {
    return await checkinVisitor(visitor);
});

ipcMain.handle("searchVisitor", async (event, name) => {
    return await searchVisitor(name);
});

ipcMain.handle("checkoutVisitor", async (event, id) => {
    return await checkoutVisitor(id);
});
