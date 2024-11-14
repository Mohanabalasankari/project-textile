import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ShopByCategory = () => {
  const [categories, setCategories] = useState([]);

  // Fetch categories from localStorage
  useEffect(() => {
    const savedCategories = JSON.parse(localStorage.getItem('categories')) || [];
    setCategories(savedCategories);
  }, []);

  return (
    <CategorySection>
      <h2>Shop by Category</h2>
      <CategoryList>
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <CategoryCard key={index}>
              <CategoryImage src={category.image} alt={category.name} />
              <CategoryName>{category.name}</CategoryName>
            </CategoryCard>
          ))
        ) : (
          <p>No categories available.</p>
        )}
      </CategoryList>
    </CategorySection>
  );
};

// Styled components for layout and design
const CategorySection = styled.section`
  padding: 40px;
  background-color: #f9f9f9;
`;

const CategoryList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const CategoryCard = styled.div`
  width: 200px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
`;

const CategoryImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
`;

const CategoryName = styled.h4`
  padding: 10px 0;
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

export default ShopByCategory;
