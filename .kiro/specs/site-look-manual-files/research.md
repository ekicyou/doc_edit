# ギャップ分析: site-look-manual-files

- 日付: 2026-10-25
- 対象: `requirements.md`（Requirement 1〜8）と、メインのチェックアウト `ukadoc-spec/`（`0eb3fb9`。`origin/main` と同じ。`site-look-dark-link-color` #10・`site-look-list-items` #11・`site-look-list-markers` #12 が入ったもの。読むだけ）。この spec の作業木 `.worktrees/site-look-manual-files/` はまだ無い
- 読んだもの: `ukadoc-spec/mkdocs.yml`・`assets/extra.css`（172 行）・`scripts/prepare_site.py`（359 行）・`manual/` の 8 頁と `dev/nar.md`・`dev/update.md` の原稿、Zensical 0.0.67 のテンプレート（`.venv` の `zensical/templates/base.html`・`main.html`）とテーマの色の変数（`classic/main.*.min.css`・`palette.*.min.css`）、試作 `.kiro/specs/completed/site-look-plan/mockups/` の `extra.css`（C14・C15・C17・C22）・`mockup.js`（C15・C22）・`overrides/main.html`・`README.md`、`decisions.md` の C14・C15・C16・C22 の行、`survey.md` の D11〜D13、目標の画面 `mock-manual-ghost-C22-light.png`、`site-look-list-items`・`site-look-list-markers` の requirements と brief、`site-look-sakura-script-highlight` の `design.md`、その作業木 `.worktrees/site-look-sakura-script-highlight/`（読むだけ）
- 数え方: 原稿を読むだけの使い捨ての script（スクラッチの置き場 `C:\Users\maz-o\AppData\Local\Temp\claude\C--home-maz-git-doc-edit\17fa22f0-3c3e-4809-97f6-8ba3b52c31bc\scratchpad\manual-files\` の `survey.py`・`count.py`・`attr_try.py`。結果は `survey-0eb3fb9.txt`・`count-0eb3fb9.txt`）。原稿を、サイトと同じ Markdown 拡張（`tables`・`admonition`・`attr_list`・`md_in_html`・`mdx_truly_sane_lists`・`pymdownx.superfences`・`toc`）で手元で HTML にして数えた。`prepare_site.py`・`zensical build`・`serve` は流していない（`ukadoc-spec/_site/` は 2026-10-24 の古い build で、#11・#12 の目印が入っていないので使わなかった）。数は実装で、作業木の build の HTML で数え直す
- 対比の数は、WCAG 2.x の相対輝度の式で手元で計算した見込みである（`contrast.py`、結果は `contrast-out.txt`。半透明の色は地に重ねてから測った。暗い表示の `--md-hue` は 225deg）。ブラウザでの測りは設計・実装で行い、それを正とする

## 1. 数え直し

### ファイルの箇条書き（manual の頁の一番外の、頭が太字の箇条書き）
| 頁 | 一番外の箇条書き | 頭が太字 | 「名前: 説明」 | 「名前:」だけ | 名前だけ | 段落に分かれない | 2 段落以上 | 名前の中のリンク |
|---|---|---|---|---|---|---|---|---|
| `balloon` | 22 | 22 | 21 | 1（`sstp.png`） | 0 | 7 | 15 | 2 |
| `directory` | 12 | 12 | 12 | 0 | 0 | 3 | 9 | 2 |
| `ghost` | 10 | 10 | 9 | 0 | 1（`updates2.dau`） | 1 | 9 | 4 |
| `install` | 7 | 7 | 2 | 5（場合分け） | 0 | 0 | 4 | 2 |
| `owner-draw-menu` | 3 | 3 | 3 | 0 | 0 | 0 | 3 | 0 |
| `shell` | 12 | 12 | 12 | 0 | 0 | 1 | 11 | 6 |
| `translator` | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| `update` | 7 | 7 | 4 | 3（場合分け） | 0 | 0 | 5 | 2 |
| 計 | 73 | 73 | 63 | 9 | 1 | 12 | 56 | 18 |

- どの一番外の箇条書きも 1 項目だけ（原稿の空行のため）で、manual の頁の一番外の箇条書きの項目は 73 個すべてが頭が太字である。「: 」を外す目印の数は 63 + 9 = 72 の見込み
- 「段落に分かれない」12 個は `<li><strong>名前</strong>: 説明</li>` の形（`<p>` が無い）。試作の C14・C22 は `li > p:first-child > strong:first-child` と `li > strong:only-child` だけに当てたので、この形（`balloon` の `balloonk*.pna`・`ok_down.png/ok_up.png` など 7、`directory` 3、`shell` の `(element).pna` 1）は試作で確かめていない
- 説明の中身: 段落のほか、入れ子の箇条書き（`balloon` の `balloons*.png`・`balloonc*.png`・`sstp.png`）、表（`shell` の `surface*.pna`）、コードの字、木と注記の箱（`install`・`update` の場合分け。`install` の「標準的なゴーストの場合」は注記の箱の中にも木がある）
- 一番外でない頭が太字の項目: `shell` の注記の箱（`!!! tip`）の中の「`※1,※2`」1 個だけ。`.md-typeset > ul` に絞れば当たらない
- 場合分けの 8 個（［仮定 A1］）: `install` の「標準的なゴーストの場合」「標準的な追加シェルの場合」「標準的なバルーンの場合」「ゴーストにバルーンなどを同梱する場合」「(SSP専用)複数インストール用パッケージ」と、`update` の「ゴーストの場合」「(SSPのみ)追加シェルをネットワーク更新に対応させる場合」「(SSPのみ)バルーンをネットワーク更新に対応させる場合」。HTML の形はファイルの箇条書きと同じ（`<li><p><strong>…</strong>:</p><div class="highlight">…`）なので、見た目の指定では見分けられない。外すなら目印で分ける
- `directory` の名前は `(myghost)\ghost\` のようなパスで、原稿では `**(myghost)\\ghost\\**`。`(myghost)\[delete.txt](…)` のように名前の一部だけがリンクのものが 2 個
- `manual/translator.md` は改行が CRLF だった（ほかの 7 頁は LF）。Python のテキストの読み込みで LF にそろうので、`prepare_site.py` の行の処理には響かない見込み

### 木（言語指定の無いコードブロックのうち `+-` の行を持つもの）
| 頁 | 木 | 木の行 | ファイル名 | フォルダ名 | 見分けの難しい行 |
|---|---|---|---|---|---|
| `balloon` | 1 | 40 | 39 | 1 | 「`/`」3 |
| `directory` | 2 | 59 | 52 | 7 | 「または」4・「`/`」3 |
| `ghost` | 1 | 14 | 11 | 3 | |
| `install` | 6 | 48 | 29 | 19 | |
| `owner-draw-menu` | 1 | 18 | 15 | 3 | |
| `shell` | 1 | 18 | 15 | 3 | 空白の無い注 1（`alias.txt（旧仕様）`） |
| `translator` | 2 | 14 | 8 | 6 | `master(またはadditional_shell)`（フォルダ） |
| `update` | 3 | 32 | 25 | 7 | |
| manual の計 | 17 | 243 | 194 | 49 | |
| `dev/nar` | 3 | 26 | 12 | 14 | |
| `dev/update` | 1 | 10 | 5 | 5 | |

- 見分けは試作 `mockup.js` と同じ（「`+-`」の直後の空白までを名前とし、`/\.[^.()]+$/` に合えばファイル）。`manual/ghost` は 14 行でファイル 11・フォルダ 3 で、brief の数と同じ
- 試作の見分けのまま入れたときの食い違い（Requirement 4.4・4.5）:
  - `alias.txt（旧仕様）`: 名前が `alias.txt（旧仕様）` 全体になり、注まで色が付く（全角の括弧は `[^.()]` に入らないので「ファイル」と判定される）
  - `readme.txt または readme.md`・`terms.txt または terms.md`（`directory` の 2 つの木に 2 行ずつ）: `readme.md`・`terms.md` に色が付かない
  - `ok_down.png/ok_up.png` など 6 行: 「`/`」を含めて 1 つの名前として色が付く（2 つとも色は付く）
  - `.narignore`・`.updateignore` など（ドットで始まる名前）: ファイルと判定される（正しい）
  - `master(またはadditional_shell)`: フォルダと判定され、色は付かない（正しい）
- `+-` で始まらない行は「`:`」の省略の行だけ（`install`・`translator`・`update`・`dev/update` など）
- 木はどれも `h4` の直後に無いので、`site-look-list-items` の C18 の記述例の箱には入らない（地は普通のコードブロックの地）

## 2. 今の状態（ukadoc-spec `0eb3fb9`）

### `mkdocs.yml`
- `theme.custom_dir` は無い。`overrides/` のディレクトリも無い
- `extra_css` は `assets/extra.css` の 1 つ。`extra_javascript` は無い
- `markdown_extensions` に `pymdownx.highlight` は無い（`site-look-sakura-script-highlight` が足す）。`attr_list`・`md_in_html` はある
- `theme.features` に `navigation.instant` は無い。頁を移るたびに頁の全体を読み込むので、スクリプトは頁を開いたときに 1 回動けばよい（後で `navigation.instant` を入れると、頁を移ったときに動き直す書き方が要る）

### `scripts/prepare_site.py`
- manual の頁はまとめ頁でないので、`main()` の後ろの方で `write(rel, rewrite_links(read(rel), rel, rel))` で写すだけ。頁ごとの目印を付ける所は無い（まとめ頁の `add_markers()`・`shift_headings()` はまとめ頁にだけ効く）
- `RAW_SKIP_DIRS` に `overrides` が既に入っている（`overrides/` を作っても `_raw/` に写らない）
- 目印の名前の決まりは `bundle-<役>`（`bundle-item`・`bundle-category`・`bundle-notes`・`bundle-support`・`bundle-default`・`bundle-baseware-*`）。どれもまとめ頁（bundle）の役の名前で、manual の頁の印にこの接頭辞はそぐわない。新しい決まり（例: `page-<種類>`・`manual-<役>`）を設計で決める

### `assets/extra.css`
- 末尾に spec ごとの塊（`/* site-look-list-items: … */`・`/* site-look-list-markers: … */`）。暗い表示だけの色は `@media screen { [data-md-color-scheme="slate"] … }` の中に書き、印刷で暗い表示の色を出さない
- C01 の帯は `.md-typeset .bundle-item`（左 `.3rem` の `--md-primary-fg-color` の線・下 `.05rem` の `--md-default-fg-color--lighter` の線・地 `--md-default-fg-color--lightest`・`padding: .3em .6em`・`margin: .5em 0 .3em`）。暗い表示の帯の中のリンクは `.bundle-item a:not(.headerlink)` を白 `#ffffff` と下線にしている
- 注意: `.md-typeset:has(.bundle-item) hr`・`.md-typeset:has(.bundle-item) p` が、`.bundle-item` のある頁の段落と線を詰める（C02）。manual の頁の帯に `bundle-item` の class をそのまま付けると、manual の頁の段落の間も詰まる
- コードブロックには `.md-typeset pre > code { white-space: pre-wrap; word-break: break-all; padding-right: 2.8em }` が効いている（木の折り返しとコピーのボタンの手前の余白）

### 頁の HTML の形（手元の HTML と古い `_site/manual/ghost/` で確かめた）
- 本文は `<article class="md-content__inner md-typeset">` の直下に `h1`・`p`・`div.highlight`・`ul` が並ぶ
- ファイルの箇条書きは `.md-typeset > ul > li` で、2 つの形がある: `li > p > strong + ": 説明"` + 続きの `p`（61 個）と、`li > strong + ": 説明"`（`<p>` 無し、12 個）
- コードブロックは今は `<div class="highlight"><pre><span></span><code>…</code></pre></div>`（`code` に class 無し）。`site-look-sakura-script-highlight` の後は `<pre class="highlight"><code>…</code></pre>`（言語の名前の無いブロック）。どちらも `pre > code:not([class*="language-"])` に合う
- 「`: `」は `strong` の後ろの字のノードの頭にあり、見た目の指定では消せない（brief のとおり）

### Zensical 0.0.67 のテンプレート
- `base.html` の本文は `{% block container %}` の中の `<article class="md-content__inner md-typeset">{% block content %}{% include "partials/content.html" %}{% endblock %}</article>`。`main.html` は `{% extends "base.html" %}` だけ
- `extra_javascript` は `{% block scripts %}` で `bundle.*.min.js` の直後に `{{ script | script_tag }}` で読まれる
- テンプレートの中で使える頁の値は `page.meta`・`page.url`・`page.previous_page` など（`partials/feedback.html` が `"/" ~ page.url` を使う）。`page.url` の形（`manual/ghost/` か）と、minijinja で字の頭を比べる書き方（`is startingwith` の test、`.startswith()`）が通るかは確かめていない（Research Needed）
- brief の試作の事実: `theme.custom_dir: overrides` と `{% block content %}…{{ super() }}…{% endblock %}` は通る。`build --strict` は存在しない `extra_css` を検出しない（`extra_javascript` も同じと見て、`serve` で 200 を確かめる）

### テーマの色と対比の見込み
| 色 | 明るい表示: 白地 | 明るい表示: コードの地 `#f5f5f5` | 暗い表示: 地 | 暗い表示: コードの地 |
|---|---|---|---|---|
| `--md-primary-fg-color`（紺 `#1f4e8c`。明るい表示の `--md-typeset-a-color` も同じ） | 8.31 | 7.62 | 1.93 | 1.71 |
| `--md-primary-fg-color--dark`（`#163a69`） | 11.39 | 10.45 | ― | ― |
| 暗い表示のリンク `#8fb4e8`（`site-look-dark-link-color`。暗い表示の `--md-typeset-a-color`） | ― | ― | 7.55 | 6.69 |
| 試作の暗い表示 `#81c784`（緑のテーマの時の直書き） | ― | ― | 7.99 | 7.07 |
| C18 の暗い表示の線 `#7fa6dc` | ― | ― | 6.42 | 5.69 |
| 試作の C17 の明 `#185a1c`（緑） | 8.34 | 7.65 | ― | ― |
| コードの字の色（`--md-code-fg-color`。フォルダ名・注の色） | ― | 8.99（`#36464e`） | ― | 7.25 |

- 明るい表示は、テーマの色の変数 `--md-primary-fg-color`（紺）のままで、白地 8.31・コードの地 7.62 と 7:1 に届く（Requirement 5.1）。直書きの色は要らない見込み
- 暗い表示は、紺の変数は使えない（1.71）。`--md-typeset-a-color` を使えば明は紺・暗は `#8fb4e8`（コードの地に 6.69。［仮定 A5］の 4.5:1 には届き、7:1 には届かない）で、テーマの色に付いてくる。ただし木の名前がリンクの色になり、押せるものに見えるおそれがある
- **ファイル名とフォルダ名の差は、ほとんど色合いだけ**: 木のファイル名の色とコードの字の色（フォルダ名）の明るさの比は、明るい表示の紺で 1.18、暗い表示の `#8fb4e8` で 1.08・`#81c784` で 1.02 である。明るさでは見分けられず、色合い（紺と青灰色、明るい青と灰色）だけで見分ける。明るい表示の紺とコードの字の青灰色 `#36464e` は色合いも近い。C19 で、さくらスクリプトのタグに「色だけでは別の画面で見分けにくい」として太字を足した経緯がある。brief は「字・コピーされる字・コピーのボタンは変えず」（字の太さは書いていない）、試作の C15 の条件は「字・太さ・折り返しは変えていない」だった。設計で、色合いの差が十分か（明・暗の画面で目で見る）を確かめる
- 帯: C01 の帯の地は明 `rgba(0,0,0,.07)`・暗 `hsla(225,15%,90%,.12)` を地に重ねた色。帯の中の字（`--md-default-fg-color`）は明 13.75・暗 6.73。帯の中のリンクは、明の紺が 7.11、暗の `#8fb4e8` が 5.47、暗の白が 11.65。試作の C22 は帯の中のリンクを明・暗とも `--md-default-fg-color` にしたので、暗い表示では 6.73 で、`site-look-list-items` の帯の上のリンクの線（7:1）に届かない（［仮定 A2］）

## 3. 隣の spec

- **`site-look-list-items`（完了、#11）**: C01 の帯の指定は `.bundle-item` の class に当たる。manual の頁で同じ見え方にするには、(a) 帯の指定のセレクタに manual の頁の名前の目印を足す（`:is(.bundle-item, <manual の目印>)`。list-items の塊を書き換える）、(b) manual の頁の目印に同じ宣言を書き直す（重複）、(c) 名前に `bundle-item` の class を付ける（C02 の `:has(.bundle-item)` の詰めまで manual の頁に効く副作用）のどれか。暗い表示の帯の中のリンクの扱い（白・下線）も同じ選び方になる
- **`site-look-list-markers`（完了、#12）**: 試作の C17 の `.slp-tree-file` の行はこの spec に残された（その spec の brief・requirements）。その spec の札の指定（`.bundle-baseware-*`）は木に当たらない。暗い表示の札の対比の線を 4.5:1 にした（［仮定 A5］の根拠）
- **`site-look-sakura-script-highlight`（タスク生成済み、実装 1.1 のみ）**: 作業木 `.worktrees/site-look-sakura-script-highlight/` は `0eb3fb9` のままで、まだ原稿に差が無い。設計では `mkdocs.yml` に `pymdownx.highlight`（`use_pygments: false`）と `extra_javascript: [assets/sakurascript.js]` を足し、コードブロック 449 個を `<pre class="highlight">` の形にする。当て先は `code.language-sakurascript`・`code.language-ss` だけで、言語の印の無い 162 個（木を含む）には当てない。その設計の「`site-look-manual-files` が言語の指定の無いブロックに仕掛けを当てるとき: 当て先が `code:not([class*="language-"])` で、このスクリプトの当て先と重ならないことを確かめる」に合う
  - ぶつかり: 両方の spec が `mkdocs.yml` に `extra_javascript:` の鍵を足す。後から入る方の PR が `origin/main` に追いつくとき、`extra_javascript` の並びに両方のスクリプトを残す（Requirement 8.6）。`extra.css` は末尾への塊の追記どうしで、両方を並べればよい
- **`site-look-definition-tables`（未着手）**: 「`- **名前**: 説明`」だけが並ぶ箇条書きを表にする。manual の頁のファイルの箇条書きは 2 つ以上の段落を持つものが多く、その spec の当て先から初めから外れるはずだが、段落に分かれない 12 個（例: `balloon` の `balloonk*.pna`）は「名前: 説明」の 1 行で、1 項目だけの箇条書きである。その spec は 2 項目以上の箇条書きだけを表にする（試作 C23 の `items.length < 2` の条件）なら当たらない。この spec が「: 」を外す目印を付けると、その spec の「名前: 説明」の形の判定からも外れる。どちらにしても、その spec が manual の頁の箇条書きを表にしないことを確かめる（roadmap の依存）

## 4. 要件と今あるものの対応

| 要件 | 今あるもの | 差 |
|---|---|---|
| 1 頁の種類の印 | 無い。`prepare_site.py` は manual の頁を写すだけ。テンプレートの上書きも無い | Missing: 印を付ける所（テンプレートか `prepare_site.py`）。Unknown: テンプレートで頁の道を比べる書き方（minijinja） |
| 1.4 共有できる形 | 無い | Constraint: 印の名前の決まりを、C16（`spec/shiori3`）・C12 でも使える形で決める |
| 2.1〜2.5 C14 | 無い（試作は `:has(h1#ゴースト)` と flex の細工） | Missing: 帯と字下げの指定。`<p>` の無い 12 個と、説明が木・表・入れ子の箇条書きの項目に効く書き方 |
| 2.4 「: 」を見せない | 無い（試作は覆いの細工と JS） | Missing: 「: 」を外す目印。手元で、`prepare_site.py` が行の `**名前**: ` を `**名前**{: .<目印> } ` に書き換えると、`attr_list` で `strong` に class が付き、「: 」が消えることを確かめた（`attr_try.py`。`(myghost)\[delete.txt](…)` の形も通る）。原稿の `\*` を含む名前で `**` の切れ目を取り違えない書き方が要る |
| 2.9 場合分けの項目 | ― | Unknown（［仮定 A1］）。外すなら、場合分けの 8 個を目印で分ける |
| 3 C22 の帯 | C01 の `.bundle-item` の指定 | Constraint: 共有の仕方（上の 3 の (a)〜(c)）。`updates2.dau` のずれは、試作が `li > p` と `li > strong` で字下げを別にしたためで、本番は名前の帯を同じ左の端に置けば揃う |
| 3.5・3.6 帯の中のリンク | C01 の暗い表示の帯の中のリンクの指定（白・下線） | Unknown（［仮定 A2］） |
| 4 C15 の木の色 | 無い（試作は `mockup.js`） | Missing: `assets/` の自作のスクリプト（新規）と `mkdocs.yml` の `extra_javascript`。名前の切り出しの規則を試作から直す（4.4・4.5） |
| 4.6 仕掛けが動かないとき | ― | 字を包むだけのスクリプトなら、動かなければ今のまま（自然に満たす） |
| 4.8 HTML の 2 つの形 | ― | `pre > code:not([class*="language-"])` で両方に合う |
| 4.9 manual の外の木 | ― | Unknown（［仮定 A4］）。絞るなら頁の種類の印をスクリプトで見る |
| 5.1 明の 7:1 | `--md-primary-fg-color`（紺） | 白 8.31・コードの地 7.62 で届く見込み |
| 5.2 暗の色 | 無い | Missing: 暗い表示の色の選び（`#8fb4e8` 6.69・`#81c784` 7.07 など）。Constraint: フォルダ名との差が色合いだけ |
| 5.5・5.6 切り替え・印刷 | `@media screen` の書き方（list-items・list-markers） | 同じ書き方で満たす |
| 6.2 検索の強調 | Material の `?h=` の強調（索引を読んだ後に本文の字のノードに `<mark>` を入れる） | Research Needed: スクリプトが `innerHTML` を作り直す書き方だと、強調の後に動いたときに `<mark>` が消える。字のノードだけを分けて包む書き方なら残る |
| 6.4 375 px | ― | Research Needed: 帯の字は `h3` の大きさで、`directory` の `(myghost)\shell\(additional_shell)\`（空白の無い 35 字）が 375 px に収まるか。折り返しの指定が要るかもしれない |
| 6.5 コピー | Material のコピーのボタン（`code` の `innerText`） | `span` で包んでも字は変わらない（試作で確かめた） |
| 6.7 `_raw/`・`llms.txt` | `build_raw()` は原稿を写す | 目印は `_site_src/` にだけ付くので変わらない |
| 7 確かめ | `tools/shot.mjs`・試作の数え方 | 既存の手順で足りる。スクリプトの包みはブラウザで開いた後に数える |
| 8 範囲・PR | workflow の手順 | `mkdocs.yml` の `extra_javascript` が sakura-highlight とぶつかりうる |

## 5. 実装の進め方の候補

### 頁の種類の印
| 候補 | 中身 | 良い所 | 気になる所 |
|---|---|---|---|
| T: テンプレートの上書き | `overrides/main.html` の `{% block content %}` で、頁の道が `manual/` で始まるとき `super()` の前に印の要素を置くか、`super()` を印の付いた要素で包む。`mkdocs.yml` に `theme.custom_dir: overrides` | 原稿の写し（`_site_src/`）を変えない。頁の種類を道で決めるので、ほかの種類（`spec/shiori3`）も同じ所に足せる | `overrides/` と `custom_dir` が新しく増え、Zensical の版を上げたときにブロックの名前を確かめ直す。minijinja で道を比べる書き方が未確認。包むと `.md-typeset > ul` が `.md-typeset > div > ul` になる |
| P1: `prepare_site.py` で頁を包む | manual の頁の写しを `<div class="<印>" markdown="1">…</div>` で包む（`bundle-notes` と同じ書き方） | 既にある書き方（list-markers）。テンプレートを増やさない | 包んだ中は `.md-typeset > div > ul`。`h1` の id・目次が保たれることは notes で実績がある |
| P2: `prepare_site.py` で `h1` に印 | manual の頁の写しの `# 題` に `{: .<印> }` を足し、`.md-typeset:has(> h1.<印>)` で絞る | 本文の構造（`.md-typeset > ul`）を変えない。足す字が 1 か所 | 印が頁の要素でなく見出しに付く（「頁の種類」の印としては回りくどい）。`h1` の id が変わらないことを確かめる |

- 「: 」を外す目印は、どの候補でも `prepare_site.py` で付けるのが素直（テンプレートで本文の字を置き換えるのは脆い。試作の JS は brief が退けた）。その目印（`strong` の class）を帯の当て先にもすれば、頁の種類の印は「どの頁か」の印として C16・C12 のために残す形になる

### C14・C22 の見た目
- 名前の `strong` を `display: block` の帯にすれば、`<p>` の有る無しに依らず説明は次の行に回る（試作の flex と負の字下げの細工は要らない）。字下げは `li` の左の余白で、説明のすべて（段落・表・木・入れ子の箇条書き）に効かせ、帯は負の余白で名前の左の端に戻す、などを設計で決める
- 帯の見え方の共有は 3 の (a)〜(c)。(a) は list-items の塊のセレクタを書き換えるが、宣言を二重にしない

### C15 のスクリプト
- `assets/` に新しいスクリプト 1 つ（例: `assets/file-tree.js`）。`pre > code:not([class*="language-"])` のうち `+-` の行を持つものを選び、行ごとに名前を切り出してファイル名を `span` で包む。包んだ後の `textContent` が元と同じことを確かめる
- 名前の切り出しは試作を直す: 注を名前から外す（全角・半角の括弧の前で切る）、「または」「`/`」で並ぶ 2 つ目の名前も包む（［仮定 A3］）
- `innerHTML` を作り直さず、字のノードを分けて包む書き方にすると、検索の強調の `<mark>` と順が入れ替わっても壊れない
- 色は `extra.css` のこの spec の塊で、明は `--md-primary-fg-color`、暗は設計で決める

### 進め方の組み合わせ
- **A（既にあるものを広げる）**: P1 か P2 ＋ `prepare_site.py` の「: 」の目印 ＋ list-items の帯の指定を広げる (a) ＋ 新しいスクリプト。テンプレートを増やさず、変えるファイルは `prepare_site.py`・`extra.css`・`mkdocs.yml`・新しいスクリプトの 4 つ
- **B（新しく作る）**: T ＋ `prepare_site.py` の「: 」の目印 ＋ 帯の宣言を書き直す (b) ＋ 新しいスクリプト。頁の種類の印が原稿の写しから独立するが、`overrides/` と `custom_dir` が増える
- **C（混ぜる）**: P1 で頁を包む印を付け、帯は (a)、スクリプトは頁の印を見ずに中身で木を見分ける（［仮定 A4］のとおり）

## 6. 手間と危うさ
- 手間: **M**（3〜7 日）。目印・CSS・小さなスクリプトの 3 つが要り、見分けの規則の端（12 個の `<p>` 無し、場合分け、見分けの難しい木の行）と、明・暗・375 px・検索の強調の確かめがある
- 危うさ: **Medium**。テンプレートの minijinja の書き方が未確認（P1・P2 なら避けられる）、スクリプトと検索の強調の順、`mkdocs.yml` の `extra_javascript` のぶつかり、木のファイル名とフォルダ名の差が色合いだけなこと

## 7. 設計で調べること（Research Needed）
- テンプレートの上書きにするとき、Zensical 0.0.67 の minijinja で `page.url` の形と、字の頭を比べる書き方が通るか
- 頁の種類の印の名前と、`bundle-<役>` に並ぶ新しい名前の決まり（C16・C12 で使える形）
- `prepare_site.py` で `- **名前**: ` を見つける規則（原稿の `\*`・`\\`・名前の中のリンク・名前だけの行・「`:`」だけの行）と、場合分けの項目を分けるかどうか（［仮定 A1］）
- 帯の見え方を C01 と共有する書き方（3 の (a)〜(c)）と、帯の中のリンクの色（［仮定 A2］）
- 木の名前の切り出しの規則（注・「または」・「`/`」。［仮定 A3］）と、manual の外の木に当てるか（［仮定 A4］）
- 暗い表示の木のファイル名の色と線（［仮定 A5］）、色合いだけの差で足りるか（明・暗の画面で見る）
- スクリプトと検索の強調（`?h=`）の順、字のノードを分けて包む書き方
- 375 px での長い帯の名前の折り返し

## 8. 設計への申し送り
- 推す組み合わせ: **A**（`prepare_site.py` で「: 」の目印と頁の種類の印を付け、帯は C01 の指定を広げ、木はスクリプトで包む）。brief の「頁の種類の印（テンプレートの上書きか `prepare_site.py`）」のうち、`prepare_site.py` は list-markers で包みの実績があり、テンプレートの未確認の書き方と `overrides/` の新設を避けられる。ただし C16・C12 で頁の道から印を付けたい場面が来たら、テンプレートの上書きに移せる形（印の名前を種類ごとにそろえる）にしておく
- 要件の話し合いで決めたこと: ［仮定 A1］〜［仮定 A5］はどれも仮定のとおり、色だけで見分けることも brief のとおり（2026-10-25。`requirements.md` の「要件の話し合いで決めたこと」）。この文書の［仮定 An］は、その結論に読み替える
- 確かめの基準の数: ファイルの箇条書き 73（「: 」の目印 72）、帯の中のリンク 18、木 17（manual）＋ 4（`dev/`）、木の行 243（ファイル 194・フォルダ 49）＋ 36（17・19）、`manual/ghost` の木はファイル 11・フォルダ 3

## 9. 設計の調査（2026-10-25、`/kiro-design` の設計の段）

- 発見の種類: 既にある仕組みの拡張（light discovery）。外の新しい依存は無い（Python-Markdown の `attr_list`・テーマの変数・素の JavaScript だけ）ので、Web の調べは要らなかった
- 使ったスキルと決まり: `kiro-spec-design` の `rules/design-principles.md`・`design-discovery-light.md`・`design-synthesis.md`・`design-review-gate.md`、`kiro-validate-design` の `rules/design-review.md`。手元に、見た目・読みやすさ（アクセシビリティ）の専用のスキルは無いので、対比の線は要件（7:1・4.5:1・3:1）と `site-look-list-items` の測り方に従った
- 確かめ方: ukadoc-spec `0eb3fb9` を `git archive` で Claude のスクラッチ（`C:\Users\maz-o\AppData\Local\Temp\claude\C--home-maz-git-doc-edit\17fa22f0-3c3e-4809-97f6-8ba3b52c31bc\scratchpad\design\`）に 2 つ書き出し、`base`（変更の前）と `impl`（`design.md` の差分を当てたもの）で `prepare_site.py` と `zensical build --strict` を流した（どちらも exit 0）。`impl2` は `impl` に `site-look-sakura-script-highlight` の `mkdocs.yml` の 2 か所（`pymdownx.highlight`・`extra_javascript`）と `sakurascript.js` を足した写し。`_site/` を `python -m http.server`（8031〜8033。終わったら止めた）で配り、Edge ヘッドレス + CDP（`shot.mjs` を元にした使い捨ての `probe.mjs`）で開いて数え、測った。`ukadoc-spec/`・作業木・`_site_src/` は触っていない
- 使い捨てのスクリプト（同じ置き場）: `trees.py`（原稿の木の行）、`check.py`（`base` と `impl` の HTML の比べ）、`ex.py`（`mark_manual()` の例）、`probe.mjs`・`tree-expr.js`・`band-expr.js`・`w-expr.js`（ブラウザで数える・測る）、`summ.py`。結果は `tree-*.jsonl`、画面は `shots/`

### 9.1 調べたことと分かったこと

#### 頁の種類の印（Research Needed の 1・2）
- `prepare_site.py` で manual の頁の最初の `#` 見出しに ` {: .page-manual }` を足すと、`<h1 class="page-manual" id="ゴースト">` になり、8 頁の `<title>`（「ゴースト - UKADOC project」など）・見出しの id の並び・¶ の数・`md-nav__link` の数は変わらなかった。まとめ頁の `h1` も `shift_headings()` が `{#id}` を付けて同じ形で通っている
- テンプレートの上書き（T）は、`page.url` と minijinja の字の頭の比べが未確認のまま残る。`overrides/` と `theme.custom_dir` を増やさずに済む `h1` の印（P2）を選び、テンプレートは確かめなかった
- 頁を `<div markdown="1">` で包む案（P1）は、`.md-typeset > ul` が `.md-typeset > div > ul` になり、要件 7.5 の撮る位置のセレクタと、後続の `site-look-definition-tables` の当て先が変わるので採らなかった
- 名前の決まり: 頁の種類の印は `page-<種類>`、その種類の頁の中の役は `<種類>-<役>`（まとめ頁の `bundle-<役>` と並ぶ）。この spec は `page-manual` と `manual-item` を使う

#### 「`: `」の目印（Research Needed の 3）
- 規則 `^(- \*\*(?:\.|[^\*])+\*\*)(: |:$|$)`。`\*`・`\` を 1 字の組として読むので、`surfaces\*\*.txt`・`(myghost)\ghost\`・`foo\***` の切れ目を取り違えない。名前の一部だけのリンク `(myghost)\[delete.txt](…)` も通る
- 写しの数: 頁の種類の印 8（manual の 8 頁に 1 つずつ、ほか 0）、名前の目印 73（`balloon` 22・`directory` 12・`ghost` 10・`install` 7・`owner-draw-menu` 3・`shell` 12・`translator` 0・`update` 7）。本文の字（タグを外し空白を詰めたもの）の違いは manual の頁で「`:`」72 字だけ（`ghost` は 9）、ほかの 32 頁は 0。漏れ（`{:`・`{#`・`{.`）0。`_raw/` と `llms.txt` は同じ
- 形: `<li><p><strong class="manual-item">…</strong> 説明</p>…` が 61、`<li><strong class="manual-item">…</strong> 説明</li>` が 12（`updates2.dau` は `<li><strong class="manual-item"><a …>updates2.dau</a></strong></li>`）
- 「`:`」だけを外し、空白 1 つを残した。空白は帯（`display: block`）の後ろの行の頭の空白として消え、見えない。検索の字で名前と説明の語の切れ目になる（`design.md` の OPEN QUESTION 4）
- 例: 字下げした `    - **※1,※2**: …`・`- **名前** 説明`・`- **名前**:説明`・コードブロックの中の行には付かない。題の無い頁は `error()` になる

#### 帯の共有と字下げ（Research Needed の 4・8）
- C01 の帯の指定の 2 つのセレクタを `:is(.bundle-item, .manual-item)` に広げ、manual の頁の帯の形（`display: block`・`1.25em`・`400`・`line-height: 1.5`・`margin: .5em 0 .3em -1.2rem`）を自分の塊に置いた。manual の頁に `.bundle-item` は無いので、C02 の詰め（`:has(.bundle-item)`）は効かない
- 字下げ: 一番外の箇条書きの左の余白 0、項目 `1.2rem` と点なし、帯は `-1.2rem`。`li > p:first-child` の上の余白を 0 にして、2 つの形の帯の上の端もそろえた
- 写しの測り（幅 1000）: 73 個の帯の左の端が 16px（本文の左の端）、幅が 711px の 1 通り。説明の左の端 40px。一番外の項目の点 `none`、`balloon` の入れ子の箇条書きの点 `disc`
- 目標の画面（`mock-manual-ghost-C22-light.png`）の帯は x=10 で、`updates2.dau` だけが x=16 だった。試作の C22 の帯は `margin-left: -1.5em` を帯の字の大きさ（1.25 倍）で効かせたので 6px 大きく左に出ていた。この設計は C01 と同じく本文の左の端に置き、`updates2.dau` もそろう
- 帯の中のリンク: 明 `#1f4e8c` で帯の地（`rgb(237,237,237)`）に 7.11、暗 `#ffffff` と下線で帯の地（`rgb(54,56,64)`）に 11.66。帯の中の名前の字は明 14.13・暗 6.76。ホバー・フォーカスは C01 と同じ色と地なので、`site-look-list-items` の測り（明 3.64・暗 11.66）と同じになる見込み（実装で測る）

#### 木の名前の切り出し（Research Needed の 5）
- manual と `dev/` の木の行 279 を並べて見た。注はどれも、名前の後ろの空白か全角の `（` で始まる（`alias.txt（旧仕様）` だけが空白無し）。半角の `(` は名前の中にだけある（`(saori).dll`・`(element).png`・`(myghost)`・`master(またはadditional_shell)`）。2 つの名前は `a.png/b.png`（空白無しの `/`、6 行）と `a.txt または a.md`（空白で囲んだ「または」、4 行）だけ
- 規則: `+-` の直後から空白か全角の `（` の前までを名前の並びとし、`/` で分ける。並びの後ろが「` または `」なら次の並びも名前。名前が `\.[^.()]+$` に合えばファイル名
- 写しの数（明・暗・幅 1000・375 で同じ。`impl2` でも同じ）: 木 21（manual 17・`dev/` 4。全 40 頁でほかに `+-` の行を持つ言語の印の無いブロックは無い）、木の行 manual 243・`dev/` 36、包んだファイル名 manual 204（ファイル名の行 194 と 2 つ目の 10）・`dev/` 17。どの木も包む前後の字が同じ。木でないブロックの `span` 0
- 名前の切り出しの結果は、`alias.txt`（注を含まない）、`readme.txt`・`readme.md`、`ok_down.png`・`ok_up.png` を確かめた

#### 検索の強調の後に残る包み方（Research Needed の 6）
- `site-look-sakura-script-highlight` と同じく、`span` を作って `textContent` を入れ、`replaceChildren()` で入れ替える。要素の入った `code` は包まない。写しの `?h=descript` で `mark` 2（帯の中 1・木のファイル名の `span` の中 1）、`?h=readme` で 12（帯の中 2・木のファイル名の中 5）。明・暗とも同じで、検索の強調はスクリプトの後に動いた

#### 暗い表示の木の色（Research Needed の 7）
- `--md-typeset-a-color` を使うと、明は紺 `#1f4e8c`（白地 8.31・コードの地 7.62）、暗は `#8fb4e8`（暗い地 7.56・コードの地 `rgb(39,42,53)` に 6.71）。直書きの色が要らず、暗い表示の値は変数の側で `@media screen` の中にあるので、暗い表示のまま印刷しても紺で出る
- ファイル名とフォルダ名（コードの字）の明るさの比は、明 1.18（紺と `#36464e`）、暗 1.50（`#8fb4e8` と `rgba(213,216,226,.82)`）。設計の写しの画面（`screenshots/design-ghost-C15-*.png`・`design-directory-tree-dark.png`・`design-install-light.png`）で、明・暗ともファイル名の青がフォルダ名の灰色から見分けられることを見た。決めるのは設計の話し合い（`design.md` の OPEN QUESTION 3）
- ほかの候補: C18 の線の `#7fa6dc`（コードの地に 5.69）、試作の緑 `#81c784`（7.07。紺のテーマに合わない）

#### 幅 375（Research Needed の 8）
- 帯に `overflow-wrap: anywhere` を足した写しと、足さない写しの両方で、manual の 8 頁と `dev/` の 2 頁が明・暗とも `scrollWidth` = `innerWidth` = 375 で、帯の中の名前のはみ出しも 0 だった。`(myghost)\shell\(additional_shell)\` は `\` の後ろで 2 行に折り返した。指定は足さない

#### `extra_javascript` の鍵（Research Needed の 9）
- `site-look-sakura-script-highlight` の作業木（コミット `0c94a01`・`4ce6b5e`。PR はまだ無い）は、`mkdocs.yml` に `extra_javascript: [assets/sakurascript.js]` と `pymdownx.highlight`（`use_pygments: false`）を足している。この spec は、先に入った方の鍵の並びに 1 行足す（鍵が無ければ鍵ごと足す）。2 つのスクリプトの当て先は言語の印の有る・無しで分かれ、順は問わない。`impl2` で両方を並べて build し、木の数が変わらないことを確かめた

### 9.2 組み立てでの見直し（synthesis）
- **まとめる**: 「名前の後ろの『`: `』を外す目印」と「帯の当て先」を 1 つの目印 `manual-item` にした（名前だけの `updates2.dau` にも付け、帯は 73 個すべてに同じに当たる）。頁の種類の印と名前の目印は、どちらも `main()` の同じ所（`d == 'manual'`）で決める
- **作らずに使う**: 帯の見た目は C01 の宣言を共有し、木の色はテーマのリンクの色の変数を使い、包み方は `site-look-sakura-script-highlight` の書き方にそろえた。テンプレートの上書き・新しい依存・直書きの色は足さない
- **削った**: 試作の flex と負の字下げと覆いの細工、フォルダ名の `span`（色を変えないので要らない）、`overflow-wrap`（幅 375 で要らなかった）、暗い表示だけの色の指定（変数で足りる）、頁の種類の印を CSS で重ねて見ること（名前の目印だけで足りる）
- **広げすぎない**: 頁の種類の印の決まり（`page-<種類>`）だけを決め、ほかの種類の印は付けない（要件 1.4）

### 9.3 設計の判断（`design.md` の「前提と OPEN QUESTION」に代わりの案）
| 判断 | 選んだもの | わけ |
|---|---|---|
| 頁の種類の印 | `prepare_site.py` が題の `h1` に `page-manual` | `overrides/` を増やさず、本文の形（`.md-typeset > ul`）を変えない。題・id・目次が変わらないことを写しで確かめた |
| 見た目の当て先 | 名前の目印 `manual-item` と `:has()` | manual の頁だけに付き、名前の無い箇条書きが後で入っても点と字下げが残る |
| 帯の見た目 | C01 の 2 つのセレクタを広げる | 同じ宣言を 2 か所に書かない。要件 8.2 の外の 2 行の変更になる（OPEN QUESTION 2） |
| 「`: `」 | 「`:`」を外し空白を残す | 見えず、検索の語の切れ目を保つ（OPEN QUESTION 4） |
| 木の色 | `--md-typeset-a-color` | 7:1・4.5:1 を満たし、直書き 0、印刷も自然に明るい表示の色（OPEN QUESTION 3） |
| 木の当て先 | `pre > code:not([class*="language-"])` と `+-` の行 | 着色の前後どちらの形にも効き、頁を問わない |

### 9.4 危うさと手当て
- 名前の後ろが規則に無い書き方の行が原稿に入る — 目印が付かず今の見え方で残る。MarkerCheck の数（73）で見つける（OPEN QUESTION 6）
- 木の行の新しい書き方（空白を含む名前、空白の無い半角の括弧の注） — 色が名前の一部か注にまで付く。TreeCheck の数と例で見つける
- `navigation.instant` を入れると、頁を移ったときにスクリプトが動かない — Revalidation Triggers に書いた
- `site-look-sakura-script-highlight` との `mkdocs.yml`・`extra.css` のぶつかり — 並びと塊を両方残す（`workflow.md` の「開いている PR に追いつく」）
- ファイル名とフォルダ名の明るさの差が小さい — 設計の話し合いで画面を見て決め、足りなければ止めて色を選び直す
