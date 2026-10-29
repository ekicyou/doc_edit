// site-look-plan の shot.mjs を写して広げたもの。--loaded で 9801 を作り物で受けて「読み込み」の後を数え、撮る
// node sstp-shot.mjs <url> <selector> <out|-> [light|dark] [width=1000] [height=700] [--loaded]
// 9801 への要求はすべて CDP の Fetch で止める（網に出さない）。GetFMO だけに作り物で答え、ほかは断って失敗で終える
import { spawn } from 'node:child_process';
import { mkdtemp, rm, writeFile } from 'node:fs/promises';
import { createServer } from 'node:net';
import { once } from 'node:events';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const args = process.argv.slice(2);
const loadedMode = args.includes('--loaded');
const [url, selector, out, scheme = 'light', w = '1000', h = '700'] = args.filter((a) => a !== '--loaded');
const width = Number(w), height = Number(h);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const fail = (msg) => { throw Object.assign(new Error(msg), { reason: true }); };

if (!url || !selector || !out || !['light', 'dark'].includes(scheme) || !(width > 0) || !(height > 0)) {
  console.error('使い方: node sstp-shot.mjs <url> <selector> <out|-> [light|dark] [width] [height] [--loaded]');
  process.exit(1);
}

// 手元のベースウェアの口。--loaded でなくても止める（何も外へ出さない）
// どの名前・どの scheme でも 9801 へは出さない
const PATTERNS = ['*://*:9801/*'];
const SKIP = ['OnVanishSelecting', 'OnVanishSelected', 'OnVanishCancel', 'OnVanishButtonHold', 'OnVanished',
  'OnOtherGhostVanished', 'OnFirstBoot', 'OnClose', 'OnCloseAll', 'OnGhostChanging'];
// GetFMO の作り物の応答（ゴースト 2 体）。sstp.js の loadGhosts が読む id.key\x01value の行
const FMO = ['SSTP/1.4 200 OK', 'Charset: UTF-8', '',
  'fake0001.hwnd\x011001', 'fake0001.name\x01作り物のゴーストA', 'fake0001.keroname\x01けろA',
  'fake0002.hwnd\x012002', 'fake0002.name\x01作り物のゴーストB', 'fake0002.keroname\x01けろB', '', ''].join('\r\n');
const CORS = [
  { name: 'Access-Control-Allow-Origin', value: '*' },
  { name: 'Access-Control-Allow-Methods', value: 'POST, OPTIONS' },
  { name: 'Access-Control-Allow-Headers', value: '*' },
  { name: 'Access-Control-Allow-Private-Network', value: 'true' },
];

const freePort = async () => {
  const s = createServer().listen(0, '127.0.0.1');
  await once(s, 'listening');
  const { port } = s.address();
  s.close();
  return port;
};

let edge, ws;
const requests = [], preflights = [], mismatches = [];
let clicked = false;
// 起動中の利用者の Edge とぶつかると白紙になるので、毎回使い捨てのプロファイルにする（research.md）
const profile = await mkdtemp(join(tmpdir(), 'sstp-shot-'));
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
  const send = (method, params = {}) => new Promise((res, rej) => {
    pending.set(++id, { res, rej });
    ws.send(JSON.stringify({ id, method, params }));
  });

  // 止めた要求に答える。GetFMO（と、来れば CORS の下見）だけを通し、ほかは断って記録する
  const paused = async ({ requestId, request }) => {
    const body = request.postData
      ?? (request.postDataEntries ?? []).map((e) => Buffer.from(e.bytes ?? '', 'base64').toString('utf8')).join('');
    const line = `${request.method} ${request.url} ${body.split('\r\n', 1)[0]}`;
    if (request.method === 'OPTIONS') {
      preflights.push(line);
      return send('Fetch.fulfillRequest', { requestId, responseCode: 204, responseHeaders: CORS });
    }
    const fmo = request.method === 'POST' && /^EXECUTE SSTP\/\S+\r\n/.test(body) && /\r\nCommand: GetFMO\r\n/.test(body);
    requests.push(fmo ? `${line} GetFMO` : line);
    if (fmo && clicked) {
      return send('Fetch.fulfillRequest', {
        requestId, responseCode: 200, body: Buffer.from(FMO, 'utf8').toString('base64'),
        responseHeaders: [{ name: 'Content-Type', value: 'text/plain; charset=UTF-8' }, ...CORS],
      });
    }
    mismatches.push(`${clicked ? '読み込みの外の要求' : '読み込みの前の要求'}: ${line}`);
    process.exitCode = 1;
    return send('Fetch.failRequest', { requestId, errorReason: 'BlockedByClient' });
  };

  ws.onmessage = (e) => {
    const m = JSON.parse(e.data);
    if (m.method === 'Page.loadEventFired') onLoad();
    if (m.method === 'Fetch.requestPaused') paused(m.params).catch((err) => mismatches.push(`止めた要求に答えられない: ${err.message}`));
    const p = pending.get(m.id);
    if (!p) return;
    pending.delete(m.id);
    m.error ? p.rej(new Error(`${m.error.message}`)) : p.res(m.result);
  };
  const evaluate = async (expression) => (await send('Runtime.evaluate', { returnByValue: true, expression })).result.value;

  // 頁へ行く前に止めておく（開いた時点の要求も網に出さない）
  await send('Fetch.enable', { patterns: PATTERNS.map((urlPattern) => ({ urlPattern, requestStage: 'Request' })) });
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false });
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: scheme }] });
  await send('Page.enable');
  const loaded = new Promise((r) => { onLoad = r; });
  const nav = await send('Page.navigate', { url });
  if (nav.errorText) fail(`頁が開けない: ${nav.errorText}`);
  await Promise.race([loaded, sleep(30000)]);
  await sleep(2000); // 検索の索引や遅れて付く style が落ち着くのを待つ

  // 縦のスクロールバーの幅を足し、innerWidth と同じ物差しにする（はみ出しを見逃さない）
  const MEASURE = `(() => {
    const d = document.documentElement;
    return { buttons: document.querySelectorAll('article button[data-sstp]').length,
      panels: document.querySelectorAll('.sstp-panel').length,
      scrollWidth: d.scrollWidth + innerWidth - d.clientWidth, innerWidth };
  })()`;
  const before = await evaluate(MEASURE);
  let after = null;

  if (loadedMode) {
    clicked = true;
    // 押すのは「読み込み」だけ。送るボタンには触れない
    const found = await evaluate(`(() => {
      const b = [...document.querySelectorAll('.sstp-panel button')].find((x) => x.textContent === '読み込み');
      if (!b) return false;
      b.click();
      return true;
    })()`);
    if (!found) fail('「読み込み」のボタンが無い');
    let done = false;
    for (let i = 0; i < 50 && !done; i++) {
      await sleep(200);
      done = await evaluate(`(() => {
        const b = [...document.querySelectorAll('.sstp-panel button')].find((x) => x.textContent === '読み込み');
        const note = document.querySelector('.sstp-panel .sstp-result');
        return !b.disabled && note.textContent !== '読み込み中';
      })()`);
    }
    if (!done) fail('「読み込み」が終わらない');
    const m = await evaluate(MEASURE);
    after = { buttons: m.buttons, scrollWidth: m.scrollWidth, innerWidth: m.innerWidth, requests };
    // data-sstp と記述例の字の食い違い、除くイベントのボタン
    mismatches.push(...await evaluate(`(() => {
      const skip = new Set(${JSON.stringify(SKIP)});
      const out = [];
      for (const b of document.querySelectorAll('article button[data-sstp]')) {
        const [method, hd] = JSON.parse(b.dataset.sstp);
        const name = b.getAttribute('aria-label');
        if (method === 'NOTIFY' && skip.has(hd.Event)) out.push('除くイベントのボタン: ' + hd.Event);
        if (hd.Event !== 'OnUkadocScriptExample') continue;
        const code = b.closest('div.language-sakurascript.highlight')?.querySelector('code');
        const text = code?.textContent.replace(/\\n$/, '');
        if (text === undefined || hd.Script !== text || hd.Reference0 !== text) out.push('記述例の字が違う: ' + name);
      }
      return out;
    })()`));
    if (after.buttons === 0) mismatches.push('読み込みの後のボタンが 0');
    if (requests.filter((r) => r.endsWith(' GetFMO')).length !== 1) mismatches.push(`GetFMO の数が 1 でない: ${requests.length}`);
  }

  const pos = await evaluate(`(() => {
    const el = document.querySelector(${JSON.stringify(selector)});
    if (!el) return null;
    const head = document.querySelector('.md-header, header')?.offsetHeight || 0;
    scrollTo(0, Math.max(0, el.getBoundingClientRect().top + scrollY - head - 8));
    return { y: scrollY };
  })()`);
  if (!pos) fail(`セレクタが見つからない: ${selector}`);
  await sleep(1500); // スクロールの後、ヘッダの題の切り替えの動きが終わるのを待つ

  let wrote = null;
  if (out !== '-') {
    const { data } = await send('Page.captureScreenshot', {
      format: 'png', captureBeyondViewport: true, clip: { x: 0, y: pos.y, width, height, scale: 1 },
    });
    await writeFile(out, Buffer.from(data, 'base64'));
    wrote = out;
  }
  if (mismatches.length) process.exitCode = 1;
  console.log(JSON.stringify({ page: url, scheme, wrote, before, after, preflights, mismatches }, null, 2));
} catch (e) {
  console.error(e.reason ? e.message : `失敗: ${e.message}`);
  if (requests.length || mismatches.length) console.error(JSON.stringify({ requests, preflights, mismatches }, null, 2));
  process.exitCode = 1;
} finally {
  // 先に Edge を止める（CDP を切ると横取りが外れるため）
  if (edge?.pid && edge.exitCode === null) {
    // 子のプロセス（描画・GPU）ごと止める
    spawn('taskkill', ['/PID', String(edge.pid), '/T', '/F'], { stdio: 'ignore' });
    await Promise.race([once(edge, 'exit'), sleep(5000)]);
  }
  ws?.close();
  await rm(profile, { recursive: true, force: true, maxRetries: 10, retryDelay: 300 }).catch(() => {});
}
// 負けた側の待ちのタイマーで 30 秒残らないよう、ここで終える
process.exit();
