'use strict';

const schema = process.env.DB_SCHEMA;

const sql = String.raw`
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE SCHEMA IF NOT EXISTS __fill_tmp;

CREATE OR REPLACE FUNCTION __fill_tmp.RandomUser() RETURNS ${schema}."user" AS
$$
DECLARE
    usr          ${schema}."user";
    user_name    TEXT;
    names        TEXT[] = ARRAY ['Tim', 'Christie', 'Logan', 'Allan', 'Folami', 'Aubrey', 'Udo', 'Dechen', 'Roshan', 'Marley', 'Kaimana', 'Chin', 'Dawa', 'Rutendo', 'Jun', 'Aleks', 'Alexander', 'Fedor', 'Nikita', 'Anna', 'Denis'];
BEGIN
    user_name = (SELECT *
                 FROM unnest(names)
                 ORDER BY random()
                 LIMIT 1);

    usr.id = uuid_generate_v4();
    usr.name = user_name;
    usr.phone = concat('+79', trunc((random() + 1.0) * 100000000)::text);
    usr.email = user_name || substring(md5(random()::text) for 5) || '@example.com';
    usr.password = 'password';
    usr.created_at = now();
    usr.updated_at = now();

    return usr;
END
$$ LANGUAGE plpgsql;

INSERT INTO ${schema}."user"
SELECT *
FROM unnest(ARRAY(
        SELECT __fill_tmp.RandomUser()
        FROM generate_series(1, 100)
    ));

-- INSERT INTO ${schema}."user" VALUES (uuid_generate_v4(), 'test@example.com', '+79999999999', 'password', 'Test', now(), now(), null);

DROP SCHEMA __fill_tmp CASCADE;
`;

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.query(sql);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
