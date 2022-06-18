'use strict';

const sql = `
DROP TABLE IF EXISTS "user" CASCADE;

CREATE TABLE IF NOT EXISTS "user"
(
    "id"         UUID,
    "email"      VARCHAR(255) UNIQUE,
    "password"   VARCHAR(255),
    "name"       VARCHAR(255),
    "created_at" TIMESTAMP WITH TIME ZONE,
    "updated_at" TIMESTAMP WITH TIME ZONE,
    "deleted_at" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id")
);
`;

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.query(sql);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
