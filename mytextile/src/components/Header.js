import React from 'react';
import { FaSearch, FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token'); // Check if the user is logged in

  // Navigation Handlers
  const handleSearchClick = () => navigate('/search');
  const handleCartClick = () => navigate('/cart');
  
  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate('/profile'); // Go to the profile page to show purchased dresses and logout button
    } else {
      navigate('/login'); // Go to login page if not authenticated
    }
  };

  return (
    <NavBar>
      <Logo>
        <Link to="/">Sai Guru Textile</Link>
      </Logo>
      <NavIcons>
        <IconContainer onClick={handleSearchClick}>
          <FaSearch size={24} />
        </IconContainer>
        <IconContainer onClick={handleCartClick}>
          <FaShoppingCart size={24} />
        </IconContainer>
        <IconContainer onClick={handleProfileClick}>
          <FaUserCircle size={24} />
        </IconContainer>
      </NavIcons>
    </NavBar>
  );
};

// Styled Components
const NavBar = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #9b1c31;
  color: white;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;

  a {
    color: white;
    text-decoration: none;
  }
`;

const NavIcons = styled.div`
  display: flex;
  gap: 20px;
`;

const IconContainer = styled.div`
  cursor: pointer;
`;

export default Header;
