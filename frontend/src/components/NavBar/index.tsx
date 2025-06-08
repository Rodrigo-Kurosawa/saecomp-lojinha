import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useCart } from '../../hooks/useCart';
import Burger from './Burger';

const Nav = styled.nav<{scrollY: number}>`
  position: fixed;
  font-family: 'Inter', sans-serif;
  top: 0;
  background-color: ${({ scrollY }) => ( 
    (scrollY > 100) ? "rgba(0,0,0,0.9)" : "rgba(0,0,0,0.7)"
  )};
  backdrop-filter: blur(10px);
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, 
              rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, 
              rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  transition: background-color 0.3s ease-in-out;
  z-index: 100;
  width: 100%;
  height: 80px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .logo {
    padding: 15px 0;
    font-size: 1.5rem;
    font-weight: 700;
    color: white;
    text-decoration: none;
    
    span {
      color: #4CAF50;
    }
  }
  
  .nav-links {
    display: flex;
    align-items: center;
    gap: 2rem;
    
    a {
      text-decoration: none;
      color: white;
      font-weight: 500;
      transition: all 0.3s ease;
      
      &:hover {
        color: #4CAF50;
        text-shadow: 0px 0px 25px rgba(76, 175, 80, 0.3);
      }
    }
    
    .cart-link {
      position: relative;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      
      .cart-count {
        background: #4CAF50;
        color: white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
        font-weight: bold;
      }
    }
  }
  
  @media (max-width: 768px) {
    .nav-links {
      display: none;
    }
  }
`;

const LogoDiv = styled.div`
  a {
    text-decoration: none;
    color: white;
    font-size: 1.5rem;
    font-weight: 700;
    
    span {
      color: #4CAF50;
    }
  }
`;

const NavBar = () => {
  const [scrollY, setScrollY] = useState(0);
  const { state } = useCart();
  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);

  function handleScroll() {
    setScrollY(window.pageYOffset);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Nav scrollY={scrollY}>
      <LogoDiv>
        <Link to="/">
          SAE<span>COMP</span> Lojinha
        </Link>
      </LogoDiv>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cart" className="cart-link">
          Carrinho
          {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
        </Link>
      </div>
      <Burger />
    </Nav>
  );
};

export default NavBar;
