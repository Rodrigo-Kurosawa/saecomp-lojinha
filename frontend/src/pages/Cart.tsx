import React from 'react';
import NavBar from '../components/NavBar';
import Cart from '../components/Cart';
import Footer from '../components/Footer';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
`;

const CartPage: React.FC = () => {
  return (
    <Container>
      <NavBar />
      <div style={{ paddingTop: '80px' }}>
        <Cart />
      </div>
      <Footer />
    </Container>
  );
};

export default CartPage;
