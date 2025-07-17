import React from "react";
import MoreLink from "../components/Shared/MoreLink";

const SubMenuPages = ({ data, id }) => {
  const renderSubPages = (data) => {
    if (!data.menu || !data.menu.length) return <></>;

    return data.menu.map((m, id) => (
      <div className="sub-menu-box" key={m.link + m.subtitle}>
        <h3>
          {m.title}
          {data.readMoreLabel && m.link && (
            <div className="ml-30 d-none d-md-inline-block">
              <MoreLink link={`${m.link}`}>{data.readMoreLabel}</MoreLink>
            </div>
          )}
        </h3>
        <div className="location-box">
          <span>
            {data.location}: {m.subtitle}
          </span>
        </div>
        <div className="link-in">
          {data.readMoreLabel && m.link && (
            <div className="d-inline-block d-md-none">
              <MoreLink link={`${m.link}`}>{data.readMoreLabel}</MoreLink>
            </div>
          )}
        </div>
      </div>
    ));
  };

  return (
    <section className="sub-menu-pages-section" id={`c${id}`}>
      <div className="container">
        <div className="sub-pages-wrapper">{renderSubPages(data)}</div>
      </div>
    </section>
  );
};

export default SubMenuPages;
