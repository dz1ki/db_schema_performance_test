import * as express from "express";
import sequelize from "./models";
import * as config from "config";
import * as bodyParser from "body-parser";
import { getInitialData, getUsers } from "./service";

// const port: number = config.get("app.port") || 5000;
// const app: express.Application = express();

// app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(err.status || 500).json({
//     message: err.message,
//     errors: err.errors,
//   });
// });

const start = async () => {
  try {
    await sequelize.authenticate();
    // await getUsers();
    const max = 1;
    let counter = 1;
    while (counter <= max) {
      const data = await getInitialData(2);
      console.log("🚀 ~ start ~ data:", data);

      counter++;
    }
    //app.listen(port, () => console.log("Server started on port " + port));
  } catch (e) {
    console.log(e);
  }
};
start();
