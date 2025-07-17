import React from 'react';
import { useDraftMode } from '../utils/useDraftMode';

const DraftModeBanner = () => {
  const { isDraftMode, exitDraftMode } = useDraftMode();

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
    </div>
  );
};

export default DraftModeBanner;
