# 確かめの記録: site-look-sstp-playback

## 変更の前（タスク 1.2、2026-10-28）

### 控えの置き場と配り
- 控えのコミット: ukadoc-spec `8a7d8dad4da02269d539b20be7221ea324729209`（作業木 `.worktrees/site-look-sstp-playback/` の HEAD = `origin/main`）
- 控えの置き場（Claude のスクラッチ）: `C:\Users\maz-o\AppData\Local\Temp\claude\C--home-maz-git-doc-edit\65a4b07c-734f-48d2-9fcb-5a61fd74db85\scratchpad\baseline-8a7d8da\`
  - `root\`: `git archive HEAD` の書き出し。`prepare_site.py`（exit 0）と `zensical build --strict`（exit 0、`No issues found`）を流した。記録は `prepare.log`・`build.log`
  - `www\ukadoc-spec\`: `root\_site\` へのジャンクション
  - `facts-{sakura-script,propertysystem,shiori-event,plugin-event}.json`: 頁ごとの見出しの id の並び・¶ の数・目次の数・記述例の `code.innerText`
  - `net-{…}.txt`: 開いた時点の要求の URL の並び
  - `search.json`: `root\_site\search.json` の写し（SHA-256 `afa8d38c1a69f8c0a32396d3197665ce56e27fa91f219d1d92b8eb004bdf27a5`）
- 配り: `python -m http.server 8040 --bind 127.0.0.1 --directory <置き場>\www`（PID はスクラッチの `serve-8040.pid`）。`http://127.0.0.1:8040/ukadoc-spec/list/sakura-script/` が 200
- 配り直し: 置き場が無ければ、控えのコミットを `git archive` で新しいフォルダに書き出し、同じ手順で作り直す

### 通信のスクリプト
- `C:\Users\maz-o\AppData\Local\Temp\claude\C--home-maz-git-doc-edit\65a4b07c-734f-48d2-9fcb-5a61fd74db85\scratchpad\net.mjs`（Edge ヘッドレス + CDP の `Network`。`site-look-plan` の `tools/shot.mjs` の型）
- 式: `node net.mjs <base> <path> [facts.json]`（例: `node net.mjs http://127.0.0.1:8040/ukadoc-spec/ list/sakura-script/`）。頁を開き、`load` の後に押さずに 3 秒待って、`Network.requestWillBeSent` の URL を順に出す。`facts.json` を渡すと上の数と字も書き出す
- `localhost`・`127.0.0.1`・`[::1]` の `9801` への要求は `Network.setBlockedURLs` で止め、出ようとしたら数を出して exit 2 にする。控えの 4 頁はどれも exit 0（9801 への要求 0）
- 数え方: 見出しの id は `article :is(h1,h2,h3,h4,h5,h6)[id]`、¶ は `a.headerlink`、目次は `.md-nav__link`、記述例は `article div.language-sakurascript.highlight code`

### 数（変更の前）
| 頁 | 見出しの id | `a.headerlink` | `.md-nav__link` | 記述例の `code` |
|---|---|---|---|---|
| `list/sakura-script/` | 649 | 649 | 832 | 287 |
| `list/propertysystem/` | 206 | 206 | 382 | 0 |
| `list/shiori-event/` | 360 | 360 | 774 | 0 |
| `list/plugin-event/` | 21 | 21 | 96 | 0 |

- 記述例の `code` 287 は設計の「数の見込み」の 287 と同じ
- build の HTML の `h3.bundle-item`: `list/propertysystem` 160（`introduction_propertysystem` を除くと 159 で設計と同じ）、`list/shiori-event` 328（設計と同じ）
- 控えの HTML に `sstp.js` の読み込みは無い

### 開いた時点の通信（変更の前）
4 頁とも同じ形。`serve` の中（`http://127.0.0.1:8040/ukadoc-spec/…`）の要求は、頁・`main.cfc7948b.min.css`・`palette.bf1c5cd6.min.css`・`extra.css`・`logo.png`（2 回）・`bundle.67a597eb.min.js`・`search.json`・`workers/search.7d14d953.min.js`。ほかにテーマの `data:` の SVG のアイコンが 3〜4 個

`serve` の外への要求（頁ごと、出た順）:

| 頁 | 外への要求 |
|---|---|
| `list/sakura-script/` | `fonts.googleapis.com/css?family=Roboto…`、`fonts.gstatic.com` の woff2 5 個（roboto `…a3yUBA`・robotomono `…Lq38`・roboto `…kBnka`・`…axKUBGEe`・`…awCUBGEe`）、`api.github.com/repos/ukatech/ukadoc-spec/releases/latest`、`api.github.com/repos/ukatech/ukadoc-spec` |
| `list/propertysystem/` | 同上（woff2 5 個） |
| `list/shiori-event/` | 同上（woff2 5 個） |
| `list/plugin-event/` | 同上から woff2 `…axKUBGEe`・`…awCUBGEe` を除いた 3 個（頁で使う字の太さが少ない） |

- 第三者のスクリプトの読み込みは 0。外への要求はテーマのウェブフォント（Google Fonts）と、テーマのリポジトリの表示の `api.github.com` の 2 つ
- 並びは開くたびに少し入れ替わる（フォント・`data:` のアイコン・`workers/search` の前後）。後で比べるときは外への要求の集まりで比べる

## ScriptCheck（タスク 2.2、2026-10-28）

- 式: `node scriptcheck.mjs`（Claude のスクラッチの使い捨て。ukadoc-spec にファイルは足さない）
- 作業木の `assets/sstp.js`（未コミット）の字から `ENDPOINT`・`VERSION`・`show`・`request`・`post`・`loadGhosts` を正規表現で切り出し、字を変えずに `new Function` で流す。`fetch` は決まった返事を返す作り物に差し替え、何も送らない（作り物への呼び出し 4 回）
- RED: 5 の見込みをわざと「受け付け」にした写しで流し、5 で失敗（exit 1）。正しい見込みに戻して 6 例すべて合う（exit 0）

| # | 確かめ | 見込み | 結果 |
|---|---|---|---|
| 1 | `show('system.cpu.name').Script` | `\0プロパティ「system.cpu.name」は「%property[system.cpu.name]」です。\e` | 同じ |
| 2 | `request('SEND', {Event, Reference0, Script})` の字 | `SEND SSTP/1.4`・`Charset: UTF-8`・`Sender: UKADOC`・`SecurityLevel: external`・`Event`・`Reference0`・`Script` を CR+LF でつなぎ、空行で終わる | 同じ |
| 3 | 値に CR+LF のある `Script` | 例外（`Script に改行がある`） | 例外 |
| 4 | GetFMO の返事（`x_1` に hwnd・name・keroname、`x_2` に hwnd・name、`x_3.path` だけの行）を `loadGhosts` で読む | 2 体（ラーシェ 111、Emily 222）。`path` だけの `x_3` は除く。要求は `EXECUTE SSTP/1.2`・`Command: GetFMO` | 同じ |
| 5 | 1 行目 `SSTP/1.4 404 Not Found` | 失敗、状態の字 `404 Not Found` | 同じ |
| 6 | 1 行目 `SSTP/1.4 200 OK`・`SSTP/1.1 204 No Content` | どちらも受け付け、状態の字 `200 OK`・`204 No Content` | 同じ |

- 結果: 6 例すべて合う。`sstp.js` は直していない
