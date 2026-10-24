# Implementation Plan

この spec は**原稿を変えない spec** である（design.md の Boundary Commitments）。作業木 `.worktrees/site-look-plan/` は試作の置き場で、そこではコミットも push もしない。成果物は doc_edit の `.kiro/specs/site-look-plan/` の下に置き、タスクごとに doc_edit の `main` へコミットして push する。

文書のタスクには TDD の RED の証拠が当てはまらない。各タスクの完了の証拠は、design.md の Testing Strategy の確かめ（「記録の確かめ N」「試作の確かめ N」「境界の確かめ N」）の結果とする。

- [ ] 1. 画面の記録の道具を作る
  - `.kiro/specs/site-look-plan/tools/shot.mjs` を作る。Edge をヘッドレスで、使い捨てのプロファイル（一時フォルダ）と CDP のポートを付けて起動し、Node.js v26 の標準の `fetch` と `WebSocket` だけで操作する（新しいパッケージは入れない）
  - 引数は `<url> <selector> <out> [scheme] [width] [height]`（既定は `light`・1000・700）。明・暗は `Emulation.setEmulatedMedia` の `prefers-color-scheme` で切り替え、指定の要素をヘッダの高さの分を空けて上端近くに寄せて切り出す。`out` が `-` なら画像を書かずに測るだけ
  - 標準出力に `wrote`・`scrollWidth`・`innerWidth` を 1 行ずつ書く。セレクタが見つからない・頁が開けない・Edge が起動しないときは、理由の 1 行と終了コード 1 で終える。終わったら Edge を止める
  - 旧サイトの `list_sakura_script.html` と今の公開サイトの同じ頁で、明・暗それぞれ 1 回ずつ試し撮りし、Read で白紙でなく狙った要素が写っていることを目で見る。試し撮りの画像は `scratchpad` など spec の外に置き、`screenshots/` には残さない
  - 完了の状態: 試し撮りの 4 回が exit 0 で、存在しないセレクタを渡すと exit 1 と理由の 1 行が出る。終わった後に、道具が起動した Edge のプロセスが残っていない（試作の確かめ 3）
  - _Requirements: 1.6, 3.5, 3.6, 3.9_

- [ ] 2. 旧サイトと今のサイトを見比べ、候補を洗い出す
- [ ] 2.1 4 組の頁を見比べて差を記録する
  - `survey.md` を作る。「組」表に `list/sakura-script`・`descript/ghost`・`spec/shiori3`・`manual/ghost` の 4 組を、旧サイトの URL と、今のサイトの `site_url`（`https://ukatech.github.io/ukadoc-spec/...`）の URL と転送先の URL を並べて書く
  - 組ごとに 6 つの観点（項目の切れ目・パラメータ・既定値・対応ベースウェア・記述例・注記）の表を書く。当てはまらない観点は「該当なし」と書く
  - 差を `D01` からの通し番号で書き、種類（視認性／旧サイトだけ／失わないもの）・どの頁のどの部分か・旧サイトでの見せ方（視認性のとき）・根拠を付ける。根拠は `screenshots/survey-<page>-<Dnn>-<old|now>.png`（差 1 つにつき旧・今の 2 枚まで、明るい表示だけ）か、URL とセレクタ・見出しの組
  - 「失わないもの」に、検索・ダークモード・見出しへのリンク・狭い画面での表示を少なくとも挙げる。見た目の外の問題として、公開サイトが `https://ukatech.shillest.net/ukadoc-spec/` へ 301 で転送されるのに `site_url` が github.io のままである件も記録する
  - 開けない組・対応の無い組は「状態」を「飛ばした」にして理由を書き、残りの組を続ける
  - 完了の状態: 記録の確かめ 1 が通る（4 組・両方の URL・6 観点・各差の種類と根拠・参照した画面が `screenshots/` にある）
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7_

- [ ] 2.2 差から改善候補と遊びの候補を作る
  - `candidates.md` を作る。候補を `C01` からの通し番号で書き、区別（視認性／遊び）と解く差の ID（遊びで対応する差が無ければ「差なし（遊び）」）を付ける
  - 候補ごとに、変更の種類（`見た目の指定だけ`・`頁の組み立て`・`サイトを作る処理`・`画像を足す`・`ブラウザの仕掛け` から 1 つ以上）と、試作の当て先（`list/sakura-script`・`descript/ghost`・`manual/ghost` のどれか、または「試作しない」と理由）を書く。見込みには research.md の事実（`**対応:**` に class が無い、着色には `highlight` の言語の印かレキサーが要る）を使う
  - 原稿の変更が要る候補は「原稿: 要る」と書き、採用候補から外すか、原稿を変えない代案を併記する。旧サイトの画像・CSS を使う案には、許可が明記されていないこと（画像は管理者の確認、見た目の指定は書き直す）を添える
  - サイト全体に波及する候補には波及の範囲を書く（例: `highlight` を有効にするとコードブロック 449 個の HTML が変わり、言語指定の無い 162 個は印が付かない）。遊びの候補には読みやすさの条件を、送信・外部の読み込みの候補（記述例の再生など）には「利用者の操作を起点にする」「外部の読み込みの扱い」の論点を書く
  - 同じ部分に別の見せ方を当てる候補どうしを「両立しない組」の表に書く
  - 完了の状態: 記録の確かめ 2 が通る（各候補に区別・解く差・変更の種類・当て先があり、解く差の ID がすべて `survey.md` にあり、遊びに条件、送信・外部読み込みに論点がある）。3 頁それぞれに当てる候補が 1 つ以上ある
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 4.5_

- [ ] 3. 3 頁に使い捨ての試作を当てる
- [ ] 3.1 試作の土台を作り、今の見た目を撮る
  - 作業木が `origin/main` から始まっていることを確かめる（`git -C .worktrees/site-look-plan log --oneline origin/main..HEAD` が空）。`ukadoc-spec/` のメインのチェックアウトが `origin/main` と同じ版で汚れていないことも確かめる（`git -C ukadoc-spec rev-parse HEAD` が `origin/main` と同じ、`status --porcelain` が空）。どちらかが外れたら止めて開発者に報告する
  - 作業木に、候補の切り替えの仕掛けを足す: `assets/mockup.js`（URL の `?slp=C01,C03` を読んで `<html data-slp="C01 C03">` を付ける）と、`mkdocs.yml` の `extra_javascript`。原稿・`.nav.yml`・`requirements.txt` は触らない
  - `ukadoc-spec/` のメインのチェックアウト（`origin/main` と同じ版）で `prepare_site.py` を流し、`zensical serve -a 127.0.0.1:8001` で今の見た目を出す。候補の当て先の頁と位置ごとに `screenshots/mock-<page>-base-<light|dark>.png` を撮る（頁と位置ごとに明・暗の 2 枚まで）
  - `mockups/README.md` を作り、今の見た目を撮った版の短い SHA と、頁ごとの節の見出し（3 頁）を書く
  - 撮り終えたら、ポート 8001 の `serve` を止める
  - 完了の状態: 作業木で `prepare_site.py` と `zensical build --strict` が exit 0 で、`?slp=` を付けた頁の `<html>` に `data-slp` が付く。3 頁の `base` の明・暗の画面がそろっている（試作の確かめ 1・3）
  - _Requirements: 3.2, 3.4, 3.5, 3.6, 3.9, 6.1, 6.2_

- [ ] 3.2 `list/sakura-script` の頁に試作を当てる
  - `candidates.md` でこの頁に当てた候補を、作業木の使い捨てのファイル（`assets/extra.css` の `html[data-slp~="Cxx"]` の下、要るときだけ `scripts/prepare_site.py` の目印・`mkdocs.yml` の `pymdownx.highlight`・`assets/mockup.js`・`overrides/`・自作の仮の画像 `assets/image/slp-*`）に足す。旧サイトの素材は使わない
  - `prepare_site.py` を再実行し、`zensical build --strict` を通してから、`zensical serve` の頁の HTML に試作の目印（`slp-` の class か `mockup.js`）があることを確かめる
  - 候補ごとに `screenshots/mock-sakura-script-<Cnn>-<light|dark>.png` を、`base` と同じ URL・セレクタ・大きさで撮る。3.1 で撮っていない位置が要るときは、3.1 と同じくメインのチェックアウトをポート 8001 で出して `mock-<page>-base-*` を撮り足し、撮り終えたら止める。375 px の幅で `scrollWidth` と `innerWidth` を測る
  - タスクの終わりに、このタスクで起動した作業木の `serve` を止める
  - 作成・表示が失敗した候補は、失敗したコマンドと出力の要点・原因の見立てを `mockups/README.md` に書き、「試作で確かめられなかった」として残し、ほかの候補を続ける
  - 完了の状態: `mockups/README.md` のこの頁の節に、確かめた候補・反映の確かめの結果・375 px の結果（失敗があればその記録）があり、各候補の明・暗の画面がそろっている（試作の確かめ 1〜4）
  - _Requirements: 3.1, 3.3, 3.4, 3.6, 3.7, 3.9_

- [ ] 3.3 `descript/ghost` の頁に試作を当てる
  - 3.2 と同じ手順で、この頁に当てた候補を試作する（作業木の同じファイルに書き足すので、3.2 の後に行う）。`base` の撮り足しと、起動した `serve` を止めることも 3.2 と同じ
  - 画面は `screenshots/mock-descript-ghost-<Cnn>-<light|dark>.png`
  - 完了の状態: `mockups/README.md` のこの頁の節に、確かめた候補・反映の確かめの結果・375 px の結果があり、各候補の明・暗の画面がそろっている。3.2 の候補の目印も、引き続き `serve` の頁にある（試作の確かめ 1〜4）
  - _Requirements: 3.1, 3.3, 3.4, 3.6, 3.7, 3.9_

- [ ] 3.4 `manual/ghost` の頁に試作を当てる
  - 3.2 と同じ手順で、この頁に当てた候補を試作する（3.3 の後に行う）。`base` の撮り足しと、起動した `serve` を止めることも 3.2 と同じ
  - 画面は `screenshots/mock-manual-ghost-<Cnn>-<light|dark>.png`
  - 完了の状態: `mockups/README.md` のこの頁の節に、確かめた候補・反映の確かめの結果・375 px の結果があり、各候補の明・暗の画面がそろっている（試作の確かめ 1〜4）
  - _Requirements: 3.1, 3.3, 3.4, 3.6, 3.7, 3.9_

- [ ] 3.5 試作の写しを残す
  - 作業木で作った・変えたファイルの全文を `mockups/` に写す（`extra.css`、作ったときだけ `mockup.js`・`overrides/`・自作の仮の画像 `slp-*`）。作業木全体の差分を `mockups/worktree.diff` に書く（`git -C .worktrees/site-look-plan diff` と、未追跡ファイルの一覧）
  - 作業木ではコミットしない
  - 完了の状態: `git -C .worktrees/site-look-plan status --short` の各行が、`mockups/` の写しか `worktree.diff` に載っている。記録の確かめ 3 が通る
  - _Requirements: 3.8, 6.1_

- [ ] 4. 見た目の方向を決める
- [ ] 4.1 候補ごとの推奨を書く
  - `decisions.md` を作り、全候補を 1 行ずつ載せて「推奨」（採る／採らない／保留）と理由を書く。「判断」「理由」「目標」「保留」「行き先」の欄は空のままにする
  - 推奨が「採る」の候補には、目標にする画面（`mock-*.png`）とどこの見え方を目指すかの案を、推奨の理由に添える。「保留」を推奨する候補には、決めるのに要るものの案を添える
  - 「両立しない組」の表を `candidates.md` から写し、組ごとの推奨を書く。「試作で確かめられなかった」候補も載せる
  - 完了の状態: `decisions.md` に全候補の行があり、全行の「推奨」と理由が埋まり、「判断」は全行が空である
  - _Requirements: 4.1, 4.3, 4.4, 4.5_

- [ ] 4.2 推奨と画面を開発者に提示し、判断を受けて記録する
  - 作業木で `zensical serve` を起動し、3 頁それぞれの HTML に試作の目印があることを確かめる（この `serve` は判断の後も動かしたままにし、6 が止める）
  - 開発者に、候補ごとの推奨（1 行）、画面のパス、プレビューの URL（`?slp=` の付け方を含む）、両立しない組、「試作で確かめられなかった」候補を示し、止まって判断を待つ
  - 開発者の答えを、`decisions.md` の「判断」「理由」「目標」「保留」欄に開発者の言葉に沿って書く。答えに無い候補は「判断」を空のまま残し、確かめ直す（推奨を判断に写さない。開発者が「推奨どおり」と答えたときだけ、その旨を書いて写してよい）
  - 「判断の記録」の節に、判断した日付と、見たもの（プレビューか画面か）を書く。両立しない組には採った方と採らなかった方を書く
  - 完了の状態: 全候補の「判断」が埋まり、「採る」に目標の画面、「保留」に理由と要るものがあり、「判断の記録」に日付がある（記録の確かめ 4 の「行き先」以外）
  - _Requirements: 3.3, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

- [ ] 5. 後続の改造 spec に切り分ける
- [ ] 5.1 候補の行き先を決めて roadmap を書く
  - 「採る」の候補を後続 spec に割り当て、`decisions.md` の「行き先」に spec 名を書く。「採らない」「保留」の候補には「外した」と理由を書く
  - 切り分けの規則に従う: PR として小さくレビューしやすい単位にする。新しい依存や Markdown 拡張を足す改造（さくらスクリプトの着色など）は見た目の改造と別の spec にする。目印を付ける後処理やテンプレートの上書きは、その目印を使う見た目の改造と同じ spec に入れてよい。画像・キャラクター・ブラウザで動く仕掛けを要する遊びは、視認性の改造と別の spec にする
  - spec 名は変更の中身が分かる kebab-case の英語にする
  - `.kiro/steering/roadmap.md` を `/kiro-next` の形（`## 概要` / `## Specs (dependency order)` / `## バックログ` / `## 棚卸（YYYY-MM-DD・ukadoc-spec <origin/main の短い SHA>）`）で作る。先頭の行は `site-look-plan`、後続の行は依存の順（目印を作る spec が先、同じファイルを触る spec どうしは依存に書く）
  - `## バックログ` に、保留の候補と決めるのに要るもの、`site_url` が転送先と食い違う件を書く。`## 棚卸` に、次に `/kiro-start` する spec を 1 つと理由を書く
  - 完了の状態: `decisions.md` の全行に「行き先」があり、記録の確かめ 4 が通る。roadmap に 4 つの節があり、先頭の行が `site-look-plan` で、棚卸の節に次の spec が 1 つある
  - _Requirements: 5.1, 5.2, 5.5, 5.6, 5.8, 5.9_

- [ ] 5.2 後続 spec ごとに brief を書く
  - roadmap の後続 spec ごとに `.kiro/specs/<spec 名>/brief.md` を、discovery の形（Problem / Current State / Desired Outcome / Approach / Scope / Boundary Candidates / Out of Boundary / Upstream / Downstream / Existing Spec Touchpoints / Constraints）で書く。最初の行に起票元（`site-look-plan` の決定から）を書く
  - Desired Outcome に、`decisions.md` の候補の ID と判断と、目標の画面のパス（`.kiro/specs/site-look-plan/screenshots/...`。完了後は `completed/` の下に移ることを添える）を書く
  - Constraints に、当てはまるものを書き写す: 旧サイトの素材の許可、Zensical 0.0.67 の制限と試作で確かめた事実、表示の確かめ方（`prepare_site.py` の再実行、`serve` の頁で目印を確かめる、完了後のパス `.kiro/specs/completed/site-look-plan/tools/shot.mjs` で明・暗を撮る、375 px のはみ出し）、`survey.md` の「失わないもの」
  - 後続 spec の `spec.json` や `requirements.md` は作らない
  - 完了の状態: 記録の確かめ 5 が通る（「採る」の行き先の spec ごとに 11 の節がそろった `brief.md` があり、Desired Outcome に候補の ID と画面のパスがある）
  - _Requirements: 5.3, 5.4, 5.7, 5.8_

- [ ] 6. 計画の成果物の整合と作業木の片付け
  - roadmap と brief: どの候補にも行き先がある、spec 名が kebab-case の英語、次の spec が名指しされている（記録の確かめ 1〜5 を通しで流す）
  - 試作の写し（`mockups/`）がそろっている（`status --short` の各行が写しか `worktree.diff` に載っている。欠けていたら戻す前に写しを足す）
  - 作業木を `origin/main` と同じ状態に戻す（コミット 0・未コミットの変更 0）: `serve` を止め、作業木で変えたファイルを `git -C .worktrees/site-look-plan checkout -- <file>` で 1 つずつ戻し、未追跡のファイルを 1 つずつ消す（`git clean -fd` は使わない）。作業木に `origin/main` からのコミットがあれば、戻さずに止めて開発者に報告する。作業木とブランチそのものは消さない
  - 境界の確かめ 1〜5 を流す（作業木のコミットと変更が 0、`diff --name-only origin/main` が空、origin に `site-look-plan` ブランチが無い、doc_edit の変更がこの spec のフォルダ・後続の `brief.md`・`roadmap.md`・steering の書き足しだけ）。`screenshots/` の合計の大きさを `mockups/README.md` に記録する（10 MB 以内を目安）
  - 完了の手順の前提を確かめる: `.claude/skills/kiro-complete/SKILL.md` に「原稿を変えない spec」の分岐、`.kiro/steering/workflow.md` の DoD とタスク生成ルールに計画の spec の扱い、`.claude/skills/kiro-impl/SKILL.md` に開発者の判断を求めるタスクの扱いがある（設計の後に直接直したもの。無ければ開発者に報告する）
  - doc_edit: 初めて決めた方針を steering に書き足す
  - 完了の状態: 記録の確かめ 1〜5 と境界の確かめ 1〜5 がすべて通り、作業木の `log origin/main..HEAD` と `status --porcelain` が空で、完了の手順の 3 つの手直しがそろっている
  - _Requirements: 5.1, 5.9, 6.1, 6.2, 6.3, 6.4, 7.1, 7.2, 7.3, 7.4_
