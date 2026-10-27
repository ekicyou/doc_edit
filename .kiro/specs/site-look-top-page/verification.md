# 確かめの記録: site-look-top-page

## 測った版と日付

- 日付: 2026-10-27〜
- 作業木: `.worktrees/site-look-top-page/`（ブランチ `site-look-top-page`。ukadoc-spec の作業木）
- `origin/main`: `1080225`。変更の前の控え（1.2）はこの版
- 頁: 作業木の `zensical serve`（`http://127.0.0.1:8000/ukadoc-spec/…`）。控えは 8010
- 開発者に画面や `serve` を見せるときは、古い `extra.css` が残らないよう Ctrl+F5（強制の再読み込み）を頼む（8.9）

## 変更の前（1.2）

- 日付: 2026-10-27
- 控えのコミット: `10802250f6cff47e18e0d51ef2f6b7f3bf2ac49a`（ukadoc-spec の `origin/main`。作業木 `.worktrees/site-look-top-page/` の HEAD と同じ）
- 控えの置き場: `C:/Users/maz-o/AppData/Local/Temp/claude/C--home-maz-git-doc-edit/6ec24e7b-70a2-442e-bd85-89bad02cc5d7/scratchpad/before-1080225/`（`.cache/` の無いまま `prepare_site.py` と `zensical build --strict` を流した。どちらも exit 0、build は「No issues found」）
- 口: `http://127.0.0.1:8010/ukadoc-spec/`（`scratchpad/serve/ukadoc-spec` を控えの `_site/` へのジャンクションにし、`serve/` を根に配る。例: `http://127.0.0.1:8010/ukadoc-spec/manual/ghost/`。トップと `manual/ghost/` が 200）
- 配りのプロセス: `Start-Process -WindowStyle Hidden` で起こした `.venv/Scripts/python.exe` の PID `12740`。口を開いているのはその子（uv の python）の PID `40296`。4.2 で両方を止め、`serve/` と控えの置き場を消す
- 測りの道具: `C:/Users/maz-o/AppData/Local/Temp/claude/C--home-maz-git-doc-edit/6ec24e7b-70a2-442e-bd85-89bad02cc5d7/scratchpad/tools/snapshot.py`（使い捨て。`site-look-manual-files` の `snapshot.py` を 41 頁とトップ向けに直したもの）
  - `_site/` の全 HTML の頁の `<title>`・`article` の中の見出しの id の並び・`class="headerlink"` の数・`md-nav__link` の数（`md-nav__link--active` を含む字の数え）・`article` の中の `table` の数・`article` の本文の字（`script`・`style` とタグを外し空白を詰めたもの）・頁の sha256 と、`_raw/` の全ファイルと `_site/llms.txt`・`_site/search.json` の sha256 を JSON に書く
  - 控えの結果: 控えの置き場の `before.json`（sha256 `4a468dd1…aa17021`）
  - トップの本文の字: 控えの置き場の `before.json.top.txt`（1973 字。sha256 `2012d59e…4aafaa3`）

```sh
# 控えを作る（置き場が無いとき。WT = .worktrees/site-look-top-page、B = 上の控えの置き場、PY = doc_edit の .venv/Scripts）
mkdir B && git -C WT archive 1080225 | tar -x -C B
cd B && PY/python scripts/prepare_site.py && PY/zensical build --strict    # どちらも exit 0
# 配る（PowerShell。serve/ukadoc-spec は B/_site へのジャンクション。4.2 で止めて消す）
Start-Process PY/python.exe -ArgumentList '-m','http.server','8010','--bind','127.0.0.1','--directory','<scratchpad>/serve' -WindowStyle Hidden -PassThru

# 数える（tools の中で。後は作業木で prepare_site.py と build を流した後）
PY/python -I snapshot.py ../before-1080225 ../before-1080225/before.json
```

控えの数:

| 項目 | 数 |
|---|---|
| HTML の頁 | 41（`index.html` 40 と `404.html`） |
| `_raw/` のファイル | 2049 |
| `llms.txt` の sha256 | `3916fa9e…0974075d` |
| `search.json` の sha256 | `a62b10c4…a9f94e92` |
| トップの見出しの id | 13 |
| トップの `class="headerlink"`（¶） | 13 |
| トップの `md-nav__link` | 82 |
| トップの `article` の中の `table` | 0 |
| トップの本文の字 | 1973 |

トップの見出しの id の並び: `ukadoc-トップページ`・`ukadocについて`・`対象version`・`外部リンク`・`ukadocの見方`・`目次`・`ファイル構成`・`設定ファイル`・`さくらスクリプト`・`イベント`・`規格`・`howto`・`その他`

- 設計の TopCheck の見込み（id 13・¶ 13・`md-nav__link` 82、頁 41）と同じ
- トップを除く 40 頁の本文の字・id・¶・目次の数と頁の sha256 は `before.json` に控えた。後（4.2）でこれと比べる

## `mark_top()` の例（2.1）

`scripts/prepare_site.py` に `TOP_HEADING`・`mark_top()` を足し、`mark_manual()` に引数 `cls`（既定値 `manual-item`）を足し、`write('index.md', …)` から `mark_top()` を呼ぶようにした（設計の差分の 5 か所のとおり）。スクラッチの `tools/mark_top_examples.py` で `mark_top()` に字を直に渡した。変える前は `mark_top` が無いので失敗し（`AttributeError`）、変えた後は 12 通りとも合った。

| 渡した字 | 結果 |
|---|---|
| `# UKADOC トップページ` | 変わらない（2.4・3.3） |
| `## 目次` | `## 目次 {: .top-section }` |
| `### HowTo` | `### HowTo {: .top-category }` |
| `#### x` | 変わらない |
| `- **ファイル構成**: 説明` | `- **ファイル構成**{: .top-item } 説明` |
| `- **その他**: 説明` | `- **その他**{: .top-item } 説明` |
| `- [全体の構成](manual/directory.md)`・`- Ghost`・`  - [descript.txt](…)` | 変わらない（3.4・4.6） |
| コードブロックの中の `## x`・`- **x**: y` | 変わらない |
| 上をまとめて 1 つの字で渡したもの | 1 行ずつ渡したときと同じ |
| `mark_manual(text)`（引数なし）に `- **x**: y` | `- **x**{: .manual-item } y`（manual の頁は変わらない） |

作業木で `prepare_site.py` と `zensical build --strict` はどちらも exit 0。`_site_src/index.md` では、行の末尾の `{: .top-section }` が 5 行（`ukadocについて`・`対象version`・`外部リンク`・`ukadocの見方`・`目次`）、`{: .top-category }` が 7 行（目次の分類）、「ukadocの見方」の 7 行が `- **…**{: .top-item } 説明` の形だった。

## `extra.css` のセレクタ（2.2）

作業木の `assets/extra.css` で、変える前と後の数（`grep -o`）:

| 印 | 前 | 後 | 行 |
|---|---|---|---|
| `.top-section` | 0 | 3 | 59・105・108 |
| `.top-category` | 0 | 1 | 30 |
| `.top-item` | 0 | 7 | 30・213・216・220・223（213・216 は 2 つずつ） |

`git diff -- assets/extra.css` は 8 行を消して 8 行を足しただけで、足した行はどれも消した行と組になるセレクタの行だった（設計の「Modified Files」の差分のとおり）。宣言・注・塊・色・`@media screen` の指定は変わらず、帯の中のコード（36・66 行）と暗い表示の帯の中のリンク（41 行）には印を足していない。

`.cache/` を消してから `prepare_site.py` と `zensical build --strict` はどちらも exit 0。配られる `_site/assets/extra.css` にも `.top-section` 3・`.top-category` 1・`.top-item` 7 がある。
