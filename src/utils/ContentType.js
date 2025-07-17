// Load Core of React.js and Next.js
import React from "react";
import { Container } from "react-bootstrap";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import dynamic from "next/dynamic";

// Load Component Whenever It's Calling from CMS Page
const HeaderBig = dynamic(() => import("../sections/HeaderBig"), {
  ssr: false,
});
const Spacer = dynamic(() => import("../sections/Spacer"), {
  ssr: false,
});
const IconLinkList = dynamic(() => import("../sections/IconLinkList"), {
  ssr: false,
});
const Form = dynamic(() => import("../sections/Form"), {
  ssr: false,
});
const ProductSolutions = dynamic(() => import("../sections/ProductSolutions"), {
  ssr: false,
});
const Accordion = dynamic(() => import("../sections/Accordion"), {
  ssr: false,
});
const FullContentAccordion = dynamic(
  () => import("../sections/FullContentAccordion"),
  {
    ssr: false,
  }
);
const Testimonial = dynamic(() => import("../sections/Testimonial"), {
  ssr: false,
});
const IntroProductsOverview = dynamic(
  () => import("../sections/IntroProductsOverview"),
  {
    ssr: false,
  }
);
const ImageIconText = dynamic(() => import("../sections/ImageIconText"), {
  ssr: false,
});
const IntroIndustriesOverview = dynamic(
  () => import("../sections/IntroIndustriesOverview"),
  {
    ssr: false,
  }
);
const IntroIndustries = dynamic(() => import("../sections/IntroIndustries"), {
  ssr: false,
});
const IntroProducts = dynamic(() => import("../sections/IntroProducts"), {
  ssr: false,
});
const PersonalContact = dynamic(() => import("../sections/PersonalContact"), {
  ssr: false,
});
const CTAWithBackground = dynamic(
  () => import("../sections/CTAWithBackground"),
  {
    ssr: false,
  }
);
const CTAWithCircle = dynamic(() => import("../sections/CTAWithCircle"), {
  ssr: false,
});
const ProductTypes = dynamic(() => import("../sections/ProductTypes"), {
  ssr: false,
});
const NewsTeaser = dynamic(() => import("../sections/NewsTeaser"), {
  ssr: false,
});
const IndexedSearch = dynamic(() => import("../sections/IndexedSearch"), {
  ssr: false,
});
const IntroCareer = dynamic(() => import("../sections/IntroCareer"), {
  ssr: false,
});
const SimplesDownload = dynamic(() => import("../sections/SimplesDownload"), {
  ssr: false,
});
const SubMenuPages = dynamic(() => import("../sections/SubMenuPages"), {
  ssr: false,
});
const AccordionDownloads = dynamic(
  () => import("../sections/AccordionDownloads"),
  {
    ssr: false,
  }
);
const StructuredContent = dynamic(
  () => import("../sections/StructuredContent"),
  {
    ssr: false,
  }
);
const Video = dynamic(() => import("../sections/Video"), {
  ssr: false,
});

const ContentType = ({ pageContentProps }) => {
  return (
    <>
      {pageContentProps.map((items, index) => {
        if (items) {
          let contentType = items.type;
          // let contentData = findValuesObject(
          //   items.content,
          //   "pi_flexform_content"
          // );
          let contentData = findValuesObject(
            items,
            "content"
          );
          let outerData = findValuesObject(items.content, "data");
          // let frameSelector = items.appearance.frameClass;
          let frameData = findValuesObject(items, "content");
          return (
            <React.Fragment key={index}>
              {(() => {
                switch (contentType) {
                  // Type: HeaderBig (Core)
                  case "mask_ns_headerbig":
                    return (
                      <HeaderBig data={contentData[0]} />
                    );

                  case "mask_ns_spacer":
                    return (
                      <Spacer data={contentData[0]} />
                    );

                  case "mask_ns_iconlinklist":
                    return (
                      <IconLinkList id={items.id} data={contentData[0]} />
                    );

                  case "mask_ns_productsolutions":
                    return (
                      <ProductSolutions id={items.id} data={contentData[0]} />
                    );

                  case "mask_ns_accordion":
                    return (
                      <Accordion id={items.id} data={contentData[0]} />
                    );

                  case "mask_ns_video":
                    return (
                      <Video id={items.id} data={contentData[0]} />
                    );

                  case "structured_content":
                    if (items.appearance.frameClass === "accordion") {
                      return (
                        <FullContentAccordion
                          id={items.id}
                          data={frameData[0]}
                        />
                      );
                    } else if (
                      items.appearance.frameClass === "accordion-download"
                    ) {
                      return (
                        <AccordionDownloads id={items.id} data={frameData[0]} />
                      );
                    } else {
                      return (
                        <StructuredContent id={items.id} data={frameData[0]} />
                      );
                    }

                  case "mask_ns_testimonial":
                    return (
                      <Testimonial id={items.id} data={contentData[0]} />
                    );

                  case "mask_ns_introproductsoverview":
                    return (
                      <IntroProductsOverview
                        id={items.id}
                        data={contentData[0]}
                      />
                    );

                  case "mask_ns_introproducts":
                    return (
                      <IntroProducts id={items.id} data={contentData[0]} />
                    );

                  case "mask_ns_imageicontext":
                    return (
                      <ImageIconText id={items.id} data={contentData[0]} />
                    );

                  case "menu_subpages":
                    return (
                      <SubMenuPages id={items.id} data={frameData[0]} />
                  );

                  case "mask_ns_introindustriesoverview":
                    return (
                      <IntroIndustriesOverview
                        id={items.id}
                        data={contentData[0]}
                      />
                    );

                  case "mask_ns_introindustries":
                    return (
                      <IntroIndustries id={items.id} data={contentData[0]} />
                    );

                  case "mask_ns_personalcontact":
                    return (
                      <LazyLoadComponent>
                        <PersonalContact id={items.id} data={contentData[0]} />
                      </LazyLoadComponent>
                    );

                  case "mask_ns_producttypes":
                    return (
                      <ProductTypes id={items.id} data={contentData[0]} />
                    );

                  case "mask_ns_ctabgimage":
                    return (
                      <LazyLoadComponent>
                        <CTAWithBackground
                          id={items.id}
                          data={contentData[0]}
                        />
                      </LazyLoadComponent>
                    );

                  case "mask_ns_ctacircle":
                    return (
                      <CTAWithCircle
                        id={items.id}
                        data={contentData[0]}
                        contactVariant={parseInt(contentData[0].style)}
                      />
                    );

                  case "news_pi1":
                    return (
                      <NewsTeaser id={items.id} data={items.content} />
                    );

                  case "ke_search_pi2":
                    return (
                      <IndexedSearch data={outerData} />
                    );

                  case "mask_ns_introcareer":
                    return (
                      <IntroCareer id={items.id} data={contentData[0]} />
                    );

                  case "mask_ns_simpledownload":
                    return (
                      <SimplesDownload id={items.id} data={contentData[0]} />
                    );

                  case "form_formframework":
                    return (
                      <Container>
                        <Form id={items.id} data={items.content} />
                      </Container>
                    );

                  case "shortcut":
                    return (
                      <ContentType pageContentProps={items.content.shortcut} />
                    );
                }
              })()}
            </React.Fragment>
          );
        }
      })}
    </>
  );
};

export default ContentType;

// Recusive read json array object
function findValuesObject(obj, key) {
  return findValuesObjectHelper(obj, key, []);
}

function findValuesObjectHelper(obj, key, list) {
  if (!obj) return list;
  if (obj instanceof Array) {
    for (var i in obj) {
      list = list.concat(findValuesObjectHelper(obj[i], key, []));
    }
    return list;
  }
  if (obj[key]) list.push(obj[key]);

  if (typeof obj == "object" && obj !== null) {
    var children = Object.keys(obj);
    if (children.length > 0) {
      for (i = 0; i < children.length; i++) {
        list = list.concat(findValuesObjectHelper(obj[children[i]], key, []));
      }
    }
  }
  return list;
}
