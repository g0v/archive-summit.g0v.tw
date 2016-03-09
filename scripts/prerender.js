import sm from 'sitemap'
import {writeFile, writeFileSync} from 'fs'
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
    rewrites: paths.map(path => ({source: `/2016/${path}`, destination: '/2016/index.html'}))
  }
})

Browser.localhost('localhost', PORT)

let connectApp = server.listen(async () => {
  console.log(`Static server listening at http://localhost:${PORT}`)

  await Promise.all(paths.map(async (path) => {
    const outputFilePath = resolve(__dirname, `../dist/2016/${path}.html`)
    const html = await renderToString(path)

    await writeFileAsync(outputFilePath, html, 'utf-8')

    console.log('Rendered ', path, 'to', outputFilePath)
  }))

  console.log('All rendered, closing down the server...')
  process.exit()
})

// Utility functions
//

async function renderToString(path){
  const browser = new Browser({waitDuration: '10s'})
  await browser.visit(`/2016/${path}`)
  return `<!DOCTYPE html>${browser.document.documentElement.outerHTML}`
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

var sitemap = sm.createSitemap({
  hostname: 'http://summit.g0v.org/'
});

paths.map(path => sitemap.add({url: `/2016/${path}`, changefreq: 'weekly', priority: 0.7}))

writeFileSync(resolve(__dirname, "../dist/2016/sitemap.xml"), sitemap.toString());
