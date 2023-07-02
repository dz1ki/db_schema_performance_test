import connection from "./models";

export const getInitDataBySql = async (userId, limit) => {
  return await connection.query(
    `SELECT sender_id, receiver_id, group_id, created_at
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
