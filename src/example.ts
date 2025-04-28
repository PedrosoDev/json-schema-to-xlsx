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
    educacao: {
      type: "array",
      title: "Educação",
      items: {
        type: "object",
        properties: {
          instituicao: {
            type: "string",
            title: "Instituição",
          },
          nivel: {
            type: "string",
            title: "Nível",
          },
          cursos: {
            type: "array",
            title: "Cursos",
            items: {
              type: "object",
              properties: {
                nome: {
                  type: "string",
                  title: "Nome do Curso",
                },
                anoConclusao: {
                  type: "integer",
                  title: "Ano de Conclusão",
                },
                disciplinas: {
                  type: "array",
                  title: "Disciplinas",
                  items: {
                    type: "object",
                    properties: {
                      nome: {
                        type: "string",
                        title: "Nome da Disciplina",
                      },
                      nota: {
                        type: "number",
                        title: "Nota Final",
                      },
                      creditos: {
                        type: "integer",
                        title: "Créditos",
                      },
                    },
                  },
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
  {
    name: "John Doe",
    age: 30,
    hobbies: [
      {
        hobby: "Reading",
        frequency: "Daily",
        subActivities: [
          { name: "Fiction", duration: 30 },
          { name: "Non-Fiction", duration: 20 },
          { name: "Comics", duration: 15 },
        ],
      },
      {
        hobby: "Cycling",
        frequency: "Weekly",
        subActivities: [
          { name: "Mountain Biking", duration: 60 },
          { name: "Road Cycling", duration: 45 },
        ],
      },
    ],
    educacao: [
      {
        instituicao: "Universidade Federal",
        nivel: "Graduação",
        cursos: [
          {
            nome: "Ciência da Computação",
            anoConclusao: 2018,
            disciplinas: [
              { nome: "Algoritmos", nota: 9.5, creditos: 4 },
              { nome: "Estrutura de Dados", nota: 8.7, creditos: 5 },
              { nome: "Banco de Dados", nota: 9.0, creditos: 4 },
            ],
          },
          {
            nome: "Especialização em IA",
            anoConclusao: 2020,
            disciplinas: [
              { nome: "Machine Learning", nota: 9.8, creditos: 6 },
              { nome: "Redes Neurais", nota: 9.2, creditos: 5 },
            ],
          },
        ],
      },
      {
        instituicao: "Instituto Técnico",
        nivel: "Técnico",
        cursos: [
          {
            nome: "Desenvolvimento Web",
            anoConclusao: 2015,
            disciplinas: [
              { nome: "HTML/CSS", nota: 10.0, creditos: 2 },
              { nome: "JavaScript", nota: 9.5, creditos: 3 },
            ],
          },
        ],
      },
    ],
  },

  // -=-=-=-=-=-=-=-=(*)=-=-=-=-=-=-=-=-

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
    educacao: [
      {
        instituicao: "Universidade Estadual",
        nivel: "Mestrado",
        cursos: [
          {
            nome: "Biologia Molecular",
            anoConclusao: 2023,
            disciplinas: [
              { nome: "Genética", nota: 9.7, creditos: 5 },
              { nome: "Bioquímica", nota: 8.9, creditos: 4 },
              { nome: "Microbiologia", nota: 9.5, creditos: 6 },
            ],
          },
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
