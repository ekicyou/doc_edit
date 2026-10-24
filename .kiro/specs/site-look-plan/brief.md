# Brief: site-look-plan

## Problem
UKADOC の公開サイト（https://ukatech.github.io/ukadoc-spec/ ）は、ややのっぺりしていて、旧サイト（https://ssp.shillest.net/ukadoc-legacy/manual/ ）に比べて読みにくい。
ゴースト制作者が仕様を引くとき、項目の切れ目、パラメータ、対応ベースウェア、記述例が、ひと目で見分けにくい。
また技術サイトではあるが、伺からしい遊びが無い。
直すべきところと直し方が決まっていないので、改造の spec を切り出せない。

## Current State
- サイトは Zensical 0.0.67 で作る。Material テーマ（`variant: classic`）に、20 行ほどの `assets/extra.css` を足しただけである
- `custom_dir`（テンプレートの上書き）と `extra_javascript` は、まだ使っていない
- ```` ```sakurascript ```` のコードブロック（約 290 個）には色が付かない（Pygments にレキサーが無く、`pymdownx.highlight` も設定していない）
- 旧サイトとの見比べは、まだ誰もしていない。`roadmap.md` も無い

## Desired Outcome
- 旧サイトと今のサイトを見比べた結果が、spec の中に記録されている。記録するのは、視認性で負けているところと、遊びを入れられそうなところ
- 代表的な 2〜3 頁に、使い捨ての試作を当てて見比べ、見た目の方向を開発者が目で見て決めている
- 決めた方向が、後続の改造 spec に切り分けられている。`.kiro/steering/roadmap.md` に依存の順で並び、各 spec の `brief.md` があって、そのまま `/kiro-start` できる

## Approach
**調査と見た目の試作**（discovery で選んだ案 B）。
1. 旧サイトと今のサイトの同じ頁を並べて見比べ、差を洗い出す
2. ukadoc-spec の作業木で、使い捨ての CSS とテンプレートの試作を作り、`zensical serve` で見比べる。試作は PR にせず捨てる。画面の記録（スクリーンショット）は spec に残す
3. 開発者と方向を決め、後続の spec に切り分ける

「楽しさ」は好みの話で、文書だけでは合意がぶれる。だから試作を見て先に決め、後続の spec では方向を議論し直さずに済むようにする。

## Scope
- **In**:
  - 旧サイトと今のサイトの見比べ（対象: `descript/` `list/` `spec/` のまとめ頁と、`manual/` の 1 ファイル 1 頁の頁）
  - 視認性の改善候補と、遊びの候補の洗い出し（例: 注記をバルーン風にする、キャラクターを出す、さくらスクリプトに色を付ける。どれを採るかは spec の中で決める）
  - 使い捨ての試作と、画面の記録
  - 後続 spec への切り分け（`roadmap.md` と、各 spec の `brief.md`）
- **Out**:
  - ukadoc-spec への本番の変更と PR（後続の spec が行う）
  - 原稿（Markdown）の書式の変更

## Boundary Candidates
- 見比べの調査（何が違うか）と、方向の決定（何を採るか）
- 視認性（CSS とテンプレートで済む）と、遊び（画像・キャラクター・JS が要りうる）
- さくらスクリプトの着色（Python の Markdown 拡張か Pygments レキサーが要り、`requirements.txt` と `prepare_site.py` に触れる）は、CSS だけの改造と分けた方がよさそう

## Out of Boundary
- 改造の実装そのもの
- サイトの章立て（`.nav.yml`）や、原稿の中身の修正
- Zensical の版上げ

## Upstream / Downstream
- **Upstream**: ukadoc-spec の `main`（`mkdocs.yml`、`assets/extra.css`、`scripts/prepare_site.py`）、旧サイト、`.kiro/steering/product.md` の「当面の目標: サイトの見た目」
- **Downstream**: この spec が切り出す改造 spec 群（例: 視認性の CSS、さくらスクリプトの着色、遊びの要素）

## Existing Spec Touchpoints
- **Extends**: なし（最初の spec）
- **Adjacent**: なし

## Constraints
- **成果物は doc_edit の中だけ**: この spec は ukadoc-spec に PR を出さない。いまの `/kiro-complete` は、ukadoc-spec への PR と squash マージがある前提で作られている。締める前に「原稿を変えない spec では PR の段を飛ばす」分岐を足す（spec にせず、直接直す）
- **試作の作業木**: 試作は `.worktrees/site-look-plan/` で作り、push しない。spec の完了時に捨てる
- **serve の監視先**: `docs_dir: _site_src` なので、`zensical serve` が見るのは `_site_src/` である。直下の `assets/extra.css` を直しても、`prepare_site.py` を再実行するまで反映されない。また `prepare_site.py` は `_site_src/` を毎回消す。試作では「直下で直して prepare を再実行する」に決めておく
- **Zensical 0.0.67 の制限**: テンプレートは minijinja で描画するので、Jinja2 専用の書き方は通らないことがある。対応表に無い MkDocs プラグインは黙って捨てられる。Python で拡張できるのは Markdown 拡張だけ。partial を丸ごと写すと版上げで壊れやすいので、CSS とブロックの上書きにとどめるのが安全。`build --strict` は、存在しない `extra_css` を指定しても検出しない
- **さくらスクリプトの着色の選択肢**: (a) superfences の `custom_fences` に自作の関数を渡す（試験済み。CI では import 経路の用意が要る）。(b) Pygments の entry point を持つ自作レキサーを、`requirements.txt` で入れる。(c) `extra_javascript` でブラウザ側で着色する（自作の文法が要る）。どれを採っても、タグの文法に沿った字句規則（例: `\p23` は `\p2` と文字 `3`）が要る。highlight を有効にすると、言語指定の無いコードブロック（約 610 個）の HTML も変わる。`prepare_site.py` の `EXTENSIONS` と `mkdocs.yml` をそろえる必要もある
- **ライセンス**: ukatech/ukadoc にも ukadoc-spec にも LICENSE が無い。旧サイトが許しているのは文章の引用・転載で、CSS と装飾画像の再利用は明記されていない。CSS は流用せず、参考にして書き直す。装飾画像を使うなら、管理者に確認する
- 見た目の変更は、他者も使う公開リポジトリへの PR になる。後続の spec は小さく、レビューしやすい単位に切る
