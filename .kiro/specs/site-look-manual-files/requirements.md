# Requirements Document

## Project Description (Input)
- **誰が困っているか**: UKADOC の公開サイト（https://ukatech.shillest.net/ukadoc-spec/ ）の `manual/` の頁（例: `manual/ghost`「ゴースト」）で、ゴーストなどの作り方を読むゴースト制作者
- **いまの状況**: ファイルごとの箇条書き「`**ファイル名**: 説明`」は、ファイル名が説明の文の頭に埋もれ、どこからどこまでが 1 つのファイルの説明かが追いにくい（`survey.md` の D12・D11）。開発者は「descript.txt は、SHIORI Event でいう OnBoot などと同じ装飾で。今はのっぺりしてる」と指摘した。ファイル構成の木（言語指定の無いコードブロック）でも、ファイルとフォルダが同じ字で見分けにくい（D13。旧サイトは `em.filename` でファイル名に色を付けていた）
- **何を変えるか**: `site-look-plan` で「採る」と決まった C14（ファイルごとの説明の切れ目）・C15（木のファイル名の色）・C22（ファイル名を項目名と同じ帯に）を、本番の書き方で ukadoc-spec に入れる。木のファイル名の明るい表示の濃さ（`site-look-list-markers` の C17 から移した分）もここで入れる（詳細は `brief.md`）

## Introduction
この spec は、UKADOC の `manual/` の頁で、ファイルごとの説明の切れ目とファイル名をひと目で見分けられるようにし、ファイル構成の木でファイルとフォルダを見分けられるようにする。`site-look-plan` の `decisions.md` で「採る」と決まった C14・C15・C22 を、本番の書き方で ukadoc-spec に入れる。方向は決まっているので、ここでは議論し直さない。

変えるのは、`manual/` の頁を見分ける頁の種類の印（テンプレートの上書きか組み立ての処理 `scripts/prepare_site.py`）、ファイル名の後ろの「`: `」を外す目印、その印に当てるサイトの見た目の指定（`assets/extra.css`）、木の名前を包む小さな自作のスクリプト（`assets/` と `mkdocs.yml` の `extra_javascript`）で、原稿は変えない。ukadoc-spec を変えるので、この spec の作業木 `.worktrees/site-look-manual-files/`（ブランチ `site-look-manual-files`）で、依存先の `site-look-list-items` の PR（#11、マージのコミット `d3154d8`）が入った ukadoc-spec の `origin/main` の上に書き、Build Gate と規約 Gate を通す。PR は原則 1 spec = 1 PR なので（開発者の指示、2026-10-25）、この spec の完了で自分の PR を作ってスクワッシュマージする。

本文の主語は 2 つある。「UKADOC のサイト」は、この spec の変更を入れた後の公開サイト（とそのプレビュー）の見え方を指す。「site-look-manual-files」は、この spec の作業（ukadoc-spec への変更・確かめ・記録）を指す。

言葉の決まり（この文書の中で。数は ukadoc-spec `0eb3fb9` の原稿をサイトと同じ Markdown 拡張で手元で HTML にして数えた見込みで、実装のときに build の HTML で数え直す。`research.md`）:
- **manual の頁**: `manual/` の 8 頁（`balloon`・`directory`・`ghost`・`install`・`owner-draw-menu`・`shell`・`translator`・`update`）。ほかの頁（まとめ頁・`dev/`・`memo/`・`spec/` の 1 ファイルの頁・トップの頁）は manual の頁でない
- **頁の種類の印**: 頁の HTML の中で、その頁が manual の頁だと見分けられる目印
- **ファイルの箇条書き**: manual の頁の本文の一番外の箇条書きの項目のうち、頭が太字の名前のもの。今は 7 頁に 73 個（`balloon` 22・`directory` 12・`ghost` 10・`install` 7・`owner-draw-menu` 3・`shell` 12・`update` 7。`translator` は 0）。原稿の空行のため、どれも 1 項目ずつ別の箇条書きになる。注記の箱（`!!! tip`）の中など、一番外でない箇条書きの項目（今は `shell` の「`※1,※2`」の 1 個）は含めない
  - 名前の後ろが「`: 説明`」のもの 63 個、名前の後ろが「`:`」だけで説明が次の段落・木・入れ子の箇条書きから始まるもの 9 個（`balloon` の `sstp.png` 1、`install` の「標準的なゴーストの場合」などの場合分け 5、`update` の場合分け 3）、名前だけのもの 1 個（`ghost` の `updates2.dau`）
  - 説明が名前と同じ行だけで、段落に分かれないもの 12 個（`balloon` の `balloonk*.pna` など 7、`directory` 3、`ghost` の `updates2.dau` 1、`shell` の `(element).pna` 1）。ほかの 61 個は 1 つ以上の段落を持ち、2 つ以上の段落を持つものが 56 個ある
  - 名前の中のリンク 18 個（例: `ghost` の `descript.txt`・`updates2.dau`・`updates.txt`・`makoto.dll`）。`directory` の名前は `(myghost)\ghost\` のようにパスで、名前の一部だけがリンクのもの（`(myghost)\delete.txt`）がある
- **ファイル名の帯**: ファイルの箇条書きの頭の名前を 1 行に置いて見せる帯（C22）。見た目は `site-look-list-items` の C01 の項目名の帯（まとめ頁の `OnBoot` などの帯）と同じ
- **木**: 言語指定の無いコードブロックのうち、行の頭（空白・全角の空白の後）が `+-` の行を 1 つ以上持つもの。今は 21 個（manual の頁 17 ―`balloon` 1・`directory` 2・`ghost` 1・`install` 6・`owner-draw-menu` 1・`shell` 1・`translator` 2・`update` 3 ― と、`dev/nar` 3・`dev/update` 1）。`install`・`update` の木は箇条書きの項目や注記の箱の中にある
- **木の行**: 木の中の、行の頭が `+-` の行。`+-` の直後の名前が **ファイル名** か **フォルダ名** で、名前の後ろの字（`（旧仕様）`・`(SSPのみ)`・`(必要な時のみ)` など）を **注** と呼ぶ
- **ファイル名・フォルダ名の見分け**: 名前が「`.` と拡張子」で終わればファイル名、そうでなければフォルダ名とする（例: `descript.txt`・`*.ico`・`(saori).dll`・`surfaces**.txt`・`.narignore` はファイル名、`(myghost)`・`ghost`・`master`・`(additional_shell)`・`master(またはadditional_shell)` はフォルダ名）。この見分けで今は、manual の頁の木の行 243（ファイル名 194・フォルダ名 49）、`dev/` の木の行 36（ファイル名 17・フォルダ名 19）。`manual/ghost` は 14 行で、ファイル名 11（`descript.txt`・`shiori.dll`・`(saori).dll`・`makoto.dll`・`updates2.dau`・`updates.txt`・`*.ico`・`*.cur`・`thumbnail.png`・`ai0.png`・`ai0_dark.png`。旧サイトの `em.filename` の 11 個と同じ）、フォルダ名 3（`(myghost)`・`ghost`・`master`）
- **見分けの難しい木の行**: 名前と注の間に空白が無い行 1（`shell` の `alias.txt（旧仕様）`）、2 つのファイル名が「`/`」で続く行 6（`balloon`・`directory` の `ok_down.png/ok_up.png` など）、2 つのファイル名が「または」で並ぶ行 4（`directory` の `readme.txt または readme.md`・`terms.txt または terms.md`）

目標の画面は `.kiro/specs/completed/site-look-plan/screenshots/` の `mock-manual-ghost-C14-*.png`（ファイル名の行・字下げした説明）・`mock-manual-ghost-C15-*.png`（木のファイル名の色）・`mock-manual-ghost-C22-*.png`（ファイル名の帯）の明・暗である。C14 の画面のファイルの間の細い線は、C22 の帯に置き換わる。C15 の画面の色は緑のテーマの時に決めたもので（明るい表示はテーマの色の変数で今は紺、暗い表示は直書きの緑 `#81c784`）、この spec が決め直す。C22 の画面には採ると決まったほかの候補も入っているので、見比べるのはファイル名の帯と説明の字下げの部分だけである。画面に写っているのは `manual/ghost` だけである。

## Boundary Context
- **In scope**:
  - manual の頁の頁の種類の印（Requirement 1）
  - C14・C22 のファイルの箇条書きの見え方と、ファイル名の後ろの「`: `」を見せないこと（Requirement 2・3）
  - C15 の木のファイル名の色と、その明るい表示の濃さ（`site-look-list-markers` の C17 から移した分。Requirement 4・5）
  - 帯と木の色の字とリンクの読みやすさ、明・暗の切り替え、印刷の見え方（Requirement 5）
  - 明・暗の画面と 375 px の確かめ、数と対比の測りの記録（Requirement 7）
- **Out of scope**:
  - `updates2.dau` と `updates.txt` が 1 つの説明を共有している見え方（D12。原稿の書き方による。roadmap のバックログ）
  - `spec/shiori3` のヘッダの値を列にそろえること（C16。保留で roadmap のバックログ。頁の種類の印は共有できる形にしておくだけ）
  - キャラクターを頁に出すこと（C12。保留）
  - manual の頁の外の、頭が太字の箇条書き（`spec/shiori3` のヘッダ、`dev/` の頁など）の見え方。「名前: 説明」を表にすることは `site-look-definition-tables`
  - 言語指定の無いほかのコードブロック（木でないもの。SSTP の要求の例など）の着色。さくらスクリプトの記述例の着色（`site-look-sakura-script-highlight`）
  - 原稿（`.md`）・`.nav.yml`・`requirements.txt`・Zensical の版。木の書き方（名前と注の間の空白など）を原稿で直すこと
  - テーマの色そのもの、本文のリンクの色そのもの、ほかの spec が作る字の色（対応の札・さくらスクリプトのタグ）
- **Adjacent expectations**:
  - 土台は ukadoc-spec の `origin/main`（今は `0eb3fb9`。`site-look-dark-link-color`（#10）・`site-look-list-items`（#11）・`site-look-list-markers`（#12）が入ったもの）
  - ファイル名の帯は、`site-look-list-items` の C01 の項目名の帯の見え方（左の太い線・下の細い線・薄い地・`h3` と同じ字の大きさ）を使う。帯の上のリンクの読みやすさの線（帯の地に 7:1 以上、ポインタ・フォーカスは 3:1 以上）も、その spec の Requirement 6.1・6.2 と同じにする
  - `site-look-sakura-script-highlight` は、コードブロックの HTML を今の形（`div.highlight > pre > code`）から着色の後の形（`pre.highlight > code`）に変え、`mkdocs.yml` に `extra_javascript` を足し、言語の印の付いた記述例だけにスクリプトを当てる。この spec の木の色は、どちらの HTML の形にも効き、どちらが先に入ってもよい。この spec のスクリプトは言語の印の無いブロックだけに当て、記述例のブロックの字と見え方を変えない
  - 「明るい表示の色付きの字は白地に 7:1 以上」の物差しは、`site-look-list-markers` の C17 と同じものを使う。この spec は自分の作る木のファイル名の字にだけ当てる。その spec の札の指定は木のファイル名に色を当てないので、どちらが先に入っても色の勝ち負けは変わらない
  - `site-look-definition-tables` は、この spec の後に、manual の頁のファイルの箇条書き（C14・C22 の当て先）を表にしないことを確かめる。この spec は、ファイルの箇条書きの当て先を頁の種類の印で見分けられる形にしておく
  - 後で C16（`spec/shiori3`）や C12 が頁を絞るときに、この spec の頁の種類の印と同じ形の印を使えることを期待する
  - 目標の画面・試作・測りは `site-look-plan`（`.kiro/specs/completed/site-look-plan/`）のものを読むだけで、書き換えない

## Requirements

### Requirement 1: manual の頁の種類の印
**Objective:** As a doc_edit の開発者と ukadoc-spec のメンテナ, I want manual の頁だけに頁の種類の印が付くこと, so that ファイルの箇条書きの見た目が manual の頁だけに効き、同じ形の箇条書きを持つほかの頁（`spec/shiori3` など）を変えない

#### Acceptance Criteria
1. The UKADOC のサイト shall manual の頁の 8 頁のすべてに、頁の種類の印を 1 つずつ付ける（ファイルの箇条書きの無い `manual/translator` にも付ける）
2. If 頁が manual の頁でないとき, the UKADOC のサイト shall その頁に manual の頁の種類の印を付けない
3. The UKADOC のサイト shall 頁の種類の印を付けても、頁の題・見出しの id・見出しの横のリンクの印（¶）・右の欄の目次・検索で引ける字を変えない
4. The site-look-manual-files shall 頁の種類の印を、manual の外の種類の頁（`spec/shiori3` など）にも同じ形で別の種類の印を付けられる形にする（ほかの種類の印を付けるかどうかは決めない。C16・C12 が後で使いうる）
5. The site-look-manual-files shall 頁の種類の印を、頁が `manual/` の下にあることから付け、サイトの見た目の指定で頁の題や見出しの id（試作の `:has(h1#ゴースト)`）によって頁を見分けない

### Requirement 2: ファイルごとの説明の切れ目（C14）
**Objective:** As a manual の頁でゴーストなどの作り方を読むゴースト制作者, I want ファイル名が 1 行に置かれ、説明が字下げされて下に並ぶこと, so that どこからどこまでが 1 つのファイルの説明かを追える（D12）

#### Acceptance Criteria
1. While manual の頁を見ているとき, the UKADOC のサイト shall 各ファイルの箇条書きの頭の名前を 1 行に置き、説明をその次の行から始める（目標の画面 `mock-manual-ghost-C14-light.png`・`mock-manual-ghost-C14-dark.png` のファイル名の行）
2. The UKADOC のサイト shall ファイルの箇条書きの説明のすべて（段落・入れ子の箇条書き・表・コードブロック・木・注記の箱）を、名前より字下げした同じ左の端にそろえて表示する（目標の画面の字下げした説明）
3. The UKADOC のサイト shall ファイルの箇条書きの頭の点（箇条書きの印）を見せない
4. The UKADOC のサイト shall ファイルの箇条書きの名前の後ろの「`: `」（「`:`」だけのものを含む。今は 72 個）を見せず、名前の字と説明の字はほかに変えない
5. When ファイルの箇条書きの説明が名前と同じ行だけで、段落に分かれないとき（今は 12 個。例: `balloon` の `balloonk*.pna`）, the UKADOC のサイト shall 説明を名前の次の行から、ほかの項目と同じ字下げで表示する
6. Where 頁が manual の頁でないとき, the UKADOC のサイト shall 頭が太字の箇条書きを今のままの見え方で表示する（`spec/shiori3` のヘッダ、`dev/` の頁など）
7. If 頭が太字の箇条書きの項目が manual の頁の一番外の箇条書きでないとき（注記の箱の中の `shell` の「`※1,※2`」など）, the UKADOC のサイト shall その項目を今のままの見え方で表示する
8. The UKADOC のサイト shall ファイルの間を、C14 の試作の細い線でなく、次のファイル名の帯（Requirement 3）で分ける
9. The UKADOC のサイト shall ファイルの名前でない場合分けの名前（`install` の「標準的なゴーストの場合」など 5 個、`update` の「ゴーストの場合」など 3 個）も、ファイルの箇条書きとして同じに見せる（［仮定 A1］brief の当て先は「ファイルごとの箇条書き」で、場合分けの項目を含めるかは書かれていない。manual の頁の一番外の頭が太字の箇条書きは 73 個すべてこの形なので、同じに扱うと仮定した。要件の話し合いで決める）

### Requirement 3: ファイル名の帯（C22）
**Objective:** As a manual の頁でゴーストなどの作り方を読むゴースト制作者, I want `descript.txt` などのファイル名が、SHIORI Event の `OnBoot` などの項目名と同じ帯で見えること, so that ファイルごとの切れ目が遠くからでも分かり、サイトの中で項目の頭の見え方がそろう（開発者の指摘）

#### Acceptance Criteria
1. While manual の頁を見ているとき, the UKADOC のサイト shall 各ファイルの箇条書きの頭の名前を、`site-look-list-items` の C01 の項目名の帯と同じ見え方（左の太い線・下の細い線・薄い地・`h3` と同じ字の大きさ）の帯で表示する（目標の画面 `mock-manual-ghost-C22-light.png`・`mock-manual-ghost-C22-dark.png` のファイル名の帯）
2. The UKADOC のサイト shall 名前だけのファイルの箇条書き（今は `ghost` の `updates2.dau`）の帯を、ほかの帯と同じ左の端と幅にそろえる（試作では 6 px 右にずれた）
3. The UKADOC のサイト shall ファイル名の帯を、ファイルの箇条書きの段落の数・説明の有る無しに依らず、73 個のすべてに同じに付ける
4. The UKADOC のサイト shall 帯の中の名前の字を今と同じ字で見せる（`directory` の `(myghost)\ghost\` の `\`、`balloon` の `balloons*.png` の `*` を含む）
5. While 明・暗のどちらかの表示で帯の中のリンク（今は 18 個）を見ているとき, the UKADOC のサイト shall リンクの字を帯の地に対して 7:1 以上の対比で、ポインタを載せたとき・キーボードでフォーカスしたときの字を 3:1 以上で表示する（`site-look-list-items` の Requirement 6.1・6.2 と同じ線）
6. The UKADOC のサイト shall 帯の中のリンクを、色のほかに下線でもリンクだと分かるように表示し、その字の色を C01 の項目名の帯の中のリンクと同じ扱い（明るい表示は本文のリンクの紺で帯の地に約 7.1:1、暗い表示は白で約 11.7:1）にする（［仮定 A2］brief は「帯の中のリンクは項目名と同じ字の色にする」とし、試作は明・暗とも `--md-default-fg-color` にした。暗い表示ではその色が帯の地に約 6.7:1 で 3.5 の 7:1 に届かず、試作では帯の中のリンクと名前の字が見分けられない。C01 の帯の中のリンクの扱いにそろえると仮定した。要件の話し合いで決める）
7. The UKADOC のサイト shall ファイル名の帯を見出しにせず、右の欄の目次・見出しの id・見出しの横のリンクの印（¶）を増やさない

### Requirement 4: 木のファイル名の色（C15）
**Objective:** As a manual の頁でファイル構成を読むゴースト制作者, I want ファイル構成の木で、ファイル名がフォルダ名と違う色で見えること, so that どれがファイルでどれがフォルダかをひと目で見分けられる（D13。旧サイトの `em.filename` の代わり）

#### Acceptance Criteria
1. While 木のある頁を見ているとき, the UKADOC のサイト shall 木の行のファイル名を、フォルダ名・`+-`・注と違う色で表示する（目標の画面 `mock-manual-ghost-C15-light.png`・`mock-manual-ghost-C15-dark.png` の木のファイル名の色。`manual/ghost` ではファイル名 11 個に色が付き、フォルダ名 3 個は今の色のまま）
2. The UKADOC のサイト shall フォルダ名・`+-`・注・`+-` で始まらない行（「`:`」の行など）を、今の字の色のまま表示する
3. The UKADOC のサイト shall 木の字・字の太さ・字の並び・折り返しを今のまま保ち、色だけを変える
4. If 名前と注の間に空白が無いとき（今は `shell` の `alias.txt（旧仕様）`）, the UKADOC のサイト shall ファイル名の字（`alias.txt`）だけに色を付け、注（`（旧仕様）`）は今の色のまま表示する
5. When 1 つの木の行に 2 つのファイル名が「`/`」か「または」で並ぶとき（今は 10 行。例: `ok_down.png/ok_up.png`、`readme.txt または readme.md`）, the UKADOC のサイト shall 2 つのファイル名のどちらにも色を付け、「または」と注は今の色のまま表示する（［仮定 A3］試作は「`+-`」の直後の空白までを 1 つの名前とみなしたので、`readme.md` に色が付かなかった。どちらもファイルなので、どちらにも付けると仮定した。要件の話し合いで決める）
6. If 頁の中で木を見分けて色を付ける仕掛けが動かないとき（スクリプトを読めない・止めているなど）, the UKADOC のサイト shall 木を今のままの字と見え方で表示する
7. If コードブロックが木でないとき（`+-` の行を持たない言語指定の無いブロック、言語の名前のあるブロック）, the UKADOC のサイト shall その字と見え方を変えない
8. The UKADOC のサイト shall 木の色を、コードブロックの HTML が今の形（`div.highlight > pre > code`）のときも、`site-look-sakura-script-highlight` の後の形（`pre.highlight > code`）のときも、同じに付ける
9. The UKADOC のサイト shall manual の頁の外の木（今は `dev/nar` の 3 個と `dev/update` の 1 個）のファイル名にも、manual の頁と同じに色を付ける（［仮定 A4］brief の C15 の当て先は「言語の印の無いコードブロックのうち `+-` で始まる行のあるもの」で、頁を manual の頁に絞るとは書かれていない。brief の「Out of Boundary」も、外すのは「ファイル構成の木の外」の着色である。木を中身で見分けるので、頁を問わず同じに付けると仮定した。要件の話し合いで決める）

### Requirement 5: 色の濃さ、明・暗の切り替えと印刷
**Objective:** As a 明・暗のどちらでも UKADOC を読むゴースト制作者, I want 木のファイル名と帯の字がどちらの表示でもくっきり読め、切り替えや印刷でも崩れないこと, so that 見た目の直しのせいで読めない所が増えない（D16 ダークモード。C17 の「明るすぎる」への答え）

#### Acceptance Criteria
1. While 明るい表示で見ているとき, the UKADOC のサイト shall 木のファイル名の字を、白地とコードブロックの地の両方に対して 7:1 以上の対比で表示する（C17 と同じ物差し。試作の測りの元は `mock-sakura-script-C17-light.png`）
2. While 暗い表示で見ているとき, the UKADOC のサイト shall 木のファイル名の字を、暗い地とコードブロックの地の両方に対して 4.5:1 以上の対比で、紺のテーマに合う色で表示する（［仮定 A5］brief は暗い表示の色を「紺のテーマに合わせて決め直す」とだけし、数の線を書いていない。`site-look-list-markers` が暗い表示の札に 4.5:1 を当て、7:1 の物差しは明るい表示の「明るすぎる」への答えとしたのにそろえると仮定した。要件の話し合いで決める）
3. The site-look-manual-files shall 木のファイル名の色を、なるべくテーマの色の変数から取り、変数で出せない色は、その色と明・暗それぞれの地との対比を記録する
4. The UKADOC のサイト shall ファイル名の帯の中の名前の字を、明・暗の表示とも帯の地に対して 4.5:1 以上の対比で表示する（C01 の項目名の帯と同じ字の色）
5. When 利用者が明るい表示と暗い表示を切り替えたとき, the UKADOC のサイト shall 頁を読み込み直さなくても、帯と木のファイル名をそのときの表示の色に変える
6. If 暗い表示を選んだまま頁を印刷したとき, the UKADOC のサイト shall 帯と木のファイル名を、明るい表示で印刷したときと同じ色で印刷する（暗い表示だけの色を白い紙に出さない。`site-look-list-items` の Requirement 6.6 と同じ考え）
7. The site-look-manual-files shall リンクの色・テーマの色・ヘッダの地の色・ほかの spec が作る字の色（対応の札・さくらスクリプトのタグ）を、この spec のために変えない

### Requirement 6: 今のサイトの良いところを失わない
**Objective:** As a UKADOC を読むゴースト制作者, I want 検索・見出しへのリンク・狭い画面・コードのコピー・記述例の字が今のまま使えること, so that 見た目の直しのせいでほかの使い勝手が落ちない（`survey.md` の「失わないもの」。D16 は Requirement 5 が受け持つ）

#### Acceptance Criteria
1. The UKADOC のサイト shall ファイルの箇条書きの名前と説明、木の字を、今と同じ字で検索で引けるようにする（外すのは名前の後ろの「`: `」だけ。D15）
2. When 検索の結果から木やファイルの箇条書きのある頁を開いたとき, the UKADOC のサイト shall 語の強調を、帯の中と木の中でも明・暗の表示とも見せる（D15）
3. The UKADOC のサイト shall manual の頁の見出しの id・見出しの横のリンクの印（¶）・右の欄の目次を今のまま保つ（D17）
4. When 幅 375 の狭い画面で manual の頁を見たとき, the UKADOC のサイト shall 頁の横幅を画面の幅に収める（`scrollWidth` と `innerWidth` が同じ 375。長い名前の帯 ― `balloon` の `clickwait.png / clickwaits*.png / clickwaitk*.png / clickwaitp*def.png`、`directory` の `(myghost)\shell\(additional_shell)\` など ― を含む。D18）
5. The UKADOC のサイト shall 木のコードブロックのコピーのボタンを残し、ボタンでコピーされる字を今と変えない（色を付けた後も、木の字は元の字と 1 字も違わない。D19）
6. The UKADOC のサイト shall 帯の中の名前と説明の `\` を、今と同じ字で見せる（`directory` の `(myghost)\ghost\` など。D20）
7. The site-look-manual-files shall サイトに置く生の Markdown 原稿（`_raw/`）と `llms.txt` を今のまま保ち、組み立ての処理の一覧の検査・見出しの数の検査・リンクの書き換えを今のまま通す

### Requirement 7: 表示の確かめと記録
**Objective:** As a doc_edit の開発者, I want 変更が配られた頁に効いていることと、目標の画面との見比べ・数・対比が残っていること, so that 見落としなく PR に出せ、後続の spec が頁の種類の印や帯を使うときに測りを引ける

#### Acceptance Criteria
1. When 変更を確かめるとき, the site-look-manual-files shall ローカルのプレビュー（頁の道は `/ukadoc-spec/` から始まる）で配られた見た目の指定のファイルと、足したスクリプトのファイルを開き、どちらも読めて（200）この spec の中身が入っていることを確かめる（サイトを作る処理の厳しい検査は、指定したファイルが無くても気づかないため）
2. The site-look-manual-files shall プレビューの頁の HTML を取ってきて、頁の種類の印が manual の頁の 8 頁にだけ 1 つずつあること、「`: `」を外す目印の数（今は 72。頁ごとの数を含む）、本文に漏れた目印の書きかけの字（`{: ` など）が 0 であること、足したスクリプトの読み込みが全頁に 1 つずつあることを数えて記録する
3. The site-look-manual-files shall ブラウザで頁を開いた後の木を数え、木ごとのファイル名とフォルダ名の数（今の見込みは「言葉の決まり」の数）と、色を付けた後の木の字が元の字と同じことを記録する
4. The site-look-manual-files shall 変更の前と後で、manual の頁の見出しの id の並び・`a.headerlink`（¶）の数・右の欄の目次の項目の数が同じことを確かめて記録する
5. The site-look-manual-files shall 変更の後の画面を、目標の画面と同じ頁・同じ位置・同じ大きさで明・暗の両方で撮り、この spec の 3 つの候補の部分を見比べた結果を記録する（C14・C15 は `manual/ghost` の `h1#ゴースト` で幅 1000・高さ 700、C22 は `.md-typeset > ul` で幅 1000・高さ 900）
6. The site-look-manual-files shall 目標の画面に写っていないもの ― 説明が段落に分かれない項目（`balloon`）、場合分けの項目と箇条書きの中の木（`install`）、パスの名前と名前の一部だけのリンク（`directory`）、見分けの難しい木の行（`shell` の `alias.txt（旧仕様）`、`directory` の「または」と「`/`」）― を明・暗で撮って確かめ、記録する
7. The site-look-manual-files shall 帯の字とリンク、木のファイル名と地の対比（Requirement 3.5・5.1・5.2・5.4）を明・暗で測って記録する
8. When 幅 375 の狭い画面を確かめるとき, the site-look-manual-files shall manual の頁の 8 頁（［仮定 A4］のとおりなら `dev/nar`・`dev/update` も）の `scrollWidth` と `innerWidth` を測って記録する（狭い画面の画面は残さない）
9. If 撮った画面に、撮る途中の描き直しで二重に重なった跡（上の端以外の左右の端に、ヘッダの色の行が出ている）があるとき, the site-look-manual-files shall その画面を撮り直す
10. When 開発者に画面を見せるとき, the site-look-manual-files shall 古い写しが残らないよう、ブラウザでの強制の再読み込み（Ctrl+F5）を頼む

### Requirement 8: 変更の範囲と PR
**Objective:** As a ukadoc-spec のメンテナ, I want 小さく、頁の種類の印・目印・見た目の指定・小さなスクリプトに限った変更を受け取ること, so that 他者も使う公開リポジトリでもレビューしやすい

#### Acceptance Criteria
1. The site-look-manual-files shall ukadoc-spec の中で `assets/`（`extra.css` と足すスクリプト）・`scripts/prepare_site.py`・`mkdocs.yml`・`overrides/`（テンプレートの上書きにするとき）だけを変え、原稿（`.md`）・`.nav.yml`・`requirements.txt`・Zensical の版を変えない
2. The site-look-manual-files shall `assets/extra.css` のこの spec の指定を、ファイルの末尾に塊として足し、塊ごとの注を `/* site-look-manual-files: <何の指定か> */` の短い 1 行にとどめる（説明・測りの数・わけは spec の記録に書く）
3. The site-look-manual-files shall 変更を、この spec の作業木 `.worktrees/site-look-manual-files/`（ブランチ `site-look-manual-files`）で、`site-look-list-items` の PR（#11）がマージされた後の ukadoc-spec の `origin/main` の上に書く
4. The site-look-manual-files shall この spec の完了の前に、Build Gate（`prepare_site.py` と `zensical build --strict` が、どちらも失敗なく終わる）と規約 Gate を通す
5. The site-look-manual-files shall この spec の完了で、この spec だけの PR を作ってスクワッシュマージする（原則 1 spec = 1 PR。PR の説明は brief の「続きの PR の説明」に従い、一連の PR の並びは PR を出すときの roadmap による）。この spec の PR だけを入れるとサイトが壊れると分かったときは、PR を出さずに溜め、開発者に報告する
6. If 作業の途中に、ukadoc-spec の `origin/main` が同じ `assets/extra.css`・`scripts/prepare_site.py`・`mkdocs.yml` を変えて進み、変更とぶつかったとき, the site-look-manual-files shall `origin/main` に追いつき、この spec の指定と、ほかの spec が入れた指定の両方が残るようにする（`site-look-sakura-script-highlight` も `mkdocs.yml` に `extra_javascript` を足す）
7. The site-look-manual-files shall 旧サイトの見た目の指定・画像・スクリプト（`list.css`・`base.css`・`sakura_player.js` など）や試作の指定を写さず、本番の書き方で書き直す（試作の指定は `html[data-slp~="Cxx"]` の下の使い捨ての書き方である）

## 仮定と未決の事項（要件の話し合いで決める）
brief で決まらず、上の要件に仮定を置いたもの。どれも、決まったら該当の要件を直す。
- **［仮定 A1］場合分けの項目**（Requirement 2.9）: `install`・`update` の「標準的なゴーストの場合」などの 8 個は、ファイルの名前でなく場合分けの名前で、説明は木（コードブロック）である。ファイルの箇条書きと同じ帯と字下げにするか、今のままにするか
- **［仮定 A2］帯の中のリンクの色**（Requirement 3.5・3.6）: brief と試作は「項目名と同じ字の色（`--md-default-fg-color`）」で、暗い表示では帯の地に約 6.7:1（C01 の帯のリンクの線 7:1 に届かない）、下線も無く名前の字とリンクが見分けられない。C01 の帯の中のリンクの扱い（明は紺・暗は白、下線）にそろえるか、brief のとおりにして線を 4.5:1 にするか
- **［仮定 A3］1 行に 2 つのファイル名**（Requirement 4.5）: `ok_down.png/ok_up.png`・`readme.txt または readme.md` などの 10 行で、2 つ目の名前にも色を付けるか（試作は 1 つ目まで、または「`/`」を含めて 1 つの名前とした）
- **［仮定 A4］manual の頁の外の木**（Requirement 4.9）: `dev/nar`・`dev/update` の 4 つの木にも色を付けるか、manual の頁に絞るか
- **［仮定 A5］暗い表示の木のファイル名の対比の線**（Requirement 5.2）: 4.5:1 にするか、明るい表示と同じ 7:1 にするか
