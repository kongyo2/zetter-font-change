# Zetter フォント戻し

[![CI](https://github.com/kongyo2/zetter-font-change/actions/workflows/ci.yml/badge.svg)](https://github.com/kongyo2/zetter-font-change/actions/workflows/ci.yml)

[Zetter](https://z-etter.com/) のフォントを、2026年10月のアップデート前の状態に戻す Chrome 拡張機能です。

Zetter の運営とは関係のない、個人による非公式の拡張機能です。

## 何が変わったのか

アップデートで次の 2 つが追加され、本文が Web フォントの **Pretendard JP** で表示されるようになりました。

- `https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/.../pretendardvariable-jp-dynamic-subset.min.css`（Pretendard JP の読み込み）
- `/type-refresh.css`（`html, body { font-family: var(--type-font-family); }` で Pretendard JP を指定）

アップデート前は `styles.css` の `:root` にあるシステムフォント（Windows なら Segoe UI ＋ 游ゴシック、Mac ならヒラギノ）で表示されていました。この指定はアップデート後も `styles.css` に残っています。

## この拡張機能がすること

- `src/content.css`: `--type-font-family` と `html, body` のフォント指定を、アップデート前のシステムフォントで上書きします。
- `src/content.ts`: Pretendard JP を読み込む `<link>` を取り除きます。サイト側が別の場所で Pretendard を指定しても元のフォントで表示されるようにするためで、フォントファイルのダウンロードもなくなります。

フォント以外（文字サイズ・余白など）や、等幅・丸ゴシックなど要素ごとに個別指定されたフォントには手を加えません。必要な権限は `z-etter.com` 上でのコンテンツスクリプトの実行だけです。

## ライセンス

[MIT](LICENSE)
