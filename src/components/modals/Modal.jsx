import React from "react";
import PropTypes from "prop-types";
import styles from "./Modal.module.css";

const Modal = ({ isVisible, onClose, children, width, height, scrollable }) => {
  if (!isVisible) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()}
        style={{
          width: width,
          maxWidth: width,
          height: height,
          overflow: scrollable ? "scroll" : "hidden",
        }}
      >
        <button
          type="button"
          className="btn-close position-absolute"
          onClick={onClose}
          style={{ top: "10px", right: "10px", zIndex: "9" }}
        />
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
