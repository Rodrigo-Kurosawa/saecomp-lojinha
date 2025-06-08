import React from 'react';
import './styles.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <div className="footer-logo">
            <img src="/images/Logo-saecomp.png" alt="SAECOMP" className="footer-logo-image" />
          </div>
          <p className="footer-text">Secretaria Acadêmica de Engenharia da Computação</p>
          <p className="footer-text">ICMC/EESC</p>
          <p className="footer-text">Universidade de São Paulo</p>
        </div>
        <div className="footer-right">
          <div className="social-links">
            <a href="#" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="social-link">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
