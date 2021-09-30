import styles from './ButtonSimple.module.scss';

const ButtonSimple = ({ type, children }) => (
  <button className={styles.button} type={type}>
    {children}
  </button>
);

export default ButtonSimple;
