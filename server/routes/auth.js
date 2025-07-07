import express from 'express';
import passport from 'passport';

const router = express.Router();

// Step 1: Redirect to Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Step 2: Google redirects here after login
router.get('/google/callback', passport.authenticate('google', {
  successRedirect: 'https://cadv.netlify.app/',
  failureRedirect: 'https://cadv.netlify.app/login',

}));

// Step 3: Logout route
router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('https://cadv.netlify.app/login');
  });
});

// Step 4: Get logged-in user
router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ user: null });
  }
});


export default router;
