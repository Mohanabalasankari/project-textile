import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; 2024 Textile Haven. All Rights Reserved.</p>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  background-color: #333;
  color: white;
  text-align: center;
  padding: 10px 0;
  margin-top: 20px;
`;

export default Footer;
