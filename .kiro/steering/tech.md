# Technology Stack

## Architecture

doc_edit は、cc-sdd の作業環境（ルート）と、4 つの git サブモジュールからなる。
ルートにはコードもビルドも無い。実体のある作業はサブモジュール `ukadoc-spec/` の中で行う。

| 役割 | サブモジュール | 書き込み |
|---|---|---|
| 更新対象 | `ukadoc-spec/`（`ukatech/ukadoc-spec`） | する（PR 経由） |
| 情報の参照元 | `pasta/` `areka/` `shiori4/`（`ekicyou/*`） | しない（読むだけ） |

## ukadoc-spec の技術

- **原稿**: Markdown（UTF-8、LF）。1 項目 1 ファイル
- **サイト生成**: Zensical（Material テーマ、設定は `mkdocs.yml`）。左メニューは `.nav.yml`（mkdocs-awesome-nav）
- **前処理**: `scripts/prepare_site.py` が各 `index.md` の `## 一覧` と中身を照合し、`_site_src/` に写す。見た目のためには、頁ごとの判断（どの頁のどの段落か）を attr_list の class にして写しに付けるところまでをする（メンテナの分担。ukadoc-spec の `CLAUDE.md` の「GitHub Pages」）
- **公開**: `main` への push で GitHub Actions がビルドし、GitHub Pages に出す（Python 3.12）
- **見た目の指定**: `assets/extra.css`。色はなるべく Material のテーマの色の変数（`--md-primary-fg-color` など）から取り、テーマの色が変わってもついてくるようにする。変数で出せない色（暗い表示のリンクの明るい紺、さくらスクリプトのタグの色、ベースウェアの札など）は、明・暗の地との対比を測って記録する（`site-look-plan` の試作で、テーマが緑から紺に変わったときに分かった）
- **構造と色付け**: `site_ext/`（ビルドの部品。`requirements.txt` の `-e ./site_ext` で入る）が受け持つ。class と木の形を見て作る構造（対応の札・名前と説明の表）は Python-Markdown の拡張 `site_ext/ukadoc_site/structure.py`、記述例とファイル構成の木の色付けは Pygments レキサー `site_ext/ukadoc_site/lexers.py`（`sakurascript`・`ss`・`filetree`）。ukadoc-spec の `CLAUDE.md` は、見た目のための構造を Zensical のカスタマイズの方法（`extra_css`、Markdown 拡張、Pygments）に載せ、「JavaScript は使わない」と書いている（2026-10-27。それまでの `assets/sakurascript.js`・`assets/filetree.js` は、メンテナが「Zensical のカスタマイズの方法に合わせ」てレキサーに移した）。記述例の誤り（閉じない `[` など）は救済せず、波線とビルドの警告で示して原稿を直させる
- **手元の SSP へ送るボタン**: `assets/sstp.js`（`mkdocs.yml` の `extra_javascript`）は見た目のためではなく、読み手の手元の SSP へ記述例・プロパティ・イベントを送るためにだけ読む。第三者のコードは読まず、「読み込み」を押すまで何もせず、`list/sakura-script`・`list/propertysystem`・`list/shiori-event` の 3 頁だけで動く。送信の確かめは開発者が手でボタンを押して行い、Claude はベースウェアへ何も送らない（自動の確かめは `.kiro/specs/site-look-sstp-playback/tools/sstp-shot.mjs` が CDP の Fetch で GetFMO を偽って答える）。当面リリースしない（2026-10-29 の開発者の判断。ukadoc-spec の作業木のローカルブランチ `site-look-sstp-playback` に置き、PR は出さない）

編集規約（書式・文体・リンク・項目の追加手順）の正本は `ukadoc-spec/CLAUDE.md` である。steering には写さず、そちらに従う。

## 参照元アプリの技術

いずれも Rust（edition 2024）のワークスペースで、各リポジトリに独自の `CLAUDE.md` と `.kiro/steering/` がある。
情報を引くときは、各リポジトリの README・`doc/`・steering を一次資料にする。ビルドやテストはしない。

## Development Standards

### 確認（ukadoc-spec を変えたら必ず）

```sh
cd ukadoc-spec
pip install -r requirements.txt   # 根で流す（-e ./site_ext を今のフォルダから読む）
python scripts/prepare_site.py   # 一覧と中身の食い違いを検査
zensical build --strict          # リンク切れ・アンカー切れで失敗する
zensical serve                   # http://127.0.0.1:8000/ukadoc-spec/ でプレビュー
```

`site_ext/` や `assets/` を直した後は `.cache/` を消してから build する（原稿の変わっていない頁が作り直されないことがある）。`build --strict` が通らない変更は PR にしない。

### git の運用

手順の正本は [workflow.md](workflow.md)。要点だけを挙げる。

- **doc_edit**: 作業記録用。`main` に区切りごとにコミットしてすぐ push する。PR は作らない
- **ukadoc-spec**: PR 運用。spec ごとの作業木 `.worktrees/<feature>/`（ブランチ `<feature>`）で書き、`/kiro-complete`（開発者の完了の承認）で `origin`（`ukatech/ukadoc-spec`、書き込み権限あり）へ push して PR を作り、そのままスクワッシュマージする（メンテナの許可により当面。`workflow.md`「3. ukadoc-spec への反映」）。fork は不要
- **ukadoc-spec の `main` には直接 push しない**。push した時点で公開サイトが更新されるため（技術的にはブランチ保護が無く、できてしまう）
- サブモジュールの参照コミットが動いたら、doc_edit 側で記録としてコミットする

## Key Technical Decisions

- **サブモジュールで置く**: ukadoc-spec 自身の `CLAUDE.md` と cc-sdd の `.claude/` `.kiro/` `CLAUDE.md` がぶつからないよう、doc_edit 直下ではなくサブモジュールとして分けた。参照コミットが残るので、作業記録の目的にも合う
- **メインのチェックアウトで作業する**: worktree の中でサブモジュールを扱うと、その git データが worktree 側に置かれ、worktree を消すと失われる。サブモジュールの操作は `C:\home\maz\git\doc_edit` の `main` で行う
- **migration/tools で再生成しない**: ukadoc-spec の Markdown は旧 HTML 版から変換したものだが、再生成するとこのリポジトリでの修正が上書きされる（ukadoc-spec の規約）

---
_updated_at: 2026-10-29_
