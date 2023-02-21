import React from "react";
import styles from "./button.module.css";

const Button = ({ title, btn, color, type, onClick }) => {
  return (
    <button className={`${styles[btn]} ${styles[color]}`} type={type} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;