# Requirements Document

## Project Description (Input)
- **誰が困っているか**: UKADOC の公開サイト（https://ukatech.shillest.net/ukadoc-spec/ ）のまとめ頁（`list/`・`descript/`・`spec/` の 1 頁にまとめた頁）で仕様を引くゴースト制作者
- **いまの状況**: 項目名は `code` の灰色の小さな地だけで本文と見分けにくく、項目の間が空きすぎて高さ 700 の画面に 3 項目しか入らない（`survey.md` の D01・D08）。分類の見出しは本文の見出しと同じ見え方で、分類の始まりが遠くから分からない（D06）。記述例は灰色の地のコードブロックが置かれるだけで説明の文と分かれて見えず、折り返した長い行がコピーのボタンの下に重なる（D03・D19。開発者の指摘「記述例のさくらスクリプト部が、分かりにくい」）
- **何を変えるか**: `site-look-plan` で「採る」と決まった C01（項目名の帯）・C02（項目の間の詰め）・C03（分類の見出しの帯）・C09（コピーのボタンの手前で折り返す）・C18（記述例の強い箱）を、本番の書き方で ukadoc-spec に入れる（詳細は `brief.md`）

## Introduction
この spec は、UKADOC のまとめ頁で、項目の切れ目・分類の始まり・記述例をひと目で見分けられるようにする。`site-look-plan` の `decisions.md` で「採る」と決まった C01・C02・C03・C09・C18 を、本番の書き方で ukadoc-spec に入れる。方向は決まっているので、ここでは議論し直さない。

変えるのはサイトの見た目の指定（`assets/extra.css`）と、効く所をまとめ頁の項目・分類に絞る目印が要るときだけ組み立ての処理（`scripts/prepare_site.py`）で、原稿は変えない。ukadoc-spec を変えるので、PR の単位 `site-look-visibility` の作業木 `.worktrees/site-look-visibility/` で書き、Build Gate と規約 Gate を通す。PR は単位の最後の spec（`site-look-note-icon`）の完了のときに 1 回だけ作り、この spec の完了では作らない。

本文の主語は 2 つある。「UKADOC のサイト」は、この spec の変更を入れた後の公開サイト（とそのプレビュー）の見え方を指す。「site-look-list-items」は、この spec の作業（ukadoc-spec への変更・確かめ・記録）を指す。

言葉の決まり（この文書の中で）:
- **まとめ頁**: `descript/<名前>/`・`list/<名前>/`・`spec/<名前>/` のディレクトリを 1 頁にまとめた頁（今は 20 頁。`spec/` の 6 頁を含む）。`manual/`・`dev/`・`memo/` の頁、`spec/` の 1 ファイルの頁（`spec/dll`・`spec/headline`・`spec/plugin`）、トップの頁はまとめ頁でない（以下「読み物の頁」）
- **項目**: まとめ頁の中で、`## 一覧` に並ぶ 1 つの `.md`（頭の説明の `introduction_*` を含む）。**項目名**はその頭の見出し
- **分類**: まとめ頁の中で、`## 一覧` に並ぶサブディレクトリ。**分類の見出し**はその `index.md` の頭の見出し
- **注意書きの節**: 原稿の `notes_*.md` の単位。見出しの id が `notes_` で始まる
- **記述例の見出し**: まとめ頁・読み物の頁を問わず、本文の 4 段目の見出し（`h4`）のうち、直後にコードブロックが続くもの（brief の C18 の当て先。題が「記述例」でないもの ― `descript/` の頭の説明・`spec/dll` の関数の宣言・`spec/sstp` の要求と応答の例 ― も含める）

目標の画面は `.kiro/specs/completed/site-look-plan/screenshots/` の `mock-sakura-script-C01-*.png`・`mock-descript-ghost-C02-*.png`・`mock-sakura-script-C03-*.png`・`mock-sakura-script-C09-*.png`・`mock-sakura-script-C18-*.png`（さくらスクリプトの頁の外の記述例は `mock-propertysystem-C25-*.png`）の明・暗である。これらの画面には採ると決まったほかの候補（タグの色 C10・C20、対応の札 C06 など）も入っているので、見比べるのはこの spec の 5 つの候補の部分だけである。

## Boundary Context
- **In scope**:
  - C01・C02・C03・C09・C18 の見え方（下の Requirement 1〜5）
  - 効く所をまとめ頁の項目・分類に絞る目印（要るときだけ）
  - 新しい地（項目名の帯・分類の帯・記述例の箱）の上の字とリンクの読みやすさ、明・暗の切り替え、印刷の見え方（Requirement 6）
  - 明・暗の画面と 375 px の確かめ、対比の測りの記録
- **Out of scope**:
  - 注意書きの箱・対応の札・既定値の札（`site-look-list-markers`）
  - さくらスクリプトのタグの色・太字・地（`site-look-sakura-script-highlight`）
  - `manual/` の頁のファイル名の帯（`site-look-manual-files`。この spec の項目名の帯の見え方を使う）
  - C08（控えめな記述例の箱。C18 と両立しない組の採らなかった方）
  - 原稿（`.md`）・`.nav.yml`・`requirements.txt`・Zensical の版、`mkdocs.yml`（`markdown_extensions` の `pymdownx.highlight` は `site-look-sakura-script-highlight` が足す）
  - テーマの色そのものと、暗い表示のリンクの色そのもの（`site-look-dark-link-color`）
- **Adjacent expectations**:
  - 土台は ukadoc-spec の `origin/main`（いまは `afb2152`）。`site-look-dark-link-color` の PR #10（暗い表示のリンクを `#8fb4e8` にする）はマージ待ちで、マージされる前提で進めてよい（開発者、2026-10-25）。暗い表示の帯の上のリンクは PR #10 の色で判定する。作業木は `origin/main` から作って PR #10 のコミットを入れず、どちらが先にマージされてもぶつからないようにする
  - `site-look-sakura-script-highlight` は、コードブロックの HTML を今の形（`div.highlight > pre > code`）から着色の後の形（`pre.highlight > code`）に変える。C09・C18 は、どちらの形にも同じく効くようにし、どちらが先に入ってもよい。記述例の箱の地の上のタグの色の対比は、その spec が測る
  - `site-look-list-markers` は、この spec の項目名の帯と分類の帯が注意書きの節の見出しを除くことに依る（C04 の箱）。同じまとめ頁に目印を付けるので、注意書きの節を見分ける書き方と目印の付け方をそろえられる形にする
  - `site-look-manual-files` は、この spec の項目名の帯と同じ見え方を `manual/` のファイル名に使う（C22）
  - 目標の画面・試作・測りは `site-look-plan`（`.kiro/specs/completed/site-look-plan/`）のものを読むだけで、書き換えない

## Requirements

### Requirement 1: 項目名の帯（C01）
**Objective:** As a まとめ頁で仕様を引くゴースト制作者, I want 項目名が帯で囲まれて、項目の始まりがひと目で分かること, so that 長い頁を流し読みしても、引きたい項目を見落とさない（`survey.md` の D01・D08）

#### Acceptance Criteria
1. While まとめ頁を見ているとき, the UKADOC のサイト shall 各項目の項目名を、左のテーマの色の太い線・下の細い線・薄い地の帯で表示する（目標の画面 `mock-sakura-script-C01-light.png`・`mock-sakura-script-C01-dark.png` の項目名の帯）
2. While まとめ頁を見ているとき, the UKADOC のサイト shall 帯の中の項目名の、コードの字で書いた部分の灰色の地を消し、字を帯の地の上に直接表示する
3. The UKADOC のサイト shall 項目名の帯を、見出しの段（`h2`・`h3`・`h4`）や前の区切りの線の有無に依らず、すべての項目に付ける。分類の最初の項目（前に区切りの線が無い。`list/sakura-script` で 13 個）、`spec/` のまとめ頁の項目（段が `h2`）、深い分類の中の項目（`descript/shell-surfaces`・`list/propertysystem` で段が `h4`）にも付ける（項目名と分類の見出しは、見出しの段でなく、まとめ頁の組み立ての役で決める。頭の説明 `introduction_*` も項目である）
4. If 見出しが注意書きの節の見出しであるとき, the UKADOC のサイト shall その見出しに項目名の帯を付けない
5. If 見出しが分類の見出し、または項目の中の節の見出し（例: `spec/sstp` の「requestサンプル」、記述例の見出し）であるとき, the UKADOC のサイト shall その見出しに項目名の帯を付けない
6. Where 頁が読み物の頁であるとき, the UKADOC のサイト shall 見出しを今のままの見え方で表示する
7. The UKADOC のサイト shall 帯の中の項目名の字を、明・暗の表示とも帯の地に対して 4.5:1 以上の対比で表示する

### Requirement 2: 項目の間の詰め（C02）
**Objective:** As a まとめ頁で仕様を引くゴースト制作者, I want 1 つの画面に今より多くの項目が入ること, so that スクロールを減らして、近くの項目を見比べられる（D08）

#### Acceptance Criteria
1. While まとめ頁を見ているとき, the UKADOC のサイト shall 項目の間の区切りの線の上下、項目名の上下、項目の中の段落の上下の余白を、今より詰めて表示する
2. When `descript/ghost` を項目 `charset` の位置から幅 1000・高さ 700 の画面で見たとき, the UKADOC のサイト shall 画面に 4 項目以上（`charset`・`name`・`type`・`craftman`）を入れる（目標の画面 `mock-descript-ghost-C02-light.png`・`mock-descript-ghost-C02-dark.png`。今は 3 項目）
3. While まとめ頁を見ているとき, the UKADOC のサイト shall 項目の切れ目を、区切りの線と項目名の帯（Requirement 1）を重ねて見せ続け、区切りの線を消さない
4. Where 頁が読み物の頁であるとき, the UKADOC のサイト shall 段落・区切りの線・見出しの余白を今のまま表示する（`manual/` などは詰めない）

### Requirement 3: 分類の見出しの帯（C03）
**Objective:** As a まとめ頁で仕様を引くゴースト制作者, I want 分類の見出しが濃い帯で、遠くからでも分類の始まりが分かること, so that 長い頁のどの分類にいるかを見失わない（D06）

#### Acceptance Criteria
1. While まとめ頁を見ているとき, the UKADOC のサイト shall 各分類の見出しを、テーマの色の濃い地に白い太い字の帯で表示する（目標の画面 `mock-sakura-script-C03-light.png`・`mock-sakura-script-C03-dark.png` の画面の下の「スコープコマンド」の帯）
2. The UKADOC のサイト shall 分類の帯の白い字を、明・暗の表示とも帯の地に対して 7:1 以上の対比で表示する（試作の測りでは明・暗とも 8.31:1）
3. If 見出しが注意書きの節の見出しであるとき, the UKADOC のサイト shall その見出しに分類の帯を付けない（`list/sakura-script` の頁の頭の 2 つ）
4. If 見出しが項目名であるとき（`spec/` のまとめ頁の、段が `h2` の項目名を含む）, the UKADOC のサイト shall その見出しに分類の帯を付けない
5. The UKADOC のサイト shall 分類の中の分類（`descript/shell-surfaces` で 3 個・`list/propertysystem` で 2 個の、段が `h3` の分類の見出し）にも同じ分類の帯を付ける
6. The UKADOC のサイト shall 分類の帯の中のコードの字を帯の地に対して 4.5:1 以上で、見出しの横のリンクの印（¶）をふだんもホバー・フォーカスのときも 3:1 以上で表示する（テーマのホバーの藍 `#526cfe` は紺の地に約 1.95:1 しかない）
7. Where 頁が読み物の頁であるとき, the UKADOC のサイト shall 段が `h2` の見出しを今のままの見え方で表示する（`manual/` などの節を帯にしない）

### Requirement 4: コピーのボタンの下に字を重ねない（C09）
**Objective:** As a 記述例を写して使うゴースト制作者, I want コードブロックの字がコピーのボタンの下に隠れないこと, so that 長い行の終わりまで読め、ボタンも押せる（D03・D19）

#### Acceptance Criteria
1. The UKADOC のサイト shall サイトのすべてのコードブロックで、行をコピーのボタンの手前で折り返し、ボタンの下に字を重ねない（目標の画面 `mock-sakura-script-C09-light.png`・`mock-sakura-script-C09-dark.png` の記述例の右端の折り返し。今は「アニメーシ」の字がボタンの下に重なる）
2. When 幅 375 の狭い画面でコードブロックを見たとき, the UKADOC のサイト shall ボタンの下に字を重ねず、頁の横幅を画面の幅に収める
3. The UKADOC のサイト shall コードブロックの HTML が今の形でも着色の後の形（`site-look-sakura-script-highlight` の後）でも、同じく折り返す
4. The UKADOC のサイト shall コピーのボタンを残し、ボタンでコピーされる字を今と変えない

### Requirement 5: 記述例の箱（C18）
**Objective:** As a 記述例を探すゴースト制作者, I want 記述例が濃い帯の見出しと色の付いた箱で、項目の説明の文とひと目で分かれること, so that 記述例を探さずに見つけて読める（D03。開発者の指摘「記述例のさくらスクリプト部が、分かりにくい」）

#### Acceptance Criteria
1. The UKADOC のサイト shall 記述例の見出しを、テーマの濃い紺の帯に白い字で表示し、白い字を帯の地に対して 7:1 以上の対比にする（試作の測りでは明 11.39:1・暗 8.31:1。目標の画面 `mock-sakura-script-C18-light.png`・`mock-sakura-script-C18-dark.png`）
2. The UKADOC のサイト shall 記述例の見出しに続くコードブロックに、左の太い線と薄い紺の地を付け、見出しの帯とつながった 1 つの箱に見せる
3. When 記述例の見出しの直後にコードブロックが 2 つ以上続くとき（今は 28 か所）, the UKADOC のサイト shall 続くコードブロックをすべて同じ箱に入れ、ブロックの間を細い線で区切る
4. If コードブロックが記述例の見出しに続いていないとき（段落の後や `h3` の見出しの後のコードブロックと、それに続くコードブロック。例: `spec/plugin`・`spec/sstp`・`descript/shell-surfaces` の、段落や `h3` の後に 2 つ並ぶコードブロックの 2 つ目）, the UKADOC のサイト shall そのコードブロックを今のままの見え方で表示する
5. The UKADOC のサイト shall さくらスクリプトの頁の外の記述例（`list/propertysystem`・`spec/saori-ex`・`descript/` の各頁の頭の説明の記述例など）にも同じ箱を付ける（開発者の付け足し「さくらスクリプトページ以外にも、さくらスクリプトの記述例があるが、これも同様に強調すること」。目標の画面 `mock-propertysystem-C25-light.png`・`mock-propertysystem-C25-dark.png` の箱の部分）
6. The UKADOC のサイト shall 箱の中のコードの字を、明・暗の表示とも箱の地に対して 4.5:1 以上の対比で表示する
7. The UKADOC のサイト shall コードブロックの HTML が今の形でも着色の後の形でも、同じ箱に見せる
8. The UKADOC のサイト shall 記述例の見出しの帯の中の、見出しの横のリンクの印（¶）を、ふだんもホバー・フォーカスのときも帯の地に対して 3:1 以上で表示する

### Requirement 6: 新しい地の上の字とリンク、明・暗の切り替え、印刷
**Objective:** As a 明・暗のどちらでも UKADOC を読むゴースト制作者, I want 帯や箱の上に来たリンクと字が読めること, so that 見た目の直しのせいで読めない所が増えない（D16 ダークモード。`site-look-dark-link-color` からの申し送り）

#### Acceptance Criteria
1. While 明・暗のどちらかの表示で項目名の帯の上のリンク（`descript/balloon` の 26 個・`list/sakura-script` の 5 個の項目名の中のリンク）を見ているとき, the UKADOC のサイト shall リンクの字を帯の地に対して 7:1 以上の対比で表示する（本文のリンクの線。明るい表示の紺 `#1f4e8c` はギャップ分析の見込みで約 7.1:1。暗い表示のリンクの色は PR #10 の `#8fb4e8` として判定し、PR #10 の無い作業木の紺 `#1f4e8c` での数は参考として記録する）
2. When 明・暗のどちらかの表示で項目名の帯の上のリンクにポインタを載せたとき、またはキーボードでフォーカスしたとき, the UKADOC のサイト shall そのときの字を帯の地に対して 3:1 以上の対比で表示する
3. If 帯・箱の上のリンクまたはそのホバー・フォーカスの字が 6.1・6.2 の線に満たないとき, the site-look-list-items shall その帯・箱の上だけ、線を満たす字の色にする（ギャップ分析の見込みでは、暗い表示の帯の上で、リンクは約 5.5:1、ホバーは約 2.8:1 で満たさない）
4. When 記述例の箱または分類の帯の中にリンクがあるとき, the site-look-list-items shall その数を数えて記録し、記述例の箱の中のリンクはコードの地のリンクの線（4.5:1 以上、ホバー・フォーカスは 3:1 以上）で、分類の帯の中のリンクは 7:1 以上で測る（今はどちらも 0 個）
5. When 利用者が明るい表示と暗い表示を切り替えたとき, the UKADOC のサイト shall 頁を読み込み直さなくても、帯・箱をそのときの表示の色に変える
6. If 暗い表示を選んだまま頁を印刷したとき, the UKADOC のサイト shall 帯・箱を、明るい表示で印刷したときと同じ色で印刷する（暗い表示だけの色を白い紙に出さない。`site-look-dark-link-color` の Requirement 2.4 と同じ考え）

### Requirement 7: 今のサイトの良いところを失わない
**Objective:** As a UKADOC を読むゴースト制作者, I want 検索・見出しへのリンク・狭い画面・コードのコピーなどが今のまま使えること, so that 見た目の直しのせいでほかの使い勝手が落ちない（`survey.md` の「失わないもの」。D16 は Requirement 1・3・5・6、D19 は Requirement 4 が受け持つ）

#### Acceptance Criteria
1. The UKADOC のサイト shall 頭の帯の検索の欄と、検索の結果の語の強調を、帯・箱の中でも明・暗の表示とも見せる（D15）
2. The UKADOC のサイト shall 帯にした見出しの id、見出しの横のリンクの印（¶）、右の欄の目次を今のまま保つ（D17）
3. When 幅 375 の狭い画面でまとめ頁と読み物の頁を見たとき, the UKADOC のサイト shall 頁の横幅を画面の幅に収める（`scrollWidth` と `innerWidth` が同じ 375。D18）
4. The UKADOC のサイト shall 記述例の `\` を `\` のまま見せる（D20）

### Requirement 8: 表示の確かめと記録
**Objective:** As a doc_edit の開発者, I want 変更が配られた頁に効いていることと、目標の画面との見比べ・対比の数が残っていること, so that 見落としなく単位の PR に出せ、後続の spec が同じ帯や箱を使うときに測りを引ける

#### Acceptance Criteria
1. When 変更を確かめるとき, the site-look-list-items shall ローカルのプレビュー（頁の道は `/ukadoc-spec/` から始まる）で配られた見た目の指定のファイルを開き、この spec の指定が入っていることを確かめる（サイトを作る処理の厳しい検査は、指定したファイルが無くても気づかないため）
2. Where 効く所を絞る目印を足したとき, the site-look-list-items shall プレビューの頁の HTML を取ってきて、目印の数が項目・分類の数と合い、本文に目印の書きかけ（`{: ` など）が漏れていないことを確かめて記録する
3. The site-look-list-items shall 変更の後の画面を、目標の画面と同じ頁・同じ位置・同じ大きさ（幅 1000・高さ 700）で明・暗の両方で撮り、この spec の 5 つの候補の部分を見比べた結果を記録する（C01・C09・C18 は `list/sakura-script` の `#bang-lock-repaint`、C03 は同じ頁の `#notes_escape`、C02 は `descript/ghost` の `#charset`、さくらスクリプトの頁の外の記述例は `list/propertysystem` の、目標の画面 `mock-propertysystem-C25-*.png` と同じ位置 `[id="currentghost.seriko.cursor.scope-ID-.mouse-q-q-q-q-list-.path"]`）
4. The site-look-list-items shall 読み物の頁（`manual/ghost` の `h1#ゴースト` の位置）を変更の前と後で撮って見比べ、コードブロックの右の余白（Requirement 4）のほかに違いが無いことを確かめて記録する
5. The site-look-list-items shall 帯・箱の字とリンクと地の対比（Requirement 1.7・3.2・3.6・5.1・5.6・5.8・6.1〜6.4）を明・暗で測って記録する。テーマの色の変数で出せない色（記述例の箱の薄い紺の地、暗い表示の線と地など）は、その色と、明・暗それぞれの対比を記録する
6. If 撮った画面に、撮る途中の描き直しで二重に重なった跡（上の端以外の左右の端に、ヘッダの色の行が出ている）があるとき, the site-look-list-items shall その画面を撮り直す
7. When 開発者に画面を見せるとき, the site-look-list-items shall 古い写しが残らないよう、ブラウザでの強制の再読み込み（Ctrl+F5）を頼む

### Requirement 9: 変更の範囲と PR の単位
**Objective:** As a ukadoc-spec のメンテナ, I want 小さく、見た目の指定（と要るときだけの目印）に限った変更を、単位の PR でまとめて受け取ること, so that 他者も使う公開リポジトリでもレビューしやすい

#### Acceptance Criteria
1. The site-look-list-items shall ukadoc-spec の中で `assets/extra.css` と、効く所を絞る目印が要るときだけ `scripts/prepare_site.py` を変え、原稿（`.md`）・`.nav.yml`・`mkdocs.yml`・`requirements.txt`・Zensical の版を変えない
2. The site-look-list-items shall `assets/extra.css` のこの spec の指定を、ファイルの末尾に塊として足し、塊ごとの注を `/* site-look-list-items: <何の指定か> */` の短い 1 行にとどめる（頭は PR の単位の名前でなく spec 名にし、単位の中の 6 本の塊を見分けられるようにする。説明・測りの数・わけは spec の記録に書く）
3. The site-look-list-items shall 変更を、ukadoc-spec の `origin/main` の最新から作った PR の単位の作業木 `.worktrees/site-look-visibility/`（ブランチ `site-look-visibility`）で書き、`site-look-dark-link-color` の PR #10 のコミットを入れない（暗い表示のリンクの色だけは、PR #10 がマージされる前提で判定する。6.1）
4. Where 目印を足したとき, the site-look-list-items shall 見出しの id・見出しの数の検査・リンクの書き換え・サイトに置く生の Markdown 原稿を今のまま保ち、組み立ての処理の一覧の検査を通す
5. The site-look-list-items shall この spec の完了の前に、Build Gate（`prepare_site.py` と `zensical build --strict` が、どちらも失敗なく終わる）と規約 Gate を通す
6. The site-look-list-items shall この spec の完了では PR を作らない（PR の単位 `site-look-visibility` の最後の spec の完了で、単位の 6 本をまとめて 1 回だけ作る。そのときの PR の説明は brief の「続きの PR の説明」に従い、暗い表示の帯の上のリンクの読みやすさが PR #10 に依ることを名指しする）
7. If 作業の途中に、ukadoc-spec の `origin/main` が同じ `assets/extra.css` を変えて進み（PR #10 のマージなど）、変更とぶつかったとき, the site-look-list-items shall `origin/main` に追いつき、この spec の指定と、ほかの spec が入れた指定の両方が残るようにする
8. The site-look-list-items shall 旧サイトの見た目の指定・画像・スクリプトや試作の指定を写さず、本番の書き方で書き直す（試作の指定は `html[data-slp~="Cxx"]` の下の使い捨ての書き方である）
