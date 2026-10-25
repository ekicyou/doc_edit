# 確かめの記録: site-look-list-markers

## 変更の前

### 測った版と控えの置き場
- 日付: 2026-10-25
- 作業木のコミット: `d3154d861671332202a495738217d4247ba9bf89`（`.worktrees/site-look-list-markers/` の HEAD = `origin/main`、PR #11 の後）
- 控えの置き場（git に載らない。spec の完了まで残す）: `C:\Users\maz-o\AppData\Local\Temp\claude\C--home-maz-git-doc-edit\0d9dc02d-eea9-4c04-8263-111d75655dca\scratchpad\baseline\`（以下 `B`）

| ファイル | 中身 |
|---|---|
| `B/src/` | 作業木の HEAD を `git archive` で書き出した木。`_site/`（build の結果）と `_raw/` を持つ |
| `B/serve/ukadoc-spec/` | `B/src/_site/` の写し。`site_url` の `/ukadoc-spec/` に合わせて 1 段下に置いた |
| `B/snapshot.py` | 控えを出し、比べるスクリプト |
| `B/before.json` | 40 頁の数と本文の字、`_raw/` のファイルごとの SHA-256 |
| `B/prepare.log`・`B/build.log` | 控えの build の出力 |

### 流した式
```sh
# 控えを作る（doc_edit のルートから。PY・ZS = C:/home/maz/git/doc_edit/.venv/Scripts/ の python・zensical）
git -C .worktrees/site-look-list-markers archive HEAD | tar -x -C B/src
(cd B/src && $PY scripts/prepare_site.py && $ZS build --strict)   # どちらも exit 0、No issues found
cp -r B/src/_site B/serve/ukadoc-spec

# 配る（PowerShell。窓を出さずに残す）
Start-Process .venv\Scripts\python.exe -ArgumentList '-m','http.server','8010','--bind','127.0.0.1','--directory','B\serve' -WindowStyle Hidden

# 控えと比べ（B の中で）
$PY snapshot.py src http://127.0.0.1:8010/ukadoc-spec before.json
$PY snapshot.py C:/home/maz/git/doc_edit/.worktrees/site-look-list-markers http://127.0.0.1:8000/ukadoc-spec after.json   # 2.2
$PY snapshot.py compare before.json after.json   # SAME で exit 0、違えば違う頁と項目を出して exit 1
```

- 配りの口: `http://127.0.0.1:8010/ukadoc-spec/…`（`list/sakura-script/` が 200）。待ち受けの PID は 25916（`Start-Process` が返した venv の起動役は 35428）。止まっていたら上の `Start-Process` を流し直す。`B` が消えていたら、上のコミットから同じ手順で作り直す
- `snapshot.py <木> <基の URL> <出力>`: `<木>/_site/` の `index.html` を数え（40 頁でなければ止まる）、頁を基の URL から取って数え、`<木>/_raw/` を SHA-256 する
- 数え方: `article` の中の `<h1>`〜`<h6>` の `id` の並び・`class="headerlink"` の数・`<hr>` の数・字（空白を 1 つに詰めたもの）。`class="md-nav__link"` と `href="#notes_` は頁全体（右の欄の目次を含む）
- 作業木の `serve`（8000、変更の前）を同じ式で数えると `before.json` と **SAME** だった。`before.json` の数と字と `_raw/` を 1 つずつ書き換えた写しでは、3 か所とも違いとして出た

### 数
| 頁 | 見出しの id | うち `notes_` | ¶ | 目次 | `href="#notes_` |
|---|---|---|---|---|---|
| `list/sakura-script` | 649 | 14 | 649 | 832 | 89 |
| `list/propertysystem` | 206 | 2 | 206 | 382 | 12 |

- 設計の「変わらないことの数」と全部合った（`md-nav__link` 832 は、`site-look-list-items` の記録の 830 から PR #11 で 2 増えた数）
- 全 40 頁の `article` の中の `hr`: **1921**（設計と同じ）。見出しの id 2579（`notes_` 16）、¶ 2579、目次 6315
- `_raw/`: 2049 ファイル

40 頁の数（id / ¶ / 目次 / `hr`。`notes_` を持つのは上の 2 頁だけ）:

| 頁 | 数 | 頁 | 数 |
|---|---|---|---|
| `/` | 13 / 13 / 80 / 0 | `list/shiori-event-ex` | 229 / 229 / 482 / 213 |
| `descript/balloon` | 178 / 178 / 404 / 171 | `list/shiori-resource` | 170 / 170 / 394 / 162 |
| `descript/ghost` | 83 / 83 / 214 / 76 | `manual/balloon` | 1 / 1 / 55 / 0 |
| `descript/headline` | 14 / 14 / 78 / 10 | `manual/directory` | 3 / 3 / 60 / 0 |
| `descript/install` | 39 / 39 / 112 / 21 | `manual/ghost` | 1 / 1 / 55 / 0 |
| `descript/plugin` | 18 / 18 / 86 / 14 | `manual/install` | 1 / 1 / 55 / 0 |
| `descript/shell` | 112 / 112 / 266 / 103 | `manual/owner-draw-menu` | 1 / 1 / 55 / 0 |
| `descript/shell-surfaces` | 192 / 192 / 184 / 154 | `manual/shell` | 1 / 1 / 55 / 0 |
| `descript/shell-surfacetable` | 11 / 11 / 76 / 6 | `manual/translator` | 1 / 1 / 55 / 0 |
| `dev/bind` | 9 / 9 / 72 / 0 | `manual/update` | 1 / 1 / 55 / 0 |
| `dev/nar` | 13 / 13 / 80 / 0 | `memo/memo` | 5 / 5 / 64 / 0 |
| `dev/ownerdraw` | 4 / 4 / 62 / 0 | `memo/shiori-event` | 6 / 6 / 66 / 0 |
| `dev/shell` | 17 / 17 / 84 / 0 | `spec/dll` | 8 / 8 / 66 / 0 |
| `dev/shell-error` | 7 / 7 / 68 / 0 | `spec/fmo-mutex` | 8 / 8 / 70 / 3 |
| `dev/update` | 10 / 10 / 74 / 0 | `spec/headline` | 17 / 17 / 88 / 0 |
| `list/plugin-event` | 21 / 21 / 96 / 19 | `spec/plugin` | 20 / 20 / 94 / 0 |
| `list/propertysystem` | 206 / 206 / 382 / 196 | `spec/saori-ex` | 87 / 87 / 192 / 51 |
| `list/sakura-script` | 649 / 649 / 832 / 374 | `spec/shiori3` | 7 / 7 / 68 / 3 |
| `list/shiori-event` | 360 / 360 / 774 / 328 | `spec/sstp` | 43 / 43 / 128 / 10 |
| | | `spec/update-file` | 9 / 9 / 72 / 5 |
| | | `spec/web` | 4 / 4 / 62 / 2 |
