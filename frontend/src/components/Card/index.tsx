import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'gradient';
  padding?: 'small' | 'medium' | 'large';
  hover?: boolean;
  className?: string;
  onClick?: () => void;
}

const StyledCard = styled(motion.div)<{
  variant: string;
  padding: string;
  hover: boolean;
  clickable: boolean;
}>`
  border-radius: 16px;
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;
  
  ${({ padding }) => {
    switch (padding) {
      case 'small':
        return 'padding: 1rem;';
      case 'large':
        return 'padding: 2rem;';
      default:
        return 'padding: 1.5rem;';
    }
  }}
  
  ${({ variant }) => {
    switch (variant) {
      case 'glass':
        return `
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        `;
      case 'gradient':
        return `
          background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
          border: 1px solid #333;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        `;
      default:
        return `
          background: white;
          border: 1px solid #e5e7eb;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        `;
    }
  }}
  
  ${({ hover, clickable }) => hover && `
    cursor: ${clickable ? 'pointer' : 'default'};
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 25px rgba(76, 175, 80, 0.15);
      border-color: #4CAF50;
    }
  `}
`;

const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'medium',
  hover = true,
  className,
  onClick,
}) => {
  return (
    <StyledCard
      variant={variant}
      padding={padding}
      hover={hover}
      clickable={!!onClick}
      className={className}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { y: -4 } : undefined}
    >
      {children}
    </StyledCard>
  );
};

export default Card;
