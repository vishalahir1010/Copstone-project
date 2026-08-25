import React from 'react';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import Offers from './components/Offers';

const PRODUCTS = [
  { id: 'p1', name: 'Wireless Headphones', price: 59.99 },
  { id: 'p2', name: 'Running Shoes', price: 89.5 },
  { id: 'p3', name: 'Coffee Maker', price: 42.0 },
];

function App() {
  return (
    <div style={styles.app}>
      <h1>Redux Shopping Cart Demo</h1>

      <section>
        <h2>Products</h2>
        <div style={styles.productGrid}>
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section style={styles.sidePanels}>
        <Cart />
        <Wishlist />
        <Offers />
      </section>
    </div>
  );
}

const styles = {
  app: {
    fontFamily: 'system-ui, sans-serif',
    maxWidth: 900,
    margin: '0 auto',
    padding: 24,
  },
  productGrid: {
    display: 'flex',
    gap: 16,
    flexWrap: 'wrap',
    marginBottom: 32,
  },
  sidePanels: {
    display: 'flex',
    gap: 16,
    flexWrap: 'wrap',
  },
};

export default App;
