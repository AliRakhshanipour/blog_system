import cors from 'cors';
import { config } from 'dotenv';
import express from 'express'; // Changed 'e' to 'express' for clarity
import morgan from 'morgan';
import path from 'path';
config();

const port = process.env.PORT;
// Array of allowed origins
const allowedOrigins = [
  `http://127.0.0.1:${port}`, // Local development
  `http://localhost:${port}`, // Another allowed origin
];

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Reject the request
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
