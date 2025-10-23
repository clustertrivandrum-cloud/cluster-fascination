const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const router = require("./routes/index.js");
const morgan = require("morgan");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

// Trust proxy - IMPORTANT for AWS/Nginx deployments
app.set('trust proxy', 1);

// ============================================================
// CORS CONFIGURATION - Production-Safe for AWS + Render
// ============================================================

// Dynamic CORS origin checker with diagnostics
const allowedOrigins = [
  process.env.CLIENT_PORT_LOCAL,
  process.env.ADMIN_PORT_LOCAL,
  process.env.CLIENT_URL,
  process.env.ADMIN_URL,
].filter(Boolean); // Remove undefined/null values

// Log allowed origins on startup (for debugging)
console.log('🔒 CORS Configuration:');
console.log('Allowed Origins:', allowedOrigins);
console.log('Environment:', process.env.NODE_ENV || 'development');

const corsOptions = {
  origin: function (origin, callback) {
    // Log incoming request origin for debugging
    console.log(`📨 Incoming request from origin: ${origin || 'NO ORIGIN (same-origin or tools)'}`);
    
    // Allow requests with no origin (mobile apps, Postman, same-origin)
    if (!origin) {
      console.log('✅ Allowing request with no origin');
      return callback(null, true);
    }
    
    // Check if origin is in allowed list
    if (allowedOrigins.includes(origin)) {
      console.log(`✅ Origin allowed: ${origin}`);
      return callback(null, true);
    }
    
    // Reject origin
    console.log(`❌ Origin blocked: ${origin}`);
    console.log('Allowed origins are:', allowedOrigins);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true, // Allow cookies and auth headers
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
  ],
  exposedHeaders: ['Set-Cookie'],
  optionsSuccessStatus: 200, // For legacy browsers
  maxAge: 86400, // Cache preflight for 24 hours
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Explicit OPTIONS handler for preflight requests
app.options('*', cors(corsOptions));

// ============================================================
// SECURITY MIDDLEWARE - Helmet Configuration
// ============================================================
app.use(
  helmet({
    contentSecurityPolicy: false, // Disable CSP for API (not needed for backend)
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Static files
app.use(express.static(path.join(__dirname, "./middlewares/public")));

// Logging middleware
morgan.token("custom-date", (req, res) => {
  return new Date().toUTCString();
});
app.use(
  morgan(
    ":custom-date :method :url :status :res[content-length] - :response-time ms"
  )
);

// ============================================================
// DIAGNOSTIC ENDPOINTS - Remove in production if not needed
// ============================================================

// CORS diagnostic endpoint
app.get('/api/cors-test', (req, res) => {
  res.json({
    message: 'CORS is working!',
    origin: req.headers.origin || 'No origin header',
    allowedOrigins: allowedOrigins,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Environment check endpoint
app.get('/api/env-check', (req, res) => {
  res.json({
    message: 'Environment variables loaded',
    hasClientUrl: !!process.env.CLIENT_URL,
    hasAdminUrl: !!process.env.ADMIN_URL,
    nodeEnv: process.env.NODE_ENV || 'not set',
    allowedOriginsCount: allowedOrigins.length,
  });
});

// ============================================================
// API ROUTES
// ============================================================
app.use("/api", router);

module.exports = app;
