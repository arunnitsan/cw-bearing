import { Row, Col } from "react-bootstrap";
import Link from "next/link";

const renderIconLinkList = (data) => {
  return Object.values(data.list).map((l, id) => {
    return (
      <Col key={l + id} sm={12} md={6} lg={4} data-aos="fade-up">
        <div className="product-details-wrapper">
          <div className="product-details">
            <div className="product-image">
              <div className="img-in">
                {l.image && l.image.length ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${l.image[0]?.properties?.originalUrl}`}
                    alt="Icon"
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="product-name">
              {l.headline && <h6>{l.headline}</h6>}
            </div>
          </div>
          <div className="choose-wrapper">
            {l.btnlink && l.btntext ? (
              <Link href={`${new DOMParser().parseFromString(l.btnlink.href, "text/html").documentElement.textContent}`}>
                  {l.btntext}
                  <span className="mobile-visible">
                    <img
                      src="/images/png/arrow-blue-right-over.svg"
                      alt="Arrow"
                    />
                  </span>
                  <span className="desktop-visible">
                    <img src="/images/png/arrow-right-circle.svg" alt="Arrow" />
                  </span>
              </Link>
            ): ("")}
          </div>
        </div>
      </Col>
    );
  });
};

const IconLinkList = ({ id, data }) => {
  return (
    <section
      id={`c${id}`}
      className="product-solutions-section icon-list-section"
    >
      <div className="container-md">
        <div className="product-solutions-inner">
          {data.headline && <h3 data-aos="fade">{data.headline}</h3>}
          <Row>{renderIconLinkList(data)}</Row>
        </div>
      </div>
    </section>
  );
};

export default IconLinkList;
