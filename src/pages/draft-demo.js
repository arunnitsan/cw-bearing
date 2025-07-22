import React from 'react';
import Head from 'next/head';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useDraftMode } from '../utils/useDraftMode';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const DraftDemo = () => {
  const { enterDraftMode } = useDraftMode();

  return (
    <>
      <Head>
        <title>Draft Mode Demo | CW Bearing</title>
        <meta name="description" content="Test Next.js Draft Mode functionality" />
      </Head>

      <Container className="py-5">
        <Row>
          <Col>
            <h1 className="mb-4">Next.js Draft Mode Demo</h1>

            <Card className="mb-4">
              <Card.Header>
                <h3>How to Use Draft Mode</h3>
              </Card.Header>
              <Card.Body>
                <ol>
                  <li>Click "Enter Draft Mode" for any page below</li>
                  <li>You'll be redirected to the page with <code>?draft=true</code></li>
                  <li>A yellow banner will appear at the top</li>
                  <li>Click "Exit Preview" to return to published content</li>
                  <li>Or manually remove <code>?draft=true</code> from the URL</li>
                </ol>
              </Card.Body>
            </Card>

            <Card className="mb-4">
              <Card.Header>
                <h3>Test Pages</h3>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6} className="mb-3">
                    <Button
                      variant="primary"
                      onClick={() => enterDraftMode('')}
                      className="w-100"
                    >
                      Enter Draft Mode - Homepage
                    </Button>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Button
                      variant="primary"
                      onClick={() => enterDraftMode('en')}
                      className="w-100"
                    >
                      Enter Draft Mode - English Homepage
                    </Button>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Button
                      variant="primary"
                      onClick={() => enterDraftMode('ihre-loesung')}
                      className="w-100"
                    >
                      Enter Draft Mode - Ihre Lösung
                    </Button>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Button
                      variant="primary"
                      onClick={() => enterDraftMode('en/your-solution')}
                      className="w-100"
                    >
                      Enter Draft Mode - Your Solution
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card>
              <Card.Header>
                <h3>Manual Testing</h3>
              </Card.Header>
              <Card.Body>
                <p>You can also manually test by adding <code>?draft=true</code> to any URL:</p>
                <ul>
                  <li><code>/?draft=true</code> - Homepage in draft mode</li>
                  <li><code>/en?draft=true</code> - English homepage in draft mode</li>
                  <li><code>/ihre-loesung?draft=true</code> - Ihre Lösung in draft mode</li>
                </ul>
                <p className="text-muted">
                  <strong>Note:</strong> This approach is much simpler than the traditional Next.js draft mode
                  and works perfectly for CMS preview functionality.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export default DraftDemo;
