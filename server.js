const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const cors = require('cors');
const chalk = require('chalk');
const authRoutes = require('./routes/auth');
const dressRoutes = require('./routes/dress'); 
const featuredProductRoutes = require('./routes/featuredProducts');
const purchasedDressesRoutes = require('./routes/purchasedDressesRoutes');
const checkoutRoutes = require('./routes/checkoutRoutes');
// Initialize dotenv to load environment variables
dotenv.config();

// Create an instance of express
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // Log HTTP requests
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse JSON bodies
app.use(express.static('uploads'));
app.use('/images', express.static('path_to_your_images_directory'));
 // Serve static files from the uploads directory

// Connect to the database
connectDB();

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/dresses', dressRoutes);
app.use('/api/featured-products', featuredProductRoutes);
app.use('/api/purchased-dresses', purchasedDressesRoutes); // Corrected the mount path for purchased dresses
app.use('/api/checkout', checkoutRoutes); 

// Test route
app.get('/api/test', (req, res) => {
  res.send('Server is up and running!');
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(chalk.green(`Server running in ${process.env.DEV_MODE} mode on port ${PORT}`));
});
