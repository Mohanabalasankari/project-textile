import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductsSection>
      <h2>Featured Products</h2>
      <ProductsContainer>
        {products.map((product) => (
          <ProductCard key={product._id}>
            <ProductImage src={product.image} alt={product.name} />
            <ProductInfo>
              <h3>{product.name}</h3>
              <p>${product.price}</p>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductsContainer>
    </ProductsSection>
  );
};

const ProductsSection = styled.section`
  padding: 40px;
  text-align: center;
`;

const ProductsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const ProductCard = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 15px;
  text-align: center;
  width: 200px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 10px;
`;

export default FeaturedProducts;
