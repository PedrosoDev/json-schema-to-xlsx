export function isObject(value: any): value is object {
  return !!value && value.constructor === Object;
}
