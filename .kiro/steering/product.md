# Product Overview

doc_edit は、伺かの仕様書「UKADOC」の正本 `ukatech/ukadoc-spec`（公開先 https://ukatech.shillest.net/ukadoc-spec/ 。旧 URL の https://ukatech.github.io/ukadoc-spec/ からは 301 で転送される）を更新するための作業台であり、その作業記録である。
ukadoc-spec の内容は CC BY 4.0 で公開される（`ukadoc-spec/LICENSE`）。そこに入れる画像などの素材は、この条件で出してよいものに限る。
成果物は ukadoc-spec への PR であって、doc_edit 自体は公開物ではない。

## Core Capabilities

- **ukadoc-spec の更新**: 仕様の追加・修正を cc-sdd の spec（要件 → 設計 → タスク）で計画し、サブモジュール `ukadoc-spec/` の中で書いて PR にする
- **作業記録**: どの時点の ukadoc-spec に対して、何を、なぜ変えたかを `.kiro/specs/` とサブモジュールの参照コミットで残す
- **自作アプリの情報の取り込み（将来）**: 作者自身が開発した伺か関連アプリ（pasta・areka・shiori4）の仕様や対応状況を、ukadoc-spec に加えていく。サブモジュールの各リポジトリが情報の参照元になる

## 参照元のアプリ

いずれも作者自身の開発物で、ukadoc の扱う領域に関係する。

- **pasta**: SHIORI（`pasta.dll`）として動く対話スクリプトエンジン。Pasta DSL を Lua にトランスパイルする
- **areka**: Rust 製・Windows 用の伺か互換ベースウェア。ukadoc を正典として SSP 互換を目指す
- **shiori4**: SHIORI とベースウェアをつなぐ次世代 ABI（SHIORI → ホストの呼び出しを含む）と、その Rust 実装

## 当面の目標: サイトの見た目

いまの公開サイトは、Material テーマ（`variant: classic`）に、20 行ほどの `assets/extra.css` を足しただけのもので、ややのっぺりしている。
旧サイト並みの視認性と、少しの楽しさを持たせる。技術サイトではあるが、伺からしい遊びを入れたい。

- **視認性**: 項目の切れ目、パラメータ、対応ベースウェア、記述例が、旧サイト並みにひと目で見分けられる
- **楽しさ**: 伺かの文化を感じさせる遊びを、読みやすさを損なわない範囲で加える
- 見た目の変更も ukadoc-spec への PR になる。他者も使うリポジトリなので、原稿の書式（`ukadoc-spec/CLAUDE.md`）を崩さず、サイトの設定やスタイルの側で実現するのを基本にする
- 何をどの見た目にするかは計画の spec `site-look-plan` で決めた（候補と判断は、その spec の `decisions.md`）。後続の spec の並びと次に始める spec は `.kiro/steering/roadmap.md` にある

## 参照サイト

- **UKADOC 旧サイト**: https://ssp.shillest.net/ukadoc-legacy/manual/ 。旧 HTML 版（`ukatech/ukadoc`）を公開しているもの。見た目と視認性の手本にする。中身の正本は ukadoc-spec である（並存期間中に旧 HTML 側へ入った変更の扱いは `ukadoc-spec/CLAUDE.md` に従う）

## Target Use Cases

- サイトの見た目（テーマ・スタイル）を、旧サイトを手本に整える
- 既存の UKADOC 項目の誤り・不足を直す
- SSP の新機能など、仕様の追加を書く
- 自作アプリの仕様（例: 新しい規格、ベースウェアの対応状況）を、UKADOC の書式に合わせて加える

## 判断の原則

- **UKADOC は SSP 公式仕様書である**。自作アプリの情報を加えるときも、既存の SSP 中心の記述を書き換えず、UKADOC の書式・構成に沿って足す
- 自作アプリの情報をどの形で載せるか（例: `**対応:**` 行のベースウェア名に areka を加えるか、shiori4 を `spec/` の新しい規格として置くか）は未決である。初めて載せるときに spec で決め、決めたらこのファイルに書き足す
- ukadoc-spec は他者も使う公開リポジトリなので、変更は小さく、レビューしやすい単位の PR にする

---
_updated_at: 2026-10-25_
