'use strict';

const schema = process.env.DB_SCHEMA;

const sql = String.raw`
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP SCHEMA IF EXISTS ${schema} CASCADE;

CREATE SCHEMA ${schema};

CREATE DOMAIN  ${schema}.PHONE_NUMBER AS TEXT
    CHECK (VALUE ~ '^(\+79)\d{9}$');

CREATE TABLE IF NOT EXISTS ${schema}."user"
(
    "id"         UUID,
    "email"      VARCHAR(255) UNIQUE,
    "phone"      ${schema}.PHONE_NUMBER UNIQUE,
    "password"   VARCHAR(255),
    "name"       VARCHAR(255),
    "created_at" TIMESTAMP WITH TIME ZONE,
    "updated_at" TIMESTAMP WITH TIME ZONE,
    "deleted_at" TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY ("id"),
    CHECK (phone IS NOT NULL OR
           email IS NOT NULL)
);
`;

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.query(sql);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
