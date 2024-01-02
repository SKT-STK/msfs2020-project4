let mainWin: Electron.BrowserWindow | null = null

export function getMainWin() {
  return mainWin
}

export function setMainWin(win: Electron.BrowserWindow | null) {
  mainWin = win
}

//

let yokeCalibWin: Electron.BrowserWindow | null = null

export function getYokeCalibWin() {
  return yokeCalibWin
}

export function setYokeCalibWin(win: Electron.BrowserWindow | null) {
  yokeCalibWin = win
}
