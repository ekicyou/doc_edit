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
- 試作: 名前の欄の `strong`（唯一の子）を `display: inline-block; width: max-content; max-width: 24em` にする（`white-space: nowrap` は除く）。幅 1000 で、表が包みからはみ出す所 0、24em（387px）で折り返す名前は 5 頁の約 13 個（`list/sakura-script` 2 表・`list/shiori-event-ex` 4 表・`spec/saori-ex` 1・`spec/web` 1）、短い名前の表（`system.cpu` など）は変わらない
- 開発者が「上限 24em の試作を採る」と判断した（2026-10-26）。作業木の `c4768f5` でコミットし、`design.md` の CSS と「実装で決まったこと」に書いた

開発者に画面やプレビューを見せるときは、古い写しが残らないよう Ctrl+F5 での読み込み直しを頼む（5.11）。
