import { contextBridge, ipcRenderer } from 'electron'

import ReactDOMServer from 'react-dom/server'
import LoadingPage from '../public/LoadingPage.tsx'

// --------- Expose some API to the Renderer process ---------
contextBridge.exposeInMainWorld('ipcRenderer', withPrototype(ipcRenderer))

// `exposeInMainWorld` can't detect attributes and methods of `prototype`, manually patching it.
function withPrototype(obj: Record<string, any>) {
  const protos = Object.getPrototypeOf(obj)

  for (const [key, value] of Object.entries(protos)) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) continue

    if (typeof value === 'function') {
      // Some native APIs, like `NodeJS.EventEmitter['on']`, don't work in the Renderer process. Wrapping them into a function.
      obj[key] = function (...args: any[]) {
        return value.call(obj, ...args)
      }
    } else {
      obj[key] = value
    }
  }
  return obj
}

// --------- Preload scripts loading ---------
function domReady(condition: DocumentReadyState[] = ['complete', 'interactive']) {
  return new Promise(resolve => {
    if (condition.includes(document.readyState)) {
      resolve(true)
    } else {
      document.addEventListener('readystatechange', () => {
        if (condition.includes(document.readyState)) {
          resolve(true)
        }
      })
    }
  })
}

const safeDOM = {
  append(parent: HTMLElement, child: HTMLElement) {
    if (!Array.from(parent.children).find(e => e === child)) {
      parent.appendChild(child)
    }
  },
  remove(parent: HTMLElement, child: HTMLElement) {
    if (Array.from(parent.children).find(e => e === child)) {
      parent.removeChild(child)
    }
  },
}

function useLoading() {
  const loadingComponent = ReactDOMServer.renderToString(LoadingPage())

  return {
    appendLoading() {
      const loadingContainer = document.createElement('div')
      loadingContainer.className = 'app-loading-wrap'
      const style = document.createElement('style')
      style.innerHTML = `
        body {
          overflow: hidden;
        }
        
        .bgbg {
          position: absolute;
          min-width: 110vw;
          min-height: 110vh;
          left: 0;
          top: 0;
          z-index: -101;
          background-color: #333;
        }
        
        .loaders-css__square-spin {
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #333;
          width: 100%;
          min-height: 100vh;
        }
        
        .loader {
          width: 250px;
          height: 50px;
          line-height: 50px;
          position: relative;
          font-family: Arial, Helvetica, sans-serif;
          text-transform: uppercase;
          font-weight: 900;
          color: #CE4233;
          letter-spacing: 0.2em;
        }
        .loader::before, .loader::after {
          content: "";
          display: block;
          width: 15px;
          height: 15px;
          background: #CE4233;
          position: absolute;
          animation: load 0.7s infinite alternate ease-in-out;
        }
        
        @keyframes load {
          0% {
            left: 0;
            height: 30px;
            width: 15px;
          }
          50% {
            height: 8px;
            width: 50px;
          }
          100% {
            left: 235px;
            height: 30px;
            width: 15px;
          }
        }
      `
      document.head.appendChild(style)
      loadingContainer.innerHTML = loadingComponent
      safeDOM.append(document.body, loadingContainer)
    },
    removeLoading() {
      const loadingContainer = document.querySelector('.app-loading-wrap')
      if (loadingContainer) {
        safeDOM.remove(document.body, loadingContainer as HTMLElement)
      }
    },
  }
}

// ----------------------------------------------------------------------

// eslint-disable-next-line react-hooks/rules-of-hooks
const { appendLoading, removeLoading } = useLoading()
domReady().then(appendLoading)

window.onmessage = ev => {
  ev.data.payload === 'removeLoading' && removeLoading()
}


setTimeout(removeLoading, 4999)
