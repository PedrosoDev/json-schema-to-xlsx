import { Style, Workbook } from "exceljs";

import { transformJsonSchemaToHeaders } from "./transforms/json-schema-to-headers";
import { JsonSchema } from "./commons/type";
import { addHeadersToSheet } from "./logics/add-headers-to-sheet";
import { addDataToSheet } from "./logics/add-data-to-sheet";

type Options = {
  headerCellStyle?: Partial<Style>;
  startColumn?: number;
  startRow?: number;
};

export function jsonSchemaToXlsx(
  jsonSchema: JsonSchema,
  data: any[],
  options?: Options
): Workbook {
  const { headerCellStyle, startColumn, startRow } = options || {};

  const headers = transformJsonSchemaToHeaders(jsonSchema);

  const workbook = new Workbook();
  const sheet = workbook.addWorksheet();

  const { dataPaths, endRow } = addHeadersToSheet(sheet, headers, {
    startColumn,
    startRow,
    cellStyle: headerCellStyle,
  });

  addDataToSheet(sheet, dataPaths, data, {
    startRow: endRow + 1,
  });

  return workbook;
}
