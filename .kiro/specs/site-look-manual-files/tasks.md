# Implementation Plan

- [x] 1. 土台: 作業木と変更の前の控え
- [x] 1.1 ukadoc-spec の `origin/main` の最新からこの spec の作業木を作り、プレビューを起動する
  - ukadoc-spec を fetch し、`origin/main`（`site-look-list-items` の PR #11 を含む。`site-look-sakura-script-highlight` の PR が入っていればそれも含む）から作業木 `.worktrees/site-look-manual-files/` とブランチ `site-look-manual-files` を作り、作った直後に追う先を外す。ukadoc-spec のメインのチェックアウトは使わない
  - 作業木で `prepare_site.py` と `zensical build --strict` を流してから `zensical serve` を起動する（doc_edit の `.venv` を使う。動かなければスクラッチの使い捨ての venv で流し、そのことを控える）
  - 作業木の先頭が `origin/main` と同じコミットで、追う先が無く、`/ukadoc-spec/manual/ghost/` の頁がプレビューで開ける
  - _Requirements: 8.3_

- [x] 1.2 変更の前の控えを書き出して配り、比べるための数を取る
  - 作業木の HEAD を `git archive` で Claude のスクラッチの下の新しいフォルダに書き出し、`prepare_site.py` と `zensical build --strict` を流して、`_site/` を `python -m http.server` で 8000 以外の口（例: 8010）に配る（4.2〜4.5 がここと比べる。5.2 で止めて消す）
  - 控えの全 40 頁で、`<title>`・`article` の中の見出しの id の並び・`class="headerlink"` の数・`md-nav__link` の数・`article` の本文の字（タグを外し空白を詰めたもの）と、`_raw/`・`llms.txt` を控える
  - spec の `verification.md` を作り、「変更の前」の節に、控えの置き場の絶対パスと口・控えのコミット・manual の頁の ¶ と目次の数を書く（後のタスクが控えを配り直し、作り直すときの手がかりにする）
  - 控えが 8010 などの口で開け、`verification.md` の「変更の前」の節がある
  - _Requirements: 1.3, 6.7, 7.4_

- [x] 2. 組み立ての処理で、manual の頁のファイルの箇条書きの名前に目印を付ける
  - プレビューを止めてから書く（書きかけの `_site_src/` を拾わせない）
  - 設計の「Modified Files」の 4 か所（モジュールの docstring の 1 項目、`MANUAL_ITEM`、`mark_manual()`、`main()` の読み物の頁の写しの呼び出し）だけを変え、ほかの処理には触らない。頁の種類だけを示す印は足さない
  - manual の頁の見分けは `main()` の `d == 'manual'` の 1 か所だけにし、`rewrite_links()` の後に通す
  - 設計の「Testing Strategy」の名前の目印の例（見出しの行、名前のリンク、名前だけ、行の終わりの「`:`」、`\*`・`\\` を含む名前、字下げした `※1,※2`、形に合わない 2 つ、コードブロックの中）を `mark_manual()` に直に渡し、期待どおりかを控える
  - `prepare_site.py` と `zensical build --strict` が exit 0 で、`_site_src/manual/ghost.md` のファイルの箇条書きの行が `**…**{: .manual-item } 説明` の形になり、例がすべて期待どおりである
  - _Requirements: 1.1, 1.2, 1.4, 2.4, 2.7, 2.9, 3.4, 3.7, 6.7, 8.7_

- [x] 3. 木の仕掛けと見た目の指定
- [x] 3.1 (P) 木のファイル名を包むスクリプトを足し、全頁で読み込ませる
  - 設計の「Modified Files」の `assets/filetree.js` を新しく置き、`mkdocs.yml` の `extra_javascript` に 1 行足す。`extra_javascript:` の鍵が既にあれば（`site-look-sakura-script-highlight` が入っていれば）、並びの後ろに 1 行だけ足し、ほかのスクリプトを残す
  - 字を作るのに `innerHTML` を使わず、`span` に `textContent` を入れる。包んだ後の字が違えば元に戻して `console.warn`、要素の入った木は包まずに `console.warn` にする。試作の `slp-` を写さない
  - 作業木の `filetree.js` そのものを Node の `vm` で偽の `document` の上に流し、設計の「TreeCheck」の例の表の行をすべて試す
  - 例の表がすべて合い（`alias.txt（旧仕様）`・「`/`」・「または」・全角の空白の字下げを含む）、包んだ後の字が元の字と同じで、`mkdocs.yml` の `extra_javascript` に `assets/filetree.js` がある
  - _Boundary: TreeColorer, ScriptEntry_
  - _Requirements: 4.1, 4.2, 4.4, 4.5, 4.6, 4.7, 6.5, 8.6, 8.7_

- [x] 3.2 (P) `extra.css` で C01 の帯を分け合い、ファイル名の帯と説明の字下げ・木のファイル名の色の塊を足す
  - `site-look-list-items: 項目名の帯` の塊の 2 つのセレクタ（帯と、暗い表示の帯の中のリンク）だけを `:is(.bundle-item, .manual-item)` に広げ、宣言の値は変えない。C02 の詰め・`.bundle-item { margin }`・帯の中の `code` の指定は広げない
  - 設計の「Modified Files」の 2 つの塊（ファイル名の帯と説明の字下げ、木のファイル名）を、この順でファイルの末尾に足す。ほかの塊には触らない
  - 塊ごとの注は `/* site-look-manual-files: <何> */` の 1 行だけにし、わけと数は書かない（spec の記録に書く）
  - 色は `--md-typeset-a-color` だけを使い、直書きの色と `@media screen` の指定を足さない。頁の題や見出しの id（`h1#…`）・`html[data-slp~=…]` で頁を見分けない
  - 作業木の `assets/extra.css` に、`:is(.bundle-item, .manual-item)` が 2 つと、`site-look-manual-files:` の見出しのコメントが 2 つある
  - _Boundary: BandStyle, TreeStyle_
  - _Requirements: 1.5, 2.1, 2.2, 2.3, 2.5, 2.8, 3.1, 3.2, 3.6, 4.6, 5.1, 5.2, 5.3, 5.7, 8.2, 8.7_

- [x] 3.3 Build Gate と規約 Gate を通し、変更の範囲を確かめてコミットする
  - 作業木で `prepare_site.py` と `zensical build --strict` を流す
  - 規約 Gate（ukadoc-spec の `CLAUDE.md` の決まり）に照らす
  - 4 ファイルの変更を 1 つのコミットにする（ukadoc-spec の履歴の型の日本語の 1 文。名前は `-c user.name=ekicyou -c user.email=dot.station@gmail.com` で渡す）。push も PR もしない
  - `prepare_site.py` と `build --strict` がどちらも exit 0 で、`git diff --stat origin/main` が `mkdocs.yml`・`scripts/prepare_site.py`・`assets/extra.css`・`assets/filetree.js` だけで、作業木に未コミットの変更が無い
  - _Depends: 2, 3.1, 3.2_
  - _Requirements: 8.1, 8.4_

- [x] 4. 配られた頁での確かめ
- [x] 4.1 ukadoc-spec の `origin/main` に追いつき、測る版を決める
  - ukadoc-spec を fetch し、`origin/main` が作業木の分岐点から進んでいれば作業木で merge する。ぶつかったら `extra.css` は両方の塊を並べて C01 の 2 つのセレクタの `.manual-item` を保ち、`mkdocs.yml` は `extra_javascript` の並びに両方を残し、`prepare_site.py` は両方の変更を残す
  - merge したときは Build Gate（3.3）をやり直し、1.2 の控えを、作業木の HEAD でなく新しい `origin/main` のコミットから 1.2 の手順で作り直す（HEAD にはこの spec の変更が入っているため）。控えの置き場・コミットを `verification.md` に書き直す
  - 4.2〜4.5 はこの版で測る（測る版を `verification.md` に書く）
  - `origin/main` が作業木の先祖で、Build Gate が exit 0 で、測る版が `verification.md` に書いてある
  - _Requirements: 8.6_

- [x] 4.2 配りと、目印の数・漏れ・変わらないことを、プレビューの頁の HTML で数える
  - プレビューを止め、作業木で `prepare_site.py` → `zensical build --strict` → `zensical serve` の順に起動し直す
  - 控えが配られていなければ、`verification.md` に書いた置き場から配り直す。置き場が無ければ、書いたコミットから 1.2 の手順で作り直す
  - 配られた `/ukadoc-spec/assets/extra.css` が 200 で `site-look-manual-files:` のコメントが 2 つと `:is(.bundle-item, .manual-item)` が 2 つ、`/ukadoc-spec/assets/filetree.js` が 200 で `filetree-file` を含むことを見る。無ければ起動し直す
  - 全 40 頁の HTML で `class="manual-item"` を頁ごとに数え（設計の写しでは 7 頁に 73、場合分け 8、名前だけ 1、段落に分かれない形 12）、ほかの頁が 0、`filetree.js` の読み込みが全頁に 1 つ、`pre`・`code` の外の本文に `{:`・`{#`・`{.` の漏れが 0 であることを見る
  - 1.2 の控えと全 40 頁で、題・id の並び・¶・目次の数が同じ、manual の外の本文の字が同じ、manual の頁の本文の字の違いが外した「`:`」だけ（設計の写しでは 72）、`_raw/`・`llms.txt` が同じことを見る。`directory` の名前の `\` が控えと同じ字であることを見る
  - 数が合わない・漏れる・変わるときは 2 を見直す。原稿の新しい書き方が理由なら、原稿は直さず数と行を記録して開発者に提示する
  - `verification.md` の「配り」「目印」の節に、頁ごとの数の表と、漏れ 0・変わらないことの結果が書いてある
  - _Requirements: 1.1, 1.2, 1.3, 2.4, 2.6, 2.7, 2.9, 3.3, 3.4, 3.7, 6.1, 6.3, 6.6, 6.7, 7.1, 7.2, 7.4_

- [x] 4.3 ブラウザで開いた後の木の数と字を数え、着色の後のコードブロックの形でも同じことを確かめる
  - プレビューが動いていなければ、作業木で `prepare_site.py` → `zensical build --strict` → `zensical serve` の順に起動する
  - manual の 8 頁と `dev/nar`・`dev/update` を Edge ヘッドレス + CDP で開き、言語の印の無いコードブロックごとに、`+-` の行の数・`span.filetree-file` の数と字・包んだ後の `textContent` が `fetch` で取り直した同じ頁の字と同じことを数える（設計の写しでは木 21、manual のファイル名 204・`dev/` 17）。木でないブロックの `span.filetree-file` が 0 であることを見る（着色の `span` は数えない）
  - 作業木がまだ今の形（`div.highlight > pre > code`）なら、作業木の HEAD を使い捨ての置き場に書き出し、その写しの `mkdocs.yml` に、`.worktrees/site-look-sakura-script-highlight/mkdocs.yml` の `pymdownx.highlight` の 2 か所（無ければその spec の `design.md` の差分）を足して build し、8000・控えの口以外で配って同じ数になることを見る。終わったら配りを止め、写しを消す（作業木が既に着色の後の形なら、そのことを書いて省く）
  - 数か字が合わないときは `filetree.js` を直す。要件の規則と違う読み方が要るときは止めて開発者に提示する
  - `verification.md` の「木」の節に、頁ごとの数の表・例の表の結果・字の違い 0・両方の形の比べが書いてあり、使い捨ての写しが残っていない
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.7, 4.8, 4.9, 6.5, 7.3_

- [x] 4.4 帯の位置と、帯・木の字とリンクの対比を明・暗で測る
  - プレビューが動いていなければ、作業木で `prepare_site.py` → `zensical build --strict` → `zensical serve` の順に起動する
  - `site-look-list-items` の `verification.md` の「流した式」に従い、`getComputedStyle` の字の色と要素から `html` までの地を重ねた色から、設計の「測る所と線」の表の所をすべて測る（幅 1000）。ホバーは本当にポインタを載せ、フォーカスは `setFocusEmulationEnabled` を入れて測る
  - 73 個の帯の左の端と幅が 1 通り、説明の左の端が 1 通り、一番外の項目の点が `none`、入れ子の箇条書きの点が残ることを見る
  - 頁を読み込み直さずに明・暗を切り替え、帯と木のファイル名の色が切り替わることを見る。`extra.css` の `data-md-color-scheme` を含む規則と `--md-typeset-a-color` の暗い表示の値が、すべて `screen` の `CSSMediaRule` の中にあることを見る
  - どれかが線に届かないときは、色や値を勝手に選び直さず、そこで作業を止め、測った数を添えて開発者に提示して判断を待つ
  - `verification.md` の「位置」「対比」の節に、表のすべての所の字の色・地・対比と、切り替え・画面だけの指定の結果が書いてあり、すべて線を満たすか、開発者の判断を待つ状態で止まっている
  - _Requirements: 2.2, 2.3, 3.2, 3.5, 3.6, 5.1, 5.2, 5.4, 5.5, 5.6, 7.7_

- [x] 4.5 変更の後の画面を撮り、目標の画面との見比べと、失わないものを確かめる
  - プレビューが動いていなければ、作業木で `prepare_site.py` → `zensical build --strict` → `zensical serve` の順に起動する
  - 設計の「VerificationRecord」の画面の一覧のとおり、`after-` の画面 7 組を `shot.mjs`（読むだけで使う）で明・暗で撮って spec の `screenshots/` に置く。二重に重なった跡があれば撮り直し、枚数とわけを控える
  - `after-ghost-*` を `mock-manual-ghost-C14-*`・`C15-*` と、`after-ghost-C22-*` を `mock-manual-ghost-C22-*` と、この spec の部分だけ見比べる。帯の位置・帯の中のリンク・暗い表示の木の色の 3 つの違いは、決めたとおりとして記録する。目標の画面の無い 5 組（段落に分かれない項目・場合分けと箇条書きの中の木・パスの名前・「または」と「`/`」・`alias.txt（旧仕様）`）を確かめ、明・暗ともファイル名の色がフォルダ名から見分けられることを見る
  - 控えが配られていなければ、4.2 と同じく配り直すか作り直す
  - 失わないもの: `manual/ghost/?h=descript`・`manual/directory/?h=readme` の明・暗で、帯と木のファイル名の中の `mark` の数と見え方、木の画面のコピーのボタンとボタンでコピーされる字（`code` の `innerText`）が控えと同じこと、`directory` の帯の `\`、幅 375 の明・暗で manual の 8 頁と `dev/nar`・`dev/update` の `scrollWidth` と `innerWidth` が同じ 375（幅 375 の画面は残さない）
  - `after-` の画面 14 枚がそろい、`verification.md` の「画面」「失わないもの」の節に、見比べと失わないものの結果と撮り直しの枚数が書いてある
  - _Requirements: 2.1, 2.5, 2.8, 2.9, 3.1, 4.1, 4.3, 6.2, 6.4, 6.5, 6.6, 7.5, 7.6, 7.8, 7.9_

- [x] 5. 記録と完了への引き継ぎ
- [x] 5.1 `verification.md` の記録を仕上げる
  - 頭に、測った版（作業木のコミット、`origin/main` の版）と日付、流した式（Build Gate・測りのスクリプト・重ねの計算）を書く
  - 1.2・2・3.1・4.1〜4.5 の結果の節がそろっていることを見て、欠けた所を埋め、直書きの色を足していないこと、Build Gate・規約 Gate・`git diff --stat origin/main` を書く
  - 開発者に画面やプレビューを見せるときは Ctrl+F5 を頼むことを書き、見せるときに実際に頼む
  - `verification.md` と `screenshots/` がそろい、設計の「Testing Strategy」の各項目の結果が書いてある
  - _Requirements: 5.3, 7.10, 8.1, 8.4_

- [x] 5.2 作業木を `/kiro-complete` に渡せる状態にする
  - ukadoc-spec を fetch し、4.1 の後に `origin/main` がまた進んでいれば、4.1 と同じく追いつき、変わった所に当たる 4.2〜4.5 の確かめをやり直して `verification.md` の版と結果を直す
  - この spec の PR だけを入れてもサイトが壊れない（目印・見た目の指定・スクリプトがそろって入っている）ことを確かめる。壊れると分かったときは開発者に報告する
  - 作業木の変更をすべてコミットし、push も PR もしない（PR は `/kiro-complete` で作る）
  - 最後のコミットの後で、Build Gate（`prepare_site.py` と `zensical build --strict`）・規約 Gate・`git diff --stat origin/main` をやり直し、結果を `verification.md` に書き直す（4.2・4.3 で直したものを含めるため）
  - プレビューと 1.2 の控えの配りを止め、控えの置き場を消す
  - 最後のコミットで Build Gate が exit 0、`git diff --stat origin/main` が 4 ファイルだけで、作業木に未コミットの変更が無く、`origin/main` が作業木の先祖で、ブランチ `site-look-manual-files` がまだ push されておらず、控えの配りと置き場が残っていない
  - _Requirements: 8.1, 8.4, 8.5, 8.6_
