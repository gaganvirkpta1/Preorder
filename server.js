const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Shopify API imports
const { shopifyApi, LATEST_API_VERSION, MemorySessionStorage } = require('@shopify/shopify-api');
const { default: nodeAdapter } = require('@shopify/shopify-api/adapters/node');

dotenv.config();

const app = express();
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
  sessionStorage: new MemorySessionStorage(),
  restResources: undefined,
  adapters: { http: nodeAdapter }
});

// Routes
app.get('/', (req, res) => {
  res.send('🚀 Shopify Preorder App Running Successfully!');
});

app.get('/check', async (req, res) => {
  try {
    res.send({ success: true, m
