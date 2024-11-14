import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import videoSrc from '../components/herovideo/heroo.mp4';  // Replace with the actual video path

const HomePage1 = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/home'); // Replace with your actual route
  };

  return (
    <HeroSection>
      {/* Video Background */}
      <VideoBackground autoPlay muted loop>
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </VideoBackground>

      {/* Content Overlay */}
      <Overlay />

      <LeftSide>
        <Content>
          <NewArrivals>NEW ARRIVALS!</NewArrivals>
          <MainHeading>SAI GURU TEXTILES</MainHeading>
          <Subtext>THREADED WITH LOVE AND CARE.</Subtext>
          <ActionButton onClick={handleClick}>CLICK TO SEE THE COLLECTIONS</ActionButton>
        </Content>
      </LeftSide>
    </HeroSection>
  );
};

// Styled Components
const HeroSection = styled.section`
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Align items to the left */
  height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -1; /* Ensure video is in the background */
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3); /* Dark semi-transparent overlay */
  z-index: 1;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 2; /* Ensure text is above the overlay */
  padding-left: 50px; /* Adjust as needed to move the content left */
  max-width: 600px;
  height: 100vh;
`;

const Content = styled.div`
  max-width: 500px;
`;

const NewArrivals = styled.p`
  font-size: 18px;
  color: #9b1c31;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const MainHeading = styled.h1`
  font-size: 40px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 20px;
font-family: 'Anton', sans-serif;

`;

const Subtext = styled.p`
  font-size: 18px;
  color: #ffffff;
  margin-bottom: 40px;
`;

const ActionButton = styled.button`
  padding: 14px 28px;
  background-color: #9b1c31;
  color: #333333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export default HomePage1;
