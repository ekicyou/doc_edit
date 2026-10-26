# Requirements Document

## Project Description (Input)
- **誰が困っているか**: UKADOC の公開サイト（https://ukatech.shillest.net/ukadoc-spec/ ）で、プロパティシステムのキー・SHIORI Event の `Reference0` など・さくらスクリプトのオプションの一覧を読むゴースト制作者
- **いまの状況**: 「`- **名前**: 説明`」の箇条書きは、名前が説明の文の頭に埋もれ、名前を縦に追いにくい。旧サイトの 2 列の表（`survey.md` の D10）より読みにくい。開発者は「表デザインに変えた方がよさそうなパターンが他にも存在する。これは、Markdownはいじらず、対応するパターンが出てきたら表htmlにする方針の方がよいかもしれない。」と方針を示した
- **何を変えるか**: `site-look-plan` で「採る」と決まった C23 を、原稿を変えずに組み立ての処理で入れる。「`- **名前**: 説明`」だけが 2 つ以上並ぶ箇条書きを、どの頁でも「名前」「説明」の 2 列の表にする（詳細は `brief.md`）

## Introduction
この spec は、UKADOC のサイトで「`- **名前**: 説明`」だけが 2 つ以上並ぶ箇条書きを、「名前」「説明」の 2 列の表で見せ、名前を縦に追えるようにする。`site-look-plan` の `decisions.md` で「採る」と決まった C23 を、開発者の方針「Markdownはいじらず、対応するパターンが出てきたら表htmlにする」に従い、原稿を変えずに組み立ての処理で入れる。方向は決まっているので、ここでは議論し直さない。

変えるのは、組み立ての処理（`scripts/prepare_site.py` か、自作の Markdown 拡張と `mkdocs.yml`。どちらにするかは設計で決める）と、表の見た目の指定（`assets/extra.css`）で、原稿は変えない。ukadoc-spec を変えるので、この spec の作業木 `.worktrees/site-look-definition-tables/`（ブランチ `site-look-definition-tables`）で、依存先の `site-look-manual-files` の PR（#15、マージのコミット `f54423d`）が入った ukadoc-spec の `origin/main` の上に書き、Build Gate と規約 Gate を通す。PR は原則 1 spec = 1 PR なので（開発者の指示、2026-10-25。brief の「PR の単位の改め」）、この spec の完了で自分の PR を作ってスクワッシュマージする。

要件の話し合い（2026-10-26）で、開発者の原則「「ReferenceN」形式は 1 要素だけだったとしても例外なく表になるべき」「無意味な空行は修正対象」により、`ReferenceN` の箇条書きの扱いを広げ、意味の無い空行で分かれた原稿の直しと、空行の書き方の決まりを ukadoc-spec の `CLAUDE.md` に足すことを、この spec に入れた（Requirement 1.3・1.4・1.9・1.10、Requirement 7）。

本文の主語は 2 つある。「UKADOC のサイト」は、この spec の変更を入れた後の公開サイト（とそのプレビュー）の見え方を指す。「site-look-definition-tables」は、この spec の作業（ukadoc-spec への変更・確かめ・記録）を指す。

言葉の決まり（この文書の中で。数は ukadoc-spec `f54423d` を手元の写しで build した 40 頁の HTML を、試作 `mockup.js` の C23 と同じ判定で数えた見込みで、実装のときに build の HTML で数え直す。`_site_src/` の `.md` を行で数えても頁ごとに同じ数になった。`research.md`）:
- **名前と説明の箇条書き**: 次のすべてに当たる箇条書き。今は 20 頁に 477 個（2105 項目）
  - どの項目も、頭が太字の名前で、名前の直後が「`: `」（コロンと空白か改行）で、その後ろが説明である
  - どの項目も、入れ子の箇条書き・コードブロック・2 つ以上の段落を含まない（`<br />` で行を分けた 1 つの段落は含んでよい）
  - 項目が 2 つ以上ある
  - 頁ごとの数: `list/shiori-event` 217・`list/shiori-event-ex` 124・`spec/saori-ex` 45・`list/sakura-script` 22・`spec/sstp` 10・`list/propertysystem` 9・`list/plugin-event` 8・`descript/shell` 7・`spec/shiori3` 7・`spec/headline` 5・`descript/shell-surfaces` 4・`list/shiori-resource` 4・`spec/update-file` 4・`descript/install` 3・`descript/ghost` 2・`spec/fmo-mutex` 2・`descript/plugin` 1・`dev/nar` 1・`spec/plugin` 1・`spec/web` 1
  - 置き場所: 本文の一番外 458、注意書きの箱（`div.bundle-notes`）の中 6（`list/sakura-script`）、注記の箱（admonition）の中 1（`dev/nar`）、ほかの箇条書きの項目の中 12（`spec/shiori3` の 7 個のすべて ―`メソッド`・`SenderType`・`SecurityLevel`・`Status`・`ステータスコード`・`ErrorLevel` の値の一覧―、`spec/update-file` 3、`spec/fmo-mutex` 1、`list/shiori-event` 1）
  - 中身: 説明に `<br />` の改行を持つ項目 225、説明にリンクを持つ項目 159、説明に `code` を持つ項目 202、名前にリンクを持つ項目 6、名前に `code` を持つ項目 7。対応のベースウェアの札（`site-look-list-markers`）を持つ項目は 0。いちばん長い名前は 83 字（`list/sakura-script` の `--content-type=(multipart/form-data | application/x-www-form-urlencoded | そのほか任意指定)`）
- **Reference の箇条書き**: `list/` の頁（`list/shiori-event`・`list/shiori-event-ex`・`list/plugin-event`・`list/shiori-resource`）にあり、どの項目も頭が太字の名前で、名前が `Reference` に数字か `*` が続く形（後ろに `～` か `～23` のような番号が付いてもよい）で、名前の直後が「`: `」の箇条書き。項目の数は問わない。今は、名前と説明の箇条書きに当たらない 1 項目のものが 181 個（`list/shiori-event` 88・`list/shiori-event-ex` 83・`list/plugin-event` 9・`list/shiori-resource` 1。うち入れ子の箇条書きを持つもの 10）。Requirement 7 の原稿の直しで、このうち 33 個が 6 個にまとまる見込み（数は実装で build の HTML で数え直す）
- **意味のある空行・意味の無い空行**: 頭が太字の名前の箇条書きが空行だけを挟んで並ぶとき、その空行で箇条書き（と表）が分かれる。後ろの箇条書きの最初の `Reference` の番号が前の箇条書きの最後の番号以下に戻る（`Reference1` から振り直す）ものを意味のある空行（`Reference0`・`Reference1` の値によって後に続く `Reference` の出方が変わる、値ごとのまとまり）、番号が続くものを意味の無い空行と呼ぶ。今は意味のある空行が 27 か所（`list/shiori-event-ex` の `OnPoker` 1・`OnPokerNotify` 8・`OnMahjong` 15・`OnMahjongResponse` 3）、意味の無い空行が `list/` の頁の 6 項目（Requirement 7.1）
- **名前と説明の表**: 名前と説明の箇条書きと Reference の箇条書きを置き換えて見せる、見出しの行が「名前」「説明」の 2 列の表。1 項目が 1 行になる
- **外す形**: 名前と説明の箇条書きに当たらない箇条書き。今の主なもの:
  - 1 項目だけで、形は合う箇条書き 216 個（`list/shiori-event` 83・`list/shiori-event-ex` 81・`spec/shiori3` 18 など）。このうち `list/` の頁の Reference の箇条書き 171 個は、Requirement 1.10 で表にする（外すのは残りの 45 個。`Reference` でない名前の 42 個と、`spec/shiori3` のヘッダの一覧の中の `Reference` 3 個）
  - 頭が太字で 1 項目だけの、入れ子の箇条書きを持つもの 23・コードブロックを持つもの 4（`list/propertysystem` の `%property[プロパティ名]` など）・2 つ以上の段落を持つもの 8（トップの頁の「ukadocの見方」など）
  - 名前の後ろが「`: `」でないもの（`spec/saori-ex` の「`**必ず守ること（MUST）：**`」など 5 項目の箇条書き 1 個、`descript/shell-surfaces` の「`**列挙指定「,」**:`」の直後に改行の印が続くものなど）
  - manual の頁のファイルの箇条書き（`site-look-manual-files` の C14・C22 の当て先。組み立ての処理が名前の後ろの「`: `」を外しており、原稿でも 1 項目ずつ別の箇条書きなので、今は 0 個が当たる）
  - 形の合う項目と合わない項目が混じる 2 項目以上の箇条書きは、今は 0 個

目標の画面は `.kiro/specs/completed/site-look-plan/screenshots/` の `mock-propertysystem-C23-*.png`（`[id="system.cpu"]` のキーの表）・`mock-sakura-script-C23-*.png`（`#bang-set-wallpaper` のオプションの表）・`mock-shiori-event-C23-*.png`（`#OnBoot` の `Reference0` などの表）の明・暗である。見比べは `mock-shiori-event-C23before-*.png`・`mock-propertysystem-base-*.png`。目標の画面にはほかの候補も入っているので、見比べるのは表の部分だけである。`mock-sakura-script-C23-*.png` はヘッダが上に 14 px ほど切れて写っているが、表の見え方には関わらない。

## Boundary Context
- **In scope**:
  - 名前と説明の箇条書きの見分けと、外す形を今のまま残すこと（Requirement 1）
  - 名前と説明の表の中身（Requirement 2）
  - 表の見た目と、明・暗・印刷・狭い画面での読みやすさ（Requirement 3）
  - 今のサイトの良いところ（`survey.md` の「失わないもの」）と、ほかの spec の目印を崩さないこと（Requirement 4）
  - 数え上げ・明・暗の画面・375 px の確かめと記録、`spec/shiori3` の C16 のための記録（Requirement 5）
  - `list/` の頁の意味の無い空行の原稿の直しと、ukadoc-spec の `CLAUDE.md` の空行の決まり（Requirement 7）
- **Out of scope**:
  - 原稿を Markdown の表に書き換えること（開発者の方針で採らない）
  - `spec/shiori3` のヘッダの値を列にそろえる見え方（C16。保留で roadmap のバックログ）。この spec は、その材料の記録だけをする
  - 定義の並び（`def_list`）の拡張を足すこと
  - 表の形をしていないほかの箇条書きの見え方、原稿に Markdown で書かれた表の見え方
  - `manual/` のファイルの箇条書きの見え方（`site-look-manual-files` の当て先）
  - 原稿（`.md`）・`.nav.yml`・Zensical の版。外す形に当たる原稿の書き方を直すこと（Requirement 7 の `list/` の頁の `ReferenceN` の 7 ファイルと、ukadoc-spec の `CLAUDE.md` の空行の決まりだけは直す）
  - `spec/shiori3`・`spec/sstp` のヘッダの一覧の中の `Reference0` などと、`list/sakura-script` の `notes_selectfile` のように、項目ごとに空行で分けて書いたほかの名前の一覧の空行（ヘッダの一覧は C16 の当て先で、`Reference` の箇条書きの扱いは `list/` の頁に限る）
- **Adjacent expectations**:
  - 土台は ukadoc-spec の `origin/main`（今は `f54423d`。`site-look-dark-link-color`（#10）・`site-look-list-items`（#11）・`site-look-list-markers`（#12）・`site-look-sakura-script-highlight`（#13）・`site-look-note-icon`（#14）・`site-look-manual-files`（#15）が入ったもの）
  - `site-look-manual-files` は、manual の頁のファイルの箇条書きの名前に目印を付け、名前の後ろの「`: `」を外す。この spec は、その目印の付いた項目を表にしない
  - `site-look-list-markers` は、まとめ頁の対応・既定値の段落と注意書きの節に目印を付ける。この spec は、その目印の数（対応 1640・既定値 423・注意書き 16・札 2719）と漏れ 0 を変えない（その spec の design.md の Revalidation Triggers）
  - `site-look-sstp-playback` は、`list/propertysystem` の表のキーごとに、`(キー)`・`(ID)` を含むプロパティの名前を組み立てる。この spec は、名前と説明の表を、原稿に書かれたほかの表と見分けられる形で出し、名前の字を変えない
  - `site-look-top-page` は、トップの頁の「ukadocの見方」の箇条書きに帯を付ける。その箇条書きは 2 つの段落を持つ項目なので外す形に当たり、この spec は表にしない
  - 目標の画面・試作・測りは `site-look-plan`（`.kiro/specs/completed/site-look-plan/`）のものを読むだけで、書き換えない

## Requirements

### Requirement 1: 表にする箇条書きの見分け
**Objective:** As a UKADOC の一覧を読むゴースト制作者, I want 「`- **名前**: 説明`」だけが並ぶ箇条書きが、どの頁でも同じ決まりで表になること, so that 頁ごとに見え方がばらつかず、名前を縦に追える

#### Acceptance Criteria
1. The UKADOC のサイト shall 名前と説明の箇条書きを、頁の種類・頁の名前・項目の名前を問わず、形だけで見分けて名前と説明の表で表示する（今は 20 頁に 477 個。Reference の箇条書きは Requirement 1.10 で `list/` の頁に限って足す）
2. The site-look-definition-tables shall 原稿のファイル（`.md`）・`.nav.yml` を書き換えずに、サイトを組み立てる処理の中で名前と説明の表を作る
3. If 箇条書きの項目が 1 つだけで、Reference の箇条書きでないとき, the UKADOC のサイト shall その箇条書きを今のままの見え方で表示する（1 行だけの表は Reference の箇条書きのほかは作らない。今は形の合う 1 項目の箇条書きのうち、`Reference` でないものが 42 個）
4. If Reference の箇条書きでない箇条書きのどれか 1 つの項目でも、入れ子の箇条書き・コードブロック・2 つ以上の段落を含むとき, the UKADOC のサイト shall その箇条書きを今のままの見え方で表示する
5. If 箇条書きのどれか 1 つの項目でも、頭が太字の名前でないか、名前の直後が「`: `」でないとき（`spec/saori-ex` の「`**必ず守ること（MUST）：**`」の箇条書きなど）, the UKADOC のサイト shall その箇条書きを今のままの見え方で表示し、組み立ての処理は警告を出さない（形の近いものは見出しのような書き方で、誤りではない。要件の話し合いの議題 4、2026-10-26）
6. If 項目が manual の頁のファイルの箇条書き（`site-look-manual-files` の目印の付いたもの）のとき, the UKADOC のサイト shall その項目を表にせず、`site-look-manual-files` の帯と字下げの見え方のまま表示する
7. Where 名前と説明の箇条書きが、注意書きの箱（`list/sakura-script` の 6 個）・注記の箱（`dev/nar` の 1 個）の中にあるとき, the UKADOC のサイト shall 箱の中でも名前と説明の表で表示し、箱の見え方は変えない
8. Where 名前と説明の箇条書きが、ほかの箇条書きの項目の中にあるとき（今は 12 個。`spec/shiori3` の `メソッド` の値の一覧など）, the UKADOC のサイト shall 内側の名前と説明の箇条書きだけを表で表示し、外側の箇条書きは今のままの見え方で表示する（brief の 477 個はこの 12 個を含む数で、`spec/shiori3` の 7 個は C16 の記録の材料になる。要件の話し合いの議題 1、2026-10-26）
9. Where 箇条書きが空行で分かれているとき, the UKADOC のサイト shall 空行で分かれた箇条書きごとに別の表で表示し、組み立ての処理で空行をまたいで 1 つの表にまとめない（意味のある空行は値ごとのまとまりを別の表で示す。意味の無い空行は Requirement 7 で原稿を直す。`list/shiori-event-ex` の `OnMahjong` のサーバコマンドは 14 の表になり、`kyokuend`・`ryukyoku` も 1 行の表になる。要件の話し合いの議題 2、2026-10-26）
10. The UKADOC のサイト shall Reference の箇条書きを、項目が 1 つだけでも名前と説明の表で表示し、項目が入れ子の箇条書き・コードブロック・2 つ以上の段落を含むときは、それを説明の欄の中にそのまま入れて表示する（開発者の原則「「ReferenceN」形式は 1 要素だけだったとしても例外なく表になるべき」。入れ子の箇条書きが名前と説明の箇条書きなら、Requirement 1.8 のとおり説明の欄の中で表になる。要件の話し合いの議題 2、2026-10-26）

### Requirement 2: 表の中身
**Objective:** As a UKADOC の一覧を読むゴースト制作者, I want 表になっても名前と説明の字と並びが今と同じであること, so that 表にしたせいで仕様の中身が変わったり抜けたりしない

#### Acceptance Criteria
1. The UKADOC のサイト shall 名前と説明の表の見出しの行を「名前」「説明」の 2 列にする
2. The UKADOC のサイト shall 箇条書きの 1 項目を表の 1 行にし、行の並びを箇条書きの項目の並びと同じにする
3. The UKADOC のサイト shall 名前の列に、項目の頭の太字の名前を今と同じ字（太字・名前の中のリンク・`code`・`\`・`[2.8.08]` のような版の字を含む）で表示する
4. The UKADOC のサイト shall 説明の列に、名前の後ろの「`: `」を除いた説明を今と同じ字（説明の中のリンク・`code`・`<br />` の改行・強調を含む）で表示する
5. The UKADOC のサイト shall 名前と説明の表を、原稿に Markdown で書かれたほかの表と見分けられる形で出し、ほかの表の見え方を変えない（後続の `site-look-sstp-playback` がキーの表を見分けるため）
6. The UKADOC のサイト shall 表の中のリンクの飛び先を、箇条書きのときと同じにする（組み立ての処理のリンクの書き換えの後の飛び先）

### Requirement 3: 表の見た目
**Objective:** As a 明・暗のどちらでも、広い画面でも狭い画面でも UKADOC を読むゴースト制作者, I want 名前と説明の表がサイトのほかの表と同じ見た目で、詰めて読みやすく出ること, so that 名前を縦に追え、箇条書きより縦に長くなりすぎない

#### Acceptance Criteria
1. The UKADOC のサイト shall 名前と説明の表を、サイトのほかの表と同じ Material の表の見た目（枠・見出しの行・行の地）で表示する（目標の画面の表）
2. The UKADOC のサイト shall 名前と説明の表の行の上下の余白を、Material の表の既定より詰める（試作は `.45em .9em`。目標の画面と同じ詰め方）
3. The UKADOC のサイト shall 名前と説明の表の幅・字の大きさ・名前の列の太字を、目標の画面と同じにする（試作の指定のとおり、名前の列は太字、字の大きさは試作の `.75rem`、幅は Material の包みに任せて中身に合わせて本文の幅までとし、表ごとの幅はそろえない。目標の画面の `#OnBoot` の表は本文の幅より狭く、`#OnClose` の表は本文の幅いっぱいである。要件の話し合いの議題 3、2026-10-26）
4. While 画面の幅が広いとき（45em 以上）, the UKADOC のサイト shall 名前の列を折り返さずに表示する
5. While 画面の幅が狭いとき（45em 未満）, the UKADOC のサイト shall 名前の列も折り返して、表を画面の幅に収める
6. The UKADOC のサイト shall 名前と説明のどちらの列でも、空白の無い長い字（`system.os` の `x86,x64,arm,…`、`--content-type=(multipart/form-data | …)` など）を途中で折り返せるようにする
7. While 明・暗のどちらかの表示で見ているとき, the UKADOC のサイト shall 表の枠・地・字・リンクを、サイトのほかの表と同じ色で表示し、字とリンクを行の地（縞の地を含む）に対して 4.5:1 以上の対比で読めるようにする（D16）
8. When 利用者が明るい表示と暗い表示を切り替えたとき, the UKADOC のサイト shall 頁を読み込み直さなくても、表をそのときの表示の色に変える
9. If 暗い表示を選んだまま頁を印刷したとき, the UKADOC のサイト shall 表を、明るい表示で印刷したときと同じ色で印刷する（暗い表示だけの色を白い紙に出さない）
10. The site-look-definition-tables shall 表の見た目の色を、直書きせずにテーマの色の変数か Material の表の指定から取る（変数で出せない色を足すときは、その色と明・暗それぞれの地との対比を記録する）

### Requirement 4: 今のサイトの良いところとほかの目印を失わない
**Objective:** As a UKADOC を読むゴースト制作者と ukadoc-spec のメンテナ, I want 検索・見出しへのリンク・狭い画面・コードのコピー・記述例の字と、先に入った spec の目印が今のまま使えること, so that 表にしたせいでほかの使い勝手や見た目が落ちない（`survey.md` の「失わないもの」）

#### Acceptance Criteria
1. The UKADOC のサイト shall 表の中の名前と説明を、今と同じ字で検索で引けるようにする（外すのは名前の後ろの「`: `」だけ。D15）
2. When 検索の結果から表のある頁を開いたとき, the UKADOC のサイト shall 語の強調を、表の中でも明・暗の表示とも見せる（D15）
3. The UKADOC のサイト shall 頁の見出しの id・見出しの横のリンクの印（¶）・右の欄の目次を今のまま保つ（D17）
4. When 幅 375 の狭い画面で表のある 20 頁か `manual/ghost` を見たとき, the UKADOC のサイト shall 頁の横幅を画面の幅に収める（`scrollWidth` と `innerWidth` が同じ 375。D18）
5. The UKADOC のサイト shall コードブロックのコピーのボタンを残し、ボタンでコピーされる字を今と変えない（D19。名前と説明の表はコードブロックを含まない）
6. The UKADOC のサイト shall 名前と説明の中の `\` を、今と同じ字で見せる（`list/sakura-script` の `\![anim,add,overlay,…]` など。D20）
7. The UKADOC のサイト shall `site-look-list-markers` の目印（対応の段落 1640・既定値の段落 423・注意書きの包み 16・札 2719）と、本文に漏れた目印の書きかけの字 0 を今のまま保つ
8. The UKADOC のサイト shall `site-look-manual-files` の目印（manual の頁に 7 頁 73 個、外した「`: `」72 個）と、木のファイル名の色を今のまま保つ
9. The UKADOC のサイト shall `site-look-list-items` の項目名・分類の帯と項目の間の詰め、`site-look-note-icon` の注釈の絵、`site-look-sakura-script-highlight` の記述例の色を、表のある頁でも今のまま保つ
10. The site-look-definition-tables shall サイトに置く生の Markdown 原稿（`_raw/`）と `llms.txt` を今のまま保ち、組み立ての処理の一覧の検査・見出しの数の検査・リンクの書き換えを今のまま通す

### Requirement 5: 表示の確かめと記録
**Objective:** As a doc_edit の開発者と ukadoc-spec のメンテナ, I want 表になった箇条書きと外した形の数・目標の画面との見比べ・狭い画面の測りが残っていること, so that HTML の変わる量が大きくても見落としなく PR に出せ、レビューの人が見比べられる

#### Acceptance Criteria
1. When 変更を確かめるとき, the site-look-definition-tables shall ローカルのプレビュー（頁の道は `/ukadoc-spec/` から始まる）で配られた見た目の指定のファイルを開き、読めて（200）この spec の中身が入っていることを確かめる（サイトを作る処理の厳しい検査は、指定したファイルが無くても気づかないため）
2. The site-look-definition-tables shall build の全頁の HTML を取ってきて、名前と説明の表の数（名前と説明の箇条書きの見込みは 20 頁に 477 個・2105 行。これに Reference の箇条書きの表が加わり、Requirement 7 の直しの後で 477 + 181 − 33 + 6 = 631 個の見込み）を頁ごとに、名前と説明の箇条書きの表と Reference の箇条書きの表に分けて数え、上の見込みと合うかを記録する
3. The site-look-definition-tables shall 外す形のそれぞれ（Reference の箇条書きでない 1 項目だけ・入れ子の箇条書き・コードブロック・2 つ以上の段落・名前の後ろが「`: `」でない・manual の頁のファイルの箇条書き・`spec/shiori3` のヘッダの一覧の中の `Reference`）が表になっていないことを数えて、例とともに記録する
4. The site-look-definition-tables shall 変更の前と後で、全頁の見出しの id の並び・`a.headerlink`（¶）の数・右の欄の目次の項目の数が同じことと、表にした箇条書きの名前と説明の字（「`: `」を除く）が変更の前の箇条書きの字と同じことを確かめて記録する
5. The site-look-definition-tables shall 変更の後の画面を、目標の画面と同じ頁・同じ位置・同じ大きさで明・暗の両方で撮り（`list/propertysystem` の `[id="system.cpu"]`、`list/sakura-script` の `#bang-set-wallpaper`、`list/shiori-event` の `#OnBoot`）、表の部分を見比べた結果を記録する
6. The site-look-definition-tables shall 目標の画面に写っていないもの ― 箱の中の表（`list/sakura-script` の注意書きの箱、`dev/nar` の注記の箱）、箇条書きの項目の中の表（`spec/shiori3`）、名前にリンクや `code` のある表、長い名前の表 ― を明・暗で撮って確かめ、記録する
7. The site-look-definition-tables shall 表の字・リンクと行の地の対比（Requirement 3.7）を明・暗で測って記録する
8. When 幅 375 の狭い画面を確かめるとき, the site-look-definition-tables shall 表のある 20 頁と `manual/ghost` の `scrollWidth` と `innerWidth` を測って記録する（狭い画面の画面は残さない）
9. The site-look-definition-tables shall `spec/shiori3` の 7 個の表（どれもヘッダの項目の中の値の一覧）を見て、C16（ヘッダの値の名前を列にそろえる）をこの表で足りるとみなせそうかを、理由とともに記録する（roadmap のバックログの C16 の材料）
10. If 撮った画面に、撮る途中の描き直しで二重に重なった跡（上の端以外の左右の端に、ヘッダの色の行が出ている）があるとき, the site-look-definition-tables shall その画面を撮り直す
11. When 開発者に画面を見せるとき, the site-look-definition-tables shall 古い写しが残らないよう、ブラウザでの強制の再読み込み（Ctrl+F5）を頼む

### Requirement 6: 変更の範囲と PR
**Objective:** As a ukadoc-spec のメンテナ, I want 組み立ての処理と見た目の指定に限った、レビューしやすい変更を受け取ること, so that 他者も使う公開リポジトリでも、HTML の大きな変わりを見比べてマージできる

#### Acceptance Criteria
1. The site-look-definition-tables shall ukadoc-spec の中で、組み立ての処理（`scripts/prepare_site.py`、または自作の Markdown 拡張と `mkdocs.yml`）・`assets/extra.css`・Requirement 7 の原稿と `CLAUDE.md` だけを変え、ほかの原稿（`.md`）・`.nav.yml`・Zensical の版を変えない
2. The site-look-definition-tables shall `requirements.txt` を変えない。変えるときは、新しい依存として設計に理由を書く
3. The site-look-definition-tables shall `assets/extra.css` のこの spec の指定を、ファイルの末尾に塊として足し、塊ごとの注を `/* site-look-definition-tables: <何の指定か> */` の短い 1 行にとどめる（説明・測りの数・わけは spec の記録に書く）
4. The site-look-definition-tables shall 変更を、この spec の作業木 `.worktrees/site-look-definition-tables/`（ブランチ `site-look-definition-tables`）で、`site-look-manual-files` の PR（#15）がマージされた後の ukadoc-spec の `origin/main` の上に書く
5. The site-look-definition-tables shall この spec の完了の前に、Build Gate（`prepare_site.py` と `zensical build --strict` が、どちらも失敗なく終わる）と規約 Gate を通す
6. The site-look-definition-tables shall この spec の完了で、この spec だけの PR を作ってスクワッシュマージし、PR の本文に、表になる箇条書きの数え上げ（頁ごとの数）と外した形の例を書く。PR の説明は brief の「続きの PR の説明」に従い、一連の PR の並びは PR を出すときの roadmap による。この spec の PR だけを入れるとサイトが壊れると分かったときは、PR を出さずに溜め、開発者に報告する
7. If 作業の途中に、ukadoc-spec の `origin/main` が同じ `assets/extra.css`・`scripts/prepare_site.py`・`mkdocs.yml` を変えて進み、変更とぶつかったとき, the site-look-definition-tables shall `origin/main` に追いつき、この spec の指定と、ほかの spec が入れた指定の両方が残るようにする
8. The site-look-definition-tables shall 旧サイトの見た目の指定・画像・スクリプト（`list.css`・`base.css`・`sakura_player.js` など）や試作の指定・組み替え（`mockup.js` の C23、`html[data-slp~="C23"]` の下の指定）を写さず、本番の書き方で書き直す

### Requirement 7: 意味の無い空行の直しと空行の書き方の決まり
**Objective:** As a UKADOC の一覧を読むゴースト制作者と原稿を書く人, I want 番号の続く `Reference` が空行で 1 行ずつの表に割れず、空行の意味が書き方の決まりで分かること, so that 1 つの一覧が 1 つの表で読め、新しく書く原稿でも空行を正しく使える
#### Acceptance Criteria
1. The site-look-definition-tables shall `list/` の頁の意味の無い空行を、原稿の空行を除いて 1 つの箇条書きにつなぐ（入れ子の箇条書きの字下げは変えない）。今の当て先は次の 6 ファイル: `list/shiori-event/dialogbox/OnConfigurationDialogHelp.md`（`Reference0`〜`3`）・`list/shiori-event/file-drop/OnOtherObjectDropping.md`（`Reference0`〜`2`）・`list/shiori-event-ex/plugin-weather-station/OnWeatherStation.Astro.md`（`Reference0`〜`11`）・`list/shiori-event-ex/plugin-weather-station/OnWeatherStation.Forecast.Hourly.md`（`Reference0～23`・`Reference24`）・`list/shiori-event-ex/plugin-spectre/OnSpectrePlugin.Possession.md`（`Reference0`〜`1`）・`list/shiori-event-ex/app-music-player/OnMusicPlayer.SongInfo.md`（`Reference0`〜`9`）
2. The site-look-definition-tables shall `list/shiori-event/notify/rateofusegraph.md` の `1番目`〜`13番目` の箇条書きを、`Reference*` の項目の入れ子に直す（空行で分かれた親と子。直した後は、`Reference*` の行の説明の欄の中に `1番目`〜 の表が入る）
3. The site-look-definition-tables shall 意味のある空行（27 か所）を今のまま残す
4. The site-look-definition-tables shall ukadoc-spec の `CLAUDE.md` の「書式」に、空行の決まりを足す: 「`- **名前**: 説明`」の箇条書きはサイトで表になり、空行を挟むと別の表に分かれること。`Reference0` などの値によって後に続く `Reference` の出方が変わるときだけ、値ごとのまとまりを空行で分けること。それ以外では、入れ子の箇条書きがあっても項目の間に空行を入れないこと（言い回しは設計で決める）
5. The site-look-definition-tables shall 直した原稿の字（空行と字下げのほか）を変えず、直した頁の見出しの id・右の欄の目次を今のまま保つ
6. The site-look-definition-tables shall `list/` の頁の意味の無い空行が、直した後に 0 か所になることを build の HTML で数えて記録する

## 未決の問い（要件の話し合いで決める）
議題 1〜4 は決まった（2026-10-26。議題 1・3・4 は推奨案。議題 2 は開発者の原則で Requirement 1.9・1.10・Requirement 7）。
