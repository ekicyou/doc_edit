# Implementation Plan

- [ ] 1. 土台: 作業木と変更の前の控え
- [x] 1.1 ukadoc-spec の `origin/main` の最新からこの spec の作業木を作り、プレビューを起動する
  - ukadoc-spec を fetch し、`origin/main` から作業木 `.worktrees/site-look-sstp-playback/` とブランチ `site-look-sstp-playback` を作る。ukadoc-spec のメインのチェックアウトは使わない
  - 作った直後に追う先を外す（素の `git push` で `main` に送らないため）
  - 作業木で `prepare_site.py` と `zensical build --strict` を流してから `zensical serve` を起動する（doc_edit の `.venv` を使う）
  - 作業木の先頭が `origin/main` と同じコミットで、ブランチに追う先が無く、`/ukadoc-spec/list/sakura-script/` の頁がプレビューで開ける
  - _Requirements: 9.4_

- [x] 1.2 変更の前の控えを書き出して配り、比べる数・通信・索引を取る
  - 作業木の HEAD を `git archive` で Claude のスクラッチの下の新しいフォルダに書き出し、`prepare_site.py` と `zensical build --strict` を流して、`_site/` を 8000 以外の口（例: 8040）で配る。控えの置き場と書き出したコミットを控える
  - 3 頁の `article` の中の見出しの id の並び・`a.headerlink` の数・`md-nav__link` の数、`list/sakura-script` の 287 個の `code.innerText`、`search.json` を控える
  - 開いた時点の通信を記録する使い捨てのスクリプト（Edge ヘッドレス + CDP の `Network`。置き場はスクラッチ）を書き、3 頁と `list/plugin-event` を押さずに 3 秒開いて、要求の URL の並びを控える（後の 4.1 で同じスクリプトを使う）
  - spec の `verification.md` を作り、「変更の前」の節に、控えの置き場・コミット・控えた数と通信の並びが書いてある。doc_edit で spec の道だけをコミットして push してある
  - _Requirements: 7.3, 7.5, 7.6, 10.2_

- [ ] 2. 送る仕掛けと見た目
- [x] 2.1 `mkdocs.yml` にスクリプトの読み込みを足し、`assets/sstp.js` を書く
  - プレビューを止めてから書く（書きかけの `_site_src/` を拾わせない）
  - 設計の「Modified Files」のとおり、`mkdocs.yml` の `extra_css` の後に `extra_javascript` の `assets/sstp.js` を足す。ほかの行と `scripts/prepare_site.py`・`site_ext/`・`requirements.txt` には触らない
  - `assets/sstp.js` を設計の見本のとおりに書く: 道による 3 頁の見分け、頁の題の直後の説明・選ぶ欄・「読み込み」、`GetFMO` の読み、要求の字の組み立て（決まった 4 行・改行の拒否）と 15 秒の打ち切り、3 種類のボタンの置き場と送る中身（▶ はコピーのボタンの下、キーは表の直後の 1 行、`SKIP` の 10 個と名前の規則）、`data-sstp`、結果の字、二度押しの `disabled`、失敗で `hidden`
  - `fetch` は「読み込み」と送るボタンの押したときの処理の中にだけ置き、第三者のコードや外部の資源を読まず、旧サイトの `sakura_player.js` の字を写さない。注は短くする
  - `node --check` が通り、作業木に `mkdocs.yml` と `assets/sstp.js` の変更がある（振る舞いの確かめは 2.2 と 4.x）
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 2.1, 2.2, 2.3, 2.4, 2.5, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 4.1, 4.2, 4.3, 4.4, 4.5, 5.1, 5.2, 5.3, 5.4, 5.5, 6.1, 6.2, 6.3, 7.3, 7.4, 7.5, 7.8, 8.1, 8.2, 8.3, 8.4, 8.5, 9.2_

- [ ] 2.2 ScriptCheck: 作業木のスクリプトの純粋な部分を Node で確かめる
  - 作業木の `assets/sstp.js` から `request`・`show`・FMO の行の規則・状態の見分けを字を変えずに取り出して流す使い捨ての確かめを Claude のスクラッチに置く（ukadoc-spec にテストのファイルを足さない。何も送らない）
  - 設計の 6 例（`show('system.cpu.name')` の字、`SEND` の要求の字、CR+LF のある値の例外、FMO の 2 体と `path` だけの行、`404 Not Found` が失敗で `200 OK`・`204 No Content` が受け付け）を見る
  - 合わないときは 2.1 を直す
  - 6 例すべてが合い、`verification.md` の「ScriptCheck」の節に例と結果が書いてある
  - _Requirements: 3.2, 3.4, 10.1_

- [ ] 2.3 `extra.css` の末尾に送る欄とボタンの塊を足し、送る仕掛けと見た目を 1 コミットにする
  - 設計の「Modified Files」の塊を、今の末尾（`site-look-definition-tables:` の塊）の後ろに足す。ほかの塊・テーマの色には触らない。注は `/* site-look-sstp-playback: 手元のゴーストへ送る欄とボタン */` の 1 行だけにし、直書きの色を使わない
  - 作業木で `mkdocs.yml`・`assets/sstp.js`・`assets/extra.css` を 1 コミットにする（ukadoc-spec の履歴の型の日本語の 1 文、名前は `-c user.name=ekicyou -c user.email=dot.station@gmail.com` で渡す）
  - 作業木の `assets/extra.css` の末尾に設計どおりの塊が 1 つあり、3 つのファイルのコミットが 1 つできている
  - _Requirements: 7.1, 7.2, 7.3, 7.7, 8.4_

- [ ] 2.4 `CLAUDE.md` の「GitHub Pages」の節に送る仕掛けの 1 行を書き足してコミットする
  - 設計の差分のとおり、「見た目のための構造は、…JavaScript は使わない」の箇条の後ろに同じ深さで 1 行だけ足し、ほかの行は変えない
  - 作業木で 1 コミット（2.3 と同じ型）
  - `git show --stat` が `CLAUDE.md` の 1 行の追加だけである
  - _Requirements: 9.1, 9.3_

- [ ] 3. 配りと、手で押す確かめ（先に）
- [ ] 3.1 Build Gate を通し、プレビューを起動し直してスクリプトの配りを確かめる
  - プレビューを止めたまま、作業木で `.cache/` を消して `prepare_site.py` と `zensical build --strict` を流し、`serve` を起動し直す
  - `/ukadoc-spec/assets/sstp.js` が 200 で、全頁の HTML に `assets/sstp.js` の読み込みが 1 つずつあり、`/ukadoc-spec/assets/extra.css` に `site-look-sstp-playback:` の見出しのコメントがあることを見る。無ければ止めて作り直す
  - `prepare_site.py` と `build --strict` がどちらも exit 0 で、`git diff --stat origin/main` が `mkdocs.yml`・`CLAUDE.md`・`assets/extra.css`・`assets/sstp.js` だけである
  - _Requirements: 9.2, 9.4_

- [ ] 3.2 ManualSend の V1〜V4 を開発者に押してもらい、結果で進め方を決める
  - `verification.md` に設計の ManualSend の表（V0〜V4 の用意・押すもの・見るもの・だめなとき）を書き、プレビューの URL と Ctrl+F5 を添えて開発者に押してもらう。Claude は送らない
  - V1（読み込み）が通らなければ、ほかのタスクに進まず、止めて開発者に報告する
  - V2 で 1 体目が再生する・404 なら、`ReceiverGhostHWnd` を `ReceiverGhostName`、次に `Ghost` に替えて 2.1 を直すコミットを足し、2.2 と 3.1 をやり直してから、Ctrl+F5 を添えてもう一度押してもらう。どれも効かなければ止めて報告する
  - V2〜V4 で断られた種類があれば、設計の K の手順でその種類だけを外して 2.1 を直すコミットを足し（9.7）、2.4 の `CLAUDE.md` の 1 行から外した頁と種類を除いてコミットし、2.2 と 3.1 をやり直す。4.1・4.3 の見込み（その頁の欄 0・ボタン 0）も外した分に直す
  - `verification.md` の ManualSend の表に V1〜V4 の結果（届いたか・断られたか・状態の字）と、外した種類があればその理由が書いてあり、残った種類で進めることが決まっている。doc_edit で spec の道だけをコミットして push してある
  - _Requirements: 1.4, 1.5, 2.3, 3.2, 4.2, 5.1, 5.4, 9.7, 10.6_

- [ ] 4. 自動の確かめ（送らない）
- [ ] 4.1 PageCheck: build の HTML の候補の数、開いた時点の通信、欄の数、検索の索引を確かめる
  - 作業木の build の HTML を設計の当て先の規則で数える（記述例 287・置き換える部分の無いプロパティ 44・キー 34・イベント 272）。外した種類があればその分を 0 とし、要件の見込みとの差を書く
  - 1.2 の通信のスクリプトで、3 頁と `list/plugin-event` を押さずに 3 秒開き、`localhost:9801`・`127.0.0.1:9801` への要求 0、第三者のスクリプトの読み込み 0、`serve` の外への要求が控えと同じ並び（テーマのウェブフォントだけ）であることを見る
  - 3 頁で `.sstp-panel` が 1 つ、`list/plugin-event` と `index` で 0 であることを見る
  - 作業木と控えの `search.json` が同じことを見る
  - `verification.md` の「候補の数」「開いた時点の通信」「欄の数」「検索の索引」の節に、数と要件の見込みとの差、通信の並び、違い 0 が書いてある
  - _Requirements: 1.1, 1.2, 2.2, 3.5, 3.6, 4.5, 7.6, 8.1, 8.2, 10.2, 10.3_

- [ ] 4.2 (P) LoadedShot の道具 `tools/sstp-shot.mjs` を書き、何も外へ出ないことを確かめる
  - `site-look-plan` の `tools/shot.mjs` を写して spec の `tools/sstp-shot.mjs` に置き（元は変えない）、引数に `--loaded` を足す
  - CDP の `Fetch.enable` に `http://localhost:9801/*` と `http://127.0.0.1:9801/*` を渡し、本文が `EXECUTE` の `GetFMO` なら作り物の応答（ゴースト 2 体）を返し、それ以外の要求は `Fetch.failRequest` して実行を失敗で終える。押すのは「読み込み」だけにする
  - 設計の `LoadedResult`（前と後のボタンの数・欄の数・`scrollWidth`・`innerWidth`・要求の並び・食い違い）を JSON で出す
  - `list/sakura-script` で 1 回流して、要求の並びが `GetFMO` の 1 つだけで、`mismatches` が空の JSON が出る。doc_edit で spec の道だけをコミットして push してある
  - _Boundary: LoadedShot_
  - _Depends: 3.1_
  - _Requirements: 10.1_

- [ ] 4.3 LoadedShot で読み込みの後のボタンの数と中身・変わらないもの・幅 375・キーボードを確かめる
  - 3 頁で `--loaded` を流し、読み込みの前のボタン 0、後のボタンの数が 4.1 の候補の数と同じであることを見る
  - 記述例の 287 個で `data-sstp` の `Script` と `Reference0` が `code.textContent` の末尾の改行を取った字と同じ、キーの 34 個の名前が `{base}.{キー}`、`SKIP` の 10 個のボタン 0、`NOTIFY` に `Reference` 0、`[SET有効]` の項目にも「値を見る」が付き送る中身が読むスクリプトだけであることを見る
  - 読み込みの後で、3 頁の `article` の中の id の並び・`a.headerlink`・`md-nav__link` の数と 287 個の `code.innerText` が 1.2 の控えと同じことを見る
  - 3 頁の前と後で、幅 375 の明・暗の `scrollWidth` と `innerWidth` が同じ 375 であることを見る
  - Tab で「読み込み」と送るボタンに移れ、Enter で「読み込み」が押せること（作り物の応答で）と、アクセシビリティの木で送るボタンの名前が「{名前} の値を見る」などになることを見る（送るボタンは押さない）
  - `verification.md` の「読み込みの後」「変わらないもの」「幅 375」「キーボードと読み上げ」の節に、数・食い違い 0・幅・名前の例が書いてある
  - _Depends: 4.2_
  - _Requirements: 1.3, 1.5, 2.1, 2.4, 2.5, 3.1, 3.3, 3.7, 4.1, 4.3, 4.4, 7.3, 7.5, 7.7, 7.8, 10.1, 10.3, 10.5_

- [ ] 5. 対比と画面
- [ ] 5.1 ukadoc-spec の `origin/main` に追いつき、測る版を決める
  - ukadoc-spec を fetch し、`origin/main` が作業木の分岐点から進んでいれば作業木で merge する。ぶつかったら `mkdocs.yml` は両方の行を、`extra.css` は両方の塊を、`CLAUDE.md` は両方の行を残して直す
  - merge したときは 3.1 をやり直し、控え（1.2）を新しい `origin/main` から作り直して 4.1・4.3 をやり直し、`verification.md` の数を直す
  - `origin/main` が作業木の先祖で、Build Gate が exit 0 で、測る版が `verification.md` に書いてある
  - _Requirements: 9.4_

- [ ] 5.2 欄・ボタン・結果・▶ の対比を明・暗で測る
  - 作り物の応答で読み込んだ頁で、欄の説明・選ぶ欄・「読み込み」・送るボタン・結果の字と、それぞれの地（ボタンの地・欄の地・項目名の帯の地・記述例の箱の地）を `getComputedStyle` から重ねて WCAG 2.x の対比を出す。結果の字は作り物の字を入れて測る
  - ▶ のアイコンの色（ふだんと、マウスを載せたか選んだとき）と記述例の箱の地の対比を測る
  - 字が 4.5:1、▶ が 3:1 を割ったら、テーマの変数の範囲で 2.3 の塊を直してコミットし、3.1 をやり直して、対比と 4.3 の幅 375・変わらないものを測り直す。変数で満たせないときは止めて、測った数と代わりの案を添えて開発者に提示する
  - `verification.md` の「対比」の節に、明・暗のすべての所の色・地・対比が書いてあり、すべて線を満たすか、開発者の判断を待つ状態で止まっている
  - _Requirements: 7.1_

- [ ] 5.3 読み込みの前と後の画面を撮り、目標の画面と見比べる
  - 作業木の `serve` で、`sstp-shot.mjs` の `--loaded` 無しで `before-*`、`--loaded` 付きで `after-*` を、設計の画面の一覧の 5 つの当て先 × 明・暗（1000×700）ずつ、計 20 枚撮って spec の `screenshots/` に置く。二重に重なった跡があれば撮り直し、枚数を控える
  - 記述例の箱・名前と説明の表・項目名の帯・対応の札の見え方が、`before-*` と目標の画面（`mock-sakura-script-C21-*`・`mock-propertysystem-C23-*`・`mock-shiori-event-C23-*`）と同じであること、記述例の `\` が `\` のまま見えること、欄の説明が読み込みの前から 1 か所だけ見えることを見比べる
  - 開発者に画面を見せるときは Ctrl+F5 を頼む
  - `before-*`・`after-*` の 20 枚がそろい、`verification.md` の「画面」の節に、見比べ・撮り直しの枚数が書いてある。doc_edit で spec の道だけをコミットして push してある
  - _Requirements: 6.1, 6.2, 7.2, 7.4, 10.4_

- [ ] 6. 残りの手の確かめと記録
- [ ] 6.1 ManualSend の V5〜V8 を開発者に押してもらう
  - `verification.md` の ManualSend の表に V5〜V8 を足し、プレビューの URL と Ctrl+F5 を添えて開発者に押してもらう。Claude は送らない
  - 合わない振る舞い（ダイアログが出る・送り直す・二度送る・選択が保たれない）があれば 2.1 を直してコミットし、3.1 と、当たる自動の確かめと、その手順をやり直す
  - V8 で許可の求めが出なければ「プレビューでは確かめられない」と書き、`fetch` が押したときの処理の中にしか無いことと、`fetch` の失敗が見つからない旨になることを作りで満たしたと記録する
  - `verification.md` の ManualSend の表に V5〜V8 の結果が書いてある
  - _Requirements: 1.6, 1.7, 1.8, 5.2, 5.3, 5.5, 10.6_

- [ ] 6.2 `verification.md` の記録を仕上げる
  - 頭に、測った版（作業木のコミット、`origin/main` の版）と日付、流した式（Build Gate・ScriptCheck・PageCheck・LoadedShot）をそのまま書く
  - 1.2・2.2・3.1・3.2・4.1・4.3・5.1〜5.3・6.1 の節がそろっていることを見て欠けを埋め、規約 Gate（`CLAUDE.md` の変更が「GitHub Pages」の 1 行だけ・塊の注が 1 行だけ）と `git diff --stat origin/main`、jsstp を使わなかったこと、外した種類とその理由（あれば）を書く
  - `verification.md` と `screenshots/` がそろい、設計の「Testing Strategy」の各項目の結果が書いてある。doc_edit で spec の道だけをコミットして push してある
  - _Requirements: 8.5, 9.2, 9.3, 9.7, 10.2, 10.3, 10.4, 10.5, 10.6_

- [ ] 6.3 PR の説明の材料をまとめ、作業木を `/kiro-complete` で PR に出せる状態にする
  - ukadoc-spec を fetch し、5.1 の後に `origin/main` がまた進んでいれば、5.1 と同じく追いつき、変わった所に当たる確かめをやり直して `verification.md` の版と結果を直す
  - `verification.md` の「PR の説明の材料」の節に、設計の「PR の説明」の 4 点（一連の最後の 1 本と出し済みの PR の番号・この PR だけで完結すること・`CLAUDE.md` の「JavaScript は使わない」と違う仕掛けであることと足したもの・ManualSend の要約と外した種類）と、PR は 1 本でマージせず `OPEN` で止めることを下書きする（番号は `gh pr list --repo ukatech/ukadoc-spec --state merged` で集める）
  - 作業木の変更をすべてコミットし、push も PR もしない（PR は `/kiro-complete` で作る）。プレビューと控えの配りを止め、スクラッチの控えを消す
  - 作業木に未コミットの変更が無く、`origin/main` が作業木の先祖で、ブランチ `site-look-sstp-playback` がまだ push されておらず、`verification.md` に PR の説明の材料がある
  - _Requirements: 9.1, 9.4, 9.5, 9.6, 9.8_

- [ ] 7. 整合性の確認と更新
  - ukadoc-spec: 新しい頁・ディレクトリは作らないので、`index.md` の `## 一覧`・`.nav.yml`・`INDEX.md`・`llms.txt` に足す所が無いことを確かめる
  - doc_edit: 初めて決めた方針（見た目ではなく手元の SSP へ送るためにだけ `assets/sstp.js` を `extra_javascript` で読み、第三者のコードを読まず、押すまで何もしないこと、送信の確かめは開発者が手で押すこと）を steering（`tech.md`・`structure.md`）に書き足し、「doc_edit への記録」のとおり自分の道だけをコミットして push する
  - 一覧に足す所が無いことが `verification.md` にあり、steering に方針の書き足しがある
  - _Requirements: 9.2, 9.3_

## Implementation Notes
- 2〜6 のタスクは同じ作業木の同じブランチにコミットし、プレビュー（`serve`）と `_site_src/` を共にするので、`(P)` は付けない。4.2 だけは doc_edit の `tools/` に道具を書くので、4.1 と並べてよい
- 手で押す確かめ（3.2・6.1）は開発者を待つ。V1 が通らなければ、そこで止める
- 控え（8a7d8da）の頁は、テーマのリポジトリの部品が pi.github.com に 2 回ずつ問い合わせる（設計の「ウェブフォントだけ」と違う）。4.1 は外への要求を並びではなく集まりで比べ、この差を書く
- 控えの rticle の中の id は見出しの id と同じ数（649・206・360）。4.3 は rticle の中のすべての id を headingIds と比べる（sstp.js が足した id も拾う）
- 通信の確かめは scratch の 
et.mjs <base> <path> [facts.json]（9801 を塞ぎ、触れたら exit 2）
- 4.3 で、287 個の ▶ の名前が「 の記述例を実行」と空にならないか（前に h3 が無い箱）を見る
