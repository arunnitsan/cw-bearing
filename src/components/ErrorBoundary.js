import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null, isHydrationError: false };
  }

  static getDerivedStateFromError(error) {
    // Check if this is a hydration error
    const isHydrationError = error.message && (
      error.message.includes('hydration') || 
      error.message.includes('Hydration') ||
      error.message.includes('Text content does not match')
    );
    
    return { 
      hasError: true, 
      isHydrationError 
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error);
    console.error('Error info:', errorInfo);

    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // Special handling for hydration errors
      if (this.state.isHydrationError) {
        return (
          <div style={{ padding: '20px', border: '1px solid orange', margin: '20px', backgroundColor: '#fff3cd' }}>
            <h2>Content is loading...</h2>
            <p>Please wait while the page content loads properly.</p>
            <button
              onClick={() => this.setState({ hasError: false, error: null, errorInfo: null, isHydrationError: false })}
              style={{ marginTop: '10px', padding: '5px 10px', backgroundColor: '#ffc107', border: 'none', borderRadius: '4px' }}
            >
              Retry
            </button>
          </div>
        );
      }

      return (
        <div style={{ padding: '20px', border: '1px solid red', margin: '20px' }}>
          <h2>Something went wrong!</h2>
          <details style={{ whiteSpace: 'pre-wrap', marginTop: '10px' }}>
            <summary>Error Details (Click to expand)</summary>
            <p><strong>Error:</strong> {this.state.error && this.state.error.toString()}</p>
            <p><strong>Stack Trace:</strong></p>
            <pre>{this.state.errorInfo.componentStack}</pre>
            <p><strong>Error Stack:</strong></p>
            <pre>{this.state.error && this.state.error.stack}</pre>
          </details>
          <button
            onClick={() => this.setState({ hasError: false, error: null, errorInfo: null, isHydrationError: false })}
            style={{ marginTop: '10px', padding: '5px 10px' }}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
