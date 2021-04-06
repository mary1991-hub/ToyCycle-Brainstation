const express = require("express");
const router = express.Router();
const Offers = require("../models/offers");

router.get("/", (_req, res) => {
  Offers
    // .where("status", "<>", "Canceled")
    .fetchAll({
      withRelated: ["seller", "buyer", "sellerPost", "buyerPost"],
    })
    .then((offers) => {
      res.status(200).json(offers);
    });
});

router.get("/:id", (req, res) => {
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
