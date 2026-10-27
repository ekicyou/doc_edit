# Roadmap

## 概要

公開サイトの見た目を、旧サイト並みの視認性と少しの遊びに近づける流れである（`product.md` の「当面の目標: サイトの見た目」）。
方向は計画の spec `site-look-plan` が、旧サイトとの見比べと試作で決めた。候補ごとの判断と行き先は `.kiro/specs/completed/site-look-plan/decisions.md` にある。
後続の spec は、その決定を小さな PR の単位に切ったものである。方向は議論し直さず、各 spec の brief から要件へ進む。

- 切り分けの規則: 他者も使う公開リポジトリへの PR として小さく切る。Markdown 拡張・Pygments レキサー（`site_ext/`）を変える改造は見た目の改造と別にする。目印を付ける後処理（`prepare_site.py`）やテンプレートの上書きは、その目印を使う見た目の改造と同じ spec に入れる。画像やブラウザで動く仕掛けを要する遊びは、視認性の改造と別にする
- 並びの規則: 目印を作る spec が、それを使う spec より先。`Dependencies:` には中身で依るものだけを書く（`workflow.md`「依存する spec の PR」）。どの spec も `assets/extra.css` を触り、多くが `prepare_site.py`・`mkdocs.yml` も触るが、同じファイルを触るだけでは依存にしない。互いに依らない単位は同時に進めて PR を出し、先にマージされた PR とぶつかったら、残りの PR が `origin/main` に追いつく（`workflow.md`「開いている PR に追いつく」）。下の並びは、依存を満たす並びの 1 つである
- PR の単位（`workflow.md`「PR の単位」）: 原則 1 spec = 1 PR で、spec を完了するたびに PR を出す（開発者の指示、2026-10-25。ほかの人のコミットを妨げないため。それまでの、6 本を `site-look-visibility` の 1 本にまとめる決めは取りやめた）。8 本のどれも、単独で入れてもサイトは壊れないので、どれも溜めない（`site-look-list-items` は `site-look-visibility` の作業木で書き終えた後に、自分の名前の作業木とブランチに移した）。依存先は、その PR がマージされてから始める（`site-look-note-icon` の絵の使ってよい範囲は、開発者が 2026-10-25 に確かめ済み）
- 土台: ukadoc-spec の `origin/main` の `afb2152`（テーマの色は紺 `#1f4e8c`）。Markdown の原稿（`.md`）を変える spec は無い（原稿を変える C25 は、`site-look-visibility` から外してバックログに移した）。後続の 8 本はどれも ukadoc-spec の `assets/` などを変えるので、`workflow.md` の「原稿を変えない spec」には当たらない
- どの spec も、`survey.md` の「失わないもの」（検索・ダークモード・見出しへのリンク・狭い画面・コードのコピー・記述例の字）を崩さない

## Specs (dependency order)
- [x] site-look-plan -- 旧サイトとの見比べと試作で見た目の方向を決め、改造 spec に切り分ける. Dependencies: none
- [x] site-look-dark-link-color -- 暗い表示のリンクと左の目次の今の頁を明るい紺 `#8fb4e8` にして読めるようにする（C24）. Dependencies: site-look-plan. PR: site-look-dark-link-color
- [x] site-look-list-items -- まとめ頁の項目名の帯・項目の間の詰め・分類の見出しの帯・コピーのボタンの下の折り返し・記述例の強い箱を入れる（C01・C02・C03・C09・C18）. Dependencies: site-look-plan
- [x] site-look-list-markers -- `prepare_site.py` で目印を付け、注意書きの箱・対応ベースウェアの札・既定値の札と、明るい表示の札の濃い色を入れる（C04・C06・C07・C17）. Dependencies: site-look-list-items
- [x] site-look-sakura-script-highlight -- `pymdownx.highlight` とブラウザの仕掛けでさくらスクリプトのタグに色・太字・地を付ける（C10・C19・C20・C21）. Dependencies: site-look-plan
- [x] site-look-manual-files -- `manual/` の頁でファイルごとの切れ目とファイル名の帯を見せ、ファイル構成の木のファイル名に色を付ける（C14・C15・C22）. Dependencies: site-look-list-items
- [x] site-look-definition-tables -- 「`- **名前**: 説明`」だけが並ぶ箇条書きを、原稿を変えずに組み立ての処理で 2 列の表にする（C23）. Dependencies: site-look-manual-files
- [x] site-look-note-icon -- 注釈の節・補足の項目・`!!! note` の見出しの頭に、添付の色付きのアイコンを付ける（C26）. Dependencies: site-look-list-markers
- [ ] site-look-sstp-playback -- さくらスクリプトの記述例・プロパティシステム・SHIORI Event を、利用者の操作で手元のゴーストへ送れるようにする（C13）. Dependencies: site-look-sakura-script-highlight, site-look-definition-tables. PR: site-look-sstp-playback
  - 始める前にメンテナと話して決める（2026-10-27）: 送るにはブラウザで動く仕掛けが要る。ukadoc-spec の `CLAUDE.md`（`1080225`）は、見た目のための構造を Zensical のカスタマイズの方法（`extra_css`、Markdown 拡張、Pygments）に載せ、「JavaScript は使わない」と書いている。ブラウザで動く仕掛けを足してよいかは書かれていない。記述例の言語の印は Pygments の `language-sakurascript`、名前と説明の表は `site_ext` の拡張が作る形に変わった
- [x] site-look-top-page -- トップページ（`INDEX.md`）に印を付け、節の見出し・目次の分類・「ukadocの見方」の箇条書きを、ほかの頁と同じ帯で見せる（開発者の指摘、2026-10-25。候補番号なし）. Dependencies: site-look-list-items, site-look-manual-files

依存の理由（どれも中身で依るもの。同じファイルを触るだけのものは書かない）:
- `site-look-list-markers` の C04 の箱は、`site-look-list-items` の C01・C03 が `notes_` の見出しを帯から除くことに依る
- `site-look-manual-files` の C22 は、C01 の項目名の帯を使う
- `site-look-definition-tables` は、`manual/` のファイルの箇条書き（C14・C22 の当て先）を表にしないことを、`site-look-manual-files` の後に確かめる（C23 は段落を 2 つ以上持つ箇条書きを初めから除く）
- `site-look-note-icon` の C26 は、C04 の箱に入る `notes_` の見出しにアイコンを付ける
- `site-look-top-page` は、C01・C03 の帯の指定と、`site-look-manual-files` の C14・C22 の箇条書きの指定を、トップの印にも当てる（印は `prepare_site.py` が class で付ける。メンテナの分担のまま）
- `site-look-sstp-playback` は、C10 の言語の印で記述例を見分け、プロパティシステムのキーの表（C23）からプロパティの名前を組み立てる
- `site-look-sakura-script-highlight` は `site-look-plan` だけに依る。`site-look-list-items` の C09・C18 と `site-look-manual-files` の C15 は、着色の前後どちらのコードブロックの HTML（`pre > code`・`pre.highlight > code`）にも効く書き方にするので、並びの縛りにはならない

## バックログ
- **C12 キャラクターを頁に出す（保留）**: 本番の絵が無い（旧サイトの絵は再利用の許可が明記されていない）。決めるのに要るもの: 本番の絵（新しく描くか、管理者の許可を得て旧サイトの絵を使うか）、出す頁（`manual/` だけか全頁か）、頭の帯の題が早く切り替わるらしい副作用（`.md-content__inner { position: relative; }`）の確かめと、副作用の無い置き方の試作。決まったら、C11（バルーン）を C04 と入れ替えるかも考え直す（目印 `div.slp-notes` は同じ）
- **C16 ヘッダの値の名前を列にそろえる（保留）**: `spec/shiori3` に当てた試作が無く、説明の中のリンクや `code` で列が崩れないか、暗い表示と幅 375 で 2 列をどう畳むかが確かめられていない。決めるのに要るもの: `spec/shiori3` に当てた試作の明・暗の画面と 375 px の測り、頁を絞る印（`site-look-manual-files` の頁の種類の印と共有）の要否。`site-look-definition-tables` の表（`spec/shiori3` の 7 個）で足りるかを先に見る。`site-look-definition-tables` の完了の時点の見立て（2026-10-26）: `spec/shiori3` の 7 個の表（36 行）で C16 は足りるとみなせそう（理由は `.kiro/specs/completed/site-look-definition-tables/verification.md` の「C16 の見立て」）。取り下げるかどうかは開発者が決める
- **`site_url` と転送先の食い違い（解けた）**: 公開サイトは `https://ukatech.github.io/ukadoc-spec/` から `https://ukatech.shillest.net/ukadoc-spec/` へ 301 で転送されるのに、`mkdocs.yml` の `site_url` が github.io のままだった（`survey.md` の「見た目の外の問題」）。ukadoc-spec の `3d8e4a7`（PR #1）で `site_url` が `https://ukatech.shillest.net/ukadoc-spec/` に直った。残る作業は無い
- **C25 さくらスクリプトの頁の外の記述例も同じく強調する（外した）**: 判断は「採る」だったが、`list/propertysystem` 5 個・`spec/plugin` 1 個のコードブロックに ```` ```sakurascript ```` を書き足すには原稿を変える。見た目の直しを原稿を変えない 1 本の PR（`site-look-visibility`）にまとめたので外した（開発者の判断、2026-10-25）。入れれば `site-look-sakura-script-highlight` の着色と `site-look-sstp-playback` の見分けがそのまま届く。決めるのに要るもの: 原稿を直す spec として起票するか、原稿を変えずに `prepare_site.py` で印を付ける代案にするか。目標の画面は `.kiro/specs/completed/site-look-plan/screenshots/mock-propertysystem-C25-light.png`・`mock-propertysystem-C25-dark.png`
- **`manual/ghost` の `updates2.dau`**: 旧サイトでは `updates.txt` と 1 つの説明を共有しているが、今のサイトでは説明の無い箇条書きになる（D12）。原稿の書き方による見え方で、直すには原稿の spec が要る。`site-look-manual-files` の C14・C22 では直らない
- **暗い表示のまま印刷したリンクの色（記録だけ）**: 暗い表示を選んだまま印刷すると、本文のリンク・C01 と C22 の帯の中のリンク・C15 の木のファイル名が、明るい表示の印刷の紺 `#1f4e8c` でなく、テーマの既定の藍 `#4051b5` になる（`site-look-manual-files` の 4.4 で見つけた。PR #10 の前からある振る舞い）。テーマの `:root` の `--md-typeset-a-color` が、紺のテーマの印 `data-md-color-primary` の無い `html` で解かれるため。白い紙に 6.86 で読める。開発者の判断（2026-10-26）で `site-look-manual-files` の 5.6 は設計の確かめ方（CSSOM）で満たすとし、直すかどうかはここに残す。決めるのに要るもの: 直すなら、印刷のときにリンクの色の変数を紺に戻す指定をどの spec で入れるか
- **幅 375 の表の中の表の 3px（記録だけ）**: `list/shiori-event` の `#capability`・`#rateofusegraph` の `Reference*` の表は、説明の欄の中に表を持ち、幅 375 で自分の包みの中で 3px 横に流れる（頁の横幅は 375 に収まる。幅 1000 では流れない）。Material の表の欄の `min-width: 5rem` で、中の表が 2 列で 202px より狭くならないため（`site-look-definition-tables` の `/kiro-complete` の棚卸で見つけた）。決めるのに要るもの: 直すなら、`.definition-table` の中の表の欄の最小の幅をいくつにするか

## 棚卸（2026-10-25・ukadoc-spec afb2152）
- 初めての棚卸である。`site-look-plan` の決定（`decisions.md`）から、後続の 8 本の spec を切り分けた
- 次に /kiro-start する spec: `site-look-dark-link-color`（今の本番の暗い表示では、リンクと左の目次の今の頁が暗い地に 1.94:1 しかなく、ほとんど読めない。`extra.css` の 1 か所で 7.56:1 に直る、いちばん急ぐ直しで、`site-look-plan` の完了の後、ほかの後続 spec に依らずに入れられる）
- 見込み: 上の並び（list-items → list-markers → sakura-script-highlight → manual-files → definition-tables → note-icon → sstp-playback）で、spec ごとに PR を出してマージする。互いに依らない spec（たとえば `site-look-sakura-script-highlight` と `site-look-list-markers`）は並べて進めてよい（PR を spec ごとにした、2026-10-25）
- 開発者の判断が要るもの: 無い（C12・C16 の保留はバックログで、決めるのに要るものがそろってから起票する）
