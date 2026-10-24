// site-look-plan の使い捨ての試作: ?slp=C01,C03 を <html data-slp="C01 C03"> にし、CSS の html[data-slp~="C01"] で候補を入れたり外したりする
// リンクで頁を移ると ?slp= が消えるので、タブを閉じるまで覚えておく（?slp= を空にすると外れる）
let slp = new URLSearchParams(location.search).get('slp');
try { if (slp !== null) sessionStorage.setItem('slp', slp); else slp = sessionStorage.getItem('slp'); } catch {}
if (slp) document.documentElement.dataset.slp = slp.split(',').map((s) => s.trim()).join(' ');

// C25: さくらスクリプトの頁の外の記述例（list/propertysystem・spec/plugin など）は、原稿のコードブロックに言語の指定が無い。
// 1 行目がさくらスクリプトのタグか環境変数で始まるブロックに言語の印を付けて、C10 の色を効かせる（本番は原稿に sakurascript を書き足す想定の見本）。
// SSTP などの要求の例は 1 行目が「NOTIFY SSTP/1.1」などなので外れる
if (document.documentElement.dataset.slp?.split(' ').includes('C25')) {
  for (const code of document.querySelectorAll('.md-typeset .highlight code:not([class*="language-"])')) {
    if (/^\s*(?:\\(?:[0-9a-z_!*&-]|__)|%[A-Za-z_]+)/.test(code.textContent)) code.classList.add('language-sakurascript');
  }
}

// C10: さくらスクリプトのタグ（\0・\s[10]・\![raise,…]・\_w[100]）と環境変数（%username・%property[…]）を色の要素で包む。字はそのまま（コピーされる字は変わらない）
if (document.documentElement.dataset.slp?.split(' ').includes('C10')) {
  const token = /(\\(?:__.|_.|.)(?:\[(?:\\.|[^\]\\])*\])?)|(%[A-Za-z_?]+\d*(?:\[(?:\\.|[^\]\\])*\])?)/g;
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  for (const code of document.querySelectorAll('code.language-sakurascript')) {
    const text = code.textContent;
    let html = '', last = 0;
    for (const m of text.matchAll(token)) {
      html += esc(text.slice(last, m.index)) + `<span class="${m[1] ? 'slp-ss-tag' : 'slp-ss-env'}">${esc(m[0])}</span>`;
      last = m.index + m[0].length;
    }
    code.innerHTML = html + esc(text.slice(last));
    console.assert(code.textContent === text, 'slp C10: 字が変わった');
  }
}

// C15: ファイル構成の木（「+-」で始まる行のあるコードブロック）の名前を、拡張子があればファイル、無ければフォルダとして包む。字はそのまま
if (document.documentElement.dataset.slp?.split(' ').includes('C15')) {
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  for (const code of document.querySelectorAll('pre > code:not([class*="language-"])')) {
    const text = code.textContent;
    if (!/^[\s　]*\+-/m.test(text)) continue;
    code.innerHTML = text.split('\n').map((line) => {
      const m = line.match(/^([\s　]*\+-)(\S+)(.*)$/);
      if (!m) return esc(line);
      const kind = /\.[^.()]+$/.test(m[2]) ? 'slp-tree-file' : 'slp-tree-dir';
      return `${esc(m[1])}<span class="${kind}">${esc(m[2])}</span>${esc(m[3])}`;
    }).join('\n');
    console.assert(code.textContent === text, 'slp C15: 字が変わった');
  }
}

// C23: list/propertysystem の「- **キー**: 説明」だけが並ぶ箇条書きを、2 列の表に見せる（本番は原稿を Markdown の表に書き換える想定の見本）。
// 項目に入れ子の箇条書きやコードブロックがある箇条書きは、そのまま残す
if (document.documentElement.dataset.slp?.split(' ').includes('C23') && location.pathname.includes('/list/propertysystem/')) {
  for (const ul of document.querySelectorAll('.md-typeset ul')) {
    const items = [...ul.children];
    const simple = items.every((li) => {
      const first = li.firstElementChild?.tagName === 'P' ? li.firstElementChild : li;
      return first.firstElementChild?.tagName === 'STRONG' && first.firstChild === first.firstElementChild
        && /^:\s/.test(first.firstElementChild.nextSibling?.textContent ?? '') && !li.querySelector('ul, ol, pre');
    });
    if (!items.length || !simple) continue;
    const table = document.createElement('table');
    table.className = 'slp-keytable';
    table.innerHTML = '<thead><tr><th>キー</th><th>内容</th></tr></thead><tbody></tbody>';
    for (const li of items) {
      const first = li.firstElementChild?.tagName === 'P' ? li.firstElementChild : li;
      const key = first.firstElementChild;
      key.nextSibling.textContent = key.nextSibling.textContent.replace(/^:\s*/, '');
      key.remove();
      const tr = table.tBodies[0].insertRow();
      tr.insertCell().append(...key.childNodes);
      tr.insertCell().append(...li.childNodes);
    }
    ul.replaceWith(table);
  }
}

// C22: manual/ghost でファイル名を帯にするとき、名前の後ろの「: 」を外す（本番は prepare_site.py かテンプレートで外す想定。C14 の条件と同じ）
if (['C14', 'C22'].every((c) => document.documentElement.dataset.slp?.split(' ').includes(c)) && document.querySelector('h1#ゴースト')) {
  for (const strong of document.querySelectorAll('.md-typeset > ul > li > p:first-child > strong:first-child')) {
    const t = strong.nextSibling;
    if (t?.nodeType === Node.TEXT_NODE) t.textContent = t.textContent.replace(/^:\s*/, '');
  }
}
