import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

const StyledButton = styled(motion.button)<{
  variant: string;
  size: string;
  disabled: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  white-space: nowrap;
  user-select: none;
  
  ${({ size }) => {
    switch (size) {
      case 'small':
        return `
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          min-height: 36px;
        `;
      case 'large':
        return `
          padding: 1rem 2rem;
          font-size: 1.125rem;
          min-height: 56px;
        `;
      default:
        return `
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          min-height: 48px;
        `;
    }
  }}
  
  ${({ variant }) => {
    switch (variant) {
      case 'secondary':
        return `
          background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
          color: white;
          
          &:hover:not(:disabled) {
            background: linear-gradient(135deg, #4b5563 0%, #374151 100%);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(107, 114, 128, 0.3);
          }
        `;
      case 'outline':
        return `
          background: transparent;
          color: #4CAF50;
          border: 2px solid #4CAF50;
          
          &:hover:not(:disabled) {
            background: #4CAF50;
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(76, 175, 80, 0.3);
          }
        `;
      default:
        return `
          background: linear-gradient(135deg, #4CAF50 0%, #03B04B 100%);
          color: white;
          
          &:hover:not(:disabled) {
            background: linear-gradient(135deg, #03B04B 0%, #238d41 100%);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(76, 175, 80, 0.4);
          }
        `;
    }
  }}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }
  
  &:active:not(:disabled) {
    transform: translateY(0px);
  }
`;

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
  type = 'button',
  className,
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={className}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
