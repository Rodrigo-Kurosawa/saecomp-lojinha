import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import './styles.css';

const Header = () => {
    const { state } = useCart();
    const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);

    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">
                    <Link to="/">
                        <img src="/images/Logo-saecomp.png" alt="SAECOMP" className="logo-image" />
                    </Link>
                </div>
                <nav className="navigation">
                    <ul>
                        <li>
                            <Link to="/" className="nav-link">
                                <img 
                                    src="/Home.png" 
                                    alt="Início" 
                                    className="home-icon"
                                    onError={(e) => {
                                        console.error('Erro ao carregar Home.png');
                                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwIDIwVjE0SDEyVjIwSDIxVjEySDI0TDEyIDFMMCAxMkgzVjIwSDEwWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==';
                                    }}
                                />
                            </Link>
                        </li>
                        <li>
                            <Link to="/cart" className="cart-link">
                                <img src="/carrinho.png" alt="Carrinho" className="cart-icon" />
                                {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;