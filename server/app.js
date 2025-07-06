import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import './config/passport.js';
import aiRoutes from './routes/ai.js';
import authRoutes from './routes/auth.js';
import courseRoutes from './routes/course.js';

const app = express();

// ✅ Allow frontend access from both local & Netlify
const allowedOrigins = [
  'http://localhost:5173',
  'https://cadv.netlify.app'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());

// ✅ Correct session setup for cross-origin OAuth
const isProduction = process.env.NODE_ENV === 'production';

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: isProduction ? 'none' : 'lax',
    secure: isProduction, // only true on Render
  },
}));


app.use(passport.initialize());
app.use(passport.session());

// ✅ Routes
app.use('/api', aiRoutes);
app.use('/auth', authRoutes);
app.use('/courses', courseRoutes);

// ✅ Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
