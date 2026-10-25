起票元: site-look-plan の決定（.kiro/specs/site-look-plan/decisions.md、2026-10-25）から

# Brief: site-look-dark-link-color

## Problem
UKADOC の公開サイトを暗い表示（ダークモード）で読むと、本文のリンクと左の目次の今の頁の印がほとんど読めない。
ukadoc-spec の `417511c` でテーマの色が緑から紺 `#1f4e8c` に変わり、リンクの色（`--md-typeset-a-color`）も明・暗とも紺になった。暗い表示の地 `#1e2129` に対して 1.94:1 しかない（緑の時は約 3.9:1）。
今の本番（`afb2152`）がこの状態なので、見た目の計画の中でいちばん急ぐ直しである。

## Current State
- `assets/extra.css` は約 20 行で、`[data-md-color-primary="custom"]` にテーマの紺（`--md-primary-fg-color: #1f4e8c` など）を定め、目次の一覧の詰めと記述例の折り返しを足しただけである
- 暗い表示（`[data-md-color-scheme="slate"]`）だけの指定は無い。リンクと左の目次の今の頁は、どちらも `--md-typeset-a-color` の紺で描かれる
- `site-look-plan` の試作で、暗い表示だけリンクの色を明るい紺 `#8fb4e8` にすると、暗い地に 7.56:1 になることを測った（`mockups/README.md` の「紺への撮り直し」）

## Desired Outcome
- **C24 暗い表示のリンクを明るい紺にする**（判断: 採る。開発者の「以下を除き承認」（2026-10-25）により推奨のとおり）
  - 目標の画面: `.kiro/specs/site-look-plan/screenshots/mock-sakura-script-C24-dark.png` のリンクと左の目次の今の頁。明るい表示は変えない（見比べに `.kiro/specs/site-look-plan/screenshots/mock-sakura-script-C24-light.png`）
  - この画面は、採ると決まったほかの候補（C01〜C21）も `?slp=` に入れて撮ったものである。この spec の目標は、リンクと左の目次の色だけである
- 暗い表示のリンクと左の目次の今の頁が、暗い地に 7:1 ほど（試作では 7.56:1）の対比で読める。明るい表示の見え方は今のまま
- 画面のパスは、`site-look-plan` の完了の後、`.kiro/specs/completed/site-look-plan/screenshots/...` の下に移る

## Approach
`assets/extra.css` に、暗い表示だけ `--md-typeset-a-color` を明るい紺 `#8fb4e8` にする指定を 1 つ足す（試作の C24 は `[data-md-color-scheme="slate"] { --md-typeset-a-color: #8fb4e8; }`）。
左の目次の今の頁も同じ変数を使うので、一緒に直る。方向は `site-look-plan` で決まっているので、議論し直さずに要件へ進む。

## Scope
- **In**:
  - `assets/extra.css` の暗い表示のリンクの色（本文のリンク・左の目次の今の頁など、`--md-typeset-a-color` を使う所）
  - 明・暗の画面での見比べと、対比の測り（暗い地に 7:1 ほど）
- **Out**:
  - 明るい表示の色（紺のリンクは白地に 8.31:1 あり、変えない）
  - ヘッダの地の紺（`--md-primary-fg-color`）
  - ほかの見た目の候補（項目名の帯など。後続の spec が行う）

## Boundary Candidates
- 暗い表示の色の変数の上書き（`extra.css` の 1 か所）と、明るい表示（触らない）
- リンクの色と、ホバーの色（`accent: indigo`）は別の変数である。ホバーの見え方は確かめるだけにし、読めないと分かったときだけ足す

## Out of Boundary
- テーマの色そのもの（紺 `#1f4e8c`）の変更
- `mkdocs.yml` の `palette` の変更
- 原稿（`.md`）・`.nav.yml`・`requirements.txt`・Zensical の版

## Upstream / Downstream
- **Upstream**: `site-look-plan`（C24 の判断と目標の画面）。ukadoc-spec の `afb2152` の `assets/extra.css`（紺のテーマ）
- **Downstream**: `site-look-list-items`（同じ `assets/extra.css` に書き足すので、この spec の後に入れる）

## Existing Spec Touchpoints
- **Extends**: なし（新しい spec）
- **Adjacent**: `site-look-list-items`（同じ `assets/extra.css` を触る次の spec）。`site-look-plan`（決定の起票元。完了の後は `completed/` の下）

## Constraints
- **方向は議論し直さない**: 候補と判断は `site-look-plan` の `decisions.md` で決まっている。この spec は、決まった見え方を本番の書き方で入れる
- **原稿は変えない**: 変えるのは ukadoc-spec の `assets/extra.css` だけで、原稿（`.md`）・`.nav.yml`・`requirements.txt`・Zensical の版は変えない。ただし ukadoc-spec を変えるので、`workflow.md` の「原稿を変えない spec」には当たらない。作業木 `.worktrees/site-look-dark-link-color/` で書き、Build Gate（`prepare_site.py` と `zensical build --strict`）と規約 Gate を通し、`/kiro-complete` で PR にする
- **土台**: ukadoc-spec の `origin/main` の `afb2152`（テーマの色は紺 `#1f4e8c`。`assets/extra.css` の `[data-md-color-primary="custom"]` で `--md-primary-fg-color` などを定める）。ukadoc-spec のライセンスは `afb2152` で CC BY 4.0 と定まった。`origin/main` が進んでいたら、その上で書く
- **旧サイトの素材**: 旧サイト（https://ssp.shillest.net/ukadoc-legacy/manual/ ）の画像・見た目の指定（`list.css`・`base.css`）・スクリプト（`sakura_player.js` など）は、再利用の許可が明記されていない。写さずに書き直す
- **Zensical 0.0.67 の制限**: テンプレートは minijinja で描画する。partial を丸ごと写さず、CSS とブロックの上書きにとどめる。`build --strict` は、存在しない `extra_css` を指定しても検出しない（配られた `assets/extra.css` に指定があることを `serve` で確かめる）
- **試作で確かめた事実**:
  - 暗い表示の印 `data-md-color-scheme="slate"`（明るい表示は `default`）は `<html>` でなく `<body>` に付く。暗い表示だけの指定は `[data-md-color-scheme="slate"]` を頭にして書く
  - 色はなるべくテーマの色の変数から取る。試作の途中でテーマの色が緑から紺に変わり（`417511c`）、直書きの色を作り直した。`#8fb4e8` は変数で出せない色なので、明・暗の地との対比（暗い地 `#1e2129` に 7.56:1）を測って記録する。テーマの色がまた変わったときに直す所だと分かるよう、`extra.css` の注に紺との対だと書く
  - `extra.css` の URL に版の印が無いので、開発者のブラウザに古い写しが残ることがある。見せる前に強制の再読み込み（Ctrl+F5）を頼む
- **表示の確かめ方**:
  - `serve` は `_site_src/` を見る（`docs_dir: _site_src`）ので、リポジトリ直下の `assets/` を直したら `python scripts/prepare_site.py` を流し直す。`zensical serve` を動かしたまま流すと、書きかけの `_site_src/` を拾って壊れることがある（試作で `extra.css` が 404 になった）。`serve` を止めてから `prepare_site.py` と `zensical build --strict` を流し、起動し直す
  - `zensical serve` の頁で、配られた `assets/extra.css` に足した指定があることを確かめる。頁の道は `/ukadoc-spec/` から始まる（`site_url` が `https://ukatech.shillest.net/ukadoc-spec/`）
  - 明・暗の画面は `node .kiro/specs/completed/site-look-plan/tools/shot.mjs <url> <selector> <out> light|dark [width] [height]`（既定 1000×700）で撮り、目標の画面と同じセレクタ（`#bang-lock-repaint`）で見比べる（`site-look-plan` の完了の前は `.kiro/specs/site-look-plan/tools/shot.mjs`）。標準出力に `wrote`・`scrollWidth`・`innerWidth` が出る
  - 狭い画面: `node .kiro/specs/completed/site-look-plan/tools/shot.mjs <url> body - light 375` で、`scrollWidth` と `innerWidth` が同じ（375）ことを確かめる。狭い画面の画面は残さない
  - `shot.mjs` はまれに（54 枚に 5 枚）撮る途中の描き直しで二重に重なった PNG を書く。左右の端にヘッダの色の行が上の端以外にも出ていたら撮り直す
- **失わないもの**（`survey.md` の「失わないもの」）: D15 検索（頭の帯の検索の欄と結果の語の強調を隠さない）・D16 ダークモード（色は明・暗の両方で決め、どちらでも字と地の差が十分にある。この spec の主題）・D17 見出しへのリンク（見出しの id・`a.headerlink`（¶）・右の欄の目次を変えない）・D18 狭い画面（幅 375 で `scrollWidth` = `innerWidth`）・D19 コードのコピー（コピーのボタンを残し、コピーされる字を変えない）・D20 記述例の字（記述例の `\` を `\` のまま見せる）
- **参考の試作**: `.kiro/specs/site-look-plan/mockups/extra.css` の C24（`html[data-slp~="C24"]` の下の使い捨ての指定）と `mockups/README.md` の測り。完了の後は `.kiro/specs/completed/site-look-plan/mockups/`。写さずに書き直してよい
- **小さな PR**: 他者も使う公開リポジトリへの PR なので、この brief の候補の外に広げない。ほかの後続 spec を待たずに入れてよい
