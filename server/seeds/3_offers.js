
exports.seed = function(knex) {
  return knex('offers')
    .del()
    .then(()=>{
      return knex("posts");    
    })
    .then((posts) =>{
      var results = [];
      for (var i = 1; i < posts.length; i+= 2) {
        var buyerPost = posts[i];
        var sellerPost = posts[i - 1];
        results.push({
          "buyer_user_id": buyerPost["user_id"],
          "seller_user_id": sellerPost["user_id"],
          "buyer_post_id": buyerPost["id"],
          "seller_post_id": sellerPost["user_id"],
          "buyer_message": "Nice stuff! When I can pick up?",
          "seller_message": "",
          "status": "Pending"
        });
      }
      return results;
    })
    .then((offerWithIds) =>knex("offers").insert(offerWithIds));
};
