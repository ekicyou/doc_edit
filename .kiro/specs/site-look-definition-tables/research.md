# ギャップ分析: site-look-definition-tables

## Summary
- **Feature**: `site-look-definition-tables`
- **Discovery Scope**: Extension（既存の組み立ての処理 `scripts/prepare_site.py` と `assets/extra.css` に足す。原稿は変えない）
- **土台**: ukadoc-spec の `origin/main` の `f54423d`（#10〜#15 が入ったもの）。数はすべて、`git archive f54423d` を一時の場所に写し、`prepare_site.py` と `zensical build --strict`（どちらも exit 0）で作った 40 頁の HTML と `_site_src/` で数えた。ukadoc-spec のチェックアウトには何も書いていない
- **Key Findings**:
  - 試作 `mockup.js` の C23 と同じ判定を build の HTML に当てると、今も **20 頁に 477 個・2105 行** で、brief の数と頁ごとに同じである。`_site_src/` の `.md` を行で数える判定（同じ字下げで空行なしに「`- **名前**: `」が 2 行以上続き、入れ子の項目・コードブロックを含まない塊）でも、頁ごとに同じ 477 になった。原稿の Markdown の行の上で見分けても、HTML の木の上で見分けても同じ当て先になる
  - 477 個のうち 12 個は、ほかの箇条書きの項目の中にある（`spec/shiori3` の 7 個のすべてを含む）。6 個は注意書きの箱（`div.bundle-notes`）の中、1 個は注記の箱（`dev/nar`）の中である。形の合う項目と合わない項目が混じる 2 項目以上の箇条書きは 0 個で、外す形はどれも 1 項目の箇条書きか、`spec/saori-ex` の 1 個（太字の中に全角のコロン）である
  - 自作の Markdown 拡張（案 B）は、今の `zensical build` からは import できない（`ModuleNotFoundError: No module named 'scripts'`。`PYTHONPATH=.` を付けると読める）。CI（`.github/workflows/pages.yml` の `zensical build --strict`）と手元の確かめの手順を変える必要がある
  - `prepare_site.py` で表を書く案 A は、「Markdown の表を `<div markdown="1">` で包む」書き方も、「HTML の表の各段に `markdown="1"` を付ける」書き方も、一番外・項目の中・注記の箱・`div.bundle-notes` の 4 つの置き場所で、表の中のリンクと `code` が Markdown として読まれた（手元の Python-Markdown 3.11.2 と同じ拡張の組で確かめた）
  - Material の表の見た目と、横に流せる包み（`div.md-typeset__scrollwrap > div.md-typeset__table`）は、どちらも `table:not([class])` にだけ付く（包みはテーマのスクリプトが頁を開いたときに付ける）。表そのものに `class` を付けてはいけない、という試作の事実は今の Zensical 0.0.67 でも同じ

## Research Log

### 当て先の数え直し（f54423d）
- **Context**: brief の 477 個は `afb2152` の上の試作で数えたもの。その後に #11〜#15 が入り、manual の頁の「`: `」が外れ、記述例の HTML も変わった
- **Sources Consulted**: 一時の写しの `_site/**/index.html`（40 頁）と `_site_src/**/*.md`。標準の `html.parser` で木を作り、`mockup.js` の判定（項目の最初の子が `p` ならその中で、最初の子が `strong`・その前に字が無い・`strong` の直後の字が `/^:\s/`・項目の中に `ul`・`ol`・`pre` が無い・項目の直下の `p` が 1 つ以下・項目が 2 つ以上）をそのまま当てた
- **Findings**:
  - 頁ごとの数（表 / 行）: `list/shiori-event` 217/892・`list/shiori-event-ex` 124/552・`spec/saori-ex` 45/177・`list/sakura-script` 22/151・`spec/sstp` 10/71・`list/propertysystem` 9/56・`list/plugin-event` 8/34・`descript/shell` 7/23・`spec/shiori3` 7/36・`spec/headline` 5/15・`descript/shell-surfaces` 4/20・`list/shiori-resource` 4/18・`spec/update-file` 4/9・`descript/install` 3/17・`descript/ghost` 2/6・`spec/fmo-mutex` 2/15・`descript/plugin` 1/6・`dev/nar` 1/2・`spec/plugin` 1/2・`spec/web` 1/3
  - まとめ頁でない頁（`dev/nar`・`spec/headline`・`spec/plugin`）に 7 個ある。`prepare_site.py` の `main()` では、まとめ頁の `parts.append(…)` の行と、読み物の頁の `for d in DIRS` の `write(…)` の行の両方が当て先になる
  - 置き場所: 一番外 458・`div.bundle-notes` の中 6（`list/sakura-script` の `screen`・`--volume=0～100`・`--option=…`・`--accept=…`・「期間の決め方」・「期間（--from・--to）」の一覧）・admonition の中 1（`dev/nar` の `※1 ベースウェア`）・項目の中 12（`spec/shiori3` の `メソッド`・`SenderType`・`SecurityLevel` 2・`Status`・`ステータスコード`・`ErrorLevel` の値の一覧、`spec/update-file` 3、`spec/fmo-mutex` の `キー名・値`、`list/shiori-event` の `Reference*` の中の `request.(ヘッダ名小文字)`）
  - 行の中身: 説明に `<br />` 225・説明にリンク 159・説明に `code` 202・名前にリンク 6・名前に `code` 7・対応の札 0・画像 0・表 0。どの項目も段落（`p`）に包まれていない（どれも詰まった箇条書き）。原稿の塊のうち 108 個は、`<br />` の後ろに字下げした続きの行を持つ
  - 原稿の行で「`|`」を含む項目が 12 行ある（例: `--option=(noclose|noclear)`、`--filter=フィルタ` の `BMP|\*.bmp|…`、`Reference4` の `(timeout|fileio|…)`、`席（東|南|西|北）`）。Markdown の表で書くなら、ここをエスケープする要がある
  - いちばん長い名前は 83 字（`--content-type=(multipart/form-data | application/x-www-form-urlencoded | そのほか任意指定)`）。ほかに `\![anim,add,overlay,ID,x,y,表示時間,…]` 69 字など
  - 外す形: 形の合う 1 項目の箇条書き 216（`list/shiori-event` 83・`list/shiori-event-ex` 81・`spec/shiori3` 18・`list/plugin-event` 9・`list/sakura-script` 9・`spec/saori-ex` 4・`spec/update-file` 3・`spec/sstp` 2）、頭が太字の 1 項目で入れ子を持つもの 23・コードブロックを持つもの 4・2 つ以上の段落 8（トップの頁の「ukadocの見方」6 を含む）・名前の後ろが「`: `」でないもの 84 個の 1 項目の箇条書きと、`spec/saori-ex` の 5 項目の 1 個（`**必ず守ること（MUST）：**`）
  - manual の頁: build の HTML では 0 個が当たる（`mark_manual()` が「`: `」を外した後）。`mark_manual()` の前の原稿（`manual/*.md`）を行で数えても 0 個（ファイルの箇条書きは原稿の空行で 1 項目ずつ別の箇条書き）。今の原稿では、C23 の処理を `mark_manual()` の前に通しても後に通しても当て先は変わらない
  - 表のすぐ隣（同じ親の前後の要素）に、形の合う 1 項目の箇条書きがある所が 6 か所（`list/shiori-event` 1・`list/shiori-event-ex` 5。`Reference*`・`Reference1`・`Reference3` など）。原稿で 1 項目だけ分かれている
- **Implications**: 当て先の数は brief のまま使える。項目の中の 12 個と、まとめ頁でない頁の 7 個は、どちらの案でも処理の当て先に入れる。表のすぐ隣の 6 か所と `spec/saori-ex` の形の近いものは、要件で今のまま残す仮定にした（requirements.md の未決の問い 2・4）

### Zensical での自作の Markdown 拡張の読み込み
- **Context**: brief の案 (b)「自作の Markdown 拡張（treeprocessor など）」には「CI での import の道の用意が要る」とある
- **Sources Consulted**: `zensical/markdown/render.py`（`Markdown(extensions=config["markdown_extensions"], …)` で Python-Markdown にそのまま渡す）、`zensical/config.py`。一時の写しで `scripts/probe_ext.py`（読まれたら字を出すだけの拡張）を `mkdocs.yml` の `markdown_extensions` に足して build した
- **Findings**:
  - `zensical build --strict` は `RuntimeError: Python error: ModuleNotFoundError: No module named 'scripts'` で止まる。Zensical は `sys.path` に設定のディレクトリを足さない
  - `PYTHONPATH=. zensical build --strict` なら 40 頁で拡張が読まれ、`No issues found` で終わる。`python -m zensical build --strict` では拡張が読まれなかった
  - CI は `.github/workflows/pages.yml` で `pip install -r requirements.txt` → `python scripts/prepare_site.py` → `zensical build --strict` → `cp -r _raw/. _site/` の順に動く
- **Implications**: 案 B は、`pages.yml` に `PYTHONPATH` を足すか、拡張をパッケージとして `requirements.txt` から入れるかが要る。どちらも brief の「変えるのは `prepare_site.py`（か自作の Markdown 拡張と `mkdocs.yml`）と `assets/extra.css`」の外に出て、`ukadoc-spec/CLAUDE.md`・`tech.md` の確かめの手順（`zensical build --strict`）も変わる。手元で `PYTHONPATH` を付け忘れると build が止まる

### Material の表の見た目と包み
- **Context**: brief の「Material の表の見た目は `table:not([class])` にだけ効く」の今の版での確かめ
- **Sources Consulted**: build の `assets/stylesheets/classic/main.*.min.css` と `assets/javascripts/bundle.*.min.js`
- **Findings**:
  - `.md-typeset table:not([class])` に `display:inline-block; max-width:100%; overflow:auto; font-size:.64rem; border:.05rem solid var(--md-typeset-table-color)` などが付く
  - テーマのスクリプトが `table:not([class])` を `div.md-typeset__scrollwrap > div.md-typeset__table` で包む。`.md-typeset__table` は `display:inline-block`、その中の表は `display:table; width:100%`。表の幅は中身に合わせて本文の幅までになる（目標の画面で `#OnBoot` の表が狭く、`#OnClose` の表が本文の幅いっぱいなのはこのため、と見る）
  - 試作の `width:100%`・`font-size:.75rem`・`padding:.45em .9em`・名前の列の太字・45em 以上での `white-space:nowrap`・`overflow-wrap:anywhere` は、この上の上書きである
- **Implications**: 表の印は `class` でなく属性か、表を包む要素の `class` で付ける。見た目の指定は、印を持つ表（か包み）の下の `table` に当てる。幅をそろえるかは要件の未決の問い 3

### 案 A の書き方の試し（Python-Markdown 3.11.2、`prepare_site.py` の `EXTENSIONS` と同じ組）
- **Context**: `prepare_site.py` が `_site_src/` に書く Markdown の中で、表の中の説明のリンク・`code`・`\` のエスケープが、今と同じに読まれるか
- **Sources Consulted**: 使い捨ての `probe_a.py`（一時の場所）。一番外・項目の中（2 字下げ）・注記の箱（4 字下げ）・`<div class="bundle-notes" markdown="1">` の中の 4 つで試した
- **Findings**:
  - **A1: Markdown の表を `<div … markdown="1">` で包む**: 4 つの置き場所のどれでも表になり、リンクと `code` が読まれた。表に `class` が付かず、印は包みの `div` に付く。説明の中の「`|`」は `\|` にする要がある（12 行）。`<br />` の後ろの続きの行は、1 行につなぐ要がある（108 個の塊）
  - **A2: HTML の表を書き、`table`・`tbody`・`tr`・`td` の各段に `markdown="1"` を付ける**: 4 つの置き場所のどれでも、リンクと `code` が読まれた。`td` にだけ `markdown="1"` を付けたときは、admonition の中を除いて `**…**` も `` `…` `` も字のまま残った（`md_in_html` は `td`・`th` を行の中の書式だけ読む要素として扱い、間の段にも印が要る）。表そのものに属性の印（例: `data-…`）を付けられる
- **Implications**: 案 A はどちらの書き方でも成り立つ見込み。A1 は `|` のエスケープと行のつなぎ、A2 は各段の印と HTML のエスケープ（説明の中の `<`・`&` など）に気を付ける。どちらも、組み立てた後の名前と説明の字が今の箇条書きと同じかを、build の HTML で確かめる要がある（requirements.md の 5.4）

### 先に入った spec の後処理との並び
- **Context**: brief の申し送り（`site-look-list-markers`・`site-look-manual-files`）
- **Sources Consulted**: `scripts/prepare_site.py`（`add_markers()`・`mark_manual()`・`main()`）、`.kiro/specs/completed/site-look-list-markers/design.md`・`verification.md`、`.kiro/specs/completed/site-look-manual-files/design.md` の Revalidation Triggers
- **Findings**:
  - まとめ頁: `parts.append(add_markers(rel, rewrite_links(shift_headings(text, rel, depth, is_index), rel, dst).strip('\n')))`。`add_markers()` は行の頭の `**対応:**`・`**既定値:**` の段落の末尾に印を足す。名前と説明の箇条書きの中には、その行は無い（項目の中の札 0）
  - 読み物の頁: `write(rel, mark_manual(text) if d == 'manual' else text)`。`dev/nar`・`spec/headline`・`spec/plugin` の 7 個はここを通る
  - 見出しの数の検査（`old_ids()`）は原稿の単位の本文を見るので、後で表を書いても変わらない。リンクの書き換え（`rewrite_links()`）の後に表を書けば、表の中のリンクも今と同じ飛び先になる
  - 確かめ直す数: 対応 1640・既定値 423・注意書き 16・札 2719・漏れ 0（`site-look-list-markers`）、manual の目印 73・外した「`: `」72（`site-look-manual-files`）
- **Implications**: 案 A なら、`rewrite_links()` の後に通す 1 つの関数を、まとめ頁の行と読み物の頁の行の 2 か所に入れる（`add_markers()`・`mark_manual()` とは入れ子にして両方を残す）。案 B なら `prepare_site.py` は変わらず、拡張が HTML の木の上で `ul` を見る

## Requirement-to-Asset Map

| 要件 | 今ある物 | ギャップ |
|---|---|---|
| 1.1・1.3〜1.5 形の見分け | 試作 `mockup.js` の C23 の判定（ブラウザの使い捨て）。`prepare_site.py` の `FENCE`・`MANUAL_ITEM` の正規表現と行の見方 | **Missing**: 組み立ての処理での見分け。原稿の行の上で見分けても HTML の木の上で見分けても 477 になることは確かめた |
| 1.2 原稿を変えない | `prepare_site.py` は `_site_src/` に写すだけで原稿を変えない | なし |
| 1.6 manual の頁を外す | `mark_manual()` が「`: `」を外す。原稿でも 1 項目ずつ | **Constraint**: 今は自然に外れる。見分けが `manual-item` の目印に依らない形でも 0 個であることを確かめる |
| 1.7 箱の中 | `add_markers()` の `div.bundle-notes`（`markdown="1"`）、admonition | **Constraint**: 案 A では字下げ（admonition 4・項目の中 2）を保って書く |
| 1.8 項目の中の 12 個 | なし | **Missing**＋未決の問い 1 |
| 1.9 隣の 1 項目 | なし | 未決の問い 2（今のまま残すなら処理は要らない。警告を出すなら要る） |
| 2.1〜2.4 表の中身 | なし | **Missing**: 表の組み立て。案 A1 は `|` のエスケープ（12 行）と続きの行のつなぎ（108 塊）、案 A2 は各段の `markdown="1"` |
| 2.5 ほかの表と見分ける印 | 試作の `data-slp-keytable` | **Missing**: 本番の印の名前（`structure.md` の `<頁の種類>-<役>` の class の決まりは、表そのものには使えない。包みの `div` の class か、表の属性か） |
| 2.6 リンクの飛び先 | `rewrite_links()` | **Constraint**: 表を書くのはリンクの書き換えの後 |
| 3.1〜3.6 見た目 | 試作の `extra.css` の C23 の塊、Material の `table:not([class])` | **Missing**: 本番の塊（末尾に足し、注は 1 行）。未決の問い 3（幅・字の大きさ・太字） |
| 3.7〜3.10 明・暗・印刷 | Material の表の色はテーマの変数（`--md-typeset-table-color` など） | **Unknown**: 縞の地の上の字・リンクの対比の測り（試作では測っていない） |
| 4.1〜4.6 失わないもの | 試作の 375 px の測り（20 頁と `manual/ghost` で 375/375） | **Constraint**: 本番の指定で測り直す |
| 4.7〜4.9 ほかの目印 | 各 spec の verification.md の数 | 数え直すだけ |
| 4.10 `_raw/`・`llms.txt`・検査 | `build_raw()` は原稿をそのまま写す | なし（案 A・B とも触れない） |
| 5.x 確かめと記録 | `shot.mjs`、各 spec の使い捨ての数えるスクリプト、この分析の `count_c23.py` の判定 | 確かめの手順は今ある物で足りる |
| 6.1〜6.2 変更の範囲 | — | **Constraint**: 案 B は `pages.yml` か `requirements.txt` を変える要がある |

## Implementation Approach Options

### Option A: `prepare_site.py` に足す（brief の案 (a)）
- **やること**: `rewrite_links()` の後に通す関数を 1 つ足し、まとめ頁の行と読み物の頁の行の 2 か所で通す。原稿の行の上で「`- **名前**: `」の塊（同じ字下げ・空行なし・入れ子とコードブロック無し・2 行以上）を見つけ、A1（Markdown の表を印の付いた `div` で包む）か A2（HTML の表）に書き換える
- **Compatibility**: `add_markers()`・`mark_manual()` と同じ「行を見てコードブロックを飛ばす」型で、既存の型に沿う。`_raw/`・`llms.txt`・検査は変わらない。`requirements.txt`・`pages.yml` は変わらない
- **Trade-offs**:
  - ✅ brief の「変えるファイル」の中に収まる。手元と CI の手順が変わらない
  - ✅ 目印を付ける後処理を `prepare_site.py` に置く、という `structure.md` と `site-look-list-markers`・`site-look-manual-files` の型にそろう
  - ❌ 行の上の見分けは、Markdown の解釈（字下げ・続きの行・`mdx_truly_sane_lists`）を真似る。今は 477 で HTML と合うが、原稿の書き方が変わるとずれうる（Revalidation Triggers に入れる）
  - ❌ 表の中のエスケープ（A1 の `|`、A2 の `<`・`&`）と続きの行の扱いを、字が変わらないことの確かめで守る

### Option B: 自作の Markdown 拡張（brief の案 (b)）
- **やること**: treeprocessor を書き、HTML の木の上で、試作と同じ判定で `ul` を `table` に替える。`mkdocs.yml` の `markdown_extensions` に足す
- **Compatibility**: 判定が試作の `mockup.js` と同じ木の上なので、数がそのまま合う。説明の中の書式は Markdown が読んだ後なので、エスケープの心配が無い
- **Trade-offs**:
  - ✅ 判定が HTML の木の上で、原稿の書き方の揺れに強い
  - ❌ 今の `zensical build` から import できない（Research Log）。`pages.yml` に `PYTHONPATH` を足すか、`requirements.txt` から入れる形にする要があり、brief の変えるファイルの外に出る。`ukadoc-spec/CLAUDE.md` の確かめの手順も変わる
  - ❌ `prepare_site.py` の `old_ids()` など、手元の Markdown の変換には入らない（今は困らない）。Zensical の版を上げたときに、拡張の読み込み方が変わる恐れ

### Option C: 組み合わせ（`prepare_site.py` で印、ブラウザかテンプレートで表）
- **やること**: `prepare_site.py` が箇条書きに印だけを付け、表への組み替えはブラウザの仕掛け（`assets/*.js`）か CSS の格子で見せる
- **Trade-offs**:
  - ✅ HTML の変わる量が小さい
  - ❌ brief の決めた方向（「組み立ての処理で表の HTML にする」「本番は組み立ての処理で行う」）から外れる。スクリプトが動かないときに表にならない。CSS だけで箇条書きを表に見せると、見出しの行や Material の表の見た目が出ない
  - 方向を議論し直さない決まり（brief の Constraints）があるので、比べのために挙げるだけで、推さない

## Implementation Complexity & Risk
- **Effort**: M（3〜7 日）。処理そのものは 1 つの関数と CSS の 1 つの塊だが、477 個・2105 行の字が変わらないことの確かめ、20 頁＋`manual/ghost` の 375 px、明・暗の画面（目標の 3 か所と、写っていない置き場所）、ほかの spec の目印の数え直しが重い
- **Risk**: Medium。案 A は既存の型に沿うが、行の上の見分けと表の中のエスケープで字が変わる恐れがあり、全数の字の照合で守る。案 B を選ぶと CI と手順の変更が加わり High 寄りになる

## Recommendations for Design Phase
- **推す方向**: Option A（`prepare_site.py`）。brief の変えるファイルに収まり、`site-look-list-markers`・`site-look-manual-files` の後処理と同じ所・同じ型に置ける。書き方は A1 と A2 を設計で比べる（A1 は表に `class` が付かず Material の包みがそのまま効く。A2 は表そのものに属性の印を付けられ、`site-look-sstp-playback` が見分けやすい）
- **設計で決めること**:
  - 表の印の名前と付け所（包みの `div` の class か、表の属性か）。`structure.md` の「`<頁の種類>-<役>` の class」の決まりと、`table:not([class])` の制約のすり合わせ
  - 関数を `add_markers()`・`mark_manual()` の前に通すか後に通すか（今の原稿ではどちらでも manual の頁は 0 個。`mark_manual()` の後なら manual の項目は形の上でも外れる）
  - 表の中のエスケープと続きの行のつなぎ方、名前の列の太字を `strong` のまま残すか CSS で付けるか
  - 未決の問い 3 の答えに沿った CSS の塊（幅・字の大きさ・余白・45em の境・`overflow-wrap`）
- **Research Needed**:
  - 縞の地（`tr:nth-child(2n)` の地）の上の字とリンクの明・暗の対比（試作では測っていない）
  - 表の中の検索の強調（`mark`）が明・暗で見えるか
  - `site-look-note-icon` の `.bundle-notes > :first-child` の絵と、箱の中の表がぶつからないか（箱の最初の子は見出しなので、当たらない見込み）
  - 印刷のときの `.md-typeset__table`（`display:block` に替わる指定がある）と、表の幅・折り返し
  - Revalidation Triggers の候補: 原稿に、行の続け方の新しい書き方（空行を挟む続き、`<br />` 無しの続きの行）や、名前の後ろの区切りの揺れが入ったとき、HTML の判定と行の判定の数を照らし直す
