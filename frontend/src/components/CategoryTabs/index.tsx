import { useState } from 'react';
import './styles.css';

interface CategoryTabsProps {
  selectedCategory: 'all' | 'doces' | 'salgados' | 'bebidas';
  onCategoryChange: (category: 'all' | 'doces' | 'salgados' | 'bebidas') => void;
}

const categories = [
  { id: 'all', name: 'Todos' },
  { id: 'doces', name: 'Doces' },
  { id: 'salgados', name: 'Salgados' },
  { id: 'bebidas', name: 'Bebidas' },
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
            <span className="tab-name">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;