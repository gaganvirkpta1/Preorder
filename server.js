const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const { shopifyApi, LATEST_API_VERSION } = require('@shopify/shopify-api');

dotenv.config();
app.use(cors());
app.use(express.json());

// Shopify API setup
const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  scopes: process.env.SCOPES.split(","),
  hostName: process.env.HOST.replace(/https?:\/\//, ""),
  apiVersion: LATEST_API_VERSION,
  isEmbeddedApp: true,
});

// ✅ Root route fix
app.get("/", (req, res) => {
  res.send("Preorder App Running 🚀");
});

// Step 1: Auth start
app.get("/auth", shopify.auth.begin());

// Step 2: Auth callback
app.get("/auth/callback", shopify.auth.callback(), async (req, res) => {
  const session = await shopify.session.getCurrentId({ isOnline: true });
  console.log("✅ Authenticated Session:", session);
  res.redirect(`/?shop=${req.query.shop}`);
});

// Example API route
app.get("/api/test", async (req, res) => {
  res.json({ success: true, message: "API working" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
