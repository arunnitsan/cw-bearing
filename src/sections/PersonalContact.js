import React, { useEffect, useContext } from "react";
import { Row, Col } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/router";
import GlobalContext from "../context/GlobalContext";
import RoundedImage from "../components/Shared/RoundedImage";
import SecondaryButton from "../components/Shared/SecondaryButton";
import { validateEmail } from "../utils/validation";
import Link from "next/link";
import SafeLink from "../components/Shared/SafeLink";
import rehypeRaw from "rehype-raw";

const PersonalContact = ({ id, data }) => {
  const router = useRouter();

  const { handlePersonalContactData } = useContext(GlobalContext);

  useEffect(() => {
    if (router.asPath === "/products") {
      handlePersonalContactData(data);
    }
  }, []);
  return (
    <section
      id={`c${id}`}
      className="personal-contact-section blue-top-gradient dark-top-center-shape"
    >
      <div className="container-md">
        <Row className="personal-contact-row">
          <Col sm={12} md={7} className="contact-info-wrapper">
            <div className="contact-info">
              <div className="profile-img">
                {data.image && data.image.length ? (
                  <RoundedImage
                    image={`${data.image[0]?.publicUrl ? data.image[0]?.publicUrl : `${process.env.NEXT_PUBLIC_API_URL}${data.image[0]?.properties?.originalUrl}`}`}
                    imageAlt="Profile"
                    aosAnimation={true}
                    nameClass="br-blue"
                  />
                ) : (
                  ""
                )}
              </div>
              <div className="profile-info">
                {data.name && <h3 data-aos="fade-left">
                  <ReactMarkdown
                    children={data.name}
                    rehypePlugins={[rehypeRaw]}
                    components={{ a: SafeLink }}
                  />
                </h3>}
                {data.designation && (
                  <span data-aos="fade-left" className="position">
                    <ReactMarkdown
                      children={data.designation}
                      rehypePlugins={[rehypeRaw]}
                      components={{ a: SafeLink }}
                    />
                  </span>
                )}
                <div className="btn-wrapper desktop-visible">
                  {data.phone && (
                    <>
                      {data.phone.href && data.phone.title ? (
                        <Link
                          data-aos="fade-left"
                          href={data.phone.href}
                          className="tel-no"
                        >
                          {data.phone.title ? data.phone.title : ''}
                        </Link>
                      ) : (
                        <>
                          {data.phone.href  && (
                           <Link
                           data-aos="fade-left"
                           href={`tel: ${data.phone.href ? data.phone.href : ''}`}
                           className="tel-no"
                         >
                           {data.phone.title ? data.phone.title : ''}
                         </Link>
                          )}
                        </>
                      )}
                    </>
                  )}
                  {data.list && data.list.length ? (
                    <>
                      {data.list.map((b, id) => {
                        return (
                          <React.Fragment key={b.btntext + id}>
                            {b.btntext && b.btnlink && b.btnlink.linkText && (
                              <>
                                {validateEmail(
                                  b.btnlink.linkText.replace("mailto:", "").replace("(at)", "@")
                                ) ? (
                                  <Link
                                    className={`btn btn-red btn-br-red`}
                                    href={`${b.btnlink.linkText.replace("(at)", "@")}`}
                                    target="_blank"
                                  >
                                    {b.btntext}
                                  </Link>
                                ) : (
                                  <SecondaryButton
                                    link={b.btnlink.href}
                                    targetBlank={b.btnlink.target === '_blank' ? true : false}
                                    key={b + id}
                                  >
                                    {b.btntext}
                                  </SecondaryButton>
                                )}
                              </>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </Col>
          <Col sm={12} md={5}>
            <div className="contact-desc">
              {data.headline && <h1 data-aos="fade-right">{data.headline}</h1>}
              <div data-aos="fade-right" className="contact-content">
                {data.text && (
                  <ReactMarkdown
                    children={data.text}
                    rehypePlugins={[rehypeRaw]}
                    components={{ a: SafeLink }}
                  />
                )}
                <div className="btn-wrapper mobile-visible">
                  {data.list && data.list.length ? (
                    <>
                      {data.list.map((b, id) => {
                        return (
                          <React.Fragment key={b + id}>
                            {b.btntext && b.btnlink && b.btnlink.linkText && (
                              <>
                                {validateEmail(
                                  b.btnlink.href.replace("mailto:", "").replace("(at)", "@")
                                ) ? (
                                  <Link
                                    className={`btn btn-red btn-br-red`}
                                    href={`${b.btnlink.href.replace("(at)", "@")}`}
                                  >
                                    {b.btntext}
                                  </Link>
                                ) : (
                                  <SecondaryButton
                                    link={b.btnlink.href}
                                    targetBlank={b.btnlink.target === '_blank' ? true : false}
                                    key={b + id}
                                  >
                                    {b.btntext}
                                  </SecondaryButton>
                                )}
                              </>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default PersonalContact;
