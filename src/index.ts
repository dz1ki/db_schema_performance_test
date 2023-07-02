import { random } from "./helper";
import sequelize from "./models";
import {
  getLatestAllMessage,
  getAllMessage,
  getlatestMessageOneDialog,
} from "./service";

const start = async () => {
  const userId = 1;
  const limit = 10;
  try {
    await sequelize.authenticate();
    const allMessage = await getAllMessage(userId);
    const randomMessage = random(allMessage);
    const latestAllMessage = await getLatestAllMessage(userId, limit);
    const latestMessageOneDialog = await getlatestMessageOneDialog(
      randomMessage,
      limit
    );
    // console.log("🚀 ~ start ~ allMessage:", allMessage);
    // console.log("🚀 ~ start ~ latestAllMessage:", latestAllMessage);
    console.log("🚀 ~ start ~ latestMessageOneDialog:", latestMessageOneDialog);
  } catch (e) {
    console.log(e);
  }
};
start();
