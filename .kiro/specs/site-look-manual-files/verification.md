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
