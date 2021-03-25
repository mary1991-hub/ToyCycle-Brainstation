const express=require('express');
const router=express.Router();
const Posts=require('../models/posts');
const Users=require('../models/users');

router.get('/',(_req,res)=>{
  Posts
     .fetchAll()
     .then(posts=>{
      res.status(200).json(posts);
     });
});

router.post('/',(req,res)=>{
  Users
     .where({id:req.body.usersId})
     .fetch()
     .then(()=>{
        new Posts({
          name:req.body.name,
          description:req.body.description,
          value:req.body.value,
          likes:req.body.likes,
          user_id:req.body.usersId
      })
      .save()
      .then(newPosts=>{
       res.status(200).json(newPosts);
      })
     })
     .catch((err)=>{
       console.log(err);
       return res.status(404).json({error:"Please provide with a valid user Id"})
     }); 
});


router.get('/:id',(req,res)=>{
  Posts
     .where({id:req.params.id})
     .fetch({withRelated:['users']})
     .then(posts=>{
      res.status(200).json(posts);
     })
     .catch(()=>{
       res.status(400).json({error:'No post with this ID'})
     });
});

router.put('/:id',(req,res)=>{
  res.status(200).json({status:'OK'});
});

router.delete('/:id',(req,res)=>{
  Posts
     .where({id:req.params.id})
     .destroy()
     .then(()=>{
      res.status(204).json({status:"Deleted"});
     })
});

module.exports=router;