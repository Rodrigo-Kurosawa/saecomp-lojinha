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
                        <h1>SAECOMP</h1>
                    </Link>
                </div>
                <nav className="navigation">
                    <ul>
                        <li>
                            <Link to="/">Início</Link>
                        </li>
                        <li>
                            <Link to="/cart" className="cart-link">
                                Carrinho 
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