import React, { useEffect } from "react";
import { Row } from "react-bootstrap";
import Spacer from "../sections/Spacer";
import IconLinkList from "../sections/IconLinkList";
import ProductSolutions from "../sections/ProductSolutions";
import CustomAccordion from "../sections/Accordion";
import Testimonial from "../sections/Testimonial";
import IntroProductsOverview from "../sections/IntroProductsOverview";
import IntroProducts from "../sections/IntroProducts";
import ImageIconText from "../sections/ImageIconText";
import IntroIndustriesOverview from "../sections/IntroIndustriesOverview";
import IntroIndustries from "../sections/IntroIndustries";
import PersonalContact from "../sections/PersonalContact";
import ProductTypes from "../sections/ProductTypes";
import CTAWithBackground from "../sections/CTAWithBackground";
import CTAWithCircle from "../sections/CTAWithCircle";
import NewsTeaser from "../sections/NewsTeaser";
import Video from "../sections/Video";
import SimpleDownload from "../sections/SimplesDownload";

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

export const renderComponents = (id, type, data) => {
	switch (type) {
		case "mask_ns_spacer":
			return (
				<SafeComponent component={Spacer} data={data} />
			);

		case "mask_ns_video":
			return (
				<SafeComponent component={Video} id={`${id}`} data={data} />
			);

		case "mask_ns_iconlinklist":
			return (
				<Row>
					<SafeComponent component={IconLinkList} id={`${id}`} data={data} />
				</Row>
			);

		case "mask_ns_productsolutions":
			return (
				<Row>
					<SafeComponent component={ProductSolutions} id={`${id}`} data={data} />
				</Row>
			);

		case "mask_ns_accordion":
			return (
				<Row>
					<SafeComponent component={CustomAccordion} id={`${id}`} data={data} />
				</Row>
			);

		case "mask_ns_testimonial":
			return (
				<Row>
					<SafeComponent component={Testimonial} id={`${id}`} data={data} />
				</Row>
			);

		case "mask_ns_introproductsoverview":
			return (
				<Row>
					<SafeComponent component={IntroProductsOverview} id={`${id}`} data={data} />
				</Row>
			);

		case "mask_ns_introproducts":
			return (
				<Row>
					<SafeComponent component={IntroProducts} id={`${id}`} data={data} />
				</Row>
			);

		case "mask_ns_imageicontext":
			return (
				<Row>
					<SafeComponent component={ImageIconText} id={`${id}`} data={data} />
				</Row>
			);

		case "mask_ns_introindustriesoverview":
			return (
				<Row>
					<SafeComponent component={IntroIndustriesOverview} id={`${id}`} data={data} />
				</Row>
			);

		case "mask_ns_introindustries":
			return (
				<Row>
					<SafeComponent component={IntroIndustries} id={`${id}`} data={data} />
				</Row>
			);

		case "mask_ns_personalcontact":
			return (
				<Row>
					<SafeComponent component={PersonalContact} id={`${id}`} data={data} />
				</Row>
			);

		case "mask_ns_producttypes":
			return (
				<SafeComponent component={ProductTypes} id={`${id}`} data={data} />
			);

		case "mask_ns_ctabgimage":
			return (
				<Row>
					<SafeComponent component={CTAWithBackground} id={`${id}`} data={data} />
				</Row>
			);

		case "mask_ns_ctacircle":
			return (
				<Row>
					<SafeComponent component={CTAWithCircle}
						id={`${id}`}
						data={data}
						contactVariant={parseInt(data.style)}
					/>
				</Row>
			);

		case "news_pi1":
			return (
				<SafeComponent component={NewsTeaser} id={`${id}`} data={data} />
			);

		case "mask_ns_simpledownload":
			return (
				<SafeComponent component={SimpleDownload} id={`${id}`} data={data} />
			);

		default:
			// Return null for unknown component types to prevent React errors
			console.warn(`renderComponents: Unknown component type: ${type}`);
			return null;
	}
};
