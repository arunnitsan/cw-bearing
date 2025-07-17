import { Row, Col } from "react-bootstrap";
import RoundedImage from "../components/Shared/RoundedImage";
import AuroraInner from "../components/Shared/AuroraInner";
import { renderWordHtml } from "../utils/WordAnimation";

const Testimonial = ({ id, data }) => {
  return (
    <section
      id={`c${id}`}
      className="testimonial-section top-left-shape btm-right-shape"
    >
      <div className="container-md">
        <AuroraInner />
        <Row className="testimonial-row">
          <Col sm={12} md={4} className="testimonial-profile">
            {data.image && data.image.length ? (
              <RoundedImage
                aosAnimation={true}
                image={`${process.env.NEXT_PUBLIC_API_URL}${data.image[0]?.properties?.originalUrl}`}
                imageAlt="Testimonial"
              />
            ) : (
              ""
            )}
          </Col>
          <Col sm={12} md={8} className="testimonial-details">
            <div className="testimonial-details-inner">
              <h3>
                {data.text && renderWordHtml(`${data.text}`, 0.12, 0.035)}
              </h3>
              <div className="testimonial-person-details" data-aos="fade-up">
                {data.name && <span className="name">{data.name}</span>}
                {data.designation && (
                  <span className="position">{data.designation}</span>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default Testimonial;
