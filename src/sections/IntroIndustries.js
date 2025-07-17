import { Row, Col } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import RoundedImage from "../components/Shared/RoundedImage";
import rehypeRaw from "rehype-raw";
import Link from "next/link";

const IntroIndustries = ({ id, data }) => {
  const contentStyle =
    !data.media || !data.media.length
      ? {
        paddingLeft: 0,
      }
      : {};

  return (
    <section
      id={`c${id}`}
      className="intro-industries-section blue-gradient dark-btm-right-shape"
    >
      <div className="container">
        <div className="intro-industries-wrapper">
          <Row>
            <Col xs={12} sm={12} md={8}>
              <div className="title-wrapper">
                {data.headline && <h1 data-aos="fade">{data.headline}</h1>}
                {data.check && parseInt(data.check) ? (
                  <span className="icon-in" data-aos="fade-right">
                    {/* {
                      data.image && data.image.length ? (
                        <img
                          src={`${process.env.NEXT_PUBLIC_API_URL}${data.image[0]?.properties?.originalUrl}`}
                          alt="Bike"
                        />
                      ) : (
                        ""
                      )
                    } */}
                    {data.media && data.media.length ? (
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_URL}${data.media[0]?.properties?.originalUrl}`}
                        alt="Bike"
                      />
                    ) : (
                      ""
                    )}
                  </span>
                ) : (<></>)}
              </div>
              <div
                className="content-wrapper"
                data-aos="fade-up"
                style={contentStyle}
              >
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
                {/* {data.media && data.media.length ? (
                  <RoundedImage
                    image={`${process.env.NEXT_PUBLIC_API_URL}${data.media[0]?.properties?.originalUrl}`}
                    alt="Rider"
                  />
                ) : (
                  ""
                )} */}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};

export default IntroIndustries;
