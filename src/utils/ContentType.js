// Load Core of React.js and Next.js
import React, { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import dynamic from "next/dynamic";
import LoadingSpinner from "../components/LoadingSpinner";

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
const HeaderBig = dynamic(() => import("../sections/HeaderBig"), {
  loading: () => <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Loading header...</div>,
  ssr: true
});
const Spacer = dynamic(() => import("../sections/Spacer"), {
  loading: () => <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Loading spacer...</div>,
  ssr: true
});
const IconLinkList = dynamic(() => import("../sections/IconLinkList"), {
  loading: () => <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Loading icon list...</div>,
  ssr: true
});
const Form = dynamic(() => import("../sections/Form"), {
  ssr: false, // Keep this as client-side only due to form validation
  loading: () => <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Loading form...</div>
});
const ProductSolutions = dynamic(() => import("../sections/ProductSolutions"), {
  loading: () => <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Loading products...</div>,
  ssr: true
});
const Accordion = dynamic(() => import("../sections/Accordion"), {
  loading: () => <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Loading accordion...</div>,
  ssr: true
});
const FullContentAccordion = dynamic(() => import("../sections/FullContentAccordion"), {
  loading: () => <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Loading content...</div>,
  ssr: true
});
const Testimonial = dynamic(() => import("../sections/Testimonial"), {
  loading: () => <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Loading testimonial...</div>,
  ssr: true
});
const IntroProductsOverview = dynamic(() => import("../sections/IntroProductsOverview"), {
  loading: () => <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Loading overview...</div>,
  ssr: true
});
const ImageIconText = dynamic(() => import("../sections/ImageIconText"), {
  loading: () => <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Loading content...</div>,
  ssr: true
});
const IntroIndustriesOverview = dynamic(() => import("../sections/IntroIndustriesOverview"), {
  loading: () => <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Loading industries...</div>,
  ssr: true
});
const IntroIndustries = dynamic(() => import("../sections/IntroIndustries"), {
  loading: () => <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Loading industries...</div>,
  ssr: true
});
const IntroProducts = dynamic(() => import("../sections/IntroProducts"), {
  loading: () => <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Loading products...</div>,
  ssr: true
});
const PersonalContact = dynamic(() => import("../sections/PersonalContact"), {
  loading: () => <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Loading contact...</div>,
  ssr: true
});
const CTAWithBackground = dynamic(() => import("../sections/CTAWithBackground"), {
  loading: () => <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Loading CTA...</div>,
  ssr: true
});
const CTAWithCircle = dynamic(() => import("../sections/CTAWithCircle"), {
  loading: () => <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Loading CTA...</div>,
  ssr: true
});
const ProductTypes = dynamic(() => import("../sections/ProductTypes"), {
  loading: () => <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Loading types...</div>,
  ssr: true
});
const NewsTeaser = dynamic(() => import("../sections/NewsTeaser"), {
  loading: () => <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Loading news...</div>,
  ssr: true
});
const IndexedSearch = dynamic(() => import("../sections/IndexedSearch"), {
  ssr: false, // Keep this as client-side only due to search functionality
  loading: () => <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Loading search...</div>
});
const IntroCareer = dynamic(() => import("../sections/IntroCareer"), {
  loading: () => <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Loading career...</div>,
  ssr: true
});
const SimpleDownload = dynamic(() => import("../sections/SimplesDownload"), {
  loading: () => <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Loading downloads...</div>,
  ssr: true
});
const SubMenuPages = dynamic(() => import("../sections/SubMenuPages"), {
  loading: () => <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Loading menu...</div>,
  ssr: true
});
const AccordionDownloads = dynamic(() => import("../sections/AccordionDownloads"), {
  loading: () => <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Loading downloads...</div>,
  ssr: true
});
const StructuredContent = dynamic(() => import("../sections/StructuredContent"), {
  loading: () => <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Loading content...</div>,
  ssr: true
});
const Video = dynamic(() => import("../sections/Video"), {
  loading: () => <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Loading video...</div>,
  ssr: true
});

// Component wrapper with error handling
const SafeComponent = ({ component: Component, ...props }) => {
  const [hasError, setHasError] = React.useState(false);
  const [isClient, setIsClient] = React.useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  try {
    if (!Component) {
      console.warn('SafeComponent: Component is undefined');
      return null;
    }

    if (hasError) {
      return <div>Component failed to load</div>;
    }

    // Don't render until client-side hydration is complete
    if (!isClient) {
      return <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>Initializing...</div>;
    }

    return <Component {...props} />;
  } catch (error) {
    console.error('SafeComponent: Error rendering component:', error);
    setHasError(true);
    return <div>Component failed to load</div>;
  }
};

const ContentType = ({ pageContentProps }) => {
  const [isClient, setIsClient] = React.useState(false);

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Add error handling for missing or invalid props
  if (!pageContentProps || !Array.isArray(pageContentProps)) {
    console.warn('ContentType: pageContentProps is missing or not an array');
    return null;
  }

  // Don't render until client-side hydration is complete
  if (!isClient) {
    return <LoadingSpinner message="Loading components..." />;
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

          // Validate that contentData[0] exists before using it
          if (!contentData[0]) {
            console.warn(`ContentType: contentData[0] is undefined for item ${index} with type ${contentType}`);
            return null;
          }

          return (
            <React.Fragment key={index}>
              {(() => {
                switch (contentType) {
                  // Type: HeaderBig (Core)
                  case "mask_ns_headerbig":
                    return (
                      <SafeComponent component={HeaderBig} data={contentData[0]} />
                    );

                  case "mask_ns_spacer":
                    return (
                      <SafeComponent component={Spacer} data={contentData[0]} />
                    );

                  case "mask_ns_iconlinklist":
                    return (
                      <SafeComponent component={IconLinkList} id={items.id} data={contentData[0]} />
                    );

                  case "mask_ns_productsolutions":
                    return (
                      <SafeComponent component={ProductSolutions} id={items.id} data={contentData[0]} />
                    );

                  case "mask_ns_accordion":
                    return (
                      <SafeComponent component={Accordion} id={items.id} data={contentData[0]} />
                    );

                  case "mask_ns_video":
                    return (
                      <SafeComponent component={Video} id={items.id} data={contentData[0]} />
                    );

                  case "structured_content":
                    // Validate frameData before using it
                    if (!frameData || !Array.isArray(frameData) || !frameData[0]) {
                      console.warn(`ContentType: Invalid frameData for structured_content at index ${index}`);
                      return null;
                    }
                    
                    if (items.appearance?.frameClass === "accordion") {
                      return (
                        <SafeComponent component={FullContentAccordion}
                          id={items.id}
                          data={frameData[0]}
                        />
                      );
                    } else if (
                      items.appearance?.frameClass === "accordion-download"
                    ) {
                      return (
                        <SafeComponent component={AccordionDownloads} id={items.id} data={frameData[0]} />
                      );
                    } else {
                      return (
                        <SafeComponent component={StructuredContent} id={items.id} data={frameData[0]} />
                      );
                    }

                  case "mask_ns_testimonial":
                    return (
                      <SafeComponent component={Testimonial} id={items.id} data={contentData[0]} />
                    );

                  case "mask_ns_introproductsoverview":
                    return (
                      <SafeComponent component={IntroProductsOverview}
                        id={items.id}
                        data={contentData[0]}
                      />
                    );

                  case "mask_ns_introproducts":
                    return (
                      <SafeComponent component={IntroProducts} id={items.id} data={contentData[0]} />
                    );

                  case "mask_ns_imageicontext":
                    return (
                      <SafeComponent component={ImageIconText} id={items.id} data={contentData[0]} />
                    );

                  case "menu_subpages":
                    // Validate frameData before using it
                    if (!frameData || !Array.isArray(frameData) || !frameData[0]) {
                      console.warn(`ContentType: Invalid frameData for menu_subpages at index ${index}`);
                      return null;
                    }
                    return (
                      <SafeComponent component={SubMenuPages} id={items.id} data={frameData[0]} />
                    );

                  case "mask_ns_introindustriesoverview":
                    return (
                      <SafeComponent component={IntroIndustriesOverview}
                        id={items.id}
                        data={contentData[0]}
                      />
                    );

                  case "mask_ns_introindustries":
                    return (
                      <SafeComponent component={IntroIndustries} id={items.id} data={contentData[0]} />
                    );

                  case "mask_ns_personalcontact":
                    return (
                      <LazyLoadComponent>
                        <SafeComponent component={PersonalContact} id={items.id} data={contentData[0]} />
                      </LazyLoadComponent>
                    );

                  case "mask_ns_producttypes":
                    return (
                      <SafeComponent component={ProductTypes} id={items.id} data={contentData[0]} />
                    );

                  case "mask_ns_ctabgimage":
                    return (
                      <LazyLoadComponent>
                        <SafeComponent component={CTAWithBackground}
                          id={items.id}
                          data={contentData[0]}
                        />
                      </LazyLoadComponent>
                    );

                  case "mask_ns_ctacircle":
                    return (
                      <SafeComponent component={CTAWithCircle}
                        id={items.id}
                        data={contentData[0]}
                        contactVariant={contentData[0]?.style ? parseInt(contentData[0].style) : 0}
                      />
                    );

                  case "news_pi1":
                    return (
                      <SafeComponent component={NewsTeaser} id={items.id} data={items.content} />
                    );

                  case "ke_search_pi2":
                    return (
                      <SafeComponent component={IndexedSearch} data={outerData} />
                    );

                  case "ke_search_pi1":
                    return false;

                  case "mask_ns_introcareer":
                    return (
                      <SafeComponent component={IntroCareer} id={items.id} data={contentData[0]} />
                    );

                  case "mask_ns_simpledownload":
                    return (
                      <SafeComponent component={SimpleDownload} id={items.id} data={contentData[0]} />
                    );

                  case "form_formframework":
                    return (
                      <Container>
                        <SafeComponent component={Form} id={items.id} data={items.content} />
                      </Container>
                    );

                  case "shortcut":
                    // Validate shortcut content before recursive call
                    if (!items.content?.shortcut || !Array.isArray(items.content.shortcut)) {
                      console.warn(`ContentType: Invalid shortcut content at index ${index}`);
                      return null;
                    }
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
