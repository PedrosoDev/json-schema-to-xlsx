import { Location, Style, Worksheet } from "exceljs";
import { Header, DataPathInfo, DataPaths } from "../commons/type";
import { getDepthOfHeader } from "../utils/get-depth-of-header";
import { recursiveSubHeadersLength } from "../utils/recursive-sub-headers-length";
import { isEmptyArray } from "../utils/is-empty-array";
import { mapToObject } from "../utils/map-to-object";
import { isNotEmptyArray } from "../utils/is-not-empty-array";

const DEFAULT_HEADER_STYLE: Partial<Style> = {
  border: {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  },
  alignment: {
    vertical: "middle",
    horizontal: "center",
  },
  font: {
    bold: true,
  },
};

type Options = {
  cellStyle?: Partial<Style>;
  merge?: boolean;
  startRow?: number;
  startColumn?: number;
};

type Result = {
  dataPaths: DataPaths;
  startRow: number;
  endRow: number;
};

type RecursiveResult = {
  startRow: number;
  endRow: number;
};

export function addHeadersToSheet(
  sheet: Worksheet,
  headers: Header[],
  options?: Options
): Result {
  const {
    cellStyle = DEFAULT_HEADER_STYLE,
    merge = true,
    startRow = 1,
    startColumn = 1,
  } = options || {};

  const dataPaths = new Map<string, DataPathInfo>();

  const recursive = (
    currentHeaders: Header[],
    row: number,
    column: number
  ): RecursiveResult => {
    const maxDepth = Math.max(...currentHeaders.map(getDepthOfHeader));

    for (const currentHeader of currentHeaders) {
      const depth = getDepthOfHeader(currentHeader);
      const rowSpan = maxDepth - depth + 1;
      const columnSpan = !isEmptyArray(currentHeader.subHeaders)
        ? recursiveSubHeadersLength(currentHeader)
        : 1;

      const cell = sheet.getCell(row, column);
      cell.value = currentHeader.title;
      cell.style = cellStyle;

      if (isNotEmptyArray(currentHeader.subHeaders)) {
        recursive(currentHeader.subHeaders, row + rowSpan, column);
      } else {
        dataPaths.set(currentHeader.key, {
          column,
        });
      }

      if (merge && (rowSpan > 1 || columnSpan > 1)) {
        const location: Location = {
          top: row,
          left: column,
          bottom: row + rowSpan - 1,
          right: column + columnSpan - 1,
        };

        sheet.mergeCells(location);
      }

      column += columnSpan;
    }

    return {
      startRow: row,
      endRow: row + maxDepth - 1,
    };
  };
  const { endRow } = recursive(headers, startRow, startColumn);

  return {
    dataPaths: mapToObject(dataPaths),
    startRow,
    endRow,
  };
}
