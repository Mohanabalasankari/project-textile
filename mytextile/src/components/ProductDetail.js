import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const ProductDetail = () => {
  const location = useLocation();
  const { product } = location.state; // Get product data passed via navigate
  const [selectedSize, setSelectedSize] = useState('');
  const [showSizeChart, setShowSizeChart] = useState(false); // State to toggle size chart visibility

  const handleAddToCart = () => {
    const currentCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = [...currentCart, { ...product, size: selectedSize }];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert(`${product.name} has been added to your cart.`);
  };

  const toggleSizeChart = () => {
    setShowSizeChart(!showSizeChart);
  };

  return (
    <DetailContainer>
      <ImageSection>
        <ProductImage src={product.image} alt={product.name} />
      </ImageSection>
      <InfoSection>
        <ProductTitle>{product.name}</ProductTitle>
        <ProductPrice>₹{product.price}</ProductPrice>
        <ProductDescription>{product.description}</ProductDescription>

        <SizeChart>
          <p>Select Size:</p>
          <SizeOptions>
            {['S', 'M', 'L', 'XL'].map((size) => (
              <SizeButton
                key={size}
                selected={size === selectedSize}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </SizeButton>
            ))}
          </SizeOptions>
        </SizeChart>

        <ButtonSection>
          <SizeChartToggle onClick={toggleSizeChart}>
            {showSizeChart ? 'Hide Size Chart' : 'Show Size Chart'}
          </SizeChartToggle>

          {showSizeChart && (
            <SizeChartDetails>
              <SizeTable>
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Chest (inches)</th>
                    <th>Waist (inches)</th>
                    <th>Hips (inches)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>S</td>
                    <td>34-36</td>
                    <td>28-30</td>
                    <td>36-38</td>
                  </tr>
                  <tr>
                    <td>M</td>
                    <td>38-40</td>
                    <td>32-34</td>
                    <td>40-42</td>
                  </tr>
                  <tr>
                    <td>L</td>
                    <td>42-44</td>
                    <td>36-38</td>
                    <td>44-46</td>
                  </tr>
                  <tr>
                    <td>XL</td>
                    <td>46-48</td>
                    <td>40-42</td>
                    <td>48-50</td>
                  </tr>
                </tbody>
              </SizeTable>
            </SizeChartDetails>
          )}

          <AddToCartButton onClick={handleAddToCart} disabled={!selectedSize}>
            Add to Cart
          </AddToCartButton>
        </ButtonSection>
      </InfoSection>
    </DetailContainer>
  );
};

// Styled Components
const DetailContainer = styled.div`
  display: flex;
  padding: 40px;
  background-color: #f9f9f9; /* Light background for contrast */
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const ImageSection = styled.div`
  flex: 1;
  margin-right: 20px; /* Added margin between image and info */
`;

const ProductImage = styled.img`
  width: 100%;
  max-width: 600px;
  height: auto;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); /* Subtle shadow */
`;

const InfoSection = styled.div`
  flex: 1;
  padding: 20px;
  background-color: white; /* White background for the info section */
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow */
`;

const ProductTitle = styled.h2`
  font-size: 24px;
  margin: 0;
  color: #333; /* Darker text color for contrast */
`;

const ProductPrice = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #9b1c31; /* Primary color for price */
`;

const ProductDescription = styled.p`
  font-size: 16px;
  margin-top: 10px;
  color: #555; /* Slightly lighter text for description */
`;

const SizeChart = styled.div`
  margin-top: 20px;
`;

const SizeOptions = styled.div`
  display: flex;
  gap: 10px;
`;

const SizeButton = styled.button`
  padding: 10px 15px; /* Added padding for better touch targets */
  background-color: ${({ selected }) => (selected ? '#9b1c31' : '#ccc')};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease; /* Smooth background transition */

  &:hover {
    background-color: ${({ selected }) => (selected ? '#a1283a' : '#bbb')}; /* Darker on hover */
  }
`;

const ButtonSection = styled.div`
  display: flex;
  flex-direction: column; /* Stack buttons vertically */
  gap: 15px; /* Spacing between buttons */
  margin-top: 20px; /* Space above the button section */
`;

const SizeChartToggle = styled.button`
  padding: 10px;
  background-color: #9b1c31;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease; /* Smooth background transition */

  &:hover {
    background-color: #a1283a; /* Darker on hover */
  }
`;

const SizeChartDetails = styled.div`
  margin-top: 20px;
`;

const SizeTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 10px;
    border: 1px solid #ccc;
    text-align: center;
  }

  th {
    background-color: #9b1c31;
    color: white;
  }
`;

const AddToCartButton = styled.button`
  padding: 10px;
  background-color: #9b1c31;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease; /* Smooth background transition */

  &:hover {
    background-color: #a1283a; /* Darker on hover */
  }

  &:disabled {
    background-color: grey;
    cursor: not-allowed;
  }
`;

export default ProductDetail;
