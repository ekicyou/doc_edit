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

→ 1 つの変数を暗い表示で替えれば、Requirement 1.1〜1.4 の所はすべて一緒に変わる。右の欄の目次の今の節も変わる（brief は名指ししていないが、同じ変数なので分けられない。OPEN QUESTION 4）。

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
- **ホバーで字が暗くなる**: 今の本番では、ホバーで 1.93 → 3.78 と読みやすくなる。C24 を入れると、ふだん 7.55 の字がホバーで 3.78 に下がる。3:1 は越えるが 4.5:1 には届かない（Requirement 3.3 の線の置き方次第。OPEN QUESTION 1）
- **印刷**: 試作の C24 は `@media screen` で囲まずに書いている。そのまま入れると、暗い表示を選んだまま印刷したとき、テーマの暗い表示の色は外れて白い紙になるのに、リンクだけ明るい紺（白地に 2.13:1）が残る（Requirement 2.4。OPEN QUESTION 2）

## 2. 要件と今の資産の対応

| 要件 | 今ある資産 | ギャップ |
|---|---|---|
| 1.1〜1.4 暗い表示のリンクと目次の今の頁を明るい紺に | `extra.css` の `[data-md-color-primary="custom"]` の型、テーマの変数 `--md-typeset-a-color` | **Missing**: 暗い表示だけの上書きが無い |
| 1.5 コードの地の上のリンク 4.5:1 以上 | 同じ変数で一緒に変わる（見込み 6.69:1） | **Constraint**: 7:1 には届かない。線の置き方は OPEN QUESTION 3 |
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
- **決めること**:
  - 印刷を要件に入れるか（OPEN QUESTION 2。入れないなら案 A で足りる）
  - ホバー・フォーカスの線（OPEN QUESTION 1）。3:1 なら足さない、4.5:1 なら案 D が要る
  - 右の欄の目次の今の節も明るい紺になってよいか（OPEN QUESTION 4。同じ変数なので、分けるなら別の指定が要る）
  - 測りの記録の置き場
- **Research Needed**:
  - ブラウザでの測り: 暗い表示のリンク・左の目次の今の頁・右の欄の目次の今の節・コードの字のリンク（コードの地）・ホバーの字。明るい表示のリンク（変わらないこと）
  - 暗い表示のまま印刷の見え方（印刷のプレビューか、印刷の媒体を真似た画面で）。案 A と B の差が出るか
  - 狭い画面（375）の引き出しの目次で、今の頁を含む項目が明るい紺になること

## OPEN QUESTIONS（要件の議論で決める）
1. **ホバー・フォーカスの「読めない」の線**: 要件では、ポインタを載せている間だけの見え方として 3:1 を線に置いた（前提）。見込みは 3.78:1 で、この線なら足さない。ただし、ふだん 7.55:1 の字がホバーで 3.78:1 に暗くなる。4.5:1 を線にするなら、ホバーの色も替える（範囲が広がる）
2. **暗い表示のまま印刷したときのリンクの色**: 要件では「印刷は明るい表示と同じ紺」を前提に入れた（Requirement 2.4）。入れるなら上書きを画面だけに限る。要らないなら試作どおりの 1 行で足りる
3. **コードの地の上のリンクの線**: brief は暗い地に 7:1 ほどとだけ言う。コードの地の上では 6.69:1 で 7:1 に届かない。要件では 4.5:1 を下限に置いた（前提）。これでよいか
4. **右の欄の目次の今の節**: 左の目次の今の頁と同じ変数なので、一緒に明るい紺になる。brief は名指ししていない。要件では「リンクの色で描かれる所すべて」と読んだ（前提）。これでよいか
