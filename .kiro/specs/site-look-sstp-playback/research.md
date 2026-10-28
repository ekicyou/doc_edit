# Research & Gap Analysis: site-look-sstp-playback

## 調べ方
- 土台: ukadoc-spec の `origin/main` は `8a7d8da`（`git ls-remote` で確かめた。チェックアウトも同じ）。brief が書かれた後（2026-10-25）に、メンテナのコミット `d01f9eb`・`b1abe20`・`1080225`（2026-10-27）が入っている
- 数え上げ: `git archive 8a7d8da` を scratchpad に展開し、doc_edit の `.venv` の `prepare_site.py` と `zensical build --strict`（No issues found）で作った `_site/` の HTML を数えた（ukadoc-spec の `_site/` は 10-24 の古いもので使っていない）。実装のときに作業木の build で数え直す
- 外部: jsstp（`ukatech/jsstp-lib`）は GitHub・npm・jsDelivr を調べた。SSTP over HTTP は ukadoc-spec の `spec/sstp/http.md`・`spec/sstp/req_res.md` を読んだ
- ukadoc-spec・サブモジュールには何も書いていない。git の状態を変える操作もしていない

## 1. 今の状態

### brief の前提の変化（いちばん大きい差）
| brief の前提 | 今（`8a7d8da`） | この spec への響き |
|---|---|---|
| 記述例の印は `use_pygments: false` の `pymdownx.highlight` と `assets/sakurascript.js` が付ける。`sakurascript.js` の後に動けば `language-sakurascript` だけで足りる | `d01f9eb` で Pygments のレキサー（`site_ext/ukadoc_site/lexers.py`、`pygments_lang_class: true`）に移った。`assets/sakurascript.js`・`assets/filetree.js` は消え、`extra_javascript` も外れた | 記述例の見分けは build の HTML の `div.language-sakurascript.highlight > pre > code` だけで足りる。`language-ss` の扱いは要らない（レキサーが `ss` を別名にし、印は `language-sakurascript`）。読み込みの順の縛り（`sakurascript.js` の後）は無くなった |
| 名前と説明の表は `prepare_site.py` が作る | `b1abe20` で Markdown 拡張 `site_ext/ukadoc_site/structure.py` が `div.definition-table > table` を作る | キーの名前は `div.definition-table` の行の `td:first-child > strong` から取れる。表の形は前と同じ |
| `extra_javascript` は通る（試作で確かめ済み） | `1080225` の ukadoc-spec の `CLAUDE.md` は「見た目のための構造は、Zensical のカスタマイズの方法（`extra_css`、Markdown 拡張、Pygments）に載せている。JavaScript は使わない」 | 送るには利用者のブラウザで動く仕掛けがどうしても要る。メンテナの方針と正面からぶつかる。roadmap も「始める前にメンテナと話して決める」としている（**Constraint**。OPEN QUESTION 1・2） |
| 土台は `afb2152` | `8a7d8da`（PR #10〜#17 が入った） | 依存先の spec はどれもマージ済み。依存の条件は満たしている |

### 送る先の頁の HTML（`8a7d8da` の build）
- どの頁も `<script>` は Material のテーマのもの（`__config`・`bundle.*.min.js`・インラインの 3 個）だけ。`extra_javascript`・`overrides/`（`custom_dir`）は無い
- `theme.features` に `navigation.instant` が無いので、頁の移動は毎回の読み込み。頁ごとに一から動く仕掛けで足りる。`content.code.copy`（右上のコピーのボタン）はある
- `list/sakura-script`: `language-sakurascript` 287 個（ほかに `language-text` 1 個）。どれも 1 行（改行を含まない。`code.textContent` の末尾に改行が 1 つ付く）。いちばん長いもので 380 字。中は Pygments の `span.nt` などで包まれるが、`textContent` は元の字。誤りの印 `.err` は 0 個。旧サイトの `noplay` の `\![vanishbymyself]` の例は言語の印が無い
- `list/propertysystem`: `h3.bundle-item` 162 個。分け方:
  - プロパティでない見出し 4（`プロパティシステム`・`補足`・`汎用プロパティ名`・`サウンドプロパティ名`）
  - 置き換える部分の無い名前 44（`system.year` など）と、`developer.log.ログ種別.count` 1
  - `(キー)` だけの名前 5 項目（`system.os` 15・`system.cpu` 6・`system.memory` 3・`system.power` 4・`system.network` 6 のキー、計 34）。どれも直後に `div.definition-table` がある
  - `汎用プロパティ名`・`サウンドプロパティ名` を含む名前 27（`ghostlist.current.汎用プロパティ名` など）
  - そのほかの括弧の置き換える部分を持つ名前 81（`(ID)` 65・`(名前)` 14・`(順位)` 12・`(ゴースト名/本体側名/パス)` 4 など。1 つの名前に複数あるものを含む。`system.disk.index(ID).(キー)` もここ）
  - 見出しの id は名前から作られる（`system.cpu`・`system.monitor.index-ID-.work` など）。項目の名前は見出しの字（`¶` を除く）から取れる
  - 言語の印の無いコードブロック 5（C25。対象の外）
  - 書き込みのできるプロパティは `[SET有効]` の字で示される（概要の節の説明）
- `list/shiori-event`: `h3.bundle-item` 330 個、`On` で始まる名前 283。`On` で始まらないもの 47（`Reference一覧について` などの説明と、`Notifyイベント` の `basewareversion` などの値の名前）。294 項目が `Reference` の表を持つが、表の中身は値の説明で、送れる値の例（字そのもの）はほとんど無い
  - 状態を変えうる分類: `起動・終了・切り替えイベント` 29（`OnFirstBoot`・`OnClose`・`OnCloseAll`・`OnGhostChanging` などを含む）、`消滅イベント` 6、`インストールイベント` 7、`ネットワーク更新イベント` 24
- 検索: Material の検索の索引は build のときに作られる。頁を開いた後にブラウザで足した字は索引に入らない（D15 に効く）。build の HTML に字を足すと索引に入りうる
- 目次・見出しへのリンク: build のときに決まる。ブラウザで見出しの外にボタンを足しても、id・`a.headerlink`・右の欄の目次は変わらない（D17）

### 使える部品・決まり
- `assets/extra.css`: spec ごとに見出しのコメントで始まる塊を末尾に足す（`structure.md`）。色はテーマの色の変数から取る（`tech.md`）。暗い表示は `[data-md-color-scheme="slate"]`（`<body>` に付く）
- `prepare_site.py` は `assets/` を丸ごと写すので、ファイルを足しても前処理は変えない
- `mkdocs.yml`: `extra_css` はある。`extra_javascript` は今は無い（Zensical 0.0.67 で通ることは `site-look-plan` の試作で確かめ済み）
- 画面の記録: `.kiro/specs/completed/site-look-plan/tools/shot.mjs`（Edge ヘッドレス + CDP、標準の fetch と WebSocket だけ）。ボタンを押さないので送信は起きない
- 頁の道は `/ukadoc-spec/` から始まる（`site_url`）

### 外部（jsstp と SSTP over HTTP）
- **jsstp のライセンス**: `ukatech/jsstp-lib` の `LICENSE` は WTFPL v2（`package.json` は `"license": "SEE LICENSE IN <LICENSE>"`。SPDX の id は書かれていない）。`dist/jsstp.mjs`（v3.1.1.2、5162 B）は 1 行に縮めて eval で包んだもので、ライセンスの頭書きは無い。WTFPL は何をしてもよいので CC BY 4.0 の ukadoc-spec に置くこと自体は妨げないが、置くならライセンスの字を添えて内容の CC BY 4.0 と分ける要がある。`LICENSE` が v3.1.1.2 の tag でも同じかは確かめていない（master のものだけ読んだ）
- **版**: tag `v3.1.1.2`（旧サイトが使う）・`v3.1.1.3`・`v3.2.0.0`（2024-06-16）。GitHub の Release は無い。npm の `jsstp` は 3.2.0 が最新（2024-06-16）。jsDelivr に `gh/ukatech/jsstp-lib@v3.1.1.2/dist/jsstp.mjs` と `npm/jsstp@3.2.0/dist/jsstp.mjs` がある
- **送り方**: jsstp は `http://localhost:9801/api/sstp/v1` に SSTP の字を本文にして POST する。ゴーストの一覧は `EXECUTE` の `GetFMO`（`get_fmo_infos()`）、送る先は `by_fmo_info()` で `ReceiverGhostHWnd` を付ける。`available()` が「ベースウェアがあるか」を、例外を出さずに真偽で返す。手元のベースウェアが無いと fetch が失敗する
- **SSP の制約**（`spec/sstp/http.md`・`req_res.md`）: Origin が localhost でないと、強制的にリモートからの要求として扱われ、さくらスクリプトのタグと使える SSTP のメソッドに強い制約が掛かり、`SecurityLevel` は無視される（常に external）。公開サイト（`https://ukatech.shillest.net`）も `zensical serve` のプレビュー（`http://127.0.0.1:8000`。`localhost` ではない）も、同じリモートの扱いになる。プレビューでの確かめが本番と同じ制約で動くのは都合がよい
- **旧サイトの送り方**（`ukatech/ukadoc` の `manual/sakura_player.js`。読んだだけで写さない）: 「読み込み」で jsDelivr から jsstp を動的に読み、`get_fmo_infos()` の名前を選ぶ欄に並べ、「実行」で `SEND` の `Event: OnUkadocScriptExample`・`Reference0` と `Script` に記述例・`Option: notranslate` を送る。「実行」の失敗の扱いは無い
- **`OnUkadocScriptExample`**: 仕様の頁にもゴーストの文書にも定めが無い（旧サイトの仕掛けだけが使う名前）。対応しないゴーストでは `SEND` の `Script` がそのまま再生され、リモートの制約で危険なタグが止まる、というのが旧サイトの説明の趣旨と読める（確かめていない）

## 2. 要件と今あるものの対応（Requirement-to-Asset Map）

| 要件 | 今あるもの | 差 |
|---|---|---|
| 1 読み込みとゴーストの選択 | 無い | **Missing**: 選ぶ欄・「読み込み」・一覧の取得。**Constraint**: 頁を開いた時点で外へ読まない（`extra_javascript` で読む自前のスクリプトは同じ頁の中なので「頁の外」に当たらない。第三者のコードは 8 による）。**Unknown**: ブラウザの手元の通信の許可（1.8） |
| 2 記述例の「実行」 | `language-sakurascript` 287 個の HTML | **Missing**: ボタンと送信。見分けは今の印で足りる |
| 3 プロパティの「値を見る」 | 見出しの字と `div.definition-table` | **Missing**: 名前の組み立て（見出しの字の `(キー)` をキーで置き換える）とボタン。**Unknown**: リモートの扱いで `%property` が展開されるか |
| 4 イベントの「発生させる」 | `On` で始まる見出し 283 | **Missing**: ボタンと `NOTIFY`。**Unknown**: リモートからの `NOTIFY` を SSP がゴーストへ渡すか、返ったスクリプトを再生するか。除くイベントの線引き（OPEN QUESTION 5） |
| 5 結果と失敗 | 無い | **Missing**: 結果の表示。SSTP over HTTP は SSTP の誤りでも HTTP 200 を返すので、本文の 1 行目の状態の行を読んで受け付けを見分ける要がある |
| 6 危険なタグの説明 | 無い | **Missing**: 説明の字（書き直す） |
| 7 見た目と失わないもの | `extra.css`・D15〜D20 の守り | **Missing**: ボタンの見た目（明・暗）。ブラウザで足せば D15・D17 は自然に守れる。D19: `code` の中に足さない |
| 8 外部のコードと素材 | 無い | **Constraint**: 版の固定・利用者の操作の後・ライセンスの添え書き。**Unknown**: jsstp を置くか、CDN か、使わないか |
| 9 変える範囲と合意 | `CLAUDE.md` の「JavaScript は使わない」 | **Constraint**: メンテナの了承が前提。`CLAUDE.md` の書き足しの要否 |
| 10 確かめ方 | `shot.mjs`（押さない） | **Missing**: 読み込みの後の見え方を、手元のベースウェアにつながずに撮る方法。`shot.mjs` は CDP を直に使うので、`Fetch` の領域で `localhost:9801` への要求に作り物の応答を返す形に広げられる（doc_edit の側の道具で、ukadoc-spec に試験用の口を足さずに済む）。送信の確かめは開発者の手作業 |

## 3. 進め方の案

### 共通: 部品をどこに足すか
- **ブラウザで足す（推し）**: 自前のスクリプト 1 本（`assets/` に置き、`mkdocs.yml` の `extra_javascript` で読む）が、頁の道（3 頁だけ）を見て、選ぶ欄・説明をまとめ頁の頭か本文の先頭に、送るボタンを各項目に足す。検索の索引・目次・見出しの id に触れない。読み込みの前は送るボタンを足さない（足すのは「読み込み」の後）
- **テンプレートの上書き（`overrides/` の `{% block … %}{{ super() }}…`）で選ぶ欄を置く**: 3 頁だけに出す条件を minijinja で書く要があり、部品が 2 か所に分かれる。ブラウザで足すのに比べて得が少ない
- **build のときに目印を足す（`site_ext` や `prepare_site.py`）**: 名前の組み立てを Python でできるが、ボタンの字が索引に入る・読み込みの前からボタンが出る・メンテナの分担（見た目のための構造）に混ざる。要件 9.2 と合わない

### Option A: jsstp を `assets/` に版を固定して置く
- `assets/` に `jsstp.mjs`（v3.1.1.2 か 3.2.0）とライセンスの字を置き、自前のスクリプトが「読み込み」の後に動的に読む（同じサイトの中）
- ✅ 頁の外への読み込みが一切無い。CDN が止まっても動く
- ❌ eval で包んだ縮めた第三者のコードを公開リポジトリに入れる（レビューできない・更新の手間）。CC BY 4.0 の内容と別のライセンスのファイルが混ざる

### Option B: jsstp を jsDelivr から版を固定して、「読み込み」の後にだけ読む（旧サイトと同じ）
- ✅ ukadoc-spec に第三者のコードが入らない。旧サイトで動いた形
- ❌ 公開サイトが第三者の CDN のコードを実行する（版を tag で固定しても、`gh/` の tag は付け替えうる。SRI は動的な `import()` に付けられない）。CDN が止まると使えない

### Option C: jsstp を使わず、送る仕掛けを自分で書く
- SSTP over HTTP は「本文に SSTP の字を入れて POST し、本文の 1 行目で結果を見る」だけで、送るのは `SEND`（記述例・プロパティ）と `NOTIFY`（イベント）と一覧の取得の 3 つ。自前のスクリプトに数十行で書ける見込み
- ✅ 第三者のコード・ライセンスの並べ方・CDN の問題がすべて消える。中身をメンテナが読める
- ❌ ゴーストの一覧の取り方（リモートの扱いの `GetFMO` は hwnd がダミーになる）と、送る先の指定（`ReceiverGhostName`・`ReceiverGhostHWnd` は「(Socket)SSTP限定」と書かれる）を自分で確かめる要がある。jsstp が隠している違いを踏むおそれ

### Option D（混ぜる）: 3 種類のボタンを分けて PR にする
- まず記述例の「実行」だけ（旧サイトと同じ範囲）を 1 本目に、プロパティ・イベントを 2 本目にする。線引きの論点（OPEN QUESTION 3〜7）が残っても、記述例だけ先に出せる
- ❌ brief の roadmap では最後の 1 本とされ、PR の説明（9.5）が 2 本に分かれる

## 4. 手間と危うさ
- **手間: M**（3〜7 日）。スクリプト 1 本・CSS の塊・`mkdocs.yml` の 1 行と、画面の道具の作り物の応答・SSP での手作業の確かめ。名前の組み立てと除くイベントの線引きは単純だが、確かめの段取りが多い
- **危うさ: High**。メンテナの方針（JavaScript を使わない）との合意が前提で、得られなければ spec ごと止まる。加えて、リモートの扱いでの SSP の振る舞い（`%property` の展開・`NOTIFY` の再生・送る先の指定）と、ブラウザの手元の通信の許可が確かめられていない

## 5. 設計への申し送り

### 推し
- 部品は「ブラウザで足す」、送る仕掛けは Option C を先に試し、ゴーストの一覧か送る先の指定で詰まったら Option A（版を固定して置く）に退く。Option B は公開サイトが第三者のコードを実行するので、メンテナが望まない限り採らない
- 3 種類のボタンは 1 本の PR にする（brief の roadmap と PR の説明の並びのまま）。線引きの論点が要件の話し合いで決まらなければ Option D に切り替える

### Research Needed（設計で確かめる）
1. リモートの扱い（Origin が localhost でない）で、`EXECUTE GetFMO` が返すものと、`ReceiverGhostHWnd`（ダミーの hwnd）・`ReceiverGhostName` で送る先を選べるか（旧サイトが公開の Origin から動いていたので、何らかの形で選べるはず）
2. リモートの扱いで、`SEND` の `Script` の中の `%property[…]` が展開されるか。展開されないなら、3 の送り方（`\![get,property,…]` は SHIORI のイベントを要するので使えない）を考え直す
3. リモートの扱いの `NOTIFY` を SSP がゴーストへ渡すか、ゴーストの返したスクリプトを再生するか。`OnClose` などの返すスクリプトの `\-` が止まるか
4. SSP が CORS の応答（`Access-Control-Allow-Origin`）を返すか。公開サイトの Origin で fetch が通るか（旧サイトで通っていたはず）
5. Chrome・Edge の手元の通信の許可（Local Network Access）の求めが、公開サイトから `localhost:9801` への fetch で出るか、出たときの見え方と、断られたときの失敗の形
6. `zensical serve`（`http://127.0.0.1:8000`）からの確かめが、公開サイトと同じ扱いになるか（Origin が `127.0.0.1` で localhost でない）
7. `shot.mjs` を広げて、`localhost:9801` への要求に作り物の応答（ゴースト 1 体の一覧）を返し、読み込みの後の画面を撮れるか
8. jsstp の `LICENSE` が使う tag（v3.1.1.2 か v3.2.0.0）でも WTFPL v2 か（Option A のときだけ）

### 要件の話し合いに回すもの
requirements.md の **仮定** の印の箇所。番号は requirements.md の「OPEN QUESTION n」と同じ。
1. **メンテナの了承**（9.1）: ukadoc-spec の `CLAUDE.md` の「JavaScript は使わない」と、送るのにブラウザで動く仕掛けが要ることのぶつかり。roadmap の「始める前にメンテナと話して決める」が済んだか。仮定: 了承が得られ、作業木で書く前に記録する
2. **`CLAUDE.md` の書き足し**（9.3）: 了承を得たら、「GitHub Pages」の節に送る仕掛けの役割を書き足すか。仮定: 短く書き足す
3. **書き込みのできるプロパティ**（3.7）: brief の「書き込みのできるプロパティ（`\![set,property,…]`）は送らない」を、「書き込みを送らない」と読むか「`[SET有効]` の項目にボタンを付けない」と読むか。仮定: 前者（読むだけのスクリプトを送り、`[SET有効]` の項目にも「値を見る」を付ける）
4. **置き換える部分のある名前**（3.1・3.5）: brief は「`(キー)`・`(ID)` を含む名前は、表のキーごとに組み立てる」とするが、表を持つのは `(キー)` の 5 項目だけで、`(ID)` 65・`(名前)` 14・`(順位)` 12・`汎用プロパティ名` 27 などは表から組み立てられない。仮定: 置き換える部分の無い 44 と `(キー)` の 34 キーだけにボタンを付け、残り 109 項目には付けない。代案: `(ID)` を `0` で、`current` の付く `汎用プロパティ名` の項目を `汎用プロパティ名` の節の名前で組み立てる、入力欄で利用者に埋めさせる
5. **除くイベント**（4.3）: 仮定: `消滅イベント` の 6 と `OnFirstBoot`・`OnClose`・`OnCloseAll`・`OnGhostChanging` の 10 個を除き、273 個にボタンを付ける。代案: `起動・終了・切り替えイベント` を丸ごと除く、`インストールイベント`・`ネットワーク更新イベント` も除く、逆に除かずに説明（6）に任せる
6. **誤りの印のある記述例**（2.5）: 仮定: 直さずにそのまま送る（今は 0 個）。代案: ボタンを付けない
7. **イベントの `Reference`**（4.4）: 表は値の説明で、送れる値の例がほとんど無い。仮定: `Reference` を付けずに送る。代案: 例の書かれたイベントだけ値を付ける、入力欄を出す
8. **危険なタグの説明の出る時**（6.1）: 仮定: 読み込みの前から、選ぶ欄と「読み込み」の近くに出す（旧サイトと同じ）。代案: 読み込みの後にだけ出す
9. **選んだゴーストを頁をまたいで覚えるか**（Boundary Context の Out of scope）: 仮定: 覚えない（頁ごとに「読み込み」を押す）。代案: ブラウザに覚えさせる（ゴーストの名前だけ）

### 話し合いの結果（2026-10-28）
- 1・2: 前もって了承を取らず、PR を出してメンテナの判断に委ねる。`/kiro-complete` は PR を出すまでで止め、マージしない（requirements.md の 9.1・9.8）。`CLAUDE.md` の書き足しは PR に含め、受け入れるかはメンテナが決める。4 の「危うさ」のうち「合意が得られなければ spec ごと止まる」は、「PR が受け入れられないことがある」に変わる
- 5〜9 は仮定のとおりに確定した。あわせて、確かめで送れないと分かった種類のボタンだけを外して進めることにした（requirements.md の 9.7）
