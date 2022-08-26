import './styles.css';
import { Link, useParams } from 'react-router-dom';
import { responseStatus } from 'screens/PizzaDetails';

export const OrderResult = () => {
  const params = useParams();

  return (
    <div className="result-container">
      <div className="result-info-container">
        <div className="result-title">
          {params.status === responseStatus.SUCCESS
            ? 'Congratulations!'
            : 'We`re sorry,'}
        </div>
        <div className="result-info">
          {params.status === responseStatus.SUCCESS
            ? 'Your order was successfully created! We will deliver the pizza as soon as possible'
            : 'something went wrong, please try again'}
        </div>
        <Link className="result-button" to={`/`}>
          Go to main page
        </Link>
      </div>
    </div>
  );
};
