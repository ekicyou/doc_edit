# 確かめの記録: site-look-top-page

## 測った版と日付

- 日付: 2026-10-27（1.2〜4.1 のすべて）
- 測った版: 作業木 `.worktrees/site-look-top-page/`（ブランチ `site-look-top-page`。ukadoc-spec の作業木）の `a61b9de`。ukadoc-spec の `origin/main` `1080225` の上の 1 コミットで、変えたのは `scripts/prepare_site.py` と `assets/extra.css` だけ
- 控えの版: `origin/main` の `1080225`（変更の前。1.2）。3.1 で fetch し、`origin/main` が進んでいないことを確かめた
- 頁: 後は作業木の `zensical serve`（`http://127.0.0.1:8000/ukadoc-spec/…`）、控えは `1080225` の `_site/` を 8010 で配ったもの
- 道具: 使い捨ての `snapshot.py`・`mark_top_examples.py`・`topcheck.py`・`topprobe.mjs`・`summarize.py`（どれも `C:/Users/maz-o/AppData/Local/Temp/claude/C--home-maz-git-doc-edit/6ec24e7b-70a2-442e-bd85-89bad02cc5d7/scratchpad/tools/`）と、画面の `.kiro/specs/completed/site-look-plan/tools/shot.mjs`（読むだけで使った）
- 開発者に画面や `serve` を見せるときは、古い `extra.css` が残らないよう Ctrl+F5（強制の再読み込み）を頼む（8.9）

### 流した式

```sh
# Build Gate（作業木の根で。PY = doc_edit の .venv/Scripts）
rm -rf .cache
PY/python scripts/prepare_site.py      # 一覧の検査・見出しの数の検査を含む。exit 0
PY/zensical build --strict             # exit 0、「No issues found」
git diff --stat origin/main            # scripts/prepare_site.py・assets/extra.css だけ

# 測りのスクリプト（tools の中で。式の細かい所は各節）
PY/python -I snapshot.py <_site の根> <json>              # 1.2 控えの数
PY/python -I mark_top_examples.py                          # 2.1 mark_top() に字を直に渡す
PY/python -I topcheck.py <口> before.json <木の根>          # 3.2 印の数・変わらないこと
node topprobe.mjs <口> <幅> <高さ> > probe.json             # 3.3 位置・余白・対比・切り替え・検索の強調・幅 375
PY/python -I summarize.py probe.json
node shot.mjs <口> <セレクタ> <画面> <light|dark> <幅> <高さ>   # 3.3 幅 375 の物差し、3.4 画面
```

- 重ねの計算（対比。3.3）: fg は `getComputedStyle` の `color`。bg は要素から `html` までの `backgroundColor` を白の上に外から順に重ねた地（`c = a·fg + (1 − a)·bg` を各段で）。半透明の字は、その地の上に同じ式で重ねてから測る。対比は WCAG 2.x の `(L1 + 0.05) / (L2 + 0.05)`（L は sRGB を線形にした相対輝度）を小数 2 桁に四捨五入して出す（`topprobe.mjs` の `over`・`bgOf`・`lum`・`ratio`）。式は `site-look-list-items` の `verification.md` の「流した式」と同じ

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

## Build Gate とコミット（2.3）

作業木で `.cache/` を消してから `prepare_site.py` と `zensical build --strict` を流し、どちらも exit 0（「No issues found」）。変えたのは `scripts/prepare_site.py` と `assets/extra.css` だけで、ukadoc-spec の `CLAUDE.md` の書式・リンクの決まりに当たる原稿の変更は無い（規約 Gate）。2 ファイルを 1 つのコミット `a61b9de`（「トップページの節・目次の分類・見方の名前に、ほかの頁と同じ帯と字下げを当てる」）にした。push も PR もしていない。

`git diff --stat origin/main`:

```
 assets/extra.css        | 16 ++++++++--------
 scripts/prepare_site.py | 19 +++++++++++++++----
 2 files changed, 23 insertions(+), 12 deletions(-)
```

作業木に未コミットの変更は無い。

## 測る版（3.1）

2026-10-27 に ukadoc-spec を fetch した。`origin/main` は `1080225` のままで、作業木の分岐点と同じだった（`origin/main` は作業木の先祖）。merge はせず、1.2 の控え（`1080225`）もそのまま使う。3.2〜3.4 は作業木の `a61b9de`（`origin/main` `1080225` の上の 1 コミット）で測る。

## 配り（3.2）

- 日付: 2026-10-27。作業木の `a61b9de` で測った
- 1.1 のプレビューは止まっていた（8000 は空き）。作業木で `.cache/` を消し、`prepare_site.py`（exit 0）→ `zensical build --strict`（exit 0、「No issues found」）→ `zensical serve` の順に起動し直した
- プレビューのプロセス: `Start-Process -WindowStyle Hidden -PassThru` で起こした `.venv/Scripts/zensical.exe serve`（cwd は作業木）の PID `40096`。口 8000 を開いているのは PID `38952`。3.3・3.4 で使い、4.2 で両方を止める
- 控えは 8010 で配られたまま（PID `40296`）。配り直していない
- 配られた `/ukadoc-spec/assets/extra.css` は 200 で、`.top-section` 3・`.top-category` 1・`.top-item` 7（2.2 の作業木のファイルと同じ）
- `zensical serve` は頁の `</html>` の後に livereload の `<script>` を足す。数える道具は最後の `</html>` より後ろを外して比べる。外したトップの HTML は作業木の `_site/index.html` とバイト単位で同じだった
- 数える道具: `C:/Users/maz-o/AppData/Local/Temp/claude/C--home-maz-git-doc-edit/6ec24e7b-70a2-442e-bd85-89bad02cc5d7/scratchpad/tools/topcheck.py`（使い捨て。`before.json` の 41 頁を口から HTTP で取り、標準の `html.parser` で木にして数え、`before.json` と `before.json.top.txt`・控えの `search.json` と比べる。`_raw/` は配られないので木の根を渡して比べる）

```sh
# tools の中で（PY = doc_edit の .venv/Scripts、WT = .worktrees/site-look-top-page）
PY/python -I topcheck.py http://127.0.0.1:8010/ukadoc-spec/ ../before-1080225/before.json ../before-1080225   # 控え（先に流す）
PY/python -I topcheck.py http://127.0.0.1:8000/ukadoc-spec/ ../before-1080225/before.json WT                  # 後
```

結果はスクラッチの `topcheck-8010.txt`（控え）と `topcheck-8000.txt`（後）に書いた。

## 印の数（3.2）

| もの | 期待 | 控え（8010） | 後（8000） |
|---|---|---|---|
| `extra.css` の `.top-section`・`.top-category`・`.top-item` | 3・1・7 | 0・0・0 | 3・1・7 |
| `h2.top-section` | 5 | 0 | 5 |
| `h3.top-category` | 7 | 0 | 7 |
| `strong.top-item`（うち `li > strong`） | 7（1） | 0（0） | 7（1）。ほかの 6 個は `li > p:first-child > strong` |
| 外した「`:`」 | 7 | — | 7 |
| 漏れ（`pre`・`code` の外の `{:`・`{#`・`{.`） | 0 | 0 | 0 |
| 帯の中のリンク（`a:not(.headerlink)`。6.3） | 0 | 0 | 0 |
| 帯の中のコード | 0 | 0 | 0 |
| トップの `article` の中の `table` | 0 | 0 | 0 |
| `h1` の class | 無し | 無し | 無し（`ukadoc-トップページ` の 1 個） |
| トップの外の 40 頁の `top-` の class | 0 | 0 | 0 |

- 節の見出しの帯: `ukadocについて`・`対象version`・`外部リンク`・`ukadocの見方`・`目次`
- 目次の分類の帯と見方の分類名の帯: どちらも `ファイル構成`・`設定ファイル`・`さくらスクリプト`・`イベント`・`規格`・`HowTo`・`その他`
- トップの `top-` の class は 19 個（5 + 7 + 7）で、帯の数と同じ
- 帯の中のリンクは 0 個なので、帯の中のリンクの対比は測らない（6.3）

## 変わらないこと（3.2）

| もの | 期待 | 後（8000） |
|---|---|---|
| トップの見出しの id の並び | 控えと同じ（13） | 同じ（13） |
| トップの `class="headerlink"`（¶） | 13 | 13 |
| トップの `md-nav__link` | 82 | 82 |
| トップの本文の字の違い | 「`:`」7 字と後ろの空白だけ | 空白を除くと「`:`」の削除 7 か所だけ（空白を詰めた字では「`: `」か「` :`」の 2 字の削除が 7 か所。外したのは「`: `」で、残った空白が詰められた分） |
| 控えと HTML が違う頁 | `index.html` だけ | `index.html` だけ（41 頁のうちほかの 40 頁は `404.html` を含めてバイト単位で同じ） |
| `search.json` | 「ukadocの見方」の 1 件だけ違う | 全体は違い、`config` は同じ、`items` は 2579 件で数が同じ、違うのは `#ukadocの見方` の 1 件だけ |
| `_raw/` | 同じ | 2049 ファイルとも同じ |
| `llms.txt` | 同じ | 同じ |

数・漏れ・変わらないことはすべて期待どおりで、`prepare_site.py` を見直すところは無かった。

## 測りの式（3.3）

- 日付: 2026-10-27。作業木の `a61b9de` を 8000（PID `40096`・`38952`）で、控え（`1080225`）を 8010（PID `40296`）で測った。どちらも配り直していない（トップが 200）
- 道具: `C:/Users/maz-o/AppData/Local/Temp/claude/C--home-maz-git-doc-edit/6ec24e7b-70a2-442e-bd85-89bad02cc5d7/scratchpad/tools/topprobe.mjs`（使い捨て。Edge ヘッドレス + CDP。起動と CDP の繋ぎ方は `site-look-plan/tools/shot.mjs` と同じ）と、まとめの `tools/summarize.py`。結果の JSON はスクラッチの `probe-8000*.json`（後）・`probe-8010*.json`（控え）、まとめは `sum-8000.txt`・`sum-8010.txt`
- 1 回の起動で、明（`prefers-color-scheme: light`、既定のパレット `default`）で開いて測り、ヘッダの見えている切り替えのラベル（`for="__palette_1"`）を `Input.dispatchMouseEvent` で押して、読み込み直さずに暗（`slate`）で同じものを測る
- 対比の式は `site-look-list-items` の `verification.md` の「流した式」のとおり（`getComputedStyle` の `color`、要素から `html` までの `backgroundColor` を白の上に外から重ねた地、半透明の字は地に重ねてから、WCAG 2.x の対比を小数 2 桁）。¶ のホバーは `Input.dispatchMouseEvent`（`mouseMoved`）でポインタを ¶ の中央に載せ（`:hover` が真）、フォーカスは `focus()`（`document.activeElement` が ¶）で測った
- 測る所の取り方は控えと後で同じ: 節の見出しの帯は id（`ukadocについて`・`対象version`・`外部リンク`・`ukadocの見方`・`目次`）の `h2`、目次の分類の帯は `article` の `h3` の 7 個、見方の分類名の帯は「ukadocの見方」と「目次」の間の一番外の `ul` 7 個の `li` の最初の `strong`。位置は `getBoundingClientRect()` の左と幅（小数 2 桁）
- 説明の左の端は `site-look-manual-files` と同じ取り方（項目の帯の外の子の要素の左と、帯の外の字を 1 字ずつ縦の中央が 8px 以内の行にまとめた各行の頭の左。帯の行より下の行）

```sh
# tools の中で（PY = doc_edit の .venv/Scripts、SHOT = .kiro/specs/completed/site-look-plan/tools/shot.mjs）。控え（8010）を先に流した
node topprobe.mjs http://127.0.0.1:8010/ukadoc-spec/ 1000 700 > ../probe-8010.json
node topprobe.mjs http://127.0.0.1:8000/ukadoc-spec/ 1000 700 > ../probe-8000.json
node topprobe.mjs "http://127.0.0.1:8000/ukadoc-spec/?h=%E7%9B%AE%E6%AC%A1" 1000 700 > ../probe-8000-h1.json   # ?h=目次
node topprobe.mjs "http://127.0.0.1:8000/ukadoc-spec/?h=%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E6%A7%8B%E6%88%90" 1000 700 > ../probe-8000-h2.json   # ?h=ファイル構成
node topprobe.mjs http://127.0.0.1:8000/ukadoc-spec/ 375 812 > ../probe-8000-375.json   # 8010 も同じ 4 つを流した
PY/python -I summarize.py ../probe-8000.json
node SHOT http://127.0.0.1:8000/ukadoc-spec/ h1 - light 375 812   # dark も。画面は残さない（-）
```

## 位置と余白（3.3）

幅 1000。明・暗で同じ値だった（後・控えとも）。

| もの | 写し（設計） | 控え（8010） | 後（8000） | 判定 |
|---|---|---|---|---|
| 節の見出しの帯 5 個の左の端・幅 | 16px・711px | 16・711（帯は無い。`h2` の箱） | 16・711（5 個とも `top-section`） | 満たす |
| 目次の分類の帯 7 個の左の端・幅 | 16px・711px | 16・711（`h3` の箱） | 16・711（7 個とも `top-category`） | 満たす |
| 見方の分類名の帯 7 個の左の端・幅 | 16px・711px | 46・96/128/64/32/49.69/48（太字の字の幅） | 16・711（7 個とも `top-item`） | 満たす |
| 帯 19 個の左の端・幅 | 1 通り | — | 16・711 の 1 通り | 満たす |
| 見方の説明の左の端 | 40px | 46 | 40 の 1 通り（帯の外の子の要素 6、行の頭 17） | 満たす（4.2） |
| 見方の項目の点 | `none` | `disc`（7） | `none`（7） | 満たす（4.2） |
| ほかの一番外の項目（46 個）の点・左の端 | `disc`・46px、控えと同じ | `disc`・46（46 個） | `disc`・46（46 個。控えと 1 個ずつ同じ） | 満たす（3.4・4.6） |
| 節の見出しの帯の `margin` | `40px 0 16px` | `40px 0 16px`（5） | `40px 0 16px`（5） | 満たす（5.4） |
| 目次の分類の帯の `margin` | `32px 0 16px`、「目次」の直後の 1 個は `16px 0` | 同じ（6・1） | `32px 0 16px` 6・`16px 0` 1 | 満たす（5.4） |
| 見方の分類名の帯の `margin` | `10px 0 6px -24px` | `0`（太字の字） | `10px 0 6px -24px`（7） | 満たす（5.4） |
| 段落（`article` の直下の `p`）の `margin` | `16px 0` | `16px 0`（5） | `16px 0`（5） | 満たす（5.3） |
| 見方の説明の段落（`li` の中の `p` 12 個）の `margin` | （写しに無い） | `8px 0`（12） | 帯を包む最初の `p` が `0 0 8px`（6）、2 つ目の `p` が `8px 0`（6） | 参考（下の注） |
| 目次のリンクの行の間隔（一番外の `ul` 7 個、リンク 44 個） | 控えと同じ | 33.59px が 31・62.38px が 6 | 同じ（`ul` ごとの並びが控えと 1 つずつ同じ） | 満たす（5.2） |
| 目次のリンクの左の端（入れ子の字下げ） | 控えと同じ | 46 が 28・76 が 16 | 同じ | 満たす（4.6・5.2） |
| 分類の帯の下の端から最初のリンクの上の端まで | 控えと同じ | 19 か 47.78（`ul` 7 個） | 同じ | 満たす（5.2） |

- 見方の説明の段落: 帯を包む最初の `p` の上の余白が 0 になるのは、`manual/` の頁と同じ `extra.css` の 220 行（`li > p:first-child:has(> :is(.manual-item, .top-item))`。設計の TopBandStyle の 4.2）で、その上の余白は帯の `margin` の上 10px が受け持つ。説明の段落どうしの間（`8px`）と最初の `p` の下（`8px`）は控えと同じで、C02 のように詰めてはいない（5.3）
- 目次のリンクの行の間隔・左の端・帯からの距離は控えと同じで、リンクの並びは帯の分だけ下にずれるだけ（5.2）
- 写しの余白と違う値は無かった

## 対比（3.3）

幅 1000。fg は `getComputedStyle` の `color`、bg は重ねた地。半透明の字は重ねた後の色を括弧に書いた。

| 測る所 | セレクタ | 表示 | 状態 | fg | bg | 対比 | 写し | 線 | 判定 |
|---|---|---|---|---|---|---|---|---|---|
| 節の見出しの帯の字 | `h2.top-section`（5 個） | 明 | — | `rgb(255, 255, 255)` | `rgb(31, 78, 140)` | 8.31（5 個とも） | 8.31 | 7（2.2） | 満たす |
| 同上 | 同上 | 暗 | — | `rgb(255, 255, 255)` | `rgb(31, 78, 140)` | 8.31（5 個とも） | 8.31 | 7（2.2） | 満たす |
| 節の見出しの帯の ¶ | `h2.top-section .headerlink`（5 個） | 明 | ふだん・ホバー・フォーカス | `rgba(255, 255, 255, 0.7)`（`rgb(188, 202, 221)`） | `rgb(31, 78, 140)` | 4.99（15 通りとも） | 4.99 | 3（2.3） | 満たす |
| 同上 | 同上 | 暗 | ふだん・ホバー・フォーカス | 同上 | `rgb(31, 78, 140)` | 4.99（15 通りとも） | 4.99 | 3（2.3） | 満たす |
| 目次の分類の帯の字 | `h3.top-category`（7 個） | 明 | — | `rgba(0, 0, 0, 0.87)`（`rgb(31, 31, 31)`） | `rgb(237, 237, 237)` | 14.13 | 14.13 | 4.5（3.2） | 満たす |
| 同上 | 同上 | 暗 | — | `rgba(226, 228, 233, 0.82)`（`rgb(195, 197, 203)`） | `rgb(54, 56, 64)` | 6.76 | 6.76 | 4.5（3.2） | 満たす |
| 見方の分類名の帯の字 | `strong.top-item`（7 個） | 明 | — | `rgba(0, 0, 0, 0.87)`（`rgb(31, 31, 31)`） | `rgb(237, 237, 237)` | 14.13 | 14.13 | 4.5（参考） | 満たす |
| 同上 | 同上 | 暗 | — | `rgba(226, 228, 233, 0.82)`（`rgb(195, 197, 203)`） | `rgb(54, 56, 64)` | 6.76 | 6.76 | 4.5（参考） | 満たす |
| 参考: 目次の分類の帯の ¶ | `h3.top-category .headerlink` | 明 / 暗 | ふだん | `rgba(0, 0, 0, 0.32)` / `rgba(226, 228, 233, 0.32)` | `rgb(237, 237, 237)` / `rgb(54, 56, 64)` | 2.2 / 2.33 | 2.2 / 2.33 | 無し（テーマの色のまま） | — |

- ¶ の `opacity` は、ふだん 0（テーマのとおり見出しにポインタが載るまで見えない）、ホバー・フォーカスで 1。色はどの状態も同じ
- 帯の中のリンクは 0 個（3.2 で数えた）なので測っていない（6.3）
- 控え（8010）では帯が無く、見出しは白い地の字（明 16.07・暗 8.93）、¶ はテーマの色（ふだん 明 2.23・暗 2.53、ホバー・フォーカス `rgb(82, 108, 254)` 明 4.26・暗 3.78）、`top-` の class は 0 個で、上の表の測る所は当たらなかった（変更の前の確かめ）

## 切り替えと印刷（3.3）

| もの | 期待 | 後（8000） | 判定 |
|---|---|---|---|
| 切り替えの前後の `body` の `data-md-color-scheme` | `default` → `slate` | `default` → `slate` | 満たす（6.1） |
| 読み込み直し | 無い | 切り替えの前に置いた `window.__noReload` が残り、`performance` の navigation は 1 件のまま | 満たす（6.1） |
| 帯の色 | 変わる | 目次の分類の帯の地 `rgba(0, 0, 0, 0.07)` → `rgba(226, 228, 233, 0.12)`、字 `rgba(0, 0, 0, 0.87)` → `rgba(226, 228, 233, 0.82)`（見方の分類名の帯も同じ）。節の見出しの帯は明・暗とも `rgb(31, 78, 140)` の地に白い字（設計どおり同じ色） | 満たす（6.1） |
| `extra.css` の `data-md-color-scheme` を含む規則 | すべて `screen` の `CSSMediaRule` の中 | 12 個のうち 12 個が `@media screen` の中、外は 0 個（控えも 12・12。この spec は足していない） | 満たす（6.2） |

- `?h=` の頁と幅 375 の頁でも、切り替えで読み込み直さずに `slate` になった（どれも navigation 1 件）

## 検索の強調（3.3）

幅 1000。`?h=` の頁を明で開き、切り替えて暗でも数えた。

| 開いた頁 | 表示 | 節の見出しの帯の中の `mark` | 目次の分類の帯の中 | 見方の分類名の帯の中 | `mark` の色（fg / bg）と対比 | 写し | 判定 |
|---|---|---|---|---|---|---|---|
| `?h=目次` | 明 | 1（「目次」） | 0 | 0 | `rgb(31, 78, 140)` / `rgb(255, 255, 255)` 8.31 | 帯の中 1 | 満たす（7.2） |
| 同上 | 暗 | 1 | 0 | 0 | 同上 8.31 | 同上 | 満たす（7.2） |
| `?h=ファイル構成` | 明 | 0 | 1 | 1 | `rgba(0, 0, 0, 0.87)` / `rgb(246, 246, 119)`（`mark` の地 `rgba(255, 255, 0, 0.5)`） 14.41 | 分類の帯 1・見方の帯 1 | 満たす（7.2） |
| 同上 | 暗 | 0 | 1 | 1 | `rgba(226, 228, 233, 0.82)` / `rgb(57, 80, 121)`（`mark` の地 `rgba(66, 135, 255, 0.3)`） 4.88 | 同上 | 満たす（7.2） |

- 頁の中の `mark` は `?h=目次` で 1 個、`?h=ファイル構成` で 2 個で、どれも帯の中にあり、箱の幅と高さが 0 でなく `visibility: visible`。節の見出しの帯の中は 108 行の白い地に紺の字、項目名の帯の中はテーマの強調の色のまま
- 控え（8010）でも `mark` の数は 1 個・2 個だったが、帯が無いので帯の中の数は 0（変更の前の確かめ）

## 幅 375（3.3）

| 表示 | `topprobe.mjs`: `documentElement` の `scrollWidth` / `clientWidth` / `innerWidth` | `shot.mjs` の物差し（`scrollWidth` + 縦のスクロールバーの幅）/ `innerWidth` | 帯の幅 | 判定 |
|---|---|---|---|---|
| 明 | 360 / 360 / 375 | 375 / 375 | 328（19 個とも） | 満たす（7.4・8.7） |
| 暗 | 360 / 360 / 375 | 375 / 375 | 328（19 個とも） | 満たす（7.4・8.7） |

- ヘッドレスの Edge は縦のスクロールバー（15px）を描くので、`scrollWidth` は `clientWidth` と同じ 360 で、横にはみ出していない。設計の写しと同じ物差しの `shot.mjs`（スクロールバーの幅を足す）では `scrollWidth` = `innerWidth` = 375。`topprobe.mjs` は切り替えで暗にし、`shot.mjs` は `prefers-color-scheme: dark` で開いた。幅 375 の画面は残していない
- 控え（8010）も 360 / 360 / 375 で同じ

## 画面（3.4）

- 日付: 2026-10-27。作業木の `a61b9de` を 8000（PID `40096`・`38952`）で撮った。配り直していない（トップが 200、`/ukadoc-spec/assets/extra.css` に `.top-section` 3）
- 道具: `.kiro/specs/completed/site-look-plan/tools/shot.mjs`（読むだけで使い、変えていない）。明は `light`、暗は `dark`（`prefers-color-scheme`）で開いた。14 枚とも `scrollWidth` = `innerWidth` = 1000
- 置き場: `.kiro/specs/site-look-top-page/screenshots/`（`design-*.png` は変えていない）。幅 375 の画面は撮っていない（8.7）
- 開発者にこの画面や `serve` を見せるときは、Ctrl+F5（強制の再読み込み）を頼む（8.9）

```sh
# screenshots の中で（SHOT = .kiro/specs/completed/site-look-plan/tools/shot.mjs、B = http://127.0.0.1:8000/ukadoc-spec。m は light と dark）
node SHOT B/ '.md-content' after-top-head-$m.png $m 1000 1100
node SHOT B/ 'h2.top-section:nth-of-type(4)' after-top-howto-$m.png $m 1000 1100
node SHOT B/ 'li:has(> strong.top-item)' after-top-howto-other-$m.png $m 1000 500
node SHOT B/ 'h2.top-section:nth-of-type(5)' after-top-toc-$m.png $m 1000 1300
node SHOT B/list/sakura-script/ '.bundle-category' after-ref-sakura-script-$m.png $m 1000 700
node SHOT B/list/shiori-event/ 'h3.bundle-item' after-ref-shiori-event-$m.png $m 1000 700
node SHOT B/manual/ghost/ '.md-typeset > ul' after-ref-manual-ghost-$m.png $m 1000 900
```

| 画面（明・暗） | 頁 | セレクタ（当たった所） | 大きさ |
|---|---|---|---|
| `after-top-head-{light,dark}.png` | トップ | `.md-content`（頁の題から「外部リンク」の箇条書きまで） | 1000×1100 |
| `after-top-howto-{light,dark}.png` | トップ | `h2.top-section:nth-of-type(4)`（「ukadocの見方」。設計のとおり当たった） | 1000×1100 |
| `after-top-howto-other-{light,dark}.png` | トップ | `li:has(> strong.top-item)`（「その他」。段落に分かれない 1 個） | 1000×500 |
| `after-top-toc-{light,dark}.png` | トップ | `h2.top-section:nth-of-type(5)`（「目次」。設計のとおり当たった） | 1000×1300 |
| `after-ref-sakura-script-{light,dark}.png` | `list/sakura-script/` | `.bundle-category`（「スコープコマンド」） | 1000×700 |
| `after-ref-shiori-event-{light,dark}.png` | `list/shiori-event/` | `h3.bundle-item`（「OnFirstBoot」。設計の `.bundle-item` から変えた。下の注） | 1000×700 |
| `after-ref-manual-ghost-{light,dark}.png` | `manual/ghost/` | `.md-typeset > ul`（ファイル名の帯の並び） | 1000×900 |

- `list/shiori-event/` で設計の `.bundle-item` が最初に当たるのは頁の前書きの `h2#caption_format`（「このページの書式について」。帯は同じ項目名の帯）で、帯の下は段落だった。目次の分類の帯（帯の下にリンクの並び）と並べるには、イベントの項目の帯の下に中身が続く所が見比べやすいので、同じ項目名の帯の `h3.bundle-item`（最初は `OnFirstBoot`）に変えた。帯の見え方そのものは `h2.bundle-item` と同じ

### 見比べ（4.3・5.1・5.4・8.5）

| 見比べ | トップ | 当て先 | 結果 |
|---|---|---|---|
| 節の見出しの帯 | `after-top-head-*`・`after-top-howto-*`・`after-top-toc-*` の「ukadocについて」「対象version」「外部リンク」「ukadocの見方」「目次」 | `after-ref-sakura-script-*` の「スコープコマンド」 | 同じ見え方（紺の地に白い太字、本文の幅いっぱい、明・暗で同じ色）。頁の題（`h1`）は帯にならず今のまま |
| 目次の分類の帯 | `after-top-toc-*` の「ファイル構成」「設定ファイル」「さくらスクリプト」 | `after-ref-shiori-event-*` の「OnFirstBoot」「OnBoot」 | 同じ見え方（左の紺の太線、薄い灰の地、下の線、明・暗で地と字が切り替わる） |
| 見方の分類名の帯と説明の字下げ | `after-top-howto-*` の 6 個 | `after-ref-manual-ghost-*` の `descript.txt`・`shiori.dll` など | 同じ見え方（項目名の帯の下に、説明が帯の左の端より字下げして続く。点は無い） |
| 「その他」（段落に分かれない項目） | `after-top-howto-other-*` | 同上（`manual/ghost` の段落に分かれた項目） | ほかの 6 個と同じ帯と同じ字下げで、説明 1 行が帯の下に続く（4.3） |
| 帯とリンクの並びの見分け（5.1） | `after-top-head-*`（「対象version」「外部リンク」の下）、`after-top-toc-*`（分類の帯の下） | — | 帯は地の色と幅で一目で分かれ、下のリンクの並びは点の付いた白い（暗は暗い）地の行のままで、帯と取り違えない |
| 帯の上の余白（5.4） | `after-top-head-*`・`after-top-toc-*`・`after-top-howto-other-*` | — | 前の箇条書き（「対象version」の 4 行、目次の分類のリンクの並び）・段落・引用と次の帯の間に余白（節の見出し 40px、目次の分類 32px。3.3 で測った値）があり、前の並びと帯がくっついて見えない。余白の良し悪しは開発者が画面を見て決める |

- 変更の前（8010）を参考に 1 枚だけスクラッチに撮った（`C:/Users/maz-o/AppData/Local/Temp/claude/C--home-maz-git-doc-edit/6ec24e7b-70a2-442e-bd85-89bad02cc5d7/scratchpad/before-top-howto-light.png`。`h2#ukadocの見方`、明、1000×1100）。前は見出しが白い地の字で、見方の項目は点の付いた「**名前**: 説明」の行だった。後はこれが帯と字下げに変わり、ほかの所（段落・リンクの並び・目次の右の欄）は同じ位置に見える

### 撮り直し（8.8）

- 二重に重なった跡（上の端以外の左右の端に、ヘッダの紺の行）は、14 枚とも無かった（撮り直した 2 枚も無い）
- 撮り直したのは 2 枚（`after-ref-shiori-event-light.png`・`after-ref-shiori-event-dark.png`）。わけ: 1 回目は設計の `.bundle-item` で撮り、(1) 当たったのが前書きの `h2#caption_format` だった（上の注）、(2) ヘッダの題が切り替わりの途中で、「UKADOC project」と「SHIORI Event」が重なって薄く描かれていた（8.8 の跡ではないが、見比べに向かないので）。`h3.bundle-item` で撮り直し、2 枚ともヘッダの題が「SHIORI Event」の 1 つだけになった

## 仕上げ（4.1）

- 日付: 2026-10-27。作業木の `a61b9de`（`origin/main` `1080225` の上の 1 コミット）で流し直した

### 宣言と色（6.4・9.2）

`git -C .worktrees/site-look-top-page diff origin/main -- assets/extra.css` は 4 か所・8 行の入れ替えで、消した行も足した行もどれもセレクタの行（`… {` で終わる行）だった。宣言（`property: value;`）の行・注の行・新しい塊は足しても消してもいない。差分全体（2 ファイル）の足した行に、直書きの色（`#…`・`rgb(…)`・`rgba(…)`・`hsl(…)`）は 0 個。帯の色はどれも、前からある塊の `var(--md-…)` から来る（2.2 の表と同じ）。

### Build Gate と規約 Gate（9.1・9.4）

- 作業木で `.cache/` を消し、`prepare_site.py` は exit 0、`zensical build --strict` は exit 0（「No issues found」）
- `git diff --stat origin/main` は 2.3 と同じ（`assets/extra.css` 16 行・`scripts/prepare_site.py` 19 行、2 files changed, 23 insertions(+), 12 deletions(-)）。`git status --short` は空（未コミットの変更なし）
- 規約 Gate: 原稿（`.md`）の変更は無く、ukadoc-spec の `CLAUDE.md` の書式・リンクの決まりに当たる所は無い。「見た目のための構造」の分担（`prepare_site.py` は class を付けるところまで、JavaScript は使わない）にも合う（`mark_top()` は attr_list の class を足し「`: `」を外すだけ、`site_ext/` は変えていない）
- build の後も 8000 の `serve`（PID `40096`・`38952`）は動いたまま: `/ukadoc-spec/` と `/ukadoc-spec/assets/extra.css` が 200 で、`extra.css` に `.top-section` 3・`.top-category` 1・`.top-item` 7、トップの HTML の `top-section` 5・`top-category` 7・`top-item` 7。控えの 8010 も 200

### 設計の「Testing Strategy」と結果の在りか

| 項目 | 結果の節 | 結果 |
|---|---|---|
| Build Gate（7.5・9.1・9.4） | 2.3・仕上げ（4.1） | `prepare_site.py`・`build --strict` とも exit 0、`git diff --stat origin/main` は 2 ファイルだけ |
| `mark_top()` の例 | 2.1 | 12 通りとも合う。`mark_manual(text)` は今と同じ `{: .manual-item }` |
| 印の数 | 3.2「印の数」 | 5・7・7（1）・7、漏れ 0、帯の中のリンク 0・コード 0、`table` 0、トップの外の `top-` 0 |
| 変わらないこと | 3.2「変わらないこと」 | id 13・¶ 13・目次 82 が同じ、本文の字の違いは「`:`」7 か所、ほかの 40 頁は同じ、`search.json` は 1 件だけ違う、`_raw/`・`llms.txt` は同じ |
| 位置・余白と対比、切り替え、`@media screen` | 3.3「位置と余白」「対比」「切り替えと印刷」 | 帯 19 個が 16・711 の 1 通り、説明の左 40、余白は写しと同じ、対比はどれも線を満たす、読み込み直さずに切り替わる、暗い表示の規則は 12 個とも `@media screen` の中 |
| 失わないもの | 3.3「検索の強調」「幅 375」 | 3 種の帯の中で `mark` が明・暗とも見える、幅 375 は明・暗とも `scrollWidth` = `innerWidth` = 375（`shot.mjs` の物差し） |
| 見比べ | 3.4「画面」「見比べ」 | `screenshots/after-*.png` 14 枚（トップ 4 所・当て先 3 所 × 明・暗）を当て先と並べた。開発者が見る |
| 宣言・色を足さない（6.4・9.2） | 2.2・仕上げ（4.1） | セレクタの行だけ、直書きの色 0 |
| Ctrl+F5（8.9） | 頭・3.4 | 画面やプレビューを見せるときに頼む |

