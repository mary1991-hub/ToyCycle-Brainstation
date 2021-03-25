const express=require('express');
const router=express.Router();
const Users=require('../models/users');

router.get('/',(_req,res)=>{
  Users
     .fetchAll()
     .then(users=>{
      res.status(200).json(users);
     });
});


router.post('/',(req,res)=>{
  new Users({
    name:req.body.name,
    username:req.body.username,
    password:req.body.password
  })
  .save()
  .then(newUsers=>{
    res.status(200).json(newUsers);
  })
  .catch((err)=>{
    res.status(404).json({error:"Error"})
  })
});


router.get('/:id',(req,res)=>{
  Users
     .where({id:req.params.id})
     .fetch({withRelated:['posts']})
     .then(users=>{
      res.status(200).json(users);
     })
     .catch(()=>{
       res.status(400).json({error:'No users with this ID'})
     });
});


router.put('/:id',(req,res)=>{
  res.status(200).json({status:'OK'});
});


router.delete('/:id',(req,res)=>{
  Users
     .where({id:req.params.id})
     .destroy()
     .then(()=>{
      res.status(204).json({status:"Deleted"});
     })
});


module.exports=router;
