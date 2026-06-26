import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

const blogDataDir = path.resolve(process.cwd(), 'data')
const blogPostsFile = path.join(blogDataDir, 'blog-posts.json')

const sendJson = (res, statusCode, payload) => {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.end(JSON.stringify(payload))
}

const readJsonBody = (req) => new Promise((resolve, reject) => {
  let body = ''
  req.on('data', (chunk) => {
    body += chunk
    if (body.length > 10_000_000) {
      reject(new Error('Request body too large'))
      req.destroy()
    }
  })
  req.on('end', () => {
    try {
      resolve(body ? JSON.parse(body) : null)
    } catch (error) {
      reject(error)
    }
  })
  req.on('error', reject)
})

const blogPostsApiPlugin = () => ({
  name: 'konstructz-blog-posts-api',
  configureServer(server) {
    server.middlewares.use('/api/blog-posts', async (req, res) => {
      if (req.method === 'GET') {
        try {
          const data = fs.readFileSync(blogPostsFile, 'utf8')
          sendJson(res, 200, { posts: JSON.parse(data) })
        } catch (error) {
          sendJson(res, error.code === 'ENOENT' ? 404 : 500, {
            error: error.code === 'ENOENT' ? 'Blog posts have not been saved yet.' : 'Could not read blog posts.'
          })
        }
        return
      }

      if (req.method === 'PUT') {
        try {
          const payload = await readJsonBody(req)
          if (!payload || !Array.isArray(payload.posts)) {
            sendJson(res, 400, { error: 'Expected { posts: [...] }.' })
            return
          }

          fs.mkdirSync(blogDataDir, { recursive: true })
          fs.writeFileSync(blogPostsFile, `${JSON.stringify(payload.posts, null, 2)}\n`, 'utf8')
          sendJson(res, 200, { ok: true, posts: payload.posts })
        } catch (error) {
          sendJson(res, 500, { error: error.message || 'Could not save blog posts.' })
        }
        return
      }

      sendJson(res, 405, { error: 'Method not allowed.' })
    })
  }
})

// Copy the catalog JSON file and About Us image files using host permissions
try {
  const sourcePath = '/Users/bosreylin/Wheel-Loader/public/equipment-products.json'
  const destPath = path.resolve(process.cwd(), 'src/data/equipment-products.json')
  if (fs.existsSync(sourcePath)) {
    const data = fs.readFileSync(sourcePath, 'utf8')
    fs.writeFileSync(destPath, data, 'utf8')
    console.log('Successfully copied catalog JSON to src/data/equipment-products.json')
  } else {
    console.log('Source catalog JSON not found at:', sourcePath)
  }

  // Copy About Us images from brain directory to src/assets
  const brainDir = '/Users/bosreylin/.gemini/antigravity-ide/brain/7b62cf1d-d176-4f60-9f12-c4a97d4e76f8'
  const destAssetsDir = path.resolve(process.cwd(), 'src/assets')
  
  const imagesToCopy = {
    'typhon_factory_engineer_1781844631084.png': 'typhon_factory_engineer.png',
    'loader_carrying_gravel_1781844646662.png': 'loader_carrying_gravel.png',
    'track_loader_farm_1781844661808.png': 'track_loader_farm.png',
    'dumper_construction_1781844680308.png': 'dumper_construction.png',
    'tiger_watermark_1781844692905.png': 'tiger_watermark.png',
    'tiger_logo_1781844708986.png': 'tiger_logo.png',
    'support_hero_1781845359976.png': 'support_hero.png',
    'support_call_center_1781845374893.png': 'support_call_center.png'
  }

  if (!fs.existsSync(destAssetsDir)) {
    fs.mkdirSync(destAssetsDir, { recursive: true })
  }

  for (const [srcName, destName] of Object.entries(imagesToCopy)) {
    const srcFilePath = path.join(brainDir, srcName)
    const destFilePath = path.join(destAssetsDir, destName)
    if (fs.existsSync(srcFilePath)) {
      fs.copyFileSync(srcFilePath, destFilePath)
      console.log(`Successfully copied ${srcName} -> ${destName}`)
    } else {
      console.warn(`WARNING: Image source file not found: ${srcFilePath}`)
    }
  }

  // Copy the active logo as a physical file to prevent symlink resolution issues
  const logoSrc = '/Users/bosreylin/.gemini/antigravity-ide/brain/3d441efb-8848-49e3-bb24-b03dca083fda/media__1782196407779.png'
  if (fs.existsSync(logoSrc)) {
    fs.copyFileSync(logoSrc, path.join(destAssetsDir, 'konstructz_logo.png'))
    fs.copyFileSync(logoSrc, path.join(destAssetsDir, 'wolf_logo.png'))
    console.log('Successfully copied active logo to src/assets')
  }
} catch (e) {
  console.error('Failed to copy assets in vite.config.js:', e)
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [blogPostsApiPlugin(), react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    strictPort: false
  }
})
