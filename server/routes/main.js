const express = require("express");
const router = express.Router();

const {
  renderHome,
  renderSinglePost,
  handleSearch,
  renderAbout,
  renderContact,
} = require("../controllers/publicUserController");

router.get("", renderHome);
router.get("/post/:id", renderSinglePost);
router.post("/search", handleSearch);
router.get("/about", renderAbout);
router.get("/contact", renderContact);

module.exports = router;
