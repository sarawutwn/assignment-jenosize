import type { Options } from "swagger-jsdoc";

const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Assignment Jenosize",
      version: "1.0.0",
      description: "This is the API documentation for assignment Jenosize",
    },
    servers: [
      {
        url: "http://localhost:9999",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/adapters/controllers/*.ts"],
};

export default swaggerOptions;
