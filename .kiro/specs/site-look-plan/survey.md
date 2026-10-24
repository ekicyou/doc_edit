# 見比べの記録: site-look-plan

旧サイト（https://ssp.shillest.net/ukadoc-legacy/manual/ ）と今の公開サイトの同じ頁を見比べた記録である（Requirement 1）。後の `candidates.md` は、この記録の差の ID（`D01` から）を参照する。**差の ID は付けた後で振り直さない。**

- 見た日: 2026-10-24。今のサイトは公開中の頁を見た。`mkdocs.yml` は `ukadoc-spec/` のメインのチェックアウト（`0e028a4`）を読んだだけで、変えていない
- 見方: 両方の頁の HTML を取得して組み立て（class・要素）を数え、旧サイトの見た目の指定（`list.css`・`base.css`）は scratchpad に落として規則を読んだ（doc_edit には写していない）。画面は `tools/shot.mjs` で、幅 1000・高さ 700 の明るい表示を撮った
- 画面は差 1 つにつき旧・今の 2 枚までで、明るい表示だけ（旧サイトにダークモードは無い）。画面を撮っていない差は、URL とセレクタ・見出しの組を根拠にする。ほかの差の画面に同じ部分が写っているときは、その画面のファイル名を根拠に挙げる

## 組

| 頁 | 旧サイトの URL | 今のサイトの URL（`site_url`） | 転送先の URL | 状態 |
|---|---|---|---|---|
| `sakura-script` | https://ssp.shillest.net/ukadoc-legacy/manual/list_sakura_script.html | https://ukatech.github.io/ukadoc-spec/list/sakura-script/ | https://ukatech.shillest.net/ukadoc-spec/list/sakura-script/ | 比べた |
| `descript-ghost` | https://ssp.shillest.net/ukadoc-legacy/manual/descript_ghost.html | https://ukatech.github.io/ukadoc-spec/descript/ghost/ | https://ukatech.shillest.net/ukadoc-spec/descript/ghost/ | 比べた |
| `shiori3` | https://ssp.shillest.net/ukadoc-legacy/manual/spec_shiori3.html | https://ukatech.github.io/ukadoc-spec/spec/shiori3/ | https://ukatech.shillest.net/ukadoc-spec/spec/shiori3/ | 比べた |
| `manual-ghost` | https://ssp.shillest.net/ukadoc-legacy/manual/manual_ghost.html | https://ukatech.github.io/ukadoc-spec/manual/ghost/ | https://ukatech.shillest.net/ukadoc-spec/manual/ghost/ | 比べた |

- 旧サイトの 4 頁はどれも 200。今のサイトの 4 頁は、`site_url` の URL が 301 で転送先へ移り、転送先が 200（2026-10-24）。飛ばした組は無い

## 組ごとの比べ

### `sakura-script`（さくらスクリプト）

| 観点 | 旧サイト | 今のサイト |
|---|---|---|
| 項目の切れ目 | 項目ごとに `<dl id="_!_lock,repaint_">` の `dt.entry`。左に 7px の青い線・下に細い線・薄い青の背景の帯で項目名を囲む。本文の地は薄い黄色。分類（「スコープコマンド」など）は `section.category > h1` の濃い紫の帯に白い字（D01・D06） | 項目は `<h3 id="bang-lock-repaint"><code>…</code></h3>`、項目の間は `<hr />` の細い線（`h3` 373 個・`hr` 374 個）。地は白。分類は `h2`（例: `#scope`）の大きく細い字（D01・D06） |
| パラメータ | 項目名の中に書く（例: `\![set,scaling,横倍率,縦倍率,オプション]`）。オプションは `ul.description` の箇条書き（専用の見た目の指定は無く、ほかの箇条書きと同じ） | 項目名（`h3` の `code`）の中に書く。オプションは普通の `<ul>` の箇条書き（例: `#bang-set-scaling-3`）。旧サイトと同じ形 |
| 既定値 | 該当なし（`p.default` は 0 個） | 該当なし（`**既定値:**` は 0 個） |
| 対応ベースウェア | `ul.supported-baseware` に 34×16 の画像の印（`icon_m.png`・`icon_s.png`・`icon_c.png`・`icon_n.png`）を横に並べる。版は印の後ろに文字で書く（例: SSP の印の後ろに `2.8.23`）。350 個（D02） | `<p><strong>対応:</strong> Materia / SSP / Ninix</p>` の文字の段落。350 個（D02） |
| 記述例 | `div.legend > section.code` の箱（背景 `#bbc`）に `<h1>記述例</h1>` を付け、例ごとに薄い地の段落に `<code type="SakuraScript">` を置く。255 箱・288 例。この環境（Windows の Edge）では記述例の `\` が `¥` で写る（D03・D20）。「読み込み」の後で記述例ごとに「実行」ボタンが付く（D04） | `<h4>記述例</h4>`（目次には出ない。`toc_depth: 3`）の後に、例ごとに灰色の地のコードブロック（`div.highlight`）を置く。255 個の見出し・288 ブロック。コードの右上にコピーのボタンがあり、折り返した長い行ではボタンの下に字が重なる（D03・D19） |
| 注記 | 頁の頭の注意書き（「さくらスクリプトのエスケープ」など）は `section.caption` の箱（点線の枠・薄い桃色の地・見出しを中央寄せの帯）。項目の中の注意は本文の文（「〜注意。」）で、専用の見た目は無い（D05） | 頁の頭の注意書きは `h2`（例: `#notes_escape`）と箇条書きで、枠は無い。項目の中の注意は本文の文。admonition は 0 個（D05）。非推奨の印は両方とも 0 個（旧サイトの `list.css` に `dt.entry.deprecated` の指定はあるが、この頁では使っていない） |

### `descript-ghost`（descript.txt（Ghost））

| 観点 | 旧サイト | 今のサイト |
|---|---|---|
| 項目の切れ目 | `<dl id="charset,文字コード">` の `dt.entry`（`sakura-script` と同じ帯）。高さ 700 の画面に 5 項目が入る（D08） | `<h3 id="charset">charset,文字コード</h3>`（`code` で囲まない普通の字）と `<hr />`。高さ 700 の画面に 3 項目が入る（D08） |
| パラメータ | 項目名の中に書く（例: `charset,文字コード`） | 項目名（`h3`）の中に書く。旧サイトと同じ形 |
| 既定値 | `p.default`。小さく斜めの灰色の字で、見た目の指定（`:before`）が「既定値: 」を前に付ける。本文より字下げする。74 個（D07） | `<p><strong>既定値:</strong> …</p>`。本文と同じ大きさ・色の段落。74 個（D07） |
| 対応ベースウェア | `ul.supported-baseware` の画像の印。74 個（D09） | `**対応:**` の文字の段落。74 個（D09） |
| 記述例 | 頁の頭の「descript.txt（Ghostの）」の箱（`section.caption.introduction`）の中に `<pre><code>` で 1 つ | `h3#introduction_descript.txt` の下の `h4`「記述例と基本の書き方」の後にコードブロック 1 つ |
| 注記 | 頁の頭の説明は `section.caption.introduction` の箱（実線の枠・青紫の地）。注意は本文の文（「〜注意。」） | 頁の頭の説明は `h3` と `h4`（「概要」など）と本文の段落で、枠は無い。admonition は 0 個 |

### `shiori3`（SHIORI/3.0）

| 観点 | 旧サイト | 今のサイト |
|---|---|---|
| 項目の切れ目 | ヘッダ（「メソッド」「Charset」「Sender」など）ごとに `dt.entry` の帯。`dl` に id は無い（D11） | ヘッダごとに 1 項目だけの `<ul>` を置き、`<strong>名前</strong>: 説明` の箇条書きにする。id は無い（D11） |
| パラメータ | ヘッダの取る値を `dl.property` の 2 列の表にする。値の名前は右寄せの太字で灰緑の欄、説明は 1 行おきに色の違う緑の欄。7 個（D10） | 値を入れ子の箇条書き `<strong>GET</strong>: …` にする（D10） |
| 既定値 | 該当なし | 該当なし |
| 対応ベースウェア | 画像の印は無い。項目名の後ろに文字で書く（例: `SenderType [SSP 2.5.05～拡張]`） | 太字の項目名の後ろに文字で書く（例: `**SenderType [SSP 2.5.05～拡張]**`）。旧サイトと同じ形 |
| 記述例 | `section.caption` の箱の「サンプル」に `<pre>` で 2 つ（request・response） | `h3`「サンプル」（`#request-サンプル`・`#response-サンプル`）の後にコードブロック 2 つ |
| 注記 | 「※改行コードはCR+LF。」などを本文の段落で書く。専用の見た目は無い | 同じく本文の段落。admonition は 0 個 |

### `manual-ghost`（ゴースト）

| 観点 | 旧サイト | 今のサイト |
|---|---|---|
| 項目の切れ目 | ファイルごとに `dl.component` の `dt`（ファイル名。リンクのものは青）と、字下げした `dd`（説明）。`section` の間を緑の横線で区切る。`updates2.dau` と `updates.txt` は 2 つの `dt` で 1 つの `dd` を共有する（D12） | ファイルごとに箇条書き `<strong>ファイル名</strong>: 説明` にし、続きの段落を字下げする。横線は無い。`updates2.dau` は説明の無い 1 行の箇条書きになり、説明は次の `updates.txt` にだけ付く（D12） |
| パラメータ | 該当なし | 該当なし |
| 既定値 | 該当なし | 該当なし |
| 対応ベースウェア | 該当なし | 該当なし |
| 記述例 | 該当なし（記述例は無い。頁の頭のファイル構成の木は `<pre>` で、ファイル名を `em.filename` の緑の字にする。D13） | 該当なし（ファイル構成の木はコードブロックで、色の区別は無い。D13） |
| 注記 | 該当なし（`base.css` に `.passage.hint`・`.passage.note` の箱の指定はあるが、この頁では使っていない。「このファイルは省略可能。」などは本文の段落） | 該当なし（admonition は 0 個。注意は本文の段落） |

## 差

### D01
- 種類: 視認性
- 頁・部分: `sakura-script` の各項目の切れ目（項目名とその前後）
- 旧サイトでの見せ方: 項目名を `dt.entry` の帯（左の 7px の青い線・下の線・薄い青の地）で囲み、本文を薄い黄色の地に置くので、どこから次の項目かがひと目で分かる
- 今のサイト: 項目名は `h3` の `code`（灰色の小さな地）で、項目の間は細い `hr` だけ。地は白で、項目名と本文の地が同じ
- 根拠: `screenshots/survey-sakura-script-D01-old.png`（`[id="_!_lock,repaint_"]`）、`screenshots/survey-sakura-script-D01-now.png`（`#bang-lock-repaint`）

### D02
- 種類: 旧サイトだけ
- 頁・部分: `sakura-script` の各項目の対応ベースウェア（350 個）
- 旧サイトでの見せ方: `ul.supported-baseware` に、ベースウェアごとの 34×16 の画像の印（`image/icon_m.png`・`icon_s.png`・`icon_c.png`・`icon_n.png`。`alt` に Materia・SSP・CROW・Ninix）を横に並べ、版を印の後ろに文字で書く
- 今のサイト: `<p><strong>対応:</strong> Materia / SSP / Ninix</p>` の文字だけ。段落に class は無い
- 根拠: `screenshots/survey-sakura-script-D01-old.png` と `screenshots/survey-sakura-script-D01-now.png`（どちらにも写っている）。旧 `ul.supported-baseware`、今 `#bang-lock-repaint` の後の `<strong>対応:</strong>` の段落
- 注: 画像の印は旧サイトの素材で、再利用の許可は明記されていない

### D03
- 種類: 視認性
- 頁・部分: `sakura-script` の各項目の記述例
- 旧サイトでの見せ方: 記述例を 1 つの箱（`div.legend`、地 `#bbc`）にまとめ、箱の中の上に「記述例」の見出しを置く。例は箱の中で 1 つずつ薄い地の段落に分かれる。説明・対応・記述例の並びが、項目の帯の中で 1 かたまりに見える
- 今のサイト: `h4`「記述例」の見出し（本文と同じ太さの字）の下に、例ごとに独立した灰色のコードブロックが並ぶ。見出しとコードの間に枠のつながりは無い。コードの右上のコピーのボタンの下に、折り返した行の字が重なる（例: `#bang-lock-repaint` の記述例の 1 行目の右端）
- 根拠: `screenshots/survey-sakura-script-D01-old.png`（`[id="_!_lock,repaint_"] div.legend`）、`screenshots/survey-sakura-script-D01-now.png`（`#bang-lock-repaint-記述例` と後の `div.highlight`）

### D04
- 種類: 旧サイトだけ
- 頁・部分: `sakura-script` の記述例を手元のゴーストで再生する仕掛け（`sakura_player.js`）
- 旧サイトでの見せ方: 左の欄の「Target Ghost」（`#TargetGhost`）に、ゴーストを選ぶ一覧（`#ghost_list_content`）と「読み込み」ボタン（`#ghost_reload_button`）と、危険なタグは `OnUkadocScriptExample` に対応したゴーストでしか実行されない旨の説明を置く。「読み込み」を押したときに初めて `https://cdn.jsdelivr.net/gh/ukatech/jsstp-lib@v3.1.1.2/dist/jsstp.mjs` を読み、起動中のゴーストの一覧を取り、`code[type='SakuraScript']`（287 個。記述例 288 のうち noplay の 1 例を除く）の記述例ごとに「実行」ボタンを付ける。「実行」は選んだゴーストへ `Event: OnUkadocScriptExample`・`Script`・`Option: notranslate` を SSTP で送る。`type="SakuraScript;noplay=true"` の 1 例（`\![vanishbymyself]`）は対象の外になる
- 今のサイト: 無い（頁が読むスクリプトは `assets/javascripts/bundle.*.min.js` だけ）
- 根拠: `screenshots/survey-sakura-script-D05-old.png` の左の欄（「Target Ghost」と「読み込み」ボタンが写っている）。https://ssp.shillest.net/ukadoc-legacy/manual/list_sakura_script.html の `#TargetGhost`・`script[src="sakura_player.js"]`
- 注: 公開サイトから手元のベースウェアへ送る仕掛けで、外部の CDN を読む。この実際の送信は試していない（Requirement 2.7・design.md の Security Considerations）

### D05
- 種類: 視認性
- 頁・部分: `sakura-script` の頁の頭の注意書きの節（「さくらスクリプトのエスケープ」「さくらスクリプトの寿命」など）
- 旧サイトでの見せ方: 節ごとに点線の枠と薄い桃色の地の箱に入れ、見出しを中央寄せの桃色の帯にする。項目の一覧（帯の項目）とは別の種類の文だとひと目で分かる
- 今のサイト: `h2` の見出しと箇条書きで、ほかの分類（「スコープコマンド」など）の `h2` と同じ見た目。枠は無い
- 根拠: `screenshots/survey-sakura-script-D05-old.png`（`#notes_escape`）、`screenshots/survey-sakura-script-D05-now.png`（`#notes_escape`）

### D06
- 種類: 視認性
- 頁・部分: `sakura-script` の分類の見出し（「スコープコマンド」など）
- 旧サイトでの見せ方: `section.category > h1` を濃い紫（`#669`）の帯に白い大きな字で書き、分類の始まりが遠くからでも分かる
- 今のサイト: `h2`（例: `#scope`）の大きく細い字と、前の `hr` だけ。項目の `h3` との差は字の大きさだけ
- 根拠: `screenshots/survey-sakura-script-D05-old.png` と `screenshots/survey-sakura-script-D05-now.png` の下の方（どちらにも「スコープコマンド」が写っている）。旧 `section.category > h1`、今 `#scope`

### D07
- 種類: 視認性
- 頁・部分: `descript-ghost` の各項目の既定値（74 個）
- 旧サイトでの見せ方: `p.default` を小さく斜めの灰色の字にし、字下げして、見た目の指定で「既定値: 」を前に付ける。説明の文と既定値の文が字の形で分かれる
- 今のサイト: `<p><strong>既定値:</strong> …</p>`。本文と同じ大きさ・色で、「既定値:」の太字だけが目印。段落に class は無い
- 根拠: `screenshots/survey-descript-ghost-D07-old.png`（`[id="charset,文字コード"]`）、`screenshots/survey-descript-ghost-D07-now.png`（`#charset`）

### D08
- 種類: 視認性
- 頁・部分: `descript-ghost` の各項目の切れ目
- 旧サイトでの見せ方: `sakura-script` と同じ `dt.entry` の帯。項目が詰めて並び、高さ 700 の画面に 5 項目が入る
- 今のサイト: 項目名の `h3` が `code` で囲まれない普通の細い字で、`sakura-script` の頁よりさらに本文と見分けにくい。項目の間に `hr` と広い余白があり、高さ 700 の画面に 3 項目しか入らない
- 根拠: `screenshots/survey-descript-ghost-D07-old.png`、`screenshots/survey-descript-ghost-D07-now.png`（同じ画面に写っている）。旧 `dl > dt.entry`、今 `#charset` から続く `h3`

### D09
- 種類: 旧サイトだけ
- 頁・部分: `descript-ghost` の各項目の対応ベースウェア（74 個）
- 旧サイトでの見せ方: D02 と同じ画像の印（`ul.supported-baseware`）
- 今のサイト: `**対応:**` の文字の段落（例: `対応: SSP / CROW`）
- 根拠: `screenshots/survey-descript-ghost-D07-old.png`、`screenshots/survey-descript-ghost-D07-now.png`（同じ画面に写っている）。旧 `[id="charset,文字コード"] ul.supported-baseware`、今 `#charset` の後の `<strong>対応:</strong>` の段落

### D10
- 種類: 視認性
- 頁・部分: `shiori3` の request の各ヘッダの取る値（「メソッド」の GET・NOTIFY、「SenderType」の internal・external など。`dl.property` 7 個）
- 旧サイトでの見せ方: 値を 2 列の表にする。値の名前を右寄せの太字で灰緑の欄に、説明を 1 行おきに色の違う緑の欄に置くので、値の名前を縦に目で追える
- 今のサイト: 入れ子の箇条書き `**GET**: …`。値の名前は説明の文の頭の太字で、説明が折り返すと名前の列がそろわない
- 根拠: `screenshots/survey-shiori3-D10-old.png`（`#request > dl`）、`screenshots/survey-shiori3-D10-now.png`（`#request ~ ul`）

### D11
- 種類: 視認性
- 頁・部分: `shiori3` の request・response の各ヘッダの切れ目（「メソッド」「Charset」「Sender」など）
- 旧サイトでの見せ方: ヘッダごとに `dt.entry` の帯（D01 と同じ）を付ける
- 今のサイト: ヘッダごとに 1 項目だけの箇条書き `**Charset**: …` で、ヘッダの名前は箇条書きの頭の太字。ヘッダの間の区切りは箇条書きの余白だけ
- 根拠: `screenshots/survey-shiori3-D10-old.png`、`screenshots/survey-shiori3-D10-now.png`（同じ画面に写っている）。旧 `#request > dl > dt.entry`、今 `#request ~ ul`

### D12
- 種類: 視認性
- 頁・部分: `manual-ghost` のファイルごとの説明の切れ目
- 旧サイトでの見せ方: ファイル名（`dl.component > dt`）を 1 行に置き、説明（`dd`）を字下げして下に置く。ファイルのまとまり（`section`）の間を緑の横線で区切る。`updates2.dau` と `updates.txt` は 2 つの名前が 1 つの説明を共有しているのが、並んだ `dt` で分かる
- 今のサイト: 箇条書き `**ファイル名**: 説明` で、最初の段落はファイル名と同じ行に続く。横線は無い。`updates2.dau` が説明の無い 1 行の箇条書きになり、説明が無いファイルに見える
- 根拠: `screenshots/survey-manual-ghost-D12-old.png`（`main > h1`）、`screenshots/survey-manual-ghost-D12-now.png`（`h1#ゴースト`）

### D13
- 種類: 視認性
- 頁・部分: `manual-ghost` の頁の頭のファイル構成の木
- 旧サイトでの見せ方: `<pre>` の中で、ファイル名を `em.filename` の緑の字にし、フォルダ（`(myghost)`・`ghost`・`master`）を黒い字のままにする
- 今のサイト: コードブロックの等幅の字で、ファイルとフォルダの色の区別は無い
- 根拠: `screenshots/survey-manual-ghost-D12-old.png`、`screenshots/survey-manual-ghost-D12-now.png`（同じ画面に写っている）。旧 `main pre em.filename`（11 個）、今 `h1#ゴースト` の後の `div.highlight`

### D14
- 種類: 旧サイトだけ
- 頁・部分: `manual-ghost` の頁の頭の飾り
- 旧サイトでの見せ方: `manual_*.html` の頁は頭に `iframe#navigation`（`navigation.html`）を置き、キャラクターの絵と「UKADOC Project」「Powered by Disc-2」の題、画像のボタン（「トップページ」「連絡・報告」「更新履歴」「SSP開発」）、緑の地を見せる。地には `shade_v.png`・`shade_h.png` の画像を使う。`list_*`・`descript_*`・`spec_*` の頁にこの頭は無い
- 今のサイト: 緑の帯（Material の `md-header`）に頁の題と、検索・明暗の切り替え・GitHub へのリンク。絵は無い
- 根拠: `screenshots/survey-manual-ghost-D12-old.png` の上の部分、`screenshots/survey-manual-ghost-D12-now.png` の上の帯。旧 `iframe#navigation`
- 注: 絵・ボタン・地の画像は旧サイトの素材で、再利用の許可は明記されていない

### D15
- 種類: 失わないもの
- 頁・部分: 検索（4 頁とも。代表を `sakura-script` とする）
- 今のサイト: どの頁も頭の帯に検索の欄（`[data-md-component="search"]`、`Ctrl+K`）があり、サイト全体を引ける。候補の表示と、結果の頁での語の強調がある（`mkdocs.yml` の `search.suggest`・`search.highlight`）
- 旧サイト: `list_sakura_script.html`・`descript_ghost.html`・`spec_shiori3.html` には検索が無い。`manual_ghost.html` は頭の `iframe`（`navigation.html`）に Google のサイト内検索の欄（`form.internal-search`、`action="http://www.google.com/search"`、絞り込みは `site:http://ssp.shillest.net/ukadoc/manual/`）がある
- 根拠: `screenshots/survey-sakura-script-D01-now.png` の上の帯（「検索」の欄が写っている）。https://ukatech.shillest.net/ukadoc-spec/list/sakura-script/ の `[data-md-component="search"]`

### D16
- 種類: 失わないもの
- 頁・部分: ダークモード（4 頁とも。代表を `sakura-script` とする）
- 今のサイト: 頭の帯に明暗の切り替え（`form[data-md-component="palette"]`）があり、OS の設定（`prefers-color-scheme`）に合わせて明・暗が選ばれる（`mkdocs.yml` の `palette` の 2 つ）
- 旧サイト: 無い（`list.css`・`base.css` に `prefers-color-scheme` も `@media` も無い）
- 根拠: `screenshots/survey-sakura-script-D01-now.png` の上の帯（太陽の印のボタン）。https://ukatech.shillest.net/ukadoc-spec/list/sakura-script/ の `form[data-md-component="palette"]`

### D17
- 種類: 失わないもの
- 頁・部分: 見出しへのリンク（4 頁とも。代表を `sakura-script` とする）
- 今のサイト: 見出しごとに `a.headerlink`（¶）があり、項目の URL をそのまま取れる（`sakura-script` 649 個・`descript-ghost` 83 個・`shiori3` 7 個・`manual-ghost` 1 個）。右の欄に `h3` までの目次がある
- 旧サイト: 見出しへのリンクの印は無い。`sakura-script`・`descript-ghost` の項目には `dl` の id がある（URL の `#` は頁の中の目次から取れる）が、`shiori3` のヘッダの `dl` と `manual-ghost` のファイルには id が無い
- 根拠: https://ukatech.shillest.net/ukadoc-spec/list/sakura-script/ の `#bang-lock-repaint > a.headerlink`。旧 `[id="_!_lock,repaint_"] > dt.entry`（リンクの印が無い）

### D18
- 種類: 失わないもの
- 頁・部分: 狭い画面での表示（4 頁とも。代表を `sakura-script` とする）
- 今のサイト: `meta name="viewport"` があり、幅 375 で横にはみ出さない（`sakura-script`・`descript-ghost`・`manual-ghost` で `scrollWidth` 375 = `innerWidth` 375）
- 旧サイト: `viewport` の指定も `@media` も無い。幅 375 で `sakura-script` は `scrollWidth` 859、`descript-ghost` は 469、`manual-ghost` は 815 で横にはみ出す。幅 1000 でも `sakura-script` は `scrollWidth` 1127 ではみ出す
- 根拠: `node .kiro/specs/site-look-plan/tools/shot.mjs <URL> body - light 375 812` の出力（2026-10-24）。URL は「組」表の旧サイトの URL と転送先の URL

### D19
- 種類: 失わないもの
- 頁・部分: コードのコピー（コードブロックのある頁。代表を `sakura-script` とする）
- 今のサイト: コードブロックの右上にコピーのボタンがある（`mkdocs.yml` の `content.code.copy`）。記述例を写してそのまま試せる。ただし折り返した行では字がボタンの下に重なる（D03）
- 旧サイト: 無い
- 根拠: `screenshots/survey-sakura-script-D01-now.png`（記述例のブロックの右上）。https://ukatech.shillest.net/ukadoc-spec/list/sakura-script/ の `div.highlight`

### D20
- 種類: 失わないもの
- 頁・部分: `sakura-script` の記述例の字
- 今のサイト: 記述例のコードの `\` が `\` のまま写る
- 旧サイト: この環境（Windows の Edge）では、記述例の `<code>` の `\` が `¥` で写る（`\s[0]\i[500]` が `¥s[0]¥i[500]` に見える）。項目名の帯の `\` は `\` のまま。等幅の字の選び方による
- 根拠: `screenshots/survey-sakura-script-D01-old.png`（記述例の箱）、`screenshots/survey-sakura-script-D01-now.png`（記述例のブロック）

## 見た目の外の問題

- **`site_url` と転送先の食い違い**: 公開サイトの `https://ukatech.github.io/ukadoc-spec/…` は 301 で `https://ukatech.shillest.net/ukadoc-spec/…` へ転送される（4 頁とも、2026-10-24）。一方、`ukadoc-spec/mkdocs.yml` の `site_url` は `https://ukatech.github.io/ukadoc-spec/` のままである（`0e028a4` の 3 行目）。直すのはこの spec の範囲外で、後で roadmap のバックログに回す。**追記（2026-10-24）**: 見比べの後に ukadoc-spec の `3d8e4a7`（PR #1、`origin/main` は `c84942a`）で `site_url` が `https://ukatech.shillest.net/ukadoc-spec/` に直り、この食い違いは解けた。試作（タスク 3）からは `c84942a` を土台にする。**追記（2026-10-25）**: その後 ukadoc-spec の `417511c` でヘッダの色（テーマの色）が緑 `#2e8233` から紺 `#1f4e8c` に変わった（`afb2152` まで進めた）。この見比べの「今のサイト」の画面と「緑の帯」の記述は、緑の時点のものである。紺の暗い表示では、リンクと左の目次の今の頁が暗い地に 1.94:1 しかない（`candidates.md` の C24）
- **`manual-ghost` の `updates2.dau`**: 旧サイトでは `updates2.dau` と `updates.txt` が 1 つの説明を共有しているが、今のサイトでは `updates2.dau` が説明の無い箇条書きになる（D12）。原稿の書き方による見え方で、原稿を直すのはこの spec の範囲外である
- **旧サイトの検索の絞り込み先**: 旧サイトの `manual_*.html` の検索欄は `site:http://ssp.shillest.net/ukadoc/manual/` に絞る（D15）。旧サイトの今の場所（`/ukadoc-legacy/manual/`）とは違う。旧サイトの側の話で、記録だけにする
