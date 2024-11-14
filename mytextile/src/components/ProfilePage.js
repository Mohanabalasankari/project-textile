import React from 'react';
import styled from 'styled-components';
import dressImage1 from './Purple Pure Cotton Anarkali Set online in USA _ Free Shipping , Easy Returns - Fledgling Wings.jpeg'; // Example image from your PC

const ProfilePage = () => {
  // Hardcoded points and expiry date
  const points = 9;
  const expiryDate = '2024-12-09'; // ISO date format

  return (
    <ProfileContainer>
      <Title>Your Profile</Title>
      <PointsSection>
        <PointsDisplay>You have earned: {points} points</PointsDisplay>
        <ExpiryDisplay>Points expire on: {new Date(expiryDate).toLocaleDateString()}</ExpiryDisplay> {/* Format expiry date */}
      </PointsSection>
      <SubTitle>Your Purchased Dresses</SubTitle>
      {/* Static list of dresses */}
      <DressCard>
        <DressImage src={dressImage1} alt="Dress 1" />
        <DressDetails>
          <DressName>GoSriki</DressName>
          <DressPrice>₹900</DressPrice>
        </DressDetails>
      </DressCard>
      
      <LogoutButton>Logout</LogoutButton>
    </ProfileContainer>
  );
};

// Styled Components
const ProfileContainer = styled.div`
  padding: 40px 20px;
  max-width: 1000px;
  margin: 0 auto;
  background-color: #f4f4f9;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 32px;
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

const SubTitle = styled.h3`
  font-size: 24px;
  color: #555;
  margin-bottom: 20px;
`;

const PointsSection = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const PointsDisplay = styled.p`
  font-size: 20px;
  color: #007bff;
`;

const ExpiryDisplay = styled.p`
  font-size: 16px;
  color: #ff4d4d;
`;

const DressCard = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
`;

const DressImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 10px;
`;

const DressDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  flex-grow: 1;
  padding-left: 20px;
`;

const DressName = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
  color: #333;
`;

const DressPrice = styled.p`
  font-size: 18px;
  color: #777;
  margin-bottom: 10px;
`;

const LogoutButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #ff4d4d;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #d43f3f;
  }
`;

export default ProfilePage;
