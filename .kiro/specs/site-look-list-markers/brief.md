起票元: site-look-plan の決定（.kiro/specs/site-look-plan/decisions.md、2026-10-25）から

# Brief: site-look-list-markers

## Problem
まとめ頁で、注意書きの節・対応ベースウェア・既定値が、ほかの文と見分けにくい。
頁の頭の注意書き（`notes_*.md`）は項目の一覧と同じ見え方で、別の種類の文だと分からない（`survey.md` の D05）。
「対応:」の段落は普通の太字の段落で、どのベースウェアに対応するかを名前ごとに追えない（D02・D09。旧サイトは画像の印で見分けていた）。
「既定値:」の段落も説明の文に埋もれる（D07）。
また明るい表示の色付きの字（札など）は、試作の色だと白地に 5〜6:1 ほどで、開発者に「黒は良いけど色付き文字が明るすぎる」と指摘された。

## Current State
- `**対応:**`・`**既定値:**` の段落にも、注意書きの節にも、HTML の class が無い。見た目の指定だけでは見分けられない
- `scripts/prepare_site.py` は、まとめ頁の項目を 1 頁に組み立てる（`unit_body()`）。ここで目印を足せることを `site-look-plan` で確かめた（`research.md` の「`prepare_site.py` で目印を付けたときの影響」）
- 試作で付けた目印: `notes_*.md` の単位を包む `<div class="slp-notes" markdown="1">`（サイト全体で 16 個。`list/sakura-script` 14・`list/propertysystem` 2）、`**対応:**` の段落の `{: .slp-support }`（1623 段落）、名前の `<span class="slp-bw slp-bw-ssp">SSP</span>`（Materia・SSP・CROW・Ninix。2641 個）、`**既定値:**` の段落の `{: .slp-default }`（423 段落）（`c84942a` 時点の数。`afb2152` では `**対応:**` が 1641 行に増えた（`70cac39`）。spec の初めに数え直す）
- `site-look-list-items` が、項目名・分類の見出し・記述例の見え方を入れた後である

## Desired Outcome
決めた方向（`decisions.md` の判断。どれも開発者の「以下を除き承認」（2026-10-25）により推奨のとおり）:
- **C04 注意書きの節を枠の箱に入れる**（判断: 採る）: 注意書きの節が点線の枠の箱になり、見出しが中央寄せで点線の下に区切られる。目標の画面: `.kiro/specs/site-look-plan/screenshots/mock-sakura-script-C04-light.png`・`.kiro/specs/site-look-plan/screenshots/mock-sakura-script-C04-dark.png` の点線の箱と中央寄せの見出し
- **C06 対応のベースウェアを名前ごとの札にする**（判断: 採る）: 「対応:」の後の名前（Materia・SSP・CROW・Ninix）が名前ごとの色の枠の札になる（` / ` は残す）。目標の画面: `.kiro/specs/site-look-plan/screenshots/mock-sakura-script-C06-light.png`・`.kiro/specs/site-look-plan/screenshots/mock-sakura-script-C06-dark.png` の札
- **C07 既定値を説明の文と分けて見せる**（判断: 採る）: 「既定値:」が枠の札になり、段落が字下げされる。値の字の色は画面より濃くし、本文の色に近づける（「省略不可」のような大事な値を控えめにしない）。斜めの字は使わない。目標の画面: `.kiro/specs/site-look-plan/screenshots/mock-descript-ghost-C07-light.png`・`.kiro/specs/site-look-plan/screenshots/mock-descript-ghost-C07-dark.png` の札と字下げ
- **C17 明るい表示の色付きの字を濃くする**（判断: 採る）: 明るい表示で、札などの色付きの字を白地に 7:1 以上にする。リンクは紺のままで 8.31:1 あるので上書きしない。暗い表示とヘッダの地の色は変えない。目標の画面: `.kiro/specs/site-look-plan/screenshots/mock-sakura-script-C17-light.png` の札の濃さ（この spec で当てるのは、この spec が作る C06 の札だけである。画面のタグ・環境変数の濃さは `site-look-sakura-script-highlight` が C10・C20 と一緒に、木のファイル名の濃さは `site-look-manual-files` が C15 と一緒に入れる。それらの `span` は別の spec が作るので、この spec の指定では色を当てない）
- 採らなかった組: C05（対応の段落を 1 本の帯にする）は C06 と、C11（バルーン風）は C04 と両立しない組の採らなかった方で、この spec では作らない。ただし C11 は C04 と同じ目印（`div.slp-notes` に当たるもの）を使うので、キャラクター（C12、roadmap のバックログ）が決まった後に見た目の指定だけで入れ替えられる形に目印を残す
- 画面のパスは、`site-look-plan` の完了の後、`.kiro/specs/completed/site-look-plan/screenshots/...` の下に移る

## Approach
`scripts/prepare_site.py` のまとめ頁の後処理で目印を付け、`assets/extra.css` でその目印に見た目を当てる（目印を付ける後処理は、それを使う見た目の改造と同じ spec に入れる。`roadmap.md` の切り分けの規則）。
- C04: `notes_*.md` の単位を `md_in_html` の `div` で包む（`md_in_html` は有効）。見出しが `div` の中に入っても id・¶・目次が変わらないことを確かめる（試作では変わらなかった）
- C06: `**対応:**` の段落の末尾に段落の目印を足し、` / ` で区切った各部分のうち「名前、または名前と空白と数字の版」に合うものの名前だけを `span` で包む。版などの後ろの字（例: `SSP 2.8.40`）は札の後ろにそのまま残す。形に収まらない部分（30 通り・63 行。`c84942a` 時点の数。`afb2152` では `**対応:**` が 1641 行に増えた（`70cac39`）。spec の初めに数え直す。例: `Materia廃止仕様 / SSP`、`SSP (オプションは2.4～) / Ninix`）は札にせずそのまま残す
- C07: `**既定値:**` の段落の末尾に目印を足す
- C17: 明るい表示（`[data-md-color-scheme="default"]`）の C06 の札の色を白地に 7:1 以上にする。試作の C17 にあったタグ（`.slp-ss-tag`・`.slp-ss-env`）と木のファイル名（`.slp-tree-file`）の行は、この spec に入れない（それぞれを作る spec の指定に入れれば、どちらが先に入っても色の勝ち負けが変わらない）。「明るい表示は白地に 7:1 以上」の物差しは、ほかの spec も同じに使う

## Scope
- **In**:
  - `prepare_site.py` の目印（注意書きの節の包み・対応の段落と名前・既定値の段落）
  - C04・C06・C07・C17 の見た目の指定（`assets/extra.css`。C17 は C06 の札の明るい表示の色だけ）
  - 目印の名前の決定（試作の `slp-` の接頭辞は `site-look-plan` の略なので、本番の名前をこの spec で決める）
  - 明・暗の画面と 375 px の確かめ
- **Out**:
  - さくらスクリプトのタグ・環境変数の色と、その明るい表示の濃さ（`site-look-sakura-script-highlight`。C10 の色は C20 が置き換える）
  - `manual/` の頁の木のファイル名の色と、その明るい表示の濃さ（`site-look-manual-files`）
  - 注釈の見出しのアイコン（`site-look-note-icon`。C04 の箱に入る `notes_` の見出しに付ける）
  - C05・C11（採らない）、ベースウェアの画像の印（旧サイトの `icon_*.png` は使わない）

## Boundary Candidates
- 目印を付ける後処理（`prepare_site.py`）と、それを使う見た目の指定（`extra.css`）
- 注意書きの節（C04）と、項目の中の段落（C06・C07）
- 色の濃さの決め（C17）は、この spec が作る札にだけ当てる。物差し（明るい表示は白地に 7:1 以上）は共通だが、ほかの spec が作る字の色は、その spec が自分の指定で決める

## Out of Boundary
- 原稿（`.md`）・`.nav.yml`・`requirements.txt`・Zensical の版。`**対応:**` の行の書き方（形に収まらない 63 行を原稿で直すこと）も扱わない
- ベースウェアの名前を足すこと（例: areka を `**対応:**` に載せるか）は `product.md` の未決の事項で、この spec では決めない。名前を足すときは札の対応を足すだけで済む形にする
- `dev/nar.md` の 1 個の `**対応:**`（まとめ頁の後処理を通らないので目印が付かない）

## Upstream / Downstream
- **Upstream**: `site-look-list-items`（C04 の箱は、C01・C03 が `notes_` の見出しを帯から除くことに依る。同じ PR の単位 `site-look-lists`）。`site-look-plan`（判断と目標の画面）
- **Downstream**: `site-look-note-icon`（C26 のアイコンを、C04 の箱に入る `notes_` の見出しに付ける）

## Existing Spec Touchpoints
- **Extends**: なし（新しい spec）
- **Adjacent**: `site-look-list-items`（同じまとめ頁の見え方）、`site-look-sakura-script-highlight`・`site-look-manual-files`（C17 と同じ「明るい表示は白地に 7:1 以上」の物差しで、自分の作る字の色を決める）、`site-look-definition-tables`（同じ `prepare_site.py` に後処理を足す）。どれも同じ `assets/extra.css`・`prepare_site.py` を触るが、どちらが先でもよく、ぶつかったら `origin/main` に追いつく

## Constraints
- **方向は議論し直さない**: 候補と判断は `site-look-plan` の `decisions.md` で決まっている。この spec は、決まった見え方を本番の書き方で入れる
- **原稿は変えない**: 変えるのは ukadoc-spec の `scripts/prepare_site.py` と `assets/extra.css` で、原稿（`.md`）・`.nav.yml`・`requirements.txt`・Zensical の版は変えない。ただし ukadoc-spec を変えるので、`workflow.md` の「原稿を変えない spec」には当たらない。作業木 `.worktrees/site-look-list-markers/` で書き、Build Gate（`prepare_site.py` と `zensical build --strict`）と規約 Gate を通し、`/kiro-complete` で PR にする
- **土台**: ukadoc-spec の `origin/main` の `afb2152`（テーマの色は紺 `#1f4e8c`）の上に、中身で依る `site-look-list-items` が入った版（同じ PR の単位 `site-look-lists` の作業木を引き継ぐ）。ほかの後続 spec（`site-look-dark-link-color` など）は先に入っていても、まだでもよい。ukadoc-spec のライセンスは `afb2152` で CC BY 4.0 と定まった
- **旧サイトの素材**: 旧サイト（https://ssp.shillest.net/ukadoc-legacy/manual/ ）のベースウェアの画像の印（`icon_m.png`・`icon_s.png`・`icon_c.png`・`icon_n.png`）・見た目の指定（`list.css`・`base.css`）・スクリプト（`sakura_player.js` など）は、再利用の許可が明記されていない。使わずに文字の札にする。画像の印にするなら管理者の確認が要る
- **Zensical 0.0.67 の制限**: テンプレートは minijinja で描画する。partial を丸ごと写さず、CSS とブロックの上書きにとどめる。`build --strict` は、存在しない `extra_css` を指定しても検出しない
- **試作で確かめた事実**:
  - `prepare_site.py` で `attr_list` の `{: .cls }` を足すのは、段落の末尾（空行の手前）に限る。1 行目の直後に足すと、`<br />` で続く段落で `{: … }` が本文にそのまま出た（`descript/shell-surfaces/` で 6 か所）。末尾に足すと漏れは 0。見出しの数の検査（`old_ids`）は見出しの行だけを見るので響かず、`build --strict` も通る。コードブロックの中は触らない
  - 漏れの確かめ: build の全頁で本文に漏れた `{: ` が 0 であることを数える。`<strong>既定値:</strong>` の段落で目印の付かないものが 0 であることも数える
  - C04 の `div` で包んでも、見出しの id・`a.headerlink`（¶）・右の欄の目次は変わらなかった（`list/sakura-script` の `class="headerlink"` 649・`href="#notes_…"` 75・`class="md-nav__link"` 423 が包む前と同じ）
  - 暗い表示の印 `data-md-color-scheme="slate"`（明るい表示は `default`）は `<html>` でなく `<body>` に付く。暗い表示だけ・明るい表示だけの色は `[data-md-color-scheme="slate"] .md-typeset …`・`[data-md-color-scheme="default"] .md-typeset …` の形で書く
  - 色はなるべくテーマの色の変数から取る（試作の途中でテーマの色が緑から紺に変わり、直書きの色を作り直した）。札の色はベースウェアごとに変数で出せないので、明・暗それぞれで対比を測って記録する（紺のテーマの撮り直しで、SSP の札は明 8.34:1・暗 8.00:1。C17 を足したときの測りでは、明るい表示の札が 8.34〜10.93:1 だった）。C06 の札は CROW が画面に写っていないので、CROW の札も明・暗で確かめる
  - 札は名前の字を残すので、色だけに頼らない。検索の字は変わらない（`span` で包むだけ）
  - `extra.css` の URL に版の印が無いので、開発者のブラウザに古い写しが残ることがある。見せる前に強制の再読み込み（Ctrl+F5）を頼む
- **表示の確かめ方**:
  - `serve` は `_site_src/` を見る（`docs_dir: _site_src`）ので、リポジトリ直下の `assets/`・`scripts/` を直したら `python scripts/prepare_site.py` を流し直す。`zensical serve` を動かしたまま流すと、書きかけの `_site_src/` を拾って壊れることがある（試作で `extra.css` が 404 になった）。`serve` を止めてから `prepare_site.py` と `zensical build --strict` を流し、起動し直す
  - `zensical serve` の頁の HTML を取ってきて、目印の数を確かめる（試作の数: `list/sakura-script` で段落の目印 350・名前の札 653・注意書きの包み 14、`descript/ghost` で段落の目印 74・既定値の目印 74）。頁の道は `/ukadoc-spec/` から始まる（`site_url` が `https://ukatech.shillest.net/ukadoc-spec/`）
  - 明・暗の画面は `node .kiro/specs/completed/site-look-plan/tools/shot.mjs <url> <selector> <out> light|dark [width] [height]`（既定 1000×700）で撮り、目標の画面と同じセレクタ（C04 は `#notes_escape`、C06・C17 は `#bang-lock-repaint`、C07 は `descript/ghost` の `#charset`）で見比べる（`site-look-plan` の完了の前は `.kiro/specs/site-look-plan/tools/shot.mjs`）。標準出力に `wrote`・`scrollWidth`・`innerWidth` が出る
  - 狭い画面: `node .kiro/specs/completed/site-look-plan/tools/shot.mjs <url> body - light 375` で、`scrollWidth` と `innerWidth` が同じ（375）ことを確かめる。狭い画面の画面は残さない
  - `shot.mjs` はまれに（54 枚に 5 枚）撮る途中の描き直しで二重に重なった PNG を書く。左右の端にヘッダの色の行が上の端以外にも出ていたら撮り直す。`#notes_escape` の位置では、ヘッダの題が切り替わりの途中で重なって写ることがある（本文には響かない）
- **失わないもの**（`survey.md` の「失わないもの」）: D15 検索（検索で引ける字を変えない。札は `span` で包むだけ）・D16 ダークモード（色は明・暗の両方で決め、どちらでも字と地の差が十分にある）・D17 見出しへのリンク（箱で包む見出しの id・`a.headerlink`（¶）・右の欄の目次を変えない）・D18 狭い画面（幅 375 で `scrollWidth` = `innerWidth`）・D19 コードのコピー（コピーのボタンを残し、コピーされる字を変えない）・D20 記述例の字（記述例の `\` を `\` のまま見せる）
- **参考の試作**: `.kiro/specs/site-look-plan/mockups/extra.css` の C04・C06・C07・C17（C17 は `.slp-bw-*` の 4 行だけ。`html[data-slp~="Cxx"]` の下の使い捨ての指定）、`mockups/worktree.diff` の `scripts/prepare_site.py` の `slp_mark()`、`mockups/README.md` の測り。完了の後は `.kiro/specs/completed/site-look-plan/mockups/`。写さずに書き直してよい
- **小さな PR**: 他者も使う公開リポジトリへの PR なので、この brief の候補の外に広げない
