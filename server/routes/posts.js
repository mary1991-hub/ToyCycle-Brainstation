const express = require("express");
const router = express.Router();
const Posts = require("../models/posts");
const Users = require("../models/users");

router.get("/", (_req, res) => {
  Posts.fetchAll().then((posts) => {
    res.status(200).json(posts);
  });
});

router.post("/", (req, res) => {
  console.log(req);
  let filePromise = new Promise((resolve, reject) => {
    if (req.files && req.files.images) {
      const filePath = req.files.images.name.replace(/\ /gi, "_");
      const uploadPath =
        process.cwd() + "/public/images/upload_images/" + filePath;

      // Use the mv() method to place the file somewhere on your server
      req.files.images.mv(uploadPath, function (err) {
        if (err) reject(err);

        resolve(filePath);
      });
    } else {
      resolve("default.png");
    }
  });

  filePromise
    .then((filePath) => {
      new Posts({
        name: req.body.name,
        description: req.body.description,
        tadeConddition: req.body.tradeCondition,
        value: req.body.value,
        likes: req.body.likes,
        images: filePath,
        user_id: req.body.user_id,
        age: req.body.age,
        categories: req.body.categories,
      })
        .save()
        .then((newPosts) => {
          res.status(200).json(newPosts);
        });
    })
    .catch((err) => {
      console.log(err);
      return res
        .status(404)
        .json({ error: "Please provide with a valid user Id" });
    });
});

router.get("/:id", (req, res) => {
  Posts.where({ id: req.params.id })
    .fetch({ withRelated: ["users"] })
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch(() => {
      res.status(400).json({ error: "No post with this ID" });
    });
});

router.put("/:id", (req, res) => {
  res.status(200).json({ status: "OK" });
});

router.delete("/:id", (req, res) => {
  Posts.where({ id: req.params.id })
    .destroy()
    .then(() => {
      res.status(204).json({ status: "Deleted" });
    });
});

module.exports = router;
