import { Row, Col } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import RoundedImage from "../components/Shared/RoundedImage";
import rehypeRaw from "rehype-raw";
import Link from "next/link";

const IntroCareer = ({ id, data }) => {
  return (
    <section
      id={`c${id}`}
      className="intro-career-section gray-gradient dark-btm-right-shape"
    >
      <div className="container">
        <div className="intro-careers-wrapper">
          <Row>
            <Col xs={12} sm={12} md={8}>
              {data.subheadline && (
                <span className="highlight-text" data-aos="fade">
                  {data.subheadline}
                </span>
              )}
              {data.headline && <h1 data-aos="fade">{data.headline}</h1>}
              <div className="content-wrapper" data-aos="fade-up">
                {data.text && (
                  <ReactMarkdown children={data.text} rehypePlugins={[rehypeRaw]} components={{ a: Link }}/>
                )}
              </div>
            </Col>
            <Col xs={12} sm={12} md={4}>
              <div className="rounded-image-wrapper">
                {data.image && data.image.length ? (
                  <RoundedImage
                    image={`${process.env.NEXT_PUBLIC_API_URL}${data.image[0]?.properties?.originalUrl}`}
                    alt="Rider"
                  />
                ) : (
                  ""
                )}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};

export default IntroCareer;
