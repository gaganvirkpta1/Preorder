require('@shopify/shopify-api/adapters/node');


const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
// Shopify API imports
const { shopifyApi, LATEST_API_VERSION } = require('@shopify/shopify-api');

dotenv.config();
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
    adapter: adapters.node(), // ✅ FIXED
});

// Root route
app.get("/", (req, res) => {
    res.send("Preorder App Running 🚀");
});

// Step 1: Auth start
app.get("/auth", shopify.auth.begin());

// Step 2: Auth callback
app.get("/auth/callback", shopify.auth.callback(), async (req, res) => {
    const session = await shopify.session.getCurrentId({ isOnline: true });
    console.log("✅ Authenticated Sessio
