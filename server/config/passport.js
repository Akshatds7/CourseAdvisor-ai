import dotenv from 'dotenv';
dotenv.config();

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

console.log("✅ GOOGLE_CLIENT_ID:", process.env.GOOGLE_CLIENT_ID); // Must not be undefined
console.log("✅ GOOGLE_CLIENT_SECRET:", process.env.GOOGLE_CLIENT_SECRET);

const users = new Map(); // Mock DB

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "https://courseadvisor-backend.onrender.com/auth/google/callback",
}, (accessToken, refreshToken, profile, done) => {
  const existingUser = users.get(profile.id);

  if (existingUser) {
    return done(null, existingUser);
  }

  const newUser = {
    id: profile.id,
    name: profile.displayName,
    email: profile.emails?.[0]?.value,
    photo: profile.photos?.[0]?.value,
  };

  users.set(profile.id, newUser);
  return done(null, newUser);
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.get(id);
  done(null, user);
});
