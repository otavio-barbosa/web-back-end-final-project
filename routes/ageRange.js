const express = require("express");
const router = express.Router();

const Auth = require("../helpers/Auth");

const ageRangeController = require("../controllers/ageRangeController");

router.get("/ageRange/", Auth.accessValidation, (req, res) => {
  ageRangeController.getAll(req, res);
});

router.get("/ageRange/:id", Auth.accessValidation, (req, res) => {
  ageRangeController.get(req, res);
});

router.post("/ageRange", Auth.accessValidation, (req, res) => {
  ageRangeController.create(req, res);
});

router.put("/ageRange/:id", Auth.accessValidation, (req, res) => {
  ageRangeController.update(req, res);
});

router.delete("/ageRange/:id", Auth.accessValidation, (req, res) => {
    ageRangeController.delete(req, res);
});

module.exports = router;