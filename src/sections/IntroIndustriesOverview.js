import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import Link from "next/link";

const IntroIndustriesOverview = ({ id, data }) => {
  return (
    <section
      id={`c${id}`}
      className="industries-overview-section blue-gradient dark-btm-right-shape"
    >
      <div className="container-md">
        <div className="industries-overview-wrapper">
          <div className="industries-overview-left">
            {data.headline && <h1 data-aos="fade">{data.headline}</h1>}
          </div>
          <div className="industries-overview-right">
            <div className="io-content" data-aos="fade-up">
              {data.text && (
                <ReactMarkdown children={data.text} rehypePlugins={[rehypeRaw]} components={{ a: Link }}/>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroIndustriesOverview;
