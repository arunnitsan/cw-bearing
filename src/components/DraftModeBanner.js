import React from 'react';
import { useDraftMode } from '../utils/useDraftMode';

const DraftModeBanner = () => {
  const { isDraftMode, exitDraftMode, forceRefresh, lastRefresh, isRefreshing } = useDraftMode();

  if (!isDraftMode) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#ff6b35',
        color: 'white',
        padding: '12px 20px',
        textAlign: 'center',
        zIndex: 9999,
        fontSize: '14px',
        fontWeight: '500',
      }}
    >
      <span>Preview Mode - </span>
      <button
        onClick={forceRefresh}
        disabled={isRefreshing}
        style={{
          backgroundColor: 'transparent',
          border: '1px solid white',
          color: 'white',
          padding: '4px 12px',
          marginLeft: '8px',
          borderRadius: '4px',
          cursor: isRefreshing ? 'not-allowed' : 'pointer',
          fontSize: '12px',
          opacity: isRefreshing ? 0.6 : 1,
        }}
      >
        {isRefreshing ? 'Refreshing...' : 'Force Refresh'}
      </button>
      <button
        onClick={exitDraftMode}
        style={{
          backgroundColor: 'transparent',
          border: '1px solid white',
          color: 'white',
          padding: '4px 12px',
          marginLeft: '8px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '12px',
        }}
      >
        Exit Preview
      </button>
      <div style={{ fontSize: '11px', marginTop: '4px', opacity: 0.8 }}>
        Last refresh: {new Date(lastRefresh).toLocaleTimeString()}
      </div>
    </div>
  );
};

export default DraftModeBanner;
