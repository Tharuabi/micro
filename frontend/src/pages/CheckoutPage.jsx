import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/CheckoutPage.css'; // Make sure this file exists

const CheckoutPage = ({
  cartItems = [],
  clearCart,
  handleRemoveFromCart,
  updateCartItemQuantity
}) => {
  const navigate = useNavigate();

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const quantity = item.quantity || 1;
      const price = item.price || 0;
      return total + quantity * price;
    }, 0);
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Your Cart ({getCartItemCount()} items)</h1>
        <Link to="/projectpage" className="continue-shopping">
          Continue Shopping
        </Link>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <Link to="/projectpage" className="shop-now-btn">
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img
                    src={item.image || 'https://via.placeholder.com/80x80'}
                    alt={item.name || item.title}
                  />
                </div>
                <div className="item-details">
                  <h3>{item.name || item.title}</h3>
                  <p className="price">₹{(item.price || 0).toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button
                      onClick={() => updateCartItemQuantity(item.id, (item.quantity || 1) - 1)}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity || 1}</span>
                    <button
                      onClick={() => updateCartItemQuantity(item.id, (item.quantity || 1) + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="item-total">
                  <p>₹{((item.price || 0) * (item.quantity || 1)).toFixed(2)}</p>
                  <button
                    onClick={() => handleRemoveFromCart(item.id)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal ({getCartItemCount()} items)</span>
                <span>₹{getCartTotal().toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{getCartTotal().toFixed(2)}</span>
              </div>
            </div>
            <button className="checkout-btn" onClick={() => navigate('/payment')}>
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
