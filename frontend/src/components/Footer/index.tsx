import React from "react";
import styled from "styled-components";
import { FaTwitter, FaFacebook, FaInstagram, FaShoppingCart } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #1a1a1a 0%, #000000 100%);
  color: white;
  padding: 3rem 2rem 2rem;
  text-align: center;
  border-top: 1px solid #333;
  margin-top: 4rem;

  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    background: linear-gradient(45deg, #4CAF50, #03B04B);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  h2 {
    font-size: 1.2rem;
    font-weight: 400;
    margin-bottom: 2rem;
    color: #ccc;
  }

  .social-links {
    display: flex;
    justify-content: center;
    gap: 2rem;
    margin-bottom: 2rem;

    a {
      color: #ccc;
      font-size: 1.5rem;
      transition: all 0.3s ease;

      &:hover {
        color: #4CAF50;
        transform: translateY(-3px);
      }
    }
  }

  .copyright {
    font-size: 0.9rem;
    color: #666;
    padding-top: 1rem;
    border-top: 1px solid #333;
  }
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <h1><FaShoppingCart style={{ marginRight: '0.5rem' }} />Lojinha SAEcomp</h1>
      <h2>Engenharia de Computação - USP São Carlos</h2>
      
      <div className="social-links">
        <a href="https://www.facebook.com/saecomp" target="_blank" rel="noopener noreferrer">
          <FaFacebook />
        </a>
        <a href="https://twitter.com/saecompusp?s=20" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a href="https://www.instagram.com/saecomp.ec" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
      </div>

      <div className="copyright">
        © 2025 SAEcomp - Todos os direitos reservados
      </div>
    </FooterContainer>
  );
};

export default Footer;
