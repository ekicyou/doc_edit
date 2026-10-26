# Requirements Document

## Project Description (Input)
- **誰が困っているか**: UKADOC の公開サイト（https://ukatech.shillest.net/ukadoc-spec/ ）のトップページ（原稿 `INDEX.md`）から、読みたい頁を探すゴースト制作者
- **いまの状況**: 見た目の改造（`site-look-list-items`・`site-look-list-markers`・`site-look-manual-files` など）が入った後も、トップページは「のっぺりした感じ」のままである（開発者の指摘、2026-10-25）。節の見出し・目次の分類・「ukadocの見方」の箇条書きが、本文とほとんど同じ字の並びで、どこから何が始まるかが追いにくい。見た目の指定のほとんどは組み立ての処理（`prepare_site.py`）がまとめ頁と `manual/` の頁に付ける目印に掛かり、`INDEX.md` は `index.md` に写すだけなので目印が無い
- **何を変えるか**: トップを、まとめ頁と同じ物差しで「のっぺり」しない見た目にする。節の見出し（`h2`）はまとめ頁の分類の見出し（C03 の紺の帯）と、目次の分類（`h3`）はまとめ頁の項目名（C01 の帯）と、「ukadocの見方」の「`**分類名**: 説明`」の箇条書きは `manual/` のファイルの箇条書き（C14・C22）と同じ見せ方にする。組み立ての処理が `INDEX.md` を写すときにトップの印を付け、既にある帯の指定をその印にも当てる。原稿は変えない（詳細は `brief.md`）

## Introduction
この spec は、UKADOC のトップページで、節・目次の分類・「ukadocの見方」の分類名がひと目で見分けられるようにする。新しい見せ方は作らず、まとめ頁の分類の帯（C03）・項目名の帯（C01）と、`manual/` の頁のファイル名の帯と説明の字下げ（C22・C14）を、トップにも当てる（開発者の指示「基本の方向は、ほかの頁と同じ」、2026-10-25）。`site-look-plan` の候補（C01〜C27）にトップ向けのものは無く、この spec は候補番号を持たない。

変えるのは、組み立ての処理 `scripts/prepare_site.py` が `INDEX.md` を `index.md` に写す所（トップの印）と、サイトの見た目の指定 `assets/extra.css` で、原稿は変えない。ukadoc-spec を変えるので、この spec の作業木 `.worktrees/site-look-top-page/`（ブランチ `site-look-top-page`）で、依存先の `site-look-list-items`（#11）と `site-look-manual-files`（#15、マージのコミット `f54423d`）が入った ukadoc-spec の `origin/main` の上に書き、Build Gate と規約 Gate を通す。原則 1 spec = 1 PR なので（開発者の指示、2026-10-25）、この spec の完了で自分の PR を作ってスクワッシュマージする。

本文の主語は 2 つある。「UKADOC のサイト」は、この spec の変更を入れた後の公開サイト（とそのプレビュー）の見え方を指す。「site-look-top-page」は、この spec の作業（ukadoc-spec への変更・確かめ・記録）を指す。

言葉の決まり（この文書の中で。数は ukadoc-spec `f54423d` の `INDEX.md` と、手元の古い `_site/index.html` の HTML の形から数えた見込みで、実装のときに build の HTML で数え直す。`research.md`）:
- **トップ**: サイトのトップページ（`index.html`。原稿は `INDEX.md`）。ほかの頁（まとめ頁・`manual/`・`dev/`・`memo/`・`spec/` の 1 ファイルの頁）はトップでない
- **節の見出し**: トップの段が `h2` の見出し。今は 5 個（「ukadocについて」・「対象version」・「外部リンク」・「ukadocの見方」・「目次」）
- **目次の分類**: トップの段が `h3` の見出し。今は 7 個で、どれも「目次」の節の中にある（「ファイル構成」・「設定ファイル」・「さくらスクリプト」・「イベント」・「規格」・「HowTo」・「その他」）
- **目次のリンクの並び**: 目次の分類の下の箇条書き。今はリンク 44 個と、リンクの無いまとめの項目 8 個（「Ghost」・「Shell」・「Balloon」・「Plugin」・「Headline」・「Install/Update」・「SHIORI」・「PLUGIN」。その下に入れ子のリンクが並ぶ）
- **見方の箇条書き**: トップの一番外の箇条書きの項目のうち、頭が太字の名前のもの。今は 7 個で、どれも「ukadocの見方」の節の中にある。原稿の空行のため、どれも 1 項目ずつ別の箇条書きになる。6 個は説明の段落を 2 つ持ち、「その他」の 1 個は説明が名前と同じ行だけで段落に分かれない。名前の後ろはどれも「`: 説明`」で、名前の中にリンクは無い
- **分類の帯**: `site-look-list-items` の C03 の見え方（テーマの紺の地に白い太い字。明・暗とも帯の地に 8.31:1）
- **項目名の帯**: `site-look-list-items` の C01 の見え方（左のテーマの色の太い線・下の細い線・薄い地）。`site-look-manual-files` の C22 のファイル名の帯も同じ見え方である
- **説明の字下げ**: `site-look-manual-files` の C14 の見え方（名前を 1 行に置き、説明を名前より字下げした同じ左の端にそろえ、箇条書きの点を見せない）

## Boundary Context
- **In scope**:
  - トップの印（組み立ての処理が `INDEX.md` を写す所。Requirement 1）
  - 節の見出しの分類の帯、目次の分類の項目名の帯、見方の箇条書きの帯と説明の字下げ（Requirement 2・3・4）
  - 帯とリンクの並びの見分けと余白（Requirement 5）
  - 帯の字の読みやすさ、明・暗の切り替えと印刷、検索・見出しへのリンク・375 px（Requirement 6・7）
  - 明・暗の画面と 375 px の確かめ、数と対比の記録（Requirement 8）
- **Out of scope**:
  - 原稿（`INDEX.md`）の書き換え（節の並べ替え・文の直し・見出しの段の直し）
  - 旧サイトの頭の飾り（キャラクターの絵・画像のボタン。C12 と同じく絵が無いので roadmap のバックログのまま）
  - 目次をカードや段組みにするなど、ほかの頁に無い見せ方
  - 頁の題（`h1` の「UKADOC トップページ」）・「対象version」と「外部リンク」のリンクの箇条書き・「ukadocについて」の段落と引用の見え方（**仮定**: 今のまま。OPEN QUESTION 5）
  - まとめ頁・`manual/` の頁・`dev/`・`memo/`・`spec/` の 1 ファイルの頁の見え方（セレクタを広げても、その頁の見え方は今のまま）
  - 頭が太字の箇条書きを表にすること（`site-look-definition-tables` の C23）
  - 暗い表示のまま印刷したときのリンクの色（roadmap のバックログ「暗い表示のまま印刷したリンクの色（記録だけ）」。トップの帯の中にはリンクが無い）
- **Adjacent expectations**:
  - 土台は ukadoc-spec の `origin/main`（今は `f54423d`。`site-look-dark-link-color`（#10）・`site-look-list-items`（#11）・`site-look-list-markers`（#12）・`site-look-sakura-script-highlight`（#13）・`site-look-note-icon`（#14）・`site-look-manual-files`（#15）が入ったもの）
  - 帯と字下げの見え方は、`site-look-list-items` の C01・C03 と `site-look-manual-files` の C14・C22 の指定を使い、同じ宣言を 2 か所に書かない（brief の目的。`site-look-manual-files` が C01 の帯のセレクタを `.manual-item` に広げたのと同じやり方）。完了した 2 つの spec の文書は直さない
  - `site-look-list-items` の Requirement 1.6・3.7（読み物の頁の見出しは今のまま、`h2` を帯にしない）は、トップを除くほかの読み物の頁で今のまま保たれる。トップはこの spec で帯を付ける頁になる
  - `site-look-manual-files` は「頁の種類の印」を足さなかった（その spec の設計の話し合いの議題 1）。トップの見分けも、組み立ての処理の 1 か所（`INDEX.md` を `index.md` に写す所）で行い、見た目の指定の使わない印は足さない
  - `site-look-definition-tables`（C23）は、見方の箇条書きを表にしない。C23 は 1 項目だけの箇条書きと 2 つ以上の段落を持つ項目を初めから除くので、今の原稿では当たらない見込みである。どちらの spec が先に入っても、見方の箇条書きの見え方は Requirement 4 のままであることを、後に入る spec が確かめる
  - 目標の画面は無い（`site-look-plan` の調べはトップを見ていない）。見え方は、同じ見え方の当て先（まとめ頁の分類の帯・項目名の帯、`manual/ghost` のファイル名の帯）と並べて開発者が確かめる

## Requirements

### Requirement 1: トップの印
**Objective:** As a doc_edit の開発者と ukadoc-spec のメンテナ, I want 帯の見た目がトップの決まった所にだけ効くこと, so that ほかの頁の見え方を変えずに、トップだけを直せる

#### Acceptance Criteria
1. The site-look-top-page shall トップかどうかを、組み立ての処理の 1 か所で、原稿が `INDEX.md` であることから見分け、トップの印をトップの中だけに付ける
2. The site-look-top-page shall 節の見出し・目次の分類・見方の箇条書きを、見出しの段と箇条書きの形から見分け、見出しの題や id（`#目次` など）を名指しして見分けない（原稿で節や分類が増えても、同じ形のものには同じ見え方が付く）
3. If 頁がトップでないとき, the UKADOC のサイト shall その頁の HTML と見え方を、この spec の前と同じに保つ
4. The site-look-top-page shall この spec の見た目の指定が使わない、頁の種類だけを示す印を HTML に足さない（`site-look-manual-files` の設計の話し合いの議題 1 と同じ決まり）

### Requirement 2: 節の見出しの分類の帯
**Objective:** As a トップから読みたい頁を探すゴースト制作者, I want 「ukadocについて」・「目次」などの節の見出しが、まとめ頁の分類の見出しと同じ濃い帯で見えること, so that トップのどこから何の節が始まるかが遠くからでも分かる

#### Acceptance Criteria
1. While トップを見ているとき, the UKADOC のサイト shall 各節の見出し（今は 5 個）を、まとめ頁の分類の帯（`list/sakura-script` の「スコープコマンド」など）と同じ見え方で表示する
2. The UKADOC のサイト shall 節の見出しの白い字を、明・暗の表示とも帯の地に対して 7:1 以上の対比で表示する（`site-look-list-items` の Requirement 3.2 と同じ線）
3. The UKADOC のサイト shall 節の見出しの帯の中の、見出しの横のリンクの印（¶）を、ふだんもホバー・フォーカスのときも帯の地に対して 3:1 以上で表示する（`site-look-list-items` の Requirement 3.6 と同じ線。テーマのホバーの藍は紺の地に約 1.95:1 しかない）
4. If トップの見出しが節の見出しでないとき（頁の題の `h1`、目次の分類の `h3`）, the UKADOC のサイト shall その見出しに分類の帯を付けない

### Requirement 3: 目次の分類の項目名の帯
**Objective:** As a トップの目次から頁を探すゴースト制作者, I want 「ファイル構成」・「設定ファイル」などの目次の分類が、まとめ頁の項目名と同じ帯で見えること, so that 目次のどの分類の下にどのリンクが並ぶかを、すぐに追える

#### Acceptance Criteria
1. While トップを見ているとき, the UKADOC のサイト shall 目次の各分類（今は 7 個）を、まとめ頁の項目名の帯（`list/shiori-event` の `OnBoot` など）と同じ見え方で表示する
2. The UKADOC のサイト shall 目次の分類の帯の中の字を、明・暗の表示とも帯の地に対して 4.5:1 以上の対比で表示する（`site-look-list-items` の Requirement 1.7 と同じ線）
3. If トップの見出しが目次の分類でないとき（頁の題の `h1`、節の見出しの `h2`）, the UKADOC のサイト shall その見出しに項目名の帯を付けない
4. Where 目次の分類の下にリンクの無いまとめの項目（「Ghost」・「SHIORI」など 8 個）があるとき, the UKADOC のサイト shall そのまとめの項目を今のままの見え方で表示し、帯にしない（**仮定**: 目次の分類だけを帯にする。OPEN QUESTION 6）

### Requirement 4: 見方の箇条書きの帯と説明の字下げ
**Objective:** As a トップでサイトの読み方を知りたいゴースト制作者, I want 「ukadocの見方」の分類名が、`manual/` の頁のファイル名と同じ帯に置かれ、説明がその下に字下げされて並ぶこと, so that どの分類の説明がどこからどこまでかを追え、下の目次の分類とも見比べられる

#### Acceptance Criteria
1. While トップを見ているとき, the UKADOC のサイト shall 見方の箇条書きの各項目（今は 7 個）の頭の分類名を、`manual/ghost` の `descript.txt` などのファイル名の帯と同じ見え方（項目名の帯で 1 行に置く）で表示する
2. The UKADOC のサイト shall 見方の箇条書きの説明のすべての段落を、分類名より字下げした同じ左の端にそろえ、箇条書きの頭の点を見せない（説明の字下げ）
3. When 見方の箇条書きの説明が名前と同じ行だけで段落に分かれないとき（今は「その他」の 1 個）, the UKADOC のサイト shall 説明を分類名の次の行から、ほかの項目と同じ字下げで表示する
4. The UKADOC のサイト shall 見方の箇条書きの分類名の後ろの「`: `」（今は 7 個）を見せず、分類名の字と説明の字はほかに変えない（`site-look-manual-files` の Requirement 2.4 と同じ扱い。**仮定**: ファイル名の帯と同じく外す。OPEN QUESTION 3）
5. The UKADOC のサイト shall 見方の箇条書きの帯を見出しにせず、右の欄の目次・見出しの id・見出しの横のリンクの印（¶）を増やさない
6. If トップの箇条書きが見方の箇条書きでないとき（目次のリンクの並び、「対象version」・「外部リンク」のリンクの箇条書き）, the UKADOC のサイト shall その箇条書きを今のままの見え方で表示する
7. The UKADOC のサイト shall 見方の箇条書きを表にしない（`site-look-definition-tables` の C23 の当て先にしない）

### Requirement 5: 帯とリンクの並びの見分けと余白
**Objective:** As a トップの目次から頁を探すゴースト制作者, I want どれが見出しの帯で、どれがリンクの並びかがひと目で分かり、リンクの並びが詰まりすぎないこと, so that 目次のリンクを押し間違えず、流し読みできる（brief の Desired Outcome）

#### Acceptance Criteria
1. While トップを見ているとき, the UKADOC のサイト shall 分類の帯（節の見出し）と項目名の帯（目次の分類・見方の分類名）を、違う見え方（濃い地に白い字と、薄い地に左の太い線）で表示し、どちらもリンクの並びの字と見分けられるようにする
2. The UKADOC のサイト shall 目次のリンクの並びの行と行の間の余白、入れ子の箇条書きの字下げを、今より詰めずに表示する（**仮定**: リンクの並びは今のまま、余白を変えるのは帯の上下だけ。OPEN QUESTION 2）
3. The UKADOC のサイト shall トップの段落（「ukadocについて」の段落・引用と、見方の箇条書きの説明）の上下の余白を、まとめ頁の項目の間の詰め（C02）のように詰めない（**仮定**: トップは読み物の頁なので、`site-look-list-items` の Requirement 2.4 と同じく詰めない。OPEN QUESTION 2）
4. When 帯の直前にリンクの並びや段落があるとき, the UKADOC のサイト shall 帯の上に、前の並びと帯がつながって見えない余白を置く（目次の分類の帯が、上の分類のリンクの並びの最後の行に重ならない）

### Requirement 6: 字の読みやすさ、明・暗の切り替えと印刷
**Objective:** As a 明・暗のどちらでも UKADOC を読むゴースト制作者, I want トップの帯の字がどちらの表示でもくっきり読め、切り替えや印刷でも崩れないこと, so that 見た目の直しのせいで読めない所が増えない（D16 ダークモード）

#### Acceptance Criteria
1. When 利用者が明るい表示と暗い表示を切り替えたとき, the UKADOC のサイト shall 頁を読み込み直さなくても、トップの帯をそのときの表示の色に変える
2. If 暗い表示を選んだまま頁を印刷したとき, the UKADOC のサイト shall トップの帯を、明るい表示で印刷したときと同じ色で印刷する（暗い表示だけの色を白い紙に出さない。`site-look-list-items` の Requirement 6.6 と同じ考え）
3. The site-look-top-page shall トップの帯の中のリンクの数を数えて記録し、1 つ以上あるときは、項目名の帯の中のリンクは `site-look-list-items` の Requirement 6.1・6.2、分類の帯の中のリンクは同じく 6.4 の線で測る（今はどの帯の中にもリンクは 0 個）
4. The site-look-top-page shall 帯の色を、まとめ頁・`manual/` の頁の帯と同じ指定から取り、トップだけの色を足さない。テーマの色・本文のリンクの色（暗い表示の `#8fb4e8` を含む）・ヘッダの地の色を、この spec のために変えない

### Requirement 7: 今のサイトの良いところを失わない
**Objective:** As a UKADOC を読むゴースト制作者, I want 検索・見出しへのリンク・狭い画面が今のまま使えること, so that 見た目の直しのせいでほかの使い勝手が落ちない（`survey.md` の「失わないもの」。D16 は Requirement 6 が受け持つ）

#### Acceptance Criteria
1. The UKADOC のサイト shall トップの見出しと見方の箇条書きの分類名・説明を、今と同じ字で検索で引けるようにする（外すのは見方の箇条書きの名前の後ろの「`: `」だけ。D15）
2. When 検索の結果からトップを開いたとき, the UKADOC のサイト shall 語の強調を、分類の帯と項目名の帯の中でも、明・暗の表示とも見せる（D15。濃い帯の中の強調は `site-look-list-items` の Requirement 7.1 と同じ見え方）
3. The UKADOC のサイト shall トップの見出しの id・見出しの横のリンクの印（¶）・右の欄の目次を今のまま保ち、ほかの頁からトップの見出しへのリンクを今のまま通す（D17）
4. When 幅 375 の狭い画面でトップを見たとき, the UKADOC のサイト shall 頁の横幅を画面の幅に収める（`scrollWidth` と `innerWidth` が同じ 375。D18）
5. The site-look-top-page shall サイトに置く生の Markdown 原稿（`_raw/INDEX.md`）と `llms.txt` を今のまま保ち、組み立ての処理の一覧の検査・見出しの数の検査・リンクの書き換え（`INDEX.md` へのリンクを `index.md` にすることを含む）を今のまま通す

### Requirement 8: 表示の確かめと記録
**Objective:** As a doc_edit の開発者, I want 変更がトップにだけ効いていることと、ほかの頁と並べた見比べ・数・対比が残っていること, so that 見落としなく PR に出せ、開発者が「ほかの頁と同じ」を確かめられる

#### Acceptance Criteria
1. When 変更を確かめるとき, the site-look-top-page shall ローカルのプレビュー（頁の道は `/ukadoc-spec/` から始まる）で配られた見た目の指定のファイルを開き、読めて（200）この spec の中身が入っていることを確かめる
2. The site-look-top-page shall プレビューのトップの HTML を取ってきて、節の見出しの帯（今は 5 個）・目次の分類の帯（今は 7 個）・見方の箇条書きの帯（今は 7 個）・外した「`: `」（今は 7 個）・本文に漏れた印の書きかけの字（`{: ` など）が 0 であることを数えて記録する
3. The site-look-top-page shall 変更の前と後で、トップの見出しの id の並び・`a.headerlink`（¶）の数・右の欄の目次の項目の数が同じことを確かめて記録する
4. The site-look-top-page shall 変更の前と後で、トップを除くすべての頁の HTML の本文が同じであることを確かめて記録する（Requirement 1.3）
5. The site-look-top-page shall 変更の後のトップを明・暗の両方で撮り、同じ見え方の当て先（まとめ頁の分類の帯と項目名の帯、`manual/ghost` のファイル名の帯と説明の字下げ）を同じ大きさで撮った画面と並べて、開発者が見比べられる形で記録する
6. The site-look-top-page shall 帯の字と ¶ と地の対比（Requirement 2.2・2.3・3.2）を明・暗で測って記録する
7. When 幅 375 の狭い画面を確かめるとき, the site-look-top-page shall トップの `scrollWidth` と `innerWidth` を測って記録する（狭い画面の画面は残さない）
8. If 撮った画面に、撮る途中の描き直しで二重に重なった跡（上の端以外の左右の端に、ヘッダの色の行が出ている）があるとき, the site-look-top-page shall その画面を撮り直す
9. When 開発者に画面を見せるとき, the site-look-top-page shall 古い写しが残らないよう、ブラウザでの強制の再読み込み（Ctrl+F5）を頼む

### Requirement 9: 変更の範囲と PR
**Objective:** As a ukadoc-spec のメンテナ, I want 小さく、印と見た目の指定に限った変更を受け取ること, so that 他者も使う公開リポジトリでもレビューしやすい

#### Acceptance Criteria
1. The site-look-top-page shall ukadoc-spec の中で `assets/extra.css` と `scripts/prepare_site.py` だけを変え、原稿（`.md`）・`.nav.yml`・`mkdocs.yml`・`requirements.txt`・Zensical の版を変えない
2. The site-look-top-page shall 帯と字下げの宣言を新しく書かず、`site-look-list-items` と `site-look-manual-files` が入れた塊のセレクタを広げて分け合うのを先にする。新しい塊が要るときは `assets/extra.css` の末尾に足し、塊ごとの注を `/* site-look-top-page: <何の指定か> */` の短い 1 行にとどめる（説明・測りの数・わけは spec の記録に書く）
3. The site-look-top-page shall 変更を、この spec の作業木 `.worktrees/site-look-top-page/`（ブランチ `site-look-top-page`）で、`site-look-manual-files` の PR（#15）がマージされた後の ukadoc-spec の `origin/main` の上に書く
4. The site-look-top-page shall この spec の完了の前に、Build Gate（`prepare_site.py` と `zensical build --strict` が、どちらも失敗なく終わる）と規約 Gate を通す
5. The site-look-top-page shall この spec の完了で、この spec だけの PR を作ってスクワッシュマージする（原則 1 spec = 1 PR）
6. If 作業の途中に、ukadoc-spec の `origin/main` が同じ `assets/extra.css`・`scripts/prepare_site.py` を変えて進み、変更とぶつかったとき, the site-look-top-page shall `origin/main` に追いつき、この spec の指定と、ほかの spec（`site-look-definition-tables` など）が入れた指定の両方が残るようにする

## OPEN QUESTION（要件の話し合いで決める）
brief で決まらず、仮定を置いて書いた所。推す案は仮定のとおり。

1. **印の付け方（brief の (a)・(b)）**: (a) 見出しにまとめ頁の印（`bundle-category`・`bundle-item`）をそのまま付けるか、(b) トップの印（例: `top-section`・`top-category`）を付けて、既にある塊のセレクタに足すか。(a) は見た目の指定が増えないが、まとめ頁の項目の間の詰め（C02 の `:has(.bundle-item)`）がトップの段落にも及び（Requirement 5.3 とぶつかる）、印の名前の決まり（steering `structure.md` の `<頁の種類>-<役>`）にも合わない。(b) は C03 の 4 つのセレクタ（帯・帯の中のコード・¶・検索の強調）と C01 の帯のセレクタを広げる。要件は Requirement 1.4・5.3・9.2 で (b) 寄りに書いた。印の名前と広げ方は設計で決める
2. **余白（Requirement 5.2〜5.4）**: リンクの並びと段落の余白は今のまま、帯の上下だけを決めるか。項目名の帯をまとめ頁と同じ詰めた余白（`margin: .5em 0 .3em`）にするか、目次の帯の上を広めに取るかは、画面を見て設計で決める
3. **見方の箇条書きの「`: `」（Requirement 4.4）**: `manual/` のファイル名の帯と同じく外すか、残すか。外すと検索で引ける字から「`: `」が消える（`site-look-manual-files` と同じ）
4. **見方の箇条書きの印（Requirement 4）**: `manual/` の頁のファイル名の目印（`manual-item`。`mark_manual()`）をトップにも通すか、トップの印を足して C01・C14・C22 の塊のセレクタに加えるか（brief の「申し送り」の論点）。前者は指定が増えないが、`manual-` の名前の印が `manual/` でない頁に付く。後者は C22・C14 の塊の 4 つのセレクタと C01 の帯のセレクタを広げる。どちらも同じ宣言を 2 か所に書かない
5. **帯にしない所（Boundary Context の Out of scope）**: 頁の題（`h1`）・「対象version」と「外部リンク」のリンクの箇条書き・「ukadocについて」の段落と引用は、今のままでよいか
6. **目次のまとめの項目（Requirement 3.4）**: 「Ghost」・「SHIORI」など、リンクの無いまとめの項目 8 個は今のままでよいか（帯にすると、目次の分類の帯と段が見分けにくくなる）
