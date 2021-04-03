const bookshelf =require ('../bookshelf');

const Offers=bookshelf.model('Offers',{
  tableName:'offers',
  seller:function(){
    return this.belongsTo('Users', 'seller_user_id');
  },
  buyer:function(){
    return this.belongsTo('Users', 'buyer_user_id');
  },
  sellerPost: function() {
    return this.belongsTo('Posts', 'seller_post_id');
  },
  buyerPost: function() {
    return this.belongsTo('Posts', 'buyer_post_id');
  }
});
module.exports = Offers;