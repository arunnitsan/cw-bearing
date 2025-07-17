export default async function handler(req, res) {
  try {
    const { url, testDraftMode } = req.query;

    if (!url) {
      return res.status(400).json({
        error: 'URL parameter is required',
        example: '/api/debug/typo3?url=ihre-loesung&testDraftMode=true'
      });
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}${url}`;

    // Test both normal and draft mode
    const tests = [];

    // Test 1: Normal request
    try {
      const normalResponse = await fetch(apiUrl, {
        headers: {
          'Cache-Control': 'no-cache'
        }
      });

      tests.push({
        type: 'Normal Request',
        url: apiUrl,
        status: normalResponse.status,
        headers: Object.fromEntries(normalResponse.headers.entries()),
        success: normalResponse.ok
      });
    } catch (error) {
      tests.push({
        type: 'Normal Request',
        url: apiUrl,
        error: error.message,
        success: false
      });
    }

    // Test 2: Draft mode request
    if (testDraftMode === 'true') {
      try {
        const draftResponse = await fetch(apiUrl, {
          headers: {
            'X-Draft-Mode': 'true',
            'X-Preview-Mode': 'true',
            'X-No-Cache': 'true',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });

        tests.push({
          type: 'Draft Mode Request',
          url: apiUrl,
          status: draftResponse.status,
          headers: Object.fromEntries(draftResponse.headers.entries()),
          success: draftResponse.ok
        });
      } catch (error) {
        tests.push({
          type: 'Draft Mode Request',
          url: apiUrl,
          error: error.message,
          success: false
        });
      }
    }

    return res.json({
      timestamp: new Date().toISOString(),
      apiBaseUrl: process.env.NEXT_PUBLIC_API_URL,
      requestedUrl: url,
      fullApiUrl: apiUrl,
      tests,
      summary: {
        total: tests.length,
        successful: tests.filter(t => t.success).length,
        failed: tests.filter(t => !t.success).length
      }
    });

  } catch (error) {
    return res.status(500).json({
      error: 'Debug API error',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
}
