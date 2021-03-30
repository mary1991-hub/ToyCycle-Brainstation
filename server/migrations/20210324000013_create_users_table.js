
exports.up = function(knex) {
 return knex.schema.createTable("users",(table=>{
   table.increments("id").primary();
   table.string("name").notNullable();
   table.string("address").notNullable().defaultTo("Not Provided");
   table.string("City").notNullable();
   table.string('email').notNullable();
   table.string("phone").notNullable();
   table.string("images").notNullable().defaultTo("Not Provided");
   table.string("username").notNullable();
   table.integer("password").notNullable().defaultTo(0);
 })) 
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
