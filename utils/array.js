/**
 *
 * @param {{min : number, max: number}} range
 * @returns {Array<number>}
 */
export function generateArrayOfValue({ min, max }) {
  console.log({ min, max });
  const array = [];

  for (let i = min; i <= max; i++) {
    array.push(i);
  }

  return array;
}
