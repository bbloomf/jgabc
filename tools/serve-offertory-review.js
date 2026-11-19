#!/usr/bin/env node
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const cp = require('child_process');
const crypto = require('crypto');
const { ReviewStore, hash } = require('./offertory-review-store');
const root = path.resolve(__dirname, '..');
const store = new ReviewStore(root);
const port = Number(process.env.OFFERTORY_REVIEW_PORT || 8766);
const origin = `http://127.0.0.1:${port}`;
const token = crypto.randomBytes(32).toString('hex');
const pdf = path.join(root, 'Offertoriale cum versiculis.pdf');
const cache = path.join(os.tmpdir(), 'jgabc-offertory-review-' + hash(fs.readFileSync(pdf)).slice(0,16));
fs.mkdirSync(cache, { recursive: true });
function json(res, value, status = 200) { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(value)); }
const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.png':'image/png', '.ttf':'font/ttf', '.woff':'font/woff', '.woff2':'font/woff2', '.md':'text/plain; charset=utf-8' };
function serve(res, file, type) {
  if (!fs.existsSync(file)) return json(res, { error: 'Not found' }, 404);
  res.writeHead(200, { 'Content-Type': type || types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache', 'X-Content-Type-Options':'nosniff' });
  fs.createReadStream(file).pipe(res);
}
async function payload(req) {
  let text = '';
  for await (const chunk of req) { text += chunk; if (text.length > 300000) throw Object.assign(new Error('Request too large'), { status: 413 }); }
  return JSON.parse(text);
}
const server = http.createServer(async (req, res) => {
  try {
    if (req.headers.host !== `127.0.0.1:${port}`) return json(res, { error: 'Use the local review URL' }, 403);
    const url = new URL(req.url, origin), pathname = decodeURIComponent(url.pathname);
    if (req.method === 'POST') {
      if (req.headers.origin !== origin || req.headers['x-review-token'] !== token) return json(res, { error:'Reload the local review page before saving' }, 403);
      const data = await payload(req);
      if (pathname === '/api/save') return json(res, store.save(data.id, data.kind, data.source, data.expectedHash));
      if (pathname === '/api/review') return json(res, store.review(data.id, data));
      if (pathname === '/api/export') return json(res, store.exportFiles());
      return json(res, { error:'Unknown action' }, 404);
    }
    if (req.method !== 'GET') return json(res, { error:'Method not allowed' }, 405);
    if (pathname === '/api/catalog') return json(res, { token, entries: store.entries().map(e => { const d = store.get(e.id); return { id:e.id, name:e.name, bookNumber:e.bookNumber, page:e.page, verseCount:e.verseCount, appAvailable:d.appAvailable, ready:d.ready, publishedUrl:d.publishedUrl }; }) });
    if (pathname === '/api/chant') return json(res, store.get(url.searchParams.get('id')));
    if (pathname === '/api/download') {
      const d = store.get(url.searchParams.get('id'));
      res.writeHead(200, { 'Content-Type':'text/plain; charset=utf-8', 'Content-Disposition':`attachment; filename="${d.id}.gabc"`, 'Cache-Control':'no-store' });
      return res.end(d.submission);
    }
    if (pathname === '/api/bundle') {
      const exported = store.exportFiles(), zip = path.join(cache, 'gregobase-drafts.zip');
      if(fs.existsSync(zip)) fs.unlinkSync(zip);
      const args = ['-q', '-j', zip, ...exported.chants.map(e => path.join(exported.directory,e.id+'.gabc')), path.join(store.base,'publication/manifest.json'),path.join(store.base,'gregobase-plan.md')];
      const result = cp.spawnSync('zip', args, { encoding:'utf8' });
      if (result.status !== 0) throw new Error('Could not create the bundle: ' + result.stderr);
      res.setHeader('Content-Disposition','attachment; filename="offertoriale-gregobase-drafts.zip"');
      return serve(res, zip, 'application/zip');
    }
    const page = /^\/api\/pages\/(\d+)\.png$/.exec(pathname);
    if (page) {
      const n = Number(page[1]), allowed = new Set(store.entries().flatMap(e => [e.page, ...(e.verseReview?.pdfPages || e.pdfPages || [])]));
      if (!allowed.has(n)) return json(res, { error:'Page outside the current transcriptions' }, 404);
      const prefix = path.join(cache,'page-'+n), image = prefix+'.png';
      if (!fs.existsSync(image)) {
        const result = cp.spawnSync('pdftoppm',['-f',String(n),'-l',String(n),'-singlefile','-scale-to','2000','-png',pdf,prefix], { encoding:'utf8', timeout:30000 });
        if (result.status !== 0) throw new Error('Could not render the PDF page. Install Poppler (pdftoppm). ' + result.stderr);
      }
      return serve(res,image);
    }
    if (pathname === '/plan') return serve(res,path.join(store.base,'gregobase-plan.md'));
    if (pathname === '/exsurge.min.js') return serve(res,path.join(root,'exsurge.min.js'));
    if (/^\/fonts\/[a-zA-Z0-9.-]+\.(ttf|woff2?)$/.test(pathname) || pathname === '/versiculum.ttf') return serve(res,path.join(root,pathname.slice(1)));
    if (['/','/review','/review/'].includes(pathname)) return serve(res,path.join(root,'offertory-review/index.html'));
    if (['/review/app.js','/review/style.css','/review/gabc-map.js'].includes(pathname)) return serve(res,path.join(root,'offertory-review',path.basename(pathname)));
    return json(res, { error:'Not found' }, 404);
  } catch (error) { json(res, { error: error.message }, error.status || 400); }
});
server.listen(port,'127.0.0.1', () => console.log(`Offertory review: ${origin}/review/\nSaves update the manual sources and local app copies. Ctrl+C stops the editor.`));
