import React from 'react';
import PropTypes from 'prop-types';

const ConfirmationModal = ({
  title,
  show,
  contents,
  confirmationCallback,
  cancellationCallback,
}) => (
  <div className={`modal ${show ? 'is-active' : ''}`}>
    <div className="modal-background" />

    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">{title}</p>
        <button className="delete" aria-label="close" onClick={cancellationCallback} />
      </header>

      <section className="modal-card-body">
        {contents}
      </section>

      <footer className="modal-card-foot">
        <button className="button" onClick={cancellationCallback}>Cancel</button>
        <button className="button is-success" onClick={confirmationCallback}>Confirm</button>
      </footer>
    </div>
  </div>
);

ConfirmationModal.propTypes = {
  title: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  contents: PropTypes.object.isRequired,
  confirmationCallback: PropTypes.func.isRequired,
  cancellationCallback: PropTypes.func.isRequired,
};

export default ConfirmationModal;
