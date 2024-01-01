let mainWin: Electron.BrowserWindow | null = null

export function getMainWin() {
  return mainWin
}

export function setMainWin(win: Electron.BrowserWindow | null) {
  mainWin = win
}
