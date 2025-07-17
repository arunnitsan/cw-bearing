import { AOSRefresh } from "../utils/AOSRefresh";
import ReactMarkdown from "react-markdown";
import { LazyLoadImage } from "react-lazy-load-image-component";
import rehypeRaw from "rehype-raw";
import Link from "next/link";

const ImageIconText = ({ id, data }) => {
  return (
    <section id={`c${id}`} className="image-ic-section">
      <div className="container-lg">
        <div className="ii-text-wrapper">
          <div className="ii-text-left">
            <div className="desktop-visible img-in" data-aos="fade-right">
              {data.image && data.image.length ? (
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}${data.image[0]?.properties?.originalUrl}`}
                />
              ) : ("")}
            </div>
          </div>
          <div className="ii-text-right">
            <div className="content-block">
              {data.headline && (
                <h1>
                  {parseInt(data.check) && data.icon && data.icon.length ? (
                    <span data-aos="fade-right" className="icon-in">
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_URL}${data.icon[0]?.properties?.originalUrl}`}
                        alt="Icon"
                      />
                    </span>
                  ) : (
                    ""
                  )}
                  <span data-aos="fade">{data.headline}</span>
                </h1>
              )}
              <div className="mobile-visible img-in" data-aos="fade-right">
                {data.image && data.image.length ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_URL}${data.image[0]?.properties?.originalUrl}`}
                    afterLoad={AOSRefresh}
                    alt="Image Icon"
                  />
                ) : (
                  ""
                )}
              </div>
              <div className="content-in" data-aos="fade-up">
                {data.text && (
                  <ReactMarkdown children={data.text} rehypePlugins={[rehypeRaw]} components={{ a: Link }}/>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageIconText;
