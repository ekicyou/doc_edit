# Implementation Plan

- [ ] 1. 土台: 作業木と変更の前の控え
- [x] 1.1 ukadoc-spec の `origin/main` の最新からこの spec の作業木を作り、プレビューを起動する
  - ukadoc-spec を fetch し、`site-look-list-markers` の PR #12 を含む `origin/main` から作業木 `.worktrees/site-look-note-icon/` とブランチ `site-look-note-icon` を作る。ukadoc-spec のメインのチェックアウトは使わない
  - 作った直後に追う先を外す（素の `git push` で `main` に送らないため）
  - 作業木で `prepare_site.py` と `zensical build --strict` を流してから `zensical serve` を起動する（doc_edit の `.venv` を使う）
  - 作業木の先頭が `origin/main` と同じコミットで、ブランチに追う先が無く、`/ukadoc-spec/list/sakura-script/` の頁がプレビューで開ける
  - _Requirements: 8.4_

- [x] 1.2 変更の前の控えを書き出して配り、変わらないことを比べる数を取る
  - 作業木の HEAD を `git archive` で Claude のスクラッチの下の新しいフォルダに書き出し、`prepare_site.py` と `zensical build --strict` を流して、`_site/` を 8000 以外の口（例: 8010）で配る
  - 控えの置き場と、書き出した作業木のコミットを控える（後のタスクが控えを配り直す・作り直すときに使う）
  - 控えの 40 頁で、`article` の中の見出しの id の並び・`class="headerlink"` の数・`class="md-nav__link"` の数・`hr` の数・本文の字（空白を詰めたもの）・`bundle-item`・`bundle-category`・`bundle-notes`・`bundle-support`・`bundle-default` の数（`class` の値の中の語として数える。`class="…"` の字の並びでは数えない）と、`_raw/` の中身を控える
  - spec の `verification.md` を作り、「変更の前」の節に、控えの置き場・作業木のコミット・数（`list/sakura-script` と `list/propertysystem` の id・¶・目次の数、全頁の `hr` の数）を書く
  - 控えが配られて開け、`verification.md` の「変更の前」の節に数が書いてある
  - _Requirements: 5.5, 6.1, 6.2, 7.3_

- [ ] 2. 補足の項目の目印
- [x] 2.1 組み立ての処理で、`note-<数>.md` の単位の頭の見出しに補足の目印を足す
  - プレビューを止めてから書く（書きかけの `_site_src/` を拾わせない）
  - 設計の「Modified Files」の 3 か所（docstring の 1 項目、定数 `NOTE_FILE`、`shift_headings()` の役の class を決める所の 2 行）だけを変え、ほかの処理には触らない。`bundle-item` は残して `bundle-supplement` を足す
  - 補足の項目は原稿のファイル名だけで見分け、頁や項目を名指しする一覧を持たない。試作の `slp-` の書き方は写さない
  - 定数に `note-1.md`・`note-12.md`（付く）、`notes_escape.md`・`note-1-a.md`・`note.md`・`footnote-1.md`（付かない）を直に渡し、結果を `verification.md` の「一語ずつの確かめ」の節に書く
  - 作業木で 1 コミット（ukadoc-spec の履歴の型の日本語の 1 文、名前は `-c` で渡す）
  - `prepare_site.py` と `zensical build --strict` が exit 0 で、一語ずつの確かめが設計の期待どおりで、`_site_src/` の補足の見出しの行が `{#note-1 .bundle-item .bundle-supplement}` の形になっている
  - _Requirements: 2.3, 2.4, 5.2, 5.3, 5.4, 5.5, 8.8_

- [ ] 2.2 目印の数・漏れ・変わらないことを、プレビューの頁の HTML で数える
  - プレビューが動いていなければ、作業木で `prepare_site.py` → `zensical build --strict` → `zensical serve` の順に起動する
  - プレビューから 40 頁の HTML を取り、頁ごとに `div.bundle-notes` の最初の子（段と id）・`.bundle-supplement`（段と id）・`.admonition.note` を数え、設計の IconCheck の表（16・16・2、頁ごとの内訳）と合わせる
  - 読み物の頁の `bundle-supplement` 0、補足の項目の中の節の見出し（「サーフェスの位置情報」「※SHIORI Statusヘッダ」など）の `bundle-supplement` 0、`pre`・`code` の外の本文の `{: `・`{#` 0 を見る
  - 1.2 の控えが配られていなければ配り直す（消えていれば 1.2 で控えたコミットから同じ手順で作り直す）。控えと、全 40 頁の見出しの id の並び・¶・目次・`hr`・本文の字・既にある目印の数（1.2 と同じく `class` の値の中の語として数え、`bundle-item` は補足の 16 個も含めて控えと同じ数。`bundle-supplement` は別に数える）・`_raw/` が同じことを見る
  - 数が合わない・漏れる・変わるときは 2.1 を見直し、直せないときは止めて開発者に提示する（プレビューを見せるときは Ctrl+F5 を頼む）
  - `verification.md` の「目印」の節に、頁ごとの数の表、付けないもの 0・漏れ 0・変わらないことの結果が書いてある
  - _Requirements: 2.3, 5.2, 5.4, 5.5, 5.6, 6.1, 6.2, 6.4, 6.5, 7.2, 7.3, 7.7_

- [ ] 3. 見た目の指定
- [ ] 3.1 `extra.css` の末尾に、注釈の見出しの絵と注の題の絵の塊を足す
  - 設計の「Modified Files」の 2 つの塊を、この順でファイルの末尾（`site-look-list-markers` の最後の塊の後ろ）に足す。ほかの塊（C04 の中央寄せと点線、C01 の帯を含む）には触らない
  - 絵は `assets/logo.png` を `url("logo.png")` で読み、ファイルは足さない。色・`filter` は指定せず、明・暗で同じ指定にし、`@media screen` で包まない
  - 注釈の節は `.bundle-notes > :first-child` に当て（`[id^="notes_"]` は使わない）、注の題は `.note` の題（`summary` を含む）だけに当て、テーマの枠と位置は変えない
  - 塊ごとの注は `/* site-look-note-icon: <何> */` の 1 行だけにし、わけと値の根拠は書かない（spec の記録に書く）。試作の `html[data-slp~=…]`・`slp-` の書き方を写さない
  - 作業木で 1 コミット（2.1 と同じ型）
  - 作業木の `assets/extra.css` の末尾に、設計どおりの 2 つの塊があり、`site-look-note-icon:` の見出しのコメントが 2 つある
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 3.1, 3.2, 3.3, 3.4, 3.5, 4.1, 4.3, 4.4, 4.5, 4.6, 4.7, 5.1, 8.2, 8.3, 8.8_

- [ ] 3.2 Build Gate と規約 Gate を通し、変更の範囲を確かめる
  - プレビューを止めてから、作業木で `prepare_site.py` と `zensical build --strict` を流す
  - 規約 Gate（ukadoc-spec の `CLAUDE.md` の決まり。ファイル名は ASCII）に照らす
  - `prepare_site.py` と `build --strict` がどちらも exit 0 で、`git diff --stat origin/main` が `assets/extra.css` と `scripts/prepare_site.py` だけである（足したファイルが無い）
  - _Requirements: 8.1, 8.5_

- [ ] 4. 配られた頁での確かめ
- [ ] 4.1 ukadoc-spec の `origin/main` に追いつき、測る版を決める
  - ukadoc-spec を fetch し、`origin/main` が作業木の分岐点から進んでいれば作業木で merge する。ぶつかったら `extra.css` は両方の塊を並べ、`prepare_site.py` は両方の変更を残して直す
  - merge したときは、Build Gate（3.2）をやり直す。原稿か `prepare_site.py` が変わっていれば、控えを新しい `origin/main` から 1.2 と同じ手順で作り直し、2.2 の数え方もやり直して `verification.md` の「変更の前」「目印」の節を直す
  - 4.2〜4.4 はこの版で測る（測る版を `verification.md` に書く）
  - `origin/main` が作業木の先祖で、Build Gate が exit 0 で、測る版が `verification.md` に書いてある
  - _Requirements: 8.7_

- [ ] 4.2 プレビューを起動し直し、配られた見た目の指定と絵を確かめる
  - プレビューを起動し直し、内蔵ブラウザの枠（使えないときは Claude in Chrome）で頁を開く
  - 配られた `/ukadoc-spec/assets/extra.css` が 200 で `site-look-note-icon:` の見出しのコメントが 2 つあり、`/ukadoc-spec/assets/logo.png` が 200 で中身が作業木の `assets/logo.png` と同じことを見る。無ければプレビューを止め、`prepare_site.py` → `build --strict` → 起動し直す
  - `verification.md` の「配り」の節に、2 つの塊と絵が配られていることを確かめた結果が書いてある
  - _Requirements: 5.1, 7.1_

- [ ] 4.3 絵の効きと当たらないことと切り替えを、配られた頁の見た目で調べる
  - プレビューが動いていなければ、作業木で `prepare_site.py` → `zensical build --strict` → `zensical serve` の順に起動する
  - 設計の IconCheck の表の 7 頁で、`article` の中のすべての見出しの `::before` の `backgroundImage` を読み、`logo.png` を持つのが注釈の節の見出しと補足の項目の頭の見出しの 32 個だけであることを見る
  - `.note` の題の `::before` が `maskImage` `none`・`backgroundImage` に `logo.png`・地が透明で、`.tip`・`.warning` の題は `maskImage` が残り、「※1」「※2」の見出しに絵が無いことを見る
  - 明で開き、読み込み直さずに暗に切り替えて、上の値が同じことを見る
  - 当たらない・重なる・地の青が出るときは 3.1 を見直し、直せないときは止めて開発者に提示する（プレビューを見せるときは Ctrl+F5 を頼む）
  - `verification.md` の「効き」の節に、頁ごとの絵の当たる見出しの id、注の題と `tip`・`warning` の結果、切り替えの結果が書いてある
  - _Requirements: 1.1, 1.4, 2.1, 2.3, 3.1, 3.3, 3.4, 3.5, 4.3, 4.5, 7.7_

- [ ] 4.4 変更の後の画面を撮り、目標の画面との見比べと、失わないものを確かめる
  - プレビューが動いていなければ、作業木で `prepare_site.py` → `zensical build --strict` → `zensical serve` の順に起動する
  - 設計の「VerificationRecord」の画面の一覧のとおり、`shot.mjs`（読むだけで使う）で `after-` の 8 枚を明・暗で撮って spec の `screenshots/` に置く。二重に重なった跡があれば撮り直し、枚数とわけを控える
  - 見出しの頭の絵（大きさ・縦の位置・字との間・暗い表示での見え方）だけを、目標の画面（`mock-sakura-script-C26-*`・`mock-propertysystem-C26-*`）と見比べる。段が `h4` の注釈の節と `dev/shell` の注の題を明・暗で見て、C04 の中央寄せと点線・C01 の帯・注の題の字と地と枠・本文の字の大きさと行間が保たれていることを見る
  - 幅 375 の明・暗で `list/sakura-script`・`list/propertysystem`・`list/shiori-event-ex`・`dev/shell` の `scrollWidth` と `innerWidth` が同じ 375 であることを見る。いちばん長い `notes_` の見出しを幅 375 の明るい表示で目で見て、絵だけが 1 行目に残らないことを見る
  - 画面の中のコピーのボタンと `#notes_escape` の `\` が今と同じ字であることを見る
  - 目標の画面と大きさ・位置が目に見えて違うとき、または幅 375 で絵だけが 1 行目に残るときは、値を勝手に選び直さず、画面を添えて開発者に提示して判断を待つ（プレビューを見せるときは Ctrl+F5 を頼む）
  - `after-` の画面がそろい、`verification.md` の「画面」「失わないもの」の節に、見比べ・幅 375・折り返し・失わないものの結果と撮り直しの枚数が書いてある
  - _Requirements: 1.2, 1.3, 2.2, 3.2, 4.2, 4.4, 4.6, 6.3, 6.4, 6.5, 7.4, 7.5, 7.6, 7.7_

- [ ] 5. 記録と PR に出せる状態
- [ ] 5.1 `verification.md` の記録を仕上げる
  - 頭に、測った版（作業木のコミット、`origin/main` の版）と日付、流した式（Build Gate・調べのスクリプト）をそのまま書く
  - 1.2・2.1・2.2・4.1〜4.4 の節がそろっていることを見て、欠けた所を埋め、Build Gate・規約 Gate・`git diff --stat origin/main` を書く
  - 絵については使った置き場（`assets/logo.png`）と当て先だけを書き、出どころや使ってよい範囲には触れない
  - 開発者に画面やプレビューを見せるときは Ctrl+F5 を頼むことを書き、見せるときに実際に頼む
  - `verification.md` と `screenshots/` がそろい、設計の「Testing Strategy」の各項目の結果が書いてある
  - _Requirements: 7.2, 7.7, 8.5, 8.6_

- [ ] 5.2 作業木を `/kiro-complete` で PR に出せる状態にする
  - ukadoc-spec を fetch し、4.1 の後に `origin/main` がまた進んでいれば、4.1 と同じく追いつき、変わった所に当たる 2.2・4.2〜4.4 の確かめをやり直して `verification.md` の版と結果を直す
  - この PR だけでサイトが壊れないこと（目印と見た目の指定がそろって入り、Build Gate が通る）を確かめる。壊れると分かったら PR に出さずに溜め、開発者に報告する
  - 作業木の変更をすべてコミットし、push も PR もしない（PR は `/kiro-complete` で作る）
  - プレビューと控えの配りを止め、スクラッチの控えを消す
  - 作業木に未コミットの変更が無く、`origin/main` が作業木の先祖で、ブランチ `site-look-note-icon` がまだ push されていない
  - _Requirements: 8.6, 8.7_

## Implementation Notes
- `(P)` は付けない。2.1 と 3.1 は別のファイルを変えるが、同じ作業木・同じプレビュー（止めてから書く）・同じ `verification.md` を使い、3.2 以降は両方がそろってから確かめるため
- 1.1: 作業木は `origin/main` の `529d092`（#12 の後に #13 `site-look-sakura-script-highlight` も入った版）から作った。設計の `0eb3fb9` より進んでいるので、`extra.css` の末尾は #13 の塊の後ろになる
