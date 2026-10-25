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

## 字句の規則（タスク 2.2、2026-10-25）

作業木の `assets/sakurascript.js`（未コミット、2.1 のまま。字は変えない）を、偽の `document` の上で Node の `vm` で流して確かめた。作業木の HEAD は `0eb3fb9`、原稿は変えていない。

### 流した式（Git Bash）
```sh
S=/c/Users/maz-o/AppData/Local/Temp/claude/C--home-maz-git-doc-edit/fc194b1e-28b1-4328-9e08-7d8780051c15/scratchpad
node $S/lexer/check.mjs    # 例の表 30 例・ss・2 回流し。「cases 30 + ss + twice: NG 0」、exit 0
node $S/lexer/corpus.mjs   # 原稿の全ブロックの数と試作との違い。最後の行「OK」、exit 0
```
- `check.mjs`: 偽の `code`（`textContent`・`children`・`classList.add`・`replaceChildren`）と偽の `document`（`querySelectorAll`・`createElement`）。`console.warn` を数える
- `corpus.mjs`: 作業木の `.md`（`_site`・`_raw`・`migration` と `.` で始まる所を除く）から ```` ```sakurascript ```` のフェンスの中身を取り、末尾の改行を 1 つ除き、タブを 4 桁の区切りで空白に広げる（Python-Markdown と同じ。`event/bang-set-otherghosttalk-true-false-before-after.md`・`event/bang-set-othersurfacechange-true-false.md` の 2 ブロックがタブで始まる）。こうして取った 287 個が、作業木の `_site/list/sakura-script/index.html` の `code.language-sakurascript` の中身（実体参照を戻したもの）の集まりと同じことを確かめてから流す（インデントされたフェンスは 0）。試作の正規表現は `mockups/mockup.js` の C10 の `token` をそのファイルから読む

### 例の表（設計の LexerCheck の 30 例）
- 30 例すべてが期待どおり（`[種類:字]` と `·地の文` の並びが一致）で、どれも包んだ後の字が入力と同じ
- 警告の数も表のとおり: 誤りの例 7 つ（`\_?` が閉じない・`[` が閉じない・`"` が閉じない・`%property[` が閉じない・末尾の `\`・`\` + 改行・`\__` + 改行）で 1 ずつ、誤りの無い 23 例で 0
- ```` ```ss ```` の `\0\s[0]`: `language-sakurascript` が付き `[tag:\0][tag:\s[0]]`
- 同じ `code` に 2 回流す: `[tag:\0]` のまま、2 回目は警告 1 で包まない

### 原稿の全ブロック

| もの | 数 |
|---|---|
| ```` ```sakurascript ```` のブロック | 287（`_site` の `code.language-sakurascript` 287 と字の集まりが同じ） |
| 包んだ後の字が同じブロック | 287 |
| タグ（`sakurascript-tag`） | 500 |
| 環境変数（`sakurascript-env`） | 6（`%username`・`%ms`・`%mp`・`%mh`・`%me`・`%mt` が 1 つずつ） |
| 誤り（`sakurascript-error`） | 0 |
| 警告（`console.warn`） | 0 |
| 試作の正規表現で切れる所 | 508 |

要件の規則と違う読み方が要るブロックは無かった。

### 試作の規則との違い 13 か所
同じブロックを試作の C10 の正規表現で切った所と、`sakurascript.js` で包んだ所（ブロックの中の位置と字）を比べ、頁ごとに違う所の多い方の数を足した。設計の表と同じ。

| 頁の原稿（`list/sakura-script/`） | 試作 | 本番 | か所 |
|---|---|---|---|
| `wait/w.md` | `\w` 4 つ（後ろの `9`・`9`・`9`・`2` が地の文） | `\w9` 3・`\w2` 1 | 4 |
| `font/f-align.md` | `\w` 2 つ | `\w9` 2 | 2 |
| `scope/pID.md` | `\p` 2 つ | `\p2`・`\p3`（後ろの `3`・`4` は地の文） | 2 |
| `balloon-text/bID.md` | `\b` | `\b2` | 1 |
| `surface/sID.md` | `\s` | `\s1` | 1 |
| `choice/q-script.md` | `\q[その１,"script:\q[その２,script:その３はない]`（`"]` が地の文） | 全体が 1 つのタグ | 1 |
| `balloon-text/_-q.md` | 囲みの中の `\1`・`\n` もタグ | 囲みの中は地の文 | 2 |
| 計 | | | 13 |

## 配りと数（タスク 3.2、2026-10-25）

### 配りの結果
- プレビュー: 親が作業木で `prepare_site.py` → `zensical build --strict` → `zensical serve` の順に起動し直したもの（作業木の HEAD `4ce6b5e`、2.1〜2.4 のコミットの後）。http://127.0.0.1:8000/ukadoc-spec/
- `/ukadoc-spec/assets/sakurascript.js` と `/ukadoc-spec/assets/extra.css` はどちらも 200 で、作業木の `assets/` のファイルとバイトが同じ。`extra.css` の 174 行目に `/* site-look-sakura-script-highlight: 記述例のタグと環境変数 */` がある
- 全頁（41 頁、`404.html` を含む）の HTML に `assets/sakurascript.js` の `<script src>` が 1 つずつある（1 でない頁 0）
- 8000 で配る 40 頁（`index.html` のもの）の HTML は、作業木の `_site/` の HTML の後ろに serve が live-reload の `<script type="module">` を足しただけ（それ以外の違い 0）。よって数と比べは作業木の `_site/` を測った
- 控えは http://127.0.0.1:8030/ に配られている（200）。測りは 1.2 の `S\before\baseline\` と比べた

### 数（全頁の `article` の中）

| もの | 変更の前 | 変更の後 | 期待 |
|---|---|---|---|
| `<pre class="highlight">` | 0 | 449 | 449 |
| `<code class="language-sakurascript">` | 0 | 287 | 287 |
| 言語の印の無い `<pre class="highlight"><code>` | — | 162 | 162 |
| `language-ss` | 0 | 0 | 0 |
| `<div class="highlight">` | 449 | 0 | 0 |
| `assets/sakurascript.js` の読み込み（頁ごと） | — | 41 頁すべてで 1 | 1 |

控えと同じに保つもの:

| もの | 変更の前 | 変更の後 |
|---|---|---|
| 頁 | 41 | 41 |
| 見出しの id（合計） | 2579 | 2579 |
| `class="headerlink"`（¶） | 2579 | 2579 |
| `class="md-nav__link`（目次） | 6370 | 6370 |
| `hr` | 1921 | 1921 |
| `search.json` の項目 | 2579 | 2579 |

### 控えとの比べ
- 頁ごとの見出しの id の並び・¶ の数・目次の数・`hr` の数・本文の字（タグを除き空白を詰めたもの。言語の指定の無いブロックの字を含む）: 控えと違う頁 0
- `search.json` の各項目の `location`・題・字（タグを除き空白を詰めたもの）: 違う項目 0
- `div.highlight` → `pre.highlight` の形の変わりは字に出ない。本文の字は空白を詰めて比べる。空白を詰めずに全 449 ブロックの `code` の字を比べると、違いは各ブロックの末尾の改行 1 つが消えたことだけ（設計で予期済み。コピーは `trimEnd()` するので字は変わらない）

### 流した式（Git Bash）
```sh
S=/c/Users/maz-o/AppData/Local/Temp/claude/C--home-maz-git-doc-edit/fc194b1e-28b1-4328-9e08-7d8780051c15/scratchpad
PY=/c/home/maz/git/doc_edit/.venv/Scripts/python.exe
W=/c/home/maz/git/doc_edit/.worktrees/site-look-sakura-script-highlight
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:8000/ukadoc-spec/assets/sakurascript.js   # 200
curl -s http://127.0.0.1:8000/ukadoc-spec/assets/extra.css | grep -n "site-look-sakura-script-highlight:"
$PY -I $S/tools/served_prefix.py $W/_site                 # 「pages 40 not-prefix 0」
$PY -I $S/tools/measure_static.py $W/_site $S/after32     # 1.2 と同じ道具で数える
$PY -I $S/tools/check_serve.py $W/_site $S/before/baseline $S/after32   # 形の数・読み込み・控えとの静的な比べ。exit 0
```
- `check_serve.py` は、形の数が期待どおりで、読み込みが 1 でない頁が無く、控えとの静的な比べ（頁ごとの id の並び・¶・目次・`hr`・本文の字）と `search.json` の項目の字と題に違いが無いときだけ exit 0。ブラウザの比べ（`browser.json`）は 3.3 で行う

## 字とコピー（タスク 3.3、2026-10-25）

作業木の serve（http://127.0.0.1:8000/ukadoc-spec/ 、作業木の HEAD `4ce6b5e`）と控え（http://127.0.0.1:8030/）を、Edge ヘッドレス + CDP（明、幅 1000）で同じ手順で測った。

### 包む前後の字と包みの数（`list/sakura-script`）
- `fetch(location.href)` で取り直した HTML を `DOMParser` で読み、`article code.language-sakurascript` の `textContent` を、包んだ後の頁の同じ `code` の `textContent` と順に比べた

| もの | 数 |
|---|---|
| 取り直した HTML の `code.language-sakurascript` | 287 |
| 頁の `code.language-sakurascript` | 287 |
| 包む前後で字の違うブロック | 0 |
| `span` が入ったブロック | 287 |
| タグ（`.sakurascript-tag`） | 500 |
| 環境変数（`.sakurascript-env`） | 6 |
| 誤り（`span.sakurascript-error`） | 0 |
| 言語の印の無い `code` の中の包み | 0 |
| `sakurascript:` を含む `console.warn`（`list/sakura-script`・`spec/sstp`・`manual/install`） | 0・0・0 |

### コピーの字（`innerText.trimEnd()`）
- 1.2 の `measure_browser.mjs` で作業木の側を測り、`compare.py` で控え（`S\before\baseline\`）と比べて「違い 0」（exit 0）
- `list/sakura-script` の `pre > code` 288 個（287 が記述例、1 つが言語の名前の無いブロック）の `innerText.trimEnd()` が幅 1000・375 とも控えと 288 個すべて同じ。`spec/sstp` 18 個・`manual/install` 6 個も同じ

### ボタンのコピー
- `Browser.grantPermissions`（`clipboardReadWrite`・`clipboardSanitizedWrite`）と `Emulation.setFocusEmulationEnabled` を与え、見出しの後の最初の `.highlight` のコピーのボタン（`button.md-code__button`、`data-md-type="copy"`）を `userGesture` 付きで押し、`navigator.clipboard.readText()` で読んだ（押す前にクリップボードを別の字で埋めた）

| 見出し | 字の数 | 控えと同じ | ブロックの `innerText.trimEnd()` と同じ |
|---|---|---|---|
| `#bang-lock-repaint` | 71 | 同じ | 同じ |
| `#q-script` | 71 | 同じ | 同じ |
| `#environmentvariable` | 56 | 同じ | 同じ |

### 検索の字
- `search.json` の各項目の `location`・題・字は 3.2 の `check_serve.py` で控えと違い 0（「配りと数」の節）。空白を詰めない違いは各ブロックの末尾の改行 1 つだけ

### 動かないときと外部の読み込み
- スクリプトを切った頁（`Emulation.setScriptExecutionDisabled` を true にして `list/sakura-script` を開き、`DOM` ドメインで数えた）: `pre > code` 288（うち `code.language-sakurascript` 287）、`code` の中の `span` 0、子に字のノードでないものを持つ `code` 0。ボタン（`.md-code__nav`）も 0 で、控えと同じ（控えも `span` 0・字のノードだけ）
- ふつうの頁の通信（`Network.requestWillBeSent`、`data:`・`blob:` を除く）: `127.0.0.1` の外への読み込みは 3 頁とも控えと同じ集まり（`list/sakura-script` 8 件＝`fonts.googleapis.com` 1・`fonts.gstatic.com` 5・`api.github.com` 2、`spec/sstp` 6 件、`manual/install` 4 件。`api.github.com` は最初の頁だけで、テーマの倉庫の情報の読み込み）。控えより増えたのは 3 頁とも `127.0.0.1` の `assets/sakurascript.js` 1 件だけ

## 形と折り返し（タスク 3.3、2026-10-25）

1.2 の `measure_browser.mjs` で作業木の側を測り、`compare.py` で控えと比べた。違い 0。

| 頁 | 幅 | `pre > code` | ボタン | 箱 | 点線 | 重なり | `.highlight` の地 | `code` の地 | 高さの合計（px） | `scrollWidth` |
|---|---|---|---|---|---|---|---|---|---|---|
| `list/sakura-script` | 1000 | 288 | 288 | 255 | 33 | 0 | `rgb(238, 242, 248)` 288 | 透明 288 | 16458.09 | 985 |
| `list/sakura-script` | 375 | 288 | 288 | 255 | 33 | 0 | `rgb(238, 242, 248)` 288 | 透明 288 | 27401.06 | 360 |
| `spec/sstp` | 1000 | 18 | 18 | 3 | 0 | 0 | 透明 15・`rgb(238, 242, 248)` 3 | `rgb(245, 245, 245)` 15・透明 3 | 2300.16 | 985 |
| `spec/sstp` | 375 | 18 | 18 | 3 | 0 | 0 | 同上 | 同上 | 2471.44 | 360 |
| `manual/install` | 1000 | 6 | 6 | 0 | 0 | 0 | 透明 6 | `rgb(245, 245, 245)` 6 | 1202.72 | 985 |
| `manual/install` | 375 | 6 | 6 | 0 | 0 | 0 | 透明 6 | `rgb(245, 245, 245)` 6 | 1370.19 | 360 |

- どの行も控えの数と同じ。ブロックごとの高さも 312 個（3 頁）すべて控えと同じ（合計だけでなく 1 個ずつ比べた）
- `div.highlight` → `pre.highlight` の形の変わりで、C18 の箱・C09 の点線・ボタンと字の重なり・地の色は変わっていない

### 流した式（Git Bash）
```sh
S=/c/Users/maz-o/AppData/Local/Temp/claude/C--home-maz-git-doc-edit/fc194b1e-28b1-4328-9e08-7d8780051c15/scratchpad
PY=/c/home/maz/git/doc_edit/.venv/Scripts/python.exe
mkdir -p $S/after33 && cp $S/after32/static.json $S/after32/search.json $S/after33/   # 静的な数は 3.2 のもの
node $S/tools/measure_browser.mjs http://127.0.0.1:8000/ukadoc-spec/ $S/after33
PYTHONIOENCODING=utf-8 $PY -I $S/tools/compare.py $S/before/baseline $S/after33       # 「違い 0」、exit 0
# 包む前後の字・包みの数・警告・ボタンのコピー・スクリプトを切った頁・通信（作業木と控えで同じ手順）
node $S/tools/check_page33.mjs http://127.0.0.1:8000/ukadoc-spec/ $S/after33/page33.json
node $S/tools/check_page33.mjs http://127.0.0.1:8030/ $S/before/page33.json
# 2 つの page33.json のコピーの字・外への読み込み・127.0.0.1 の中の読み込みを比べた（node -e の使い捨て）
```
