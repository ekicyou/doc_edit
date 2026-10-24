// 頁の指定の要素の位置を切り出した画面を、明・暗で撮る（Edge ヘッドレス + CDP、標準の fetch と WebSocket だけ）
// node shot.mjs <url> <selector> <out|-> [light|dark] [width=1000] [height=700]
import { spawn } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { createServer } from 'node:net';
import { once } from 'node:events';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const [url, selector, out, scheme = 'light', w = '1000', h = '700'] = process.argv.slice(2);
const width = Number(w), height = Number(h);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const fail = (msg) => { throw Object.assign(new Error(msg), { reason: true }); };

if (!url || !selector || !out || !['light', 'dark'].includes(scheme) || !(width > 0) || !(height > 0)) {
  console.error('使い方: node shot.mjs <url> <selector> <out|-> [light|dark] [width] [height]');
  process.exit(1);
}

const freePort = async () => {
  const s = createServer().listen(0, '127.0.0.1');
  await once(s, 'listening');
  const { port } = s.address();
  s.close();
  return port;
};

let edge, ws;
// 起動中の利用者の Edge とぶつかると白紙になるので、毎回使い捨てのプロファイルにする（research.md）
const profile = await mkdtemp(join(tmpdir(), 'shot-'));
try {
  const port = await freePort();
  edge = spawn(EDGE, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`,
    '--no-first-run', '--no-default-browser-check', `--window-size=${width},${height}`, 'about:blank'], { stdio: 'ignore' });
  edge.on('error', () => {}); // ENOENT などは下の待ちの時間切れで「起動しない」にする

  let page;
  for (let i = 0; i < 50 && !page; i++) {
    await sleep(200);
    page = await fetch(`http://127.0.0.1:${port}/json/list`).then((r) => r.json())
      .then((l) => l.find((t) => t.type === 'page')).catch(() => undefined);
  }
  if (!page) fail('Edge が起動しない');

  ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((res, rej) => { ws.onopen = res; ws.onerror = () => rej(new Error('CDP に繋がらない')); });
  let id = 0, onLoad = () => {};
  const pending = new Map();
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data);
    if (m.method === 'Page.loadEventFired') onLoad();
    const p = pending.get(m.id);
    if (!p) return;
    pending.delete(m.id);
    m.error ? p.rej(new Error(`${m.error.message}`)) : p.res(m.result);
  };
  const send = (method, params = {}) => new Promise((res, rej) => {
    pending.set(++id, { res, rej });
    ws.send(JSON.stringify({ id, method, params }));
  });

  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false });
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: scheme }] });
  await send('Page.enable');
  const loaded = new Promise((r) => { onLoad = r; });
  const nav = await send('Page.navigate', { url });
  if (nav.errorText) fail(`頁が開けない: ${nav.errorText}`);
  await Promise.race([loaded, sleep(30000)]);
  await sleep(2000); // 検索の索引や遅れて付く style が落ち着くのを待つ

  const { result } = await send('Runtime.evaluate', {
    returnByValue: true,
    expression: `(() => {
      const el = document.querySelector(${JSON.stringify(selector)});
      if (!el) return null;
      const head = document.querySelector('.md-header, header')?.offsetHeight || 0;
      scrollTo(0, Math.max(0, el.getBoundingClientRect().top + scrollY - head - 8));
      const d = document.documentElement; // 縦のスクロールバーの幅を足し、innerWidth と同じ物差しにする（はみ出しを見逃さない）
      return { y: scrollY, sw: d.scrollWidth + innerWidth - d.clientWidth, iw: innerWidth };
    })()`,
  });
  if (!result.value) fail(`セレクタが見つからない: ${selector}`);
  const { y, sw, iw } = result.value;
  await sleep(1500); // スクロールの後、ヘッダの題の切り替えの動きが終わるのを待つ

  let wrote = null;
  if (out !== '-') {
    const { data } = await send('Page.captureScreenshot', {
      format: 'png', captureBeyondViewport: true, clip: { x: 0, y, width, height, scale: 1 },
    });
    await writeFile(out, Buffer.from(data, 'base64'));
    wrote = out;
  }
  console.log(`wrote: ${wrote}`);
  console.log(`scrollWidth: ${sw}`);
  console.log(`innerWidth: ${iw}`);
} catch (e) {
  console.error(e.reason ? e.message : `失敗: ${e.message}`);
  process.exitCode = 1;
} finally {
  ws?.close();
  if (edge?.pid && edge.exitCode === null) {
    // 子のプロセス（描画・GPU）ごと止める
    spawn('taskkill', ['/PID', String(edge.pid), '/T', '/F'], { stdio: 'ignore' });
    await Promise.race([once(edge, 'exit'), sleep(5000)]);
  }
  await rm(profile, { recursive: true, force: true, maxRetries: 10, retryDelay: 300 }).catch(() => {});
}
// 負けた側の待ちのタイマーで 30 秒残らないよう、ここで終える
process.exit();
