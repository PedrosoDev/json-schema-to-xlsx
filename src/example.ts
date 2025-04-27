import { Workbook } from "exceljs";
import { jsonSchemaToXlsx } from "./json-schema-to-xlsx";
import { JsonSchema } from "./commons/type";

const output = "output.xlsx";

const jsonSchema: JsonSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      title: "Name",
    },
    age: {
      type: "integer",
      title: "Age",
    },
    hobbies: {
      type: "array",
      title: "Hobbies",
      items: {
        type: "object",
        properties: {
          hobby: {
            type: "string",
            title: "Hobby",
          },
          frequency: {
            type: "string",
            title: "Frequency",
          },
          subActivities: {
            type: "array",
            title: "Sub Activities",
            items: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                  title: "Activity Name",
                },
                duration: {
                  type: "integer",
                  title: "Duration (minutes)",
                },
              },
            },
          },
        },
      },
    },
  },
};

const data = [
  // {
  //   name: "John Doe",
  //   age: 30,
  //   hobbies: [
  //     {
  //       hobby: "Reading",
  //       frequency: "Daily",
  //       subActivities: [
  //         { name: "Fiction", duration: 30 },
  //         { name: "Non-Fiction", duration: 20 },
  //       ],
  //     },
  //     {
  //       hobby: "Cycling",
  //       frequency: "Weekly",
  //       subActivities: [
  //         { name: "Mountain Biking", duration: 60 },
  //         { name: "Road Cycling", duration: 45 },
  //       ],
  //     },
  //   ],
  // },
  {
    name: "Jane Smith",
    age: 25,
    hobbies: [
      {
        hobby: "Cooking",
        frequency: "Weekly",
        subActivities: [
          { name: "Baking", duration: 120 },
          { name: "Grilling", duration: 90 },
        ],
      },
    ],
  },
];

const workbook = jsonSchemaToXlsx(jsonSchema, data);

workbook.xlsx
  .writeFile(output)
  .then(() => {
    console.log("File saved successfully.");
  })
  .catch((error) => {
    console.error("Error saving file:", error);
  });
