import styles from './Button.module.scss';

const Button = ({ text, handleEvent, children }) => {
  return (
    <div data-testid='button' onClick={() => handleEvent()} className={styles.button}>
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
