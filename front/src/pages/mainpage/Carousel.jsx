import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { MOBILE_BREAK_POINT } from "../../components/layout/breakpoint";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    // centerMode: true,
    autoplay:true,
    autoplaySpeed: 1500,
    rtl: false,
    // arrows: false,
  };

  return (
    <div>
      <StyledSlider {...settings}>
        <ImageContainer>
          <Link to="/ai">
            <Image src="/ai.webp" />
          </Link>
        </ImageContainer>
        <ImageContainer>
          <Image src="/002.png" />
        </ImageContainer>
        <ImageContainer>
          <Link to="/todayknock"> 
            <Image src="/todayknock.webp" />
          </Link>
        </ImageContainer>
        <ImageContainer>
          <Image src="/001.png" />
        </ImageContainer>
        <ImageContainer>
          <Link to="/play">
            <Image src="/hihi.webp" />
          </Link> 
        </ImageContainer> 
        <ImageContainer>
          <Image src="/004.png" />
        </ImageContainer>
      </StyledSlider>
    </div>
  );
}

const StyledSlider = styled(Slider)`
  height: 100%;
  width: 100%;
  margin: 0px 0 60px 0;
  position: relative;

  .slick-dots li button::before {
    color: #f48fb1;
  }
  .slick-slide {
    margin: 30px 0 30px 0;
  }
  .slick-prev::before,
  .slick-next::before {
    font-size: 20px;
    color: #f48fb1;
    // display: none;
  }
  @media (max-width: ${MOBILE_BREAK_POINT}) {
    .slick-prev::before,
    .slick-next::before {
      display: none;
    }
  }
`;

const ImageContainer = styled.div`
  display: flex;
  margin-left: 1.6rem;
  margin-right: 0.3rem;
  padding-left: 2.5rem;
  z-index: -10;
  justify-content: center;
`;

const Image = styled.img`
  border-radius: 20px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.15);
  width: 18rem;
  height: 25rem;
  max-width: 100%;
  max-height: 100%;
  // background-color: #f7f6f0;
  z-index: -10;

  @media (max-width: ${MOBILE_BREAK_POINT}) {
    width: 9rem;
    height: 12rem;
  }
`;

export default Carousel;
