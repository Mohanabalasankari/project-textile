import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Size Chart Component
const SizeChart = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <ModalBackground onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>Size Chart</h2>
        <Table>
          <thead>
            <tr>
              <th>Size</th>
              <th>Chest (inches)</th>
              <th>Waist (inches)</th>
              <th>Hip (inches)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>XS</td>
              <td>30-32</td>
              <td>24-26</td>
              <td>32-34</td>
            </tr>
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
        </Table>
        <CloseButton onClick={onClose}>Close</CloseButton>
      </ModalContent>
    </ModalBackground>
  );
};

// Styled Components for Size Chart
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 600px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }

  th {
    background-color: #f2f2f2;
  }
`;

const CloseButton = styled.button`
  margin-top: 20px;
  background-color: red;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
`;

// Cart Page Component
const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]); // State to manage selected sizes
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false); // State for size chart modal
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cart items from localStorage
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
    setSelectedSizes(storedCart.map(() => '')); // Initialize sizes for each cart item
  }, []);

  // Function to handle size selection
  const handleSizeChange = (index, size) => {
    const updatedSizes = [...selectedSizes];
    updatedSizes[index] = size;
    setSelectedSizes(updatedSizes);
  };

  // Function to remove item from cart
  const handleRemove = (index) => {
    const updatedCart = cartItems.filter((item, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    const updatedSizes = selectedSizes.filter((_, i) => i !== index);
    setSelectedSizes(updatedSizes);
  };

  // Navigate to the checkout page
  const handleCheckout = () => {
    navigate('/checkout'); // Redirect to CheckoutPage
  };

  return (
    <CartContainer>
      <CartTitle>Your Shopping Cart</CartTitle>
      {cartItems.length === 0 ? (
        <EmptyCartMessage>Your cart is empty.</EmptyCartMessage>
      ) : (
        cartItems.map((item, index) => (
          <CartItem key={index}>
            <ItemImage src={item.image} alt={item.name} />
            <ItemDetails>
              <ItemName>{item.name}</ItemName>
              <ItemPrice>₹{item.price}</ItemPrice>
              <SizeSelector
                value={selectedSizes[index]}
                onChange={(e) => handleSizeChange(index, e.target.value)}
              >
                <option value="">Select Size</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </SizeSelector>
              <RemoveButton onClick={() => handleRemove(index)}>Remove</RemoveButton>
            </ItemDetails>
          </CartItem>
        ))
      )}
      {cartItems.length > 0 && (
        <TotalContainer>
          <CheckoutButton onClick={handleCheckout}>Proceed to Checkout</CheckoutButton>
          <SizeChartButton onClick={() => setIsSizeChartOpen(true)}>View Size Chart</SizeChartButton>
        </TotalContainer>
      )}
      {/* Size Chart Modal */}
      <SizeChart isOpen={isSizeChartOpen} onClose={() => setIsSizeChartOpen(false)} />
    </CartContainer>
  );
};

// Styled Components

const CartContainer = styled.div`
  padding: 40px 20px;
  max-width: 1000px;
  margin: 0 auto;
  background-color: #f4f4f9;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const CartTitle = styled.h2`
  font-size: 32px;
  text-align: center;
  color: #333;
  margin-bottom: 30px;
`;

const EmptyCartMessage = styled.p`
  font-size: 18px;
  text-align: center;
  color: #555;
  margin-top: 50px;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.05);
`;

const ItemImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 10px;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  flex-grow: 1;
  padding-left: 20px;
`;

const ItemName = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
  color: #333;
`;

const ItemPrice = styled.p`
  font-size: 18px;
  color: #777;
  margin-bottom: 10px;
`;

const SizeSelector = styled.select`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;

const RemoveButton = styled.button`
  padding: 8px 15px;
  background-color: #ff4d4d;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: #d43f3f;
  }
`;

const TotalContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 40px;
`;

const CheckoutButton = styled.button`
  padding: 15px 30px;
  background-color: #1a73e8;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: #1669c1;
  }
`;

const SizeChartButton = styled.button`
  padding: 10px 20px;
  background-color: #6c757d;
  color: #fff;
  border: none;
  border-radius: 5px;
  margin-left: 20px;
  cursor: pointer;
  font-size: 16px;
  &:hover {
    background-color: #5a6268;
  }
`;

export default CartPage;
