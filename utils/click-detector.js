export function isClicked(target, element) {
  let currentTarget = target;

  while (currentTarget.tagName !== 'BODY') {
    if (currentTarget.isEqualNode(element)) {
      return true;
    }

    currentTarget = currentTarget.parentNode;
  }

  return false;
}
