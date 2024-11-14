import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dresses, setDresses] = useState([]);
  const [filteredDresses, setFilteredDresses] = useState([]);

  useEffect(() => {
    // Fetch dresses from localStorage
    const savedDresses = JSON.parse(localStorage.getItem('dresses')) || [];
    setDresses(savedDresses);
  }, []);

  useEffect(() => {
    // Filter dresses based on search term
    const filtered = dresses.filter((dress) =>
      dress.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDresses(filtered);
  }, [searchTerm, dresses]);

  return (
    <SearchSection>
      <SearchInput
        type="text"
        placeholder="Search for dresses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <DressesList>
        {filteredDresses.map((dress, index) => (
          <DressCard key={index}>
            <DressImage src={dress.image} alt={dress.name} />
            <DressInfo>
              <DressName>{dress.name}</DressName>
              <DressDescription>{dress.description}</DressDescription>
              <DressPrice>₹{dress.price}</DressPrice>
            </DressInfo>
          </DressCard>
        ))}
      </DressesList>
    </SearchSection>
  );
};

// Styled components for the search page
const SearchSection = styled.section`
  padding: 40px;
  background-color: #f0f2f5;
  min-height: 100vh;
  color: #333;
`;

const SearchInput = styled.input`
  padding: 12px;
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
`;

const DressesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const DressCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 250px;
  text-align: center;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.02);
  }
`;

const DressImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const DressInfo = styled.div`
  padding: 15px;
`;

const DressName = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const DressDescription = styled.p`
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
`;

const DressPrice = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 10px;
`;

export default SearchPage;
