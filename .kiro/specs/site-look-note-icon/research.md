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
| 3 注の題 | `dev/shell.md` の 314・394 行の `!!! note "注"` の 2 個だけ（`??? note` は 0）。テーマの指定は `.md-typeset .note>.admonition-title:before{background-color:#448aff;mask-image:var(--md-admonition-icon--note)}`、共通の `.admonition-title:before` は `position:absolute;top:.625em;width:1rem;height:1rem` | 鉛筆の印を外して絵に替える指定が無い（Missing）。`background-color` と `mask-image` の両方を打ち消す必要がある（Constraint）。題の字の大きさ（.64rem 前後）に対し、1rem の枠は約 1.5 倍で、試作の大きさに合う |
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
- 決めること: 絵の置き場と名前、補足の印の名前、大きさ・並びの値、`!!! note` の題の鉛筆の差し替え方、濃い帯（C01）の中の絵の見え方（要件の決定は requirements.md の「要件のディスカッションの決定」。印刷は背景の絵で出なくてよく、絵の出どころには一切触れない）
- 確かめ: 34 か所の数、id・¶・目次の不変、明・暗と 375 px、`dev/shell` と `h4` の画面

## 設計の調査（2026-10-25）

### Summary
- **Feature**: `site-look-note-icon`
- **Discovery Scope**: Extension（既にある目印・塊・確かめの道具を伸ばす。軽い調べ `design-discovery-light.md` を流した。新しい依存は無く、外の調べは要らない）
- **Key Findings**:
  - 注釈の絵（試作の写し `slp-notes-icon.png`）は、ukadoc-spec の `assets/logo.png`（`mkdocs.yml` の `theme.logo`・`theme.favicon`、`8f588b7` で入った）とバイトまで同じ（どちらも 3284 バイト、SHA-256 `32983af300107fafd4c2e902c00cbc579051ac19a831cc25cc7863d017d1335d`）。新しいファイルを足さずに `extra.css` から `url("logo.png")` で読める
  - 注釈の節は `bundle-notes` の包みの最初の子で選べ、Python は要らない。補足の項目だけ `shift_headings()` の役の class の所に 2 行を足せば、ファイル名 `note-<数>.md` で見分けられる
  - テーマの注の題の印は `.md-typeset .note>.admonition-title:before`（詳細度 0,3,1）の `background-color:#448aff` と `mask-image`。同じ詳細度の指定を後に読ませ、`background` の一括の指定と `mask-image: none` で絵に替えられる

### 調べたこと
- **絵の置き場**: `assets/logo.png` と試作の写しの SHA-256 が同じ。`ukadoc-spec/CLAUDE.md` は `assets/image/` を「本文で使う画像」の置き場としている（飾りの絵は本文の図でない）。`main()` は `assets/` を丸ごと `_site_src/assets/` に写すので、`/ukadoc-spec/assets/logo.png` で配られる。`.kiro/` の中に `logo.png` の記述は無かった（要件と brief の作りの時点では知られていなかった）
- **補足の項目の原稿**: `note-*.md` は 16 個（`descript/ghost/descript-txt`・`descript/install/updates_def-txt`・`descript/shell/descript-txt`・`list/propertysystem/property-system`・`list/sakura-script/{balloon-text,choice-marker,event}`・`list/shiori-event-ex/{app-elin,app-ghost-terminal ×3,ghost-common,ghost-kanaderu-nichijo-no-neiro,plugin-weather-station}`・`list/shiori-event-ex` 直下 2）。どれもまとめ頁の中（depth 2 以上、`index.md` でない）。頭の見出しの次にコードブロックが続く原稿は 0（記述例の濃い帯 `h4:has(+ .highlight)` に入らない）
- **注釈の節の原稿**: `notes_*.md` 16 個は、どれも見出しが 1 つだけ。単位の中の見出しは無いが、増えると id が `notes_<鍵>-<元の id>` になり `[id^="notes_"]` に当たる。当て先は `.bundle-notes > :first-child` にした
- **テーマ（Zensical 0.0.67 の classic、`main.cfc7948b.min.css`）**:
  - `.md-typeset .admonition-title:before,.md-typeset summary:before{position:absolute;top:.625em;width:1rem;height:1rem;content:"";background-color:#448aff;mask-image:var(--md-admonition-icon--note);…}`、`[dir=ltr]` で `left:.6rem`
  - `.md-typeset .note>.admonition-title:before,.md-typeset .note>summary:before{background-color:#448aff;mask-image:var(--md-admonition-icon--note)}`
  - 注意書きの字は `.64rem`、題の印の枠 `1rem` は約 1.56 倍
  - `.md-typeset h2{font-size:1.5625em;line-height:1.4}`、`.md-typeset{font-size:.8rem;…;-webkit-print-color-adjust:exact;color-adjust:exact}`（印刷でも背景の絵が出やすい）
  - 見出しの `::before` を使う指定は無い
- **`mkdocs.yml`**: `pymdownx.details` が無いので `??? note` は今は折りたたみにならない（原稿にも 0 個）。`toc_depth: 3`
- **並行の作業木**: `.worktrees/site-look-sakura-script-highlight/` は `extra.css` の末尾に 1 塊（記述例のタグと環境変数）と `mkdocs.yml` を足しており、見出しの `::before` や `.note` には触れない。ぶつかるのは末尾の追記の位置だけ
- **目標の画面**: `mock-propertysystem-C26-dark.png` は C01 の帯（暗い表示の薄い白の重ね）の上の絵で、帯の中の絵の扱いを足さなくてよい。`mock-sakura-script-C26-light.png` は C04 の中央寄せの見出しで、絵と字が一緒に中央に寄る

### Architecture Pattern Evaluation

| Option | Description | Strengths | Risks / Limitations | Notes |
|--------|-------------|-----------|---------------------|-------|
| 案 A（採る） | 補足だけ `prepare_site.py` で目印、注釈の節は `bundle-notes`、注の題はテーマの印を差し替え | 変更が最小（Python 2 行・CSS 2 塊）、増えた原稿にも付く | `shift_headings()` に判断が 1 つ増える | ギャップ分析の推奨 |
| 案 B | CSS の属性の指定だけ | Python を変えない | `note-4` が増えると漏れる（2.4 に合わない） | 採らない |
| 案 C | 見出しの字「補足」で選ぶ | — | CSS で字は選べず、字が変わると漏れる | 採らない |

### Design Decisions

#### Decision: 絵は `assets/logo.png` を使う（［仮定］A）
- **Context**: 要件 5.1 で置き場と名前を設計に任された。絵はロゴとバイトまで同じ
- **Alternatives Considered**:
  1. `assets/logo.png` をそのまま使う
  2. `assets/note-icon.png` に同じ絵を足す
  3. `assets/image/note-icon.png` に足す（試作と同じ所。ただし本文の図の置き場）
- **Selected Approach**: 1（`url("logo.png")`）
- **Rationale**: 同じ絵を 2 つ持たず、PR が小さい。要件 8.1 の「1 ファイルを足す」と字面が違うので、OPEN QUESTION 1 として開発者に確かめる
- **Trade-offs**: ロゴを替えると注釈の絵も変わる（Revalidation Triggers に入れた）
- **Follow-up**: 採るなら要件 5.1・8.1 と Boundary Context の字面を直す

#### Decision: 補足の目印の名前は `bundle-supplement`（［仮定］B）
- **Context**: 要件 5.3。`bundle-<役>` の決まりで、`bundle-notes` と取り違えない名前
- **Alternatives Considered**: `bundle-note`（`bundle-notes` と 1 字違い）、`bundle-note-item`、`bundle-aside`
- **Selected Approach**: `bundle-supplement`（「補足」の英語。`notes` と語が違う）
- **Trade-offs**: 少し長い

#### Decision: 目印は `shift_headings()` で付ける（［仮定］C）
- **Context**: 見出しの役の class は `shift_headings()` が `{#id .bundle-item}` の形で付けている
- **Selected Approach**: `role` を決める所で、`NOTE_FILE.fullmatch(basename)` のとき ` .bundle-supplement` を足す
- **Rationale**: 見出しの行を 1 回で書き、id・段・字に触れない。`add_markers()` で見出しの行を書き直すより短い

#### Decision: 大きさと並びは試作の値、注の題はテーマの枠（［仮定］D・E）
- **Context**: 目標の画面は試作の C26 の値（`1.5em`・`.35em`・`-.35em`）で撮った。注の題は目標の画面が無い
- **Selected Approach**: 見出しは試作の値を字に対する比のまま使う。注の題はテーマの `1rem` の枠と位置のまま中身を替える（試作と同じ）
- **Follow-up**: 実装の画面で目標の画面と見比べる

### Synthesis
- **Generalization**: 注釈の節と補足の項目は「見出しの頭の飾りの絵」という同じ見え方なので、1 つの規則（2 つのセレクタ）にまとめた。注の題はテーマの枠を使う別の仕組みなので、別の塊にした
- **Build vs Adopt**: 絵はサイトに今ある `logo.png` を使う。注の題の印の枠・位置はテーマのものを使う。補足の見分けは既にある役の class の仕組みに乗せる。新しい道具・依存は足さない
- **Simplification**: 注釈の節に Python の目印を足さない（既にある包みで足りる）。明・暗で絵を替えない（表示の条件の指定が要らない）。印刷用の指定を足さない（テーマの `print-color-adjust: exact` のまま）

### Risks & Mitigations
- `build --strict` が `extra.css` の中の絵の欠けに気づかない — `serve` で `/ukadoc-spec/assets/logo.png` の 200 と `::before` の `backgroundImage` を確かめる
- `serve` を動かしたまま `prepare_site.py` を流すと `_site_src/` が壊れる — 止めてから流す
- ロゴの差し替えで注釈の絵が変わる — Revalidation Triggers に入れた。分けたくなったら案 B（`assets/note-icon.png`）
- `note-<数>.md` の名前で補足でない単位が置かれると絵が付く — 要件の決定 1（ファイル名を正とする）のとおり

### 使った手引き
- `kiro-spec-design` の `rules/design-principles.md`・`design-discovery-light.md`・`design-synthesis.md`・`design-review-gate.md`、`.kiro/settings/templates/specs/design.md`・`research.md`
- 型として、`.kiro/specs/completed/site-look-list-markers/design.md`（塊の書き方・`prepare_site.py` の差分・確かめの部品・画面の一覧）
- 遊びの条件と飾りの扱い（読み上げに出さない `content: ""` の背景の絵）は、要件 4.5 と brief の「遊びの条件」による
