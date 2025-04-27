import { Header } from "../commons/type";
import { isEmptyArray } from "./is-empty-array";

export function getDepthOfHeader(header: Header): number {
  if (header.subHeaders && !isEmptyArray(header.subHeaders)) {
    return Math.max(...header.subHeaders.map(getDepthOfHeader)) + 1;
  }
  return 1;
}
