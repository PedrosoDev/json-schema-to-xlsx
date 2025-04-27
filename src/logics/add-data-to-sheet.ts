import { Style, Worksheet } from "exceljs";
import { JSONPath } from "jsonpath-plus";
import { DataPaths } from "../commons/type";
import { getMaxSumArrayLengthOfObject } from "../utils/get-max-sum-array-length-of-object";

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
    const itemMaxDepth = getMaxSumArrayLengthOfObject(itemData);

    for (const [path, info] of Object.entries(dataPaths)) {
      let propertyRow = itemRow;
      const currentDepth = path.split("[:]").length - 1;
      let rowSpan = itemMaxDepth - currentDepth;
      const propertyColumn = info.column;

      const value = JSONPath({ path, json: itemData });
      rowSpan -= getMaxSumArrayLengthOfObject(value) - 1;

      for (const valueItem of value) {
        if (valueItem === undefined) continue;

        const cell = sheet.getCell(propertyRow, propertyColumn);
        cell.value = valueItem;
        cell.style = cellStyle;
        propertyRow++;
      }

      if (merge && rowSpan > 1) {
        const sendRow = itemRow + rowSpan - 1;

        console.log(path, { itemRow, rowSpan });
        console.log(
          `Merging cells from ${itemRow} to ${sendRow} in column ${propertyColumn}`
        );

        sheet.mergeCells({
          top: itemRow,
          bottom: sendRow,
          left: propertyColumn,
          right: propertyColumn,
        });
      }

      row = Math.max(row, propertyRow);
    }
  }
}
