import { useState, useEffect } from 'react';

export default function TestAuth() {
  const [testResults, setTestResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const runAuthTest = async () => {
    setLoading(true);
    try {
      // Test 1: Access API route (should work without auth)
      const apiResponse = await fetch('/api/test-auth');
      const apiData = await apiResponse.json();

      // Test 2: Try to access a protected page
      const pageResponse = await fetch('/');
      const pageData = await pageResponse.text();

      setTestResults({
        apiTest: {
          success: apiResponse.ok,
          status: apiResponse.status,
          data: apiData
        },
        pageTest: {
          success: pageResponse.ok,
          status: pageResponse.status,
          requiresAuth: pageResponse.status === 401,
          data: pageData.substring(0, 200) + '...' // First 200 chars
        },
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      setTestResults({
        error: error.message,
        timestamp: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>HTTP Authentication Test</h1>

      <button
        onClick={runAuthTest}
        disabled={loading}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: loading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer'
        }}
      >
        {loading ? 'Testing...' : 'Run Authentication Test'}
      </button>

      {testResults && (
        <div style={{ marginTop: '20px' }}>
          <h2>Test Results</h2>
          <pre style={{
            backgroundColor: '#f5f5f5',
            padding: '15px',
            borderRadius: '5px',
            overflow: 'auto',
            maxHeight: '500px'
          }}>
            {JSON.stringify(testResults, null, 2)}
          </pre>

          <div style={{ marginTop: '20px' }}>
            <h3>Analysis:</h3>
            <ul>
              <li>
                <strong>API Route Test:</strong>
                {testResults.apiTest?.success ? '✅ Working' : '❌ Failed'}
                (Status: {testResults.apiTest?.status})
              </li>
              <li>
                <strong>Page Protection Test:</strong>
                {testResults.pageTest?.requiresAuth ? '✅ Authentication Required' : '❌ No Authentication'}
                (Status: {testResults.pageTest?.status})
              </li>
              <li>
                <strong>Environment Variables:</strong>
                {testResults.apiTest?.data?.environment?.vercelAuthUsername === 'SET' ? '✅ Set' : '❌ Not Set'}
              </li>
            </ul>
          </div>
        </div>
      )}

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#e9ecef', borderRadius: '5px' }}>
        <h3>Expected Behavior:</h3>
        <ul>
          <li><strong>API Routes:</strong> Should be accessible without authentication</li>
          <li><strong>Pages:</strong> Should require authentication (401 status)</li>
          <li><strong>Static Files:</strong> Should be accessible without authentication</li>
          <li><strong>Environment Variables:</strong> Should be set for custom credentials</li>
        </ul>
      </div>
    </div>
  );
}
