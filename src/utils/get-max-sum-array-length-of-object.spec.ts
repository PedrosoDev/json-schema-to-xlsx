import { describe, it, expect } from "vitest";
import { calculateArraysDepthOrSum } from "./get-max-sum-array-length-of-object";

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

    const result = calculateArraysDepthOrSum(data);
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

    const result = calculateArraysDepthOrSum(data);
    expect(result).toBe(6); // O comprimento máximo é 6 (3 + 3) que é a soma dos comprimentos dos arrays aninhados
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

    const result = calculateArraysDepthOrSum(data);
    expect(result).toBe(6); // O comprimento máximo é 6 (4 + 2), pois somando os comprimentos dos arrays aninhados
  });

  it("Teste", () => {
    const data = {
      name: "John Doe",
      age: 30,
      hobbies: [
        {
          hobby: "Reading",
          frequency: "Daily",
          subActivities: [
            { name: "Fiction", duration: 30 },
            { name: "Non-Fiction", duration: 20 },
          ],
        },
        {
          hobby: "Cycling",
          frequency: "Weekly",
          subActivities: [
            { name: "Mountain Biking", duration: 60 },
            { name: "Road Cycling", duration: 45 },
          ],
        },
      ],
    };

    const result = calculateArraysDepthOrSum(data);
    expect(result).toBe(6); // O comprimento máximo é 6 (2 + 2 + 2), pois somando os comprimentos dos arrays aninhados
  });
});
