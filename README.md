# SAEComp Lojinha Virtual

Este projeto é uma loja virtual de doces, salgados e bebidas, desenvolvida como parte do curso da SAEComp. O projeto é dividido em duas partes: frontend e backend.

## Estrutura do Projeto

```
saecomp-lojinha
├── frontend
│   ├── public
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src
│   │   ├── components
│   │   │   ├── Header
│   │   │   │   └── index.tsx
│   │   │   ├── ProductCard
│   │   │   │   └── index.tsx
│   │   │   ├── Cart
│   │   │   │   └── index.tsx
│   │   │   ├── QRCode
│   │   │   │   └── index.tsx
│   │   │   └── CategoryTabs
│   │   │       └── index.tsx
│   │   ├── pages
│   │   │   ├── Home
│   │   │   │   └── index.tsx
│   │   │   ├── ProductDetails
│   │   │   │   └── index.tsx
│   │   │   └── Checkout
│   │   │       └── index.tsx
│   │   ├── hooks
│   │   │   └── useCart.ts
│   │   ├── services
│   │   │   └── api.ts
│   │   ├── types
│   │   │   └── index.ts
│   │   ├── styles
│   │   │   └── global.css
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── package.json
│   └── tsconfig.json
├── backend
│   ├── src
│   │   ├── controllers
│   │   │   ├── productController.ts
│   │   │   ├── orderController.ts
│   │   │   └── paymentController.ts
│   │   ├── models
│   │   │   ├── Product.ts
│   │   │   └── Order.ts
│   │   ├── routes
│   │   │   ├── products.ts
│   │   │   ├── orders.ts
│   │   │   └── payments.ts
│   │   ├── middleware
│   │   │   └── cors.ts
│   │   ├── config
│   │   │   └── database.ts
│   │   └── app.ts
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## Tecnologias Utilizadas

- **Frontend**: React com TypeScript
- **Backend**: Node.js com TypeScript
- **Banco de Dados**: [Definir o banco de dados utilizado, ex: MongoDB, PostgreSQL, etc.]

## Como Rodar o Projeto

### Frontend

1. Navegue até a pasta do frontend:
   ```
   cd frontend
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```
   npm start
   ```

### Backend

1. Navegue até a pasta do backend:
   ```
   cd backend
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Inicie o servidor:
   ```
   npm start
   ```

## Funcionalidades

- Visualização de produtos com detalhes.
- Adição de produtos ao carrinho.
- Finalização de compra com geração de QR Code para pagamento.
- Navegação entre diferentes categorias de produtos.



## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## Licença

Este projeto está licenciado sob a [sua licença aqui].