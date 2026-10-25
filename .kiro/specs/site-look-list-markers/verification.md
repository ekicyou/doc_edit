# 確かめの記録: site-look-list-markers

## 測った版と日付
- 日付: 2026-10-25
- 作業木: `.worktrees/site-look-list-markers/`（ブランチ `site-look-list-markers`。ukadoc-spec の作業木）
  - `02e71e2` まとめ頁の対応・既定値の段落と注意書きの節に目印を付け、対応のベースウェアの名前を札で包む（2.1）
  - `f8a747c` 注意書きの節を点線の箱に、対応のベースウェアの名前を色の札に、既定値を字下げと札で見せる（3.1）
  - 2.2 は `02e71e2`、4.2〜4.4 と 5.1 の Build Gate は `f8a747c` で測った
- `origin/main`: `d3154d8`（PR #11 のマージの後）。変更の前の控えはこの版で、作業木の先祖である。4.1 の後も進んでいない
- 頁: 作業木の `zensical serve`（`http://127.0.0.1:8000/ukadoc-spec/…`）。変更の前の控えは 8010
- 測りのブラウザ: Edge ヘッドレス + CDP（`shot.mjs` と、控えの置き場のスクリプト）
- 流した式: Build Gate は下の「Build Gate と規約 Gate」、控えと比べは「変更の前」、目印の数えは「目印」、対比の式と重ねの計算は「対比」、画面は「画面」の各節にそのまま書いた
- 開発者に画面や `serve` を見せるときは、古い `extra.css` が残らないよう Ctrl+F5 を頼む（8.9）

## Build Gate と規約 Gate
```sh
# 作業木 .worktrees/site-look-list-markers/ の中で
../../.venv/Scripts/python scripts/prepare_site.py    # exit 0
../../.venv/Scripts/zensical build --strict           # exit 0（No issues found）
git diff --stat origin/main
#  assets/extra.css        | 56 +++
#  scripts/prepare_site.py | 47 ++-
#  2 files changed, 102 insertions(+), 1 deletion(-)
```
- 規約 Gate: 原稿（`.md`）・`index.md` の「## 一覧」・`.nav.yml`・`INDEX.md`・`mkdocs.yml` は変えていない。頁も足していない。`prepare_site.py` の注と docstring は既にある書き方（日本語・だ/である調）にそろえ、`extra.css` の注は塊ごとに `/* site-look-list-markers: <何> */` の 1 行だけ（9.1・9.2・9.4）

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

## 測る版
- 2026-10-25 に ukadoc-spec を fetch した。`origin/main` は `d3154d8` のまま進んでおらず、作業木の先祖である。merge はしていない
- 4.2〜4.4 は作業木の `f8a747c`（`prepare_site.py` の `02e71e2` と `extra.css` の `f8a747c`）で測る。Build Gate（3.2）: `prepare_site.py` exit 0、`zensical build --strict` exit 0（No issues found）。`git diff --stat origin/main` は `assets/extra.css`（+56）と `scripts/prepare_site.py`（+46 −1）だけ

## 配り
- 3.2 の Build Gate の後に作業木の `zensical serve` を起動し直した。配られた `http://127.0.0.1:8000/ukadoc-spec/assets/extra.css` は 200 で、見出しのコメント `site-look-list-markers:` が 3 つ（注意書きの節の箱・対応のベースウェアの札・既定値の札と字下げ）ある（8.1）
- 内蔵ブラウザの枠で `list/sakura-script/#notes_escape` を開き、点線の箱と中央寄せの見出しが出ることを見た

## 対比

### 測った版と測り方（4.3）
- 日付: 2026-10-25。作業木 `f8a747c` の `zensical serve`（`http://127.0.0.1:8000/ukadoc-spec/`）。幅 1000×高さ 700
- 頁は Edge の新しい profile で開き、明（`default`）で始まった。暗はヘッダの切り替えを押して移った（読み込み直していない）
- ホバー: CDP の `Input.dispatchMouseEvent`（`mouseMoved`）で、要素を真ん中まで送った後、その最初の行の矩形の真ん中にポインタを載せた。`:hover` は明・暗とも付いていた
- フォーカス: `Emulation.setFocusEmulationEnabled` を入れて `focus()` した。`:focus` は明・暗とも付いていた
- 移り変わり: 読む前に要素と `document` の `getAnimations()` が 0 になるのを待った（3 秒まで）。使い捨ての `transition: none` は足していない

### 式
```sh
# スクラッチ（C:\Users\maz-o\AppData\Local\Temp\claude\C--home-maz-git-doc-edit\0d9dc02d-eea9-4c04-8263-111d75655dca\scratchpad\probe\）の中で
node probe.mjs http://127.0.0.1:8000/ukadoc-spec out > result.json   # exit 0。JSON を標準出力へ、検索の強調の画面を out\ へ
```

- `probe.mjs`: `site-look-plan/tools/shot.mjs` の Edge の起動と CDP の作りを写した使い捨てのスクリプト。`list/sakura-script/` を明で開いて測り、切り替えて暗で測り、明に戻す。次に `descript/ghost/` で同じようにし、最後に `?h=` の 4 つの頁を開いて明・暗で測る
- 対比の式は `site-look-list-items` の `verification.md` の「流した式」の `parse`・`over`・`bgOf`・`lum`・`ratio` をそのまま頁の中で流した。枠は `border-top-color`（見出しの下の点線は `border-bottom-color`）を字の代わりに置いた。箱の外の地は `.bundle-notes` の親の要素の `bgOf`、箱の中の地は `.bundle-notes` の `bgOf`

### 測る所と線（結果）
fg は `getComputedStyle` の `color`（枠はその色）、bg は重ねた地。半透明の色は、重ねた後の色を括弧に書いた。

| 測る所 | セレクタ | 表示 | 状態 | fg | bg | 対比 | 線 | 判定 |
|---|---|---|---|---|---|---|---|---|
| C04 箱の中の本文の字 | `.bundle-notes li` | 明 | ふだん | `rgba(0, 0, 0, 0.87)`（`rgb(32, 32, 32)`） | `rgb(245, 245, 245)` | 14.97 | 4.5（1.6） | 満たす |
| 同上 | 同上 | 暗 | ふだん | `rgba(226, 228, 233, 0.82)`（`rgb(191, 193, 198)`） | `rgb(30, 33, 41)` | 8.93 | 4.5（1.6） | 満たす |
| C04 箱の見出しの字 | `#notes_escape` | 明 | ふだん | `rgba(0, 0, 0, 0.87)`（`rgb(32, 32, 32)`） | `rgb(245, 245, 245)` | 14.97 | 4.5（1.6） | 満たす |
| 同上 | 同上 | 暗 | ふだん | `rgba(226, 228, 233, 0.82)`（`rgb(191, 193, 198)`） | `rgb(30, 33, 41)` | 8.93 | 4.5（1.6） | 満たす |
| C04 箱の中のコードの字 | `.bundle-notes code` | 明 | ふだん | `rgb(54, 70, 78)` | `rgb(245, 245, 245)`（コードの地 = 箱の地） | 8.99 | 4.5（1.6） | 満たす |
| 同上 | 同上 | 暗 | ふだん | `rgba(213, 216, 226, 0.82)`（`rgb(182, 185, 195)`） | `rgb(39, 42, 53)`（コードの地） | 7.27 | 4.5（1.6） | 満たす |
| C04 箱の枠（箱の外の地） | `.bundle-notes` の `border-top-color` | 明 | — | `rgba(0, 0, 0, 0.54)`（`rgb(117, 117, 117)`） | `rgb(255, 255, 255)` | 4.59 | 3（1.6） | 満たす |
| 同上 | 同上 | 暗 | — | `rgba(226, 228, 233, 0.56)`（`rgb(140, 142, 149)`） | `rgb(30, 33, 41)` | 4.92 | 3（1.6） | 満たす |
| C04 箱の枠（箱の中の地） | 同上 | 明 | — | `rgba(0, 0, 0, 0.54)`（`rgb(113, 113, 113)`） | `rgb(245, 245, 245)` | 4.50 | 3（1.6） | 満たす |
| 同上 | 同上 | 暗 | — | `rgba(226, 228, 233, 0.56)`（`rgb(140, 142, 149)`） | `rgb(30, 33, 41)`（地なし） | 4.92 | 3（1.6） | 満たす |
| C04 箱の見出しの下の点線 | `.bundle-notes > :first-child` の `border-bottom-color` | 明 | — | `rgba(0, 0, 0, 0.54)`（`rgb(113, 113, 113)`） | `rgb(245, 245, 245)` | 4.50 | 3（1.6） | 満たす |
| 同上 | 同上 | 暗 | — | `rgba(226, 228, 233, 0.56)`（`rgb(140, 142, 149)`） | `rgb(30, 33, 41)` | 4.92 | 3（1.6） | 満たす |
| C04 箱の中のリンク | `#notes_executehttp ~ * a:not(.headerlink)` の最初（「OnExecuteHTTPComplete」） | 明 | ふだん | `rgb(31, 78, 140)` | `rgb(245, 245, 245)` | 7.62 | 7（1.7） | 満たす |
| 同上 | 同上 | 明 | ホバー（ポインタを載せた） | `rgb(82, 108, 254)` | `rgb(245, 245, 245)` | 3.90 | 3（1.7） | 満たす |
| 同上 | 同上 | 明 | フォーカス | `rgb(82, 108, 254)` | `rgb(245, 245, 245)` | 3.90 | 3（1.7） | 満たす |
| 同上 | 同上 | 暗 | ふだん | `rgb(143, 180, 232)` | `rgb(30, 33, 41)` | 7.56 | 7（1.7） | 満たす |
| 同上 | 同上 | 暗 | ホバー（ポインタを載せた） | `rgb(82, 108, 254)` | `rgb(30, 33, 41)` | 3.78 | 3（1.7） | 満たす |
| 同上 | 同上 | 暗 | フォーカス | `rgb(82, 108, 254)` | `rgb(30, 33, 41)` | 3.78 | 3（1.7） | 満たす |
| 参考: 試作の暗い表示の箱の地（コードの地）の上のリンク | — | 暗 | ふだん | `#8fb4e8` | `#272a35` | 6.71（計算だけ。設計の見込みは 6.69） | 地を敷かない判断の根拠 | — |
| C06・C17 札 `Materia` | `.bundle-baseware-materia`（字と `border-top-color`） | 明 / 暗 | — | `rgb(107, 69, 0)` / `rgb(255, 194, 96)` | `rgb(255, 255, 255)` / `rgb(30, 33, 41)` | 8.48 / 10.07 | 7（4.1）/ 4.5（2.6） | 満たす |
| 同 `SSP` | `.bundle-baseware-ssp`（同上） | 明 / 暗 | — | `rgb(24, 90, 28)` / `rgb(129, 199, 132)` | 同上 | 8.34 / 8.00 | 7 / 4.5 | 満たす |
| 同 `CROW` | `.bundle-baseware-crow`（同上） | 明 / 暗 | — | `rgb(90, 26, 133)` / `rgb(206, 147, 216)` | 同上 | 10.93 / 6.74 | 7 / 4.5 | 満たす |
| 同 `CROW`（`descript/ghost` の `#charset`） | `#charset` の後の `.bundle-baseware-crow`（同上） | 明 / 暗 | — | `rgb(90, 26, 133)` / `rgb(206, 147, 216)` | 同上 | 10.93 / 6.74 | 7 / 4.5 | 満たす |
| 同 `Ninix` | `.bundle-baseware-ninix`（同上） | 明 / 暗 | — | `rgb(13, 71, 161)` / `rgb(144, 202, 249)` | 同上 | 8.63 / 9.20 | 7 / 4.5 | 満たす |
| C07 既定値の値の字 | `p.bundle-default`（`descript/ghost`） | 明 | ふだん | `rgba(0, 0, 0, 0.87)`（`rgb(33, 33, 33)`）・16px | `rgb(255, 255, 255)` | 16.07 | 本文と同じ色・大きさ（3.2） | 満たす |
| 同上 | 同上 | 暗 | ふだん | `rgba(226, 228, 233, 0.82)`（`rgb(191, 193, 198)`）・16px | `rgb(30, 33, 41)` | 8.93 | 同上 | 満たす |
| C07 「既定値:」の札の字と枠 | `p.bundle-default > strong:first-child`（字と `border-top-color`） | 明 | — | `rgba(0, 0, 0, 0.54)`（`rgb(117, 117, 117)`）・12px | `rgb(255, 255, 255)` | 4.59 | 4.5（3.4） | 満たす |
| 同上 | 同上 | 暗 | — | `rgba(226, 228, 233, 0.56)`（`rgb(140, 142, 149)`）・12px | `rgb(30, 33, 41)` | 4.92 | 4.5（3.4） | 満たす |

- 札の枠（`border-top-color`）は 4 つの名前とも明・暗で字と同じ値・同じ対比だった（`currentColor`）
- 既定値の値の字は、`.md-typeset` と class の無い段落（「ゴーストの基本設定ファイル。…」）と同じ `color`・`font-size`（明 `rgba(0, 0, 0, 0.87)`・暗 `rgba(226, 228, 233, 0.82)`、16px）だった（3.2）。設計の見込み 16.10 との差は、重ねた後の値の丸めの差である
- 箱の地: 明 `rgb(245, 245, 245)`、暗 `rgba(0, 0, 0, 0)`（地なし。頁の地のまま）。包みの最初の子は `#notes_escape`
- 「既定値:」の札は線 4.5 に明 0.09・暗 0.42 の余りで届いた。線に届かない所は **0**。色を選び直す要は無い

### 変数で出せない 8 つの札の色（2.2・8.6）
| 名前 | 明の色 | 明の対比（地 `#ffffff`） | 暗の色 | 暗の対比（地 `#1e2129`） |
|---|---|---|---|---|
| `Materia` | `#6b4500` | 8.48 | `#ffc260` | 10.07 |
| `SSP` | `#185a1c` | 8.34 | `#81c784` | 8.00 |
| `CROW` | `#5a1a85` | 10.93 | `#ce93d8` | 6.74 |
| `Ninix` | `#0d47a1` | 8.63 | `#90caf9` | 9.20 |

- 測った `color` は 8 つとも設計の色そのもの（`rgb()` に直して同じ）。明の 4 つ・暗の 4 つは、それぞれ互いに違う値だった（2.2）
- 線は明 7（4.1）・暗 4.5（2.6）。8 つとも満たす

### 切り替え（6.1）
頁を読み込み直さずに、ヘッダの `form[data-md-component=palette]` の見えている `label` の真ん中を本当に押した（3 回。頁に置いた印 `window.__mark` が 3 回とも残っていたので、読み込み直していない）。`<body>` の `data-md-color-scheme` と、箱・札の色が毎回切り替わった:

| 頁 | 押した label | 前 → 後 | 箱の地 | 箱の枠 | 札（`Materia` / `SSP` / `CROW` / `Ninix`） | 「既定値:」の札 |
|---|---|---|---|---|---|---|
| `list/sakura-script` | 「ダークモードに切り替え」 | `default` → `slate` | `rgb(245, 245, 245)` → `rgba(0, 0, 0, 0)` | `rgba(0, 0, 0, 0.54)` → `rgba(226, 228, 233, 0.56)` | 明の 4 色 → 暗の 4 色（上の表のとおり） | — |
| `list/sakura-script` | 「ライトモードに切り替え」 | `slate` → `default` | 逆向きに同じ値へ戻った | 同上 | 同上 | — |
| `descript/ghost` | 「ダークモードに切り替え」 | `default` → `slate` | — | — | — | `rgba(0, 0, 0, 0.54)` → `rgba(226, 228, 233, 0.56)` |

### 画面だけ（6.2）
`list/sakura-script/` の見た目の指定の木（`document.styleSheets` のうち `assets/extra.css`）で、`data-md-color-scheme` を含む規則は **9 個**、どれも `media` が `screen` の `CSSMediaRule` の中だった（`CSSMediaRule` は 5 つ、どれも `screen`）。`media` の外のものは **0 個**:
- 前の spec の 4 個: `[data-md-color-scheme="slate"][data-md-color-primary="custom"]`・C01 の帯の中のリンク・C18 の見出しの帯の地・C18 の箱の線と地
- この spec の 5 個: `[data-md-color-scheme="slate"] .md-typeset .bundle-notes`（箱の地なし）・`.bundle-baseware-materia`・`-ssp`・`-crow`・`-ninix`（札の暗い色）

暗い表示だけの指定はすべて画面だけで、暗い表示のまま印刷すると明るい表示の色で出る。印刷の画面そのものは撮っていない（設計のとおり）

### 検索の強調（7.1）
`?h=` を付けて開き、`mark` の `color` と、`mark` の地まで重ねた地の対比を出した。強調の字の色は親（札・本文）の色をそのまま継ぐ。強調の地は明 `rgba(255, 255, 0, 0.5)`・暗 `rgba(66, 135, 255, 0.3)`（テーマのまま）。明・暗は読み込み直さずに切り替えた（テーマが表示を覚えているので、`?h=SSP` は暗で開いて明へ、ほかは明で開いて暗へ切り替えた）。画面は `scratchpad\probe\out\search-<語>-0-<表示>.png`（スクラッチだけに置いた）で、8 枚とも強調の地が札・箱の見出し・既定値の段落の中に見えた。

| 頁と `?h=` | 強調の所 | `article` の `mark` / そのうちその所 | 表示 | fg | bg（重ねた地） | 対比 | 線 | 判定 |
|---|---|---|---|---|---|---|---|---|
| `list/sakura-script/?h=SSP` | `.bundle-baseware mark`（札の中） | 463 / 347 | 明 | `rgb(24, 90, 28)` | `rgb(255, 255, 128)` | 7.89 | 見える（7.1） | 満たす |
| 同上 | 同上 | 463 / 347 | 暗 | `rgb(129, 199, 132)` | `rgb(41, 64, 105)` | 5.16 | 同上 | 満たす |
| `descript/ghost/?h=CROW` | `.bundle-baseware mark`（札の中） | 16 / 16 | 明 | `rgb(90, 26, 133)` | `rgb(255, 255, 128)` | 10.34 | 同上 | 満たす |
| 同上 | 同上 | 16 / 16 | 暗 | `rgb(206, 147, 216)` | `rgb(41, 64, 105)` | 4.35 | 同上 | 満たす |
| `list/sakura-script/?h=エスケープ` | `.bundle-notes > :first-child mark`（箱の見出し `#notes_escape`） | 1 / 1 | 明 | `rgba(0, 0, 0, 0.87)`（`rgb(33, 33, 16)`） | `rgb(250, 250, 123)` | 14.83 | 同上 | 満たす |
| 同上 | 同上 | 1 / 1 | 暗 | `rgba(226, 228, 233, 0.82)`（`rgb(193, 198, 210)`） | `rgb(41, 64, 105)` | 6.08 | 同上 | 満たす |
| `descript/ghost/?h=省略不可` | `p.bundle-default mark`（既定値の段落） | 6 / 6 | 明 | `rgba(0, 0, 0, 0.87)`（`rgb(33, 33, 17)`） | `rgb(255, 255, 128)` | 15.37 | 同上 | 満たす |
| 同上 | 同上 | 6 / 6 | 暗 | `rgba(226, 228, 233, 0.82)`（`rgb(193, 198, 210)`） | `rgb(41, 64, 105)` | 6.08 | 同上 | 満たす |

- `?h=エスケープ` の強調は頁の中に 1 個だけで、箱の見出しの中にあった。箱の本文の中の強調は 0 個（本文に「エスケープ」の字が無い）
- 札の中の強調の対比は、設計の見込み（明 7.89〜10.34・暗 4.34〜6.49）の中に入った

## 画面

### 測った版と撮り方（4.4）
- 日付: 2026-10-25。作業木 `f8a747c` の `zensical serve`（`http://127.0.0.1:8000/ukadoc-spec/`）。控えは `d3154d8` の配り（`http://127.0.0.1:8010/ukadoc-spec/`）
- `site-look-plan/tools/shot.mjs` を読むだけで使い、既定の 1000×700 で明・暗を撮った。明・暗は `prefers-color-scheme` で選んだ

```sh
# spec のフォルダ（.kiro/specs/site-look-list-markers/）の中で。T = ../completed/site-look-plan/tools/shot.mjs、B = http://127.0.0.1:8000/ukadoc-spec
node $T "$B/list/sakura-script/"  "#notes_escape"      screenshots/after-sakura-script-notes-$s.png  $s   # s = light・dark
node $T "$B/list/sakura-script/"  "#bang-lock-repaint" screenshots/after-sakura-script-$s.png        $s
node $T "$B/descript/ghost/"      "#charset"           screenshots/after-descript-ghost-$s.png       $s
node $T "$B/list/propertysystem/" "#notes_sound_meta"  screenshots/after-propertysystem-notes-$s.png  $s
```

### 撮った画面（8.4・8.5）
| 画面 | 頁 | 位置 | 見比べた目標の画面 |
|---|---|---|---|
| `after-sakura-script-notes-{light,dark}.png` | `list/sakura-script/` | `#notes_escape` | `mock-sakura-script-C04-{light,dark}` |
| `after-sakura-script-{light,dark}.png` | `list/sakura-script/` | `#bang-lock-repaint` | `mock-sakura-script-C06-{light,dark}`・`mock-sakura-script-C17-light` |
| `after-descript-ghost-{light,dark}.png` | `descript/ghost/` | `#charset` | `mock-descript-ghost-C07-{light,dark}` |
| `after-propertysystem-notes-{light,dark}.png` | `list/propertysystem/` | `#notes_sound_meta` | なし（段が `h4` の箱） |

### 撮り直し（8.8）
- 撮り直しは **1 枚**: `after-sakura-script-light.png`。最初の画面は y ≈ 570 の所にヘッダの紺の行がもう 1 本あり、右の端にも紺の帯が出ていた（二重に重なった跡）。同じ式で撮り直し、重なりの無いことを見た
- `after-sakura-script-notes-{light,dark}.png` のヘッダの題（「SAKURA Script」と前の題）の重なりは、題の切り替えの動きで、本文に響かないので撮り直していない（設計の「Error Handling」のとおり。目標の画面にも同じ重なりがある）
- 残した 8 枚は、上の端のほかに紺の行が無いことを 1 枚ずつ見た

### 目標の画面との見比べ
比べたのはこの spec の 4 つの候補（C04・C06・C17・C07）の部分だけ。目標の画面のほかの候補の部分（C18 の見出しの帯・C10 の記述例の枠・C01 など）は、前の spec の分か、後の spec の分なので見ていない。

| 候補 | 表示 | 同じ所 | 違う所（わけ） |
|---|---|---|---|
| C04 箱（`#notes_escape`・`#notes_lifespan`） | 明 | 点線の枠・見出しの中央寄せと下の点線・地 `#f5f5f5`・箱の中のリスト・コードの見た目、箱どうしの間の区切りの線 | 2 つ目の箱が試作より 17px ほど上に来る。箱の中の段落・リストの間が C02 の `.4em` の詰めのままのため（「前提と OPEN QUESTION」の 5。決めたとおり） |
| 同上 | 暗 | 点線の枠・見出しの中央寄せと下の点線・箱の中の字とコード | 箱に地が無く、頁の地のまま（試作は箱の中にコードの地）。「前提と OPEN QUESTION」の 1 で決めたとおり。上と同じ余白の違い |
| C06 札（`Materia` / `SSP` / `Ninix`） | 明 | 札の枠（`currentColor`）・角・字の大きさと太さ・` / ` の区切り・色の割り振り | 札の色は C17 の濃い色（下の行）。試作の C06 の明るい色は C17 で上書きされる前の色で、`C17-light` と同じになるのが目標 |
| 同上 | 暗 | 4 つの名前の暗い色（`#ffc260`・`#81c784`・`#90caf9`）と枠、並び | 無い（「対応:」の段落の上の余白が試作より詰まるのは C02 の詰めで、この spec の外） |
| C17 札の明るい表示の濃い色 | 明 | `Materia` `#6b4500`・`SSP` `#185a1c`・`Ninix` `#0d47a1` の字と枠が `mock-sakura-script-C17-light` と同じに見える | 無い |
| C07 既定値（`#charset`・`name`・`type`・`craftman`） | 明 | 「既定値:」の小さい札（控えめの色・枠）と、段落の字下げ | 値の字が本文の色・本文の大きさ（試作は控えめの色・小さい字）。要件 3.2 の決定と「前提と OPEN QUESTION」の 2 のとおり |
| 同上 | 暗 | 同上 | 同上 |

### `CROW` の札と段が `h4` の箱（8.5）
- `CROW`（`descript/ghost` の `#charset` の `SSP / CROW` と、下の項目の `Materia / SSP / CROW`）: `after-descript-ghost-{light,dark}.png` に写った。明は `#5a1a85`、暗は `#ce93d8` の字と枠で、ほかの名前の札と同じ形・大きさで並び、ほかの 3 色と見分けがつく
- 段が `h4` の箱（`list/propertysystem` の `#notes_sound_meta`・`#notes_sound_propertyset`）: `after-propertysystem-notes-{light,dark}.png` に写った。`h2`・`h3` の箱と同じ点線の枠・見出しの中央寄せと下の点線で、見出しの字は `h4` の太字・大きさのまま。明は地 `#f5f5f5`、暗は地なし。箱の中のリンク・太字・コードは読める

## 失わないもの

### 幅 375（7.3）
`shot.mjs` を幅 375×高さ 812 で、画面を書かずに（出力 `-`）流した。`scrollWidth` は縦のスクロールバーの幅を足した値（`shot.mjs` の数え方）。

```sh
node $T "$B/<頁>" "<位置>" - $s 375 812   # 位置は上の画面と同じ（descript/ghost は #charset、list/propertysystem は #notes_sound_meta、list/sakura-script は #notes_escape）
```

| 頁 | 明 `scrollWidth` / `innerWidth` | 暗 `scrollWidth` / `innerWidth` |
|---|---|---|
| `list/sakura-script` | 375 / 375 | 375 / 375 |
| `descript/ghost` | 375 / 375 | 375 / 375 |
| `list/propertysystem` | 375 / 375 | 375 / 375 |

- 6 つとも 375 で、横にはみ出さない

### コピーのボタン（7.4）
- 控えの配り（8010）の `list/sakura-script/#bang-lock-repaint` を同じ式で明・暗で撮り（`scratchpad\shots\base-sakura-script-{light,dark}.png`。スクラッチだけに置いた）、`after-sakura-script-{light,dark}.png` と並べた。2 つの記述例のコピーのボタンは、どちらも同じ位置（記述例の右上）・同じ形・同じ色で、変わっていない
- 2 つの配りの `list/sakura-script/` の HTML の `<pre` の数は、どちらも 288 で同じ

### `#notes_escape` の `\`（7.5）
- 使い捨ての `scratchpad\esc.mjs`（標準の `fetch` だけ）で、2 つの配りの `list/sakura-script/` から `id="notes_escape"` の見出しから `id="notes_lifespan"` の見出しの前までを取り、タグを除いて空白を詰めた字を比べた: **同じ**（どちらも 325 字、`\` はどちらも 8 個）。包みの `<div>` が増えても、字は変わらない
- 画面でも、控えの `#notes_escape`（`scratchpad\shots\base-sakura-script-notes-light.png`）と `after-sakura-script-notes-light.png` の「「\」」「「\」」「「\%」」「`\q[ラベル名,ID]`」「「\]」」「`\![raise,…]`」「`\![call,…]`」は同じ字形（バックスラッシュのまま。円の記号にならない）で出ていた

```sh
node scratchpad/esc.mjs   # {"same":true,"len":[325,325],"bs":[8,8],"pre":[288,288]}
```
