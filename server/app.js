const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const router = require('./routes/index.js');
const morgan = require('morgan');
const path = require('path')
const dotenv = require('dotenv');
dotenv.config();          

const app = express();  

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false
}));

// CORS configuration
const corsOptions = {    
  origin: [
    process.env.CLIENT_PORT_LOCAL || 'http://localhost:3000', 
    process.env.ADMIN_PORT_LOCAL || 'http://localhost:3001',  
    'http://localhost:5173',  // Vite default port
    'http://localhost:5174'   // Alternative Vite port
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200
};          
app.use(cors(corsOptions));      

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));   
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

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

// API routes
app.use('/api',router);

module.exports = app;
