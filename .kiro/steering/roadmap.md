# Roadmap

## 概要

公開サイトの見た目を、旧サイト並みの視認性と少しの遊びに近づける流れである（`product.md` の「当面の目標: サイトの見た目」）。
方向は計画の spec `site-look-plan` が、旧サイトとの見比べと試作で決めた。候補ごとの判断と行き先は `.kiro/specs/site-look-plan/decisions.md` にある。
後続の spec は、その決定を小さな PR の単位に切ったものである。方向は議論し直さず、各 spec の brief から要件へ進む。

- 切り分けの規則: 他者も使う公開リポジトリへの PR として小さく切る。Markdown 拡張を足す改造（さくらスクリプトの着色）は見た目の改造と別にする。目印を付ける後処理（`prepare_site.py`）やテンプレートの上書きは、その目印を使う見た目の改造と同じ spec に入れる。画像やブラウザで動く仕掛けを要する遊びは、視認性の改造と別にする
- 並びの規則: 目印を作る spec が、それを使う spec より先。どの spec も `assets/extra.css` を触るので、下の並びの順に 1 本ずつ入れ、同じファイル（`extra.css`・`prepare_site.py`・`mkdocs.yml`）を触る前の spec を依存に書いた
- PR の単位（`workflow.md`「PR の単位」）: メンテナは PR を完成品の単位で評価するので、8 本を 6 つの PR にまとめる。`site-look-lists`（list-items と list-markers。まとめ頁の帯・札・注意書きを一緒に見てもらう）と `site-look-manual-and-tables`（manual-files と definition-tables。組み立ての処理で `manual/` と箇条書きの見え方を変える）が 2 本ずつで、ほかは 1 本ずつ。Markdown 拡張を足してコードブロックの HTML を変える着色と、未決の点の重い SSTP の送信は、それぞれ単独の PR にする。別の単位の依存先は、その PR がマージされてから始める
- 土台: ukadoc-spec の `origin/main` の `afb2152`（テーマの色は紺 `#1f4e8c`）。Markdown の原稿（`.md`）を変えるのは `site-look-sakura-script-highlight`（C25 の 6 か所）だけである。後続の 8 本はどれも ukadoc-spec の `assets/` などを変えるので、`workflow.md` の「原稿を変えない spec」には当たらない
- どの spec も、`survey.md` の「失わないもの」（検索・ダークモード・見出しへのリンク・狭い画面・コードのコピー・記述例の字）を崩さない

## Specs (dependency order)
- [ ] site-look-plan -- 旧サイトとの見比べと試作で見た目の方向を決め、改造 spec に切り分ける. Dependencies: none
- [ ] site-look-dark-link-color -- 暗い表示のリンクと左の目次の今の頁を明るい紺 `#8fb4e8` にして読めるようにする（C24）. Dependencies: site-look-plan. PR: site-look-dark-link-color
- [ ] site-look-list-items -- まとめ頁の項目名の帯・項目の間の詰め・分類の見出しの帯・コピーのボタンの下の折り返し・記述例の強い箱を入れる（C01・C02・C03・C09・C18）. Dependencies: site-look-plan. PR: site-look-lists
- [ ] site-look-list-markers -- `prepare_site.py` で目印を付け、注意書きの箱・対応ベースウェアの札・既定値の札と、明るい表示の札の濃い色を入れる（C04・C06・C07・C17）. Dependencies: site-look-list-items. PR: site-look-lists
- [ ] site-look-sakura-script-highlight -- `pymdownx.highlight` とブラウザの仕掛けでさくらスクリプトのタグに色・太字・地を付け、頁の外の記述例にも届かせる（C10・C19・C20・C21・C25）. Dependencies: site-look-plan. PR: site-look-sakura-script-highlight
- [ ] site-look-manual-files -- `manual/` の頁でファイルごとの切れ目とファイル名の帯を見せ、ファイル構成の木のファイル名に色を付ける（C14・C15・C22）. Dependencies: site-look-list-items. PR: site-look-manual-and-tables
- [ ] site-look-definition-tables -- 「`- **名前**: 説明`」だけが並ぶ箇条書きを、原稿を変えずに組み立ての処理で 2 列の表にする（C23）. Dependencies: site-look-manual-files. PR: site-look-manual-and-tables
- [ ] site-look-note-icon -- 注釈の節・補足の項目・`!!! note` の見出しの頭に、添付の色付きのアイコンを付ける（C26）. Dependencies: site-look-list-markers. PR: site-look-note-icon
- [ ] site-look-sstp-playback -- さくらスクリプトの記述例・プロパティシステム・SHIORI Event を、利用者の操作で手元のゴーストへ送れるようにする（C13）. Dependencies: site-look-sakura-script-highlight, site-look-definition-tables. PR: site-look-sstp-playback

依存の理由（同じファイルの順のほかに、中身で依るもの）:
- `site-look-list-markers` の C04 の箱は、`site-look-list-items` の C01・C03 が `notes_` の見出しを帯から除くことに依る
- `site-look-manual-files` の C22 は、C01 の項目名の帯を使う
- `site-look-definition-tables` は、`manual/` のファイルの箇条書き（C14・C22 の当て先）を表にしないことを、`site-look-manual-files` の後に確かめる（同じ PR の単位 `site-look-manual-and-tables`。C23 は段落を 2 つ以上持つ箇条書きを初めから除く）
- `site-look-note-icon` の C26 は、C04 の箱に入る `notes_` の見出しにアイコンを付ける
- `site-look-sstp-playback` は、C10 の言語の印（と C25）で記述例を見分け、プロパティシステムのキーの表（C23）からプロパティの名前を組み立てる
- `site-look-sakura-script-highlight` は `site-look-plan` だけに依る。`site-look-list-items` の C09・C18 と `site-look-manual-files` の C15 は、着色の前後どちらのコードブロックの HTML（`pre > code`・`pre.highlight > code`）にも効く書き方にするので、並びの縛りにはならない

## バックログ
- **C12 キャラクターを頁に出す（保留）**: 本番の絵が無い（旧サイトの絵は再利用の許可が明記されていない）。決めるのに要るもの: 本番の絵（新しく描くか、管理者の許可を得て旧サイトの絵を使うか）、出す頁（`manual/` だけか全頁か）、頭の帯の題が早く切り替わるらしい副作用（`.md-content__inner { position: relative; }`）の確かめと、副作用の無い置き方の試作。決まったら、C11（バルーン）を C04 と入れ替えるかも考え直す（目印 `div.slp-notes` は同じ）
- **C16 ヘッダの値の名前を列にそろえる（保留）**: `spec/shiori3` に当てた試作が無く、説明の中のリンクや `code` で列が崩れないか、暗い表示と幅 375 で 2 列をどう畳むかが確かめられていない。決めるのに要るもの: `spec/shiori3` に当てた試作の明・暗の画面と 375 px の測り、頁を絞る印（`site-look-manual-files` の頁の種類の印と共有）の要否。`site-look-definition-tables` の表（`spec/shiori3` の 7 個）で足りるかを先に見る
- **`site_url` と転送先の食い違い（解けた）**: 公開サイトは `https://ukatech.github.io/ukadoc-spec/` から `https://ukatech.shillest.net/ukadoc-spec/` へ 301 で転送されるのに、`mkdocs.yml` の `site_url` が github.io のままだった（`survey.md` の「見た目の外の問題」）。ukadoc-spec の `3d8e4a7`（PR #1）で `site_url` が `https://ukatech.shillest.net/ukadoc-spec/` に直った。残る作業は無い
- **`manual/ghost` の `updates2.dau`**: 旧サイトでは `updates.txt` と 1 つの説明を共有しているが、今のサイトでは説明の無い箇条書きになる（D12）。原稿の書き方による見え方で、直すには原稿の spec が要る。`site-look-manual-files` の C14・C22 では直らない

## 棚卸（2026-10-25・ukadoc-spec afb2152）
- 初めての棚卸である。`site-look-plan` の決定（`decisions.md`）から、後続の 8 本の spec を切り分けた
- 次に /kiro-start する spec: `site-look-dark-link-color`（今の本番の暗い表示では、リンクと左の目次の今の頁が暗い地に 1.94:1 しかなく、ほとんど読めない。`extra.css` の 1 か所で 7.56:1 に直る、いちばん急ぐ直しで、`site-look-plan` の完了の後、ほかの後続 spec に依らずに入れられる）
- 見込み: `site-look-dark-link-color` の後は、互いに依らない `site-look-lists`（`site-look-list-items` → `site-look-list-markers`）と `site-look-sakura-script-highlight` を並べて進められる。`site-look-manual-and-tables` と `site-look-note-icon` は `site-look-lists` のマージの後、`site-look-sstp-playback` は `site-look-sakura-script-highlight` と `site-look-manual-and-tables` のマージの後になる
- 開発者の判断が要るもの: 無い（C12・C16 の保留はバックログで、決めるのに要るものがそろってから起票する）
