# Implementation Plan

- [x] 1. 土台: 作業木と変更の前の控え
- [x] 1.1 ukadoc-spec の `origin/main` の最新から PR の単位の作業木を作り、プレビューを起動する
  - ukadoc-spec を fetch し、`origin/main`（PR #10 を含む）から単位 `site-look-visibility` の作業木とブランチを作る。この spec が単位の最初なので新しく作る（既にあれば、先頭が `origin/main` と同じことを確かめて使う）。ukadoc-spec のメインのチェックアウトは使わない
  - 作業木で `prepare_site.py` と `zensical build --strict` を流してから `zensical serve` を起動する（doc_edit の `.venv` を使う）
  - 作業木の先頭が `origin/main` と同じコミットで、`/ukadoc-spec/list/sakura-script/` の頁がプレビューで開ける
  - _Requirements: 9.3_

- [x] 1.2 変更の前の画面を撮り、変わらないことを比べるための控えを取る
  - プレビューが動いていなければ、作業木で `prepare_site.py` → `zensical build --strict` → `zensical serve` の順に起動する
  - `shot.mjs`（読むだけで使う）で `manual/ghost` の `h1#ゴースト` を明・暗で撮り、`before-manual-ghost-{light,dark}.png` として spec の `screenshots/` に置く。二重に重なった跡があれば撮り直す
  - 変更の前の build の、まとめ頁 20 頁の見出しの id の並び・`class="headerlink"` の数・`class="md-nav__link"` の数・`<hr />` の数と、`_raw/` の中身を、doc_edit の `.worktrees/_baseline-site-look-list-items/`（git に載らない。spec の完了まで残し、2.2・4.4・4.6 がここを読む）に控える
  - 変更の前の `list/sakura-script` で、見える字がコピーのボタンに重なるコードブロックの数を幅 1000 で数えて控える（設計の写しでは 165）
  - spec の `verification.md` を作り、「変更の前」の節に、控えの置き場・作業木のコミット・数（見出しの数・`hr` の数・重なりの数）を書く
  - 2 枚の画面と、控えの置き場の id・数・`_raw/`、`verification.md` の「変更の前」の節がある
  - _Requirements: 7.2, 8.4, 8.6, 9.4_

- [x] 2. まとめ頁の役の目印
- [x] 2.1 組み立ての処理で、まとめた頁の分類と項目の頭の見出しに役の class を付ける
  - プレビューを止めてから書く（書きかけの写しを拾わせない）
  - 設計の「Modified Files」の 4 か所（頭の説明の 1 行、引数に分類かどうかを足す、単位の頭の見出しだけに class を足す、呼び出しの 1 か所）だけを変え、ほかの処理には触らない
  - 頁の頭と注意書きの節（`notes_`）には付けず、分類は `bundle-category`、項目（`introduction_*` を含む）は `bundle-item` にする
  - `prepare_site.py` と `zensical build --strict` が exit 0 で、`_site_src/` のまとめた頁の単位の頭の見出しの行が `{#id .bundle-item}`・`{#id .bundle-category}` の形になっている
  - _Requirements: 1.3, 1.4, 1.5, 3.3, 3.4, 3.5, 9.1, 9.4, 9.8_

- [x] 2.2 目印の数・漏れ・変わらないことを、プレビューの頁の HTML で数える
  - プレビューが動いていなければ、作業木で `prepare_site.py` → `zensical build --strict` → `zensical serve` の順に起動する
  - プレビュー（`http://127.0.0.1:8000/ukadoc-spec/…`）から 20 頁と読み物の頁の HTML を取ってきて数える
  - 20 頁の HTML で、`bundle-item` と `bundle-category` を段ごとに数え、組み立ての単位の数（設計の写しでは項目 1875・分類 116、注意書き 16、頁の頭 20）と合わせる
  - `notes_` の id の見出しに class が無いこと、読み物の頁に class が 0 であること、`pre`・`code` の外の本文に `{: `・`{#` の漏れが 0 であることを見る
  - 見出しの id の並び・`headerlink`・`md-nav__link`・`<hr />` の数・`_raw/` を 1.2 の控えと比べ、すべて同じであることを見る
  - 数が合わない・漏れる・変わるときは 2.1 を見直し、直せないときは止めて開発者に提示する
  - `verification.md` の「目印」の節に、段ごとの数の表と、漏れ 0・変わらないことの結果が書いてある
  - _Requirements: 1.3, 1.4, 1.5, 1.6, 3.3, 3.4, 3.5, 3.7, 7.2, 8.2, 9.4_

- [x] 3. 見た目の指定
- [x] 3.1 `extra.css` の末尾に、項目名の帯・項目の間の詰め・分類の見出しの帯の塊を足す
  - 設計の「Modified Files」の 3 つの塊（項目名の帯、項目の間の詰め、分類の見出しの帯）を、この順でファイルの末尾に足す。ほかの塊（PR #10 の塊を含む）には触らない
  - 塊ごとの注は `/* site-look-list-items: <何> */` の 1 行だけにし、わけと数は書かない（spec の記録に書く）
  - 暗い表示の帯の中のリンクの白と下線は `@media screen` の中に置き、¶（`headerlink`）を除く
  - 試作の `html[data-slp~=…]`・`slp-` の書き方を写さず、役の class に当てる
  - 作業木の `assets/extra.css` の末尾に、設計どおりの 3 つの塊がある
  - _Requirements: 1.1, 1.2, 1.7, 2.1, 2.3, 2.4, 3.1, 3.2, 3.6, 6.1, 6.2, 6.3, 6.5, 6.6, 9.2, 9.8_

- [x] 3.2 `extra.css` の末尾に、記述例の箱・濃い帯の中の ¶ と検索の強調・コピーのボタンの手前で折り返す塊を足す
  - 設計の「Modified Files」の残りの 3 つの塊を、3.1 の塊の後ろにこの順で足す
  - 記述例の箱は `h4` から始まるコードブロックの連なり（4 つまで）だけに当て、暗い表示だけの色は `@media screen` の中に置く
  - コピーのボタンの余白は、今の形と着色の後の形のどちらのコードブロックにも当たる書き方にする
  - 注は 3.1 と同じ 1 行の型にする
  - 作業木の `assets/extra.css` の末尾に、設計どおりの 6 つの塊がそろい、`site-look-list-items:` の見出しのコメントが 6 つある
  - _Requirements: 3.6, 4.1, 4.3, 4.4, 5.1, 5.2, 5.3, 5.4, 5.7, 5.8, 6.5, 6.6, 7.1, 9.2, 9.8_

- [x] 3.3 Build Gate と規約 Gate を通し、変更の範囲を確かめる
  - 作業木で `prepare_site.py` と `zensical build --strict` を流す
  - 規約 Gate（ukadoc-spec の `CLAUDE.md` の決まり）に照らす
  - `prepare_site.py` と `build --strict` がどちらも exit 0 で、`git diff --stat origin/main` が `assets/extra.css` と `scripts/prepare_site.py` だけである
  - _Requirements: 9.1, 9.5_

- [x] 4. 配られた頁での確かめ
- [x] 4.1 ukadoc-spec の `origin/main` に追いつき、測る版を決める
  - ukadoc-spec を fetch し、`origin/main` が作業木の分岐点から進んでいれば作業木で merge する。ぶつかったら `extra.css` は両方の塊を並べ、`prepare_site.py` は両方の変更を残して直す
  - merge したときは、Build Gate（3.3）をやり直し、`prepare_site.py` か原稿が変わっていれば 2.2 の数え方もやり直して `verification.md` の「目印」の節を直す
  - 4.2〜4.6 はこの版で測る（測る版を `verification.md` に書く）
  - `origin/main` が作業木の先祖で、Build Gate が exit 0 で、測る版が `verification.md` に書いてある
  - _Requirements: 9.5, 9.7_

- [x] 4.2 プレビューを起動し直し、配られた見た目の指定に 6 つの塊があることを確かめる
  - プレビューを起動し直し、内蔵ブラウザの枠（使えないときは Claude in Chrome）で頁を開く
  - 配られた `/ukadoc-spec/assets/extra.css` が 200 で、`site-look-list-items:` の見出しのコメントが 6 つあることを見る。無ければプレビューを止め、`prepare_site.py` → `build --strict` → 起動し直す
  - `verification.md` の「配り」の節に、配られた `extra.css` に 6 つの塊が入っていることを確かめた結果が書いてある
  - _Requirements: 8.1_

- [x] 4.3 帯・箱の字とリンクの対比を明・暗で測る
  - プレビューが動いていなければ、作業木で `prepare_site.py` → `zensical build --strict` → `zensical serve` の順に起動する
  - `getComputedStyle` の字の色と、要素から `body` までの地を重ねた色から、WCAG 2.x の相対輝度の式で、設計の「測る所と線」の表の所をすべて測る（幅 1000）
  - ホバーは、まず本当にポインタを載せて測る（枠を見える状態にするか Claude in Chrome で）。測れないときだけフォーカスで代え、代えたことを控える。フォーカスの色が変わらないときは、測る間だけ `transition: none` の使い捨ての指定を足す
  - 頁を読み込み直さずに明・暗を切り替え、帯・箱の色が切り替わることを見る。暗い表示だけの 3 つの指定が `screen` の `CSSMediaRule` の中にあることを見た目の指定の木で見る
  - 項目名の帯・分類の帯・記述例の箱の中のリンクを数える（設計の写しでは 31・0・0）
  - どれかが線に届かないときは、色を勝手に選ばず、そこで作業を止め、測った数を添えて開発者に提示して判断を待つ
  - `verification.md` の「対比」の節に、表のすべての所の字の色・地・対比と、切り替え・画面だけ・リンクの数が書いてあり、すべて線を満たすか、開発者の判断を待つ状態で止まっている
  - _Requirements: 1.7, 3.2, 3.6, 5.1, 5.6, 5.8, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 8.5_

- [x] 4.4 項目の間の詰め・コピーのボタンの重なり・記述例の箱の当て先を測る
  - プレビューが動いていなければ、作業木で `prepare_site.py` → `zensical build --strict` → `zensical serve` の順に起動する
  - `descript/ghost` の `#charset` を `shot.mjs` と同じ位置に置き、4 項目目（`craftman`）の終わりが 700px の中にあることを見る
  - `list/sakura-script` の全コードブロックで、空白でない字とコピーのボタンの重なりを幅 1000・375 で数え、どちらも 0 であることを見る（1.2 の控えと並べる）
  - 設計の「Testing Strategy」の 9 頁で、箱の有無が連なりの頭の `h4` と食い違うものが 0、点線が全サイトで 36（設計の写しの数）であることを見る
  - 区切りの線の数が 1.2 の控えと同じであることを見る
  - どれかが届かないときは、値を勝手に選び直さず、止めて開発者に提示する
  - `verification.md` の「詰め・ボタン・箱」の節に、4 項目目の終わりの位置・重なりの数・箱の照合と点線の数が書いてある
  - _Requirements: 2.1, 2.2, 2.3, 4.1, 4.2, 5.2, 5.3, 5.4, 5.5_

- [x] 4.5 着色の後のコードブロックの形でも、折り返しと箱が同じに見えることを確かめる
  - 作業木の `mkdocs.yml` は変えず、作業木の HEAD を使い捨ての置き場に書き出し、その写しの設定に `pymdownx.highlight`（`use_pygments: false`）を足して `prepare_site.py` と `build --strict` を流す
  - 写しを 8000 以外の口で配り、`list/sakura-script` でコードブロックが `pre.highlight` の形であること、箱と点線の数・箱の位置と高さ・箱の中のコードの字の対比・ボタンの重なり 0 が作業木と同じことを見て、明・暗の画面を 1 組撮って目で比べる
  - 終わったら配りを止め、写しを消す
  - `verification.md` の「着色の後の形」の節に、両方の形の数の比べと目で見た結果が書いてあり、写しが残っていない
  - _Requirements: 4.3, 5.7_

- [x] 4.6 変更の後の画面を撮り、目標の画面との見比べと、失わないものを確かめる
  - プレビューが動いていなければ、作業木で `prepare_site.py` → `zensical build --strict` → `zensical serve` の順に起動する
  - 設計の「VerificationRecord」の画面の一覧のとおり、`after-` の画面を明・暗で撮って spec の `screenshots/` に置く。二重に重なった跡があれば撮り直し、枚数とわけを控える
  - この spec の 5 つの候補の部分だけを、目標の画面（`mock-sakura-script-C01-*`・`C03-*`・`C09-*`・`C18-*`、`mock-descript-ghost-C02-*`、`mock-propertysystem-C25-*`）と見比べる
  - `before-` と `after-manual-ghost-*` で、コードブロックの右の余白のほかに違いが無いことを見る
  - 失わないもの: `?h=スコープ`・`?h=記述例` の頁の明・暗で検索の欄と帯・箱の中の強調（7.1 の数も測る）、画面の中のコピーのボタンと `\`、幅 375 の明・暗で `list/sakura-script`・`spec/sstp`・`descript/shell-surfaces`・`manual/ghost` の `scrollWidth` と `innerWidth` が同じ 375
  - `after-` の画面がそろい、`verification.md` の「画面」「失わないもの」の節に、見比べと失わないものの結果と撮り直しの枚数が書いてある
  - _Requirements: 1.1, 1.2, 1.6, 2.4, 3.1, 3.7, 4.2, 4.4, 5.5, 7.1, 7.3, 7.4, 8.3, 8.4, 8.6_

- [ ] 5. 記録と単位の引き継ぎ
- [ ] 5.1 `verification.md` の記録を仕上げる
  - 頭に、測った版（作業木のコミット、`origin/main` の版）と日付、流した式（重ねの計算を含む）をそのまま書く
  - 2.2・4.2〜4.6 の節がそろっていることを見て、欠けた所を埋め、変数で出せない 4 つの色とその対比、Build Gate・規約 Gate・`git diff --stat origin/main` を書く
  - 開発者に画面やプレビューを見せるときは Ctrl+F5 を頼むことを書き、見せるときに実際に頼む
  - `verification.md` と `screenshots/` がそろい、設計の「Testing Strategy」の各項目の結果が書いてある
  - _Requirements: 6.4, 8.3, 8.4, 8.5, 8.7, 9.1, 9.5_

- [ ] 5.2 作業木を単位の次の spec に渡せる状態にする
  - ukadoc-spec を fetch し、4.1 の後に `origin/main` がまた進んでいれば、4.1 と同じく追いつき、変わった所に当たる 4.2〜4.6 の確かめをやり直して `verification.md` の版と結果を直す
  - 作業木の変更をすべてコミットし（ukadoc-spec の履歴の型の日本語の 1 文）、push も PR もしない（PR は単位の最後の spec `site-look-note-icon` の完了で作る）
  - プレビューを止める。`.worktrees/_baseline-site-look-list-items/` は spec の完了まで残す
  - 作業木に未コミットの変更が無く、`origin/main` が作業木の先祖で、ブランチ `site-look-visibility` がまだ push されていない
  - _Requirements: 9.6, 9.7_

## Implementation Notes
- 変更の前の控え `.worktrees/_baseline-site-look-list-items/` は git に載らない。`/kiro-complete site-look-list-items` の後始末で消す
- 控えの置き場の `snapshot.py`（20 頁の id・headerlink・md-nav__link・hr と `_raw/` のハッシュ）と `overlap.mjs`（ボタンの重なり、Edge ヘッドレス）を 2.2・4.4・4.6 でもそのまま使い、物差しをそろえる。変更の前の重なりは幅 1000 で 172/288（設計の 165 は幅 1024 の数）
