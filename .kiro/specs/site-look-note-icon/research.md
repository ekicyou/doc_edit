# Research & Gap Analysis: site-look-note-icon

## ギャップ分析（2026-10-25）

### 調べた土台
- ukadoc-spec のチェックアウトと `origin/main` は同じ `0eb3fb9`（#12 `site-look-list-markers`、その前に #11 `site-look-list-items`）。依存先はマージ済みで、この spec は `origin/main` から作業木を作れる
- 別の作業木 `.worktrees/site-look-sakura-script-highlight/`（同じ `0eb3fb9` から）が進行中。同じ `assets/extra.css` を触るが、依存ではない
- Zensical は `0.0.67`（`.venv`）。テーマ `classic` の `main.cfc7948b.min.css` を読んだ

### 今あるもの（Requirement との対応）

| Requirement | 今あるもの | ギャップ |
|---|---|---|
| 1 注釈の節の見出し | `prepare_site.py` の `add_markers()` が `notes_*` の単位を `<div class="bundle-notes" markdown="1">` で包む。見出しの id は単位の鍵（ファイル名の幹）で、16 個とも `notes_` で始まる。`extra.css` の `.md-typeset .bundle-notes > :first-child` が中央寄せと下の点線を当てている | 絵の指定が無い（Missing）。当て先は `.bundle-notes > :first-child` と `[id^="notes_"]` のどちらでも選べる（既にある目印で足りる。`prepare_site.py` の変更は要らない） |
| 2 補足の項目の見出し | 16 個の `note-<数>.md`（ファイル一覧で確かめた）。`shift_headings()` が頭の見出しを `{#<鍵> .bundle-item}` にする（`notes_` でないため）。鍵は `note-1`・`balloon-text-note-1`・`app-ghost-terminal-note-2`・`note-3` など。中の節の見出しは `<鍵>-<元の id>` | 補足の項目だけを選ぶ目印が無い（Missing）。CSS の属性の指定では「数で終わる」を見分けられない（`[id$="note-1"]` などを並べると `note-4` が増えたときに漏れる。Constraint） |
| 3 注の題 | `dev/shell.md` の 314・394 行の `!!! note "注"` の 2 個だけ（`??? note` は 0）。テーマの指定は `.md-typeset .note>.admonition-title:before{background-color:#448aff;mask-image:var(--md-admonition-icon--note)}`、共通の `.admonition-title:before` は `position:absolute;top:.625em;width:1rem;height:1rem` | 鍵の印を外して絵に替える指定が無い（Missing）。`background-color` と `mask-image` の両方を打ち消す必要がある（Constraint）。題の字の大きさ（.64rem 前後）に対し、1rem の枠は約 1.5 倍で、試作の大きさに合う |
| 4 絵の見え方 | 試作の写し `.kiro/specs/completed/site-look-plan/mockups/image/slp-notes-icon.png`（88×88、3284 バイト）。ukadoc-spec の `assets/image/` には原稿の図（`icon_m.png` など 13 個）がある | 絵が ukadoc-spec に無い（Missing）。テーマの CSS は見出しの `::before` を使っていない（`h*:before`・`[id]:before` の指定は 0）ので、見出しの `::before` を使ってもテーマとぶつからない |
| 5 目印と絵の置き方 | `main()` が `assets/` を丸ごと `_site_src/assets/` に写す。`build_raw()` は `assets` を飛ばす。目印の名前の決まりは `bundle-<役>` | 補足の印の名前は未定（Unknown）。`bundle-notes`（注釈の節の包み）と紛れない名前が要る |
| 6 失わないもの | 見出しの字・id・¶・目次は `::before` の背景の絵では変わらない（`content: ""` は読み上げ・検索・目次に出ない） | 確かめのみ（Constraint）。狭い画面では中央寄せの `notes_` 見出しの長い題（例: 「ファイルを開く / … パラメータ」）が絵の分だけ折り返す |
| 7 確かめ | `site-look-plan` の `tools/shot.mjs`、目標の画面 4 枚 | `!!! note` と `h4` の注釈の節は目標の画面が無い（Unknown、撮って見る） |
| 8 範囲と PR | `extra.css` は塊ごとに `/* <spec>: … */` の 1 行の注 | 新しい塊と画像 1 ファイル、`prepare_site.py` の数行で足りる |

### 実装の選択肢

#### 案 A: 既にある仕組みを伸ばす（推奨の見込み）
- `prepare_site.py`: `shift_headings()` の役の class を決める所で、ファイル名が `note-<数>.md` の単位の頭の見出しに、`bundle-item` に加えて印の class を足す（例: `{#note-1 .bundle-item .bundle-<役>}`）。見出しの行の属性の書き方は今と同じで、id は変わらない
- `extra.css`: 1 つの塊で、`.bundle-notes > :first-child`（または `[id^="notes_"]`）と補足の印の見出しの `::before` に絵を置き、もう 1 つの塊で `.admonition.note > .admonition-title::before` の `background-color` と `mask-image` を外して絵にする
- 絵: `assets/` の下に 1 ファイル
- ✅ 変更が最小（Python 数行・CSS 2 塊・画像 1）。既にある目印と決まりに沿う
- ❌ `shift_headings()` に役の判断が 1 つ増える

#### 案 B: CSS の属性の指定だけで選ぶ（`prepare_site.py` を変えない）
- 補足の見出しを `.bundle-item:is([id="note-1"], [id$="-note-1"], [id$="-note-2"], [id$="-note-3"], …)` で選ぶ
- ✅ Python を変えない
- ❌ `note-4.md` が増えると漏れる（Requirement 2.4 に合わない）。brief は「本番は組み立ての処理で付けるのが確か」としている

#### 案 C: 見出しの字（「補足」）で選ぶ
- CSS では字で選べないので、結局 `prepare_site.py` で見出しの字を見ることになる
- ❌ 字が変わると漏れる。ファイル名で見分ける案 A より弱い

### 調べが要るもの（Research Needed、設計へ）
- **絵の置き場と名前**: `assets/image/`（原稿の図と同じ所。`extra.css` から `url("image/<名前>.png")`）か、別の場所か。名前は ASCII で `slp-` を使わない
- **補足の印の名前**: `bundle-<役>` の `<役>`。`bundle-notes` と 1 字違いの `bundle-note` は紛れやすい
- **大きさと並び**: 見出しの `::before` の `1.5em`・`vertical-align`・`margin` を試作に合わせ、中央寄せの `notes_` 見出し（C04）と左寄せの帯の見出し（C01）の両方で、¶ の位置と行の高さを見る
- **`!!! note` の題**: テーマの `position:absolute` の 1rem の枠を活かして絵を置くか。暗い表示で題の地（`#448aff1a`）の上の絵の見え方
- **高い画素密度**: 88×88 は 1.5em（h2 で約 30px）の 2 倍の密度でも足りる見込み。h2 を 2× で約 60px
- **印刷**: ブラウザの「背景のグラフィック」が切れていると背景の絵は出ない（OPEN QUESTION 7）
- **`h4:has(+ .highlight)`**: 記述例の見出しの帯の指定。`propertysystem` の `h4` の `notes_` 見出しの次は段落で当たらないが、確かめる

### 工数とリスク
- **工数: S**（1〜3 日）。既にある目印・塊・確かめの道具に沿う。画像 1 つ、Python 数行、CSS 2 塊
- **リスク: Low**。既にある型を伸ばすだけ。気を付けるのは、`build --strict` が CSS の中の絵の欠けに気づかないこと（`serve` で 200 を確かめる）と、`serve` を動かしたまま `prepare_site.py` を流すと `_site_src/` が壊れること

### 設計への申し送り
- 推奨: 案 A。注釈の節は既にある `bundle-notes` の包みを使い、補足の項目だけ `prepare_site.py` でファイル名から印を付け、注の題はテーマの印を CSS で差し替える
- 決めること: 絵の置き場と名前、補足の印の名前、大きさ・並びの値、印刷の扱い、PR の説明の書き方（requirements.md の OPEN QUESTION 1〜8）
- 確かめ: 34 か所の数、id・¶・目次の不変、明・暗と 375 px、`dev/shell` と `h4` の画面
