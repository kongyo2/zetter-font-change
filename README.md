# Zetter フォント戻し

[Zetter](https://z-etter.com/) のフォントを、2026年10月のアップデート前の状態に戻す Chrome 拡張機能です（非公式）。

## 何が変わったのか

アップデートで次の 2 つが追加され、本文が Web フォントの **Pretendard JP** で表示されるようになりました。

- `https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/.../pretendardvariable-jp-dynamic-subset.min.css`（Pretendard JP の読み込み）
- `/type-refresh.css`（`html, body { font-family: var(--type-font-family); }` で Pretendard JP を指定）

アップデート前は `styles.css` の `:root` にあるシステムフォント（Windows なら Segoe UI ＋ 游ゴシック、Mac ならヒラギノ）で表示されていました。この指定はアップデート後も `styles.css` に残っています。

## この拡張機能がすること

- `src/content.css`: `--type-font-family` と `html, body` のフォント指定を、アップデート前のシステムフォントで上書きします。
- `src/content.ts`: Pretendard JP を読み込む `<link>` を取り除きます。サイト側が別の場所で Pretendard を指定しても元のフォントで表示されるようにするためで、フォントファイルのダウンロードもなくなります。

フォント以外（文字サイズ・余白など）や、等幅・丸ゴシックなど要素ごとに個別指定されたフォントには手を加えません。必要な権限は `z-etter.com` 上でのコンテンツスクリプトの実行だけです。

## インストール

Node.js 22.18 以上が必要です。

```sh
npm install
npm run build
```

1. Chrome で `chrome://extensions` を開く
2. 右上の「デベロッパー モード」をオンにする
3. 「パッケージ化されていない拡張機能を読み込む」から `dist` フォルダを選ぶ
4. Zetter のタブを再読み込みする

コードを変更したら `npm run build` し直して、`chrome://extensions` で拡張機能の更新ボタンを押してください。

## 開発用コマンド

| コマンド               | 内容                                                       |
| ---------------------- | ---------------------------------------------------------- |
| `npm run build`        | `dist/` にビルド                                           |
| `npm run watch`        | `src/` の変更を監視して再ビルド（`public/` の変更は対象外） |
| `npm run typecheck`    | TypeScript の型チェック                                    |
| `npm run lint`         | oxlint                                                     |
| `npm run format`       | Prettier で整形                                            |
| `npm run format:check` | Prettier の整形チェック                                    |
| `npm run check`        | 型チェック・lint・整形チェックをまとめて実行               |

## 構成

```
public/            dist/ にそのままコピーされるファイル
  manifest.json
  icons/
src/
  content.css      フォント指定の上書き
  content.ts       Pretendard JP の <link> を取り除く
scripts/
  build.ts         esbuild でビルドするスクリプト（Node.js で直接実行）
```

## 注意

Zetter 側の CSS がまた変わると、効かなくなることがあります。その場合は開発者ツールで `body` の `font-family` がどこから来ているかを確認し、`src/content.css` を合わせて直してください。
