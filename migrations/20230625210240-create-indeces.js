module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      "CREATE INDEX messages_sender_id_index ON messages USING hash (sender_id)"
    );
    await queryInterface.sequelize.query(
      "CREATE INDEX messages_receiver_id_index ON messages USING hash (receiver_id)"
    );
    await queryInterface.sequelize.query(
      "CREATE INDEX messages_id_index ON messages USING hash (group_id)"
    );
    await queryInterface.sequelize.query(
      "CREATE INDEX users_id_index ON users USING hash (id)"
    );
    await queryInterface.sequelize.query(
      "CREATE INDEX groups_id_index ON groups USING hash (id)"
    );
    await queryInterface.sequelize.query(
      "CREATE INDEX users_groups_user_id_index ON users_groups USING hash (user_id)"
    );
    await queryInterface.sequelize.query(
      "CREATE INDEX users_groups_group_id_index ON users_groups USING hash (group_id)"
    );
    await queryInterface.sequelize.query(
      "CREATE INDEX messages_sort_index ON messages (created_at DESC)"
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query("DROP INDEX messages_sender_id_index");
    await queryInterface.sequelize.query(
      "DROP INDEX messages_receiver_id_index"
    );
    await queryInterface.sequelize.query("DROP INDEX messages_id_index");
    await queryInterface.sequelize.query("DROP INDEX users_id_index");
    await queryInterface.sequelize.query("DROP INDEX groups_id_index");
    await queryInterface.sequelize.query(
      "DROP INDEX users_groups_user_id_index"
    );
    await queryInterface.sequelize.query(
      "DROP INDEX users_groups_group_id_index"
    );
    await queryInterface.sequelize.query("DROP INDEX messages_sort_index");
  },
};
