# Requirements Document

## Project Description (Input)
- **誰が困っているか**: UKADOC の公開サイト（https://ukatech.shillest.net/ukadoc-spec/ ）で仕様を引くゴースト制作者と、伺からしい遊びを求める開発者
- **いまの状況**: 注釈で書かれた所（「さくらスクリプトのエスケープ」「さくらスクリプトの寿命」などの注釈の節、「補足」の項目、`!!! note "注"`）が、ほかの見出しと同じ見え方で、注釈だとひと目で分からない。技術サイトではあるが、伺からしい遊びも無い。開発者は、添付した色付きの絵（筆にピンクのリボンを結んだ絵、88×88 の PNG）を注釈の見出しに付けるよう求め、試作を見て「白黒はデザインが破綻したので、カラーアイコンをそのまま使って。なお、注釈表記がある箇所はほかにもあったかもしれないが、同様な対応よろしくね。」と答えた
- **何を変えるか**: `site-look-plan` で「採る」と決まった C26（注釈の見出しの頭に添付の色付きの絵を置く）を、本番の書き方で ukadoc-spec に入れる（詳細は `brief.md`）

## Introduction
この spec は、UKADOC のサイトで、注釈で書かれた所の見出しの頭に、開発者が添付した色付きの絵（筆とリボン）を置き、注釈だとひと目で分かるようにし、伺からしい小さな遊びを加える。`site-look-plan` の `decisions.md` で「採る」と決まった C26 を本番の書き方で入れる。方向は決まっているので、ここでは議論し直さない（C27 の白黒の線の絵は採らなかった）。

変えるのは、ukadoc-spec の `assets/`（絵を足すことと、サイトの見た目の指定 `assets/extra.css`）と、補足の項目の見出しに印を付ける組み立ての処理（`scripts/prepare_site.py`）で、原稿は変えない。ukadoc-spec を変えるので、この spec の作業木 `.worktrees/site-look-note-icon/` で、依存先 `site-look-list-markers` の PR（ukadoc-spec #12、`0eb3fb9`）がマージされた後の `origin/main` の上に書き、Build Gate と規約 Gate を通す。PR は原則 1 spec = 1 PR なので（開発者の指示、2026-10-25）、この spec の完了で自分の PR を作ってスクワッシュマージする。

本文の主語は 2 つある。「UKADOC のサイト」は、この spec の変更を入れた後の公開サイト（とそのプレビュー）の見え方を指す。「site-look-note-icon」は、この spec の作業（ukadoc-spec への変更・確かめ・記録）を指す。

言葉の決まり（この文書の中で）:
- **まとめ頁**: `descript/<名前>/`・`list/<名前>/`・`spec/<名前>/` のディレクトリを 1 頁にまとめた頁。`manual/`・`dev/`・`memo/` の頁、`spec/` の 1 ファイルの頁、トップの頁はまとめ頁でない（以下「読み物の頁」）
- **注釈の節**: まとめ頁の中の、原稿の `notes_*.md` の 1 つの単位。その見出しは `site-look-list-markers` の C04 の点線の箱の頭の見出しで、id が `notes_` で始まる。今は 16 個（`list/sakura-script` 14 ― 段が `h2` 2・`h3` 12、`list/propertysystem` 2 ― 段が `h4`）
- **補足の項目**: まとめ頁の中の、原稿の `note-<数>.md`（例: `note-1.md`）の 1 つの単位。頭の見出しの字は「補足」で、id は `note-1`・`balloon-text-note-1` のように `note-` と数で終わる。今は 16 個（`list/shiori-event-ex` 9・`list/sakura-script` 3・`list/propertysystem` 1・`descript/ghost` 1・`descript/install` 1・`descript/shell` 1）。単位の中の節の見出し（例: 「サーフェスの位置情報」。id は `…-note-1-…`）は補足の項目の見出しに含めない
- **注の題**: 原稿の `!!! note` の注意書き（admonition）の題。今は `dev/shell` の `!!! note "注"` の 2 個で、Material の鉛筆の印が付いている
- **注釈の見出し**: 注釈の節の見出し・補足の項目の頭の見出し・注の題の 3 つ（今は計 34 か所）
- **注釈の絵**: 開発者が添付した色付きの絵（筆とリボン、88×88 の PNG）。写しは `.kiro/specs/completed/site-look-plan/mockups/image/slp-notes-icon.png` にある。このサイトにもともとあった絵なので、出どころや使ってよい範囲はこの spec で扱わない（開発者の指示、2026-10-25）

目標の画面は `.kiro/specs/completed/site-look-plan/screenshots/` の `mock-sakura-script-C26-light.png`・`mock-sakura-script-C26-dark.png`（注釈の節「さくらスクリプトのエスケープ」「さくらスクリプトの寿命」）と `mock-propertysystem-C26-light.png`・`mock-propertysystem-C26-dark.png`（補足の項目「補足」）の、見出しの頭の絵である。これらの画面にはほかの候補（C04 の箱など）も入っているので、見比べるのは見出しの頭の絵だけである。注の題の目標の画面は無い。

## Boundary Context
- **In scope**:
  - 注釈の絵を ukadoc-spec の `assets/` に置くこと（画像を足す）
  - 注釈の見出し 34 か所の頭に注釈の絵を置く見え方（Requirement 1〜3）
  - 補足の項目の頭の見出しの印（組み立ての処理で付ける）
  - 注の題の Material の鉛筆の印を外して、注釈の絵に替えること
  - 明・暗の表示と幅 375 の確かめ、目印の数の記録
- **Out of scope**:
  - C27（白黒の線に起こした絵）。絵を描き直すこと・白黒にすること・色を変えること
  - `!!! tip`（9 個）・`!!! warning`（3 個）の注意書きの印（Material の印のまま）と、本文の「※」の行（見出しが無い）
  - 注釈の節の箱そのもの（`site-look-list-markers` の C04）
  - キャラクターを頁に出すこと（C12。roadmap のバックログ）
  - 原稿（`.md`）・`.nav.yml`・`mkdocs.yml`・`requirements.txt`・Zensical の版。注釈の書き方そのもの（`notes_*.md`・`note-*.md` の置き方）
  - 旧サイト（https://ssp.shillest.net/ukadoc-legacy/manual/ ）の画像・見た目の指定・スクリプト（再利用の許可が明記されていない）
- **Adjacent expectations**:
  - 土台は、`site-look-list-markers` の PR（ukadoc-spec #12）がマージされた後の ukadoc-spec の `origin/main`（今は `0eb3fb9`。`site-look-list-items` の #11 も入っている）
  - 注釈の節の見出しは、`site-look-list-markers` の C04 の箱の頭で、中央寄せと下の点線の区切りが付いている。この spec はその見え方を保ったまま、頭に絵を足す
  - 補足の項目の頭の見出しには、`site-look-list-items` の項目名の帯（C01、`bundle-item`）が付いている。この spec はその帯を保ったまま、頭に絵を足す
  - `site-look-definition-tables` は同じ `prepare_site.py` に、`site-look-sakura-script-highlight`・`site-look-sstp-playback` は同じ `assets/extra.css` などに手を入れる。どれが先に入ってもよい
  - 目標の画面・試作・測りの道具（`shot.mjs`）は `site-look-plan`（`.kiro/specs/completed/site-look-plan/`）のものを読むだけで、書き換えない

## Requirements

### Requirement 1: 注釈の節の見出しの絵
**Objective:** As a まとめ頁で仕様を引くゴースト制作者, I want 注釈の節の見出しの頭に注釈の絵が見えること, so that 「さくらスクリプトの寿命」のような注釈の節を、項目の説明と別の種類の文だとひと目で分かる

#### Acceptance Criteria
1. While まとめ頁を見ているとき, the UKADOC のサイト shall 16 個のすべての注釈の節の見出しの頭に、注釈の絵を、見出しの字の 1.5 倍ほどの大きさで置く（目標の画面 `mock-sakura-script-C26-light.png`・`mock-sakura-script-C26-dark.png` の見出しの頭の絵）
2. The UKADOC のサイト shall 注釈の節の見出しの段（`h2`・`h3`・`h4`）や置かれた所に依らず、同じ絵を付ける（`list/propertysystem` の、段が `h4` の 2 個にも付ける）
3. The UKADOC のサイト shall 注釈の節の見出しの中央寄せと、見出しと本文の間の点線の区切り（`site-look-list-markers` の C04）を、絵を足した後も保つ
4. If 見出しが注釈の節の頭の見出しでないとき（項目名・分類の見出し・項目の中の節の見出し）, the UKADOC のサイト shall その見出しに注釈の絵を付けない

### Requirement 2: 補足の項目の見出しの絵
**Objective:** As a まとめ頁で仕様を引くゴースト制作者, I want 「補足」の項目の見出しの頭にも同じ注釈の絵が見えること, so that 補足の項目が、注釈の節と同じ種類の注釈だと分かる（開発者の「注釈表記がある箇所はほかにもあったかもしれないが、同様な対応よろしくね」）

#### Acceptance Criteria
1. While まとめ頁を見ているとき, the UKADOC のサイト shall 16 個のすべての補足の項目の頭の見出し（字は「補足」）の頭に、注釈の絵を、見出しの字の 1.5 倍ほどの大きさで置く（目標の画面 `mock-propertysystem-C26-light.png`・`mock-propertysystem-C26-dark.png` の「補足」の頭の絵）
2. The UKADOC のサイト shall 補足の項目の頭の見出しの項目名の帯（`site-look-list-items` の C01）を、絵を足した後も保つ
3. If 見出しが補足の項目の中の節の見出しであるとき（例: `descript/shell` の「サーフェスの位置情報」、`list/propertysystem` の「※SHIORI Statusヘッダ」）, the UKADOC のサイト shall その見出しに注釈の絵を付けない
4. When 原稿に `note-<数>.md` の補足の項目や `notes_*.md` の注釈の節が増えたとき, the UKADOC のサイト shall 決まった一覧に書き足さなくても、その見出しにも注釈の絵を付ける（補足の項目は見出しの字「補足」でなく、原稿のファイル名 `note-<数>.md` の形で見分け、個々の頁や項目を名指しする一覧を持たない）

### Requirement 3: 注の題の絵
**Objective:** As a 読み物の頁を読むゴースト制作者, I want `!!! note "注"` の題にも、鉛筆の印の代わりに同じ注釈の絵が見えること, so that サイトの中で注釈の印が一通りにそろう

#### Acceptance Criteria
1. While `!!! note` の注意書きのある頁（今は `dev/shell` の 2 個）を見ているとき, the UKADOC のサイト shall 題の頭の Material の鉛筆の印を出さず、その位置に注釈の絵を置く
2. The UKADOC のサイト shall 注の題の字・題の地の色・注意書きの枠と本文を、今のままの見え方で表示する
3. The UKADOC のサイト shall `note` の注意書きの本文の中の見出し（例: `dev/shell` の「※1」「※2」）に注釈の絵を付けない
4. If 注意書きの種類が `note` でないとき（`!!! tip`・`!!! warning` など）, the UKADOC のサイト shall その題の印を Material の印のまま表示する
5. The UKADOC のサイト shall 題の字（例: 「注」）に依らず、種類が `note` のすべての注意書きの題に同じ絵を付ける（折りたたみの `??? note` も含む。今は 0 個）

### Requirement 4: 絵の見え方と飾りとしての扱い
**Objective:** As a 明・暗のどちらでも UKADOC を読むゴースト制作者, I want 注釈の絵がどの表示でも粗くならずに読め、本文の読み取りを妨げないこと, so that 遊びのせいで読みやすさが落ちない（D16 ダークモード、`brief.md` の「遊びの条件」）

#### Acceptance Criteria
1. The UKADOC のサイト shall 開発者が添付した色付きの注釈の絵を、描き直さず、白黒にも色を変えもせずに使う
2. While 暗い表示で見ているとき, the UKADOC のサイト shall 注釈の絵を、地から浮かずに筆とリボンが分かる見え方で表示する（目標の画面の暗い表示 `mock-*-C26-dark.png` と同じ見え方。絵は飾りで色を変えないので、数での対比の線は置かず、目標の画面との見比べで確かめる）
3. When 利用者が明るい表示と暗い表示を切り替えたとき, the UKADOC のサイト shall 頁を読み込み直さなくても、注釈の絵をそのときの表示に合った見え方にする
4. The UKADOC のサイト shall 注釈の絵を、試作の大きさ（見出しの字の 1.5 倍ほど）より大きく出さない（大きく出すと粗くなるため）
5. The UKADOC のサイト shall 注釈の絵を飾りとして扱い、読み上げに出さず、見出しの字・検索で引ける字・右の欄の目次の字に加えない
6. The UKADOC のサイト shall 本文の字の大きさと行間を変えない（注釈の見出しの行の高さが絵の分だけわずかに増えるのは、目標の画面と同じ範囲なら認める）
7. If 頁を印刷したとき, the UKADOC のサイト shall 注釈の見出しの字を今と同じに印刷する（絵は飾りなので、ブラウザが背景の絵を印刷しない設定で絵が出なくても、見出しの字が読めればよい）

### Requirement 5: 目印と絵の置き方
**Objective:** As a doc_edit の開発者と ukadoc-spec のメンテナ, I want 絵がサイトに確かに配られ、目印が当てるべき見出しにだけ付くこと, so that 絵の欠けや、当てる所の間違いを見落とさず、ほかの組み立ての処理と原稿を傷めない

#### Acceptance Criteria
1. The site-look-note-icon shall 注釈の絵を、ukadoc-spec の `assets/` の下に ASCII の名前のファイルとして置き、サイトの組み立てで公開の頁から読めるようにする（置き場とファイル名は設計で決め、試作の `slp-` の接頭辞は使わない）
2. The site-look-note-icon shall 補足の項目の頭の見出しにだけ目印を付け、目印の数が補足の項目の数（今は 16。実装のときに数え直す）と合うようにする
3. The site-look-note-icon shall 目印の名前を、試作の `slp-` の接頭辞でなく、`site-look-list-items` の目印の名前の決まり（`bundle-<役>`）にそろえて決め、既にある `bundle-notes`（注釈の節の包み）と取り違えない名前にする
4. Where 頁が読み物の頁であるとき, the site-look-note-icon shall 補足の項目の目印を付けない（読み物の頁に `note-<数>.md` の単位は無い）
5. The site-look-note-icon shall 見出しの id・見出しの数の検査・リンクの書き換え・項目の間の区切りの線・`bundle-item`・`bundle-category`・`bundle-notes` などの既にある目印・サイトに置く生の Markdown 原稿（`_raw/`）を今のまま保ち、組み立ての処理の一覧の検査を通す
6. The site-look-note-icon shall build したサイトの全頁で、本文に目印の書きかけの字（`{: ` など）を漏らさない

### Requirement 6: 今のサイトの良いところを失わない
**Objective:** As a UKADOC を読むゴースト制作者, I want 検索・見出しへのリンク・狭い画面・コードのコピー・記述例の字が今のまま使えること, so that 見た目の遊びのせいでほかの使い勝手が落ちない（`survey.md` の「失わないもの」。D16 は Requirement 4 が受け持つ）

#### Acceptance Criteria
1. The UKADOC のサイト shall 注釈の見出しの字を変えず、今と同じ字で検索で引けるようにする（D15）
2. The UKADOC のサイト shall 注釈の見出しの id、見出しの横のリンクの印（¶、`a.headerlink`）、右の欄の目次を今のまま保つ（D17）
3. When 幅 375 の狭い画面で注釈の見出しのある頁を見たとき, the UKADOC のサイト shall 頁の横幅を画面の幅に収める（`scrollWidth` と `innerWidth` が同じ 375。D18）
4. The UKADOC のサイト shall コードブロックのコピーのボタンを残し、ボタンでコピーされる字を今と変えない（D19）
5. The UKADOC のサイト shall 注釈の節の中の `\`（「さくらスクリプトのエスケープ」の `\\` など）を、今と同じ字で見せる（D20）

### Requirement 7: 表示の確かめと記録
**Objective:** As a doc_edit の開発者, I want 絵が配られた頁に効いていることと、目標の画面との見比べと数が残っていること, so that 見落としなく PR に出せ、後で同じ見出しを触る spec が確かめ直せる

#### Acceptance Criteria
1. When 変更を確かめるとき, the site-look-note-icon shall ローカルのプレビュー（頁の道は `/ukadoc-spec/` から始まる）で、配られた見た目の指定のファイルにこの spec の指定が入っていることと、配られた注釈の絵が読める（200 で返る）ことを確かめる（サイトを作る処理の厳しい検査は、見た目の指定の中の絵が無くても気づかないため）
2. The site-look-note-icon shall プレビューの頁の HTML を取ってきて、注釈の節の見出し 16 個・補足の項目の目印 16 個・`note` の注意書き 2 個があること（頁ごとの数を含む）と、本文に漏れた書きかけの字が 0 であることを確かめて記録する
3. The site-look-note-icon shall 変更の前と後で、注釈の見出しを持つ頁の見出しの id の並び・`a.headerlink`（¶）の数・右の欄の目次の項目の数が同じことを確かめて記録する
4. The site-look-note-icon shall 変更の後の画面を、目標の画面と同じ頁・同じ位置・同じ大きさ（幅 1000・高さ 700）で明・暗の両方で撮り、見出しの頭の絵を見比べた結果を記録する（`list/sakura-script` の `#notes_escape`、`list/propertysystem` の `#note-1`）
5. The site-look-note-icon shall 目標の画面に写っていないもの ― `dev/shell` の注の題と、段が `h4` の注釈の節の見出し（`list/propertysystem`）― を明・暗で撮って確かめ、記録する
6. If 撮った画面に、撮る途中の描き直しで二重に重なった跡（上の端以外の左右の端に、ヘッダの色の行が出ている）があるとき, the site-look-note-icon shall その画面を撮り直す
7. When 開発者に画面を見せるとき, the site-look-note-icon shall 古い写しが残らないよう、ブラウザでの強制の再読み込み（Ctrl+F5）を頼む

### Requirement 8: 変更の範囲と PR の単位
**Objective:** As a ukadoc-spec のメンテナ, I want 小さく、絵と目印と見た目の指定に限った変更を、この spec だけの PR で受け取ること, so that 他者も使う公開リポジトリでもレビューしやすい

#### Acceptance Criteria
1. The site-look-note-icon shall ukadoc-spec の中で、注釈の絵の 1 ファイルを `assets/` に足し、`assets/extra.css` と `scripts/prepare_site.py` だけを変え、原稿（`.md`）・`.nav.yml`・`mkdocs.yml`・`requirements.txt`・Zensical の版を変えない
2. The site-look-note-icon shall `assets/extra.css` のこの spec の指定を塊として足し、塊ごとの注を `/* site-look-note-icon: <何の指定か> */` の短い 1 行にとどめる（説明・わけは spec の記録に書く）
3. The site-look-note-icon shall 色や大きさを、テーマの色の変数や字の大きさに対する比で決め、テーマの色に依る値を直書きしない
4. The site-look-note-icon shall 変更を、この spec の作業木 `.worktrees/site-look-note-icon/`（ブランチ `site-look-note-icon`）で、`site-look-list-markers` の PR がマージされた後の ukadoc-spec の `origin/main` の上に書く
5. The site-look-note-icon shall この spec の完了の前に、Build Gate（`prepare_site.py` と `zensical build --strict` が、どちらも失敗なく終わる）と規約 Gate（ファイル名は ASCII）を通す
6. The site-look-note-icon shall この spec の完了で、この spec だけの PR を作ってスクワッシュマージし、PR の説明に、この PR が一連の見た目の PR のどこにあるか（PR を出すときの roadmap による。brief の「続きの PR の説明」の 6 本をまとめた 1 本の書き方は、1 spec = 1 PR への改めに読み替える）を書く。絵の出どころや使ってよい範囲には、PR の説明でも ukadoc-spec の README・LICENSE でも一切触れない（このサイトにもともとあった絵のため。開発者の指示、2026-10-25）。この spec の PR だけを入れるとサイトが壊れると分かったときは、PR を出さずに溜め、開発者に報告する
7. If 作業の途中に、ukadoc-spec の `origin/main` が同じ `assets/extra.css`・`scripts/prepare_site.py` を変えて進み、変更とぶつかったとき, the site-look-note-icon shall `origin/main` に追いつき、この spec の指定と、ほかの spec が入れた指定の両方が残るようにする
8. The site-look-note-icon shall 旧サイトの見た目の指定・画像・スクリプトや試作の指定を写さず、本番の書き方で書き直す（試作の指定は `html[data-slp~="Cxx"]` の下の使い捨ての書き方である）

## 要件のディスカッションの決定（2026-10-25）
1. **補足の項目の見分け方と増えたとき**（Requirement 2.1・2.4）: 原稿のファイル名 `note-<数>.md` で見分け、名指しの一覧を持たない。新しい `notes_*.md`・`note-<数>.md` にも自動で絵が付く（推奨案）
2. **注の題の範囲**（Requirement 3.5）: 題の字に依らず、種類が `note` のすべての注意書き（`??? note` も含む）（推奨案）
3. **見出しの行の高さ**（Requirement 4.6）: 「行間を変えない」は本文に当て、注釈の見出しの行が絵の分だけ高くなるのは目標の画面の範囲で認める（推奨案）
4. **暗い表示の物差し**（Requirement 4.2）: 数での対比の線は置かず、目標の画面との見比べで確かめる（推奨案）
5. **印刷**（Requirement 4.7）: 絵は印刷に出なくてもよい（背景の絵として扱う）（推奨案）
6. **絵の出どころ**（Requirement 8.6）: 絵はこのサイトにもともとあったもので、こちらが感知する必要はない。出どころ・使ってよい範囲には PR の説明でも README・LICENSE でも一切触れない（開発者の指示）
- 絵の置き場とファイル名（Requirement 5.1）は設計で決める
