import Link from "next/link";

const MoreLink = ({ children, link, targetBlank, diffDomain }) => {
  return (
    <>
      {diffDomain ? (
        <a
          href={`${link}`}
          className="more-link"
          target="_blank"
        >
          {children}
          <span className="icon-in">
            <img src="/images/png/arrow-red-right-over.svg" alt="Arrow Red" />
            <img
              className="img-hover"
              src="/images/png/arrow-blue-right-over.svg"
              alt="Arrow Blue"
            />
          </span>
        </a>
      ) : (
        <Link href={`${link}`} className="more-link" target={`${targetBlank ? "_blank" : ""}`}>
              {children}
              <span className="icon-in">
                <img src="/images/png/arrow-red-right-over.svg" alt="Arrow Red" />
                <img
                  className="img-hover"
                  src="/images/png/arrow-blue-right-over.svg"
                  alt="Arrow Blue"
                />
              </span>
        </Link>
      )}
    </>
  );
};

MoreLink.defaultProps = {
  link: "home",
};

export default MoreLink;
