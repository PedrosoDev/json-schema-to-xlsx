import { describe, it, expect } from "vitest";
import { Header, JsonSchema } from "../commons/type";
import { transformJsonSchemaToHeaders } from "./json-schema-to-headers";

describe("transformJsonSchemaToHeaders", () => {
  it("deve conseguir transformar o JSON Schema simples em Headers", () => {
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
      },
    };

    const expectedHeaders: Header[] = [
      {
        key: "name",
        title: "Name",
      },
      {
        key: "age",
        title: "Age",
      },
    ];

    const result = transformJsonSchemaToHeaders(jsonSchema);

    expect(result).toEqual(expectedHeaders);
  });

  it("deve conseguir transformar o JSON Schema aninhado em Headers", () => {
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
        address: {
          type: "object",
          title: "Address",
          properties: {
            street: {
              type: "string",
              title: "Street",
            },
            city: {
              type: "string",
              title: "City",
            },
          },
        },
      },
    };

    const expectedHeaders: Header[] = [
      {
        key: "name",
        title: "Name",
      },
      {
        key: "age",
        title: "Age",
      },
      {
        key: "address",
        title: "Address",
        subHeaders: [
          {
            key: "address.street",
            title: "Street",
          },
          {
            key: "address.city",
            title: "City",
          },
        ],
      },
    ];

    const result = transformJsonSchemaToHeaders(jsonSchema);
    expect(result).toEqual(expectedHeaders);
  });

  it("deve conseguir transformar o JSON Schema com array em Headers", () => {
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
            type: "string",
            title: "Hobby",
          },
        },
      },
    };

    const expectedHeaders: Header[] = [
      {
        key: "name",
        title: "Name",
      },
      {
        key: "age",
        title: "Age",
      },
      {
        key: "hobbies",
        title: "Hobbies",
        subHeaders: [
          {
            key: "hobbies[:]",
            title: "Hobby",
          },
        ],
      },
    ];

    const result = transformJsonSchemaToHeaders(jsonSchema);
    expect(result).toEqual(expectedHeaders);
  });
});
