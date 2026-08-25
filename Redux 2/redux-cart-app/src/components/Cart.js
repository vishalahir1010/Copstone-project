import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../actions/cartActions';

const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={styles.panel}>
      <h2>Cart ({items.length})</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul style={styles.list}>
          {items.map((item) => (
            <li key={item.id} style={styles.listItem}>
              {item.name} - ${item.price.toFixed(2)}
              <button
                onClick={() => dispatch(removeFromCart(item))}
                style={styles.removeLink}
              >
                remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <p><strong>Total: ${total.toFixed(2)}</strong></p>
    </div>
  );
};

const styles = {
  panel: {
    border: '1px solid #ddd',
    borderRadius: 8,
    padding: 16,
    minWidth: 260,
  },
  list: { listStyle: 'none', padding: 0 },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '4px 0',
  },
  removeLink: {
    background: 'none',
    border: 'none',
    color: '#dc2626',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

export default Cart;
