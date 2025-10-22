const app = require("./app.js");
const { connect, connection } = require("mongoose");
const dotenv = require('dotenv');
dotenv.config();

async function startServer() {
  try {
    const mongoUrl = process.env.NODE_ENV === 'production' ? (process.env.MONGO_URL_PROD || 'mongodb://localhost:27017') : (process.env.MONGO_URL_LOCAL || 'mongodb://localhost:27017');
    const port = process.env.PORT_LOCAL || 5005;
    const dbName = process.env.DATABASE_NAME || 'cluster_fascination';

    // Connect to MongoDB first (mongoUrl already includes database name)
    await connect(mongoUrl);
    console.log('Connected to MongoDB');

    // Start the server with better error handling
    const server = app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });   
    
    // Handle server errors
    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.log(`Port ${port} is already in use. Please kill the existing process or use a different port.`);
        console.log(`You can kill the process using: lsof -ti:${port} | xargs kill -9`);
        process.exit(1);
      } else {
        console.error('Server error:', error);
      }
    });

    // Handle MongoDB connection events
    connection.on('connected', () => {
      console.log('MongoDB connection established');
    });

    connection.on('error', (error) => {
      console.error('MongoDB connection error:', error);
    });

    connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    })

    // Graceful shutdown
    process.on('SIGINT', () => {
      console.log('Shutting down server...'); 
      server.close(() => {
        console.log('Server closed');
        connection.close(() => {
          console.log('MongoDB connection closed');
          process.exit(0);
        });
      });
    });

  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();