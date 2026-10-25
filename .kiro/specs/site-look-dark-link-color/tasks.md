# Implementation Plan

- [x] 1. 土台: 作業木と変更の前の記録
- [x] 1.1 ukadoc-spec の `origin/main` の最新から作業木を作り、プレビューを起動する
  - ukadoc-spec を fetch し、`origin/main` から spec の作業木を作る（ukadoc-spec のメインのチェックアウトは使わない）
  - 作業木で `prepare_site.py` を流してから `zensical serve` を起動する
  - 作業木の先頭が `origin/main` と同じコミットで、`/ukadoc-spec/list/sakura-script/` の頁がプレビューで開ける
  - _Requirements: 6.2_

- [x] 1.2 変更の前の明・暗の画面を撮り、明るい表示の色の基準を測る
  - `shot.mjs`（読むだけで使う）で `list/sakura-script` の `#bang-lock-repaint` を明・暗の両方で撮り、`before-` の 2 枚として spec の `screenshots/` に置く
  - 二重に重なった跡（上の端以外の左右の端のヘッダの紺の行）があれば撮り直す
  - 明るい表示の本文のリンク・左の目次の今の頁の字の色と、明・暗のヘッダの地の色を測り、変更の前の値として控える
  - `before-sakura-script-light.png`・`before-sakura-script-dark.png` があり、暗い表示ではリンクが紺のまま読みにくいことが画面で分かる
  - _Requirements: 2.3, 5.5_

- [ ] 2. 暗い表示のリンクの色の指定
- [ ] 2.1 `extra.css` の末尾に、暗い表示・画面だけ・紺のテーマのときのリンクの色の塊を足す
  - プレビューを止めてから書く（書きかけの写しを拾わせない）
  - 見出しのコメント `site-look-dark-link-color:` で始まる独立した塊を末尾に置き、`@media screen` の中で、暗い表示かつ紺のテーマの条件のときだけリンクの色の変数を明るい紺にする。ほかの塊・変数（ホバー・フォーカスの色を含む）には触らない
  - 注に、明るい紺がテーマの紺と対であること、暗い地との対比、紺を変えたら測り直すこと、画面だけに当てるわけを書く（対比の数は 3.2 で測った数に合わせ直す）
  - 試作の C24 の書き方を写さず、本番の書き方で書く
  - 作業木の `assets/extra.css` の末尾に、設計どおりの塊が 1 つだけ足されている
  - _Requirements: 1.1, 1.3, 1.4, 1.6, 2.1, 2.2, 2.4, 3.4, 5.4, 6.5, 6.6_

- [ ] 2.2 Build Gate と規約 Gate を通し、変更の範囲を確かめる
  - 作業木で `prepare_site.py` と `zensical build --strict` を流す
  - 規約 Gate（ukadoc-spec の `CLAUDE.md` の決まり）に照らす
  - `prepare_site.py` と `build --strict` がどちらも exit 0 で、`origin/main` との差分が `assets/extra.css` だけである
  - _Requirements: 6.1, 6.3_

- [ ] 3. 配られた頁での確かめ
- [ ] 3.1 プレビューを起動し直し、配られた見た目の指定に塊があることを確かめる
  - プレビューを起動し直し、内蔵ブラウザの枠（使えないときは Claude in Chrome）で頁を開く
  - 配られた `/ukadoc-spec/assets/extra.css` に `site-look-dark-link-color:` の塊があることを見る。無ければプレビューを止め、`prepare_site.py` → `build --strict` → 起動し直す
  - 配られた `extra.css` に塊が入っていることを確かめた結果が控えてある
  - _Requirements: 5.1_

- [ ] 3.2 暗い表示の対比と、変わらないことを測る
  - `getComputedStyle` と WCAG 2.x の相対輝度の式で、設計の「測る所と線」の表の所をすべて測る（幅 1000、引き出しの項目だけ幅 375）
  - 暗い表示: 本文のリンク 7:1 以上、コードの字のリンク 4.5:1 以上、左右の目次・引き出しの今の項目が本文のリンクと同じ色、ホバー・フォーカスの字 3:1 以上
  - 明るい表示の本文のリンク・左の目次の今の頁と、明・暗のヘッダの地が、1.2 で控えた変更の前の値と同じ
  - 頁を読み込み直さずに明・暗を切り替え、本文のリンクの色が切り替わることを見る。塊が `@media screen` の中にあることを見た目の指定の木で見る
  - どれかが線に届かないときは、色を勝手に選ばず、そこで作業を止め、測った数を添えて開発者に提示して判断を待つ
  - 2.1 の注の対比の数を、ブラウザで測った数に合わせ、`prepare_site.py` と `build --strict` を流し直す（差分は `assets/extra.css` だけのまま）
  - 表のすべての所の `fg`・`bg`・対比が測ってあり、すべて線を満たすか、開発者の判断を待つ状態で止まっている
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 2.1, 2.2, 2.4, 3.1, 3.2, 3.3, 3.4, 5.3, 5.4_

- [ ] 3.3 変更の後の画面を撮り、見比べと、失わないものを確かめる
  - 変更の後の `#bang-lock-repaint` を明・暗の両方で撮り、`after-` の 2 枚として置く。二重に重なった跡があれば撮り直す
  - `after-sakura-script-dark.png` のリンクと左の目次の今の頁の色を、目標の画面 `mock-sakura-script-C24-dark.png`（と light）と見比べる（色だけを比べる）
  - `before-` と `after-sakura-script-light.png` に、リンクと目次の色の違いが無いことを見る
  - 失わないもの: `?h=repaint` の頁の暗い表示で検索の欄と語の強調、画面の中のコピーのボタンと `\`、幅 375 の明・暗で `scrollWidth` と `innerWidth` が同じ 375
  - `after-` の 2 枚があり、見比べと失わないものの結果が控えてある
  - _Requirements: 2.3, 4.1, 4.2, 4.3, 4.4, 4.5, 5.2, 5.5_

- [ ] 4. 記録と PR の支度
- [ ] 4.1 `verification.md` に測りと見比べの記録を書く
  - 測った版（作業木のコミット、`origin/main` の版）と日付、流した式をそのまま書く
  - 「測る所と線」の表に測った `fg`・`bg`・対比を埋め、配りの確かめ・切り替え・画面だけの確かめ・見比べ・失わないもの（`git diff --stat` を含む）・撮り直しの枚数とわけを書く
  - 開発者に画面やプレビューを見せるときは、Ctrl+F5 を頼む
  - spec の `verification.md` と `screenshots/` の 4 枚がそろい、要件 1〜5 の確かめの結果がすべて書いてある
  - _Requirements: 1.2, 1.5, 2.3, 3.1, 3.2, 4.1, 4.2, 4.3, 4.4, 4.5, 5.2, 5.3, 5.6_

- [ ] 4.2 PR の前に `origin/main` に追いつき、PR の説明の下書きを用意する
  - ukadoc-spec を fetch し、`origin/main` が進んでいれば作業木を追いつかせる。`extra.css` でぶつかったら、この塊とほかの spec の塊を両方並べて残し、Build Gate をやり直す
  - PR の説明の下書きに、見た目の直しの一連の PR（3 本）の 1 本目で、続きの PR（`site-look-visibility`、`site-look-sstp-playback`）を順に出すこと、出し済み・この PR・この後に出す PR、この PR だけで完結し続きを待たずにマージしてよいことを書く
  - PR は作らない。PR は開発者の完了の承認の後に `/kiro-complete` で作り、マージしない
  - 作業木が `origin/main` の最新の上にあり、Build Gate が通り、PR の説明の下書きが `verification.md` に置いてある
  - _Requirements: 6.4, 6.5, 6.7_
