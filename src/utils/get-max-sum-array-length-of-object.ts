export function getMaxSumArrayLengthOfObject(data: object): number {
  const recursive = (data: any, sumLength = 0): number => {
    if (typeof data !== "object") {
      return 0;
    }

    if (Array.isArray(data)) {
    }

    for (const value of Object.values(data)) {
      recursive(value, sumLength);
    }
  };

  return recursive(data);
}
