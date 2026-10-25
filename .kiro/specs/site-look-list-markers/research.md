# ギャップ分析: site-look-list-markers

- 日付: 2026-10-25
- 対象: `requirements.md`（Requirement 1〜9）と、この spec が広げる作業木 `.worktrees/site-look-visibility/`（ブランチ `site-look-visibility`、HEAD `902a7f1`。`origin/main` の `a341420` に `site-look-list-items` の 3 つのコミットが載ったもの。読むだけ）
- 読んだもの: 作業木の `scripts/prepare_site.py`（314 行）・`assets/extra.css`（116 行）・`mkdocs.yml`、`ukadoc-spec/CLAUDE.md` の書式、テーマの見た目の指定（`.venv` の `zensical/templates/assets/stylesheets/classic/main.*.min.css`・`palette.*.min.css`）、試作 `.kiro/specs/completed/site-look-plan/mockups/extra.css`・`mockups/worktree.diff`（`slp_mark()`）・`mockups/README.md` の測り、`decisions.md` の C04・C05・C06・C07・C11・C17 の行、`candidates.md` の C06 の数、`site-look-list-items` の `design.md`・`verification.md`、目標の画面（`mock-sakura-script-C04-light.png`・`mock-descript-ghost-C07-light.png`・`mock-sakura-script-C17-light.png`）
- 数え方: 原稿を読むだけの使い捨ての script（スクラッチの置き場 `C:\Users\maz-o\AppData\Local\Temp\claude\C--home-maz-git-doc-edit\490c6014-b3f2-4a44-9cba-1fe20055985b\scratchpad\list-markers\` の `count_markers.py`・`count_rules.py`・`notes_levels.py`）で、メインのチェックアウト `ukadoc-spec/`（`46439c8`）と作業木（`a341420` の原稿）の両方を数えた。2 つの結果は 1 字も違わない。`notes_levels.py` は作業木の `prepare_site.py` の `collect()`・`unit_body()`・`fence_free_headings()` を読み込んで使った（書き出す処理は呼んでいない）。`prepare_site.py`・`zensical build`・`serve` は流していない。数は実装で、作業木の build の HTML で数え直す
- 対比の数は、WCAG 2.x の相対輝度の式で手元で計算した見込みである（`contrast.py`。半透明の色は地に重ねてから測った）。ブラウザでの測りは設計・実装で行い、それを正とする

## 1. 数え直し（brief の「spec の初めに数え直す」）

### ukadoc-spec の進み
- `origin/main` は `a341420` から `46439c8` に 1 つ進んだ。変わったのは `spec/saori-ex/internal_file/internal_file.CompressArchive.md`・`internal_file.ExtractArchive.md` と `spec/sstp/method_execute.md` の 3 ファイルで、`**対応:**`・`**既定値:**` の行は 1 行も変わっていない（差分に該当の行が無い）。下の数は `a341420`（作業木の原稿）でも `46439c8` でも同じ
- 作業木はまだ `a341420` の上にある。この spec の数には響かないので、今追いつく要は無い（追いつくのは `/kiro-complete` の手前か、ぶつかったとき。Requirement 9.6）

### 原稿の数（まとめ頁の 20 頁。コードブロックの外）
| もの | 今（`46439c8`） | 試作の時点 | 差のわけ |
|---|---|---|---|
| 対応の段落（行の頭の `**対応:**`） | **1640** | 1623（`c84942a` の build の `slp-support`） | `70cac39` が 16 項目に 17 行を足した（どれも形に合う行）。原稿の全体では 1641 行で、残りの 1 行は `dev/nar.md`（まとめ頁の外） |
| 対応の部分（` / ` で区切ったもの） | 2726 | ― | |
| 既定値の段落（行の頭の `**既定値:**`） | **423** | 423 | 変わらない |
| 注意書きの節（`notes_*.md`） | **16**（`list/sakura-script` 14・`list/propertysystem` 2） | 16 | 変わらない |
| 対応の行の書き方の種類 | 146 通り | 146 通り（全 1624 行） | 足された 17 行は既にある書き方 |
| 行の頭でない `**対応:**`・`**既定値:**`（箇条書き・注記の中など） | 0 | ― | |
| コードブロックの中の `**対応:**`・`**既定値:**` | 0 | ― | |
| 対応の段落で 2 行以上に続くもの | 0 | ― | |
| 既定値の段落で 2 行以上に続くもの | **6**（`descript/shell-surfaces/surface-brace/` の `balloon.offsetx`・`balloon.offsety`・`kero.balloon.offsetx`・`kero.balloon.offsety`・`sakura.balloon.offsetx`・`sakura.balloon.offsety`。`<br />` で続く） | 6（試作で `{: … }` が漏れた所） | 変わらない |
| 対応と既定値が同じ段落にあるもの | 0 | ― | |
| 対応の行の中のリンク・`<br />` | 0 | ― | |

### 「形に合う部分」の数え方による違い（Requirement 2.4・5.2・8.7、［仮定 A1］）
brief の「名前、または名前と空白と数字の版」は、「版」の範囲の読み方で数が変わる。3 通りで数えた（`count_rules.py`）。

| 数え方 | 札の数 | 形に合わない部分を含む行 | 形に合わない部分の種類（行の書き方） | 札が 1 つも付かない行 |
|---|---|---|---|---|
| **strict**: 版は数字とドットだけ（`candidates.md` の数え方。requirements の［仮定 A1］） | **2662**（`SSP` 1549・`Materia` 446・`CROW` 433・`Ninix` 234） | **63 行**（形に合わない部分 64） | **30 通り** | 51 行 |
| **mockup**: 版は数字で始まる空白の無い字（試作の `slp_bw()` の `( \d\S*)?$`） | 2669（`SSP` 1556） | 56 行（部分 57） | 24 通り | 44 行 |
| **head**: 名前で始まり、その後が終わりか空白（後ろの字は何でもよい） | 2719（`SSP` 1606） | 7 行（部分 7） | 5 通り | 0 行 |

- brief・`decisions.md` の「30 通り・63 行」は strict の数え方の数で、今も同じ数である（`70cac39` で足された行はどれも形に合う）。ただし試作の実装は mockup の数え方で、画面の札（`#bang-lock-repaint` の `Materia / SSP / Ninix`）はどの数え方でも同じに写る
- strict と mockup の違いの 7 行（6 通り）: `SSP 2.4以降`・`SSP 2.4.26から小数点以下認識`・`SSP 2.6.26/27`・`SSP 2.3.77/2.7.34(s,b記法)`・`SSP 2.4.09/タスクバーは2.6.35`・`SSP 2.6.04/Ref4は2.6.35`（2 行）。mockup では `SSP` が札になり、後ろの字が残る
- strict で札が 1 つも付かない 51 行の大半は、`SSP` の 1 語の行に版が括弧・角括弧・RC 付きで書かれたもの: `SSP (2.3.83)` 10・`SSP \[2.6.11\]` 10・`SSP 2.7 RC1` 6・`SSP (2.3.72)` 5・`SSP (2.5.98)` 2・`SSP オプション指定は2.7.23以降` 2・`SSP 作者名・内容 2.4.10～` 2 など。同じ頁の隣の項目は札になるので、札の有る無しが混ざって見える
- head でも残る 5 通り 7 行: `Materia廃止仕様 / SSP`（3）・`Materia廃止仕様 / SSP 複数指定は2.4.26～ ダークモードは2.8.56～`・`SSP 2.4 / Ref1以降は2.4.85`・`Materia / SSP / CROW / *※推奨　SSP2.5.05以上*`・`… / *※推奨　SSP2.6.72以上*`（どれも同じ行のほかの部分は札になる）
- strict の 30 通りの全部と行の数は `count-46439c8.txt`（スクラッチ）と `rules-46439c8.txt` にある。設計で数え方を決めたら、verification の記録に写す（Requirement 8.7）

### 頁ごとの数（strict。検証の期待の数の元）
| 頁 | 対応の段落 | 札 | 既定値の段落 | 注意書きの節 |
|---|---|---|---|---|
| `descript/balloon` | 169 | 299 | 168 | |
| `descript/ghost` | 74 | 106 | 74 | |
| `descript/headline` | 9 | 18 | 9 | |
| `descript/install` | 17 | 32 | 14 | |
| `descript/plugin` | 13 | 30 | 13 | |
| `descript/shell` | 102 | 173 | 102 | |
| `descript/shell-surfaces` | 137 | 202 | 37 | |
| `descript/shell-surfacetable` | 6 | 6 | 6 | |
| `list/plugin-event` | 19 | 19 | | |
| `list/propertysystem` | 193 | 187 | | 2 |
| `list/sakura-script` | 357 | 666 | | 14 |
| `list/shiori-event` | 310 | 524 | | |
| `list/shiori-event-ex` | 42 | 74 | | |
| `list/shiori-resource` | 160 | 294 | | |
| `spec/saori-ex` | 32 | 32 | | |
| 計 | 1640 | 2662 | 423 | 16 |

- 試作の `serve` で数えた `list/sakura-script` の段落の目印 350・名前の札 653（brief の「表示の確かめ方」）は `c84942a` の数で、今は 357・666（strict。mockup なら 667）になる。`descript/ghost` の 74・74・106 は変わらない
- ほかの 5 頁（`descript/` の残り・`spec/` の残り）は 3 つとも 0

### 注意書きの節の段と並び（`notes_levels.py`）
| 段 | 数 | 所 | 前の単位 |
|---|---|---|---|
| `h2` | 2 | `list/sakura-script` の頭（`notes_escape`・`notes_lifespan`） | 頁の頭・前の注意書き |
| `h3` | 12 | `list/sakura-script` の分類 `surface`・`sound`（2）・`open`（3）・`misc`（5）・`environment-variable` の中 | 項目・前の注意書き・分類の見出し（`notes_environmentvariable` は分類の見出しの直後） |
| `h4` | 2 | `list/propertysystem` の分類の中の分類 `sound-property` の中（`notes_sound_meta`・`notes_sound_propertyset`） | 項目・前の注意書き |

- どの注意書きの節も見出しは 1 つだけで、コードブロック・注記（`!!!`）・表・`**対応:**`・`**既定値:**` を含まない。中身は段落・箇条書き（計 106 行）・コードの字（`notes_move` の 9 個など）・リンク（計 42 個。`notes_executehttp` 25）
- 分類の見出しだけの単位の後ろには区切りの線が入らない（`main()` の `heading_only`）ので、`notes_environmentvariable` の箱は分類の帯の直後に来る。ほかは前の単位との間に区切りの線がある
- 右の欄の目次は `toc_depth: 3` なので、`h4` の 2 個はもともと目次に出ない（D17 の確かめでは「目次の数が同じ」を見る）

## 2. 今の状態（作業木 `902a7f1`）

### `scripts/prepare_site.py`
- `EXTENSIONS`・`mkdocs.yml` の `markdown_extensions` に `attr_list`・`md_in_html` がある。段落の末尾の `{: .cls }` と `<div … markdown="1">` は、どちらも設定を変えずに使える
- `shift_headings()` が単位の頭の見出しに `{#id .bundle-item}`・`{#id .bundle-category}` を付ける（`site-look-list-items`）。注意書きの節（`notes_` で始まるファイル）と頁の頭は除く。**注意書きの節の見出しには class が無い**ので、C04 の箱は見出しの class でなく包みで見分ける形になる
- `main()` は単位ごとに `rewrite_links(shift_headings(text, …), …)` を作って `parts` に積み、`---` でつなぐ。段落・節に目印を付ける処理は無い（試作の `slp_mark()` は作業木に無い）。試作は `rewrite_links()` の後ろに `slp_mark(rel, …)` を挟んでいた
- `heading_only`（見出しだけの単位の後ろに線を入れない）は、前の単位の字が `#` で始まるかで決める。注意書きの節を `<div>` で包むと字の頭が `<div` になるが、注意書きの節はどれも本文を持つので、線の入り方は変わらない見込み（Research Needed: 実装で `hr` の数が前と同じことを確かめる。`site-look-list-items` の記録で 1921）
- docstring の頭の箇条書きに、処理ごとの 1 行がある（`site-look-list-items` が「役の class を付ける」の行を足した）。目印を足すなら同じ形の 1 行を足すのが今の書き方

### `assets/extra.css`（`site-look-list-items` の 6 つの塊の後ろが末尾）
| 関わる指定 | 中身 | この spec との関わり |
|---|---|---|
| `.md-typeset:has(.bundle-item) p { margin: .4em 0 }`（C02） | まとめ頁のすべての段落の上下を詰める（左右は 0） | 注意書きの箱の中の段落も詰まる（brief の申し送り）。C07 の字下げを `margin-left` で書くと、この指定と詳細度が同じ（どちらも class 2・要素 1）になり、後ろに書いた方が勝つ。末尾に足せば C07 が勝つが、`margin` の一括の指定にすると上下の詰めを消す |
| `.md-typeset:has(.bundle-item) hr { margin: .5em 0 }` | 項目の間の線を詰める | 注意書きの箱の間の線（`list/sakura-script` の頭の 2 つの間など）も詰まる。目標の画面は詰める前の試作で、箱の間がもっと空いている |
| `[data-md-color-scheme="slate"] .md-typeset … { … }` を `@media screen` の中に書く | 暗い表示だけの色 | 札の暗い表示の色も同じ形にすれば、印刷では明るい表示の色になる（Requirement 6.2） |
| `.md-typeset :is(.bundle-category, h4:has(+ .highlight)) mark` | 濃い帯の中の検索の強調 | 札・箱の中の検索の強調は、今のテーマの指定のまま（黄色の地）で読める見込み（Research Needed: 札の `currentColor` の枠と `mark` が重なったときの見え方） |
| `.md-typeset h4:has(+ .highlight)`（C18） | `h4` の直後がコードブロックなら記述例の帯 | 段が `h4` の注意書きの見出しは直後が段落なので当たらない |

### テーマの色（Zensical 0.0.67・classic）
| 変数 | 明 | 暗 | 使いどころ |
|---|---|---|---|
| 地 `--md-default-bg-color` | `#ffffff` | `hsla(225,15%,14%)` ≒ `#1e2129` | 札・既定値の地 |
| 本文 `--md-default-fg-color` | `#000000de` | `hsla(225,15%,90%,.82)` | 既定値の値の字の候補 |
| 控えめ `--md-default-fg-color--light` | `#0000008a` | `hsla(225,15%,90%,.56)` | 試作の C04 の枠・C07 の値の字と札 |
| コードの地 `--md-code-bg-color` | `#f5f5f5` | `hsla(225,15%,18%)` ≒ `#272a35` | 試作の C04 の箱の地 |
| リンク `--md-typeset-a-color` | `#1f4e8c`（紺） | `#8fb4e8`（PR #10） | 箱の中のリンク |
| ホバー `--md-accent-fg-color` | `#526cfe` | `#526cfe` | 箱の中のリンクのホバー |

## 3. 要件と今あるものの対応（Requirement-to-Asset Map）

| 要件 | 今あるもの | ギャップ |
|---|---|---|
| 1.1〜1.5 注意書きの箱 | 見出しの id は `notes_` で始まる。包みは無い。試作の `div.slp-notes` と C04 の指定 | **Missing**: 包みの目印（`prepare_site.py`）と箱の指定。**Constraint**: 試作の見出しの指定は `> :is(h2, h3):first-child` で、`list/propertysystem` の段が `h4` の 2 個に当たらない（中央寄せにも点線の区切りにもならない）。段に依らない書き方が要る |
| 1.6 箱の字・枠 | 本文の字は明 14.97:1・暗 8.02:1（コードの地の上）。試作の枠（控えめの色）は明 4.50:1・暗 4.59:1 | 満たす見込み。地を変えるなら測り直す |
| 1.7 箱の中のリンク | 箱の地をコードの地にすると、明 7.62:1・**暗 6.69:1**。ホバーは明 3.90:1・暗 3.35:1 | **Constraint**（［仮定 A3］のとき）: 暗い表示のリンクが 7:1 に届かない。箱の地を変えるか、箱の中だけリンクの色を変えるか、線を 4.5:1 にするかを決める（OPEN QUESTION 3） |
| 1.8 C11 と入れ替えられる目印 | 試作の C11 は C04 と同じ `div.slp-notes` を使った | 包みの名前を箱の見え方に縛らない名前にすればよい（例: `bundle-notes`。名前は設計で決める） |
| 1.x 箱の中のコードの字 | コードの字の地 `--md-code-bg-color` は、試作の箱の地と同じ色 | **Unknown**: 箱の地をコードの地にすると、箱の中のコードの字（`notes_move` など）の灰色の地が箱と見分けられなくなる。目標の画面（`notes_escape`）では字の色だけで分かる。設計で、地を変えるか今のままにするかを見る |
| 2.1〜2.5 対応の札 | 名前は字のまま。目印は無い。試作の `slp_bw()`・`span.slp-bw slp-bw-<名前>` | **Missing**: 段落の目印・名前の包み・札の指定。**Unknown**: 形の数え方（上の 3 通り、OPEN QUESTION 1） |
| 2.6 暗い表示の札 | 試作の色は `Materia` `#ffc260` 10.06・`SSP` `#81c784` 7.99・`CROW` `#ce93d8` **6.73**・`Ninix` `#90caf9` 9.19（:1、地 `#1e2129`） | 4.5:1 なら満たす。7:1 にするなら `CROW` を明るくする（OPEN QUESTION 2） |
| 2.7・2.8 段落の外・読み物の頁 | 対応の段落の外の名前は数えない。`dev/nar.md` はまとめ頁の後処理を通らない | まとめ頁の後処理だけで付ければ満たす |
| 2.9 名前を足せる形 | 試作は正規表現の名前の並びと、名前ごとの色の 1 行ずつ | 名前の並びを 1 か所に置けば満たす |
| 3.1・3.3 既定値の札と字下げ | 試作の C07（字下げ `1.2em`・札は `strong:first-child` の枠） | **Missing**: 目印と指定。**Constraint**: C02 の `p` の詰めと詳細度が同じ（上の表） |
| 3.2 値の字 7:1 | 試作の値の字（控えめの色・`.85em`）は明 **4.59**・暗 **4.91**（:1） | **Missing**: 値の字の色を本文の色（明 16.07・暗 8.89）か、それに近い色にする。字の大きさは設計で決める（OPEN QUESTION 4） |
| 3.4 札の字と枠 | 試作の札は控えめの色の `currentColor`（4.59・4.91） | 満たす見込み。値の字を濃くしたとき、札の色を値と同じにするか控えめのままにするかは設計で決める |
| 3.5 2 行以上の段落 | 試作は段落の末尾に目印を足し、漏れ 0 を確かめた | 同じ書き方なら満たす。1 行目の直後に足すと 6 か所で漏れる（brief の「試作で確かめた事実」） |
| 4.1 明るい表示の札 7:1 | 試作の C17 の色は `Materia` `#6b4500` 8.48・`SSP` `#185a1c` 8.34・`CROW` `#5a1a85` 10.93・`Ninix` `#0d47a1` 8.63（:1、白地）。C06 だけの色は 5.13〜9.39 | C17 の色を明るい表示の札の色にすれば満たす。試作は C06 の色を C17 で上書きする 2 段の書き方だったが、本番では明るい表示の色を 1 つにまとめてよい（設計で決める） |
| 4.2・4.3 変えないもの | リンク・ヘッダ・暗い表示の色は `extra.css` の頭とテーマにある | 札の指定だけを足せば満たす |
| 5.1〜5.5 目印の数・漏れ・コードブロック | `shift_headings()`・`rewrite_links()` はコードブロックの行を飛ばす（`FENCE`） | 同じ飛ばし方を使えば満たす。コードブロックの中の該当の行は今 0 だが、規則として飛ばす |
| 5.6 目印の名前 | `bundle-item`・`bundle-category`（決まり `bundle-<役>`。`site-look-list-items` の申し送りの例は `bundle-notes`） | 名前を設計で決める。名前ごとの札の class（試作 `slp-bw slp-bw-ssp`）も同じ決まりにそろえる |
| 5.7 変えないもの | `old_ids()` はずらす前の原稿を見る。`rewrite_links()` は `](` だけを見る。`_raw/` は原稿をそのまま写す | 目印を `_site_src/` のまとめ頁だけに足せば満たす見込み。**Research Needed**: `md_in_html` の `div` の中の見出しの `{#id}` と `¶` が今の作業木（`bundle-*` の class 入り）でも変わらないこと（試作は `c84942a`・`afb2152` の上で確かめた） |
| 6.1・6.2 切り替え・印刷 | `site-look-list-items` の暗い表示の色は `@media screen` の中 | 同じ書き方で満たす |
| 7.1 検索 | `span` で包むだけなら検索の字は変わらない | **Research Needed**: 検索の結果の強調（`mark`）が札の中・箱の中で読めること |
| 7.2・8.3 見出しへのリンク | 試作で `headerlink` 649・`href="#notes_…"` 75・`md-nav__link` 423 が包む前と同じだった（`c84942a`） | 今の作業木の数で確かめ直す（`site-look-list-items` の記録では全体で `headerlink` 2440・`md-nav__link` 4932） |
| 7.3 375 px | 試作で `list/sakura-script`・`descript/ghost` が 375・375 | 札は `inline-block` で、長い行（`Materia / SSP / CROW / Ninix`）も折り返せば収まる見込み |
| 7.5 箱の中の `\` | `notes_escape` の `\\`・`\%` など。`md_in_html` の中でも同じ Markdown の読み方 | 試作の画面で今と同じ字に写った。実装で HTML の字を前と見比べる |
| 8.4・8.5 画面 | `shot.mjs`（`.kiro/specs/completed/site-look-plan/tools/`）。目標の画面に `CROW` の札と `h4` の箱は写っていない | `CROW` は `descript/ghost` の `#charset`（`SSP / CROW`）に写る。`h4` の箱は `list/propertysystem` の `#notes_sound_meta` に当たる id で撮る（id は実装で確かめる） |
| 9.1〜9.7 範囲と PR | 作業木・Build Gate の手順は `site-look-list-items` と同じ | 新しいギャップ無し |

## 4. 実装の道の候補

### Option A: 今の後処理を広げる（`prepare_site.py` の `main()` に関数を 1 つ足し、`extra.css` の末尾に塊を足す）
- `main()` の `parts.append(…)` の所で、単位ごとに 1 つの関数（試作の `slp_mark()` と同じ形）を通す。その関数が、コードブロックの外の対応の段落・既定値の段落の末尾に段落の目印を足し、対応の部分の名前を包み、注意書きの節の単位を `div` で包む
- `extra.css` には C04・C06（明・暗）・C07 の塊を足す。C17 は C06 の明るい表示の色として同じ塊に入れるか、塊を分けるかを設計で決める（塊の注は `/* site-look-list-markers: <何> */` の 1 行）
- ✅ 試作で漏れ 0・id の数が同じことを確かめた形そのまま。差分が小さく、レビューしやすい（Requirement 9）
- ✅ `site-look-list-items` の `shift_headings()` と同じファイル・同じ単位の流れに乗る
- ❌ `prepare_site.py` の後処理が 1 つ増える（`site-look-definition-tables` も同じ所に足すので、関数を分けておかないとぶつかりやすい）

### Option B: 目印を付ける処理を別のファイルにする（例: `scripts/` に新しい module を置き、`prepare_site.py` から呼ぶ）
- ✅ 見た目の目印の処理が組み立ての処理から分かれる。`site-look-definition-tables` の後処理も同じ module に置ける
- ❌ ukadoc-spec の `scripts/` は今 `prepare_site.py` 1 つで、ファイルを増やすと PR が大きく見える。`build_raw()` の除くディレクトリ（`scripts`）などに響かないかも見る要がある
- ❌ 小さな PR の規則（brief の「小さな PR」）から外れぎみ

### Option C: 目印の一部を見出しの class や見た目の指定だけで済ませる
- C04 を包み無しで、注意書きの見出し（`[id^="notes_"]`）とその後ろの兄弟の要素に枠を描く形にする案。ただし注意書きの節の終わり（次の `hr`）までを見た目の指定だけで 1 つの箱に囲う書き方は無く、枠が段落ごとに切れる。`site-look-note-icon` の見出しのアイコンは見出しの id だけでも当てられる
- C06 をブラウザの仕掛け（スクリプト）で包む案。brief の Approach（`prepare_site.py` で目印を付ける）と、ブラウザの仕掛けを視認性の改造と分ける roadmap の規則に合わない
- ✅ `prepare_site.py` の変更がさらに小さくなる（C07 だけ）
- ❌ C04 の箱が描けない・C06 が規則に合わないので、要件を満たさない。参考に挙げるだけ

### 見立て
- **推す道**: Option A（brief の Approach そのまま。試作の `slp_mark()` を本番の名前と書き方で書き直す）。`site-look-definition-tables` とのぶつかりを減らすため、目印の関数を 1 つの塊にまとめる
- **工数**: S（試作で形を確かめた後処理 1 つと、CSS の 4〜5 つの塊。検証の仕組みは `site-look-list-items` のものを使い回せる）
- **危険度**: Low（既にある型の広げ。気をつける所は、`h4` の注意書きの見出し・C02 の詰めとの詳細度・暗い表示の箱の中のリンクの対比の 3 つで、どれも見た目の指定の中で直せる）

## 5. 設計へ持ち越すこと

### 決めること（設計）
1. 目印の名前（`bundle-<役>` の決まり。注意書きの包み・対応の段落・名前の札・既定値の段落の 4 種と、名前ごとの札の見分け方）
2. 形の数え方の正規表現（OPEN QUESTION 1 は head の数え方に決まった。名前の後ろが部分の終わりか空白）
3. C04 の箱の地・枠・見出しの指定を、段（`h2`・`h3`・`h4`）に依らず当てる書き方と、箱の中のコードの字・リンクの色
4. C07 の値の字の色と大きさ、札の色（値と同じか控えめか）、字下げを C02 の詰めとぶつけずに書く書き方
5. C06 の明・暗の札の色（明は C17 の 7:1 以上、暗は OPEN QUESTION 2 の線）と、名前を足すときに触る所を 1 か所にする形
6. 後処理の関数を置く所（`main()` の `parts.append` のどこで通すか。`rewrite_links()` の前か後か、`---` でつなぐ前か）

### Research Needed（実装の確かめで）
- 作業木の上で、注意書きの節を包んでも、見出しの id の並び・`headerlink`・`md-nav__link`・`hr` の数・`_raw/` が前と同じこと（Requirement 5.7・7.2・8.3）
- 検索の結果の強調（`mark`）が、札の中・箱の中で明・暗とも読めること（Requirement 7.1）
- 箱の中の `\`・コードの字の HTML が、包む前と同じこと（Requirement 7.5）
- 暗い表示の箱の地の上のリンクとホバーの対比（Requirement 1.7。見込みはリンク 6.69:1・ホバー 3.35:1）
- `h4` の注意書きの節の id（`list/propertysystem` の `notes_sound_meta` の、まとめ頁での id）と、撮る位置

## 6. OPEN QUESTIONS（要件のディスカッションで決めること）

**結果（2026-10-25、開発者が全議題を推奨案で承認）**: 1 は head の数え方（名前の後ろが終わりか空白なら札。札 2719・形に合わない 5 通り 7 行・札の付かない行 0。後ろの字が対応を打ち消す行は今は無い）。2 は暗い表示 4.5:1。3 は箱の中のリンクも明・暗とも 7:1 のままで、届く箱の地を設計で選ぶ。4 は値の字を本文と同じ色・同じ大きさにする。5 は枠の線 3:1 を採る。下は議論の前の問いの記録である。

1. **札にする「形」の範囲（［仮定 A1］）**: requirements は brief の数（30 通り・63 行）に合わせ、版を「数字とドットだけ」と読んだ（strict。札 2662・札の付かない行 51）。試作の実装は「数字で始まる空白の無い字」（mockup。札 2669・付かない行 44）で、名前の後ろが空白なら何でもよいとする道（head。札 2719・付かない行 0・残るのは 5 通り 7 行）もある。strict では `SSP (2.3.83)`・`SSP \[2.6.11\]`・`SSP 2.7 RC1` など 51 行で `SSP` が札にならず、隣の項目と見え方が混ざる。どれにするか
2. **暗い表示の札の対比の線（［仮定 A4］）**: brief は明るい表示だけ 7:1 と決めている。requirements は暗い表示を 4.5:1 とした。暗い表示も 7:1 にするなら、試作の `CROW`（6.73:1）を明るくする
3. **注意書きの箱の中のリンクの線（［仮定 A3］）**: requirements は `site-look-list-items` の帯の上のリンクと同じく明・暗とも 7:1 とした。試作の箱の地（コードの地）では暗い表示が 6.69:1 で届かない。7:1 を守って箱の地か箱の中のリンクの色を変えるか、箱の中は 4.5:1 でよいとするか
4. **既定値の値の字（［仮定 A5］）**: 「本文の色に近づける」を 7:1 以上と読んだ。字の大きさ（試作は `.85em` で小さい）も本文と同じにするか、小さいまま色だけ濃くするか
5. **箱の枠の線の対比（［仮定 A2］）**: brief に無い 3:1（文字でないものの線）を足した。要るか
