import { Header } from "../commons/type";
import { isEmptyArray } from "./is-empty-array";

export function recursiveSubHeadersLength(header: Header): number {
  let counter = 0;

  if (!isEmptyArray(header.subHeaders)) {
    counter += header.subHeaders.length;

    for (const subHeader of header.subHeaders) {
      counter += (recursiveSubHeadersLength(subHeader) || 1) - 1;
    }
  }

  return counter;
}
