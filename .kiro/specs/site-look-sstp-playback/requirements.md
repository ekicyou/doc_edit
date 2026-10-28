# Requirements Document

## Project Description (Input)
- **誰が困っているか**: UKADOC の公開サイト（https://ukatech.shillest.net/ukadoc-spec/ ）で、さくらスクリプトの記述例・プロパティシステム・SHIORI Event を読みながら、手元の SSP とゴーストで試したいゴースト制作者
- **いまの状況**: 旧サイトでは、記述例を「読み込み」の後に「実行」で手元のゴーストへ送り、その場で試せた（`sakura_player.js`。`survey.md` の D04）。今のサイトにはこの仕掛けが無く、記述例をコピーして自分で送るしかない。開発者は、送信をプロパティシステムや SHIORI Event にも広げて欲しいと求めた（「さくらスクリプトの送信、プロパティシステムや SHIORI EVENT でも対応して欲しい」、2026-10-25）
- **何を変えるか**: `site-look-plan` で「採る」と決まった C13 を入れる。さくらスクリプトの記述例の「実行」・プロパティシステムの項目の「値を見る」・SHIORI Event の項目の「発生させる」から、利用者の操作を起点に、選んだ手元のゴーストへ送れるようにする。頁を開いただけでは何も読み込まず、何も送らない（詳細は `brief.md`）

## Introduction
この spec は、UKADOC のサイトの 3 つの頁（`list/sakura-script`・`list/propertysystem`・`list/shiori-event`）に、手元のベースウェア（SSP）で起動中のゴーストへ送るボタンを足す。`site-look-plan` の `decisions.md` で「採る」と決まった C13（広げる案を含む）で、方向は議論し直さない。決めるのは、brief の Approach の論点（利用者の操作を起点にすること・外部の読み込みの扱い・送る中身の説明・SHIORI Event の線引き・確かめ方）だけである。

変えるのは ukadoc-spec の `assets/`（送る仕掛けと見た目の指定）・`mkdocs.yml`・要るならテンプレートの上書きで、原稿（`.md`）・`.nav.yml`・Zensical の版は変えない。ukadoc-spec を変えるので、作業木 `.worktrees/site-look-sstp-playback/` で書き、Build Gate と規約 Gate を通し、`/kiro-complete` で PR にする。

**brief の後に変わった前提**（2026-10-27、メンテナのコミット `d01f9eb`・`b1abe20`・`1080225`。今の ukadoc-spec の `origin/main` は `8a7d8da`）: 記述例の色付けはブラウザの仕掛け（`assets/sakurascript.js`）から Pygments のレキサー（`site_ext/`）に移り、`extra_javascript` は外れた。名前と説明の表も Markdown 拡張が作る。ukadoc-spec の `CLAUDE.md` は「見た目のための構造は、Zensical のカスタマイズの方法（`extra_css`、Markdown 拡張、Pygments）に載せている。JavaScript は使わない」と書く。手元のゴーストへ送るには、利用者のブラウザで動く仕掛けがどうしても要る（ビルドの処理では送れない）。roadmap は「始める前にメンテナと話して決める」としている。この spec は、前もって了承を取らずに PR を出してメンテナの判断に委ね、マージはしない（開発者の判断、2026-10-28。Requirement 9.1・9.8）。

本文の主語は 2 つある。「UKADOC のサイト」は、この spec の変更を入れた後の公開サイト（とそのプレビュー）の見え方と振る舞いを指す。「site-look-sstp-playback」は、この spec の作業（ukadoc-spec への変更・確かめ・記録）を指す。

言葉の決まり（この文書の中で。数は ukadoc-spec `8a7d8da` を手元の写しで build した HTML で数えた見込みで、実装のときに build の HTML で数え直す）:
- **送る先の頁**: `list/sakura-script`・`list/propertysystem`・`list/shiori-event` の 3 頁。ほかの頁（`list/shiori-event-ex`・`list/plugin-event`・`spec/plugin` など）は含まない
- **手元のベースウェア**: 利用者の PC で動いている SSP（SSTP を HTTP で受けるもの）
- **選んだゴースト**: 「読み込み」で取った起動中のゴーストの一覧から、利用者が選んだ 1 体
- **送るボタン**: 記述例の「実行」・プロパティの「値を見る」・イベントの「発生させる」の 3 種類
- **記述例**: `list/sakura-script` の、さくらスクリプトの言語の印（`language-sakurascript`）の付いたコードブロック。今は 287 個。言語の印の無いもの・ほかの言語の印のもの（`language-text` の 1 個、SSTP の要求の例など）は含まない。旧サイトで `noplay` だった `\![vanishbymyself]` の 1 例は言語の印が無いので含まない
- **値を見られるプロパティ**: `list/propertysystem` の項目のうち、次のどちらかに当たるもの（**仮定**。OPEN QUESTION 4）
  - 名前に置き換える部分の無い項目（`system.year`・`baseware.version` など。今は 44 個。`developer.log.ログ種別.count` は置き換える部分を持つので含まない）
  - 名前に置き換える部分が `(キー)` だけで、項目の名前と説明の表にキーが並ぶ項目（`system.os`・`system.cpu`・`system.memory`・`system.power`・`system.network` の 5 項目、キーは 34 個）。キーごとに 1 つの名前（例: `system.cpu.name`）とする
- **発生させられるイベント**: `list/shiori-event` の項目のうち、名前が `On` で始まるもの（今は 283 個）から、除くイベントを引いたもの。`Reference一覧について` などの説明の項目と、`Notifyイベント` の `basewareversion` などの `On` で始まらない項目は含まない
- **除くイベント**: ゴーストの終わり・消滅・初回の系のイベント。`消滅イベント` の分類の 6 個（`OnVanishSelecting`・`OnVanishSelected`・`OnVanishCancel`・`OnVanishButtonHold`・`OnVanished`・`OnOtherGhostVanished`）と、`OnFirstBoot`・`OnClose`・`OnCloseAll`・`OnGhostChanging` の計 10 個（要件の話し合いで確定、2026-10-28）
- **危険なタグの説明**: 「ゴーストの削除などの危険なタグは、`OnUkadocScriptExample` に対応したゴーストでしか実行されない」旨の説明（旧サイトの「Target Ghost」の欄の説明と同じ趣旨。字は書き直す）

目標の画面（ボタンを足す先の見え方）は `.kiro/specs/completed/site-look-plan/screenshots/` の `mock-sakura-script-C21-*.png`（`#bang-lock-repaint`）・`mock-propertysystem-C23-*.png`（`[id="system.cpu"]`）・`mock-shiori-event-C23-*.png`（`#OnBoot`）の明・暗である。ボタンそのものの目標の画面は無い（試作していない）。

## Boundary Context
- **In scope**:
  - ゴーストを選ぶ欄と「読み込み」、読み込みの前後の見え方（Requirement 1）
  - 記述例の「実行」（Requirement 2）
  - プロパティの「値を見る」（Requirement 3）
  - イベントの「発生させる」と、除くイベント（Requirement 4）
  - 送った結果と失敗の見せ方（Requirement 5）
  - 危険なタグの説明（Requirement 6）
  - ボタンの見た目と、今のサイトの良いところを崩さないこと（Requirement 7）
  - 外部のコードの読み込みの扱いと素材の出どころ（Requirement 8）
  - 変える範囲・メンテナとの合意・PR の説明（Requirement 9）
  - 確かめ方と記録（Requirement 10）
- **Out of scope**:
  - 頁を開いたときの自動の読み込み・送信（しない）
  - 旧サイトの `sakura_player.js`・画像・見た目の指定の流用（書き直す）
  - 記述例の中身の直しと、言語の印の付け方（記述例の言語の印は Pygments の `pymdownx.highlight` の `pygments_lang_class` が付ける。C25 の `list/propertysystem` 5 個・`spec/plugin` 1 個の言語の印はバックログ）
  - 書き込み（`\![set,property,…]`）を送ること
  - 送る先の頁の外（`list/shiori-event-ex`・`list/plugin-event` など）のボタン
  - 原稿（`.md`）・`.nav.yml`・Zensical の版
  - ゴーストの側の対応（`OnUkadocScriptExample` を受けるゴーストの用意）
  - SSTP 以外の送り方、ベースウェアの設定の変更
  - 頁をまたいで選んだゴーストを覚えておくこと（頁ごとに「読み込み」を押す。要件の話し合いで確定、2026-10-28）
- **Adjacent expectations**:
  - 土台は ukadoc-spec の `origin/main`（今は `8a7d8da`。brief の土台の spec の PR #10〜#17 と、メンテナの `d01f9eb`・`b1abe20`・`1080225` が入ったもの）
  - 記述例の見分けは、Pygments のレキサーと `pymdownx.highlight` が付ける `language-sakurascript` に依る（`site-look-sakura-script-highlight` の後にメンテナが移したもの）。この spec はその印と、印の中の色付けの字を変えない
  - キーの名前は、`site_ext` の Markdown 拡張が作る名前と説明の表（`div.definition-table`。`site-look-definition-tables` の後にメンテナが移したもの）から取る。この spec は表の中身と見え方を変えない
  - 送った先で何が起きるか（ゴーストが喋るか、何もしないか、危険なタグを止めるか）は、手元のベースウェアとゴーストが決める。この spec は送る中身と送る先までを受け持つ
  - 同じ `assets/extra.css`・`mkdocs.yml` を触るほかの spec とぶつかったら、`origin/main` に追いつく

## Requirements

### Requirement 1: 読み込みとゴーストの選択
**Objective:** As a 手元の SSP で試したいゴースト制作者, I want 自分が「読み込み」を押したときだけ手元のゴーストの一覧が取られ、送る先を選べること, so that 頁を読むだけのときは何も起きず、試したいときだけ手元のゴーストにつながる

#### Acceptance Criteria
1. When 送る先の頁が開かれたとき, the UKADOC のサイト shall 頁の外（手元のベースウェアを含む）への読み込みと送信を 1 つも行わない
2. The UKADOC のサイト shall 送る先の頁にだけ、ゴーストを選ぶ欄と「読み込み」ボタンを 1 組表示し、ほかの頁には表示しない
3. While 「読み込み」が押されていないとき, the UKADOC のサイト shall 送るボタンを 1 つも表示しない
4. When 利用者が「読み込み」を押したとき, the UKADOC のサイト shall 手元のベースウェアから起動中のゴーストの一覧を取り、ゴーストの名前を選ぶ欄に並べる
5. When ゴーストの一覧を取れたとき, the UKADOC のサイト shall 一覧の最初のゴーストを選んだ状態にし、頁の送るボタンを表示する
6. If 手元のベースウェアが見つからないとき、または起動中のゴーストが 1 体も無いとき, the UKADOC のサイト shall 送るボタンを表示せず、ゴーストを選ぶ欄の近くに、見つからなかったことを短い文で表示する
7. When 利用者が「読み込み」をもう一度押したとき, the UKADOC のサイト shall ゴーストの一覧を取り直して選ぶ欄を置き換え、前に選んだゴーストが一覧に残っていればその選択を保つ
8. If ブラウザが手元のベースウェアへの接続の許可を利用者に求めたとき, the UKADOC のサイト shall その求めが「読み込み」を押した後にだけ起きるようにし、許されなかったときは 1.6 と同じく見つからなかったことを表示する

### Requirement 2: 記述例の「実行」
**Objective:** As a さくらスクリプトのタグを調べるゴースト制作者, I want 記述例ごとの「実行」で、その記述例をそのまま手元のゴーストに送れること, so that コピーして自分で送らずに、タグの振る舞いをその場で確かめられる

#### Acceptance Criteria
1. While 読み込みの後のとき, the UKADOC のサイト shall `list/sakura-script` の記述例（287 個）のそれぞれに「実行」ボタンを 1 つ表示する
2. The UKADOC のサイト shall 言語の印の無いコードブロック・ほかの言語の印のコードブロック・送る先の頁の外の記述例に「実行」ボタンを表示しない
3. When 利用者が記述例の「実行」を押したとき, the UKADOC のサイト shall その記述例の字を、選んだゴーストへ `OnUkadocScriptExample` のイベントとして SSTP で送る（スクリプトとしても同じ字を添える。旧サイトと同じ）
4. The UKADOC のサイト shall 送る字を、記述例に表示されている字と同じにする（`\` を `\` のまま送り、字を足したり直したりしない。コードブロックの末尾の改行だけは送らない）
5. If 記述例に誤りの印（閉じない `[` などの波線）が付いているとき, the UKADOC のサイト shall その記述例にも「実行」ボタンを表示し、直さずにそのまま送る（UKADOC の誤りは救済しない。今の誤りは 0 個）

### Requirement 3: プロパティの「値を見る」
**Objective:** As a プロパティシステムを調べるゴースト制作者, I want 項目ごとの「値を見る」で、手元のベースウェアのそのプロパティの今の値をゴーストに喋らせられること, so that 値の形と例を、自分の環境の実際の値で確かめられる

#### Acceptance Criteria
1. While 読み込みの後のとき, the UKADOC のサイト shall 値を見られるプロパティのうち、置き換える部分の無い項目（44 個）には項目の見出しの近くに、`(キー)` の項目（5 項目）には表のキーの行（34 個）ごとに、「値を見る」ボタンを 1 つずつ表示する
2. When 利用者が「値を見る」を押したとき, the UKADOC のサイト shall そのプロパティの名前を `%property[プロパティ名]` に埋めて喋らせるさくらスクリプト（例: `\0%property[system.cpu.name]\e`）を、選んだゴーストへ SSTP で送る
3. The UKADOC のサイト shall `(キー)` の項目のプロパティの名前を、項目の名前の `(キー)` を表のキーの名前に置き換えて組み立てる（例: `system.cpu.(キー)` と `name` から `system.cpu.name`）
4. The UKADOC のサイト shall 値を読むスクリプトだけを送り、プロパティを書き換えるタグ（`\![set,property,…]`）を送らない
5. If 項目の名前が `(キー)` 以外の置き換える部分（`(ID)`・`(名前)`・`(順位)`・`汎用プロパティ名`・`ログ種別` など）を持つとき, the UKADOC のサイト shall その項目に「値を見る」ボタンを表示しない（今は 109 個の項目。`汎用プロパティ名`・`サウンドプロパティ名` を含むもの 27、括弧の置き換える部分を持つもの 81、`developer.log.ログ種別.count` 1。**仮定**。OPEN QUESTION 4）
6. The UKADOC のサイト shall プロパティではない項目（`プロパティシステム` の概要・`補足`・`汎用プロパティ名`・`サウンドプロパティ名` の説明）に「値を見る」ボタンを表示しない
7. Where 書き込みのできるプロパティ（`[SET有効]` の印のあるもの）が値を見られるプロパティに当たるとき, the UKADOC のサイト shall ほかの項目と同じく、値を読むスクリプトだけを送る「値を見る」ボタンを表示する（**仮定**。OPEN QUESTION 3）

### Requirement 4: イベントの「発生させる」
**Objective:** As a SHIORI Event を調べるゴースト制作者, I want 項目ごとの「発生させる」で、そのイベントを手元のゴーストに送れること, so that 自分のゴーストがそのイベントにどう応えるかを、その場で確かめられる

#### Acceptance Criteria
1. While 読み込みの後のとき, the UKADOC のサイト shall 発生させられるイベント（今の案では 273 個）のそれぞれに、項目の見出しの近くに「発生させる」ボタンを 1 つ表示する
2. When 利用者が「発生させる」を押したとき, the UKADOC のサイト shall そのイベントの名前（例: `OnBoot`）を `Event` にした SSTP の `NOTIFY` を、選んだゴーストへ送る
3. The UKADOC のサイト shall 除くイベント（10 個）に「発生させる」ボタンを表示しない
4. The UKADOC のサイト shall `Reference` を付けずにイベントを送る（Reference の表は値の説明で、送れる値の例を持たないため）
5. The UKADOC のサイト shall `On` で始まらない項目（説明の項目・`Notifyイベント` の `basewareversion` など）に「発生させる」ボタンを表示しない

### Requirement 5: 送った結果と失敗
**Objective:** As a 送るボタンを押したゴースト制作者, I want 送れたかどうかが分かり、失敗しても頁が使えなくならないこと, so that 何も起きないときに、送れなかったのかゴーストが応えなかったのかを見分けられる

#### Acceptance Criteria
1. When 送るボタンが押されたとき, the UKADOC のサイト shall 押されたボタン 1 つにつき 1 回だけ、選んだゴースト 1 体だけに送り、ほかのゴーストに送らない
2. If 送信に失敗したとき（手元のベースウェアが止まった・選んだゴーストが終わった・ベースウェアが断った）, the UKADOC のサイト shall 押したボタンの近くに失敗したことを短い文で表示し、ダイアログで頁の操作を止めない
3. If 送信に失敗したとき, the UKADOC のサイト shall 自動で送り直さない
4. When 送信が手元のベースウェアに受け付けられたとき, the UKADOC のサイト shall 押したボタンの近くに受け付けられたことを短く表示する（ゴーストが応えたかどうかは表示しない）
5. While 1 つの送信が終わっていないとき, the UKADOC のサイト shall 同じボタンの二度押しで重ねて送らない

### Requirement 6: 危険なタグの説明
**Objective:** As a 初めて送るボタンを使うゴースト制作者, I want 送る前に、危険なタグがどう扱われるかを読めること, so that ゴーストの削除などの記述例を送っても、自分のゴーストが壊れないかを判断できる

#### Acceptance Criteria
1. The UKADOC のサイト shall 危険なタグの説明を、ゴーストを選ぶ欄と「読み込み」ボタンのすぐ近くに、読み込みの前から表示する
2. The UKADOC のサイト shall 危険なタグの説明を、送る先の頁ごとに 1 か所だけ表示し、ボタンごとに繰り返さない
3. The UKADOC のサイト shall 危険なタグの説明の字を、旧サイトの字を写さずに書き直し、ukadoc-spec の文体（だ/である調）にする

### Requirement 7: 見た目と失わないもの
**Objective:** As a 明・暗のどちらでも、広い画面でも狭い画面でも UKADOC を読むゴースト制作者, I want ボタンが読めて、今のサイトの読みやすさを崩さないこと, so that ボタンがあっても記述例・表・見出しを今までどおりに読み、コピーし、探せる

#### Acceptance Criteria
1. The UKADOC のサイト shall ゴーストを選ぶ欄・「読み込み」・送るボタン・説明・結果の表示を、明るい表示とダークモードの両方で、地との対比 4.5:1 以上で表示する（色はテーマの色の変数から取る）
2. The UKADOC のサイト shall 目標の画面の当て先（`#bang-lock-repaint`・`[id="system.cpu"]`・`#OnBoot`）で、ボタンを足した後も、記述例の箱・名前と説明の表・項目名の帯・対応の札の見え方を崩さない
3. The UKADOC のサイト shall 記述例のコードブロックの中に字や部品を足さず、右上のコピーのボタンを隠さず、コピーされる字を変えない（D19）
4. The UKADOC のサイト shall 記述例の `\` を `\` のまま表示する（D20）
5. The UKADOC のサイト shall 見出しの id・見出しへのリンク（¶）・右の欄の目次を変えない（D17）
6. The UKADOC のサイト shall ボタン・説明・結果の字をサイトの検索の結果に出さない（D15）
7. While 幅 375 px の画面のとき, the UKADOC のサイト shall 読み込みの前も後も頁の横幅を画面の幅に収め（`scrollWidth` = `innerWidth`）、ボタンが本文の字に重ならないようにする（D18）
8. The UKADOC のサイト shall 送るボタンを、キーボードで選んで押せ、何を送るボタンか（記述例・プロパティの名前・イベントの名前）が読み上げで分かるようにする

### Requirement 8: 外部のコードと素材
**Objective:** As a UKADOC のメンテナと読み手, I want 送る仕掛けが読み込むコードの出どころと版とライセンスがはっきりしていること, so that 公開サイトが知らないうちに変わったコードを読んだり、使ってよいか分からない素材を配ったりしない

#### Acceptance Criteria
1. The UKADOC のサイト shall 送る仕掛けが使う第三者のコード（使うなら jsstp）を、版を固定した形でだけ読み込み、版の固定されていない置き場所（最新版を指す URL など）から読まない
2. Where 第三者のコードを ukadoc-spec の外（CDN など）から読み込むとき, the UKADOC のサイト shall その読み込みを利用者が「読み込み」を押した後にだけ行う
3. Where 第三者のコードを ukadoc-spec の中に置くとき, the site-look-sstp-playback shall そのコードのライセンス（jsstp は WTFPL v2）と版と出どころを、ukadoc-spec の中で読める形で添え、ukadoc-spec の CC BY 4.0 の内容と区別できるようにする
4. The site-look-sstp-playback shall 旧サイトの `sakura_player.js`・画像・見た目の指定（`list.css`・`base.css`）を写さずに書き直す
5. The site-look-sstp-playback shall jsstp を読み込む方法（ukadoc-spec に置く・CDN から読む・使わずに送る仕掛けを自分で書く）を設計で決め、その理由を記録する

### Requirement 9: 変える範囲とメンテナとの合意
**Objective:** As a ukadoc-spec のメンテナ, I want 送る仕掛けが合意の上で、決まった場所にだけ足されること, so that 「JavaScript は使わない」とした見た目の分担を崩さずに、レビューしやすい小さな PR で受け取れる

#### Acceptance Criteria
1. The site-look-sstp-playback shall 送る仕掛けをブラウザで動かすことについて、前もってメンテナの了承を取らずに PR を出し、PR の説明で、ukadoc-spec の `CLAUDE.md` の「JavaScript は使わない」と違う仕掛けであること・何を足したか（自前のスクリプト・第三者のコードの有無・動く頁・頁を開いただけでは何もしないこと）を示して、受け入れるかどうかをメンテナの判断に委ねる（開発者の判断、2026-10-28）
2. The site-look-sstp-playback shall 原稿（`.md`）・`.nav.yml`・Zensical の版・`site_ext` の Markdown 拡張と Pygments のレキサーを変えない
3. The site-look-sstp-playback shall ukadoc-spec の `CLAUDE.md` の「GitHub Pages」の節に、送る仕掛けの役割と、それが見た目のための構造ではないことを短く書き足す（メンテナが PR で受け入れるかを判断する）
4. The site-look-sstp-playback shall Build Gate（`python scripts/prepare_site.py` と `zensical build --strict` がどちらも exit 0）と規約 Gate を通してから PR にする
5. The site-look-sstp-playback shall PR の説明に、この PR が UKADOC の見た目を旧サイト並みの見やすさに近づける一連の PR の最後の 1 本であり、これで一連が終わること、出し済みの PR の番号、この PR だけで完結してマージしてよいことを書く
6. The site-look-sstp-playback shall 3 種類の送るボタンを 1 つの PR にするか分けるかを設計で決める
7. If 設計か実装の確かめで、ある種類の送るボタンが手元のベースウェアに断られる（リモートの要求の扱いで `%property` が展開されない・`NOTIFY` がゴーストに届かないなど）と分かったとき, the site-look-sstp-playback shall その種類のボタンだけを外し、理由と確かめた結果を記録して、残りの種類で進める（要件の話し合いで確定、2026-10-28）
8. When 開発者が「実装完了を承認」したとき, the site-look-sstp-playback shall `/kiro-complete` で ukadoc-spec に PR を出すところまでで止め、マージしない（spec.json の `ukadoc_spec.state` は `"OPEN"`。メンテナがマージした後に `/kiro-complete site-look-sstp-playback` を再実行して後始末する。開発者の判断、2026-10-28）

### Requirement 10: 確かめ方と記録
**Objective:** As a spec の完了を承認する開発者, I want 送らない自動の確かめと、手元の SSP で押して確かめた記録がそろっていること, so that 公開サイトで勝手に送らないことと、押せば送れることの両方を根拠を持って判断できる

#### Acceptance Criteria
1. The site-look-sstp-playback shall 自動の確かめ（ビルド・画面の撮影・数え上げ）では送るボタンを押さず、手元のベースウェアへ送らない
2. The site-look-sstp-playback shall `zensical serve` の 3 頁を開いた時点のブラウザの通信の記録で、頁の外への読み込みと手元のベースウェアへの通信が 0 件であることを確かめて記録する
3. The site-look-sstp-playback shall 送るボタンの数（記述例 287・置き換える部分の無いプロパティ 44・キー 34・イベント 273 の見込み）を build の HTML から数え直し、要件の数との差を記録する
4. The site-look-sstp-playback shall 目標の画面と同じ当て先とセレクタで、読み込みの前と後の明・暗の画面を撮り、目標の画面と並べて記録する（読み込みの後の画面は、手元のベースウェアにつながずにボタンを出した状態で撮る方法を設計で決める）
5. The site-look-sstp-playback shall 幅 375 px で 3 頁の `scrollWidth` と `innerWidth` が同じであることを測って記録する
6. The site-look-sstp-playback shall 送信の確かめを、SSP の動く手元の環境で開発者がボタンを押して行う手順（用意するベースウェアとゴースト・押すボタン・見るもの）として書き、その結果（3 種類のボタンそれぞれで、ゴーストに届いたか、ベースウェアが断ったか）を記録する
