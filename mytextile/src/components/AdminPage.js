import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const AdminPage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [otherDresses, setOtherDresses] = useState([]);
  const [featuredProductName, setFeaturedProductName] = useState('');
  const [featuredProductImage, setFeaturedProductImage] = useState(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState('');
  const [dressName, setDressName] = useState('');
  const [dressDescription, setDressDescription] = useState('');
  const [dressPrice, setDressPrice] = useState('');
  const [dressImage, setDressImage] = useState(null);
  const [dressImagePreview, setDressImagePreview] = useState('');

  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    if (loggedIn) {
      setIsLoggedIn(true);
      const savedFeaturedProducts = JSON.parse(localStorage.getItem('featuredProducts')) || [];
      setFeaturedProducts(savedFeaturedProducts);
      const savedOtherDresses = JSON.parse(localStorage.getItem('dresses')) || [];
      setOtherDresses(savedOtherDresses);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    navigate('/login');
  };

  const handleFeaturedProductFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setFeaturedImagePreview(fileUrl);
      setFeaturedProductImage(file);
    }
  };

  const handleAddFeaturedProduct = () => {
    if (featuredProductName && featuredProductImage) {
      const newProduct = { name: featuredProductName, image: featuredImagePreview };
      const updatedFeaturedProducts = [...featuredProducts, newProduct];
      setFeaturedProducts(updatedFeaturedProducts);
      localStorage.setItem('featuredProducts', JSON.stringify(updatedFeaturedProducts));
      setFeaturedProductName('');
      setFeaturedProductImage(null);
      setFeaturedImagePreview('');
    }
  };

  const handleDressFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setDressImagePreview(fileUrl);
      setDressImage(file);
    }
  };

  const handleAddDress = () => {
    if (dressName && dressDescription && dressPrice && dressImage) {
      const newDress = { name: dressName, description: dressDescription, price: dressPrice, image: dressImagePreview };
      const updatedDresses = [...otherDresses, newDress];
      setOtherDresses(updatedDresses);
      localStorage.setItem('dresses', JSON.stringify(updatedDresses));
      setDressName('');
      setDressDescription('');
      setDressPrice('');
      setDressImage(null);
      setDressImagePreview('');
    }
  };

  const handleRemoveFeaturedProduct = (index) => {
    const updatedFeaturedProducts = featuredProducts.filter((_, i) => i !== index);
    setFeaturedProducts(updatedFeaturedProducts);
    localStorage.setItem('featuredProducts', JSON.stringify(updatedFeaturedProducts));
  };

  const handleRemoveDress = (index) => {
    const updatedDresses = otherDresses.filter((_, i) => i !== index);
    setOtherDresses(updatedDresses);
    localStorage.setItem('dresses', JSON.stringify(updatedDresses));
  };

  return isLoggedIn ? (
    <AdminSection>
      <Header>
        <h2>Admin Dashboard</h2>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Header>

      <SectionTitle>Add New Featured Product</SectionTitle>
      <FormSection>
        <Form>
          <Input
            type="text"
            placeholder="Product Name"
            value={featuredProductName}
            onChange={(e) => setFeaturedProductName(e.target.value)}
          />
          <FileInput
            type="file"
            accept="image/*"
            onChange={handleFeaturedProductFileChange}
          />
          {featuredImagePreview && <ImagePreview src={featuredImagePreview} alt="Preview" />}
          <Button onClick={handleAddFeaturedProduct}>Add Featured Product</Button>
        </Form>
        <ProductList>
          {featuredProducts.map((product, index) => (
            <ProductCard key={index}>
              <ProductImage src={product.image} alt={product.name} />
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <RemoveButton onClick={() => handleRemoveFeaturedProduct(index)}>Remove</RemoveButton>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductList>
      </FormSection>

      <SectionTitle>Add New Dress</SectionTitle>
      <FormSection>
        <Form>
          <Input
            type="text"
            placeholder="Dress Name"
            value={dressName}
            onChange={(e) => setDressName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Dress Description"
            value={dressDescription}
            onChange={(e) => setDressDescription(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Dress Price"
            value={dressPrice}
            onChange={(e) => setDressPrice(e.target.value)}
          />
          <FileInput
            type="file"
            accept="image/*"
            onChange={handleDressFileChange}
          />
          {dressImagePreview && <ImagePreview src={dressImagePreview} alt="Preview" />}
          <Button onClick={handleAddDress}>Add Dress</Button>
        </Form>
        <ProductList>
          {otherDresses.map((dress, index) => (
            <ProductCard key={index}>
              <ProductImage src={dress.image} alt={dress.name} />
              <ProductInfo>
                <ProductName>{dress.name}</ProductName>
                <ProductDescription>{dress.description}</ProductDescription>
                <ProductPrice>₹{dress.price}</ProductPrice>
                <RemoveButton onClick={() => handleRemoveDress(index)}>Remove</RemoveButton>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductList>
      </FormSection>
    </AdminSection>
  ) : null;
};

// Styled Components
const AdminSection = styled.section`
  padding: 40px;
  background-color: #f0f2f5;
  min-height: 100vh;
  color: #333;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const LogoutButton = styled.button`
  padding: 12px 20px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, transform 0.2s;
  &:hover {
    background-color: #c82333;
    transform: scale(1.05);
  }
`;

const SectionTitle = styled.h3`
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
  color: #007bff;
`;

const FormSection = styled.section`
  margin-bottom: 40px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

const Input = styled.input`
  padding: 12px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
`;

const FileInput = styled.input`
  margin-bottom: 15px;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
`;

const Button = styled.button`
  padding: 12px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, transform 0.2s;
  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }
`;

const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const ProductCard = styled.div`
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

const ProductImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 15px;
`;

const ProductName = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ProductDescription = styled.p`
  font-size: 14px;
  color: #555;
  margin-bottom: 10px;
`;

const ProductPrice = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 10px;
`;

const RemoveButton = styled.button`
  padding: 6px 12px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s, transform 0.2s;
  &:hover {
    background-color: #c82333;
    transform: scale(1.05);
  }
`;

export default AdminPage;                                                                                                                            