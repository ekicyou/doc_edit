# Requirements Document

## Project Description (Input)
- **誰が困っているか**: UKADOC の公開サイト（https://ukatech.shillest.net/ukadoc-spec/ ）を暗い表示（ダークモード）で読むゴースト制作者
- **いまの状況**: ukadoc-spec の `417511c` でテーマの色が紺 `#1f4e8c` になり、リンクの色も明・暗とも紺になった。今の本番（`afb2152`）の暗い表示では、本文のリンクと左の目次の今の頁が暗い地 `#1e2129` に 1.94:1 しかなく、ほとんど読めない
- **何を変えるか**: 暗い表示だけ、リンクの色を明るい紺 `#8fb4e8`（暗い地に 7.56:1）にする（`site-look-plan` の C24）。明るい表示は変えない（詳細は `brief.md`）

## Introduction
この spec は、UKADOC の公開サイトの暗い表示で、リンクの色を読める明るさに直す。`site-look-plan` の C24（`decisions.md` で「採る」と決まったもの）を、本番の書き方で ukadoc-spec に入れる。方向は決まっているので、ここでは議論し直さない。

変えるのは暗い表示のリンクの色だけで、明るい表示・ヘッダの紺・テーマの色・原稿は変えない。ukadoc-spec を変えるので、作業木 `.worktrees/site-look-dark-link-color/` で書き、Build Gate と規約 Gate を通して、`/kiro-complete` で PR にする。

本文の主語は 2 つある。「UKADOC のサイト」は、この spec の変更を入れた後の公開サイト（とそのプレビュー）の見え方を指す。「site-look-dark-link-color」は、この spec の作業（ukadoc-spec への変更・確かめ・記録・PR）を指す。

目標の画面は `.kiro/specs/completed/site-look-plan/screenshots/mock-sakura-script-C24-dark.png`（見比べに `mock-sakura-script-C24-light.png`）である。この画面には採ると決まったほかの候補（C01〜C21）も入っているので、見比べるのはリンクと目次の今の頁の色だけである。

## Boundary Context
- **In scope**:
  - 暗い表示で、リンクの色で描かれる所の色（本文のリンク、左の目次の今の頁。同じリンクの色で描かれるほかの所も一緒に変わる。下の Requirement 1）
  - 明・暗の画面での見比べと、対比の測りの記録
  - リンクにポインタを載せたとき（ホバー）・フォーカスしたときの見え方を確かめること。読めないと分かったときだけ、その見え方を足す
- **Out of scope**:
  - 明るい表示の色（紺のリンクは白地に 8.31:1 あり、変えない）
  - ヘッダの地の紺と、テーマの色そのもの（紺 `#1f4e8c`）
  - サイトの色の設定（`mkdocs.yml` の `palette`。ホバーの色 `accent: indigo` もここにある）の変更
  - 原稿（`.md`）・`.nav.yml`・`requirements.txt`・Zensical の版
  - ほかの見た目の候補（項目名の帯など。後続の spec が行う）
- **Adjacent expectations**:
  - 土台は ukadoc-spec の `origin/main`（いまは `afb2152`）。進んでいたら、その上で書く
  - 後続の spec（`site-look-list-items` ほか）も同じ `assets/extra.css` を触る。どちらが先に入ってもよく、ぶつかったら `origin/main` に追いつく。この spec の変更に中身で依る spec は無い
  - 目標の画面・試作・測りは `site-look-plan`（`.kiro/specs/completed/site-look-plan/`）のものを読むだけで、書き換えない

## Requirements

### Requirement 1: 暗い表示のリンクの色
**Objective:** As a 暗い表示で UKADOC を読むゴースト制作者, I want 本文のリンクと左の目次の今の頁が暗い地の上ではっきり読めること, so that リンクを見落とさず、今どの頁にいるかが分かる（`survey.md` の「失わないもの」D16 ダークモードの主題）

#### Acceptance Criteria
1. While 暗い表示で頁を見ているとき, the UKADOC のサイト shall 本文のリンクの字を明るい紺 `#8fb4e8` で表示する
2. While 暗い表示で頁を見ているとき, the UKADOC のサイト shall 本文のリンクの字を、暗い地 `#1e2129` に対して 7:1 以上の対比で表示する（試作の測りでは 7.56:1）
3. While 暗い表示で頁を見ているとき, the UKADOC のサイト shall 左の目次の今の頁の項目を、本文のリンクと同じ明るい紺で表示する。幅の広い画面の左の欄と、狭い画面で開く目次の引き出しの両方で同じとする
4. While 暗い表示で頁を見ているとき, the UKADOC のサイト shall 同じリンクの色で描かれるほかの所（右の欄の目次の今の節、コードの字で書いたリンク、脚注から本文へ戻るリンクなど）も、本文のリンクと同じ明るい紺で表示する（前提: brief の「本文のリンク・左の目次の今の頁など」の「など」を、リンクの色で描かれる所すべてと読んだ。OPEN QUESTION 4）
5. While 暗い表示で頁を見ているとき, the UKADOC のサイト shall コードの地の上のリンク（コードの字で書いたリンク）を、暗い表示のコードの地に対して 4.5:1 以上の対比で表示する（前提: brief はコードの地との対比を定めていないので、本文の字の読みやすさの一般的な下限 4.5:1 を置いた。測りの見込みは約 6.7:1。OPEN QUESTION 3）
6. When 利用者が明るい表示と暗い表示を切り替えたとき, the UKADOC のサイト shall 頁を読み込み直さなくても、そのときの表示に合ったリンクの色（明るい表示は紺、暗い表示は明るい紺）に変える

### Requirement 2: 明るい表示とヘッダを変えない
**Objective:** As a 明るい表示で UKADOC を読むゴースト制作者, I want 明るい表示の見え方が今のままであること, so that 直しのせいで読みやすさが変わらない

#### Acceptance Criteria
1. While 明るい表示で頁を見ているとき, the UKADOC のサイト shall 本文のリンクと左の目次の今の頁を、今と同じ紺 `#1f4e8c`（白地に 8.31:1）で表示する
2. The UKADOC のサイト shall ヘッダの地の色を、明・暗の表示とも今と同じ紺のままにする
3. When 明るい表示の同じ頁・同じ位置（`list/sakura-script` の `#bang-lock-repaint`）を、変更の前と後で撮って見比べたとき, the site-look-dark-link-color shall リンクと目次の色に違いが無いことを確かめて記録する
4. If 暗い表示を選んだまま頁を印刷したとき, the UKADOC のサイト shall リンクの字を、明るい表示で印刷したときと同じ紺で印刷する（前提: テーマは暗い表示の色を画面にだけ当て、印刷は明るい表示の色になる。明るい紺が白い紙に出ると約 2.1:1 で読みにくいので、印刷の見え方も「今のまま」に含めた。OPEN QUESTION 2）

### Requirement 3: ホバー・フォーカスの見え方の確かめ
**Objective:** As a 暗い表示で UKADOC を読むゴースト制作者, I want リンクにポインタを載せたときやキーボードでフォーカスしたときも字が読めること, so that 操作の途中でリンクが見えなくならない

#### Acceptance Criteria
1. When 暗い表示で本文のリンクまたは左の目次の項目にポインタを載せたとき, the site-look-dark-link-color shall そのときの字の色と暗い地との対比を測って記録する
2. When 暗い表示で本文のリンクにキーボードでフォーカスしたとき, the site-look-dark-link-color shall そのときの字の色と暗い地との対比を測って記録する
3. If ホバーまたはフォーカスのときの字が暗い地に対して 3:1 に満たないとき, the site-look-dark-link-color shall 暗い表示のそのときの字の色を、3:1 以上で読める色にする（前提: brief は「読めない」の線を定めていないので、ポインタを載せている間だけの一時の見え方として 3:1 を線に置いた。今のホバーの色の見込みは約 3.8:1 で、この線なら足さない。OPEN QUESTION 1）
4. While ホバーまたはフォーカスの字が 3:1 以上で読めるとき, the site-look-dark-link-color shall ホバー・フォーカスの見え方に指定を足さない

### Requirement 4: 今のサイトの良いところを失わない
**Objective:** As a UKADOC を読むゴースト制作者, I want 検索・見出しへのリンク・狭い画面・コードのコピーなどが今のまま使えること, so that 色の直しのせいでほかの使い勝手が落ちない（`survey.md` の「失わないもの」。D16 は Requirement 1・2 が受け持つ）

#### Acceptance Criteria
1. The UKADOC のサイト shall 頭の帯の検索の欄と、検索の結果の語の強調を、明・暗の表示とも今のまま見せる（D15）
2. The UKADOC のサイト shall 見出しの id、見出しの横のリンクの印（¶）、右の欄の目次を今のまま保つ（D17）
3. When 幅 375 の狭い画面で頁を見たとき, the UKADOC のサイト shall 頁の横幅を画面の幅に収める（`scrollWidth` と `innerWidth` が同じ 375。D18）
4. The UKADOC のサイト shall コードのコピーのボタンを残し、コピーされる字を変えない（D19）
5. The UKADOC のサイト shall 記述例の `\` を `\` のまま見せる（D20）

### Requirement 5: 表示の確かめと記録
**Objective:** As a doc_edit の開発者, I want 変更が本当に配られた頁に効いていることと、その対比の数が残っていること, so that 見落としなく PR に出せ、テーマの色がまた変わったときに直す所が分かる

#### Acceptance Criteria
1. When 変更を確かめるとき, the site-look-dark-link-color shall ローカルのプレビュー（頁の道は `/ukadoc-spec/` から始まる）で配られた見た目の指定のファイルを開き、暗い表示のリンクの色の指定が入っていることを確かめる（サイトを作る処理の厳しい検査は、指定したファイルが無くても気づかないため）
2. The site-look-dark-link-color shall 変更の後の `list/sakura-script` の `#bang-lock-repaint` を明・暗の両方で撮り、目標の画面（`mock-sakura-script-C24-dark.png`・`mock-sakura-script-C24-light.png`）とリンクと目次の今の頁の色を見比べた結果を記録する
3. The site-look-dark-link-color shall 暗い表示のリンクの色と暗い地との対比、コードの地との対比、明るい表示のリンクの色と白地との対比を測って記録する
4. The site-look-dark-link-color shall 明るい紺 `#8fb4e8` を変更の注に、テーマの紺 `#1f4e8c` と対の色であることと、暗い地との対比とともに書く（テーマの色がまた変わったときに、直す所だと分かるようにする）
5. If 撮った画面に、撮る途中の描き直しで二重に重なった跡（上の端以外の左右の端に、ヘッダの色の行が出ている）があるとき, the site-look-dark-link-color shall その画面を撮り直す
6. When 開発者に画面を見せるとき, the site-look-dark-link-color shall 古い写しが残らないよう、ブラウザでの強制の再読み込み（Ctrl+F5）を頼む

### Requirement 6: 変更の範囲と PR
**Objective:** As a ukadoc-spec のメンテナ, I want 小さく、見た目の指定だけの PR を受け取ること, so that 他者も使う公開リポジトリでもレビューしやすい

#### Acceptance Criteria
1. The site-look-dark-link-color shall ukadoc-spec の中で `assets/extra.css` だけを変え、原稿（`.md`）・`.nav.yml`・`mkdocs.yml`・`requirements.txt`・Zensical の版を変えない
2. The site-look-dark-link-color shall 変更を、ukadoc-spec の `origin/main` の最新から作った作業木 `.worktrees/site-look-dark-link-color/` で書く
3. When 変更を PR にする前に, the site-look-dark-link-color shall Build Gate（`prepare_site.py` と `zensical build --strict` が、どちらも失敗なく終わる）と規約 Gate を通す
4. The site-look-dark-link-color shall 変更を `/kiro-complete`（開発者の完了の承認）で ukadoc-spec への PR にし、PR をマージしない（マージはメンテナが行う）
5. If PR を出す前か出した後に、ukadoc-spec の `origin/main` が同じ `assets/extra.css` を変えて進み、変更とぶつかったとき, the site-look-dark-link-color shall `origin/main` に追いつき、暗い表示のリンクの色の指定と、ほかの spec が入れた指定の両方が残るようにする
6. The site-look-dark-link-color shall 旧サイトの見た目の指定や試作の指定を写さず、本番の書き方で書き直す（試作の C24 は使い捨ての書き方である）
