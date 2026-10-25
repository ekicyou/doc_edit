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

## 一語ずつの確かめ

`prepare_site.py` の `baseware()`・`add_markers()` に字を直に渡し、結果を設計の期待と比べた。式は使い捨ての `scratchpad\check_markers.py`（`prepare_site` を import して assert する）。変更の前の `prepare_site.py` では `AttributeError: module 'prepare_site' has no attribute 'baseware'` で落ち、変更の後で全部通った。札の字 `<span class="bundle-baseware bundle-baseware-ssp">SSP</span>` を下では `[SSP]` と書く（`Materia` も同じ）。

| `baseware()` に渡した字 | 結果 | 期待 |
|---|---|---|
| `SSP` | `[SSP]` | 名前だけ札 ○ |
| `SSP 2.8.40` | `[SSP] 2.8.40` | 名前だけ札 ○ |
| `SSP (2.3.83)` | `[SSP] (2.3.83)` | 名前だけ札 ○ |
| `SSP 2.7 RC1` | `[SSP] 2.7 RC1` | 名前だけ札 ○ |
| `Materia廃止仕様` | `Materia廃止仕様` | 札にしない ○（名前の直後が空白でない） |
| `SSP 非対応` | `SSP 非対応` | 札にしない ○（打ち消しの語） |
| `*※推奨　SSP2.5.05以上*` | `*※推奨　SSP2.5.05以上*` | 札にしない ○（名前で始まらない） |
| `SSPX` | `SSPX` | 札にしない ○ |

`add_markers()`（改行は `\n`）:

| 渡した単位 | 結果 | 期待 |
|---|---|---|
| `list/x/a.md`: コードブロックの中の `**対応:** SSP` | 変わらない | 飛ばす ○ |
| `list/x/a.md`: `**既定値:** a<br />\nb<br />\nc` の段落 | `c` の行の後ろに `{: .bundle-default }` | 段落の最後の行の後ろ ○ |
| `list/x/a.md`: `**対応:** SSP 2.7 / Materia` | `**対応:** [SSP] 2.7 / [Materia]\n{: .bundle-support }` | 両方の名前を札、` / ` と頭はそのまま ○ |
| `spec/x/notes_a.md`: `# t\n\nbody` | `<div class="bundle-notes" markdown="1">\n\n# t\n\nbody\n\n</div>` | 空行を置いて包む ○ |

作業木の Build Gate は `prepare_site.py` exit 0・`zensical build --strict` exit 0（No issues found）。`_site_src/` の `.md` で数えた目印は `{: .bundle-support }` 1640 行・`{: .bundle-default }` 423 行・`<div class="bundle-notes" markdown="1">` 16 個・札 2719 個で、設計の MarkerCheck の計と同じ。`{: .bundle-support }` の直前の行はどれも `**対応:**` の行。

## 目印

作業木の `serve`（8000、`02e71e2` を build したもの）の 40 頁の HTML を、使い捨ての `B/markers.py`（標準の `html.parser`。bs4 は venv に無い）で数えた。`_site_src/` の対応の行も同じスクリプトが読む（`prepare_site` を import し、`SUPPORT_LINE`・`baseware()`・`BASEWARE_PART`・`NEGATION` をそのまま使う）。数え方は、合成した小さな HTML で目印なしの既定値の段落・漏れ・札の外・包みの最初の子が 1 つずつ数えられることを assert で確かめてから流した。

```sh
# B の中で
$PY -X utf8 markers.py C:/home/maz/git/doc_edit/.worktrees/site-look-list-markers http://127.0.0.1:8000/ukadoc-spec
$PY snapshot.py C:/home/maz/git/doc_edit/.worktrees/site-look-list-markers http://127.0.0.1:8000/ukadoc-spec after.json
$PY snapshot.py compare before.json after.json   # SAME、exit 0
```

### 頁ごとの数
| 頁 | 対応の段落 | 札（`SSP` / `Materia` / `CROW` / `Ninix`） | 既定値の段落 | 注意書きの包み |
|---|---|---|---|---|
| `descript/balloon` | 169 | 299（169 / 65 / 65 / 0） | 168 | |
| `descript/ghost` | 74 | 108（74 / 18 / 16 / 0） | 74 | |
| `descript/headline` | 9 | 18（9 / 4 / 5 / 0） | 9 | |
| `descript/install` | 17 | 32（17 / 7 / 8 / 0） | 14 | |
| `descript/plugin` | 13 | 30（13 / 8 / 9 / 0） | 13 | |
| `descript/shell` | 102 | 176（102 / 40 / 34 / 0） | 102 | |
| `descript/shell-surfaces` | 137 | 202（137 / 35 / 30 / 0） | 37 | |
| `descript/shell-surfacetable` | 6 | 6（6 / 0 / 0 / 0） | 6 | |
| `list/plugin-event` | 19 | 19（19 / 0 / 0 / 0） | | |
| `list/propertysystem` | 193 | 215（190 / 0 / 25 / 0） | | 2 |
| `list/sakura-script` | 357 | 675（347 / 104 / 99 / 125） | | 14 |
| `list/shiori-event` | 310 | 538（309 / 72 / 71 / 86） | | |
| `list/shiori-event-ex` | 42 | 74（42 / 16 / 16 / 0） | | |
| `list/shiori-resource` | 160 | 295（140 / 77 / 55 / 23） | | |
| `spec/saori-ex` | 32 | 32（32 / 0 / 0 / 0） | | |
| 計 | **1640** | **2719**（1606 / 446 / 433 / 234） | **423** | **16** |

- 設計の MarkerCheck の表と全部の頁・全部の欄で合った。ほかの 25 頁は 4 つとも 0
- 包みの最初の子（`h2` 2・`h3` 12・`h4` 2。設計と同じ）:
  - `list/sakura-script`: `h2` `notes_escape`・`notes_lifespan`、`h3` `notes_move`・`notes_sound`・`notes_sound_spectrum`・`notes_inputbox-option`・`notes_inputbox-id`・`notes_selectfile`・`notes_passivemode`・`notes_inductionmode`・`notes_executehttp`・`notes_executeical`・`notes_executerss`・`notes_environmentvariable`
  - `list/propertysystem`: `h4` `notes_sound_meta`・`notes_sound_propertyset`

### 付けないもの・漏れ
| 見たもの | 数 |
|---|---|
| 札で `p.bundle-support` の外にあるもの | 0 |
| 読み物の頁の目印（`dev/nar` の `<strong>対応:</strong>` 1 個は目印なし。`<strong>対応:</strong>` は全体で 1641 個、うち目印なしはこの 1 個だけ） | 0 |
| `<strong>既定値:</strong>` で始まる段落（423 個）のうち `bundle-default` の無いもの | 0 |
| `article` の中で `pre`・`code` の外の字に `{: `・`{#` | 0 |

### 変わらないこと
- `snapshot.py compare before.json after.json` は **SAME**（exit 0）。全 40 頁の `article` の中の見出しの id の並び・`headerlink` の数・`md-nav__link` の数・`href="#notes_` の数・`hr` の数・本文の字（空白を 1 つに詰めたもの）と、`_raw/` の 2049 ファイルの SHA-256 が控えと同じ。包みの端の空白で字が違うことも無かった（詰めた後の字で比べて同じ）

### 札にならない部分
`_site_src/` の対応の行 1640 行のうち、札にならない部分を含む行は **5 通り・7 行**（設計と同じ）。打ち消しの語で札にしなかった部分は **0**。

この数は `prepare_site.py` の正規表現を使って数えたので、レビューで別に、原稿の `**対応:**` の行（コードブロックの外）を ` / ` で区切って部分ごとに見るスクリプトで数え直した。行 1640・札 2719（名前ごとの内訳も同じ）・打ち消し 0・5 通り・7 行で合った。

| 対応の行（`**対応:** ` の後ろ） | 行 |
|---|---|
| `Materia廃止仕様 / SSP` | 3 |
| `Materia廃止仕様 / SSP 複数指定は2.4.26～ ダークモードは2.8.56～` | 1 |
| `SSP 2.4 / Ref1以降は2.4.85` | 1 |
| `Materia / SSP / CROW / *※推奨　SSP2.5.05以上*` | 1 |
| `Materia / SSP / CROW / *※推奨　SSP2.6.72以上*` | 1 |

- 札にならない部分は `Materia廃止仕様`（名前の直後が空白でない）・`Ref1以降は2.4.85`・`*※推奨…*`（名前で始まらない）の 3 種で、同じ行のほかの部分は札になった
