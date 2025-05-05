import { Header, JsonSchema } from "../commons/type";
import { isEmptyArray } from "../utils/is-empty-array";
import { isNotEmptyArray } from "../utils/is-not-empty-array";
import { isObject } from "../utils/is-object";

export function transformJsonSchemaToHeaders(jsonSchema: JsonSchema): Header[] {
  const transformSchemaToHeader = (
    jsonSchema: JsonSchema,
    path: string
  ): Header => {
    let header: Header = {
      key: path,
      title: jsonSchema.title || path,
    };

    if (jsonSchema.type === "object") {
      const subHeaders: Header[] = [];
      for (const [key, schema] of Object.entries(jsonSchema.properties || {})) {
        if (!isObject(schema)) continue;

        const subPath = path ? `${path}.${key}` : key;
        const subHeader = transformSchemaToHeader(schema, subPath);
        subHeaders.push(subHeader);
      }
      header.subHeaders = subHeaders;
    } else if (jsonSchema.type === "array") {
      const items = jsonSchema.items;
      if (!isObject(items)) return header;
      if (Array.isArray(items)) return header;

      const subPath = path ? `${path}[:]` : "[:]";
      const subHeader = transformSchemaToHeader(items, subPath);
      if (items.title) {
        header.subHeaders = [subHeader];
      } else {
        header = {
          ...subHeader,
          title: header.title,
        };
      }
    }

    return header;
  };

  const header = transformSchemaToHeader(jsonSchema, "");

  return isNotEmptyArray(header.subHeaders) ? header.subHeaders : [header];
}
