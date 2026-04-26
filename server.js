const express = require('express');
const compression = require('compression');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Gzip compression
app.use(compression());

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Cache static assets
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '7d',
  etag: true,
}));

// Root → landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'landing.html'));
});

// Health check for Railway
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// 404 → home
app.use((req, res) => {
  res.redirect('/');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`GPT Works Landing → http://localhost:${PORT}`);
});
