# Implementation Plan

- [ ] 1. 土台: 作業木と変更の前の控え
- [x] 1.1 ukadoc-spec の `origin/main` の最新からこの spec の作業木を作り、プレビューを起動する
  - ukadoc-spec を fetch し、最新の `origin/main`（`site-look-manual-files` の PR #15 を含む。今は `1080225`）から作業木 `.worktrees/site-look-top-page/` とブランチ `site-look-top-page` を作り、作った直後に追う先を外す。ukadoc-spec のメインのチェックアウトは使わない
  - 作業木の根で `pip install -r requirements.txt` を流して `site_ext` を入れ（doc_edit の `.venv` を使う。動かなければスクラッチの使い捨ての venv で流し、そのことを控える）、`prepare_site.py` と `zensical build --strict` を流してから `zensical serve` を起動する
  - トップが開けることを見たら、プレビューを止める（2.1・2.2 は書きかけの `_site_src/` を拾わせないよう、プレビューの止まった作業木で書く）
  - 作業木の先頭が `origin/main` と同じコミットで、追う先が無く、`/ukadoc-spec/` のトップがプレビューで開けたことを見て、プレビューが止まっている
  - _Requirements: 9.3_

- [x] 1.2 変更の前の控えを書き出して配り、比べるための数を取る
  - 作業木の HEAD を `git archive` で Claude のスクラッチの下の新しいフォルダに書き出し、`prepare_site.py` と `zensical build --strict` を流して、`_site/` を `python -m http.server` で 8000 以外の口（例: 8010）に `/ukadoc-spec/` の下で配る（3.2〜3.4 がここと比べる。4.2 で止めて消す）
  - 控えの全 41 頁の HTML・`search.json`・`_raw/`・`llms.txt` を残し、トップの見出しの id の並び・`class="headerlink"` の数・`md-nav__link` の数・`article` の本文の字（タグを外し空白を詰めたもの）を控える（位置と余白は 3.3 で控えと後を並べて測る）
  - spec の `verification.md` を作り、「変更の前」の節に、控えの置き場の絶対パスと口・控えのコミット・トップの id・¶・目次の数を書く（後のタスクが控えを配り直し、作り直すときの手がかりにする）
  - 控えが 8010 などの口で開け、`verification.md` の「変更の前」の節がある
  - _Requirements: 1.3, 7.5, 8.3, 8.4_

- [ ] 2. 印と見た目の指定
- [x] 2.1 (P) 組み立ての処理で、トップの見出しと見方の箇条書きの名前に印を付ける
  - 1.1 で止めたプレビューを止めたまま書く（書きかけの `_site_src/` を拾わせない）
  - 設計の「Modified Files」の 5 か所（モジュールの docstring の 1 項目、`TOP_HEADING`、`mark_manual()` の引数 `cls` と docstring、`mark_top()`、`main()` の `index.md` を書く 1 行）だけを変え、ほかの処理と manual の頁の `mark_manual(text)` の呼び出しには触らない。頁の種類だけを示す印は足さない
  - 設計の「Testing Strategy」の `mark_top()` の例（`#`・`##`・`###`・`####` の見出し、見方の 2 つの形、リンクの行・リンクの無いまとめの項目・入れ子のリンク、コードブロックの中）と、`mark_manual(text)` を引数なしで呼んだ例を直に渡し、期待どおりかを控える
  - `prepare_site.py` と `zensical build --strict` が exit 0 で、`_site_src/index.md` の段 2・3 の見出しの行の末尾に `{: .top-section }`・`{: .top-category }` があり、見方の 7 行が `**…**{: .top-item } 説明` の形になり、例がすべて期待どおりである
  - _Boundary: TopMarker_
  - _Requirements: 1.1, 1.2, 1.4, 1.5, 2.4, 3.3, 3.4, 4.4, 4.5, 4.6, 4.7, 5.3, 7.1, 7.3, 7.5_

- [x] 2.2 (P) `extra.css` の既にある 4 つの塊の 8 つのセレクタにトップの印を足す
  - 設計の「Modified Files」の `extra.css` の差分のとおり、C01 の帯（`.top-category`・`.top-item`）、C03 の帯（`.top-section`）、濃い帯の ¶ と検索の強調の 2 つ（`.top-section`）、ファイル名の帯と説明の字下げの 4 つ（`:is(.manual-item, .top-item)`）だけを広げる
  - 宣言・塊の注・ほかのセレクタ（帯の中のコード・暗い表示の帯の中のリンク・C02 の詰め）は変えず、新しい塊・注・直書きの色・`@media screen` の指定を足さない
  - 作業木の `assets/extra.css` で、`.top-section` が 3 つ・`.top-category` が 1 つ・`.top-item` が 7 つあり、`git diff` の `+` の行がセレクタの行だけである
  - _Boundary: TopBandStyle_
  - _Requirements: 2.1, 2.3, 3.1, 4.1, 4.2, 4.3, 5.1, 5.2, 5.4, 6.4, 7.2, 9.2_

- [ ] 2.3 Build Gate と規約 Gate を通し、変更の範囲を確かめてコミットする
  - 作業木で `.cache/` を消してから `prepare_site.py` と `zensical build --strict` を流し、規約 Gate（ukadoc-spec の `CLAUDE.md` の決まり）に照らす
  - 2 ファイルの変更を 1 つのコミットにする（ukadoc-spec の履歴の型の日本語の 1 文。名前は `-c user.name=ekicyou -c user.email=dot.station@gmail.com` で渡す）。push も PR もしない
  - `prepare_site.py` と `build --strict` がどちらも exit 0 で、`git diff --stat origin/main` が `scripts/prepare_site.py`・`assets/extra.css` だけで、作業木に未コミットの変更が無い
  - _Depends: 2.1, 2.2_
  - _Requirements: 9.1, 9.4_

- [ ] 3. 配られた頁での確かめ
- [ ] 3.1 ukadoc-spec の `origin/main` に追いつき、測る版を決める
  - ukadoc-spec を fetch し、`origin/main` が作業木の分岐点から進んでいれば作業木で merge する。ぶつかったら `extra.css` はセレクタの並びに両方の印を残し、`prepare_site.py` の `index.md` の行は両方の処理を入れ子にして残す。メンテナの分担（`prepare_site.py` は class を付けるところまで、構造は `site_ext`）が変わっていれば `origin/main` の形に合わせ、合わせ方が設計と違うときは止めて開発者に提示する。`requirements.txt` か `site_ext/` が変わっていれば、作業木の根で `pip install -r requirements.txt` を流し直す
  - merge したときは Build Gate（2.3）と 2.1 の `mark_top()`・`mark_manual(text)` の例をやり直し、1.2 の控えを、作業木の HEAD でなく新しい `origin/main` のコミットから 1.2 の手順で作り直す。控えの置き場・コミットを `verification.md` に書き直す
  - 3.2〜3.4 はこの版で測る（測る版を `verification.md` に書く）
  - `origin/main` が作業木の先祖で、Build Gate が exit 0 で、測る版が `verification.md` に書いてある
  - _Requirements: 9.6_

- [ ] 3.2 配りと、印の数・漏れ・変わらないことを、プレビューの頁の HTML で数える
  - プレビューを止め、作業木で `.cache/` を消して `prepare_site.py` → `zensical build --strict` → `zensical serve` の順に起動し直す。控えが配られていなければ、`verification.md` に書いた置き場から配り直す（無ければ書いたコミットから 1.2 の手順で作り直す）
  - 配られた `/ukadoc-spec/assets/extra.css` が 200 で、`.top-section` 3・`.top-category` 1・`.top-item` 7 があることを見る。無ければ起動し直す
  - 設計の「TopCheck」の期待の数の表を数える: `h2.top-section` 5・`h3.top-category` 7・`strong.top-item` 7（うち `li > strong` 1）・外した「`:`」7・漏れ 0・帯の中のリンク 0・帯の中のコード 0・トップの `table` 0・`h1` の class 無し・トップの外の頁の `top-` の class 0
  - 控えと、トップの id の並び・¶・`md-nav__link` の数が同じ、トップの本文の字の違いが「`:`」7 字だけ、トップを除く 40 頁の HTML がバイト単位で同じ、`search.json` の違いが「ukadocの見方」の 1 件だけ、`_raw/`・`llms.txt` が同じことを見る
  - 数が合わない・漏れる・変わるときは 2.1 を見直す。原稿の新しい書き方が理由なら、原稿は直さず数と行を記録して開発者に提示する
  - `verification.md` の「配り」「印の数」「変わらないこと」の節に、数の表と結果、帯の中のリンクの数（6.3）が書いてある
  - _Requirements: 1.1, 1.3, 1.5, 2.4, 3.3, 4.4, 4.5, 4.7, 6.3, 7.1, 7.3, 7.5, 8.1, 8.2, 8.3, 8.4_

- [ ] 3.3 帯の位置・余白と、帯の字と ¶ の対比・切り替え・印刷の指定・検索の強調・幅 375 を明・暗で測る
  - プレビューが動いていなければ、作業木で `.cache/` を消して `prepare_site.py` → `zensical build --strict` → `zensical serve` の順に起動する
  - 控えが配られていなければ、3.2 と同じく `verification.md` に書いた置き場から配り直す（無ければ書いたコミットから 1.2 の手順で作り直す）
  - `site-look-list-items` の `verification.md` の「流した式」に従い、Edge ヘッドレス + CDP で、設計の「ContrastProbe」の「測る所と線」の表の所をすべて明・暗で測る（幅 1000。¶ はふだん・ホバー・フォーカス）
  - 帯 19 個の左の端と幅が 1 通り、見方の説明の左の端が 1 通り、見方の項目の点が `none`、ほかの一番外の項目の点が `disc` で左の端が控えと同じ、帯と段落の余白が設計の「写しの余白」と同じ、目次のリンクの行の間隔が控えと同じことを、控えと後を同じ式で測って見る
  - 頁を読み込み直さずに明・暗を切り替えて帯の色が変わること、`extra.css` の `data-md-color-scheme` を含む規則がすべて `screen` の `CSSMediaRule` の中にあることを見る
  - `?h=目次`・`?h=ファイル構成` を明・暗で開き、3 種の帯の中の `mark` の数と見え方を見る。幅 375 の明・暗でトップの `scrollWidth` と `innerWidth` が同じ 375 であることを測る（幅 375 の画面は残さない）
  - どれかが線に届かないとき・余白が写しと違うときは、値を勝手に選び直さず、そこで作業を止め、測った数を添えて開発者に提示して判断を待つ
  - `verification.md` の「位置と余白」「対比」「切り替えと印刷」「検索の強調」「幅 375」の節に結果が書いてあり、すべて線を満たすか、開発者の判断を待つ状態で止まっている
  - _Requirements: 2.2, 2.3, 3.2, 3.4, 4.2, 4.6, 5.2, 5.3, 5.4, 6.1, 6.2, 7.2, 7.4, 8.6, 8.7_

- [ ] 3.4 変更の後の画面を撮り、当て先と並べて記録する
  - プレビューが動いていなければ、作業木で `.cache/` を消して `prepare_site.py` → `zensical build --strict` → `zensical serve` の順に起動する
  - 設計の「VerificationRecord」の画面の一覧のとおり、`after-` の画面 7 組を `shot.mjs`（読むだけで使う）で明・暗で撮って spec の `screenshots/` に置く。二重に重なった跡があれば撮り直し、枚数とわけを控える
  - トップの画面を当て先（`after-ref-*`）と並べ、節の見出しが分類の帯、目次の分類が項目名の帯、見方の分類名がファイル名の帯と説明の字下げ（「その他」を含む）と同じ見え方で、帯とリンクの並びが見分けられることを確かめる
  - 開発者に画面やプレビューを見せるときは Ctrl+F5 を頼む。開発者が帯の上下の余白を変えたいと見たときは、値を勝手に選び直さず、そこで作業を止め、3.3 で測った余白を添えて提示して判断を待つ（設計の話し合いの議題 1）
  - `after-` の画面 14 枚がそろい、`verification.md` の「画面」の節に、見比べの結果と撮り直しの枚数が書いてあり、開発者の判断を待つときはその状態で止まっている
  - _Requirements: 2.1, 3.1, 4.1, 4.3, 5.1, 5.2, 5.4, 8.5, 8.8, 8.9_

- [ ] 4. 記録と完了への引き継ぎ
- [ ] 4.1 `verification.md` の記録を仕上げる
  - 頭に、測った版（作業木のコミット、`origin/main` の版）と日付、流した式（Build Gate・測りのスクリプト・重ねの計算）を書く
  - 1.2・2.1・3.1〜3.4 の結果の節がそろっていることを見て、欠けた所を埋め、宣言・直書きの色を足していないこと（6.4・9.2）、Build Gate・規約 Gate・`git diff --stat origin/main` を書く
  - 開発者に画面やプレビューを見せるときは Ctrl+F5 を頼むことを書き、見せるときに実際に頼む
  - `verification.md` と `screenshots/` がそろい、設計の「Testing Strategy」の各項目の結果が書いてある
  - _Requirements: 6.4, 8.9, 9.1, 9.2, 9.4_

- [ ] 4.2 作業木を `/kiro-complete` に渡せる状態にする
  - ukadoc-spec を fetch し、3.1 の後に `origin/main` がまた進んでいれば、3.1 と同じく追いつき、変わった所に当たる 3.2〜3.4 の確かめをやり直して `verification.md` の版と結果を直す
  - 作業木の変更をすべてコミットし、push も PR もしない。このタスクは、この spec だけの変更が 1 本のブランチにそろい、渡せる状態であることまでを確かめる（PR とスクワッシュマージは `/kiro-complete` で行う）
  - 最後のコミットの後で、Build Gate・規約 Gate・`git diff --stat origin/main` をやり直し、結果を `verification.md` に書き直す
  - プレビューと 1.2 の控えの配りを止め、控えの置き場を消す
  - 最後のコミットで Build Gate が exit 0、`git diff --stat origin/main` が 2 ファイルだけで、作業木に未コミットの変更が無く、`origin/main` が作業木の先祖で、ブランチ `site-look-top-page` がまだ push されておらず、控えの配りと置き場が残っていない
  - _Requirements: 9.4, 9.5, 9.6_

## Implementation Notes
- doc_edit の `.venv` は uv で作られ pip が無い。`requirements.txt` は作業木の根で `uv pip install --python .venv/Scripts/python.exe -r requirements.txt` で入れる（editable の `site_ext` が古い作業木を指したままだと build が import で落ちる）
