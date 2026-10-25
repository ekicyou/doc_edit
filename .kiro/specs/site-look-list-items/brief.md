起票元: site-look-plan の決定（.kiro/specs/completed/site-look-plan/decisions.md、2026-10-25）から

# Brief: site-look-list-items

## Problem
ゴースト制作者がまとめ頁（`list/`・`descript/`・`spec/` の 1 頁にまとめた頁）で仕様を引くとき、項目の切れ目と記述例がひと目で見分けにくい。
項目名は `code` の灰色の小さな地だけで本文と見分けにくく（`survey.md` の D01・D08）、項目の間が空きすぎて高さ 700 の画面に 3 項目しか入らない（D08）。
分類の見出しも本文の見出しと同じ見え方で、分類の始まりが遠くから分からない（D06）。
記述例は灰色の地のコードブロックが置かれるだけで、項目の説明の文と分かれて見えず（D03。開発者の指摘「記述例のさくらスクリプト部が、分かりにくい」）、折り返した長い行がコピーのボタンの下に重なる（D03・D19）。

## Current State
- `assets/extra.css` は約 20 行（テーマの紺・目次の一覧の詰め・記述例の `pre > code` の折り返し `white-space: pre-wrap; word-break: break-all`）
- 項目名は `h3`、分類の見出しは `h2`、記述例の見出しは `h4`（「記述例」。目次には出ない）。`prepare_site.py` がまとめ頁の項目の間に `<hr />` を入れる（`list/sakura-script` で 374 個）
- 注意書きの節（原稿の `notes_*.md`）の見出しは `id` が `notes_` で始まる `h2`（頁の頭）か `h3`（分類の中、`list/sakura-script` に 12 個）である
- コードブロックは今 `<div class="highlight"><pre><span></span><code>` の形で、`site-look-sakura-script-highlight` が `pymdownx.highlight` を足すと `<pre class="highlight"><code>` の形に変わる
- `site-look-plan` の試作で、5 つの候補の見え方を明・暗と 375 px で確かめた（`mockups/README.md`）

## Desired Outcome
決めた方向（`decisions.md` の判断。どれも開発者の「以下を除き承認」（2026-10-25）により推奨のとおり）:
- **C01 項目名を帯で囲む**（判断: 採る）: 左の太い線・下の線・薄い地の帯にし、帯の中の `code` の地は消す。目標の画面: `.kiro/specs/completed/site-look-plan/screenshots/mock-sakura-script-C01-light.png`・`.kiro/specs/completed/site-look-plan/screenshots/mock-sakura-script-C01-dark.png` の項目名の帯
- **C02 項目の間を詰める**（判断: 採る）: `hr`・`h3` の余白に加えて段落の上下の余白まで詰め、高さ 700 に 4 項目以上入れる。詰めるのはまとめ頁の項目の中に絞り、切れ目は C01 の帯と重ねて保つ。目標の画面: `.kiro/specs/completed/site-look-plan/screenshots/mock-descript-ghost-C02-light.png`・`.kiro/specs/completed/site-look-plan/screenshots/mock-descript-ghost-C02-dark.png` の項目の並びの密度
- **C03 分類の見出しを濃い帯にする**（判断: 採る）: テーマの紺の地に白い太い字（明・暗とも 8.31:1）。注意書きの `h2` は除く。目標の画面: `.kiro/specs/completed/site-look-plan/screenshots/mock-sakura-script-C03-light.png`・`.kiro/specs/completed/site-look-plan/screenshots/mock-sakura-script-C03-dark.png` の画面の下の「スコープコマンド」の帯
- **C09 コピーのボタンの下に字を重ねない**（判断: 採る）: コードの右の内側の余白をボタンの幅の分だけ広げ、ボタンの手前で折り返す。目標の画面: `.kiro/specs/completed/site-look-plan/screenshots/mock-sakura-script-C09-light.png`・`.kiro/specs/completed/site-look-plan/screenshots/mock-sakura-script-C09-dark.png` の記述例の右端の折り返し
- **C18 記述例を強く目立たせる**（判断: 採る。開発者の付け足し「さくらスクリプトページ以外にも、さくらスクリプトの記述例があるが、これも同様に強調すること」）: 「記述例」を濃い紺の帯の白い字（明 11.39:1・暗 8.31:1）にし、続くコードブロックに左の太い線と薄い紺の地を付ける。目標の画面: `.kiro/specs/completed/site-look-plan/screenshots/mock-sakura-script-C18-light.png`・`.kiro/specs/completed/site-look-plan/screenshots/mock-sakura-script-C18-dark.png` の記述例の箱。さくらスクリプトの頁の外の記述例（`.kiro/specs/completed/site-look-plan/screenshots/mock-propertysystem-C25-light.png`・`.kiro/specs/completed/site-look-plan/screenshots/mock-propertysystem-C25-dark.png`）も同じ箱に見える
- 採らなかった組: C08（控えめな記述例の箱）は C18 と両立しない組の採らなかった方で、この spec では作らない
- 目標の画面のいくつかは、ほかの候補も `?slp=` に入れて撮ったもの（例: C18 は `?slp=C01,C06,C09,C10,C17,C18`）である。タグの色（C10・C20 など）や対応の札（C06）は後続の spec の受け持ちで、この spec の目標は上に書いた部分の見え方である
- 画面は、`site-look-plan` の完了（2026-10-25）で `.kiro/specs/completed/site-look-plan/screenshots/` の下に移った（上のパスは移った後のもの）

## Approach
見た目の指定（`assets/extra.css`）を主にし、効く所をまとめ頁の項目に絞る目印が要るときだけ `scripts/prepare_site.py` に目印を足す（目印を付ける後処理は、それを使う見た目の改造と同じ spec に入れてよい。`roadmap.md` の切り分けの規則）。
- C01: `h3` の帯。サイト全体の `h3`（`spec/`・`memo/` の節など）に効くので、項目だけに絞る（`hr + h3` か `prepare_site.py` の目印）かをこの spec で決める。注意書きの節の `h3`（`id^="notes_"`）は除く
- C02: まとめ頁の項目の中だけ段落・`hr`・`h3` の余白を詰める（`manual/` などの読み物の頁は詰めない）
- C03: まとめ頁の分類の `h2` に絞る目印の要否を決める（`manual/` の節の `h2` を帯にしない）。`h2:not([id^="notes_"])`
- C09: `.md-typeset pre > code` の右の余白（今の形と `pre.highlight > code` の両方に効く書き方）
- C18: `h4:has(+ .highlight)` と続く `.highlight`（目印は要らない）。今の `div.highlight` の形と、着色の後の `pre.highlight` の形の両方に効く書き方にする

## Scope
- **In**:
  - C01・C02・C03・C09・C18 の見た目の指定（`assets/extra.css`）
  - 効く所をまとめ頁の項目・分類に絞る目印（要るときだけ `scripts/prepare_site.py`）
  - 明・暗の画面と 375 px の確かめ
- **Out**:
  - 注意書きの箱・対応の札・既定値の札（`site-look-list-markers`）
  - さくらスクリプトのタグの色・太字・地（`site-look-sakura-script-highlight`）
  - `manual/` の頁のファイル名の帯（`site-look-manual-files`。C01 の帯を使う）
  - C08（採らない）

## Boundary Candidates
- 見た目の指定だけで済む所（C09・C18）と、効く所を絞る目印が要る所（C01・C02・C03）
- 項目の見え方（C01・C02）と、分類の見え方（C03）と、記述例の見え方（C09・C18）
- 効く所の絞り方（`hr + h3` のような組み立ての形か、`prepare_site.py` の目印か）は、後続の `site-look-list-markers` の目印の付け方とそろえられる形にする

## Out of Boundary
- 原稿（`.md`）・`.nav.yml`・`requirements.txt`・Zensical の版
- `mkdocs.yml` の `markdown_extensions`（`pymdownx.highlight` は `site-look-sakura-script-highlight` が足す）
- テーマの色そのものと、暗い表示のリンクの色（`site-look-dark-link-color`）

## Upstream / Downstream
- **Upstream**: `site-look-plan`（判断と目標の画面）。ukadoc-spec の `afb2152` の `assets/extra.css`・`scripts/prepare_site.py`
- **Downstream**: `site-look-list-markers`（C04 の箱が、C01・C03 が `notes_` の見出しを帯から除くことに依る）、`site-look-manual-files`（C22 が C01 の項目名の帯を使う）

## Existing Spec Touchpoints
- **Extends**: なし（新しい spec）
- **Adjacent**: `site-look-dark-link-color`（同じ `assets/extra.css` を触る。どちらが先でもよく、ぶつかったら `origin/main` に追いつく）、`site-look-sakura-script-highlight`（C09・C18 の当て先のコードブロックの HTML を変える。C09・C18 は着色の前後どちらの HTML にも効く書き方にするので、どちらが先でもよい）、`site-look-list-markers`（同じまとめ頁に目印を付ける。注意書きの節の見出しを除く書き方を合わせる）

## Constraints
- **方向は議論し直さない**: 候補と判断は `site-look-plan` の `decisions.md` で決まっている。この spec は、決まった見え方を本番の書き方で入れる
- **原稿は変えない**: 変えるのは ukadoc-spec の `assets/extra.css`（と要るときだけ `scripts/prepare_site.py`）で、原稿（`.md`）・`.nav.yml`・`requirements.txt`・Zensical の版は変えない。ただし ukadoc-spec を変えるので、`workflow.md` の「原稿を変えない spec」には当たらない。作業木 `.worktrees/site-look-list-items/` で書き、Build Gate（`prepare_site.py` と `zensical build --strict`）と規約 Gate を通し、`/kiro-complete` で PR にする
- **土台**: ukadoc-spec の `origin/main` の `afb2152`（テーマの色は紺 `#1f4e8c`）。中身で依る後続 spec は無く、ほかの後続 spec（`site-look-dark-link-color`・`site-look-sakura-script-highlight` など）は先に入っていても、まだでもよい。ukadoc-spec のライセンスは `afb2152` で CC BY 4.0 と定まった
- **旧サイトの素材**: 旧サイト（https://ssp.shillest.net/ukadoc-legacy/manual/ ）の見せ方は手本にするが、画像・見た目の指定（`list.css`・`base.css`）・スクリプト（`sakura_player.js` など）は再利用の許可が明記されていない。写さずに書き直し、色・寸法は今のサイトの明・暗の色に合わせて決め直す
- **Zensical 0.0.67 の制限**: テンプレートは minijinja で描画する。partial を丸ごと写さず、CSS とブロックの上書きにとどめる。`build --strict` は、存在しない `extra_css` を指定しても検出しない
- **試作で確かめた事実**:
  - 暗い表示の印 `data-md-color-scheme="slate"`（明るい表示は `default`）は `<html>` でなく `<body>` に付く。暗い表示だけの色は `[data-md-color-scheme="slate"] .md-typeset …` の形で書く
  - 色はテーマの色の変数（`--md-primary-fg-color`・`--md-primary-fg-color--dark`（今は `#163a69`）・`--md-primary-bg-color`・`--md-default-fg-color--lighter`・`--md-default-fg-color--lightest` など）から取り、直書きしない。試作の途中でテーマの色が緑から紺に変わり、C18 の緑の直書きを変数に替えた。変数で出せない色（C18 の薄い紺の地 `#eef2f8`、暗い表示の線 `#7fa6dc` と地 `#1d2433`）は、明・暗それぞれで対比を測って記録する
  - `pymdownx.highlight`（`use_pygments: false`）を足すと、全 449 コードブロックの HTML が `div.highlight > pre > code` から `pre.highlight > code` に変わる（見た目の差は出なかった）。C09・C18 の指定は両方の形に効く書き方にし、`site-look-sakura-script-highlight` が先に入っても後に入っても効くようにする（試作の C08・C18 は `:is(h4, .highlight) + .highlight` と `div.highlight > pre` の両方を書いた）
  - C02 は `hr`・`h3` の余白だけでは高さ 700 に 3 項目半しか入らず、段落の上下の余白（`.5em`）まで詰めて 4 項目と 5 つ目の項目名が入った。段落の余白はサイト全体に効くので、まとめ頁の項目の中に絞る
  - C03 の帯の中の `code` と `a.headerlink`（¶）も読める色にした（試作は `--md-primary-bg-color--light`）
  - `prepare_site.py` で目印 `{: .cls }` を付けるなら、段落の末尾（空行の手前）に限る（1 行目の直後に足すと `<br />` で続く段落で本文に漏れた）。見出しの数の検査（`old_ids`）と `build --strict` には響かない
  - `extra.css` の URL に版の印が無いので、開発者のブラウザに古い写しが残ることがある。見せる前に強制の再読み込み（Ctrl+F5）を頼む
- **表示の確かめ方**:
  - `serve` は `_site_src/` を見る（`docs_dir: _site_src`）ので、リポジトリ直下の `assets/`・`scripts/` を直したら `python scripts/prepare_site.py` を流し直す。`zensical serve` を動かしたまま流すと、書きかけの `_site_src/` を拾って壊れることがある（試作で `extra.css` が 404 になった）。`serve` を止めてから `prepare_site.py` と `zensical build --strict` を流し、起動し直す
  - `zensical serve` の頁の HTML を取ってきて、足した目印の数を確かめる。頁の道は `/ukadoc-spec/` から始まる（`site_url` が `https://ukatech.shillest.net/ukadoc-spec/`）
  - 明・暗の画面は `node .kiro/specs/completed/site-look-plan/tools/shot.mjs <url> <selector> <out> light|dark [width] [height]`（既定 1000×700）で撮り、目標の画面と同じセレクタ（C01・C09・C18 は `#bang-lock-repaint`、C03 は `#notes_escape`、C02 は `descript/ghost` の `#charset`）で見比べる（`site-look-plan` の完了の前は `.kiro/specs/completed/site-look-plan/tools/shot.mjs`）。標準出力に `wrote`・`scrollWidth`・`innerWidth` が出る
  - 狭い画面: `node .kiro/specs/completed/site-look-plan/tools/shot.mjs <url> body - light 375` で、`scrollWidth` と `innerWidth` が同じ（375）ことを確かめる。狭い画面の画面は残さない
  - `shot.mjs` はまれに（54 枚に 5 枚）撮る途中の描き直しで二重に重なった PNG を書く。左右の端にヘッダの色の行が上の端以外にも出ていたら撮り直す。`#notes_escape` の位置では、ヘッダの題が切り替わりの途中で重なって写ることがある（本文には響かない）
- **失わないもの**（`survey.md` の「失わないもの」）: D15 検索（頭の帯の検索の欄と結果の語の強調を隠さない）・D16 ダークモード（色は明・暗の両方で決め、どちらでも字と地の差が十分にある）・D17 見出しへのリンク（帯にする見出しの id・`a.headerlink`（¶）・右の欄の目次を変えない）・D18 狭い画面（幅 375 で `scrollWidth` = `innerWidth`）・D19 コードのコピー（コピーのボタンを残し、コピーされる字を変えない。C09 の主題）・D20 記述例の字（記述例の `\` を `\` のまま見せる）
- **参考の試作**: `.kiro/specs/completed/site-look-plan/mockups/extra.css` の C01・C02・C03・C09・C18（`html[data-slp~="Cxx"]` の下の使い捨ての指定）と `mockups/README.md` の測り。写さずに書き直してよい
- **小さな PR**: 他者も使う公開リポジトリへの PR なので、この brief の候補の外に広げない
