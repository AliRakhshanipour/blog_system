import cors from 'cors';
import { config } from 'dotenv';
import express from 'express'; // Changed 'e' to 'express' for clarity
import morgan from 'morgan';
import path from 'path';
config();

// Array of allowed origins
const allowedOrigins = [
  'http://localhost', // If you're accessing via localhost
  'http://127.0.0.1', // Another localhost option
];

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    console.log('Origin:', origin); // Log the origin
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },

  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // If you need to send cookies or authorization headers
};

// Middleware array
export const middlewares = [
  express.static(path.join(process.cwd(), 'public')),
  express.json(),
  express.urlencoded({ extended: true }),
  morgan('dev'),
  cors(corsOptions),
];
