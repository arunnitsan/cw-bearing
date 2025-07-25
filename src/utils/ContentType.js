// Load Core of React.js and Next.js
import React from "react";
import { Container } from "react-bootstrap";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import dynamic from "next/dynamic";

// Helper function to detect HeaderBig content type for SSR
export const hasHeaderBig = (pageContentProps) => {
  if (!pageContentProps || !Array.isArray(pageContentProps)) {
    return false;
  }

  return pageContentProps.some(item =>
    item && item.type === "mask_ns_headerbig"
  );
};

// Load Component Whenever It's Calling from CMS Page
const HeaderBig = dynamic(() => import("../sections/HeaderBig"));
const Spacer = dynamic(() => import("../sections/Spacer"));
const IconLinkList = dynamic(() => import("../sections/IconLinkList"));
const Form = dynamic(() => import("../sections/Form"), {
  ssr: false, // Keep this as client-side only due to form validation
});
const ProductSolutions = dynamic(() => import("../sections/ProductSolutions"));
const Accordion = dynamic(() => import("../sections/Accordion"));
const FullContentAccordion = dynamic(() => import("../sections/FullContentAccordion"));
const Testimonial = dynamic(() => import("../sections/Testimonial"));
const IntroProductsOverview = dynamic(() => import("../sections/IntroProductsOverview"));
const ImageIconText = dynamic(() => import("../sections/ImageIconText"));
const IntroIndustriesOverview = dynamic(() => import("../sections/IntroIndustriesOverview"));
const IntroIndustries = dynamic(() => import("../sections/IntroIndustries"));
const IntroProducts = dynamic(() => import("../sections/IntroProducts"));
const PersonalContact = dynamic(() => import("../sections/PersonalContact"));
const CTAWithBackground = dynamic(() => import("../sections/CTAWithBackground"));
const CTAWithCircle = dynamic(() => import("../sections/CTAWithCircle"));
const ProductTypes = dynamic(() => import("../sections/ProductTypes"));
const NewsTeaser = dynamic(() => import("../sections/NewsTeaser"));
const IndexedSearch = dynamic(() => import("../sections/IndexedSearch"), {
  ssr: false, // Keep this as client-side only due to search functionality
});
const IntroCareer = dynamic(() => import("../sections/IntroCareer"));
const SimplesDownload = dynamic(() => import("../sections/SimplesDownload"));
const SubMenuPages = dynamic(() => import("../sections/SubMenuPages"));
const AccordionDownloads = dynamic(() => import("../sections/AccordionDownloads"));
const StructuredContent = dynamic(() => import("../sections/StructuredContent"));
const Video = dynamic(() => import("../sections/Video"));

const ContentType = ({ pageContentProps }) => {
  // Add error handling for missing or invalid props
  if (!pageContentProps || !Array.isArray(pageContentProps)) {
    console.warn('ContentType: pageContentProps is missing or not an array');
    return null;
  }

  return (
    <>
      {pageContentProps.map((items, index) => {
        if (!items) {
          return null;
        }

        try {
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

          // Add validation for contentData
          if (!contentData || !Array.isArray(contentData) || contentData.length === 0) {
            console.warn(`ContentType: Invalid contentData for item ${index} with type ${contentType}`);
            return null;
          }

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
                    if (items.appearance?.frameClass === "accordion") {
                      return (
                        <FullContentAccordion
                          id={items.id}
                          data={frameData[0]}
                        />
                      );
                    } else if (
                      items.appearance?.frameClass === "accordion-download"
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
                        contactVariant={contentData[0]?.style ? parseInt(contentData[0].style) : 0}
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

                  default:
                    console.warn(`ContentType: Unknown content type: ${contentType}`);
                    return null;
                }
              })()}
            </React.Fragment>
          );
        } catch (error) {
          console.error(`ContentType: Error rendering content item at index ${index}:`, error);
          console.error(`ContentType: Item data:`, items);
          console.error(`ContentType: Error stack:`, error.stack);
          return null;
        }
      })}
    </>
  );
};

export default ContentType;

// Recusive read json array object
function findValuesObject(obj, key) {
  try {
    return findValuesObjectHelper(obj, key, []);
  } catch (error) {
    console.error('findValuesObject: Error processing object:', error);
    return [];
  }
}

function findValuesObjectHelper(obj, key, list) {
  if (!obj) return list;

  try {
    if (obj instanceof Array) {
      for (var i in obj) {
        list = list.concat(findValuesObjectHelper(obj[i], key, []));
      }
    } else if (obj instanceof Object) {
      if (obj.hasOwnProperty(key)) {
        list.push(obj[key]);
      }
      for (var j in obj) {
        list = list.concat(findValuesObjectHelper(obj[j], key, []));
      }
    }
  } catch (error) {
    console.error('findValuesObjectHelper: Error processing object:', error);
  }

  return list;
}
