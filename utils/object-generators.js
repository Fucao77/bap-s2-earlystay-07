/**
 *
 * @param {Array<number>} values
 * @param {string} subject
 * @returns {Array<{ label: string, value: string }}
 */
export function generateInputSelectorFeed(values, subject) {
  return values.map((value) => ({
    value: value,
    label: `${value} ${subject}${value > 1 ? 's' : ''}`,
  }));
}
