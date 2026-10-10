const fs = require('fs');
const path = require('path');
const os = require('os');
const http = require('http');
const { spawn, spawnSync } = require('child_process');
const WebSocket = require('ws');
const root = path.resolve(__dirname, '..');
const work = fs.mkdtempSync(path.join(os.tmpdir(), 'xadrez-demo-'));
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
const chrome = ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(fs.existsSync);
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png' };
const server = http.createServer((req, res) => {
    const url = decodeURIComponent(req.url.split('?')[0]);
    const file = path.resolve(root, 'build', '.' + (url === '/' ? '/index.html' : url));
    if (!file.startsWith(path.join(root, 'build') + path.sep)) { res.writeHead(403); res.end(); return; }
    fs.readFile(file, (error, data) => { res.writeHead(error ? 404 : 200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' }); res.end(error ? 'Not found' : data); });
});
(async () => {
    let browser, socket;
    try {
        if (!chrome) throw Error('Chrome ou Edge nao encontrado.');
        await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
        browser = spawn(chrome, ['--headless=new', '--disable-gpu', '--disable-extensions', '--disable-background-networking', '--no-first-run', '--no-default-browser-check', '--remote-debugging-port=0', `--user-data-dir=${work}`, 'about:blank'], { windowsHide: true, stdio: 'ignore' });
        const portFile = path.join(work, 'DevToolsActivePort');
        for (let i = 0; !fs.existsSync(portFile) && i < 100; i++) await wait(200);
        if (!fs.existsSync(portFile)) throw Error('O navegador nao iniciou.');
        const port = fs.readFileSync(portFile, 'utf8').split('\n')[0];
        const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
        socket = new WebSocket(targets.find(t => t.type === 'page').webSocketDebuggerUrl);
        await new Promise((resolve, reject) => { socket.once('open', resolve); socket.once('error', reject); });
        let sequence = 0;
        const pending = new Map();
        socket.on('message', raw => {
            const msg = JSON.parse(raw);
            if (!pending.has(msg.id)) return;
            const p = pending.get(msg.id); clearTimeout(p.timeout); pending.delete(msg.id);
            msg.error ? p.reject(Error(msg.error.message)) : p.resolve(msg.result);
        });
        function call(method, params = {}) {
            return new Promise((resolve, reject) => {
                const id = ++sequence;
                const timeout = setTimeout(() => { pending.delete(id); reject(Error('Timeout: ' + method)); }, 60000);
                pending.set(id, { resolve, reject, timeout }); socket.send(JSON.stringify({ id, method, params }));
            });
        }
        async function evaluate(expression) {
            const r = await call('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
            if (r.exceptionDetails) throw Error(JSON.stringify(r.exceptionDetails));
            return r.result.value;
        }
        console.log('Navegador conectado; preparando captura.');
        await call('Emulation.setDeviceMetricsOverride', { width: 960, height: 800, deviceScaleFactor: 1, mobile: false });
        await call('Page.navigate', { url: `http://127.0.0.1:${server.address().port}` });
        for (let i = 0; i < 100; i++) {
            if (await evaluate(`document.querySelectorAll('.colaborador').length === 20 && Array.from(document.images).every(img => img.complete)`)) break;
            await wait(200);
        }
        const frames = [];
        async function frame(expression) {
            await evaluate(expression); await wait(600);
            const r = await call('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
            const file = path.join(work, `frame-${String(frames.length).padStart(2, '0')}.png`);
            fs.writeFileSync(file, Buffer.from(r.data, 'base64'));
            const fit = spawnSync('magick', [file, '-resize', '960x800>', '-background', '#030c1b', '-gravity', 'center', '-extent', '960x800', file], { windowsHide: true, encoding: 'utf8' });
            if (fit.status !== 0) throw Error(fit.stderr || 'Falha ao preparar quadro.');
            frames.push(file);
        }
        await frame('window.scrollTo(0, 0)');
        await frame('window.scrollTo(0, 300)');
        await frame(`document.querySelector('.formulario-container').scrollIntoView()`);
        await frame(`document.querySelector('.time').scrollIntoView()`);
        await frame(`document.querySelectorAll('.time')[1].scrollIntoView()`);
        await call('Emulation.setDeviceMetricsOverride', { width: 390, height: 900, deviceScaleFactor: 1, mobile: true });
        await frame('window.scrollTo(0, 0)');
        const mobile = await evaluate(`({width: innerWidth, pageWidth: document.documentElement.scrollWidth})`);
        if (mobile.pageWidth > mobile.width) throw Error('Overflow mobile: ' + JSON.stringify(mobile));
        await frame(`document.querySelector('.time').scrollIntoView()`);
        await frame(`document.querySelector('.time .carrossel-controles button:last-child').click()`);
        await frame(`document.querySelector('.time .carrossel-controles button:last-child').click()`);
        await frame(`document.querySelectorAll('.time')[3].scrollIntoView()`);
        await frame(`document.querySelectorAll('.time')[3].querySelector('.carrossel-controles button:last-child').click()`);
        await frame(`document.querySelector('.footer').scrollIntoView()`);
        const destination = path.join(root, 'docs', 'demo.gif');
        fs.mkdirSync(path.dirname(destination), { recursive: true });
        const result = spawnSync('magick', ['-delay', '140', ...frames, '-loop', '0', '-colors', '128', '-layers', 'Optimize', destination], { windowsHide: true, encoding: 'utf8', timeout: 90000 });
        if (result.status !== 0) throw Error(result.stderr || 'Falha ao gerar GIF.');
        console.log(`GIF: ${destination}; ${frames.length} quadros; ${Math.round(fs.statSync(destination).size / 1024)} KB`);
        console.log('Quadros para conferir: ' + work);
        console.log('Mobile 390px: sem overflow horizontal da pagina.');
    } finally {
        if (socket) socket.terminate();
        if (browser) browser.kill();
        server.close();
    }
})().catch(error => { console.error(error.message); process.exitCode = 1; });
