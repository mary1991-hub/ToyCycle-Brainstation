const express = require("express");
const router = express.Router();
const Offers = require("../models/offers");
const requireAuth = require("./requireAuth");

router.get("/", requireAuth, (_req, res) => {
  Offers
    // .where("status", "<>", "Canceled")
    .fetchAll({
      withRelated: ["seller", "buyer", "sellerPost", "buyerPost"],
    })
    .then((offers) => {
      res.status(200).json(offers);
    });
});

router.get("/my", requireAuth, (_req, res) => {
  Offers.where("status", "<>", "Canceled")
    .where({ buyer_user_id: _req.authUser.id })
    .fetchAll({
      withRelated: ["seller", "buyer", "sellerPost", "buyerPost"],
    })
    .then((offers) => {
      res.status(200).json(offers);
    });
});

router.get("/me", requireAuth, (_req, res) => {
  Offers.where("status", "<>", "Canceled")
    .where({ seller_user_id: _req.authUser.id })
    .fetchAll({
      withRelated: ["seller", "buyer", "sellerPost", "buyerPost"],
    })
    .then((offers) => {
      res.status(200).json(offers);
    });
});

router.post("/", requireAuth, (req, res) => {
  new Offers({
    buyer_user_id: req.body.buyer_user_id,
    seller_user_id: req.body.seller_user_id,
    buyer_post_id: req.body.buyer_post_id,
    seller_post_id: req.body.seller_post_id,
    buyer_message: req.body.buyer_message,
    seller_message: "",
    status: "Pending",
  })
    .save()
    .then((newOffer) => {
      return Offers.where({ id: newOffer.get("id") }).fetch({
        withRelated: ["seller", "buyer", "sellerPost", "buyerPost"],
      });
    })
    .then((newOffer) => {
      res.status(200).json(newOffer);
    });
});

router.get("/:id", requireAuth, (req, res) => {
  Offers.where({ id: req.params.id })
    .fetch({
      withRelated: ["seller", "buyer", "sellerPost", "buyerPost"],
    })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() => {
      res.status(400).json({ error: "No post with this ID" });
    });
});

function updateOffer(offerId, data) {
  return Offers.where({ id: offerId })
    .fetch()
    .then((result) =>
      result.save(data, {
        method: "update",
      })
    );
}

router.post("/:id/cancel", (req, res) => {
  updateOffer(req.params.id, { status: "Canceled" })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() => {
      res.status(400).json({ error: "No post with this ID" });
    });
});

router.post("/:id/accept", (req, res) => {
  updateOffer(req.params.id, {
    status: "Accepted",
    seller_message: req.body.message,
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() => {
      res.status(400).json({ error: "No post with this ID" });
    });
});

router.post("/:id/reject", (req, res) => {
  updateOffer(req.params.id, {
    status: "Rejected",
    seller_message: req.body.message,
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch(() => {
      res.status(400).json({ error: "No post with this ID" });
    });
});

module.exports = router;
