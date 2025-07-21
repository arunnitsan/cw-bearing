import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";

function Error({ statusCode }) {
  return (
    <div className="content-section pt-11 pb-7 pt-lg-30 pb-lg-28 bg-default-6">
      <Container>
        <Row className="justify-content-center">
          <div className="col-xl-6 col-lg-8 col-sm-10">
            <div className="section-title text-center mt-12 mt-lg-20 mb-12 mb-lg-23">
              <h1 className="title mb-6">{statusCode || 500}</h1>
              <h2>Oops! Something went wrong</h2>
              <p className="gr-text-8 px-lg-7 px-xl-0">
                {statusCode
                  ? `An error ${statusCode} occurred on server`
                  : "An error occurred on client"}
              </p>
              <Link href="/" className="back-to-home">
                <img
                  src="/images/png/arrowhead-left-blue.svg"
                  alt="Arrow"
                />
                Back to Home
              </Link>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
