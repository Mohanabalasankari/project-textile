import React, { useEffect, useState } from 'react';
import DropIn from 'braintree-web-drop-in-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CheckoutPage = () => {
  const [clientToken, setClientToken] = useState(null);
  const [instance, setInstance] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [cart, setCart] = useState([]);
  const [points, setPoints] = useState(0);
  const [pointsExpiry, setPointsExpiry] = useState(null);
  const [pointsToUse, setPointsToUse] = useState(0);
  const [showPointsExplanation, setShowPointsExplanation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);

    const storedPoints = localStorage.getItem('points') || 0;
    const storedExpiry = localStorage.getItem('pointsExpiry');

    // Check if points are still valid
    if (storedPoints && storedExpiry) {
      const expiryDate = new Date(storedExpiry);
      const currentDate = new Date();
      if (currentDate > expiryDate) {
        // Points have expired
        localStorage.removeItem('points');
        localStorage.removeItem('pointsExpiry');
        setPoints(0);
        setPointsExpiry(null);
      } else {
        // Points are still valid
        setPoints(parseInt(storedPoints, 10));
        setPointsExpiry(expiryDate);
      }
    }
  }, []);

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price) || 0; // Convert price to a float
      return total + price;
    }, 0);
  };

  const calculateFinalPrice = () => {
    const total = getTotalPrice();
    const discount = pointsToUse > points ? 0 : Math.floor(pointsToUse / 100); // Assuming 1 point = ₹1 discount
    return (total - discount).toFixed(2);
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get('http://localhost:8080/api/checkout/braintree/token');
      setClientToken(data?.clientToken);
    } catch (error) {
      console.error('Error fetching client token:', error);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  const handlePayment = async () => {
    if (!instance) return;

    try {
      setProcessing(true);
      const { nonce } = await instance.requestPaymentMethod();
      
      const { data } = await axios.post('http://localhost:8080/api/checkout/braintree/payment', {
        nonce,
        cart,
      });

      if (data.ok) {
        // Calculate points earned and update localStorage
        const earnedPoints = Math.floor(getTotalPrice() / 100); // 1 point per ₹100 spent
        const newTotalPoints = points + earnedPoints;
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 50); // Set expiry date to 50 days from now

        // Store updated points and expiry date in localStorage
        localStorage.setItem('points', newTotalPoints);
        localStorage.setItem('pointsExpiry', expiryDate.toISOString());

        localStorage.removeItem('cart');
        navigate('/profile');
      } else {
        console.error('Payment failed:', data.message);
      }
    } catch (err) {
      console.error('Error processing payment:', err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <CheckoutContainer>
      <CheckoutTitle>Checkout</CheckoutTitle>
      <CartSection>
        {cart.map((item, index) => (
          <CartItem key={index}>
            <span>{item.name}</span>
            <span>₹{item.price}</span>
          </CartItem>
        ))}
        <TotalPrice>Total: ₹{getTotalPrice().toFixed(2)}</TotalPrice>
        
        {/* Points Earned Section */}
        <PointsEarned>
          Points earned on this purchase: {Math.floor(getTotalPrice() / 100)} 
          {points > 0 && pointsExpiry && (
            <span style={{ marginLeft: '10px' }}>
              (Total Points: {points}, Expiry date: {pointsExpiry.toLocaleDateString()})
            </span>
          )}
        </PointsEarned>

        {/* Link to explain points system */}
        <PointsExplanationLink onClick={() => setShowPointsExplanation(!showPointsExplanation)}>
          {showPointsExplanation ? 'Hide Points System Explanation' : 'Explain Points System'}
        </PointsExplanationLink>

        {/* Points system explanation */}
        {showPointsExplanation && (
          <PointsExplanation>
            <h3>Points System Explanation</h3>
            <p>
              For every ₹100 spent, you earn 1 point. Each point can be redeemed for a discount of 1% on future purchases.
              Accumulate points to get better discounts on your next shopping spree!
              <br />
              <strong>Note:</strong> Your points expire 50 days after they are earned.
            </p>
          </PointsExplanation>
        )}
      </CartSection>

      {clientToken ? (
        <DropIn
          options={{ authorization: clientToken }}
          onInstance={(instance) => setInstance(instance)}
        />
      ) : (
        <LoadingMessage>Loading payment options...</LoadingMessage>
      )}

      <CheckoutButton disabled={!clientToken || processing} onClick={handlePayment}>
        {processing ? 'Processing...' : 'Proceed with Payment'}
      </CheckoutButton>
    </CheckoutContainer>
  );
};

// Styled Components
const CheckoutContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9; /* Light background for contrast */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
`;

const CheckoutTitle = styled.h1`
  font-size: 28px; /* Increased font size for prominence */
  color: #333; /* Dark text color */
  margin-bottom: 20px;
  text-align: center; /* Centered title */
`;

const CartSection = styled.div`
  margin-bottom: 20px;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  font-size: 16px; /* Increased font size */
`;

const TotalPrice = styled.h2`
  margin-top: 10px;
  color: #e67e22; /* Highlighted color for total price */
`;

const PointsEarned = styled.p`
  margin-top: 5px;
  font-weight: bold; /* Bold text for emphasis */
`;

const PointsExplanationLink = styled.button`
  margin-top: 10px;
  background: none;
  color: #007bff;
  border: none;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: #0056b3; /* Darker shade on hover */
  }
`;

const PointsExplanation = styled.div`
  margin-top: 10px;
  padding: 10px;
  background-color: #eef; /* Light background for explanation */
  border-radius: 4px; /* Rounded corners */
  border: 1px solid #007bff; /* Border color */
`;

const LoadingMessage = styled.p`
  text-align: center; /* Centered loading message */
  color: #999; /* Light gray for the loading text */
`;

const CheckoutButton = styled.button`
  background-color: #27ae60; /* Darker green */
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 4px; /* Rounded corners */
  width: 100%; /* Full width button */
  
  &:disabled {
    background-color: #ccc; /* Greyed out button when disabled */
    cursor: not-allowed; /* Cursor change on hover */
  }
`;

export default CheckoutPage;
