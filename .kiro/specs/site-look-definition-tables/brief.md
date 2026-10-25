起票元: site-look-plan の決定（.kiro/specs/completed/site-look-plan/decisions.md、2026-10-25）から

# Brief: site-look-definition-tables

## Problem
「`- **名前**: 説明`」の形の箇条書きが並ぶ所（`list/propertysystem` のキーの一覧、`list/shiori-event` の `Reference0` などの一覧、`\![set,wallpaper,…]` のオプション `center`・`tile` など）で、名前を縦に追いにくい。
名前が説明の文の頭に埋もれ、旧サイトの 2 列の表（`survey.md` の D10）より読みにくい。
開発者は「プロパティシステム。以下のようなところ、表にできないか」と指摘し、続けて「表デザインに変えた方がよさそうなパターンが他にも存在する。これは、Markdownはいじらず、対応するパターンが出てきたら表htmlにする方針の方がよいかもしれない。」と方針を示した。

## Current State
- 原稿は「`- **名前**: 説明`」の箇条書きで書かれ、サイトでは点の付いた箇条書きのまま出る
- 組み立てたサイトの 40 頁を数えると、この形だけが 2 つ以上並ぶ箇条書きは 20 頁の 477 個（2105 行）ある（`list/shiori-event` 217・`list/shiori-event-ex` 124・`spec/saori-ex` 45・`list/sakura-script` 22・`spec/sstp` 10・`list/propertysystem` 9・`list/plugin-event` 8・`descript/shell` 7・`spec/shiori3` 7・ほか）
- `site-look-plan` の試作では、ブラウザの仕掛け（`mockup.js`）が箇条書きを表に組み替えた見本を作った。本番は組み立ての処理で行う
- `site-look-manual-files` が `manual/` のファイルの箇条書き（C14・C22）の見え方を入れた後である（同じ PR の単位 `site-look-visibility`）。`site-look-list-markers` の目印の後処理には中身で依らない

## Desired Outcome
決めた方向（`decisions.md` の判断）:
- **C23 「名前: 説明」の箇条書きを表にする**（判断: 採る。開発者の「以下を除き承認」（2026-10-25）により推奨のとおりで、続く答えでやり方を「原稿は変えず、組み立ての処理で表の HTML にする」に改めた）: 「`- **名前**: 説明`」だけが 2 つ以上並ぶ箇条書きが、どの頁でも「名前」「説明」の 2 列の表になり、名前を縦に追える。表は Material の表の見た目のまま行の上下を詰める
  - 目標の画面: `.kiro/specs/completed/site-look-plan/screenshots/mock-propertysystem-C23-light.png`・`.kiro/specs/completed/site-look-plan/screenshots/mock-propertysystem-C23-dark.png`（`[id="system.cpu"]` のキーの表）、`.kiro/specs/completed/site-look-plan/screenshots/mock-sakura-script-C23-light.png`・`.kiro/specs/completed/site-look-plan/screenshots/mock-sakura-script-C23-dark.png`（`#bang-set-wallpaper` のオプションの表）、`.kiro/specs/completed/site-look-plan/screenshots/mock-shiori-event-C23-light.png`・`.kiro/specs/completed/site-look-plan/screenshots/mock-shiori-event-C23-dark.png`（`#OnBoot` の `Reference0` などの表）
  - 見比べ（今の見え方）: `.kiro/specs/completed/site-look-plan/screenshots/mock-shiori-event-C23before-light.png`・`.kiro/specs/completed/site-look-plan/screenshots/mock-shiori-event-C23before-dark.png`、`.kiro/specs/completed/site-look-plan/screenshots/mock-propertysystem-base-light.png`・`.kiro/specs/completed/site-look-plan/screenshots/mock-propertysystem-base-dark.png`
  - `mock-sakura-script-C23-*.png` は、ヘッダが上に 14 px ほど切れて写っている（撮る途中の組み替えの名残。表の見え方には関わらない）。目標の画面はほかの候補も `?slp=` に入れて撮ったもので、この spec の目標は表の見え方である
- 項目に入れ子の箇条書き・コードブロック・2 つ以上の段落がある箇条書きと、1 項目だけの箇条書きは、今のまま残る。`manual/` のファイルの箇条書き（C14・C22 の当て先）は表にならない
- 幅 375 でも、表のある 20 頁のどれも横にはみ出さない
- 画面は、`site-look-plan` の完了（2026-10-25）で `.kiro/specs/completed/site-look-plan/screenshots/` の下に移った（上のパスは移った後のもの）

## Approach
原稿の Markdown は変えず（開発者の方針）、組み立ての処理で同じ形を見つけて表の HTML にする。
- 組み立ての処理の置き場は、この spec の設計で決める。候補は (a) `prepare_site.py` が `_site_src/` の写しの上で、形の合う箇条書きを表に書き換える（原稿そのものは変えない）、(b) 自作の Markdown 拡張（treeprocessor など）で、HTML の木の上で `ul` を `table` に替える。Zensical で Python から拡張できるのは Markdown 拡張だけで、(b) は CI での import の道の用意が要る
- 形の判定: 箇条書きの全項目が「頭が太字の名前、`: `、説明」の 1 段落だけで、項目が 2 つ以上あるもの。入れ子の箇条書き・コードブロック・2 つ以上の段落を含む項目が 1 つでもあれば、その箇条書きは残す
- 表の見た目: Material の表の見た目を使う。行の上下の余白だけ詰める（試作は `.45em .9em`）。名前の列は広い画面（45em 以上）でだけ折り返さず、名前と説明の両方に `overflow-wrap: anywhere` を付ける。表の見出しの行は「名前」「説明」

## Scope
- **In**:
  - 「名前: 説明」の箇条書きを見つけて表の HTML にする組み立ての処理（`scripts/prepare_site.py` か、自作の Markdown 拡張と `mkdocs.yml`）
  - 表の見た目の指定（`assets/extra.css`）
  - 20 頁の 477 個が表になり、外す形が残ることの数え上げ
  - 明・暗の画面と 375 px の確かめ（表のある 20 頁と `manual/ghost`）
- **Out**:
  - 原稿を Markdown の表に書き換えること（開発者の方針で採らない）
  - `spec/shiori3` のヘッダの値を列にそろえる見え方（C16。保留で、roadmap のバックログ）。ただし `spec/shiori3` の 7 個はこの表になるので、C16 を決めるときの材料として、この表で足りそうかを見て記録する
  - 定義の並び（`def_list`）の拡張を足すこと

## Boundary Candidates
- 形の判定（どの箇条書きを表にするか）と、表の HTML の組み立てと、表の見た目
- 組み立ての処理の置き場（`prepare_site.py` か Markdown 拡張か）は、ほかの目印の後処理（`site-look-list-markers`）とそろえるかで決める

## Out of Boundary
- 原稿（`.md`）・`.nav.yml`・Zensical の版。`requirements.txt` も変えない見込み（変えるなら新しい依存として設計で理由を書く）
- 表の形をしていないほかの箇条書きの見え方
- `manual/` のファイルの箇条書き（`site-look-manual-files` の当て先）

## Upstream / Downstream
- **Upstream**: `site-look-manual-files`（`manual/` のファイルの箇条書き（C14・C22 の当て先）を表にしないことを、その見え方が入った後に確かめる。C23 は段落を 2 つ以上持つ箇条書きを初めから除く。同じ PR の単位 `site-look-visibility`）。`site-look-plan`（判断と目標の画面）
- **Downstream**: `site-look-sstp-playback`（プロパティシステムの `(キー)`・`(ID)` を含む名前を、この表のキーごとに組み立てて送る）

## Existing Spec Touchpoints
- **Extends**: なし（新しい spec）
- **Adjacent**: `site-look-manual-files`（同じ形の箇条書きの当て先を分ける）、`site-look-list-markers`・`site-look-note-icon`（同じ `prepare_site.py`・`assets/extra.css` の組み立ての処理を触る。どちらが先でもよく、ぶつかったら `origin/main` に追いつく）

## Constraints
- **方向は議論し直さない**: 候補と判断は `site-look-plan` の `decisions.md` で決まっている。開発者の方針「Markdownはいじらず、対応するパターンが出てきたら表htmlにする」に従う
- **原稿は変えない**: 変えるのは ukadoc-spec の `scripts/prepare_site.py`（か自作の Markdown 拡張と `mkdocs.yml`）と `assets/extra.css` で、原稿（`.md`）・`.nav.yml`・Zensical の版は変えない。ただし ukadoc-spec を変えるので、`workflow.md` の「原稿を変えない spec」には当たらない。作業木 `.worktrees/site-look-visibility/` で書き、Build Gate（`prepare_site.py` と `zensical build --strict`）と規約 Gate を通し、`/kiro-complete` で PR にする
- **HTML の変わる量が大きい**: 20 頁の 477 個（2105 行）の HTML が変わる。PR は `site-look-manual-files` と同じ単位（`site-look-visibility`）にまとめるが、spec はほかの見た目の改造と分けた。レビューの人が見比べられるよう、表になる箇条書きの数え上げと、外した形の例を PR の本文に書く
- **土台**: ukadoc-spec の `origin/main` の `afb2152`（テーマの色は紺 `#1f4e8c`）の上に、中身で依る `site-look-manual-files`（と、その依存先の `site-look-list-items`）が入った版（`site-look-manual-files` と同じ PR の単位 `site-look-visibility` の作業木を引き継ぐ）。ほかの後続 spec は先に入っていても、まだでもよい。ukadoc-spec のライセンスは `afb2152` で CC BY 4.0 と定まった
- **旧サイトの素材**: 旧サイト（https://ssp.shillest.net/ukadoc-legacy/manual/ ）の 2 列の表は手本にするが、画像・見た目の指定（`list.css`・`base.css`）・スクリプト（`sakura_player.js` など）は再利用の許可が明記されていない。写さずに書き直す
- **Zensical 0.0.67 の制限**: テンプレートは minijinja で描画する。partial を丸ごと写さず、CSS とブロックの上書きにとどめる。Python で拡張できるのは Markdown 拡張だけ。`build --strict` は、存在しない `extra_css` を指定しても検出しない
- **試作で確かめた事実**:
  - Material の表の見た目は `table:not([class])` にだけ効く。試作で表に `class` を付けたら枠も地も無くなったので、印は `class` でなく属性（試作は `data-slp-keytable`）で付けた
  - 375 px: 名前の列を折り返さない指定のままだと、`list/shiori-event` 397・`spec/saori-ex` 452・`list/shiori-event-ex` 476・`list/sakura-script` 710 px にはみ出した（`list/propertysystem` は `system.os` の `x86,x64,arm,…` で 517）。折り返さない指定を広い画面（45em 以上）だけにし、名前と説明の両方に `overflow-wrap: anywhere` を付けて、表のある 20 頁と `manual/ghost` のどれも `scrollWidth` 375・`innerWidth` 375 になった
  - 1 項目だけの箇条書きも数えると 704 個になる。1 行だけの表は作らない
  - `prepare_site.py` で目印を足すなら、段落の末尾（空行の手前）に限る（1 行目の直後だと `<br />` で続く段落で本文に漏れた）。見出しの数の検査（`old_ids`）は見出しの行だけを見る
  - 説明の中のリンク・`code`・`site-look-list-markers` の札（`**対応:**` の段落の外なので当たらない見込み）が、表の中でも崩れないことを確かめる
  - 暗い表示の印 `data-md-color-scheme="slate"`（明るい表示は `default`）は `<html>` でなく `<body>` に付く。暗い表示だけの色は `[data-md-color-scheme="slate"] .md-typeset …` の形で書く
  - 色はテーマの色の変数から取り、直書きしない（試作の途中でテーマの色が緑から紺に変わり、直書きの色を作り直した）
  - `extra.css` の URL に版の印が無いので、開発者のブラウザに古い写しが残ることがある。見せる前に強制の再読み込み（Ctrl+F5）を頼む
- **表示の確かめ方**:
  - `serve` は `_site_src/` を見る（`docs_dir: _site_src`）ので、リポジトリ直下の `assets/`・`scripts/` を直したら `python scripts/prepare_site.py` を流し直す。`zensical serve` を動かしたまま流すと、書きかけの `_site_src/` を拾って壊れることがある（試作で `extra.css` が 404 になった）。`serve` を止めてから `prepare_site.py` と `zensical build --strict` を流し、起動し直す
  - `zensical serve` の頁（と build の `_site/` の全頁）の HTML を取ってきて、表の印の付いた表の数（20 頁・477 個）を数え、頁ごとの数が上の数と合うかを見る。頁の道は `/ukadoc-spec/` から始まる（`site_url` が `https://ukatech.shillest.net/ukadoc-spec/`）
  - 明・暗の画面は `node .kiro/specs/completed/site-look-plan/tools/shot.mjs <url> <selector> <out> light|dark [width] [height]`（既定 1000×700）で撮り、目標の画面と同じセレクタ（`list/propertysystem` の `[id="system.cpu"]`、`list/sakura-script` の `#bang-set-wallpaper`、`list/shiori-event` の `#OnBoot`）で見比べる（`site-look-plan` の完了の前は `.kiro/specs/completed/site-look-plan/tools/shot.mjs`）。標準出力に `wrote`・`scrollWidth`・`innerWidth` が出る
  - 狭い画面: `node .kiro/specs/completed/site-look-plan/tools/shot.mjs <url> body - light 375` で、表のある 20 頁と `manual/ghost` の `scrollWidth` と `innerWidth` が同じ（375）ことを確かめる。狭い画面の画面は残さない
  - `shot.mjs` はまれに（54 枚に 5 枚）撮る途中の描き直しで二重に重なった PNG を書く。左右の端にヘッダの色の行が上の端以外にも出ていたら撮り直す
- **失わないもの**（`survey.md` の「失わないもの」）: D15 検索（表にしても名前と説明の字を変えず、検索で引ける）・D16 ダークモード（表の枠・地・字は明・暗の両方で読める）・D17 見出しへのリンク（見出しの id・`a.headerlink`（¶）・右の欄の目次を変えない）・D18 狭い画面（幅 375 で `scrollWidth` = `innerWidth`。この spec でいちばん崩れやすい）・D19 コードのコピー（コピーのボタンを残し、コピーされる字を変えない）・D20 記述例の字（記述例や説明の中の `\` を `\` のまま見せる）
- **参考の試作**: `.kiro/specs/completed/site-look-plan/mockups/extra.css` の C23（`html[data-slp~="C23"]` の下の使い捨ての指定）、`mockups/mockup.js` の C23 の組み替え（形の判定の見本）、`mockups/README.md` の「続く答えを受けた試作」の測り。ブラウザで組み替える使い捨ての書き方なので、写さずに組み立ての処理として書き直す
- **小さな PR**: 他者も使う公開リポジトリへの PR なので、この brief の候補の外に広げない
- **続きの PR の説明**（開発者の指示、2026-10-25。同じ日に一連の PR を 6 本から 3 本に改めた）: PR の説明に、この PR が UKADOC の見た目を旧サイト並みの見やすさに近づける一連の PR（`site-look-plan` の決定を切った 3 本）の 1 本であり、続きの PR を順に出すことを書く。一連の PR とその並びは `.kiro/steering/roadmap.md` の「PR の単位」と「Specs」による（今の見込み: `site-look-dark-link-color` → `site-look-visibility`（list-items・list-markers・sakura-script-highlight・manual-files・definition-tables・note-icon の 6 本の spec をまとめた 1 本）→ `site-look-sstp-playback`）。PR を出すときの roadmap に合わせて、出し済みの PR（番号）・この PR・この後に出す PR を短く並べ、メンテナが全体の中のどこにあるかを分かるようにする（最後の PR では、これで一連が終わることを書く）。あわせて、この PR だけで完結していて、続きを待たずにマージしてよいこと（先に出した PR に中身で依るときは、その PR を名指しする）を書く。この spec は PR の単位 `site-look-visibility` の 1 本で、PR は単位の最後の spec（`site-look-note-icon`）の完了のときに 1 回だけ作る。PR の説明は、単位の 6 本の spec をまとめて書く

## PR の単位の改め（開発者の指示、2026-10-25）
- 原則 1 spec = 1 PR にした。ほかの人のコミットを妨げないよう、spec を完了するたびに PR を出してスクワッシュマージする。ただし、その PR だけを入れるとサイトが壊れるなら、PR を出さずに溜める（`.kiro/steering/workflow.md`「PR の単位」）
- この brief の「PR の単位 `site-look-visibility`」「単位の最後の spec で 1 回だけ PR を作る」「作業木を引き継ぐ」の記述は、これに読み替える。この spec の作業木は `.worktrees/<この spec の名前>/`（同じ名前のブランチ）で、依存先の PR がマージされた後の ukadoc-spec の `origin/main` から作る
- `site-look-list-items` の 3 つのコミットは、作業木 `.worktrees/site-look-list-items/`（ブランチ `site-look-list-items`。`site-look-visibility` から名前を移した）にあり、その spec の PR で入れる
- 「続きの PR の説明」の一連の PR の並びは、PR を出すときの roadmap による

## 申し送り（site-look-list-markers より）
- `prepare_site.py` の `main()` の `parts.append(…)` の行は、`add_markers(rel, rewrite_links(shift_headings(…), rel, dst).strip('\n'))` になった。対応・既定値の段落の末尾に `{: .bundle-support }`・`{: .bundle-default }` を足し、`notes_` の単位を `div.bundle-notes` で包む
- 見直しが要る論点: この行に表への組み替えを足すときは、両方の関数を入れ子にして残し、目印の数（対応 1640・既定値 423・注意書き 16・札 2719）と漏れ 0 を確かめ直すこと（`.kiro/specs/completed/site-look-list-markers/design.md` の「Revalidation Triggers」・`verification.md` の「目印」）
