const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/auth");
const {
  renderLogin,
  handleLogin,
  renderDashboard,
  renderCreatePost,
  handleCreatePost,
  renderEditPost,
  handleEditPost,
  handleSignUp,
  handleDelete,
  handleLogout,
} = require("../controllers/adminController");

router.get("/admin", renderLogin);
router.post("/admin", handleLogin);
router.post("/register", handleSignUp);
router.get("/dashboard", authMiddleware, renderDashboard);
router.get("/add-post", authMiddleware, renderCreatePost);
router.post("/add-post", authMiddleware, handleCreatePost);
router.get("/edit-post/:id", authMiddleware, renderEditPost);
router.put("/edit-post/:id", authMiddleware, handleEditPost);
router.delete("/delete-post/:id", authMiddleware, handleDelete);
router.get("/logout", handleLogout);

module.exports = router;
