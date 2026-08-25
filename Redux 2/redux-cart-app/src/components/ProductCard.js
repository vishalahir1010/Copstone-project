import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
import { addToWishlist, removeFromWishlist } from '../actions/wishlistActions';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const inCart = cartItems.some((item) => item.id === product.id);
  const inWishlist = wishlistItems.some((item) => item.id === product.id);

  const handleAddToCart = () => dispatch(addToCart(product));
  const handleRemoveFromCart = () => dispatch(removeFromCart(product));

  const handleToggleWishlist = () =>
    dispatch(inWishlist ? removeFromWishlist(product) : addToWishlist(product));

  return (
    <div style={styles.card}>
      <h3>{product.name}</h3>
      <p>${product.price.toFixed(2)}</p>

      <div style={styles.buttonRow}>
        <button onClick={handleAddToCart} disabled={inCart} style={styles.button}>
          {inCart ? 'In Cart' : 'Add to Cart'}
        </button>
        <button
          onClick={handleRemoveFromCart}
          disabled={!inCart}
          style={{ ...styles.button, ...styles.removeButton }}
        >
          Remove from Cart
        </button>
      </div>

      <button onClick={handleToggleWishlist} style={styles.wishlistButton}>
        {inWishlist ? '♥ In Wishlist' : '♡ Add to Wishlist'}
      </button>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: 8,
    padding: 16,
    width: 220,
    textAlign: 'center',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  },
  buttonRow: {
    display: 'flex',
    gap: 8,
    justifyContent: 'center',
    marginBottom: 8,
  },
  button: {
    padding: '6px 10px',
    border: 'none',
    borderRadius: 4,
    background: '#4f46e5',
    color: '#fff',
    cursor: 'pointer',
  },
  removeButton: {
    background: '#dc2626',
  },
  wishlistButton: {
    padding: '6px 10px',
    border: '1px solid #4f46e5',
    borderRadius: 4,
    background: '#fff',
    color: '#4f46e5',
    cursor: 'pointer',
  },
};

export default ProductCard;
