exports.up = function(knex) {
  return knex.schema.createTable("offers",(table=>{
    table.increments("id").primary();
    table
     .integer("buyer_user_id")
     .unsigned()
     .notNullable()
     .references("id")
     .inTable("users")
     .onUpdate("CASCADE")
     .onDelete("CASCADE");
    table
     .integer("seller_user_id")
     .unsigned()
     .notNullable()
     .references("id")
     .inTable("users")
     .onUpdate("CASCADE")
     .onDelete("CASCADE");
    table
     .integer("buyer_post_id")
     .unsigned()
     .notNullable()
     .references("id")
     .inTable("posts")
     .onUpdate("CASCADE")
     .onDelete("CASCADE");
    table
     .integer("seller_post_id")
     .unsigned()
     .notNullable()
     .references("id")
     .inTable("posts")
     .onUpdate("CASCADE")
     .onDelete("CASCADE");
    table.string("buyer_message").nullable();
    table.string("seller_message").nullable();
    table.boolean("seller_notified").notNullable().defaultTo(false);
    table.boolean("buyer_notified").notNullable().defaultTo(false);
    table.string("status").notNullable();
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  })) 
 };
 
 exports.down = function(knex) {
   return knex.schema.dropTable("offers");
 };