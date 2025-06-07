import { useState } from 'react';
import './styles.css';

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
    <div className="category-tabs">
      <div className="tabs-container">
        {categories.map(category => (
          <button
            key={category.id}
            className={`tab ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => onCategoryChange(category.id)}
          >
            <span className="tab-icon">{category.icon}</span>
            <span className="tab-name">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;