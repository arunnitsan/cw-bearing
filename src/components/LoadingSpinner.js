import React from 'react';
import { Container, Row } from 'react-bootstrap';

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="content-section pt-11 pb-7 pt-lg-30 pb-lg-28 bg-default-6">
      <Container>
        <Row className="justify-content-center">
          <div className="col-xl-6 col-lg-8 col-sm-10">
            <div className="section-title text-center mt-12 mt-lg-20 mb-12 mb-lg-23">
              <div className="loading-spinner-wrapper">
                <div className="loading-spinner"></div>
                <h2 className="loading-text">{message}</h2>
              </div>
            </div>
          </div>
        </Row>
      </Container>
      <style jsx>{`
        .loading-spinner-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 200px;
        }
        
        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #007bff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }
        
        .loading-text {
          color: #666;
          font-size: 1.2rem;
          margin: 0;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner; 