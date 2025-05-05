import { jsonSchemaToXlsx } from "./json-schema-to-xlsx";
import { JsonSchema } from "./commons/type";

// Example of a JSON Schema for a product catalog
const productCatalogSchema: JsonSchema = {
  title: "Product Catalog Schema",
  type: "object",
  properties: {
    category: {
      title: "Category",
      type: "string",
      description: "Product category",
    },
    name: {
      title: "Product Name",
      type: "string",
      description: "Name of the product",
    },
    code: {
      title: "Product Code",
      type: "string",
      description: "SKU code",
    },
    price: {
      title: "Price",
      type: "number",
      description: "Product price in USD",
    },
    available: {
      title: "Availability",
      type: "boolean",
      description: "Product availability",
    },
    specifications: {
      title: "Technical Specifications",
      type: "object",
      properties: {
        weight: {
          title: "Weight",
          type: "number",
          description: "Weight in kg",
        },
        dimensions: {
          title: "Dimensions",
          type: "object",
          properties: {
            height: {
              title: "Height",
              type: "number",
              description: "Height in cm",
            },
            width: {
              title: "Width",
              type: "number",
              description: "Width in cm",
            },
            depth: {
              title: "Depth",
              type: "number",
              description: "Depth in cm",
            },
          },
        },
      },
    },
    colors: {
      title: "Available Colors",
      type: "array",
      description: "Available colors",
      items: {
        // title: "Color",
        type: "object",
        properties: {
          name: {
            title: "Color Name",
            type: "string",
            description: "Color name",
          },
          code: {
            title: "Color Code",
            type: "string",
            description: "Hexadecimal color code",
          },
          inStock: {
            title: "In Stock",
            type: "boolean",
            description: "Stock availability",
          },
          stockQuantity: {
            title: "Stock Quantity",
            type: "number",
            description: "Quantity in stock",
          },
        },
      },
    },
  },
};

// Example data to fill the spreadsheet
const productData = [
  {
    category: "Electronics",
    name: "Smartphone XYZ",
    code: "SMRT-001",
    price: 1299.99,
    available: true,
    specifications: {
      weight: 0.18,
      dimensions: {
        height: 15.2,
        width: 7.1,
        depth: 0.8,
      },
    },
    colors: [
      {
        name: "Black",
        code: "#000000",
        inStock: true,
        stockQuantity: 150,
      },
      {
        name: "White",
        code: "#FFFFFF",
        inStock: true,
        stockQuantity: 75,
      },
      {
        name: "Gold",
        code: "#FFD700",
        inStock: false,
        stockQuantity: 0,
      },
    ],
  },
  {
    category: "Electronics",
    name: "Tablet Pro",
    code: "TBLT-002",
    price: 899.99,
    available: true,
    specifications: {
      weight: 0.45,
      dimensions: {
        height: 25.0,
        width: 17.5,
        depth: 0.6,
      },
    },
    colors: [
      {
        name: "Silver",
        code: "#C0C0C0",
        inStock: true,
        stockQuantity: 120,
      },
      {
        name: "Blue",
        code: "#0000FF",
        inStock: true,
        stockQuantity: 45,
      },
    ],
  },
];

// Generate Excel spreadsheet with styled headers
const workbook = jsonSchemaToXlsx(productCatalogSchema, productData, {
  startRow: 2,
  headerCellStyle: {
    fill: {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF4F81BD" },
    },
    font: {
      bold: true,
      color: { argb: "FFFFFFFF" },
      size: 12,
    },
    alignment: {
      vertical: "middle",
      horizontal: "center",
    },
    border: {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    },
  },
});

// Additional spreadsheet customization
const sheet = workbook.getWorksheet(1);
if (!sheet) throw new Error("Worksheet not found");

sheet.name = "Product Catalog";

// Add title to the spreadsheet
sheet.mergeCells("A1:M1");
const titleCell = sheet.getCell("A1");
titleCell.value = "PRODUCT CATALOG";
titleCell.font = {
  name: "Arial",
  size: 18,
  bold: true,
  color: { argb: "FF333333" },
};
titleCell.alignment = {
  horizontal: "center",
  vertical: "middle",
};
titleCell.fill = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "FFE6E6E6" },
};

// Adjust column widths for better visualization
sheet.columns.forEach((column) => {
  column.width = 15;
});

// Save the spreadsheet to a file
workbook.xlsx
  .writeFile("product-catalog.xlsx")
  .then(() => {
    console.log('File "product-catalog.xlsx" created successfully!');
    console.log(
      "This example demonstrates how to use the json-schema-2-xlsx library to generate a spreadsheet from a JSON Schema."
    );
  })
  .catch((error) => {
    console.error("Error saving file:", error);
  });
