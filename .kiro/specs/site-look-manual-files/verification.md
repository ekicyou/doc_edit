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
