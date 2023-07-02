const {
  NUMBER_OF_USERS,
  NUMBER_OF_GROUPS,
  NUMBER_OF_USERS_GROUPS,
  NUMBER_OF_MESSAGES,
} = require("./helper/constants.js");
const { getRandomIntInclusive } = require("./helper/common.js");

const createUser = async (queryInterface) => {
  const userObject = {
    first_name: "Patrick",
    last_name: "Lastname",
    email: "email@mail.com",
    password: "test",
    created_at: new Date(),
    updated_at: new Date(),
  };

  const max = NUMBER_OF_USERS;

  let counter = 0;

  const users = [];

  while (counter < max) {
    const random = parseInt(Math.random() * 1000000000);
    const user = {
      ...userObject,
      first_name: `${userObject.first_name} #${random}`,
      email: `${userObject.email} #${random}`,
    };

    users.push(user);

    counter++;
  }

  await queryInterface.bulkInsert("users", users);
};

const deleteUsers = async (queryInterface) => {
  await queryInterface.sequelize.query("DELETE FROM users");
};

const createGroups = async (queryInterface) => {
  const groupObject = {
    name: "Group",
    created_at: new Date(),
    updated_at: new Date(),
  };

  const max = NUMBER_OF_GROUPS;

  let counter = 0;

  const groups = [];

  while (counter < max) {
    const random = parseInt(Math.random() * 1000000000);
    const group = {
      ...groupObject,
      name: `${groupObject.name} #${random}`,
    };

    groups.push(group);

    counter++;
  }

  await queryInterface.bulkInsert("groups", groups);
};

const deleteGroups = async (queryInterface) => {
  await queryInterface.sequelize.query("DELETE FROM groups");
};

const createUsersGroups = async (queryInterface) => {
  const usersResult = await queryInterface.sequelize.query(
    "SELECT * FROM users LIMIT 1"
  );
  const users = usersResult[0];

  const minUserId = users[0].id;
  const maxUserId = minUserId + NUMBER_OF_USERS - 1;

  const groupsResult = await queryInterface.sequelize.query(
    "SELECT * FROM groups LIMIT 1"
  );
  const groups = groupsResult[0];

  const minGroupId = groups[0].id;
  const maxGroupId = minGroupId + NUMBER_OF_GROUPS - 1;

  const max = NUMBER_OF_USERS_GROUPS;
  let counter = 0;

  while (counter < max) {
    const randomUserId = getRandomIntInclusive(minUserId, maxUserId);
    const randomGroupId = getRandomIntInclusive(minGroupId, maxGroupId);
    try {
      await queryInterface.insert(null, "users_groups", {
        user_id: randomUserId,
        group_id: randomGroupId,
      });
    } catch (e) {
      continue;
    }
    counter++;
  }
};

const deleteUsersGroups = async (queryInterface) => {
  await queryInterface.sequelize.query("DELETE FROM users_groups");
};

const createMessages = async (queryInterface) => {
  const usersResult = await queryInterface.sequelize.query(
    "SELECT * FROM users LIMIT 1"
  );
  const users = usersResult[0];

  const minUserId = users[0].id;
  const maxUserId = minUserId + NUMBER_OF_USERS - 1;

  const groupsResult = await queryInterface.sequelize.query(
    "SELECT * FROM groups LIMIT 1"
  );
  const groups = groupsResult[0];

  const minGroupId = groups[0].id;
  const maxGroupId = minGroupId + NUMBER_OF_GROUPS - 1;

  const max = NUMBER_OF_MESSAGES;
  let counter = 0;

  while (counter < max) {
    const random = getRandomIntInclusive(1, 2);
    const randomUrl = getRandomIntInclusive(1, 2);
    const createPrivate = random === 1 ? true : false;
    const randomUserId = getRandomIntInclusive(minUserId, maxUserId);

    const message = {
      sender_id: randomUserId,
      content: `Message from ${randomUserId}`,
      created_at: new Date(),
      updated_at: new Date(),
    };

    if (createPrivate) {
      message.receiver_id = getRandomIntInclusive(minUserId, maxUserId);
    } else {
      message.group_id = getRandomIntInclusive(minGroupId, maxGroupId);
    }

    if (randomUrl === 1) {
      message.picture_url =
        "https://lucid.app/lucidchart/f6a1bb32-9585-4d50-8ced-6b4666847972/edit?beaconFlowId=6A04FC88B71845A4&invitationId=inv_056845fc-6032-4017-b36f-7d156c8c0fd2&page=0_0#?referredproduct=";
    }

    try {
      await queryInterface.insert(null, "messages", message);
    } catch (e) {
      console.log("🚀 ~ createGroupMessages ~ e:", e);
      continue;
    }

    counter++;
  }
};

const deleteMessages = async (queryInterface) => {
  await queryInterface.sequelize.query("DELETE FROM messages");
};

module.exports = {
  async up(queryInterface) {
    await createUser(queryInterface);
    await createGroups(queryInterface);
    await createUsersGroups(queryInterface);
    await createMessages(queryInterface);
  },

  async down(queryInterface) {
    await deleteUsers(queryInterface);
    await deleteGroups(queryInterface);
    await deleteUsersGroups(queryInterface);
    await deleteMessages(queryInterface);
  },
};
