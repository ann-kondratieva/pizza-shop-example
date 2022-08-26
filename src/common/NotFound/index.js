import './styles.css';
import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-info-container">
        <div className="not-found-title">Sorry, we don't have this item</div>
        <div className="not-found-info">
          Try to select something from our menu
        </div>
        <Link className="not-found-button" to={`/`}>
          Go to main page
        </Link>
      </div>
    </div>
  );
};
