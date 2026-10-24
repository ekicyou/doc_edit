# 試作の記録: site-look-plan

`candidates.md` の候補（`C01` から）を、3 頁に使い捨ての試作として当てた記録である（Requirement 3）。試作は ukadoc-spec の作業木 `.worktrees/site-look-plan/` の中だけで作り、作業木ではコミットも push もしない（Requirement 3.2・6.1）。後の `decisions.md` は、この記録と `screenshots/mock-*.png` を材料にする。

- 今の見た目（`base`）を撮った版: ukadoc-spec の `c84942a`（`origin/main` と同じ。`ukadoc-spec/` のメインのチェックアウトで、原稿と設定は変えていない）。2026-10-24 に撮った
- 作業木の起点: `c84942a`（`git -C .worktrees/site-look-plan log --oneline origin/main..HEAD` が空）
- 作業木で変えたファイル（3.1 の時点。どれも未コミット）: `assets/mockup.js`（新規）、`mkdocs.yml`（`extra_javascript` に `assets/mockup.js` を足しただけ）。原稿・`.nav.yml`・`requirements.txt` は触らない（Requirement 6.2）

## 候補の切り替えの仕掛け

- 作業木の `assets/mockup.js` が、頁の URL の `?slp=C01,C03` を読んで `<html data-slp="C01 C03">` を付ける。何も保存しないので、`?slp=` の無い頁や、リンクで移った先の頁には付かない
- 候補ごとの見た目の指定は、作業木の `assets/extra.css` の `html[data-slp~="C01"]` の下に書く（3.2 から）。`?slp=` に並べた候補だけが効くので、両立しない候補（C04 と C11、C05 と C06）を同じ build のまま見比べられる
- `prepare_site.py` の目印と `mkdocs.yml` の `pymdownx.highlight` は `?slp=` で切り替えられず、試作の build の全体に効く。そのため今の見た目は、作業木ではなく、メインのチェックアウトで撮る（design.md の「試作の作り方」）
- プレビュー: 作業木で `python scripts/prepare_site.py` を流してから `zensical serve -a 127.0.0.1:8002` を起動し、`http://127.0.0.1:8002/ukadoc-spec/list/sakura-script/?slp=C01,C03` のように開く（`site_url` が `https://ukatech.shillest.net/ukadoc-spec/` なので、頁の道は `/ukadoc-spec/` から始まる）
- 確かめた結果（3.1）: 作業木で `prepare_site.py` と `zensical build --strict` が exit 0。build の 3 頁（`list/sakura-script`・`descript/ghost`・`manual/ghost`）の HTML に `mockup.js` の読み込みが 1 つずつある。`serve` の `list/sakura-script/?slp=C01,C03` を `tools/shot.mjs` で開き、セレクタ `html[data-slp~="C01"][data-slp~="C03"]` が見つかった（exit 0）。`?slp=` を付けない同じ頁では `html[data-slp]` が見つからなかった（exit 1）

## 今の見た目の画面

どれも `ukadoc-spec/` のメインのチェックアウト（`c84942a`）を `zensical serve -a 127.0.0.1:8001` で出し、`tools/shot.mjs` で幅 1000・高さ 700 に切り出した。試作の画面（`mock-<page>-<Cnn>-<light|dark>.png`）は、同じ頁の道・同じセレクタ・同じ大きさで撮る（Requirement 3.4）。

| 画面（明・暗） | 頁の道 | セレクタ | 写っている部分 | 使う候補 |
|---|---|---|---|---|
| `mock-sakura-script-base-light.png`・`mock-sakura-script-base-dark.png` | `/ukadoc-spec/list/sakura-script/` | `#bang-lock-repaint` | 項目 `\![lock,repaint]`・`\![unlock,repaint]` の名前・説明・対応・記述例と、項目の間の線 | C01・C06・C08・C09・C10 |
| `mock-sakura-script-base-notes-escape-light.png`・`mock-sakura-script-base-notes-escape-dark.png` | `/ukadoc-spec/list/sakura-script/` | `#notes_escape` | 頁の頭の注意書き 2 つ（`h2#notes_escape`・`h2#notes_lifespan`）と、その下の分類の見出し `h2#scope`（スコープコマンド）と最初の項目の名前 | C04・C11・C03 |
| `mock-descript-ghost-base-light.png`・`mock-descript-ghost-base-dark.png` | `/ukadoc-spec/descript/ghost/` | `#charset` | 項目 `charset`・`name`・`type` の名前・説明・既定値・対応と、項目の間の線（3 項目） | C02・C05・C07 |
| `mock-manual-ghost-base-light.png`・`mock-manual-ghost-base-dark.png` | `/ukadoc-spec/manual/ghost/` | `h1#ゴースト` | 頁の題、ファイル構成の木（コードブロック）、ファイルごとの説明の箇条書きの頭 | C12・C14・C15 |

- `list/sakura-script` は、候補の位置が 3 つ（`#bang-lock-repaint`・`#notes_escape`・`#scope`）に分かれるので、2 つの位置で撮った。`#scope` は `#notes_escape` の画面の下に写るので、別には撮っていない。C03 の試作は `#notes_escape` の位置で撮る（`#scope` を上端にした画面が要るなら、3.2 で `mock-sakura-script-base-scope-<light|dark>.png` を撮り足す）
- 名前の付け方: 頁の主な位置の画面は `mock-<page>-base-<light|dark>.png`（design.md の「画面の名前の付け方と上限」）。同じ頁の 2 つ目の位置は、位置の名前を足して `mock-<page>-base-<位置>-<light|dark>.png` とした。位置の名前は、セレクタの id の `_` を `-` にしたもの
- `#notes_escape` の位置では、頁の `h1` がちょうどヘッダの題の切り替わる高さにあり、暗い表示の画面のヘッダの題（「UKADOC project」と「SAKURA Script」）が重なって写る。撮り直しても同じだった。本文と右の欄の目次は崩れていないので、そのまま使う
- 4 つの位置の 8 枚の画面はどれも、白紙でなく、狙った要素が上端近くに写っていることを目で見た（試作の確かめ 3）。幅 1000 では、どれも `scrollWidth` と `innerWidth` が 1000 で同じだった

## `list/sakura-script`

- 当てる候補（`candidates.md`）: C01（`#bang-lock-repaint`）・C03（`#scope`）・C04（`#notes_escape`）・C06（`#bang-lock-repaint`）・C08（`#bang-lock-repaint`）・C09（`#bang-lock-repaint`）・C10（`#bang-lock-repaint`）・C11（`#notes_escape`）
- 今の見た目: `mock-sakura-script-base-*.png`・`mock-sakura-script-base-notes-escape-*.png`
- 確かめた候補: （3.2 で書く）
- 作り方（触った作業木のファイルと写し）: （3.2 で書く）
- 反映の確かめ: （3.2 で書く）
- 375 px: （3.2 で書く）
- 失敗: （3.2 で書く）

## `descript/ghost`

- 当てる候補（`candidates.md`）: C02・C05・C07（どれも `#charset`）
- 今の見た目: `mock-descript-ghost-base-*.png`
- 確かめた候補: （3.3 で書く）
- 作り方（触った作業木のファイルと写し）: （3.3 で書く）
- 反映の確かめ: （3.3 で書く）
- 375 px: （3.3 で書く）
- 失敗: （3.3 で書く）

## `manual/ghost`

- 当てる候補（`candidates.md`）: C12・C14・C15（どれも `h1#ゴースト`）
- 今の見た目: `mock-manual-ghost-base-*.png`
- 確かめた候補: （3.4 で書く）
- 作り方（触った作業木のファイルと写し）: （3.4 で書く）
- 反映の確かめ: （3.4 で書く）
- 375 px: （3.4 で書く）
- 失敗: （3.4 で書く）

## 試作しない候補

- C13（記述例を手元のゴーストで再生する）・C16（ヘッダの値の名前を列にそろえる）は、`candidates.md` の「試作の当て先」の理由により試作しない
