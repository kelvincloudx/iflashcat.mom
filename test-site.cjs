const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');

console.log('=== 开始全面自动化检测 ===\n');

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passCount++;
  } else {
    console.error(`[FAIL] ${message}`);
    failCount++;
  }
}

// 1. 检查核心页面与资产是否存在
const requiredFiles = [
  'index.html',
  'pricing/index.html',
  'guides/index.html',
  'faq/index.html',
  'guides/speedcat-plans/index.html',
  'guides/speedcat-windows/index.html',
  'guides/speedcat-clashparty/index.html',
  'guides/speedcat-nodes/index.html',
  'guides/speedcat-data/index.html',
  'guides/speedcat-mobile/index.html',
  'guides/speedcat-troubleshooting/index.html',
  'sitemap.xml',
  'robots.txt',
  'favicon.svg',
];

requiredFiles.forEach((file) => {
  const filePath = path.join(distDir, file);
  assert(fs.existsSync(filePath), `文件存在: ${file}`);
});

// 2. 检查 robots.txt 内容
const robotsContent = fs.readFileSync(path.join(distDir, 'robots.txt'), 'utf8');
assert(
  robotsContent.includes('Sitemap: https://iflashcat.mom/sitemap.xml'),
  'robots.txt 正确引用了 Sitemap: https://iflashcat.mom/sitemap.xml'
);
assert(!robotsContent.includes('Disallow: /'), 'robots.txt 未错误禁止全站抓取');

// 3. 检查 sitemap.xml 内容与 11 个正式 URL
const sitemapContent = fs.readFileSync(path.join(distDir, 'sitemap.xml'), 'utf8');
const expectedSitemapUrls = [
  'https://iflashcat.mom/',
  'https://iflashcat.mom/pricing/',
  'https://iflashcat.mom/guides/',
  'https://iflashcat.mom/faq/',
  'https://iflashcat.mom/guides/speedcat-plans/',
  'https://iflashcat.mom/guides/speedcat-windows/',
  'https://iflashcat.mom/guides/speedcat-clashparty/',
  'https://iflashcat.mom/guides/speedcat-nodes/',
  'https://iflashcat.mom/guides/speedcat-data/',
  'https://iflashcat.mom/guides/speedcat-mobile/',
  'https://iflashcat.mom/guides/speedcat-troubleshooting/',
];

expectedSitemapUrls.forEach((url) => {
  assert(sitemapContent.includes(`<loc>${url}</loc>`), `Sitemap 包含正确 URL: ${url}`);
});

// 4. 检查 HTML 文件的 CSS 链接和文件物理存在性
const htmlFiles = requiredFiles.filter((f) => f.endsWith('.html'));
const titles = new Set();
const descriptions = new Set();

htmlFiles.forEach((relPath) => {
  const fullPath = path.join(distDir, relPath);
  const content = fs.readFileSync(fullPath, 'utf8');

  // H1 检查：每页必须且仅有一个 H1
  const h1Matches = content.match(/<h1[\s>]/g) || [];
  assert(h1Matches.length === 1, `${relPath} 拥有唯一一个 H1 标签 (当前数量: ${h1Matches.length})`);

  // Title 检查
  const titleMatch = content.match(/<title>([^<]+)<\/title>/);
  assert(!!titleMatch && titleMatch[1].length > 0, `${relPath} 包含非空 Title: ${titleMatch ? titleMatch[1] : 'NONE'}`);
  if (titleMatch) {
    assert(!titles.has(titleMatch[1]), `${relPath} Title 唯一性: ${titleMatch[1]}`);
    titles.add(titleMatch[1]);
  }

  // Meta description 检查
  const descMatch = content.match(/<meta\s+name="description"\s+content="([^"]+)"/);
  assert(!!descMatch && descMatch[1].length > 0, `${relPath} 包含非空 Description`);
  if (descMatch) {
    assert(!descriptions.has(descMatch[1]), `${relPath} Description 唯一性`);
    descriptions.add(descMatch[1]);
  }

  // Canonical 检查
  assert(content.includes('<link rel="canonical" href="https://iflashcat.mom'), `${relPath} 包含标准规范 Canonical`);

  // CSS 文件引用与存在性
  const cssMatches = [...content.matchAll(/<link\s+rel="stylesheet"\s+href="(\/_astro\/[^"]+)"/g)];
  assert(cssMatches.length > 0, `${relPath} 成功引入打包 CSS 文件 (数量: ${cssMatches.length})`);
  cssMatches.forEach((m) => {
    const cssRelPath = m[1].replace(/^\//, '').replace(/\//g, path.sep);
    const cssFullPath = path.join(distDir, cssRelPath);
    assert(fs.existsSync(cssFullPath) && fs.statSync(cssFullPath).size > 0, `CSS 文件物理存在且非空: ${m[1]}`);
  });

  // Footer 单一性检查
  const footerMatches = content.match(/<footer[\s>]/g) || [];
  assert(footerMatches.length === 1, `${relPath} 拥有且仅拥有一个 Footer 标签`);

  // Header 单一性检查
  const headerMatches = content.match(/<header[\s>]/g) || [];
  assert(headerMatches.length >= 1, `${relPath} 拥有 Header 标签`);

  // 品牌违禁词排查：不得包含其他机场推荐或排行榜
  const forbiddenPhrases = [
    '十大机场',
    '机场排行榜',
    '其他机场推荐',
    '机场大全',
    '最佳机场排名',
    '星耀版',
    '星环版',
    '银河版',
    '宇宙版',
  ];
  forbiddenPhrases.forEach((phrase) => {
    assert(!content.includes(phrase), `${relPath} 未包含违禁词汇: ${phrase}`);
  });
});

// 5. 检查商业推广链接的唯一性与属性
const targetAffLink = 'https://varnexa.lingdongaff.com/#/?code=HHoxxHGa';
htmlFiles.forEach((relPath) => {
  const content = fs.readFileSync(path.join(distDir, relPath), 'utf8');
  // 查找所有推广相关外链
  const affLinkMatches = [...content.matchAll(/<a[^>]+href="([^"]+)"[^>]*>/g)];
  affLinkMatches.forEach((m) => {
    const fullTag = m[0];
    const href = m[1];
    if (href.includes('lingdongaff.com') || href.includes('varnexa')) {
      assert(href === targetAffLink, `推广链接完整严格一致: ${href}`);
      assert(fullTag.includes('target="_blank"'), `推广链接设置了 target="_blank"`);
      assert(
        fullTag.includes('rel="sponsored nofollow noopener"') ||
          fullTag.includes('rel="sponsored nofollow noopener"'),
        `推广链接设置了 rel="sponsored nofollow noopener"`
      );
    }
  });
});

// 6. 检查已按用户要求移除友情链接
const indexContent = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8');
assert(
  !indexContent.includes('友情链接') &&
    !indexContent.includes('jichangreview.net') &&
    !indexContent.includes('jichangguide.net'),
  '首页已按用户要求彻底移除友情链接模块（机场测评与机场教程）'
);

// 7. 检查套餐数据与 19 个价格选项在首页和套餐页的渲染
const pricingContent = fs.readFileSync(path.join(distDir, 'pricing', 'index.html'), 'utf8');
const plansToCheck = [
  { name: '迷你猫', prices: ['20', '57', '108', '192'] },
  { name: '闪电猫', prices: ['40', '114', '216', '384'] },
  { name: '霹雳猫', prices: ['100', '285', '540', '960'] },
  { name: '雷神猫', prices: ['200', '570', '1080', '1920'] },
  { name: '特惠年付小包', prices: ['98'] },
  { name: '流星猫', prices: ['260'] },
  { name: '飞天猫', prices: ['1800'] },
];

[indexContent, pricingContent].forEach((html, idx) => {
  const pageName = idx === 0 ? '首页' : '套餐页';
  plansToCheck.forEach((plan) => {
    assert(html.includes(plan.name), `${pageName} 包含套餐名称: ${plan.name}`);
    plan.prices.forEach((price) => {
      assert(html.includes(`¥${price}`), `${pageName} 包含 ${plan.name} 价格: ¥${price}`);
    });
  });

  // 检查流量规则
  assert(html.includes('600GB'), `${pageName} 包含流星猫 600GB 规则`);
  assert(html.includes('5000GB'), `${pageName} 包含飞天猫 5000GB 规则`);
  assert(html.includes('不按月重置') || html.includes('不按月清零'), `${pageName} 正确说明年付专属流量不按月重置`);

  // 检查免责声明
  assert(
    html.includes('本页面展示的是 SpeedCAT 公开资料中的参考套餐') ||
      html.includes('公开资料参考价格'),
    `${pageName} 包含明确的价格参考与推广关系免责声明`
  );
});

// 8. 检查七篇文章正文中文字数 (必须介于 800-1500)
const guidesDir = path.join(__dirname, 'src', 'content', 'guides');
const guideFiles = fs.readdirSync(guidesDir);
assert(guideFiles.length === 7, `文章数量严格为 7 篇 (当前: ${guideFiles.length})`);

guideFiles.forEach((file) => {
  const raw = fs.readFileSync(path.join(guidesDir, file), 'utf8');
  const body = raw.replace(/^---[\s\S]*?---/, '');
  const chineseChars = (body.match(/[\u4e00-\u9fa5]/g) || []).length;
  assert(
    chineseChars >= 800 && chineseChars <= 1500,
    `文章 ${file} 正文字数在 800-1500 范围内 (实际: ${chineseChars} 字)`
  );
});

// 9. 检查 FAQ 数量
const faqPageContent = fs.readFileSync(path.join(distDir, 'faq', 'index.html'), 'utf8');
const faqQCount = (faqPageContent.match(/class="faq-q-text"/g) || []).length;
assert(faqQCount >= 10, `FAQ 页面包含至少 10 条问答 (实际: ${faqQCount} 条)`);

console.log(`\n=== 检测完成: 通过 ${passCount} 项, 失败 ${failCount} 项 ===\n`);
if (failCount > 0) {
  process.exit(1);
}
