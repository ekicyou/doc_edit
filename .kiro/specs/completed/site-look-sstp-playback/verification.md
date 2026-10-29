# 確かめの記録: site-look-sstp-playback

## 測った版と流した式（タスク 6.2、2026-10-29）

- 測った版: 作業木 `.worktrees/site-look-sstp-playback/` の `f6bb9e3`（ブランチ `site-look-sstp-playback`。`671b121`・`f6bb9e3` の 2 コミット）、ukadoc-spec `origin/main` `8a7d8da`（作業木の先祖。5.1 の fetch の後も進んでいない）
- 日付: 2026-10-28〜2026-10-29（各節の見出しの日付）
- 流した式（`<scratch>` は `C:\Users\maz-o\AppData\Local\Temp\claude\C--home-maz-git-doc-edit\65a4b07c-734f-48d2-9fcb-5a61fd74db85\scratchpad`）:
  - Build Gate（作業木の根で、`.cache/` を消してから）: `C:\home\maz\git\doc_edit\.venv\Scripts\python.exe scripts/prepare_site.py` と `C:\home\maz\git\doc_edit\.venv\Scripts\zensical.exe build --strict`
  - ScriptCheck: `node <scratch>\scriptcheck.mjs`
  - PageCheck: `node <scratch>\net.mjs <base> <path> [facts.json]`（控え）と `node <scratch>\pagecheck.mjs <base> <path> <facts.json>`（作業木と控え）
  - LoadedShot: `node .kiro/specs/completed/site-look-sstp-playback/tools/sstp-shot.mjs http://127.0.0.1:8000/ukadoc-spec/<頁> <当て先> <出力|-> {light|dark} <幅> <高さ> [--loaded]`（ほかに、その写しの `<scratch>\t43.mjs`・`<scratch>\t52.mjs`。式の細かい形は 4.3・5.2・5.3 の節）
  - ManualSend: 開発者が手で押す（Claude は送らない）
- 開発者の判断: V6 は今のままとする（2026-10-29、ManualSend の節）。この spec は当面リリースしない（2026-10-29、`tasks.md` の Implementation Notes）。PR は出さず、作業は push していないローカルブランチ `site-look-sstp-playback` に残し、ukadoc-spec のチェックアウトはリモートの `main`（`8a7d8da`）のままにする

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

## 配り（タスク 3.1、2026-10-29）

- 版: 作業木 `f6bb9e3`（その下に `671b121`）、`origin/main` `8a7d8da`
- 作業木で `.cache/` を消してから流した:
  - `C:\home\maz\git\doc_edit\.venv\Scripts\python.exe scripts/prepare_site.py` → exit 0
  - `C:\home\maz\git\doc_edit\.venv\Scripts\zensical.exe build --strict` → exit 0（`No issues found`）
- `zensical serve` を起動し直した（8000、PID はスクラッチの `serve-8000.pid`）

| 確かめ | 結果 |
|---|---|
| `GET /ukadoc-spec/assets/sstp.js` | 200。中身は作業木の `assets/sstp.js` と同じ |
| `_site/` の全頁の HTML の `assets/sstp.js` を読む `<script` の数 | 41 頁すべて 1 つずつ（0 や 2 以上の頁は 0） |
| `GET /ukadoc-spec/assets/extra.css` | 200。252 行目に `/* site-look-sstp-playback: 手元のゴーストへ送る欄とボタン */` |
| `git diff --stat origin/main` | `CLAUDE.md`（+1）・`assets/extra.css`（+64）・`assets/sstp.js`（+148）・`mkdocs.yml`（+3）の 4 つだけ。未コミットの変更は無し |


## ManualSend（タスク 3.2・6.1）

開発者が SSP の動く手元の環境で押す。Claude は送らない。プレビュー: http://127.0.0.1:8000/ukadoc-spec/list/sakura-script/ （作業木 f6bb9e3、Ctrl+F5 で読み直す）

| 手順 | 用意と押すもの | 見るもの | だめなとき |
|---|---|---|---|
| V0 用意 | SSP（最新版）を起動し、ゴースト 2 体（例: 既定のゴーストともう 1 体）を同時に起動する。作業木の `zensical serve` を Edge か Chrome で開き、Ctrl+F5 | ― | ― |
| V1 読み込み | `list/sakura-script` で「読み込み」 | 選ぶ欄に 2 体の名前、送るボタンが出る。開発者のツールの通信で `api/sstp/v1` への POST が 1 つ | 一覧が出ない（CORS・接続・`GetFMO`）: どの種類も送れないので止めて報告する |
| V2 実行 | 2 体目を選び、`#bang-lock-repaint` などの記述例の「実行」 | 2 体目だけが記述例を再生し、1 体目は何もしない。「受け付けられた（200 OK か 204 No Content）」 | 1 体目が再生する・404: 送る先の指定が効いていない（OPEN QUESTION 5 の代わりを試す）。断られる: 9.7 |
| V3 値を見る | `system.year` と `system.cpu.name` の「値を見る」 | ゴーストが「プロパティ「system.year」は「2026」です。」のように今の値を喋る | `%property[…]` がそのまま出る・値が空: 9.7（「値を見る」を外す） |
| V4 発生させる | `OnBoot`・`OnSecondChange` の「発生させる」 | 「受け付けられた」。ゴーストが応えるかは記録だけ（ゴーストが決める） | SSP が断る（4xx・5xx）: 9.7（「発生させる」を外す） |
| V5 失敗 | 選んだゴーストを終わらせて押す。SSP を終わらせて押す・「読み込み」を押す | 「送れなかった（404 Not Found）」「送れなかった」、見つからない旨。ダイアログが出ない。送り直さない | 5.2・5.3 の直し |
| V6 二度押し | 長い記述例（`\w9` を含むものなど）の「実行」をすばやく 2 回 | 送っている間は 1 回だけ送る。SSP が受け付けた後の押し直しは送り直しになり、SSP が再生をやり直す（開発者の判断、2026-10-29） | 5.5 の直し |
| V7 取り直し | 3 体目を起動して「読み込み」 | 一覧が 3 体になり、前に選んだゴーストが選ばれたまま | 1.7 の直し |
| V8 許可の求め | （プレビューは手元どうしの通信なので、許可の求めは出ない見込み）ブラウザの許可の求めが出たら、押す前に出ていないことと、断ったときに見つからない旨が出ることを見る | 許可の求めは「読み込み」の後だけ | 出なければ「プレビューでは確かめられない」と記録する |

### 結果

| 手順 | 結果 | 状態の字・メモ |
|---|---|---|
| V1 | 通った（ボタンが出て値まで届いた。開発者、2026-10-29） | |
| V2 | 通った（2 体目だけが再生し受け付けられた。開発者、2026-10-29） | |
| V3 | 値が出た（開発者、2026-10-29） | |
| V4 | 通った（受け付けられた。開発者、2026-10-29） | |
| V5 | 通った（開発者、2026-10-29） | |
| V6 | 合わない: すばやく 2 回押すと、手前の再生が消えて頭から再生し直す（開発者、2026-10-29） | 1 回目の送信は SSP がすぐ受け付けて終わるので、ボタンは戻り、2 回目は新しい送信になる。SSP は SEND を受けると今の再生を切る。開発者の判断（2026-10-29）: 今のままとする。受け付けた後の押し直しは送り直しで、SSP が再生をやり直す。5.5（送っている間に重ねて送らない）は満たす。V6 の見込み「再生は 1 回」を「送っている間は 1 回。受け付けた後の押し直しは送り直し」に改める |
| V7 | 通った（開発者、2026-10-29） | |
| V8 | 通った（許可の求めは出なかった。開発者、2026-10-29） | プレビューは手元どうしの通信なので、許可の求めはプレビューでは確かめられない。`fetch` は押したときの処理の中にしか無く、`fetch` の失敗は見つからない旨になることを作りで満たした |


外した種類は無い。ReceiverGhostHWnd のまま、3 種類すべてで進める。

## PageCheck（タスク 4.1、2026-10-29）

- 版: 作業木 `f6bb9e3` の build（`_site/`、`zensical serve` 8000）と控え `8a7d8da`（8040）
- 式: `node pagecheck.mjs <base> <path> <facts.json>`（Claude のスクラッチ。`net.mjs` の写しに、要求の種類と、`.sstp-panel` の数・当て先の候補の数を足したもの。候補は `sstp.js` の `place()` と同じセレクタと規則で、押さずに数える）。結果はスクラッチの `pc\`
- `serve` の頁は `_site/` の HTML の末尾に `serve` の自動の読み直しの `<script>` が足されるだけ（5 頁とも差の塊は末尾の 1 つ）なので、数は `_site/` の HTML の数と同じ

### 候補の数

| 種類 | 規則 | 数 | 要件の見込み | 差 |
|---|---|---|---|---|
| 記述例（`list/sakura-script`） | `article div.language-sakurascript.highlight` | 287 | 287 | 0 |
| 置き換える部分の無いプロパティ（`list/propertysystem`） | `h3.bundle-item` の名前が `^[A-Za-z0-9_.-]+$` | 44 | 44 | 0 |
| キー（同） | `….(キー)` の項目（5）の直後の `div.definition-table` の 1 列目の `strong` | 34 | 34 | 0 |
| イベント（`list/shiori-event`） | `h3.bundle-item` の名前が `^On[A-Za-z0-9_.]+$` で `SKIP` に無い | 272 | 272 | 0 |

- 外した種類は無いので、0 にした数は無い
- `list/propertysystem` の `h3.bundle-item` 160 = 44 + `(キー)` 5 + ほかの置き換える部分を持つ 109（3.5）+ プロパティでない見出し 2（「プロパティシステム」「補足」、3.6）
- `list/shiori-event` の `h3.bundle-item` 328 のうち `On` で始まるもの 283 = 272 + `SKIP` 10 + `OnMusicPlayExの拡張情報リスト` 1（4.5）
- 開いただけ（押す前）では、どの頁も送るボタン（`.sstp-play`・`.sstp-keys`・`.sstp-run`）は 0

### 開いた時点の通信

`list/sakura-script`・`list/propertysystem`・`list/shiori-event`・`list/plugin-event`・`index` を押さずに 3 秒開いた（作業木と控えの両方、どれも exit 0）

| 確かめ | 結果 |
|---|---|
| `localhost:9801`・`127.0.0.1:9801`・`[::1]:9801` への要求 | 5 頁とも 0 |
| 読み込んだスクリプト | `bundle.67a597eb.min.js`・`workers/search.7d14d953.min.js`・`assets/sstp.js` の 3 つで、どれも `serve` の中。第三者のスクリプトは 0 |
| `serve` の中の要求（集まり）の控えとの差 | 5 頁とも `assets/sstp.js` が 1 つ増えただけ |
| `serve` の外への要求（集まり）の控えとの差 | 5 頁とも 0 |

- 外への要求は控えと同じく、`fonts.googleapis.com` の CSS 1・`fonts.gstatic.com` の woff2（3 頁は 5 個、`list/plugin-event` と `index` は 3 個）と、テーマのリポジトリの表示の `api.github.com/repos/ukatech/ukadoc-spec` と `…/releases/latest` の 2 つ
- 設計・タスクの「テーマのウェブフォントだけ」とは、`api.github.com` の 2 つの分だけ違う。どちらも控えの頁（変更の前）からあるテーマの要求で、この spec が足したものではない。並びは開くたびに入れ替わるので、集まりで比べた

### 欄の数

| 頁 | `.sstp-panel` | `assets/sstp.js` の読み込み |
|---|---|---|
| `list/sakura-script/` | 1 | 1 |
| `list/propertysystem/` | 1 | 1 |
| `list/shiori-event/` | 1 | 1 |
| `list/plugin-event/` | 0 | 1 |
| `index`（`/ukadoc-spec/`） | 0 | 1 |

- 控えの 5 頁は `.sstp-panel` 0。見出しの id・`a.headerlink` の数は控えと同じ（649・206・360・21・13）

### 検索の索引

| `search.json` | SHA-256 |
|---|---|
| 作業木 `_site/search.json` | `afa8d38c1a69f8c0a32396d3197665ce56e27fa91f219d1d92b8eb004bdf27a5` |
| `serve` の `/ukadoc-spec/search.json` | 同じ |
| 控え `root\_site\search.json`（と写しの `search.json`） | 同じ |

- 違い 0

## LoadedShot（タスク 4.3、2026-10-29）

- 版: 作業木 `f6bb9e3` の `zensical serve`（8000）と控え `8a7d8da`（8040）
- 式:
  - 幅 375: `node tools/sstp-shot.mjs <頁> "article h1" - {light|dark} 375 700 --loaded`（3 頁 × 明・暗の 6 回、どれも exit 0）
  - ほかの確かめ: `FACTS=<控えの facts-*.json> BASEIDS=<控えの開いた後の id> node t43.mjs <頁> "article h1" - light 1000 700 --loaded`（Claude のスクラッチ。`sstp-shot.mjs` の写しで、`Fetch.enable`（`*://*:9801/*`）を頁へ行く前に掛けること・GetFMO だけに作り物で答えてほかは断ること・Edge を止めてから CDP を切ることは同じ。「読み込み」をキーボードで押し、下の数と木を足して出す。3 頁とも exit 0）。控えの開いた後の id は同じ写しを `DUMP=` 付き・`--loaded` 無しで 8040 に流して取った
- 9801 への要求は 3 頁とも「読み込み」の GetFMO の 1 つだけで、作り物で答えた。ほかの要求・CORS の下見は 0。送るボタンは押していない

### 読み込みの後

| 頁 | 前のボタン | 後のボタン | 4.1 の候補 | 差 |
|---|---|---|---|---|
| `list/sakura-script/` | 0 | 287（記述例） | 287 | 0 |
| `list/propertysystem/` | 0 | 78（項目 44 + キー 34） | 78 | 0 |
| `list/shiori-event/` | 0 | 272（イベント） | 272 | 0 |

| 確かめ | 結果 |
|---|---|
| 記述例 287 個の `data-sstp` の `Script`・`Reference0` と `code.textContent`（末尾の改行を取る） | 287 個とも同じ（食い違い 0）。どれも `SEND` |
| キー 34 個の名前 | 34 個とも、`(キー)` の項目の名前から `.(キー)` を取った `{base}` と表のキーで `{base}.{キー}`（例 `system.cpu.name`）。`aria-label` は `{base}.{キー} の値を見る`、送る中身は読むスクリプトだけ（食い違い 0） |
| 項目 44 個の「値を見る」 | 名前は見出しの名前と同じ、送る中身は `\0プロパティ「{名前}」は「%property[{名前}]」です。\e` と `Option: notranslate` だけ（食い違い 0） |
| `SKIP` の 10 個 | 見出し 10 個とも、ボタン 0。`SKIP` の `Event` を持つボタンも 0 |
| `NOTIFY` の `Reference` | 272 個とも `Reference*` のヘッダ 0。`aria-label` は `{Event} を発生させる` で見出しの名前と同じ |
| `[SET有効]` の項目 | `[SET有効]` の印を持つプロパティは 7 項目。置き換える部分の無い 3 つ（`currentghost.mousecursor`・`currentghost.seriko.sticky-window`・`currentghost.seriko.zorder`）に「値を見る」が付き、送る中身は読むスクリプトだけ（`\![set` 0）。残る 4 つ（`cursor.scope(ID)…` 2 つ・`tooltip.scope(ID)…` 2 つ）は `(ID)` などを持つので付かない（3.5）。道具の数え（8）に入った概要の「プロパティシステム」は、説明で印に触れるだけのプロパティでない項目で、ボタン 0（3.6） |

### 変わらないもの

読み込みの後の 3 頁を控えと比べた（食い違い 0）

| 頁 | `article` の中の id（開いた後の控え） | うち見出しの id（1.2 の控え） | `a.headerlink` | `.md-nav__link` | 記述例の `code.innerText` |
|---|---|---|---|---|---|
| `list/sakura-script/` | 937 = 937、並びも同じ | 649 = 649 | 649 = 649 | 832 = 832 | 287 個とも同じ |
| `list/propertysystem/` | 211 = 211、並びも同じ | 206 = 206 | 206 = 206 | 382 = 382 | 0 = 0 |
| `list/shiori-event/` | 360 = 360、並びも同じ | 360 = 360 | 360 = 360 | 774 = 774 | 0 = 0 |

- `article` の中の id は、見出しの id のほかに、テーマが開いた時にコードの箱へ付ける `__code_N`（`list/sakura-script` 288・`list/propertysystem` 5）を含む。HTML には無く、控えの頁でも開くと同じ数・同じ並びで付く。1.2 の控えの見出しの id とは、`__code_N` を除いて並びまで同じ。`sstp.js` が足した id は 0

### 幅 375

`sstp-shot.mjs` の `scrollWidth`（縦のスクロールバーの幅を足したもの）と `innerWidth`

| 頁 | 明 前 | 明 後 | 暗 前 | 暗 後 |
|---|---|---|---|---|
| `list/sakura-script/` | 375 / 375 | 375 / 375 | 375 / 375 | 375 / 375 |
| `list/propertysystem/` | 375 / 375 | 375 / 375 | 375 / 375 | 375 / 375 |
| `list/shiori-event/` | 375 / 375 | 375 / 375 | 375 / 375 | 375 / 375 |

- 6 回とも後のボタンの数は上の表と同じ、食い違い 0

### キーボードと読み上げ

| 確かめ | `list/sakura-script/` | `list/propertysystem/` | `list/shiori-event/` |
|---|---|---|---|
| h1 の ¶ から Tab 1 回 | 「読み込み」（選ぶ欄は読み込みの前は使えないので飛ぶ） | 同じ | 同じ |
| 「読み込み」で Enter | 作り物の応答で読み込み、ボタン 287 | 同じく 78 | 同じく 272 |
| 読み込みの後、「読み込み」から Tab | 9 回で最初の ▶（`\pID番号 の記述例を実行`） | 13 回で `system.year の値を見る` | 11 回で `OnBoot を発生させる` |
| アクセシビリティの木の送るボタン | 「… の記述例を実行」287、名前が空の「 の記述例を実行」0 | 「… の値を見る」78 | 「… を発生させる」272 |

- 名前の例: `\pID番号 の記述例を実行`・`\p[ID番号] の記述例を実行`・`system.year の値を見る`・`system.cpu.load の値を見る`・`OnBoot を発生させる`・`OnGhostChanged を発生させる`
- ▶ は字を持たない（`textContent` が空）が、木の名前は `aria-label` から付く
- 送るボタンでは Enter も Space も押していない（Tab で移っただけ）

## 測る版（タスク 5.1、2026-10-29）

- ukadoc-spec を fetch した `origin/main` は `8a7d8da` のままで、作業木の分岐点から進んでいない。merge は要らず、控え（1.2）と 3.1・4.1・4.3 の結果はそのまま使う
- `origin/main` は作業木の先祖（`git merge-base --is-ancestor` が 0）。Build Gate は 3.1 で同じ版に対して exit 0
- 測る版: 作業木 `f6bb9e3`（`origin/main` `8a7d8da` の上に 2 コミット）


## 対比（タスク 5.2、2026-10-29）

- 版: 作業木 `f6bb9e3` の `zensical serve`（8000）
- 式: `node t52.mjs <頁> "article h1" - {light|dark} 1000 700 --loaded`（Claude のスクラッチ。`sstp-shot.mjs` の写しで、`Fetch.enable`（`*://*:9801/*`）を頁へ行く前に掛けること・GetFMO だけに作り物で答えてほかは断ること・Edge を止めてから CDP を切ることは同じ。「読み込み」を押した後に測りを足した）。3 頁 × 明・暗の 6 回、どれも exit 0。9801 への要求はどれも「読み込み」の GetFMO の 1 つだけ、CORS の下見 0。送るボタンは押していない
- 測り方: 字の色は `getComputedStyle(el).color`、▶ の色は `::after` の `background-color`（`currentcolor` のマスク）。地は `html` から要素までの `background-color` を白の上に順に重ね、半透明の字・地もその下の地に重ねてから、WCAG 2.x の相対輝度で対比を出した（小数 2 桁で切り捨て）
- 結果の字は空なので、自分の試しのブラウザの中でだけ `受け付けられた（200）` を入れて測った（記述例の結果の行は、字が入ると見える）
- ▶ のマウスを載せたとき・選んだときは、CDP の `CSS.forcePseudoState`（`hover`・`focus-visible`）で付けて測った
- 各種類の最初の 1 つを測った（同じ種類は同じ規則で同じ色になる）。使えない（`disabled`）ときの見た目は WCAG の対比の対象外なので測っていない
- 線: 字 4.5:1、▶ 3:1。**すべて満たした**ので、`assets/extra.css` は直していない（3.1・4.3 のやり直しも要らない）

### 明（`default`）

| 頁 | 所 | 字の色 | 重ねた字 | 地 | 対比 |
|---|---|---|---|---|---|
| 3 頁とも | 欄の説明・選ぶ欄の名札・欄の結果（欄の地＝頁の地） | `rgba(0,0,0,.87)` | `#212121` | `#ffffff` | 16.07 |
| 3 頁とも | 選ぶ欄・「読み込み」（ボタンの地） | `rgba(0,0,0,.87)` | `#212121` | `#ffffff` | 16.07 |
| `list/sakura-script/` | ▶ ふだん（記述例の箱の地＋`md-code__nav` の地 `rgba(245,245,245,.3)`） | `rgba(0,0,0,.54)` | `#6e7072` | `#f0f3f7` | 4.47 |
| `list/sakura-script/` | ▶ `hover`・`focus-visible` | `rgb(82,108,254)` | `#526cfe` | `#f0f3f7` | 3.82 |
| `list/sakura-script/` | 記述例の結果（記述例の箱の地 `rgb(238,242,248)`） | `rgba(0,0,0,.87)` | `#1f1f20` | `#eef2f8` | 14.60 |
| `list/propertysystem/`・`list/shiori-event/` | 帯の「値を見る」・「発生させる」（ボタンの地） | `rgba(0,0,0,.87)` | `#212121` | `#ffffff` | 16.07 |
| `list/propertysystem/`・`list/shiori-event/` | 帯の結果・帯の項目名（項目名の帯の地 `rgba(0,0,0,.07)`） | `rgba(0,0,0,.87)` | `#1f1f1f` | `#ededed` | 14.12 |
| `list/propertysystem/` | キーの行の「値を見る:」・キーの結果（頁の地） | `rgba(0,0,0,.87)` | `#212121` | `#ffffff` | 16.07 |
| `list/propertysystem/` | キーのボタン（ボタンの地） | `rgba(0,0,0,.87)` | `#212121` | `#ffffff` | 16.07 |

### 暗（`slate`）

| 頁 | 所 | 字の色 | 重ねた字 | 地 | 対比 |
|---|---|---|---|---|---|
| 3 頁とも | 欄の説明・選ぶ欄の名札・欄の結果（欄の地＝頁の地） | `rgba(226,228,233,.82)` | `#bfc1c6` | `#1e2129` | 8.92 |
| 3 頁とも | 選ぶ欄・「読み込み」（ボタンの地） | `rgba(226,228,233,.82)` | `#bfc1c6` | `#1e2129` | 8.92 |
| `list/sakura-script/` | ▶ ふだん（記述例の箱の地＋`md-code__nav` の地 `rgba(39,42,53,.54)`） | `rgba(226,228,233,.56)` | `#8e9199` | `#222734` | 4.71 |
| `list/sakura-script/` | ▶ `hover`・`focus-visible` | `rgb(82,108,254)` | `#526cfe` | `#222734` | 3.49 |
| `list/sakura-script/` | 記述例の結果（記述例の箱の地 `rgb(29,36,51)`） | `rgba(226,228,233,.82)` | `#bfc1c8` | `#1d2433` | 8.65 |
| `list/propertysystem/`・`list/shiori-event/` | 帯の「値を見る」・「発生させる」（ボタンの地） | `rgba(226,228,233,.82)` | `#bfc1c6` | `#1e2129` | 8.92 |
| `list/propertysystem/`・`list/shiori-event/` | 帯の結果・帯の項目名（項目名の帯の地 `rgba(226,228,233,.12)`） | `rgba(226,228,233,.82)` | `#c3c5cb` | `#363840` | 6.75 |
| `list/propertysystem/` | キーの行の「値を見る:」・キーの結果（頁の地） | `rgba(226,228,233,.82)` | `#bfc1c6` | `#1e2129` | 8.92 |
| `list/propertysystem/` | キーのボタン（ボタンの地） | `rgba(226,228,233,.82)` | `#bfc1c6` | `#1e2129` | 8.92 |

- いちばん低いのは ▶ の `hover`・`focus-visible`（明 3.82・暗 3.49、線 3:1）。字でいちばん低いのは暗の帯の結果・項目名の 6.75（線 4.5:1）

## 画面（タスク 5.3、2026-10-29）

- 版: 作業木 `f6bb9e3` の `zensical serve`（8000）
- 式: `node tools/sstp-shot.mjs http://127.0.0.1:8000/ukadoc-spec/<頁> <当て先> screenshots/<名前> {light|dark} 1000 700`（`before-*`）と、同じ式に `--loaded` を付けたもの（`after-*`）。20 回とも exit 0。`--loaded` で押したのは「読み込み」だけで、9801 への要求は GetFMO の 1 つだけを作り物で答えた。送るボタンは押していない
- 撮った 20 枚（`screenshots/`、1000×700）:

| 当て先 | 明・前 | 暗・前 | 明・後 | 暗・後 |
|---|---|---|---|---|
| `list/sakura-script/` の `#bang-lock-repaint` | `before-sakura-script-light.png` | `before-sakura-script-dark.png` | `after-sakura-script-light.png` | `after-sakura-script-dark.png` |
| `list/propertysystem/` の `[id="system.cpu"]` | `before-propertysystem-light.png` | `before-propertysystem-dark.png` | `after-propertysystem-light.png` | `after-propertysystem-dark.png` |
| `list/shiori-event/` の `#OnBoot` | `before-shiori-event-light.png` | `before-shiori-event-dark.png` | `after-shiori-event-light.png` | `after-shiori-event-dark.png` |
| `list/sakura-script/` の `h1`（欄） | `before-panel-light.png` | `before-panel-dark.png` | `after-panel-light.png` | `after-panel-dark.png` |
| `list/sakura-script/` の `#plus`（1 行の記述例） | `before-oneline-light.png` | `before-oneline-dark.png` | `after-oneline-light.png` | `after-oneline-dark.png` |

- 撮り直し: **1 枚**。`before-sakura-script-dark.png` の 1 回目は、頁の下半分に頁の頭がもう一度重なって写り、右端にも別の写りがはみ出していた（二重に重なった跡）。同じ式で撮り直し、跡が無いことを見た。ほかの 19 枚は 1 回目で跡が無かった

### 目標の画面との見比べ（`completed/site-look-plan/screenshots/` の `mock-*-C21-*`・`mock-*-C23-*`）

- 記述例の箱・名前と説明の表・項目名の帯・対応の札: `before-sakura-script-*` と `mock-sakura-script-C21-*`、`before-propertysystem-*` と `mock-propertysystem-C23-*`、`before-shiori-event-*` と `mock-shiori-event-C23-*` で、箱の帯（「記述例」）と左の線・地の色・コピーのアイコン・強調の字、表の罫と 1 列目の太字、項目名の帯の地と左の線、札（Materia・SSP・CROW・Ninix）の枠と色は、明・暗とも同じに見える（7.2）
- 違うのは縦の余白だけ（見出しの下・段落の間・「対応」の行の上下が目標の画面より詰まっている）。控え `8a7d8da`（8040、`origin/main`）を同じ式で撮ると `before-sakura-script-light.png` と同じ詰まり方なので、この spec の前から `origin/main` にある違いで、この spec の変更によるものではない
- 記述例の `\` は `\` のまま見える（`\s[0]\i[500]`・`\![lock,repaint]`・`\+`・`\_+`。¥ にならない）。「さくらスクリプトのエスケープ」の囲みの「\」「\\」も `\` のまま見える
- 欄の説明（「手元の SSP で起動中のゴーストに、…」）は `before-panel-*` で読み込みの前から `h1` の下に 1 か所だけ見え、`after-panel-*` でも 1 か所のまま（6.1・6.2）。読み込みの前の選ぶ欄は空、後は「作り物のゴーストA」が選ばれている

### 読み込みの前と後

- `list/sakura-script/`: 前は ▶ が無く、目標の画面と同じ箱。後は各記述例の箱の右、コピーのアイコンの下に ▶ が 1 つ出る。字・コピーのアイコンの位置は変わらない（7.2・7.4）
- 1 行の記述例（`#plus`・`#underscore-plus` の箱）: 前は 1 行の高さ、後は ▶ を積むぶん高くなる（設計の「1 行の記述例は 40px から 64px」のとおり）。▶ と字は重ならない
- `list/propertysystem/`: 前は表の直後の「値を見る:」の行が無く目標の画面と同じ。後は表の直後に「値を見る:」とキー 6 つ（load・num・vendor・name・clock・features）のボタンが 1 行に出る。表の見え方は前と同じ
- `list/shiori-event/`: 前は帯に何も無く目標の画面と同じ。後は項目名の帯の `OnBoot` の右に「発生させる」が出る。帯の高さ・表は前と同じ
- 明・暗とも同じ並びで、暗でもボタン・▶ が見える（対比の数はタスク 5.2 の節）

## 仕上げ（タスク 6.2、2026-10-29）

### 規約 Gate（9.3）

作業木で `git -C .worktrees/site-look-sstp-playback …` を流して見た

| 確かめ | 式 | 結果 |
|---|---|---|
| `CLAUDE.md` の変更 | `git diff --numstat origin/main -- CLAUDE.md` | `1 0`（1 行足しただけ、消した行 0） |
| 足した行の置き場 | `git diff origin/main -- CLAUDE.md` | `## GitHub Pages` の節の「見た目は `assets/extra.css`…」の箇条の後ろに、同じ深さの箇条 1 行（`assets/sstp.js` の役割・3 頁だけで動く・押すまで何もしない・第三者のコードは使わない） |
| `extra.css` の塊の注 | `git diff origin/main -- assets/extra.css` の `+` の行で `/*`・`*/` を数える | どちらも 1。注は `/* site-look-sstp-playback: 手元のゴーストへ送る欄とボタン */` の 1 行だけ |

### `git diff --stat origin/main`（9.2）

```
 CLAUDE.md        |   1 +
 assets/extra.css |  64 ++++++++++++++++++++++++
 assets/sstp.js   | 148 +++++++++++++++++++++++++++++++++++++++++++++++++++++++
 mkdocs.yml       |   3 ++
 4 files changed, 216 insertions(+)
```

- 4 つだけ。作業木に未コミットの変更は無い（`git status --short` が空）
- ブランチ `site-look-sstp-playback` は追う先が無く（`no upstream configured`）、`git ls-remote --heads origin site-look-sstp-playback` も 0 行で、push していない。ukadoc-spec のチェックアウトは `main`（`8a7d8da`、`origin/main` と同じ）

### jsstp を使わなかったこと（8.5）

- 設計で「使わずに自分で書く」と決め、理由を記録した（設計の Technology Stack の「jsstp を使わない理由」と `research.md`）
- `git diff origin/main` の中の `jsstp` は 0（大文字小文字を問わず）。作業木の `assets/`・`mkdocs.yml`・`CLAUDE.md` にも 0
- `assets/sstp.js` に `import`・`require` は無く、URL は送る先の `http://localhost:9801/api/sstp/v1` だけ。開いた時点の通信で第三者のスクリプトは 0（4.1）

### 外した種類（9.7）

- 無い。ManualSend の V1〜V4 がすべて通ったので、記述例の「実行」・プロパティの「値を見る」・イベントの「発生させる」の 3 種類すべてを残した。送る先の指定は `ReceiverGhostHWnd` のまま

### 設計の「Testing Strategy」の各項目の結果

| 項目 | 結果 | 節 |
|---|---|---|
| Build Gate | `prepare_site.py`・`build --strict` とも exit 0。`git diff --stat origin/main` は 4 つだけ | 配り（3.1）、この節 |
| 規約 Gate | `CLAUDE.md` は「GitHub Pages」の 1 行だけ、塊の注は 1 行だけ | この節 |
| 要求の字 | ScriptCheck の 6 例すべて合う | ScriptCheck（2.2） |
| 何もしない時 | 9801 と第三者のスクリプトが 0、欄は 3 頁に 1 つずつ、読み込みの前のボタン 0 | PageCheck（4.1） |
| ボタンの数と中身 | 287・78・272 で候補と同じ、`data-sstp` と字の食い違い 0、`SKIP` のボタン 0 | PageCheck（4.1）、LoadedShot（4.3） |
| 変わらないもの | id・¶・目次の数、記述例の字、`search.json` の SHA-256 が控えと同じ | PageCheck（4.1）、LoadedShot（4.3） |
| 見た目 | 目標の画面と同じ見え方（縦の余白の差は `origin/main` から）、対比は字 6.75 以上・▶ 3.49 以上、幅 375 で横にはみ出さない | LoadedShot（4.3）、対比（5.2）、画面（5.3） |
| キーボードと読み上げ | Tab で「読み込み」と送るボタンに移れ、Enter で押せる。送るボタンの名前は 637 個とも空でない | LoadedShot（4.3） |
| 送信 | V1〜V8 すべて通った。V6 は開発者の判断で今のまま（受け付けた後の押し直しは送り直し）。V8 の許可の求めはプレビューでは確かめられず、作りで満たした | ManualSend（3.2・6.1） |

## 退避と片付け（タスク 6.3・7、2026-10-29）

- 開発者の判断で、当面リリースしない。PR は出さず、PR の説明の材料も作らない
- 作業はローカルブランチ `site-look-sstp-playback`（作業木 `.worktrees/site-look-sstp-playback`、`f6bb9e3`）に置く。未コミットの変更 0、追う先なし、リモートにブランチなし（`ls-remote` 0 行）
- ukadoc-spec のチェックアウトはリモートの `main`（`8a7d8da`、`main...origin/main`）のまま。`origin/main` は作業木の先祖
- プレビュー（8000）と控えの配り（8040）を止め、スクラッチの控え `baseline-8a7d8da` を消した
- 7: 作業木で足したのは 4 つの既存ファイルの変更だけで、新しい頁・ディレクトリは無い。`index.md` の `## 一覧`・`.nav.yml`・`INDEX.md`・`llms.txt` に足す所は無い。steering（`tech.md`・`structure.md`）に方針を書き足した（doc_edit `d52e5be`）

