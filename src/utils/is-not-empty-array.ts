import { isEmptyArray } from "./is-empty-array";

export function isNotEmptyArray<T>(array: T[] | undefined): array is T[] {
  return !isEmptyArray(array);
}
