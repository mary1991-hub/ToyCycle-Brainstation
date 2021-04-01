exports.up = function(knex) {
  return knex.schema.createTable("offers",(table=>{
    table.increments("id").primary();
    table.string("userFrom").notNullable();
    table.string("userTo").notNullable();
    table.string("message").notNullable();
    table.string('postingFrom').notNullable();
    table.string("status").notNullable();
    table.date("date").notNullable();
  })) 
 };
 
 exports.down = function(knex) {
   return knex.schema.dropTable("offers");
 };