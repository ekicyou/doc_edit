# 確かめの記録: site-look-dark-link-color

## 測った版と日付
- 日付: 2026-10-25
- 作業木: `.worktrees/site-look-dark-link-color/`（ブランチ `site-look-dark-link-color`）
  - `4219414` 暗い表示のリンクの色を、紺と対の明るい紺にして暗い地で読めるようにする
  - `3f9d60c` 暗い表示のリンクの色の注の対比を、ブラウザで測った数に合わせる
- `origin/main`: `afb2152`（変更の前の測りと画面は、この版をそのまま配って撮った）
- 頁: `http://127.0.0.1:8000/ukadoc-spec/list/sakura-script/`（作業木の `zensical serve`）
- 測りのブラウザ: Claude の内蔵ブラウザの枠。画面は `.kiro/specs/completed/site-look-plan/tools/shot.mjs`（Edge ヘッドレス、1000×700。読むだけで使った）

## 測りに流した式
内蔵ブラウザの枠の JavaScript で流した。テーマの色が変わったときは、同じ式で測り直す。

```js
// WCAG 2.x の相対輝度と対比（小数 2 桁）
const lum = (c) => { const [r,g,b] = c.match(/[\d.]+/g).slice(0,3).map(Number).map(v => { v/=255; return v <= 0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4); }); return 0.2126*r + 0.7152*g + 0.0722*b; };
const ratio = (a,b) => { const [x,y] = [lum(a), lum(b)].sort((p,q)=>q-p); return Math.round((x+0.05)/(y+0.05)*100)/100; };
// 字は getComputedStyle(el).color、地は body の backgroundColor（コードの字のリンクは、その code の backgroundColor）
const sample = (sel, bgOf) => { const el = document.querySelector(sel); const fg = getComputedStyle(el).color; const bg = getComputedStyle(bgOf ? bgOf(el) : document.body).backgroundColor; return {fg, bg, ratio: ratio(fg, bg)}; };
// 明・暗の切り替えは、ヘッダの切り替えのボタン（form[data-md-component=palette] の見えている label）を押す
```

- ホバーは、枠のポインタを実際に載せ、`:hover` が付いたことを確かめてから測った
- フォーカスは、頁の空いた所を押して頁にフォーカスを移した後で `focus()` し、`:focus` が付いたことを確かめてから測った（頁にフォーカスが無いと `:focus` が付かず、ふだんの色が出る）

## 測る所と線（結果）
幅 1000 で測った。引き出しの項目だけ幅 375、左の目次の項目のホバーだけ左の欄が出る幅 1300 で測った（幅 1000 では左の目次が引き出しの中に隠れ、ポインタを載せられないため）。

| 測る所 | セレクタ | 表示 | 状態 | fg | bg | 対比 | 線 | 判定 |
|---|---|---|---|---|---|---|---|---|
| 本文のリンク | `.md-content a:not(.headerlink):not(:has(code))`（「※下記参照」） | 暗 | ふだん | `rgb(143, 180, 232)` | `rgb(30, 33, 41)` | 7.56 | 7:1 以上（1.2） | 満たす |
| コードの字のリンク | `.md-content a code`（`\![execute,dumpballoon]`、地はその `code`） | 暗 | ふだん | `rgb(143, 180, 232)` | `rgb(39, 42, 53)` | 6.71 | 4.5:1 以上（1.5） | 満たす |
| 左の目次の今の頁 | `.md-nav--primary .md-nav__link--active`（「SAKURA Script」） | 暗 | ふだん | `rgb(143, 180, 232)` | `rgb(30, 33, 41)` | 7.56 | 本文のリンクと同じ色（1.3） | 満たす |
| 右の欄の目次の今の節 | `.md-sidebar--secondary .md-nav--secondary .md-nav__link--active`（`#bang-lock-repaint` まで送った後、「\![lock,repaint]」） | 暗 | ふだん | `rgb(143, 180, 232)` | `rgb(30, 33, 41)` | 7.56 | 同じ色（1.4） | 満たす |
| 引き出しの今の項目 | 幅 375 で `#__drawer` を開いた `.md-nav--primary .md-nav__item--active > .md-nav__link`（「さくらスクリプト」） | 暗 | ふだん | `rgb(143, 180, 232)` | `rgb(30, 33, 41)` | 7.56 | 同じ色（1.3） | 満たす |
| 本文のリンク | 同上 | 暗 | ホバー | `rgb(82, 108, 254)` | `rgb(30, 33, 41)` | 3.78 | 3:1 以上（3.1・3.3） | 満たす |
| 左の目次の項目 | `.md-nav--primary .md-nav__link[href]`（「Property System」） | 暗 | ホバー | `rgb(82, 108, 254)` | `rgb(30, 33, 41)` | 3.78 | 3:1 以上（3.1・3.3） | 満たす |
| 本文のリンク | 同上 | 暗 | フォーカス | `rgb(82, 108, 254)` | `rgb(30, 33, 41)` | 3.78 | 3:1 以上（3.2・3.3） | 満たす |
| 本文のリンク | 同上 | 明 | ふだん | `rgb(31, 78, 140)` | `rgb(255, 255, 255)` | 8.31 | 変更の前と同じ（2.1） | 同じ |
| 左の目次の今の頁 | 同上 | 明 | ふだん | `rgb(31, 78, 140)` | `rgb(255, 255, 255)` | 8.31 | 変更の前と同じ（2.1） | 同じ |
| ヘッダの地 | `.md-header` の `backgroundColor` | 明・暗 | — | — | `rgb(31, 78, 140)` | — | 変更の前と同じ（2.2） | 同じ |

変更の前（`origin/main` `afb2152`）に同じ式で測った値:

| 測る所 | 表示 | fg | bg | 対比 |
|---|---|---|---|---|
| 本文のリンク | 暗 | `rgb(31, 78, 140)` | `rgb(30, 33, 41)` | 1.94 |
| コードの字のリンク | 暗 | `rgb(31, 78, 140)` | `rgb(39, 42, 53)` | 1.72 |
| 左の目次の今の頁 | 暗 | `rgb(31, 78, 140)` | `rgb(30, 33, 41)` | 1.94 |
| 本文のリンク・左の目次の今の頁 | 明 | `rgb(31, 78, 140)` | `rgb(255, 255, 255)` | 8.31 |
| ヘッダの地 | 明・暗 | — | `rgb(31, 78, 140)` | — |

- ホバー・フォーカスはどれも 3:1 以上なので、指定は足していない（3.4）
- 塊の注の対比は、ブラウザで測った 1.94 と 7.56 に合わせた（5.4。設計の見込みの 7.55 から直した）

## 配り・切り替え・画面だけの確かめ
- **配られた `extra.css`（5.1）**: `serve` の `/ukadoc-spec/assets/extra.css` が 200 で、`site-look-dark-link-color:` の塊（`--md-typeset-a-color: #8fb4e8;`）が入っていた。頁の見た目の指定の木（CSSOM）からも、塊が読まれていることを見た
- **画面だけ（2.4）**: 塊は見た目の指定の木で `CSSMediaRule`（`media` は `screen`）で、中の規則は `[data-md-color-scheme="slate"][data-md-color-primary="custom"]` の 1 つだけだった。テーマの暗い表示も画面だけなので、印刷は明るい表示の紺になる。印刷の画面そのものは撮っていない（設計の話し合いの 3）
- **切り替え（1.6）**: 頁を読み込み直さずにヘッダの切り替えを押し、本文のリンクの `color` が `rgb(143, 180, 232)`（暗）→ `rgb(31, 78, 140)`（明）→ `rgb(143, 180, 232)`（暗）と変わった

## 画面の見比べ
`screenshots/` に 6 枚を置いた。

| 画面 | 位置 | 表示 |
|---|---|---|
| `before-sakura-script-light.png` / `after-sakura-script-light.png` | `#bang-lock-repaint` | 明 |
| `before-sakura-script-dark.png` / `after-sakura-script-dark.png` | `#bang-lock-repaint` | 暗 |
| `before-sakura-script-move-dark.png` / `after-sakura-script-move-dark.png` | `#bang-move` | 暗 |

- **明るい表示の前後（2.3）**: `before-` と `after-sakura-script-light.png` はバイト単位で同じだった（同じ md5）。リンクと目次の色に違いは無い
- **設計の切り出しに写らないもの**: `#bang-lock-repaint` の切り出しには、リンクも目次の今の項目も写っていない。そのため暗い表示の前後もバイト単位で同じになり、色の違いはこの 2 枚では見えない。目標の画面 `mock-sakura-script-C24-dark.png` の同じ位置にもリンクは写っていない。そこで開発者の判断（2026-10-25）「設計の 4 枚はそのまま残し、本文のリンクが入る位置で暗い表示の前と後を 2 枚足して」により、`#bang-move` の 2 枚を足した。変更の前の 1 枚は、`origin/main` `afb2152` の仮の作業木を別の口（8001）で配って撮った（撮った後に片付けた）
- **目標の画面との見比べ（5.2）**: `after-sakura-script-move-dark.png` の本文のリンク「※下記参照」は明るい紺で、暗い地の上で読める。`before-sakura-script-move-dark.png` では紺のままで、ほとんど読めない。目標の画面 C24 の明るい紺 `#8fb4e8` と同じ値であることは、上の測りの `rgb(143, 180, 232)` で確かめた。左の目次の今の頁は、幅 1000 の画面では引き出しの中に隠れて写らないので、測りの値で確かめた。目標の画面にはほかの候補（C01〜C21）も入っているので、比べたのは色だけである
- **撮り直し（5.5）**: 6 枚とも、上の端以外の左右の端にヘッダの紺の行は無く、撮り直しは 0 枚だった

## 失わないもの（4.1〜4.5）
- **検索（4.1）**: `?h=repaint` の頁を暗い表示で開くと、語の強調 `mark` が 15 か所付き（地 `rgba(66, 135, 255, 0.3)`、字 `rgba(213, 216, 226, 0.82)`）、頭の帯の検索の欄も見えた
- **見出しの id・¶・右の欄の目次（4.2）**: `git diff --stat origin/main` は `assets/extra.css | 9 +++++++++` の 1 ファイルだけで、原稿・設定には触れていない。画面でも、右の欄の目次はそのまま見えた
- **幅 375（4.3）**: `shot.mjs` を幅 375 で流し、明・暗とも `scrollWidth: 375`・`innerWidth: 375` だった
- **コピーのボタン（4.4）・`\`（4.5）**: `after-` の画面の記述例に、コピーのボタンと `\![lock,repaint]` などの `\` がそのまま写っている

## Build Gate と規約 Gate（6.1・6.3）
- 作業木で `python scripts/prepare_site.py` が exit 0、`zensical build --strict` が exit 0（「No issues found」）。注の数を直した後も流し直し、どちらも exit 0 だった
- 規約 Gate: ukadoc-spec の `CLAUDE.md` の決まりは原稿の書式についてのもので、CSS に当たる所は無く、違反も無い

## 開発者に見せるとき（5.6）
プレビュー（`http://127.0.0.1:8000/ukadoc-spec/list/sakura-script/`）や画面を見ていただくときは、古い `extra.css` が残らないよう、ブラウザで Ctrl+F5（強制の再読み込み）をお願いする。

## PR の説明の下書き（6.4・6.5・6.7）
PR は開発者の完了の承認の後に `/kiro-complete` で作る。マージはしない（マージはメンテナが行う）。下書きの時点で `origin/main` は `afb2152` のまま進んでおらず、追いつく要は無かった。

```markdown
## 暗い表示のリンクを読めるようにする

暗い表示（ダークモード）で、本文のリンクと左の目次の今の頁の字が、テーマの紺 `#1f4e8c` のまま暗い地 `#1e2129` に描かれています。対比は 1.94:1 しかなく、ほとんど読めません。

`assets/extra.css` の末尾に、暗い表示の画面だけで、リンクの色を紺と対の明るい紺 `#8fb4e8` にする指定を 1 つ足しました。

- 暗い地との対比: 1.94:1 → 7.56:1（コードの字のリンクは 1.72:1 → 6.71:1）
- 同じ色で描かれる、右の欄の目次の今の節と、狭い画面の引き出しの今の項目も一緒に直ります
- 明るい表示・印刷・ヘッダの紺は変わりません（指定は `@media screen` の中で、暗い表示かつ紺のテーマのときだけ効きます）
- ホバー・フォーカスの色は 3.78:1 で読めるので、変えていません
- 変えたファイルは `assets/extra.css` だけです（9 行の追加）

### 一連の PR について
この PR は、サイトの見た目の直しの一連の PR（3 本）の 1 本目です。続きの PR を、次の順に出します。

1. **この PR**: 暗い表示のリンクの色
2. この後: 原稿（Markdown）を変えない見た目の直しをまとめた PR（リストの項目・リストの印・さくらスクリプトの色分け・マニュアルのファイル・定義の表・注の印）
3. その後: 記述例を SSTP で送る PR

出し済みの PR はありません。この PR はこれだけで完結しているので、続きを待たずにマージしていただいて構いません。

🤖 Generated with [Claude Code](https://claude.com/claude-code)
```
