起票元: site-look-plan の決定（.kiro/specs/completed/site-look-plan/decisions.md、2026-10-25）から

# Brief: site-look-note-icon

## Problem
注釈で書かれた所（「さくらスクリプトのエスケープ」「さくらスクリプトの寿命」などの注釈の節、「補足」の項目、`!!! note "注"`）が、ほかの見出しと同じ見え方で、注釈だとひと目で分からない。技術サイトではあるが、伺からしい遊びも無い。
開発者は「「さくらスクリプトの寿命」など、注釈で記載されている個所について、添付アイコンか、添付アイコンを白黒ベクター化したものを、ヘッダーにつけてほしい」と求め（筆にピンクのリボンを結んだ絵の画像を添付した）、試作を見て「白黒はデザインが破綻したので、カラーアイコンをそのまま使って。なお、注釈表記がある箇所はほかにもあったかもしれないが、同様な対応よろしくね。」と答えた。

## Current State
- 注釈の書き方は 3 つある（組み立てたサイトの 40 頁で数えた）
  - 注釈の節: 原稿の `notes_*.md` の単位。`id` が `notes_` で始まる見出し 16 個（`list/sakura-script` 14・`list/propertysystem` 2）。`site-look-list-markers` の C04 が点線の箱で包んだ後である
  - 補足の項目: 原稿の `note-1.md` などの「補足」の見出し 16 個。`id` が `note-1`・`balloon-text-note-1` のように `note-` と数で終わる（節の中の見出し `…-note-1-…` は除く）。CSS の属性の指定では「数で終わる」形を見分けられない
  - `!!! note "注"` の注意書きの題 2 個（`dev/shell`）。Material の鉛筆のアイコン（`mask-image`）が付いている
- `!!! tip "ヒント"`（9 個）・`!!! warning "非推奨"`（3 個）は別の種類の注意書きで、本文の「※」の行（147 行）は見出しが無い
- 開発者の添付の絵（88×88 の PNG）の写しが、試作の写し `.kiro/specs/completed/site-look-plan/mockups/image/slp-notes-icon.png` にある
- `site-look-definition-tables` の表の処理には中身で依らない。同じ `prepare_site.py` を触るが、先に入っていても、まだでもよい

## Desired Outcome
決めた方向（`decisions.md` の判断）:
- **C26 注釈の見出しに添付のアイコンを付ける**（判断: 採る。開発者の答え「白黒はデザインが破綻したので、カラーアイコンをそのまま使って。なお、注釈表記がある箇所はほかにもあったかもしれないが、同様な対応よろしくね。」）: 注釈の節・補足の項目・`!!! note "注"` の見出しの頭に、開発者が添付した色付きの絵（筆とリボン）を字の 1.5 倍ほどの大きさで置く。大きく出すと粗くなるので、今の大きさのままにする
  - 目標の画面: `.kiro/specs/completed/site-look-plan/screenshots/mock-sakura-script-C26-light.png`・`.kiro/specs/completed/site-look-plan/screenshots/mock-sakura-script-C26-dark.png`（注釈の節「さくらスクリプトのエスケープ」「さくらスクリプトの寿命」）、`.kiro/specs/completed/site-look-plan/screenshots/mock-propertysystem-C26-light.png`・`.kiro/specs/completed/site-look-plan/screenshots/mock-propertysystem-C26-dark.png`（補足の項目「補足」）の見出しの頭の絵。暗い表示でも絵が地から浮かずに読める
  - `!!! note "注"` の題の画面は無い（`dev/shell` は試作の画面に撮っていない）。鉛筆を外して同じ絵にする
- 採らなかった組: C27（白黒の線に起こした SVG）は C26 と両立しない組の採らなかった方で、この spec では作らない
- 目標の画面は、ほかの候補（C04 の箱など）も `?slp=` に入れて撮ったものである。この spec の目標は見出しの頭の絵である
- 画面は、`site-look-plan` の完了（2026-10-25）で `.kiro/specs/completed/site-look-plan/screenshots/` の下に移った（上のパスは移った後のもの）

## Approach
画像を足す遊びなので、視認性の改造と別の spec にした（`roadmap.md` の切り分けの規則）。
- 絵を ukadoc-spec の `assets/` に置き、`assets/extra.css` で見出しの `::before`（`content: ""` の背景の絵）に出す。飾りなので読み上げに出さない
- 注釈の節は `id^="notes_"` の見出しで選べる。補足の項目は、`prepare_site.py` が `note-*.md` から作った見出しに印を付ける（試作はブラウザの仕掛けで `slp-note-head` を付けたが、本番は組み立ての処理で付けるのが確か）。印を付ける後処理は、それを使う見た目の改造と同じ spec に入れてよい
- `!!! note` の題は、Material の鉛筆（`.admonition.note > .admonition-title::before` の `mask-image`）を外して同じ絵にする。`!!! tip`・`!!! warning` は Material のアイコンのまま残す
- 本番に入れる前に、開発者が絵の出どころと使ってよい範囲を確かめる（2026-10-25 に確かめ済み。下の「絵の使ってよい範囲」）

## Scope
- **In**:
  - 添付の絵を `assets/` に置くこと（画像を足す）と、その使ってよい範囲の確かめ
  - 3 つの書き方の見出し（注釈の節 16・補足の項目 16・`!!! note` 2。計 34 か所）の頭の絵の指定（`assets/extra.css`）
  - 補足の項目の見出しの印（`scripts/prepare_site.py`）
  - 明・暗の画面と 375 px の確かめ
- **Out**:
  - C27（白黒の SVG）
  - `!!! tip`・`!!! warning` と本文の「※」の行
  - 注釈の節の箱そのもの（`site-look-list-markers` の C04）
  - キャラクターを頁に出すこと（C12。保留で、roadmap のバックログ）

## Boundary Candidates
- 絵の素材の扱い（置き場・使ってよい範囲）と、絵を出す見た目の指定
- 見出しの選び方が 3 通り（`id` の形・組み立ての処理の印・admonition の題）ある

## Out of Boundary
- 原稿（`.md`）・`.nav.yml`・`requirements.txt`・Zensical の版
- 注釈の書き方そのもの（原稿の `notes_*.md`・`note-*.md` の置き方）の変更
- 絵を描き直すこと・白黒にすること

## Upstream / Downstream
- **Upstream**: `site-look-list-markers`（C26 のアイコンを、C04 の箱に入る `notes_` の見出しに付ける）。`site-look-plan`（判断と目標の画面）
- **Downstream**: なし（この spec のアイコンに中身で依る spec は無い）

## Existing Spec Touchpoints
- **Extends**: なし（新しい spec）
- **Adjacent**: `site-look-list-markers`（注意書きの箱と、同じ見出し）、`site-look-definition-tables`（同じ `prepare_site.py` の組み立ての処理）・`site-look-sstp-playback`（同じ `assets/extra.css` などを触る）。どちらが先でもよく、ぶつかったら `origin/main` に追いつく

## Constraints
- **方向は議論し直さない**: 候補と判断は `site-look-plan` の `decisions.md` で決まっている。この spec は、決まった見え方を本番の書き方で入れる
- **絵の使ってよい範囲**: 絵は開発者が会話で添付した画像で、試作の写しは `.kiro/specs/completed/site-look-plan/mockups/image/slp-notes-icon.png`（88×88）にある。ukadoc-spec は CC BY 4.0（`afb2152` の LICENSE）なので、本番に入れる前に、絵の出どころと、ukadoc-spec の CC BY 4.0 で出してよいか（または絵だけ別の許可で置くか）を開発者が確かめる。**確かめは済んだ**: 開発者の答え（2026-10-25）「アイコンは大丈夫です」により、絵は ukadoc-spec の `assets/` に置いて CC BY 4.0 の PR に入れてよい（`site-look-visibility` の PR を止める理由にはならない）
- **旧サイトの素材**: 旧サイト（https://ssp.shillest.net/ukadoc-legacy/manual/ ）の画像・見た目の指定（`list.css`・`base.css`）・スクリプト（`sakura_player.js` など）は、再利用の許可が明記されていない。使わない
- **原稿は変えない**: 変えるのは ukadoc-spec の `assets/`（絵と `extra.css`）と `scripts/prepare_site.py` で、原稿（`.md`）・`.nav.yml`・`requirements.txt`・Zensical の版は変えない。ただし ukadoc-spec を変えるので、`workflow.md` の「原稿を変えない spec」には当たらない。作業木 `.worktrees/site-look-visibility/` で書き、Build Gate（`prepare_site.py` と `zensical build --strict`）と規約 Gate（ファイル名は ASCII）を通し、`/kiro-complete` で PR にする
- **土台**: ukadoc-spec の `origin/main` の `afb2152`（テーマの色は紺 `#1f4e8c`）の上に、中身で依る `site-look-list-markers`（と `site-look-list-items`）が入った版（同じ PR の単位 `site-look-visibility` の作業木を引き継ぐ）。ほかの後続 spec（`site-look-definition-tables` など）は先に入っていても、まだでもよい
- **Zensical 0.0.67 の制限**: テンプレートは minijinja で描画する。partial を丸ごと写さず、CSS とブロックの上書きにとどめる。`build --strict` は、存在しない `extra_css` を指定しても検出しない。`extra.css` の中の `url(...)` の絵が無くても build は通るので、配られた絵が `serve` で 200 になることを確かめる
- **試作で確かめた事実**:
  - 試作は `assets/extra.css` から `url("image/slp-notes-icon.png")` で絵を読んだ（`extra.css` からの相対の道）。配られた絵は 200 だった
  - C26 は字の大きさでも筆とリボンが分かり、暗い表示でも読めた。C27 の手描きの白黒は字の大きさだと潰れて剣のようにも見えた
  - `!!! note` の題の鉛筆は `mask-image` で描かれているので、外してから絵を置く
  - 暗い表示の印 `data-md-color-scheme="slate"`（明るい表示は `default`）は `<html>` でなく `<body>` に付く。暗い表示だけの指定は `[data-md-color-scheme="slate"] .md-typeset …` の形で書く
  - 色はテーマの色の変数から取り、直書きしない（試作の途中でテーマの色が緑から紺に変わり、直書きの色を作り直した）
  - `prepare_site.py` で目印 `{: .cls }` を付けるなら、段落の末尾（空行の手前）に限る。見出しに付けるときは、見出しの数の検査（`old_ids`）と見出しの id が変わらないことを確かめる
  - `extra.css` の URL に版の印が無いので、開発者のブラウザに古い写しが残ることがある。見せる前に強制の再読み込み（Ctrl+F5）を頼む
- **表示の確かめ方**:
  - `serve` は `_site_src/` を見る（`docs_dir: _site_src`）ので、リポジトリ直下の `assets/`・`scripts/` を直したら `python scripts/prepare_site.py` を流し直す。`zensical serve` を動かしたまま流すと、書きかけの `_site_src/` を拾って壊れることがある（試作で `extra.css` が 404 になった）。`serve` を止めてから `prepare_site.py` と `zensical build --strict` を流し、起動し直す
  - `zensical serve` の頁の HTML を取ってきて、補足の項目の見出しの印が 16 個、`notes_` の見出しが 16 個、`!!! note` が 2 個あることを数える。頁の道は `/ukadoc-spec/` から始まる（`site_url` が `https://ukatech.shillest.net/ukadoc-spec/`）
  - 明・暗の画面は `node .kiro/specs/completed/site-look-plan/tools/shot.mjs <url> <selector> <out> light|dark [width] [height]`（既定 1000×700）で撮り、目標の画面と同じセレクタ（`list/sakura-script` の `#notes_escape`、`list/propertysystem` の `#note-1`）で見比べる。`dev/shell` の `!!! note` も撮って見る（`site-look-plan` の完了の前は `.kiro/specs/completed/site-look-plan/tools/shot.mjs`）。標準出力に `wrote`・`scrollWidth`・`innerWidth` が出る
  - 狭い画面: `node .kiro/specs/completed/site-look-plan/tools/shot.mjs <url> body - light 375` で、`scrollWidth` と `innerWidth` が同じ（375）ことを確かめる。狭い画面の画面は残さない
  - `shot.mjs` はまれに（54 枚に 5 枚）撮る途中の描き直しで二重に重なった PNG を書く。左右の端にヘッダの色の行が上の端以外にも出ていたら撮り直す。`#notes_escape` の位置では、ヘッダの題が切り替わりの途中で重なって写ることがある（試作の C26 は 4 枚とも撮り直した）
- **失わないもの**（`survey.md` の「失わないもの」）: D15 検索（見出しの字を変えない。絵は背景で、検索の字にならない）・D16 ダークモード（絵が明・暗の両方で地から浮かずに読める）・D17 見出しへのリンク（見出しの id・`a.headerlink`（¶）・右の欄の目次を変えない）・D18 狭い画面（幅 375 で `scrollWidth` = `innerWidth`）・D19 コードのコピー（コピーのボタンを残し、コピーされる字を変えない）・D20 記述例の字（記述例の `\` を `\` のまま見せる）
- **遊びの条件**: 字の大きさ・行間を変えない。絵は飾りで、読み上げに出さない。本文の読み取りを妨げない
- **参考の試作**: `.kiro/specs/completed/site-look-plan/mockups/extra.css` の C26（`html[data-slp~="C26"]` の下の使い捨ての指定）、`mockups/mockup.js` の `slp-note-head` を付ける分岐、`mockups/README.md` の「判断の答えの付け足しを受けた試作」と「続く答えを受けた試作」。写さずに書き直してよい
- **小さな PR**: 他者も使う公開リポジトリへの PR なので、この brief の候補の外に広げない
- **続きの PR の説明**（開発者の指示、2026-10-25。同じ日に一連の PR を 6 本から 3 本に改めた）: PR の説明に、この PR が UKADOC の見た目を旧サイト並みの見やすさに近づける一連の PR（`site-look-plan` の決定を切った 3 本）の 1 本であり、続きの PR を順に出すことを書く。一連の PR とその並びは `.kiro/steering/roadmap.md` の「PR の単位」と「Specs」による（今の見込み: `site-look-dark-link-color` → `site-look-visibility`（list-items・list-markers・sakura-script-highlight・manual-files・definition-tables・note-icon の 6 本の spec をまとめた 1 本）→ `site-look-sstp-playback`）。PR を出すときの roadmap に合わせて、出し済みの PR（番号）・この PR・この後に出す PR を短く並べ、メンテナが全体の中のどこにあるかを分かるようにする（最後の PR では、これで一連が終わることを書く）。あわせて、この PR だけで完結していて、続きを待たずにマージしてよいこと（先に出した PR に中身で依るときは、その PR を名指しする）を書く。この spec は PR の単位 `site-look-visibility` の 1 本で、PR は単位の最後の spec（`site-look-note-icon`）の完了のときに 1 回だけ作る。PR の説明は、単位の 6 本の spec をまとめて書く

## 申し送り（site-look-list-items より）
- **目印の名前**: まとめた頁の単位の頭の見出しに `bundle-item`・`bundle-category` の class が付く（`notes_` の単位と頁の頭には付かない）。名前の決まりは `bundle-<役>`。`notes_` の見出しは C01・C03 の帯の外にある。この名前か付ける見出しを変えたら確かめ直す（`site-look-list-items` の `design.md` の Revalidation Triggers）
- **濃い帯の中の ¶**: 分類の帯と記述例の見出しの帯の中の ¶（`.headerlink`）は、状態に依らず白の 70%（`--md-primary-bg-color--light`）にしてある。見出しの頭にアイコンを付けるときは、この帯の中での見え方も見る

## PR の単位の改め（開発者の指示、2026-10-25）
- 原則 1 spec = 1 PR にした。ほかの人のコミットを妨げないよう、spec を完了するたびに PR を出してスクワッシュマージする。ただし、その PR だけを入れるとサイトが壊れるなら、PR を出さずに溜める（`.kiro/steering/workflow.md`「PR の単位」）
- この brief の「PR の単位 `site-look-visibility`」「単位の最後の spec で 1 回だけ PR を作る」「作業木を引き継ぐ」の記述は、これに読み替える。この spec の作業木は `.worktrees/<この spec の名前>/`（同じ名前のブランチ）で、依存先の PR がマージされた後の ukadoc-spec の `origin/main` から作る
- `site-look-list-items` の 3 つのコミットは、作業木 `.worktrees/site-look-list-items/`（ブランチ `site-look-list-items`。`site-look-visibility` から名前を移した）にあり、その spec の PR で入れる
- 「続きの PR の説明」の一連の PR の並びは、PR を出すときの roadmap による