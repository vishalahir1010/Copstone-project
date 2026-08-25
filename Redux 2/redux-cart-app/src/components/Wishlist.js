import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../actions/wishlistActions';

const Wishlist = () => {
  const items = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  return (
    <div style={styles.panel}>
      <h2>Wishlist ({items.length})</h2>
      {items.length === 0 ? (
        <p>No items saved yet.</p>
      ) : (
        <ul style={styles.list}>
          {items.map((item) => (
            <li key={item.id} style={styles.listItem}>
              {item.name}
              <button
                onClick={() => dispatch(removeFromWishlist(item))}
                style={styles.removeLink}
              >
                remove
              </button>
            </li>
          ))}
        </ul>
      )}
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

export default Wishlist;
