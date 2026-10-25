# 確かめの記録: site-look-note-icon

## 測った版と日付
- 日付: 2026-10-25
- 作業木: `.worktrees/site-look-note-icon/`（ブランチ `site-look-note-icon`。ukadoc-spec の作業木）
  - `58df49d` まとめ頁の補足の項目（note-<数>.md）の頭の見出しに目印 bundle-supplement を付ける（2.1）
  - `5938d27` 注釈の節・補足の項目の見出しと注の題の頭に、サイトのロゴの絵を置く（3.1）
  - 2.2 は `5938d27` の build で数え（HTML は `58df49d` と同じ）、3.2 の Build Gate と 4.2〜4.4 も `5938d27` で測った
- `origin/main`: `529d092`（#13 `site-look-sakura-script-highlight` のマージの後）。変更の前の控えはこの版で、作業木の先祖である。4.1・5.2 で fetch し直しても進んでいない
- 頁: 作業木の `zensical serve`（`http://127.0.0.1:8000/ukadoc-spec/…`）。変更の前の控えは 8010
- 測りのブラウザ: Edge ヘッドレス + CDP（`shot.mjs` と、Claude のスクラッチに置いた使い捨てのスクリプト）
- 流した式: Build Gate は「Build Gate と規約 Gate」、控えと比べは「変更の前」、名前の見分けは「一語ずつの確かめ」、目印の数えは「目印」、配りは「配り」、効きと切り替えは「効き」、画面は「画面」、幅 375 などは「失わないもの」の各節にそのまま書いた
- 絵: 今ある `assets/logo.png` を `extra.css` から `url("logo.png")` で読み、注釈の節の見出し（`.bundle-notes` の最初の子）・補足の項目の頭の見出し（`.bundle-supplement`）・注の題（`.note` の題）の `::before` に当てた
- 開発者に画面や `serve` を見せるときは、古い `extra.css` が残らないよう Ctrl+F5 を頼む（7.7）

### 設計の「Testing Strategy」との対応
| 項目 | 結果 | 節 |
|---|---|---|
| Build Gate | `prepare_site.py`・`build --strict` とも exit 0、変えたのは 2 ファイルだけ | Build Gate と規約 Gate |
| 配り | `extra.css` に 2 つの塊、`logo.png` が 200 で中身が同じ | 配り |
| 一語ずつの確かめ | 6 つの名前がどれも期待どおり | 一語ずつの確かめ |
| 目印と絵 | 16・16・2、絵の当たる見出し 32 だけ、`tip`・`warning` は印のまま、読み物の頁 0、漏れ 0 | 目印・効き |
| 変わらないこと | 控えと SAME（id・¶・目次・`hr`・本文の字・既にある目印・`_raw/`） | 目印 |
| 見え方 | 目標の画面と見比べて同じ、切り替えで同じ、幅 375 で 375 | 効き・画面・失わないもの |

## 変更の前

### 測った版と控えの置き場
- 日付: 2026-10-25
- 作業木のコミット: `529d092a69d682a68d3f2e407d1370166b481831`（`.worktrees/site-look-note-icon/` の HEAD = `origin/main`）
- 控えの置き場（git に載らない）: `C:\Users\maz-o\AppData\Local\Temp\claude\C--home-maz-git-doc-edit\230ea277-946e-448a-aadb-400a0f13c44d\scratchpad\baseline\`（以下 `B`）

| ファイル | 中身 |
|---|---|
| `B/src/` | 作業木の HEAD を `git archive` で書き出した木。`_site/`（build の結果）と `_raw/` を持つ |
| `B/serve/ukadoc-spec/` | `B/src/_site/` の写し。`site_url` の `/ukadoc-spec/` に合わせて 1 段下に置いた |
| `B/snapshot.py` | 控えを出し、比べるスクリプト（標準のライブラリだけ） |
| `B/before.json` | 40 頁の数と本文の字と `bundle-*` の語の数、`_raw/` のファイルごとの SHA-256 |
| `B/prepare.log`・`B/build.log` | 控えの build の出力 |

### 流した式
```sh
# 控えを作る（doc_edit のルートから。PY・ZS = C:/home/maz/git/doc_edit/.venv/Scripts/ の python・zensical）
mkdir -p B/src B/serve
git -C .worktrees/site-look-note-icon archive HEAD | tar -x -C B/src
(cd B/src && $PY scripts/prepare_site.py > ../prepare.log && $ZS build --strict > ../build.log)   # どちらも exit 0、No issues found
cp -r B/src/_site B/serve/ukadoc-spec

# 配る（PowerShell。窓を出さずに残す）
Start-Process .venv\Scripts\python.exe -ArgumentList '-m','http.server','8010','--bind','127.0.0.1','--directory','B\serve' -WindowStyle Hidden -PassThru

# 控えと比べ（B の中で）
$PY -X utf8 snapshot.py selftest                                    # selftest ok
$PY -X utf8 snapshot.py src http://127.0.0.1:8010/ukadoc-spec before.json
$PY -X utf8 snapshot.py C:/home/maz/git/doc_edit/.worktrees/site-look-note-icon http://127.0.0.1:8000/ukadoc-spec after.json   # 2.2
$PY -X utf8 snapshot.py compare before.json after.json   # SAME で exit 0、違えば違う頁と項目を出して exit 1
```

- 配りの口: `http://127.0.0.1:8010/ukadoc-spec/…`（`list/sakura-script/` が 200）。待ち受けの PID は 28560（`Start-Process` が返した venv の起動役は 41784）。止まっていたら上の `Start-Process` を流し直す。`B` が消えていたら、上のコミットから同じ手順で作り直す
- `snapshot.py <木> <基の URL> <出力>`: `<木>/_site/` の `index.html` を数え（40 頁でなければ止まる）、頁を基の URL から取って数え、`<木>/_raw/` を SHA-256 する
- 数え方: `article` の中の `<h1>`〜`<h6>` の `id` の並び・`class` に `headerlink` を持つ要素の数・`<hr>` の数・字（`script`・`style` を除き、空白を 1 つに詰めたもの）。`md-nav__link` と `bundle-*` の語は頁全体（右の欄の目次を含む）で数える
- 目印は `class` の値を空白で区切った語として数える（`class="…"` の字の並びでは数えない。`bundle-notes-like` は `bundle-notes` にならない）。`bundle-*` の語はすべて `classes` に数えるが、`compare` が比べるのは `bundle-item`・`bundle-category`・`bundle-notes`・`bundle-support`・`bundle-default` の 5 つだけである。2.2 で増える `bundle-supplement` は `classes` に数えられ、比べには入らない
- `selftest` は合成した小さな HTML で数え方を assert し、`bundle-supplement` が増えても `compare` が違いとしないこと、`bundle-item` と `_raw/` の違いを出すことを見る
- 作業木の `serve`（8000、変更の前）を同じ式で数えると `before.json` と **SAME** だった。`before.json` の `hr`・字・`bundle-notes`・`_raw/` を 1 つずつ書き換え、`bundle-supplement` を足した写しでは、書き換えた 4 か所だけが違いとして出た（exit 1）

### 数
| 頁 | 見出しの id | うち `notes_` | ¶ | 目次 | `hr` |
|---|---|---|---|---|---|
| `list/sakura-script` | 649 | 14 | 649 | 832 | 374 |
| `list/propertysystem` | 206 | 2 | 206 | 382 | 196 |

- 設計の「変わらないことの数」（649・649・832、206・206・382）と全部合った
- 全 40 頁の `article` の中の `hr`: **1921**（設計と同じ）。見出しの id 2579（`notes_` 16）、¶ 2579、目次 6315
- `_raw/`: 2049 ファイル

既にある目印（40 頁の計。`class` の値の中の語）:

| `bundle-item` | `bundle-category` | `bundle-notes` | `bundle-support` | `bundle-default` | `bundle-supplement` |
|---|---|---|---|---|---|
| 1875 | 116 | 16 | 1640 | 423 | 0 |

- `bundle-notes` は `list/sakura-script` 14・`list/propertysystem` 2。`bundle-support`・`bundle-default` は `site-look-list-markers` の記録（1640・423・包み 16）と同じ
- 札の `bundle-baseware` は 2719（比べには入れない）

40 頁の数（id / ¶ / 目次 / `hr`）:

| 頁 | 数 | 頁 | 数 |
|---|---|---|---|
| `/` | 13 / 13 / 80 / 0 | `list/shiori-resource` | 170 / 170 / 394 / 162 |
| `descript/balloon` | 178 / 178 / 404 / 171 | `manual/balloon` | 1 / 1 / 55 / 0 |
| `descript/ghost` | 83 / 83 / 214 / 76 | `manual/directory` | 3 / 3 / 60 / 0 |
| `descript/headline` | 14 / 14 / 78 / 10 | `manual/ghost` | 1 / 1 / 55 / 0 |
| `descript/install` | 39 / 39 / 112 / 21 | `manual/install` | 1 / 1 / 55 / 0 |
| `descript/plugin` | 18 / 18 / 86 / 14 | `manual/owner-draw-menu` | 1 / 1 / 55 / 0 |
| `descript/shell` | 112 / 112 / 266 / 103 | `manual/shell` | 1 / 1 / 55 / 0 |
| `descript/shell-surfaces` | 192 / 192 / 184 / 154 | `manual/translator` | 1 / 1 / 55 / 0 |
| `descript/shell-surfacetable` | 11 / 11 / 76 / 6 | `manual/update` | 1 / 1 / 55 / 0 |
| `dev/bind` | 9 / 9 / 72 / 0 | `memo/memo` | 5 / 5 / 64 / 0 |
| `dev/nar` | 13 / 13 / 80 / 0 | `memo/shiori-event` | 6 / 6 / 66 / 0 |
| `dev/ownerdraw` | 4 / 4 / 62 / 0 | `spec/dll` | 8 / 8 / 66 / 0 |
| `dev/shell` | 17 / 17 / 84 / 0 | `spec/fmo-mutex` | 8 / 8 / 70 / 3 |
| `dev/shell-error` | 7 / 7 / 68 / 0 | `spec/headline` | 17 / 17 / 88 / 0 |
| `dev/update` | 10 / 10 / 74 / 0 | `spec/plugin` | 20 / 20 / 94 / 0 |
| `list/plugin-event` | 21 / 21 / 96 / 19 | `spec/saori-ex` | 87 / 87 / 192 / 51 |
| `list/propertysystem` | 206 / 206 / 382 / 196 | `spec/shiori3` | 7 / 7 / 68 / 3 |
| `list/sakura-script` | 649 / 649 / 832 / 374 | `spec/sstp` | 43 / 43 / 128 / 10 |
| `list/shiori-event` | 360 / 360 / 774 / 328 | `spec/update-file` | 9 / 9 / 72 / 5 |
| `list/shiori-event-ex` | 229 / 229 / 482 / 213 | `spec/web` | 4 / 4 / 62 / 2 |

## 一語ずつの確かめ
`prepare_site.py` の定数 `NOTE_FILE`（`re.compile(r'note-\d+\.md')`）の `fullmatch` に、ファイル名を直に渡した（2.4・5.2）。

```sh
# 作業木の中で
$PY -c "import sys; sys.path.insert(0,'scripts'); import prepare_site as p
for n in ['note-1.md','note-12.md','notes_escape.md','note-1-a.md','note.md','footnote-1.md']: print(n, bool(p.NOTE_FILE.fullmatch(n)))"
```

| ファイル名 | 結果 | 期待 |
|---|---|---|
| `note-1.md` | 付く | 付く |
| `note-12.md` | 付く | 付く |
| `notes_escape.md` | 付かない | 付かない |
| `note-1-a.md` | 付かない | 付かない |
| `note.md` | 付かない | 付かない |
| `footnote-1.md` | 付かない | 付かない |

- `prepare_site.py` と `zensical build --strict` はどちらも exit 0（No issues found）
- `_site_src/` で `.bundle-supplement` を持つ見出しの行は 16 行で、どれも `## 補足 {#note-1 .bundle-item .bundle-supplement}` の形（段は `h2` か `h3`。`bundle-item` は残る）

## 目印

作業木の `serve`（8000、`5938d27` を build したもの）の 40 頁の HTML を、使い捨ての `B/count.py`（標準の `html.parser`）で数えた。数え方は、合成した小さな HTML で、`div.bundle-notes` の最初の子（間に `hr` があればそれを数える）・`.bundle-supplement`・`.admonition.note`（`.tip` は数えない）・`pre`・`code` の外の `{: `・`{#`・補足の項目の中の節の見出し（id が `note-<数>-` で始まるか `-note-<数>-` を含む）が 1 つずつ数えられることを assert で確かめてから流した（`selftest`）。

```sh
# B の中で
$PY -X utf8 count.py selftest                                       # selftest ok
$PY -X utf8 count.py C:/home/maz/git/doc_edit/.worktrees/site-look-note-icon http://127.0.0.1:8000/ukadoc-spec   # 頁ごとの数を出し count.json に書く
$PY -X utf8 snapshot.py C:/home/maz/git/doc_edit/.worktrees/site-look-note-icon http://127.0.0.1:8000/ukadoc-spec after.json
$PY -X utf8 snapshot.py compare before.json after.json             # SAME、exit 0
```

- `article` の中だけを数える。頁全体（右の欄の目次を含む）の `bundle-supplement` の語も `snapshot.py` で 16 で、目次には付いていない
- 控え（8010）を同じ式で数えると 16 / 0 / 2 / 漏れ 0 で、補足の項目の頭の見出しの目印だけが 0 だった

### 頁ごとの数
| 頁 | 注釈の節の見出し | 補足の項目の頭の見出し | `note` の注意書き |
|---|---|---|---|
| `list/sakura-script` | 14（`h2` 2・`h3` 12） | 3（`h3` 3） | 0 |
| `list/propertysystem` | 2（`h4` 2） | 1（`h3` 1） | 0 |
| `list/shiori-event-ex` | 0 | 9（`h2` 2・`h3` 7） | 0 |
| `descript/ghost` | 0 | 1（`h3` 1） | 0 |
| `descript/install` | 0 | 1（`h3` 1） | 0 |
| `descript/shell` | 0 | 1（`h3` 1） | 0 |
| `dev/shell` | 0 | 0 | 2 |
| 計 | **16** | **16** | **2** |

- 設計の IconCheck の表と全部の頁・全部の欄で合った。ほかの 33 頁は 3 つとも 0
- 注釈の節の見出し（`div.bundle-notes` の最初の子）:
  - `list/sakura-script`: `h2` `notes_escape`・`notes_lifespan`、`h3` `notes_move`・`notes_sound`・`notes_sound_spectrum`・`notes_inputbox-option`・`notes_inputbox-id`・`notes_selectfile`・`notes_passivemode`・`notes_inductionmode`・`notes_executehttp`・`notes_executeical`・`notes_executerss`・`notes_environmentvariable`
  - `list/propertysystem`: `h4` `notes_sound_meta`・`notes_sound_propertyset`
- 補足の項目の頭の見出し（`.bundle-supplement`。どれも見出しの要素で、`bundle-item` も持つ）:
  - `list/sakura-script`: `h3` `balloon-text-note-1`・`choice-marker-note-1`・`event-note-1`
  - `list/propertysystem`: `h3` `note-1`
  - `list/shiori-event-ex`: `h2` `note-1`・`note-2`、`h3` `ghost-common-note-1`・`ghost-kanaderu-nichijo-no-neiro-note-1`・`plugin-weather-station-note-1`・`app-ghost-terminal-note-1`・`app-ghost-terminal-note-2`・`note-3`・`app-elin-note-1`
  - `descript/ghost`・`descript/install`・`descript/shell`: `h3` `note-1`

### 付けないもの・漏れ
| 見たもの | 数 |
|---|---|
| 読み物の頁（`/`・`manual/`・`dev/`・`memo/`・`spec/` の 25 頁）の `bundle-supplement` | 0 |
| 補足の項目の中の節の見出し 21 個（どれも `h4`。`descript/shell` の「サーフェスの位置情報」ほか 3、`descript/ghost` の「サーフェスの位置情報」、`list/propertysystem` の「※SHIORI Statusヘッダ」、`list/sakura-script` の 5、`list/shiori-event-ex` の 10）の `bundle-supplement` | 0 |
| `article` の中で `pre`・`code` の外の字に `{: `・`{#` | 0 |

### 変わらないこと
- `snapshot.py compare before.json after.json` は **SAME**（exit 0）。全 40 頁の `article` の中の見出しの id の並び（2579）・`headerlink` の数・`md-nav__link` の数・`hr` の数（1921）・本文の字（空白を 1 つに詰めたもの）と、`_raw/` の 2049 ファイルの SHA-256 が控えと同じ
- 既にある目印（40 頁の計）は控えと同じで、`bundle-supplement` だけが 0 から 16 に増えた。`bundle-item` は補足の項目の頭の見出し 16 個を含めて 1875 のまま

| `bundle-item` | `bundle-category` | `bundle-notes` | `bundle-support` | `bundle-default` | `bundle-supplement` |
|---|---|---|---|---|---|
| 1875 | 116 | 16 | 1640 | 423 | 16（控えは 0） |

## Build Gate と規約 Gate
```sh
# 作業木 .worktrees/site-look-note-icon/ の中で（プレビューを止めてから。3.1 のコミット 5938d27 の後）
../../.venv/Scripts/python scripts/prepare_site.py    # exit 0
../../.venv/Scripts/zensical build --strict           # exit 0（No issues found）
git diff --stat origin/main
#  assets/extra.css        | 19 +++++++++++++++++++
#  scripts/prepare_site.py |  6 +++++-
#  2 files changed, 24 insertions(+), 1 deletion(-)
```
- 足したファイルは無い（絵は今ある `assets/logo.png` を使う。8.1）
- 規約 Gate: 原稿（`.md`）・`index.md` の「## 一覧」・`.nav.yml`・`INDEX.md`・`mkdocs.yml` は変えていない。ファイル名は ASCII。`prepare_site.py` の注と docstring は既にある書き方（日本語・だ/である調）にそろえ、`extra.css` の注は塊ごとに `/* site-look-note-icon: <何> */` の 1 行だけ（8.2・8.5）

- PR に出せる状態（5.2）: 2026-10-25 に fetch し直した `origin/main` は `529d092` のままで、作業木の先祖である。作業木に未コミットの変更は無く、ブランチ `site-look-note-icon` は push していない（追う先も無い）。目印（`prepare_site.py`）と見た目の指定（`extra.css`）がそろって入り Build Gate が通るので、この PR だけでサイトは壊れない。プレビュー（8000）と控えの配り（8010）を止め、スクラッチの控えを消した

## 測る版
- 2026-10-25 に `git -C ukadoc-spec fetch origin` した `origin/main` は `529d092` のままで、作業木の先祖である。merge は要らず、控えも作り直さない（8.7）
- 4.2〜4.4 は作業木の `5938d27`（`58df49d` 2.1・`5938d27` 3.1）で測る

## 配り
作業木の `serve`（プレビューを止めて `prepare_site.py` → `build --strict` の後に起動し直したもの）で（5.1・7.1）:

```sh
curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:8000/ukadoc-spec/assets/extra.css   # 200
curl -s http://127.0.0.1:8000/ukadoc-spec/assets/extra.css | grep -c "site-look-note-icon:"   # 2
curl -s http://127.0.0.1:8000/ukadoc-spec/assets/extra.css | cmp - assets/extra.css          # 同じ
curl -s -o logo.tmp -w "%{http_code}" http://127.0.0.1:8000/ukadoc-spec/assets/logo.png      # 200
sha256sum logo.tmp assets/logo.png                                                            # どちらも 32983af3…
```
- 配られた `extra.css` は作業木のファイルと同じで、`site-look-note-icon:` の見出しのコメントが 2 つある
- 配られた `assets/logo.png` は 200 で返り、中身が作業木の `assets/logo.png` と同じ
- 起動の直後の 1 回だけ `logo.png` が 404 だった（`serve` が `_site_src/` を写し終える前）。数秒後に取り直して 200 だった

## 効き

### 測り方（4.3）
- 日付: 2026-10-25。作業木 `5938d27` の `zensical serve`（`http://127.0.0.1:8000/ukadoc-spec/`）
- 使い捨ての `scratchpad\probe.mjs`（`shot.mjs` と同じ Edge ヘッドレス + CDP、標準の `fetch` と `WebSocket` だけ、1000×700）で、頁を明（`prefers-color-scheme: light`）で開き、`article` の中のすべての `h1`〜`h6` の `getComputedStyle(h, '::before').backgroundImage` と、注意書きの題の `::before` を読んだ。続けて、ヘッダの `form[data-md-component=palette]` の見えている `label`（「ダークモードに切り替え」）の真ん中を本当に押し、読み込み直さずに同じ値を読み直した
- 読み込み直していないことは、開いた後に頁に置いた印 `window.__mark` が押した後も残っていることで見た
- `warning` の注意書きは IconCheck の表の 7 頁に無いので、`warning` を持つ `descript/shell-surfaces`（3 個）を足して 8 頁を見た

```sh
# scratchpad の中で。B = http://127.0.0.1:8000/ukadoc-spec
for p in list/sakura-script list/propertysystem list/shiori-event-ex descript/ghost descript/install descript/shell dev/shell descript/shell-surfaces; do node probe.mjs "$B/$p/"; done > applied.jsonl
```

### 絵の当たる見出し（1.1・1.4・2.1・2.3・4.5）
`::before` の `backgroundImage` に `logo.png` を持つ見出しは、どの頁でも `.bundle-notes > :first-child` と `.bundle-supplement` の見出しと、数・並びまで同じだった。絵の幅は、どの見出しでも見出しの字の大きさの **1.5 倍**だった。

| 頁 | 見出しの数 | 絵の当たる見出し（並び） | 数 |
|---|---|---|---|
| `list/sakura-script` | 649 | `h2` `notes_escape`・`notes_lifespan`、`h3` `notes_move`・`balloon-text-note-1`・`choice-marker-note-1`・`event-note-1`・`notes_sound`・`notes_sound_spectrum`・`notes_inputbox-option`・`notes_inputbox-id`・`notes_selectfile`・`notes_passivemode`・`notes_inductionmode`・`notes_executehttp`・`notes_executeical`・`notes_executerss`・`notes_environmentvariable` | 17（注釈 14・補足 3） |
| `list/propertysystem` | 206 | `h3` `note-1`、`h4` `notes_sound_meta`・`notes_sound_propertyset` | 3（注釈 2・補足 1） |
| `list/shiori-event-ex` | 229 | `h2` `note-1`・`note-2`、`h3` `ghost-common-note-1`・`ghost-kanaderu-nichijo-no-neiro-note-1`・`plugin-weather-station-note-1`・`app-ghost-terminal-note-1`・`app-ghost-terminal-note-2`・`note-3`・`app-elin-note-1` | 9（補足） |
| `descript/ghost` | 83 | `h3` `note-1` | 1（補足） |
| `descript/install` | 39 | `h3` `note-1` | 1（補足） |
| `descript/shell` | 112 | `h3` `note-1` | 1（補足） |
| `dev/shell` | 17 | なし | 0 |
| `descript/shell-surfaces` | 192 | なし | 0 |
| 計 | | | **32**（注釈 16・補足 16） |

- 補足の項目の中の節の見出し（`h4`）、項目名・分類の見出し、注釈の節の中の見出しには、どれも絵が無い（1.4・2.3）
- 絵は `content: ""` の背景なので、見出しの字は変わらない（4.5。字は「目印」の「変わらないこと」で控えと同じ）

### 注の題と `tip`・`warning`（3.1・3.3・3.4・3.5）
| 頁 | 題 | 数 | `::before` の `maskImage`（`-webkit-` も） | `backgroundImage` | `backgroundColor` |
|---|---|---|---|---|---|
| `dev/shell` | `.note`（「注」） | 2 | `none` | `logo.png` | `rgba(0, 0, 0, 0)`（透明） |
| `dev/shell` | `.tip` | 5 | テーマの炎の SVG（`none` でない） | `none` | `rgb(0, 191, 165)` |
| `descript/shell-surfaces` | `.warning` | 3 | テーマの三角の SVG（`none` でない） | `none` | `rgb(255, 145, 0)` |

- `.note` の題は鉛筆の型抜きが外れ、地の青が透明に戻り、絵だけが出る（3.1）。2 個とも同じ値で、題の字に依らない（3.5）
- `.tip`・`.warning` の題は Material の印のまま（3.4）
- `dev/shell` の注意書きの本文の中の見出し「※1」（`h4#1`）・「※2」（`h4#2`）の `::before` の `backgroundImage` は `none`（3.3）

### 切り替え（4.3）
8 頁とも、押した `label` は「ダークモードに切り替え」で、`<body>` の `data-md-color-scheme` が `default` → `slate` に変わり、`window.__mark` が残っていた（読み込み直していない）。切り替えの後に読み直した値（絵の当たる見出しの並び・幅の比・注の題と `tip`・`warning` の 4 つの値・「※1」「※2」）は、8 頁とも明で読んだ値と**同じ**だった。

## 画面

### 撮った版と撮り方（4.4）
- 日付: 2026-10-25。作業木 `5938d27` の `zensical serve`（`http://127.0.0.1:8000/ukadoc-spec/`）。控えは `529d092` の配り（`http://127.0.0.1:8010/ukadoc-spec/`）
- `site-look-plan/tools/shot.mjs` を読むだけで使い、既定の 1000×700 で明・暗を撮った。明・暗は `prefers-color-scheme` で選んだ

```sh
# spec のフォルダ（.kiro/specs/site-look-note-icon/）の中で。T = ../completed/site-look-plan/tools/shot.mjs、B = http://127.0.0.1:8000/ukadoc-spec、s = light・dark
node $T "$B/list/sakura-script/"  "#notes_escape"     screenshots/after-sakura-script-notes-$s.png  $s
node $T "$B/list/propertysystem/" "#note-1"           screenshots/after-propertysystem-note-$s.png  $s
node $T "$B/list/propertysystem/" "#notes_sound_meta" screenshots/after-propertysystem-notes-$s.png $s
node $T "$B/dev/shell/"           ".admonition.note"  screenshots/after-dev-shell-note-$s.png       $s
```

### 撮った画面（7.4・7.5）
| 画面 | 頁 | 位置 | 見比べた目標の画面 |
|---|---|---|---|
| `after-sakura-script-notes-{light,dark}.png` | `list/sakura-script/` | `#notes_escape` | `mock-sakura-script-C26-{light,dark}` |
| `after-propertysystem-note-{light,dark}.png` | `list/propertysystem/` | `#note-1` | `mock-propertysystem-C26-{light,dark}` |
| `after-propertysystem-notes-{light,dark}.png` | `list/propertysystem/` | `#notes_sound_meta`（設計の id のとおり在った） | なし（段が `h4` の注釈の節） |
| `after-dev-shell-note-{light,dark}.png` | `dev/shell/` | `.admonition.note` | なし（注の題） |

### 撮り直し（7.6）
- 撮り直しは **2 枚**: `after-sakura-script-notes-light.png`・`after-sakura-script-notes-dark.png`。最初の画面は y ≈ 570 の所にヘッダの紺の行がもう 1 本あり、右の端にも紺の帯が出ていた（二重に重なった跡）。同じ式で撮り直し、重なりの無いことを見た
- 撮り直した `after-sakura-script-notes-{light,dark}.png` のヘッダの題（「SAKURA Script」と前の題）の重なりは、題の切り替えの動きで、本文に響かないので撮り直していない（設計の「Error Handling」のとおり）
- 残した 8 枚は、上の端のほかに紺の行が無いことを 1 枚ずつ見た

### 目標の画面との見比べ（1.2・2.2・4.2・4.4）
比べたのは見出しの頭の絵（大きさ・縦の位置・字との間・暗い表示での見え方）だけ。目標の画面のほかの候補の部分（C04 の箱・C01 の帯の表など）は見ていない。目で見たうえで、使い捨ての `scratchpad\cmp.py`（Pillow）で見出しの区画を目標の画面と画素で比べた（色の差が 24 を超える画素の数）。

| 見出し | 表示 | 比べた区画 | 違う画素 | 見え方 |
|---|---|---|---|---|
| `#notes_escape`（`h2`、中央寄せ） | 明 | x 160〜600・y 60〜105 | 12 | 絵の大きさ・縦の位置・字との間が目標と同じ。違う画素は絵の縁のにじみだけ |
| 同上 | 暗 | 同上 | 27 | 同上。暗い地の上でも絵の色は明と同じで、縁の白が見える |
| `#notes_lifespan`（`h2`、中央寄せ） | 明 / 暗 | x 195〜540・y 455〜500 | 12 / 27 | 同上 |
| `#note-1`「補足」（`h3`、C01 の帯） | 明 | x 20〜200・y 58〜98 | 548 | 絵の大きさ（字の 1.5 倍）・字との間・帯の左の余白の後ろに並ぶことは目標と同じ。帯の高さが目標より 2px 低く（目標 約 46px・変更の後 44px）、絵と字が帯の中で 1px 上に来るため、絵と字の輪郭の画素がずれて数えられた |
| 同上 | 暗 | 同上 | 573 | 同上。帯の薄い白の重ねの上で、絵の色は明と同じ |

- 目に見える違いは無い。`#note-1` の 1〜2px は、拡大して並べた画面（`scratchpad\prop-cmp-{light,dark}.png`。スクラッチだけに置いた）で見て、絵そのものの大きさ・形は同じ

### 段が `h4` の注釈の節と注の題（1.3・3.2・4.6）
使い捨ての `scratchpad\eval.mjs`（`probe.mjs` と同じ CDP で式を 1 つ評価する）と `keep.js` で、控え（8010）と変更の後（8000）の明・暗で、次の要素の `textAlign`・`fontSize`・`lineHeight`・`fontWeight`・`color`・`backgroundColor`・`borderTop`・`borderBottom`・`borderLeft`・`paddingLeft`・`marginTop`・`marginBottom` と高さを読んで比べた。

| 頁 | 要素 | 結果 |
|---|---|---|
| `list/propertysystem` | `#notes_sound_meta`・`#notes_sound_propertyset`（`h4`）、その箱、箱の中の段落 | 中央寄せ・下の点線（C04）・箱の点線の枠と地・字の大きさと行間はすべて控えと同じ。違うのは高さだけ（見出し 36.2 → 36.6px、箱 307.3 → 307.7px） |
| `list/propertysystem` | `#note-1`（C01 の帯）、その次の要素 | 帯の左の線・地・下の線・字はすべて控えと同じ。違うのは帯の高さだけ（43 → 44px） |
| `list/sakura-script` | `#notes_escape`（`h2`）、その箱 | 中央寄せ・下の点線・枠と地は控えと同じ。違うのは高さだけ（見出し 51 → 53.8px、箱 357.3 → 360.1px） |
| `dev/shell` | `.admonition.note`・その題・本文の段落 | 明・暗とも、読んだ値がすべて控えと**同じ**（題の字・地・枠、本文の字の大きさと行間） |

- 高さの違いは、字の 1.5 倍の絵（`inline-block`、`vertical-align: -.35em`）が見出しの行の箱を少し高くするためで、目標の画面 `mock-sakura-script-C26-*` でも同じだった（上の画素の比べで `#notes_escape` と `#notes_lifespan` の位置が目標と合う）
- `after-propertysystem-notes-{light,dark}.png` で、`h4` の見出しの字の前に字の 1.5 倍の絵が、中央寄せの字と一緒に並ぶ。下の点線・箱の枠は控えと同じに見える
- `after-dev-shell-note-{light,dark}.png` で、注の題の頭に鉛筆の代わりに絵が出て、青の四角は出ない。題の字「注」・題の地・青の枠・本文は控えと同じに見える。暗い表示でも絵の色は同じ

## 失わないもの

### 幅 375（6.3）
`shot.mjs` を幅 375×高さ 812 で、画面を書かずに（出力 `-`）流した。`scrollWidth` は縦のスクロールバーの幅を足した値（`shot.mjs` の数え方）。

```sh
node $T "$B/<頁>" "<位置>" - $s 375 812   # 位置: list/sakura-script は #notes_escape、list/propertysystem は #notes_sound_meta、list/shiori-event-ex は #note-1、dev/shell は .admonition.note
```

| 頁 | 明 `scrollWidth` / `innerWidth` | 暗 `scrollWidth` / `innerWidth` |
|---|---|---|
| `list/sakura-script` | 375 / 375 | 375 / 375 |
| `list/propertysystem` | 375 / 375 | 375 / 375 |
| `list/shiori-event-ex` | 375 / 375 | 375 / 375 |
| `dev/shell` | 375 / 375 | 375 / 375 |

- 8 つとも 375 で、横にはみ出さない

### 折り返し（決定 7）
- いちばん長い `notes_` の見出しは `list/sakura-script` の `#notes_selectfile`（「ファイルを開く / ファイルを保存 / フォルダ選択 / カラーパレット選択 パラメータ」、44 字）。幅 375 の明るい表示で撮って目で見た（`scratchpad\w375-notes_selectfile-light.png`。スクラッチだけに置いた）: 3 行に折り返し、1 行目は絵と「ファイルを開く / ファイル」で、**絵だけが 1 行目に残ることは無い**
- あわせて `scratchpad\wrap.js` で、幅 375 の明るい表示の絵の当たる見出し 29 個（`list/sakura-script` 17・`list/propertysystem` 3・`list/shiori-event-ex` 9）の最初の字が 1 行目にあることを見た: 29 個とも 1 行目にあった

### コピーのボタン（6.4）
- 控え（8010）と変更の後（8000）の `list/sakura-script/` で、`article` の中の `pre` は 288 / 288、コピーのボタン（`button.md-code__button`、題「クリップボードへコピー」）は 288 / 288 で同じ
- 2 つの配りの `list/sakura-script/#bang-lock-repaint` を明で撮って並べた（`scratchpad\copy-{8010,8000}-light.png`。スクラッチだけに置いた）: 2 つの記述例のコピーのボタンは、同じ位置（記述例の右上）・同じ形・同じ色で、変わっていない
- コピーされる字（本文の字）は「目印」の「変わらないこと」で控えと同じ

### `#notes_escape` の `\`（6.5）
- `scratchpad\copy.js` で、2 つの配りの `list/sakura-script/` の `#notes_escape` の箱の `innerText`（空白を詰めたもの）を比べた: **同じ**（どちらも 320 字、`\` はどちらも 8 個、`¥`・`￥` はどちらも 0 個）
- 画面でも、控えの `#notes_escape`（`scratchpad\base-sakura-script-notes-light.png`）と `after-sakura-script-notes-light.png` の「「\」」「「\\」」「「\%」」「`\q[ラベル名,ID]`」「「\]」」「`\![raise,…]`」「`\![call,…]`」は同じ字形（バックスラッシュのまま。円の記号にならない）で出ていた

### 開発者に見せるとき（7.7）
- 開発者にプレビューや画面を見せるときは、古い `extra.css` が残らないよう Ctrl+F5 を頼む
