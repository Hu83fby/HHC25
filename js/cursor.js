export function setInteractiveCursor(isInteractive) {
  if (isInteractive) {
    document.body.classList.add('interactive-cursor');
  } else {
    document.body.classList.remove('interactive-cursor');
  }
}