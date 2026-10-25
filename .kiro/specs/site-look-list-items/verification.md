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

### 測った版と測り方（4.3）
- 日付: 2026-10-25。作業木 `902a7f1` の `zensical serve`（`http://127.0.0.1:8000/ukadoc-spec/list/sakura-script/`）。幅 1000×高さ 700
- スクリプト: 控えの置き場の `contrast.mjs`（`node contrast.mjs http://127.0.0.1:8000/ukadoc-spec/`。Edge ヘッドレス + CDP、`overlap.mjs` の作りを写した）。結果の JSON はスクラッチに出し、下の表に写した
- ホバー: CDP の `Input.dispatchMouseEvent`（`mouseMoved`）で、要素を真ん中まで送った後、その最初の行の矩形の真ん中にポインタを本当に載せて測った。どの行も `:hover` が付いていた（フォーカスで代えた行は **0**）
- フォーカス: `Emulation.setFocusEmulationEnabled` を入れて `focus()` した。どの行も `:focus` が付いていた
- 移り変わり: 読む前に要素の `getAnimations()` が 0 になるのを待った（3 秒まで）。どの行も待つうちに終わり、使い捨ての `transition: none` は**足していない**
- 頁は Edge の新しい profile で開き、明（`default`）で始まった。暗はヘッダの切り替えを押して移った（読み込み直していない）

```js
// 地: 要素から html までの backgroundColor を、canvas の白の上に外（html）から順に重ねる。字が半透明なら、その地に重ねてから測る
const parse = (c) => { const m = c.match(/[\d.]+/g).map(Number); return { r: m[0], g: m[1], b: m[2], a: m.length > 3 ? m[3] : 1 }; };
const over = (f, b) => ({ r: f.r*f.a + b.r*(1-f.a), g: f.g*f.a + b.g*(1-f.a), b: f.b*f.a + b.b*(1-f.a), a: 1 });
const bgOf = (el) => { const chain = []; for (let e = el; e; e = e.parentElement) chain.push(getComputedStyle(e).backgroundColor); let c = { r: 255, g: 255, b: 255, a: 1 }; for (const s of chain.reverse()) c = over(parse(s), c); return c; };
// WCAG 2.x の相対輝度と対比（小数 2 桁。site-look-dark-link-color の式と同じ）
const lum = (c) => { const [r,g,b] = [c.r,c.g,c.b].map(v => { v/=255; return v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4); }); return 0.2126*r + 0.7152*g + 0.0722*b; };
const ratio = (a, b) => { const [x,y] = [lum(a), lum(b)].sort((p,q)=>q-p); return Math.round((x+0.05)/(y+0.05)*100)/100; };
const sample = (sel) => { const el = document.querySelector(sel); const bg = bgOf(el); const fg = over(parse(getComputedStyle(el).color), bg); return ratio(fg, bg); };
```

### 測る所と線（結果）
fg は `getComputedStyle` の `color`、bg は重ねた地（表は整数に丸めたが、対比は丸める前の値で出した）。半透明の字は、重ねた後の色を括弧に書いた。

| 測る所 | セレクタ | 表示 | 状態 | fg | bg | 対比 | 線 | 判定 |
|---|---|---|---|---|---|---|---|---|
| C01 項目名の字 | `#bang-lock-repaint` | 明 | ふだん | `rgba(0, 0, 0, 0.87)`（`rgb(31, 31, 31)`） | `rgb(237, 237, 237)` | 14.13 | 4.5（1.7） | 満たす |
| C01 項目名の字 | 同上 | 暗 | ふだん | `rgba(226, 228, 233, 0.82)`（`rgb(195, 197, 203)`） | `rgb(54, 56, 64)` | 6.76 | 4.5（1.7） | 満たす |
| C01 項目名のコードの字 | `#bang-lock-repaint code` | 明 | ふだん | `rgb(54, 70, 78)` | `rgb(237, 237, 237)` | 8.38 | 4.5（1.7） | 満たす |
| 同上 | 同上 | 暗 | ふだん | `rgba(213, 216, 226, 0.82)`（`rgb(184, 187, 197)`） | `rgb(54, 56, 64)` | 6.09 | 4.5（1.7） | 満たす |
| C01 帯の中のリンク | `#_b-x-y-2 a:not(.headerlink)`（「オプション」） | 明 | ふだん | `rgb(31, 78, 140)` | `rgb(237, 237, 237)` | 7.11 | 7（6.1） | 満たす |
| 同上 | 同上 | 明 | フォーカス | `rgb(82, 108, 254)` | `rgb(237, 237, 237)` | 3.64 | 3（6.2） | 満たす |
| 同上 | 同上 | 明 | ホバー（ポインタを載せた） | `rgb(82, 108, 254)` | `rgb(237, 237, 237)` | 3.64 | 3（6.2） | 満たす |
| 同上 | 同上 | 暗 | ふだん | `rgb(255, 255, 255)` | `rgb(54, 56, 64)` | 11.66 | 7（6.1・6.3） | 満たす |
| 同上 | 同上 | 暗 | フォーカス | `rgb(255, 255, 255)` | `rgb(54, 56, 64)` | 11.66 | 3（6.2） | 満たす |
| 同上 | 同上 | 暗 | ホバー（ポインタを載せた） | `rgb(255, 255, 255)` | `rgb(54, 56, 64)` | 11.66 | 3（6.2） | 満たす |
| 参考: PR #10 の色をそのまま帯に置いた場合 | — | 暗 | ふだん / ホバー | `#8fb4e8` / `#526cfe` | `rgb(54, 56, 64)` | 5.49 / 2.75（計算だけ） | 6.3 の判断の根拠 | — |
| 参考: 作業木の紺をそのまま帯に置いた場合 | — | 暗 | ふだん | `#1f4e8c` | `rgb(54, 56, 64)` | 1.41（計算だけ。設計の見込みは約 1.6） | 同上 | — |
| C03 分類の帯の字 | `.bundle-category`（最初の `#scope`「スコープコマンド」） | 明 | ふだん | `rgb(255, 255, 255)` | `rgb(31, 78, 140)` | 8.31 | 7（3.2） | 満たす |
| 同上 | 同上 | 暗 | ふだん | `rgb(255, 255, 255)` | `rgb(31, 78, 140)` | 8.31 | 7（3.2） | 満たす |
| C03 帯の中のコードの字 | `.bundle-category code` | 明・暗 | — | 頁の中に **0 個**（測る字が無い。指定は `inherit` で白） | — | （8.31） | 4.5（3.6） | 当たる所が無い |
| C03 ¶ | `.bundle-category .headerlink` | 明 | ふだん・フォーカス・ホバー | `rgba(255, 255, 255, 0.7)`（`rgb(188, 202, 221)`） | `rgb(31, 78, 140)` | 4.99（3 つとも） | 3（3.6） | 満たす |
| 同上 | 同上 | 暗 | ふだん・フォーカス・ホバー | 同上 | `rgb(31, 78, 140)` | 4.99（3 つとも） | 3（3.6） | 満たす |
| C18 見出しの帯の字 | `#bang-lock-repaint-記述例` | 明 | ふだん | `rgb(255, 255, 255)` | `rgb(22, 58, 105)` | 11.39 | 7（5.1） | 満たす |
| 同上 | 同上 | 暗 | ふだん | `rgb(255, 255, 255)` | `rgb(31, 78, 140)` | 8.31 | 7（5.1） | 満たす |
| C18 ¶ | `#bang-lock-repaint-記述例 .headerlink` | 明 | ふだん・フォーカス・ホバー | `rgba(255, 255, 255, 0.7)`（`rgb(185, 196, 210)`） | `rgb(22, 58, 105)` | 6.45（3 つとも） | 3（5.8） | 満たす |
| 同上 | 同上 | 暗 | ふだん・フォーカス・ホバー | `rgba(255, 255, 255, 0.7)`（`rgb(188, 202, 221)`） | `rgb(31, 78, 140)` | 4.99（3 つとも） | 3（5.8） | 満たす |
| C18 箱の中のコードの字 | `#bang-lock-repaint-記述例 + .highlight code` | 明 | ふだん | `rgb(54, 70, 78)` | `rgb(238, 242, 248)`（`#eef2f8`） | 8.72 | 4.5（5.6） | 満たす |
| 同上 | 同上 | 暗 | ふだん | `rgba(213, 216, 226, 0.82)`（`rgb(180, 184, 195)`） | `rgb(29, 36, 51)`（`#1d2433`） | 7.80 | 4.5（5.6） | 満たす |
| C18 暗い表示の箱の線 | `#bang-lock-repaint-記述例 + .highlight` の `border-left-color` | 暗 | — | `rgb(127, 166, 220)`（`#7fa6dc`） | 頁の地 `rgb(30, 33, 41)` / 箱の地 `rgb(29, 36, 51)` | 6.43 / 6.20 | 記録だけ（字でない。8.5） | — |
| 参考: 明るい表示の箱の線 | 同上 | 明 | — | `rgb(22, 58, 105)`（`--md-primary-fg-color--dark`） | 頁の地 `rgb(255, 255, 255)` / 箱の地 `rgb(238, 242, 248)` | 11.39 / 10.14 | 記録だけ | — |
| C03 の中の検索の強調 | `?h=スコープ` の `.bundle-category mark`（1 個） | 明 | — | `rgb(31, 78, 140)` | `rgb(255, 255, 255)` | 8.31 | 見えて読める（7.1） | 満たす |
| 同上 | 同上 | 暗 | — | `rgb(31, 78, 140)` | `rgb(255, 255, 255)` | 8.31 | 同上 | 満たす |
| C01 の中の検索の強調 | `?h=スコープ` の `.bundle-item mark`（7 個。最初はコードの字の中） | 明 / 暗 | — | `rgb(54, 70, 78)` / `rgba(213, 216, 226, 0.82)` | `rgb(246, 246, 119)` / `rgb(57, 80, 121)` | 8.58 / 4.41 | 見える（7.1。テーマの強調のまま） | 満たす |
| 同上 | `?h=記述例` の `.bundle-item mark`（1 個） | 明 / 暗 | — | `rgba(0, 0, 0, 0.87)` / `rgba(226, 228, 233, 0.82)` | `rgb(246, 246, 119)` / `rgb(57, 80, 121)` | 14.41 / 4.88 | 同上 | 満たす |
| C18 見出しの帯の中の検索の強調 | `?h=記述例` の `h4:has(+ .highlight) mark`（255 個） | 明 / 暗 | — | `rgb(31, 78, 140)` | `rgb(255, 255, 255)` | 8.31 / 8.31 | 見えて読める（7.1） | 満たす |
| C18 箱の中の検索の強調 | `?h=スコープ` の箱の `.highlight mark`（9 個） | 明 / 暗 | — | `rgb(54, 70, 78)` / `rgba(213, 216, 226, 0.82)` | `rgb(247, 249, 124)` / `rgb(40, 66, 112)` | 8.73 / 5.31 | 見える（7.1。テーマの強調のまま） | 満たす |

- 強調の数: `?h=スコープ` は頁の `article` の中に `mark` が 72 個（C03 の中 1・C01 の中 7・C18 の帯の中 0・箱の中 9）、`?h=記述例` は 256 個（C03 の中 0・C01 の中 1・C18 の帯の中 255・箱の中 0）。どちらの頁も、明で開いた後、読み込み直さずに暗に切り替えて測った
- 線に届かない所は **0**。色を選び直す要は無い

### 変数で出せない 4 つの色
| 色 | 使う所 | 相手 | 対比 |
|---|---|---|---|
| `#eef2f8` | 明るい表示の箱の地 | 箱の中のコードの字 `rgb(54, 70, 78)` / 頁の地 `#ffffff` | 8.72 / 1.12 |
| `#1d2433` | 暗い表示の箱の地 | 箱の中のコードの字（重ねて `rgb(180, 184, 195)`） / 頁の地 `#1e2129` | 7.80 / 1.04 |
| `#7fa6dc` | 暗い表示の箱の左の線 | 頁の地 `#1e2129` / 箱の地 `#1d2433` | 6.43 / 6.20 |
| `#ffffff` | 暗い表示の帯の中のリンク | 帯の地 `rgb(54, 56, 64)`（重ねた地） | 11.66（`rgb(54, 56, 64)` の整数で計算すると 11.69） |

### 切り替え（6.5）
頁を読み込み直さずに、ヘッダの `form[data-md-component=palette]` の見えている `label` の真ん中を押した（7 回。頁に置いた印 `window.__mark` が 7 回とも残っていたので、読み込み直していない）。`<body>` の `data-md-color-scheme` と、帯・箱の色が毎回切り替わった:

| 押した label | 前 → 後 | C01 帯の中のリンクの `color` | C18 見出しの帯の `background-color` | C18 箱の中のコードの `color` |
|---|---|---|---|---|
| 「ダークモードに切り替え」 | `default` → `slate` | `rgb(31, 78, 140)` → `rgb(255, 255, 255)` | `rgb(22, 58, 105)` → `rgb(31, 78, 140)` | `rgb(54, 70, 78)` → `rgba(213, 216, 226, 0.82)` |
| 「ライトモードに切り替え」 | `slate` → `default` | 逆向きに同じ値へ戻った | 同上 | 同上 |

### 画面だけ（6.6）
頁の見た目の指定の木（`document.styleSheets` のうち `assets/extra.css`）で、`CSSMediaRule` は 3 つ、どれも `media` が `screen` だった:
- `[data-md-color-scheme="slate"][data-md-color-primary="custom"]`（PR #10 の塊）
- `[data-md-color-scheme="slate"] .md-typeset .bundle-item a:not(.headerlink)`（C01 の帯の中のリンクの白）
- `[data-md-color-scheme="slate"] .md-typeset h4:has(+ .highlight)`（C18 の見出しの帯の地）と `[data-md-color-scheme="slate"] .md-typeset :is(h4, h4 + .highlight, h4 + .highlight + .highlight, h4 + .highlight + .highlight + .highlight) + .highlight`（C18 の箱の線と地）

`media` の外の規則に `data-md-color-scheme` を含むものは 0 個。暗い表示だけの 3 つの指定はすべて画面だけで、印刷では効かない。印刷の画面そのものは撮っていない（設計のとおり）

### 帯・箱の中のリンク（6.4）
2.2 と同じ `markers.py` をこの版の serve に流し直した（流す前の `markers.json` を写しておき、流した後と比べるとバイト単位で同じだった）。項目名の帯の中 **31 個**（`descript/balloon` 26・`list/sakura-script` 5、`code` を含むもの 0）・分類の帯の中 **0 個**・記述例の箱の中 **0 個**で、2.2 の数と同じ

- 注（レビューで足した）: テーマは ¶（`.headerlink`）をふだん `opacity: 0` にしているので、¶ の「ふだん」の行は見えていない字の `color` で出した数である。見えるのはホバー・フォーカスのときで、その行は `opacity: 1` まで待って測った。C01 の帯の中のリンクの明るい表示の 7.11 は、`getComputedStyle` が丸めた地のアルファ（.07）で出した数で、丸める前の地（237.0）では 7.10。どちらも 7:1 の線を満たす

## 詰め
- 4.4。日付 2026-10-25。作業木 `902a7f1` の `zensical serve`（`http://127.0.0.1:8000/ukadoc-spec/descript/ghost/`）。幅 1000×高さ 700、明
- スクリプト: 控えの置き場の `layout.mjs`（`node layout.mjs gap <url> [width] [height]`。Edge ヘッドレス + CDP、`overlap.mjs` の作りを写した）。`#charset` の置き方は `shot.mjs` と同じ（読み込みの後 2 秒待ち、`#charset` の上を「ヘッダの高さ + 8px」にスクロールし、1.5 秒待つ）
- ヘッダの高さ 48px、スクロール 1007px、`#charset` の上は画面の 56.0px
- `#charset` から 4 項目目は `craftman`（`charset`・`name`・`type`・`craftman`）。その終わり（次の `hr` の上。`hr` の次は `craftmanw`）は画面の **679.9px** で、高さ 700 の中にある（設計の写しでは 680px）

## ボタン
- 4.4。作業木 `902a7f1` の `serve` の `list/sakura-script/`。1.2 の `overlap.mjs` をそのまま使った（`node overlap.mjs <url> <width> 700`。空白でない字だけを数える定義のまま）

| 幅 | `pre > code` | ボタン | 重なるブロック（変更の前、1.2） | 重なるブロック（変更の後） |
|---|---|---|---|---|
| 1000 | 288 | 288 | 172 | **0** |
| 375 | 288 | 288 | （測っていない） | **0** |

- 参考に幅 375×高さ 812 でも 0

## 箱
- 4.4。作業木 `902a7f1` の `serve`。幅 1000×高さ 700、明。スクリプト: 控えの置き場の `layout.mjs`（`node layout.mjs box <基の url> <頁>...`）
- 数え方: 頁の `.highlight` のうち、別の `.highlight` の中に無いものを順に見る。前の要素を `.highlight` でないものまでたどり、その要素（連なりの頭）と、連なりの中の順番（1 起点）を出す。`getComputedStyle` の `border-left-width` が 0 でなく `border-left-style` が `none` でないものを「箱（左の線）」、`border-top-style` が `dashed` のものを「点線」とする。食い違いは「左の線がある ≠ 頭が `h4`」か「点線がある ≠ 頭が `h4` で順番が 2 以上」の `.highlight` の数
- サイトの全頁（`_site/` の `index.html` の 40 頁。頭の頁を含む）を走査した。`.highlight` 449・箱 325・点線 **36**・食い違い **0**。箱の 325 から点線の 36 を引いた 289 は、設計の記述例の見出しの数 289 と同じ

設計の 9 頁:

| 頁 | `.highlight` | 箱（左の線） | 点線 | 食い違い |
|---|---|---|---|---|
| `list/sakura-script` | 288 | 288 | 33 | 0 |
| `spec/plugin` | 4 | 0 | 0 | 0 |
| `spec/sstp` | 18 | 3 | 0 | 0 |
| `descript/shell-surfaces` | 21 | 2 | 0 | 0 |
| `spec/dll` | 4 | 2 | 0 | 0 |
| `spec/saori-ex` | 27 | 21 | 3 | 0 |
| `list/propertysystem` | 5 | 2 | 0 | 0 |
| `descript/install` | 10 | 2 | 0 | 0 |
| `manual/ghost` | 1 | 0 | 0 | 0 |

- 9 頁の外で箱がある頁: `descript/balloon`・`descript/ghost`・`descript/headline`・`descript/plugin`・`descript/shell` が各 1（点線 0、食い違い 0）。ほかの 26 頁は箱 0・食い違い 0（その 26 頁の `.highlight` 66 個は、どれも頭が `h4` でなく、左の線も点線も無い）。点線は 9 頁の外に 0

### 区切りの線
- 1.2 の `snapshot.py` を作業木 `902a7f1` の `serve` に流し直した（出力はスクラッチ）。`before.json` と**バイト単位で同じ**で、20 頁の `<hr />` は **1921**（1.2 の控えと同じ）

- 明るい表示だけで測った。暗い表示（`[data-md-color-scheme="slate"]`）で変わる指定は `@media screen` の中の地と線の色だけで、余白・線の幅・線の型・当て先は明・暗で同じなので、詰め・箱の有無・点線は明で足りる（レビューで足した）

## 着色の後の形
- 4.5（4.3・5.7）。作業木 `902a7f1` の `mkdocs.yml` は変えていない
- 写しの作り方: `git -C .worktrees/site-look-visibility archive HEAD` をスクラッチの下の新しい空のフォルダ `shape-copy/` に展開し、写しの `mkdocs.yml` の `markdown_extensions` の `pymdownx.superfences` の前に次の 2 行を足した

```yaml
  - pymdownx.highlight:
      use_pygments: false
```

- 写しの中で doc_edit の `.venv` の `python scripts/prepare_site.py`（exit 0）と `zensical build --strict`（exit 0、「No issues found」）を流し、`zensical serve -a 127.0.0.1:8010` で配った。比べた相手は作業木の `serve`（8000）
- 写しの `_site/list/sakura-script/index.html` は `<pre class="highlight">` が 288（`<code class="language-sakurascript">` 287・`<code>` 1）、`<div class="highlight">` が 0。作業木の `_site/` は `<div class="highlight">` が 288
- スクリプトは控えの置き場のもの。`layout.mjs` の箱の判定は `.highlight` を見て、`div.highlight` にも `pre.highlight` にも当たる（下の表で両方の形の数が出ている）。`box` の出力に、外側の `.highlight` の要素の名前ごとの数（`tags`）と、箱ごとの上端（頁の上から）と高さ（`rects`、px に丸めた）を足した。`contrast.mjs` の箱の中のコードの字は `[id="bang-lock-repaint-記述例"] + .highlight code`、`overlap.mjs` は `pre > code` なので、どちらも両方の形に当たる

| 測るもの | スクリプト | 作業木（8000、`div.highlight > pre > code`） | 写し（8010、`pre.highlight > code`） | 同じか |
|---|---|---|---|---|
| 外側の `.highlight` の要素 | `layout.mjs box`（幅 1000） | `DIV` 288 | `PRE` 288 | 形だけが違う（狙いどおり） |
| 箱（左の線） | 同上 | 288 | 288 | 同じ |
| 点線 | 同上 | 33 | 33 | 同じ |
| 食い違い | 同上 | 0 | 0 | 同じ |
| 箱の上端と高さ（288 組） | 同上 | — | — | **全組が同じ**（`rects` を書き出した 2 つのファイルが `cmp` で同じ。例: 1 つ目 1226・59、3 つ目 1843・40） |
| C18 箱の中のコードの字（明） | `contrast.mjs` | `rgb(54, 70, 78)` / `rgb(238, 242, 248)` **8.72** | 同じ **8.72** | 同じ |
| C18 箱の中のコードの字（暗） | 同上 | `rgb(180, 184, 195)` / `rgb(29, 36, 51)` **7.80** | 同じ **7.80** | 同じ |
| `contrast.mjs` のほかの行（帯・¶・リンク・箱の線・検索の強調・画面だけ） | 同上 | — | — | 全行が同じ（URL の口の番号を除いて比べた） |
| ボタンの重なり（幅 1000） | `overlap.mjs` | `pre > code` 288・ボタン 288・重なり **0** | 288・288・**0** | 同じ |
| ボタンの重なり（幅 375） | 同上 | 288・288・**0** | 288・288・**0** | 同じ |

- 折り返し: 箱の高さが 288 組すべて同じなので、幅 1000 で箱の中の行の折り返しは同じ。幅 375 は重なり 0 で見た
- 画面: `shot.mjs` で `list/sakura-script/` の `#bang-lock-repaint` を、写しと作業木の明・暗で撮った（スクラッチに置き、spec の `screenshots/` には置いていない）。4 枚のうち 2 枚（写しの明・作業木の暗）に二重に重なった跡が出たので撮り直した。並べて目で見て、帯・箱の線と地・コードの字の色・折り返しの位置・コピーのボタンの位置に違いは無かった
- 片付け: 8010 の配りを止めた（`curl` が繋がらない・`netstat` に 8010 の LISTEN が無い）。写しのフォルダ `shape-copy/` を消し、無いことを `ls` で確かめた。作業木の `git status` は空のまま。8000 の `serve` は止めていない

## 画面の見比べ

## 失わないもの
