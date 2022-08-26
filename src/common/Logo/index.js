import { Link } from 'react-router-dom';
import './styles.css';

export const Logo = () => {
  return (
    <Link to="/" className="logo">
      <img
        src="https://assets.website-files.com/5ad15d8c3265e9c49b438f4e/5fdb3cb8ff782051237636a7_UsersnapLogo.svg"
        loading="lazy"
        width="193"
        height="36"
        alt="usersnap"
      />{' '}
      <span className="logo-food">food</span>
    </Link>
  );
};
