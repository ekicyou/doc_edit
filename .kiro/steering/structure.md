# Project Structure

## Organization Philosophy

ルートは「計画と記録」、サブモジュールは「実物」に分ける。
ルートに置くのは cc-sdd の steering と spec だけで、仕様書の原稿はすべてサブモジュール `ukadoc-spec/` の中にある。
サブモジュールはそれぞれ独立した git リポジトリで、ルートの git からは参照コミットとしてしか見えない。

## Directory Patterns

### 作業計画（spec）
**Location**: `.kiro/specs/<feature>/`
**Purpose**: ukadoc-spec に対する 1 つの変更のまとまり（要件・設計・タスク）。PR 1 本か、関連する数本に対応させる
**Example**: `.kiro/specs/ssp-2-8-sakura-script/`（SSP の新しいタグを書き足す、など）
**Note**: 計画の spec（`design.md` に「この spec は原稿を変えない spec である」と書いたもの。例: `site-look-plan`）は PR を持たず、後続の spec の `brief.md` と roadmap を成果物にする

### spec の並び（roadmap）
**Location**: `.kiro/steering/roadmap.md`
**Purpose**: spec の依存の順と、保留の候補（バックログ）と、次に `/kiro-start` する spec。`/kiro-next` が読み、`/kiro-complete` が完了の印を付ける

### 更新対象
**Location**: `ukadoc-spec/`
**Purpose**: UKADOC の原稿。中の構成は ukadoc-spec の `CLAUDE.md` と `README.md` が定める
**Example**: さくらスクリプトのタグは `list/sakura-script/<カテゴリ>/<スラッグ>.md`、SHIORI イベントは `list/shiori-event/<カテゴリ>/OnXxx.md`

### 原稿の作業木（PR の単位ごと）
**Location**: `.worktrees/<pr>/`（`.gitignore` 済み）
**Purpose**: ukadoc-spec の git worktree。PR の単位（`workflow.md`「PR の単位」。単独の spec なら spec 名）ごとに、原稿をブランチ `<pr>` で書く場所。`/kiro-impl` が作り、単位の後の spec が引き継ぎ、PR のマージを確かめた `/kiro-complete` が消す
**Example**: `git -C ukadoc-spec worktree add ../.worktrees/<pr> -b <pr> origin/main`（詳しくは `workflow.md`）

### 情報の参照元
**Location**: `pasta/` `areka/` `shiori4/`
**Purpose**: 自作アプリの仕様・対応状況の一次資料。読むだけで、ここからは変更しない
**Example**: shiori4 のホスト側プロトコルは `shiori4/doc/host-protocol.md`、areka の ukadoc 対応状況は `areka/doc/ukadoc-coverage/`

## ukadoc-spec の構成の要点

詳細は `ukadoc-spec/CLAUDE.md` に従う。spec を書くときに押さえる型だけを挙げる。

- `descript/` `list/` `spec/` は「ページ → カテゴリ → 項目」の 3 段のディレクトリ。サイトでは 1 ページにまとめて出る
- どのディレクトリにも `index.md` があり、その `## 一覧` が項目の順序を決める。一覧に無いファイルがあると `prepare_site.py` が止まる
- 新しいページを作ったら、ルートの `.nav.yml` と `INDEX.md` の目次にも加える
- `manual/` `dev/` `memo/` は 1 ファイル 1 ページ
- サイトの見た目は `assets/extra.css`（spec ごとに見出しのコメントで始まる塊を末尾に足す）、ブラウザの仕掛けは `assets/*.js`（`extra_javascript` で読む）。`prepare_site.py` が `assets/` を丸ごと写すので、ファイルを足しても前処理は変えない

## Naming Conventions

- **ukadoc-spec のファイル・ディレクトリ名**: ASCII のみ。イベント名・設定キーは名前そのまま（`OnBoot.md`）、さくらスクリプトは記号を英字にしたスラッグ（`bang-execute-filewatch.md`）。項目名の正本は H1
- **spec 名（`.kiro/specs/`）**: kebab-case の英語で、変更の中身が分かる名前にする
- **ukadoc-spec の作業ブランチ**: 変更の中身が分かる英語の名前にする

## 言語

- steering・spec など doc_edit 内の Markdown は日本語で書く
- ukadoc-spec の原稿は日本語の「だ/である調」（ukadoc-spec の規約）

---
_Document patterns, not file trees. New files following patterns shouldn't require updates_
_updated_at: 2026-10-25_
