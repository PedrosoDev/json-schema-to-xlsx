import { Header } from "../commons/type";
import { isEmptyArray } from "./is-empty-array";
import { isNotEmptyArray } from "./is-not-empty-array";

export function recursiveSubHeadersLength(header: Header): number {
  let counter = 0;

  if (isNotEmptyArray(header.subHeaders)) {
    counter += header.subHeaders.length;

    for (const subHeader of header.subHeaders) {
      counter += (recursiveSubHeadersLength(subHeader) || 1) - 1;
    }
  }

  return counter;
}
