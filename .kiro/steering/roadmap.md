# Roadmap

## 概要

公開サイトの見た目を、旧サイト並みの視認性と少しの遊びに近づける流れである（`product.md` の「当面の目標: サイトの見た目」）。
方向は計画の spec `site-look-plan` が、旧サイトとの見比べと試作で決めた。候補ごとの判断と行き先は `.kiro/specs/completed/site-look-plan/decisions.md` にある。
後続の spec は、その決定を小さな PR の単位に切ったものである。方向は議論し直さず、各 spec の brief から要件へ進む。

- 切り分けの規則: 他者も使う公開リポジトリへの PR として小さく切る。Markdown 拡張を足す改造（さくらスクリプトの着色）は見た目の改造と別にする。目印を付ける後処理（`prepare_site.py`）やテンプレートの上書きは、その目印を使う見た目の改造と同じ spec に入れる。画像やブラウザで動く仕掛けを要する遊びは、視認性の改造と別にする
- 並びの規則: 目印を作る spec が、それを使う spec より先。`Dependencies:` には中身で依るものだけを書く（`workflow.md`「依存する spec の PR」）。どの spec も `assets/extra.css` を触り、多くが `prepare_site.py`・`mkdocs.yml` も触るが、同じファイルを触るだけでは依存にしない。互いに依らない単位は同時に進めて PR を出し、先にマージされた PR とぶつかったら、残りの PR が `origin/main` に追いつく（`workflow.md`「開いている PR に追いつく」）。下の並びは、依存を満たす並びの 1 つである
- PR の単位（`workflow.md`「PR の単位」）: 原則 1 spec = 1 PR で、spec を完了するたびに PR を出す（開発者の指示、2026-10-25。ほかの人のコミットを妨げないため。それまでの、6 本を `site-look-visibility` の 1 本にまとめる決めは取りやめた）。8 本のどれも、単独で入れてもサイトは壊れないので、どれも溜めない（`site-look-list-items` は `site-look-visibility` の作業木で書き終えた後に、自分の名前の作業木とブランチに移した）。依存先は、その PR がマージされてから始める（`site-look-note-icon` の絵の使ってよい範囲は、開発者が 2026-10-25 に確かめ済み）
- 土台: ukadoc-spec の `origin/main` の `afb2152`（テーマの色は紺 `#1f4e8c`）。Markdown の原稿（`.md`）を変える spec は無い（原稿を変える C25 は、`site-look-visibility` から外してバックログに移した）。後続の 8 本はどれも ukadoc-spec の `assets/` などを変えるので、`workflow.md` の「原稿を変えない spec」には当たらない
- どの spec も、`survey.md` の「失わないもの」（検索・ダークモード・見出しへのリンク・狭い画面・コードのコピー・記述例の字）を崩さない

## Specs (dependency order)
- [x] site-look-plan -- 旧サイトとの見比べと試作で見た目の方向を決め、改造 spec に切り分ける. Dependencies: none
- [x] site-look-dark-link-color -- 暗い表示のリンクと左の目次の今の頁を明るい紺 `#8fb4e8` にして読めるようにする（C24）. Dependencies: site-look-plan. PR: site-look-dark-link-color
- [x] site-look-list-items -- まとめ頁の項目名の帯・項目の間の詰め・分類の見出しの帯・コピーのボタンの下の折り返し・記述例の強い箱を入れる（C01・C02・C03・C09・C18）. Dependencies: site-look-plan
- [x] site-look-list-markers -- `prepare_site.py` で目印を付け、注意書きの箱・対応ベースウェアの札・既定値の札と、明るい表示の札の濃い色を入れる（C04・C06・C07・C17）. Dependencies: site-look-list-items
- [ ] site-look-sakura-script-highlight -- `pymdownx.highlight` とブラウザの仕掛けでさくらスクリプトのタグに色・太字・地を付ける（C10・C19・C20・C21）. Dependencies: site-look-plan
- [ ] site-look-manual-files -- `manual/` の頁でファイルごとの切れ目とファイル名の帯を見せ、ファイル構成の木のファイル名に色を付ける（C14・C15・C22）. Dependencies: site-look-list-items
- [ ] site-look-definition-tables -- 「`- **名前**: 説明`」だけが並ぶ箇条書きを、原稿を変えずに組み立ての処理で 2 列の表にする（C23）. Dependencies: site-look-manual-files
- [ ] site-look-note-icon -- 注釈の節・補足の項目・`!!! note` の見出しの頭に、添付の色付きのアイコンを付ける（C26）. Dependencies: site-look-list-markers
- [ ] site-look-sstp-playback -- さくらスクリプトの記述例・プロパティシステム・SHIORI Event を、利用者の操作で手元のゴーストへ送れるようにする（C13）. Dependencies: site-look-sakura-script-highlight, site-look-definition-tables. PR: site-look-sstp-playback

依存の理由（どれも中身で依るもの。同じファイルを触るだけのものは書かない）:
- `site-look-list-markers` の C04 の箱は、`site-look-list-items` の C01・C03 が `notes_` の見出しを帯から除くことに依る
- `site-look-manual-files` の C22 は、C01 の項目名の帯を使う
- `site-look-definition-tables` は、`manual/` のファイルの箇条書き（C14・C22 の当て先）を表にしないことを、`site-look-manual-files` の後に確かめる（C23 は段落を 2 つ以上持つ箇条書きを初めから除く）
- `site-look-note-icon` の C26 は、C04 の箱に入る `notes_` の見出しにアイコンを付ける
- `site-look-sstp-playback` は、C10 の言語の印で記述例を見分け、プロパティシステムのキーの表（C23）からプロパティの名前を組み立てる
- `site-look-sakura-script-highlight` は `site-look-plan` だけに依る。`site-look-list-items` の C09・C18 と `site-look-manual-files` の C15 は、着色の前後どちらのコードブロックの HTML（`pre > code`・`pre.highlight > code`）にも効く書き方にするので、並びの縛りにはならない

## バックログ
- **C12 キャラクターを頁に出す（保留）**: 本番の絵が無い（旧サイトの絵は再利用の許可が明記されていない）。決めるのに要るもの: 本番の絵（新しく描くか、管理者の許可を得て旧サイトの絵を使うか）、出す頁（`manual/` だけか全頁か）、頭の帯の題が早く切り替わるらしい副作用（`.md-content__inner { position: relative; }`）の確かめと、副作用の無い置き方の試作。決まったら、C11（バルーン）を C04 と入れ替えるかも考え直す（目印 `div.slp-notes` は同じ）
- **C16 ヘッダの値の名前を列にそろえる（保留）**: `spec/shiori3` に当てた試作が無く、説明の中のリンクや `code` で列が崩れないか、暗い表示と幅 375 で 2 列をどう畳むかが確かめられていない。決めるのに要るもの: `spec/shiori3` に当てた試作の明・暗の画面と 375 px の測り、頁を絞る印（`site-look-manual-files` の頁の種類の印と共有）の要否。`site-look-definition-tables` の表（`spec/shiori3` の 7 個）で足りるかを先に見る
- **`site_url` と転送先の食い違い（解けた）**: 公開サイトは `https://ukatech.github.io/ukadoc-spec/` から `https://ukatech.shillest.net/ukadoc-spec/` へ 301 で転送されるのに、`mkdocs.yml` の `site_url` が github.io のままだった（`survey.md` の「見た目の外の問題」）。ukadoc-spec の `3d8e4a7`（PR #1）で `site_url` が `https://ukatech.shillest.net/ukadoc-spec/` に直った。残る作業は無い
- **C25 さくらスクリプトの頁の外の記述例も同じく強調する（外した）**: 判断は「採る」だったが、`list/propertysystem` 5 個・`spec/plugin` 1 個のコードブロックに ```` ```sakurascript ```` を書き足すには原稿を変える。見た目の直しを原稿を変えない 1 本の PR（`site-look-visibility`）にまとめたので外した（開発者の判断、2026-10-25）。入れれば `site-look-sakura-script-highlight` の着色と `site-look-sstp-playback` の見分けがそのまま届く。決めるのに要るもの: 原稿を直す spec として起票するか、原稿を変えずに `prepare_site.py` で印を付ける代案にするか。目標の画面は `.kiro/specs/completed/site-look-plan/screenshots/mock-propertysystem-C25-light.png`・`mock-propertysystem-C25-dark.png`
- **`manual/ghost` の `updates2.dau`**: 旧サイトでは `updates.txt` と 1 つの説明を共有しているが、今のサイトでは説明の無い箇条書きになる（D12）。原稿の書き方による見え方で、直すには原稿の spec が要る。`site-look-manual-files` の C14・C22 では直らない

## 棚卸（2026-10-25・ukadoc-spec afb2152）
- 初めての棚卸である。`site-look-plan` の決定（`decisions.md`）から、後続の 8 本の spec を切り分けた
- 次に /kiro-start する spec: `site-look-dark-link-color`（今の本番の暗い表示では、リンクと左の目次の今の頁が暗い地に 1.94:1 しかなく、ほとんど読めない。`extra.css` の 1 か所で 7.56:1 に直る、いちばん急ぐ直しで、`site-look-plan` の完了の後、ほかの後続 spec に依らずに入れられる）
- 見込み: 上の並び（list-items → list-markers → sakura-script-highlight → manual-files → definition-tables → note-icon → sstp-playback）で、spec ごとに PR を出してマージする。互いに依らない spec（たとえば `site-look-sakura-script-highlight` と `site-look-list-markers`）は並べて進めてよい（PR を spec ごとにした、2026-10-25）
- 開発者の判断が要るもの: 無い（C12・C16 の保留はバックログで、決めるのに要るものがそろってから起票する）
