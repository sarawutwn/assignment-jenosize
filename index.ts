import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import routes from "./src/routes";
import * as swaggerUi from "swagger-ui-express";
import swaggerDocument from "./src/swagger/swagger.json";

const app = express();
app.use(bodyParser.json({ limit: "10mb" }));
app.use(morgan("combined"));
const port = Bun.env.SERVER_PORT || 9999;

app.use("/documents", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

routes(app);

app.listen(port, () => {
  console.log(`Start Server at http://localhost:${port}`);
});
