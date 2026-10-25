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

## 配り

## 対比

## 詰め

## ボタン

## 箱

## 着色の後の形

## 画面の見比べ

## 失わないもの
