起票元: site-look-plan の決定（.kiro/specs/site-look-plan/decisions.md、2026-10-25）から

# Brief: site-look-sstp-playback

## Problem
旧サイトでは、さくらスクリプトの記述例を「読み込み」の後に「実行」ボタンで手元のゴーストに送り、その場で試せた（`sakura_player.js`。`survey.md` の D04）。今のサイトにはこの仕掛けが無く、記述例をコピーして自分で送るしかない。
開発者は、さくらスクリプトの送信を、プロパティシステムや SHIORI Event にも広げて欲しいと求めた（「さくらスクリプトの送信、プロパティシステムや SHIORI EVENT でも対応して欲しい」、2026-10-25）。
実用（記述例をその場で試す）にもまたがる、伺からしい遊びである。

## Current State
- 今のサイトには、手元のベースウェアへ送る仕掛けも、外部のスクリプトの読み込みも無い
- `site-look-sakura-script-highlight` の後、さくらスクリプトの記述例は `code.language-sakurascript`（287 個と、C25 で印を付けた頁の外の 6 個）で見分けられる。旧サイトで `noplay` だった `\![vanishbymyself]` の 1 例は言語指定が無いので、自然に対象の外になる。SSTP などの要求の例（1 行目が `NOTIFY SSTP/1.1` など）も外れる
- 旧サイトは jsstp を `https://cdn.jsdelivr.net/gh/ukatech/jsstp-lib@v3.1.1.2/dist/jsstp.mjs` から読み、選んだゴーストへ `OnUkadocScriptExample` を SSTP で送る
- `site-look-plan` ではこの候補を試作していない（公開サイトから手元のベースウェアへ送り、外部のスクリプトを読む仕掛けなので、Requirement 2.7 と design.md の Security Considerations により試さなかった）。下の論点はこの spec で決める

## Desired Outcome
決めた方向（`decisions.md` の判断）:
- **C13 記述例を手元のゴーストで再生する（プロパティシステム・SHIORI Event にも広げる）**（判断: 採る。開発者の「以下を除き承認」（2026-10-25）により推奨のとおり）: さくらスクリプトの記述例・プロパティシステムの項目・SHIORI Event の項目から、利用者の操作を起点に手元のゴーストへ送れる。送るものの線引きと jsstp の置き方は、この spec で決める
  - さくらスクリプトの記述例（`list/sakura-script` と、C25 で印の付いた `list/propertysystem`・`spec/plugin` の記述例）: 記述例ごとの「実行」で、選んだゴーストへ `OnUkadocScriptExample` を送る
  - `list/propertysystem`: 項目ごとの「値を見る」で、`%property[プロパティ名]` を埋めたスクリプト（例: `\0%property[system.cpu.name]\e`）を送り、手元のベースウェアの今の値をゴーストに喋らせる。`(キー)`・`(ID)` を含む名前は、`site-look-definition-tables` の表のキーごとに組み立てる。書き込みのできるプロパティ（`\![set,property,…]`）は送らない
  - `list/shiori-event`: 項目ごとの「発生させる」で、SSTP の `NOTIFY` で `Event: OnBoot` などを手元のゴーストに送る
  - どれも、さくらスクリプトの記述例と同じ「読み込み」「実行」の流れと、同じ jsstp の読み込みに乗せる
- 目標の画面: ボタンそのものの画面は無い（試作していない）。ボタンを足す先の見え方は、`.kiro/specs/site-look-plan/screenshots/mock-sakura-script-C21-light.png`・`.kiro/specs/site-look-plan/screenshots/mock-sakura-script-C21-dark.png`（記述例）、`.kiro/specs/site-look-plan/screenshots/mock-propertysystem-C23-light.png`・`.kiro/specs/site-look-plan/screenshots/mock-propertysystem-C23-dark.png`（プロパティシステムの項目）、`.kiro/specs/site-look-plan/screenshots/mock-shiori-event-C23-light.png`・`.kiro/specs/site-look-plan/screenshots/mock-shiori-event-C23-dark.png`（SHIORI Event の項目）である。ボタンはこれらの見え方を崩さない
- 頁を開いただけでは何も読み込まず、何も送らない。SSP の無い環境・狭い画面では、何も出ないか、邪魔にならない
- 画面のパスは、`site-look-plan` の完了の後、`.kiro/specs/completed/site-look-plan/screenshots/...` の下に移る

## Approach
画像やブラウザで動く仕掛けを要する遊びなので、視認性の改造と別の spec にした（`roadmap.md` の切り分けの規則）。方向（送れるようにすること）は決まっているので、議論し直さずに、下の論点を要件と設計で決める。
- ゴーストを選ぶ欄と「読み込み」ボタンは、テンプレートの上書き（`頁の組み立て`）か、自作のスクリプトが頁に足す。「読み込み」を押したときに初めて jsstp を読み、ゴーストの一覧を取る。「実行」などのボタンは「読み込み」の後に出す
- 記述例の見分けは `code.language-sakurascript`（C10 の言語の印と C25）に依る。```` ```ss ```` は `sakurascript` のエイリアスで、その印の付け方は `site-look-sakura-script-highlight` が決める（`language-ss` のまま残るなら、それも見分ける）。プロパティシステム・SHIORI Event の項目は、項目の見出しの id と、`site-look-definition-tables` の表から組み立てる
- 決める論点（`candidates.md` の C13 の論点と広げる案から）:
  - **利用者の操作を起点にする**: 頁を開いただけでは何も読み込まず、何も送らない。読み込みは「読み込み」ボタン、送信は「実行」「値を見る」「発生させる」ボタンを押したときだけ
  - **外部の読み込みの扱い**: jsstp を ukadoc-spec の `assets/` に版を固定して置くか（jsstp のライセンスと、ukadoc-spec の CC BY 4.0 との並べ方、更新の扱いが要る）、CDN から読むなら利用者の操作の後にだけ読むか
  - **送る中身の説明**: 危険なタグ（ゴーストの削除など）は `OnUkadocScriptExample` に対応したゴーストでしか実行されない旨の説明を、旧サイトと同じくボタンの近くに置く。その置き方
  - **SHIORI Event の線引き**: ゴーストの状態を変えるイベント（`OnVanishSelected`・`OnFirstBoot` などの終わり・消滅・初回の系）を送ってよいか。Reference の値の例が無いイベントをどう送るか
  - **確かめ方**: SSP のある環境での送信の確かめ方（手元のベースウェアとゴーストの用意、送ったものの見え方の記録）

## Scope
- **In**:
  - 3 種類の送るボタン（記述例の「実行」・プロパティの「値を見る」・イベントの「発生させる」）と、共通の「読み込み」・ゴーストを選ぶ欄
  - jsstp の読み込み方の決定と実装
  - ボタンの見た目（`assets/extra.css`。明・暗）と、危険なタグの説明の置き方
  - 送るものの線引き（書き込みのプロパティを送らない、SHIORI Event の除外の範囲）
- **Out**:
  - 頁を開いたときの自動の読み込み・送信（しない）
  - 旧サイトの `sakura_player.js` の流用（書き直す）
  - 記述例の中身の直しと、言語の印の付け方（`site-look-sakura-script-highlight`）

## Boundary Candidates
- 読み込み（jsstp・ゴーストの一覧）と、送るもの（3 種類のボタン）と、見た目（ボタン・説明）
- 送る種類ごとの線引き（さくらスクリプト・プロパティ・SHIORI Event）は、それぞれ別のタスクにできる

## Out of Boundary
- 原稿（`.md`）・`.nav.yml`・Zensical の版
- ゴーストの側の対応（`OnUkadocScriptExample` を受けるゴーストの用意）
- SSTP 以外の送り方・ベースウェアの設定の変更

## Upstream / Downstream
- **Upstream**: `site-look-sakura-script-highlight`（C10 の言語の印と C25 で記述例を見分ける）、`site-look-definition-tables`（プロパティシステムのキーの表（C23）から、プロパティの名前を組み立てる）。`site-look-plan`（判断と論点）
- **Downstream**: なし（roadmap の最後の spec）

## Existing Spec Touchpoints
- **Extends**: なし（新しい spec）
- **Adjacent**: `site-look-sakura-script-highlight`（記述例の HTML と言語の印）、`site-look-definition-tables`（プロパティシステム・SHIORI Event の表）、`site-look-note-icon` ほかの後続 spec（同じ `assets/extra.css` などを触る。どちらが先でもよく、ぶつかったら `origin/main` に追いつく）

## Constraints
- **方向は議論し直さない**: C13 を採ることは `site-look-plan` の `decisions.md` で決まっている。決めるのは Approach の論点だけである
- **利用者の操作を起点にする**: 公開サイトから手元のベースウェアへ送る仕掛けなので、頁を開いただけでは何も読み込まず、何も送らない。外部のスクリプトの読み込みも、利用者の操作の後に限るか、版を固定して `assets/` に置く
- **旧サイトの素材**: 旧サイト（https://ssp.shillest.net/ukadoc-legacy/manual/ ）の `sakura_player.js`・画像・見た目の指定（`list.css`・`base.css`）は、再利用の許可が明記されていない。流用せず書き直す。jsstp（`ukatech/jsstp-lib`）を使うなら、そのライセンスを確かめる。ukadoc-spec は CC BY 4.0（`afb2152` の LICENSE）
- **原稿は変えない**: 変えるのは ukadoc-spec の `assets/`（スクリプト・`extra.css`、置くなら jsstp）・`mkdocs.yml`（`extra_javascript`）・要るなら `overrides/` で、原稿（`.md`）・`.nav.yml`・Zensical の版は変えない。ただし ukadoc-spec を変えるので、`workflow.md` の「原稿を変えない spec」には当たらない。作業木 `.worktrees/site-look-sstp-playback/` で書き、Build Gate（`prepare_site.py` と `zensical build --strict`）と規約 Gate を通し、`/kiro-complete` で PR にする
- **土台**: ukadoc-spec の `origin/main` の `afb2152`（テーマの色は紺 `#1f4e8c`）の上に、中身で依る `site-look-sakura-script-highlight` と `site-look-definition-tables`（と、その依存先の `site-look-manual-files`・`site-look-list-items`）が入った版（それぞれの PR のマージの後に始める）。ほかの後続 spec（`site-look-note-icon` など）は先に入っていても、まだでもよい
- **Zensical 0.0.67 の制限**: テンプレートは minijinja で描画する。partial を丸ごと写さず、CSS とブロックの上書き（`custom_dir: overrides` の `{% block … %}{{ super() }}…`。通ることは確かめ済み）にとどめる。`extra_javascript` は通る。`build --strict` は、存在しない `extra_css` を指定しても検出しない（足したスクリプトが `serve` で 200 になることを確かめる）
- **試作で確かめた事実**（この候補は試作していないので、隣の候補で確かめたもの）:
  - `pymdownx.highlight`（`use_pygments: false`）の後、全 449 コードブロックが `pre.highlight > code` の形で、さくらスクリプトの記述例だけに `language-sakurascript` が付く
  - 字を包むスクリプトは、包んだ後の `textContent` が元と同じことを確かめる形にした。ボタンを足すときも、コピーされる字と右上のコピーのボタンを変えない
  - 暗い表示の印 `data-md-color-scheme="slate"`（明るい表示は `default`）は `<html>` でなく `<body>` に付く。暗い表示だけの色は `[data-md-color-scheme="slate"] .md-typeset …` の形で書く
  - 色はテーマの色の変数（`--md-primary-fg-color` など）から取り、直書きしない（試作の途中でテーマの色が緑から紺に変わり、直書きの色を作り直した）
  - `extra.css` の URL に版の印が無いので、開発者のブラウザに古い写しが残ることがある。見せる前に強制の再読み込み（Ctrl+F5）を頼む
- **表示の確かめ方**:
  - `serve` は `_site_src/` を見る（`docs_dir: _site_src`）ので、リポジトリ直下の `assets/`・`scripts/` を直したら `python scripts/prepare_site.py` を流し直す。`zensical serve` を動かしたまま流すと、書きかけの `_site_src/` を拾って壊れることがある（試作で `extra.css` が 404 になった）。`serve` を止めてから `prepare_site.py` と `zensical build --strict` を流し、起動し直す
  - `zensical serve` の頁の HTML を取ってきて、スクリプトの読み込みと、頁を開いた時点で外部への読み込みが無いこと（ブラウザの通信の記録）を確かめる。頁の道は `/ukadoc-spec/` から始まる（`site_url` が `https://ukatech.shillest.net/ukadoc-spec/`）
  - 明・暗の画面は `node .kiro/specs/completed/site-look-plan/tools/shot.mjs <url> <selector> <out> light|dark [width] [height]`（既定 1000×700）で撮り、Desired Outcome の画面と同じセレクタ（`list/sakura-script` の `#bang-lock-repaint`、`list/propertysystem` の `[id="system.cpu"]`、`list/shiori-event` の `#OnBoot`）で、ボタンが見え方を崩さないことを見比べる（`site-look-plan` の完了の前は `.kiro/specs/site-look-plan/tools/shot.mjs`）。`shot.mjs` は使い捨てのプロファイルのヘッドレスの Edge で、ボタンを押さないので送信は起きない
  - 狭い画面: `node .kiro/specs/completed/site-look-plan/tools/shot.mjs <url> body - light 375` で、`scrollWidth` と `innerWidth` が同じ（375）ことを確かめる。狭い画面の画面は残さない
  - `shot.mjs` はまれに（54 枚に 5 枚）撮る途中の描き直しで二重に重なった PNG を書く。左右の端にヘッダの色の行が上の端以外にも出ていたら撮り直す
  - 送信の確かめは、SSP の動く手元の環境で、開発者がボタンを押して行う（自動の確かめでは送らない）
- **失わないもの**（`survey.md` の「失わないもの」）: D15 検索（ボタンの字が検索の結果を汚さない）・D16 ダークモード（ボタンが明・暗の両方で読める）・D17 見出しへのリンク（見出しの id・`a.headerlink`（¶）・右の欄の目次を変えない）・D18 狭い画面（幅 375 で `scrollWidth` = `innerWidth`。邪魔にならない）・D19 コードのコピー（ボタンが記述例の読み取りとコピーを妨げず、コピーされる字を変えない）・D20 記述例の字（記述例の `\` を `\` のまま見せ、送る字も `\` のまま）
- **遊びの条件**（`candidates.md` の C13）: ボタンが記述例の読み取りとコピーを妨げない。「読み込み」の前はボタンを出さない。SSP の無い環境・狭い画面では、何も出ないか、邪魔にならない。明るい表示とダークモードの両方で、ボタンが読める
- **参考**: 試作は無い。論点の元は `.kiro/specs/site-look-plan/candidates.md` の C13（完了の後は `.kiro/specs/completed/site-look-plan/candidates.md`）と design.md の Security Considerations
- **小さな PR**: 他者も使う公開リポジトリへの PR なので、この brief の候補の外に広げない。3 種類のボタンを 1 つの PR にするか分けるかは、設計で決めてよい
