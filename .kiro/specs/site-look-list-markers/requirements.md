# Requirements Document

## Project Description (Input)
- **誰が困っているか**: UKADOC の公開サイト（https://ukatech.shillest.net/ukadoc-spec/ ）のまとめ頁で仕様を引くゴースト制作者
- **いまの状況**: 頁の頭の注意書き（`notes_*.md`）は項目の一覧と同じ見え方で、別の種類の文だと分からない（`survey.md` の D05）。「対応:」の段落は普通の太字の段落で、どのベースウェアに対応するかを名前ごとに追えない（D02・D09。旧サイトは画像の印で見分けていた）。「既定値:」の段落も説明の文に埋もれる（D07）。明るい表示の色付きの字（札など）は、試作の色だと白地に 5〜6:1 ほどで、開発者に「黒は良いけど色付き文字が明るすぎる」と指摘された
- **何を変えるか**: `site-look-plan` で「採る」と決まった C04（注意書きの節の枠の箱）・C06（対応のベースウェアの名前ごとの札）・C07（既定値の札と字下げ）・C17（明るい表示の札の字を白地に 7:1 以上）を、本番の書き方で ukadoc-spec に入れる（詳細は `brief.md`）

## Introduction
この spec は、UKADOC のまとめ頁で、注意書きの節・対応ベースウェア・既定値を、ほかの文とひと目で見分けられるようにする。`site-look-plan` の `decisions.md` で「採る」と決まった C04・C06・C07・C17 を、本番の書き方で ukadoc-spec に入れる。方向は決まっているので、ここでは議論し直さない。

変えるのは、まとめ頁の組み立ての処理（`scripts/prepare_site.py`）が付ける目印と、その目印に当てるサイトの見た目の指定（`assets/extra.css`）で、原稿は変えない。ukadoc-spec を変えるので、この spec の作業木 `.worktrees/site-look-list-markers/` で、先の `site-look-list-items` の PR がマージされた後の `origin/main` の上に書き、Build Gate と規約 Gate を通す。PR は原則 1 spec = 1 PR なので（開発者の指示、2026-10-25）、この spec の完了で自分の PR を作ってスクワッシュマージする。

本文の主語は 2 つある。「UKADOC のサイト」は、この spec の変更を入れた後の公開サイト（とそのプレビュー）の見え方を指す。「site-look-list-markers」は、この spec の作業（ukadoc-spec への変更・確かめ・記録）を指す。

言葉の決まり（この文書の中で）:
- **まとめ頁**: `descript/<名前>/`・`list/<名前>/`・`spec/<名前>/` のディレクトリを 1 頁にまとめた頁（今は 20 頁）。`manual/`・`dev/`・`memo/` の頁、`spec/` の 1 ファイルの頁、トップの頁はまとめ頁でない（以下「読み物の頁」）
- **注意書きの節**: まとめ頁の中の、原稿の `notes_*.md` の 1 つの単位（見出しと本文）。見出しの id が `notes_` で始まる。今は 16 個（`list/sakura-script` 14 ― 段が `h2` 2・`h3` 12、`list/propertysystem` 2 ― 段が `h4`）
- **対応の段落**: まとめ頁の中の、コードブロックの外で行の頭が `**対応:**` で始まる段落。今は 1640 段落（ukadoc-spec `46439c8` で数えた。`dev/nar.md` の 1 個はまとめ頁の外なので含まない）
- **対応の部分**: 対応の段落の「対応:」の後ろを ` / ` で区切った 1 つずつ
- **ベースウェアの名前**: `Materia`・`SSP`・`CROW`・`Ninix` の 4 つ（`ukadoc-spec/CLAUDE.md` の書式の名前）
- **形に合う部分**: ベースウェアの名前で始まり、名前の後ろが部分の終わりか空白である対応の部分（例: `SSP`・`SSP 2.8.40`・`SSP (2.3.83)`・`SSP 2.7 RC1`）。札にするのは名前の字だけで、後ろの字は札に入れない（要件のディスカッションで決めた、2026-10-25。brief の「名前と空白と数字の版」より広く取り、版が括弧・角括弧・RC 付きの行でも名前を札にする）。これで数えると、札は 2719 個、形に合わない部分を含む行は 5 通り・7 行（例: `Materia廃止仕様 / SSP`）、札が 1 つも付かない行は 0 行である（`research.md`）。今は、名前の後ろの字が対応を打ち消す行（「非対応」「廃止」など）は無い
- **札**: 名前の字を残したまま、名前ごとの色の枠で囲んで見せる印（C06・C07）
- **既定値の段落**: まとめ頁の中の、コードブロックの外で行の頭が `**既定値:**` で始まる段落。今は 423 段落（うち 6 段落は `<br />` で 2 行以上に続く）

目標の画面は `.kiro/specs/completed/site-look-plan/screenshots/` の `mock-sakura-script-C04-*.png`・`mock-sakura-script-C06-*.png`・`mock-descript-ghost-C07-*.png`・`mock-sakura-script-C17-light.png` の明・暗である。これらの画面には採ると決まったほかの候補（タグの色 C10・C20、項目名の帯 C01 など）も入っているので、見比べるのはこの spec の 4 つの候補の部分だけである。

## Boundary Context
- **In scope**:
  - C04・C06・C07・C17 の見え方（下の Requirement 1〜4）
  - それらの見た目を当てる目印（注意書きの節の包み・対応の段落と名前・既定値の段落）と、目印の名前の決定（試作の `slp-` の接頭辞は使わない）
  - 箱・札の中の字とリンクの読みやすさ、明・暗の切り替え、印刷の見え方（Requirement 6）
  - 明・暗の画面と 375 px の確かめ、目印の数と対比の測りの記録
- **Out of scope**:
  - さくらスクリプトのタグ・環境変数の色と、その明るい表示の濃さ（`site-look-sakura-script-highlight`）
  - `manual/` の頁の木のファイル名の色と、その明るい表示の濃さ（`site-look-manual-files`）
  - 注釈の見出しのアイコン（`site-look-note-icon`。C04 の箱に入る `notes_` の見出しに付ける）
  - C05（対応の段落を 1 本の帯にする）・C11（バルーン風）。どちらも採らなかった方の候補である
  - ベースウェアの画像の印（旧サイトの `icon_*.png` などの素材は使わない）
  - 原稿（`.md`）・`.nav.yml`・`mkdocs.yml`・`requirements.txt`・Zensical の版。`**対応:**` の行の書き方（形に合わない行を原稿で直すこと）
  - ベースウェアの名前を足すかどうか（例: areka を `**対応:**` に載せるか。`product.md` の未決の事項）
  - `dev/nar.md` の 1 個の `**対応:**`（まとめ頁の外なので目印も札も付かない）
- **Adjacent expectations**:
  - 土台は、`site-look-list-items` の PR（今は作業木 `.worktrees/site-look-list-items/` の `902a7f1`。ukadoc-spec の `origin/main` `a341420` に 3 つのコミットが載ったもの）がマージされた後の ukadoc-spec の `origin/main`。ukadoc-spec の `origin/main` は `46439c8` に進んだが、変わったのは `spec/saori-ex/internal_file/` の 2 ファイルと `spec/sstp/method_execute.md` だけで、対応の段落・既定値の段落・注意書きの節の数は変わらない（`research.md`）
  - C04 の箱は、`site-look-list-items` の項目名の帯（C01）と分類の帯（C03）が注意書きの節の見出しを除くことに依る。その spec の目印の名前の決まり（`bundle-<役>`）と、まとめ頁の段落の詰め（C02）を引き継ぐ
  - `site-look-note-icon` は、この spec の箱に入る注意書きの節の見出しにアイコンを付ける。C11（バルーン風）は、キャラクター（C12、roadmap のバックログ）が決まった後に、この spec の注意書きの節の目印のまま、見た目の指定だけで C04 と入れ替えられることを期待する
  - 「明るい表示の色付きの字は白地に 7:1 以上」の物差しは、`site-look-sakura-script-highlight`・`site-look-manual-files` も同じに使う。この spec は自分の作る札にだけ当て、ほかの spec の字の色は指定しない
  - `site-look-definition-tables` も同じ `prepare_site.py` に後処理を足す。どちらが先に入ってもよい
  - 目標の画面・試作・測りは `site-look-plan`（`.kiro/specs/completed/site-look-plan/`）のものを読むだけで、書き換えない

## Requirements

### Requirement 1: 注意書きの節の箱（C04）
**Objective:** As a まとめ頁で仕様を引くゴースト制作者, I want 注意書きの節が枠の箱で、項目の一覧と別の種類の文だとひと目で分かること, so that 頁の頭の注意書きや分類の中の補足を、項目の説明と取り違えない（`survey.md` の D05）

#### Acceptance Criteria
1. While まとめ頁を見ているとき, the UKADOC のサイト shall 各注意書きの節を点線の枠の箱で囲み、節の見出しを箱の中で中央寄せにし、見出しと本文の間を点線で区切って表示する（目標の画面 `mock-sakura-script-C04-light.png`・`mock-sakura-script-C04-dark.png` の点線の箱と中央寄せの見出し）
2. The UKADOC のサイト shall 注意書きの節の見出しの段（`h2`・`h3`・`h4`）や置かれた所（頁の頭・分類の中・分類の中の分類の中）に依らず、16 個のすべての注意書きの節に同じ箱を付ける（`list/propertysystem` の、段が `h4` の 2 個にも付ける）
3. The UKADOC のサイト shall 1 つの注意書きの節の見出しと本文（段落・箇条書き・コードの字・リンク）をすべて 1 つの箱に入れ、次の項目・項目の間の区切りの線を箱に入れない
4. If 見出しが注意書きの節の見出しでないとき（項目名・分類の見出し・項目の中の節の見出し）, the UKADOC のサイト shall その見出しと続く本文を箱に入れない
5. Where 頁が読み物の頁であるとき, the UKADOC のサイト shall 箱を付けず、今のままの見え方で表示する
6. The UKADOC のサイト shall 箱の中の字を、明・暗の表示とも箱の地に対して 4.5:1 以上の対比で表示し、箱の枠の線を箱の外と中の地に対して 3:1 以上の対比で表示する（枠の線の 3:1 は brief に無く、WCAG の文字でないものの対比の線として足した。要件のディスカッションで決めた、2026-10-25。点線は薄く見えやすいため）
7. While 明・暗のどちらかの表示で箱の中のリンク（今は 42 個。`list/sakura-script/misc/notes_executehttp.md` の 25 個など）を見ているとき, the UKADOC のサイト shall リンクの字を箱の地に対して 7:1 以上で、ポインタを載せたとき・キーボードでフォーカスしたときの字を 3:1 以上で表示する（要件のディスカッションで決めた、2026-10-25。`site-look-list-items` の Requirement 6.1・6.2 と同じ線で、サイトの中でリンクの物差しを二通りにしない。試作の箱の地（コードの地）では暗い表示が約 6.7:1 で届かないので、届く箱の地を設計で選ぶ）
8. The site-look-list-markers shall 注意書きの節の目印を、見た目の指定を差し替えるだけで別の見せ方（C11 のバルーン風）に替えられる形で付ける（目印が箱の見え方に縛られない）

### Requirement 2: 対応のベースウェアの札（C06）
**Objective:** As a まとめ頁で仕様を引くゴースト制作者, I want 「対応:」の後のベースウェアの名前が、名前ごとの色の札で見えること, so that どのベースウェアに対応するかを、名前ごとに目で追える（D02・D09。旧サイトの画像の印の代わり）

#### Acceptance Criteria
1. While まとめ頁を見ているとき, the UKADOC のサイト shall 対応の段落の形に合う部分のベースウェアの名前を、名前ごとの色の枠の札で表示する（目標の画面 `mock-sakura-script-C06-light.png`・`mock-sakura-script-C06-dark.png` の札）
2. The UKADOC のサイト shall `Materia`・`SSP`・`CROW`・`Ninix` の札を、明・暗の表示のどちらでも、互いに違う色で表示する
3. The UKADOC のサイト shall 札の後ろの字（版や括弧の注など。例: `SSP 2.8.40` の `2.8.40`、`SSP (オプションは2.4～)` の `(オプションは2.4～)`）を札に入れず、札の後ろに今の字のまま表示し、部分の間の ` / ` と頭の「対応:」の字も今のまま残す
4. If 対応の部分が形に合わないとき（名前の直後に空白でない字が続く。例: `Materia廃止仕様`、`*※推奨　SSP2.5.05以上*`）, the UKADOC のサイト shall その部分を札にせず、今の字と見え方のまま表示し、同じ段落の形に合うほかの部分は札にする（例: `Materia廃止仕様 / SSP` の `SSP` は札にする）
10. If 名前の後ろの字がその名前の対応を打ち消すとき（「非対応」「廃止」など。今は無い）, the site-look-list-markers shall その部分を札にしない
5. The UKADOC のサイト shall 札の字を名前の字のまま残し、色だけで名前を見分けさせない
6. The UKADOC のサイト shall 暗い表示の札の字と枠を、暗い地に対して 4.5:1 以上の対比で表示する（要件のディスカッションで決めた、2026-10-25。7:1 の物差しは明るい表示の「明るすぎる」への答えで、暗い表示には当てない。試作の暗い表示の色は 6.73〜10.06:1 の見込みで、CROW が最も弱い）。明るい表示の札の色は Requirement 4 による
7. If ベースウェアの名前が対応の段落の外（説明の文・見出し・表・コードの字・コードブロック）にあるとき, the UKADOC のサイト shall その名前を札にしない
8. Where 頁が読み物の頁であるとき, the UKADOC のサイト shall `**対応:**` の段落（今は `dev/nar.md` の 1 個）を札にせず、今のままの見え方で表示する
9. The site-look-list-markers shall 札にするベースウェアの名前を足すとき、名前とその明・暗の札の色を足すだけで新しい名前が札になる形にする（名前を足すかどうかは決めない）

### Requirement 3: 既定値の札と字下げ（C07）
**Objective:** As a まとめ頁で仕様を引くゴースト制作者, I want 「既定値:」の段落が説明の文と分かれて見え、値そのものはしっかり読めること, so that 既定値を探さずに見つけ、「省略不可」のような大事な値を読み落とさない（D07）

#### Acceptance Criteria
1. While まとめ頁を見ているとき, the UKADOC のサイト shall 各既定値の段落を説明の文より字下げし、頭の「既定値:」を枠の札で表示する（目標の画面 `mock-descript-ghost-C07-light.png`・`mock-descript-ghost-C07-dark.png` の札と字下げ）
2. The UKADOC のサイト shall 既定値の段落の値の字を、本文と同じ色・同じ大きさで表示する（目標の画面の値の字より濃くする。試作の色は明 4.59:1・暗 4.91:1、大きさは .85em だった。本文の色は明 16.07:1・暗 8.89:1 の見込み。小さく見せるのは「既定値:」の札だけにする。要件のディスカッションで決めた、2026-10-25。「省略不可」のような大事な値を控えめにしないため）
3. The UKADOC のサイト shall 既定値の段落の字を斜めの字にしない
4. The UKADOC のサイト shall 「既定値:」の札の字と枠を、明・暗の表示とも地に対して 4.5:1 以上の対比で表示する
5. When 既定値の段落が `<br />` で 2 行以上に続くとき（今は `descript/shell-surfaces` の 6 段落）, the UKADOC のサイト shall 段落の全部の行を同じく字下げし、目印の書きかけの字（`{: ` など）を本文に出さない
6. If 段落が既定値の段落でないとき（対応の段落・説明の文）, the UKADOC のサイト shall その段落を字下げせず、札も付けない
7. Where 頁が読み物の頁であるとき, the UKADOC のサイト shall 段落を今のままの見え方で表示する

### Requirement 4: 明るい表示の札の濃さ（C17）
**Objective:** As a 明るい表示で UKADOC を読むゴースト制作者, I want 札の色付きの字が白地にくっきり読めること, so that 「色付き文字が明るすぎる」ことなく、札の名前を別のモニタでも読める（開発者の指摘）

#### Acceptance Criteria
1. While 明るい表示で見ているとき, the UKADOC のサイト shall C06 の 4 つの名前の札の字と枠を、白地に対して 7:1 以上の対比で表示する（目標の画面 `mock-sakura-script-C17-light.png` の札の濃さ。試作の測りでは 8.34〜10.93:1）
2. The UKADOC のサイト shall リンクの色（明るい表示の紺。白地に 8.31:1）、暗い表示の札の色、ヘッダの地の色を、C17 のために変えない
3. The site-look-list-markers shall この spec が作る札のほかの字（さくらスクリプトのタグ・環境変数、木のファイル名など、ほかの spec が作る字）の色を指定しない

### Requirement 5: 目印の付け方
**Objective:** As a doc_edit の開発者と ukadoc-spec のメンテナ, I want 目印が当てるべき段落と節にだけ、漏れも書きかけの字も無く付くこと, so that 見た目の指定が効く所を間違えず、ほかの組み立ての処理と原稿を傷めない

#### Acceptance Criteria
1. The site-look-list-markers shall まとめ頁の対応の段落・既定値の段落・注意書きの節のそれぞれに、1 つずつ目印を付け、目印の数がそれぞれの数（今は 1640・423・16。実装のときに数え直す）と合うようにする
2. The site-look-list-markers shall 対応の段落の形に合う部分の名前にだけ名前ごとの目印を付ける（「形に合う部分」の数え方で今は 2719 個。`SSP` 1606 で、ほかの名前の内訳は実装のときに数え直す）
3. If 段落の行がコードブロックの中にあるとき, the site-look-list-markers shall その行に目印を付けず、字を変えない
4. Where 頁が読み物の頁であるとき, the site-look-list-markers shall 目印を付けない
5. The site-look-list-markers shall build したサイトの全頁で、本文に目印の書きかけの字（`{: ` など）を漏らさない
6. The site-look-list-markers shall 目印の名前を、試作の `slp-` の接頭辞でなく、`site-look-list-items` の目印の名前の決まり（`bundle-<役>`）にそろえて決める
7. The site-look-list-markers shall 見出しの id・見出しの数の検査・リンクの書き換え・項目の間の区切りの線・サイトに置く生の Markdown 原稿（`_raw/`）を今のまま保ち、組み立ての処理の一覧の検査を通す

### Requirement 6: 明・暗の切り替えと印刷
**Objective:** As a 明・暗のどちらでも UKADOC を読むゴースト制作者, I want 箱と札が表示の切り替えにすぐ合い、印刷でも読めること, so that 見た目の直しのせいで読めない所が増えない（D16 ダークモード）

#### Acceptance Criteria
1. When 利用者が明るい表示と暗い表示を切り替えたとき, the UKADOC のサイト shall 頁を読み込み直さなくても、箱と札をそのときの表示の色に変える
2. If 暗い表示を選んだまま頁を印刷したとき, the UKADOC のサイト shall 箱と札を、明るい表示で印刷したときと同じ色で印刷する（暗い表示だけの色を白い紙に出さない。`site-look-list-items` の Requirement 6.6 と同じ考え）

### Requirement 7: 今のサイトの良いところを失わない
**Objective:** As a UKADOC を読むゴースト制作者, I want 検索・見出しへのリンク・狭い画面・コードのコピー・記述例の字が今のまま使えること, so that 見た目の直しのせいでほかの使い勝手が落ちない（`survey.md` の「失わないもの」。D16 は Requirement 1〜4・6 が受け持つ）

#### Acceptance Criteria
1. The UKADOC のサイト shall 札にした名前・箱に入れた注意書き・既定値の段落を、今と同じ字で検索で引けるようにし、検索の結果の語の強調を、札と箱の中でも明・暗の表示とも見せる（D15）
2. The UKADOC のサイト shall 箱に入れた注意書きの節の見出しの id、見出しの横のリンクの印（¶）、右の欄の目次を今のまま保つ（D17）
3. When 幅 375 の狭い画面でまとめ頁を見たとき, the UKADOC のサイト shall 頁の横幅を画面の幅に収める（`scrollWidth` と `innerWidth` が同じ 375。D18）
4. The UKADOC のサイト shall コードブロックのコピーのボタンを残し、ボタンでコピーされる字を今と変えない（D19）
5. The UKADOC のサイト shall 箱に入れた注意書きの節の `\`（`list/sakura-script` の「さくらスクリプトのエスケープ」の `\\` など）を、今と同じ字で見せる（D20）

### Requirement 8: 表示の確かめと記録
**Objective:** As a doc_edit の開発者, I want 変更が配られた頁に効いていることと、目標の画面との見比べ・数・対比が残っていること, so that 見落としなく単位の PR に出せ、後続の spec が同じ箱や札を使うときに測りを引ける

#### Acceptance Criteria
1. When 変更を確かめるとき, the site-look-list-markers shall ローカルのプレビュー（頁の道は `/ukadoc-spec/` から始まる）で配られた見た目の指定のファイルを開き、この spec の指定が入っていることを確かめる（サイトを作る処理の厳しい検査は、指定したファイルが無くても気づかないため）
2. The site-look-list-markers shall プレビューの頁の HTML を取ってきて、目印の数（Requirement 5.1・5.2。頁ごとの数を含む）、本文に漏れた書きかけの字が 0 であること、`<strong>既定値:</strong>` の段落で目印の付かないものが 0 であることを確かめて記録する
3. The site-look-list-markers shall 箱に入れる前と後で、注意書きの節を持つ頁（`list/sakura-script`・`list/propertysystem`）の見出しの id の並び・`a.headerlink`（¶）の数・右の欄の目次の項目の数が同じことを確かめて記録する
4. The site-look-list-markers shall 変更の後の画面を、目標の画面と同じ頁・同じ位置・同じ大きさ（幅 1000・高さ 700）で明・暗の両方で撮り、この spec の 4 つの候補の部分を見比べた結果を記録する（C04 は `list/sakura-script` の `#notes_escape`、C06・C17 は同じ頁の `#bang-lock-repaint`、C07 は `descript/ghost` の `#charset`）
5. The site-look-list-markers shall 目標の画面に写っていないもの ― `CROW` の札と、段が `h4` の注意書きの箱（`list/propertysystem`）― を明・暗で撮って確かめ、記録する
6. The site-look-list-markers shall 箱・札の字とリンクと地の対比（Requirement 1.6・1.7・2.6・3.2・3.4・4.1）を明・暗で測って記録する。テーマの色の変数で出せない色（札の名前ごとの色など）は、その色と、明・暗それぞれの対比を記録する
7. The site-look-list-markers shall 形に合わないため札にならない対応の部分を数え、その種類と行の数を記録する
8. If 撮った画面に、撮る途中の描き直しで二重に重なった跡（上の端以外の左右の端に、ヘッダの色の行が出ている）があるとき, the site-look-list-markers shall その画面を撮り直す
9. When 開発者に画面を見せるとき, the site-look-list-markers shall 古い写しが残らないよう、ブラウザでの強制の再読み込み（Ctrl+F5）を頼む

### Requirement 9: 変更の範囲と PR の単位
**Objective:** As a ukadoc-spec のメンテナ, I want 小さく、目印と見た目の指定に限った変更を、単位の PR でまとめて受け取ること, so that 他者も使う公開リポジトリでもレビューしやすい

#### Acceptance Criteria
1. The site-look-list-markers shall ukadoc-spec の中で `scripts/prepare_site.py` と `assets/extra.css` だけを変え、原稿（`.md`）・`.nav.yml`・`mkdocs.yml`・`requirements.txt`・Zensical の版を変えない
2. The site-look-list-markers shall `assets/extra.css` のこの spec の指定を、ファイルの末尾に塊として足し、塊ごとの注を `/* site-look-list-markers: <何の指定か> */` の短い 1 行にとどめる（説明・測りの数・わけは spec の記録に書く）
3. The site-look-list-markers shall 変更を、この spec の作業木 `.worktrees/site-look-list-markers/`（ブランチ `site-look-list-markers`）で、`site-look-list-items` の PR がマージされた後の ukadoc-spec の `origin/main` の上に書く
4. The site-look-list-markers shall この spec の完了の前に、Build Gate（`prepare_site.py` と `zensical build --strict` が、どちらも失敗なく終わる）と規約 Gate を通す
5. The site-look-list-markers shall この spec の完了で、この spec だけの PR を作ってスクワッシュマージする（原則 1 spec = 1 PR。開発者の指示、2026-10-25。PR の説明は brief の「続きの PR の説明」に従い、一連の PR の並びは PR を出すときの roadmap による）。この spec の PR だけを入れるとサイトが壊れると分かったときは、PR を出さずに溜め、開発者に報告する
6. If 作業の途中に、ukadoc-spec の `origin/main` が同じ `assets/extra.css`・`scripts/prepare_site.py` を変えて進み、変更とぶつかったとき, the site-look-list-markers shall `origin/main` に追いつき、この spec の指定と、ほかの spec が入れた指定の両方が残るようにする
7. The site-look-list-markers shall 旧サイトの見た目の指定・画像・スクリプトや試作の指定を写さず、本番の書き方で書き直す（試作の指定は `html[data-slp~="Cxx"]` の下の使い捨ての書き方である）
