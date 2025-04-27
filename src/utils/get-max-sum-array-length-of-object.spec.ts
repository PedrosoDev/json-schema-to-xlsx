import { describe, it, expect } from "vitest";
import { getMaxSumArrayLengthOfObject } from "./get-max-sum-array-length-of-object";

describe("getSumMaxArrayLengthOfObject", () => {
  it("deve retornar o comprimento máximo de arrays aninhados em um objeto", () => {
    const data = {
      a: [1, 2, 3],
      b: {
        c: [4, 5],
        d: {
          e: [6, 7, 8, 9],
          f: [10],
        },
      },
    };

    const result = getMaxSumArrayLengthOfObject(data);
    expect(result).toBe(4); // O comprimento máximo é 4 (o array [6, 7, 8, 9])
  });

  it("deve retornar o comprimento máximo de comprimento de arrays aninhados em um array", () => {
    const data = {
      array: [
        {
          subArray: [1, 2, 3],
        },
        {
          subArray: [4, 5, 6],
        },
      ],
    };

    const result = getMaxSumArrayLengthOfObject(data);
    expect(result).toBe(6); // O comprimento máximo é 3 (o array [6, 7, 8])
  });

  it("deve retornar coreto o comprimento máximo de arrays aninhados em um arrays", () => {
    const data = [
      {
        a: [1, 2, 3],
        b: {
          c: [4, 5],
          d: {
            e: [6, 7, 8, 9],
            f: [10],
          },
        },
      },
      {
        a: [11, 12],
        b: {
          c: [13, 14],
          d: {
            e: [15],
            f: [16, 17],
          },
        },
      },
    ];

    const result = getMaxSumArrayLengthOfObject(data);
    expect(result).toBe(6); // O comprimento máximo é 6 (4 + 2), pois somando os comprimentos dos arrays aninhados
  });
});
