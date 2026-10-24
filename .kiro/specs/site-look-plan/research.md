# ギャップ分析: site-look-plan

## Summary
- **Feature**: `site-look-plan`
- **Discovery Scope**: 計画の spec（調査・使い捨ての試作・後続 spec への切り分け）。ukadoc-spec には本番の変更を入れない
- **調べた時点**: doc_edit `9f2d54c`、ukadoc-spec `main` = `origin/main` = `0e028a4`（checkout が遅れていない）。ローカルの `.venv`（Zensical 0.0.67・pymdown-extensions 12.1・Pygments 2.21.0）で `prepare_site.py` と `zensical build --strict` が通る（`_site_src/` `_site/` に作った。どちらも gitignore 済み）
- **Key Findings**:
  1. 今のサイトの HTML には、旧サイトにあった「部品の名札」が無い。`**対応:**` `**既定値:**` は `<p><strong>…</strong>` のただの段落、パラメータは `<li><strong>` で、どちらも class が付かない。見た目の指定（CSS）だけでは「対応」と「既定値」と他の太字の段落を見分けられない。brief の「視認性は CSS とテンプレートで済む」という境界は、ここで崩れる可能性がある
  2. ```` ```sakurascript ```` の言語名は HTML に残らない（`pymdownx.highlight` を設定していないので、superfences が `<div class="highlight"><pre><span></span><code>` だけを出す。`language-*` の class は 0 個）。ブラウザ側で着色する案（brief の (c)）も、サイトを作る処理の側で言語の印を残さない限り成り立たない
  3. 旧サイトには、記述例を手元の SSP に送って再生する仕掛け（`sakura_player.js`。jsstp を CDN から読み、「読み込み」ボタンを押すまで接続しない）がある。brief の遊びの例には無いが、見比べで必ず拾う「旧サイトにあって今のサイトに無い機能」である
  4. doc_edit の手順は、spec が ukadoc-spec を変えて PR にする前提で組まれている。`/kiro-complete`（作業木の存在を要求し、PR 可否判定で止まる）、`workflow.md` のタスク生成ルール（最終タスクに Build Gate）、`/kiro-impl`（自律モードで判断を開発者に返さない）が、この計画の spec に合わない
  5. 画面の記録（スクリーンショット）をファイルとして spec に残す道具が、まだ決まっていない（`.venv` に playwright は無い。Edge はある）

## Research Log

### サイト生成の現状（ukadoc-spec の build 側）
- **Context**: Requirement 2・3（候補の変更の種類の見込み、試作の作り方）の前提
- **Sources Consulted**: `ukadoc-spec/mkdocs.yml`、`assets/extra.css`、`scripts/prepare_site.py`、`requirements.txt`、`.github/workflows/pages.yml`、`.nav.yml`、`.venv/Lib/site-packages/zensical/config.py` と `templates/`、生成した `_site/`
- **Findings**:
  - `mkdocs.yml`: `theme.name: material`・`variant: classic`・`primary: custom`（色は `extra.css`）・明暗の切り替えあり（`default` / `slate`）。`custom_dir` と `extra_javascript` は未使用。`markdown_extensions` を明示しているので、Zensical の既定の拡張一式（`pymdownx.highlight` を含む）は入らない
  - `assets/extra.css`（20 行）: ヘッダの緑（`#2e8233`）、目次の詰め、`pre > code` の折り返しの 3 つだけ
  - `prepare_site.py`: 原稿を `_site_src/` に写す。まとめ頁では項目の間に `---`（`<hr />`。さくらスクリプトの頁で 374 個）を入れ、`**カテゴリ:**` の行を消す。`EXTENSIONS`（見出しの id の計算用）は `mkdocs.yml` の拡張と手でそろえてある。毎回 `_site_src/` を消して作り直し、`assets/` を丸ごと写す
  - Zensical 0.0.67 は `theme.custom_dir`（`config.py` 582 行）と `extra_javascript`（734 行）を受け付ける。テンプレートには `extrahead` `content` `footer` などのブロックがある（`templates/base.html`）。partial は `partials/` に 40 ほど
  - CI（`pages.yml`）は `pip install -r requirements.txt` → `prepare_site.py` → `zensical build --strict` → Pages。PR の CI は無い
- **Implications**: 試作で触るのは `assets/extra.css`、`mkdocs.yml`（`extra_css` `extra_javascript` `custom_dir`）、新しいテンプレートの上書き、`prepare_site.py` の後処理のどれかになる。どれも作業木の中なら原稿を変えずにできる

### 生成された頁の構造（試作の対象を選ぶ材料）
- **Context**: Requirement 1.1・3.1（対象の頁の選び方）
- **Findings**（`_site/` を数えたもの）:

  | 頁 | 大きさ | 項目（h3） | コードブロック |
  |---|---|---|---|
  | `list/sakura-script/` | 498 KB | 373 | 288 |
  | `list/shiori-event/` | 384 KB | 330 | 0 |
  | `list/shiori-event-ex/` | 288 KB | 176 | 0 |
  | `list/propertysystem/` | 217 KB | 162 | 5 |
  | `descript/shell-surfaces/` | 212 KB | 57 | 21 |
  | `descript/balloon/` | 157 KB | 171 | 1 |
  | `descript/ghost/` | 94 KB | 77 | 1 |
  | `manual/*`（8 頁） | 41〜49 KB | 0 | 1〜6 |

  - `**対応:**` の段落はさくらスクリプトの頁だけで 350 個。`descript/ghost/` では `**既定値:**` と `**対応:**` が 74 個ずつ
  - admonition はサイト全体で note 2・tip 9・warning 3 と少ない（brief の「注記をバルーン風にする」は、効く場所が少ない）
  - 本文の画像は `assets/image/` に 14 枚
- **Implications**: 試作の代表には、記述例・対応・パラメータがそろう `list/sakura-script/`、既定値と対応が並ぶ `descript/` の 1 頁（例: `descript/ghost/`）、1 ファイル 1 頁の `manual/` の 1 頁、が候補になる（**前提**。決めるのは要件の話し合い。OPEN QUESTION 1）

### コードブロックの数（brief の数字の確かめ）
- **Findings**: ```` ```sakurascript ```` は 287 個（254 ファイル）。言語指定の無いフェンスの行は 611 行あるが、これは閉じのフェンス（287 + 162）を含む数で、**言語指定の無いコードブロックは 162 個**。生成された `<pre>` は計 449 個（= 287 + 162）
- **Implications**: brief の「言語指定の無いコードブロック（約 610 個）」は行数を数えたものと見られる。着色で HTML が変わるブロックは約 162 個と見直す（後続の着色 spec の brief に正しい数を書く）

### 旧サイトの下調べ（見比べそのものは Requirement 1 で行う）
- **Context**: 見比べで何を拾うことになるかの見当。調査の本体ではない
- **Sources Consulted**: `https://ssp.shillest.net/ukadoc-legacy/manual/`（`base.css`）、`list_sakura_script.html`（`list.css`、`sakura_player.js`）。scratchpad に落として構造だけを見た
- **Findings**:
  - 項目は `<dl>` の `dt.entry`（項目名）と `dd.entry`（中身）で組まれ、項目ごとに枠がある
  - 対応ベースウェアは `ul.supported-baseware` に**画像の印**（`icon_m.png` `icon_s.png` `icon_c.png` `icon_n.png`、34×16）で並ぶ（350 個）
  - 記述例は `div.legend > section.code` の箱に `<h1>記述例</h1>` を付けて置く（255 個）。コードは `<code type="SakuraScript">`
  - 背景や区切りに画像（`shade_v.png` `shade_h.png`、文書アイコン `icon_doc-*.png`）を使う
  - `sakura_player.js`: 「読み込み」ボタンで jsstp（`cdn.jsdelivr.net/gh/ukatech/jsstp-lib`）を読み、起動中のゴースト一覧から選んだゴーストへ記述例を送る実行ボタンを付ける
- **Implications**:
  - 「対応」の画像の印・項目の枠・記述例の箱は、どれも今のサイトでは HTML に目印が無い（Key Finding 1）。CSS だけで真似るには限界がある
  - 印の画像は旧サイトの素材で、再利用の許可が明記されていない（brief の Constraints）。使うなら管理者への確認、使わないなら自作の印（文字のバッジなど）になる
  - 記述例の再生は「遊び」と「実用」の両方にまたがる候補になる。公開サイトから手元の SSP へ送る仕掛けなので、利用者の操作（ボタン）を起点にすること・外部の CDN を読むことが論点になる

### doc_edit の手順と、計画の spec のずれ
- **Context**: Requirement 6・7
- **Sources Consulted**: `.claude/skills/kiro-complete/SKILL.md`、`.claude/skills/kiro-impl/SKILL.md`、`.claude/skills/kiro-next/SKILL.md`、`.claude/skills/kiro-discovery/SKILL.md`、`.kiro/steering/workflow.md`
- **Findings**:
  - `/kiro-complete` ステップ0 は `.worktrees/{feature}` が無いと STOP する。ステップ1 の Build Gate・規約 Gate は原稿の変更を前提にする。ステップ7 の PR 可否判定は `origin/main..HEAD` が 1 件以上でないと「中断して報告」になる。ステップ8 は MERGED の後にだけ作業木を消し、サブモジュールの参照コミットを進める。**原稿を変えない spec を締める道が無い**
  - 試作の作業木は push しないので、`git branch -D` で消すと試作は戻せない。Requirement 3.8（写しを残すか）と 7.3（想定外の変更があれば止める）がこれを受ける
  - `workflow.md` の「タスク生成ルール」は最終タスク「整合性の確認と更新」（`index.md` の一覧・Build Gate）を必ず加えさせる。計画の spec では中身が当てはまらない
  - `/kiro-impl` は TDD とサブエージェントの自律実行が既定で、`TEST_COMMANDS` は `prepare_site.py` と `zensical build --strict`。試作を見て開発者が決める段（Requirement 4）は自律モードに乗らない。手動モード（タスク番号を指定）か、決定の段を `/kiro-impl` の外で行う形が要る
  - `/kiro-next` は `roadmap.md` を `# Roadmap` / `## 概要` / `## Specs (dependency order)` / `## バックログ` と `## 棚卸（…）` の形で読み書きする。`/kiro-discovery` の Path D の roadmap は `## Overview` / `## Approach Decision` … の形。**2 つの形が食い違う**ので、この spec が最初の roadmap を作るときにどちらに合わせるかを決める必要がある
  - `/kiro-discovery` の brief の形（Problem … Constraints）は Requirement 5.3 の形と一致する
- **Implications**: brief の Constraints どおり、`/kiro-complete` に「原稿を変えない spec」の分岐を足す（spec にしない直接の手直し）。あわせて `workflow.md` の DoD とタスク生成ルールに、計画の spec の扱いを 1 行ずつ足すのが最小。`/kiro-impl` は手を入れず、手動モードで回す運用で足りる可能性がある（Research Needed）

### 画面の記録の取り方
- **Context**: Requirement 1.6・3.4〜3.6
- **Findings**: `.venv` に playwright は無い。Microsoft Edge（`C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`）はあり、ヘッドレスで頁の画像を書き出せる見込み。セッションの内蔵ブラウザは localhost と外部の頁を開いて見られるが、画像をファイルとして残せるかは未確認。ダークモードの記録は、表示の切り替え（`prefers-color-scheme` の模擬か、サイトの切り替えボタン）が要る
- **Implications**: 道具の選定は設計で行う（Research Needed）。画像は doc_edit（公開リポジトリ `ekicyou/doc_edit`）にコミットされるので、枚数と大きさ（頁全体か一部か）を抑える方針が要る

## Requirement-to-Asset Map

| 要件 | 既存の資産 | ギャップ | 種別 |
|---|---|---|---|
| 1 見比べ | 旧サイト・今の公開サイト・ローカルのビルド | 見比べの記録の置き場と書式が無い。対象の頁が未定 | Missing / Unknown |
| 1.6・3.4〜3.6 画面の記録 | Edge、内蔵ブラウザ | 画像をファイルに残す手順が無い。ダークモードの撮り方 | Unknown |
| 2.2 変更の種類の見込み | `mkdocs.yml`・`extra.css`・`prepare_site.py`・Zensical のテンプレート | 「対応」「既定値」「パラメータ」に HTML の目印が無い（CSS だけでは見分けられない） | Constraint |
| 2.5 波及の範囲 | superfences の出力 | 言語名が HTML に残らない。着色を入れると約 162 個の言語指定なしのブロックも変わりうる | Constraint |
| 2.4 素材の許可 | 旧サイトの CSS・画像 | LICENSE が無い。画像は管理者の確認が要る | Constraint |
| 3 試作 | `workflow.md` の作業木の作り方、`.venv` | serve が `_site_src/` を見る（直下を直したら prepare を再実行）。push しない作業木の後始末の手順が無い | Constraint / Missing |
| 4 方向の決定 | なし | 決定の記録の書式が無い。`/kiro-impl` の自律モードは開発者の判断を挟まない | Missing |
| 5 切り分け | `/kiro-discovery` の brief の形、`/kiro-next` の roadmap の形 | `roadmap.md` が無い。roadmap の形が 2 つのスキルで食い違う | Missing / Constraint |
| 6 境界と後始末 | `workflow.md` の禁止事項 | 作業木を PR なしで捨てる手順が無い | Missing |
| 7 完了の手順 | `/kiro-complete` | 原稿を変えない spec の分岐が無い。DoD・タスク生成ルールも原稿が前提 | Missing |

## Implementation Approach Options

### Option A: 既存の手順に乗せて進める（手順の手直しは最小）
- 試作は `workflow.md` の作業木の作り方そのまま（`.worktrees/site-look-plan/`、ブランチ `site-look-plan`、`origin/main` 起点）。記録は spec のフォルダに Markdown（例: `survey.md` `decisions.md`）と画像
- `/kiro-impl` は手動モードで回し、決定の段（Requirement 4）だけは開発者との対話で行う
- `/kiro-complete` に「原稿を変えない spec」の分岐（PR・マージ・参照コミットの更新を飛ばし、作業木を確かめて捨てる）を足す。`workflow.md` に計画の spec の DoD を 1 行足す
- ✅ 新しい仕組みが要らない。手直しは 1 スキルと steering の数行
- ❌ `/kiro-impl` の TDD・Build Gate の枠に合わないタスクが混ざり、レビューの観点がずれる

### Option B: 計画の spec 専用の流れを作る
- 「計画の spec」を spec.json の印などで区別し、`/kiro-spec-tasks`・`/kiro-impl`・`/kiro-complete` がそれぞれ分岐する
- ✅ 今後の計画の spec でも迷わない
- ❌ 一度きりかもしれない用途に、3 つのスキルを直すことになる。brief の「spec にせず、直接直す」の範囲を超える

### Option C: 折衷（A を基本に、完了の分岐だけ汎用にする）
- 調査・試作・決定・切り分けは A のとおり。`/kiro-complete` の分岐は「作業木に `origin/main` からのコミットが無い spec」を条件にした汎用の形にし、計画の spec かどうかの印は持たない
- タスク生成ルールの最終タスクは、計画の spec では「roadmap と brief の整合」に置き換えると `workflow.md` に 1 行書く
- ✅ 手直しは小さいまま、次の計画の spec にも効く
- ❌ 「コミットが無い」だけで判定すると、原稿を書き忘れた spec を誤って PR なしで締める危険がある（Requirement 7.3 の止める条件と、開発者の承認で防ぐ）

## Implementation Complexity & Risk
- **Effort: M（3〜7 日）** — 調査・試作・決定・切り分けの 4 段に、開発者との往復（試作を見る・決める）が入る。コードとしては使い捨ての CSS とテンプレートだけだが、見比べる頁と候補の数で手間が増える
- **Risk: Medium** — 技術は既知（Material テーマの CSS とテンプレートの上書き）。不確かなのは、HTML に目印の無い部分（対応・既定値・言語名）をどこまで原稿を変えずに見分けられるかと、好みの合意（試作で抑える）

## Recommendations for Design Phase
- **推し**: Option C。完了の分岐は brief どおり spec の外で直接直し、この spec の設計では「手順が直っていること」を前提として扱う
- **設計で決めること**:
  - 見比べの記録・候補の一覧・決定の記録の書式と置き場（spec のフォルダの中の Markdown と画像）
  - 試作の対象の 2〜3 頁と、試作ごとに確かめる候補
  - 画面の記録の道具・撮る範囲（頁の一部）・明暗の両方を撮るか・画像の大きさの上限
  - 「対応」「既定値」「パラメータ」「さくらスクリプトのブロック」に目印を付ける方法の候補（テンプレートの上書き／`prepare_site.py` の後処理／Markdown 拡張／ブラウザ側のスクリプト）を、試作で確かめる範囲。原稿を変えないこと
  - roadmap の形（`/kiro-next` の形に合わせる。要件ディスカッションで確定）
  - 方向の決定の段（要件 4.6）で、`/kiro-impl` の自律実行をどう止めて再開するか。既存の止まり方（`STOP_FOR_HUMAN` で `_Blocked:_` を付けて止め、開発者の判断の後に `/kiro-impl` を再実行する）で足りるか、`/kiro-impl` に手を入れるか（入れるなら、要件 7.4 の直接の手直しと同じ時期に行う）。実装は手動モードにせず、自律実行で流す（要件ディスカッションで確定）
- **Research Needed**:
  - Zensical 0.0.67 で、`content` ブロックや partial の上書きがどこまで minijinja で通るか（brief の Constraints）
  - `pymdownx.highlight`（`pygments_lang_class`）を有効にしたとき、レキサーの無い `sakurascript` に `language-sakurascript` の class が付くか、言語指定なしのブロックの HTML がどう変わるか
  - `prepare_site.py` で `**対応:**` などに目印を足すと、`old_ids` の見出しの計算や `build --strict` に響かないか
  - Edge のヘッドレスでの画像の書き出し（ダークモードの模擬を含む）が Windows のこの環境で動くか
  - 記述例の再生（jsstp）を今のサイトに載せるときの、利用者の同意・外部の読み込みの扱い

## Risks & Mitigations
- 試作の作業木を捨てて、後で参考にしたい試し書きが失われる — Requirement 3.8 で写しを残すかを決め、残すなら spec のフォルダに置く
- 好みの合意がぶれ、後続 spec で議論し直しになる — 決定を画面の記録に結び付けて brief に書く（Requirement 4.3・5.4）
- 視認性の改造が「CSS だけ」の想定で切られ、後続 spec で目印の問題に当たる — 候補ごとに変更の種類の見込みを書き（Requirement 2.2）、目印が要るものは build 側の spec に寄せる
- 画像が doc_edit の公開リポジトリを膨らませる — 撮る範囲を頁の一部に絞り、枚数を候補ごとに数枚にする

## References
- [UKADOC 旧サイト](https://ssp.shillest.net/ukadoc-legacy/manual/) — 見た目と視認性の手本
- [UKADOC 今のサイト](https://ukatech.github.io/ukadoc-spec/) — 改造の対象
- `ukadoc-spec/CLAUDE.md` — 原稿の書式（変えない）とサイトの組み立て
- `.kiro/steering/workflow.md` — 作業木・DoD・完了時アクション
- `.claude/skills/kiro-complete/SKILL.md` — PR 前提の完了手順

---

# 設計フェーズの調査（2026-10-24）

## Summary
- **Discovery Scope**: Extension（軽い調査）。既存のサイト生成と kiro の手順に乗せる計画の spec で、新しい依存を入れない
- **使ったスキル・指針**: `kiro-spec-design`（`rules/design-principles.md`・`design-discovery-light.md`・`design-synthesis.md`・`design-review-gate.md`）、`.kiro/settings/templates/specs/design.md` と `research.md`。手順の読み取りに `kiro-impl`・`kiro-complete`・`kiro-next` の SKILL.md と `workflow.md`
- **Key Findings**:
  1. ギャップ分析の Research Needed の 5 件のうち 4 件を、一時フォルダの ukadoc-spec の写し（`git archive` の `0e028a4`）での試験で確かめた。残る 1 件（記述例の再生の同意・外部の読み込み）は論点として brief に渡す
  2. Edge の `--screenshot` では頁の途中を撮れない。Node.js v26 の標準の `fetch`/`WebSocket` で Edge の CDP を操作すれば、新しいパッケージなしで、要素の位置の切り出しと明・暗の模擬ができる
  3. `/kiro-impl` の既存の止まり方（`STOP_FOR_HUMAN`）は、失敗の後のデバッグの出口で、判断を待つ段に使うと回り道になる。開発者の関門の印を足す小さな手直しが要る

## Research Log

### Zensical 0.0.67 のテンプレートの上書き（Research Needed 1）
- **Context**: 頁の組み立てを変える候補（キャラクターなど）を試作できるか
- **Sources Consulted**: 一時の写しで `theme.custom_dir: overrides` と `overrides/main.html`（`{% extends "base.html" %}`、`{% block extrahead %}{{ super() }}…{% endblock %}`、`{% block content %}…{{ super() }}…{% endblock %}`）を置き、`extra_javascript` に `assets/slp.js` を足して `build --strict`
- **Findings**: build が通り（No issues found）、`list/sakura-script/` の HTML に、`extrahead` に足した meta、`content` の前後に足した要素、`assets/slp.js` の読み込みがそれぞれ 1 つずつ出た。`custom_dir` はリポジトリ直下の `overrides/` で効く（`_site_src/` に写す必要は無い）
- **Implications**: ブロックの上書きと `super()` は minijinja で通る。partial を丸ごと写さずに済む範囲の試作はできる

### `pymdownx.highlight` と言語の印（Research Needed 2）
- **Sources Consulted**: 一時の写しの `mkdocs.yml` の `markdown_extensions` に `pymdownx.highlight` を足して build し、`_site/` の `<pre>` を数えた
- **Findings**:
  - `pygments_lang_class: true` だけでは、レキサーの無い `sakurascript` は `text` に落ち、`<div class="language-text highlight">` になる。言語指定の無いブロックも同じ class になり、**見分けられない**
  - `use_pygments: false` にすると、`sakurascript` の 287 個は `<pre class="highlight"><code class="language-sakurascript">`、言語指定の無い 162 個は `<pre class="highlight"><code>` になる。どちらも、今の `<div class="highlight"><pre><span></span><code>` から形が変わる（449 個すべてに波及する）
  - build はどちらでも通る
- **Implications**: ブラウザ側で着色する案（brief の (c)）は `use_pygments: false` で成り立つ。ただし全コードブロックの HTML が変わるので、`extra.css` の `pre > code` の指定やコピーのボタンの見え方を確かめる必要がある。`prepare_site.py` の `EXTENSIONS` は見出しの id の計算用で、`highlight` を足しても見出しには響かない見込み（後続 spec で確かめる）

### `prepare_site.py` で目印を付けたときの影響（Research Needed 3）
- **Sources Consulted**: 一時の写しの `unit_body()` で、`**対応:**` と `**既定値:**` で始まる段落に `attr_list` の `{: .slp-support }` `{: .slp-default }` を足して、`prepare_site.py` と `build --strict` を流した
- **Findings**:
  - 段落の 1 行目の直後に足すと、`<br />` で続く複数行の段落で `{: … }` が本文にそのまま出た（`descript/shell-surfaces/` で 6 か所）
  - 段落の末尾（空行の手前）に足すと漏れは 0 で、サイト全体で `slp-support` が 1623 個、`slp-default` が 423 個付いた。`list/sakura-script/` は `slp-support` 350、`descript/ghost/` は両方 74
  - `prepare_site.py` は exit 0（見出しの数の検査 `old_ids` は見出しの行だけを見るので響かない）、`build --strict` も通る
- **Implications**: 「対応」「既定値」の見分けは、原稿を変えずに `prepare_site.py` の後処理で付けられる。付ける位置は段落の末尾に限る。この事実を後続 spec の brief の Constraints に書き写す

### 画面の記録の道具（Research Needed 4）
- **Sources Consulted**: Edge（`msedge.exe`）のヘッドレス、Node.js v26.8.1
- **Findings**:
  - `--screenshot` は既定のプロファイルだと白紙になった（起動中の Edge とぶつかる）。`--user-data-dir` で別のプロファイルにすると撮れた
  - `--screenshot` は頁の先頭しか撮れず、`#見出し` 付きの URL では白紙になった。位置を指定する手段が無い
  - `--remote-debugging-port` で起動し、Node.js の標準の `fetch`（`/json/list`）と `WebSocket` で CDP を呼ぶと、`Emulation.setEmulatedMedia`（`prefers-color-scheme: dark`）、`Runtime.evaluate`（要素の位置）、`Page.captureScreenshot`（`clip` と `captureBeyondViewport`）で、要素の位置の 1000 × 700 を明・暗で撮れた。ローカルの `zensical serve` の頁でも旧サイトでも撮れ、1 枚 120〜130 KB ほど
  - Material の明暗は `media` 指定なので、模擬だけで暗い表示になる（`localStorage` を持たない使い捨てのプロファイルのため）
  - `.venv` に Pillow も playwright も無い。新しく入れずに済む
- **Implications**: `tools/shot.mjs`（40 行ほど）を spec のフォルダに置く。後続 spec も同じ道具で目標の画面と見比べられる

### 記述例の再生（Research Needed 5）
- 試験はしていない。Requirement 2.7 で試作を必須にしないので、論点（利用者の操作を起点にする、外部の CDN の読み込みの扱い）として候補と brief に渡す

### 公開サイトの URL
- `https://ukatech.github.io/ukadoc-spec/…` は 301 で `https://ukatech.shillest.net/ukadoc-spec/…` へ転送される（2026-10-24 に確認）。`mkdocs.yml` の `site_url` は github.io のまま。見比べの記録には両方を書く（直すのはこの spec の範囲外）

### 旧サイトの頁
- `list_sakura_script.html`・`descript_ghost.html`・`spec_shiori3.html`・`manual_ghost.html` はどれも 200。`manual.html` は 404（`manual/` の頁は `manual_<名前>.html`）

### kiro の手順の止まり方（Requirement 4.6）
- **Sources Consulted**: `.claude/skills/kiro-impl/SKILL.md`
- **Findings**: 自律モードで人に返る道は、実装サブエージェントの `BLOCKED` → デバッグのサブエージェント → `NEXT_ACTION: STOP_FOR_HUMAN` → tasks.md に `_Blocked:_` を付けて止まる、だけである。再実行では `_Blocked:_` の付いたタスクは飛ばされるので、判断の後に誰かが印を外す必要がある。実装サブエージェントのひな形はコミットせず、TDD の RED を求める
- **Implications**: 判断を待つ段にこの道を使うと、失敗でないものを失敗として扱い、デバッグのサブエージェントを 1 回無駄に出す。`_Gate: developer_` の印を足し、親が材料を示して止まる手直し（数行）にする。原稿を変えない spec では作業木でコミットしない旨もあわせて足す

## Architecture Pattern Evaluation

| Option | Description | Strengths | Risks / Limitations | Notes |
|--------|-------------|-----------|---------------------|-------|
| 記録のパイプライン（採用） | 差 → 候補 → 試作 → 決定 → spec を ID でつなぐ | 行き先の漏れを機械的に確かめられる | ID を振り直すと参照が切れる | 振り直さない規則を置く |
| 1 つの大きな記録 | 調査から決定まで 1 ファイル | ファイルが少ない | タスクの境界があいまいになり、関門の前後で同じファイルを触る | 不採用 |
| 候補ごとの試作のブランチ | 候補ごとに作業木の状態を分ける | 試作どうしが混ざらない | 作業木 1 つの規則に合わない。切り替えに build が要る | `?slp=` の切り替えで代える |

## Design Decisions

### Decision: 決定の段の止まり方
- **Context**: Requirement 4.6（自律実行の中で止まり、判断の後に続ける）
- **Alternatives Considered**:
  1. 既存の `STOP_FOR_HUMAN` と `_Blocked:_`、再実行
  2. `/kiro-impl` に `_Gate: developer_` の関門を足す
  3. 決定の段を `/kiro-impl` の外に出す（要件で手動モードと外出しは採らないと決めた）
- **Selected Approach**: 2。親が材料を示して止まり、同じセッションの答えで続ける。切れたら再実行で関門から再開する
- **Rationale**: 1 は失敗の出口を流用するので、デバッグのサブエージェントが無駄に出て、`_Blocked:_` を手で外す手間が要る。2 は数行の手直しで済む
- **Trade-offs**: スキルの手直しが 1 つ増える（Requirement 7.4 の手直しと同じ時期に行う）
- **Follow-up**: 手直しを入れない場合の代わりは 1（OPEN QUESTION 1）

### Decision: 原稿を変えない spec の目印
- **Alternatives Considered**: (1) `design.md` の Boundary Commitments の一文、(2) `spec.json` の印、(3) 作業木にコミットが無いことで判断（ギャップ分析の Option C）
- **Selected Approach**: 1。3 は Requirement 7.3（変えないはずの spec にコミットがあれば止める）を満たせない。「変えないはず」を前もって宣言する場所が要る
- **Rationale**: `/kiro-spec-tasks`・`/kiro-impl`・`/kiro-complete` はどれも `design.md` を読む。`spec.json` は kiro の各段が書き換えるので、手で足した印が消えるおそれがある
- **Follow-up**: OPEN QUESTION 2

### Decision: 作業木の片付けをこの spec の最後のタスクで行う
- **Context**: Requirement 6.4（完了時に作業木を捨てる）と 7.3（未コミットの変更があれば止める）
- **Selected Approach**: 最後のタスクで写しを確かめてから作業木を `origin/main` と同じ状態に戻し、`/kiro-complete` は確かめて消すだけにする
- **Rationale**: 7.3 の止まる条件をそのまま使え、試作の消し忘れと誤ったコミットを見分けられる
- **Trade-offs**: 片付けた後は試作のプレビューを見られない（写しと画面で代える）

### Decision: 今の見た目は試作の前の作業木で撮る
- **Rationale**: 目印と `highlight` の試作は HTML を変えるので、試作の build で候補を外しても今の見た目にならない

### Synthesis
- **Generalization**: 見比べ・候補・決定・切り分けは、どれも「ID の付いた項目に、前の段の ID を参照させる」同じ形にまとめた。行き先の確かめ（5.1）が、ID の突き合わせだけで済む
- **Build vs. Adopt**: 画面の道具は playwright などを入れず、手元の Edge と Node.js の標準機能で作る（依存を足さない）。目印は `attr_list`（既に有効）を使い、Markdown 拡張を書かない。着色の試作は `pymdownx.highlight`（既に入っている pymdown-extensions の一部）を使う
- **Simplification**: 試作の記録は独立したファイルにせず `mockups/README.md` に置いた。候補の切り替えは build のし直しでなく `?slp=` にした。roadmap の形は `/kiro-next` の形に合わせ、`/kiro-discovery` の Path D の形は使わない

## Risks & Mitigations
- 画面の枚数が膨らみ、公開リポジトリが重くなる — 上限（候補ごとの枚数、1000 × 700）を置き、最後に合計の大きさを記録する
- 開発者の答えが曖昧なまま判断を記録してしまう — 答えの無い候補は「判断」を空にし、確かめ直す。推奨を判断に写さない
- `/kiro-impl` の手直しが入らないまま実装に入る — 代わりに既存の `STOP_FOR_HUMAN` の道で止まれるが、`_Blocked:_` を手で外す手間が要る（OPEN QUESTION 1）
- 試作で確かめた事実が、Zensical の版上げで古くなる — brief の Constraints に「0.0.67 で確かめた」と版を書き添える
