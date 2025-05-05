# json-schema-2-xlsx

A TypeScript/JavaScript library for automatically converting JSON Schema structures to Excel (XLSX) spreadsheets in a structured way.

## Installation

```bash
npm install json-schema-2-xlsx
```

or

```bash
yarn add json-schema-2-xlsx
```

## Description

`json-schema-2-xlsx` is a tool that allows you to generate Excel spreadsheets from JSON Schema definitions. The library automatically transforms the hierarchical structure of the schema into spreadsheet headers and populates the data accordingly.

### Key Features:

- Converts JSON Schema structures into organized Excel spreadsheet headers
- Supports nested structures and arrays
- Customizable header cell styles
- Automatic data population based on paths defined by the schema

## Basic Usage

```typescript
import { jsonSchemaToXlsx, JsonSchema } from "json-schema-2-xlsx";
import * as fs from "fs";

// Define your JSON Schema
const schema: JsonSchema = {
  title: "Person Information",
  type: "object",
  properties: {
    name: {
      title: "Full Name",
      type: "string",
    },
    age: {
      title: "Age",
      type: "number",
    },
    addresses: {
      title: "Addresses",
      type: "array",
      items: {
        type: "object",
        properties: {
          street: {
            title: "Street Name",
            type: "string",
          },
          number: {
            title: "House Number",
            type: "number",
          },
          city: {
            title: "City",
            type: "string",
          },
        },
      },
    },
  },
};

// Data to populate the spreadsheet
const data = [
  {
    name: "John Smith",
    age: 30,
    addresses: [
      { street: "Main Street", number: 123, city: "New York" },
      { street: "Park Avenue", number: 456, city: "Los Angeles" },
    ],
  },
  {
    name: "Emma Johnson",
    age: 25,
    addresses: [{ street: "Broadway", number: 789, city: "Chicago" }],
  },
];

// Convert schema and data to an Excel spreadsheet
const workbook = jsonSchemaToXlsx(schema, data, {
  headerCellStyle: {
    fill: {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFB7DEE8" },
    },
    font: {
      bold: true,
    },
  },
});

// Save the spreadsheet
workbook.xlsx
  .writeFile("result.xlsx")
  .then(() => {
    console.log("Spreadsheet saved successfully!");
  })
  .catch((err) => console.error("Error saving spreadsheet:", err));
```

## Result Example

The image below shows an example of the generated Excel spreadsheet:

![Example of generated Excel spreadsheet](https://img001.prntscr.com/file/img001/vE8k1ozLQ_KCxtroIz7iQQ.png)

## API

### `jsonSchemaToXlsx(jsonSchema, data, options)`

Converts a JSON Schema and corresponding data into an Excel spreadsheet.

#### Parameters:

- `jsonSchema`: The JSON Schema that defines the data structure.
- `data`: Array of objects containing data to populate the spreadsheet.
- `options` (optional): Configuration options object.
  - `headerCellStyle`: Styles to apply to header cells.
  - `startColumn`: Initial column (default: 1).
  - `startRow`: Initial row (default: 1).

#### Returns:

- An ExcelJS `Workbook` instance that can be manipulated or saved.

## Advanced Example

```typescript
import { jsonSchemaToXlsx, JsonSchema } from "json-schema-2-xlsx";
import { Workbook } from "exceljs";

// JSON Schema with more complex structure
const schema: JsonSchema = {
  title: "Order Management System",
  type: "object",
  properties: {
    customer: {
      title: "Customer Information",
      type: "object",
      properties: {
        name: {
          title: "Customer Name",
          type: "string",
        },
        documentId: {
          title: "Document ID",
          type: "string",
        },
        contacts: {
          title: "Contact Information",
          type: "array",
          items: {
            type: "object",
            properties: {
              type: {
                title: "Contact Type",
                type: "string",
              },
              value: {
                title: "Contact Value",
                type: "string",
              },
            },
          },
        },
      },
    },
    order: {
      title: "Order Details",
      type: "object",
      properties: {
        orderNumber: {
          title: "Order Number",
          type: "string",
        },
        items: {
          title: "Order Items",
          type: "array",
          items: {
            type: "object",
            properties: {
              productName: {
                title: "Product Name",
                type: "string",
              },
              quantity: {
                title: "Quantity",
                type: "number",
              },
              unitPrice: {
                title: "Unit Price",
                type: "number",
              },
            },
          },
        },
      },
    },
  },
};

// Example data
const data = [
  {
    customer: {
      name: "ABC Corporation",
      documentId: "12.345.678/0001-90",
      contacts: [
        { type: "email", value: "contact@abc.com" },
        { type: "phone", value: "(555) 123-4567" },
      ],
    },
    order: {
      orderNumber: "ORD-001",
      items: [
        { productName: "Laptop", quantity: 2, unitPrice: 1200 },
        { productName: "Monitor", quantity: 3, unitPrice: 300 },
      ],
    },
  },
];

// Create spreadsheet with custom styling
const workbook = jsonSchemaToXlsx(schema, data, {
  headerCellStyle: {
    border: {
      top: { style: "thin" },
      bottom: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" },
    },
    fill: {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFD700" },
    },
    font: {
      bold: true,
      color: { argb: "FF000000" },
    },
    alignment: {
      vertical: "middle",
      horizontal: "center",
    },
  },
  startRow: 2,
  startColumn: 2,
});

// Additional customizations after generation
const sheet = workbook.getWorksheet(1);
if (!sheet) throw new Error("Worksheet not found");

sheet.name = "Order Report";

// Add title
sheet.getCell("B1").value = "Order Report";
sheet.getCell("B1").font = {
  size: 16,
  bold: true,
};
sheet.getCell("B1").alignment = {
  horizontal: "center",
};

// Save file
workbook.xlsx.writeFile("order-report.xlsx");
```

## Result Example

The image below shows an example of the generated Excel spreadsheet:

![Example of generated Excel spreadsheet](https://img001.prntscr.com/file/img001/cnwc0zcSRxKvXaiif6UFEg.png)

## Contribution

Contributions are welcome! If you find a bug or have a suggestion for improvement, please open an issue or submit a pull request on our [GitHub repository](https://github.com/PedrosoOrganization/json-schema-2-xlsx).

## License

This project is licensed under the [MIT License](LICENSE).
