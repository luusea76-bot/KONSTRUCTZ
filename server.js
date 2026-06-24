import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, 'dist')
const port = Number(process.env.PORT || 3000)

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mp4': 'video/mp4',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.xml': 'application/xml; charset=utf-8'
}

function sendFile(res, filePath) {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end('Internal server error')
      return
    }

    res.writeHead(200, {
      'Content-Type': contentTypes[path.extname(filePath)] || 'application/octet-stream',
      'Cache-Control': filePath.includes(`${path.sep}assets${path.sep}`)
        ? 'public, max-age=31536000, immutable'
        : 'public, max-age=0, must-revalidate'
    })
    res.end(data)
  })
}

http
  .createServer((req, res) => {
    const requestedPath = decodeURIComponent(new URL(req.url || '/', `http://${req.headers.host}`).pathname)
    const normalizedPath = path.normalize(requestedPath).replace(/^(\.\.[/\\])+/, '')
    const staticPath = path.join(distDir, normalizedPath)

    if (!staticPath.startsWith(distDir)) {
      res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end('Forbidden')
      return
    }

    fs.stat(staticPath, (error, stats) => {
      if (!error && stats.isFile()) {
        sendFile(res, staticPath)
        return
      }

      sendFile(res, path.join(distDir, 'index.html'))
    })
  })
  .listen(port, '0.0.0.0', () => {
    console.log(`KONSTRUCTZ server listening on port ${port}`)
  })
