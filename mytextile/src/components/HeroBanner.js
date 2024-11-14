import React from 'react';
import styled from 'styled-components';

const HeroBanner = () => {
  return (
    <Banner>
      <BannerContent>
        <h1>Welcome to Textile Haven</h1>
        <p>Discover the finest fabrics and clothing for every occasion</p>
        <Button>Shop Now</Button>
      </BannerContent>
    </Banner>
  );
};

const Banner = styled.section`
  background-image: url('https://example.com/hero-banner.jpg'); /* Replace with your image */
  background-size: cover;
  background-position: center;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BannerContent = styled.div`
  color: white;
  text-align: center;
`;

const Button = styled.button`
  background-color: #ff6347;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 20px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #ff4500;
  }
`;

export default HeroBanner;
