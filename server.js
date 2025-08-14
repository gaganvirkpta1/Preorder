// Load required modules
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Shopify API imports (v11+)
const { shopifyApi, LATEST_API_VERSION } = require('@shopify/shopify-api');
const { MemorySessionStorage } = require('@shopify/shopify-api/session-storage/memory');
const { default: nodeAdapter } = require('@shopify/shopify-api/adapters/node');

// Load .env variables
dotenv.config();

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Shopify API setup
const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  scopes: process.env.SCOPES.split(","),
  hostName: process.env.HOST.replace(/https:\/\/|\/$/g, ""),
  apiVersion: LATEST_API_VERSION,
  isEmbeddedApp: true,
  sessionStorage: new MemorySessionStorage(),
  restResources: undefined,
  adapters: { http: nodeAdapter }
});

// Default home route
app.get('/', (req, res) => {
  res.send('✅ Shopify Preorder App Running Successfully!');
});

// Health check route (useful for Render uptime checks)
app.get('/healthz', (req, res) => {
  res.status(200).send('ok');
});

// Test route
app.get('/check', async (req, res) => {
  try {
    res.send({ success: true, msg: 'Check route working' });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

// PORT handling for Render (must use Render's provided PORT)

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
}

      // Default home route
app.get('/', (req, res) => {
  res.send('✅ Shopify Preorder App Running Successfully!');
});

// Health check route (useful for Render uptime checks)
app.get('/healthz', (req, res) => {
  res.status(200).send('ok');
});

// Test route
app.get('/check', async (req, res) => {
  try {
    res.send({ success: true, msg: 'Check route working' });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
});

// PORT handling for Render (must use Render's provided PORT)
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
     
        
