# 試作の記録: site-look-plan

`candidates.md` の候補（`C01` から）を、3 頁に使い捨ての試作として当てた記録である（Requirement 3）。試作は ukadoc-spec の作業木 `.worktrees/site-look-plan/` の中だけで作り、作業木ではコミットも push もしない（Requirement 3.2・6.1）。後の `decisions.md` は、この記録と `screenshots/mock-*.png` を材料にする。

- 今の見た目（`base`）を撮った版: ukadoc-spec の `c84942a`（`origin/main` と同じ。`ukadoc-spec/` のメインのチェックアウトで、原稿と設定は変えていない）。2026-10-24 に撮った
- 作業木の起点: `c84942a`（`git -C .worktrees/site-look-plan log --oneline origin/main..HEAD` が空）
- 作業木で変えたファイル（3.1 の時点。どれも未コミット）: `assets/mockup.js`（新規）、`mkdocs.yml`（`extra_javascript` に `assets/mockup.js` を足しただけ）。原稿・`.nav.yml`・`requirements.txt` は触らない（Requirement 6.2）
- 作業木で変えたファイル（3.2 の時点。どれも未コミット）: `assets/extra.css`・`scripts/prepare_site.py`・`mkdocs.yml`（`pymdownx.highlight` を追加）・`assets/mockup.js`（C10 の着色を追加）。中身は `list/sakura-script` の節
- 作業木で変えたファイル（3.3 の時点。どれも未コミット）: `assets/extra.css`（C02・C05・C07 を追加）・`scripts/prepare_site.py`（C07 の目印 `slp-default` を追加）。中身は `descript/ghost` の節

## 候補の切り替えの仕掛け

- 作業木の `assets/mockup.js` が、頁の URL の `?slp=C01,C03` を読んで `<html data-slp="C01 C03">` を付ける。何も保存しないので、`?slp=` の無い頁や、リンクで移った先の頁には付かない
- 候補ごとの見た目の指定は、作業木の `assets/extra.css` の `html[data-slp~="C01"]` の下に書く（3.2 から）。`?slp=` に並べた候補だけが効くので、両立しない候補（C04 と C11、C05 と C06）を同じ build のまま見比べられる
- `prepare_site.py` の目印と `mkdocs.yml` の `pymdownx.highlight` は `?slp=` で切り替えられず、試作の build の全体に効く。そのため今の見た目は、作業木ではなく、メインのチェックアウトで撮る（design.md の「試作の作り方」）
- プレビュー: 作業木で `python scripts/prepare_site.py` を流してから `zensical serve -a 127.0.0.1:8002` を起動し、`http://127.0.0.1:8002/ukadoc-spec/list/sakura-script/?slp=C01,C03` のように開く（`site_url` が `https://ukatech.shillest.net/ukadoc-spec/` なので、頁の道は `/ukadoc-spec/` から始まる）
- 確かめた結果（3.1）: 作業木で `prepare_site.py` と `zensical build --strict` が exit 0。build の 3 頁（`list/sakura-script`・`descript/ghost`・`manual/ghost`）の HTML に `mockup.js` の読み込みが 1 つずつある。`serve` の `list/sakura-script/?slp=C01,C03` を `tools/shot.mjs` で開き、セレクタ `html[data-slp~="C01"][data-slp~="C03"]` が見つかった（exit 0）。`?slp=` を付けない同じ頁では `html[data-slp]` が見つからなかった（exit 1）

## 今の見た目の画面

どれも `ukadoc-spec/` のメインのチェックアウト（`c84942a`）を `zensical serve -a 127.0.0.1:8001` で出し、`tools/shot.mjs` で幅 1000・高さ 700 に切り出した。試作の画面（`mock-<page>-<Cnn>-<light|dark>.png`）は、同じ頁の道・同じセレクタ・同じ大きさで撮る（Requirement 3.4）。

| 画面（明・暗） | 頁の道 | セレクタ | 写っている部分 | 使う候補 |
|---|---|---|---|---|
| `mock-sakura-script-base-light.png`・`mock-sakura-script-base-dark.png` | `/ukadoc-spec/list/sakura-script/` | `#bang-lock-repaint` | 項目 `\![lock,repaint]`・`\![unlock,repaint]` の名前・説明・対応・記述例と、項目の間の線 | C01・C06・C08・C09・C10 |
| `mock-sakura-script-base-notes-escape-light.png`・`mock-sakura-script-base-notes-escape-dark.png` | `/ukadoc-spec/list/sakura-script/` | `#notes_escape` | 頁の頭の注意書き 2 つ（`h2#notes_escape`・`h2#notes_lifespan`）と、その下の分類の見出し `h2#scope`（スコープコマンド）と最初の項目の名前 | C04・C11・C03 |
| `mock-descript-ghost-base-light.png`・`mock-descript-ghost-base-dark.png` | `/ukadoc-spec/descript/ghost/` | `#charset` | 項目 `charset`・`name`・`type` の名前・説明・既定値・対応と、項目の間の線（3 項目） | C02・C05・C07 |
| `mock-manual-ghost-base-light.png`・`mock-manual-ghost-base-dark.png` | `/ukadoc-spec/manual/ghost/` | `h1#ゴースト` | 頁の題、ファイル構成の木（コードブロック）、ファイルごとの説明の箇条書きの頭 | C12・C14・C15 |

- `list/sakura-script` は、候補の位置が 3 つ（`#bang-lock-repaint`・`#notes_escape`・`#scope`）に分かれるので、2 つの位置で撮った。`#scope` は `#notes_escape` の画面の下に写るので、別には撮っていない。C03 の試作は `#notes_escape` の位置で撮る（`#scope` を上端にした画面が要るなら、3.2 で `mock-sakura-script-base-scope-<light|dark>.png` を撮り足す）
- 名前の付け方: 頁の主な位置の画面は `mock-<page>-base-<light|dark>.png`（design.md の「画面の名前の付け方と上限」）。同じ頁の 2 つ目の位置は、位置の名前を足して `mock-<page>-base-<位置>-<light|dark>.png` とした。位置の名前は、セレクタの id の `_` を `-` にしたもの
- `#notes_escape` の位置では、頁の `h1` がちょうどヘッダの題の切り替わる高さにあり、暗い表示の画面のヘッダの題（「UKADOC project」と「SAKURA Script」）が重なって写る。撮り直しても同じだった。本文と右の欄の目次は崩れていないので、そのまま使う
- 4 つの位置の 8 枚の画面はどれも、白紙でなく、狙った要素が上端近くに写っていることを目で見た（試作の確かめ 3）。幅 1000 では、どれも `scrollWidth` と `innerWidth` が 1000 で同じだった

## `list/sakura-script`

- 当てる候補（`candidates.md`）: C01（`#bang-lock-repaint`）・C03（`#scope`）・C04（`#notes_escape`）・C06（`#bang-lock-repaint`）・C08（`#bang-lock-repaint`）・C09（`#bang-lock-repaint`）・C10（`#bang-lock-repaint`）・C11（`#notes_escape`）
- 今の見た目: `mock-sakura-script-base-*.png`・`mock-sakura-script-base-notes-escape-*.png`
- 確かめた候補: C01・C03・C04・C06・C08・C09・C10・C11 の 8 つ。どれも試作の画面を明・暗で撮れた（2026-10-24）
- 作り方（触った作業木のファイルと写し。写しは 3.5 で `mockups/` に残す）:
  - `assets/extra.css` — 末尾に、候補ごとの指定を `html[data-slp~="Cxx"]` の下に足した（C01・C03・C04・C06・C08・C09・C10・C11）。暗い表示の色は、`data-md-color-scheme="slate"` が `<body>` に付くので `html[data-slp~="Cxx"] [data-md-color-scheme="slate"] …` で書いた（C06・C10）。ほかの候補は Material の色の変数（`--md-primary-fg-color`・`--md-default-fg-color--lighter` など）だけで明・暗に合わせた
  - `scripts/prepare_site.py` — まとめ頁の後処理に `slp_mark()` を足した（C04・C06・C11 の目印）。`**対応:**` の段落の末尾（空行の手前）の次の行に `{: .slp-support }` を足し、` / ` で区切った各部分のうち「名前（`Materia`・`SSP`・`CROW`・`Ninix`）、または名前と空白と数字で始まる版」に合うものの名前を `<span class="slp-bw slp-bw-ssp">SSP</span>` のように包む（合わない部分はそのまま）。`notes_*.md` の単位を `<div class="slp-notes" markdown="1">` で包む。コードブロックの中は触らない
  - `mkdocs.yml` — `markdown_extensions` に `pymdownx.highlight`（`use_pygments: false`）を足した（C10）。**`?slp=` に関係なく、試作の build の全コードブロック 449 個の HTML が `<div class="highlight"><pre><span></span><code>` から `<pre class="highlight"><code>` の形に変わる**（`language-sakurascript` の印が付くのは 287 個）。`?slp=` を付けない同じ頁の画面（例: C01 の画面のコードブロック）と `base` を見比べて、コードブロックの見え方（地の色・折り返し・右上のコピーのボタン）に目で見て分かる違いは無かった
  - `assets/mockup.js` — `data-slp` に `C10` があるときだけ、`code.language-sakurascript` の字を、タグ（`\` の後の 1 字か `_`・`__` と 1 字、続く `[…]`）を `span.slp-ss-tag`、環境変数（`%` と英字、続く `[…]`）を `span.slp-ss-env` で包む。字は `textContent` から作り直すだけで、包んだ後の `textContent` が元と同じことを `console.assert` で確かめる形にした（コピーされる字は変わらない。D19）。外部のスクリプトは読まない
  - `overrides/`・`assets/image/slp-*` は作っていない
  - 組み立て: 作業木で `python scripts/prepare_site.py` が exit 0、`zensical build --strict` が exit 0（No issues found）。`extra.css` の手直しのたびに両方を流し直した（`serve` は `_site_src/` を見ているので、`assets/` の変更は `prepare_site.py` の再実行で反映される）
- 反映の確かめ: `zensical serve -a 127.0.0.1:8002` の `/ukadoc-spec/list/sakura-script/` の HTML を取ってきて数えた。`class="slp-support"` 350、`class="slp-bw …"` 653、`class="slp-notes"` 14、`code class="language-sakurascript"` 287、`assets/mockup.js` の読み込み 1、本文に漏れた `{: ` 0。配られた `assets/extra.css` に `data-slp` の指定がある。build の全体では `slp-support` 1623・`slp-notes` 16・`slp-bw` 2641・`pre class="highlight"` 449・`language-*` 287、`{: .slp` の漏れは 0 頁（`research.md` の数と同じ）
  - D17（C04・C11）: 14 個の `div.slp-notes` のどれも、中の見出し（`h2#notes_escape`・`h2#notes_lifespan` と分類の中の `h3#notes_*` 12 個）に `a.headerlink` が 1 つずつある。頁全体の `class="headerlink"` 649・`href="#notes_…"` 75・`class="md-nav__link"` 423 は、メインのチェックアウト（`c84942a`）の build の同じ頁と同じ数で、見出しの id・¶・目次は変わっていない
  - C10 の対象: `language-sakurascript` の 287 ブロックで、タグとして包まれるのが 502 か所、環境変数が 6 か所（`%username`・`%ms`・`%mp`・`%mh`・`%me`・`%mt`）。`mockup.js` と同じ正規表現を Node で `serve` の HTML に当てて数えた。撮った位置（`#bang-lock-repaint`）には環境変数が無いので、画面に写る色はタグの色だけ
- 375 px: `tools/shot.mjs "<頁>?slp=<候補>" body - light 375` で、両立しない C04 と C11 を分けて 2 回測った。`?slp=C01,C03,C04,C06,C08,C09,C10` が `scrollWidth` 375・`innerWidth` 375、`?slp=C01,C03,C11,C06,C08,C09,C10` も 375・375。どちらもはみ出しなし（`?slp=` を付けない頁も 375・375）
- 失敗: なし（試作で確かめられなかった候補は無い）

| 試作の画面（明・暗） | 候補 | 見比べる `base` | 位置（セレクタ） | 写っている試作の見え方 |
|---|---|---|---|---|
| `mock-sakura-script-C01-light.png`・`mock-sakura-script-C01-dark.png` | C01 | `mock-sakura-script-base-*.png` | `#bang-lock-repaint` | 項目名の `h3` が、左の緑の太い線・下の線・薄い地の帯になり、`code` の灰色の地が消える |
| `mock-sakura-script-C06-light.png`・`mock-sakura-script-C06-dark.png` | C06 | `mock-sakura-script-base-*.png` | `#bang-lock-repaint` | 「対応:」の後の Materia・SSP・Ninix が、名前ごとの色の枠の札になる（` / ` は残る） |
| `mock-sakura-script-C08-light.png`・`mock-sakura-script-C08-dark.png` | C08 | `mock-sakura-script-base-*.png` | `#bang-lock-repaint` | 「記述例」の `h4` が箱の頭の帯になり、続くコードブロックと 1 つの枠でつながる |
| `mock-sakura-script-C09-light.png`・`mock-sakura-script-C09-dark.png` | C09 | `mock-sakura-script-base-*.png` | `#bang-lock-repaint` | 折り返した記述例の行が、右上のコピーのボタンの手前で折り返す（`base` では「アニメーシ」の字がボタンの下に重なる） |
| `mock-sakura-script-C10-light.png`・`mock-sakura-script-C10-dark.png` | C10 | `mock-sakura-script-base-*.png` | `#bang-lock-repaint` | 記述例の `\s[0]`・`\i[500]`・`\![lock,repaint]` などのタグが青（暗い表示では明るい青）になる。字の太さ・折り返しの位置は `base` と同じ |
| `mock-sakura-script-C03-light.png`・`mock-sakura-script-C03-dark.png` | C03 | `mock-sakura-script-base-notes-escape-*.png` | `#notes_escape` | 画面の下の分類の見出し `h2#scope`（スコープコマンド）が緑の帯に白い太い字になる。上の注意書きの `h2#notes_*` 2 つは除いたので `base` のまま |
| `mock-sakura-script-C04-light.png`・`mock-sakura-script-C04-dark.png` | C04 | `mock-sakura-script-base-notes-escape-*.png` | `#notes_escape` | 注意書き 2 つが、点線の枠・コードの地の色の箱になり、見出しが中央寄せで点線の下に区切られる |
| `mock-sakura-script-C11-light.png`・`mock-sakura-script-C11-dark.png` | C11 | `mock-sakura-script-base-notes-escape-*.png` | `#notes_escape` | 注意書き 2 つが、緑の線の角の丸い吹き出しになり、左上に尻尾が付く（尻尾は箱の外の左の余白にあり、本文の字に重ならない） |

- 撮り方: `serve`（作業木、ポート 8002）の `/ukadoc-spec/list/sakura-script/?slp=<候補>` を、`base` と同じセレクタ・幅 1000・高さ 700 で撮った。16 枚とも exit 0 で、白紙でなく、狙った位置と候補の効きが明・暗の両方で写っていることを目で見た（試作の確かめ 3）。幅 1000 では 16 枚とも `scrollWidth` と `innerWidth` が 1000
- C03 は `#scope` を上端にした `base` を撮り足さず、3.1 の `#notes_escape` の位置で撮った（`#scope` は画面の下に写る）。そのため 8001 のメインのチェックアウトの `serve` は、このタスクでは起動していない
- `#notes_escape` の位置では、3.1 の `base` と同じく、ヘッダの題（「UKADOC project」と「SAKURA Script」）が切り替わりの途中で重なって写る画面がある（C03・C04 の明・暗と C11 の明るい表示。C11 の暗い表示は「UKADOC project」だけ）。本文には響かない
- C11 の条件（`candidates.md`）: 本文の字の大きさ・行間は変えていない（枠の内側の余白と左の 14px の余白の分だけ行が短くなり、「解除されている」の折り返しの位置は変わる）。尻尾は本文に重ならない。枠は明・暗とも緑の線で地との差がある。見出しの id・¶・目次は上の D17 の数のとおり変わらない。この頁には admonition が無いので、警告の色の扱いは確かめていない
- C10 の条件: 色はタグと環境変数の 2 つ（地の文は元の色）。太さ・大きさは変えない。等幅の字の指定は変えていないので `\` は `\` のまま写る（D20）
- 画面の合計: このタスクの 16 枚で 2,178,358 バイト

## `descript/ghost`

- 当てる候補（`candidates.md`）: C02・C05・C07（どれも `#charset`）
- 今の見た目: `mock-descript-ghost-base-*.png`
- 確かめた候補: C02・C05・C07 の 3 つ。どれも試作の画面を明・暗で撮れた（2026-10-24）
- 作り方（触った作業木のファイルと写し。写しは 3.5 で `mockups/` に残す）:
  - `assets/extra.css` — 3.2 の指定の後ろに、C02・C05・C07 の指定を `html[data-slp~="Cxx"]` の下に足した。色は Material の色の変数（`--md-primary-fg-color`・`--md-primary-bg-color`・`--md-default-fg-color--light`・`--md-default-fg-color--lightest`）だけで明・暗に合わせたので、暗い表示だけの指定は無い
    - C02: `.md-typeset hr` の上下の余白を `.6em`、`h3` の余白を `.6em 0 .4em` にした。`hr` と `h3` だけでは高さ 700 の画面に 3 項目と半分しか入らなかったので、`.md-typeset p` の上下の余白も `.5em` に詰めた（`candidates.md` の「波及」の `hr`・`h3` に加えて、サイト全体の段落の余白も変わる）
    - C05: `p.slp-support` を、左の緑の太い線・薄い地の帯・少し小さい字にし、頭の「対応:」の `strong` を緑の地に白い字の札にした
    - C07: `p.slp-default` を、字下げ（`1.2em`）・少し小さい字・控えめの色（`--md-default-fg-color--light`）にし、頭の「既定値:」の `strong` を枠の札にした。斜めの字は使わない
  - `scripts/prepare_site.py` — 3.2 の `slp_mark()` に、`**既定値:**` で始まる段落の末尾（空行の手前）の次の行に `{: .slp-default }` を足す処理を足した（C07 の目印）。`**対応:**` の段落の `{: .slp-support }` と同じ「段落の末尾に足す」処理を、段落の種類（`slp-support` か `slp-default`）を覚える変数 1 つで共用する形に書き換えた。`**対応:**` の行の名前を `span.slp-bw` で包む処理と、`notes_*.md` を `div.slp-notes` で包む処理は 3.2 のまま
  - C05 は 3.2 で付けた `p.slp-support` の目印をそのまま使い、`prepare_site.py` には足していない。C06 の `span.slp-bw` は build の全体に付いているが、見た目の指定は `data-slp~="C06"` の下だけにあるので、`?slp=C05` だけのときは普通の字のまま写る（C05 と C06 は両立しない組。C05 の画面で、帯の中の `Materia / SSP / CROW` が札にならず ` / ` でつながっていることを目で見た）
  - `mkdocs.yml`・`assets/mockup.js` は、このタスクでは触っていない。`overrides/`・`assets/image/slp-*` は作っていない
  - 組み立て: 作業木で `python scripts/prepare_site.py` が exit 0、`zensical build --strict` が exit 0（No issues found）。build の全体で `class="slp-default"` 423（`descript/ghost` 74）・`class="slp-support"` 1623、本文に漏れた `{: .slp` は 0 頁（`research.md` の数と同じ）。`<strong>既定値:</strong>` の段落で目印の付かないものは 0
- 反映の確かめ: `zensical serve -a 127.0.0.1:8002` の `/ukadoc-spec/descript/ghost/` の HTML を取ってきて数えた。`class="slp-default"` 74、`class="slp-support"` 74、`class="slp-bw …"` 106、`assets/mockup.js` の読み込み 1、本文に漏れた `{: ` 0。配られた `assets/extra.css` に `data-slp~="C02"`・`"C05"`・`"C07"` の指定がある
  - 3.2 の候補の目印も、同じ `serve` の `/ukadoc-spec/list/sakura-script/` に引き続きある: `class="slp-support"` 350、`class="slp-bw …"` 653、`class="slp-notes"` 14、`code class="language-sakurascript"` 287、`assets/mockup.js` 1、`{: ` 0（3.2 の記録と同じ数。この頁には `**既定値:**` が無いので `slp-default` は 0）
- 375 px: `tools/shot.mjs "<頁>?slp=<候補>" body - light 375` で測った。`descript/ghost/?slp=C02,C05,C07` が `scrollWidth` 375・`innerWidth` 375 で、はみ出しなし（`?slp=` を付けない同じ頁も 375・375）。C02 の段落の余白はサイト全体に効くので、`list/sakura-script/?slp=C01,C02,C03,C04,C06,C08,C09,C10` も測り、375・375 だった
- 失敗: なし（試作で確かめられなかった候補は無い）
  - 作業の途中の出来事: `serve` を動かしたまま `prepare_site.py` を流し直したところ、`serve` の作り直しが書きかけの `_site_src/` を拾ったらしく、ログに「38 issues found」が出て、`assets/extra.css` が 404 になった。この間に撮った C02 の画面は指定の効かない画面だったので捨てた。`serve` を止め、`zensical build --strict` が exit 0 なのを確かめてから `serve` を起動し直し、`extra.css` に C02 の指定があることを確かめてから 6 枚とも撮り直した。下の画面はどれも撮り直した後のもの

| 試作の画面（明・暗） | 候補 | 見比べる `base` | 位置（セレクタ） | 写っている試作の見え方 |
|---|---|---|---|---|
| `mock-descript-ghost-C02-light.png`・`mock-descript-ghost-C02-dark.png` | C02 | `mock-descript-ghost-base-*.png` | `#charset` | 高さ 700 の画面に、`charset`・`name`・`type`・`craftman` の 4 項目が入り、5 つ目の `craftmanw` の項目名が下端に写る（`base` は 3 項目） |
| `mock-descript-ghost-C05-light.png`・`mock-descript-ghost-C05-dark.png` | C05 | `mock-descript-ghost-base-*.png` | `#charset` | 「対応:」の段落が、左の緑の線の薄い地の帯になり、「対応:」が緑の地に白い字の札になる。名前（`SSP / CROW` など）は普通の字のまま |
| `mock-descript-ghost-C07-light.png`・`mock-descript-ghost-C07-dark.png` | C07 | `mock-descript-ghost-base-*.png` | `#charset` | 「既定値:」の段落が、字下げした少し小さい控えめの色の字になり、「既定値:」が枠の札になる。説明の文・「対応:」の段落とは見分けられる |

- 撮り方: `serve`（作業木、ポート 8002）の `/ukadoc-spec/descript/ghost/?slp=<候補>` を、`base` と同じセレクタ（`#charset`）・幅 1000・高さ 700 で撮った。3 候補とも `base` と同じ位置なので、`base` の撮り足しは要らず、8001 のメインのチェックアウトの `serve` は、このタスクでは起動していない。6 枚とも exit 0 で、白紙でなく、狙った位置と候補の効きが明・暗の両方で写っていることを目で見た（試作の確かめ 3）。幅 1000 では 6 枚とも `scrollWidth` と `innerWidth` が 1000
- C07 の暗い表示: 控えめの色（`--md-default-fg-color--light`）の字と札の枠は、暗い地の上でも読める差がある（画面で目で見た。差の数値は測っていない）
- 画面の合計: このタスクの 6 枚で 675,925 バイト

## `manual/ghost`

- 当てる候補（`candidates.md`）: C12・C14・C15（どれも `h1#ゴースト`）
- 今の見た目: `mock-manual-ghost-base-*.png`
- 確かめた候補: （3.4 で書く）
- 作り方（触った作業木のファイルと写し）: （3.4 で書く）
- 反映の確かめ: （3.4 で書く）
- 375 px: （3.4 で書く）
- 失敗: （3.4 で書く）

## 試作しない候補

- C13（記述例を手元のゴーストで再生する）・C16（ヘッダの値の名前を列にそろえる）は、`candidates.md` の「試作の当て先」の理由により試作しない
