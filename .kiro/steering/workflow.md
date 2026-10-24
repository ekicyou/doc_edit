# 開発ワークフロー

Kiro 仕様駆動開発の作業フロー、git の運用、完了基準（DoD）を定める。
kiro 系スキル（`kiro-start` `kiro-design` `kiro-impl` `kiro-complete` `kiro-next` `kiro-wave` など）は git の手順を複製せず、本ファイルの節を権威として参照する。

---

## 2 つのリポジトリ

| リポジトリ | 何を置くか | 運用 |
|---|---|---|
| **doc_edit**（ルート） | steering・spec（`.kiro/`）、サブモジュールの参照コミット | `main` に直接コミットして push する。PR は作らない |
| **ukadoc-spec**（サブモジュール） | UKADOC の原稿 | spec ごとの作業ブランチ → PR → squash マージ |

`pasta/` `areka/` `shiori4/` は読むだけの参照元で、コミットも push もしない。

### 作業場所

- **セッションは doc_edit のメインのチェックアウト `C:\home\maz\git\doc_edit` の `main` で動かす。** ハーネスの worktree は使わない（worktree の中ではサブモジュールの git データが worktree 側に置かれ、worktree を消すと失われるため）
- 複数のセッションが同じチェックアウトを共有する。だから **ukadoc-spec の原稿は `ukadoc-spec/` で直接書かず、spec ごとの作業木で書く**（下記）。`ukadoc-spec/` のチェックアウトは「doc_edit が記録している版」として置いておき、読む用に使う

### ukadoc-spec の作業木（spec ごと）

| 項目 | 値 |
|---|---|
| 場所 | `.worktrees/<feature>/`（doc_edit 直下。`.gitignore` 済み） |
| ブランチ | `<feature>`（spec 名と同じ） |
| 起点 | `origin/main`（ukadoc-spec の） |

```powershell
git -C ukadoc-spec fetch origin
git -C ukadoc-spec worktree add ../.worktrees/<feature> -b <feature> origin/main
```

- 最初に原稿を書き換える段（ふつうは `/kiro-impl` の最初のタスク）で作る。既にあればそのまま使う
- 原稿の編集・確認・コミットは、すべてこの作業木の中で行う（`git -C .worktrees/<feature> ...`）
- 原稿を読むだけなら `ukadoc-spec/` でよい。ただし spec を書く前に `git -C ukadoc-spec fetch origin` して、`origin/main` との差を意識する

---

## 仕様フェーズ

```
discovery → requirements → design → tasks → implementation → complete
```

| コマンド | 用途 |
|---|---|
| `/kiro-discovery "idea"` | 起票（brief.md）。複数 spec なら roadmap |
| `/kiro-start {feature}` | 要件の生成・ギャップ分析・要件の話し合い |
| `/kiro-design {feature}` | 設計の生成・設計の検証・設計の話し合い |
| `/kiro-spec-tasks {feature}` | タスク分解 |
| `/kiro-impl {feature} [tasks]` | 実装（原稿の編集） |
| `/kiro-complete {feature}` | 完了（DoD → アーカイブ → PR → squash マージ → 記録） |
| `/kiro-next` | 棚卸と次のウェーブの計画 |
| `/kiro-wave` | ウェーブの spec を別セッションで一斉に始める |
| `/kiro-spec-status {feature}` | 進捗確認 |

---

## doc_edit への記録（コミット・push）

doc_edit は作業記録なので、**区切りごとにコミットしてすぐ push する**。PR・squash マージは doc_edit では行わない。

```powershell
git add -- <自分の触ったパス>
git commit -m "<type>(<scope>): <summary>" -- <自分の触ったパス>
git pull --no-rebase --no-edit origin main   # 他の場所から進んでいたら取り込む
git push origin main
```

- **コミットは自分のパスだけに絞る**（`git add -A` を使わない）。同じチェックアウトで他のセッションが作業中で、その未コミットの変更を巻き込まないため
- 取り込みは merge で行う（rebase は作業ツリーが汚れていると止まり、他のセッションの変更を退避させてしまうため）。ぶつかったら止めて開発者へ報告する
- タイプ: `docs`（spec・steering の文書）、`chore`（spec の移動、サブモジュールの参照コミットの更新）、`feat` / `fix`（スキルの追加・修正）
- push は確認なしで行ってよい（作者の方針: doc_edit は main をひたすらコミット・プッシュする）

---

## 完了基準（DoD）

すべて同時に満たすこと。

1. **Spec Gate**: 全フェーズ承認済み
2. **Build Gate**: spec の作業木で次の 2 つが通る（どちらも exit 0）
   ```powershell
   python scripts/prepare_site.py   # 各 index.md の「## 一覧」と中身の食い違いを検査
   zensical build --strict          # リンク切れ・アンカー切れで失敗する
   ```
   初回は `pip install -r requirements.txt` が要る。doc_edit 直下の `.venv/`（`.gitignore` 済み）に入れるのを勧める
3. **規約 Gate**: 変更が `ukadoc-spec/CLAUDE.md` の規約に沿っている（書式・文体「だ/である調」・ファイル名は ASCII・`index.md` の `## 一覧`・新しいページなら `.nav.yml` と `INDEX.md` の目次）
4. **Doc Gate**: 仕様の差分を spec の文書に反映した
5. **Steering Gate**: doc_edit の steering と整合している（自作アプリの載せ方など、初めて決めたことは steering に書き足した）

---

## 実装完了時アクション

### 1. 原稿のコミット（ukadoc-spec の作業木）

```powershell
git -C .worktrees/<feature> add -A
git -C .worktrees/<feature> commit -m "<変更を 1 文で表す日本語>"
```

ukadoc-spec のコミットメッセージは、既存の履歴にそろえて **型の接頭辞を付けない日本語の 1 文** にする（例: 「ヘッダの緑を濃くし（#2e8233）、文字を白にして見やすくする」）。作業木は spec 専用なので `-A` でよい。

### 2. spec のアーカイブ（doc_edit）

```powershell
Move-Item .kiro/specs/<feature> .kiro/specs/completed/
# 移動の直後に .kiro/specs/completed/<feature>/spec.json の phase を "completed" にする
```

spec.json の更新は移動の**直後**に行う（移動前に更新すると、エディタがファイルを復活させることがある）。コミットと push は「doc_edit への記録」に従う。

### 3. ukadoc-spec への反映（PR → squash マージ）

ukadoc-spec の `main` に入った時点で GitHub Pages の公開サイトが更新される。だから PR とマージは、開発者が完了を承認した `/kiro-complete` の中でだけ行う。

```powershell
git -C .worktrees/<feature> push -u origin <feature>
gh pr create --repo ukatech/ukadoc-spec --base main --head <feature> --title "<subject>" --body "<body>"
gh pr merge <PR 番号> --repo ukatech/ukadoc-spec --squash --delete-branch --subject "<subject>" --body "<body>"
gh pr view <PR 番号> --repo ukatech/ukadoc-spec --json state,mergeCommit   # MERGED を確かめる
```

- **ukadoc-spec の `main` へ直接 push しない**（ブランチ保護は無いが、push した時点で公開される）
- 1 spec = 1 ブランチ = 1 PR。完了時に 1 回だけ PR を作り、squash マージする
- **CI を待たない**。ukadoc-spec に PR の CI は無く、`main` への push で走るのは公開のビルドだけである。マージ前の関門は Build Gate（ローカルの `build --strict`）
- マージの成否は `gh pr merge` の結果と `gh pr view` の `MERGED` だけで判断する。`--delete-branch` のローカル削除の警告（作業木でチェックアウト中）は失敗ではない
- PR の作成・マージが失敗したら（衝突・権限・mergeable でない）、**ブランチも作業木も消さずに**止めて開発者へ報告する
- PR の body の末尾には帰属表示の行を付ける

#### squash メッセージの作り方

1. `git -C .worktrees/<feature> log --no-merges --pretty=format:"%h %s%n%b" origin/main..HEAD` で分岐点以降のコミットを集める
2. spec の `requirements.md` / `design.md` の概要で目的を補う
3. **subject**: 変更全体を表す日本語の 1 文（型の接頭辞なし。ukadoc-spec の履歴にそろえる）
4. **body**: 何を・なぜ変えたかを 3〜7 項目の箇条書きに。些末なコミットはまとめる

### 4. 後始末と記録（doc_edit）

マージを確かめたら、次の順に行う。

```powershell
# 作業木とローカルブランチを片付ける（squash マージなので -D。MERGED を確かめた後に限る）
git -C ukadoc-spec worktree remove ../.worktrees/<feature>
git -C ukadoc-spec branch -D <feature>

# 記録している版を、マージ後の main に進める
git -C ukadoc-spec checkout main
git -C ukadoc-spec pull --ff-only origin main
```

続けて、サブモジュールの参照コミットの更新を「doc_edit への記録」でコミットして push する（`chore(ukadoc-spec): <feature> のマージ後の版に進める`。PR の URL を本文に書く）。spec のアーカイブと同じコミットにまとめてもよい。

---

## タスク生成ルール

`/kiro-spec-tasks` は、すべての実装タスクの後に次の最終タスクを**必ず**加える（削除・省略しない）。

```markdown
- [ ] N. 整合性の確認と更新
  - ukadoc-spec: 触ったディレクトリの `index.md` の `## 一覧`、新しいページなら `.nav.yml` と `INDEX.md`、必要なら `llms.txt`
  - Build Gate（`prepare_site.py` と `zensical build --strict`）が通る
  - doc_edit: 初めて決めた方針（自作アプリの載せ方など）を steering に書き足す
```

- タスクには触るファイル（作業木からのパス）と完了条件を書く
- 1 タスクは 1 コミットにできる大きさにする

---

## 禁止事項

### 危険な git 操作

複数のセッションが同じチェックアウトを共有するので、他のセッションの未コミットの作業を巻き込む操作は禁止する。

| 禁止 | 理由 | 代わり |
|---|---|---|
| `git add -A`（doc_edit で） | 他のセッションの変更を巻き込む | 自分のパスだけを add・commit する |
| `git reset --hard` | 未コミットの変更が消える | `git status` で確かめ、必要なら個別に戻す |
| `git checkout -- <file>` / `git restore <file>`（他人のファイル） | 他のセッションの変更を消す | 自分のファイルか `git diff` で確かめてから |
| `git clean -fd` | 未追跡ファイルが消える | `git clean -fdn` で確かめて個別に消す |
| `git revert <commit>` | 他のセッションの作業を巻き込む | `git show` で差分を見て、手で逆の変更を作る |
| `git rebase` / `git pull --rebase`（doc_edit で） | 作業ツリーが汚れていると止まる・退避させる | `git pull --no-rebase --no-edit` |
| ukadoc-spec の `main` への push | 即公開される | PR → squash マージ |

コミットの前に必ず `git status` を見る。迷ったら開発者に確かめる。

### 完成の言い方

「MVP」「部分実装」「とりあえず動く」を完成の宣言に使わない。「Build Gate 通過」「DoD 通過」「タスク待ち（未完成）」のように言う。

---
_updated_at: 2026-10-24_
