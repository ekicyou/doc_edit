# 確かめの記録: site-look-definition-tables

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

## 測る版（タスク 3.1、2026-10-26）

- ukadoc-spec を fetch した。`origin/main` は `f54423d` のままで、作業木の分岐点から進んでいない。merge はせず、変更の前の控え（`f54423d`）もそのまま使う
- 測る版: 作業木 `site-look-definition-tables` の `fab1563`（`origin/main` `f54423d` の上に 4 コミット）。`origin/main` は作業木の先祖である
- Build Gate（2.5）: `prepare_site.py` exit 0、`zensical build --strict` exit 0（No issues found）。`git diff --stat origin/main` は 10 ファイル。build の HTML の `class="definition-table"` は 632

## 配り（タスク 3.2、2026-10-26）

- 作業木（`fab1563`）で `prepare_site.py`（exit 0）→ `zensical build --strict`（exit 0、`No issues found`）→ `zensical serve` の順に起動した（`http://localhost:8000/ukadoc-spec/`、`serve` の PID 13824・口を持つ子の PID 27520。3.3〜3.5 が使う）。控えの配り（8010、PID 20712）は動いたまま
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
