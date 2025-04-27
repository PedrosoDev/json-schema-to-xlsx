import { Style, Worksheet } from "exceljs";
import { JSONPath } from "jsonpath-plus";
import { DataPaths } from "../commons/type";
import { getMaxSumArrayLength } from "../utils/get-max-sum-array-length-of-object";

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
    const itemMaxDepth = getMaxSumArrayLength(itemData);

    for (const [path, info] of Object.entries(dataPaths)) {
      let propertyRow = itemRow;
      const currentDepth = path.split("[:]").length - 1;
      let rowSpan = itemMaxDepth - currentDepth;
      const propertyColumn = info.column;

      const value = JSONPath({ path, json: itemData });
      const maxSumArrayLength = getMaxSumArrayLength(value);
      rowSpan -= maxSumArrayLength - 1;

      console.log({ value, itemMaxDepth, currentDepth, maxSumArrayLength });

      for (const valueItem of value) {
        if (valueItem === undefined) continue;

        const cell = sheet.getCell(propertyRow, propertyColumn);
        cell.value = valueItem;
        cell.style = cellStyle;

        if (merge && rowSpan > 1) {
          const starMergeRow = propertyRow;
          const endMergeRow = starMergeRow + rowSpan - 1;

          propertyRow = endMergeRow;

          console.log(path, { propertyRow, rowSpan });
          console.log(
            `Merging cells from ${starMergeRow} to ${endMergeRow} in column ${propertyColumn}`
          );

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
