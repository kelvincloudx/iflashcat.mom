const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');

function getAllHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllHtmlFiles(full));
    } else if (file.endsWith('.html')) {
      results.push(full);
    }
  });
  return results;
}

const htmlFiles = getAllHtmlFiles(distDir);
let brokenLinks = 0;
let totalCheckedLinks = 0;

htmlFiles.forEach((file) => {
  const content = fs.readFileSync(file, 'utf8');
  const links = [...content.matchAll(/href="(\/[^"]*)"/g)].map((m) => m[1]);
  links.forEach((l) => {
    if (l.startsWith('//') || l.startsWith('/_astro/')) return;
    const urlPath = l.split('#')[0];
    if (!urlPath) return; // on-page anchor
    totalCheckedLinks++;
    let target = path.join(distDir, urlPath.replace(/^\//, '').replace(/\//g, path.sep));
    if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
      target = path.join(target, 'index.html');
    } else if (!fs.existsSync(target) && fs.existsSync(target + '.html')) {
      target = target + '.html';
    }
    if (!fs.existsSync(target)) {
      console.error(`Broken link in ${path.relative(distDir, file)}: ${l} -> ${target}`);
      brokenLinks++;
    }
  });
});

console.log(`[PASS] 全站共检测 ${totalCheckedLinks} 处内部页面链接，失效链接数: ${brokenLinks}`);
if (brokenLinks > 0) {
  process.exit(1);
}
