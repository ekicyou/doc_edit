# 確かめの記録: site-look-list-items

## 変更の前

### 測った版と日付
- 日付: 2026-10-25
- 作業木: `.worktrees/site-look-visibility/`（ブランチ `site-look-visibility`）。HEAD は `a341420`（= `origin/main`、PR #10 のマージの後）。原稿・`scripts/`・`assets/` には触れていない
- 頁: 作業木の `zensical serve`（`http://127.0.0.1:8000/ukadoc-spec/…`）。`prepare_site.py` と `zensical build --strict` は exit 0（1.1）
- 控えの置き場: doc_edit の `.worktrees/_baseline-site-look-list-items/`（git に載らない。spec の完了まで残す）

| ファイル | 中身 |
|---|---|
| `snapshot.py` | 控えを出したスクリプト。`python snapshot.py <作業木> <serve の基の URL か _site> <出力.json>` |
| `before.json` | まとめ頁 20 頁の、見出しの id の並び・`class="headerlink"` の数・`class="md-nav__link"` の数・`<hr />` の数と、`_raw/` のファイルごとの SHA-256 |
| `overlap.mjs` | コピーのボタンの重なりを数えたスクリプト。`node overlap.mjs <url> [width] [height]`（Edge ヘッドレス + CDP、`shot.mjs` の作りを写した） |
| `before-overlap-1000.json` / `before-overlap-1024.json` | `list/sakura-script/` の重なりの数と、重なるブロックの順番（0 起点） |

### 見出しの id・¶・目次・区切りの線
- 20 頁の一覧は `prepare_site.py` の `page_dirs()`（`BUNDLE_DIRS` = `descript`・`list`・`spec`）から出した
- 数えたのは serve の HTML。作業木の `_site/` から出した控えとバイト単位で同じだった
- 見出しの id は `<h1>`〜`<h6>` の `id` を頁の頭から並べたもの。ほかの 3 つは頁の HTML の中の数
- 20 頁の見出しの id の数の合計: **2440**（`headerlink` の合計も 2440、`md-nav__link` 4932、`<hr />` 1921）

| 頁 | 見出しの id | `headerlink` | `md-nav__link` | `<hr />` |
|---|---|---|---|---|
| `descript/balloon` | 178 | 178 | 402 | 171 |
| `descript/ghost` | 83 | 83 | 212 | 76 |
| `descript/headline` | 14 | 14 | 76 | 10 |
| `descript/install` | 39 | 39 | 110 | 21 |
| `descript/plugin` | 18 | 18 | 84 | 14 |
| `descript/shell` | 112 | 112 | 264 | 103 |
| `descript/shell-surfaces` | 192 | 192 | 182 | 154 |
| `descript/shell-surfacetable` | 11 | 11 | 74 | 6 |
| `list/plugin-event` | 21 | 21 | 94 | 19 |
| `list/propertysystem` | 206 | 206 | 380 | 196 |
| `list/sakura-script` | 649 | 649 | 830 | 374 |
| `list/shiori-event` | 360 | 360 | 772 | 328 |
| `list/shiori-event-ex` | 229 | 229 | 480 | 213 |
| `list/shiori-resource` | 170 | 170 | 392 | 162 |
| `spec/fmo-mutex` | 8 | 8 | 68 | 3 |
| `spec/saori-ex` | 87 | 87 | 190 | 51 |
| `spec/shiori3` | 7 | 7 | 66 | 3 |
| `spec/sstp` | 43 | 43 | 126 | 10 |
| `spec/update-file` | 9 | 9 | 70 | 5 |
| `spec/web` | 4 | 4 | 60 | 2 |

### 生の原稿 `_raw/`
- 作業木の `_raw/` の 2049 ファイルの SHA-256 を、相対パスごとに `before.json` の `raw` に控えた（中身の写しは取っていない。ハッシュが同じなら中身も同じ）
- 変更の後は、同じ `snapshot.py` で `after.json` を出し、`before.json` と比べる（`pages` と `raw` がどちらも同じなら変わっていない）

### コピーのボタンの重なり
- `list/sakura-script/` のコードブロック（`pre > code`）は 288 個、コピーのボタン `.md-code__nav` も 288 個
- 数え方: テーマの JavaScript がボタンを置き終えるのを待ち（ボタンの数が 2 回続けて同じになるまで 0.5 秒おきに見る）、各 `pre > code` の空白でない字を Range で 1 字ずつ取り、その矩形がボタンの矩形と重なるブロックを数えた
- 幅 1000: **172 個**が重なる
- 設計の写しの 165 は、`research.md` によれば幅 1024 で測った数である。同じ幅 1024 で数えると 164 個だった（写しは内蔵ブラウザの枠で測ったので、物差しの差で 1 個ずれたとみる）。参考に幅 985 では 179 個、1015 では 169 個
- 変更の後の線は幅 1000・375 で 0 個（4.4）

### 画面
`screenshots/` に 2 枚を置いた（`shot.mjs`、幅 1000×700）。

| 画面 | 位置 | 表示 |
|---|---|---|
| `before-manual-ghost-light.png` | `manual/ghost` の `h1#ゴースト` | 明 |
| `before-manual-ghost-dark.png` | 同上 | 暗 |

- どちらも `scrollWidth: 1000`・`innerWidth: 1000`
- 2 枚とも、上の端以外の左右の端にヘッダの紺の行は無く、撮り直しは 0 枚だった

## 目印

### 数えた版と数え方
- 日付: 2026-10-25。作業木の HEAD は `f8082c2`（2.1）。頁は、2.1 の後の build で起動し直した作業木の `zensical serve`（`http://127.0.0.1:8000/ukadoc-spec/…`）の HTML
- スクリプト: 控えの置き場の `markers.py`（`python markers.py <作業木> <serve の基の URL>`。結果は同じ置き場の `markers.json`）。標準の `html.parser` で頁を木にして数えた
- 期待の数は `prepare_site.py` の単位（`collect()`・`unit_body()`・`fence_free_headings()`・`register_bundle()` の id）から出した。class を付ける `shift_headings()` は使っていない。段は「単位の最初の見出しの段 + 深さ − 1」、役は頁の頭（深さ 1）・`notes_` の単位・`index.md` の単位（分類）・それ以外（項目）で分けた
- 突き合わせは数だけでなく単位ごとに行った: 20 頁の `article` の中の見出しすべてについて、単位の頭の id を持つ見出しは期待の役の class と段を、それ以外の見出し（単位の中の節・記述例の見出し）は class が無いことを見た。食い違いは **0 個**

### 頁ごと・段ごとの数

| 頁 | 項目 `h2` | 項目 `h3` | 項目 `h4` | 分類 `h2` | 分類 `h3` | 注意書き | 頁の頭 | 単位 |
|---|---|---|---|---|---|---|---|---|
| `descript/balloon` | 0 | 171 | 0 | 3 | 0 | 0 | 1 | 175 |
| `descript/ghost` | 0 | 77 | 0 | 2 | 0 | 0 | 1 | 80 |
| `descript/headline` | 0 | 10 | 0 | 1 | 0 | 0 | 1 | 12 |
| `descript/install` | 1 | 21 | 0 | 4 | 0 | 0 | 1 | 27 |
| `descript/plugin` | 0 | 14 | 0 | 1 | 0 | 0 | 1 | 16 |
| `descript/shell` | 0 | 104 | 0 | 1 | 0 | 0 | 1 | 106 |
| `descript/shell-surfaces` | 1 | 51 | 102 | 6 | 3 | 0 | 1 | 164 |
| `descript/shell-surfacetable` | 1 | 6 | 0 | 1 | 0 | 0 | 1 | 9 |
| `list/plugin-event` | 0 | 19 | 0 | 1 | 0 | 0 | 1 | 21 |
| `list/propertysystem` | 0 | 160 | 35 | 1 | 2 | 2 | 1 | 201 |
| `list/sakura-script` | 0 | 361 | 0 | 13 | 0 | 14 | 1 | 389 |
| `list/shiori-event` | 1 | 328 | 0 | 28 | 0 | 0 | 1 | 358 |
| `list/shiori-event-ex` | 3 | 175 | 0 | 34 | 0 | 0 | 1 | 213 |
| `list/shiori-resource` | 2 | 160 | 0 | 7 | 0 | 0 | 1 | 170 |
| `spec/fmo-mutex` | 4 | 0 | 0 | 0 | 0 | 0 | 1 | 5 |
| `spec/saori-ex` | 7 | 37 | 0 | 8 | 0 | 0 | 1 | 53 |
| `spec/shiori3` | 4 | 0 | 0 | 0 | 0 | 0 | 1 | 5 |
| `spec/sstp` | 11 | 0 | 0 | 0 | 0 | 0 | 1 | 12 |
| `spec/update-file` | 6 | 0 | 0 | 0 | 0 | 0 | 1 | 7 |
| `spec/web` | 3 | 0 | 0 | 0 | 0 | 0 | 1 | 4 |
| 計 | 44 | 1694 | 137 | 111 | 5 | 16 | 20 | 2027 |

- 項目・分類の列は HTML の `class="bundle-item"`・`class="bundle-category"` の数で、どの頁のどの段も、単位から出した期待の数と同じだった
- 単位の数との突き合わせ: 項目 **1875**（`h2` 44・`h3` 1694・`h4` 137）、分類 **116**（`h2` 111・`h3` 5）、注意書き **16**、頁の頭 **20**、合わせて 2027 単位。設計の写しの数とすべて同じ
- 注意書き・頁の頭の列は単位の数（class を付けない単位）

### 付けないもの・漏れ
- `notes_` の id の見出し: 20 頁で 16 個（`list/propertysystem` 2・`list/sakura-script` 14）。class のあるものは **0 個**
- 読み物の頁: `_site/` の HTML の頁のうち 20 頁を除く 21 頁（トップ・`404.html`・`manual/` 8・`dev/` 6・`memo/` 2・`spec/` の 1 ファイルの頁 3）を serve から取って、`bundle-item`・`bundle-category` の class を持つ要素は **0 個**
- 漏れ: `pre`・`code`（と `script`・`style`）の外の字の `{: `・`{#` は、20 頁の `article` の中で **0 個**、読み物の 21 頁の頁全体で **0 個**
- 数え方の自己確認: `pre`・`code` の中の `{#` を数えず外の `{: `・`{#` を数えること、¶ を帯の中のリンクに数えないことを、小さな HTML で確かめた

### 帯・箱の中のリンク（6.4。4.3 でも使う）
- ¶（`class="headerlink"`）を除いた `a` を数えた
- 項目名の帯の中: **31 個**（`descript/balloon` 26・`list/sakura-script` 5）。`code` を含むもの **0 個**
- 分類の帯の中: **0 個**
- 記述例の箱の中: **0 個**。箱は、`h4` の直後の兄弟が `.highlight` のときの、その `h4` と続く `.highlight` の連なり（4 つまで）とした。そうした `h4` は 20 頁で 287 個（`list/sakura-script` 255・`spec/saori-ex` 18・`spec/sstp` 3・`descript/install`・`descript/shell-surfaces`・`list/propertysystem` 各 2・ほかの 5 頁 各 1）
  - 設計の「記述例の見出し 289 個」は全サイトの数で、この 287 個に読み物の頁 `spec/dll` の 2 個（load関数・unload関数）を足したもの（`research.md` の「設計の調査」）。`spec/dll` の 2 つの箱の中のリンクも 0 個（レビューで測った）

### 変わらないこと（7.2・9.4）
- 1.2 と同じ `snapshot.py` で、serve から `after.json` を出した（控えの置き場）。`before.json` と**バイト単位で同じ**だった
- つまり 20 頁の見出しの id の並び（合計 2440）・`headerlink`（2440）・`md-nav__link`（4932）・`<hr />`（1921）の数と、`_raw/` の 2049 ファイルの SHA-256 が、変更の前とすべて同じ

## 測る版（4.1）
- 2026-10-25 に ukadoc-spec を fetch した。`origin/main` は `a341420` のままで、作業木の分岐点から進んでいない。merge は要らず、Build Gate（3.3）も数え方（2.2）もやり直さない
- 4.2〜4.6 は作業木の `902a7f1`（2.1 `f8082c2`・3.1 `2356d5d`・3.2 `902a7f1`）で測る。`origin/main`（`a341420`）は作業木の先祖
- Build Gate: この版で `prepare_site.py` exit 0・`zensical build --strict` exit 0（No issues found）。`git diff --stat origin/main` は `assets/extra.css`（+89）と `scripts/prepare_site.py`（+9 −4）だけ

## 配り
- 4.2: serve を止めて `prepare_site.py` → `build --strict` → `zensical serve` で起動し直した。配られた `http://127.0.0.1:8000/ukadoc-spec/assets/extra.css` は 200 で、`site-look-list-items:` の見出しのコメントが 6 つ（項目名の帯・項目の間の詰め・分類の見出しの帯・記述例の箱・濃い帯の中の ¶ と検索の強調・コピーのボタンの手前で折り返す）ある

## 対比

## 詰め

## ボタン

## 箱

## 着色の後の形

## 画面の見比べ

## 失わないもの
