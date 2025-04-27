export function getMaxSumArrayLengthOfObject(data: object): number {
  // Se não for um objeto válido, retorna 0
  if (!data || typeof data !== "object") {
    return 0;
  }

  // Mapa para armazenar a soma dos comprimentos de arrays por caminho completo
  const propertyPaths: Record<string, number> = {};

  // Função auxiliar para calcular um identificador único para caminhos
  function getPathKey(path: string[]): string {
    // Removemos índices numéricos para agrupar arrays com o mesmo nome de propriedade
    return path.filter((p) => isNaN(parseInt(p))).join(".");
  }

  // Função auxiliar para percorrer a estrutura recursivamente
  function traverse(obj: any, pathStack: string[] = []): void {
    // Caso base: se não é um objeto ou é nulo, retorna
    if (typeof obj !== "object" || obj === null) {
      return;
    }

    // Se for um array
    if (Array.isArray(obj)) {
      // Obtém o identificador de caminho para este array
      const pathKey = getPathKey(pathStack);

      // Soma o comprimento atual ao total para essa propriedade
      propertyPaths[pathKey] = (propertyPaths[pathKey] || 0) + obj.length;

      // Percorre cada elemento do array para buscar estruturas aninhadas
      for (let i = 0; i < obj.length; i++) {
        const item = obj[i];
        traverse(item, [...pathStack, i.toString()]);
      }
    }
    // Se for um objeto não-array
    else {
      // Percorre todas as propriedades do objeto
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          const value = obj[key];
          traverse(value, [...pathStack, key]);
        }
      }
    }
  }

  // Inicia a travessia da estrutura
  traverse(data);

  // Determina o maior comprimento encontrado entre todas as propriedades
  return Math.max(0, ...Object.values(propertyPaths));
}
