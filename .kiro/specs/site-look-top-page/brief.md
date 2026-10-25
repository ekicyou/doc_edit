起票元: 開発者の指摘（/kiro-discovery、2026-10-25）

# Brief: site-look-top-page

## Problem
見た目の改造（`site-look-list-items`・`site-look-list-markers` など）が入った後も、トップページ（`INDEX.md`）は変わらず「のっぺりした感じ」である（開発者の指摘、2026-10-25）。
節の見出し・目次の分類・「ukadocの見方」の箇条書きが、本文とほとんど同じ字の並びで、どこから何が始まるかが追いにくい。

## Current State
- `assets/extra.css` の見た目の指定は、ほとんどが `prepare_site.py` の目印（`bundle-item`・`bundle-category`・`bundle-notes` など）に掛かる。目印はまとめた頁（`descript/`・`list/`・`spec/` の下のディレクトリ）にだけ付き、`INDEX.md` は `index.md` に写すだけなので目印が無い。トップに効くのは全体の指定（入れ子の箇条書きの詰め・`pre > code`）だけである
- トップの形: `## ukadocについて`・`## 対象version`・`## 外部リンク`・`## ukadocの見方`・`## 目次` の 5 節。`## 目次` の下は `### ファイル構成`〜`### その他` の 7 つの分類と、リンクの箇条書き（入れ子あり）。`## ukadocの見方` は「`- **分類名**: 説明`」に字下げの段落が続く箇条書き（7 項目）
- `site-look-plan` の調べ（`survey.md`・`decisions.md`）はトップを見ていない。候補（C01〜C27）にトップ向けのものは無い
- `manual/` の頁も同じく目印が無いが、`site-look-manual-files` が頁の種類の印と C14・C22 で受け持つ（この spec では扱わない）

## Desired Outcome
基本の方向は、ほかの頁と同じ（開発者の指示、2026-10-25）。トップを、まとめ頁と同じ物差しで「のっぺり」しない見た目にする:
- 節の見出し（`h2`）を、まとめ頁の分類の見出し（C03 の紺の帯）と同じ見せ方にする
- `## 目次` の下の分類（`h3`）を、まとめ頁の項目名（C01 の帯）と同じ見せ方にする
- 「ukadocの見方」の「`**分類名**: 説明`」の箇条書きを、`site-look-manual-files` のファイルごとの箇条書き（C14・C22）と同じ見せ方にする
- 帯・余白の当て方は、どれが見出しの帯でどれがリンクの並びかがひと目で分かること。目次のリンクの並びは詰めすぎない
- 暗い表示・375 px・検索・見出しへのリンクを崩さない（`survey.md` の「失わないもの」）

## Approach
`prepare_site.py` が `INDEX.md` を `index.md` に写すときに、トップの印を付け、`assets/extra.css` で既にある帯の指定をその印にも当てる。
- 印の付け方は 2 案。(a) 見出しに既にある class（`bundle-category`・`bundle-item`）を付けて指定をそのまま使う。(b) トップ専用の class（例: `top-section`・`top-category`）を付け、セレクタに足す。(a) は CSS が増えないが、`:has(.bundle-item)` の詰め（C02）や注意書きの除外がトップにも及ぶので、要件・設計で確かめて選ぶ
- 「ukadocの見方」は、`site-look-manual-files` が入れる頁の種類の印と C14・C22 の指定を、トップにも当てられる形で使う（同じ指定を二重に書かない）
- 原稿（`INDEX.md`）は変えない。試作で明・暗と 375 px の画面を撮り、ほかの頁と並べて開発者が確かめる

## Scope
- **In**:
  - トップの印（`scripts/prepare_site.py` の `INDEX.md` を写すところ）
  - `h2`・目次の `h3`・「ukadocの見方」の箇条書きの見た目（`assets/extra.css`。既にある指定のセレクタを広げるのを先にする）
  - 明・暗の画面と 375 px の確かめ
- **Out**:
  - 原稿（`INDEX.md`）の書き換え（節の並べ替え・文の直し）
  - 旧サイトの頭の飾り（キャラクターの絵・画像のボタン。C12 と同じく絵が無いのでバックログのまま）
  - 目次をカードや段組みにするなど、ほかの頁に無い見せ方
  - `manual/` の頁（`site-look-manual-files`）

## Boundary Candidates
- トップの印を付ける（`prepare_site.py`）
- 見出しの帯の当て先を広げる（`extra.css`）
- 「ukadocの見方」の箇条書きに `site-look-manual-files` の指定を当てる

## Out of Boundary
- まとめ頁・`manual/` の頁の見た目を変えること（セレクタを広げても、その頁の見え方は今のまま）
- 頭が太字の箇条書きを表にすること（`site-look-definition-tables`。「ukadocの見方」は段落が 2 つの項目なので C23 の対象外のはず。要件で確かめる）

## Upstream / Downstream
- **Upstream**: `site-look-list-items`（C01・C03 の帯の指定、完了）、`site-look-manual-files`（頁の種類の印と C14・C22 の指定。「ukadocの見方」が使う）
- **Downstream**: 無し

## Existing Spec Touchpoints
- **Extends**: 無し（完了した `site-look-list-items` の指定を使うが、その spec は直さない）
- **Adjacent**: `site-look-manual-files`（同じ形の箇条書きの見た目を共有する）、`site-look-definition-tables`（頭が太字の箇条書きを表にする。トップの箇条書きを巻き込まないこと）

## Constraints
- 原稿を変えない。ほかの site-look の spec と同じく、ukadoc-spec の `assets/`・`scripts/` を変え、1 spec = 1 PR で入れる
- `site-look-manual-files` の PR がマージされてから始める（`roadmap.md` の PR の単位）
- 帯の色は紺のテーマ（`--md-primary-fg-color`）のまま。暗い表示のリンクの色（`site-look-dark-link-color`）を崩さない
