# ギャップ分析: site-look-sakura-script-highlight

- 日付: 2026-10-25
- 対象: `requirements.md`（Requirement 1〜10）と、ukadoc-spec のメインのチェックアウト（`origin/main` の `0eb3fb9`。読むだけ）
- 読んだもの: `mkdocs.yml`・`assets/extra.css`（172 行）・`scripts/prepare_site.py`（359 行）・`requirements.txt`・`.github/workflows/pages.yml`・`ukadoc-spec/CLAUDE.md` の書式、doc_edit の `.venv` の `pymdownx/highlight.py`（pymdown-extensions 12.1）と Zensical 0.0.67 のテンプレート（`base.html`）・`bundle.67a597eb.min.js`・`classic/main.*.min.css`・`palette.*.min.css`、試作 `.kiro/specs/completed/site-look-plan/mockups/`（`extra.css` の C10・C17・C19・C20・C21、`mockup.js` の C10・C25、`worktree.diff` の `mkdocs.yml`、`README.md` の測り）、`decisions.md` の C10・C17〜C21・C25 の行、目標の画面 `mock-sakura-script-C21-light.png`、areka の字句解析 `areka/crates/areka-parsers/src/sakura/lexer.rs`、`site-look-list-markers` の `requirements.md`・`research.md`（書き方の手本）
- 数え方: 原稿を読むだけの使い捨ての script（スクラッチの置き場 `C:\Users\maz-o\AppData\Local\Temp\claude\C--home-maz-git-doc-edit\d8984412-a68e-4f97-b35e-a60c30a34d77\scratchpad\ssh\` の `scan.py`・`alias.py`・`contrast.py`。結果は `scan-0eb3fb9.txt`・`alias.txt`・`contrast.txt`）。`scan.py` は原稿のコードブロックを読み、試作の正規表現と、areka の字句解析に沿って書いた規則（Requirement 2）の両方でタグと環境変数を数えた。`alias.py` は `.venv` の Python-Markdown で、コードブロックの HTML を `pymdownx.highlight` の設定ごとに出した。`prepare_site.py`・`zensical build`・`serve` は流していない。数は実装で、作業木の build の HTML で数え直す
- 対比の数は、WCAG 2.x の相対輝度の式で手元で計算した見込みである（半透明の地は字の色 9% を地に重ねてから測った）。ブラウザでの測りは設計・実装で行い、それを正とする

## 1. 数え直し

### ukadoc-spec の進み
- brief の土台は `afb2152` だが、`origin/main` は `0eb3fb9` に進んだ。その間に入ったのは `a341420`（#10 暗い表示のリンク）・`46439c8`（`internal_file` の原稿）・`d3154d8`（#11 `site-look-list-items`）・`0eb3fb9`（#12 `site-look-list-markers`）
- `mkdocs.yml` と `requirements.txt` は `afb2152` から変わっていない（`git log -- mkdocs.yml` に該当なし）。変わったのは `assets/extra.css`（+152 行。末尾は `site-look-list-markers` の既定値の札）と `scripts/prepare_site.py`（`add_markers()` などで 60 行ほど）。この spec がぶつかる所は無い見込み
- 作業木 `.worktrees/` は今は空。この spec の作業木は、実装のときに `0eb3fb9`（かその時の `origin/main`）から作る

### 原稿のコードブロック（`0eb3fb9`。`migration/`・`_site*` を除く）
| もの | 数 | 所 |
|---|---|---|
| ```` ```sakurascript ```` | **287** | どれも `list/sakura-script` |
| ```` ```ss ```` | **0** | ― |
| ほかの言語の名前 | 1（```` ```sh ````） | `ukadoc-spec/CLAUDE.md` の中だけで、サイトの頁にならない |
| 言語の指定の無いブロック | **162** | `spec/saori-ex` 27・`descript/shell-surfaces` 21・`spec/sstp` 18・`dev/shell.md` 17・`descript/install` 10・`dev/nar.md` 10・`manual/install.md` 6・`list/propertysystem` 5 ほか |
| サイトのコードブロックの計 | **449** | brief の試作の数と同じ |

- 記述例のブロック 287 個は、どれも `## 記述例` の見出しの直後（254 個）か、その後に続くブロック（33 個）で、記述例の箱（C18）の中にある。1 つの見出しの後に続くブロックは最大 4 個で、C18 の指定（`h4` から 4 個目まで）の中に収まる
- 言語の指定の無いブロックのうち、1 行目がタグか環境変数で始まるのは 6 個（`list/propertysystem` 5・`spec/plugin` 1。C25 の 6 個で、この spec では当てない）。ほかにブロックの中にタグを含むものは `spec/sstp` などの要求の例と `\![vanishbymyself]` の 1 例で、どれも言語の指定が無いので当たらない

### 字句の規則による数（`scan.py`。Requirement 2・9.3）
| もの | 試作の正規表現 | Requirement 2 の規則 |
|---|---|---|
| タグ | 502 | **500**（囲み `\_?…\_?` の中の 2 つを除く） |
| 環境変数 | 6 | **6**（`%username`・`%ms`・`%mp`・`%mh`・`%me`・`%mt`） |
| 見分け方が違う所 | ― | **12 か所** |
| エスケープ `\\`・`\%` | ― | 0 |
| 閉じない `[` | ― | 0 |
| 行をまたぐタグ | ― | 0 |
| タグ・環境変数でない `%`（`50%で`・`200%に` など） | 7（どちらも地の文） | 7（地の文） |

- 違う 10 か所: `\w9` 6（`wait/w.md` 4・`font/f-align.md` 2。試作は `\w` だけを包み、`9` が地の文になる）、`\p23`・`\p34`（`scope/pID.md`。試作は `\p` だけ、規則は `\p2`・`\p3`）、`\b2`（`balloon-text/bID.md`。試作は `\b`）、`\q[その１,"script:\q[その２,script:その３はない]"]`（`choice/q-script.md`。試作は引用符の中の `]` で切れ、`"]` が地の文に残る）、囲み `\_?…\_?` の中の `\1`・`\n`（`balloon-text/_-q.md`。試作は包み、規則は地の文。議題 3 で足した）
- この 12 か所の見え方が試作の画面と違う。目標の画面の位置（`#bang-lock-repaint`）には、この 12 か所は無い（Requirement 9.7 で別に撮る）

### 議題 3 の突き合わせ（要件のディスカッション、2026-10-25）
- 開発者の示した規則（`\` と 0 個以上の `_` と 1 字。直後に 0〜9 の番号か `[`。`[` からエスケープを除いて最初の `]` まで）を、pasta の `SAKURA_TAG_PATTERN`（`pasta/crates/pasta_lua/src/sakura_script/tokenizer.rs`。名前の字を `[0-9A-Za-z!+*?&-]`、`_` を 2 個までに限る）と並べて、287 ブロックに当てた（スクラッチの `pasta-re.mjs`・`dev-rule.mjs`）。pasta の単位 499 個のうち 496 個は同じに切れ、どの単位にも入らない `\` は 0 個
- 違いの 3 か所と、確定した扱い（Requirement 2.2・2.3・2.6）:
  - `balloon-text/c-line-2.md` の `\n1行削除`: 番号をどのタグにも付けると `\n1` がタグになる → 番号を取るのは `\s`・`\p`・`\b`（0〜9）・`\w`（1〜9）だけ（UKADOC が番号付きの形を項目に立てている 4 つ）
  - `choice/q-script.md` の入れ子の `\q[…"…]"]`: 最初の `]` で切ると `"]` が地の文に残る → 引数の頭から `"` で囲んだ字はエスケープに数え、中の `]` では終えない（「さくらスクリプトのエスケープ」の頁の `""` の書き方）
  - `balloon-text/_-q.md` の囲み: 規則のままなら中の `\1`・`\n` もタグ → 両端の `\_?` だけをタグにし、中は地の文

## 2. 今の状態

### `mkdocs.yml`
- `markdown_extensions` を明示しているので、Zensical の既定の拡張一式は入らない。`pymdownx.highlight` は無く、`pymdownx.superfences` だけがある
- `theme.features` に `content.code.copy`・`search.highlight` がある。`navigation.instant` は無い（頁を移るたびに頁を読み込み直すので、スクリプトは頁ごとに 1 回動けばよい）
- `extra_javascript` は無い。`extra_css` は `assets/extra.css` の 1 つ

### コードブロックの HTML（`alias.py`）
| 設定 | ```` ```sakurascript ```` | ```` ```ss ```` | 言語の指定の無いもの |
|---|---|---|---|
| 今（`superfences` だけ） | `<div class="highlight"><pre><span></span><code>`（言語の名前は残らない。Pygments に `sakurascript` が無く `text` に落ちる） | 同じ | 同じ |
| `pymdownx.highlight`（`use_pygments: false`） | `<pre class="highlight"><code class="language-sakurascript">` | `<pre class="highlight"><code class="language-ss">` | `<pre class="highlight"><code>` |
| 上に `extend_pygments_lang: [{name: ss, lang: sakurascript}]` | 同じ | **`language-ss` のまま** | 同じ |

- `pymdownx.highlight` の `extend_pygments_lang` は Pygments のレキサーを引く名前を替えるだけで、`use_pygments: false` のときの class の名前（`language_prefix` + 書いた名前）は替えない（`highlight.py` の `highlight()` の `else` の枝）。**brief の「highlight の設定で `ss` を `sakurascript` に寄せる」道は、`use_pygments: false` のままでは取れない**（Requirement 1.2 の Constraint）
- `pymdownx.highlight` を足すと、コードの字の末尾の改行が HTML から消える（`…\e\n</code>` → `…\e</code>`）。コピーのボタンは字を `innerText.trimEnd()` で取る（`bundle.*.min.js` の `ff()`）ので、コピーされる字は変わらない見込み（Requirement 5.2）

### Zensical のスクリプトの並びと、関わる仕掛け（`base.html`・`bundle.*.min.js`）
- `extra_javascript` は `bundle.*.min.js` の直後に、`<body>` の末尾で読まれる。どちらも普通の `<script>` なので、足すスクリプトが動く時には本文の HTML は読み終わっている
- コピーのボタン: `bundle` が `pre` に `id="__code_N"` を付け、ボタンを `code` の外に置く。足すスクリプトが `code` の中だけを組み替えれば、ボタンと id に触れない
- 検索の結果の語の強調（`search.highlight`、`?h=` の付いた頁）: `bundle` の `xc()` が、本文の字のノードを `NodeIterator` で回し、語を `<mark data-md-highlight>` で包んだ要素に置き換える。検索の索引（worker）を読み終えてから動くので、足すスクリプトの包みの後に動き、包みの中の字にも `mark` が付く見込み。逆の順になると、`code` を字から組み立て直すときに `mark` が消える（**Research Needed**: 順の確かめ。Requirement 7.1）
- テーマの CSS は `.highlight` の中の Pygments の短い class（`.k`・`.s`・`.nt` など）に色を当てる。包みの class の名前をそれらと重ねない（設計で決める）

### `assets/extra.css`（`0eb3fb9`）
| 関わる指定 | 中身 | この spec との関わり |
|---|---|---|
| `.md-typeset pre > code { white-space: pre-wrap; word-break: break-all; }` | 記述例の折り返し | `pre.highlight > code` にも当たる。包みは字の幅を変えない指定（太字・地・角の丸み）だけにすれば、折り返しの位置は変わらない見込み（C19 の試作で確かめ済み） |
| `.md-typeset pre > code { padding-right: 2.8em; }`（C09） | コピーのボタンの手前で折り返す | 同じく両方の形に当たる |
| `h4:has(+ .highlight)`・`:is(h4, h4 + .highlight, …) + .highlight`（C18） | 記述例の箱 | class で書いてあり、`div.highlight` でも `pre.highlight` でも当たる。`site-look-list-items` の `verification.md` の「着色の後の形」で、箱・点線・重なりが同じだったと記録済み。この spec で確かめ直す（Requirement 6・9.9） |
| `[data-md-color-scheme="slate"] …` を `@media screen` の中に書く | 暗い表示だけの色 | タグ・環境変数の暗い表示の色も同じ形にすれば、印刷では明るい表示の色になる（Requirement 4.2） |
| `site-look-list-markers` の札の色（直書き） | 明 `#6b4500` など | この spec は変えない（Requirement 3.7） |

### テーマの色（Zensical 0.0.67・classic）
| 変数 | 明 | 暗 |
|---|---|---|
| コードの地の文 `--md-code-fg-color` | `#36464e` | `hsla(var(--md-hue),18%,86%,.82)` |
| コードの地 `--md-code-bg-color` | `#f5f5f5` | `hsla(225,15%,18%)` ≒ `#272a35` |
| 記述例の箱の地（C18、直書き） | `#eef2f8` | `#1d2433` |

### `scripts/prepare_site.py`
- `EXTENSIONS`（`tables`〜`pymdownx.superfences`）は `old_ids()` が原稿の見出しの id を計算するときだけに使う。`pymdownx.highlight` を足してもコードブロックの HTML が変わるだけで、見出しの id は変わらない見込み（Research Needed: 実装で全頁の id の並びを前と比べる。Requirement 9.10）
- `main()` の最後に `assets/` を丸ごと `_site_src/assets/` に写すので、`assets/` に足したスクリプトは設定を変えずに配られる。`_raw/` は `assets/`・`scripts/` とリポジトリ直下の `CLAUDE.md` を写さないので、`CLAUDE.md` の書き足しはサイトに出ない
- 原稿を `_site_src/` に写すときに、まとめ頁は `add_markers()` などを通り、読み物の頁は `rewrite_links()` だけを通る。コードブロックの言語の名前を書き換える処理は無い

### CI（`.github/workflows/pages.yml`）
- `pip install -r requirements.txt` → `python scripts/prepare_site.py` → `zensical build --strict` → `cp -r _raw/. _site/`。`zensical` はコンソールの入口から動くので、リポジトリの `scripts/` は import の道に無い。自作の Python の関数を `mkdocs.yml` から呼ぶ道（superfences の `custom_fences`・自作の Pygments のレキサー）は、`requirements.txt` で入れる包みにするか CI の手順を変える要がある

### 字句の規則の手がかり（areka）
- `lexer.rs` の `scan_tag()`・`bare_tag_len()`・`scan_bracket_args()`・`scan_sysvar()`: タグの名前は `\` の後の 1 字、`\_` と 1 字、`\__` と 1 字。`\w`・`\b`・`\p` は 1 桁の数字までを名前にする（`\p10` は `\p1` と字の `0`）。名前のすぐ後の `[` から対になる `]` までを引数とし、引数の中の `\]` と `"…"`（`""` は `"`）では切らない。`\\`・`\%` はエスケープ。環境変数は `%` と英数字・`_`
- Requirement 2 との違い: (1) areka は閉じない `[` を `\` からブロックの終わりまでひとかたまりに吸う。見え方のためには、名前までをタグにする方が読みやすい（［仮定 A3］）。(2) areka の環境変数は `%*`・`%m?`・`%property[…]` を知らない（UKADOC の環境変数の分類には載っている）。(3) 旧仕様の選択肢 `\q*[…]` は今の記述例に無いので、規則に入れるかは設計で決める
- areka は読むだけで、写さない（Requirement 10.8 の「写さず書き直す」は旧サイトと試作の分だが、ほかの参照元も同じに扱う）

## 3. 要件と今あるものの対応（Requirement-to-Asset Map）

| 要件 | 今あるもの | ギャップ |
|---|---|---|
| 1.1 言語の印 287 | 原稿に言語の名前はあるが、HTML に残らない | **Missing**: Markdown 拡張の設定（`pymdownx.highlight`、`use_pygments: false`）。試作の 1 行の差分そのまま |
| 1.2 `ss` のエイリアス | ― | **Constraint**: highlight の設定では寄せられない（上の表）。**Missing**: スクリプト（と `extra.css`）で `language-ss` を同じに扱うか、`prepare_site.py` で写しの言語の名前を `sakurascript` にそろえるか（OPEN QUESTION 4） |
| 1.3 言語の指定の無いもの 162 | ― | highlight を足しても印は付かない（`alias.py`）。満たす |
| 1.4 読み物の頁 | ― | highlight の設定はサイト全体に効くので満たす |
| 2.1〜2.9 字句の規則 | 試作の正規表現（`mockup.js`） | **Missing**: 本番の規則。試作の正規表現は 12 か所で違う（`\w9`・`\p2`・`\b2`・引用符の中の `]`・囲みの中）。**Unknown**: `\q*[…]` を規則に入れるか |
| 3.1〜3.4 色・太字・薄い地 | 試作の C10・C19・C20・C21 の指定（`html[data-slp~=…]` の下） | **Missing**: 本番の指定。薄い地は `color-mix(in srgb, currentColor 9%, transparent)` で字の色に依らず 1 つの指定で効く（試作で確かめ済み） |
| 3.5 明 7:1 | 手元の見込み（`contrast.py`）: タグ `#8a0d4f` は白地 9.33・箱の地 8.30・箱の薄い地 **7.04**・コードの地 8.56・その薄い地 7.26。環境変数 `#7a2e0a` は 9.45・8.41・7.23・8.67・7.45（:1）。試作の測りは箱の薄い地の上でタグ 7.14・環境変数 7.33 | 満たす見込みだが、タグの余裕が小さい（OPEN QUESTION 2）。ブラウザで測る |
| 3.6 暗 4.5:1 | タグ `#f48fb1` は箱の地 6.96・箱の薄い地 5.93（試作の測り 5.7）・コードの地 6.41・その薄い地 5.47。環境変数 `#f6ad7b` は 8.27・6.93（同 6.61）・7.61・6.31（:1） | 4.5:1 なら満たす。7:1 にするならタグ・環境変数とも明るくする（OPEN QUESTION 1） |
| 3.7 変えないもの | リンク・札・箱の色は `extra.css` の頭と先の spec の塊にある | 末尾に塊を足すだけなら満たす |
| 4.1・4.2 切り替え・印刷 | 先の spec の暗い表示の色は `@media screen` の中 | 同じ書き方で満たす |
| 5.1 字を変えない | 試作は `textContent` から組み立て直し、`console.assert` で同じことを確かめた | 同じ形で満たす。確かめの形（assert を本番に残すか）は設計で決める |
| 5.2 コピー | コピーは `innerText.trimEnd()` | 包みが `display` を変えない限り満たす見込み。実装でコピーの字を前と比べる |
| 5.3 `\` | 等幅の字の指定は変えない | 満たす |
| 5.4 動かないとき | 包むのはスクリプトだけ | スクリプトが動かなければ今の見え方（色無し）。満たす |
| 5.5 外部を読まない | 試作も外部を読まない | 満たす |
| 6.1・6.2 449 個の HTML の形 | C09・C18 は両方の形に効く書き方（`site-look-list-items`） | 確かめ直す（Requirement 9.9）。**Research Needed**: Zensical の CSS の `div.highlight` と `pre.highlight` の差（試作の目では差が無かった） |
| 7.1 検索 | 索引は build の HTML から作る | 字は同じ。**Research Needed**: `?h=` の強調とスクリプトの順（上の「Zensical のスクリプトの並び」） |
| 7.2・9.10 見出し | `old_ids()` は `EXTENSIONS` を使う | 変わらない見込み。全頁の id の並びを比べる |
| 7.3 375 px | 試作で `scrollWidth` 375・`innerWidth` 375 | 包みは折り返しを変えないので満たす見込み |
| 8.1・8.2 `CLAUDE.md` | 書式の 7 番目「`## 記述例`（さくらスクリプトは ```` ```sakurascript ```` のコードブロック）」 | **Missing**: 1 行の書き足し |
| 9.1〜9.12 確かめ | `shot.mjs`・`site-look-list-items` の「着色の後の形」の確かめ方 | **Constraint**: ```` ```ss ```` の原稿が無いので、使い捨ての写しで確かめる（OPEN QUESTION 5）。環境変数・`\p23`・`\q[…"…"]` は目標の画面に写っていない |
| 10.1〜10.8 範囲と PR | 作業木・Build Gate の手順は先の spec と同じ | 新しいギャップ無し。`requirements.txt` は Option A なら変えない |

## 4. 実装の道の候補

### Option A: brief の道（Markdown 拡張の設定 + 自作の小さなスクリプト + 見た目の指定）
- `mkdocs.yml` の `markdown_extensions` に `pymdownx.highlight`（`use_pygments: false`）を足し、`extra_javascript` に `assets/` の自作のスクリプトを 1 つ足す。スクリプトは `code.language-sakurascript`（と `language-ss`）の字を、Requirement 2 の規則でタグと環境変数の要素に包む。`extra.css` の末尾に、明・暗の色・太字・薄い地の塊を足す
- `ss`: スクリプトが `language-ss` の `code` に `language-sakurascript` の印を足してから同じに包む（数行）。配る HTML には `language-ss` が残る
- ✅ 試作で 449 個の形の変わりと見た目の差が無いことを確かめた道。`requirements.txt` も CI も変えない（`pymdownx.highlight` は入っている pymdown-extensions 12.1 の一部）
- ✅ 字句の規則が 1 か所（スクリプト）にまとまり、`site-look-sstp-playback` も同じ印を使える
- ❌ スクリプトが動かない環境では色が付かない（Requirement 5.4 で許す）。`ss` の印は頁を開いた後にだけそろう（［仮定 A4］）

### Option B: A に、`prepare_site.py` での `ss` のそろえを足す
- `_site_src/` に写すときに、コードブロックの頭の ```` ```ss ```` を ```` ```sakurascript ```` に書き換える（`_raw/` の生の原稿は ```` ```ss ```` のまま）。配る HTML の印が `language-sakurascript` 1 つになる
- ✅ 後続の spec・スクリプト・CSS が 1 つの印だけを見ればよい。スクリプトが動かなくても印はそろう
- ❌ `prepare_site.py` の書き換えがまとめ頁と読み物の頁の 2 つの道に要る（コードブロックの行を見分ける `FENCE` は今ある）。brief の In scope は `prepare_site.py` を `EXTENSIONS` のそろえだけとしている（OPEN QUESTION 4 で決める）

### Option C: サーバ側で着色する（自作の Pygments のレキサー、または superfences の `custom_fences` に自作の関数）
- build の HTML の中でタグと環境変数を包む。`ss` はレキサーの別名か、`custom_fences` の名前を 2 つ並べるだけでそろう
- ✅ スクリプトが要らず、動かない環境でも色が付く。コピー・検索の強調とのかかわりも無い
- ❌ 自作の Python を `zensical` から import させる道が要る（`requirements.txt` で入れる包みにするか、CI の手順を変える）。brief の「`requirements.txt` もなるべく変えない」「自作の拡張は CI での import の道の用意が要る」に当たる
- ❌ Pygments の着色を有効にすると、さくらスクリプトの外の言語にも色が付く道が開く（Out of scope の「全言語の色付け」）。`custom_fences` なら避けられるが、`old_ids()` の `EXTENSIONS` にも同じ設定がいる

### 見立て
- **推す道**: Option A。`ss` は A の中で（スクリプトで印を足す）済ませ、配る HTML の中までそろえる要が出たら Option B の数行を足す（OPEN QUESTION 4）
- **工数**: S（設定 2 行・スクリプト 1 つ（字句の規則とその自己確かめ）・CSS の塊 1〜2 つ・`CLAUDE.md` 1 行。確かめの道具は先の spec のものを使い回せる）
- **危険度**: Low〜Medium（既にある型の広げで、試作で形を確かめた。気をつける所は、449 個の HTML の形の変わり（C09・C18・コピーのボタン）、検索の強調とスクリプトの順、明るい表示のタグの 7:1 の余裕の小ささの 3 つ）

## 5. 設計へ持ち越すこと

### 決めること（設計）
1. 字句の規則の書き方（Requirement 2。`\q*[…]` を入れるか、閉じない `[` の扱い）と、包んだ後の字が同じことの確かめを本番のスクリプトに残すか
2. `ss` のそろえ方（Option A のスクリプトか、Option B の `prepare_site.py` か。OPEN QUESTION 4）
3. 包みの要素の class の名前（試作の `slp-` は使わない。テーマの Pygments の短い class と重ねない。まとめ頁だけの目印でないので、`site-look-list-items` の `bundle-<役>` にそろえるかも決める）
4. 明・暗のタグ・環境変数の色（明は 7:1 の余裕、暗は OPEN QUESTION 1 の線）と、`@media screen` の中の暗い表示の書き方
5. スクリプトのファイルの名前と置き場（`assets/` の下）、`extra_javascript` の書き方、`prepare_site.py` の `EXTENSIONS` に `pymdownx.highlight` をそろえるか

### Research Needed（実装の確かめで）
- 検索の結果から開いた頁（`?h=`）で、記述例のブロックの中の語の強調が、包みの後も残ること（Requirement 7.1）
- 449 個の形の変わりの後も、C09・C18・コピーのボタン・言語の指定の無いブロックの見え方が同じこと（`div.highlight` と `pre.highlight` の差。Requirement 6・9.9）
- 全頁の見出しの id の並び・`a.headerlink`・目次の数が前と同じこと（Requirement 9.10）
- 明・暗のタグ・環境変数の対比のブラウザでの測り（Requirement 3.5・3.6。明のタグは見込み 7.04:1）
- コピーのボタンでコピーされる字が前と同じこと（末尾の改行が HTML から消える分を含む。Requirement 5.2）

## 6. OPEN QUESTIONS（要件のディスカッションで決めること）

1. **暗い表示の対比の線（［仮定 A1］）**: brief は明るい表示だけ 7:1 と決めている。requirements は暗い表示を 4.5:1 とした（`site-look-list-markers` の暗い表示の札と同じ）。試作の色は箱の薄い地の上でタグ 5.7:1・環境変数 6.61:1 で、4.5:1 は超えるが 7:1 には届かない
2. **明るい表示の 7:1 の余裕（［仮定 A2］）**: 箱の薄い地の上のタグは見込み 7.04:1（試作の測り 7.14:1）でぎりぎりである。ブラウザで割ったら、赤紫のまま色を濃くするか、薄い地を薄くしてよいか
3. **字句の規則の正（［仮定 A3］）**: UKADOC の各タグの項目の書き方を正とし、areka の字句解析を突き合わせに使った。閉じない `[` は名前までをタグにする（areka は終わりまで吸う）。旧仕様の `\q*[…]` は今の記述例に無い
   - **確定**（2026-10-25）: 開発者の示した規則を正とし、番号は 4 つのタグだけ・引用符の中の `]` で終えない・囲みの中は地の文の 3 点を足した（1 節「議題 3 の突き合わせ」。Requirement 2）。pasta・areka は突き合わせにだけ使う
4. **`ss` の印をどこでそろえるか（［仮定 A4］）**: highlight の設定では `ss` を `sakurascript` に寄せられないと分かった。頁を開いた後のブラウザの中でそろえば足りるか（Option A。配る HTML は `language-ss`）、配る HTML の中までそろえるか（Option B。`prepare_site.py` に数行）
5. **`ss` の確かめ方（［仮定 A5］）**: 今の原稿に ```` ```ss ```` は無く、原稿は変えない。使い捨ての写しの原稿に ```` ```ss ```` のブロックを 1 つ足して build し、確かめた後に捨てる形でよいか

---

# 設計の調査（2026-10-25、`/kiro-spec-design`）

## Summary
- **Feature**: `site-look-sakura-script-highlight`
- **Discovery Scope**: Extension（既存の `mkdocs.yml`・`extra.css` への追加と、`assets/` の小さなスクリプト 1 つ。`design-discovery-light.md` の手順）。新しい依存は無く（`pymdownx.highlight` は入っている pymdown-extensions 12.1 の一部）、外部の調べ（WebSearch）はしなかった
- **土台**: ukadoc-spec の `origin/main` は `0eb3fb9` のまま（ギャップ分析と同じ）
- **Key Findings**:
  - 設計の変更をそのまま入れた写しで、449 個が `<pre class="highlight">`、`language-sakurascript` 287、印の無いもの 162、41 の HTML のどれにもスクリプトの読み込みが 1 つ。見出しの id・¶・目次・`hr`・本文の字は全頁で前と同じ。`search.json` の字も同じ（違うのはコードの末尾の改行と `class` だけ）
  - 手書きの走査で書いた字句の規則（`sakurascript.js`）は、要件の例を含む 28 例がすべて合い、287 ブロックでタグ 500・環境変数 6、字の違い 0。試作との違いは 13 か所で、要件の見込みの 12 か所に `surface/sID.md` の `\s1` が抜けていた（`\w9` 6 は `\w9` 5・`\w2` 1）
  - 写しをブラウザで開くと、スクリプトは検索の強調より先に動き、`?h=raise` の `mark` 16 個のうち 12 個がタグの `span` の中に入った。明るい表示のタグは記述例の箱の薄い地に 7.06:1（`getComputedStyle` から計算）で、7:1 をわずかに超える

## 読んだもの・使った決まり
- `requirements.md`（A1〜A5 の確定を含む）・`brief.md`・この `research.md` のギャップ分析、steering の `tech.md`・`workflow.md`（作業木・コミットの名前）、`ukadoc-spec/CLAUDE.md`（書式の 7 番目）
- 手本: `.kiro/specs/completed/site-look-list-markers/design.md`・`research.md`、`.kiro/specs/completed/site-look-list-items/design.md`（構成・詳しさ・塊と差分の書き方・確かめの部品の名前）
- ukadoc-spec（`0eb3fb9`。読むだけ）: `mkdocs.yml`・`assets/extra.css`・`scripts/prepare_site.py` の `EXTENSIONS`・`old_ids()`・`requirements.txt`・`list/sakura-script` の `notes_escape.md`（エスケープの頁）・`environment-variable/` の項目名（`%m?`・`%*`・`%property[…]`）
- Zensical 0.0.67（doc_edit の `.venv`）: `templates/base.html`（`extra_javascript` は `bundle` の直後）、`bundle.67a597eb.min.js` の `xc()`（検索の強調は索引 `index$` と場所の両方を待つ）、`classic/main.*.min.css`（`code` の中の `span` に当たる指定は `span.filename` だけ）
- 試作: `.kiro/specs/completed/site-look-plan/mockups/extra.css`（C10・C17・C19・C20・C21）・`mockup.js`（C10）・`worktree.diff`（`mkdocs.yml`）・`README.md`。写さずに書き直した
- スキル: `kiro-spec-design`（`design-principles.md`・`design-discovery-light.md`・`design-synthesis.md`・`design-review-gate.md`）、`kiro-validate-design`（`design-review.md`）。開発者の決まり「公開 CSS の注は塊ごとに 1 行、説明は spec の記録へ」に従い、指定と書き方のわけは `design.md` に書いた

## 確かめ方（使い捨ての写し）
- 置き場: Claude のスクラッチ（`C:\Users\maz-o\AppData\Local\Temp\claude\C--home-maz-git-doc-edit\d8984412-a68e-4f97-b35e-a60c30a34d77\scratchpad\design\`）。`git -C ukadoc-spec archive 0eb3fb9` を 2 つ書き出した。ukadoc-spec とどの作業木にも何も書いていない
  - `before`: 変更なし
  - `after`: `design.md` の「Modified Files」の `mkdocs.yml`・`assets/sakurascript.js`・`assets/extra.css`。加えて ```` ```ss ```` の確かめのため、`list/sakura-script/environment-variable/environmentvariable.md` の末尾に ```` ```ss ```` 1 つ、`memo/memo.md` の末尾に見出しと ```` ```ss ```` 1 つ・```` ```sakurascript ```` 1 つを足した（`add_ss.py`）
- どちらも `.venv` の `python scripts/prepare_site.py` と `zensical build --strict` が exit 0（「No issues found」）
- 数え方: `html-count.mjs`（2 つの `_site/` の HTML の形・印・スクリプトの読み込み・id・¶・目次・`hr`・本文の字）、`html-lex.mjs`（`after` の HTML の `code` の字に `sakurascript.js` を当てる）、`check.mjs` + `cases.json`（例の表と原稿の全ブロック）、`diff-proto.mjs`（試作の正規表現との違い）、`ids.py`（全原稿の `old_ids()` を `pymdownx.highlight` の有無で比べる）、`contrast2.py`（色の候補の対比の見込み）
- ブラウザ: `after/_site/` を `python -m http.server 8031` で配り、内蔵ブラウザの枠で `list/sakura-script/?h=raise` を開いて、包みの数・`mark` の場所・`getComputedStyle` の色と地・切り替えを見た。終わった後に止めた

## Research Log

### 言語の印と HTML の形（1.1〜1.4・6.1・9.2）
- `before`: `<div class="highlight">` 449、`language-*` 0
- `after`: `<pre class="highlight">` 452（449 と書き足しの 3）、`<code class="language-sakurascript">` 288（287 と `memo/memo` の 1）、`<code class="language-ss">` 2、印の無い `<pre class="highlight"><code>` 162
- スクリプトの読み込み: 41 の HTML（`404.html` を含む）のどれにも 1 つ
- `memo/memo`（読み物の頁）の ```` ```sakurascript ```` にも同じ印が付く（1.4）
- 配られた `assets/extra.css` に `sakurascript` の字が 5 か所（この spec の塊）

### 見出し・本文・検索の字（7.1・7.2・9.10）
- 全原稿 2049 ファイル（見出し 2724）で、`EXTENSIONS` に `pymdownx.highlight`（`use_pygments: false`）を足しても `old_ids()` の id の並びが変わるファイルは 0。`prepare_site.py` はそろえない
- 書き足しの無い頁のすべてで、`article` の中の見出しの id の並び・`headerlink`・`md-nav__link`・`hr`・本文の字が前と同じ。`list/sakura-script` も見出しの id 649 が同じ（後ろに書き足しの分が増えるだけ）
- `search.json`: 2579 項目のうち、字（タグを除いて空白を詰めたもの）と題の違う項目は書き足しの 1 つだけ。ほかの違いはコードの末尾の改行と `class` の有無だけ

### 字句の規則（2.1〜2.9・5.1・9.3）
- 書き方: 正規表現 1 本でなく、`argsEnd()`（引数の終わり）と `tokens()`（範囲の並び）の小さな走査にした。開発者の規則の 3 つの足し（番号は 4 つのタグだけ・引数の頭の `"…"`・囲みの中は地の文）を 1 本の正規表現にすると読めないため
- `check.mjs` の 28 例（要件の例 `\p23`・`\n1行削除`・`\w9`・`\w0`・`\s3[x]`・入れ子の `\q[…"…"]`・`\_?…\_?`・`\\`・`\%`・`50%で`・`%username`・`\![raise,%username]`・閉じない `[` を含む）がすべて合った
- 原稿の 287 ブロック: 字の違い 0、タグ 500、環境変数 6（`%username`・`%ms`・`%mp`・`%mh`・`%me`・`%mt`）。ギャップ分析の数と同じ
- `after` の HTML の字（実体参照を戻したもの）に当てても、`list/sakura-script` でタグ 503・環境変数 7（書き足しの ```` ```ss ```` の分 3・1 が増える）、`memo/memo` でタグ 6・環境変数 1、字の違い 0
- 試作の正規表現との違いは 13 か所: `wait/w.md` の `\w9` 3・`\w2` 1、`font/f-align.md` の `\w9` 2、`scope/pID.md` の `\p2`・`\p3`、`balloon-text/bID.md` の `\b2`、`surface/sID.md` の `\s1`、`choice/q-script.md` の入れ子の `\q[…]` 1、`balloon-text/_-q.md` の囲みの中の `\1`・`\n`。要件 9.3 の見込み（12 か所）は `\s1` が抜け、`\w2` を `\w9` に数えていた

### スクリプトの順と検索の強調（7.1）
- `base.html` は `bundle.*.min.js` の直後に `extra_javascript` を普通の `<script src>` で読む。`bundle` の `xc()` は `combineLatest([index$, location$])` で、検索の worker が索引を用意してから本文の字のノードに `mark` を入れる
- 写しの `?h=raise`: 記述例の中の `mark` 16 個、そのうちタグの `span` の中 12 個。スクリプトが先に動いた
- 逆の順になる道: スクリプトのファイルの読み込みが、worker の索引の用意より遅いとき（読み込みを待つ間に頁の仕事が進む）。そのときは `code` に `mark` が入っているので、スクリプトは包まない（1 行の守り）。強調は消えず、そのブロックの色が付かないだけ。設計の守りはこれだけにし、実装の確かめで順を記録する

### 色と対比（3.5・3.6・4.1）
- 写しのブラウザの `getComputedStyle`（薄い地は `color(srgb … / 0.09)`）から計算: 明 タグ 箱の地 8.30・箱の薄い地 7.06、環境変数 8.41・7.24。暗 タグ 6.96・5.95、環境変数 8.27・6.92。太さは 700
- 切り替えのボタンを押すと、読み込み直さずに暗い表示の色（`rgb(244, 143, 177)`・`rgb(246, 173, 123)`）になった（4.1）
- 見込み（`contrast2.py`）: 明 タグ 白 9.33・その薄い地 7.88、コードの地 8.56・7.26。環境変数 白 9.45・8.09、コードの地 8.67・7.45。暗 タグ コードの地 6.41・5.47、環境変数 7.61・6.31
- 明るい表示のタグを濃くするときの候補（HSL の明るさを下げる。色相・彩度は同じ）: `#810c4a`（−2%。白 10.07・8.51、箱 8.97・7.58、コード 9.24・7.84）、`#7c0c47`（−3%。箱の薄い地 7.90）、`#770b44`（−4%。8.23）

## Architecture Pattern Evaluation
| Option | Description | Strengths | Risks / Limitations | Notes |
|--------|-------------|-----------|---------------------|-------|
| A 設定 + 小さなスクリプト + 見た目の指定 | `pymdownx.highlight` で印を残し、`assets/sakurascript.js` で包み、`extra.css` の塊 1 つで見せる | 試作で確かめた道。依存も CI も変えない。規則が 1 か所 | スクリプトが動かないと色が付かない（5.4 で許す）。`ss` の印は頁を開いた後にそろう | 採る（ギャップ分析の推す道） |
| B A に `prepare_site.py` の `ss` のそろえを足す | 写しのときに ```` ```ss ```` を ```` ```sakurascript ```` に書き換える | 配る HTML の印が 1 つ | ［仮定 A4］の決定（`ss` のためには `prepare_site.py` を変えない）に反する | 採らない |
| C サーバ側で着色 | 自作の Pygments のレキサーか `custom_fences` | スクリプトが要らない | 自作の Python を CI で import させる道が要る。`requirements.txt` か CI を変える | 採らない |

## Design Decisions（synthesis）
- **Generalization**: `ss` と `sakurascript`、まとめ頁と読み物の頁を分けず、「言語の印の付いた `code` を包む」1 つの処理にした。タグと環境変数の 2 種は、`[種類, 始め, 終わり]` の 1 つの並びで返し、class の名前を `sakurascript-<種類>` で作る。見た目は class に当て、スクリプトは色を持たない
- **Build vs. Adopt**: 言語の印は `pymdownx.highlight`（入っている）を使う。字句の規則は、Pygments・highlight.js などにさくらスクリプトの字句の規則が無く、要件の規則（開発者の規則）に合う既製の物も無いので、70 行ほどで書いた。pasta・areka の字句解析は規則が違う（名前の字を限る・閉じない `[` を吸う）ので写さず、突き合わせだけに使った（ギャップ分析）
- **Simplification**: 試作の 3 段の色（C10 → C17 → C20）を 1 段にした。本番の `console.assert` は外し、字が違えば戻す 1 行にした。`prepare_site.py` の `EXTENSIONS` は見出しの id が変わらないのでそろえない。`ss` は CSS で名指しせず、スクリプトで印をそろえるだけにした。検索の強調との順は、要素のある `code` を包まない 1 行で守り、字のノードごとに包む書き方（20 行ほど）にはしない。テストのファイルは ukadoc-spec に足さず、使い捨ての LexerCheck で確かめる

## Risks & Mitigations
- 明るい表示のタグの 7:1 の余裕が小さい（箱の薄い地に 7.06）— 実装で測り、割ったら `#810c4a` に濃くする（［仮定 A2］の決定。`design.md` の Flow の O）
- スクリプトの読み込みが検索の索引より遅いと、そのブロックに色が付かない — 強調は守る。実装で `?h=` の頁の順を記録し、起きたら開発者に提示する
- 449 個のコードブロックの HTML の形が変わる — C09・C18 は両方の形に効く書き方（`site-look-list-items` で確かめ済み）。実装で箱・点線・重なり・高さを控えと比べる
- 太字で折り返しの位置が変わる — 試作の C19 で変わらなかった。実装で 287 ブロックの高さを幅 1000・375 で比べる
- 記述例に今は無い形（閉じない `[`・`\` の後の改行・`%` と数字）が入る — `design.md` の OPEN QUESTION 1・2 の扱いで包み、Revalidation Triggers で数え直す

## 確かめていないこと（実装で確かめる）
- コピーのボタンを押したときの字（`innerText.trimEnd()` が同じ見込み）、`code` の高さ（折り返し）、C09・C18 の形の数、スクリプトを切った頁、外部の読み込み
- 印刷の指定（暗い表示だけの規則が `@media screen` の中）、検索の強調の画面と対比、幅 375
- 作業木の `serve`（頁の道 `/ukadoc-spec/`）での配り（`sakurascript.js` の 200）
- 目標の画面との見比べと、写っていないもの（環境変数・`\p23`・`\q[…"…"]`）の画面
