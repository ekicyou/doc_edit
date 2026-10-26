# Implementation Plan

- [ ] 1. 土台: 作業木と変更の前の控え
- [x] 1.1 ukadoc-spec の `origin/main` の最新からこの spec の作業木を作り、プレビューで開けることを見る
  - ukadoc-spec を fetch し、`origin/main`（`site-look-manual-files` の PR #15 を含む。設計の時点は `f54423d`）から作業木 `.worktrees/site-look-definition-tables/` とブランチ `site-look-definition-tables` を作り、作った直後に追う先を外す。ukadoc-spec のメインのチェックアウトは使わない
  - 作業木で `prepare_site.py` と `zensical build --strict` を流してから `zensical serve` を起動する（doc_edit の `.venv` を使う。動かなければスクラッチの使い捨ての venv で流し、そのことを控える）
  - 頁が開けることを見たら、プレビューを止める（2.1〜2.4 は書きかけの `_site_src/` を拾わせないよう、プレビューの止まった作業木で書く）
  - 作業木の先頭が `origin/main` と同じコミットで、追う先が無く、`/ukadoc-spec/` の頁がプレビューで開けたことを見て、プレビューが止まっている
  - _Requirements: 6.4_

- [x] 1.2 変更の前の控えを書き出して配り、比べるための数と字を取る
  - 作業木の HEAD を `git archive` で Claude のスクラッチの下の新しいフォルダに書き出し、`prepare_site.py` と `zensical build --strict` を流して、`_site/` を `python -m http.server` で 8000 以外の口（例: 8010）に `/ukadoc-spec/` の下で配る（3.2〜3.5 がここと比べる。4.2 で止めて消す）
  - 控えの全頁の HTML・`search.json`・`_raw/`・`llms.txt` を残し、頁ごとに、見出しの id の並び・`a.headerlink` の数・右の欄の目次の項目の数・`pre` の数、表になる見込みの箇条書きの項目の（名前・説明・`href`）の並び、`site-look-list-markers` と `site-look-manual-files` の目印の数、`list/` の頁の空行で分かれた Reference の箇条書きの番号が続く所と振り直す所の数を控える
  - spec の `verification.md` を作り、「変更の前」の節に、控えの置き場の絶対パスと口・控えのコミット・上の数を書く（後のタスクが控えを配り直し、作り直すときの手がかりにする）
  - 控えが 8010 などの口で開け、`verification.md` の「変更の前」の節に、目印の数（`bundle-support` 1640・`bundle-default` 423・`bundle-notes` 16・`bundle-baseware` 2719・`manual-item` 73）と空行の数（続く所 27・振り直す所 27）が書いてある
  - _Requirements: 4.3, 4.7, 4.8, 4.10, 5.4, 7.6_

- [ ] 2. 表への書き換え・見た目・原稿の直し
- [x] 2.1 (P) 組み立ての処理で、名前と説明の箇条書きと `list/` の頁の Reference の箇条書きを表に書き換える
  - 1.1 で止めたプレビューを止めたまま書く（書きかけの `_site_src/` を拾わせない）
  - 設計の「Modified Files」の差分のとおり、モジュールの docstring の 1 項目、箇条書きの形の 3 つの定数、見分けと表の組み立ての 4 つの関数、`main()` の書き出しの 3 か所（まとめ頁・読み物の頁・トップ。Reference を見分けるのは `list/` のまとめ頁だけ）だけを変え、ほかの処理には触らない。警告・エラーは出さない
  - 設計の「Testing Strategy」の単体の例（2 項目の箇条書き、Reference でない 1 項目、`references` が偽の `Reference0`、入れ子を持つ `Reference0`、`MUST` を含む 5 項目、コードブロックの中、字下げ 4 と 2）を使い捨てのスクリプトで直に渡し、期待どおりかを控える
  - `prepare_site.py` と `zensical build --strict` が exit 0 で、単体の例がすべて期待どおりで、`_site_src/` の `list/propertysystem` の頁に `<div class="definition-table" markdown="1">` があり、manual の頁に無い
  - _Boundary: DefinitionTabulator_
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 1.10, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 4.1, 4.5, 4.6, 6.8_

- [x] 2.2 (P) `extra.css` の末尾に名前と説明の表の塊を足す
  - 設計の「Modified Files」の CSS のとおり、`/* site-look-definition-tables: 名前と説明の表 */` の 1 行の注で始まる 1 つの塊を末尾に足す（字の大きさ `.75rem`、行の上下 `.45em .9em` と `overflow-wrap: anywhere`、`@media screen and (min-width: 45em)` の中だけ名前の列の `nowrap`）
  - 色・幅・太字の指定と、ほかの塊・旧サイトや試作の指定（`data-slp`）は足さず、変えない
  - 作業木の `git diff assets/extra.css` の `+` の行がこの 1 つの塊だけで、注が 1 行、色の値が 0 である
  - _Boundary: TableStyle_
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.10, 2.5, 6.3, 6.8_

- [x] 2.3 (P) 意味の無い空行のある原稿 6 つと `rateofusegraph` を直す
  - 設計の「Modified Files」の原稿の表のとおり、6 ファイルの空行（4・3・12・2・2・10）を除き、`rateofusegraph.md` の `1番目`〜`13番目` の 13 行と `7番目` の続きの 4 行に 2 字の字下げを足して `Reference*` の行との間の空行を除く
  - 空行と字下げのほかは 1 字も変えず、改行の形も変えない（索引は LF のまま）。意味のある空行（`OnPoker`・`OnPokerNotify`・`OnMahjong`・`OnMahjongResponse` の 27 か所）には触らない
  - `git diff --stat -- list/` が 7 ファイルで、`git diff --ignore-blank-lines --ignore-all-space -- list/` が空になり、字下げの変わった行が `rateofusegraph.md` の 17 行（2 字を足しただけ）だけで、7 ファイルの見出しの行が変わっていない（2.1・2.2・2.4 が同じ作業木のほかのファイルを並べて書くので、確かめは `list/` に限る）
  - _Boundary: ManuscriptJoin_
  - _Requirements: 7.1, 7.2, 7.3, 7.5_

- [x] 2.4 (P) ukadoc-spec の `CLAUDE.md` に空行の決まりを足す
  - 設計の「Modified Files」の文案のとおり、「書式」の「リストは `- ` で書き…」の項目の直後に 1 項目を足し、ほかの行は変えない
  - `git diff CLAUDE.md` の `+` の行が文案の 1 行だけである
  - _Boundary: BlankLineRule_
  - _Requirements: 7.4_

- [x] 2.5 Build Gate と規約 Gate を通し、変更の範囲を確かめてコミットする
  - 作業木で `prepare_site.py` と `zensical build --strict` を流し、規約 Gate（ukadoc-spec の `CLAUDE.md` の決まり）に照らす
  - 10 ファイルの変更をコミットにする（ukadoc-spec の履歴の型の日本語の 1 文。名前は `-c user.name=ekicyou -c user.email=dot.station@gmail.com` で渡す）。push も PR もしない
  - `prepare_site.py` と `build --strict` がどちらも exit 0 で、`git diff --stat origin/main` が `scripts/prepare_site.py`・`assets/extra.css`・`CLAUDE.md`・7 つの原稿の 10 ファイルだけで（`requirements.txt`・`mkdocs.yml`・`.nav.yml`・`INDEX.md` を含まない）、作業木に未コミットの変更が無い
  - _Depends: 2.1, 2.2, 2.3, 2.4_
  - _Requirements: 6.1, 6.2, 6.5_

- [ ] 3. 配られた頁での確かめ
- [x] 3.1 ukadoc-spec の `origin/main` に追いつき、測る版を決める
  - ukadoc-spec を fetch し、`origin/main` が作業木の分岐点から進んでいれば作業木で merge する。`site-look-top-page` が先に入ってぶつかったときは、設計の「Integration & Migration Notes」のとおり、トップの行を `tabulate(mark_top(…), False)`、読み物の頁の行を `tabulate(mark_manual(…) …, False)` にして両方を残し、`extra.css` はほかの spec の塊の後ろにこの塊を置く
  - merge したときは Build Gate（2.5）と 2.1 の単体の例をやり直し、1.2 の控えを、作業木の HEAD でなく新しい `origin/main` のコミットから 1.2 の手順で作り直す。控えの置き場・コミットを `verification.md` に書き直す
  - 3.2〜3.5 はこの版で測る（測る版を `verification.md` に書く）
  - `origin/main` が作業木の先祖で、Build Gate が exit 0 で、測る版が `verification.md` に書いてある
  - _Requirements: 6.7_

- [x] 3.2 配りと、表の数・外した形・空行を、プレビューの頁の HTML で数える
  - プレビューを止め、作業木で `prepare_site.py` → `zensical build --strict` → `zensical serve` の順に起動し直す。控えが配られていなければ、`verification.md` に書いた置き場から配り直す（無ければ書いたコミットから 1.2 の手順で作り直す）
  - 配られた `/ukadoc-spec/assets/extra.css` が 200 で、`site-look-definition-tables:` の注が 1 つあることを見る。無ければ起動し直す
  - 設計の「TableCheck」のとおり、全頁の `div.definition-table` を頁ごとに名前と説明の箇条書きの表と Reference の箇条書きの表に分けて数え、置き場所（一番外・`div.bundle-notes`・注記の箱・項目の中・表の中）も数えて、期待の数の表（計 632 個、477 / 2105 と 155 / 182）と比べる
  - HTML の木の判定で表になるはずで残った箇条書きを数え、外した形（Reference でない 1 項目・`spec/shiori3` の `Reference` 3・2 つ以上の段落・コードブロック・名前の後ろが「`: `」でない・manual の頁）を数えて例を控える。`list/` の頁で並んだ Reference の表の番号が続く所と振り直す所を数える
  - 数が合わない・残るときは 2.1 を見直す。原稿の新しい書き方が理由なら、原稿は直さず数と行を記録して開発者に提示する
  - `verification.md` の「配り」「表の数」「外した形」「空行」の節に、頁ごとの数の表と例が書いてあり、残り 0・番号が続く所 0・振り直す所 27 である
  - _Requirements: 1.1, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 1.10, 5.1, 5.2, 5.3, 7.3, 7.6_

- [x] 3.3 表の字・リンク・見出し・目印・生の原稿が変わらないことを、控えと比べる
  - 設計の「TableCheck」の字の照合のとおり、控えの箇条書きの項目の（名前・説明・`href`）と、後の表の行の（名前の欄・説明の欄・`href`）を頁ごとに順に比べる（空白を詰め、説明の頭の「`: `」と中の表の見出しの行を除く）。`\` を含む名前と、表の中の字が `search.json` で引けることも見る
  - 全頁の見出しの id の並び・`a.headerlink` の数・右の欄の目次の項目の数・`pre` の数を控えと比べ、HTML に `markdown=` が 0 であることを見る
  - 目印の数（`bundle-support`・`bundle-default`・`bundle-notes`・`bundle-baseware`・本文の `{:` 0・`manual-item`）を控えと比べ、`llms.txt` が同じで `_raw/` の差が直した 7 原稿だけであることを見る
  - 違いがあれば 2.1 か 2.3 を見直す
  - `verification.md` の「字の照合」「変わらないこと」「目印」の節に、違い 0 と各数が書いてある
  - _Requirements: 2.2, 2.3, 2.4, 2.6, 4.1, 4.3, 4.5, 4.6, 4.7, 4.8, 4.10, 5.4, 7.5_

- [ ] 3.4 変更の後の画面を明・暗で撮り、目標の画面と見比べる
  - プレビューが動いていなければ、作業木で `prepare_site.py` → `zensical build --strict` → `zensical serve` の順に起動する
  - 設計の「ShotCheck」のとおり、`shot.mjs`（読むだけで使う）で、目標と同じ 3 か所と、写っていない所（注意書きの箱・`dev/nar` の注記の箱・`spec/shiori3` の項目の中・名前にリンクや `code` のある表・長い名前・表の中の表・縦に並ぶ表）を明・暗で撮り、`after-*.png` として spec の `screenshots/` に置く。二重に重なった跡があれば撮り直し、枚数を控える
  - 目標の画面（`mock-*-C23-*.png`）の表の部分と、詰め・字の大きさ・名前の太字・幅の出方を見比べ、項目名の帯・詰め・注釈の絵・記述例の色と manual の頁の木の色が崩れていないことを見る
  - 開発者に画面やプレビューを見せるときは Ctrl+F5 を頼む。見た目の値を変えたいと見られたときは、値を勝手に選び直さず、そこで作業を止めて提示し、判断を待つ
  - `after-` の画面がそろい、`verification.md` の「画面」の節に、見比べの結果と撮り直しの枚数が書いてある
  - _Requirements: 1.7, 1.8, 3.1, 3.2, 3.3, 4.8, 4.9, 5.5, 5.6, 5.10, 5.11_

- [ ] 3.5 幅 375・対比・明暗の切り替え・印刷・検索の強調を測る
  - プレビューが動いていなければ、作業木で `prepare_site.py` → `zensical build --strict` → `zensical serve` の順に起動する
  - 幅 375 の明・暗で、表のある 20 頁と `manual/ghost` の `scrollWidth` と `innerWidth` が同じ 375 であることを測る（幅 375 の画面は残さない）。幅 1000 で名前の列が折り返さず、375 で長い名前が途中で折り返されることを見る
  - 表の字・リンク・名前の字と、行の地・指したときの地の対比を明・暗で測る
  - 頁を読み込み直さずに明・暗を切り替えて表の色が変わること、暗い表示のまま印刷の媒体で表の色が明るい表示と同じで名前が折り返されることを見る
  - `?h=<表の中の語>` を明・暗で開き、表の中の `mark` が見えることを見る
  - どれかが線（375・4.5:1）に届かないときは、値を勝手に選び直さず、そこで作業を止め、測った数を添えて開発者に提示して判断を待つ
  - `verification.md` の「幅 375」「対比」「切り替えと印刷」「検索の強調」の節に結果が書いてあり、すべて線を満たすか、開発者の判断を待つ状態で止まっている
  - _Requirements: 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4.2, 4.4, 5.7, 5.8_

- [ ] 4. 記録と完了への引き継ぎ
- [ ] 4.1 `verification.md` の記録を仕上げる
  - 頭に、測った版（作業木のコミット、`origin/main` の版）と日付、流した式（Build Gate・数えるスクリプト・`shot.mjs` の式）を書く
  - 1.2・2.1・3.1〜3.5 の結果の節がそろっていることを見て欠けた所を埋め、字下げ 4 の `dev/nar` の表の HTML の形と画面（設計の話し合いの議題 2）、色の値を足していないこと（3.10・6.3）を書く
  - `spec/shiori3` の 7 個の表を見て、C16 をこの表で足りるとみなせそうかの見立てと理由を書く
  - PR の本文に写す、頁ごとの表の数・外した形の例・直した 7 原稿をまとめた節を書き、開発者に見せるときの Ctrl+F5 の頼みを書く
  - `verification.md` と `screenshots/` がそろい、設計の「Testing Strategy」の各項目の結果と、C16 の見立てと、PR の本文の材料が書いてある
  - _Requirements: 3.10, 5.9, 5.11, 6.3, 6.6_

- [ ] 4.2 作業木を `/kiro-complete` に渡せる状態にする
  - ukadoc-spec を fetch し、3.1 の後に `origin/main` がまた進んでいれば、3.1 と同じく追いつき、変わった所に当たる 3.2〜3.5 の確かめをやり直して `verification.md` の版と結果を直す
  - 作業木の変更をすべてコミットし、push も PR もしない（PR とスクワッシュマージは `/kiro-complete` で行う）
  - 最後のコミットの後で、Build Gate・規約 Gate・`git diff --stat origin/main` をやり直し、結果を `verification.md` に書き直す
  - プレビューと 1.2 の控えの配りを止め、控えの置き場を消す
  - `verification.md` の「引き継ぎ」の節に、`/kiro-complete` で `.kiro/steering/structure.md` の目印の名前の決まりに「どの頁の種類にも出る役は `<役>` だけの名前にする」を 1 文足すこと（設計の話し合いの議題 1）を書く
  - 最後のコミットで Build Gate が exit 0、`git diff --stat origin/main` が 10 ファイルだけで、作業木に未コミットの変更が無く、`origin/main` が作業木の先祖で、ブランチ `site-look-definition-tables` がまだ push されておらず、控えの配りと置き場が残っていない
  - _Requirements: 6.1, 6.4, 6.5, 6.7_
