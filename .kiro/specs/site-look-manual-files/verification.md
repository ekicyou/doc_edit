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
