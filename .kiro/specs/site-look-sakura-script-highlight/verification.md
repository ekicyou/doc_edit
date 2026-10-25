# 確かめの記録: site-look-sakura-script-highlight

## 変更の前（タスク 1.2、2026-10-25）

### 控えの置き場と版
- 書き出した版: 作業木 `.worktrees/site-look-sakura-script-highlight/` の HEAD `0eb3fb9`（= ukadoc-spec の `origin/main`）
- 置き場（Claude のスクラッチ。git に載らない。`S` = `C:\Users\maz-o\AppData\Local\Temp\claude\C--home-maz-git-doc-edit\fc194b1e-28b1-4328-9e08-7d8780051c15\scratchpad`）

| 所 | 中身 |
|---|---|
| `S\before\src\` | `git archive` で書き出した原稿と設定。`_site\` が build の出力 |
| `S\before\baseline\` | 控えの数と字: `static.json`（全頁）・`search.json`（写し）・`browser.json`（ブラウザで測った字・高さ・形） |
| `S\before\recheck\` | 同じ式で測り直したもの（控えと違い 0。測りが毎回同じになることの確かめ） |
| `S\tools\` | 測りのスクリプト `measure_static.py`・`measure_browser.mjs`・`compare.py` |

### 作り直しと配り直しの式（Git Bash）
```sh
S=/c/Users/maz-o/AppData/Local/Temp/claude/C--home-maz-git-doc-edit/fc194b1e-28b1-4328-9e08-7d8780051c15/scratchpad
PY=/c/home/maz/git/doc_edit/.venv/Scripts/python.exe
# 作り直し（S/before/src が消えたとき）
mkdir -p $S/before/src && git -C /c/home/maz/git/doc_edit/.worktrees/site-look-sakura-script-highlight archive 0eb3fb9 | tar -x -C $S/before/src
cd $S/before/src && $PY scripts/prepare_site.py && /c/home/maz/git/doc_edit/.venv/Scripts/zensical.exe build --strict
# 配り直し（控えは http://127.0.0.1:8030/ 。serve の 8000 とは別）
$PY -m http.server 8030 --bind 127.0.0.1 --directory $S/before/src/_site
```
- `prepare_site.py` と `zensical build --strict` はどちらも exit 0（「No issues found」）

### 測りと比べの式
```sh
# 配る HTML を数える（作業木なら作業木の _site/）
$PY -I $S/tools/measure_static.py <_site> <出力の dir>
# ブラウザで測る（Edge ヘッドレス + CDP、明。基の URL の下の list/sakura-script/・spec/sstp/・manual/install/ を幅 1000・375 で）
node $S/tools/measure_browser.mjs <基の URL（例 http://127.0.0.1:8000/ukadoc-spec/）> <出力の dir>
# 控えと比べる（違いが 1 つでもあれば exit 1。字化けするときは PYTHONIOENCODING=utf-8）
$PY -I $S/tools/compare.py $S/before/baseline <出力の dir>
```
- `compare.py` が比べるもの: 頁ごとの `article` の中の見出しの id の並び・`hr` の数・本文の字（タグを除き空白を詰めたもの）、頁の中の `class="headerlink"`・`class="md-nav__link` の数、`search.json` の各項目の `location`・題・字（タグを除き空白を詰めたもの）、ブラウザの `pre > code` の数・`innerText.trimEnd()`・高さ・ボタンの数・箱・点線・重なり・`.highlight` の地の色・`scrollWidth`
- コードブロックの形の数（`<div class="highlight">`・`<pre class="highlight">`・`language-sakurascript`・`language-ss`）は比べずに前後を並べて出す（変わるのが正しいため）

### 控えた数

| もの | 数 |
|---|---|
| 頁（HTML、`404.html` を含む） | 41 |
| `article` の中の見出しの id（合計） | 2579（`list/sakura-script` は 649） |
| `class="headerlink"`（合計） | 2579 |
| `class="md-nav__link`（合計） | 6370 |
| `article` の中の `hr`（合計） | 1921 |
| `<div class="highlight">` | 449（`list/sakura-script` は 288） |
| `<pre class="highlight">`・`language-sakurascript`・`language-ss` | 0・0・0 |
| `search.json` の項目 | 2579 |

ブラウザ（明、`pre > code` を頁の頭から順に）:

| 頁 | 幅 | `pre > code` | ボタン | 箱 | 点線 | 重なり | `.highlight` の地 | `scrollWidth` |
|---|---|---|---|---|---|---|---|---|
| `list/sakura-script` | 1000 / 375 | 288 | 288 | 255 | 33 | 0 | `rgb(238, 242, 248)` 288 | 985 / 360 |
| `spec/sstp` | 1000 / 375 | 18 | 18 | 3 | 0 | 0 | 透明 15・`rgb(238, 242, 248)` 3 | 985 / 360 |
| `manual/install` | 1000 / 375 | 6 | 6 | 0 | 0 | 0 | 透明 6 | 985 / 360 |

- 箱は `h4:has(+ .highlight)`、点線は `border-top-style: dashed` の `.highlight`、重なりは `pre > code` の空白でない字（Range で 1 字ずつ）の矩形がそのブロックの `.md-code__nav` の矩形と重なるブロックの数。ボタンの数が 2 回続けて同じになるまで待ってから測った
- 透明の `.highlight` の中の `code` の地は `rgb(245, 245, 245)`（`spec/sstp` 15・`manual/install` 6）
- `list/sakura-script` の `pre > code` は 288 で、287 が ```` ```sakurascript ````、1 つが言語の名前の無いブロック（`event/bang-vanishbymyself.md` の 17 行目）。控えでは見分けが付かないので、コピーの字（`innerText.trimEnd()`）と高さは 288 個を順に控えた。作業木の側も同じ 288 個を順に比べる（287 個を含む）
- 高さの合計: 幅 1000 で 16458.09 px、幅 375 で 27401.06 px（288 個）

### 画面
- `screenshots/before-sstp-light.png`: `spec/sstp/` の最初の言語の指定の無いブロック（セレクタ `article .highlight:not(h4 + .highlight)`）、明、1000×700。式は `node .kiro/specs/completed/site-look-plan/tools/shot.mjs http://127.0.0.1:8030/spec/sstp/ "article .highlight:not(h4 + .highlight)" <出力> light`。上の端のほかにヘッダの紺の行は無く、撮り直しは 0 枚
