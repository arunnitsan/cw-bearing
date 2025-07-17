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
import SimplesDownload from "../sections/SimplesDownload";

export const renderComponents = (id, type, data) => {
	switch (type) {
		case "mask_ns_spacer":
			return (
				<Spacer data={data} />
			);

		case "mask_ns_video":
			return (
				<Video id={`${id}`} data={data} />
			);

		case "mask_ns_iconlinklist":
			return (
				<Row>
					<IconLinkList id={`${id}`} data={data} />
				</Row>
			);

		case "mask_ns_productsolutions":
			return (
				<Row>
					<ProductSolutions id={`${id}`} data={data} />
				</Row>
			);

		case "mask_ns_accordion":
			return (
				<Row>
					<CustomAccordion id={`${id}`} data={data} />
				</Row>
			);

		case "mask_ns_testimonial":
			return (
				<Row>
					<Testimonial id={`${id}`} data={data} />
				</Row>
			);

		case "mask_ns_introproductsoverview":
			return (
				<Row>
					<IntroProductsOverview id={`${id}`} data={data} />
				</Row>
			);

		case "mask_ns_introproducts":
			return (
				<Row>
					<IntroProducts id={`${id}`} data={data} />
				</Row>
			);

		case "mask_ns_imageicontext":
			return (
				<Row>
					<ImageIconText id={`${id}`} data={data} />
				</Row>
			);

		case "mask_ns_introindustriesoverview":
			return (
				<Row>
					<IntroIndustriesOverview id={`${id}`} data={data} />
				</Row>
			);

		case "mask_ns_introindustries":
			return (
				<Row>
					<IntroIndustries id={`${id}`} data={data} />
				</Row>
			);

		case "mask_ns_personalcontact":
			return (
				<Row>
					<PersonalContact id={`${id}`} data={data} />
				</Row>
			);

		case "mask_ns_producttypes":
			return (
				<ProductTypes id={`${id}`} data={data} />
			);

		case "mask_ns_ctabgimage":
			return (
				<Row>
					<CTAWithBackground id={`${id}`} data={data} />
				</Row>
			);

		case "mask_ns_ctacircle":
			return (
				<Row>
					<CTAWithCircle
						id={`${id}`}
						data={data}
						contactVariant={parseInt(data.style)}
					/>
				</Row>
			);

		case "news_pi1":
			return (
				<NewsTeaser id={`${id}`} data={data} />
			);

		case "mask_ns_simpledownload":
			return (
				<SimplesDownload id={`${id}`} data={data} />
			);
	}
};
