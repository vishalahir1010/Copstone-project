import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOffers } from '../actions/offersActions';

const Offers = () => {
  const { loading, offers, error } = useSelector((state) => state.offers);
  const dispatch = useDispatch();

  return (
    <div style={styles.panel}>
      <h2>Discount Offers</h2>
      <button onClick={() => dispatch(fetchOffers())} style={styles.button}>
        {loading ? 'Fetching...' : 'Fetch Offers'}
      </button>

      {error && <p style={{ color: '#dc2626' }}>{error}</p>}

      {offers.length > 0 && (
        <ul style={styles.list}>
          {offers.map((offer) => (
            <li key={offer.id}>
              {offer.title} — code: <strong>{offer.code}</strong>
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
  button: {
    padding: '6px 10px',
    border: 'none',
    borderRadius: 4,
    background: '#059669',
    color: '#fff',
    cursor: 'pointer',
    marginBottom: 8,
  },
  list: { paddingLeft: 18 },
};

export default Offers;
