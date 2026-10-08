const http = require('http');
const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
const port = 4399;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath.endsWith('/')) {
    reqPath += 'index.html';
  }
  let filePath = path.join(distDir, reqPath.replace(/^\//, '').replace(/\//g, path.sep));
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (fs.existsSync(filePath) && !fs.statSync(filePath).isDirectory()) {
    const ext = path.extname(filePath);
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(port, async () => {
  console.log(`静态服务器已在端口 ${port} 启动，开始 HTTP 连通性测试...\n`);

  const urlsToTest = [
    '/',
    '/pricing/',
    '/guides/',
    '/faq/',
    '/guides/speedcat-plans/',
    '/guides/speedcat-windows/',
    '/guides/speedcat-clashparty/',
    '/guides/speedcat-nodes/',
    '/guides/speedcat-data/',
    '/guides/speedcat-mobile/',
    '/guides/speedcat-troubleshooting/',
    '/sitemap.xml',
    '/robots.txt',
    '/favicon.svg',
  ];

  let errors = 0;

  for (const u of urlsToTest) {
    try {
      const resp = await fetch(`http://localhost:${port}${u}`);
      if (resp.status === 200) {
        const ct = resp.headers.get('content-type');
        console.log(`[PASS] HTTP 200 OK: ${u} (Content-Type: ${ct})`);

        if (u.endsWith('/') || u === '/') {
          const text = await resp.text();
          // Extract CSS links and verify they load
          const cssLinks = [...text.matchAll(/href="(\/_astro\/[^"]+\.css)"/g)].map(m => m[1]);
          for (const cssUrl of cssLinks) {
            const cssResp = await fetch(`http://localhost:${port}${cssUrl}`);
            if (cssResp.status === 200 && cssResp.headers.get('content-type').includes('text/css')) {
              // Valid
            } else {
              console.error(`[FAIL] CSS 加载失败: ${cssUrl} (Status: ${cssResp.status})`);
              errors++;
            }
          }
        }
      } else {
        console.error(`[FAIL] HTTP 错误 ${resp.status}: ${u}`);
        errors++;
      }
    } catch (err) {
      console.error(`[FAIL] 请求异常 ${u}:`, err);
      errors++;
    }
  }

  server.close(() => {
    console.log(`\n=== HTTP 测试完成: 错误数 ${errors} ===\n`);
    process.exit(errors > 0 ? 1 : 0);
  });
});
