import Link from "next/link";
import { useContext } from "react";
import GlobalContext from "../../context/GlobalContext";

const Button = ({
  targetBlank,
  diffDomain,
  children = "Button",
  className = "",
  btnWithArrow = false,
  whiteHover = false,
  link,
  ...props
}) => {
  const { handleConfigurator, configurator } = useContext(GlobalContext);
  return (
    <>
      {link ? (
        <>
          {diffDomain ?
            <a
              href={`${process.env.NEXT_PUBLIC_API_URL1}${link}`}
              className={`btn btn-red ${className} ${btnWithArrow ? "btn-w-arrow" : ""
                } ${whiteHover ? "br-hover-white" : ""}`}
              target="_blank"
              {...props}
            >
              {btnWithArrow ? (
                <span className="text-wrapper">
                  {children}
                  <span className="icon-in">
                    <img
                      src="/images/png/arrow-white-right-over.svg"
                      alt="Arrow Right"
                    />
                    <img
                      src="/images/png/arrow-red-right-over.svg"
                      alt="Arrow Right"
                      className="hover-visible"
                    />
                  </span>
                </span>
              ) : (
                <>{children}</>
              )}
            </a> : (
              <>
                <Link href={`${new DOMParser().parseFromString(link, "text/html").documentElement.textContent}`} className={`btn btn-red ${className} ${btnWithArrow ? "btn-w-arrow" : ""} ${whiteHover ? "br-hover-white" : ""}`} target={`${targetBlank ? '_blank' : ""}`} {...props} >
                  {btnWithArrow ? (
                    <span className="text-wrapper">
                      {children}
                      <span className="icon-in">
                        <img
                          src="/images/png/arrow-white-right-over.svg"
                          alt="Arrow Right"
                        />
                        <img
                          src="/images/png/arrow-red-right-over.svg"
                          alt="Arrow Right"
                          className="hover-visible"
                        />
                      </span>
                    </span>
                  ) : (
                    <>{children}</>
                  )}
                </Link>
              </>
            )

          }
        </>
      ) : (
        <button
          className={`btn btn-red ${className} ${btnWithArrow ? "btn-w-arrow" : ""
            } ${whiteHover ? "br-hover-white" : ""}`}
          onClick={() =>
            handleConfigurator({ ...configurator, isVisible: true })
          }
          {...props}
        >
          {btnWithArrow ? (
            <span className="text-wrapper">
              {children}
              <span className="icon-in">
                <img
                  src="/images/png/arrow-white-right-over.svg"
                  alt="Arrow Right"
                />
                <img
                  src="/images/png/arrow-red-right-over.svg"
                  alt="Arrow Right"
                  className="hover-visible"
                />
              </span>
            </span>
          ) : (
            <>{children}</>
          )}
        </button>
      )}
    </>
  );
};

export default Button;
