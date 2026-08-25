import React from "react";

function Modal({ closeModal }) {
  const handleOutsideClick = (e) => {
    if (e.target.className === "modal-overlay") {
      closeModal();
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={handleOutsideClick}
    >
      <div className="modal">
        <button
          className="close-btn"
          onClick={closeModal}
        >
          ×
        </button>

        <h2>🎟️ Book Ticket</h2>

        <form>
          <input
            type="text"
            placeholder="Your Name"
            required
          />

          <input
            type="email"
            placeholder="Email"
            required
          />

          <input
            type="number"
            placeholder="Number of Tickets"
            min="1"
            required
          />

          <button
            type="submit"
            className="book-btn"
          >
            Book Ticket
          </button>
        </form>
      </div>
    </div>
  );
}

export default Modal;