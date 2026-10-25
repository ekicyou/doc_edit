起票元: site-look-plan の決定（.kiro/specs/completed/site-look-plan/decisions.md、2026-10-25）から

# Brief: site-look-manual-files

## Problem
`manual/` の頁（例: `manual/ghost`「ゴースト」）で、ファイルごとの説明の切れ目が分かりにくい。
ファイルごとの箇条書き「`**ファイル名**: 説明`」は、ファイル名が説明の文の頭に埋もれ、どこからどこまでが 1 つのファイルの説明かが追いにくい（`survey.md` の D12・D11）。
開発者は「ゴーストの作り方、例えば「descript.txt」は、SHIORI Event でいう OnBoot などと同じ装飾で。今はのっぺりしてる」と指摘した。
ファイル構成の木（言語指定の無いコードブロック）でも、ファイルとフォルダが同じ字で見分けにくい（D13。旧サイトは `em.filename` でファイル名に色を付けていた）。

## Current State
- `manual/ghost` のファイルごとの箇条書きは、空行のため 1 項目ずつ別の `<ul>` になっている。説明が 2 つ以上の段落になる項目が多い
- 同じ形の箇条書き（頭が太字の名前）は `spec/shiori3` のヘッダなどほかの頁にもあるので、見た目の指定だけでは効く頁を `manual/` に絞れない。今の HTML に頁の種類の印は無い
- ファイル構成の木は言語指定の無いコードブロックで、中の字に目印を付けられない。`site-look-sakura-script-highlight` が `pymdownx.highlight` を入れると `<pre class="highlight"><code>`（言語の class 無し）の形になる。この spec とどちらが先に入るかは決めていない
- `site-look-list-items` の C01（項目名の帯）が入った後である。`site-look-list-markers` の C17 は C06 の札にだけ色を当て、木のファイル名には当てない（木のファイル名の明るい表示の濃さは、この spec が C15 と一緒に入れる）

## Desired Outcome
決めた方向（`decisions.md` の判断。どれも開発者の「以下を除き承認」（2026-10-25）により推奨のとおり）:
- **C14 ファイルごとの説明の切れ目を見せる**（判断: 採る）: ファイル名を 1 行に置き、説明を字下げし、ファイルの間を分ける。名前の後ろの「`: `」は見せない。目標の画面: `.kiro/specs/completed/site-look-plan/screenshots/mock-manual-ghost-C14-light.png`・`.kiro/specs/completed/site-look-plan/screenshots/mock-manual-ghost-C14-dark.png` のファイル名の行・字下げした説明・ファイルの間の線（線は C22 の帯に置き換わる）
- **C15 ファイル構成の木でファイル名に色を付ける**（判断: 採る）: 木のファイル名（`manual/ghost` で 11 個）に色を付け、フォルダ（3 個）と見分ける。字・コピーされる字・コピーのボタンは変えず、仕掛けが動かなければ今のまま。目標の画面: `.kiro/specs/completed/site-look-plan/screenshots/mock-manual-ghost-C15-light.png`・`.kiro/specs/completed/site-look-plan/screenshots/mock-manual-ghost-C15-dark.png` の木のファイル名の色（画面の明るい表示はテーマの色の変数 `--md-primary-fg-color` で今は紺、暗い表示は緑のテーマの時に決めた直書きの `#81c784` の緑。暗い表示の色は紺のテーマに合わせて決め直し、明るい表示は C17 と同じ物差し（白地とコードブロックの地に 7:1 以上）で、この spec が決め直す。試作で C17 の行にあった木のファイル名の濃さ（`.slp-tree-file`）は、`site-look-list-markers` から移してこの spec で入れる）
- **C22 ゴーストの作り方のファイル名を項目名と同じ帯にする**（判断: 採る）: `descript.txt` などのファイル名を、C01 の項目名（SHIORI Event の `OnBoot` など）と同じ帯にする。帯の中のリンクは項目名と同じ字の色にする。目標の画面: `.kiro/specs/completed/site-look-plan/screenshots/mock-manual-ghost-C22-light.png`・`.kiro/specs/completed/site-look-plan/screenshots/mock-manual-ghost-C22-dark.png` のファイル名の帯（セレクタ `.md-typeset > ul`、高さ 900 で撮った）
- `manual/` の頁（8 頁）だけに効き、ほかの頁の頭が太字の箇条書きは今のまま
- 目標の画面は、ほかの候補も `?slp=` に入れて撮ったものがある（C22 は採るものをほぼ全部入れた）。この spec の目標は上の部分の見え方である
- 画面は、`site-look-plan` の完了（2026-10-25）で `.kiro/specs/completed/site-look-plan/screenshots/` の下に移った（上のパスは移った後のもの）

## Approach
頁の種類の印（テンプレートの上書きか `prepare_site.py`）と、ファイル名の「`: `」を外す目印を、それを使う見た目の改造と同じ spec に入れる（`roadmap.md` の切り分けの規則）。
- 頁の種類の印: `overrides/main.html` のブロックの上書き（`{% block … %}{{ super() }}…`）で本文の要素に `manual/` の頁の印を付けるか、`prepare_site.py` で付ける。試作の `:has(h1#ゴースト)` は 1 頁に絞る代わりで、本番では使わない
- C14・C22: 印の付いた頁の、ファイルごとの箇条書きの頭の `strong` を 1 行の帯にし、説明を字下げする。「`: `」は `prepare_site.py` かテンプレートで外す（試作の、地の色の四角で覆う細工は字の大きさでずれうるので使わない）。C22 の帯は C01 と同じ見た目（左の太い線・下の細い線・薄い地・`h3` と同じ字の大きさ）で、C14 のファイルの間の線は外す。説明の無い `updates2.dau`（`li > strong:only-child`）の帯もほかと揃える（試作は 6 px ずれた）
- C15: 小さな自作のスクリプト（`extra_javascript`）で、言語の印の無いコードブロックのうち「`+-`」で始まる行のあるものを見て、名前に拡張子があればファイル、無ければフォルダとして色の要素で包む。ファイル名の色（明るい表示の濃さを含む）は、包む要素と同じくこの spec の `extra.css` の指定で決める。視認性の候補なので、この spec に入れてよい（遊びの規則には当たらない）

## Scope
- **In**:
  - `manual/` の頁の種類の印（`overrides/` のテンプレートの上書きか `scripts/prepare_site.py`）と、`mkdocs.yml` の `theme.custom_dir`（テンプレートの上書きにするとき）
  - ファイル名の「`: `」を外す目印
  - C14・C22 の見た目の指定（`assets/extra.css`）
  - C15 のスクリプト（`assets/` の自作のスクリプトと `extra_javascript`）とファイル名の色（明るい表示の濃さは、`site-look-list-markers` の C17 から移した分）
  - 明・暗の画面と 375 px の確かめ
- **Out**:
  - `updates2.dau` と `updates.txt` が 1 つの説明を共有している見え方（D12。原稿の書き方によるもので、この spec では直らない。roadmap のバックログ）
  - `spec/shiori3` のヘッダの値を列にそろえること（C16。保留で、roadmap のバックログ。頁の種類の印は共有できる形にしておく）
  - キャラクターを頁に出すこと（C12。保留）

## Boundary Candidates
- 頁の種類の印（後で C16 や C12 も使いうる共通の仕組み）と、それを使う見た目（C14・C22）
- 箇条書きの見た目（C14・C22）と、コードブロックの中の色（C15 のスクリプト）

## Out of Boundary
- 原稿（`.md`）・`.nav.yml`・`requirements.txt`・Zensical の版
- `manual/` の外の頁の箇条書き（「名前: 説明」の表は `site-look-definition-tables`）
- 言語指定の無いほかのコードブロック（ファイル構成の木の外）の着色

## Upstream / Downstream
- **Upstream**: `site-look-list-items`（C22 が C01 の項目名の帯を使う）。`site-look-plan`（判断と目標の画面）
- **Downstream**: `site-look-definition-tables`（`manual/` のファイルの箇条書き（C14・C22 の当て先）を表にしないことを、この spec の後に確かめる。同じ PR の単位 `site-look-manual-and-tables`）

## Existing Spec Touchpoints
- **Extends**: なし（新しい spec）
- **Adjacent**: `site-look-list-items`（C01 の帯）、`site-look-list-markers`（C17 と同じ「明るい表示は白地に 7:1 以上」の物差しで、木のファイル名の濃さを決める。同じ `assets/extra.css`・`prepare_site.py` を触るが、どちらが先でもよく、ぶつかったら `origin/main` に追いつく）、`site-look-sakura-script-highlight`（同じコードブロックにスクリプトを当てる。C15 の仕掛けは、`pymdownx.highlight` の前後どちらのコードブロックの HTML（`pre > code`・`pre.highlight > code`）にも効く書き方にするので、どちらが先に入ってもよい）、`site-look-definition-tables`（同じ形の箇条書きを表にする処理と当て先を分ける）

## Constraints
- **方向は議論し直さない**: 候補と判断は `site-look-plan` の `decisions.md` で決まっている。この spec は、決まった見え方を本番の書き方で入れる
- **原稿は変えない**: 変えるのは ukadoc-spec の `assets/`・`scripts/prepare_site.py`・`mkdocs.yml`・`overrides/` で、原稿（`.md`）・`.nav.yml`・`requirements.txt`・Zensical の版は変えない。ただし ukadoc-spec を変えるので、`workflow.md` の「原稿を変えない spec」には当たらない。作業木 `.worktrees/site-look-manual-files/` で書き、Build Gate（`prepare_site.py` と `zensical build --strict`）と規約 Gate を通し、`/kiro-complete` で PR にする
- **土台**: ukadoc-spec の `origin/main` の `afb2152`（テーマの色は紺 `#1f4e8c`）の上に、中身で依る `site-look-list-items` が入った版（`site-look-lists` の PR のマージの後に始める）。ほかの後続 spec（`site-look-dark-link-color`・`site-look-sakura-script-highlight` など）は先に入っていても、まだでもよい（`site-look-list-markers` は `site-look-list-items` と同じ PR の単位なので、ふつうは一緒に入っている）。ukadoc-spec のライセンスは `afb2152` で CC BY 4.0 と定まった
- **旧サイトの素材**: 旧サイト（https://ssp.shillest.net/ukadoc-legacy/manual/ ）の `em.filename` の見せ方は手本にするが、画像・見た目の指定（`list.css`・`base.css`）・スクリプト（`sakura_player.js` など）は再利用の許可が明記されていない。写さずに書き直す
- **Zensical 0.0.67 の制限**: テンプレートは minijinja で描画する。partial を丸ごと写さず、CSS とブロックの上書きにとどめる。`theme.custom_dir: overrides` と `overrides/main.html` の `{% extends "base.html" %}`・`{% block content %}…{{ super() }}…{% endblock %}` は通り、`custom_dir` はリポジトリ直下の `overrides/` で効く（`_site_src/` に写さなくてよい）。`extra_javascript` も通る。`build --strict` は、存在しない `extra_css` を指定しても検出しない（足したファイルが `serve` で 200 になることを確かめる）
- **試作で確かめた事実**:
  - C14 の試作は、最初の段落を `display: flex; flex-wrap: wrap` にして頭の `strong` を 1 行目に置いた。`float` では 1 行目に隙間ができ、「`: `」が本文の幅の外に残った
  - 「`: `」は字の要素でないので見た目の指定では消せない（試作は負の字下げと地の色の四角で覆った）。本番は目印で外す。字を外しても検索で引ける名前と説明の字は変えない
  - この頁の箇条書きは 1 項目ずつ別の `<ul>` なので、`li:first-child` は全項目に効く
  - C22 の帯の中のリンクは、暗い表示でリンクの色が帯の地に沈んだので、項目名と同じ字の色（`--md-default-fg-color`）にした
  - C15 は `textContent` から作り直し、包んだ後の `textContent` が元と同じことを確かめる形にした（コピーされる字は変わらない）。`manual/ghost` の木の「`+-`」の 14 行で、ファイル 11（`descript.txt`・`shiori.dll`・`(saori).dll`・`makoto.dll`・`updates2.dau`・`updates.txt`・`*.ico`・`*.cur`・`thumbnail.png`・`ai0.png`・`ai0_dark.png`）、フォルダ 3（`(myghost)`・`ghost`・`master`）
  - `pymdownx.highlight` の後、言語指定の無いブロックは `<pre class="highlight"><code>`（言語の class 無し）になる。C15 の当て先の選び方は、入る前の形（`pre > code`）と入った後の形（`pre.highlight > code`）のどちらにも効くようにする（試作の `pre > code:not([class*="language-"])` はどちらにも合う）
  - 暗い表示の印 `data-md-color-scheme="slate"`（明るい表示は `default`）は `<html>` でなく `<body>` に付く。暗い表示だけの色は `[data-md-color-scheme="slate"] .md-typeset …` の形で書く
  - 色はテーマの色の変数（`--md-primary-fg-color`・`--md-default-fg-color--lighter`・`--md-default-fg-color--lightest` など）から取り、直書きしない。試作の C15 の色（明 `--md-primary-fg-color`（今は紺）、暗 `#81c784`（緑のテーマの時の直書き）、C17 の明 `#185a1c`）は緑のテーマの時点で決めたもので、テーマが紺に変わった（`417511c`）ので決め直す。変数で出せない色は、明・暗それぞれでコードブロックの地との対比を測り、明るい表示は C17 と同じ物差しで 7:1 以上にする（`site-look-list-markers` の C17 の指定は木のファイル名に色を当てないので、どちらが先に入っても色の勝ち負けは変わらない）
  - `extra.css` の URL に版の印が無いので、開発者のブラウザに古い写しが残ることがある。見せる前に強制の再読み込み（Ctrl+F5）を頼む
- **表示の確かめ方**:
  - `serve` は `_site_src/` を見る（`docs_dir: _site_src`）ので、リポジトリ直下の `assets/`・`scripts/` を直したら `python scripts/prepare_site.py` を流し直す。`zensical serve` を動かしたまま流すと、書きかけの `_site_src/` を拾って壊れることがある（試作で `extra.css` が 404 になった）。`serve` を止めてから `prepare_site.py` と `zensical build --strict` を流し、起動し直す
  - `zensical serve` の頁の HTML を取ってきて、頁の種類の印が `manual/` の 8 頁にだけあること、「`: `」の目印、スクリプトの読み込みを数える。頁の道は `/ukadoc-spec/` から始まる（`site_url` が `https://ukatech.shillest.net/ukadoc-spec/`）
  - 明・暗の画面は `node .kiro/specs/completed/site-look-plan/tools/shot.mjs <url> <selector> <out> light|dark [width] [height]`（既定 1000×700）で撮り、目標の画面と同じセレクタ（C14・C15 は `h1#ゴースト`、C22 は `.md-typeset > ul` で高さ 900）で見比べる（`site-look-plan` の完了の前は `.kiro/specs/completed/site-look-plan/tools/shot.mjs`）。標準出力に `wrote`・`scrollWidth`・`innerWidth` が出る
  - 狭い画面: `node .kiro/specs/completed/site-look-plan/tools/shot.mjs <url> body - light 375` で、`scrollWidth` と `innerWidth` が同じ（375）ことを確かめる。`manual/` の 8 頁を測る。狭い画面の画面は残さない
  - `shot.mjs` はまれに（54 枚に 5 枚）撮る途中の描き直しで二重に重なった PNG を書く。左右の端にヘッダの色の行が上の端以外にも出ていたら撮り直す
- **失わないもの**（`survey.md` の「失わないもの」）: D15 検索（検索で引ける字を変えない）・D16 ダークモード（色は明・暗の両方で決め、どちらでも字と地の差が十分にある）・D17 見出しへのリンク（見出しの id・`a.headerlink`（¶）・右の欄の目次を変えない）・D18 狭い画面（幅 375 で `scrollWidth` = `innerWidth`）・D19 コードのコピー（木のコピーのボタンを残し、コピーされる字を変えない）・D20 記述例の字（記述例の `\` を `\` のまま見せる）
- **参考の試作**: `.kiro/specs/completed/site-look-plan/mockups/extra.css` の C14・C15・C22 と C17 の `.slp-tree-file` の 1 行（`html[data-slp~="Cxx"]` の下の使い捨ての指定）、`mockups/mockup.js` の C15・C22 の分岐、`mockups/overrides/main.html`（C12 のテンプレートの上書き。ブロックの上書きの書き方の参考）、`mockups/README.md` の測り。写さずに書き直してよい
- **小さな PR**: 他者も使う公開リポジトリへの PR なので、この brief の候補の外に広げない
- **続きの PR の説明**（開発者の指示、2026-10-25）: PR の説明に、この PR が UKADOC の見た目を旧サイト並みの見やすさに近づける一連の PR（`site-look-plan` の決定を切った 6 本）の 1 本であり、続きの PR を順に出すことを書く。一連の PR とその並びは `.kiro/steering/roadmap.md` の「PR の単位」と「Specs」による（今の見込み: `site-look-dark-link-color` → `site-look-lists` と `site-look-sakura-script-highlight` → `site-look-manual-and-tables` と `site-look-note-icon` → `site-look-sstp-playback`）。PR を出すときの roadmap に合わせて、出し済みの PR（番号）・この PR・この後に出す PR を短く並べ、メンテナが全体の中のどこにあるかを分かるようにする（最後の PR では、これで一連が終わることを書く）。あわせて、この PR だけで完結していて、続きを待たずにマージしてよいこと（先に出した PR に中身で依るときは、その PR を名指しする）を書く
