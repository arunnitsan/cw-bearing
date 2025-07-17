import { Row, Col } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AOSRefresh } from "../utils/AOSRefresh";
import ReactMarkdown from "react-markdown";
import MoreLink from "../components/Shared/MoreLink";
import rehypeRaw from "rehype-raw";
import Link from "next/link";

const IntroProducts = ({ data, id }) => {
  return (
    <section
      className="intro-products-section blue-gradient dark-btm-right-shape"
      id={`c${id}`}
    >
      <div className="container">
        <Row>
          <Col xs={12} sm={12} md={5} className="content-block">
            <div className="intro-products-box">
              {data.headline && <h1 data-aos="fade">{data.headline}</h1>}
              <div className="content-wrapper" data-aos="fade-up">
                <div className="content-in">
                  {data.text && (
                    <ReactMarkdown children={data.text} rehypePlugins={[rehypeRaw]} components={{ a: Link }}/>
                  )}
                </div>
                {data.list && data.list.length ? (
                  <>
                    {data.list.map((btn,id) => {
                      return(
                        btn.btntext && btn.btnlink && (
                          // <MoreLink key={btn + id} link={btn.btnlink.href}>
                          <MoreLink key={btn + id} link={`${new DOMParser().parseFromString(btn.btnlink.href, "text/html").documentElement.textContent}`}>
                            {btn.btntext}
                          </MoreLink>
                        )
                      )
                    })}
                  </>
                ) : ""}
              </div>
            </div>
          </Col>
          <Col xs={12} sm={12} md={7} className="image-block">
            <div className="product-img-in" data-aos="fade-left">
              {data.image && data.image.length ? (
                <LazyLoadImage
                  src={`${process.env.NEXT_PUBLIC_API_URL}${data.image[0]?.properties?.originalUrl}`}
                  afterLoad={AOSRefresh}
                  alt="Product"
                />
              ) : (
                ""
              )}
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default IntroProducts;
