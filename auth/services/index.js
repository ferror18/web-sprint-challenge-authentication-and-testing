const { hashRounds } = require("../constants")
const bcrypt = require('bcryptjs')

module.exports = {
    // This needs to return to save both salt and hash
    hashString : str => {return bcrypt.hashSync(str, hashRounds)}
}

// exports.up = function (knex) {
//     return knex.schema
//       .createTable("users", tbl => {
//         tbl.string("id", '32').nutNullable.unique().primary()
//         tbl.string("username", 128).notNullable().unique().index();
//         tbl.string("password", 256).notNullable();
//         tbl.string("salt",
//   };
  
//   exports.down = function (knex) {
//     return knex.schema.dropTableIfExists("roles").dropTableIfExists("users");
//   };