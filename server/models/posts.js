const bookshelf =require ('../bookshelf');

const Posts=bookshelf.model('Posts',{
  tableName:'posts',
  users:function(){
    return this.belongsTo('Users');
  }
});
module.exports = Posts;