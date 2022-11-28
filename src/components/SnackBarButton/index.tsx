import Styles from './snackBarButton.module.css';

const Button = ({ children, handleClick }: any) => (
  <button className={Styles.buttons} onClick={handleClick}>
    {children}
  </button>
);

export default Button;
