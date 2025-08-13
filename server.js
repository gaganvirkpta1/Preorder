// server.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Shopify API imports
const { shopifyApi, LATEST_API_VERSION } = require('@shopify/shopify-api');
const { default: nodeAdapter } = require('@shopify/shopify-api/adapters/node');
const { MemorySessionStorage } = require('@shopify/shopify-api/session-storage/memory');

// Load env variables
dotenv.config();

// Create Express app
const app = express();
app.use(cors());
app.use(express.json());

// Shopify API setup with Node.js adapter
const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  scopes: process.env.SCOPES.split(","),
  hostName: process.env.HOST.replace(/https?:\/\//, ""),
  apiVersion: LATEST_API_VERSION,
  isEmbeddedApp: true,
  sessionStorage: new MemorySessionStorage(),
  restResources: undefined, // Optional: add if you want REST resources
  adapters: { http: nodeAdapter }
});

// Routes
app.get('/', (req, res) => {
  res.send('Shopify Preorder App Running 🚀');
});

// Example endpoint to check Shopify connection
app.get('/check', async (req, res) => {
  try {
    res.json({ success: true, message: "App connected successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
