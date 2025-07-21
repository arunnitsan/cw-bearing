import Link from "next/link";
import Slider from "react-slick";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AOSRefresh } from "../utils/AOSRefresh";
import NextArrow from "../components/SliderArrows/NextArrow";
import PrevArrow from "../components/SliderArrows/PrevArrow";

const renderSlides = (products) => {
  return products.map((product, id) => {
    return (
      <div className="product-type-slide" key={product + id}>
        {product.image && product.image.length ? (
          <>
            <div className="product-slide-inner">
              <div className="bg-overlay">
                <LazyLoadImage
                  src={`${product.image[0]?.publicUrl ? product.image[0]?.publicUrl : `${process.env.NEXT_PUBLIC_API_URL}${product.image[0]?.properties?.originalUrl}`}`}
                  afterLoad={AOSRefresh}
                  alt="Product"
                />
              </div>
              {product.btnlink && (
                // <Link href={`${product.btnlink.href}`} className="product-slide-overlay d-xl-flex align-items-center justify-content-center">
                <Link
                  href={`${
                    new DOMParser().parseFromString(
                      product.btnlink.href,
                      "text/html"
                    ).documentElement.textContent
                  }`}
                  className="product-slide-overlay d-xl-flex align-items-center justify-content-center"
                >
                  {product.headline && (
                    <h4 className="d-block d-xl-none">{product.headline}</h4>
                  )}
                  <span className="img-in">
                    <img
                      src="/images/png/arrow-right-circle.svg"
                      alt="Arrow right"
                    />
                  </span>
                </Link>
              )}
            </div>
            {product.headline && (
              <h6 className="d-none d-xl-block text-center">
                {product.headline}
              </h6>
            )}
          </>
        ) : (
          ""
        )}
      </div>
    );
  });
};

const ProductTypes = ({ id, data }) => {
  var settings = {
    dots: false,
    controls: false,
    infinite: data.list.length >= 6 ? true : false,
    slidesToShow: 6,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 6000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section id={`c${id}`} className="product-types-section">
      <div className="container-lg">
        <div className="product-types-wrapper">
          {data.headline && <h1 data-aos="fade">{data.headline}</h1>}
          <div data-aos="fade-up" className="products-slider-wrapper">
            {data.list && data.list.length ? (
              <Slider {...settings}>{renderSlides(data.list)}</Slider>
            ) : (
              ""
            )}
          </div>
          {data.btnlink && data.btntext && (
            <div className="text-link" data-aos="fade-up">
              {/* <Link href={`${data.btnlink.href}`}> */}
              <Link
                href={`${
                  new DOMParser().parseFromString(
                    data.btnlink.href,
                    "text/html"
                  ).documentElement.textContent
                }`}
              >
                {data.btntext}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductTypes;
