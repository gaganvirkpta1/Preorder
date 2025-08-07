app.get("/api/auth/callback", async (req, res) => {
  try {
    const session = await shopify.auth.validateAuthCallback(req, res, req.query);

    const client = new shopify.api.clients.Rest({ session });

    // ✅ Pre-order script tag insert
    await client.post({
      path: 'script_tags',
      data: {
        script_tag: {
          event: 'onload',
          src: 'https://shopify-whatsapp-app-m6cy.onrender.com/preorder-widget.js',
        },
      },
      type: 'application/json',
    });

    // ✅ Redirect back to app/home
    res.redirect(`/?shop=${session.shop}`);
  } catch (error) {
    console.error("ScriptTag Error:", error);
    res.status(500).send(error.message);
  }
});
