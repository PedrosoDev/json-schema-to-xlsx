import { Style, Worksheet } from "exceljs";
import { JSONPath } from "jsonpath-plus";
import { DataPaths } from "../commons/type";
import { calculateArraysDepthOrSum } from "../utils/get-max-sum-array-length-of-object";

const DEFAULT_CELL_STYLE: Partial<Style> = {
  alignment: {
    vertical: "middle",
  },
};

type Options = {
  startRow?: number;
  merge?: boolean;
  cellStyle?: Partial<Style>;
};

export function addDataToSheet(
  sheet: Worksheet,
  dataPaths: DataPaths,
  data: any[],
  options?: Options
) {
  const {
    startRow = 1,
    merge = true,
    cellStyle = DEFAULT_CELL_STYLE,
  } = options || {};

  let row = startRow;
  for (const itemData of data) {
    const itemRow = row;

    for (const [path, info] of Object.entries(dataPaths)) {
      let propertyRow = itemRow;
      const propertyColumn = info.column;

      const value = JSONPath({ path, json: itemData, resultType: "value" });
      const parent = JSONPath({ path, json: itemData, resultType: "parent" });

      for (let i = 0; i < value.length; i++) {
        const valueItem = value[i];
        const parentItem = parent[i];

        let rowSpan = calculateArraysDepthOrSum(parentItem);

        if (valueItem === undefined) continue;

        const cell = sheet.getCell(propertyRow, propertyColumn);
        cell.value = valueItem;
        cell.style = cellStyle;

        if (merge && rowSpan > 1) {
          const starMergeRow = propertyRow;
          const endMergeRow = starMergeRow + rowSpan - 1;

          propertyRow = endMergeRow;

          sheet.mergeCells({
            top: starMergeRow,
            bottom: endMergeRow,
            left: propertyColumn,
            right: propertyColumn,
          });
        }

        propertyRow++;
      }

      row = Math.max(row, propertyRow);
    }
  }
}
