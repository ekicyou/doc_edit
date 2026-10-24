// site-look-plan の使い捨ての試作: ?slp=C01,C03 を <html data-slp="C01 C03"> にし、CSS の html[data-slp~="C01"] で候補を入れたり外したりする
const slp = new URLSearchParams(location.search).get('slp');
if (slp) document.documentElement.dataset.slp = slp.split(',').map((s) => s.trim()).join(' ');

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
