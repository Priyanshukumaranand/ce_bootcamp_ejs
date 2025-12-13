require("dotenv").config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
const REDIRECT_URL = 'https://ce-bootcamp.vercel.app/';

// Middleware to redirect all requests to the target URL with HTTP 301
app.use((req, res) => {
  res.redirect(301, REDIRECT_URL);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Redirecting all requests to ${REDIRECT_URL}`);
});




