exports.up = function(knex) {
  return knex.schema.createTable("users", tbl => {
        tbl.string("id", 32).notNullable().unique().primary()
        tbl.string("username", 128).notNullable().unique();
        tbl.string("password", 256).notNullable();
        tbl.string("salt", 32).notNullable().unique()
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
