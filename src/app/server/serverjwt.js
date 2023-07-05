require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const allApiRoutes = require("./router");
const jwt = require("jsonwebtoken");
// middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
// Configure Google OAuth2 strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      // Custom logic to handle user authentication
      // You can access user profile data like profile.emails, profile.displayName, etc.
      // ...
      const token = jwt.sign({ userId: profile.id }, process.env.JWT_SECRET);
      return done(null, token);
    }
  )
);

app.use(passport.initialize());

app.use("/", allApiRoutes);
// Authentication route
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // res.send("Callback route");
    // res.redirect("/dashboard");

    const token = req.user;

    // Set the token as a response header or in the response body
    res.set("Authorization", `Bearer ${token}`);
    res.send("Callback route");
    res.redirect("http://localhost:3000/dashboard");
  }
);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Connected to db & Listening or port on http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
