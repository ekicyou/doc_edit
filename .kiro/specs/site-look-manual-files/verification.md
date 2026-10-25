# 確かめの記録: site-look-manual-files

## 変更の前（1.2）

- 日付: 2026-10-25
- 控えのコミット: `b1f8ab1c1fb61d894b467cf5ff272653533f8fcf`（ukadoc-spec の `origin/main`。作業木 `.worktrees/site-look-manual-files/` の HEAD と同じ。PR #14 のマージの後）
- 控えの置き場: `C:/Users/maz-o/AppData/Local/Temp/claude/C--home-maz-git-doc-edit/95cb4bf7-32a6-4bf5-b971-42e18f7e2f04/scratchpad/baseline-manual-files/`
- 口: `http://127.0.0.1:8010/`（`_site/` を根に配るので、頁の道は `/ukadoc-spec/` でなく `/` から始まる。例: `http://127.0.0.1:8010/manual/ghost/`）
- 測りの道具の置き場: `C:/Users/maz-o/AppData/Local/Temp/claude/C--home-maz-git-doc-edit/95cb4bf7-32a6-4bf5-b971-42e18f7e2f04/scratchpad/tools/`
  - `snapshot.py`: `_site/` の全 40 頁の `<title>`・`article` の中の見出しの id の並び・`class="headerlink"` の数・`md-nav__link` の数（`md-nav__link--active` を含む字の数え）・`article` の本文の字（`script`・`style` とタグを外し空白を詰めたもの）と、`_raw/` の全ファイル（2049）と `_site/llms.txt` の sha256 を JSON に書く
  - `before.json`: 控えの結果（sha256 `d705cf14…515dc6`。同じ式で 2 度流して同じ）

```sh
# 控えを作る（置き場が無いとき。WT = .worktrees/site-look-manual-files、B = 上の控えの置き場、PY = doc_edit の .venv/Scripts）
mkdir B && git -C WT archive b1f8ab1 | tar -x -C B
cd B && PY/python scripts/prepare_site.py && PY/zensical build --strict    # どちらも exit 0
PY/python -m http.server 8010 --bind 127.0.0.1 --directory B/_site          # 配る（5.2 で止めて消す）

# 数える（tools の中で。after は作業木で prepare_site.py と build を流した後）
PY/python -I snapshot.py ../baseline-manual-files before.json
PY/python -I snapshot.py <WT の絶対パス> after.json
```

manual の頁の数（控え）:

| 頁 | ¶（`headerlink`） | 目次（`md-nav__link`） | 見出しの id | 本文の字 |
|---|---|---|---|---|
| `manual/balloon` | 1 | 56 | 1 | 3784 |
| `manual/directory` | 3 | 62 | 3 | 3106 |
| `manual/ghost` | 1 | 56 | 1 | 1313 |
| `manual/install` | 1 | 56 | 1 | 2187 |
| `manual/owner-draw-menu` | 1 | 56 | 1 | 1028 |
| `manual/shell` | 1 | 56 | 1 | 2536 |
| `manual/translator` | 1 | 56 | 1 | 778 |
| `manual/update` | 1 | 56 | 1 | 1388 |

- 設計の MarkerCheck の見込み（¶ は `directory` 3・ほか 1、`md-nav__link` は `directory` 62・ほか 56）と同じ

## 目印の例（タスク 2）

`mark_manual()` に字を直に渡した（`scratchpad/tools/mark_manual_examples.py`、作業木の `scripts` を読み込み `python -I` で流す）。11 例すべて期待どおり。

| 例 | 渡した字 | 結果 |
|---|---|---|
| 見出しの行 | `# ゴースト` | 変わらない |
| 名前のリンク | `- **[descript.txt](descript.md)**: 説明` | `- **[descript.txt](descript.md)**{: .manual-item } 説明` |
| 名前だけ | `- **[updates2.dau](update.md)**` | `- **[updates2.dau](update.md)**{: .manual-item }` |
| 行の終わりの「`:`」 | `- **sstp.png**:` | `- **sstp.png**{: .manual-item }` |
| `\*` を含む名前 | `- **[surfaces\*\*.txt](x.md)**: SSP専用。` | `- **[surfaces\*\*.txt](x.md)**{: .manual-item } SSP専用。` |
| `\` と名前の一部のリンク | `- **(myghost)\\[delete.txt](x.md)**: 説明` | `- **(myghost)\\[delete.txt](x.md)**{: .manual-item } 説明` |
| 名前の終わりの `\*` | `- **foo\***: 説明` | `- **foo\***{: .manual-item } 説明` |
| 字下げした `※1,※2` | `    - **※1,※2**: 説明` | 変わらない |
| 形に合わない（空白） | `- **名前** 説明` | 変わらない |
| 形に合わない（`:説明`） | `- **名前**:説明` | 変わらない |
| コードブロックの中 | ```` ``` ```` の中の `- **x**: y` | 変わらない |

`_site_src/manual/*.md` の `{: .manual-item }` の数: `balloon` 22・`directory` 12・`ghost` 10・`install` 7・`owner-draw-menu` 3・`shell` 12・`translator` 0・`update` 7、計 73（設計の表と同じ）。manual の外の `_site_src/` は 0。外す「`:`」は原稿の数えで計 72（`ghost` 9、ほかは目印と同じ）。manual の原稿で `- **` で始まり形に合わない行は 0。`prepare_site.py` と `zensical build --strict` は exit 0。

## 木の例（タスク 3.1）

作業木の `assets/filetree.js`（設計の「Modified Files」の中身と 1 字も違わない）を、Node の `vm` で偽の `document` の上に流した（試しのスクリプトは spec の外のスクラッチの `tools/treecheck.js`）。各行は `(myghost)`・`:` の行と同じ木に入れて流し、包んだ字と、包んだ後の `textContent` が元の字と同じことを見た。

| 木の行 | 包んだファイル名 | 字が同じ |
|---|---|---|
| `+-descript.txt` | `descript.txt` | 同じ |
| `+-(myghost)`・`+-ghost`・`+-master(またはadditional_shell)` | なし | 同じ |
| `+-(saori).dll`・`+-surfaces**.txt (SSPのみ）`・`+-.narignore (必要な時のみ)(SSPのみ)` | `(saori).dll`・`surfaces**.txt`・`.narignore` | 同じ |
| `+-alias.txt（旧仕様）` | `alias.txt` | 同じ |
| `+-updates2.dau （旧仕様）` | `updates2.dau` | 同じ |
| `+-ok_down.png/ok_up.png （SSPのみ）` | `ok_down.png`・`ok_up.png` | 同じ |
| `+-readme.txt または readme.md (必要な時のみ)` | `readme.txt`・`readme.md` | 同じ |
| `+-delete1.txt (delete[数字].txtも追加で認識できる)` | `delete1.txt` | 同じ |
| `　　+-thumbnail.png`（全角の空白の字下げ） | `thumbnail.png` | 同じ |
| `:`・`(myghost)`（`+-` の無い行だけのブロック） | なし（包まない） | 同じ |

- 全行を 1 つの木にしても 12 個を左から順に包み、字は同じ。`language-sakurascript` のブロックは触らない。要素の入った木は包まずに `console.warn`、包んだ後の字が違うときは元に戻して `console.warn`（どちらも 1 回）
- 一時のスイッチを切った状態で 13 行が合わないこと（RED）を見てから、入れて・外して全行が合うこと（GREEN）を見た
- `mkdocs.yml` の `extra_javascript` は `assets/sakurascript.js` の後ろに `assets/filetree.js` の 1 行を足した。Build Gate（`prepare_site.py`・`zensical build --strict`）は exit 0、`_site` の 40 頁すべてに `assets/filetree.js` の読み込みが 1 つ（`bundle` → `sakurascript.js` → `filetree.js` の順）

## 測る版（4.1）

- 2026-10-25 に ukadoc-spec を fetch した。`origin/main` は `b1f8ab1` のままで、作業木の分岐点から進んでいない。merge はせず、1.2 の控え（`b1f8ab1`）をそのまま使う
- 測る版: 作業木 `site-look-manual-files` の `75c7433`（3.3 のコミット。`origin/main` の `b1f8ab1` の上に 1 つ）。4.2〜4.5 はこの版で測る
- Build Gate（3.3）: `prepare_site.py` exit 0、`zensical build --strict` exit 0。`git diff --stat origin/main` は `assets/extra.css`・`assets/filetree.js`・`mkdocs.yml`・`scripts/prepare_site.py` の 4 ファイル

## 配り（4.2）

- 日付: 2026-10-25。測った版: 作業木 `site-look-manual-files` の `75c7433`（`origin/main` の `b1f8ab1` の上に 1 つ）。プレビューを止め、作業木で `prepare_site.py` → `zensical build --strict` → `zensical serve` の順に起動し直したもの（`http://127.0.0.1:8000/ukadoc-spec/`）
- 控え: 1.2 の置き場を `http://127.0.0.1:8010/` で配ったもの（`b1f8ab1`）。配った控えの全 40 頁の題・id の並び・¶・目次の数・本文の字が `before.json` と同じことも見た
- `/ukadoc-spec/assets/extra.css`: 200。`site-look-manual-files:` のコメント 2、`:is(.bundle-item, .manual-item)` 2
- `/ukadoc-spec/assets/filetree.js`: 200。`filetree-file` を含む
- `assets/filetree.js` の読み込み: 全 40 頁に 1 つずつ

## 目印（4.2）

配られた全 40 頁の HTML（8000）を頁ごとに数えた。manual の外の 32 頁は `class="manual-item"` が 0。

| 頁 | 名前の目印 | 外した「`:`」 | うち場合分け | うち名前だけ | 段落に分かれない形 | ¶ | 目次 | id | 漏れ | `filetree.js` |
|---|---|---|---|---|---|---|---|---|---|---|
| `manual/balloon` | 22 | 22 | 0 | 0 | 7 | 1 | 56 | 1 | 0 | 1 |
| `manual/directory` | 12 | 12 | 0 | 0 | 3 | 3 | 62 | 3 | 0 | 1 |
| `manual/ghost` | 10 | 9 | 0 | 1（`updates2.dau`） | 1 | 1 | 56 | 1 | 0 | 1 |
| `manual/install` | 7 | 7 | 5 | 0 | 0 | 1 | 56 | 1 | 0 | 1 |
| `manual/owner-draw-menu` | 3 | 3 | 0 | 0 | 0 | 1 | 56 | 1 | 0 | 1 |
| `manual/shell` | 12 | 12 | 0 | 0 | 1 | 1 | 56 | 1 | 0 | 1 |
| `manual/translator` | 0 | 0 | 0 | 0 | 0 | 1 | 56 | 1 | 0 | 1 |
| `manual/update` | 7 | 7 | 3 | 0 | 0 | 1 | 56 | 1 | 0 | 1 |
| 計 | 73 | 72 | 8 | 1 | 12 | | | | 0 | |

- 数え方: 名前の目印は `class="manual-item"` の数。外した「`:`」は控えと後の本文の字の「`:`」の数の差。場合分けは、目印の名前の字に拡張子の「`.`」もパスの「`\`」も無いもの（`install` の「標準的なゴーストの場合」など 5、`update` の「ゴーストの場合」など 3）。名前だけは、`li` の中で名前の後に字が無いもの。段落に分かれない形は `<li><strong class="manual-item">` の数
- 設計の MarkerCheck の表（73・72・場合分け 8・名前だけ 1・段落に分かれない形 12）と同じ。`shell` の 12 に字下げした `※1,※2` は入らない
- 漏れ: 全 40 頁の `article` の中の、`pre`・`code`（と `script`・`style`）の外の字に `{:`・`{#`・`{.` が 0

変わらないこと（控えと全 40 頁で比べた）:

- 題・`article` の中の見出しの id の並び・`class="headerlink"` の数（¶）・`md-nav__link` の数（目次）: 40 頁すべて同じ（manual の頁は `directory` が ¶ 3・目次 62、ほかが ¶ 1・目次 56）
- manual の外の 32 頁: `article` の本文の字（タグを外し空白を詰めたもの）が同じ
- manual の 8 頁: 控えとの本文の字の違いを `difflib` で取り、違いがすべて「`:`」（と前後の空白）を消すことだけで、ほかの字の違いが 0。消えた「`:`」は計 72
- `directory` の名前の `\`: `\` を含む目印の名前 12 個（`(myghost)\`・`(myghost)\ghost\master\`・`(myballoon)\` など）の字が、すべて控えの本文にそのまま入っている
- `_raw/`（2049 ファイル）の sha256 がすべて控えと同じ。`llms.txt` は配られたもの・作業木の `_site/llms.txt` とも控えと sha256 が同じ

流した式（`tools` = `C:/Users/maz-o/AppData/Local/Temp/claude/C--home-maz-git-doc-edit/95cb4bf7-32a6-4bf5-b971-42e18f7e2f04/scratchpad/tools/`、`PY` = doc_edit の `.venv/Scripts`）:

```sh
# 作業木の _raw/・llms.txt を数える（build は流さず、serve の前に作ったものを読むだけ）
PY/python -I snapshot.py <WT の絶対パス> after.json
# 8000 の serve と 8010 の控えから全 40 頁の HTML と assets を取り、数えて比べる（最後に ALL OK）
PY/python -I markercheck.py after.json
```

- `markercheck.py`: 配り（7.1）、頁ごとの数・漏れ・読み込み（1.1・1.2・2.9・3.3・7.2）、控えとの比べ（1.3・2.4・2.6・2.7・3.4・3.7・6.1・6.3・6.6・7.4）、`_raw/`・`llms.txt`（6.7）を 1 度に見て、合わないものを `NG` で出す。結果は `ALL OK`（`NG` 0）

## 木（4.3）

作業木 `site-look-manual-files` の `75c7433` を `zensical serve`（`http://127.0.0.1:8000/ukadoc-spec/`）で配り、`_site` の 40 頁すべてを Edge ヘッドレス + CDP で開いて数えた（2026-10-25）。言語の印の無いコードブロック（`pre > code:not([class*="language-"])`）ごとに、`+-` の行の数・`span.filetree-file` の数と字を数え、包んだ後の `textContent` を、`fetch` で取り直した同じ頁の HTML（スクリプトが動く前）の同じ順のブロックの字と比べた。`filetree.js` は直していない。

### 頁ごとの数（着色の後の形 `pre.highlight > code`）

| 頁 | 木 | 木の行 | ファイル名（包んだ数） | うち「`/`」「または」の 2 つ目 | フォルダの行 | 字の違い | 木でないブロックの `span` |
|---|---|---|---|---|---|---|---|
| `manual/balloon` | 1 | 40 | 42 | 3 | 1 | 0 | 0 |
| `manual/directory` | 2 | 59 | 59 | 7 | 7 | 0 | 0 |
| `manual/ghost` | 1 | 14 | 11 | 0 | 3 | 0 | 0 |
| `manual/install` | 6 | 48 | 29 | 0 | 19 | 0 | 0 |
| `manual/owner-draw-menu` | 1 | 18 | 15 | 0 | 3 | 0 | 0 |
| `manual/shell` | 1 | 18 | 15 | 0 | 3 | 0 | 0 |
| `manual/translator` | 2 | 14 | 8 | 0 | 6 | 0 | 0 |
| `manual/update` | 3 | 32 | 25 | 0 | 7 | 0 | 0 |
| manual の計 | 17 | 243 | 204 | 10 | 49 | 0 | 0 |
| `dev/nar` | 3 | 26 | 12 | 0 | 14 | 0 | 0 |
| `dev/update` | 1 | 10 | 5 | 0 | 5 | 0 | 0 |

- 設計の「TreeCheck」の期待の表とすべての欄で同じ。40 頁で木は 21 個（ほかの 30 頁に木は無い）
- 40 頁の言語の印の無いブロックは 162 個（生の HTML でも 162 個）。木でない 141 個の `span.filetree-file` は 0。頁の中の `span.filetree-file` はすべて木の中にあり、言語の印のあるブロック（さくらスクリプトの着色の `span` を含む）には 0
- 包んだ後の `textContent` と生の HTML の字の違いは 40 頁で 0（コピーのボタンが写す字も変わらない。6.5）。`filetree` の `console.warn` は 0 回
- 包んだ字の見本: `manual/ghost` の 11 個は `descript.txt`・`shiori.dll`・`(saori).dll`・`makoto.dll`・`updates2.dau`・`updates.txt`・`*.ico`・`*.cur`・`thumbnail.png`・`ai0.png`・`ai0_dark.png`（設計の写しと同じ）。`manual/shell` の `alias.txt（旧仕様）` は `alias.txt` だけ、`manual/balloon` の `ok_down.png`・`ok_up.png`、`manual/directory` の `readme.txt`・`readme.md` と `terms.txt`・`terms.md` はどちらも包まれた

### 例の表

3.1 の `tools/treecheck.js`（Node の `vm` の偽の `document`）を作業木の `assets/filetree.js` にもう一度流し、設計の例の表の 13 行・`+-` の無い行だけのブロック・全行を 1 つの木にした 12 個・言語の印のあるブロック・要素の入った木・字が変わるときの戻しのすべてが合った（`ALL OK`）。

### 両方の形の比べ（4.8）

作業木は `origin/main`（`529d092` の #13 を含む）の上にあり、`mkdocs.yml` に `pymdownx.highlight`（`use_pygments: false`）が既にあるので、作業木そのものが着色の後の形（`pre.highlight > code`）である。そのため「着色を足した写し」の build は省いた。代わりに今の形（着色の前）を確かめるため、作業木の HEAD を `git archive` で使い捨ての置き場に書き出し、写しの `mkdocs.yml` から `pymdownx.highlight` の 2 行を外して build し（`prepare_site.py` exit 0・`zensical build --strict` exit 0）、`http://127.0.0.1:8020/` で配って同じスクリプトで 40 頁を数えた。

| 形 | コードブロックの HTML | 言語の印の無いブロック | 木 | 木の行 | ファイル名 | 2 つ目 | フォルダの行 | 字の違い | 木でないブロックの `span` |
|---|---|---|---|---|---|---|---|---|---|
| 着色の後（作業木） | `pre.highlight > code` | 162 | 21 | 279 | 221 | 10 | 68 | 0 | 0 |
| 今の形（写し） | `div.highlight > pre > code` | 449 | 21 | 279 | 221 | 10 | 68 | 0 | 0 |

- 頁ごとの木・行・ファイル名・フォルダの数と、包んだ字の並びは 2 つの形で 1 つも違わない
- 今の形では言語の名前が `code` でなく `div.highlight` の class に付くので、言語のあるブロックもセレクタに入り 449 個になる。どれも `+-` の行を持たないので包まれず（`span` 0、`console.warn` 0）、字も変わらない
- 終わった後、8020 の配りを止め、写しの置き場を消した（8020 は応答しない。作業木の `git status` は空、8000 の配りはそのまま）

### 流した式

```sh
# 頁の一覧（作業木の _site の 40 頁）
find _site -name index.html | sed 's#^_site/##; s#index.html$##' | sort > pages.txt
# 着色の後の形（作業木の serve）
node treecount.mjs http://127.0.0.1:8000/ukadoc-spec/ $(cat pages.txt) > after-all.json
# 例の表
node treecheck.js .worktrees/site-look-manual-files/assets/filetree.js
# 今の形（使い捨ての写し）
git -C .worktrees/site-look-manual-files archive HEAD | tar -x -C oldform
#   oldform/mkdocs.yml から「- pymdownx.highlight:」「use_pygments: false」の 2 行を外す
.venv/Scripts/python.exe scripts/prepare_site.py && .venv/Scripts/zensical.exe build --strict   # oldform で
python -m http.server 8020 --bind 127.0.0.1   # oldform/_site で
node treecount.mjs http://127.0.0.1:8020/ $(cat pages.txt) > old-all.json
#   配りを止め、oldform を消す
```

`treecount.mjs` と `treecheck.js` は spec の外のスクラッチの `tools/` に置いた使い捨てのスクリプトである。

## 画面（4.5）

- 日付: 2026-10-25。撮った版: 作業木 `site-look-manual-files` の `75c7433` を `zensical serve` で配ったもの（`http://127.0.0.1:8000/ukadoc-spec/`。止めず・build し直さずにそのまま使った）
- 道具: `shot.mjs`（`.kiro/specs/completed/site-look-plan/tools/`。読むだけで使い、直していない）。1 枚ごとに使い捨てのプロファイルの Edge ヘッドレスで撮る
- `screenshots/` に `after-` の画面 14 枚（7 組 × 明・暗）を置いた。どの画面も `scrollWidth` = `innerWidth` = 1000

| 画面 | 頁 | セレクタ | 大きさ |
|---|---|---|---|
| `after-ghost-{light,dark}.png` | `manual/ghost/` | `h1#ゴースト` | 1000×700 |
| `after-ghost-C22-{light,dark}.png` | `manual/ghost/` | `.md-typeset > ul` | 1000×900 |
| `after-balloon-{light,dark}.png` | `manual/balloon/` | `.md-typeset > ul:has(> li > strong.manual-item)`（最初の段落に分かれない項目 `balloonk*.pna`） | 1000×700 |
| `after-install-{light,dark}.png` | `manual/install/` | `.md-typeset > ul` | 1000×900 |
| `after-directory-{light,dark}.png` | `manual/directory/` | `.md-typeset > ul:has(+ ul + p + p + p + ul a[href$="#delete.txt"])`（`(myghost)\shell\master\` から `(myghost)\delete.txt`・`(myghost)\developer_options.txt` まで） | 1000×700 |
| `after-directory-tree-{light,dark}.png` | `manual/directory/` | `.md-typeset pre`（最初の木） | 1000×900 |
| `after-shell-tree-{light,dark}.png` | `manual/shell/` | `.md-typeset pre` | 1000×700 |

### 撮り直し（7.9）

- 撮り直した枚数: 0。14 枚すべてを Read で目で見て、二重に重なった跡は無かった
- 目で見るのに加えて、`tools/ghostrows.py`（PIL）で、各画面の上の 60px より下の左の端（x=2）と右の端（x=幅−20）に、ヘッダの色（`rgb(31, 78, 140)`）の行がいくつあるかを数えた。14 枚とも 0 行
- `after-directory-*` は、最初に書いたセレクタ（`ul:has(+ ul + ul …)`）が段落 3 つを挟む並びに合わず「セレクタが見つからない」で画面を書かなかった。セレクタを直して 1 回で撮った（書けた画面の撮り直しではないので数えない）

### 目標の画面との見比べ（7.5）

`after-ghost-*` を `mock-manual-ghost-C14-*`・`mock-manual-ghost-C15-*` と、`after-ghost-C22-*` を `mock-manual-ghost-C22-*` と、この spec の部分（ファイル名の行と帯・説明の字下げ・木のファイル名の色）だけ見比べた。頁の位置・大きさは目標の画面と同じ（題・前書き・木の位置が 1px も動いていない）。

- ファイル名の行（2.1）: 名前が 1 行に、説明が次の行から始まる。C14 と同じ
- 説明の字下げ（2.2）: 説明の左の端は x=40 で、C14・C22 の目標の画面の説明の左の端（x=40）と同じ。点は無い
- ファイルの間（2.8）: C14 の細い線でなく、ファイル名の帯で分かれている（要件どおりの違い）
- 帯（3.1）: 左の太い線・下の細い線・薄い地・`h3` と同じ大きさの字。C22 と同じ見え方。`updates2.dau`（名前だけ）の帯もほかと同じ左の端と幅（3.2。目標の画面では 6px ずれていた所がそろった）
- 木のファイル名の色（4.1）: 明るい表示はファイル名 11 個が紺で、フォルダ名 3 個（`(myghost)`・`ghost`・`master`）と `+-`・注（`（旧仕様）`）は今の色のまま。C15 の明るい表示と同じ
- 決めたとおりの違い 3 つ（設計の VerificationRecord）:
  1. 帯の位置: 目標の画面の帯は本文の左の端より 6px 左（x=10）にあるが、この spec の帯は C01 と同じく本文の左の端（x=16）にある
  2. 帯の中のリンク: 目標の画面では字の色だったが、明るい表示は本文のリンクの紺、暗い表示は白と下線（要件 3.6。`descript.txt`・`updates2.dau`・`updates.txt` の帯で見えている。リンクの無い `shiori.dll`・`(saori).dll` は字の色のまま）
  3. 暗い表示の木の色: 目標の画面の緑から、明るい紺（`--md-typeset-a-color`）に変わった
- この 3 つのほかに目に付いた違い: 帯の高さと帯の上下の間が目標の画面より少し詰まっている（帯の高さ 約 42px、目標の画面は 約 46px）。帯の宣言を C01 と分け合う（`:is(.bundle-item, .manual-item)`）ことによるもので、要件 3.1 の「C01 の項目名の帯と同じ見え方」どおり。本文のリンクの暗い表示の色の違い（目標の画面は暗い紺、今は明るい青）はこの spec の部分の外（サイト全体のリンクの色）

### 目標の画面の無い 5 組（7.6）

- `after-balloon-*`（2.5）: 段落に分かれない `balloonk*.pna`・`balloonp*def*.pna` の説明も名前の次の行から、ほかの項目（`balloonp*def*.png`・`balloonc*.png`）と同じ x=40 の字下げで始まる。説明の中の入れ子の箇条書き（`balloonc0.png …`）は点を残している
- `after-install-*`（2.9）: 場合分けの名前（「標準的なゴーストの場合」「標準的な追加シェルの場合」）がファイル名と同じ帯になり、その下の木と注記の箱（ヒント）が説明と同じ左の端（x=40）にそろう。箇条書きの中の木と注記の箱の中の木（`(mysupplement)`）の両方で、ファイル名（`install.txt`・`developer_options.txt`・`dic_supplement.txt` など）にだけ色が付き、フォルダ名（`ghost`・`shell`・`master`）と注（`(SSPのみ)`）・`:` の行は今の色のまま
- `after-directory-*`（3.4・6.6）: `(myghost)\shell\master\`・`(myghost)\shell\(additional_shell)\` の帯で `\` がそのまま見える。名前の一部だけのリンク `(myghost)\delete.txt`・`(myghost)\developer_options.txt` は、`(myghost)\` が字の色、リンクの部分だけが明るい表示は紺、暗い表示は白と下線。帯の後の段落（「シェルフォルダ内の…」）は帯でなく、本文の左の端のまま
- `after-directory-tree-*`（4.5）: 「`readme.txt` または `readme.md`」「`terms.txt` または `terms.md`」で 2 つのファイル名のどちらにも色が付き、「または」と注（`(必要な時のみ)`）は今の色のまま。`(additional_shell)`・`shell`・`master` などフォルダ名は今の色。「`/`」の行（`ok_down.png/ok_up.png` など 3 行）はこの画面の範囲（最初の木）に無いので、同じ頁の 2 つ目の木（`#バルーン ~ pre`）を明・暗で別に撮って見た（spec の外のスクラッチの `shots45/extra-directory-tree2-{light,dark}.png`。`screenshots/` には置いていない）。`ok_down.png`・`ok_up.png` のどちらにも色が付き、「`/`」と注は今の色。包んだ字は 4.3 の数（`/`・または の 2 つ目 10 個）とも合う
- `after-shell-tree-*`（4.4）: `alias.txt（旧仕様）` で `alias.txt` だけに色が付き、`（旧仕様）` は今の色のまま。`surfaces**.txt`・`surfacetable.txt` も名前だけに色が付き、注 `（SSPのみ）` は今の色

### ファイル名とフォルダ名の見分け（4.3）

- 明るい表示: ファイル名は紺（`rgb(31, 78, 140)`）、フォルダ名・`+-`・注は灰色がかった黒で、どの画面でもはっきり見分けられる
- 暗い表示: ファイル名は明るい紺（`rgb(143, 180, 232)`）、フォルダ名・`+-`・注は灰白（`rgba(213, 216, 226, 0.82)`）。色合いの差は明るい表示より小さいが、`after-ghost-dark`・`after-install-dark`・`after-directory-tree-dark`・`after-shell-tree-dark` のどれでも、フォルダ名（`(myghost)`・`ghost`・`master`・`shell`・`(additional_shell)`）とファイル名を色で見分けられた。設計の話し合いで決めた色のままで、選び直しは要らないと見た

## 失わないもの（4.5）

自分の Edge ヘッドレス + CDP のスクリプト `tools/keep45.mjs` で、作業木（`http://127.0.0.1:8000/ukadoc-spec/`）と控え（`http://127.0.0.1:8010/`、`b1f8ab1`）を同じ式で開いて比べた。Edge は自分の空いた口と、スクラッチの下の新しいプロファイル（`edge45-*`）で起動し、終わりに子のプロセスごと止めてプロファイルを消した（残っている `msedge.exe` 0、`edge45-*` 0）。色の選びは `localStorage` に残るので、頁を開くたびに `Storage.clearDataForOrigin` で消し、`prefers-color-scheme` だけで明・暗が決まるようにした（開いた頁の `data-md-color-scheme` が明 `default`・暗 `slate` であることも見た）。

### 検索の強調（6.2）

帯 = 一番外の箇条書きの項目の頭の太字（控えには `manual-item` が無いので、`.md-typeset > ul > li > strong:first-child` と `… > li > p:first-child > strong:first-child` の形で取った）。

| 頁 | 表示 | `mark` の数（後・控え） | 帯の中（後・控え） | 木の中（後・控え） | うち木のファイル名の `span` の中（後） |
|---|---|---|---|---|---|
| `manual/ghost/?h=descript` | 明 | 2・2 | 1・1 | 1・1 | 1 |
| `manual/ghost/?h=descript` | 暗 | 2・2 | 1・1 | 1・1 | 1 |
| `manual/directory/?h=readme` | 明 | 12・12 | 2・2 | 5・5 | 5 |
| `manual/directory/?h=readme` | 暗 | 12・12 | 2・2 | 5・5 | 5 |

- 見え方: どの `mark` も `visibility: visible`・`opacity: 1`・大きさが 0 でなく、地の色は控えと同じ（明 `rgba(255, 255, 0, 0.5)`、暗 `rgba(66, 135, 255, 0.3)`）。帯の地（明 `rgba(0, 0, 0, 0.07)`、暗 `rgba(226, 228, 233, 0.12)`）・木の地と違う色で、強調として見える。`manual/ghost/?h=descript` を明・暗で撮った画面（スクラッチの `shots45/mark-ghost-{light,dark}.png`）でも、帯の `descript` と木の `descript` に強調の地が見えた
- 控えとの違いは、`mark` の中の字の色と大きさだけで、どれも決めたとおり: 帯の中は `h3` の大きさになり（高さ 19→24px）、リンクの中の字は暗い表示で白（3.6）。木のファイル名の中の字はファイル名の色（明 紺 `rgb(31, 78, 140)`、暗 明るい紺 `rgb(143, 180, 232)`）。`mark` の数・字・地の色は同じ
- `mark` の入った帯と木のファイル名で、`mark` は包みの `span.filetree-file` の中に入り（ghost 1・directory 5）、強調も色も消えていない

### 木のコピーのボタンと字（6.5）

- `manual/ghost`（木 1）・`manual/directory`（木 2）の明・暗で、どの木にもコピーのボタン（`data-clipboard-target` が `#__code_0 > code`・`#__code_1 > code`）があり、控えと同じ
- ボタンでコピーされる字（`data-clipboard-target` の `code` の `innerText`）が、控えの同じ木の字と 1 字も違わない（ghost 253 字、directory 913 字・552 字。`?h=` で `mark` が入った状態でも同じ）

### `directory` の帯の `\`（6.6）

- `manual/directory` の帯の字のうち `\` を含むもの 12 個（`(myghost)\`・`(myghost)\ghost\`・`(myghost)\ghost\master\` …）が、明・暗とも控えの同じ位置の太字の字と並びまで同じ。`after-directory-*` の画面でも `\` がそのまま見える

### 幅 375（6.4・7.8）

幅 375・高さ 812 で、明・暗の両方で開いた（画面は残していない）。

| 頁 | 明 | 暗 |
|---|---|---|
| `manual/balloon`・`directory`・`ghost`・`install`・`owner-draw-menu`・`shell`・`translator`・`update`、`dev/nar`・`dev/update` | 10 頁とも `scrollWidth` 375 = `innerWidth` 375 | 10 頁とも `scrollWidth` 375 = `innerWidth` 375 |

- 数え方は `shot.mjs` と同じ（縦のスクロールバーの幅を足して `innerWidth` と同じ物差しにする: `scrollWidth + innerWidth − clientWidth`）。生の値は 20 回とも `scrollWidth` 360 = `clientWidth` 360（縦のスクロールバー 15px）、`innerWidth` 375 で、横にはみ出した頁は無い

### 流した式

```sh
# 画面（spec のフォルダで。B = http://127.0.0.1:8000/ukadoc-spec/manual）
node ../completed/site-look-plan/tools/shot.mjs "$B/ghost/" 'h1#ゴースト' screenshots/after-ghost-light.png light 1000 700
#   ほかの 13 枚も上の表のセレクタ・大きさで同じ式（light/dark）
# 二重の跡（スクラッチの tools で）
python ghostrows.py ".kiro/specs/site-look-manual-files/screenshots/after-*.png"
# 失わないもの
node keep45.mjs http://127.0.0.1:8000/ukadoc-spec/ http://127.0.0.1:8010/ keep45.json
```

`ghostrows.py`・`keep45.mjs`・`keep45.json` と見るための画面（`shots45/`）は、spec の外のスクラッチ `C:/Users/maz-o/AppData/Local/Temp/claude/C--home-maz-git-doc-edit/95cb4bf7-32a6-4bf5-b971-42e18f7e2f04/scratchpad/` の下に置いた使い捨てのもの。
