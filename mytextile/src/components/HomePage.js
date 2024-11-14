import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HomePage = () => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [otherDresses, setOtherDresses] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');

  // Fetch featured products and other dresses from localStorage on component mount
  useEffect(() => {
    const storedFeaturedProducts = JSON.parse(localStorage.getItem('featuredProducts')) || [];
    setFeaturedProducts(storedFeaturedProducts);

    const storedOtherDresses = JSON.parse(localStorage.getItem('dresses')) || [];
    setOtherDresses(storedOtherDresses);
  }, []);

  // Automatically cycle through carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [currentIndex]);

  // Handle next slide in carousel
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === featuredProducts.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Navigate to the product detail page when a product image is clicked
  const handleImageClick = (dress) => {
    navigate('/product-detail', { state: { product: dress } });
  };

  // Filter dresses based on selected price range
  const filteredDresses = otherDresses.filter((dress) => {
    switch (selectedPriceRange) {
      case 'below500':
        return dress.price < 500;
      case '500-1000':
        return dress.price >= 500 && dress.price <= 1000;
      case 'above1000':
        return dress.price > 1000;
      default:
        return true;
    }
  });

  return (
    <div>
      {/* Full-width featured products carousel */}
      <CarouselContainer>
        <CarouselWrapper>
          <CarouselSlides style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {featuredProducts.map((product, index) => (
              <CarouselCard key={index} onClick={() => handleImageClick(product)}>
                <ProductImage src={product.image} alt={product.name} />
              </CarouselCard>
            ))}
          </CarouselSlides>
        </CarouselWrapper>
      </CarouselContainer>

      <h2><center>See Other Exciting Dresses!!!!</center></h2>

      {/* Price filter */}
      <FilterContainer>
        <FilterLabel>Filter by Price:</FilterLabel>
        <PriceSelect value={selectedPriceRange} onChange={(e) => setSelectedPriceRange(e.target.value)}>
          <option value="All">All</option>
          <option value="below500">Below ₹500</option>
          <option value="500-1000">₹500 - ₹1000</option>
          <option value="above1000">Above ₹1000</option>
        </PriceSelect>
      </FilterContainer>

      {/* Section for other dresses */}
      <ProductSection>
        {filteredDresses.length > 0 ? (
          filteredDresses.map((dress, index) => (
            <Card key={index}>
              <CardImage src={dress.image} alt={dress.name} onClick={() => handleImageClick(dress)} />
              <CardInfo>
                <CardTitle>{dress.name}</CardTitle>
                <CardDescription>{dress.description}</CardDescription>
                <CardPrice>₹{dress.price}</CardPrice>
              </CardInfo>
            </Card>
          ))
        ) : (
          <p>No dresses available in this price range.</p>
        )}
      </ProductSection>
    </div>
  );
};

// Styled Components

const CarouselContainer = styled.div`
  width: 100%;
  height: 80vh; /* Take up 80% of the viewport height */
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CarouselWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

const CarouselSlides = styled.div`
  display: flex;
  width: 100%;
  transition: transform 0.5s ease-in-out;
`;

const CarouselCard = styled.div`
  min-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
`;

const FilterContainer = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FilterLabel = styled.label`
  margin-right: 10px;
  font-size: 18px;
`;

const PriceSelect = styled.select`
  padding: 10px;
  font-size: 16px;
`;

const ProductSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const Card = styled.div`
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CardImage = styled.img`
  width: 100%;
  height: 350px;
  object-fit: cover;
  cursor: pointer;
`;

const CardInfo = styled.div`
  padding: 10px 0;
`;

const CardTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
`;

const CardDescription = styled.p`
  font-size: 16px;
  color: #555;
`;

const CardPrice = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #9b1c31;
`;

export default HomePage;
