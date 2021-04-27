export function formatToEuros(price) {
  const stringPrice = String(price);
  const int = stringPrice.substring(0, stringPrice.length - 2);
  const decimal = stringPrice.substring(
    stringPrice.length - 2,
    stringPrice.length
  );
  return `${int},${decimal}`;
}
