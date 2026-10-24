# Requirements Document

## Project Description (Input)
- **誰が困っているか**: UKADOC の公開サイト（https://ukatech.github.io/ukadoc-spec/ ）で仕様を引くゴースト制作者と、サイトの見た目を直したい doc_edit の開発者
- **いまの状況**: サイトは Zensical 0.0.67 の Material テーマ（`variant: classic`）に、20 行ほどの `assets/extra.css` を足しただけで、旧サイト（https://ssp.shillest.net/ukadoc-legacy/manual/ ）よりのっぺりして読みにくい。項目の切れ目・パラメータ・対応ベースウェア・記述例がひと目で見分けにくく、伺からしい遊びも無い。旧サイトとの見比べはまだ誰もしておらず、直すべきところと直し方が決まっていないので、改造の spec を切り出せない
- **何を変えるか**: 旧サイトと今のサイトの同じ頁を見比べて差を記録し、代表的な 2〜3 頁に使い捨ての見た目の試作を当てて開発者が目で見て方向を決め、決めた方向を後続の改造 spec に切り分ける（`.kiro/steering/roadmap.md` と各 spec の `brief.md`）。ukadoc-spec への本番の変更と PR は行わない（詳細は `brief.md`）

## Introduction
この spec は、UKADOC の公開サイトの見た目を直すための**計画の spec** である。成果物は doc_edit の中だけに置く。

1. 旧サイトと今のサイトを見比べた記録（視認性で負けているところと、遊びを入れられそうなところ）
2. 代表的な頁に当てた使い捨ての試作と、その画面の記録
3. 開発者が試作を見て決めた方向の記録
4. 決めた方向を切り分けた後続の改造 spec（`.kiro/steering/roadmap.md` と、各 spec の `brief.md`）

「楽しさ」は好みの話で、文書だけでは合意がぶれる。だから試作を見て先に決め、後続の spec では方向を議論し直さずに済むようにする。

本文の主語「site-look-plan」は、この spec の作業とその成果物（調査記録・試作・決定の記録・roadmap・brief）を指す。

## Boundary Context
- **In scope**:
  - 旧サイトと今のサイトの見比べ。対象は `descript/` `list/` `spec/` のまとめ頁と、`manual/` の 1 ファイル 1 頁の頁
  - 視認性の改善候補と、遊びの候補の洗い出し（例: 注記をバルーン風にする、キャラクターを出す、さくらスクリプトに色を付ける。どれを採るかはこの spec の中で決める）
  - ukadoc-spec の作業木 `.worktrees/site-look-plan/` での使い捨ての試作と、その画面の記録
  - 後続 spec への切り分け（`.kiro/steering/roadmap.md` と、各 spec の `brief.md`）
  - 原稿を変えない spec を、ukadoc-spec への PR なしで締められるようにする doc_edit の手順の手直し（brief の Constraints にある「PR の段を飛ばす分岐」。spec にせず直接直す）
- **Out of scope**:
  - ukadoc-spec への本番の変更と PR（後続の spec が行う）
  - 原稿（Markdown）の書式・中身の変更
  - サイトの章立て（`.nav.yml`）の変更
  - Zensical の版上げ
  - 改造の実装そのもの
- **Adjacent expectations**:
  - ukadoc-spec の `main`（いまは `0e028a4`）と、旧サイト・今の公開サイトを読む対象にする。どれも書き換えない
  - 後続の改造 spec は、この spec が書く `brief.md` から `/kiro-start` で始まる。後続 spec の要件・設計は、この spec では決めない（方向と境界だけを渡す）
  - 試作の頁を見るときは、試作の変更をサイト用の写し（`_site_src/`）に写し直してから見る（brief の Constraints「serve の監視先」）

## Requirements

### Requirement 1: 旧サイトと今のサイトの見比べ
**Objective:** As a doc_edit の開発者, I want 旧サイトと今のサイトの同じ頁を並べて見比べた記録, so that 直すべきところを思い込みでなく事実で選べる

#### Acceptance Criteria
1. The site-look-plan shall 見比べの対象として、`descript/` `list/` `spec/` のまとめ頁と `manual/` の頁のそれぞれから少なくとも 1 頁を選び、旧サイトの頁と今のサイトの頁の組（両方の URL）を記録する（**前提**: 頁の種類ごとに代表を選べば足り、全頁は見比べない。対象の頁は OPEN QUESTION 1）
2. The site-look-plan shall 各組について、項目の切れ目・パラメータ・既定値・対応ベースウェア・記述例・注記（注・ヒント・非推奨）の見せ方を、旧サイトと今のサイトで比べた結果を記録する
3. When 旧サイトの方がひと目で見分けやすい見せ方が見つかったとき, the site-look-plan shall それを「視認性で負けているところ」として、どの頁のどの部分かと、旧サイトでどう見せているかを添えて記録する
4. When 旧サイトにあって今のサイトに無い機能や飾り（例: 対応ベースウェアの印、記述例の操作）が見つかったとき, the site-look-plan shall それを、視認性の差とは別の項目として記録する
5. The site-look-plan shall 今のサイトの方が優れている点（例: 検索、ダークモード、見出しへのリンク、狭い画面での表示）も記録し、後続の改造で失わないものとして挙げる
6. The site-look-plan shall 各差に、旧サイトと今のサイトの画面の記録（スクリーンショット）か、頁と位置を特定できる参照を付ける
7. If 旧サイトの頁が開けない、または対応する頁が今のサイトに無いとき, the site-look-plan shall その組を飛ばした理由を記録し、残りの組で見比べを続ける

### Requirement 2: 改善候補と遊びの候補の洗い出し
**Objective:** As a doc_edit の開発者, I want 見比べの結果から作った改善候補と遊びの候補の一覧, so that 試作に当てるものと後続 spec に回すものを選べる

#### Acceptance Criteria
1. The site-look-plan shall 候補ごとに、「視認性」か「遊び」かの区別と、それが解く差（Requirement 1 の記録）への参照を記録する
2. The site-look-plan shall 候補ごとに、実現に要る変更の種類（見た目の指定だけで済む／頁の組み立てを変える／サイトを作る処理を変える／画像を足す／ブラウザで動く仕掛けを足す）の見込みを記録する
3. If 候補が原稿（Markdown）の書式や中身の変更を要するとき, the site-look-plan shall その候補を「原稿の変更が要る」と明示し、この計画の採用候補から外すか、原稿を変えずに済む別の案を併記する
4. Where 候補が旧サイトの装飾画像や見た目の指定を使う案であるとき, the site-look-plan shall 再利用の許可が明記されていないことを記録し、画像は管理者への確認が要ること、見た目の指定は流用せずに書き直すことを候補に添える
5. Where 候補がサイト全体の表示に波及する（例: さくらスクリプトに色を付けると、言語指定の無いコードブロックの表示も変わる）とき, the site-look-plan shall 波及する範囲（どの種類のブロック・頁が変わるか）を候補に記録する
6. The site-look-plan shall 遊びの候補ごとに、読みやすさを損なわないための条件（例: 本文の読み取りを妨げない、明るい表示とダークモードの両方で読める）を記録する

### Requirement 3: 使い捨ての試作と画面の記録
**Objective:** As a doc_edit の開発者, I want 代表的な頁に当てた試作を、今の見た目と並べて目で見られること, so that 文書だけではぶれる「楽しさ」の合意を、画面を見て取れる

#### Acceptance Criteria
1. The site-look-plan shall 試作を当てる代表的な頁を 2〜3 頁選び、選んだ理由（どの差・候補を確かめられるか）を記録する
2. The site-look-plan shall 試作を ukadoc-spec の作業木 `.worktrees/site-look-plan/` の中だけで作り、ukadoc-spec の `main` にも、ほかのどのブランチにも push しない
3. When 開発者が試作を見るとき, the site-look-plan shall その試作をローカルのプレビューで開ける状態にし、試作の変更が表示に反映されていることを確かめてから見せる
4. The site-look-plan shall 試作ごとに、同じ頁の同じ位置について、今の見た目と試作の見た目の画面の記録を残す
5. The site-look-plan shall 画面の記録を spec のフォルダ（`.kiro/specs/site-look-plan/` の下）に置き、どの試作・どの候補の記録かが分かる名前か説明を付ける
6. The site-look-plan shall 試作の画面の記録を、明るい表示とダークモードの両方で残す（**前提**: 今のサイトにダークモードがあるため。要否は OPEN QUESTION 2）
7. If 試作がローカルで表示できない（作成や表示の処理が失敗する）とき, the site-look-plan shall 失敗した試作と原因の見立てを記録し、その候補を「試作で確かめられなかった」として決定の段へ渡す
8. The site-look-plan shall 試作の変更（見た目の指定や頁の組み立ての試し書き）を、後続 spec の参考として spec のフォルダに写しを残すか、残さないかを決めて記録する（**前提**: 写しは参考であって、後続 spec はそのまま使わずに書き直してよい）

### Requirement 4: 見た目の方向の決定
**Objective:** As a doc_edit の開発者, I want 試作を見て決めた方向が候補ごとに記録されていること, so that 後続の spec で方向を議論し直さずに済む

#### Acceptance Criteria
1. When 開発者が試作の画面を見て判断したとき, the site-look-plan shall 候補ごとに「採る」「採らない」「保留」のどれかと、その理由を記録する
2. The site-look-plan shall 方向の決定を、開発者が画面（試作のプレビューか画面の記録）を見た後にだけ記録し、開発者の判断なしに決定済みとしない
3. Where 候補が「採る」と決まったとき, the site-look-plan shall 見た目の目標（どの画面の記録のどの見え方を目指すか）を、後続 spec が参照できる形で記録する
4. Where 候補が「保留」になったとき, the site-look-plan shall 保留の理由と、決めるのに要るもの（例: 管理者の確認、別の試作）を記録する
5. If 候補どうしが両立しない（例: 同じ部分に別の見せ方を当てる）とき, the site-look-plan shall どちらを採ったかと、採らなかった方を記録する

### Requirement 5: 後続の改造 spec への切り分け
**Objective:** As a doc_edit の開発者, I want 決めた方向が、依存の順に並んだ後続 spec の roadmap と brief になっていること, so that 次の改造をそのまま `/kiro-start` で始められる

#### Acceptance Criteria
1. The site-look-plan shall 「採る」と決まった候補を、後続の改造 spec に割り当て、どの候補もどれか 1 つの spec か、意図して外したものとして記録されている状態にする
2. The site-look-plan shall `.kiro/steering/roadmap.md` を作り、後続の spec を依存の順に並べる（各行に spec 名・1 行の要約・依存する spec。`/kiro-next` と `/kiro-spec-batch` が読める `## Specs (dependency order)` の形）
3. The site-look-plan shall 後続の spec ごとに `.kiro/specs/<spec 名>/brief.md` を、discovery の brief の形（Problem / Current State / Desired Outcome / Approach / Scope / Boundary Candidates / Out of Boundary / Upstream / Downstream / Existing Spec Touchpoints / Constraints）で書く
4. The site-look-plan shall 各 brief に、決めた方向（Requirement 4 の記録）と、目標の画面の記録への参照を書き、後続 spec が方向を議論し直さずに要件へ進めるようにする
5. The site-look-plan shall 後続の spec を、他者も使う公開リポジトリへの PR として小さくレビューしやすい単位に切る。少なくとも、見た目の指定だけで済む改造と、サイトを作る処理に触れる改造（例: さくらスクリプトの着色）は別の spec にする
6. Where 遊びの候補が画像・キャラクター・ブラウザで動く仕掛けを要するとき, the site-look-plan shall それを視認性の改造とは別の spec に切り分ける
7. The site-look-plan shall 各 brief の Constraints に、その spec に当てはまる制約（旧サイトの素材の許可、サイト生成の道具の制限、試作で分かった表示の確かめ方、Requirement 1.5 の「失わないもの」）を書き写す
8. The site-look-plan shall 後続 spec の名前を、変更の中身が分かる kebab-case の英語にする（`.kiro/steering/structure.md` の命名）
9. When roadmap と brief を書き終えたとき, the site-look-plan shall 次に `/kiro-start` する spec を 1 つ名指しする

### Requirement 6: 計画の spec としての境界と後始末
**Objective:** As a doc_edit の開発者, I want この spec が ukadoc-spec と公開サイトを変えずに終わること, so that 計画の段で他者の使う公開リポジトリと公開サイトに影響を出さない

#### Acceptance Criteria
1. The site-look-plan shall ukadoc-spec に PR を作らず、ukadoc-spec のどのブランチにも push しない
2. The site-look-plan shall 原稿（Markdown）・`.nav.yml`・Zensical の版を変えない
3. The site-look-plan shall 成果物（調査記録・画面の記録・決定の記録・roadmap・brief）を doc_edit の中だけに置く
4. When この spec を完了するとき, the site-look-plan shall 試作の作業木 `.worktrees/site-look-plan/` とそのローカルブランチを捨てる。サブモジュール `ukadoc-spec/` の参照コミットは、この spec の作業としては進めない（`/kiro-start` などの同期で `origin/main` に追いつくのは除く）

### Requirement 7: 原稿を変えない spec の完了手順
**Objective:** As a doc_edit の開発者, I want 原稿を変えない spec を、ukadoc-spec への PR なしで完了の手順に通せること, so that この spec（と今後の計画の spec）が、PR とマージがある前提の手順で止まらずに締められる

#### Acceptance Criteria
1. When 原稿を変えない spec の完了を開発者が承認したとき, the doc_edit の完了手順 shall ukadoc-spec への PR・squash マージ・サブモジュールの参照コミットの更新を飛ばし、spec のアーカイブと doc_edit への記録を行う
2. While 完了の対象が原稿を変えない spec であるとき, the doc_edit の完了手順 shall 原稿を前提にした関門（作業木での Build Gate・規約 Gate）を、当てはまらないものとして扱い、そのことを完了の記録に書く
3. If 原稿を変えないはずの spec の作業木に、ukadoc-spec の `origin/main` からのコミットや未コミットの変更があるとき, the doc_edit の完了手順 shall 作業木を捨てずに止め、開発者に報告する
4. The site-look-plan shall この手順の手直しを、この spec の完了（`/kiro-complete`）より前に、spec にせず doc_edit の手順（スキルと steering）を直接直して済ませる（**前提**: brief の Constraints に従う。この spec のタスクに含めるかは OPEN QUESTION 3）
