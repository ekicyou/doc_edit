# ギャップ分析: site-look-dark-link-color

- 日付: 2026-10-25
- 対象: `requirements.md`（Requirement 1〜6）と、ukadoc-spec の `origin/main` `afb2152`（メインのチェックアウト `ukadoc-spec/`。最新）
- 読んだもの: `ukadoc-spec/assets/extra.css`・`ukadoc-spec/mkdocs.yml`・`ukadoc-spec/CLAUDE.md`、テーマの見た目の指定（`ukadoc-spec/_site/assets/stylesheets/classic/main.cfc7948b.min.css`・`palette.bf1c5cd6.min.css`。`_site/index.html` の generator は `zensical-0.0.67` で、`requirements.txt` の版と同じ。読むだけで、ビルドはしていない）、試作 `.kiro/specs/completed/site-look-plan/mockups/extra.css`（C24）と `mockups/README.md` の測り、`decisions.md` の C24 の行
- 対比の数は、WCAG 2.x の相対輝度の式で手元で計算した（下の「測りの見込み」）。ブラウザでの測りは設計・実装で行う

## 1. 今の状態

### `assets/extra.css`（約 20 行）
- `[data-md-color-primary="custom"]` にテーマの紺（`--md-primary-fg-color: #1f4e8c`・`--light: #3f6fae`・`--dark: #163a69`・`--md-primary-bg-color` など）を定める。注に「`mkdocs.yml` の `theme.palette` の `primary: custom` と対」とある
- ほかは目次の一覧の詰め（`.md-typeset ul li > ul`）と、記述例の折り返し（`.md-typeset pre > code`）だけ
- 暗い表示（`[data-md-color-scheme="slate"]`）だけの指定は無い
- 書き方の型: 1 つの指定の前に、日本語の「何のための指定か」と「何と対か」の注を置く

### `mkdocs.yml` の `palette`
- 明 `scheme: default`・暗 `scheme: slate` とも `primary: custom`・`accent: indigo`
- `extra_css: [assets/extra.css]`。頁では `main.*.css` → `palette.*.css` → `extra.css` の順に読まれる（`_site/index.html` の 35・40・59 行）
- `body` に `data-md-color-scheme`・`data-md-color-primary="custom"`・`data-md-color-accent="indigo"` が付く（brief の「印は `<body>` に付く」と同じ）

### テーマ側のリンクの色（`palette.*.css`）
- 暗い表示の定義は `@media screen { [data-md-color-scheme=slate] { … --md-typeset-a-color: var(--md-primary-fg-color); … } }`。**暗い表示の色は画面にだけ当たり、印刷には当たらない**（`@media screen` のかたまりは 0〜3685 字目で、テーマの色ごとの暗い表示のリンクの色もこの中にある）
- テーマの色が決まった名前（`indigo` など）なら、暗い表示のリンクの色はテーマ側が明るい色に替える（例: `[data-md-color-scheme=slate][data-md-color-primary=indigo]{--md-typeset-a-color:#5488e8}`）。`custom` には替える指定が無いので、暗い表示でも紺 `#1f4e8c` のままになる。これが 1.94:1 の原因である
- ホバーの色: `[data-md-color-accent=indigo]{--md-accent-fg-color:#526cfe}`。暗い表示でも同じ色（暗い表示用の替えは無い）

### `--md-typeset-a-color` を使う所（`main.*.css`）
| 指定 | 画面のどこか | UKADOC で出るか |
|---|---|---|
| `.md-typeset a` | 本文のリンク | 出る |
| `.md-typeset a code` | コードの字で書いたリンク（例: `` [`\![lock,repaint]`](…) ``） | 出る（原稿に約 98 か所） |
| `.md-nav__item .md-nav__link--active`（と中の `code`） | 左の目次の今の頁、**右の欄の目次の今の節**（スクロールに合わせて JS が `md-nav__link--active` を付け替える。`bundle.*.js` で確認） | 出る |
| `.md-nav--primary .md-nav__item--active > .md-nav__link`（`max-width: 76.234375em` の中） | 狭い画面で開く目次の引き出しの、今の頁を含む項目 | 出る |
| `.md-meta__link` | 頁のメタ情報のリンク | たぶん出ない（ブログ等の機能） |
| `.md-typeset .footnote-backref` | 脚注から本文へ戻るリンク | 出ない（`footnotes` の拡張を使っておらず、原稿に脚注が無い） |

→ 1 つの変数を暗い表示で替えれば、Requirement 1.1〜1.4 の所はすべて一緒に変わる。右の欄の目次の今の節も変わる（brief は名指ししていないが、同じ変数なので分けられない。要件の議論で一緒に変えると確定）。

### ホバー・フォーカスの色を使う所（`--md-accent-fg-color`）
- `.md-typeset a:focus, a:hover`、`a:hover code`（地に `--md-accent-fg-color--transparent`）
- `.md-nav__link[href]:hover`・`:focus`、引き出しの今の項目の `:hover`・`:focus`
- 見出しの横の `¶`（`.headerlink:hover`・`:target`）、コードのコピーのボタンの `:hover`、頁の上へ戻るボタン など
- `extra.css` はこの変数に触らないので、ホバー・フォーカスの見え方は今のまま残る

### 測りの見込み（手元の計算）
暗い表示の地は `hsla(225deg, 15%, 14%)` = `#1e2129`、暗い表示のコードの地は `hsla(225deg, 15%, 18%)` = `#272a35`。

| 色 | 暗い地 `#1e2129` | 暗いコードの地 `#272a35` | 白地 `#fff` | 明るいコードの地 `#f5f5f5` |
|---|---|---|---|---|
| 紺 `#1f4e8c`（今のリンク） | 1.93 | 1.71 | 8.31 | 7.62 |
| 明るい紺 `#8fb4e8`（C24） | 7.55 | 6.69 | 2.13 | 1.95 |
| ホバーの藍 `#526cfe`（`accent: indigo`） | 3.78 | 3.35 | 4.26 | 3.90 |

- 試作の記録（`mockups/README.md`）の 1.94:1・7.56:1 とは、丸めの差（0.01）だけ違う。ブラウザで測った数を正とする
- **ホバーで字が暗くなる**: 今の本番では、ホバーで 1.93 → 3.78 と読みやすくなる。C24 を入れると、ふだん 7.55 の字がホバーで 3.78 に下がる。3:1 は越えるが 4.5:1 には届かない（Requirement 3.3 の線の置き方次第。要件の議論で 3:1 に確定）
- **印刷**: 試作の C24 は `@media screen` で囲まずに書いている。そのまま入れると、暗い表示を選んだまま印刷したとき、テーマの暗い表示の色は外れて白い紙になるのに、リンクだけ明るい紺（白地に 2.13:1）が残る（Requirement 2.4。要件の議論で画面だけに限ると確定）

## 2. 要件と今の資産の対応

| 要件 | 今ある資産 | ギャップ |
|---|---|---|
| 1.1〜1.4 暗い表示のリンクと目次の今の頁を明るい紺に | `extra.css` の `[data-md-color-primary="custom"]` の型、テーマの変数 `--md-typeset-a-color` | **Missing**: 暗い表示だけの上書きが無い |
| 1.5 コードの地の上のリンク 4.5:1 以上 | 同じ変数で一緒に変わる（見込み 6.69:1） | **Constraint**: 7:1 には届かない。要件の議論で下限 4.5:1 に確定 |
| 1.6 明暗の切り替えで読み込み直さずに変わる | テーマが `body` の属性を替える。属性で選ぶ指定ならついてくる | ギャップなし（確かめだけ） |
| 2.1〜2.2 明るい表示とヘッダを変えない | 暗い表示の属性の下だけに書けば、明るい表示とヘッダの紺（`--md-primary-fg-color`）には触らない | ギャップなし（見比べの記録が要る） |
| 2.4 印刷は明るい表示と同じ | テーマの暗い表示は `@media screen` の中だけ | **Constraint**: 上書きも画面だけに限らないと、印刷で 2.13:1 になる。**Unknown**: 印刷の見え方を要件に入れるか |
| 3.1〜3.4 ホバー・フォーカスの確かめ | `accent: indigo` の `#526cfe` | **Unknown**: 「読めない」の線（見込み 3.78:1） |
| 4.1〜4.5 失わないもの | 変える変数はリンクの色だけで、検索の強調（`--md-typeset-mark-color`）・`¶`（`--md-default-fg-color--lighter`）・コピーのボタン・折り返しの指定には触らない | ギャップなし（確かめの記録が要る） |
| 5.1 配られた `extra.css` に指定があるか | `serve` で `/ukadoc-spec/assets/extra.css` を開いて読める | **Constraint**: `build --strict` は気づかない。`serve` を止めて `prepare_site.py` → `build --strict` → 起動し直しの順 |
| 5.2・5.5 明暗の画面の見比べ | `.kiro/specs/completed/site-look-plan/tools/shot.mjs`、目標の画面 2 枚、セレクタ `#bang-lock-repaint` | ギャップなし。目標の画面はほかの候補（C01〜C21）入りなので、見比べはリンクと目次の色だけ |
| 5.3 対比の記録 | 試作の測り（`mockups/README.md`）、上の計算 | 記録の置き場は設計で決める（`research.md` か、spec の別の記録か） |
| 5.4 注に紺との対を書く | `extra.css` の今の注の型（「`mkdocs.yml` の … と対」） | **Missing**: 注を書く |
| 6.1〜6.6 範囲と PR | `workflow.md` の作業木・Build Gate・規約 Gate・`/kiro-complete` | ギャップなし。後続 spec と `extra.css` でぶつかる見込みはある（追記どうしで、別の行） |

## 3. 実装の選択肢

### 案 A: `extra.css` に暗い表示の上書きを 1 つ足す（試作の C24 と同じ形）
- `[data-md-color-scheme="slate"] { --md-typeset-a-color: #8fb4e8; }` を、注とともに足す
- ✅ 1 行。brief の Approach のとおり。テーマの `palette.css` の後に読まれ、詳細度も同じ（属性 1 つ）なので効く
- ❌ 暗い表示のまま印刷すると、リンクだけ明るい紺が白い紙に出る（2.13:1）
- ❌ `primary` を `custom` 以外に変えたときも明るい紺が残る（今は `palette` を変えない約束なので実害は無い）

### 案 B: 案 A を画面だけに限る（`@media screen` で囲む）
- テーマの暗い表示の定義と同じく、`@media screen { [data-md-color-scheme="slate"] { … } }` にする
- ✅ 印刷は明るい表示と同じ紺のまま（Requirement 2.4 を満たす）。テーマの書き方にそろう
- ❌ 案 A より 2 行増える。試作（C24）と字面が変わる（試作は写さずに書き直してよいので問題ない）

### 案 C: 案 A または B に、テーマの色との組を明示する（`[data-md-color-primary="custom"]` も条件に入れる）
- `[data-md-color-scheme="slate"][data-md-color-primary="custom"]` にする。テーマ側の `…[data-md-color-primary=indigo]{--md-typeset-a-color:…}` と同じ形
- ✅ 「紺のテーマと対」が指定の形でも分かる。`primary` を名前の色に戻せば自動で外れる
- ❌ 詳細度が上がる（属性 2 つ）。今の要件では効き目の差は無い

### 案 D（ホバーを足すときだけ）: 暗い表示のホバーの色も替える
- 線を 4.5:1 に置いたときだけ要る。`--md-accent-fg-color` を暗い表示だけ明るい色に替えると、`¶`・コピーのボタン・ページ送りなどホバーの色を使うすべての所が変わる
- ❌ brief の「確かめるだけにし、読めないと分かったときだけ足す」の範囲を超えて広がりやすい。リンクの `:hover` だけに絞ると、テーマの指定の詳細度に合わせた書き方が要る
- 今の見込み（3.78:1）と 3:1 の線では要らない

## 4. 工数と危険
- **工数: S**（1 日未満）。`extra.css` に数行と注、Build Gate、明暗の画面と測り、狭い画面の確かめ
- **危険: Low**。既にあるテーマの変数を、既にある型で上書きするだけ。試作で効き目（7.56:1）を確かめ済み。気をつけるのは、`serve` の写し（`_site_src/`）の取り直しと、ブラウザの古い写し（Ctrl+F5）くらい

## 5. 設計への申し送り
- **推す案**: 案 B（画面だけの暗い表示の上書き）。印刷を「今のまま」に保て、テーマの書き方にそろう。案 C の `primary="custom"` を条件に足すかは、注で「紺と対」と書けば足りるので、設計で軽く決める
- **要件の議論で確定したこと**（2026-10-25、全議題を推奨案で確定）:
  - 印刷は要件に入れる（Requirement 2.4）。上書きは画面だけに限る（案 B か、案 B に案 C の条件を足したもの。案 A は外れる）
  - ホバー・フォーカスの線は 3:1（Requirement 3.3）。見込み 3.78:1 なので足さない。案 D は要らない
  - 右の欄の目次の今の節も、一緒に明るい紺になってよい（Requirement 1.4）
  - コードの地の上のリンクの下限は 4.5:1（Requirement 1.5）
- **設計で決めること**:
  - 案 B に案 C の `primary="custom"` の条件を足すか
  - 測りの記録の置き場
- **Research Needed**:
  - ブラウザでの測り: 暗い表示のリンク・左の目次の今の頁・右の欄の目次の今の節・コードの字のリンク（コードの地）・ホバーの字。明るい表示のリンク（変わらないこと）
  - 暗い表示のまま印刷の見え方（印刷のプレビューか、印刷の媒体を真似た画面で）。案 A と B の差が出るか
  - 狭い画面（375）の引き出しの目次で、今の頁を含む項目が明るい紺になること

## OPEN QUESTIONS（要件の議論で確定、2026-10-25）
開発者の「承認」により、4 件とも推奨案で確定した。
1. **ホバー・フォーカスの「読めない」の線**: 3:1。今の見込み 3.78:1 では足さない（ふだん 7.55:1 の字がホバーで 3.78:1 に暗くなることは受け入れる）
2. **暗い表示のまま印刷したときのリンクの色**: 明るい表示と同じ紺で印刷する。上書きを画面だけに限る
3. **コードの地の上のリンクの線**: 下限 4.5:1。見込み 6.69:1 で、コードの中のリンクだけの色は足さない
4. **右の欄の目次の今の節**: 左の目次の今の頁と一緒に明るい紺になってよい

---

# 設計の調査（2026-10-25、kiro-spec-design）

## Summary
- **Feature**: `site-look-dark-link-color`
- **Discovery Scope**: Simple Addition（既にあるテーマの変数を、テーマ自身の型で上書きする。外の調べ物は無し。手元のテーマの見た目の指定を読んで型を確かめた）
- **Key Findings**:
  - テーマの暗い表示の替え（`[data-md-color-scheme=slate][data-md-color-primary=indigo]{--md-typeset-a-color:#5488e8}`、`palette.bf1c5cd6.min.css` の 2852 字目）は、暗い表示の定義と同じ `@media screen{…}`（0〜3685 字目）の中にある。だから「画面だけ × `slate` × `custom`」の上書きは、テーマ自身の替えと同じ形になる
  - 明るい表示の `--md-typeset-a-color: var(--md-primary-fg-color)` は `:root,[data-md-color-scheme=default]` にあり、媒体の条件が無い。印刷では暗い表示の塊が外れ、この紺が残る
  - ホバー・フォーカスは `.md-typeset a:focus,.md-typeset a:hover{color:var(--md-accent-fg-color)}` と `.md-nav__link[href]:focus,…:hover{color:var(--md-accent-fg-color)}`。リンクの色の変数とは別なので、上書きはホバーに響かない（見込み 3.78:1 のまま）
  - `list/sakura-script` の組み立て済みの頁に、コードの字のリンク（`<a …><code>`）が 6 個、`#__drawer`、明・暗の切り替えの `label[for="__palette_0"]`・`[for="__palette_1"]` がある。`mkdocs.yml` の `features` に `search.highlight` があるので、`?h=` で結果の語の強調を出せる
  - `site-look-plan` の記録（`mockups/README.md`）には、7.56:1 をどう測ったかの手順が残っていない。この spec で手順を決めて記録する

## Research Log

### 上書きの形と詳細度
- **Context**: 案 B（画面だけ）に案 C（`custom` の条件）を足すか
- **Sources Consulted**: `ukadoc-spec/_site/assets/stylesheets/classic/palette.bf1c5cd6.min.css`・`main.cfc7948b.min.css`（`zensical-0.0.67` の組み立て済み。読むだけ）、`ukadoc-spec/mkdocs.yml`
- **Findings**: テーマの暗い表示のリンクは `[data-md-color-scheme=slate]`（属性 1 つ）。`extra.css` は最後に読まれるので、属性 1 つでも 2 つでも勝つ。`body` に `data-md-color-scheme` と `data-md-color-primary` が両方付くので、2 つを並べた条件は同じ要素に当たる
- **Implications**: 案 B と案 B＋C は字数も効き目も同じ。差は、テーマの色を名前の色に戻したときに自動で外れるかどうかだけ

### ブラウザでの測り方
- **Context**: 要件 1.2・1.5・2.1・3.1・3.2・5.3 の測りの手順
- **Sources Consulted**: `.kiro/specs/completed/site-look-plan/tools/shot.mjs`（画面と横幅だけを出し、色は測らない）、組み立て済みの頁の作り
- **Findings**: `shot.mjs` は任意の式を流せない。完了した spec の道具なので手を入れない。内蔵ブラウザの枠なら、`getComputedStyle` で色を読み、WCAG 2.x の式で対比を出せ、ポインタを載せた（ホバー）ときの色も読める。フォーカスは `focus()` で `:focus` に当たる。印刷は枠で真似られないので、塊が `CSSMediaRule`（`screen`）の中にあることを見た目の指定の木で確かめる
- **Implications**: 新しい道具は作らない。手順は `design.md` の ContrastProbe に、測る所・セレクタ・線の表として決め、流した式と結果は `verification.md` に書く

## Architecture Pattern Evaluation

| Option | Description | Strengths | Risks / Limitations | Notes |
|--------|-------------|-----------|---------------------|-------|
| 案 A | `[slate]` だけ、媒体の条件なし | 1 行 | 印刷で明るい紺が白い紙に出る（2.13:1） | 要件 2.4 で外れた |
| 案 B | `@media screen` の中の `[slate]` | 印刷は今のまま | テーマの色を名前の色に戻しても残る | 要件を満たす |
| 案 B＋C | `@media screen` の中の `[slate][primary="custom"]` | テーマ自身の替えと同じ形。名前の色に戻すと自動で外れる | 属性が 1 つ増える（効き目の差は無い） | 選んだ（前提。OPEN QUESTION 1） |
| 案 D | 暗い表示のホバーの色も替える | — | ¶・コピーのボタン・ページ送りまで変わる | 線 3:1 で要らない |

## Design Decisions

### Decision: 上書きの条件を「画面 × `slate` × `custom`」にする
- **Context**: 要件 1.1・2.1・2.4。`research.md` の申し送り「案 B に案 C の条件を足すか」
- **Alternatives Considered**:
  1. 案 B — `@media screen { [data-md-color-scheme="slate"] { … } }`
  2. 案 B＋C — `@media screen { [data-md-color-scheme="slate"][data-md-color-primary="custom"] { … } }`
- **Selected Approach**: 案 B＋C（前提。話し合いで確定する）
- **Rationale**: 字数が同じなら、端の場合（テーマの色の変更）に正しい方を採る。テーマ自身の替えと同じ形なので、読む人にも「紺のテーマと対」が条件の形で分かる
- **Trade-offs**: 詳細度が上がる（属性 2 つ）。今の要件での効き目の差は無い
- **Follow-up**: 実装で、明るい表示・印刷（CSSOM）で効かないことを確かめる

### Decision: 塊を `extra.css` の末尾に、見出しのコメントで区切って置く
- **Context**: 要件 6.5、`workflow.md` の「`extra.css` には単位ごとに見出しのコメントで区切った塊で書く」
- **Selected Approach**: 末尾に `/* site-look-dark-link-color: … */` の塊を足す。注に紺との対・暗い地との対比・紺を変えたら測り直すこと・画面だけのわけを書く（要件 5.4）
- **Trade-offs**: 紺のテーマの塊から離れる。注で「上のテーマの紺」と指して補う（OPEN QUESTION 4）

### Decision: 測りの記録は spec の `verification.md` と `screenshots/` に置く
- **Context**: 要件 5.2・5.3。ギャップ分析の申し送り「記録の置き場」
- **Alternatives Considered**:
  1. `research.md` の末尾に節を足す
  2. 新しい `verification.md` と `screenshots/`
- **Selected Approach**: 2（前提。OPEN QUESTION 2）
- **Rationale**: `research.md` は設計までの調査の記録で、実装の測りとは書く時期が違う。完了で spec ごと `completed/` に移るので、PR の本文とテーマの色の変わったときの手がかりとして残る
- **Trade-offs**: ファイルが 1 つ増える。画面は 3 枚（変更の前の明るい表示・変更の後の明・暗）に絞る

### Decision: 測りはブラウザの計算された色で行い、新しい道具は作らない
- **Context**: 要件 1.2・1.5・2.1・2.4・3.1・3.2・5.3
- **Selected Approach**: 内蔵ブラウザの枠で `getComputedStyle` を読み、WCAG 2.x の式で対比を出す。ホバーは枠のポインタを載せ、フォーカスは `focus()`。印刷は CSSOM で `@media screen` の中かを確かめる（OPEN QUESTION 3・5）
- **Rationale**: `shot.mjs` は色を測らず、完了した spec の道具なので変えない。使い捨ての手順で足りる大きさである

## Synthesis
- **Generalization**: 要件 1.1〜1.5 は「リンクの色の変数を暗い表示で替える」1 つの問題の言い換えで、上書き 1 つが全部を受け持つ。インターフェースを広げる余地（ほかの変数）は要件に無いので足さない
- **Build vs. Adopt**: テーマ自身の暗い表示の替えの型（`@media screen` の中の `[slate][primary=…]`）をそのまま使う。測りは既にある `shot.mjs` と、ブラウザの計算された色を使い、道具を作らない
- **Simplification**: ホバーの指定（案 D）・新しい測りの道具・`shot.mjs` の変更・変更の前の暗い表示の画面は入れない。ホバーが 3:1 に届かないとき（見込みでは起きない）だけ、開発者に提示して足す

## Risks & Mitigations
- `serve` が書きかけの `_site_src/` を拾い、古い `extra.css` を配る — 5.1 の配りの確かめを測りの前に置き、`serve` を止めてから組み立て直す
- 注の対比の数が、手元の計算（7.55）・試作の記録（7.56）・ブラウザの数でずれる — ブラウザで測った数を正とし、注と `verification.md` をその数にそろえる
- 後続 spec が `extra.css` の末尾に塊を足してぶつかる — 別の行の塊なので両方を並べて残す（`workflow.md`）

## 参照したスキル・規則
- `kiro-spec-design` の `rules/design-principles.md`・`design-discovery-light.md`・`design-synthesis.md`・`design-review-gate.md`
- 対比の式は WCAG 2.x の相対輝度（ギャップ分析と同じ）。新しい外の資料は引いていない

## 設計の話し合いの決定（2026-10-25）
- 開発者の「承認」により、設計の議題 5 件を推奨案で確定した（案 C の条件を足す・記録は `verification.md` と `screenshots/` 4 枚・印刷は `@media screen` の中にあることの確かめだけ・塊は `extra.css` の末尾・測りは内蔵ブラウザの枠、使えなければ Claude in Chrome）
- 変更の前の暗い表示の画面も撮る。PR で直す前の読めなさ（1.94:1）を見せるため
- 開発者の指示で、PR の説明に一連の PR と続きを順に出すことを書く（Requirement 6.7。後続の spec の brief にも同じ「続きの PR の説明」を足した）
