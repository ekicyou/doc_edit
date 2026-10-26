# 確かめの記録: site-look-definition-tables

## 測った版と式（タスク 4.1、2026-10-26）

- 測った版: ukadoc-spec の作業木 `.worktrees/site-look-definition-tables/` の `c4768f5`（`origin/main` `f54423d` の上に 5 コミット: `e158ea2`・`a6b4427`・`cdd9697`・`fab1563`・`c4768f5`）。変更の前の控えは `f54423d`
- 日付: 2026-10-26。3.2・3.3 の数と字の照合は `fab1563` で取った。`c4768f5` は `assets/extra.css` だけを変える（4 行足し・2 行除き）ので、build の HTML・`search.json`・`llms.txt`・`_raw/` は `fab1563` と同じ。3.4（撮り直し）・3.5 は `c4768f5` で測った
- 変更の範囲: `git diff --stat origin/main` は 10 ファイル・124 行足し・54 行除き（`scripts/prepare_site.py`・`assets/extra.css`・`CLAUDE.md`・直した 7 原稿）
- 流した式（作業木で。Claude のスクラッチは `C:\Users\maz-o\AppData\Local\Temp\claude\C--home-maz-git-doc-edit\4124383f-68b4-478c-8a28-dbceca1ecaf3\scratchpad\`）
  - Build Gate: `python scripts/prepare_site.py` → `zensical build --strict`（どちらも `doc_edit\.venv` の物。exit 0、`No issues found`）
  - 単体: `doc_edit\.venv\Scripts\python.exe <スクラッチ>\unit_tabulate.py`（2.1）
  - 数える: `python -I tablecheck.py <_site> <out.json>`（1.2 の控え）、`python -I tablereport.py <_site> <out.json>`（3.2 の表の数・外した形・空行）
  - 字の照合と変わらないこと: `python -I c2.py <控えの _site> <作業木の _site>`、`python -I c4.py <作業木の _site>`（3.3）
  - 画面: `node .kiro/specs/completed/site-look-plan/tools/shot.mjs <url> <selector> screenshots/after-<名>-<light|dark>.png <light|dark>`（1000×700。3.4）。二重の跡は `doubled.py`、前の画面との画素の比べは `pxdiff.py`
  - 幅・対比・切り替え・印刷・検索の強調: `node m2.mjs light|dark <幅> <高さ>`（環境変数 `URLS`・`EXPR`・`MEDIA`。3.5）、`measure.mjs`（3.4 の名前の幅）

## 変更の前（タスク 1.2、2026-10-26）

### 控えの置き場と配り
- 控えのコミット: ukadoc-spec `f54423d47f4450314355103cb871f9eb4f176e7d`（作業木 `.worktrees/site-look-definition-tables/` の HEAD = `origin/main`）
- 控えの置き場（Claude のスクラッチ）: `C:\Users\maz-o\AppData\Local\Temp\claude\C--home-maz-git-doc-edit\4124383f-68b4-478c-8a28-dbceca1ecaf3\scratchpad\baseline\`
  - `src\`: `git archive HEAD` の書き出し。`prepare_site.py`（exit 0）と `zensical build --strict`（exit 0、`No issues found`）を流した。全頁の HTML・`search.json`・`llms.txt` は `src\_site\`、生の原稿は `src\_raw\`（2049 ファイル）。記録は `prepare.log`・`build.log`
  - `serve\ukadoc-spec\`: `src\_site\` の写しに `src\_raw\` を重ねたもの（`pages.yml` の `cp -r _raw/. _site/` と同じ）
  - `before.json`: 下の数えるスクリプトの頁ごとの控え
- 配り: `python -m http.server 8010 --bind 127.0.0.1 --directory <置き場>\serve`。`http://127.0.0.1:8010/ukadoc-spec/`・`/ukadoc-spec/assets/extra.css`・`/ukadoc-spec/INDEX.md` がどれも 200（配りの PID 20712。4.2 で止める）
- 配り直し: `serve\` があれば上の式で配る。置き場が無ければ、控えのコミットを `git archive` で新しいフォルダに書き出し、同じ手順で作り直す
- `llms.txt` の SHA-256: `3916fa9ec45f431ba4c467a08a14371a51db8ecc9ed0a64d6a2636d70974075d`、`search.json`: `87c3a96a3305926a5c08016bf78d2ce6bdd79697dccf7d23f336cd07f81d6828`

### 数えるスクリプト
- `C:\Users\maz-o\AppData\Local\Temp\claude\C--home-maz-git-doc-edit\4124383f-68b4-478c-8a28-dbceca1ecaf3\scratchpad\tablecheck.py`（標準ライブラリだけ）
- 式: `python -I tablecheck.py <_site> <out.json>`。頁ごと（40 頁）に、`article` の中の見出しの id の並び・`a.headerlink` の数・右の欄の目次（`nav.md-nav--secondary` の `a`）の項目の数・`pre` の数、表になる見込みの箇条書きの項目の（名前・説明・`href`）の並び、目印の数、本文の `{:` の数、`markdown=` の数、`list/` の頁の空行で分かれて並んだ Reference の箇条書きの番号が続く所・振り直す所を JSON に書く。後のタスクは `snapshot()`・`load()` を import して、変更の後の `_site` と比べる
- 表になる見込みの箇条書き: どの項目も頭が `strong` の `ul` のうち、(a) 2 項目以上で、どの項目も「`: `」で続き入れ子・`pre`・2 つ以上の段落を持たないもの（`plain`）、(b) `list/` の頁で、どの項目も「`: `」で続き名前が `Reference(\d+|\*)(～\d*)?` のもの（`kind: ref`）。説明は空白を詰め、頭の「`: `」を除く

### 数（変更の前）
| 数えたもの | 数 | 期待 |
|---|---|---|
| `bundle-support` | 1640 | 1640 |
| `bundle-default` | 423 | 423 |
| `bundle-notes` | 16 | 16 |
| `bundle-baseware` | 2719 | 2719 |
| `manual-item` | 73 | 73 |
| 本文の `{:` | 0 | 0 |
| `markdown=` | 0 | — |
| 空行で分かれた Reference の箇条書き: 番号が続く所 | 27 | 27 |
| 同: 振り直す所 | 27 | 27 |
| 名前と説明の箇条書き（2 項目以上・1 段落）/ 項目 | 477 / 2105 | 477 / 2105 |
| Reference だけの箇条書き（上に当たらないもの）/ 項目 | 182 / 182 | 182 |
| 表になる見込みの箇条書きの計 / 項目 | 659 / 2287 | 行 2287 |
| 頁 | 40 | — |
| 見出しの id / `a.headerlink` / 目次の項目 / `pre` | 2579 / 2579 / 2041 / 449 | — |

数はどれも期待と合った。

### 頁ごとの数（変更の前）
名前と説明の箇条書き / 項目、Reference だけの箇条書き / 項目、空行（番号が続く / 振り直す）、目印。

| 頁 | 名前と説明 | Reference だけ | 空行 | 目印 |
|---|---|---|---|---|
| `descript/balloon/` | 0 / 0 | 0 / 0 | 0 / 0 | bundle-support 169・bundle-default 168・bundle-baseware 299 |
| `descript/ghost/` | 2 / 6 | 0 / 0 | 0 / 0 | bundle-support 74・bundle-default 74・bundle-baseware 108 |
| `descript/headline/` | 0 / 0 | 0 / 0 | 0 / 0 | bundle-support 9・bundle-default 9・bundle-baseware 18 |
| `descript/install/` | 3 / 17 | 0 / 0 | 0 / 0 | bundle-support 17・bundle-default 14・bundle-baseware 32 |
| `descript/plugin/` | 1 / 6 | 0 / 0 | 0 / 0 | bundle-support 13・bundle-default 13・bundle-baseware 30 |
| `descript/shell-surfaces/` | 4 / 20 | 0 / 0 | 0 / 0 | bundle-support 137・bundle-default 37・bundle-baseware 202 |
| `descript/shell-surfacetable/` | 0 / 0 | 0 / 0 | 0 / 0 | bundle-support 6・bundle-default 6・bundle-baseware 6 |
| `descript/shell/` | 7 / 23 | 0 / 0 | 0 / 0 | bundle-support 102・bundle-default 102・bundle-baseware 176 |
| `dev/nar/` | 1 / 2 | 0 / 0 | 0 / 0 | — |
| `list/plugin-event/` | 8 / 34 | 9 / 9 | 0 / 0 | bundle-support 19・bundle-baseware 19 |
| `list/propertysystem/` | 9 / 56 | 0 / 0 | 0 / 0 | bundle-support 193・bundle-notes 2・bundle-baseware 215 |
| `list/sakura-script/` | 22 / 151 | 0 / 0 | 0 / 0 | bundle-support 357・bundle-notes 14・bundle-baseware 675 |
| `list/shiori-event-ex/` | 124 / 552 | 84 / 84 | 22 / 27 | bundle-support 42・bundle-baseware 74 |
| `list/shiori-event/` | 217 / 892 | 88 / 88 | 5 / 0 | bundle-support 310・bundle-baseware 538 |
| `list/shiori-resource/` | 4 / 18 | 1 / 1 | 0 / 0 | bundle-support 160・bundle-baseware 295 |
| `manual/balloon/` | 0 / 0 | 0 / 0 | 0 / 0 | manual-item 22 |
| `manual/directory/` | 0 / 0 | 0 / 0 | 0 / 0 | manual-item 12 |
| `manual/ghost/` | 0 / 0 | 0 / 0 | 0 / 0 | manual-item 10 |
| `manual/install/` | 0 / 0 | 0 / 0 | 0 / 0 | manual-item 7 |
| `manual/owner-draw-menu/` | 0 / 0 | 0 / 0 | 0 / 0 | manual-item 3 |
| `manual/shell/` | 0 / 0 | 0 / 0 | 0 / 0 | manual-item 12 |
| `manual/update/` | 0 / 0 | 0 / 0 | 0 / 0 | manual-item 7 |
| `spec/fmo-mutex/` | 2 / 15 | 0 / 0 | 0 / 0 | — |
| `spec/headline/` | 5 / 15 | 0 / 0 | 0 / 0 | — |
| `spec/plugin/` | 1 / 2 | 0 / 0 | 0 / 0 | — |
| `spec/saori-ex/` | 45 / 177 | 0 / 0 | 0 / 0 | bundle-support 32・bundle-baseware 32 |
| `spec/shiori3/` | 7 / 36 | 0 / 0 | 0 / 0 | — |
| `spec/sstp/` | 10 / 71 | 0 / 0 | 0 / 0 | — |
| `spec/update-file/` | 4 / 9 | 0 / 0 | 0 / 0 | — |
| `spec/web/` | 1 / 3 | 0 / 0 | 0 / 0 | — |

表に出ていない 10 頁（トップ・`dev/bind/`・`dev/ownerdraw/`・`dev/shell/`・`dev/shell-error/`・`dev/update/`・`manual/translator/`・`memo/memo/`・`memo/shiori-event/`・`spec/dll/`）は、箇条書き・空行・目印の数が 0。

## 単体（タスク 2.1、2026-10-26）

- スクリプト: Claude のスクラッチの `unit_tabulate.py`（作業木の `scripts/prepare_site.py` から `tabulate()` を import し、直に呼ぶ）。式は `doc_edit\.venv\Scripts\python.exe unit_tabulate.py`。4.1 で `c4768f5` の作業木に対して流し直し、exit 0（`ALL OK`）

| 例（設計の Testing Strategy の単体） | 結果 |
|---|---|
| 2 項目の名前と説明の箇条書き → 表 1 個 2 行、名前の欄に `**a**`、説明の欄に「`: `」の後ろの字と `<br />` の続きの行 | OK |
| 1 項目で `Reference` でない名前 → 字が 1 字も変わらない | OK |
| `references` が偽の `Reference0` 1 項目 → 変わらない | OK |
| `references` が真の `- **Reference0**: …` と 2 字下げの入れ子 → `td markdown="block"` の中に、字下げを外した入れ子の表 | OK |
| `- **必ず守ること（MUST）：**` を含む 5 項目 → 変わらない | OK |
| コードブロックの中の `- **a**: b` → 変わらない | OK |
| 字下げ 4 の 2 項目 → `markdown=` の無い表 | OK |
| 字下げ 2 の 2 項目 → `div`・`table`・`tbody`・`tr`・`td` の各段に `markdown="1"` | OK |

## 測る版（タスク 3.1、2026-10-26）

- ukadoc-spec を fetch した。`origin/main` は `f54423d` のままで、作業木の分岐点から進んでいない。merge はせず、変更の前の控え（`f54423d`）もそのまま使う
- 測る版: 作業木 `site-look-definition-tables` の `fab1563`（`origin/main` `f54423d` の上に 4 コミット）。`origin/main` は作業木の先祖である
- Build Gate（2.5）: `prepare_site.py` exit 0、`zensical build --strict` exit 0（No issues found）。`git diff --stat origin/main` は 10 ファイル。build の HTML の `class="definition-table"` は 632

## 配り（タスク 3.2、2026-10-26）

- 作業木（`fab1563`）で `prepare_site.py`（exit 0）→ `zensical build --strict`（exit 0、`No issues found`）→ `zensical serve` の順に起動した（`http://localhost:8000/ukadoc-spec/`、最初の `serve` はタスクの終わりに落ちたので、`Start-Process` で切り離して起動し直した。`serve` の PID 41168・口を持つ子の PID 8760。3.3〜3.5 が使う）。控えの配り（8010、PID 20712）は動いたまま
- 配られた `/ukadoc-spec/assets/extra.css` は 200 で、`site-look-definition-tables:` の注は 1 つ（232 行目 `/* site-look-definition-tables: 名前と説明の表 */`）

## 表の数（タスク 3.2）

### 数えるスクリプト
- `C:\Users\maz-o\AppData\Local\Temp\claude\C--home-maz-git-doc-edit\4124383f-68b4-478c-8a28-dbceca1ecaf3\scratchpad\tablecheck.py` に、頁ごとの `tables`（`div.definition-table` ごとの種類・置き場所・行の（名前の欄・説明の欄・`href`））、`excluded`（表にならなかった、頭が太字の箇条書きの形）、`tsplits`（並んだ Reference の表の番号）を足した
- 式: `python -I tablereport.py <_site> <out.json>`（同じ置き場。`tablecheck.snapshot()` で数え、頁ごとの数と外した形の例を出す）。変更の後の控えは同じ置き場の `after_x.json`（3.3 の字の照合はこれと `baseline\before.json` を比べる）
- 種類: 2 行以上で、どの欄も `p`・`ul`・`ol`・`table`・`pre` を持たない表を「名前と説明の箇条書きの表」、それ以外を「Reference の箇条書きの表」とした（設計の TableCheck のとおり）
- 置き場所: 表から `article` へ上がって一番近い入れ物（`td` → 表の中、`li` → 項目の中、`div.bundle-notes`、`.admonition` → 注記の箱、無ければ一番外）

### 頁ごとの数（変更の後）
| 頁 | 名前と説明の表 / 行 | Reference の表 / 行 | 置き場所 | 設計の期待 |
|---|---|---|---|---|
| `list/shiori-event/` | 217 / 892 | 83 / 88 | 一番外 298・表の中 2 | 合う |
| `list/shiori-event-ex/` | 124 / 552 | 62 / 84 | 一番外 186 | 合う |
| `spec/saori-ex/` | 45 / 177 | 0 / 0 | 一番外 45 | 合う |
| `list/sakura-script/` | 22 / 151 | 0 / 0 | 一番外 16・`bundle-notes` 6 | 合う |
| `spec/sstp/` | 10 / 71 | 0 / 0 | 一番外 10 | 合う |
| `list/propertysystem/` | 9 / 56 | 0 / 0 | 一番外 9 | 合う |
| `list/plugin-event/` | 8 / 34 | 9 / 9 | 一番外 17 | 合う |
| `descript/shell/` | 7 / 23 | 0 / 0 | 一番外 7 | 合う |
| `spec/shiori3/` | 7 / 36 | 0 / 0 | 項目の中 7 | 合う |
| `spec/headline/` | 5 / 15 | 0 / 0 | 一番外 5 | 合う |
| `descript/shell-surfaces/` | 4 / 20 | 0 / 0 | 一番外 4 | 合う |
| `list/shiori-resource/` | 4 / 18 | 1 / 1 | 一番外 5 | 合う |
| `spec/update-file/` | 4 / 9 | 0 / 0 | 一番外 1・項目の中 3 | 合う |
| `descript/install/` | 3 / 17 | 0 / 0 | 一番外 3 | 合う |
| `descript/ghost/` | 2 / 6 | 0 / 0 | 一番外 2 | 合う |
| `spec/fmo-mutex/` | 2 / 15 | 0 / 0 | 一番外 1・項目の中 1 | 合う |
| `descript/plugin/` | 1 / 6 | 0 / 0 | 一番外 1 | 合う |
| `dev/nar/` | 1 / 2 | 0 / 0 | 注記の箱 1 | 合う |
| `spec/plugin/` | 1 / 2 | 0 / 0 | 一番外 1 | 合う |
| `spec/web/` | 1 / 3 | 0 / 0 | 一番外 1 | 合う |
| 計 | 477 / 2105 | 155 / 182 | 一番外 612・`bundle-notes` 6・注記の箱 1・項目の中 11・表の中 2 | 合う（計 632） |

- ほかの 20 頁（トップ・manual の 7 頁・`descript/balloon/` など）は表 0。manual の頁の表は 0（1.6）
- 置き場所の中身: `bundle-notes` 6 は `list/sakura-script` の注意書きの箱（`screen`…・`--volume=…`…・`--option=…`…・`--accept=…`…・`期間の決め方`…・`期間（--from・--to）`…）。注記の箱 1 は `dev/nar` の `.admonition.tip`（`※1 ベースウェア`・`※2 nar`）。項目の中 11 は `spec/shiori3` 7（`メソッド` の `GET`・`NOTIFY`、`SenderType`・`SecurityLevel`・`Status`・`ステータスコード`・`SecurityLevel [SSP拡張]`・`ErrorLevel [SSP拡張]` の値）・`spec/fmo-mutex` 1（`キー名・値` の `path`…）・`spec/update-file` 3（`行情報`・`必須フィールド`・`拡張フィールド (位置[2]以降)`）。表の中 2 は `list/shiori-event` の `request.(ヘッダ名…)`・`response.(…)` と `rateofusegraph` の `1番目`〜`13番目`
- HTML に `markdown=` は 0

## 外した形（タスク 3.2）

HTML の木の判定（`mockup.js` の C23 と同じ判定と、`list/` の頁の Reference の判定）で、表になるはずで残った箇条書きは **0**（変更の前は 659 = 477 + 182）。頭が太字の項目だけの箇条書きで表にならなかったものは、変更の前と後で同じ数だった。

| 外した形 | 数 | 設計の期待 | 例 |
|---|---|---|---|
| Reference でない 1 項目 | 42 | 42 | `descript/install` の `charset,(文字コード)`、`list/sakura-script` の `--title=テキスト`、`spec/shiori3` の `Charset`、`spec/sstp` の `Option` |
| `spec/shiori3` のヘッダの一覧の中の `Reference` | 3 | 3 | `Reference*`・`Reference0`・`Reference1～`（`list/` の頁でないので 1 項目のまま） |
| 2 つ以上の段落 | 8 | 8 | トップの 6（`ファイル構成`・`設定ファイル`・`さくらスクリプト`・`イベント`・`規格`・`HowTo`）、`list/sakura-script` の `--dir=パス`、`manual/shell` の `※1,※2` |
| コードブロック | 4 | 4 | `list/propertysystem` の `%property[プロパティ名]`・`\![get,property,…]`・`\![set,property,…]`、`spec/update-file` の `行フォーマット` |
| 入れ子の箇条書き（外側） | 12 | — | `spec/shiori3` 7・`spec/fmo-mutex` 1・`spec/update-file` 4。うち 9 は内側が表になった（項目の中の 11 のうち、外側が「`: `」で続く 9）。`ValueNotify [SSP拡張 2.5.35]`・`セキュリティチェック`・`ファイル名` は内側が表にならない箇条書き |
| 名前の後ろが「`: `」でない 1 項目 | 11 | 84（manual の 73 を含む） | `descript/shell-surfaces` の `列挙指定「,」`、`list/sakura-script` の `5帯域(…：Hz)`、`spec/shiori3` の `メソッド`、`spec/update-file` の `必須フィールド` |
| 同（2 項目以上） | 1 | 1 | `spec/saori-ex` の `必ず守ること（MUST）：` ほかの 5 項目 |
| manual の頁のファイルの箇条書き（`manual-item`） | 73 | 0（表）。73 は上の 84 に含む | `manual/ghost` の `descript.txt`・`shiori.dll`、`manual/directory` の `(myghost)\` |

- 設計の期待との違いは数え方だけ: 設計は「名前の後ろが「`: `」でない 1 項目 84」に manual の 73（目印の付いた項目は「`: `」が外れている）を含め、「manual の頁 0」を manual の頁の表の数としていた。ここでは 11 と 73 に分けた（11 + 73 = 84）。「入れ子の箇条書き」12 は設計の外した形の一覧に無いが、1.4 の形で、どれも外側は箇条書きのまま（1.8）
- 頭が太字の項目だけの箇条書きの計: 変更の前 813（表になる見込み 659 + 外した 154）、後は外した 154 だけ

## 空行（タスク 3.2）

- `list/` の頁で並んだ Reference の表（同じ親の中で隣り合う `div.definition-table` で、どの名前も `Reference…`）: 番号が続く所 **0**、振り直す所 **27**（どれも `list/shiori-event-ex`。`OnMahjong` など）。`Reference*` で始まる並びは 0（7.3・7.6）
- 変更の前の「番号が続く所 27」（直した 6 ファイルの意味の無い空行）は、表がつながって 0 になった。並んだ Reference の箇条書き（`ul`）は後で 0（どれも表になった）

## 字の照合（タスク 3.3、2026-10-26）

- スクリプト: Claude のスクラッチの `compare33.py` と `c2.py`（`tablecheck.py` の木を使う。`c2.py` が search.json の照合を足した版）。式は `python -I c2.py <控えの _site> <作業木の _site>`。控えは `baseline\src\_site`（`f54423d`）、後は作業木（`fab1563`）の今の `_site`
- 比べ方: 頁ごとに、控えの表になる見込みの箇条書き（1.2 と同じ判定）の項目の（名前・説明・`href`）を文書順に並べ、後の `div.definition-table` の `tbody` の行の（名前の欄・説明の欄・`href`）を文書順に並べて、1 行ずつ比べた。空白は詰め、説明の頭の「`: `」は除いた
- 中の表の扱い: 欄の中の表（`div.definition-table`）は外側の欄の字と `href` から除き（中の表の見出しの行「名前」「説明」もこれで除かれる）、中の表の行は自身の行として、文書順（外側の行の直後）に比べた。控えの側も、項目の中の、それ自身が表になる見込みの箇条書きは外側の項目の字から除き、自身の行として比べた。中の行は「名前」「説明」の 2 欄に分かれ「`:`」が無いので、外側の字に混ぜずに行として比べると、名前と説明の字がそのまま照合される
- `rateofusegraph` の順: 控えでは `1番目`〜`13番目` は `Reference*` の箇条書きの後ろに空行を挟んで並ぶ別の箇条書き、後では `Reference*` の説明の欄の中の表。どちらも文書順で `Reference*` の直後に `1番目`〜`13番目` が来るので、並びは同じになる。`list/shiori-event/` の 936〜950 行目（`Reference*`・`1番目`〜`13番目`・次の `Reference0`）を取り出し、控えと後で（名前・説明・`href`）が同じことを確かめた（`Reference*` の説明は「バイト値1区切りにされた以下の情報。」、`7番目` の続きの 4 行の字も同じ）。中の表を持つ欄は `list/shiori-event/` の 2 つ（どちらも `Reference*`）
- 直した 6 原稿（空行を除いただけ）: 控えでは 1 項目ずつの箇条書きが並び、後では 1 つの表の行になる。行を頁ごとに通して並べて比べるので、箇条書き・表の切れ目の違いは字の照合に入らない

| 見たもの | 結果 |
|---|---|
| 表のある頁 | 20 |
| 行（控えの項目 / 後の行） | 2287 / 2287 |
| 頁ごとの行の数の違い | 0 |
| （名前・説明・`href`）の違い | **0** |
| `\` を含む名前（後の表） | 7（どれも `list/sakura-script/` の `\![anim,add,…]`）。7 つとも、その頁の `search.json` の字（タグを外し空白を除いたもの）に含まれる |
| 後の表の名前の欄・説明の欄の字で、その頁の `search.json` に無いもの | **0**（4574 の字のうち。控えの項目の字も控えの `search.json` で 0） |

## 変わらないこと（タスク 3.3）

`tablecheck.snapshot()` で作業木の今の `_site` を数え直し（同じ置き場の `after33.json`、式は `python -I c4.py <作業木の _site>`）、控えの `baseline\before.json` と頁ごとに比べた。

| 見たもの | 控え | 後 | 頁ごとの違い |
|---|---|---|---|
| 頁 | 40 | 40 | — |
| 見出しの id（並びを頁ごとに比べた） | 2579 | 2579 | 0 |
| `a.headerlink` | 2579 | 2579 | 0 |
| 右の欄の目次の項目 | 2041 | 2041 | 0 |
| `pre` | 449 | 449 | 0 |
| HTML の `markdown=`（`article` の頁の数え・`_site` の全 HTML の grep） | 0 | 0・0 ファイル | — |

## 目印（タスク 3.3）

| 見たもの | 控え | 後 | 頁ごとの違い |
|---|---|---|---|
| `bundle-support` | 1640 | 1640 | 0 |
| `bundle-default` | 423 | 423 | 0 |
| `bundle-notes` | 16 | 16 | 0 |
| `bundle-baseware` | 2719 | 2719 | 0 |
| 本文の `{:` | 0 | 0 | 0 |
| `manual-item` | 73 | 73 | 0 |

- `llms.txt`: SHA-256 が控えと同じ（`3916fa9ec45f431ba4c467a08a14371a51db8ecc9ed0a64d6a2636d70974075d`）
- `_raw/`: `diff -rq` で違うのは直した 7 原稿だけ（`OnConfigurationDialogHelp`・`OnOtherObjectDropping`・`rateofusegraph`・`OnMusicPlayer.SongInfo`・`OnSpectrePlugin.Possession`・`OnWeatherStation.Astro`・`OnWeatherStation.Forecast.Hourly`）。`git diff --no-index --stat` は 7 ファイル・17 行足し・51 行除き（空行 34 と、`rateofusegraph` の字下げを足した 17 行の入れ替え）、`-w --ignore-blank-lines` では差が無い（7.5）
- 違いが無かったので、2.1・2.3 は見直していない

## 画面（タスク 3.4、2026-10-26）

- 撮ったもの: 作業木 `c4768f5`（名前の欄の上限 24em を足した後。初めは `fab1563` で撮り、開発者の判断の後に 30 枚とも撮り直した）の `zensical serve`（`http://localhost:8000/ukadoc-spec/`）。式は `node .kiro/specs/completed/site-look-plan/tools/shot.mjs <url> <selector> screenshots/after-<名>-<light|dark>.png <light|dark>`（1000×700）。30 枚とも `scrollWidth` と `innerWidth` は 1000
- 撮り直し（二重の跡）: `fab1563` の撮影で 2 枚（`after-anim-code-light.png`・`after-sakura-script-example-light.png`）、`c4768f5` の撮影で 1 枚（`after-anim-code-dark.png`。y=569 からヘッダの色の行）。どれも撮り直した画面には無い。`c4768f5` の 30 枚は、左の端の 2 か所の画素が上の端と同じヘッダの色になる行が y≥60 に無いことを、使い捨てのスクリプト（スクラッチの `doubled.py`）で確かめた
- `fab1563` の画面との画素の比べ（スクラッチの `pxdiff.py`）: 変わったのは、長い名前の表 2 つ（`anim-code`・`notes-executehttp`）と、それより下にある `list/sakura-script` の画面（表の高さが変わってスクロールの位置がずれた `notes-move`・`notes-selectfile`・`sakura-script`・`sakura-script-example`）。ほかは 0 か、右の欄の目次の今の位置の色など 13〜38 行だけで、表の部分は同じ

| 名（`after-<名>-light/dark.png`） | 頁とセレクタ | 見たもの |
|---|---|---|
| `propertysystem` | `list/propertysystem` `[id="system.cpu"]` | 目標と同じ所 |
| `sakura-script` | `list/sakura-script` `#bang-set-wallpaper` | 目標と同じ所 |
| `shiori-event` | `list/shiori-event` `#OnBoot` | 目標と同じ所 |
| `notes-move` | `list/sakura-script` `#notes_move` | 注意書きの箱の中の表・注釈の絵 |
| `notes-executehttp` | `list/sakura-script` `#notes_executehttp` | 注意書きの箱の中の長い名前の表（`--content-type=…` を含む表） |
| `notes-selectfile` | `list/sakura-script` `#notes_selectfile` | 表にならない注意書きの箱（2 段落の項目があり、1.4 で外れる） |
| `nar` | `dev/nar` `.admonition.tip` | 注記の箱の中の字下げ 4 の表・名前のリンク |
| `shiori3` | `spec/shiori3` `#request` | 項目の中の表（`メソッド`） |
| `headline-link` | `spec/headline` `#shiori-event` | 名前がリンクの表 |
| `anim-code` | `list/sakura-script` `#bang-anim-add-overlay-ID` | 名前が `code` の表（長い名前を含む） |
| `rateofusegraph` | `list/shiori-event` `#rateofusegraph` | 表の中の表 |
| `mahjong` | `list/shiori-event-ex` `#OnMahjong` | 縦に並ぶ表 |
| `sakura-script-example` | `list/sakura-script` `[id="bang-set-wallpaper-記述例"]` | 表のある頁の記述例の色 |
| `manual-ghost` | `manual/ghost` `.manual-item` | manual の頁の項目の帯（4.8） |
| `manual-ghost-tree` | `manual/ghost` `.filetree-file` | 木のファイル名の色（4.8） |

### 目標の画面との見比べ（5.5）

- 3 か所とも、表の部分は `mock-*-C23-*.png` と明・暗で同じ: 行の高さ（`system.cpu` の 6 行は 1 行ほぼ 38px）、字の大きさ（`.75rem`）、名前の列の太字、見出しの行「名前」「説明」、枠と地の色、幅の出方（`#OnBoot` の表は本文より狭く 556px で終わり、`#OnClose`・`#bang-set-wallpaper` の表は本文の幅いっぱい）
- 違うのは表の外だけ: 目標の画面は「対応:」の区切りの線から次の項目名の帯までが約 25px 広く、頁の位置が 3px ほど下。変更の前の控え（8010、`#OnBoot`）も変更の後と同じ間で、この spec の変更ではない（目標の画面を撮った試作と今の `site-look-list-items` の詰めの違い）。右の欄の目次の位置もスクロールの位置の違いだけ
- 設計の時の写し（`design-propertysystem-dark.png`・`design-nar-light.png`）とも同じ

### 写っていない所（5.6）

- 箱の中（1.7）: `#notes_move` の箱の中の表は箱の点線の枠・注釈の絵・題の中に収まり、箱の見え方は変わらない。表になる注意書きの箱は `notes_move`・`notes_sound`・`notes_inputbox-option`・`notes_executehttp`・`notes_executeical`・`notes_executerss` の 6 個。`#notes_selectfile` の箱は 2 段落の項目があり、今のままの箇条書き（1.4）
- 項目の中（1.8）: `spec/shiori3` の `メソッド` は外側の箇条書きの点が残り、内側だけが表
- 名前のリンク・`code`: `spec/headline` の名前のリンクは太字でリンクの色、`\![anim,add,overlay,ID]` の名前は `code` の地のまま太字
- 表の中の表: `Reference*` の説明の欄の中に `1番目`〜`13番目` の表、`7番目` の続きの 4 行は `<br />` の改行のまま
- 縦に並ぶ表: `OnMahjong` の表は空行ごとに別の表で、表ごとの幅はそろわない（3.3 のとおり）
- 明・暗とも、表の地・枠・字・リンクの色はほかの表と同じに見え、暗い表示で白い地が出る所は無い

### 崩れていないこと（4.8・4.9）

- 項目名の帯と項目の間の詰め、注意書きの箱の注釈の絵、記述例の色（`#bang-set-wallpaper-記述例` の 3 行の色と区切りの線）、manual の頁の項目の帯と木のファイル名の色は、明・暗とも崩れていない。`manual/ghost` の暗い表示は変更の前の控え（8010）と同じ（帯の中のファイル名の下線と白い字も控えのとおり）

### 字下げ 4 の `dev/nar` の表（設計の話し合いの議題 2）

- build の HTML: `<div class="admonition tip">` の中が `<p class="admonition-title">ヒント</p>` の後に `<p><div class="definition-table"><table>…</table></div></p>`
- ブラウザの DOM（明・暗とも同じ）: `P.admonition-title`・空の `P`・`DIV.definition-table`（中は Material の `div.md-typeset__scrollwrap` の包み）・空の `P`。ブラウザが `p` を表の手前で閉じ、前後に空の `p` が残る（設計のとおり）
- 画面（`after-nar-light/dark.png`）: 表は注記の箱の枠の中に収まり、名前のリンク 2 つ（`※1 ベースウェア`・`※2 nar`）は太字でリンクの色。表の下から箱の下の端までが表の上より少し広い（空の `p` の分）ほかに崩れは無い

### 長い名前の表の説明の欄（開発者の判断、2026-10-26）

`fab1563` では、名前の列を折り返さない指定（`@media screen and (min-width: 45em)` の `white-space: nowrap`、3.4）のため、名前のとても長い表 2 つで説明の欄が潰れた。

| 表 | 表の幅 / 包みの幅 | 名前の欄 / 説明の欄（`fab1563`） | 名前の欄 / 説明の欄（`c4768f5`） |
|---|---|---|---|
| `#notes_executehttp` の箱の表（いちばん長い名前は `--content-type=(multipart/form-data \| …)` の 83 字） | 771 / 707 → はみ出し 0 | 669 / 100 | 387 / 286 |
| `#bang-anim-add-overlay-ID` の表（`\![anim,add,overlay,ID,x,y,表示時間,…]` 69 字を含む） | 787 / 743 → はみ出し 0 | 685 / 100 | 387 / 322 |

- `fab1563` では説明の欄が 1〜2 字ごとに折り返し、表の中を横に流さないと読めなかった。3.4（広い画面で名前を折り返さない）と 3.6（長い字を折り返せる）がこの 2 個でぶつかったので、作業を止めて開発者に提示した
- 幅 1000 で、表のある 20 頁の名前の字の幅を測った（多くは 300px 未満、`list/shiori-event-ex` の「戻り値：X-SSTP-PassThru-…」・`spec/saori-ex`・`spec/web` に 350〜440px、`list/sakura-script` の 2 つが 642px・658px）
- 試作: 名前の欄の `strong`（唯一の子）を `display: inline-block; width: max-content; max-width: 24em` にする（`white-space: nowrap` は除く）。幅 1000 で、表が包みからはみ出す所 0、24em（360px。名前の欄は余白込みで 387px）で折り返す名前は 4 頁の 16 個（3.5 で数え直した。`list/sakura-script` 7・`list/shiori-event-ex` 6・`spec/saori-ex` 1・`spec/web` 2）、短い名前の表（`system.cpu` など）は変わらない
- 開発者が「上限 24em の試作を採る」と判断した（2026-10-26）。作業木の `c4768f5` でコミットし、`design.md` の CSS と「実装で決まったこと」に書いた

開発者に画面やプレビューを見せるときは、古い写しが残らないよう Ctrl+F5 での読み込み直しを頼む（5.11）。

## 幅 375（タスク 3.5、2026-10-26）

- 測った版: 作業木 `c4768f5` の `zensical serve`（`http://localhost:8000/ukadoc-spec/`）。式は `shot.mjs` と同じ Edge ヘッドレス + CDP の使い捨てのスクリプト（スクラッチの `m2.mjs`。1 つの Edge で頁を順に開き、式の値を出す。`node m2.mjs light|dark <幅> <高さ>`、環境変数 `URLS`・`EXPR`・`MEDIA`）。`scrollWidth` は `shot.mjs` と同じく `scrollWidth + innerWidth − clientWidth`（縦のスクロールバーの 15px を足す）
- 幅 375（高さ 812）の明・暗で、表のある 20 頁と `manual/ghost` の 21 頁とも `scrollWidth` 375・`innerWidth` 375（4.4・5.8）。画面は残していない
- 表の包み（`div.md-typeset__scrollwrap`）が横にはみ出す表は、21 頁で `list/shiori-event` の 2 個だけ（明・暗とも同じ）: `#capability` と `#rateofusegraph` の `Reference*` の表（説明の欄の中に表を持つ表）で、包みの幅 360 に対し中身が 363（3px）。説明の欄の中の表の包みに Material の `margin: 1em -.8rem`（左右 −16px）が付き、欄の外へ 3px 出るため。頁の横幅は 375 に収まる。幅 1000 では 0
- 幅 1000（高さ 700）の明で、20 頁の名前の欄の `strong`（2287 個。行の数と同じ）を測った。24em は 360px（字の大きさ 15px）
  - 24em を超える幅の名前 0、24em より狭いのに折り返した名前 0（3.4）
  - 24em で折り返した名前は 4 頁の 16 個（どれも 2 行、幅 360px）: `list/sakura-script` 7（`\![anim,add,overlay,ID,x,y,表示時間,…]` 2・`--accept-language=…`・`--authorization=…`・`--content-type=…`・`--header=…`・`--m_websocketProtocol=…`）、`list/shiori-event-ex` 6（「戻り値：X-SSTP-PassThru-CustomLoginInfo（オプション）」など）、`spec/saori-ex` 1（`aes-256-gcm（推奨） / aes-128-gcm / chacha20-poly1305`）、`spec/web` 2（`x-ukagaka-link:type=event&…`・`x-ukagaka-link:type=homeurl&…`）。3.4 の見込み（5 頁の約 13 個）は 24em を欄の幅の 387px として数えた値で、`strong` の上限の 360px で数え直すとこの 16 個になる（`list/shiori-event` のいちばん長い 347px の名前は折り返さない）
  - 20 頁とも `scrollWidth` 1000、表の包みからはみ出す表 0
- 幅 375 の長い名前（3.5・3.6）: 名前の欄の `strong` は `display: inline`（45em 未満では上限の指定が当たらない）で、字の 1 つずつの位置で行の変わり目を調べると、語の途中で折り返している。`list/sakura-script` の `\![anim,add,overlay,ID]` は「`[anim,add,overlay,I`」「`D]`」、`spec/web` の `x-ukagaka-link:type=homeurl&…` は「`link:type=home`」「`url&url=(エンコ`」で行が変わる

## 対比（タスク 3.5）

- 式: 幅 1000 の明・暗で、20 頁の名前と説明の表のすべての見出しの字（`th`）・名前の字（`td:first-child > strong`）・名前のリンク・説明の字・説明のリンクの、計算された色と地を取った。行の地は表から上へたどって重なる地を `--md-default-bg-color` の上に重ねた色、指したときの地は `--md-typeset-table-color--light`（明 `#00000009`、暗 `hsla(225deg,15%,95%,.035)`。行の地の変数は明 `#fff`、暗 `hsla(225deg,15%,14%,1)`）を行の地に重ねた色。字の色の透明度も地に重ねてから WCAG の式で比べた
- 頁・置き場所（一番外・注意書きの箱・注記の箱）によらず、色の組み合わせは明・暗それぞれ下の 2 つだけだった（箱の中の表の地も行の地と同じ）

| 表示 | 字 | 色 | 行の地 | 対比 | 指したときの地 | 対比 |
|---|---|---|---|---|---|---|
| 明 | 見出し・名前・説明の字 | `rgba(0,0,0,.87)` | `rgb(255,255,255)` | 16.07 | `rgb(246,246,246)` | 15.09 |
| 明 | 名前・説明のリンク | `rgb(31,78,140)` | `rgb(255,255,255)` | 8.31 | `rgb(246,246,246)` | 7.70 |
| 暗 | 見出し・名前・説明の字 | `rgba(226,228,233,.82)` | `rgb(30,33,41)` | 8.93 | `rgb(37,40,48)` | 8.26 |
| 暗 | 名前・説明のリンク | `rgb(143,180,232)` | `rgb(30,33,41)` | 7.56 | `rgb(37,40,48)` | 6.90 |

- すべて 4.5:1 以上（3.7・5.7）。色は Material の表とサイトのリンクの色のままで、この spec の塊に色の値は無い

### 色の値を足していないこと（3.10・6.3、タスク 4.1）

- `git -C <作業木> diff origin/main -- assets/extra.css` は、ファイルの末尾（`.filetree-file` の塊の後ろ）に 16 行を足すだけ。注は `/* site-look-definition-tables: 名前と説明の表 */` の 1 行（6.3）
- 足した指定は `font-size: .75rem`・`padding: .45em .9em`・`overflow-wrap: anywhere`・`@media screen and (min-width: 45em)` の中の `display: inline-block; width: max-content; max-width: 24em` だけで、色・地・枠の値も色の変数も無い。表の枠・地・字・リンクの色は Material の表の指定とサイトのリンクの色から来る（3.10）。足した色が無いので、記録する色と地の対比も無い

## 切り替えと印刷（タスク 3.5）

- 切り替え（3.8）: 明・暗それぞれで `spec/headline`・`list/sakura-script` を開き、ヘッダの明暗の切り替え（「ダークモードに切り替え」「ライトモードに切り替え」）を押して 0.6 秒後に測った。頁に置いた印の変数が残り、`navigation` の記録が 1 のまま（読み込み直しなし）で、表の見出しの字・欄の字・名前の字・リンク・`code`・枠・表の地がすべて切り替えた表示の色に変わった（明 → 暗: 字 `rgba(0,0,0,.87)` → `rgba(226,228,233,.82)`、地 `rgb(255,255,255)` → `rgb(30,33,41)`、リンク `rgb(31,78,140)` → `rgb(143,180,232)`。暗 → 明はその逆）
- 印刷（3.9）: 印刷の媒体（`Emulation.setEmulatedMedia {media:'print'}`）で、明るい表示と、暗い表示を選んだまま（`prefers-color-scheme: dark`、`data-md-color-scheme="slate"`）の `list/sakura-script`・`spec/headline` を比べた
  - 表の見出しの字・欄の字・名前の字 `rgba(0,0,0,.87)`、見出しの下の線 `rgba(0,0,0,.87)`、欄の線 `rgba(0,0,0,.12)`、表の地と頁の地 `rgb(255,255,255)`、`code` の `rgb(54,70,78)` / `rgb(245,245,245)` は、暗い表示のままでも明るい表示の印刷と同じ（暗い表示だけの色は出ない）
  - リンクの色だけが違う: 明るい表示の印刷 `rgb(31,78,140)`、暗い表示のままの印刷 `rgb(64,81,181)`（白に対して 6.85:1）。表の外のリンクも同じで、変更の前の控え（8010）の箇条書きのリンクも暗い表示のままの印刷で `rgb(64,81,181)` だった。この spec の変更でなく、サイトのリンクの色（`site-look-dark-link-color` の指定が印刷で当たらず Material の既定の色に戻る）による
  - 名前の折り返し: 印刷では名前の `strong` が `display: inline`・`max-width: none`（上限は `@media screen` の中だけ）で、`list/sakura-script` の 151 個の名前のうち 42 個が欄の幅で折り返す（画面の幅 1000 では 7 個）。`--content-type=…` は欄 291px の中で 3 行

## 検索の強調（タスク 3.5）

- `spec/headline/?h=headline` と `list/propertysystem/?h=name` を明・暗で開いた（4.2）。表の中の `mark` は `spec/headline` で説明の字・名前の字・名前のリンクの中に、`list/propertysystem` で名前の字の中にあり、どれも `visibility: visible`、大きさ 59×18・38×18 px
- `mark` の色は Material の既定のまま（表の外の `mark` と同じ指定）

| 表示 | `mark` の地 | 字の色 | 字と `mark` の地の対比 | `mark` の地と行の地の対比 |
|---|---|---|---|---|
| 明 | `rgba(255,255,0,.5)`（白に重ねて `rgb(255,255,128)`） | `rgba(0,0,0,.87)` | 15.37 | 1.06（黄の色相で見分ける） |
| 暗 | `rgba(66,135,255,.3)` | `rgba(226,228,233,.82)` | 6.08 | 1.55 |

- 語の選び: `?h=cpu` は `list/propertysystem` の見出しと段落の 2 個だけを強調し（名前の `system.cpu.name` は `cpu` の語に分かれない。控え（8010）も同じ 2 個）、表の中の語には `?h=headline`・`?h=name` を使った

## C16 の見立て（5.9、タスク 4.1）

`spec/shiori3` の 7 個の表を、build の HTML（`_site/spec/shiori3/index.html`）と画面（`after-shiori3-light/dark.png`、`#request`）で見た。

| 外側の項目（ヘッダ） | 行 | 値の名前 | 説明の欄にあるもの |
|---|---|---|---|
| `メソッド` | 2 | `GET`・`NOTIFY` | `<br />` の改行（`NOTIFY`） |
| `SenderType [SSP 2.5.05～拡張]` | 9 | `internal`〜`communicate` | `code`（`embed`・`raise`） |
| `SecurityLevel` | 2 | `local`・`external` | — |
| `Status [SSP拡張]` | 10 | `talking`〜`balloon(ID群)` | `code`（5 行）・`<br />` の改行（`opening(種類)`・`balloon(ID群)`） |
| `ステータスコード` | 6 | `200`〜`500` | `<br />` の改行（6 行とも） |
| `SecurityLevel [SSP拡張]`（response） | 2 | `local`・`external` | — |
| `ErrorLevel [SSP拡張]`（response） | 5 | `info`〜`critical` | — |

- 見立て: **C16 はこの 7 個の表で足りるとみなせる**（開発者が決める。roadmap のバックログの C16 を閉じる材料）
- 理由
  - C16 が解く差 D10（`site-look-plan` の `survey.md`）の当て先は、旧サイトの `dl.property` 7 個 ＝ ヘッダの取る値の一覧で、この spec の 7 個の表と同じ 7 か所・同じ中身（計 36 行）。値の名前は表の左の列に太字でそろい、説明が折り返しても名前の列は崩れない（D10 の「説明が折り返すと名前の列がそろわない」が解ける）
  - roadmap が C16 を保留にした確かめの残りは、この spec で済んでいる: 説明の中の `code`・`<br />` の改行のある行（`Status`・`SenderType`・`ステータスコード`）も列が崩れない（3.4 の画面）。明・暗の色と対比（3.5、どの表も同じ 2 組）、幅 375 で `spec/shiori3` も `scrollWidth` 375（3.5）。値の名前はどれも短く、24em で折り返す名前は無い
  - 頁を絞る印は要らない: 表は形だけで見分けて全頁に出るので、`spec/shiori3` だけの印を足す理由が無い
  - 旧サイトとの違いは見た目の細部だけ: 旧サイトは値の名前を右寄せの灰緑の欄、説明を 1 行おきに色の違う緑の欄にしていた。この表はサイトのほかの表と同じ Material の表（名前は左寄せの太字、縞の地は無い）。C16 の見込み（`grid` で 2 列に見せる）の目的は値の名前を縦に目で追えることで、表で満たされる
- 足りないもの（C16 の外）: ヘッダそのもの（`メソッド`・`Charset`・`Sender` など）は外側の箇条書きのままで、ヘッダの切れ目の帯（D11）は無い。`ValueNotify [SSP拡張 2.5.35]` の入れ子は表にならない箇条書きのまま（1.4）、`Reference*`・`Reference0`・`Reference1～` は `list/` の頁でないので 1 項目の箇条書きのまま（3.2 の外した形）。これらは C16 でなく D11 の話で、残すかどうかは別に決める

## PR の本文の材料（6.6、タスク 4.1）

PR の本文に写す。説明は brief の「続きの PR の説明」に従い、並びは PR を出すときの roadmap による。

### 何が変わるか
- `- **名前**: 説明` だけが並ぶ箇条書き（2 項目以上、各項目が 1 段落）と、`list/` の頁の `Reference0` などの箇条書き（1 項目でも）を、組み立ての処理（`scripts/prepare_site.py` の `tabulate()`）で「名前」「説明」の 2 列の表（`div.definition-table`）にする。原稿の書き方は変わらない
- 表は Material の表の見た目のまま、字を `.75rem`、行の上下を `.45em .9em` に詰める。幅 45em 以上では名前を 24em まで折り返さない（`assets/extra.css` の末尾の 1 塊。色の値は足していない）
- `list/` の頁の意味の無い空行（表が切れる元）を 7 原稿で直し、ukadoc-spec の `CLAUDE.md` の「書式」に空行の決まりを 1 項目足す

### 頁ごとの表の数（build の HTML、計 632 個・2287 行）
| 頁 | 名前と説明の表 / 行 | Reference の表 / 行 |
|---|---|---|
| `list/shiori-event/` | 217 / 892 | 83 / 88 |
| `list/shiori-event-ex/` | 124 / 552 | 62 / 84 |
| `spec/saori-ex/` | 45 / 177 | 0 / 0 |
| `list/sakura-script/` | 22 / 151 | 0 / 0 |
| `spec/sstp/` | 10 / 71 | 0 / 0 |
| `list/propertysystem/` | 9 / 56 | 0 / 0 |
| `list/plugin-event/` | 8 / 34 | 9 / 9 |
| `descript/shell/` | 7 / 23 | 0 / 0 |
| `spec/shiori3/` | 7 / 36 | 0 / 0 |
| `spec/headline/` | 5 / 15 | 0 / 0 |
| `descript/shell-surfaces/` | 4 / 20 | 0 / 0 |
| `list/shiori-resource/` | 4 / 18 | 1 / 1 |
| `spec/update-file/` | 4 / 9 | 0 / 0 |
| `descript/install/` | 3 / 17 | 0 / 0 |
| `descript/ghost/` | 2 / 6 | 0 / 0 |
| `spec/fmo-mutex/` | 2 / 15 | 0 / 0 |
| `descript/plugin/` | 1 / 6 | 0 / 0 |
| `dev/nar/` | 1 / 2 | 0 / 0 |
| `spec/plugin/` | 1 / 2 | 0 / 0 |
| `spec/web/` | 1 / 3 | 0 / 0 |
| 計 | 477 / 2105 | 155 / 182 |

- 置き場所: 一番外 612・注意書きの箱（`list/sakura-script`）6・注記の箱（`dev/nar`）1・箇条書きの項目の中 11（`spec/shiori3` 7 など）・表の中 2（`list/shiori-event` の `Reference*` の説明の欄の中）
- ほかの 20 頁（トップ・manual の 7 頁など）は表 0

### 表にしない形（今のままの箇条書き）
| 形 | 数 | 例 |
|---|---|---|
| `Reference` でない 1 項目 | 42 | `spec/shiori3` の `Charset`、`spec/sstp` の `Option`、`list/sakura-script` の `--title=テキスト` |
| `list/` の頁でない `Reference` | 3 | `spec/shiori3` の `Reference*`・`Reference0`・`Reference1～` |
| 2 つ以上の段落 | 8 | トップの `ファイル構成` など 6、`list/sakura-script` の `--dir=パス` |
| コードブロック | 4 | `list/propertysystem` の `%property[プロパティ名]`、`spec/update-file` の `行フォーマット` |
| 入れ子の箇条書き（外側） | 12 | `spec/shiori3` の `メソッド`（内側の値の一覧だけが表になる） |
| 名前の後ろが「`: `」でない | 11 + 1 | `spec/shiori3` の `メソッド`、`spec/saori-ex` の `必ず守ること（MUST）：` ほかの 5 項目 |
| manual の頁のファイルの箇条書き | 73 | `manual/ghost` の `descript.txt`・`shiori.dll` |

### 変わらないもの（変更の前の `f54423d` と比べた）
- 表の 2287 行の名前と説明の字と `href` は箇条書きのときと同じ（違い 0）。検索（`search.json`）でも同じ字で引ける
- 見出しの id 2579・¶ 2579・右の欄の目次 2041・`pre` 449、`site-look-list-markers` と `site-look-manual-files` の目印の数、`llms.txt` は同じ
- 意味のある空行（値ごとのまとまりの間、`list/shiori-event-ex` の `OnMahjong` など）27 か所はそのまま、別の表に分かれる

### 直した 7 原稿（`_raw/` で違うのはこれだけ。空行と字下げのほかの字は同じ）
- 意味の無い空行を除いた 6: `list/shiori-event/dialogbox/OnConfigurationDialogHelp.md`・`list/shiori-event/file-drop/OnOtherObjectDropping.md`・`list/shiori-event-ex/plugin-weather-station/OnWeatherStation.Astro.md`・`list/shiori-event-ex/plugin-weather-station/OnWeatherStation.Forecast.Hourly.md`・`list/shiori-event-ex/plugin-spectre/OnSpectrePlugin.Possession.md`・`list/shiori-event-ex/app-music-player/OnMusicPlayer.SongInfo.md`
- 入れ子に直した 1: `list/shiori-event/notify/rateofusegraph.md`（`1番目`〜`13番目` を `Reference*` の入れ子にし、`Reference*` の説明の欄の中の表にする）

### 開発者の判断（2026-10-26）
- 名前の欄の上限 24em: 広い画面で名前を折り返さない指定のままでは、名前のとても長い 2 個（`list/sakura-script` の `--content-type=…` の箱の表、`\![anim,add,overlay,…]` の表）で説明の欄が約 100px に潰れた。名前を 24em まで折り返さず、それより長い名前だけを折り返す形を開発者が採った（幅 1000 で 4 頁の 16 個の名前が 2 行になる。短い名前の表は変わらない）

### 確かめたこと（要約）
- Build Gate（`prepare_site.py`・`zensical build --strict`）が通る
- 明・暗の画面（`screenshots/after-*.png` の 30 枚）で、目標の画面と表の部分が同じ。箱の中・項目の中・表の中・長い名前の表も崩れない
- 幅 375 で表のある 20 頁と `manual/ghost` の横幅が 375 に収まる。字とリンクの対比は明・暗とも 4.5:1 以上。明暗の切り替え・印刷・検索の強調も表の中で効く
- 既知のこと（この PR の外）: 暗い表示を選んだまま印刷するとリンクが `rgb(64,81,181)` になる。表の外のリンクも変更の前から同じで、roadmap のバックログ「暗い表示のまま印刷したリンクの色（記録だけ）」に残っている

### 見せるときの頼み（5.11）
- 開発者に画面やプレビュー（`http://localhost:8000/ukadoc-spec/`）を見せるときは、古い `extra.css` が残らないよう、ブラウザで Ctrl+F5 の読み込み直しを頼む

## 引き継ぎ（タスク 4.2、2026-10-26）

- ukadoc-spec を fetch した。`origin/main` は `f54423d` のままで、3.1 の後に進んでいない。追いつきと 3.2〜3.5 のやり直しは要らなかった
- 作業木の最後のコミットは `c4768f5`（`origin/main` の上に 5 コミット）。未コミットの変更は無い。ブランチ `site-look-definition-tables` は追う先が無く、origin に push していない（PR とスクワッシュマージは `/kiro-complete` で行う）
- 最後のコミットで流し直した: `prepare_site.py` exit 0、`zensical build --strict` exit 0（No issues found）、build の HTML の `class="definition-table"` 632。規約 Gate（ukadoc-spec の `CLAUDE.md`）: 原稿の直しは空行と字下げだけ、コミットは履歴の型の日本語の 1 文
- `git diff --stat origin/main`: 10 ファイル（`CLAUDE.md`・`assets/extra.css`・`scripts/prepare_site.py`・直した 7 原稿）、124 行の追加と 54 行の削除。`requirements.txt`・`mkdocs.yml`・`.nav.yml`・`INDEX.md` は含まない
- プレビュー（8000）と変更の前の控えの配り（8010）を止め、控えの置き場（スクラッチの `baseline/`）を消した
- `/kiro-complete` でする事: `.kiro/steering/structure.md` の目印の名前の決まりに「どの頁の種類にも出る役は `<役>` だけの名前にする」を 1 文足す（設計の話し合いの議題 1。表の印 `definition-table`）
