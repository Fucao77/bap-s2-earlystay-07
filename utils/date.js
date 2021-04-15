export function dateToString(date) {
  const day = date.toLocaleString('default', { weekday: 'long' });
  const month = date.toLocaleString('default', { month: 'long' });
  return `${day} ${date.getDate()} ${month}`;
}
