import { isObject } from "./is-object";

export function calculateArraysDepthOrSum(data: object): number {
  const recursive = (data: any): number => {
    if (!data || typeof data !== "object") {
      return 0;
    }

    const lengthArray: number[] = [];

    if (Array.isArray(data)) {
      const hasArrayPropertyInArray = data.some((item) => {
        return (
          Array.isArray(item) ||
          (isObject(item) && Object.values(item).some(Array.isArray))
        );
      });

      if (!hasArrayPropertyInArray) return data.length;

      for (const value of data) {
        const length = recursive(value);
        lengthArray.push(length);
      }

      return lengthArray.reduce((acc, length) => acc + length, 0);
    } else if (isObject(data)) {
      for (const value of Object.values(data)) {
        const length = recursive(value);
        lengthArray.push(length);
      }
      return Math.max(...lengthArray, 0);
    }
  };

  return recursive(data);
}
