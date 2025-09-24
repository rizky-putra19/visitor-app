const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  login: (creds) => ipcRenderer.invoke("login", creds),
  checkinVisitor: (visitor) => ipcRenderer.invoke("checkinVisitor", visitor),
  searchVisitor: (name) => ipcRenderer.invoke("searchVisitor", name),
  checkoutVisitor: (id) => ipcRenderer.invoke("checkoutVisitor", id),
});
