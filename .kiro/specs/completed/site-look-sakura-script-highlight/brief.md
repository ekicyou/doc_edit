起票元: site-look-plan の決定（.kiro/specs/completed/site-look-plan/decisions.md、2026-10-25）から

# Brief: site-look-sakura-script-highlight

## Problem
さくらスクリプトの記述例は、タグ（`\0`・`\s[10]`・`\![raise,…]`）と地の文が同じ色の字で並び、タグと台詞の切れ目が読みにくい。
開発者は試作を見て、「別モニタでの視認だと厳しい。青は太字にしないとダメかも」「青系なのが目立たない根本原因かもしれない」と指摘し、色だけでなく太字と薄い地も求めた。
さらに「さくらスクリプトページ以外にも、さくらスクリプトの記述例があるが、これも同様に強調すること」と求めた（例: `list/propertysystem` の `\![set,property,currentghost.seriko.cursor.scope(0).mouseuplist(Head).path,頭.cur]…`）。

## Current State
- 原稿の ```` ```sakurascript ```` のコードブロック（287 個）の言語名は HTML に残らない（`language-*` の class が 0 個）。`mkdocs.yml` は `markdown_extensions` を明示しているので、Zensical の既定の拡張一式（`pymdownx.highlight` を含む）は入らない
- Pygments にさくらスクリプトのレキサーは無い。`pygments_lang_class: true` だけでは `sakurascript` が `text` に落ち、言語指定の無いブロックと見分けられない（`research.md`）
- さくらスクリプトの頁の外にある記述例 6 個は、原稿のコードブロックに言語の指定が無い（`list/propertysystem` 5 個・`spec/plugin` 1 個）
- `site-look-list-items` の C18（記述例の箱）と C09（コピーのボタンの手前の折り返し）は、着色の前後どちらのコードブロックの HTML にも効く書き方で入るので、この spec より先に入っていても、まだでもよい。`site-look-list-markers` の C17 は C06 の札にだけ色を当て、この spec のタグ・環境変数には当てない

## Desired Outcome
決めた方向（`decisions.md` の判断。C10・C19〜C21 は開発者の「以下を除き承認」（2026-10-25）により推奨のとおり。開発者の付け足しの C25（さくらスクリプトの頁の外の記述例）は、原稿を変えるので外した（下の C25 の項））:
- **C10 さくらスクリプトに色を付ける**（判断: 採る）: 記述例のタグ（と環境変数）に色を付ける。色はタグと環境変数の 2 つまで。目標の画面: `.kiro/specs/completed/site-look-plan/screenshots/mock-sakura-script-C10-light.png`・`.kiro/specs/completed/site-look-plan/screenshots/mock-sakura-script-C10-dark.png` のタグの色（環境変数の色は画面に写っていない。タグの色そのものは C20 が置き換える）
- **C19 さくらスクリプトのタグを太字にする**（判断: 採る）: タグと環境変数を太字にする。折り返しの位置は変わらない。目標の画面: `.kiro/specs/completed/site-look-plan/screenshots/mock-sakura-script-C19-light.png`・`.kiro/specs/completed/site-look-plan/screenshots/mock-sakura-script-C19-dark.png` の記述例のタグ
- **C20 さくらスクリプトのタグの色を青から赤紫に替える**（判断: 採る）: タグを赤紫（試作は明 `#8a0d4f`・暗 `#f48fb1`）にし、地の字の青みの灰色と色相で分ける。目標の画面: `.kiro/specs/completed/site-look-plan/screenshots/mock-sakura-script-C20-light.png`・`.kiro/specs/completed/site-look-plan/screenshots/mock-sakura-script-C20-dark.png` の記述例のタグ
- **C21 さくらスクリプトのタグに薄い地を敷く**（判断: 採る）: タグと環境変数に、字の色を薄めた地を敷いて、面でかたまりに見せる。目標の画面: `.kiro/specs/completed/site-look-plan/screenshots/mock-sakura-script-C21-light.png`・`.kiro/specs/completed/site-look-plan/screenshots/mock-sakura-script-C21-dark.png` の記述例のタグ
- **C25 さくらスクリプトの頁の外の記述例も同じく強調する（外した）**: 判断は「採る」だったが、6 個に ```` ```sakurascript ```` を書き足すには原稿を変える。見た目の直しの 6 本の spec を 1 本の PR（`site-look-visibility`）にまとめ、その PR では原稿（Markdown）を変えないと開発者が決めた（2026-10-25）ので、この spec から外し、roadmap のバックログに移した。目標の画面（`.kiro/specs/completed/site-look-plan/screenshots/mock-propertysystem-C25-light.png`・`mock-propertysystem-C25-dark.png`）は、バックログから起票するときに使う。省略形の ```` ```ss ```` を `sakurascript` のエイリアスとして受けること（```` ```ss ```` のブロックも同じ言語の印と見え方になる）は、この spec に残す
- 明るい表示のタグ・環境変数の濃さ（`site-look-list-markers` の C17 から、この spec の作る字の分を移した）: 明るい表示で白地（と C18・C21 の地）に 7:1 以上にする。タグの色は C20 の赤紫が決め、環境変数は試作の明 `#7a2e0a` ほど（7:1 以上）に濃くする。目標の画面: `.kiro/specs/completed/site-look-plan/screenshots/mock-sakura-script-C17-light.png` の環境変数の濃さ（タグの色は C20 の画面）
- 目標の画面は、ほかの候補（C01・C06・C09・C17・C18 など）も `?slp=` に入れて撮ったものである。この spec の目標は、記述例のタグと環境変数の見え方である
- 画面は、`site-look-plan` の完了（2026-10-25）で `.kiro/specs/completed/site-look-plan/screenshots/` の下に移った（上のパスは移った後のもの）

## Approach
`site-look-plan` で確かめた道（Markdown 拡張とブラウザの仕掛け）を取る。Markdown 拡張を足す改造なので、見た目の改造と別の spec にした（`roadmap.md` の切り分けの規則）。
1. `mkdocs.yml` の `markdown_extensions` に `pymdownx.highlight`（`use_pygments: false`）を足す。`sakurascript` の 287 個が `<pre class="highlight"><code class="language-sakurascript">` になる。`pymdownx.highlight` は入っている pymdown-extensions の一部で、`requirements.txt` は変えない
2. `extra_javascript` の小さな自作のスクリプトで、`code.language-sakurascript` の字のタグと環境変数を色の要素（`span`）で包む。字は `textContent` から作り直し、包んだ後の `textContent` が元と同じであることを確かめる（コピーされる字を変えない）
3. `assets/extra.css` で、包んだ要素に C10・C19・C20・C21 の見た目（赤紫・太字・薄い地。明・暗）と、明るい表示のタグ・環境変数の濃さ（C17 から移した分）を当てる
4. （C25 は外した。言語の指定の無い 6 個の記述例には印が付かず、1〜3 の着色も届かない）
5. `ss` のエイリアス: ```` ```ss ```` のブロックにも ```` ```sakurascript ```` と同じ言語の印と見え方を与える。`mkdocs.yml` の highlight の設定で `ss` を `sakurascript` に寄せるか、スクリプトと `extra.css` で `language-ss` を `language-sakurascript` と同じに扱うかは、この spec の設計で決める。`ukadoc-spec/CLAUDE.md` の書式の決まりに、`ss` のエイリアスを書き足す

Pygments のレキサーを自作して `requirements.txt` で入れる道と、superfences の `custom_fences` に自作の関数を渡す道もある（`site-look-plan` の brief の選択肢）。どれにするかはこの spec の設計で決めてよいが、決めた方向（見え方）は変えない。

## Scope
- **In**:
  - `mkdocs.yml` の `pymdownx.highlight`（と、要るなら `scripts/prepare_site.py` の `EXTENSIONS` をそろえること）
  - タグと環境変数を包むブラウザの仕掛け（`extra_javascript` と、`assets/` の自作のスクリプト）と、その字句の規則
  - C10・C19・C20・C21 の見た目の指定と、明るい表示のタグ・環境変数の濃さ（`site-look-list-markers` の C17 から移した分）（`assets/extra.css`）
  - `ss` を `sakurascript` のエイリアスにすること（```` ```ss ```` のブロックに同じ言語の印と見え方）と、`ukadoc-spec/CLAUDE.md` の書式の決まりへの `ss` の書き足し
  - 全 449 コードブロックの HTML が変わることの確かめ（C09・C18・コピーのボタン・折り返し）
- **Out**:
  - 言語指定の無いほかのブロック（SSTP などの要求の例は 1 行目が `NOTIFY SSTP/1.1` などで外れる。`list/sakura-script` の `\![vanishbymyself]` の 1 例（旧サイトの `noplay`）は 1 行目が日本語で外れる。`manual/` のファイル構成の木は `site-look-manual-files`）
  - C25 の 6 個の記述例（原稿に言語の印を書き足す直し。roadmap のバックログ）
  - 記述例の再生のボタン（`site-look-sstp-playback`）
  - 等幅の字の指定の変更

## Boundary Candidates
- 言語の印を付ける所（`mkdocs.yml` の Markdown 拡張）と、印を使う所（ブラウザの仕掛けと `extra.css`）
- 字句の規則（何をタグ・環境変数とするか）と、見た目（色・太字・地）

## Out of Boundary
- 原稿（`.md`）のすべて（C25 の 6 か所も外した。今ある ```` ```sakurascript ```` を ```` ```ss ```` に書き換えることもしない）、`CLAUDE.md` の書式の `ss` の書き足しの外の変更、`.nav.yml`・Zensical の版
- Pygments の着色の一式（全言語の色付け）。さくらスクリプトの外の言語に色を付けることは決めていない
- 記述例の中身（タグの誤りなど）の直し

## Upstream / Downstream
- **Upstream**: `site-look-plan`（判断と目標の画面）
- **Downstream**: `site-look-sstp-playback`（C10 の言語の印で記述例を見分ける）

## Existing Spec Touchpoints
- **Extends**: なし（新しい spec）
- **Adjacent**: `site-look-list-items`（同じコードブロックの見た目。C09・C18 は着色の前後どちらのコードブロックの HTML（`pre > code`・`pre.highlight > code`）にも効く書き方にするので、どちらが先に入ってもよい）、`site-look-list-markers`（C17 と同じ「明るい表示は白地に 7:1 以上」の物差しで、タグ・環境変数の濃さを決める）、`site-look-dark-link-color`・`site-look-definition-tables`・`site-look-note-icon`（同じ `assets/extra.css`・`mkdocs.yml` を触る。どちらが先でもよく、ぶつかったら `origin/main` に追いつく）、`site-look-manual-files`（言語指定の無いコードブロックに仕掛けを当てる。C15 の仕掛けは、`pymdownx.highlight` の前後どちらのコードブロックの HTML（`pre > code`・`pre.highlight > code`）にも効く書き方にするので、どちらが先に入ってもよい）、`site-look-sstp-playback`（同じ言語の印を使う）

## Constraints
- **方向は議論し直さない**: 候補と判断は `site-look-plan` の `decisions.md` で決まっている。この spec は、決まった見え方を本番の書き方で入れる
- **原稿は変えない**: C25 を外したので、原稿（`.md`）は変えない（開発者の判断、2026-10-25。`site-look-visibility` の PR は原稿を変えない）。ほかに変えるのは `ukadoc-spec/CLAUDE.md` の書式の `ss` の書き足しで、原稿ではない。`.nav.yml`・Zensical の版は変えず、`requirements.txt` もなるべく変えない（変えるなら新しい依存として設計で理由を書く）。作業木 `.worktrees/site-look-visibility/` で書き、Build Gate（`prepare_site.py` と `zensical build --strict`）と規約 Gate（`ukadoc-spec/CLAUDE.md` の書式）を通し、`/kiro-complete` で PR にする
- **`ss` のエイリアスの道は決まった**: 開発者の答え（2026-10-25）「sakurascriptと、その省略形としてssをエイリアスにしてほしい。他は承認」による（C25 の 6 個への書き足しは、同じ日に外した）。```` ```ss ```` は `sakurascript` のエイリアス（省略形）として受ける。組み立ては ```` ```ss ```` のブロックにも同じ言語の印と着色を与える（highlight の設定で `ss` を `sakurascript` に寄せるか、スクリプトと `extra.css` で `language-ss` を同じに扱うかは、この spec で決める）。`ukadoc-spec/CLAUDE.md` の書式の決まり「さくらスクリプトは ```` ```sakurascript ```` のコードブロック」に、`ss` のエイリアスを書き足す
- **土台**: ukadoc-spec の `origin/main` の `afb2152`（テーマの色は紺 `#1f4e8c`）。中身で依る後続 spec は無く、ほかの後続 spec（`site-look-dark-link-color`・`site-look-list-items`・`site-look-list-markers` など）は先に入っていても、まだでもよい。ukadoc-spec のライセンスは `afb2152` で CC BY 4.0 と定まった
- **旧サイトの素材**: 旧サイト（https://ssp.shillest.net/ukadoc-legacy/manual/ ）の画像・見た目の指定（`list.css`・`base.css`）・スクリプト（`sakura_player.js` など）は、再利用の許可が明記されていない。着色の仕掛けも写さずに書き直す
- **Zensical 0.0.67 の制限**: テンプレートは minijinja で描画する。partial を丸ごと写さず、CSS とブロックの上書きにとどめる。Python で拡張できるのは Markdown 拡張だけで、自作の拡張は CI（`pip install -r requirements.txt` → `prepare_site.py` → `zensical build --strict`）での import の道の用意が要る。`build --strict` は、存在しない `extra_css` を指定しても検出しない（足したスクリプトも、`serve` で 200 になることを確かめる）。`extra_javascript` が通ることは確かめ済み
- **試作で確かめた事実**:
  - `pymdownx.highlight`（`use_pygments: false`）を足すと、全 449 コードブロックの HTML が `<div class="highlight"><pre><span></span><code>` から `<pre class="highlight"><code>` の形に変わる。言語指定のある 287 個に `language-sakurascript` が付き、無い 162 個は印が付かない。試作では見た目（地の色・折り返し・右上のコピーのボタン）の差は出なかったが、本番でも C09・C18 とコピーのボタンを確かめ直す
  - `prepare_site.py` の `EXTENSIONS` は見出しの id の計算用で、`highlight` を足しても見出しには響かない見込み（確かめは要る）
  - 試作の字句の規則は簡単なもの（タグは `\` の後の 1 字か `_`・`__` と 1 字と続く `[…]`、環境変数は `%` と英字と続く `[…]`）で、`list/sakura-script` の 287 ブロックでタグ 502 か所・環境変数 6 か所（`%username`・`%ms`・`%mp`・`%mh`・`%me`・`%mt`）を包んだ。本番の規則は、タグの文法に沿ったもの（例: `\p23` は `\p2` と字の `3`）をこの spec で決める
  - 包んだ後の `textContent` が元と同じことを確かめる形にした（コピーされる字は変わらない）。仕掛けが動かない環境では色が付かないだけで、今と同じに読める
  - 等幅の字を太くするだけでは字の幅は変わらず、折り返しの位置も変わらなかった（C19）。C21 の地は `color-mix(in srgb, currentColor 9%, transparent)` で、字の色に関係なく同じ指定で効く
  - 紺のテーマでの測り: C20 のタグは明 8.30:1・暗 6.96:1。C21 の地の上でタグ明 7.14:1・環境変数明 7.33:1、暗 5.7:1・6.61:1。環境変数の色は試作で明 `#7a2e0a`（試作では C17 の行。本番はこの spec で入れる）・暗 `#f6ad7b`（C10）
  - 暗い表示の印 `data-md-color-scheme="slate"`（明るい表示は `default`）は `<html>` でなく `<body>` に付く。暗い表示だけ・明るい表示だけの色は `[data-md-color-scheme="slate"] .md-typeset …`・`[data-md-color-scheme="default"] .md-typeset …` の形で書く
  - 色はなるべくテーマの色の変数から取る（試作の途中でテーマの色が緑から紺に変わり、直書きの色を作り直した）。タグの赤紫のように変数で出せない色は、明・暗それぞれで地（C18 の記述例の地）との対比を測って記録する
  - 試作の C25 は原稿を変えず、ブラウザの仕掛けが 1 行目を見て印を付けた。本番は C25 を外したので、6 個には印を付けない（原稿を変えずに `prepare_site.py` で印を付ける代案もある。決め直すのは、バックログから起票するとき）
  - `extra.css` の URL に版の印が無いので、開発者のブラウザに古い写しが残ることがある。見せる前に強制の再読み込み（Ctrl+F5）を頼む
- **表示の確かめ方**:
  - `serve` は `_site_src/` を見る（`docs_dir: _site_src`）ので、リポジトリ直下の `assets/`・`scripts/`・原稿を直したら `python scripts/prepare_site.py` を流し直す。`zensical serve` を動かしたまま流すと、書きかけの `_site_src/` を拾って壊れることがある（試作で `extra.css` が 404 になった）。`serve` を止めてから `prepare_site.py` と `zensical build --strict` を流し、起動し直す
  - `zensical serve` の頁の HTML を取ってきて、目印を数える（`code class="language-sakurascript"` が 287、`pre class="highlight"` が 449、スクリプトの読み込みが頁ごとに 1）。頁の道は `/ukadoc-spec/` から始まる（`site_url` が `https://ukatech.shillest.net/ukadoc-spec/`）
  - 明・暗の画面は `node .kiro/specs/completed/site-look-plan/tools/shot.mjs <url> <selector> <out> light|dark [width] [height]`（既定 1000×700）で撮り、目標の画面と同じセレクタ（C10・C19〜C21 は `#bang-lock-repaint`）で見比べる（`site-look-plan` の完了の前は `.kiro/specs/completed/site-look-plan/tools/shot.mjs`）。標準出力に `wrote`・`scrollWidth`・`innerWidth` が出る
  - 狭い画面: `node .kiro/specs/completed/site-look-plan/tools/shot.mjs <url> body - light 375` で、`scrollWidth` と `innerWidth` が同じ（375）ことを確かめる。狭い画面の画面は残さない
  - `shot.mjs` はまれに（54 枚に 5 枚）撮る途中の描き直しで二重に重なった PNG を書く。左右の端にヘッダの色の行が上の端以外にも出ていたら撮り直す
- **失わないもの**（`survey.md` の「失わないもの」）: D15 検索（検索で引ける字を変えない）・D16 ダークモード（色は明・暗の両方で決め、どちらでも字と地の差が十分にある）・D17 見出しへのリンク（見出しの id・`a.headerlink`（¶）・右の欄の目次を変えない）・D18 狭い画面（幅 375 で `scrollWidth` = `innerWidth`）・D19 コードのコピー（コピーのボタンを残し、コピーされる字を変えない。字は色の要素で包むだけ）・D20 記述例の字（記述例の `\` を `\` のまま見せる。等幅の字の指定を変えるなら `¥` に化ける字を選ばない）
- **参考の試作**: `.kiro/specs/completed/site-look-plan/mockups/extra.css` の C10・C17（`.slp-ss-tag`・`.slp-ss-env` の 2 行）・C19・C20・C21、`mockups/mockup.js` の C10 の分岐、`mockups/worktree.diff` の `mkdocs.yml` の差分、`mockups/README.md` の測り。`?slp=` で切り替える使い捨ての書き方なので、写さずに書き直してよい
- **小さな PR**: 他者も使う公開リポジトリへの PR なので、この brief の候補の外に広げない
- **続きの PR の説明**（開発者の指示、2026-10-25。同じ日に一連の PR を 6 本から 3 本に改めた）: PR の説明に、この PR が UKADOC の見た目を旧サイト並みの見やすさに近づける一連の PR（`site-look-plan` の決定を切った 3 本）の 1 本であり、続きの PR を順に出すことを書く。一連の PR とその並びは `.kiro/steering/roadmap.md` の「PR の単位」と「Specs」による（今の見込み: `site-look-dark-link-color` → `site-look-visibility`（list-items・list-markers・sakura-script-highlight・manual-files・definition-tables・note-icon の 6 本の spec をまとめた 1 本）→ `site-look-sstp-playback`）。PR を出すときの roadmap に合わせて、出し済みの PR（番号）・この PR・この後に出す PR を短く並べ、メンテナが全体の中のどこにあるかを分かるようにする（最後の PR では、これで一連が終わることを書く）。あわせて、この PR だけで完結していて、続きを待たずにマージしてよいこと（先に出した PR に中身で依るときは、その PR を名指しする）を書く。この spec は PR の単位 `site-look-visibility` の 1 本で、PR は単位の最後の spec（`site-look-note-icon`）の完了のときに 1 回だけ作る。PR の説明は、単位の 6 本の spec をまとめて書く

## 申し送り（site-look-list-items より）
- **記述例の箱の地**: `site-look-list-items` の C18 は、`h4` の直後のコードブロックの箱の地を明るい表示 `#eef2f8`・暗い表示 `#1d2433`（`@media screen` の中）にした。箱の中のタグの色の対比は、この地の上で測る（`site-look-list-items` の `design.md` の Out of Boundary・Revalidation Triggers）。今のコードの字は明 8.72:1・暗 7.80:1
- **着色の後の形**: C09（`pre > code` の右の内側の余白 2.8em）と C18 の箱は、写しに `pymdownx.highlight`（`use_pygments: false`）を足した `pre.highlight > code` の形でも、箱・点線の数・位置と高さ・対比・ボタンの重なり 0 が今の形と同じだった（`verification.md` の「着色の後の形」）。この spec で形を変えたら、C09・C18 が両方の形で同じに見えることを確かめ直す
- **作業木**: 単位 `site-look-visibility` の作業木の状態・コミットの名前・`.venv` のことは `site-look-list-markers` の brief の「申し送り（site-look-list-items より）」にある

## PR の単位の改め（開発者の指示、2026-10-25）
- 原則 1 spec = 1 PR にした。ほかの人のコミットを妨げないよう、spec を完了するたびに PR を出してスクワッシュマージする。ただし、その PR だけを入れるとサイトが壊れるなら、PR を出さずに溜める（`.kiro/steering/workflow.md`「PR の単位」）
- この brief の「PR の単位 `site-look-visibility`」「単位の最後の spec で 1 回だけ PR を作る」「作業木を引き継ぐ」の記述は、これに読み替える。この spec の作業木は `.worktrees/<この spec の名前>/`（同じ名前のブランチ）で、依存先の PR がマージされた後の ukadoc-spec の `origin/main` から作る
- `site-look-list-items` の 3 つのコミットは、作業木 `.worktrees/site-look-list-items/`（ブランチ `site-look-list-items`。`site-look-visibility` から名前を移した）にあり、その spec の PR で入れる
- 「続きの PR の説明」の一連の PR の並びは、PR を出すときの roadmap による