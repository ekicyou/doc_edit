# Implementation Plan

- [ ] 1. 土台: 作業木と変更の前の控え
- [x] 1.1 ukadoc-spec の `origin/main` の最新からこの spec の作業木を作り、プレビューを起動する
  - ukadoc-spec を fetch し、`site-look-list-items` の PR #11 を含む `origin/main` から作業木 `.worktrees/site-look-list-markers/` とブランチ `site-look-list-markers` を作る。ukadoc-spec のメインのチェックアウトは使わない
  - 作った直後に追う先を外す（素の `git push` で `main` に送らないため）
  - 作業木で `prepare_site.py` と `zensical build --strict` を流してから `zensical serve` を起動する（doc_edit の `.venv` を使う）
  - 作業木の先頭が `origin/main` と同じコミットで、ブランチに追う先が無く、`/ukadoc-spec/list/sakura-script/` の頁がプレビューで開ける
  - _Requirements: 9.3_

- [x] 1.2 変更の前の控えを書き出して配り、変わらないことを比べる数を取る
  - 作業木の HEAD を `git archive` で Claude のスクラッチの下の新しいフォルダに書き出し、`prepare_site.py` と `zensical build --strict` を流して、`_site/` を 8000 以外の口（例: 8010）で配る
  - 控えの置き場と、書き出した作業木のコミットを控える（後のタスクが控えを配り直す・作り直すときに使う）
  - 控えの 40 頁で、`article` の中の見出しの id の並び・`class="headerlink"` の数・`class="md-nav__link"` の数・`hr` の数・本文の字（空白を詰めたもの）と、`_raw/` の中身を控える
  - spec の `verification.md` を作り、「変更の前」の節に、控えの置き場・作業木のコミット・数（`list/sakura-script` と `list/propertysystem` の id・¶・目次の数、全頁の `hr` の数）を書く
  - 控えが配られて開け、`verification.md` の「変更の前」の節に数が書いてある
  - _Requirements: 5.7, 7.2, 8.3_

- [ ] 2. まとめ頁の目印
- [x] 2.1 組み立ての処理で、対応・既定値の段落と注意書きの節に目印を付け、対応の名前を札で包む
  - プレビューを止めてから書く（書きかけの `_site_src/` を拾わせない）
  - 設計の「Modified Files」の 4 か所（docstring の 1 項目、定数、`baseware()` と `add_markers()`、`main()` の呼び出しの 1 か所）だけを変え、ほかの処理には触らない
  - 名前の後ろが部分の終わりか空白のときだけ名前の字を札で包み、後ろの字・` / `・頭の「対応:」は 1 字も変えない。後ろの字に打ち消しの語があれば包まない
  - 段落の印は段落の最後の行の後ろに足し、コードブロックの中の行は飛ばす。注意書きの単位（ファイル名が `notes_` で始まる）だけを包み、包みは単位の中で閉じる
  - `baseware()` に `SSP`・`SSP 2.8.40`・`SSP (2.3.83)`・`SSP 2.7 RC1`・`Materia廃止仕様`・`SSP 非対応`・`*※推奨　SSP2.5.05以上*`・`SSPX` を、`add_markers()` にコードブロックの中の `**対応:**` と `<br />` で続く既定値の段落を直に渡し、結果を `verification.md` の「一語ずつの確かめ」の節に書く
  - 作業木で 1 件 1 コミット（ukadoc-spec の履歴の型の日本語の 1 文、名前は `-c` で渡す）
  - `prepare_site.py` と `zensical build --strict` が exit 0 で、一語ずつの確かめが設計の期待（名前だけ札・札にしない）どおりで、`_site_src/` の対応・既定値の段落の後ろに `{: .bundle-support }`・`{: .bundle-default }` がある
  - _Requirements: 1.2, 1.3, 1.4, 1.5, 1.8, 2.1, 2.3, 2.4, 2.5, 2.7, 2.8, 2.9, 2.10, 3.1, 3.5, 3.6, 3.7, 5.3, 5.6, 9.1, 9.7_

- [x] 2.2 目印の数・漏れ・変わらないことを、プレビューの頁の HTML で数える
  - プレビューが動いていなければ、作業木で `prepare_site.py` → `zensical build --strict` → `zensical serve` の順に起動する
  - プレビューから 40 頁の HTML を取り、頁ごとに `p.bundle-support`・`p.bundle-default`・`div.bundle-notes`・名前ごとの `span.bundle-baseware-*` を数え、設計の MarkerCheck の表（計 1640・423・16・2719、名前ごとの内訳）と合わせる。包みの最初の子の段と id を並べる（`h2` 2・`h3` 12・`h4` 2）
  - 札で `p.bundle-support` の外にあるもの 0、読み物の頁の目印 0（`dev/nar` を含む）、`<strong>既定値:</strong>` の段落で目印の無いもの 0、`pre`・`code` の外の本文の `{: `・`{#` 0 を見る
  - 1.2 の控えが 8010 などで配られていなければ配り直す。控えの置き場が消えていれば、1.2 で控えたコミットから同じ手順で作り直す
  - 1.2 の控えと、全 40 頁の見出しの id の並び・¶・目次・`hr`・本文の字・`_raw/` が同じことを見る
  - `_site_src/` の対応の行で、札にならない部分の種類と行の数（設計では 5 通り・7 行）と、打ち消しの語で札にしなかった部分の数（0）を数える
  - 数が合わない・漏れる・変わるときは 2.1 を見直し、直せないときは止めて開発者に提示する
  - `verification.md` の「目印」の節に、頁ごとの数の表、漏れ 0・付けないもの 0・変わらないことの結果、札にならない部分の種類と行の数が書いてある
  - _Requirements: 1.2, 1.3, 1.4, 1.5, 2.3, 2.4, 2.7, 2.8, 2.10, 3.5, 3.6, 3.7, 5.1, 5.2, 5.3, 5.4, 5.5, 5.7, 7.2, 7.5, 8.2, 8.3, 8.7_

- [ ] 3. 見た目の指定
- [x] 3.1 `extra.css` の末尾に、注意書きの節の箱・対応のベースウェアの札・既定値の札と字下げの塊を足す
  - 設計の「Modified Files」の 3 つの塊を、この順でファイルの末尾（`site-look-list-items` の最後の塊の後ろ）に足す。ほかの塊には触らない
  - 塊ごとの注は `/* site-look-list-markers: <何> */` の 1 行だけにし、わけと数は書かない（spec の記録に書く）
  - 暗い表示だけの指定（箱の地を敷かないこと、札の暗い表示の 4 色）は `@media screen` の中に置く。既定値の字下げは `p.bundle-default` で C02 の詰めに勝たせ、値の字の色・大きさ・斜めには触れない
  - 試作の `html[data-slp~=…]`・`slp-` の書き方を写さず、役の目印に当てる
  - 作業木で 1 コミット（2.1 と同じ型）
  - 作業木の `assets/extra.css` の末尾に、設計どおりの 3 つの塊があり、`site-look-list-markers:` の見出しのコメントが 3 つある
  - _Requirements: 1.1, 1.6, 1.7, 1.8, 2.1, 2.2, 2.6, 2.9, 3.1, 3.2, 3.3, 3.4, 4.1, 4.2, 4.3, 6.1, 6.2, 7.3, 9.2, 9.7_

- [x] 3.2 Build Gate と規約 Gate を通し、変更の範囲を確かめる
  - プレビューを止めてから、作業木で `prepare_site.py` と `zensical build --strict` を流す
  - 規約 Gate（ukadoc-spec の `CLAUDE.md` の決まり）に照らす
  - `prepare_site.py` と `build --strict` がどちらも exit 0 で、`git diff --stat origin/main` が `assets/extra.css` と `scripts/prepare_site.py` だけである
  - _Requirements: 9.1, 9.4_

- [ ] 4. 配られた頁での確かめ
- [x] 4.1 ukadoc-spec の `origin/main` に追いつき、測る版を決める
  - ukadoc-spec を fetch し、`origin/main` が作業木の分岐点から進んでいれば作業木で merge する。ぶつかったら `extra.css` は両方の塊を並べ、`prepare_site.py` は両方の変更（`main()` の行は両方の関数を入れ子に）を残して直す
  - merge したときは、Build Gate（3.2）をやり直す。原稿か `prepare_site.py` が変わっていれば、控えを新しい `origin/main` から 1.2 と同じ手順で作り直し（`verification.md` の「変更の前」の節のコミットと数を直す）、2.2 の数え方もやり直して `verification.md` の「目印」の節を直す
  - 4.2〜4.4 はこの版で測る（測る版を `verification.md` に書く）
  - `origin/main` が作業木の先祖で、Build Gate が exit 0 で、測る版が `verification.md` に書いてある
  - _Requirements: 9.6_

- [x] 4.2 プレビューを起動し直し、配られた見た目の指定に 3 つの塊があることを確かめる
  - プレビューを起動し直し、内蔵ブラウザの枠（使えないときは Claude in Chrome）で頁を開く
  - 配られた `/ukadoc-spec/assets/extra.css` が 200 で、`site-look-list-markers:` の見出しのコメントが 3 つあることを見る。無ければプレビューを止め、`prepare_site.py` → `build --strict` → 起動し直す
  - `verification.md` の「配り」の節に、配られた `extra.css` に 3 つの塊が入っていることを確かめた結果が書いてある
  - _Requirements: 8.1_

- [x] 4.3 箱・札の字とリンクと枠の対比、切り替え、印刷の指定、検索の強調を明・暗で測る
  - プレビューが動いていなければ、作業木で `prepare_site.py` → `zensical build --strict` → `zensical serve` の順に起動する
  - 設計の ContrastProbe の測り方（`getComputedStyle` の色と、要素から `html` までの地を重ねた色から WCAG 2.x の対比）で、「測る所と線」の表の所をすべて明・暗で測る。`CROW` の札は `descript/ghost` の `#charset` でも測る
  - ホバーは本当にポインタを載せて、フォーカスはフォーカスの模擬を入れて `focus()` して、アニメーションが終わってから測る
  - 4 つの札の色が明・暗それぞれで互いに違うことを、測った `color` の値で控える
  - 頁を読み込み直さずに明・暗を切り替え、箱・札の色が切り替わることを見る。`data-md-color-scheme` を含む規則がすべて `screen` の `CSSMediaRule` の中にあることを見た目の指定の木で見る
  - `?h=SSP`・`?h=CROW`・`?h=エスケープ`・`?h=省略不可` を明・暗で開き、札・箱・既定値の段落の中の強調が見えることを見て、字と重ねた地の対比を控える
  - どれかが線に届かないとき（とくに「既定値:」の札）は、色や値を勝手に選び直さず、そこで作業を止め、測った数と代わりの案を添えて開発者に提示して判断を待つ
  - `verification.md` の「対比」の節に、表のすべての所の字の色・地・対比、変数で出せない 8 つの札の色とその対比、切り替え・画面だけ・検索の強調の結果が書いてあり、すべて線を満たすか、開発者の判断を待つ状態で止まっている
  - _Requirements: 1.6, 1.7, 2.2, 2.6, 3.2, 3.4, 4.1, 6.1, 6.2, 7.1, 8.5, 8.6_

- [x] 4.4 変更の後の画面を撮り、目標の画面との見比べと、失わないものを確かめる
  - プレビューが動いていなければ、作業木で `prepare_site.py` → `zensical build --strict` → `zensical serve` の順に起動する
  - 設計の「VerificationRecord」の画面の一覧のとおり、`shot.mjs`（読むだけで使う）で `after-` の 8 枚を明・暗で撮って spec の `screenshots/` に置く。二重に重なった跡があれば撮り直し、枚数とわけを控える
  - この spec の 4 つの候補の部分だけを、目標の画面（`mock-sakura-script-C04-*`・`C06-*`・`C17-light`、`mock-descript-ghost-C07-*`）と見比べる。`CROW` の札と段が `h4` の箱（`list/propertysystem` の `#notes_sound_meta`）を明・暗で見る
  - 幅 375 の明・暗で `list/sakura-script`・`descript/ghost`・`list/propertysystem` の `scrollWidth` と `innerWidth` が同じ 375 であることを見る。画面の中のコピーのボタンと `#notes_escape` の `\` が今と同じ字であることを見る
  - `after-` の画面がそろい、`verification.md` の「画面」「失わないもの」の節に、見比べと失わないものの結果と撮り直しの枚数が書いてある
  - _Requirements: 1.1, 1.2, 2.1, 3.1, 3.3, 7.3, 7.4, 7.5, 8.4, 8.5, 8.8_

- [ ] 5. 記録と PR に出せる状態
- [x] 5.1 `verification.md` の記録を仕上げる
  - 頭に、測った版（作業木のコミット、`origin/main` の版）と日付、流した式（Build Gate・測りのスクリプト・重ねの計算）をそのまま書く
  - 1.2・2.1・2.2・4.1〜4.4 の節がそろっていることを見て、欠けた所を埋め、Build Gate・規約 Gate・`git diff --stat origin/main` を書く
  - 開発者に画面やプレビューを見せるときは Ctrl+F5 を頼むことを書き、見せるときに実際に頼む
  - `verification.md` と `screenshots/` がそろい、設計の「Testing Strategy」の各項目の結果が書いてある
  - _Requirements: 8.6, 8.7, 8.9, 9.1, 9.4_

- [ ] 5.2 作業木を `/kiro-complete` で PR に出せる状態にする
  - ukadoc-spec を fetch し、4.1 の後に `origin/main` がまた進んでいれば、4.1 と同じく追いつき、変わった所に当たる 2.2・4.2〜4.4 の確かめをやり直して `verification.md` の版と結果を直す
  - この PR だけでサイトが壊れないこと（目印と見た目の指定がそろって入り、Build Gate が通る）を確かめる。壊れると分かったら PR に出さずに溜め、開発者に報告する
  - 作業木の変更をすべてコミットし、push も PR もしない（PR は `/kiro-complete` で作る）
  - プレビューと控えの配りを止め、スクラッチの控えを消す
  - 作業木に未コミットの変更が無く、`origin/main` が作業木の先祖で、ブランチ `site-look-list-markers` がまだ push されていない
  - _Requirements: 9.5, 9.6_

## Implementation Notes
