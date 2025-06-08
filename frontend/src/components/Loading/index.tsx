import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const LoadingContainer = styled.div<{ size?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  gap: 1rem;
  
  ${({ size }) => {
    switch (size) {
      case 'small':
        return 'padding: 1rem;';
      case 'large':
        return 'padding: 4rem; min-height: 400px;';
      default:
        return 'padding: 2rem; min-height: 200px;';
    }
  }}
`;

const Spinner = styled.div<{ size?: string; color?: string }>`
  border: 3px solid transparent;
  border-top: 3px solid ${({ color }) => color || '#4CAF50'};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  
  ${({ size }) => {
    switch (size) {
      case 'small':
        return 'width: 24px; height: 24px; border-width: 2px;';
      case 'large':
        return 'width: 60px; height: 60px; border-width: 4px;';
      default:
        return 'width: 40px; height: 40px; border-width: 3px;';
    }
  }}
`;

const LoadingText = styled.p<{ size?: string }>`
  color: #666;
  font-weight: 500;
  animation: ${pulse} 1.5s ease-in-out infinite;
  
  ${({ size }) => {
    switch (size) {
      case 'small':
        return 'font-size: 0.875rem;';
      case 'large':
        return 'font-size: 1.25rem;';
      default:
        return 'font-size: 1rem;';
    }
  }}
`;

const DotsContainer = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-top: 0.5rem;
`;

const Dot = styled.div<{ delay: number }>`
  width: 8px;
  height: 8px;
  background-color: #4CAF50;
  border-radius: 50%;
  animation: ${pulse} 1.4s infinite ease-in-out;
  animation-delay: ${({ delay }) => delay}s;
`;

interface LoadingProps {
  text?: string;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  showDots?: boolean;
  variant?: 'spinner' | 'dots';
}

const Loading: React.FC<LoadingProps> = ({
  text = 'Carregando...',
  size = 'medium',
  color,
  showDots = true,
  variant = 'spinner'
}) => {
  if (variant === 'dots') {
    return (
      <LoadingContainer size={size}>
        <LoadingText size={size}>{text}</LoadingText>
        <DotsContainer>
          <Dot delay={0} />
          <Dot delay={0.1} />
          <Dot delay={0.2} />
        </DotsContainer>
      </LoadingContainer>
    );
  }

  return (
    <LoadingContainer size={size}>
      <Spinner size={size} color={color} />
      <LoadingText size={size}>{text}</LoadingText>
      {showDots && (
        <DotsContainer>
          <Dot delay={0} />
          <Dot delay={0.1} />
          <Dot delay={0.2} />
        </DotsContainer>
      )}
    </LoadingContainer>
  );
};

export default Loading;
