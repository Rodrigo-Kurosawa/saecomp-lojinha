import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import styled from 'styled-components';

const StyledBurger = styled.div<{ open: boolean }>`
  width: 2rem;
  height: 2rem;
  position: relative;
  display: none;
  cursor: pointer;
  z-index: 10;
  
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }
  
  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ open }) => open ? '#4CAF50' : '#fff'};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    
    &:nth-child(1) {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }
    
    &:nth-child(2) {
      transform: ${({ open }) => open ? 'translateX(100%)' : 'translateX(0)'};
      opacity: ${({ open }) => open ? 0 : 1};
    }
    
    &:nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`;

const StyledMenu = styled.nav<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 300px;
  padding-top: 3.5rem;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
  z-index: 5;
  
  a {
    font-size: 1.2rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: white;
    text-decoration: none;
    transition: color 0.3s linear;
    text-align: center;
    
    &:hover {
      color: #4CAF50;
    }
  }
  
  .cart-link {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    
    .cart-count {
      background: #4CAF50;
      color: white;
      border-radius: 50%;
      width: 25px;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.9rem;
      font-weight: bold;
    }
  }
`;

const Burger = () => {
  const [open, setOpen] = useState(false);
  const { state } = useCart();
  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </StyledBurger>
      <StyledMenu open={open}>
        <Link to="/" onClick={() => setOpen(false)}>
          Home
        </Link>
        <Link to="/cart" onClick={() => setOpen(false)} className="cart-link">
          Carrinho
          {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
        </Link>
      </StyledMenu>
    </>
  );
};

export default Burger;
