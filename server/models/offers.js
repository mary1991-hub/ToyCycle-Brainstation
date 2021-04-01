const bookshelf =require ('../bookshelf');

const Offers=bookshelf.model('Offers',{
  tableName:'offers',
  users:function(){
    return this.belongsTo('Users');
  }
});
module.exports = Offers;