const bookshelf =require ('../bookshelf');

const Users=bookshelf.model('Users',{
  tableName:'users',
  posts:function(){
    return this.hasMany('Posts');
  }
});
module.exports = Users;

