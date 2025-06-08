import styled from 'styled-components';
import { motion } from 'framer-motion';

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Tab = styled(motion.button)<{ active: boolean }>`
  background: ${({ active }) => active 
    ? 'linear-gradient(135deg, #4CAF50 0%, #03B04B 100%)' 
    : 'white'
  };
  color: ${({ active }) => active ? 'white' : '#666'};
  border: 2px solid ${({ active }) => active ? 'transparent' : '#e0e0e0'};
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  min-width: 120px;
  justify-content: center;
  
  .tab-icon {
    font-size: 1.2rem;
  }
  
  &:hover:not([disabled]) {
    transform: translateY(-2px);
    box-shadow: ${({ active }) => active 
      ? '0 8px 25px rgba(76, 175, 80, 0.3)' 
      : '0 4px 15px rgba(0, 0, 0, 0.1)'
    };
    
    ${({ active }) => !active && `
      border-color: #4CAF50;
      color: #4CAF50;
    `}
  }
  
  @media (max-width: 640px) {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
    min-width: 100px;
  }
`;

interface CategoryTabsProps {
  selectedCategory: 'all' | 'doces' | 'salgados' | 'bebidas';
  onCategoryChange: (category: 'all' | 'doces' | 'salgados' | 'bebidas') => void;
}

const categories = [
  { id: 'all', name: 'Todos', icon: '🛒' },
  { id: 'doces', name: 'Doces', icon: '🍬' },
  { id: 'salgados', name: 'Salgados', icon: '🥪' },
  { id: 'bebidas', name: 'Bebidas', icon: '🥤' },
] as const;

const CategoryTabs = ({ selectedCategory, onCategoryChange }: CategoryTabsProps) => {
  return (
    <TabsContainer>
      {categories.map((category, index) => (
        <Tab
          key={category.id}
          active={selectedCategory === category.id}
          onClick={() => onCategoryChange(category.id)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="tab-icon">{category.icon}</span>
          <span className="tab-name">{category.name}</span>
        </Tab>
      ))}
    </TabsContainer>
  );
};

export default CategoryTabs;