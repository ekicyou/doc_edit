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
