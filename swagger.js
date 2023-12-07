const swaggerAutogen = require("swagger-autogen")();

output = "./swagger_api_doc.json";
endpoints = [
  "./routes/user.js",
  "./routes/admin.js",
  "./routes/register.js",
  "./routes/login.js",
  "./routes/films.js",
];

swaggerAutogen(output, endpoints);
