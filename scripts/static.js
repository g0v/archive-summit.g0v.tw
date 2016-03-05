import fs from 'fs'
import Browser from 'zombie'
import webpack from 'webpack'
import {createServer} from 'http-server'

const PORT = 8081;
const server = createServer({
  root: './dist'
});

server.listen(PORT, () => {
  console.log(`Server started at localhost:${PORT} for static server gen`)
  Browser.localhost('localhost', PORT)

  const browser = new Browser({waitDuration: '10s'})
  browser.visit('/2016', () => {
    console.log(`<!DOCTYPE html>${browser.document.documentElement.outerHTML}`)

    server.close()
  })
})