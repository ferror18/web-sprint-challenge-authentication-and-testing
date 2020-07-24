exports.up = function(knex) {
  return knex.schema.createTable("users", tbl => {
        tbl.increments();
        tbl.string("username", 128).notNullable().unique().index();
        tbl.string("password", 256).notNullable();
        // tbl.string("salt", 32).notNullable().unique()
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
