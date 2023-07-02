import { random } from "./helper";
import sequelize from "./models";
import {
  getLatestAllMessage,
  getAllMessage,
  getlatestMessageOneDialog,
} from "./service";

const start = async () => {
  const userId = 3;
  const limit = 5;
  try {
    await sequelize.authenticate();
    const allMessage = await getAllMessage(userId);
    const randomMessage = random(allMessage);
    const latestAllMessage = await getLatestAllMessage(userId, limit);
    const latestMessageOneDialog = await getlatestMessageOneDialog(
      randomMessage,
      limit
    );
    console.log("🚀 ~ start ~ allMessage:", allMessage.length);
    console.log("🚀 ~ start ~ latestAllMessage:", latestAllMessage.length);
    console.log(
      "🚀 ~ start ~ latestMessageOneDialog:",
      latestMessageOneDialog.length
    );
  } catch (e) {
    console.log(e);
  }
};
start();
