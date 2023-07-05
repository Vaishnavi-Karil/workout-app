require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const allApiRoutes = require("./router");
const session = require("express-session");

// middleware

app.use(express.json());

// Session
app.use(
  session({
    secret: "YOUR_SESSION_SECRET",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(
  cors({ origin: "http://localhost:3000", method: "GET,POST,PUT,DELETE" })
);
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(passport.initialize());
app.use(passport.session());
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

      return done(null, profile);
    }
  )
);

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
    // Successful authentication, redirect or respond with data
    // ...

    res.redirect("http://localhost:3000/dashboard");
  }
);

// Serialize and deserialize user
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
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
