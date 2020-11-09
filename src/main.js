'use strict';

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;

// モジュールの読み込み
const electron = require('electron');
const {app} = electron;
const {BrowserWindow} = electron;

// 全ウィンドウ終了時の処理
app.on('window-all-closed', () => app.quit());

// 準備が整った際の処理
app.on('ready', () => {
    const win = new BrowserWindow({
        width: 600, height: 470, webPreferences: {
            nodeIntegration: true, webviewTag: true
        }});
    const url = `file://${__dirname}/index.html`;
    win.loadURL(url);
});
