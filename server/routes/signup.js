const express=require('express');
const router=express.Router();
const Users=require('../models/users');


router.post('/',(req,res)=>{
   console.log(req);
   let filePromise = new Promise((resolve, reject) => {
      if (req.files && req.files.images) {
         const filePath = req.files.images.name.replace(/\ /gi, "_");
         const uploadPath = process.cwd() + '/public/images/upload_images/' + filePath;

         // Use the mv() method to place the file somewhere on your server
         req.files.images.mv(uploadPath, function(err) {
            if (err)
               reject(err);

            resolve(filePath);
         });
      } else {
         resolve('default.png');
      }
   });

   filePromise.then((filePath) => {
      return new Users({
         name: req.body.name,
         address: req.body.address,
         City: req.body.City,
         email: req.body.email,
         phone: req.body.phone,
         username: req.body.username,
         images: filePath,
         password: req.body.password
      })
      .save()
      .then(newUsers=>{
         res.status(200).json(newUsers);
      })
   });
   
 });
 

 module.exports=router;


// exports.profile = function(req, res){
// 	let message = '';
// 	let id = req.params.id;
//     let sql="SELECT * FROM `users` WHERE `id`='"+id+"'"; 
//     lequery(sql, function(err, result){
// 	  if(result.length <= 0)
// 	  message = "Profile not found!";
	  
//       res.render('/profile',{data:result, message: message});
//    });
// };
