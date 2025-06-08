import React from 'react';
import styled from 'styled-components';
import { FaCaretDown, FaShoppingCart } from 'react-icons/fa';
import Button from '../Button';

const HeaderContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #03B04B 100%);
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 20% 80%, rgba(3, 176, 75, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(76, 175, 80, 0.3) 0%, transparent 50%);
    z-index: 1;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  max-width: 1200px;
  padding: 0 20px;
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
  
  span {
    background: linear-gradient(45deg, #4CAF50, #03B04B);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-shadow: none;
    filter: drop-shadow(0px 0px 20px rgba(76, 175, 80, 0.5));
  }
`;

const Subtitle = styled.p`
  font-size: clamp(1.1rem, 2.5vw, 1.5rem);
  margin-bottom: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  opacity: 0.9;
`;

const ArrowDiv = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  
  a {
    color: white;
    font-size: 2rem;
    animation: bounce 2s infinite;
    display: block;
    
    &:hover {
      color: #4CAF50;
    }
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
`;

interface HeroProps {
  title: string;
  subtitle: string;
  showCTA?: boolean;
  onCTAClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ 
  title, 
  subtitle, 
  showCTA = true, 
  onCTAClick 
}) => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <HeaderContainer>
      <ContentWrapper>
        <Title dangerouslySetInnerHTML={{ __html: title }} />
        <Subtitle>{subtitle}</Subtitle>
        {showCTA && (
          <Button onClick={onCTAClick} size="large">
            <FaShoppingCart style={{ marginRight: '0.5rem' }} />
            Explorar Produtos
          </Button>
        )}
      </ContentWrapper>
      <ArrowDiv>
        <a href="#" onClick={(e) => { e.preventDefault(); scrollToContent(); }}>
          <FaCaretDown />
        </a>
      </ArrowDiv>
    </HeaderContainer>
  );
};

export default Hero;
