# ギャップ分析: site-look-list-items

- 日付: 2026-10-25
- 対象: `requirements.md`（Requirement 1〜9）と、ukadoc-spec の `origin/main` `afb2152`（メインのチェックアウト `ukadoc-spec/`。読むだけ）
- 読んだもの: `ukadoc-spec/assets/extra.css`・`ukadoc-spec/scripts/prepare_site.py`・`ukadoc-spec/mkdocs.yml`・`ukadoc-spec/CLAUDE.md`、テーマの見た目の指定（`ukadoc-spec/_site/assets/stylesheets/classic/main.cfc7948b.min.css`・`palette.*.min.css`）、試作 `.kiro/specs/completed/site-look-plan/mockups/extra.css`（C01・C02・C03・C09・C18）と `mockups/README.md` の測り、`decisions.md` の C01・C02・C03・C08・C09・C18 の行、`site-look-dark-link-color` の `research.md`（対比の式と暗い表示の色）
- 数え方: ukadoc-spec のメインのチェックアウトに残っていた build の出力 `_site/`（2026-10-24 23:00 の build。`afb2152` の前の `bb13a8c` 前後の原稿で、見出しの組み立ては `afb2152` と同じ。`extra.css` は `afb2152` と同じ）の HTML を、手元の使い捨ての読み取りの script（スクラッチの置き場。ukadoc-spec には何も書かない）で数えた。まとめ頁の単位の組み立て（深さ・index か・見出しだけか）は、`prepare_site.py` の `collect()` と同じ辿り方を、原稿を読むだけの script で再現して数えた。`prepare_site.py`・`zensical build`・`serve` は流していない。数は設計・実装で、作業木の build で数え直す
- 対比の数は、WCAG 2.x の相対輝度の式で手元で計算した見込みである。ブラウザでの測りは設計・実装で行い、それを正とする

## 1. 今の状態

### `assets/extra.css`（20 行）
- 紺のテーマ（`[data-md-color-primary="custom"]`）・目次の一覧の詰め（`.md-typeset ul li > ul`）・記述例の折り返し（`.md-typeset pre > code { white-space: pre-wrap; word-break: break-all }`）の 3 つの塊だけ
- まとめ頁・見出し・`hr`・`.highlight` への指定は無い。暗い表示（`slate`）だけの指定も無い
- PR #10（`site-look-dark-link-color`）は紺のテーマの塊の直後に塊を足す。この spec の塊を末尾に足せばぶつからない（brief の申し送り）

### テーマ（Zensical 0.0.67・Material classic）の関わる指定
| 指定 | 値 | この spec との関わり |
|---|---|---|
| `.md-typeset hr` | `margin: 1.5em 0; border-bottom: .05rem solid var(--md-default-fg-color--lightest)` | C02 で上下を詰める |
| `.md-typeset h2` | `margin: 1.6em 0 .64em; font-size: 1.5625em; font-weight: 300` | C03 の帯（太い字にする） |
| `.md-typeset h3` | `margin: 1.6em 0 .8em; font-size: 1.25em; font-weight: 400` | C01 の帯・C02 の詰め |
| `.md-typeset h4` | `margin: 1em 0; font-weight: 700` | C18 の帯 |
| `.md-typeset pre > code` | `padding: .7720588235em 1.1764705882em` | C09 で右の余白を広げる |
| `.md-clipboard` | `width: 1.5em; height: 1.5em`（右上に置く） | C09 の広げる幅の目安（試作は右の余白 `2.8em`） |
| `.md-typeset` | `print-color-adjust: exact` | 印刷でも帯・箱の地の色が出る（Requirement 6.6） |
| 明 `--md-default-fg-color--lightest` | `#00000012`（黒の 7%） | C01 の帯の地（白の上で約 `#ededed`） |
| 暗 `--md-default-fg-color--lightest` | `hsla(225, 15%, 90%, .12)` | C01 の帯の地（暗い地 `#1e2129` の上で約 `#36383f`） |
| 明 `--md-code-fg-color` / `--md-code-bg-color` | `#36464e` / `#f5f5f5` | C18 の箱の中の字 |
| 暗 `--md-code-fg-color` / `--md-code-bg-color` | `hsla(225, 18%, 86%, .82)` / `hsla(225, 15%, 18%)` | 同上 |
| `mkdocs.yml` の `features` | `content.code.copy` | すべてのコードブロックにコピーのボタン |
| `mkdocs.yml` の `toc` | `permalink: true`・`toc_depth: 3` | すべての見出しに ¶。右の欄の目次は `h3` まで |
| 暗い表示の色の当て方 | `palette.*.css` の `@media screen { [data-md-color-scheme=slate] {…} }` | 暗い表示の色は画面だけ。印刷は明るい表示の色 |

### `scripts/prepare_site.py`（261 行）
- `register_bundle()` が単位ごとに id（項目のファイル名。重なればパス）を振り、`shift_headings()` が見出しの段を深さの分だけずらして `#### 題 {#id}` の形に書き直す。単位が index（分類）か項目か、深さ、ファイル名（`notes_`・`introduction`）を、処理の中で知っている
- つないだ単位の間に `---`（`hr`）を入れる。ただし **見出しだけの単位（見出しだけの分類）の後ろには入れない**。だから分類の最初の項目の前には `hr` が無い
- 今は見出し・段落に class の目印を付けていない（試作の `slp_mark()` は作業木だけにあった）
- 見出しの数の検査（`old_ids`）は、ずらす前の原稿で数える。見出しの行の `{#id}` に class を足しても、検査とリンクの書き換えには響かない見込み（Research Needed: 見出しの行の `{#id .cls}` の形が `toc` の id・¶ をそのまま保つか）

### まとめ頁の組み立て（20 頁。`collect()` の再現で数えた）
| 頁 | 分類の見出し（段） | 項目名（段） | 注意書き | 備考 |
|---|---|---|---|---|
| `descript/` の 8 頁 | `h2`（見出しだけ） | `h3`（頭の説明 `introduction_*` を含む） | なし | `shell-surfaces` は分類の中の分類 3 個（`h3`）と、その中の項目 100 個（`h4`） |
| `list/sakura-script` | `h2` 13 個（見出しだけ） | `h3` 361 個 | `h2` 2 個・`h3` 12 個 | brief の数（`hr` 374・`notes_` の `h3` 12）と合う |
| `list/propertysystem` | `h2` 1 個、分類の中の分類 `h3` 2 個 | `h3` 159 個・`h4` 35 個 | `h4` 2 個 | 注意書きが `h4` にもある |
| `list/shiori-event` | `h2` 28 個（見出しだけ） | `h3` 328 個、`h2` 1 個 | なし | 分類に入らない項目が `h2` |
| `list/shiori-event-ex` | `h2` 34 個（32 個は説明の文あり） | `h3` 175 個、`h2` 3 個 | なし | |
| `list/shiori-resource` | `h2` 7 個 | `h3` 160 個、`h2` 2 個 | なし | |
| `list/plugin-event` | `h2` 1 個 | `h3` 19 個 | なし | |
| `spec/` の 6 頁（`fmo-mutex`・`saori-ex`・`shiori3`・`sstp`・`update-file`・`web`） | `saori-ex` だけ `h2` 8 個 | **`h2`**（35 個）、`saori-ex` の分類の中は `h3` 37 個 | なし | 項目の中の節が `h3`（`spec/sstp` の「requestサンプル」など） |

- **brief の「項目名は `h3`、分類の見出しは `h2`」は `list/`・`descript/` の大半で正しいが、`spec/` のまとめ頁（項目が `h2`）と深い分類（項目が `h4`、分類が `h3`）では外れる**
- 読み物の頁にも `h2`・`h3` がある（`dev/` の各頁・`spec/dll`・`spec/headline`・`spec/plugin`・トップの頁）。`hr` は読み物の頁に 0 個

### `hr` の直後の要素（全サイト）
| まとめ頁の群 | `h2` | `h3` | `h4` |
|---|---|---|---|
| `descript/` | 17 | 438 | 100 |
| `list/` | 87 | 1167 | 38 |
| `spec/` | 37 | 37 | 0 |

- `hr + h3` で項目を見分けると、(1) 分類の最初の項目（前に `hr` が無い。`list/sakura-script` で 13 個、`list/shiori-event` で約 28 個）に帯が付かない、(2) `spec/` の項目（`hr + h2`）・深い分類の項目（`hr + h4`）に付かない、(3) `spec/saori-ex` の分類の中の `hr + h3` は項目なので付いてよい。注意書きの `h3`（12 個）は `hr` の後にあるので、`:not([id^="notes_"])` で除ける
- `h2:not([id^="notes_"])` をまとめ頁で帯にすると、`spec/` の項目名 35 個と `list/` の分類に入らない項目名 6 個が、分類の濃い帯になる

### 記述例の見出しとコードブロック（全サイト）
- 段が `h4` で直後にコードブロックが続く見出し: **289 個**。題の内訳: 「記述例」277 個（`list/sakura-script` 255・`spec/saori-ex` 18・`list/propertysystem` 2・`descript/install` 2）、「記述例と基本の書き方」5 個（`descript/` の頭の説明）、「基本書式と記述例」2 個（`descript/shell-surfaces`）、`spec/dll` の「load関数」「unload関数」2 個（C の関数の宣言）、`spec/sstp` の「requestサンプル」など 3 個（SSTP の要求と応答の例）
- 題が「記述例」なのに C18 の当て先にならないもの: `h3` の「記述例」2 個（`descript/shell-surfaces` の頭の説明はコードブロックが続く。`spec/saori-ex` は段落が続く）、`h4` の「記述例」で段落が先に続くもの 2 個（`descript/install`・`list/propertysystem` の頭の説明）
- 見出しの後に続くコードブロックの数: 1 つ 261 か所、2 つ 21 か所、3 つ 6 か所、4 つ 1 か所（2 つ以上は 28 か所）
- `h4` 以外から始まるコードブロックの連なり: 3 か所（`descript/shell-surfaces`・`spec/plugin` は段落の後、`spec/sstp` は `h3` の後）。試作の `:is(h4, .highlight) + .highlight` は、この 3 か所の 2 つ目のコードブロックにも箱の線と地を付けてしまう
- 記述例の箱の中（見出しに続く最初のコードブロック）のリンク: 0 個

### 帯の上に来るリンク・コード
- 項目名の中のリンク: `descript/balloon` 26 個（「座標 *1」の注へのリンク）、`list/sakura-script` 5 個（`\_b`・`\!` のオプションへのリンク）。**C01 の帯の上に来る**
- 項目名の中のコードの字: `list/sakura-script` 340 個、`list/plugin-event` 3 個（C01 で地を消す）
- 分類の見出しの中のリンク・コード: 0 個（C03 の帯の上には今は来ない）

## 2. 測りの見込み（手元の計算）

| 字 | 地 | 対比 | 線 | 判定 |
|---|---|---|---|---|
| 明るい表示のリンク 紺 `#1f4e8c` | 明るい表示の C01 の帯（約 `#ededed`） | 約 7.1 | 7:1 | ぎりぎり満たす |
| 明るい表示のホバー 藍 `#526cfe` | 同上 | 約 3.6 | 3:1 | 満たす |
| 暗い表示のリンク 明るい紺 `#8fb4e8`（PR #10） | 暗い表示の C01 の帯（約 `#36383f`） | **約 5.5** | 7:1 | **満たさない** |
| 暗い表示のホバー 藍 `#526cfe` | 同上 | **約 2.75** | 3:1 | **満たさない** |
| 暗い表示のリンク 紺 `#1f4e8c`（PR #10 の前） | 同上 | 約 1.6 | 7:1 | 満たさない（今の本番の暗い地でも 1.93。PR #10 の受け持ち） |
| 白い字 | 紺 `#1f4e8c`（C03 の帯・暗い表示の C18 の帯） | 8.31 | 7:1 | 満たす（試作の測りと同じ） |
| 白い字 | 濃い紺 `#163a69`（明るい表示の C18 の帯） | 11.39 | 7:1 | 満たす（試作の測り） |
| ¶ の白の 70%（試作の `--md-primary-bg-color--light`） | 紺 `#1f4e8c` | 約 5.0 | 3:1 | 満たす |
| ¶ のホバー 藍 `#526cfe` | 紺 `#1f4e8c` | **約 1.95** | 3:1 | **満たさない**（テーマは ¶ のホバーに藍を使う） |
| 明るい表示のコードの字 `#36464e` | C18 の箱の薄い紺 `#eef2f8` | 約 8.7 | 4.5:1 | 満たす |
| 暗い表示のコードの字 | C18 の箱の暗い地 `#1d2433` | 未測（Research Needed） | 4.5:1 | 字が半透明（`.82`）なので、ブラウザで測る |

- **暗い表示の C01 の帯の上のリンクは、PR #10 の色でも 7:1 に届かず、ホバーは 3:1 に届かない見込み**（Requirement 6.3 が働く）。試作の C22 は、同じ理由（帯の地にリンクが沈む）で帯の中のリンクを項目名と同じ字の色にした。下線などで、リンクだと分かる手がかりを残すかは設計で決める
- 作業木は PR #10 を前提にしないので、作業木の build だけで測ると暗い表示のリンクは紺 `#1f4e8c` のまま（約 1.6:1）になる。何を相手に測るかは OPEN QUESTION 5
- 印刷: テーマが `.md-typeset` に `print-color-adjust: exact` を付けているので、帯・箱の地の色は印刷にも出る（白い字は紺の地の上に残り、読める）。暗い表示だけの色（試作の C18 の `#1d2433`・`#7fa6dc`）を `@media screen` の外で `[data-md-color-scheme="slate"]` に書くと、暗い表示を選んだまま印刷したとき、白い紙の上に暗い箱と明るい表示の字の色（`#36464e`）が出て読めない（`site-look-dark-link-color` の印刷の論点と同じ）

## 3. 要件と今の資産の対応

| 要件 | 今ある資産 | ギャップ | 種類 |
|---|---|---|---|
| 1.1・1.2 項目名の帯 | 試作の C01（`h3:not([id^="notes_"])`） | 本番の指定が無い | Missing |
| 1.3 すべての項目に帯 | `prepare_site.py` は単位の役（分類か項目か）を知っている | 見出しの段や `hr + h3` では、分類の最初の項目・`spec/` の項目・深い分類の項目を取りこぼす。役を見出しに残す目印が要る見込み | Missing / Constraint |
| 1.4・3.3 注意書きを除く | 見出しの id が `notes_` で始まる | id の形で除ける（目印の方式でも、`notes_` の単位に付けない） | — |
| 1.6・2.4・3.7 読み物の頁は今のまま | 読み物の頁に `hr` は 0 個 | 頁の種類を見分ける印が今は無い（Material は頁ごとの class を付けない）。単位の目印で絞れば、読み物の頁には付かない | Missing |
| 2.1〜2.3 項目の間の詰め | 試作の C02（サイト全体の `hr`・`h3`・`p`） | 試作はサイト全体に効く。まとめ頁の項目の中に絞る印が要る | Missing |
| 2.2 高さ 700 に 4 項目 | 試作の測り（`hr .6em`・`h3 .6em 0 .4em`・`p .5em` で 4 項目と 5 つ目の名前） | 本番の帯（C01）の余白と重ねて測り直す | Unknown |
| 3.1・3.2 分類の帯 | 試作の C03（`h2:not([id^="notes_"])`） | まとめ頁の分類に絞る印が要る。`spec/` の `h2` は項目 | Missing / Constraint |
| 3.5 分類の中の分類 | — | 段が `h3` の分類の見出し 5 個の扱いを決める（OPEN QUESTION 2） | Unknown |
| 3.6・5.8 帯の中の ¶ | 試作は ¶ をふだんの色だけ指定 | ¶ のホバーの藍が紺の地に約 1.95:1 | Missing |
| 4.1〜4.3 コピーのボタン | 試作の C09（`.md-typeset pre > code { padding-right: 2.8em }`）。`pre > code` は両方の HTML の形に効く | 本番の指定が無い。幅 375 での確かめ | Missing |
| 5.1〜5.3・5.5 記述例の箱 | 試作の C18（`h4:has(+ .highlight)`・`:is(h4, .highlight) + .highlight`・`div.highlight > pre`） | 本番の指定が無い。連なりの指定が `h4` の外から始まる 3 か所にも効く | Missing / Constraint |
| 5.4 記述例でないコードは今のまま | — | 連なりを `h4` から始まるものに限る書き方が要る | Missing |
| 5.6 箱の中の字 | 明るい表示は約 8.7:1 | 暗い表示の字が半透明で未測 | Unknown |
| 5.7・4.3 着色の前後 | 試作は `div.highlight` と `pre.highlight` の両方で確かめた（見た目の差なし） | 着色の後の形は作業木では作れない（`mkdocs.yml` を変えない）。確かめ方を決める | Constraint |
| 6.1〜6.3 帯の上のリンク | — | 暗い表示で 7:1・3:1 に届かない見込み | Missing |
| 6.6 印刷 | テーマの暗い表示は画面だけ | 暗い表示だけの指定を画面に限る | Constraint |
| 7.1〜7.4 失わないもの | 試作で 375 px・¶・id の数を確かめた | 本番で確かめ直す | — |
| 8.x 確かめ | `shot.mjs`・目標の画面 | 着色の後の形の確かめ方（上）。`propertysystem` の位置の画面 | — |
| 9.1〜9.8 範囲 | workflow.md・brief の申し送り | 塊の注の頭の名前（下の OPEN QUESTION 6） | — |

## 4. 進め方の案

### 案 A: 見た目の指定だけ（組み立ての形と `:has()` で絞る）
- C01: `.md-typeset :is(hr, h2) + h3:not([id^="notes_"])` などの組み立ての形で項目名を見分け、`spec/` は `hr + h2`、深い分類は `hr + h4` を足す
- C02・C03: まとめ頁を `.md-typeset:has(> hr)` のような形で見分ける
- ✅ `prepare_site.py` を触らない。差分が `extra.css` だけで小さい
- ❌ 見出しの段と組み立ての形の組み合わせが頁ごとに違い（上の表）、取りこぼしと付けすぎが出やすい。`h2 + h3` は `spec/` の項目の中の節にも当たる。`:has(> hr)` は、原稿に `---` を書いた読み物の頁が出ると崩れる。後続の `site-look-list-markers` の目印とそろわない

### 案 B: `prepare_site.py` で単位の役の目印を付け、見た目の指定はそれに当てる
- `shift_headings()` で、項目の頭の見出しと分類の頭の見出しに、役の class を見出しの行の `{#id}` と同じ括弧に足す（注意書き `notes_*` には付けない）。C02 の詰めも、その目印のある頁・単位に絞る（単位を包む `div` か、頁の目印か、`h3` の目印からの組み立てかは設計で決める）
- C09・C18 は目印なしの見た目の指定（brief のとおり）
- ✅ 役で決まるので、段・`hr` の有無・頁の群に依らず、取りこぼしも付けすぎも無い。`site-look-list-markers`（同じ `prepare_site.py` で目印を付ける）とそろえやすい。`site-look-manual-files` は目印の class を見なくても、同じ帯の見え方を自分の当て先に当てられる
- ❌ `prepare_site.py` の差分が増える（見出しの書き直しの 1 か所と、要るなら単位の包み）。見出しの行の書き方が `toc` の id・¶・`old_ids` の検査を変えないことを確かめる要がある

### 案 C: 混ぜる（C01・C03 は目印、C02 は組み立ての形、C09・C18 は見た目の指定だけ）
- C01・C03 は案 B の見出しの目印、C02 は目印の付いた見出しからの組み立て（例: 項目名の目印の後の段落）か、まとめ頁の頁の目印で絞る
- ✅ `prepare_site.py` の差分を見出しの 1 か所に抑えられる
- ❌ C02 の「項目の中の段落」を見出しの目印だけから組み立てで選ぶのは、項目の中の箇条書き・表の後の段落などで漏れやすい。頁の目印を足すなら案 B と同じ大きさになる

### 案に依らない点
- C18 の連なりは、試作の `:is(h4, .highlight) + .highlight` を `h4` から始まる連なりだけに限る（例: `h4 + .highlight + .highlight` を連なりの長さ（最大 4）まで書く、または `:has()` で連なりの頭を見る）。今の形（`div.highlight > pre`）と着色の後の形（`pre.highlight`）の両方に効く書き方にする
- 暗い表示だけの指定は `@media screen` の中に書く（PR #10 と同じ）
- 塊は `extra.css` の末尾に足し、注は塊ごとに 1 行

## 5. 大きさと危うさ

- **大きさ: S**（1〜3 日）。見た目の指定は試作の書き直しで、`prepare_site.py` の目印も見出しの書き直しの 1 か所に収まる見込み。確かめ（明・暗の画面 5 組と 375 px、対比の測り、読み物の頁の見比べ）が作業の多くを占める
- **危うさ: 低〜中**。見た目の指定は試作で明・暗と 375 px を確かめ済み。中にしているのは、(1) 単位の役の目印を見出しに足す書き方が id・¶・目次を変えないことの確かめ、(2) 暗い表示の帯の上のリンクの色の決め方（7:1 に届かない見込み）、(3) 着色の後の HTML の形での確かめ方の 3 つ

## 6. 設計への申し送り

- 推す案: **案 B**（項目と分類の役を `prepare_site.py` の目印で見出しに残し、C01・C02・C03 をそれに当てる。C09・C18 は目印なし）。OPEN QUESTION 1 の答え次第で案 A に戻せる
- Research Needed:
  - 見出しの行に class を足す形（`#### 題 {#id .cls}`）で、`toc` の id・¶・右の欄の目次・`old_ids` の検査・リンクの書き換えが今のままか
  - C02 で詰める「項目の中」の範囲を、どの目印で選ぶか（単位を `md_in_html` の `div` で包むと、注意書きの箱 C04 の包み（`site-look-list-markers`）と入れ子になる。包みの順を後続とそろえる）
  - 暗い表示の C01 の帯の上のリンクの色（項目名の字の色にするか、明るいリンクの色を足すか）と、ホバー・フォーカスの色
  - 暗い表示の C18 の箱の中のコードの字（半透明）の対比
  - 着色の後の形（`pre.highlight > code`）での C09・C18 の確かめ方（作業木の `mkdocs.yml` を一時に変えて build し、確かめた後に戻す、など。変えたまま残さない）
  - C02 の詰めの量を、本番の C01 の帯の余白と重ねて、`descript/ghost` の `#charset` で 4 項目以上になるように決め直す
- 数は 2026-10-24 の build の出力で数えた。設計・実装で、作業木の `afb2152` の build で数え直す

## 7. OPEN QUESTIONS（要件の議論で決める）

**決定（2026-10-25、開発者の「承認」）**: 6 件とも推奨案で確定した。あわせて「前のPRは通る前提で進めてよい」により、PR #10 はマージされる前提とし、暗い表示の帯の上のリンクは `#8fb4e8` で判定する（作業木に PR #10 のコミットは入れない）。6 は `workflow.md` の塊の注の記述も spec 名に合わせた。

1. **項目名・分類の見出しを、見出しの段で決めるか、まとめ頁の組み立ての役で決めるか**
   - 仮定（要件の下書き）: 役で決める（Requirement 1.3・3.4）。頭の説明 `introduction_*` は項目として帯を付ける
   - 推奨: 役で決める。段で決める（brief の `h3`・`h2`）と、`spec/` の項目名 35 個・分類に入らない項目名 6 個が分類の濃い帯になり、分類の最初の項目・深い分類の項目 135 個に項目名の帯が付かないため
2. **分類の中の分類（段が `h3` の分類の見出し 5 個）にも分類の濃い帯を付けるか**
   - 仮定: 付ける（Requirement 3.5）
   - 推奨: 付ける。役が同じで、数が少なく、帯の無い分類の見出しが帯のある項目名より弱く見えるのを避けられるため
3. **`spec/` のまとめ頁（6 頁）にも C01・C02・C03 を当てるか**
   - 仮定: 当てる（brief の「まとめ頁（`list/`・`descript/`・`spec/`）」のとおり）
   - 推奨: 当てる。brief と `decisions.md` がまとめ頁に `spec/` を含めており、項目の中の節が長い頁でも、項目の始まりが分かる利点は同じため（C02 で詰まった画面は設計で目で確かめる）
4. **C18 の当て先を「`h4` の直後にコードブロックが続くもの」のままにするか、題が「記述例」のものに絞るか**
   - 仮定: brief のとおり `h4` の直後にコードブロックが続くもの（289 個。題が「記述例」でない 12 個 ― `descript/` の頭の説明 7 個、`spec/dll` の関数の宣言 2 個、`spec/sstp` の要求と応答の例 3 個 ― も箱になる。`h3` の「記述例」1 個は箱にならない）
   - 推奨: brief のとおり。どれも見出しの下のコードの例で箱にしても読み違えず、題で絞るには `prepare_site.py` の目印が要り、差分が増えるため
5. **暗い表示の C01 の帯の上のリンクの対比を、どのリンクの色を相手に測り、判定するか**
   - 仮定: PR #10 の `#8fb4e8` を相手に判定し、作業木（PR #10 なし）の紺の数は参考として記録する（Requirement 6.1）
   - 推奨: 仮定のとおり。作業木の紺 `#1f4e8c` は暗い地そのものでも 1.93:1 で、PR #10 の受け持ちであり、単位の PR がマージされる頃には PR #10 の色が効いている見込みのため
6. **`extra.css` の塊の注の頭に、spec 名と PR の単位名のどちらを書くか**
   - 仮定: spec 名（`/* site-look-list-items: <何> */`。開発者の決まりと、この作業の指示のとおり）
   - 推奨: spec 名。`workflow.md` の「開いている PR に追いつく」は単位名（`/* site-look-visibility: … */`）と書いているが、単位の中の 6 本の塊を見分けられ、開発者の決まり（注は `<spec名>: <何>` の 1 行）と合うため。`workflow.md` の記述は後で合わせる

---

# 設計の調査（2026-10-25、`/kiro-spec-design`）

## Summary
- **Feature**: `site-look-list-items`
- **Discovery Scope**: Extension（既存の `prepare_site.py` と `extra.css` への追加。`design-discovery-light.md` の手順）。新しい依存は無く、外部の調べ（WebSearch）はしなかった
- **Key Findings**:
  - 見出しの行の `{#id .bundle-item}` は、id・¶・右の欄の目次・`hr`・`old_ids()` の検査・`_raw/` をどれも変えない（使い捨ての写しで、変更の前と HTML を突き合わせた）
  - 暗い表示の C01 の帯の上では、PR #10 の色でも、帯の中の項目名の字の色でも、リンクが 7:1 に届かない（項目名の字 6.76:1）。帯の中のリンクだけ白と下線にすると 11.66:1 で、PR #10 の有無に依らない
  - 試作の C02 の値に帯の内側の余白が足されると、高さ 700 に 4 項目目の終わりが入らない。値を少し詰めて 4 項目が入った。紺の帯の中の検索の強調は、テーマのままだと明るい表示で 2.71:1 になる

## 読んだもの・使った決まり
- `requirements.md`・`brief.md`・この `research.md` のギャップ分析（7 節の決定を含む）、steering の `product.md`・`tech.md`・`structure.md`・`roadmap.md`・`workflow.md`（塊の注・PR の単位）、`ukadoc-spec/CLAUDE.md`、`mkdocs.yml`
- 手本: `.kiro/specs/completed/site-look-dark-link-color/design.md`・`verification.md`（文体・「測る所と線」・Revalidation Triggers・測りの式）
- 試作: `.kiro/specs/completed/site-look-plan/mockups/extra.css`（C01・C02・C03・C09・C18）・`mockups/worktree.diff`（`slp_mark()`）、目標の画面 `screenshots/mock-*`
- 後続: `.kiro/specs/site-look-list-markers/brief.md`（C04 の包み・目印の名前の決定）
- スキル: `kiro-spec-design`（`design-principles.md`・`design-discovery-light.md`・`design-synthesis.md`・`design-review-gate.md`）、`kiro-validate-design`（`design-review.md`）。開発者の決まり「公開 CSS の注は塊ごとに 1 行、説明は spec の記録へ」に従い、指定のわけは `design.md` の「指定のわけ」に書いた

## 確かめ方（使い捨ての写し）
- 置き場: Claude のスクラッチ（`C:\Users\maz-o\AppData\Local\Temp\claude\C--home-maz-git-doc-edit\2d6cbb95-f9fb-4e11-91fb-fe22c3382b15\scratchpad\`）の下の新しいフォルダ 3 つ。どれも `git -C ukadoc-spec archive origin/main`（`afb2152`）を書き出したもの。ukadoc-spec と作業木には何も書いていない
  - `sli-base`: 変更なし（変更の前）
  - `sli-exp`: `prepare_site.py` に役の class、`extra.css` に 6 つの塊（`design.md` の Modified Files と同じ中身）
  - `sli-hl`: `sli-exp` と同じ変更に、`mkdocs.yml` の `pymdownx.highlight`（`use_pygments: false`）を足したもの（着色の後の形）
- どれも `C:\home\maz\git\doc_edit\.venv\Scripts\python scripts/prepare_site.py` と `zensical build --strict` が exit 0（「No issues found」）
- 配り: `_site/` を `python -m http.server` で 8011（exp）・8012（base）・8013（hl）に配った（8000 は使っていない）。終わった後に止めた。頁の道は `/` から（`/ukadoc-spec/` でない）
- 測り: HTML の数は読み取りの script（スクラッチの `sli-tools/count.py`・`units.py`）、色と位置は Claude の内蔵ブラウザの枠の JavaScript、画面は `shot.mjs`（読むだけ）

## Research Log

### 見出しの行に役の class を足す形（`{#id .cls}`）
- **Context**: ギャップ分析の Research Needed の 1 つ目
- **Findings**:
  - 全 2027 単位で、1 行目が H1 で、`shift_headings()` の最初の見出しが単位の頭の見出しだった（頁の頭 20・項目 1875・分類 116・注意書き 16）
  - HTML は `<h3 class="bundle-item" id="bang-lock-repaint">` になる。20 頁で、見出しの id の並び・`class="headerlink"` の数・`class="md-nav__link"` の数・`<hr />` の数が変更の前と同じ。`pre`・`code` の外の `{: `・`{#` の漏れ 0。`_raw/` は同じ。`_site_src/` で違うのは 20 頁の `index.md` と `extra.css` だけ
  - 項目の段の内訳: `h2` 44（`spec/` の 35 と分類に入らない 9）・`h3` 1694・`h4` 137（`descript/shell-surfaces` 102・`list/propertysystem` 35）。分類: `h2` 111・`h3` 5
  - `h4` の項目名の直後にコードブロックが来る所は 0（C18 の帯と C01 の帯が重ならない）
- **Implications**: 案 B をそのまま採れる。`prepare_site.py` の差分は docstring の 1 行と、`shift_headings()` まわりの数行

### C02 の詰めの量
- **Context**: Research Needed「本番の C01 の帯の余白と重ねて 4 項目以上」
- **Findings**（内蔵ブラウザの枠、幅 1024。`#charset` の上を「ヘッダの高さ + 8px」に置いたときの位置）:
  - 試作の値（`hr .6em`・項目名 `.6em 0 .4em`・`p .5em`）＋ 帯の内側 `.35em`: `craftman` の終わり 720px（700 を越える）
  - `hr .5em`・項目名 `.5em 0 .3em`・帯の内側 `.3em`、`p .5em`: 699px（ぎりぎり）
  - 上に `p .4em` を足す: 680px。5 つ目の項目名の帯の下は 735px で入らない
  - `shot.mjs`（幅 1000）で撮った画面でも、4 項目と 5 つ目の帯の頭が写った
- **Implications**: 最後の値を採った。目標の画面（試作）は帯の内側の余白が無いので 5 つ目の項目名まで入っていた（OPEN QUESTION 4）

### 帯・箱の上の字とリンクの対比
- **Context**: Research Needed「暗い表示の C01 の帯の上のリンクの色」「暗い表示の C18 の箱の中のコードの字」
- **Findings**: `design.md` の「測る所と線」の「写し」の列。要点:
  - 暗い表示の帯の地は `rgb(54, 56, 64)`。項目名の字 6.76、コードの字 6.09（4.5 を満たす）。リンクを項目名の字の色にすると 6.76 で 7 に届かない。白 `#ffffff` で 11.66
  - 明るい表示の帯の上のリンク 7.11、フォーカス 3.64（見込みどおり満たす）
  - 暗い表示の C18 の箱の中のコードの字（半透明）は `#1d2433` の上で 7.80
  - ¶ は C03 で 4.99、C18 で明 6.45・暗 4.99（ふだんもフォーカスも同じ色）
- **Implications**: 6.3 は暗い表示の帯の中のリンクだけに当て、白と下線にした。PR #10 の色にも作業木の紺にも依らなくなった（6.1 の「PR #10 の色で判定」は、判定の相手を変えずに満たす）

### 内蔵ブラウザの枠での測りの癖
- 枠が隠れていると、テーマの `transition: color 125ms` が進まず、`:focus` が付いても色がふだんのまま返る。頁に `transition: none` の使い捨ての指定を足すと、フォーカスの色（明るい表示の藍 `rgb(82,108,254)`）が測れた
- ポインタを載せる座標が頁の座標と合わず、ホバーを直に測れなかった。テーマは `:focus` と `:hover` を同じ指定にしているので、フォーカスの色で代える（OPEN QUESTION 6）
- 明・暗の選択は口ごとの `localStorage` に残るので、別の口の頁は明・暗が違って開くことがある。測る前に `data-md-color-scheme` を見る

### 検索の強調（7.1）
- `?h=スコープ` の頁で `mark` 72 個。テーマの強調は明 `rgba(255,255,0,.5)`・暗 `rgba(66,135,255,.3)` で、字は `inherit`
- 指定の前: C03 の帯の中の強調は明 2.71（白い字が黄緑の地 `rgb(143,167,70)`）、暗 6.27。C01 の帯の中は明 8.58・暗 4.41、C18 の箱の中は明 8.73・暗 5.31
- 濃い帯（C03・C18 の見出しの帯）の中だけ白の地に紺の字にすると、明・暗とも 8.31
- **Implications**: 濃い帯の中の強調の指定を足した（試作に無い。OPEN QUESTION 3）。C01 の帯・C18 の箱の中はテーマの強調のままで見える

### コピーのボタン（C09）
- コピーのボタンはテーマの JavaScript が置く `nav.md-code__nav`（`.md-clipboard` でない）
- `list/sakura-script` の 288 個で、字の矩形とボタンの矩形の重なり: 変更の前 165 個（幅 1024）、後 0 個（幅 1024）。幅 375 では 2 個が重なったが、どれも行の終わりにぶら下がる空白で 1px だけだった。空白を除く字の重なりは 0（着色の後の形でも 0）
- 幅 375 で `scrollWidth` = `innerWidth` = 375（`list/sakura-script`・`spec/sstp`・`manual/ghost`・`descript/shell-surfaces`、暗い表示、`shot.mjs`）
- **Implications**: 試作の `padding-right: 2.8em` のまま採った。確かめでは空白を除いて数える

### 記述例の箱（C18）の当て先と着色の後の形
- 試作の `:is(h4, .highlight) + .highlight` は、`h4` でない所から始まる連なり（`spec/plugin`・`spec/sstp`・`descript/shell-surfaces` の 3 か所）の 2 つ目にも箱を付ける。`:is(h4, h4 + .highlight, h4 + .highlight + .highlight, h4 + .highlight + .highlight + .highlight) + .highlight` にすると、9 頁で「箱の有無が連なりの頭の `h4` と食い違う」ものが 0、点線は 36（`list/sakura-script` 33・`spec/saori-ex` 3。2 つ目以降の数 21 + 6×2 + 1×3 と合う）
- 箱は `list/sakura-script` で 288 個（記述例の見出し 255 と続く 33）。記述例の見出しは全サイトで 289（まとめ頁 287・`spec/dll` 2）
- 着色の後の形（`sli-hl`）: `pre.highlight` 288 個。箱 288・点線 33、箱の上端の並び（8 個おき）と高さの合計 16075px が今の形と同じ、箱の中のコードの字の対比も同じ（明 8.72・暗 7.80）。`shot.mjs` の画面は目で見て違いが無い（PNG はバイト単位では違う）
- 箱の下の余白: 試作は `div.highlight > pre { margin: 0 }` だけで、今の形では最後の箱の下の余白が 0、着色の後の形では 1em になり、形で違った。箱の要素に `margin: 0 0 1em` を置き、中の `pre` の余白を 0 にして、両方の形で同じにした
- 帯・箱の中のリンク: 項目名の中 31 個（`code` を含むもの 0）、分類の帯の中 0、記述例の箱の中 0

### 読み物の頁
- `manual/ghost` の `h1` の位置の画面は、変更の前と後で明・暗ともバイト単位で同じだった（画面の中にコードブロックが無い）
- 記述例の箱は読み物の頁にも付く（`spec/dll` の 2 個。要件の「記述例の見出し」の決まりのとおり）

## Architecture Pattern Evaluation
| Option | Description | Strengths | Risks / Limitations | Notes |
|--------|-------------|-----------|---------------------|-------|
| 案 A 形だけ | `hr + h3` などの組み立てと `:has()` | `prepare_site.py` を触らない | 分類の最初の項目・`spec/`・深い分類で取りこぼしと付けすぎ | 要件の決定で採らない |
| 案 B 役の class | `shift_headings()` で見出しに class | 取りこぼし 0、後続とそろう | `prepare_site.py` の差分 | 採った |
| C02 の絞り: 単位を `div` で包む | 項目ごとに `md_in_html` の包み | 「項目の中」に厳しく絞れる | C04 の包みと入れ子、差分が大きい | 採らない |
| C02 の絞り: `.md-typeset:has(.bundle-item)` | 帯を持つ頁を見分ける | 目印を足さない | 頁の頭の説明・注意書きも詰まる | 採った（OPEN QUESTION 7） |

## Design Decisions（synthesis）
- **一般化**: C01・C02・C03 は同じ「単位の役」の印で足りる。印は役の名前だけを持ち、見え方を持たない（`bundle-<役>`）。後続の `site-look-list-markers` も同じ決まりで印を足せる。見え方は C22（`site-look-manual-files`）が同じ値を写す
- **作るか使うか**: 印は Python-Markdown の `attr_list`（入っている）で付け、新しい依存を足さない。帯・箱は CSS だけで作る。C18 は印を使わず HTML の形（`h4 + .highlight`）に当てる
- **減らしたもの**: 試作の C03 の帯の中のコードの白の 20% の地（今は 0 個なので、地を消して `inherit` にした）。C18 の帯と項目名の帯が重なるときの除外（`:not(.bundle-item)`。今は 0 個なので書かず、Revalidation Triggers にした）。帯の中の `a code` の色（今は 0 個）。C02 の単位の包み
- **足したもの**: 濃い帯の中の検索の強調（明 2.71 → 8.31）、暗い表示の帯の中のリンクの白と下線（6.3）、C18 の箱の下の余白を形に依らずそろえる指定

## Risks & Mitigations
- 原稿に、5 つ以上続く記述例のコードブロック、`h4` の項目名の直後のコードブロック、帯の中の `code` を含むリンクが入る — Revalidation Triggers に挙げ、そのときに指定を足す
- `:has()` に対応しないブラウザ — C02 の詰めと C18 の箱が出ないだけで、読める（今の見え方）
- 暗い表示の帯の中のリンクが白で、まわりの項目名の字（82% の白）より明るい — 下線でリンクと分かる。開発者が気にするなら色を選び直す（OPEN QUESTION 2）
- `shot.mjs` の `#notes_escape` の暗い表示の画面で、ヘッダの題が切り替わりの途中で重なった（本文には響かない。brief の既知の癖）

## 確かめていないこと
- ポインタを載せたホバーの色（フォーカスの色で代えた）
- 印刷の画面と CSSOM の確かめ（暗い表示だけの指定が `@media screen` の中にあることは書き方で決まる。CSSOM の確かめは実装で行う）
- 作業木（`origin/main` の最新）での数え直し。設計の数は `afb2152` の写しの数
- PR #10 が入った後の暗い表示（帯の中のリンクは白なので響かない見込み。帯の外のリンクは PR #10 の受け持ち）
- `?h=記述例` の C18 の帯の中の強調（`?h=スコープ` の C03 で測った。同じ指定が当たる）
- 目標の画面との 5 組の見比べを開発者の目で行うこと（設計では C18・C02 を目で見比べ、近いことを見ただけ）
