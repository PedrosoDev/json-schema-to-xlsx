export function getColumnLetter(column: number): string {
  const letters = [];
  while (column > 0) {
    const letter = String.fromCharCode(((column - 1) % 26) + 65);
    letters.unshift(letter);
    column = Math.floor((column - 1) / 26);
  }
  return letters.join("");
}
