# Requirements Document

## Project Description (Input)
- **誰が困っているか**: UKADOC の公開サイト（https://ukatech.shillest.net/ukadoc-spec/ ）で、さくらスクリプトの記述例を読むゴースト制作者
- **いまの状況**: 記述例のタグ（`\0`・`\s[10]`・`\![raise,…]`）と環境変数（`%username` など）が、地の文と同じ色の字で並び、タグと台詞の切れ目が読みにくい。開発者は試作を見て「別モニタでの視認だと厳しい。青は太字にしないとダメかも」「青系なのが目立たない根本原因かもしれない」と指摘し、色だけでなく太字と薄い地も求めた。原稿の ```` ```sakurascript ```` の言語の名前は、今のサイトの HTML に残らない
- **何を変えるか**: `site-look-plan` で「採る」と決まった C10（タグと環境変数に色）・C19（太字）・C20（タグを赤紫に）・C21（薄い地）と、明るい表示のタグ・環境変数の濃さ（`site-look-list-markers` の C17 から移した分）を、本番の書き方で ukadoc-spec に入れる。あわせて、省略形の ```` ```ss ```` を `sakurascript` のエイリアスとして受ける（詳細は `brief.md`）

## Introduction
この spec は、UKADOC のさくらスクリプトの記述例で、タグと環境変数を地の文からひと目で見分けられるようにする。`site-look-plan` の `decisions.md` で「採る」と決まった C10・C19・C20・C21 を、本番の書き方で ukadoc-spec に入れる。方向は決まっているので、ここでは議論し直さない。C25（さくらスクリプトの頁の外の 6 個の記述例）は原稿を変えるので外し、roadmap のバックログに移した（開発者の判断、2026-10-25）。

変えるのは、記述例に言語の印を残す Markdown 拡張の設定（`mkdocs.yml`）、印の付いたブロックのタグと環境変数を包むブラウザの仕掛け（`assets/` の自作のスクリプト）、その見た目の指定（`assets/extra.css`）、書式の決まり（`ukadoc-spec/CLAUDE.md`）への `ss` の書き足しで、原稿（`.md`）は変えない。ukadoc-spec を変えるので、この spec の作業木 `.worktrees/site-look-sakura-script-highlight/` で書き、Build Gate と規約 Gate を通す。PR は原則 1 spec = 1 PR なので（開発者の指示、2026-10-25）、この spec の完了で自分の PR を作ってスクワッシュマージする。

本文の主語は 2 つある。「UKADOC のサイト」は、この spec の変更を入れた後の公開サイト（とそのプレビュー）の見え方を指す。「site-look-sakura-script-highlight」は、この spec の作業（ukadoc-spec への変更・確かめ・記録）を指す。

言葉の決まり（この文書の中で）:
- **記述例のブロック**: 原稿のコードブロックのうち、言語の名前に `sakurascript` か、その省略形の `ss` を書いたもの。今は `sakurascript` が 287 個（どれも `list/sakura-script` のまとめ頁）、`ss` は 0 個（ukadoc-spec `0eb3fb9` で数えた。`research.md`）
- **言語の指定の無いブロック**: 言語の名前を書いていないコードブロック。今は 162 個（SSTP などの要求の例、ファイル構成の木、`list/propertysystem` の 5 個と `spec/plugin` の 1 個のさくらスクリプトの例（C25）、`list/sakura-script` の `\![vanishbymyself]` の 1 例など）。サイトのコードブロックは、記述例のブロックと合わせて 449 個
- **言語の印**: 頁の中で、コードブロックがさくらスクリプトの記述例だと見分けられる目印。後続の `site-look-sstp-playback` も、これで記述例を見分ける
- **タグ**・**環境変数**: 記述例のブロックの中で、Requirement 2 の規則でひとかたまりと見分けた字
- **地の文**: 記述例のブロックの中で、タグでも環境変数でもない字
- **記述例の箱**: `site-look-list-items` の C18 で、`h4` の直後のコードブロックに付けた箱。地は明るい表示 `#eef2f8`・暗い表示 `#1d2433`。今の記述例のブロック 287 個は、どれもこの箱の中にある（`## 記述例` の直後 254 個と、その後に続くもの 33 個）
- **薄い地**: C21 で、タグと環境変数の下に敷く、字の色を薄めた地

目標の画面は `.kiro/specs/completed/site-look-plan/screenshots/` の `mock-sakura-script-C10-*.png`・`mock-sakura-script-C19-*.png`・`mock-sakura-script-C20-*.png`・`mock-sakura-script-C21-*.png`（環境変数の明るい表示の濃さは `mock-sakura-script-C17-light.png`）の明・暗である。これらの画面には採ると決まったほかの候補（項目名の帯 C01、対応の札 C06、記述例の箱 C18 など）も入っているので、見比べるのは記述例のタグと環境変数の見え方だけである。最後の見え方は C21 の画面（赤紫の太字のタグに薄い地）で、C10・C19 の画面のタグの青は C20 が置き換える。環境変数は、目標の画面のどれにも写っていない。

## Boundary Context
- **In scope**:
  - 記述例のブロックへの言語の印（`ss` のエイリアスを含む。Requirement 1）
  - タグと環境変数を見分ける字句の規則（Requirement 2）
  - C10・C19・C20・C21 の見え方と、明るい表示のタグ・環境変数の濃さ（Requirement 3）
  - 明・暗の切り替え・印刷（Requirement 4）、字とコピーの保ちと、仕掛けが動かないときの見え方（Requirement 5）
  - 言語の印を付けるとコードブロック 449 個の HTML の形が変わることの確かめ（C09・C18・コピーのボタン・折り返し。Requirement 6）
  - `ukadoc-spec/CLAUDE.md` の書式の決まりへの `ss` の書き足し（Requirement 8）
  - 明・暗の画面と 375 px の確かめ、数と対比の測りの記録（Requirement 9）
- **Out of scope**:
  - 言語の指定の無いブロック 162 個への着色。C25 の 6 個（原稿に言語の名前を書き足す直し。roadmap のバックログ）、SSTP などの要求の例、`\![vanishbymyself]` の 1 例（1 行目が日本語）、`manual/` のファイル構成の木（`site-look-manual-files`）を含む
  - 記述例の再生のボタン（`site-look-sstp-playback`）
  - 等幅の字の指定の変更
  - さくらスクリプトの外の言語の着色（全言語の色付け）
  - 記述例の中身（タグの誤りなど）の直し
  - 原稿（`.md`）のすべて（今ある ```` ```sakurascript ```` を ```` ```ss ```` に書き換えることもしない）・`.nav.yml`・Zensical の版
  - ほかの spec が作る字の色（対応の札・木のファイル名）と、リンクの色
- **Adjacent expectations**:
  - 土台は ukadoc-spec の `origin/main`（今は `0eb3fb9`。`site-look-dark-link-color`（#10）・`site-look-list-items`（#11）・`site-look-list-markers`（#12）が入ったもの）。この spec は `site-look-plan` だけに依り、ほかの見た目の spec を待たない
  - `site-look-list-items` の C09（コピーのボタンの手前の折り返し）と C18（記述例の箱）は、言語の印を付けた後のコードブロックの HTML の形でも同じに見える書き方で入っている（その spec の `verification.md` の「着色の後の形」）。この spec はそれを確かめ直し、形を崩したら直す
  - `site-look-manual-files` は、言語の指定の無いブロックに仕掛けを当てる。この spec は、言語の指定の無いブロックの字と見え方を変えない
  - `site-look-sstp-playback` は、この spec の言語の印（```` ```ss ```` のブロックを含む）で記述例を見分ける
  - 「明るい表示の色付きの字は白地に 7:1 以上」の物差しは、`site-look-list-markers` の C17 と同じものを使う。この spec は自分の作るタグ・環境変数の字にだけ当てる
  - 目標の画面・試作・測りは `site-look-plan`（`.kiro/specs/completed/site-look-plan/`）のものを読むだけで、書き換えない

## Requirements

### Requirement 1: 記述例の言語の印と `ss` のエイリアス
**Objective:** As a さくらスクリプトの記述例を読むゴースト制作者, I want 記述例のブロックが頁の中でさくらスクリプトの例だと見分けられること, so that タグの見え方がすべての記述例に届き、後続の spec も同じ印で記述例を見分けられる

#### Acceptance Criteria
1. The UKADOC のサイト shall 言語の名前に `sakurascript` を書いた記述例のブロックのすべて（今は 287 個）に、言語の印を付ける
2. When 原稿のコードブロックの言語の名前が `ss` のとき, the UKADOC のサイト shall そのブロックに `sakurascript` のブロックと同じ言語の印を付け、Requirement 2〜5 の見え方を同じに当てる（開発者の答え「sakurascriptと、その省略形としてssをエイリアスにしてほしい」、2026-10-25）
3. If コードブロックの言語の名前が無いか、`sakurascript`・`ss` のどちらでもないとき, the UKADOC のサイト shall そのブロックに言語の印を付けず、タグ・環境変数の見え方を当てない（C25 の 6 個にも当てない）
4. Where 記述例のブロックがまとめ頁の外（読み物の頁）にあるとき, the UKADOC のサイト shall まとめ頁と同じ言語の印と見え方を当てる（今はまとめ頁の外に記述例のブロックは無い）

### Requirement 2: タグと環境変数の見分け（字句の規則）
**Objective:** As a さくらスクリプトの記述例を読むゴースト制作者, I want タグと環境変数が、さくらスクリプトの文法どおりのかたまりで見分けられること, so that `\p23` のような所でも、どこまでがタグでどこからが台詞かを読み違えない

#### Acceptance Criteria
1. The UKADOC のサイト shall 記述例のブロックの中で、`\` で始まるタグを、タグの名前と、名前のすぐ後の角括弧の引数 `[…]`（あれば）までをひとかたまりのタグとして見せる。タグの名前は、`\` の後の 1 字（`\0`・`\e`・`\n`・`\!` など）、`\_` と 1 字（`\_w`・`\_q` など）、`\__` と 1 字（`\__q` など）とする
2. When `\w`・`\b`・`\p` のすぐ後に数字が続くとき, the UKADOC のサイト shall 数字の 1 桁目までをタグの名前とし、2 桁目からの字を地の文として見せる（例: `\p23` は、タグ `\p2` と地の文の `3`。`\w9`・`\b2` は 3 字でタグ。名前のすぐ後に `[` があれば 2.1 のとおり引数までをタグにする）
3. When タグの引数の中に `\]` か、`"` で囲んだ字があるとき, the UKADOC のサイト shall その中の `]` で引数を終えず、対になる `]` までをひとかたまりのタグとして見せる（例: `\q[…]` の項目の記述例の `\q[その１,"script:\q[その２,script:その３はなし]"]` の全体）
4. If `\` のすぐ後が `\` か `%` のとき（エスケープの `\\`・`\%`）, the UKADOC のサイト shall その 2 字をタグにも環境変数にもせず、地の文として見せる（今の記述例のブロックには無い）
5. If タグの名前の後の `[` に対になる `]` がブロックの中に無いとき, the UKADOC のサイト shall タグの名前までをタグとして見せ、その後ろの字を地の文として見せる（［仮定 A3］。今の記述例のブロックには無い）
6. The UKADOC のサイト shall `%` で始まる環境変数 ― `%` と英字・数字・`_` の名前（`%username`・`%selfname2` など）、`%*`、`%m?`、`%property[…]` ― をひとかたまりの環境変数として見せる（形は `list/sakura-script` の環境変数の分類の項目名による）
7. If `%` の後が環境変数の名前の形でないとき（例: 地の文の `50%で`）, the UKADOC のサイト shall その `%` を地の文として見せる
8. The UKADOC のサイト shall タグの引数の中の `%…`（例: `\![raise,%username]`）を、タグのかたまりの一部として見せ、別の環境変数に分けない

### Requirement 3: タグと環境変数の見え方（C10・C19・C20・C21）
**Objective:** As a 明・暗のどちらの表示でも、別のモニタでも記述例を読むゴースト制作者, I want タグと環境変数が、色・太字・薄い地で地の文から浮いて見えること, so that 色の見え方の違う画面でも、タグと台詞の切れ目をひと目で追える

#### Acceptance Criteria
1. While 記述例のブロックを見ているとき, the UKADOC のサイト shall タグを赤紫の太字で、薄い地を敷いて見せる（目標の画面 `mock-sakura-script-C21-light.png`・`mock-sakura-script-C21-dark.png` の記述例のタグ。試作の色は明 `#8a0d4f`・暗 `#f48fb1`）
2. While 記述例のブロックを見ているとき, the UKADOC のサイト shall 環境変数を、タグと違う色の太字で、同じく薄い地を敷いて見せる（試作の色は明 `#7a2e0a`・暗 `#f6ad7b`）
3. The UKADOC のサイト shall 色を変えるのをタグと環境変数の 2 つにとどめ、地の文の色・太さを今のままにする
4. The UKADOC のサイト shall タグと環境変数の字の大きさと字の形（等幅の字）を地の文と同じにし、太字と薄い地を付けても、記述例の行の折り返しの位置を今と変えない
5. While 明るい表示のとき, the UKADOC のサイト shall タグと環境変数の字を、白地・コードブロックの地（記述例の箱の地と、箱の外のコードの地）・その上の薄い地のどれに対しても 7:1 以上の対比で見せる（`site-look-list-markers` の C17 から移した分。［仮定 A2］。手元の見込みはタグ 7.04〜9.33:1・環境変数 7.23〜9.45:1 で、記述例の箱の薄い地の上のタグがいちばん弱い）
6. While 暗い表示のとき, the UKADOC のサイト shall タグと環境変数の字を、コードブロックの地（記述例の箱の地と、箱の外のコードの地）とその上の薄い地に対して 4.5:1 以上の対比で見せる（［仮定 A1］。試作の測りは記述例の箱の薄い地の上でタグ 5.7:1・環境変数 6.61:1。箱の外のコードの薄い地の上のタグは手元の見込みで 5.47:1）
7. The UKADOC のサイト shall リンクの色・記述例の箱の地・コードの地の文の色・対応の札の色を、この spec のために変えない

### Requirement 4: 明・暗の切り替えと印刷
**Objective:** As a 明・暗のどちらでも UKADOC を読むゴースト制作者, I want タグと環境変数の見え方が表示の切り替えにすぐ合い、印刷でも読めること, so that 見た目の直しのせいで読めない所が増えない（D16 ダークモード）

#### Acceptance Criteria
1. When 利用者が明るい表示と暗い表示を切り替えたとき, the UKADOC のサイト shall 頁を読み込み直さなくても、タグと環境変数をそのときの表示の色で見せる
2. If 暗い表示を選んだまま頁を印刷したとき, the UKADOC のサイト shall タグと環境変数を、明るい表示で印刷したときと同じ色で印刷する（暗い表示だけの色を白い紙に出さない。`site-look-list-items` の Requirement 6.6 と同じ考え）

### Requirement 5: 字とコピーを変えないことと、仕掛けが動かないとき
**Objective:** As a 記述例をコピーして使うゴースト制作者, I want 見え方が変わっても、記述例の字とコピーされる字が今と同じであること, so that 色を付けたせいで、手元に貼ったスクリプトが壊れない（D19・D20）

#### Acceptance Criteria
1. The UKADOC のサイト shall 記述例のブロックの字を 1 字も足さず・消さず・入れ替えず、タグと環境変数を見え方のために包むだけにする（包んだ後の字が包む前の字と同じ）
2. When 利用者が記述例のブロックのコピーのボタンを押したとき, the UKADOC のサイト shall 今と同じ字をコピーする（D19）
3. The UKADOC のサイト shall 記述例の `\` を `\` のまま見せる（D20。等幅の字の指定は変えない）
4. If ブラウザで仕掛けが動かないとき（スクリプトを切っている・読み込めない）, the UKADOC のサイト shall 記述例のブロックを、今と同じ字と、色の付かない今と同じ見え方で見せる
5. The UKADOC のサイト shall タグと環境変数を見分けるのに、サイトの外のスクリプトや資源を読まない

### Requirement 6: コードブロックの HTML の形が変わっても今の見え方を保つ
**Objective:** As a UKADOC のどのコードブロックも読むゴースト制作者, I want 言語の印のためにコードブロックの HTML が変わっても、記述例の箱・折り返し・コピーのボタンが今のままであること, so that タグの色を足したせいで、ほかのコードブロックの見え方が崩れない

#### Acceptance Criteria
1. When 言語の印を付けるためにサイトのコードブロック（今は 449 個）の HTML の形が変わるとき, the UKADOC のサイト shall どのコードブロックも、地の色・記述例の箱（C18 の帯・左の線・地・続くブロックの間の点線）・コピーのボタンの手前の折り返し（C09）・右上のコピーのボタンを、今と同じに見せる
2. The UKADOC のサイト shall 言語の指定の無いブロック（ファイル構成の木・SSTP などの要求の例など）の字と見え方を今のままにする

### Requirement 7: 今のサイトの良いところを失わない
**Objective:** As a UKADOC を読むゴースト制作者, I want 検索・見出しへのリンク・狭い画面が今のまま使えること, so that 見た目の直しのせいでほかの使い勝手が落ちない（`survey.md` の「失わないもの」。D16 は Requirement 3・4、D19・D20 は Requirement 5 が受け持つ）

#### Acceptance Criteria
1. The UKADOC のサイト shall 記述例のブロックの字を、今と同じ字で検索で引けるようにし、検索の結果から開いた頁の語の強調を、記述例のブロックの中（タグ・環境変数の中を含む）でも明・暗の表示とも見せる（D15）
2. The UKADOC のサイト shall 全頁の見出しの id・見出しの横のリンクの印（¶）・右の欄の目次を今のまま保つ（D17）
3. When 幅 375 の狭い画面で記述例のある頁を見たとき, the UKADOC のサイト shall 頁の横幅を画面の幅に収める（`scrollWidth` と `innerWidth` が同じ 375。D18）

### Requirement 8: 書式の決まりへの `ss` の書き足し
**Objective:** As a ukadoc-spec に記述例を書き足す人, I want 省略形の ```` ```ss ```` が使えることが書式の決まりに書いてあること, so that 短い書き方でも、同じ見え方の記述例になると分かって書ける

#### Acceptance Criteria
1. The site-look-sakura-script-highlight shall `ukadoc-spec/CLAUDE.md` の書式の決まり「さくらスクリプトは ```` ```sakurascript ```` のコードブロック」に、省略形の ```` ```ss ```` も同じ言語として使えることを書き足す
2. The site-look-sakura-script-highlight shall `ukadoc-spec/CLAUDE.md` のほかの決まりと、原稿の今ある ```` ```sakurascript ```` のブロックを変えない

### Requirement 9: 表示の確かめと記録
**Objective:** As a doc_edit の開発者, I want 変更が配られた頁に効いていることと、目標の画面との見比べ・数・対比が残っていること, so that 見落としなく PR に出せ、後続の spec が同じ印と測りを引ける

#### Acceptance Criteria
1. When 変更を確かめるとき, the site-look-sakura-script-highlight shall ローカルのプレビュー（頁の道は `/ukadoc-spec/` から始まる）で、配られた見た目の指定のファイルにこの spec の指定が入っていること、足したスクリプトのファイルが開けること（200）、どの頁もスクリプトを 1 回ずつ読み込むことを確かめる（サイトを作る処理の厳しい検査は、指定したファイルが無くても気づかないため）
2. The site-look-sakura-script-highlight shall プレビューの頁の HTML を取ってきて、言語の印の付いたブロックの数（今は 287）・コードブロックの数（今は 449）・言語の印の無いブロックの数（今は 162）を確かめて記録する
3. The site-look-sakura-script-highlight shall Requirement 2 の規則で見分けたタグと環境変数の数（今の見込みはタグ 502・環境変数 6）と、試作の規則と見分け方が違う所（今の見込みは 10 か所: `\w9` 6・`\p2`・`\p3`・`\b2`・引用符の中に `]` のある `\q[…]` 1）を数えて記録する
4. The site-look-sakura-script-highlight shall 記述例のある頁のすべての記述例のブロックで、包んだ後の字が包む前と同じこと（違いが 0 個）と、いくつかのブロックでコピーのボタンでコピーされる字が変更の前と同じことを確かめて記録する
5. The site-look-sakura-script-highlight shall ```` ```ss ```` のブロックが言語の印と見え方を `sakurascript` と同じに得ることを、原稿に残さない使い捨ての写しの上で確かめて記録する（今の原稿に ```` ```ss ```` は無く、原稿は変えないため。［仮定 A5］）
6. The site-look-sakura-script-highlight shall 変更の後の画面を、目標の画面と同じ頁・同じ位置・同じ大きさ（`list/sakura-script` の `#bang-lock-repaint`、幅 1000・高さ 700）で明・暗の両方で撮り、記述例のタグの見え方を見比べた結果を記録する
7. The site-look-sakura-script-highlight shall 目標の画面に写っていないもの ― 環境変数（`list/sakura-script` の環境変数の記述例）、`\p23` の例（`\pID番号` の項目）、引用符の中に `]` のある `\q[…]` の例 ― を明・暗で撮って確かめ、記録する
8. The site-look-sakura-script-highlight shall タグと環境変数の字と地の対比（Requirement 3.5・3.6）を明・暗で測って記録する。テーマの色の変数で出せない色（タグ・環境変数の色）は、その色と、明・暗それぞれの地との対比を記録する
9. The site-look-sakura-script-highlight shall 変更の前と後で、記述例の箱（C18）と折り返し（C09）とコピーのボタンの見え方を、記述例のある頁と言語の指定の無いブロックのある頁（`spec/sstp`・`manual/` の頁など）で見比べ、箱の数・点線の数・ボタンと字の重なりが同じことを記録する（`site-look-list-items` の「着色の後の形」と同じ確かめ方）
10. The site-look-sakura-script-highlight shall 変更の前と後で、全頁の見出しの id の並び・`a.headerlink`（¶）の数・右の欄の目次の項目の数が同じことを確かめて記録する
11. If 撮った画面に、撮る途中の描き直しで二重に重なった跡（上の端以外の左右の端に、ヘッダの色の行が出ている）があるとき, the site-look-sakura-script-highlight shall その画面を撮り直す
12. When 開発者に画面を見せるとき, the site-look-sakura-script-highlight shall 古い写しが残らないよう、ブラウザでの強制の再読み込み（Ctrl+F5）を頼む

### Requirement 10: 変更の範囲と PR
**Objective:** As a ukadoc-spec のメンテナ, I want 小さく、言語の印と見た目の指定に限った変更を、この spec だけの PR で受け取ること, so that 他者も使う公開リポジトリでもレビューしやすい

#### Acceptance Criteria
1. The site-look-sakura-script-highlight shall ukadoc-spec の中で、`mkdocs.yml`・`assets/extra.css`・`assets/` に足す自作のスクリプト・`ukadoc-spec/CLAUDE.md`（`ss` の書き足しだけ）と、要るときだけ `scripts/prepare_site.py`（見出しの id の計算の設定をそろえる所だけ。`ss` のためには変えない。［仮定 A4］）を変え、原稿（`.md`）・`.nav.yml`・Zensical の版を変えない
2. The site-look-sakura-script-highlight shall `requirements.txt` を変えない。変えるときは、新しい依存として設計に理由を書く
3. The site-look-sakura-script-highlight shall `assets/extra.css` のこの spec の指定を、ファイルの末尾に塊として足し、塊ごとの注を `/* site-look-sakura-script-highlight: <何の指定か> */` の短い 1 行にとどめる（説明・測りの数・わけは spec の記録に書く）。足すスクリプトの注も短くする
4. The site-look-sakura-script-highlight shall 変更を、この spec の作業木 `.worktrees/site-look-sakura-script-highlight/`（ブランチ `site-look-sakura-script-highlight`）で、ukadoc-spec の `origin/main` の上に書く
5. The site-look-sakura-script-highlight shall この spec の完了の前に、Build Gate（`prepare_site.py` と `zensical build --strict` が、どちらも失敗なく終わる）と規約 Gate（`ukadoc-spec/CLAUDE.md` の書式）を通す
6. The site-look-sakura-script-highlight shall この spec の完了で、この spec だけの PR を作ってスクワッシュマージする（原則 1 spec = 1 PR。PR の説明は brief の「続きの PR の説明」に従い、一連の PR の並びは PR を出すときの roadmap による）。この spec の PR だけを入れるとサイトが壊れると分かったときは、PR を出さずに溜め、開発者に報告する
7. If 作業の途中に、ukadoc-spec の `origin/main` が同じ `mkdocs.yml`・`assets/extra.css`・`scripts/prepare_site.py` を変えて進み、変更とぶつかったとき, the site-look-sakura-script-highlight shall `origin/main` に追いつき、この spec の指定と、ほかの spec が入れた指定の両方が残るようにする
8. The site-look-sakura-script-highlight shall 旧サイトの見た目の指定・スクリプト（`sakura_player.js` など）や試作の指定・スクリプトを写さず、本番の書き方で書き直す（試作は `html[data-slp~="Cxx"]` の下の使い捨ての書き方である）。目印の名前に試作の `slp-` の接頭辞を使わない

## 仮定（要件のディスカッションで確かめる）
A1・A2・A4・A5 は、要件のディスカッションで推奨のとおりに確定した（開発者の答え、2026-10-25）。
- **A1**（確定）: 暗い表示のタグ・環境変数の対比の線を 4.5:1 とした。brief の 7:1 は明るい表示だけの物差しで、`site-look-list-markers` の暗い表示の札も 4.5:1 に決まった（2026-10-25）のにそろえた（`research.md` の OPEN QUESTION 1）
- **A2**（確定）: 明るい表示の 7:1 を、白地・記述例の箱の地・薄い地の 3 つの上で守るとした。手元の見込みでは、薄い地の上のタグが 7.04:1（試作の測りは 7.14:1）でぎりぎりなので、ブラウザで 7:1 を割ったら、赤紫の色相のままタグ（か環境変数）の色を濃くする。薄い地（字の色の 9%）は変えない（C21 のかたまりに見せる効き目を弱めないため。OPEN QUESTION 2）
- **A3**: 字句の規則は、UKADOC の各タグの項目の書き方（`\pID番号` の「0〜9」など）を正とし、areka の字句解析（`areka/crates/areka-parsers/src/sakura/lexer.rs`）を突き合わせに使った。閉じない `[` の扱い（2.5）は areka と違い、見え方のためにタグの名前までにとどめる（OPEN QUESTION 3）
- **A4**（確定）: ```` ```ss ```` の言語の印は、頁を開いた後のブラウザの中で `sakurascript` と同じになればよい。`pymdownx.highlight` の設定では `use_pygments: false` のまま `ss` を寄せられない（`research.md`）ので、足すスクリプトの中でそろえ、配る HTML には `language-ss` が残る。`scripts/prepare_site.py` は `ss` のためには変えない（OPEN QUESTION 4）
- **A5**（確定）: ```` ```ss ```` の確かめは、原稿に残さない使い捨ての写しに ```` ```ss ```` のブロックを 1 つ足して build し、確かめた後に捨てる（OPEN QUESTION 5）
