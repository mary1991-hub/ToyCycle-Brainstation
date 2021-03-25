
exports.up = function(knex) {
 return knex.schema.createTable("users",(table=>{
   table.increments("id").primary();
   table.string("name").notNullable();
   table.string("address").notNullable("Not Provided");
   table.string("City").notNullable();
   table.string('email').notNullable();
   table.string("phone").notNullable();
 })) 
};

exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
