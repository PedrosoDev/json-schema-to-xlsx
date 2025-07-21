import { Style, Workbook, Worksheet } from "exceljs";

import { JsonSchema } from "./commons/type";
import { addDataToSheet } from "./logics/add-data-to-sheet";
import { addHeadersToSheet } from "./logics/add-headers-to-sheet";
import { transformJsonSchemaToHeaders } from "./transforms/json-schema-to-headers";

type Options = {
  templatePath?: string;
  templateSheetName?: string;
  headerCellStyle?: Partial<Style>;
  dataCellStyle?: Partial<Style>;
  startColumn?: number;
  startRow?: number;
};

export async function jsonSchemaToXlsx(
  jsonSchema: JsonSchema,
  data: any[],
  options?: Options
): Promise<Workbook> {
  const {
    headerCellStyle,
    dataCellStyle,
    startColumn,
    startRow,
    templatePath,
    templateSheetName,
  } = options || {};

  const headers = transformJsonSchemaToHeaders(jsonSchema);

  const workbook = new Workbook();
  if (templatePath) await workbook.xlsx.readFile(templatePath);

  let sheet: Worksheet | undefined;
  if (templatePath) {
    sheet = workbook.getWorksheet(templateSheetName || "Sheet1");
    if (!sheet)
      throw new Error(
        `Template sheet "${templateSheetName}" not found in the template file.`
      );
  } else {
    sheet = workbook.addWorksheet();
  }

  const { dataPaths, endRow } = addHeadersToSheet(sheet, headers, {
    cellStyle: headerCellStyle,
    startColumn,
    startRow,
  });

  addDataToSheet(sheet, dataPaths, data, {
    cellStyle: dataCellStyle,
    startRow: endRow + 1,
  });

  return workbook;
}
