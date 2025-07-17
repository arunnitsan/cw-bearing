import ReactMarkdown from "react-markdown";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Button from "../components/Core/Button";
import { AOSRefresh } from "../utils/AOSRefresh";
import rehypeRaw from "rehype-raw";
import Link from "next/link";

const IntroProductsOverview = ({ id, data }) => {
  return (
    <>
      <section
        id={`c${id}`}
        className="products-overview-section blue-gradient btm-left-shape"
      >
        <div className="container-md">
          <div className="image-wrapper">
            <div className="img-in">
              {data.image && data.image.length ? (
                <div
                  className="img"
                  style={{
                    backgroundImage: `url(${process.env.NEXT_PUBLIC_API_URL}${data.image[0]?.properties?.originalUrl})`,
                  }}
                ></div>
              ) : ("")}
            </div>
          </div>
          <div className="overview-wrapper">
            <div className="overview-left">
              {data.headline && <h1 data-aos="fade">{data.headline}</h1>}
            </div>
            <div
              className="overview-right"
              data-aos="fade-up"
              data-aos-duration="200"
            >
              <div className="overview-content">
                {data.text && (
                  <ReactMarkdown children={data.text} rehypePlugins={[rehypeRaw]} components={{ a: Link }}/>
                )}
              </div>
              {data.btntext && <Button>{data.btntext}</Button>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default IntroProductsOverview;
