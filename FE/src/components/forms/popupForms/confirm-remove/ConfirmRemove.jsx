import React from "react";
import classes from "./confirm-remove.module.css";

export default function ConfirmRemove({ onClose, deleteContact,handleOverlayClick }) {
  return (
    <div className={classes.confirmRemove} onClick={handleOverlayClick}>
      <div className={classes.modalBox}>
        <h1 className={classes.title}>
          Are you sure you want to remove it ?
        </h1>
        <div className={classes.buttonGroup}>
          <button className={classes.button} onClick={() => {onClose();deleteContact()}}>Yes</button>
          <button className={classes.button} onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
}
