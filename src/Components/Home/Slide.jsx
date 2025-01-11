import React from "react";
import "./Slide.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Divider } from "@mui/material";
import { useHistory } from "react-router-dom";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Slide = ({ title, products }) => {
  const history = useHistory();

  const handleProductClick = (productId) => {
    history.push(`/getproductsone/${productId}`);
  };

  return (
    <div className="products_section">
      <div className="products_deal">
        <h3>{title}</h3>
        <button className="view_btn">View All</button>
      </div>
      <Divider />

      <Carousel
        responsive={responsive}
        infinite={true}
        draggable={false}
        swipeable={true}
        centerMode={true}
        autoPlay={true}
        autoPlaySpeed={4000}
        keyBoardControl={true}
        showDots={false}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        containerClass="carousel-container"
      >
        {products.map((product) => {
          return (
            <div
              key={product.id}
              className="products_items"
              onClick={() => handleProductClick(product.id)}
            >
              <div className="product_img">
                <img src={product.url} alt="product" />
              </div>
              <p className="products_name">{product.title.shortTitle}</p>
              <p className="products_offer" style={{ color: "#007185" }}>
                {product.discount}
              </p>
              <p className="products_explore">{product.tagline}</p>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Slide;
