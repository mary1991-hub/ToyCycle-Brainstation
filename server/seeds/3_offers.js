const offerData= require('../seed_data/offers');
exports.seed = function(knex) {
  return knex('offers')
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
      return offerData.map((offer)=>{
        const randomIndex = Math.floor(Math.random()*userIds.length);
        const randomId= userIds[randomIndex];
        offer.user_id=randomId;
        return offer;
      })
    })
    .then((offerWithIds) =>knex("offers").insert(offerWithIds));
};
