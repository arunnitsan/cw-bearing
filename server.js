const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

// Basic authentication credentials
const AUTH_USERNAME = process.env.DEV_AUTH_USERNAME || 'admin';
const AUTH_PASSWORD = process.env.DEV_AUTH_PASSWORD || 'password';

// Create basic auth middleware
const basicAuth = (req, res) => {
  // Skip auth for static files and API routes
  if (req.url.startsWith('/_next/') || req.url.startsWith('/api/') || req.url.startsWith('/static/')) {
    return false;
  }

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.writeHead(401, {
      'WWW-Authenticate': 'Basic realm="Development Access"',
      'Content-Type': 'text/html'
    });
    res.end(`
      <html>
        <head><title>Authentication Required</title></head>
        <body>
          <h1>Authentication Required</h1>
          <p>Please enter your development credentials:</p>
          <p><strong>Username:</strong> ${AUTH_USERNAME}</p>
          <p><strong>Password:</strong> ${AUTH_PASSWORD}</p>
        </body>
      </html>
    `);
    return true; // Auth required
  }

  // Parse Basic Auth header
  const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString();
  const [username, password] = auth.split(':');

  if (username === AUTH_USERNAME && password === AUTH_PASSWORD) {
    return false; // Auth successful, continue
  }

  // Invalid credentials
  res.writeHead(401, {
    'WWW-Authenticate': 'Basic realm="Development Access"',
    'Content-Type': 'text/html'
  });
  res.end(`
    <html>
      <head><title>Authentication Failed</title></head>
      <body>
        <h1>Authentication Failed</h1>
        <p>Invalid username or password.</p>
        <p><strong>Username:</strong> ${AUTH_USERNAME}</p>
        <p><strong>Password:</strong> ${AUTH_PASSWORD}</p>
      </body>
    </html>
  `);
  return true; // Auth failed
};

// Prepare Next.js app
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);

      // Check authentication first
      if (basicAuth(req, res)) {
        return; // Auth failed or required, response already sent
      }

      // Handle the request with Next.js
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  })
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
      console.log(`> Development Authentication:`);
      console.log(`  Username: ${AUTH_USERNAME}`);
      console.log(`  Password: ${AUTH_PASSWORD}`);
      console.log(`> To change credentials, set DEV_AUTH_USERNAME and DEV_AUTH_PASSWORD environment variables`);
    });
});
