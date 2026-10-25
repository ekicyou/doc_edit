# Implementation Plan

- [ ] 1. 土台: 作業木と変更の前の控え
- [x] 1.1 ukadoc-spec の `origin/main` の最新からこの spec の作業木を作り、プレビューを起動する
  - ukadoc-spec を fetch し、`origin/main` から作業木 `.worktrees/site-look-sakura-script-highlight/` とブランチ `site-look-sakura-script-highlight` を作る。ukadoc-spec のメインのチェックアウトは使わない
  - 作った直後に追う先を外す（素の `git push` で `main` に送らないため）
  - 作業木で `prepare_site.py` と `zensical build --strict` を流してから `zensical serve` を起動する（doc_edit の `.venv` を使う）
  - 作業木の先頭が `origin/main` と同じコミットで、ブランチに追う先が無く、`/ukadoc-spec/list/sakura-script/` の頁がプレビューで開ける
  - _Requirements: 10.4_

- [x] 1.2 変更の前の控えを書き出して配り、後で比べる数と字を取る
  - 作業木の HEAD を `git archive` で Claude のスクラッチの下の新しいフォルダに書き出し、`prepare_site.py` と `zensical build --strict` を流して、`_site/` を 8000 以外の口（例: 8030）で配る
  - 控えの置き場と、書き出した作業木のコミットを控える（後のタスクが控えを配り直す・作り直すときに使う）
  - 控えの全頁（41。`404.html` を含む）で、`article` の中の見出しの id の並び・`class="headerlink"` の数・`class="md-nav__link` の数・`hr` の数・本文の字（タグを除いて空白を詰めたもの）と、`<div class="highlight">` の数（449）を控える。`search.json` も控える
  - `list/sakura-script` の 287 個の `code.innerText.trimEnd()` と、幅 1000・375 での 287 個の `code` の高さを控える。`list/sakura-script`・`spec/sstp`・`manual/install` の箱・点線・コピーのボタンと字の重なりの数と `.highlight` の地の色を控え、`before-sstp-light.png` を撮る
  - spec の `verification.md` を作り、「変更の前」の節に、控えの置き場・作業木のコミット・控えた数が書いてある
  - _Requirements: 3.4, 5.2, 6.1, 7.2, 9.9, 9.10_

- [ ] 2. 言語の印と着色
- [x] 2.1 `mkdocs.yml` に言語の印とスクリプトの読み込みを足し、`assets/sakurascript.js` を書く
  - プレビューを止めてから書く（書きかけの `_site_src/` を拾わせない）
  - 設計の「Modified Files」のとおり、`markdown_extensions` に `pymdownx.highlight`（`use_pygments: false`）を `pymdownx.superfences` の前に、`extra_css` の後に `extra_javascript` の `assets/sakurascript.js` を足す。ほかの行と `scripts/prepare_site.py`・`requirements.txt` には触らない
  - `assets/sakurascript.js` に、設計の字句の規則（番号の 4 つ・引数とエスケープ・`\\`・`\%`・囲み・環境変数の 4 つの形）と、誤りを救済せずブロックの終わりまで `sakurascript-error` にして `title` と `console.warn` を出す処理、`ss` に `language-sakurascript` を足す処理、要素のある `code` を包まない守り、字が変われば戻す守りを書く。外部の資源を読まず、注は短くし、試作の `slp-` や旧サイトのスクリプトを写さない
  - 作業木に 2 つのファイルの変更があり、`assets/sakurascript.js` の中身が設計の見本と同じ振る舞いをする（確かめは 2.2）
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 2.10, 2.11, 5.1, 5.4, 5.5, 10.2, 10.3, 10.8_

- [ ] 2.2 字句の規則を、作業木のスクリプトそのもので例の表と原稿の全ブロックに当てて確かめる
  - 作業木の `assets/sakurascript.js` を字を変えずに、偽の `document` の上で Node の `vm` で流す使い捨ての確かめを Claude のスクラッチに置く（ukadoc-spec にテストのファイルを足さない）
  - 設計の LexerCheck の例の表の 30 例すべてと、`ss` に印が付くこと、2 回流しても二重に包まないこと、誤りの無い例で警告が出ないことを見る
  - 原稿の ```` ```sakurascript ```` の 287 ブロックで、字が変わらないブロック 287・タグ 500・環境変数 6（名前の一覧）・誤り 0・警告 0 と、試作の規則との違い 13 か所を数える
  - 合わないときは 2.1 を直す。要件の規則と違う読み方が要るとき、または全ブロックで誤りが 1 個でもあるときは、止めて開発者に報告する（救済しない）
  - `verification.md` の「字句の規則」の節に、30 例の結果、全ブロックの数、誤り 0・警告 0、試作との違い 13 か所が書いてある
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 2.10, 2.11, 5.1, 9.3, 9.13_

- [ ] 2.3 `extra.css` の末尾に、タグ・環境変数・誤りの見た目の塊を足し、言語の印と着色を 1 コミットにする
  - 設計の「Modified Files」の塊を、今の末尾（`site-look-list-markers:` の最後の塊）の後ろに足す。ほかの塊・テーマの色・リンク・箱の地・地の文の色・札の色には触らない
  - 注は `/* site-look-sakura-script-highlight: 記述例のタグと環境変数 */` の 1 行だけにし、わけと数は書かない。暗い表示だけの 3 色は `@media screen` の中の `[data-md-color-scheme="slate"]` に置き、`padding` や字の大きさ・形の指定を足さない
  - 作業木で `mkdocs.yml`・`assets/sakurascript.js`・`assets/extra.css` を 1 コミットにする（ukadoc-spec の履歴の型の日本語の 1 文、名前は `-c user.name=ekicyou -c user.email=dot.station@gmail.com` で渡す）
  - 作業木の `assets/extra.css` の末尾に設計どおりの塊が 1 つあり、3 つのファイルのコミットが 1 つできている
  - _Requirements: 2.11, 3.1, 3.2, 3.3, 3.4, 3.7, 3.8, 4.1, 4.2, 5.3, 10.3, 10.7, 10.8_

- [ ] 2.4 `CLAUDE.md` の書式の 7 番目に `ss` を書き足してコミットする
  - 設計の差分のとおり 7 番目の 1 行だけを変え、ほかの決まりと原稿の ```` ```sakurascript ```` には触らない
  - 作業木で 1 コミット（2.3 と同じ型）
  - `git show --stat` が `CLAUDE.md` の 1 行の変更だけで、原稿の ```` ```sakurascript ```` が 287 のまま
  - _Requirements: 8.1, 8.2_

- [ ] 3. 配られた頁の数と字の確かめ
- [ ] 3.1 Build Gate と規約 Gate を通し、変更の範囲を確かめる
  - プレビューを止めてから、作業木で `prepare_site.py` と `zensical build --strict` を流す
  - 規約 Gate（ukadoc-spec の `CLAUDE.md` の決まり）に照らす
  - `prepare_site.py` と `build --strict` がどちらも exit 0 で、`git diff --stat origin/main` が `mkdocs.yml`・`CLAUDE.md`・`assets/extra.css`・`assets/sakurascript.js` だけである
  - _Requirements: 8.2, 10.1, 10.2, 10.5_

- [ ] 3.2 プレビューの配りと、言語の印・見出しの数を控えと比べる
  - プレビューを起動し直す（`prepare_site.py` → `build --strict` → `serve` の順）
  - `/ukadoc-spec/assets/extra.css` に `site-look-sakura-script-highlight:` の見出しのコメントがあり、`/ukadoc-spec/assets/sakurascript.js` が 200 で、全頁の HTML にスクリプトの読み込みが 1 つずつあることを見る。無ければプレビューを止めて作り直す
  - 全頁の `article` の中で `<pre class="highlight">` 449・`<code class="language-sakurascript">` 287・言語の印の無い `<pre class="highlight"><code>` 162・`language-ss` 0・`<div class="highlight">` 0 を数える
  - 1.2 の控えが配られていなければ配り直す（消えていれば 1.2 のコミットから作り直す）。全頁の見出しの id・¶・目次・`hr`・本文の字（言語の指定の無いブロックの字を含む）が控えと同じことを見る
  - `verification.md` の「配りと数」の節に、配りの結果・数の表・控えと違う頁 0 が書いてある
  - _Requirements: 1.1, 1.3, 6.2, 7.2, 9.1, 9.2, 9.10_

- [ ] 3.3 ブラウザの頁で、字・コピー・高さ・形・検索の字・動かないときと外部の読み込みを確かめる
  - プレビューが動いていなければ、`prepare_site.py` → `build --strict` → `serve` の順に起動する。内蔵ブラウザの枠（使えないときは Edge ヘッドレス + CDP）で開く。スクリプトを切った頁とボタンのコピー（クリップボードの許し）は CDP が要るので Edge ヘッドレス + CDP で見る
  - `list/sakura-script` で、`fetch` で取り直した HTML の記述例の字と包んだ後の `textContent` を 287 個比べて違い 0、包みの数がタグ 500・環境変数 6、`span.sakurascript-error` 0・`sakurascript:` の警告 0 を見る
  - 287 個の `code.innerText.trimEnd()` と、幅 1000・375 の高さが 1.2 の控えと同じこと、`#bang-lock-repaint`・`#q-script`・`#environmentvariable` の記述例のボタンでコピーした字が控えと同じことを見る
  - `list/sakura-script`・`spec/sstp`・`manual/install` で、箱・点線・ボタンと字の重なりの数と `.highlight` の地の色が控えと同じことを見る
  - 作業木と控えの `search.json` の字と題が、コードの末尾の改行と `class` のほかは同じことを見る
  - スクリプトを切った頁で記述例が字のノードだけで色が付かないこと、ふつうの頁の通信に `127.0.0.1` の外への読み込みが増えていないことを見る
  - 違いが出たときは 2.1・2.3 を見直し、直せないとき（とくに高さ・C09・C18 の形）は止めて測った数を添えて開発者に提示する
  - `verification.md` の「字とコピー」「形と折り返し」の節に、違い 0 の結果と数が書いてある
  - _Requirements: 3.3, 3.4, 5.1, 5.2, 5.4, 5.5, 6.1, 6.2, 7.1, 9.4, 9.9, 9.13_

- [ ] 3.4 使い捨ての写しで、`ss`・読み物の頁の記述例・誤りの見え方を確かめる
  - 作業木の HEAD を新しいスクラッチのフォルダに書き出し、`list/sakura-script/environment-variable/environmentvariable.md` の末尾に ```` ```ss ```` 1 つ、`memo/memo.md` の末尾に見出しと ```` ```ss ```` 1 つ・```` ```sakurascript ```` 1 つ、閉じない `[` のある ```` ```sakurascript ```` 1 つを足して build し、別の口で配る
  - `language-ss` 2・言語の印 290 を数え、ブラウザで `language-ss` の `code` に `language-sakurascript` が付いて `span` が入ること、`memo/memo` でも同じ見え方になることを見る
  - 誤りのブロックで、明・暗とも誤りの所からブロックの終わりまで波線が出て、`title` にわけがあり、頁・見出しの id・誤りの頭を添えた `console.warn` が出て、字とコピーが変わらないことを見る。下線の色と地の対比を明・暗で測る。`after-error-{light,dark}.png` を撮る
  - 終わったら写しごと消し、作業木と原稿には何も残さない
  - `verification.md` の「`ss` と読み物の頁」「誤りの見え方」の節に、数・見え方・警告・下線の対比が書いてあり、`screenshots/` に `after-error-*` の 2 枚がある
  - _Requirements: 1.2, 1.4, 2.11, 3.8, 9.5, 9.13_

- [ ] 4. 対比と画面
- [ ] 4.1 ukadoc-spec の `origin/main` に追いつき、測る版を決める
  - ukadoc-spec を fetch し、`origin/main` が作業木の分岐点から進んでいれば作業木で merge する。ぶつかったら `mkdocs.yml` は両方の行を、`extra.css` は両方の塊を残して直す
  - merge したときは Build Gate（3.1）をやり直し、原稿か見た目の指定が変わっていれば、控えを新しい `origin/main` から 1.2 と同じ手順で作り直して、2.2・3.2・3.3・3.4 の確かめをやり直し、`verification.md` の数を直す
  - 4.2・4.3 はこの版で測る（測る版を `verification.md` に書く）
  - `origin/main` が作業木の先祖で、Build Gate が exit 0 で、測る版が `verification.md` に書いてある
  - _Requirements: 10.7_

- [ ] 4.2 タグ・環境変数の対比、切り替え、印刷の指定、検索の強調を明・暗で測る
  - プレビューが動いていなければ、`prepare_site.py` → `build --strict` → `serve` の順に起動する
  - 設計の ContrastProbe の測り方（`getComputedStyle` の色と、要素から `html` までの地を重ねた色から WCAG 2.x の対比）で、「測る所と線」の表のタグ・環境変数の所を明・暗で測る。箱の外の地の上の値は、測った字と地の色から計算する。誤りの下線の 2 色は、今の頁に誤りが無いので 3.4 の写しで測った値を引く
  - 明るい表示で 7:1 を割ったら、赤紫（茶）の色相のまま明るさを 2% ずつ下げて（タグの 1 段目は `#810c4a`）測り直し、2.3 の塊を直してコミットする（設計の 2 つのコミットに足す 3 つ目。スクワッシュマージなので差し支えない）。薄い地の 9% は変えない。暗い表示で 4.5:1 を割ったときは値を選び直さず、止めて測った数と代わりの案を添えて開発者に提示する
  - 4 色が明・暗で互いに違うことと、明るい表示のタグが地の文の色と分かれることを、測った `color` の値で控える
  - 頁を読み込み直さずに明・暗を切り替えて色が替わること、`data-md-color-scheme` を含む規則がすべて `screen` の `CSSMediaRule` の中にあることを見る
  - `?h=raise`・`?h=username`・`?h=喋る` を明・暗で開き、記述例の中とタグ・環境変数の `span` の中の `mark` の数を数え、強調が見えることを確かめ、強調の中のタグの対比を控える。`mark` だけがあって `span` の無いブロックがあれば、読み込みの順を記録して開発者に提示する
  - `verification.md` の「対比」の節に、表のすべての所の色・地・対比、変数で出せない 6 色とその対比、切り替え・画面だけ・検索の強調の結果が書いてあり、すべて線を満たすか、開発者の判断を待つ状態で止まっている
  - _Requirements: 3.1, 3.2, 3.5, 3.6, 3.7, 4.1, 4.2, 7.1, 9.8_

- [ ] 4.3 変更の後の画面を撮り、目標の画面と見比べ、幅 375 を確かめる
  - プレビューが動いていなければ、`prepare_site.py` → `build --strict` → `serve` の順に起動する
  - 設計の「VerificationRecord」の画面の一覧のとおり、`shot.mjs`（読むだけで使う）で `after-sakura-script-*`・`after-environmentvariable-*`・`after-pID-*`・`after-q-script-*` を明・暗で、`after-sstp-light.png` を撮って spec の `screenshots/` に置く。二重に重なった跡があれば撮り直し、枚数とわけを控える
  - 記述例のタグと環境変数の見え方だけを、目標の画面（`mock-sakura-script-C21-*`、途中の段の `C10-*`・`C19-*`・`C20-*`、環境変数の濃さの `C17-light`）と見比べ、`\p2`・`\w9` の番号や囲みの中の地の文の違いを要件の規則による違いとして書く。`before-sstp-light.png` と `after-sstp-light.png` を見比べ、`\` が `\` のまま見えることを見る
  - 幅 375 の明・暗で `list/sakura-script` の `scrollWidth` と `innerWidth` が同じ 375 であることを見る
  - `after-` の画面がそろい、`verification.md` の「画面」の節に、見比べ・幅 375・撮り直しの枚数が書いてある
  - _Requirements: 3.1, 3.2, 5.3, 6.1, 7.3, 9.6, 9.7, 9.9, 9.11_

- [ ] 5. 記録と PR に出せる状態
- [ ] 5.1 `verification.md` の記録を仕上げる
  - 頭に、測った版（作業木のコミット、`origin/main` の版）と日付、流した式（Build Gate・LexerCheck・PageCheck・測りのスクリプト）をそのまま書く
  - 1.2・2.2・3.1〜3.4・4.1〜4.3 の節がそろっていることを見て欠けを埋め、Build Gate・規約 Gate・`git diff --stat origin/main` を書く
  - 開発者に画面やプレビューを見せるときは Ctrl+F5 を頼むことを書き、見せるときに実際に頼む
  - `verification.md` と `screenshots/` がそろい、設計の「Testing Strategy」の各項目の結果が書いてある
  - _Requirements: 9.2, 9.3, 9.4, 9.8, 9.12, 9.13_

- [ ] 5.2 作業木を `/kiro-complete` で PR に出せる状態にする
  - ukadoc-spec を fetch し、4.1 の後に `origin/main` がまた進んでいれば、4.1 と同じく追いつき、変わった所に当たる確かめをやり直して `verification.md` の版と結果を直す
  - この PR だけでサイトが壊れないこと（言語の印・スクリプト・見た目の指定がそろって入り、Build Gate が通り、スクリプトが動かなくても今の見え方）を確かめる。壊れると分かったら PR に出さずに溜め、開発者に報告する
  - 作業木の変更をすべてコミットし、push も PR もしない（PR は `/kiro-complete` で作る）
  - プレビューと控えの配りを止め、スクラッチの控えを消す
  - 作業木に未コミットの変更が無く、`origin/main` が作業木の先祖で、ブランチ `site-look-sakura-script-highlight` がまだ push されていない
  - _Requirements: 10.6, 10.7_

- [ ] 6. 整合性の確認と更新
  - ukadoc-spec: 新しい頁・ディレクトリは作らないので、`index.md` の `## 一覧`・`.nav.yml`・`INDEX.md`・`llms.txt` に足す所が無いことを確かめる
  - Build Gate（`prepare_site.py` と `zensical build --strict`）が通る
  - doc_edit: 初めて決めた方針（`assets/` の自作のスクリプトを `extra_javascript` で読み、外部の資源を読まないこと、記述例の誤りを救済せず波線と警告で示すこと）を steering（`tech.md`・`structure.md`）に書き足し、「doc_edit への記録」のとおり自分の道だけをコミットして push する
  - 一覧に足す所が無いことと Build Gate の結果が `verification.md` にあり、steering に方針の書き足しがある
  - _Requirements: 5.5, 2.11, 10.5_

## Implementation Notes
- どのタスクも同じ作業木の同じブランチにコミットし、プレビュー（`serve`）と `_site_src/` を共にするので、`(P)` は付けない
