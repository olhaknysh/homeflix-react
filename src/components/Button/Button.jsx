import styles from './Button.module.scss';

const Button = ({ text, handleEvent, children }) => {
  return (
    <div onClick={() => handleEvent()} className={styles.button}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      {children}
      {text}
    </div>
  );
};

export default Button;
