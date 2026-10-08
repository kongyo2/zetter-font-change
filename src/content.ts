/**
 * アップデートで追加された Pretendard JP（jsDelivr 配信の Web フォント）を読み込む <link> を取り除く。
 *
 * フォント指定そのものは content.css で元に戻している。Web フォント自体を読み込ませないことで、
 * サイト側が別のセレクタで Pretendard を直接指定した場合も元のフォントにフォールバックさせる。
 */
const PRETENDARD_STYLESHEET = 'link[rel~="stylesheet" i][href*="pretendard" i]';

function isPretendardStylesheet(node: Node): node is HTMLLinkElement {
  return node instanceof HTMLLinkElement && node.matches(PRETENDARD_STYLESHEET);
}

function removePretendardStylesheets(): void {
  for (const link of document.querySelectorAll(PRETENDARD_STYLESHEET)) {
    link.remove();
  }
}

if (document.readyState === "loading") {
  // document_start の時点では <head> がまだ無いので、HTML のパース中に追加される <link> を監視する。
  // タイムラインは DOM の更新が多いため、監視は DOMContentLoaded までに限る。
  const observer = new MutationObserver((records) => {
    for (const record of records) {
      for (const node of record.addedNodes) {
        if (isPretendardStylesheet(node)) {
          node.remove();
        }
      }
    }
  });
  observer.observe(document, { childList: true, subtree: true });

  document.addEventListener(
    "DOMContentLoaded",
    () => {
      observer.disconnect();
      removePretendardStylesheets();
    },
    { once: true },
  );
} else {
  removePretendardStylesheets();
}
