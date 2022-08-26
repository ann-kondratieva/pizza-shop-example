import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import { Loader } from 'common/Loader/index';

export const PizzaList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pizzaList, setPizzaList] = useState([]);

  const fetchPizzas = useCallback(async () => {
    setIsLoading(true);
    const pizzaResponse = await fetch(
      'https://run.mocky.io/v3/480df15f-73dc-4090-93e3-50d473c2be75',
    );
    const pizzasResponseData = await pizzaResponse.json();
    setPizzaList(pizzasResponseData.pizzas);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchPizzas();
  }, [fetchPizzas]);

  return (
    <div className="container">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="pizzas-container">
          {pizzaList.map((pizza) => (
            <div key={pizza.id} className="pizza-outer-container">
              <div className="pizza-container">
                <img
                  className="pizza-image"
                  src={require(`assets/${pizza.img}`)}
                  alt={pizza.name}
                />
                <div className="pizza-description">
                  <div className="pizza-description-first-col">
                    <div className="pizza-name">{pizza.name}</div>
                    <div>
                      <div className="ingredients-title">Ingredients:</div>
                      <div className="pizza-ingredients">
                        {pizza.ingredients.join(', ')}
                      </div>
                    </div>
                  </div>
                  <div className="pizza-description-second-col">
                    {pizza.price} €
                  </div>
                </div>
                <Link className="order-button" to={`/${pizza.id}`}>
                  Order now
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
