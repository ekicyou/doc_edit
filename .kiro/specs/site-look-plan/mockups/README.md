# 試作の記録: site-look-plan

`candidates.md` の候補（`C01` から）を、3 頁に使い捨ての試作として当てた記録である（Requirement 3）。試作は ukadoc-spec の作業木 `.worktrees/site-look-plan/` の中だけで作り、作業木ではコミットも push もしない（Requirement 3.2・6.1）。後の `decisions.md` は、この記録と `screenshots/mock-*.png` を材料にする。

- 今の見た目（`base`）を撮った版: ukadoc-spec の `c84942a`（`origin/main` と同じ。`ukadoc-spec/` のメインのチェックアウトで、原稿と設定は変えていない）。2026-10-24 に撮った
- 作業木の起点: `c84942a`（`git -C .worktrees/site-look-plan log --oneline origin/main..HEAD` が空）
- **土台の上げ直し（2026-10-25）**: ukadoc-spec の `417511c` でヘッダの色が緑 `#2e8233` から紺 `#1f4e8c` に変わったので、開発者の「紺に合わせて作り直して」を受けて、メインのチェックアウトと作業木を `afb2152` に進め（作業木は試作の差分を外して `--ff-only` で進め、`git apply --3way` で当て直した。3 ファイルとも衝突なし）、サブモジュールの参照を doc_edit の `28a7a20` でコミットした。C17 のリンクの上書きを外し、C18 の緑の直書きをテーマの色の変数に替え、C24 を足して、下の「撮り直し」の表の画面を `afb2152` の上で撮り直した。この節より前の記録の色（緑）は `c84942a` の時点のものである
- 作業木で変えたファイル（3.1 の時点。どれも未コミット）: `assets/mockup.js`（新規）、`mkdocs.yml`（`extra_javascript` に `assets/mockup.js` を足しただけ）。原稿・`.nav.yml`・`requirements.txt` は触らない（Requirement 6.2）
- 作業木で変えたファイル（3.2 の時点。どれも未コミット）: `assets/extra.css`・`scripts/prepare_site.py`・`mkdocs.yml`（`pymdownx.highlight` を追加）・`assets/mockup.js`（C10 の着色を追加）。中身は `list/sakura-script` の節
- 作業木で変えたファイル（3.3 の時点。どれも未コミット）: `assets/extra.css`（C02・C05・C07 を追加）・`scripts/prepare_site.py`（C07 の目印 `slp-default` を追加）。中身は `descript/ghost` の節
- 作業木で変えたファイル（3.4 の時点。どれも未コミット）: `assets/extra.css`（C12・C14・C15 を追加）・`assets/mockup.js`（C15 の包みを追加）・`mkdocs.yml`（`theme.custom_dir: overrides` を追加）・`overrides/main.html`（新規）・`assets/image/slp-character.svg`（新規）。中身は `manual/ghost` の節

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
- 確かめた候補: C12・C14・C15 の 3 つ。どれも試作の画面を明・暗で撮れた（2026-10-24）
- 作り方（触った作業木のファイルと写し。写しは 3.5 で `mockups/` に残す）:
  - `overrides/main.html`（新規。C12）— `{% extends "base.html" %}` に `{% block content %}` の上書きを 1 つだけ置き、`{{ super() }}` の前に `<img class="slp-character" src="{{ 'assets/image/slp-character.svg' | url }}" alt="" width="80" height="120">` を足した（飾りなので `alt=""`）。絵は `?slp=` に関係なく**全頁**の本文の頭に入り（build の 41 頁のうち `404.html` を除く 40 頁）、`extra.css` で `data-slp~="C12"` の無いときは隠す。`manual/` の頁だけに絞る分けは、この試作では作っていない（`?slp=C12` を付ければどの頁にも出るので、ほかの頁でも見比べられる）
  - `mkdocs.yml` — `theme` に `custom_dir: overrides` を足した（C12）。`research.md` のとおり、リポジトリ直下の `overrides/` で効き、`_site_src/` に写す必要は無かった
  - `assets/image/slp-character.svg`（新規。C12）— 自作の仮の絵（幅 80・高さ 120 の手書きの SVG。緑の髪・肌色の顔・白い服を、濃い灰色 `#333` の線で縁取った人の形）。旧サイトの素材は使っていない。外部の読み込みも無い
  - `assets/extra.css` — 3.3 の指定の後ろに、C12・C14・C15 の指定を `html[data-slp~="Cxx"]` の下に足した
    - C12: 絵を `.md-content__inner` の右上に `position: absolute` で幅 54・高さ 80 px に置き、`h1` の右に 64 px の余白を取った（題が長い頁でも題の字が絵の下に入らない）。絵の高さは `h1` と、その下の余白の中に収まる大きさにしたので、本文の幅も段落の位置も変わらない。暗い表示だけ、白い薄い縁の影（`drop-shadow`）を足した（`html[data-slp~="C12"] [data-md-color-scheme="slate"] …`）。幅 `44.984375em` 以下（Material の狭い画面の境）では幅 36・高さ 54 px に小さくし、`h1` の余白も 44 px にした。動きは付けていないので `prefers-reduced-motion` の指定は要らない
    - C14: `.md-typeset:has(h1#ゴースト)` で `manual/ghost` だけに絞った（頁の種類の印の代わり）。この頁のファイルごとの箇条書きは、空行のため 1 項目ずつ別の `<ul>` になっているので、`> ul > li` ごとに、上の細い線（`--md-default-fg-color--lighter`）・点の無い箇条書き・字下げした段落（`1.5em`）にした。最初の段落を `display: flex; flex-wrap: wrap` にして、頭の `strong`（ファイル名）を 1 行目に置き、説明を次の行に送った
    - C14 の細工: 「`**名前**: 説明`」の「`: `」は字の要素でないので、見た目の指定では消せない。最初の段落に負の字下げ（`-.5em`）を付けて「`: `」を左の余白に出し、名前の `::after`（地の色の小さな四角）で覆って見えなくした。字の大きさや字の幅が変わると覆いがずれるおそれがあるので、本番は `prepare_site.py` の目印かテンプレートで「`: `」を外す（`サイトを作る処理` が加わる）のがよい。コピーや検索の字は変わらない（字は消しておらず、覆っているだけ）
    - C15: `span.slp-tree-file` を緑（明るい表示は `--md-primary-fg-color`、暗い表示は `#81c784`）にした。フォルダの `span.slp-tree-dir` は元の色のまま
  - `assets/mockup.js` — `data-slp` に `C15` があるときだけ、言語の印の無いコードブロック（`pre > code:not([class*="language-"])`）のうち「`+-`」で始まる行のあるものを、行ごとに「`+-`」の後の名前を、拡張子があれば `span.slp-tree-file`、無ければ `span.slp-tree-dir` で包む。C10 と同じく `textContent` から作り直し、包んだ後の `textContent` が元と同じことを `console.assert` で確かめる形にした（コピーされる字は変わらない。D19）。同じ変換を Node で `serve` の HTML の木に当て、包んだ後の字が元と同じことを確かめた
  - `scripts/prepare_site.py` は、このタスクでは触っていない
  - 組み立て: 作業木で `python scripts/prepare_site.py` が exit 0、`zensical build --strict` が exit 0（No issues found）。`extra.css` の手直しのたびに、`serve` を止めてから両方を流し直した（Implementation Notes のとおり）。手直しの途中の確かめは、build の `_site/` をその場の静かな配信（`python -m http.server 8003`）で開いて撮り、画面は捨てた。下の画面は、最後の build の後に起動し直した `zensical serve`（8002）で撮ったもの
- 反映の確かめ: `zensical serve -a 127.0.0.1:8002` の `/ukadoc-spec/manual/ghost/` の HTML を取ってきて数えた。`class="slp-character"`（テンプレートの上書きで足した絵）1、`assets/mockup.js` の読み込み 1、本文に漏れた `{: ` 0。配られた `assets/extra.css` に `data-slp~="C12"`（6 か所）・`"C14"`（6 か所）・`"C15"`（2 か所）の指定があり、配られた `assets/mockup.js` に C15 の分岐がある。`/ukadoc-spec/assets/image/slp-character.svg` は 200（`image/svg+xml`）。C14・C15 は目印を足さない候補なので、HTML に `slp-` の class は増えない（C15 の `span` は `mockup.js` が頁を開いた後に足す）
  - C15 の対象: この頁の言語の印の無いコードブロック 1 つ（ファイル構成の木）の「`+-`」の 14 行で、ファイルとして包むのが 11（`descript.txt`・`shiori.dll`・`(saori).dll`・`makoto.dll`・`updates2.dau`・`updates.txt`・`*.ico`・`*.cur`・`thumbnail.png`・`ai0.png`・`ai0_dark.png`。旧サイトの `em.filename` の 11 個と同じ）、フォルダが 3（`(myghost)`・`ghost`・`master`）。`mockup.js` と同じ判定を Node で `serve` の HTML に当てて数えた
  - 3.2・3.3 の候補の目印も、同じ `serve` に引き続きある: `/ukadoc-spec/list/sakura-script/` に `class="slp-support"` 350、`class="slp-bw …"` 653、`class="slp-notes"` 14、`code class="language-sakurascript"` 287、`assets/mockup.js` 1、`{: ` 0。`/ukadoc-spec/descript/ghost/` に `class="slp-default"` 74、`class="slp-support"` 74、`assets/mockup.js` 1、`{: ` 0（3.2・3.3 の記録と同じ数）。どちらの頁にも `slp-character` が 1 つずつあるが、`?slp=C12` が無ければ出ない
- 375 px: `tools/shot.mjs "<頁>?slp=<候補>" body - light 375` で測った。`manual/ghost/?slp=C12,C14,C15` が `scrollWidth` 375・`innerWidth` 375、`?slp=C12` だけも 375・375、`?slp=` を付けない同じ頁も 375・375 で、はみ出しなし。絵は全頁に入るので、`descript/ghost/?slp=C12` も測り、375・375 だった。幅 375 では、絵は幅 36・高さ 54 px に小さくなって、`h1` の右の余白に収まり、題・本文・頭の帯に重ならないことを、捨てた確かめの画面で目で見た（狭い画面の画面は残さない。Requirement 3.6）
- 失敗: なし（試作で確かめられなかった候補は無い）
  - 作業の途中の出来事: C14 で、最初は名前を `float` にして説明の行を下に送ろうとしたが、負の字下げの分だけ 1 行目に隙間ができ、「`: `」が名前の行の右の端（本文の幅の外）に残った。名前の外の幅を広げても同じだったので、`float` をやめて段落の `flex` の折り返しに変えた。この間の画面はどれも捨てた。また、この頁の箇条書きは 1 項目ずつ別の `<ul>` なので、`li:first-child` は全項目に効く（はじめに足した「最初の項目の線だけ緑」の指定は、そのために外した）

| 試作の画面（明・暗） | 候補 | 見比べる `base` | 位置（セレクタ） | 写っている試作の見え方 |
|---|---|---|---|---|
| `mock-manual-ghost-C12-light.png`・`mock-manual-ghost-C12-dark.png` | C12 | `mock-manual-ghost-base-*.png` | `h1#ゴースト` | 題「ゴースト」の右、本文の右の端に、仮のキャラクターの絵（緑の髪・白い服）が立つ。絵は題の行とその下の余白の中にあり、「masterゴーストフォルダ…」の段落・ファイル構成の木・頭の帯に重ならない。暗い表示でも、白い服と縁の影で輪郭が地に溶けない |
| `mock-manual-ghost-C14-light.png`・`mock-manual-ghost-C14-dark.png` | C14 | `mock-manual-ghost-base-*.png` | `h1#ゴースト` | ファイルごとの箇条書きの点が消え、ファイルの間に細い横線が入る。`descript.txt` が 1 行に置かれ、説明の 3 段落が字下げされて下に並ぶ（「`: `」は見えない）。`updates2.dau` は名前だけの 1 行のまま（D12 の原稿による見え方は直らない。`candidates.md` のとおり） |
| `mock-manual-ghost-C15-light.png`・`mock-manual-ghost-C15-dark.png` | C15 | `mock-manual-ghost-base-*.png` | `h1#ゴースト` | ファイル構成の木で、`descript.txt` から `ai0_dark.png` までのファイル名 11 個が緑（暗い表示では明るい緑）になり、`(myghost)`・`ghost`・`master` のフォルダと「`+-`」・「（旧仕様）」は元の色のまま |

- 撮り方: `serve`（作業木、ポート 8002）の `/ukadoc-spec/manual/ghost/?slp=<候補>` を、`base` と同じセレクタ（`h1#ゴースト`）・幅 1000・高さ 700 で撮った。3 候補とも `base` と同じ位置なので、`base` の撮り足しは要らず、8001 のメインのチェックアウトの `serve` は、このタスクでは起動していない。6 枚とも exit 0 で、白紙でなく、狙った位置と候補の効きが明・暗の両方で写っていることを目で見た（試作の確かめ 3）。幅 1000 では 6 枚とも `scrollWidth` と `innerWidth` が 1000
- C12 の画面では、ヘッダの題が「UKADOC project」でなく頁の題「ゴースト」に切り替わって写る（`h1` の右の余白の分か、撮るときのスクロールの位置の差でヘッダの題の切り替えの境を越えたと見ている。原因は確かめていない）。本文と絵の位置には響かない
- C12 の条件（`candidates.md`）: 本文・目次・頭の帯に重ならない（絵は `h1` の右の余白にあり、本文の幅と段落の位置は `base` と同じ。この頁の右の欄の目次は空で、絵は本文の欄の中に置いたので、目次の欄には入らない）。明・暗とも輪郭が地に溶けない（明るい表示は `#333` の縁の線、暗い表示は白い服と白い薄い影。差の数値は測っていない）。幅 375 では小さくして、はみ出しなし（上の 375 px）。飾りとして `alt=""`。動かしていないので `prefers-reduced-motion` は当てはまらない。`manual/` の頁だけに出すか全頁に出すかは、この試作では全頁に入れて `?slp=C12` で見比べられる形にした（絞るなら、`overrides/main.html` で頁の道を見て分けるか、C14・C16 の頁の種類の印を使う）
- C14 の条件: 字の大きさ・行間・色は変えていない。字下げと線だけ。頁は `:has(h1#ゴースト)` で絞ったので、ほかの頁の頭が太字の箇条書き（`spec/shiori3` など）には効かない
- C15 の条件: 字を色の要素で包むだけで、字・太さ・折り返しは変えていない。右上のコピーのボタンは残っている（D19）
- 画面の合計: このタスクの 6 枚で 410,476 バイト

## 開発者の指摘を受けた試作（4.2 の提示の場、2026-10-25）

開発者がプレビューを見て「全体に、ライトモードで文字が読みにくい。黒は良いけど色付き文字が明るすぎる」「記述例のさくらスクリプト部が、分かりにくい。強調しないとダメかも」と指摘したので、C17・C18 を足して `list/sakura-script` に当てた（`candidates.md`）。続けて「別モニタでの視認だと厳しい。青は太字にしないとダメかも」と指摘したので、C19 を足した。さらに「青系なのが目立たない根本原因かもしれない」と指摘したので、C20（タグを赤紫に）と C21（タグに薄い地）を足した。あわせて、開発者のブラウザでは `extra.css` の古い写しが残って C18 が効いて見えなかったおそれがある（`extra.css` の URL に版の印が無い）。強制の再読み込み（Ctrl+F5）を勧めた

- 作り方: 作業木の `assets/extra.css` の末尾に、`html[data-slp~="C17"] [data-md-color-scheme="default"] …`（明るい表示だけ）と `html[data-slp~="C18"] …` の指定を足した。ほかのファイルは触っていない。`serve` を止めてから `prepare_site.py` と `zensical build --strict` を流し（どちらも exit 0、No issues found）、`serve -a 127.0.0.1:8000` で出し直した
- 反映の確かめ: 配られた `assets/extra.css` に `C17`・`C18` の行が 18 行ある
- C17 の測り: 明るい表示の `?slp=C01,C03,C06,C09,C10,C17,C18` の頁で、本文の色付きの字（灰色・黒を除く）の対比を測った。最も弱いのはリンクの 7.13:1（C17 なしでは 4.82:1、`code` の地では 4.42:1）。C06 の札は 8.34〜10.93:1、C10 のタグは 8.24:1、環境変数は 8.52:1
- C20・C21 の測り: 地の字（`#36464e`）と C17 のタグ（`#0842a0`）の明るさの比は 1.04 で、色相も近い（青の目立たない元）。C20 の赤紫のタグは C18 の地に 8.41:1（暗 6.67:1）。C21 の地の上では、タグ 7.14:1・環境変数 7.33:1（暗 5.7:1・6.61:1）
- 375 px: `?slp=C01,C06,C09,C10,C17,C18` と `?slp=C01,C06,C09,C10,C17,C18,C19`、`?slp=C01,C06,C09,C10,C17,C18,C19,C20,C21` で `scrollWidth` 375・`innerWidth` 375。はみ出しなし
- C22・C23（同じ日、続く指摘）: 開発者が「ゴーストの作り方、例えば descript.txt は、SHIORI Event でいう OnBoot などと同じ装飾で」「プロパティシステムの箇条書きを表にできないか（原稿を表にしてもよい）」と指摘したので、C22（`manual/ghost`）と C23（`list/propertysystem`）を足した。C23 は原稿を変えず、`assets/mockup.js` が箇条書きを表に組み替える見本である。C23 は初め 375 px で `scrollWidth` 517 にはみ出した（`system.os` の `x86,x64,arm,…` が折り返さない）ので、内容の列に `overflow-wrap: anywhere` を足し、`system.os`・`system.cpu`・`note-1`・`system.network` の位置で 375/375 を確かめた。C22 は 375/375。C22 の帯の中のリンクは、暗い表示で緑が帯の灰色に沈んだので、項目名と同じ字の色にした。説明の無い `updates2.dau` の帯は、ほかのファイル名の帯より 6 px ほど右にずれる（試作の細工の残り。本番は目印で揃える）
- 失敗: なし
- 頁の移り: 開発者が「リンクをクリックしたら元の頁になるのか」と指摘した。リンクで頁を移ると `?slp=` が消えて候補が全部外れていたので、`assets/mockup.js` で `?slp=` を `sessionStorage` に覚え、`?slp=` の無い頁でも同じ候補を入れるようにした（`?slp=` を空にすると外れる）。`list/sakura-script` から `list/propertysystem/` に `?slp=` なしで移っても、C06 の札が効くのを確かめた

| 試作の画面（明・暗） | 候補 | 見比べる `base` | 位置（セレクタ） | 写っている試作の見え方 |
|---|---|---|---|---|
| `mock-sakura-script-C17-light.png`・`mock-sakura-script-C17-dark.png` | C17（`?slp=C01,C06,C08,C09,C10,C17`） | `mock-sakura-script-C06-*.png`・`mock-sakura-script-C10-*.png` | `#bang-lock-repaint` | 明るい表示で、札・タグの色が濃くなる。暗い表示は C17 なしと同じ |
| `mock-sakura-script-C19-light.png`・`mock-sakura-script-C19-dark.png` | C19（`?slp=C01,C06,C09,C10,C17,C18,C19`） | `mock-sakura-script-C10-*.png`・`mock-sakura-script-C18-*.png` | `#bang-lock-repaint` | 記述例のタグが太字になる（色は C17 の濃い青）。折り返しの位置は C18 の画面と同じ |
| `mock-sakura-script-C20-light.png`・`mock-sakura-script-C20-dark.png` | C20（`?slp=C01,C06,C09,C10,C17,C18,C19,C20`） | `mock-sakura-script-C19-*.png` | `#bang-lock-repaint` | 記述例のタグが太字の赤紫になる |
| `mock-sakura-script-C21-light.png`・`mock-sakura-script-C21-dark.png` | C21（`?slp=C01,C06,C09,C10,C17,C18,C19,C20,C21`） | `mock-sakura-script-C20-*.png` | `#bang-lock-repaint` | タグと環境変数に薄い地が付き、かたまりに見える |
| `mock-manual-ghost-C22-light.png`・`mock-manual-ghost-C22-dark.png` | C22（`?slp=C01,C02,C03,C04,C06,C07,C09,C10,C14,C15,C17,C18,C19,C20,C21,C22`） | `mock-manual-ghost-C14-*.png` | `.md-typeset > ul`（高さ 900） | ファイル名が C01 の項目名と同じ帯になり、「: 」が消える |
| `mock-propertysystem-C23-light.png`・`mock-propertysystem-C23-dark.png` | C23（`?slp=C01,C02,C03,C04,C06,C07,C09,C10,C14,C15,C17,C18,C19,C20,C21,C23`） | `mock-propertysystem-base-*.png`（`?slp=`） | `[id="system.cpu"]` | キーの箇条書きが「キー」「内容」の 2 列の表になる |
| `mock-sakura-script-C18-light.png`・`mock-sakura-script-C18-dark.png` | C18（`?slp=C01,C06,C09,C10,C17,C18`） | `mock-sakura-script-C08-*.png` | `#bang-lock-repaint` | 「記述例」が濃い緑の帯の白い字になり、コードブロックに左の太い緑の線と薄い緑の地が付く |

## 紺への撮り直し（2026-10-25、`afb2152`）

上の「土台の上げ直し」の後に、`serve` を止めて `prepare_site.py`（exit 0）と `zensical build --strict`（exit 0、No issues found）を流し直し、`serve -a 127.0.0.1:8000` で出し直して、次の画面を同じ名前・同じ `?slp=`・同じセレクタで撮り直した。古い（緑の）画面は上書きした。緑の時の見え方は git の履歴（`b5ade75` 以前）に残っている。

- 撮り直した画面: `mock-*-base-*`（5 組。`mock-propertysystem-base` を含む）、C01・C02・C03・C04・C05・C06・C07・C08・C09・C10・C11・C12・C14・C15（それぞれ `?slp=` にその候補だけ）、C17〜C23（上の「開発者の指摘を受けた試作」の表と同じ `?slp=`）、新しい C24（`?slp=C01,C02,C03,C04,C06,C07,C09,C10,C14,C15,C17,C18,C19,C20,C21,C24`、`#bang-lock-repaint`）。27 組 54 枚
- 撮る途中の描き直しで画面が二重に重なったものが 5 枚あった（C03 暗・C11 明暗・C17 暗・C24 明。右と左の端にヘッダの紺の行が 42 行あるので見分けた）。その 5 枚は撮り直し、54 枚とも重なりが無いのを確かめた
- 紺の測り（`?slp=C01,C02,C03,C04,C06,C07,C09,C10,C14,C15,C17,C18,C19,C20,C21,C22,C23` の `list/sakura-script`）: ヘッダ・C03 の帯の白い字 8.31:1、C18 の帯の白い字 明 11.39:1（`#163a69`）・暗 8.31:1、リンク 明 8.31:1、C20 のタグ 明 8.30:1・暗 6.96:1、C06 の SSP の札 明 8.34:1・暗 8.00:1
- C24 を足したわけ: 紺のリンク（と左の目次の今の頁）は、暗い表示の地 `#1e2129` に 1.94:1 しかない（`?slp=` なし、つまり今の本番と同じ）。C24 で `#8fb4e8` にすると 7.56:1
- 375 px: `list/sakura-script`（+C24）・`list/propertysystem`（+C23・C24）・`manual/ghost`（+C22・C24）・`descript/ghost`（+C24）で、どれも `scrollWidth` 375・`innerWidth` 375

| 試作の画面（明・暗） | 候補 | 見比べる `base` | 位置（セレクタ） | 写っている試作の見え方 |
|---|---|---|---|---|
| `mock-sakura-script-C24-light.png`・`mock-sakura-script-C24-dark.png` | C24（推奨の採るものを全部入れた上に C24） | `mock-sakura-script-C21-*.png` | `#bang-lock-repaint` | 暗い表示で、リンクと左の目次の今の頁が明るい紺になる。明るい表示は C24 なしと同じ |

## 試作しない候補

- C13（記述例を手元のゴーストで再生する）・C16（ヘッダの値の名前を列にそろえる）は、`candidates.md` の「試作の当て先」の理由により試作しない

## 写し（タスク 3.5）

作業木 `.worktrees/site-look-plan/`（`afb2152` から、コミット 0。初めは `c84942a` から）で作った・変えたファイルの写しである。参考であって、後続 spec はそのまま使わずに書き直してよい。作業木ではコミットしていない。

| 作業木のファイル | 状態 | 写し |
|---|---|---|
| `assets/extra.css` | 変更 | `extra.css`（全文） |
| `assets/mockup.js` | 新規 | `mockup.js`（全文） |
| `overrides/main.html` | 新規 | `overrides/main.html`（全文） |
| `assets/image/slp-character.svg` | 新規（自作の仮の絵） | `image/slp-character.svg`（全文） |
| `mkdocs.yml` | 変更 | `worktree.diff` の差分 |
| `scripts/prepare_site.py` | 変更 | `worktree.diff` の差分 |

`worktree.diff` は `git -C .worktrees/site-look-plan diff`（変更した 3 ファイル）と、未追跡のファイルの一覧（末尾のコメント）である。
