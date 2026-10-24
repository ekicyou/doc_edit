# Product Overview

doc_edit は、伺かの仕様書「UKADOC」の正本 `ukatech/ukadoc-spec`（公開先 https://ukatech.github.io/ukadoc-spec/ ）を更新するための作業台であり、その作業記録である。
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

## Target Use Cases

- 既存の UKADOC 項目の誤り・不足を直す
- SSP の新機能など、仕様の追加を書く
- 自作アプリの仕様（例: 新しい規格、ベースウェアの対応状況）を、UKADOC の書式に合わせて加える

## 判断の原則

- **UKADOC は SSP 公式仕様書である**。自作アプリの情報を加えるときも、既存の SSP 中心の記述を書き換えず、UKADOC の書式・構成に沿って足す
- 自作アプリの情報をどの形で載せるか（例: `**対応:**` 行のベースウェア名に areka を加えるか、shiori4 を `spec/` の新しい規格として置くか）は未決である。初めて載せるときに spec で決め、決めたらこのファイルに書き足す
- ukadoc-spec は他者も使う公開リポジトリなので、変更は小さく、レビューしやすい単位の PR にする

---
_updated_at: 2026-10-24_
