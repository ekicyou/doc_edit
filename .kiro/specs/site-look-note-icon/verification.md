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
