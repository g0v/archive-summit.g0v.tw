import {writeFile} from 'fs'
import Browser from 'zombie'
import webpack from 'webpack'
import {resolve} from 'path'
import {server as superstatic} from 'superstatic'

const paths = ['index', 'schedules', 'speakers']
const PORT = 8081;
const server = superstatic({
  port: PORT,
  cwd: resolve(__dirname, '../dist'),
  config: {
    cleanUrls: true,
    debug: true,
    errorPage: '2016/index.html', // relative to cwd
  }
})

Browser.localhost('localhost', PORT)

let connectApp = server.listen(async () => {
  console.log(`Static server listening at http://localhost:${PORT}`)

  await Promise.all(paths.map(async (path) => {
    const filePath = resolve(__dirname, `../dist/2016/${path}.html`)
    const html = await renderToString(path)

    await writeFileAsync(filePath, html, 'utf-8')

    console.log('Rendered ', path, 'to', filePath)
  }))

  console.log('All rendered, closing down the server...')
  process.exit()
})

// Utility functions
//

function renderToString(path){
  return new Promise((resolve, reject) => {
    const browser = new Browser({waitDuration: '1s'})
    browser.visit(`/2016/${path}`, () => {
      resolve(`<!DOCTYPE html>${browser.document.documentElement.outerHTML}`)
    })
  })
}

function writeFileAsync(...args){
  return new Promise((resolve, reject) => {
    writeFile(...args, (err) => {
      if(err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

// Unhandled rejection handling
//
process.on('unhandledRejection', function(reason, promise) {
  if (reason.stack) {
    // Error object, has stack info
    console.error(reason.stack);
  } else {
    console.error('Reason:', reason);
  }
  console.error('Promise:', promise);
});
