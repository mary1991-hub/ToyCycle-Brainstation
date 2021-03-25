
const postData= require('../seed_data/posts');
exports.seed = function(knex) {
  return knex('posts')
    .del()
    .then(()=>{
      return knex("users")
        .pluck("id")
        .then((userIds)=>{
          console.log(userIds);
          return userIds;
      })
    })
    .then((userIds)=>{
      return postData.map((post)=>{
        const randomIndex = Math.floor(Math.random()*userIds.length);
        const randomId= userIds[randomIndex];
        post.user_id=randomId;
        return post;
      })
    })
    .then((postWithIds) =>knex("posts").insert(postWithIds));
};
