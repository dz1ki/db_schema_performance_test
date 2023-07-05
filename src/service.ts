import connection from "./models";

export const getLatestAllMessage = async (userId, limit) => {
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

export const getAllMessage = async (userId) => {
  return await connection.query(
    `SELECT sender_id, receiver_id, group_id, content, picture_url, created_at
      FROM messages
      WHERE (sender_id = ${userId} OR receiver_id = ${userId} OR group_id IN (
          SELECT group_id
          FROM users_groups
          WHERE user_id = ${userId}
      ))
      ORDER BY created_at DESC
  `,
    { raw: true, nest: true }
  );
};

export const getlatestMessageOneDialog = async (randomMessage, limit) => {
  const { receiver_id, sender_id, group_id } = randomMessage;
  if (receiver_id !== null) {
    return await connection.query(
      `SELECT sender_id, receiver_id, created_at , content, picture_url
      FROM messages
      WHERE sender_id = ${sender_id} AND receiver_id = ${receiver_id}
           OR sender_id = ${receiver_id} AND receiver_id = ${sender_id} 
      ORDER BY created_at DESC 
      LIMIT ${limit} 
  `,
      { raw: true, nest: true }
    );
  } else {
    return await connection.query(
      `SELECT sender_id, group_id, created_at , content, picture_url 
      FROM messages
      WHERE group_id = ${group_id}
      ORDER BY created_at DESC
      LIMIT ${limit}   
  `,
      { raw: true, nest: true }
    );
  }
};
