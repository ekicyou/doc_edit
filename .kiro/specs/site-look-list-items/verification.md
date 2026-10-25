# 確かめの記録: site-look-list-items

## 測った版と日付
- 日付: 2026-10-25
- 作業木: `.worktrees/site-look-visibility/`（ブランチ `site-look-visibility`。ukadoc-spec の作業木）
  - `f8082c2` まとめた頁の分類と項目の頭の見出しに役の class を付ける（2.1）
  - `2356d5d`（3.1）・`902a7f1`（3.2）`assets/extra.css` の 6 つの塊
  - 4.2〜4.6 と 5.1 の Build Gate は `902a7f1` で測った。2.2 は `f8082c2` で数え、`902a7f1` でも同じ数だった（「対比」の節の「帯・箱の中のリンク」と「区切りの線」）
- `origin/main`: `a341420`（PR #10 のマージの後）。変更の前の控えと画面は、この版をそのまま配って撮った。`902a7f1` の先祖で、4.1 の後も進んでいない
- 頁: 作業木の `zensical serve`（`http://127.0.0.1:8000/ukadoc-spec/…`）。4.5 の写しだけ 8010
- 測りのブラウザ: Edge ヘッドレス + CDP（`shot.mjs` と、その作りを写した控えの置き場のスクリプト）

## 流した式
```sh
# Build Gate（作業木 .worktrees/site-look-visibility/ の中で）
../../.venv/Scripts/python scripts/prepare_site.py
../../.venv/Scripts/zensical build --strict
git -C .worktrees/site-look-visibility diff --stat origin/main   # doc_edit のルートから

# 測り（控えの置き場 .worktrees/_baseline-site-look-list-items/ の中で。WT = ../site-look-visibility、B = http://127.0.0.1:8000/ukadoc-spec）
../../.venv/Scripts/python snapshot.py ../site-look-visibility http://127.0.0.1:8000/ukadoc-spec after.json   # 変更の前の控えは before.json（1.2）。after.json を before.json と cmp で比べる
../../.venv/Scripts/python markers.py ../site-look-visibility http://127.0.0.1:8000/ukadoc-spec              # 結果は markers.json（素の python には markdown が無く止まる）
node overlap.mjs http://127.0.0.1:8000/ukadoc-spec/list/sakura-script/ 1000 700          # 幅 1024・375（高さ 700・812）も同じ形
node contrast.mjs http://127.0.0.1:8000/ukadoc-spec/ 1000 700                             # JSON を標準出力へ
node layout.mjs gap http://127.0.0.1:8000/ukadoc-spec/descript/ghost/ 1000 700
node layout.mjs box http://127.0.0.1:8000/ukadoc-spec/ list/sakura-script spec/plugin spec/sstp descript/shell-surfaces spec/dll spec/saori-ex list/propertysystem descript/install manual/ghost   # 全頁のときは _site/ の index.html の 40 頁のディレクトリを並べる（頭の頁は空の引数 ""）
node ../../.kiro/specs/completed/site-look-plan/tools/shot.mjs <url> <selector> <out|-> <light|dark> [width=1000] [height=700]
```

対比の式（`contrast.mjs` の中の式そのまま。頁の中で流した）:

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

- 重ね: 色 f（アルファ a）を地 b に重ねた色は `f×a + b×(1−a)`（R・G・B ごと）。地は html から要素まで外から順に重ね、字は重ねた地にさらに重ねてから輝度を出す。丸めは対比の最後の小数 2 桁だけ

## 変更の前

### 測った版と日付
- 日付: 2026-10-25
- 作業木: `.worktrees/site-look-visibility/`（ブランチ `site-look-visibility`）。HEAD は `a341420`（= `origin/main`、PR #10 のマージの後）。原稿・`scripts/`・`assets/` には触れていない
- 頁: 作業木の `zensical serve`（`http://127.0.0.1:8000/ukadoc-spec/…`）。`prepare_site.py` と `zensical build --strict` は exit 0（1.1）
- 控えの置き場: doc_edit の `.worktrees/_baseline-site-look-list-items/`（git に載らない。spec の完了まで残す）

| ファイル | 中身 |
|---|---|
| `snapshot.py` | 控えを出したスクリプト。`../../.venv/Scripts/python snapshot.py <作業木> <serve の基の URL か _site> <出力.json>` |
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
- スクリプト: 控えの置き場の `markers.py`（`../../.venv/Scripts/python markers.py <作業木> <serve の基の URL>`。結果は同じ置き場の `markers.json`）。標準の `html.parser` で頁を木にして数えた
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
- 5.1 で Build Gate を流し直した後にも、同じ URL が 200 で、`site-look-list-items:` は 6 つだった（`curl`）

## 対比

### 測った版と測り方（4.3）
- 日付: 2026-10-25。作業木 `902a7f1` の `zensical serve`（`http://127.0.0.1:8000/ukadoc-spec/list/sakura-script/`）。幅 1000×高さ 700
- スクリプト: 控えの置き場の `contrast.mjs`（`node contrast.mjs http://127.0.0.1:8000/ukadoc-spec/`。Edge ヘッドレス + CDP、`overlap.mjs` の作りを写した）。結果の JSON はスクラッチに出し、下の表に写した
- ホバー: CDP の `Input.dispatchMouseEvent`（`mouseMoved`）で、要素を真ん中まで送った後、その最初の行の矩形の真ん中にポインタを本当に載せて測った。どの行も `:hover` が付いていた（フォーカスで代えた行は **0**）
- フォーカス: `Emulation.setFocusEmulationEnabled` を入れて `focus()` した。どの行も `:focus` が付いていた
- 移り変わり: 読む前に要素の `getAnimations()` が 0 になるのを待った（3 秒まで）。どの行も待つうちに終わり、使い捨ての `transition: none` は**足していない**
- 頁は Edge の新しい profile で開き、明（`default`）で始まった。暗はヘッダの切り替えを押して移った（読み込み直していない）
- 式は頭の「流した式」のとおり

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

- 変数で出せない 4 つの色は、下の「変数で出せない 4 つの色」の節にまとめた

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

## 変数で出せない 4 つの色（8.5）
テーマの色の変数で出せない色は次の 4 つだけ（設計の「見た目の指定」の State Management）。対比は 4.3 の `contrast.mjs` の数（作業木 `902a7f1`）を引いた。どの色も、もう一方の表示では使わない。

| 色 | 表示 | 使う所 | 相手 | 対比 | 線 |
|---|---|---|---|---|---|
| `#eef2f8` | 明 | 記述例の箱の地 | 箱の中のコードの字 `rgb(54, 70, 78)` | 8.72 | 4.5（5.6） |
| 同上 | 明 | 同上 | 頁の地 `#ffffff` | 1.12 | 記録だけ（地どうし） |
| `#1d2433` | 暗 | 記述例の箱の地 | 箱の中のコードの字 `rgba(213, 216, 226, 0.82)`（重ねて `rgb(180, 184, 195)`） | 7.80（重ねた色を整数に丸めて計算すると 7.83） | 4.5（5.6） |
| 同上 | 暗 | 同上 | 頁の地 `#1e2129` | 1.04 | 記録だけ（地どうし） |
| `#7fa6dc` | 暗 | 記述例の箱の左の線 | 頁の地 `#1e2129` / 箱の地 `#1d2433` | 6.43 / 6.20 | 記録だけ（字でない） |
| `#ffffff` | 暗 | 項目名の帯の中のリンク（ふだん・ホバー・フォーカス） | 帯の地 `rgb(54, 56, 64)`（重ねた地） | 11.66（地を整数に丸めて計算すると 11.69） | 7（6.1）・3（6.2） |

- 明るい表示の箱の線は変数（`--md-primary-fg-color--dark` = `rgb(22, 58, 105)`）で、頁の地 11.39・箱の地 10.14（「対比」の表の参考の行）

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
- 4.6。日付 2026-10-25。作業木 `902a7f1` の `zensical serve`（`http://127.0.0.1:8000/ukadoc-spec/…`）。`shot.mjs` の既定の 1000×700（`node shot.mjs <url> <selector> <out> <light|dark>`）
- 撮り直し: **0 枚**。10 枚とも Read で見て、上の端のほかの左右の端にヘッダの紺の行（二重に重なった跡）は無かった。明るい表示の画面の右の端（x 985〜1000）の白い縦の帯はスクロールバーの所で、目標の画面にも同じ帯がある。`after-sakura-script-notes-*` はヘッダの題（「UKADOC project」と「SAKURA Script」）が重なっているが、本文に響かないので撮り直していない（設計の Error Handling のとおり）

### 画面の一覧（`screenshots/`）
| 画面 | 頁 | 位置 | 見比べた目標の画面 |
|---|---|---|---|
| `after-sakura-script-{light,dark}.png` | `list/sakura-script/` | `#bang-lock-repaint` | `mock-sakura-script-C01-*`・`C09-*`・`C18-*` |
| `after-sakura-script-notes-{light,dark}.png` | `list/sakura-script/` | `#notes_escape` | `mock-sakura-script-C03-*` |
| `after-descript-ghost-{light,dark}.png` | `descript/ghost/` | `#charset` | `mock-descript-ghost-C02-*` |
| `after-propertysystem-{light,dark}.png` | `list/propertysystem/` | `[id="currentghost.seriko.cursor.scope-ID-.mouse-q-q-q-q-list-.path"]` | `mock-propertysystem-C25-*`（箱の部分） |
| `after-manual-ghost-{light,dark}.png` | `manual/ghost/` | `h1#ゴースト` | `before-manual-ghost-{light,dark}.png`（1.2、`a341420`） |

目標の画面は `.kiro/specs/completed/site-look-plan/screenshots/`。目標の画面に入っているほかの候補（C18・C25 の着色、C18 の「対応:」の札など）は比べていない。

### 5 つの候補（明・暗）
| 候補 | 同じ所 | 違う所 |
|---|---|---|
| C01 項目名の帯 | 左の太い線（紺）・下の細い線・薄い灰の地・帯の中のコードの地が無いこと・字の大きさと書体・帯の幅（本文の幅いっぱい）。暗い表示の帯の地と線も同じ | 帯の上下の余白と、帯から本文・「対応:」・記述例までの間が目標の画面より狭い（C02 の詰めが同じ頁に効いているため。目標の C01 の画面は C02 を入れていない） |
| C02 項目の間の詰め | `#charset` から `charset`・`name`・`type`・`craftman` の 4 項目が高さ 700 に入る。区切りの線・段落の間の詰め方の向き | 5 つ目の項目名（`craftmanw`）は入らない（目標の画面は下の端に見える）。設計の決定 4 のとおり。帯（C01）が入っている分、項目ごとの高さが目標の画面より高い |
| C03 分類の帯 | `#scope`「スコープコマンド」の紺の地・白い太字・帯の幅と高さ・左の余白。明・暗とも同じ紺 | 帯の位置が目標の画面より約 15px 上（前の `hr` の詰め。C02）。帯の下の項目名に C01 の帯がある（目標の C03 の画面は C01 を入れていない） |
| C09 コピーのボタンの手前の折り返し | コピーのボタンが字の右に離れて置かれ、字がボタンに重ならない（明・暗）。1 つ目の記述例は 2 行 | 折り返しの位置が「アニメー｜ション」から「アニメ｜ーション」に 1 字ずれた（C18 の箱の左の線と内側の余白の分、字の幅が狭い）。目標の C09 の画面には箱が無い |
| C18 記述例の箱 | 紺の見出しの帯（白い太字「記述例」、上の角の丸み）・左の線・淡い青の地（明）/ 濃い紺の地と明るい青の線（暗）・コピーのボタンの位置・折り返しの位置（1 つ目「アニメ｜ーション」、2 つ目「再生自｜体は」）。`list/propertysystem` の箱も帯・線・地・折り返し（「頭.c｜ur」「curs｜or」「と｜なる」）が C25 の画面の箱と同じ | 箱の中の字が着色されていない（着色は C25 で、この spec の外）。「対応:」の札が無い（ほかの候補）。帯・箱の縦の位置が目標の画面より上（C02 の詰め） |

### `manual/ghost` の前と後（8.4・1.6）
- 撮り方は同じ（`h1#ゴースト`、1000×700）。並べて目で見て、見出し・段落・コードブロック（地・字・コピーのボタンの位置）・リストに違いは見えなかった
- 画素の差分（スクラッチの `pngdiff.py`。標準ライブラリで PNG を解き、画素の RGB を比べる。`python -I pngdiff.py before.png after.png`）:

| 表示 | 違う画素 | 所 |
|---|---|---|
| 明 | 732 | すべてヘッダの右のリポジトリの札（「ukatech/ukadoc-spec」、x 790〜914・y 17〜30） |
| 暗 | 734 | 732 がヘッダの右のリポジトリの札（x 790〜914・y 17〜30）、2 がリスト「updates2.dau」の字の端（x 106〜107・y 620、RGB の差は 1〜5 の縁の滑らかさ） |

- ヘッダの札は `extra.css` の 6 つの塊が当たらない所で、本文の外。本文の違いは暗の 2 画素の縁だけで、見て分かる違いは無い
- コードブロックの右の余白（C09）の違いは、この頁のコードブロックの行が短くボタンまで届かないので、画面には出ていない

## 失わないもの
- 4.6。日付 2026-10-25。作業木 `902a7f1` の `serve`

### 検索の欄と強調（7.1）
- `list/sakura-script/?h=スコープ`（`#scope` の位置）と `?h=記述例`（`#bang-lock-repaint` の位置）を、`shot.mjs` で明・暗に撮って Read で見た（1000×700。画面はスクラッチに置き、spec には残していない）
- 4 枚とも、頭の帯の検索の欄（「検索」と `Ctrl+K`）が見える。`?h=スコープ` は分類の帯の中の「スコープ」が白の地に紺の字で、本文と記述例の箱の中の「スコープ」がテーマの強調（明は黄、暗は青）で見える。`?h=記述例` は記述例の見出しの帯の中の「記述例」が白の地に紺の字で見える
- 強調の数は 4.3（同じ版 `902a7f1`）の数を引く。`?h=スコープ` は `article` の中に `mark` が 72 個（分類の帯の中 1・項目名の帯の中 7・記述例の見出しの帯の中 0・箱の中 9）、`?h=記述例` は 256 個（分類の帯の中 0・項目名の帯の中 1・記述例の見出しの帯の中 255・箱の中 0）。帯・箱の中の強調の対比は「対比」の節の表のとおり、どれも見える

### コピーのボタンと `\`（4.4・7.4）
- `after-sakura-script-{light,dark}.png`・`after-propertysystem-{light,dark}.png` の記述例の箱の右上にコピーのボタンが見え、字に重なっていない。箱の中の `\s[0]\i[500]`・`\![lock,repaint]`・`\![set,property,…]` の `\` が `\` のまま見える。`?h=` の 4 枚でも同じ

### 幅 375（4.2・7.3）
`shot.mjs` を幅 375・高さ 812 で、画面を書かずに流した（`node shot.mjs <url> body - <light|dark> 375 812`）。`scrollWidth` は `shot.mjs` の物差し（`document.documentElement.scrollWidth` に縦のスクロールバーの幅を足したもの。375 なら `scrollWidth` と `clientWidth` が同じで、横にはみ出していない）。幅 375 の画面は残していない

| 頁 | 明 `scrollWidth` / `innerWidth` | 暗 `scrollWidth` / `innerWidth` |
|---|---|---|
| `list/sakura-script` | 375 / 375 | 375 / 375 |
| `spec/sstp` | 375 / 375 | 375 / 375 |
| `descript/shell-surfaces` | 375 / 375 | 375 / 375 |
| `manual/ghost` | 375 / 375 | 375 / 375 |

## Build Gate と規約 Gate（9.1・9.5）
- 5.1（2026-10-25）に作業木 `902a7f1` で流し直した。`git status` は流す前も後も空
  - `../../.venv/Scripts/python scripts/prepare_site.py`: **exit 0**
  - `../../.venv/Scripts/zensical build --strict`: **exit 0**（「No issues found」）
- 5.1 のレビューの後に流し直した（2026-10-25）。doc_edit の `.venv` の土台の Python（uv の 3.12.13）がこのセッションの外で消えて `.venv` が動かなくなっていたので、`.venv` には触れず、スクラッチに使い捨ての venv（Python 3.13.15、`requirements.txt` から。zensical 0.0.67）を作って流した
  - `prepare_site.py`・`zensical build --strict`: どちらも **exit 0**（「No issues found」）
  - 「流した式」の `snapshot.py`（出力はスクラッチ）は `before.json` とハッシュが同じ、`markers.py` は exit 0 で `markers.json` が流す前と同じ（others 21 頁 class 0・漏れ 0・notes_with_class 0・bad 0）
  - `contrast.mjs` の出力は 4.3 の `contrast-4.3.json` と空白を除いて同じ。`shot.mjs` も書いたとおりに動いた（exit 0、`scrollWidth` 1000）
  - 暗い表示の箱の中のコードの字の対比は、丸めない重ねの色 `rgb(179.88, 183.60, 194.50)` で 7.80、整数に丸めると 7.83（検算した）
- `git -C .worktrees/site-look-visibility diff --stat origin/main`（`origin/main` = `a341420`）の出力:

```
 assets/extra.css        | 89 +++++++++++++++++++++++++++++++++++++++++++++++++
 scripts/prepare_site.py | 13 +++++---
 2 files changed, 98 insertions(+), 4 deletions(-)
```

- 変えたのは `assets/extra.css`（+89）と `scripts/prepare_site.py`（+9 −4）の 2 つだけ。原稿（`.md`）・`.nav.yml`・`INDEX.md`・各 `index.md` の `## 一覧`・`mkdocs.yml`・`requirements.txt` には触れていない（9.1）
- 規約 Gate（ukadoc-spec の `CLAUDE.md`）: 決まりは原稿の構成・書式・ファイル名（ASCII、日本語を使わない）・リンク・`## 一覧` と `.nav.yml` の付け足しについてのもので、ファイルを足しも改名もしていないので当たる所は無く、違反も無い。`prepare_site.py` の変更は `CLAUDE.md` の「GitHub Pages」の節の処理（見出しをずらし `{#id}` を振る）に class を 1 つ添えるだけで、id の振り方・一覧の検査・`_raw/` は変わらない（「目印」の節の「変わらないこと」）
- `extra.css` の注は塊ごとに `/* site-look-list-items: <何> */` の 1 行で 6 つ（項目名の帯・項目の間の詰め・分類の見出しの帯・記述例の箱・濃い帯の中の ¶ と検索の強調・コピーのボタンの手前で折り返す）。わけと数はこの記録にある（9.2）

## 開発者に見せるとき（8.7）
プレビュー（`http://127.0.0.1:8000/ukadoc-spec/…`）や画面を見ていただくときは、古い `extra.css` が残らないよう、ブラウザで Ctrl+F5（強制の再読み込み）をお願いする。

## 画面のそろい
`screenshots/` に 12 枚（どれも 1000×700。PNG の頭で見た）:
- before 2 枚: `before-manual-ghost-{light,dark}.png`（1.2、`a341420`）
- after 10 枚: `after-sakura-script-{light,dark}.png`・`after-sakura-script-notes-{light,dark}.png`・`after-descript-ghost-{light,dark}.png`・`after-propertysystem-{light,dark}.png`・`after-manual-ghost-{light,dark}.png`（4.6、`902a7f1`）
- 設計の VerificationRecord の画面の一覧と同じ。撮り直しは before・after とも 0 枚（8.6）。幅 375 と 4.5・4.6 の検索の画面はスクラッチに置き、spec には残していない（設計のとおり）

## 設計の「Testing Strategy」のまとめ
| 項目 | 結果 | 記録の節 |
|---|---|---|
| Build Gate（9.5・9.1） | `prepare_site.py` exit 0・`build --strict` exit 0。`diff --stat origin/main` は `assets/extra.css` と `scripts/prepare_site.py` だけ | 「Build Gate と規約 Gate」（3.3・4.1 でも同じ） |
| 目印（1.3〜1.5・3.3〜3.5・7.2・8.2・9.4） | 項目 1875（`h2` 44・`h3` 1694・`h4` 137）・分類 116（`h2` 111・`h3` 5）で単位と食い違い 0。`notes_` 16 に class 0、読み物の 21 頁に class 0、漏れ 0。id の並び 2440・`headerlink` 2440・`md-nav__link` 4932・`hr` 1921・`_raw/` 2049 ファイルが前と同じ | 「目印」 |
| 帯・箱の対比（1.7・3.2・3.6・5.1・5.6・5.8・6.1・6.2・8.5） | すべての行が線を満たす（届かない所 0）。線に最も近いのは C01 帯の中のリンクの明るい表示のふだん 7.11（線 7）と、フォーカス・ホバー 3.64（線 3） | 「対比」・「変数で出せない 4 つの色」 |
| 帯・箱の中のリンク（6.4） | 項目名の帯 31・分類の帯 0・記述例の箱 0 | 「目印」・「対比」 |
| 切り替え（6.5） | 読み込み直さずに 7 回切り替え、毎回色が変わった | 「対比」の「切り替え」 |
| 画面だけ（6.6） | 暗い表示だけの 3 つの指定が `@media screen` の中。外に 0 | 「対比」の「画面だけ」 |
| 詰め（2.2・2.3） | `craftman` の終わりは 679.9px（700 の中）。`hr` 1921 で変わらない | 「詰め」・「箱」の「区切りの線」 |
| ボタン（4.1・4.2） | 重なり 幅 1000 で 172 → **0**、幅 375 で **0**（288 ブロック） | 「ボタン」・「変更の前」 |
| 箱の当て先（5.2〜5.5） | 9 頁で食い違い 0、点線は全サイトで 36 | 「箱」 |
| 着色の後の形（4.3・5.7） | `pre.highlight` の写しで箱 288・点線 33・食い違い 0・箱の位置と高さ 288 組・対比 8.72 / 7.80・重なり 0 がすべて作業木と同じ | 「着色の後の形」 |
| 失わないもの（4.2・4.4・7.1・7.3・7.4） | 検索の欄と強調（`?h=スコープ` 72・`?h=記述例` 256）が明・暗で見える。幅 375 の 4 頁で明・暗とも `scrollWidth` = `innerWidth` = 375。コピーのボタンと `\` がそのまま | 「失わないもの」 |
| 目標の画面との見比べ（8.3・8.4・8.6） | 5 つの候補の同じ所・違う所を記録。`manual/ghost` は本文に見て分かる違い無し（違う画素はヘッダの札と暗の 2 画素の縁）。撮り直し 0 | 「画面の見比べ」・「画面のそろい」 |

- 設計の「ボタン」の「変更の前は幅 1000 で 165 個」は、`research.md` によれば幅 1024 で内蔵ブラウザの枠で測った数で、この記録の物差し（`overlap.mjs`）では幅 1000 で 172、幅 1024 で 164（「変更の前」の「コピーのボタンの重なり」）。変更の後は幅 1000・375 で 0 で（幅 1024 は測っていない）、どの数を前の線にしても判定は変わらない
