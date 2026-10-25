# 確かめの記録: site-look-note-icon

## 測った版と日付
- 日付: 2026-10-25
- 作業木: `.worktrees/site-look-note-icon/`（ブランチ `site-look-note-icon`。ukadoc-spec の作業木）
- `origin/main`: `529d092`。変更の前の控えはこの版で、作業木の HEAD と同じである
- 頁: 作業木の `zensical serve`（`http://127.0.0.1:8000/ukadoc-spec/…`）。変更の前の控えは 8010

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
