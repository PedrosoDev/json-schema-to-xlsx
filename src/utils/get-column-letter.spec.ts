import { describe, it, expect } from "vitest";
import { getColumnLetter } from "./get-column-letter";

describe("getColumnLetter", () => {
  it('deve retornar "A" para a coluna 1', () => {
    expect(getColumnLetter(1)).toBe("A");
  });

  it('deve retornar "Z" para a coluna 26', () => {
    expect(getColumnLetter(26)).toBe("Z");
  });

  it('deve retornar "AA" para a coluna 27', () => {
    expect(getColumnLetter(27)).toBe("AA");
  });

  it('deve retornar "AZ" para a coluna 52', () => {
    expect(getColumnLetter(52)).toBe("AZ");
  });

  it('deve retornar "BA" para a coluna 53', () => {
    expect(getColumnLetter(53)).toBe("BA");
  });
});
