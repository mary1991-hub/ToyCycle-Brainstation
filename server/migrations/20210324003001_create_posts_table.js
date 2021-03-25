
exports.up = function(knex) {
  return knex.schema.createTable("posts",(table)=>{
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("description").notNullable();
    table.string("value").notNullable();
    table.integer("likes").notNullable().defaultTo(0);
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table
     .integer("user_id")
     .unsigned()
     .notNullable()
     .references("id")
     .inTable("users")
     .onUpdate("CASCADE")
     .onDelete("CASCADE");

  }); 
 };
 
 exports.down = function(knex) {
   return knex.schema.dropTable("posts");
 };
 