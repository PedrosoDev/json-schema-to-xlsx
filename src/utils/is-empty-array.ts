export function isEmptyArray<T>(array: T[] | undefined): boolean {
  if (!array) return true;

  return array.length <= 0;
}
