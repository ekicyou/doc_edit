# ギャップ分析: site-look-top-page

- 日付: 2026-10-26（`/kiro-start` の要件の段）
- 土台: ukadoc-spec の `origin/main` `f54423d`（`site-look-manual-files` の #15 がマージされたもの。チェックアウトも同じコミット）
- 調べ方: `scripts/prepare_site.py`・`assets/extra.css`・`INDEX.md`・`mkdocs.yml` を読み、トップの HTML の形は手元の古い `_site/index.html`（2026-10-24 の build。トップの原稿と組み立てはその後変わっていない）で確かめた。この段では ukadoc-spec に書き込まないので build はしていない。数は実装のときに build の HTML で数え直す

## 1. 数え直し（`INDEX.md`、`f54423d`）

| もの | 数 | 備考 |
|---|---|---|
| 節の見出し（`##`） | 5 | ukadocについて・対象version・外部リンク・ukadocの見方・目次 |
| 目次の分類（`###`） | 7 | どれも「目次」の節の中。トップの `###` はこれだけ |
| 目次のリンク | 44 | ファイル構成 8・設定ファイル 12・さくらスクリプト 2・イベント 4・規格 10・HowTo 6・その他 2 |
| 目次のリンクの無いまとめの項目 | 8 | Ghost・Shell・Balloon・Plugin・Headline・Install/Update・SHIORI・PLUGIN（下に入れ子のリンク） |
| 見方の箇条書き | 7 | `prepare_site.py` の `MANUAL_ITEM` の正規表現に当たる行は、`INDEX.md` でちょうどこの 7 行（ほかに当たる行は無い） |
| 　うち説明の段落が 2 つ | 6 | HTML では `ul > li > p + p`（空行のため 1 項目ずつ別の `ul`） |
| 　うち説明が同じ行だけ | 1 | 「その他」。HTML では `ul > li > strong`（`p` が無い） |
| コードブロック・`{:` の字 | 0 | 印の書き足しとぶつかる所は無い |
| ほかの原稿から `INDEX.md#見出し` へのリンク | 0 | 見出しの id が変わっても切れるリンクは無いが、id は変えない（Requirement 7.3） |

## 2. 今の状態

### `scripts/prepare_site.py`
- トップを写すのは `main()` の 1 行 `write('index.md', rewrite_links(read('INDEX.md'), 'INDEX.md', 'index.md'))` だけで、目印は付かない。トップの見分けの場所はここが自然（Requirement 1.1）
- 使い回せるもの:
  - `fence_free_headings(text)`: コードブロックの外の見出し行を (行, 段, 題) で返す。トップの `##`・`###` に印を足すのに使える
  - `mark_manual(text)`: 一番外の「`- **名前**: `」の名前に `{: .manual-item }` を足し、「`: `」を外す。`INDEX.md` にそのまま通すと見方の箇条書きの 7 個にだけ当たる（1 の表）
  - まとめ頁の見出しには `shift_headings` が `{#id .bundle-category}` の形で id と class を書く。トップの見出しは id を toc 拡張に任せているので、class だけを `{: .x }` で足すことになる（id が今と同じに作られるかは Research Needed 1）
- 目印の名前の決まり（steering `structure.md`）: `<頁の種類>-<役>`。使う見た目の無い頁の種類だけの印は足さない。頁や項目を名指しせず、ファイル名や形で見分ける

### `assets/extra.css`（行は `f54423d`）
| 塊 | 行 | セレクタ | トップに当てるときの関わり |
|---|---|---|---|
| C01 項目名の帯 | 30–35 | `.md-typeset :is(.bundle-item, .manual-item)` | 目次の分類・見方の分類名の帯の元 |
| C01 帯の中のコード | 36–39 | `:is(.bundle-item, .bundle-category) code` | トップの見出しにコードは無い（広げなくても見え方は変わらない） |
| C01 暗い表示の帯の中のリンク | 40–45 | `[data-md-color-scheme="slate"] … :is(.bundle-item, .manual-item) a:not(.headerlink)` | トップの帯の中にリンクは 0 個 |
| C02 項目の間の詰め | 47–56 | `.md-typeset:has(.bundle-item) hr`・`… p`・`.bundle-item` の margin | **`.bundle-item` をトップに付けると、トップの全部の段落が `.4em` に詰まる**（Requirement 5.3 とぶつかる） |
| C03 分類の帯 | 58–68 | `.bundle-category`・`.bundle-category code` | 節の見出しの帯の元 |
| 濃い帯の ¶ と検索の強調 | 104–111 | `:is(.bundle-category, h4:has(+ .highlight)) .headerlink`・`… mark` | 節の見出しの ¶ の 3:1（Requirement 2.3）と強調（7.2）に要る |
| C14・C22 ファイル名の帯と説明の字下げ | 208–225 | `.md-typeset > ul:has(> li > .manual-item, > li > p:first-child > .manual-item)` ほか 3 つ | 見方の箇条書きの元。トップの `ul` も `.md-typeset` の直下にあるので形は合う見込み（Research Needed 2） |

- `.manual-item` の帯は `display: block`・`font-size: 1.25em`（Material の `h3` と同じ大きさ）・`font-weight: 400`。目次の分類（`h3` に項目名の帯）と見方の分類名の帯は同じ大きさ・同じ見え方になる
- C01 の帯の塊は margin を持たない。margin は C02 の `.bundle-item` だけが持つので、`.bundle-item` 以外の印で帯を当てれば、目次の分類はテーマの `h3` の余白（上 1.6em・下 .8em）のままで、リンクの並びの直後でも帯との間が空く（Requirement 5.2・5.4）
- 対比は `site-look-list-items` の `verification.md` に測りがある: C03 の白い字は明・暗とも 8.31:1、C03 の ¶ は 4.99:1（明）、C01 の帯の中のリンクは 7.11:1（明）。同じ指定を当てるので、トップでも同じ数になる見込み

### そのほか
- `mkdocs.yml`: `toc_depth: 3`・`permalink: true`。`h2`・`h3` は右の欄の目次に出る。`overrides/` は無く、トップもほかの頁と同じテンプレート
- `assets/*.js`（`sakurascript.js`・`filetree.js`）は `bundle-*`・`manual-item` に依らない。トップにはコードブロックも無い
- 「ukadocについて」の引用（`>`）・「対象version」と「外部リンク」のリンクの箇条書きは、どの塊にも当たらない（Out of scope のまま）

## 3. 要件と今あるものの対応

| 要件 | 今あるもの | ギャップ |
|---|---|---|
| 1.1 トップの見分け | `main()` の `write('index.md', …)` | **Missing**: 印を付ける処理（数行） |
| 1.2 形で見分ける | `fence_free_headings`・`MANUAL_ITEM` | 使い回せる。題や id は名指ししない |
| 1.3 ほかの頁を変えない | — | **Constraint**: 広げるセレクタはトップにだけある印に当てる。`bundle-*` をトップに付けると、まとめ頁向けの指定（C02）と後の spec の指定がトップにも及ぶ |
| 1.4 使わない印を足さない | `site-look-manual-files` の議題 1 | 印は見た目の指定が使うものだけにする |
| 2.1–2.3 節の分類の帯・字・¶ | C03 の塊・濃い帯の ¶ の塊 | **Missing**: 当て先を広げる（帯・¶・強調の 3 つ。帯の中のコードは任意） |
| 3.1–3.2 目次の分類の項目名の帯 | C01 の塊 | **Missing**: 当て先を広げる（1 つ） |
| 3.4 まとめの項目は今のまま | — | 何もしなければ満たす |
| 4.1–4.3 見方の帯と字下げ | C01・C14・C22 の塊、`mark_manual()` | **Unknown**: `manual-item` をそのまま使うか、トップの印を足して 4〜5 のセレクタを広げるか（OPEN QUESTION 4） |
| 4.4 「`: `」を外す | `mark_manual()` | 使い回せる |
| 4.7 表にしない | C23 は未実装 | **Constraint**: C23 は 1 項目だけの箇条書きを除く。見方の箇条書きは 7 個とも 1 項目だけの `ul` なので当たらない見込み |
| 5.2–5.4 余白 | テーマの `h3` の余白 | C02 を当てなければ今のまま。帯の上の余白は画面で確かめる |
| 6.1–6.2 切り替え・印刷 | C01・C03 は色の変数と `@media screen` の暗い表示の指定 | 同じ指定を当てるので満たす見込み |
| 7.1–7.5 検索・id・375・`_raw` | `_raw/INDEX.md` は原稿をそのまま写す | 印は `_site_src/index.md` にだけ入る。id は Research Needed 1 |
| 8.4 ほかの頁の HTML が同じ | — | 組み立ての処理の変更は `index.md` を書く所だけなので満たす見込み。build の前後の差分で確かめる |
| 9.1 変えるファイル | — | `prepare_site.py`・`extra.css` だけで足りる（`mkdocs.yml` は変えない） |

## 4. 実装の進め方の候補

### 案 A: まとめ頁と `manual/` の印をそのまま使う
- `INDEX.md` の `##` に `.bundle-category`、`###` に `.bundle-item` を付け、`mark_manual()` を通す。`extra.css` は変えない
- ✅ 見た目の指定が 1 行も増えない。`prepare_site.py` も数行
- ❌ C02 の `:has(.bundle-item)` でトップの段落がすべて `.4em` に詰まり、`.bundle-item` の margin で目次の分類の上が詰まる（Requirement 5.2〜5.4 とぶつかる）
- ❌ 印の名前の決まり（`<頁の種類>-<役>`）に合わず、後の spec が `bundle-item` を「まとめ頁の項目」として使うと、トップにも及ぶ

### 案 B: トップの印を足し、既にある塊のセレクタに加える
- 例: `##` に `top-section`、`###` に `top-category`、見方の分類名に `top-item`（名前は設計で決める）。`mark_manual()` は class を引数にするか、同じ正規表現で別の印を付ける
- `extra.css` は宣言を足さず、セレクタだけを広げる: C03 の帯・¶・強調（3〜4 か所）に `top-section`、C01 の帯（1〜2 か所）に `top-category`・`top-item`、C14・C22 の塊の 4 つのセレクタに `top-item`
- ✅ 決まりに合い、まとめ頁向けの指定（C02）がトップに及ばない。トップだけを狙える
- ❌ C14・C22 の `:has(> li > .manual-item, > li > p:first-child > .manual-item)` が長くなる（`:is()` で包めば短くできる見込み）

### 案 C: 見出しはトップの印、見方の箇条書きは `manual-item` を通す（A と B の組み合わせ）
- `##`・`###` は案 B の印、見方の箇条書きは `mark_manual()` をトップにも通す（`write('index.md', mark_manual(...))`）
- ✅ C14・C22 の塊を触らない。見方の箇条書きの見え方は `manual/` の頁と必ず同じになる
- ❌ `manual-item` が `manual/` でない頁に付き、名前の決まりから外れる。後の spec が `manual-item` を「`manual/` の頁のファイル」として使うと、トップにも及ぶ

### 比べ
| | 指定の増え方 | 決まりとの合い方 | C02 の詰め | brief の「同じ指定を二重に書かない」 |
|---|---|---|---|---|
| A | 0 | 合わない | トップに及ぶ | 満たす |
| B | セレクタ 8〜10 か所 | 合う | 及ばない | 満たす |
| C | セレクタ 4〜6 か所 | 見方だけ合わない | 及ばない | 満たす |

## 5. 手間と危うさ
- 手間: **S**（1〜3 日）。既にある目印の付け方と塊のセレクタを広げるだけで、新しい仕掛けは無い。確かめ（明・暗・375・ほかの頁と並べる画面）が手間の大半
- 危うさ: **Low**。トップの 1 頁にだけ効く変更で、ほかの頁の HTML は変わらない。見出しの id の作られ方（Research Needed 1）だけが、外れると右の欄の目次と見出しへのリンクに響く

## 6. 設計で調べること（Research Needed）
1. 見出しに `{: .x }` だけを足したとき、toc 拡張が作る id（`ukadocについて`・`目次`・`ファイル構成` など）が今と同じか（attr_list の後に toc が id を作る順で、同じになる見込み）。build の前後で id の並びを比べる
2. トップの見方の箇条書きの `ul` が `.md-typeset` の直下にあり、C14・C22 のセレクタ（`.md-typeset > ul:has(…)`）にそのまま当たるか。「その他」の `p` の無い項目（`li > strong`）の帯と字下げが、ほかの 6 個とそろうか
3. 「目次」の分類の帯（`h2`）の直後に項目名の帯（`h3`）が続く所、「対象version」などの短い節の帯が続く所の見え方。帯の上下の余白をテーマのままにするか、まとめ頁に合わせるか（OPEN QUESTION 2）
4. 節の見出しの帯の中の ¶ と検索の強調（`?h=目次` など）を明・暗で測る
5. C14・C22 のセレクタを広げるとき、`:is()` で包んでも `:has()` の中で同じに効くか（案 B のとき）
6. 375 px で、節の見出しの帯・見方の分類名の帯（`さくらスクリプト` など）が収まるか（長い名前は無く、当たる見込み）

## 7. 設計への申し送り
- 形は案 B に決まった（要件の話し合いの議題 1、2026-10-26）。見出しにも見方の箇条書きにも `bundle-*`・`manual-item` でないトップの印を付け、`mark_manual()` は付ける class を渡す形で使い回す
- 組み立ての処理の変更は `main()` の `write('index.md', …)` の 1 か所にまとめ、トップの見分けもそこで行う（`site-look-manual-files` の `d == 'manual'` と同じ考え）
- 見た目の指定は宣言を足さず、既にある塊のセレクタを広げる。新しい塊が要るときだけ末尾に `/* site-look-top-page: … */` の 1 行の注で足す
- 確かめでは、build の前後で、トップを除く全頁の HTML が同じこと、トップの id・¶・右の欄の目次が同じことを比べる（Requirement 8.3・8.4）

## 8. 設計の調査（2026-10-26、`/kiro-design` の設計の段）

- 発見の種類: 既にある仕組みの拡張（light discovery）。新しい依存は無い（Python-Markdown の `attr_list` と toc、テーマの変数だけ）ので、Web の調べは要らなかった
- 使ったスキルと決まり: `kiro-spec-design` の `rules/design-principles.md`・`design-discovery-light.md`・`design-synthesis.md`・`design-review-gate.md`、`kiro-validate-design` の `rules/design-review.md`。見た目・読みやすさの専用のスキルは手元に無いので、対比の線は要件（7:1・4.5:1・3:1）と `site-look-list-items` の測り方に従った。完了した `site-look-list-items`・`site-look-manual-files` の `design.md`・`verification.md` の型を使った
- 確かめ方: ukadoc-spec `f54423d` を `git archive` で Claude のスクラッチ（`C:\Users\maz-o\AppData\Local\Temp\claude\C--home-maz-git-doc-edit\036336c3-6126-4633-8ba9-833efeea68f0\scratchpad\top\`）に 2 つ書き出し、`before`（変更の前）と `after`（`design.md` の差分を当てたもの）で `prepare_site.py` と `zensical build --strict` を流した（どちらも exit 0）。`_site/` を `python -m http.server`（8030・8031。終わったら止めた）で `/ukadoc-spec/` の下に配り、Edge ヘッドレス + CDP（`shot.mjs` を元にした使い捨ての `tools/probe.mjs`・`measure.js`・`hover.js`・`focus.js`）で開いて数え、測った。`ukadoc-spec/`・作業木は触っていない
- 使い捨てのスクリプト（同じ置き場の `tools/`）: `cmp.py`（`before` と `after` の HTML・id・¶・目次・本文の字の比べ）、`probe.mjs` と式。画面は `shot.mjs` で撮り、この spec の `screenshots/design-*.png` に置いた

### 8.1 調べたことと分かったこと

#### 見出しの `{: .x }` と id（Research Needed の 1）
- `## ukadocについて {: .top-section }` は `<h2 class="top-section" id="ukadocについて">` になった。`attr_list` が先に class を付け、toc が後で題の字から id を作るので、id は今と同じ
- トップの見出しの id の並び（`h1` 1・`h2` 5・`h3` 7 の 13 個）、`a.headerlink` の数 13、`md-nav__link` の数 82 が `before` と同じ
- 漏れ（`pre`・`code` の外の `{:`・`{#`・`{.`）0

#### 見方の箇条書きの形（Research Needed の 2）
- 見方の 7 個は `.md-typeset` の直下の 7 つの `ul` で、`li > p:first-child > strong.top-item` が 6、`li > strong.top-item`（「その他」）が 1。C14・C22 のセレクタを広げたものにそのまま当たった
- 幅 1000 で、7 個の帯の左の端 16px・幅 711px の 1 通り、説明の左の端 40px の 1 通り、見方の項目の点は `none`。ほかの一番外の箇条書きの項目（「対象version」・「外部リンク」・目次のリンクの並び）は `disc` で左の端 46px のまま
- 「その他」は名前の帯の次の行から説明が始まり、ほかの 6 個と同じ字下げになった（画面 `design-top-howto-other-*.png`）
- 本文の字（タグを外し空白を詰めたもの）の違いは「`:`」7 字と、その後ろの空白の詰まりだけ。`search.json` の違いは「ukadocの見方」の節の 1 件だけ

#### 余白（Research Needed の 3、要件 5.2・5.4）
- テーマの見出しの余白のまま（この spec は余白の宣言を足さない）の測り（幅 1000）:
  - 節の見出しの帯（`h2`）: 上 40px・下 16px（テーマの `h2` の `1.6em 0 .64em`）
  - 目次の分類の帯（`h3`）: 上 32px・下 16px。「目次」の帯の直後の 1 個だけ上 16px（テーマの `h2 + h3` の `.8em`）
  - 見方の分類名の帯: `site-look-manual-files` の帯の余白 `.5em 0 .3em -1.2rem`（10px・6px）をそのまま分け合う
- まとめ頁の項目名の帯（C02 の `.bundle-item`）は上 10px・下 6px なので、トップの目次の分類の帯は、まとめ頁より上下に広い。リンクの並びの最後の行と次の分類の帯の間は約 32px 空き、帯が前の並びにつながって見えない（要件 5.4。画面 `design-top-toc-*.png`）
- 段落と目次のリンクの並びの余白は変わらない（段落 `16px 0`、リンクの行の間はテーマのまま。要件 5.2・5.3）
- 画面で見て、テーマの余白のままで、どれが帯でどれがリンクの並びかがひと目で分かり、詰まりすぎもしないと判断した。まとめ頁に合わせて詰める案は、要件 5.3 の「読み物の頁なので詰めない」の考えとも合わないので採らない（`design.md` の OPEN QUESTION 1 で開発者が画面を見て決める）

#### 濃い帯の ¶ と検索の強調（Research Needed の 4）
- 節の見出しの帯の字: 明・暗とも白 `#ffffff` / 紺 `#1f4e8c` で 8.31（線 7）
- 節の見出しの帯の ¶: 明・暗とも、ふだん・ホバー（ポインタを載せた）・フォーカス（`focus()`）のどれも `rgba(255,255,255,.7)` / 紺で 4.99（線 3）。C03 の ¶ の指定を広げたので、テーマのホバーの藍（約 1.95）にならない
- 目次の分類の帯・見方の分類名の帯の字: 明 14.13（`rgba(0,0,0,.87)` / `rgb(237,237,237)`）、暗 6.76（`rgba(226,228,233,.82)` / `rgb(54,56,64)`）（線 4.5）
- 検索の強調: `?h=目次` で `mark` 1（節の見出しの帯の中。紺の字 / 白の地 8.31。明・暗とも）、`?h=ファイル構成` で `mark` 2（目次の分類の帯の中 1・見方の分類名の帯の中 1。テーマの強調の色のまま、明 14.41・暗 4.88）
- 帯の中のリンク・コードは 0 個（要件 6.3）

#### `:has()` の中の `:is()`（Research Needed の 5）
- `.md-typeset > ul:has(> li > :is(.manual-item, .top-item), > li > p:first-child > :is(.manual-item, .top-item))` などの 4 つは、Edge で manual の頁とトップの両方に効いた。manual の頁の HTML は `before` と同じで、帯と字下げの測り（左の端 16・説明 40）も変わらない。`:is()` の中が class だけなので、セレクタの重さも前と同じ

#### 幅 375（Research Needed の 6）
- 明・暗とも `scrollWidth` = `innerWidth` = 375。帯の左の端 16px・幅 328px。帯の名前（「さくらスクリプト」など）は 1 行に収まった

#### ほかの頁が変わらないこと（要件 1.3・8.4）
- `before` と `after` の `_site` の 41 頁の HTML のうち、違うのは `index.html` だけ（40 頁はバイト単位で同じ）。HTML の外で違うのは `search.json` と `assets/extra.css` だけ。`_raw/` と `llms.txt` は同じ

### 8.2 組み立てでの見直し（synthesis）
- **まとめる**: トップの印を付ける処理を 1 つの関数 `mark_top()` にまとめ、`main()` の `write('index.md', …)` の 1 か所から呼ぶ。見出しは段で、箇条書きは `MANUAL_ITEM` の形で見分ける（題・id を名指ししない）
- **作らずに使う**: 見方の箇条書きは `mark_manual()` に付ける class を渡して使い回す（引数の既定値を `manual-item` にし、manual の頁の呼び出しは変えない）。見た目は既にある 4 つの塊の 8 つのセレクタを広げるだけで、宣言・色・新しい塊・新しい注を足さない
- **削った**: 余白の宣言（テーマのままで足りた）、帯の中のコードとリンクの指定を広げること（トップの帯の中に 0 個。`design.md` の OPEN QUESTION 2）、`mark_manual()` の名前の付け替え（呼び出しの 1 か所が変わるだけで得が無い。OPEN QUESTION 3）、頁の種類の印（要件 1.4）
- **広げすぎない**: `top-*` の印はトップにだけ付き、まとめ頁向けの C02 の詰め（`:has(.bundle-item)`）と後の spec の `bundle-*`・`manual-item` の指定はトップに及ばない

### 8.3 設計の判断
| 判断 | 選んだもの | わけ |
|---|---|---|
| 印の名前 | `top-section`（`h2`）・`top-category`（`h3`）・`top-item`（見方の名前の `strong`） | steering の `<頁の種類>-<役>`。役の名前は、まとめ頁の `bundle-category`・`bundle-item` と並べて読める |
| トップの見分け | `main()` の `write('index.md', …)` の 1 か所で `mark_top()` を通す | 原稿が `INDEX.md` であることだけで見分ける（要件 1.1）。`site-look-manual-files` の `d == 'manual'` と同じ考え |
| 見出しの印 | `fence_free_headings()` で段 2・3 の行の末尾に ` {: .<印> }` | id は toc に任せたまま変わらない（8.1）。題は名指ししない |
| 見方の印 | `mark_manual(text, 'top-item')` | 要件の話し合いの議題 1 の決定。「`: `」の外し方も manual と同じ |
| 見た目 | 8 つのセレクタを広げる（`extra.css` の 30・59・105・108・209・212・216・219 行） | 同じ宣言を 2 か所に書かない（要件 9.2）。注は増えない |
| 余白 | テーマの見出しの余白のまま | 画面で帯とリンクの並びが分かれて見え、段落も詰まらない（OPEN QUESTION 1） |

### 8.4 危うさと手当て
- `INDEX.md` の見出しの末尾に `{…}` が書かれる・閉じの `#` が付く — 印が二重になるか漏れる。TopCheck の漏れ 0 と数で見つける（Revalidation Triggers）
- トップの帯の中にリンク・コードが入る — 帯の中の指定（C01 の暗い表示のリンク・C03 のコードの色）を広げていないので、まとめ頁の帯の中と見え方が違う。要件 6.3 の数で見つけ、そのときに広げる
- `site-look-definition-tables` が読み物の頁の流れかトップの写しに処理を足す — トップの見方の箇条書きは「`: `」が外れて形が合わなくなるので当たらない。後に入る spec が、見方の 7 個が表にならないことを確かめる（要件 4.7）
- `origin/main` が `extra.css` の同じセレクタを変えて進む — ぶつかりを直して両方の当て先を残し、TopCheck と測りをやり直す（要件 9.6）

## 9. 設計の話し合いの決定（2026-10-26）
開発者が全議題を推奨案で承認した（`design.md` の「設計の話し合いの決定」）。
- 余白はテーマのまま: 「リンクの並びは詰めすぎない」（brief）に合い、宣言も塊も増えない。まとめ頁の詰め（`.5em 0 .3em`）に合わせると、目次の分類の帯が上のリンクの並びに近づく
- 帯の中のコード・リンクの指定は広げない: 今はトップの帯の中に 0 個で、効き目の無い変更になる。原稿が変わったときは Revalidation Triggers で拾う
- `mark_manual()` は名前を変えず引数を足す: 差分が最小で、manual の頁の呼び出しを変えない

## 10. ukadoc-spec の進みの調べ（2026-10-27）

ukadoc-spec の `origin/main` が `f54423d` から `1080225` に進んだ。開発者の指示「リモートを尊重する」に従い、改造の方針が変わりうるかを調べた。

### 10.1 入ったコミット
- `b091e1c`（#16、`site-look-definition-tables`）: 名前と説明だけの箇条書きを 2 列の表にする（当時は `prepare_site.py` の `tabulate()`）
- `d01f9eb`（メンテナ）: 記述例とファイル構成の木の色付けを、`assets/sakurascript.js`・`assets/filetree.js` から、ビルド時の Pygments レキサー（`site_ext/ukadoc_site/lexers.py`）に移した。`extra_javascript` を外し、`requirements.txt` に `-e ./site_ext` を足した
- `b1abe20`（メンテナ）: 対応の札と名前と説明の表を、`prepare_site.py` の HTML の埋め込みから Python-Markdown の Treeprocessor（`site_ext/ukadoc_site/structure.py`）に移した。`prepare_site.py` は、頁ごとの判断を attr_list の class にして付けるところまでになった
- `1080225`（メンテナ）: ukadoc-spec の `CLAUDE.md` に分担を書いた（`prepare_site.py` は class、構造は Markdown 拡張、色付けは Pygments、見た目は `extra.css`、JavaScript は使わない）。確認の手順に、`site_ext` や `assets/` を直した後は `.cache/` を消して build することを足した

### 10.2 この spec への影響
- **方針**: この spec の印は、`main()` の 1 か所でトップを見分け、class を付ける（`mark_top()`）。メンテナの分担の `prepare_site.py` の側にそのまま入る。「`: `」を外すのは、`origin/main` の `mark_manual()` も続けている。`site_ext/` に処理を移す要は無い（拡張は頁を知らないので、頁の判断は `prepare_site.py` に残すのが分担どおり）
- **表の処理**: `structure.py` の表の処理は全頁に掛かる。`definition_row()` は名前の `strong` に class があれば表にせず、`to_table()` は 1 項目だけの箇条書き（`Reference` の名前を除く）を表にしない。見方の 7 個はどちらにも当たり、表にならない（要件 4.7）
- **行の番号**: `extra.css` の `site-look-manual-files: ファイル名の帯と説明の字下げ` の塊が 4 行下がった（213・216・220・223 行）。C01・C03・¶ と強調のセレクタ（30・59・105・108 行）と、広げない 36・41・66 行は同じ。`prepare_site.py` は `mark_manual()` が 274 行、`index.md` を書く行が 356 行になった
- **手順**: `pip install -r requirements.txt` は `-e ./site_ext` を今のフォルダから読むので、写しや作業木の根で流す（根でないと失敗した）。`assets/extra.css` を直した後は `.cache/` を消して build する

### 10.3 写しでの確かめ
`1080225` を `git archive` で 2 つ書き出し、片方に設計の差分を当てて、使い捨ての venv（`requirements.txt` から `site_ext` も入れた）で `.cache/` の無いまま `prepare_site.py` と `zensical build --strict` を流した（どちらも exit 0）。

| もの | 結果 |
|---|---|
| 控えと違うファイル | `index.html`・`search.json`・`assets/extra.css`（HTML 41 頁のうちほかの 40 頁は同じ） |
| `h2.top-section`・`h3.top-category`・`strong.top-item` | 5・7・7 |
| トップの `table`・`definition-table`・漏れ（`{:`）・`h1` の class | 0・0・0・0 |
| トップの id・¶・`md-nav__link` | 13・13・82（控えと同じ、id の並びも同じ） |
| トップの本文の字の違い | 7 字（外した「`:`」） |
| トップの外の頁の `top-` の class | 0 |

`f54423d` の写しで数えた設計の値と同じだった。帯の宣言・テーマの変数は変わっていないので、対比と余白は設計の写しの値を引き継ぐ（実装で測り直す）。

### 10.4 steering への影響
- `tech.md` の「ブラウザの仕掛け」（JavaScript で包む）が古くなった。Markdown 拡張と Pygments レキサーの分担に書き直す
- `structure.md` の「ブラウザの仕掛けは `assets/*.js`」が古くなった
- `workflow.md` の Build Gate に、作業木の根で `pip install` すること、`.cache/` を消すことを足す
- `roadmap.md` の `site-look-sstp-playback`（手元のゴーストへ送る）は、ブラウザで動く仕掛けを要する。メンテナの「JavaScript は使わない」とぶつかるので、始める前にメンテナと話して方針を決める要がある（この spec では決めない）
