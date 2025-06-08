import { Link } from 'react-router-dom';
import './styles.css';

const Header = () => {
    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">
                    <Link to="/">
                        <h1>SAEComp Lojinha</h1>
                    </Link>
                </div>
                <nav className="navigation">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/">Produtos</Link>
                        </li>
                        <li>
                            <Link to="/cart">Carrinho (0)</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
