import bodyParser from "body-parser";
import express, { type Request, type Response } from "express";
import morgan from "morgan";
import routes from "./src/routes";
import * as swaggerUi from "swagger-ui-express";
import swaggerDocument from "./src/swagger/swagger.json";
import { NotfoundMiddlware } from "./src/middleware/not-found.middleware";
import { PassJsonMiddlware } from "./src/middleware/pass-json.middleware";

const app = express();
app.use(express.json());

app.use(
  bodyParser.json({
    limit: "10mb",
    strict: false,
    verify: (req: Request, _res: Response, buf: Buffer, encoding?: string) => {
      const validEncoding = (encoding || "utf-8") as BufferEncoding;
      req.rawBody = buf.toString(validEncoding);
    },
  }),
);
app.use(morgan("combined"));
const port = Bun.env.SERVER_PORT || 9999;

app.use("/documents", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(PassJsonMiddlware);
routes(app);

app.use(NotfoundMiddlware);
app.listen(port, () => {
  console.log(`Start Server at http://localhost:${port}`);
});

declare global {
  namespace Express {
    interface Request {
      rawBody?: string;
    }
  }
}
