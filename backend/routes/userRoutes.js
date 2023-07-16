const express = require("express");
const router = express.Router();

const {
  AddUser,
  updateUser,
  GetUser,
  UserVerify,
  sendVerification,
  forgotPassword,
  addFavorite,
  addWatchList,
} = require("../controllers/userControllers");

router
  .post("/signup", AddUser)
  .post("/login", GetUser)
  .post("/updateuser", updateUser)
  .post("/verifyemail", UserVerify)
  .post("/resendcode", sendVerification)
  .post("/forgot-password", forgotPassword)
  .post("/addfavorite", addFavorite)
  .post("/addwatchlist", addWatchList);

module.exports = router;
