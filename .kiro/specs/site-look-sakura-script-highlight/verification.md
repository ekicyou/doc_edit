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

## `ss` と読み物の頁（タスク 3.4、2026-10-25）

作業木の HEAD `4ce6b5e` を `git archive` で使い捨ての写し（`S\copy34\src\`）に書き出し、原稿に記述例を足して build し、http://127.0.0.1:8032/ で配って測った。終わったら配りを止め、写しのフォルダごと消した（結果の JSON だけ `S\after34\check34.json` に残した）。作業木は `git status` で変更 0、HEAD は `4ce6b5e` のまま。serve（8000）は止めていない。

### 足した記述例（写しの中だけ）
- `list/sakura-script/environment-variable/environmentvariable.md` の末尾: ```` ```ss ```` で `\0\s[5]%msの話をするね。\e`
- `memo/memo.md` の末尾: 見出し `## 記述例の確かめ`、```` ```ss ```` で `\0\s[0]%usernameさん、こんにちは。\e`、閉じない `[` のある ```` ```sakurascript ```` で `\1\s[10]選んでね。\n\q[はい,OnYes`
- `prepare_site.py` と `zensical build --strict` はどちらも exit 0（「No issues found」）

### 数（写しの `_site` の HTML）

| もの | 数 | 期待 |
|---|---|---|
| `class="language-ss"` | 2（`list/sakura-script` 1・`memo/memo` 1） | 2 |
| `class="language-sakurascript"` | 288（287 + `memo/memo` の誤りのブロック） | — |
| 言語の印（上の 2 つの合計） | 290 | 290 |

### ブラウザ（Edge ヘッドレス + CDP、明、幅 1000）

| 頁 | 印の付いた `code` | 字の違い | コピーの字の違い | `span` の入った `code` | タグ | 環境変数 | 誤り | `sakurascript:` の警告 |
|---|---|---|---|---|---|---|---|---|
| `list/sakura-script` | 288 | 0 | 0 | 288 | 503 | 7 | 0 | 0 |
| `memo/memo` | 2 | 0 | 0 | 2 | 6 | 1 | 1 | 1 |

- `language-ss` の `code` は 2 つとも `class` が `language-ss language-sakurascript` になり、中が `[tag:\0][tag:\s[5]][env:%ms]…[tag:\e]`（`memo/memo` は `[tag:\0][tag:\s[0]][env:%username]…[tag:\e]`）の並び
- 見え方は `list/sakura-script` と `memo/memo` で同じ: タグ `rgb(138, 13, 79)`、環境変数 `rgb(122, 46, 10)`・太さ 700（明）。`memo/memo` の暗はタグ `rgb(244, 143, 177)`・環境変数 `rgb(246, 173, 123)`・太さ 700
- 字の違いは、`fetch` で取り直した HTML の `code` の `textContent` と頁の `textContent` を順に比べた数。コピーの字の違いは、頁の `innerText.trimEnd()` と取り直した `textContent.trimEnd()` を比べた数

## 誤りの見え方（タスク 3.4、2026-10-25）

上の写しの `memo/memo` の誤りのブロック（`\1\s[10]選んでね。\n\q[はい,OnYes`）を、明（`default`）で開いて測り、ヘッダの切り替え（「ダークモードに切り替え」のラベル）を押して `data-md-color-scheme` が `slate` になってから、読み込み直さずに同じく測った。

| もの | 明 | 暗 |
|---|---|---|
| `span.sakurascript-error` の数 | 1 | 1 |
| 誤りの字 | `\q[はい,OnYes`（`\q[` からブロックの終わりまで。後ろは空の字のノードだけ） | 同じ |
| 前の包み | `\1`・`\s[10]`・`\n` がタグ（誤りの前は読み進める） | 同じ |
| `title` | `閉じる ] が無い（引数の " が閉じていないときも）` | 同じ |
| `text-decoration`（computed） | `underline`・`wavy`・`rgb(198, 40, 40)`（`#c62828`）、`text-decoration-skip-ink: none` | `underline`・`wavy`・`rgb(255, 138, 128)`（`#ff8a80`）、同じ |
| 字の色・太さ・地 | `rgb(54, 70, 78)`（`code` と同じ）・400・透明 | `rgba(213, 216, 226, 0.82)`（`code` と同じ）・400・透明 |
| 包む前後の字（`textContent`） | 同じ | 同じ |
| コピー（`innerText.trimEnd()`） | 同じ | 同じ |
| ボタンのコピー（クリップボード） | `\1\s[10]選んでね。\n\q[はい,OnYes`（`innerText.trimEnd()` と同じ） | 同じ |

### 警告
- 頁を開いたとき `console.warn` が 1 つ: `sakurascript: 閉じる ] が無い（引数の " が閉じていないときも）`・`/memo/memo/#記述例の確かめ`・`\q[はい,OnYes`（わけ・頁と見出しの id・誤りの頭）
- 暗のまま読み込み直しても同じ 1 つが出る（`data-md-color-scheme` は `slate` のまま）

### 下線の対比
地は要素から `html` までの `backgroundColor` を重ねた色（`site-look-list-items` の「流した式」の `bgOf`・`ratio`）。誤りのブロックは見出しの後でない（箱でない）ので、測った地はコードの地。箱の地の値は、測った下線の色と 3.3・`site-look-list-items` で測った箱の地から同じ式で計算した。

| 測る所 | 表示 | 下線 | 地 | 対比 | 見込み | 線 | 判定 |
|---|---|---|---|---|---|---|---|
| 誤りの下線 / コードの地 | 明 | `#c62828` | `#f5f5f5`（測った） | 5.16 | 4.9 | 3（3.8） | 満たす |
| 誤りの下線 / 箱の地 | 明 | `#c62828` | `#eef2f8`（計算） | 5.00 | 5.1 | 3（3.8） | 満たす |
| 誤りの下線 / コードの地 | 暗 | `#ff8a80` | `#272a35`（測った） | 6.26 | 6.4 | 3（3.8） | 満たす |
| 誤りの下線 / 箱の地 | 暗 | `#ff8a80` | `#1d2433`（計算） | 6.80 | 7.0 | 3（3.8） | 満たす |

- 設計の見込み（明 5.1・暗 7.0）は丸めた色からの値で、測った下線の色からの計算が上の値。下線の色はタグの赤紫（明 `rgb(138, 13, 79)`・暗 `rgb(244, 143, 177)`）と別の色

### 画面
- `screenshots/after-error-light.png`・`screenshots/after-error-dark.png`: 写しの `memo/memo/`、1000×700、見出し「記述例の確かめ」を頭に寄せた位置（頁の終わりに当たるので、実際の位置は頁の最下部）。明は `prefers-color-scheme: light` で開き、暗はヘッダの切り替えの後。波線は誤りの所（`\q[はい,OnYes`）の下だけに出ている
- 撮り直し 1 回: 最初は `shot.mjs` と同じく `captureBeyondViewport` と `clip` で撮ったところ、明の画面の下にヘッダの紺の行が二重に写り（頁の終わりを越えた切り出し）、暗の画面にコピーの知らせとボタンのフォーカスの枠が写った。ビューポートだけを撮る形に替え、コピーの確かめより先に、フォーカスを外して 3 秒待ってから撮り直した。撮り直した 2 枚はヘッダの紺の行が上の端だけ

### 流した式（Git Bash）
```sh
S=/c/Users/maz-o/AppData/Local/Temp/claude/C--home-maz-git-doc-edit/fc194b1e-28b1-4328-9e08-7d8780051c15/scratchpad
PY=/c/home/maz/git/doc_edit/.venv/Scripts/python.exe
W=/c/home/maz/git/doc_edit/.worktrees/site-look-sakura-script-highlight
mkdir -p $S/copy34/src && git -C $W archive 4ce6b5e | tar -x -C $S/copy34/src
# 上の記述例を cat <<'EOF' >> で 2 つの .md の末尾に足す（printf はバックスラッシュを解釈するので使わない）
cd $S/copy34/src && $PY scripts/prepare_site.py && /c/home/maz/git/doc_edit/.venv/Scripts/zensical.exe build --strict
grep -o 'class="language-[a-z]*"' -r --include=*.html _site | awk -F: '{print $2}' | sort | uniq -c   # 288・2
$PY -m http.server 8032 --bind 127.0.0.1 --directory $S/copy34/src/_site    # 別の口で配る
node $S/tools/check_copy34.mjs http://127.0.0.1:8032/ $S/after34/check34.json /c/home/maz/git/doc_edit/.kiro/specs/site-look-sakura-script-highlight/screenshots
# 配りを止め、rm -rf $S/copy34。git -C $W status --short が空
```
- `check_copy34.mjs`: `list/sakura-script`・`memo/memo` の印・包み・字・コピーを数え、`memo/memo` の誤りのブロックの範囲・`title`・`text-decoration`・下線と地の対比・ボタンのコピーを明で測り、画面を撮り、ヘッダの切り替えで暗にして同じく測って撮り、暗のまま読み込み直して警告を見る

## 測る版（タスク 4.1、2026-10-25）

- `git -C ukadoc-spec fetch origin` の後も `origin/main` は `0eb3fb9` のまま（作業木の分岐点）。merge は要らず、`origin/main` は作業木の先祖
- Build Gate は 3.1 で `4ce6b5e` に対して exit 0（その後の作業木の変更なし）。控えと 2.2〜3.4 の確かめは作り直さない
- 4.2・4.3 は作業木 `4ce6b5e`（`origin/main` `0eb3fb9` の上）で測る

## 対比（タスク 4.2、2026-10-25）

### 測った版と測り方
- 作業木 `4ce6b5e`（`origin/main` `0eb3fb9` の上）の `zensical serve`（http://127.0.0.1:8000/ukadoc-spec/ ）。serve は止めず、作業木で `prepare_site.py` は流していない。作業木の変更 0（色を直す要が無かった）
- Edge ヘッドレス + CDP、幅 1000×700、新しい profile、`prefers-color-scheme: light`。頁は明（`default`）で開き、暗はヘッダの切り替え（「ダークモードに切り替え」）を押して移った（読み込み直していない。頁に置いた印 `window.__mark` が切り替えの後も残る）
- 式は `site-look-list-items` の「流した式」の `parse`・`over`・`bgOf`・`lum`・`ratio`。ただし `parse` に 1 つ足した: 薄い地の `color-mix(in srgb, currentColor 9%, transparent)` は `getComputedStyle` で `color(srgb 0.54 0.05 0.31 / 0.09)` の形（0〜1）で返るので、この形のときだけ R・G・B を 255 倍する。足さずに測ると薄い地が黒に近い色として重なり、明の箱の薄い地が 6.79 と誤って出た（直した後は設計の測りと同じ 7.06）
- 薄い地は字の要素の `backgroundColor`（字の色の 9%）を、その親から `html` までを重ねた地にさらに重ねた色。白地とコードの地（箱の外）の上の値は、測った字の色と薄い地のアルファを、測った地（白は `#ffffff`、コードの地は `spec/sstp` の箱でないブロックの `code` で測った明 `#f5f5f5`・暗 `#272a35`）に同じ式で重ねて計算した（記述例は今は箱の中だけにある）

### 測る所と線（結果）

| 測る所 | 表示 | fg（`color`） | 地 | 対比 | 設計の測り / 見込み | 線 | 判定 |
|---|---|---|---|---|---|---|---|
| タグ / 箱の地 | 明 | `rgb(138, 13, 79)`（`#8a0d4f`） | `#eef2f8`（測った） | 8.30 | 8.30 | 7（3.5） | 満たす |
| タグ / 箱の薄い地 | 明 | 同上 | `#e5dde9`（測った） | **7.06**（いちばん弱い） | 7.06 | 7（3.5） | 満たす |
| タグ / 白地・その薄い地 | 明 | 同上 | `#ffffff`・`#f4e9ef`（計算） | 9.33・7.90 | 9.33・7.88 | 7（3.5） | 満たす |
| タグ / コードの地・その薄い地 | 明 | 同上 | `#f5f5f5`・`#ebe0e6`（計算） | 8.56・7.27 | 8.56・7.26 | 7（3.5） | 満たす |
| 環境変数 / 箱の地・その薄い地 | 明 | `rgb(122, 46, 10)`（`#7a2e0a`） | `#eef2f8`・`#e4e0e3`（測った） | 8.41・7.24 | 8.41・7.24 | 7（3.5） | 満たす |
| 環境変数 / 白地・その薄い地 | 明 | 同上 | `#ffffff`・`#f3ece9`（計算） | 9.45・8.10 | 9.45・8.09 | 7（3.5） | 満たす |
| 環境変数 / コードの地・その薄い地 | 明 | 同上 | `#f5f5f5`・`#eae3e0`（計算） | 8.67・7.45 | 8.67・7.45 | 7（3.5） | 満たす |
| タグ / 箱の地・その薄い地 | 暗 | `rgb(244, 143, 177)`（`#f48fb1`） | `#1d2433`・`#302e3e`（測った） | 6.96・5.95 | 6.96・5.95 | 4.5（3.6） | 満たす |
| タグ / コードの地・その薄い地 | 暗 | 同上 | `#272a35`・`#393340`（計算） | 6.41・5.45 | 6.41・5.47 | 4.5（3.6） | 満たす |
| 環境変数 / 箱の地・その薄い地 | 暗 | `rgb(246, 173, 123)`（`#f6ad7b`） | `#1d2433`・`#313039`（測った） | 8.27・6.92 | 8.27・6.92 | 4.5（3.6） | 満たす |
| 環境変数 / コードの地・その薄い地 | 暗 | 同上 | `#272a35`・`#3a363b`（計算） | 7.61・6.33 | 7.61・6.31 | 4.5（3.6） | 満たす |
| 参考: 地の文 / 箱の地 | 明 | `rgb(54, 70, 78)` | `#eef2f8` | 8.72 | 8.72 | 変えない（3.3） | 変わらない |
| 参考: 地の文 / 箱の地 | 暗 | `rgba(213, 216, 226, 0.82)` | `#1d2433` | 7.80 | 7.80 | 変えない（3.3） | 変わらない |
| 検索の強調の中のタグ（`?h=raise`） | 明 | `rgb(138, 13, 79)` | `#f2ee74`（強調と薄い地を重ねた地） | 7.68 | 実装で測る | 見える（7.1） | 満たす |
| 同上 | 暗 | `rgb(244, 143, 177)` | `#364878` | 3.98 | 実装で測る | 見える（7.1） | 満たす（画面で見える） |
| 検索の強調の中の環境変数（`?h=username`） | 明 / 暗 | `rgb(122, 46, 10)` / `rgb(246, 173, 123)` | `#f1f071` / `#364a75` | 7.84 / 4.66 | 実装で測る | 見える（7.1） | 満たす |
| 検索の強調の中の地の文（`?h=喋る`・`?h=raise`） | 明 / 暗 | `rgb(54, 70, 78)` / `rgba(213, 216, 226, 0.82)` | `#f7f97c` / `#284270` | 8.73 / 5.31 | — | 見える（7.1） | 満たす |
| 誤りの下線 / コードの地・箱の地 | 明 | `#c62828` | `#f5f5f5`・`#eef2f8` | 5.16・5.00（3.4 の値を引いた） | 4.9・5.1 | 3（3.8） | 満たす |
| 誤りの下線 / コードの地・箱の地 | 暗 | `#ff8a80` | `#272a35`・`#1d2433` | 6.26・6.80（3.4 の値を引いた） | 6.4・7.0 | 3（3.8） | 満たす |

- 頁の全部のタグ 500・環境変数 6 を 1 つずつ同じ式で測った最小: 明はタグ 7.06・環境変数 7.24、暗はタグ 5.95・環境変数 6.92（どれも箱の薄い地の上）。線に届かない所は **0**。明るい表示の色を濃くする要は無く、`assets/extra.css` の 2.3 の塊は直していない（タグ `#8a0d4f` のまま）
- 検索の強調の地はテーマのまま（明 `rgba(255, 255, 0, 0.5)`・暗 `rgba(66, 135, 255, 0.3)`）。暗のタグの 3.98 は強調の青を重ねた地の値で、`site-look-list-items` の C01 の強調（暗 4.41）と同じくテーマの強調による。字の線（3.6）の対象でなく、7.1 の線は「見える」。画面（下の「検索の強調」）で、強調の青の地と字の赤紫がどちらも見分けられる

### 4 色が互いに違うこと（9.8）
測った `color`（`list/sakura-script` の最初のタグ・環境変数）:

| | 明 | 暗 |
|---|---|---|
| タグ | `rgb(138, 13, 79)`（色相 約 328°） | `rgb(244, 143, 177)`（約 340°） |
| 環境変数 | `rgb(122, 46, 10)`（約 19°）・太さ 700 | `rgb(246, 173, 123)`（約 24°）・太さ 700 |
| 地の文（`code`） | `rgb(54, 70, 78)`（約 200°） | `rgba(213, 216, 226, 0.82)` |

- 4 色は互いにすべて違う。明のタグ（赤紫、約 328°）は地の文（青みの灰、約 200°）と色相で分かれる。タグの太さも 700
- 誤りの下線（明 `#c62828`・暗 `#ff8a80`）はタグの赤紫と別の色（3.4）

### 変数で出せない 6 色（9.8）

| 色 | 表示 | 使う所 | 相手（地） | 対比 | 線 |
|---|---|---|---|---|---|
| `#8a0d4f` | 明 | タグの字 | 箱の地・薄い地 / 白・薄い地 / コードの地・薄い地 | 8.30・7.06 / 9.33・7.90 / 8.56・7.27 | 7（3.5） |
| `#7a2e0a` | 明 | 環境変数の字 | 同上 | 8.41・7.24 / 9.45・8.10 / 8.67・7.45 | 7（3.5） |
| `#c62828` | 明 | 誤りの下線 | コードの地 / 箱の地 | 5.16 / 5.00 | 3（3.8） |
| `#f48fb1` | 暗 | タグの字 | 箱の地・薄い地 / コードの地・薄い地 | 6.96・5.95 / 6.41・5.45 | 4.5（3.6） |
| `#f6ad7b` | 暗 | 環境変数の字 | 同上 | 8.27・6.92 / 7.61・6.33 | 4.5（3.6） |
| `#ff8a80` | 暗 | 誤りの下線 | コードの地 / 箱の地 | 6.26 / 6.80 | 3（3.8） |

- 薄い地は色でなく `currentColor` の 9%（字の色から出る）なので数に入れない。どの色も、もう一方の表示では使わない（暗の 3 色は `@media screen` の中の `[data-md-color-scheme="slate"]` の規則だけ）

### 切り替え（4.1）
`list/sakura-script` で、ヘッダの `form[data-md-component=palette]` の見えている `label` を 2 回押した。2 回とも `window.__mark` が残っていた（読み込み直していない）:

| 押した label | `data-md-color-scheme` | タグの `color` | 環境変数の `color` |
|---|---|---|---|
| 「ダークモードに切り替え」 | `default` → `slate` | `rgb(138, 13, 79)` → `rgb(244, 143, 177)` | `rgb(122, 46, 10)` → `rgb(246, 173, 123)` |
| 「ライトモードに切り替え」 | `slate` → `default` | 逆向きに同じ値へ戻った | 同上 |

- 3 つの `?h=` の頁でも、明で開いて切り替えた後に `window.__mark` が残り、暗の色で測れた
- 頁を開いたときの `sakurascript:` の `console.warn` は 0

### 画面だけ（4.2）
頁の `document.styleSheets` のうち `assets/extra.css` を木ごとたどった:
- `CSSMediaRule` は 6 つで、`media` はすべて `screen`
- `data-md-color-scheme` を含む規則は 12 で、すべて `screen` の `CSSMediaRule` の中（外は **0**）。この spec の 3 つ（`[data-md-color-scheme="slate"] .md-typeset .sakurascript-tag`・`.sakurascript-env`・`.sakurascript-error`）も同じ `@media screen` の中。ほかの 9 は前の spec の塊（PR #10 の色・C01 の帯の中のリンク・C18 の見出しの帯と箱・注意書きの箱・対応ベースウェアの札 4 つ）
- よって暗い表示のまま印刷しても、タグ・環境変数・下線は明るい表示の色（`@media` の外の `#8a0d4f`・`#7a2e0a`・`#c62828`）になる。印刷の画面そのものは撮っていない（設計のとおり）

### 検索の強調（7.1）
`list/sakura-script/?h=…` を明で開いて数え、切り替えで暗に移って同じく数えた（明・暗で数は同じ）。

| 問い | `article` の `mark` | 記述例の中 | タグの中 | 環境変数の中 | 記述例の地の文の中 | `mark` だけで `span` の無いブロック | `span` の入ったブロック |
|---|---|---|---|---|---|---|---|
| `?h=raise` | 37 | 16 | 12 | 0 | 4 | 0 | 287 / 287 |
| `?h=username` | 2 | 1 | 0 | 1 | 0 | 0 | 287 / 287 |
| `?h=喋る` | 11 | 10 | 0 | 0 | 10 | 0 | 287 / 287 |

- 強調はタグ・環境変数の `span` の中に入っている（包んだ後に強調が付いた）。`mark` だけがあって `span` の無いブロックは 0 なので、読み込みの順の記録は要らなかった
- 明・暗の 6 枚の画面（スクラッチの `S\after42\mark-*-{light,dark}.png`。spec には残さない）を見た: `?h=raise` は記述例の `\![raise,OnRaiseTest,test]` の `raise`・`Raise` と地の文の `raise` が、`?h=username` は `%username` の `username` が、明は黄、暗は青の地で見え、字の赤紫・茶も読める
- 強調の中の字の対比は上の「測る所と線」の表の検索の強調の行

### 流した式（Git Bash）
```sh
S=/c/Users/maz-o/AppData/Local/Temp/claude/C--home-maz-git-doc-edit/fc194b1e-28b1-4328-9e08-7d8780051c15/scratchpad
mkdir -p $S/after42
node $S/tools/check42.mjs http://127.0.0.1:8000/ukadoc-spec/ $S/after42/check42.json $S/after42
```
- `check42.mjs`: `spec/sstp` で箱の外のコードの地と頁の地を明・暗（切り替え）で測り、`list/sakura-script` で `extra.css` の規則の木をたどり、最初の箱の中のタグ・環境変数の色と地・薄い地の対比（測った地と、白・コードの地に重ねた計算）と頁の全部のタグ・環境変数の最小を明で測り、切り替えて暗で同じく測り、もう一度切り替えて戻す。続いて `?h=raise`・`?h=username`・`?h=喋る` を明で開いて `mark` を数え、最初の強調を真ん中に寄せて撮り、切り替えて暗で同じく数えて撮る

## 画面（タスク 4.3、2026-10-25）

### 撮った版と撮り方
- 作業木 `4ce6b5e`（`origin/main` `0eb3fb9` の上）の `zensical serve`（http://127.0.0.1:8000/ukadoc-spec/ ）。serve は止めず、作業木で `prepare_site.py` は流していない。作業木の変更 0
- `.kiro/specs/completed/site-look-plan/tools/shot.mjs` を読むだけで使った（1000×700、明・暗は `prefers-color-scheme` の `light`・`dark`。頁の palette が `media` で選ぶので、そのまま明・暗の表示になる）。直していない
- 頁の終わりに近い `#environmentvariable` の 2 枚だけは、スクラッチに写した `S\tools43\shot-viewport.mjs` で撮り直した。`shot.mjs` との違いは `Page.captureScreenshot` の引数から `captureBeyondViewport: true` と `clip` を除いた 1 行だけ（ビューポートだけを撮る。3.4 の「誤りの見え方」と同じ手当て）

### 撮った画面（`screenshots/`）

| 画面 | 頁 | 位置 | 道具 |
|---|---|---|---|
| `after-sakura-script-light.png`・`after-sakura-script-dark.png` | `list/sakura-script/` | `#bang-lock-repaint` | `shot.mjs` |
| `after-environmentvariable-light.png`・`after-environmentvariable-dark.png` | `list/sakura-script/` | `#environmentvariable` | `shot-viewport.mjs`（撮り直し） |
| `after-pID-light.png`・`after-pID-dark.png` | `list/sakura-script/` | `#pID` | `shot.mjs` |
| `after-q-script-light.png`・`after-q-script-dark.png` | `list/sakura-script/` | `#q-script` | `shot.mjs` |
| `after-sstp-light.png` | `spec/sstp/` | `article .highlight:not(h4 + .highlight)`（`before-sstp-light.png` と同じ） | `shot.mjs` |

- 9 枚すべてを開いて見た。ヘッダの紺の行は上の端だけ、ボタンのフォーカスの枠・コピーの知らせは無い（撮り直した後）

### 撮り直し（9.11）
- **2 枚**: `after-environmentvariable-light.png`・`after-environmentvariable-dark.png`。最初は `shot.mjs` のまま撮ったところ、明はヘッダが写らず上の端に紺の線だけが残り、暗は画面の下半分に同じ所（見出し「環境変数の記述例」と記述例）がもう一度写り、間に紺の行が入った（頁の終わりを越えた `captureBeyondViewport`＋`clip` の切り出し）。上の `shot-viewport.mjs` で撮り直し、2 枚ともヘッダが上の端に 1 つだけ写ることを見た
- 撮り直した 2 枚はビューポートだけを撮ったので、右の端に頁と目次のスクロールバーが写る（ほかの 7 枚には無い）。記述例の見え方には関わらない
- ほかの 7 枚は 1 回で撮れた（撮り直し 0）

### 目標の画面との見比べ（9.6・9.7。記述例のタグと環境変数の見え方だけ）
- `after-sakura-script-light` と `mock-sakura-script-C21-light`: 2 つの記述例の `\s[0]`・`\i[500]`・`\![lock,repaint]`・`\![unlock,repaint]` が、どちらも赤紫の太字に薄い地のかたまりで、地の文と分かれる。字の色・太さ・地の濃さは同じに見える。折り返しの位置も同じ（「アニメ / ーション」で折れる）
- `after-sakura-script-dark` と `mock-sakura-script-C21-dark`: 同じタグが桃色の太字に薄い地で、紺の地の上で読める。目標の画面の桃色がわずかに赤寄りに見えるが、色の値は 4.2 で測った `#f48fb1`（線を満たす）で、同じ見え方の内とした
- 途中の段: `C10-light` はタグが青の細字で地なし（言語の印だけの段）、`C19-light` は紺の太字、`C20-light` は赤紫の太字で地なし。今の画面は最後の段（C21: 赤紫の太字に薄い地）に当たる
- 目標の画面との違いのうち、記述例の外のもの（項目の間の余白、見出しの帯や「対応:」の行の高さ）はほかの候補（C06 など）による違いで、比べない
- 環境変数（`after-environmentvariable-*`）: 目標の画面は無い（9.7）。`%username`・`%ms`・`%mp`・`%mh`・`%me`・`%mt` の 6 つが、明は茶の太字、暗は橙の太字に薄い地で、赤紫・桃色のタグと色で分かれる。`mock-sakura-script-C17-light` は同じ位置に環境変数が写っていない画面で、その記述例の字の濃さ（細字の青）よりも濃い太字になっている。色の値と対比は 4.2 の表（明 8.41・7.24、暗 8.27・6.92）
- 要件の規則による違い（試作の正規表現との違い。2.2 の「試作の規則との違い 13 か所」）:
  - `after-pID-*`: `\p2`・`\p3` が数字まで 1 つのタグで、後ろの `3人めが`・`4人めが` の `3`・`4` は地の文。試作では `\p` だけがタグで `2`・`3` が地の文だった。下の `\p[2]`・`\p[3]` は角かっこまで 1 つのタグ
  - `after-q-script-*`: `\q[その１,"script:\q[その２,script:その３はない]"]` が、引用符の中の `]` で切れずに全体で 1 つのタグ（2 行にまたがって同じ色）。試作では `"]` が地の文だった
  - `\w9`（`wait/w.md`・`font/f-align.md`）も数字まで 1 つのタグ、`balloon-text/_-q.md` の囲みの中は地の文。どちらも画面は撮っていない（設計の一覧に無い）。数は 2.2 の表のとおり
- 誤りは 1 つも写っていない（全頁の誤り 0。3.3）

### `\` の見え方と言語の印の無いブロック（5.3・6.1・9.9）
- `before-sstp-light.png` と `after-sstp-light.png`: 同じ位置・同じ大きさで、ブロックの地（コードの地）・字・ボタン・余白・目次まで見分けの付く違いは無い。言語の印の無いブロックに色は付かない
- この最初のブロックには `\` が無いので、`\` を含むブロック（`#method_send-基本的なスクリプト再生サンプル` の `Script: \h\s[0]こんにちは。\w5\u\s[10]ご機嫌いかが？\e`）を、控え（8030）と作業木（8000）で `shot.mjs` で撮って見比べた（スクラッチの `S\after43\before-sstp-send-light.png`・`after-sstp-send-light.png`。spec には残さない）。どちらも `\` は `\` のまま見え、円記号にならない。2 枚に違いは無い
- `list/sakura-script` の画面でも、タグの中の `\` は `\` のまま見える（明・暗）
- C18 の箱・C09 の点線・ボタンと字の重なりは 3.3 の数（箱 255・点線 33・重なり 0）のとおり変わらず、画面でもボタンは字と重ならない

### 幅 375（7.3）
`shot.mjs` を出力 `-`（画面を残さない）で `list/sakura-script/`・`#bang-lock-repaint`・375×700 で流した。

| 表示 | `scrollWidth`（`shot.mjs` の値） | `innerWidth` |
|---|---|---|
| 明 | 375 | 375 |
| 暗 | 375 | 375 |

- `shot.mjs` の `scrollWidth` は `document.documentElement.scrollWidth + innerWidth - clientWidth`（縦のスクロールバーの幅を足して `innerWidth` と同じ物差しにしたもの）。375 = 375 なので、`document.documentElement.scrollWidth` は `clientWidth`（3.3 で測った 360。スクロールバー 15 px を除いた幅）と同じで、横のはみ出しは無い

### 流した式（Git Bash、doc_edit の中で）
```sh
S=/c/Users/maz-o/AppData/Local/Temp/claude/C--home-maz-git-doc-edit/fc194b1e-28b1-4328-9e08-7d8780051c15/scratchpad
T=.kiro/specs/completed/site-look-plan/tools/shot.mjs; O=.kiro/specs/site-look-sakura-script-highlight/screenshots; U=http://127.0.0.1:8000/ukadoc-spec
for s in light dark; do
 for p in "sakura-script:#bang-lock-repaint" "environmentvariable:#environmentvariable" "pID:#pID" "q-script:#q-script"; do
  n=${p%%:*}; sel=${p#*:}; node $T $U/list/sakura-script/ "$sel" $O/after-$n-$s.png $s
 done
done
node $T $U/spec/sstp/ "article .highlight:not(h4 + .highlight)" $O/after-sstp-light.png light
# 撮り直し: ビューポートだけを撮る写し
mkdir -p $S/tools43 && cp $T $S/tools43/shot-viewport.mjs
sed -i "s/format: 'png', captureBeyondViewport: true, clip: { x: 0, y, width, height, scale: 1 },/format: 'png', \/\/ 4.3: ビューポートだけを撮る（頁の終わりで clip がヘッダを二重に写すため）/" $S/tools43/shot-viewport.mjs
for s in light dark; do node $S/tools43/shot-viewport.mjs $U/list/sakura-script/ "#environmentvariable" $O/after-environmentvariable-$s.png $s; done
# \ の見え方（スクラッチ）
node $T http://127.0.0.1:8030/spec/sstp/ "#method_send-基本的なスクリプト再生サンプル" $S/after43/before-sstp-send-light.png light
node $T $U/spec/sstp/ "#method_send-基本的なスクリプト再生サンプル" $S/after43/after-sstp-send-light.png light
# 幅 375
for s in light dark; do node $T $U/list/sakura-script/ "#bang-lock-repaint" - $s 375 700; done
```
