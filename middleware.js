import { NextResponse } from 'next/server';

const username = process.env.VERCEL_AUTH_USERNAME || 'admin';
const password = process.env.VERCEL_AUTH_PASSWORD || 'password';

export function middleware(req) {
  // Skip authentication for static files and API routes
  if (
    req.nextUrl.pathname.startsWith('/_next/') ||
    req.nextUrl.pathname.startsWith('/api/') ||
    req.nextUrl.pathname.startsWith('/static/') ||
    req.nextUrl.pathname === '/favicon.ico' ||
    req.nextUrl.pathname === '/robots.txt' ||
    req.nextUrl.pathname === '/sitemap.xml'
  ) {
    return NextResponse.next();
  }

  const authHeader = req.headers.get('authorization');

  if (authHeader) {
    const [scheme, encoded] = authHeader.split(' ');
    if (scheme === 'Basic') {
      try {
        // Decode base64 credentials
        const decoded = atob(encoded);
        const [user, pass] = decoded.split(':');
        if (user === username && pass === password) {
          return NextResponse.next();
        }
      } catch (error) {
        console.error('Auth parsing error:', error);
      }
    }
  }

  // Return authentication challenge
  return new NextResponse(
    `
    <html>
      <head>
        <title>Authentication Required</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; }
          .container { max-width: 500px; margin: 0 auto; }
          .credentials { background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Authentication Required</h1>
          <p>Please enter your credentials to access this site.</p>
          <div class="credentials">
            <p><strong>Username:</strong> ${username}</p>
            <p><strong>Password:</strong> ${password}</p>
          </div>
        </div>
      </body>
    </html>
    `,
    {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
        'Content-Type': 'text/html',
      },
    }
  );
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt
     * - sitemap.xml
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
