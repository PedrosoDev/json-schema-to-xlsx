import { JSONSchema7 } from "json-schema";

export type JsonSchema = JSONSchema7;

export type DataPathInfo = {
  column: number;
};

export type DataPaths = Record<string, DataPathInfo>;

export type Header = {
  key: string;
  title: string;
  subHeaders?: Header[];
};
