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
- 推す形は案 B か案 C（OPEN QUESTION 1・4）。どちらも C02 をトップに及ぼさないために、見出しには `bundle-*` でないトップの印を付ける。見方の箇条書きを `manual-item` で通すか、トップの印を足すかは、要件の話し合いで決める
- 組み立ての処理の変更は `main()` の `write('index.md', …)` の 1 か所にまとめ、トップの見分けもそこで行う（`site-look-manual-files` の `d == 'manual'` と同じ考え）
- 見た目の指定は宣言を足さず、既にある塊のセレクタを広げる。新しい塊が要るときだけ末尾に `/* site-look-top-page: … */` の 1 行の注で足す
- 確かめでは、build の前後で、トップを除く全頁の HTML が同じこと、トップの id・¶・右の欄の目次が同じことを比べる（Requirement 8.3・8.4）
