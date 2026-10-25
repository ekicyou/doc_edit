---
name: kiro-complete
description: 'Kiro仕様駆動開発のSpec完了ワークフローを実行する（doc_edit 版）。未解決問題の棚卸（原則その場で解決・他specと重なるものはbriefへ申し送り・裁定や spec 1 本規模の例外だけ/kiro-discoveryで起票）→DoDゲート検証（Build Gate＝prepare_site.py と zensical build --strict）→原稿のコミット（ukadoc-spec の作業木）→completedフォルダ移動→spec.json更新→参照パス修正→ロードマップ更新→ukadoc-spec へ PR 作成（マージはしない。マージは ukadoc-spec のメンテナに任せる）→doc_edit の main へコミット・push までを中断なく完遂する。PR のマージ後に同じコマンドを再実行すると、作業木の後始末とサブモジュールの参照コミット更新だけを行う。doc_edit 自体には PR を作らない。Use when: 実装完了を承認する, 承認してください, 完了を承認, spec承認, approve implementation, kiro承認完了。DO NOT USE when: 実装が完了したのみ（承認の明示がない場合）、タスクが終わっただけ'
argument-hint: <feature-name>
---

# Kiro Spec 完了ワークフロー（doc_edit 版）

## 発動条件（必須）

> **⚠️ このスキルは開発者の明示的「承認」がある場合にのみ発動する。**
> この承認が、ukadoc-spec への PR の作成の承認を兼ねる（原稿を変えない spec では PR も無い。「例外: 原稿を変えない spec」）。
> **ukadoc-spec の PR はマージしない。** doc_edit の目的は ukadoc-spec への変更の提案を作ることであり、マージ（＝公開サイト https://ukatech.github.io/ukadoc-spec/ の更新）は ukadoc-spec のメンテナが判断する。書き込み権限があっても `gh pr merge` は使わない。
>
> 例外として、完了済みの spec の PR がマージされた後の再実行（「PR マージ後の後始末」）は、承認の言葉が無くても `/kiro-complete {feature}` の呼び出しで発動してよい。

### ✅ 発動する（承認の明示がある）
- 「実装完了を**承認**します」「**承認**してください」
- 「このspecを**承認**する」「**approve**」「kiro **承認**完了」

### ❌ 発動しない（承認の明示がない）
- 「実装が完了した」「タスクが全部終わった」
- 「spec完了」「アーカイブしてほしい」などの曖昧な表現のみ
- AIが自律的に「完了したと判断」した場合

### 承認が不明瞭なとき
発動を迷う場合は **発動しない**。必要なら開発者に確認する:
> 「実装完了の承認をいただけますか？承認いただいた場合、完了ワークフロー（ukadoc-spec への PR の作成を含む。マージはしません）を実行します。」

---

## いつ使うか
- 開発者が上記「発動する」に該当する承認を**明示的に**宣言したとき
- tasks.md の全タスクが `[x]` 完了している状態で使用

## 権威的ソース

> **このスキルは `.kiro/steering/workflow.md` に従う。**
> 2 つのリポジトリの運用、ukadoc-spec の作業木、完了基準（DoD）、コミット規約、PR の作成、後始末はすべて workflow.md を参照すること。
> このスキルは workflow.md の「実装完了時アクション」を**自動オーケストレーション**するものであり、ルールの複製は行わない。
> 原稿の書き方の正本は `ukadoc-spec/CLAUDE.md` である。

## 哲学
- **中断せず一連で完遂する** — 全ステップを止めずに実行
- **VSCodeの変更ファイル確定挙動を回避** — spec.json編集は移動後に行う
- **ステアリングが正** — DoD・コミット規約・禁止事項はすべて workflow.md に従う
- **繰り返し仕様は移動しない** — 繰り返し実行型の spec は常に `.kiro/specs/` 直下に留まる
- **未解決問題を取りこぼさない** — アーカイブした後では拾い漏れに気付けない。DoD ゲートより前に棚卸しし、原則その場で直し、例外に当たるものだけ申し送り・起票する（冒頭ステップ）
- **doc_edit は main に記録するだけ** — doc_edit には PR を作らない。PR は ukadoc-spec に対してだけ作る
- **ukadoc-spec は提案まで** — PR を作って止める。マージはメンテナに任せ、こちらからは決してマージしない

## 前提条件
- `.kiro/specs/{feature}/tasks.md` の全タスクが完了
- 原稿の変更が spec の作業木 `.worktrees/{pr}/`（ukadoc-spec のブランチ `{pr}`）にある
- セッションが doc_edit のメインのチェックアウト `C:\home\maz\git\doc_edit` の `main` で動いている（linked worktree や別ブランチなら止めて、そこで開き直すよう頼む）

## 例外: 繰り返し仕様

繰り返し実行型の spec（spec.json や requirements.md に「繰り返し」「repeatable」「定期実行」等の記述がある、`/kiro-impl` のたびにタスクがリセットされる設計）は `completed/` に**移動しない**。

繰り返し仕様の場合:
1. 冒頭ステップ（棚卸）・ステップ1（DoD検証）・ステップ2（原稿のコミット）を実行
2. ステップ3〜5（移動・パス更新・ロードマップ）をスキップ
3. ステップ7（ukadoc-spec への PR の作成）とステップ8（記録）を実行。作業木とブランチは PR のマージ後の後始末で消す（次の `/kiro-impl` が作り直す）。前の回の PR がまだ開いていれば、次の回を始める前に開発者に報告する
4. tasks.md のチェックボックスをリセット（全 `[x]` → `[ ]`）して、ステップ8 の記録に含める

## 例外: 原稿を変えない spec

`design.md` の Boundary Commitments に「この spec は原稿を変えない spec である」と書いた spec（計画の spec など）は、ukadoc-spec に PR を出さない。この spec では、承認は PR とマージを含まない。workflow.md「実装完了時アクション」の原稿を変えない spec の扱いに従い、次のように進める。

1. **冒頭ステップ**: ふつうどおり行う。その場の解決は doc_edit 側の記録（spec のフォルダ・brief・roadmap）で行い、作業木では直さない。
2. **ステップ0 の 4**: 作業木 `.worktrees/{pr}` が無くても止めない。あれば、`git -C .worktrees/{pr} log --oneline origin/main..HEAD` と `git -C .worktrees/{pr} status --porcelain` がどちらも空であることを確かめる。どちらかが空でなければ、**作業木を消さずに止めて**開発者に報告する。
3. **ステップ1**: Spec・Doc・Steering の各 Gate は確かめる。Build Gate と規約 Gate は「当てはまらない（原稿を変えない spec）」として、完了の記録（ステップ8 のコミットの本文と spec.json）に書く。
4. **ステップ2 とステップ7 は飛ばす**（原稿のコミット・push・PR の作成）。
5. **ステップ3〜6** はふつうどおり行う。ステップ4 で spec.json に `"ukadoc_spec": { "pr": "none", "reason": "原稿を変えない spec。Build Gate・規約 Gate は当てはまらない" }` を足す。
6. **ステップ8**: `MERGED` の確かめは要らない。作業木があれば `git -C ukadoc-spec worktree remove ../.worktrees/{pr}`（未追跡がビルドの生成物だけなら `--force`）と `git -C ukadoc-spec branch -D {pr}` で消す。`ukadoc-spec/` の checkout・pull はせず、サブモジュールの参照コミットは進めない（`git add` に `ukadoc-spec` を含めない）。コミットのメッセージは `chore({feature-name}): spec を完了してアーカイブする（原稿の変更なし・ukadoc-spec の PR なし）`。

---

## 手順

### 冒頭ステップ: 未解決問題の棚卸（原則その場で解決・例外だけ既存 spec へ申し送り／`/kiro-discovery` で起票）

DoD ゲートより前に、**実装中に発生した未解決問題のうち未起票のもの**を棚卸しし、**原則この spec の作業木でその場で解決**し、手順 3 の例外に当たるものだけを申し送りまたは起票する。完了してアーカイブした後では拾い漏れに気付けなくなるので、必ず最初に行う（繰り返し仕様でも行う）。その場の修正も Build Gate（ステップ1）の対象になるよう、DoD ゲートより前に済ませる。

1. **未解決問題を洗い出す**。拾う元は次の通り。
   - `tasks.md` の `## Implementation Notes`・`_Blocked:_` の付いたタスク
   - `design.md` の Open Questions / Risks / Revalidation Triggers
   - 実装・レビュー・最終検証（`/kiro-validate-impl`）の報告に残った未対応の指摘・先送り
   - 会話の中で「別 spec で」「後で」と決めたもの
2. **起票済みかを確かめる**。`.kiro/specs/`（`completed/` を含む）の brief.md と `.kiro/steering/roadmap.md` を検索する。本 spec の中で解決済みのものは除く。**「直さない」と裁定済みのものも除く**（roadmap・完了 spec の台帳に取り下げの記録が無いかを確かめる）。
3. **原則としてその場で解決する**。次の**どれかに当たるものだけ**を手順 4・5 へ回す（当たらなければ直す。迷ったら直す）。**本 spec の境界・要件の外の原稿に手が届くことは理由にならない**（なるべくその場で解決しクローズする。多少範囲が広がるのは許容する）。
   - 直し方が複数あり、開発者の裁定・要件の追加や改訂が要る（直し方が 1 通りに決まるなら、小さな判断は自分で下して直す）→ 手順 5
   - 進行中の他 spec の担当範囲（brief・roadmap の行）と重なる・その spec の作業木のブランチと衝突する → 手順 4
   - 規模が spec 1 本に相当する（目安: 数時間では終わらない・新しいページや新しい規格の追加が要る）→ 手順 5

   UKADOC は SSP 公式仕様書である。**既存の SSP の仕様の意味を変える直し**（項目の削除・既定値や挙動の記述の変更・`**対応:**` 行のベースウェアや版の書き換え）は、誤りの訂正であることが資料で確かめられない限り 1 つ目（裁定が要る）に当たる。誤字・リンク切れ・書式の崩れ・規約からの逸脱は直してよい。

   解決の作法:
   - 原稿の修正は 1 件 1 コミットで、spec の作業木に積む（`git -C .worktrees/{pr} commit -m "<日本語の 1 文>"`）。触るのが本 spec の範囲外なら、コミットの本文にその旨を 1 行書く。
   - 解決したものは `tasks.md` の `## Implementation Notes` に「完了時にその場で解決」として 1 行ずつ記録し、PR の body（ステップ7）にも載せる。
4. **担当 spec が既にあるものは、その brief.md へ申し送る**（新しく起票しない）。本 spec で変えた記述・構成（`design.md` の Revalidation Triggers に当たるもの、後続 spec が前提にしているページ・見出し・アンカーなど）が、担当 spec の brief.md に反映されていなければ、その brief.md に「申し送り（{feature-name} より）」として追記する。書くのは、変わった事実・見直しが要る論点・参照先（本 spec の design.md の節など）。担当 spec の要件・設計を先回りで決めない（論点として渡すだけ）。担当 spec が要件フェーズ以降に進んでいる（requirements.md がある）場合は、brief.md への追記に加えて開発者に報告する。
   - 手順 3 で他 spec と重なると分かった問題も、新しい spec を立てずにその brief.md へ「件 N」として足す。
   - 申し送り先の spec が要件の段より先に進んでいれば、brief.md に加えて roadmap のその spec の行にも 1 行足す。
5. **担当の無いものを `/kiro-discovery` で起票する**。Skill ツールで `kiro-discovery` を起動する。1 件ずつでも、まとめて 1 回でもよい。
   - 起票する件ごとに、手順 3 のどの例外に当たったかを 1 行で添える（PR の body にも載せる）。言えないものは起票せず手順 3 へ戻して直す。
   - **ハーネスの「別の作業として切り出す」チップ（`spawn_task`）は使わない。** チップは roadmap の台帳に載らない。出してしまっていたら `dismiss_task` で取り下げて起票し直す。
6. 申し送り・起票した brief.md・roadmap.md の変更はステップ8 の記録にまとめる。**その場で解決した件数・申し送った件数・起票した件数をそれぞれ明示して記録する。0 件なら「0 件」と書く**（黙って飛ばさない）。

### ステップ0: 決定的解決（portable context）

doc_edit 側の `{remote}` と `{default-branch}` を、**固定優先順序で1回だけ決定的に解決**する（`kiro-start` の Step 0 と同じ）。

1. **`{remote}`**: `git remote` に `origin` があれば `origin`。無ければ、リモートがちょうど 1 つならそれ。それ以外は none（doc_edit の pull・push を飛ばし、一度だけ警告する）。
2. **`{default-branch}`**: `{remote}` があれば `git symbolic-ref --quiet --short refs/remotes/{remote}/HEAD` から `"{remote}/"` を除いた名前。空ならローカルの `main`、無ければ `master`、それも無ければ現在のブランチ。
3. **作業場所の確認**: 現在のブランチが `{default-branch}` で、`git rev-parse --absolute-git-dir` と `git rev-parse --git-common-dir` の解決先が同じ（linked worktree でない）こと。違えば STOP して、メインのチェックアウトで開き直すよう頼む。
4. **`{pr}`（PR の単位）**: `.kiro/steering/roadmap.md` のこの spec の行の `PR:` の値。無ければ `{feature}`（workflow.md「PR の単位」）。同じ単位の spec を roadmap の並びで見て、この spec が**単位の最後か**（後ろに同じ単位の未完了の spec が無いか）を決める。単独の spec は常に最後である。
5. **spec の作業木**: `.worktrees/{pr}` があり、そのブランチが `{pr}` であること（`git -C .worktrees/{pr} branch --show-current`）。無ければ STOP して報告する（原稿の変更がどこにあるか分からないまま進めない）。原稿を変えない spec は「例外: 原稿を変えない spec」の 2 に従う。

ukadoc-spec 側のリモートは `origin`（`ukatech/ukadoc-spec`）、既定のブランチは `main` で固定である。

### ステップ1: DoD（完了基準）ゲート検証

`.kiro/steering/workflow.md` の「完了基準（DoD）」を読み込み、**workflow.md が定義する全ゲートを順に検証**する。判定ルールの本体は workflow.md（権威）にあり、このスキルは発火・オーケストレーションのみを行う。

1. **workflow.md を読み込む**（未読の場合）
2. **全ゲート**（現状: Spec / Build / 規約 / Doc / Steering）を順に検証する。ゲートの構成は workflow.md を正とし、ここで個数や内訳を固定しない。
3. **Build Gate**: spec の作業木で毎回実行する（セッション記録による省略はしない。原稿の確認は数秒で済むため）。
   ```powershell
   cd .worktrees/{pr}
   python scripts/prepare_site.py
   zensical build --strict
   ```
   doc_edit の `.venv` があればその python・zensical を使う。zensical が無ければ `pip install -r requirements.txt` を `.venv` に入れてから実行する。どちらかが非ゼロ終了したら中断する。
4. **規約 Gate**: `git -C .worktrees/{pr} diff --name-only origin/main...HEAD` で変更ファイルを出し、`ukadoc-spec/CLAUDE.md` の規約（書式・文体・ASCII のファイル名・`index.md` の `## 一覧`・新しいページなら `.nav.yml` と `INDEX.md`）に沿っているかを確かめる。
5. **いずれかのゲートが失敗した場合**: ワークフローを中断し、開発者に報告

### ステップ2: 原稿の未コミット分のコミット（ukadoc-spec の作業木）

作業木に残った変更をコミットする。作業木は spec 専用なので `-A` でよい。メッセージは ukadoc-spec の履歴にそろえ、**型の接頭辞を付けない日本語の 1 文**にする。

```powershell
git -C .worktrees/{pr} status --short
git -C .worktrees/{pr} add -A
git -C .worktrees/{pr} commit -m "<変更を 1 文で表す日本語>"
```

変更が無ければ飛ばす。

### ステップ3: completedフォルダへの移動（doc_edit）

```powershell
New-Item -ItemType Directory -Path ".kiro/specs/completed" -Force | Out-Null
Move-Item ".kiro/specs/{feature-name}" ".kiro/specs/completed/"
```

**重要**: この時点ではspec.jsonを**編集しない**。VSCodeが編集中のファイルを追跡しており、移動前に編集すると移動操作と競合してファイルが元の場所に復活する。

### ステップ4: spec.jsonのステータス更新

**移動完了後に** spec.json を更新する。

```json
{
  "phase": "completed",
  "completed_at": "YYYY-MM-DDTHH:MM:SSZ"
}
```

> **注意**: `"status"` フィールドは使用しない。`"phase": "completed"` のみで完了を表す。PR の URL は、ステップ8 で `"ukadoc_spec": { "pr": "<URL>", "state": "OPEN" }` として足す。マージ後のコミットは「PR マージ後の後始末」で `"state": "MERGED", "merge_commit": "<SHA>"` として足す。

### ステップ5: 参照パスの更新

他のspecファイルがこのspecを参照している場合、パスを更新する。

```powershell
Get-ChildItem ".kiro/specs" -Filter "*.md" -Recurse |
  Where-Object { $_.FullName -notlike "*completed*" } |
  Select-String -Pattern "{feature-name}" |
  Select-Object -ExpandProperty Path | Sort-Object -Unique
```

`.kiro/specs/{feature-name}/` → `.kiro/specs/completed/{feature-name}/` に置き換える。

### ステップ6: 追加更新チェック

#### 6-1. ロードマップ更新

`.kiro/steering/roadmap.md` があれば、完了した spec が載っているかを確かめる（`requirements.md` の紐付け → 開発者の指示 → roadmap の一覧の順に判断し、迷えば開発者に確認する）。載っていれば `- [ ] {feature-name}` を `- [x] {feature-name}` にする（`/kiro-next` の台帳の形ならその形に従う）。

#### 6-2. ステアリング更新

workflow.md の Steering Gate に従い、この spec で初めて決めたこと（自作アプリの情報の載せ方、ukadoc-spec の新しいページの置き方など）を steering（`product.md` `structure.md` など）に書き足す。

### ステップ7: ukadoc-spec への反映（PR の作成まで。マージはしない）

> **権威的ソース**: workflow.md「実装完了時アクション > 3. ukadoc-spec への反映」。1 spec = 1 ブランチ = 1 PR。**ukadoc-spec の `main` へ直接 push しない。`gh pr merge` を使わない**（マージはメンテナが行う）。確認不要（発動時の承認が兼ねる）で、以下を中断なく実行する。

#### 単位の途中の spec

この spec が単位の最後でなければ（ステップ0 の 4）、**PR を作らず、push もしない**。spec.json に `"ukadoc_spec": { "pr_unit": "{pr}", "state": "PENDING" }` を書いて（ステップ4）、ステップ8 の記録へ進む。作業木とブランチは、単位の次の spec が引き継ぐ。コミットのメッセージは `chore({feature-name}): spec を完了してアーカイブする（PR は単位 {pr} の最後の spec でまとめて出す）`。

#### PR 可否判定

単位の最後の spec で、次を**すべて満たす**ときだけ PR を作る。

1. 作業木のブランチが `{pr}`（`main` ではない）
2. `git -C .worktrees/{pr} log --oneline origin/main..HEAD` が 1 件以上ある
3. `gh auth status` が成功する

欠けたら PR を作らずに中断し、開発者に報告する（ステップ3〜6 の doc_edit 側の変更は、ステップ8 の記録だけ行ってよい）。

#### PR 作成

```powershell
git -C .worktrees/{pr} fetch origin
git -C .worktrees/{pr} merge --no-edit origin/main   # main が進んでいたら取り込む。ぶつかったら直してから Build Gate をやり直す
git -C .worktrees/{pr} push -u origin {pr}
gh pr create --repo ukatech/ukadoc-spec --base main --head {pr} --title "<subject>" --body "<body>"
gh pr view <PR 番号> --repo ukatech/ukadoc-spec --json state,url   # OPEN を確かめる
```

- 既に開いた PR があれば（`gh pr list --repo ukatech/ukadoc-spec --head {pr} --state open`）、それを使う。
- **CI を待たない。** ukadoc-spec に PR の CI は無い。PR を出す前の関門はステップ1 の Build Gate である。
- `gh` の引数でバックスラッシュを二重にしない。

**PR のタイトルと本文**（メンテナが squash マージするときの既定のメッセージになる）:
1. `git -C .worktrees/{pr} log --no-merges --pretty=format:"%h %s%n%b" origin/main..HEAD` で分岐点以降のコミットを集める
2. spec の `requirements.md` / `design.md` の概要で目的を補う（単位なら、単位のすべての spec の分）
3. **title**: 変更全体を表す日本語の 1 文（型の接頭辞なし。ukadoc-spec の履歴にそろえる）
4. **body**: 何を・なぜ変えたかを 3〜7 項目の箇条書き（単位なら spec ごとに小見出しを立ててよい）。その場で解決した件・起票した件（冒頭ステップ）も載せる。末尾に帰属表示の行を付ける

PR を作ったら、単位のすべての spec の `completed/<spec>/spec.json` の `ukadoc_spec` を `{ "pr_unit": "{pr}", "pr": "<URL>", "state": "OPEN" }` にする（ステップ8 の記録に含める）。

#### 中断条件

PR の**作成が失敗**した場合（衝突・権限不足など）は、**作業木もブランチも消さずに**中断し、開発者へ報告する。別の道具で回り込まない。

### ステップ8: 記録（doc_edit）

PR が `OPEN` であることを確かめたら、spec.json に PR の URL を足し（ステップ4 の注）、doc_edit に記録する。**作業木・ブランチは消さない**（レビューで直しを頼まれたら、作業木でコミットして `git -C .worktrees/{pr} push` する）。**`ukadoc-spec/` は進めず、参照コミットも更新しない**（`git add` に `ukadoc-spec` を含めない）。**自分のパスだけ**を add・commit し、push する（`git add -A` は使わない）。

```powershell
git add -- .kiro/specs/completed/{feature-name} .kiro/specs/{feature-name} <ステップ5・6 と冒頭ステップで触ったパス>
git commit -m "chore({feature-name}): spec を完了してアーカイブし、ukadoc-spec に PR #<番号> を出す" -- <同じパス>
git pull --no-rebase --no-edit {remote} {default-branch}
git push {remote} {default-branch}
```

- `.kiro/specs/{feature-name}` は移動元の削除をコミットに含めるために書く（`git add -- <消えたパス>` で削除が載る）。
- doc_edit には PR を作らない。
- pull がぶつかったら止めて報告する（コミットは手元に残る）。
- 開発者への報告に、PR の URL と「マージはメンテナ待ち。マージ後に `/kiro-complete {feature}` を再実行すると後始末する」を書く。

---

## PR マージ後の後始末（再実行）

`.kiro/specs/completed/{feature}/spec.json` の `ukadoc_spec.state` が `"OPEN"` の spec に `/kiro-complete {feature}` が呼ばれたら、冒頭ステップ〜ステップ8 は行わず、これだけを行う（workflow.md「4. 後始末と記録」）。単位の PR なら、単位のどの spec の名前で呼ばれてもよい（`{pr}` は spec.json の `pr_unit`）。

1. `gh pr view <PR の URL> --json state,mergeCommit` で状態を見る。
   - `MERGED` でなければ何も消さずに止め、状態を報告する（`OPEN` ならメンテナ待ち、`CLOSED` なら開発者の判断を待つ）。
2. `MERGED` なら片付けて、記録している版を進める。
   ```powershell
   git -C ukadoc-spec worktree remove ../.worktrees/{pr}   # 未追跡がビルドの生成物だけなら --force
   git -C ukadoc-spec branch -D {pr}                       # squash マージなので -D
   git -C ukadoc-spec checkout main
   git -C ukadoc-spec pull --ff-only origin main
   ```
3. 単位のすべての spec の spec.json の `ukadoc_spec` を `"state": "MERGED", "merge_commit": "<SHA>"` にし、記録する（下は単独の spec の例。単位なら全 spec の spec.json を並べる）。
   ```powershell
   git add -- ukadoc-spec .kiro/specs/completed/{feature-name}/spec.json
   git commit -m "chore(ukadoc-spec): {pr} のマージ後の版に進める" -- ukadoc-spec .kiro/specs/completed/{feature-name}/spec.json
   git pull --no-rebase --no-edit {remote} {default-branch}
   git push {remote} {default-branch}
   ```
   コミットの本文に PR の URL を書く。

---

## 完了チェックリスト

```
- [ ] ステップ0: doc_edit の {remote}/{default-branch} を解決、メインのチェックアウトの main で動いている、spec の作業木 .worktrees/{pr}（ブランチ {pr}）がある
- [ ] 冒頭ステップ: 未解決問題を棚卸し済み——原則その場で解決（作業木に 1 件 1 コミット・Implementation Notes に記録）、例外だけ申し送り／起票（件ごとに当たった例外を添える）。解決・申し送り・起票の件数を記録（0 件なら「0 件」）。DoD ゲートより前
- [ ] DoD 全ゲート通過（workflow.md 準拠: Spec / Build / 規約 / Doc / Steering）
- [ ] Build Gate: 作業木で prepare_site.py と zensical build --strict が exit 0
- [ ] 原稿の未コミット分をコミット済み（ステップ2、日本語の 1 文）
- [ ] completedフォルダへ移動済み（ステップ3）※繰り返し仕様はスキップ
- [ ] spec.json の phase を "completed" に更新済み（ステップ4、移動の後）※繰り返し仕様はスキップ
- [ ] 参照パス更新済み（ステップ5）※繰り返し仕様はスキップ
- [ ] ロードマップ・ステアリング更新済み（該当する場合）
- [ ] ukadoc-spec へ PR を作成（ステップ7）: origin/main を取り込み → push → gh pr create → gh pr view で OPEN を確認。gh pr merge はしない
- [ ] 記録（ステップ8）: 作業木とブランチは残し、ukadoc-spec/ と参照コミットは進めず、spec.json に PR の URL と "state": "OPEN" を書き、doc_edit の main に自分のパスだけコミットして push
- [ ] ※単位の途中の spec: PR も push もせず、spec.json に "pr_unit" と "state": "PENDING" を書き、作業木は単位の次の spec に引き継ぐ
- [ ] ※PR マージ後の再実行: MERGED を確かめてから作業木とブランチを片付け、ukadoc-spec/ を main の最新に進め、spec.json に merge_commit を書き、参照コミットと一緒にコミットして push
- [ ] ※原稿を変えない spec: 作業木にコミット・未コミットの変更が無いことを確かめ、Build・規約 Gate は「当てはまらない」と記録し、ステップ2・7 を飛ばし、作業木とブランチを消し、参照コミットは進めない（spec.json に "pr": "none"）
```

---

## エラー回避

### VSCode変更確定問題
- **症状**: 移動したファイルが元の場所に復活する
- **対策**: spec.jsonは必ずステップ4（移動後）で編集。移動前に編集しない

### 参照パス更新漏れ
- **症状**: 後続specが旧パスで参照しファイルが見つからない
- **対策**: ステップ5で `Select-String` による網羅的検索を実施

### 他のセッションの変更を巻き込む
- **症状**: doc_edit のコミットに、他のセッションが作業中のファイルが入る
- **対策**: `git add -A` を使わず、自分のパスだけを add・commit する。コミットの前に `git status --short` を見る

### Build Gate の失敗
- **症状**: `prepare_site.py` が一覧の食い違いで止まる、`zensical build --strict` がリンク切れ・アンカー切れで失敗する
- **対策**: ワークフローを中断し開発者に報告。直してから再実行する（`ukadoc-spec/CLAUDE.md` の「項目を追加・改名したとき」を見直す）

### PR の作成の失敗
- **症状**: `gh pr create` が失敗する（既存 PR・権限不足・ネットワーク）
- **対策**: **作業木もブランチも消さずに**中断して開発者へ報告。既存 PR があればそれを確かめて使う。失敗してもマージで回り込まない

### 作業木を消せない
- **症状**: `git worktree remove` が未追跡ファイル（`_site/` `_site_src/` など）で止まる
- **対策**: `git -C .worktrees/{pr} status --short --ignored` で中身を確かめ、ビルドの生成物だけなら `git -C ukadoc-spec worktree remove --force ../.worktrees/{pr}`。それ以外が残っていたら止めて報告する
