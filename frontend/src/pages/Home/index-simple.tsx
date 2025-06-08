import './styles.css';

const Home = () => {
    return (
        <div className="home-container">
            <h1>SAEComp Lojinha</h1>
            <p>Bem-vindo à lojinha virtual da SAEComp!</p>
            <div className="products-grid">
                <div className="product-card">
                    <h3>Brigadeiro</h3>
                    <p>R$ 2,50</p>
                    <button>Adicionar ao Carrinho</button>
                </div>
                <div className="product-card">
                    <h3>Coxinha</h3>
                    <p>R$ 4,00</p>
                    <button>Adicionar ao Carrinho</button>
                </div>
                <div className="product-card">
                    <h3>Refrigerante</h3>
                    <p>R$ 3,50</p>
                    <button>Adicionar ao Carrinho</button>
                </div>
            </div>
        </div>
    );
};

export default Home;
