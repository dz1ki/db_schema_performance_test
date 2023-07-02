import sequelize from "./models";
import { getInitDataBySql } from "./service";

const start = async () => {
  const userId = 1;
  const limit = 5;
  try {
    await sequelize.authenticate();
    const result = await getInitDataBySql(userId, limit);
    console.log("🚀 ~ start ~ result:", result);
  } catch (e) {
    console.log(e);
  }
};
start();
