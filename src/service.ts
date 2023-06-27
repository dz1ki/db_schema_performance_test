import connection from "./models";
import { UserGroup } from "./models/group_user";
import { Message } from "./models/message";
import { User } from "./models/user";
import { Op } from "sequelize";
import { Sequelize } from "sequelize";

export const getUsers = async () => {
  return await User.findAll();
};

const getInitDataBySql = async (userId, limit) => {
  return await connection.query(
    `EXPLAIN ANALYZE SELECT sender_id, receiver_id, group_id, created_at
      FROM messages
      WHERE (sender_id = ${userId} OR receiver_id = ${userId} OR group_id IN (
          SELECT group_id
          FROM users_groups
          WHERE user_id = ${userId}
      ))
      GROUP BY sender_id, receiver_id, group_id, created_at
      ORDER BY created_at DESC
      LIMIT ${limit}
  `,
    { raw: true, nest: true }
  );
};

const getInitDataBySequelize = async (userId, limit) => {
  return await Message.findAll({
    attributes: ["senderId", "receiverId", "groupId", "createdAt"],
    where: {
      [Op.or]: [
        {
          senderId: userId,
        },
        { receiverId: userId },
        {
          groupId: {
            [Op.in]: Sequelize.literal(
              `(SELECT group_id FROM users_groups WHERE user_id = ${userId})`
            ),
          },
        },
      ],
    },
    group: ["senderId", "receiverId", "groupId", "createdAt"],
    limit,
    raw: true,
    order: [["createdAt", "desc"]],
  });
};

const getMessages = async (userId) => {
  return Message.findAll({
    where: {
      [Op.or]: [
        {
          senderId: userId,
        },
        { receiverId: userId },
        {
          groupId: {
            [Op.in]: Sequelize.literal(
              `(SELECT group_id FROM users_groups WHERE user_id = ${userId})`
            ),
          },
        },
      ],
    },
    // limit: 5000,
    order: [["createdAt", "desc"]],
    // include: { all: true },
  });
};

export const getInitialData = async (userId) => {
  console.time("test");
  const limit = 10;
  // const data = await getInitDataBySql(userId, limit);
  // const data = await getInitDataBySequelize(userId, limit);
  const data = await getMessages(userId);
  // console.log("🚀 ~ getInitialData ~ data:", data);
  console.log("🚀 ~ getInitialData ~ data:", data.length);
  console.timeEnd("test");
};
