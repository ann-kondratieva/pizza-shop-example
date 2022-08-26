import './styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Loader } from 'common/Loader/index';

const options = [
  { name: '🍖 ham', price: 2 },
  { name: '🧅 onion', price: 1 },
  { name: '🥓 bacon', price: 2 },
  { name: '🧀 cheese', price: 1.4 },
  { name: '🫑 green peppers', price: 1.2 },
  { name: '🍄 mushrooms', price: 1.2 },
];

const selectTheme = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: '#f7be74',
    primary50: '#f7ad54',
    primary75: '#fc9714',
    primary: '#fb9302',
  },
});

const customStyles = {
  control: (provided) => ({
    ...provided,
    padding: 3,
  }),
  multiValue: (provided) => ({
    ...provided,
    fontSize: 18,
  }),
};

export const responseStatus = {
  SUCCESS: 'success',
  ERROR: 'error',
};

export const PizzaDetails = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [pizzaDetails, setPizzaDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [finalPrice, setFinalPrice] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const fetchPizzaDetails = useCallback(async () => {
    setIsLoading(true);
    const pizzaResponse = await fetch(
      'https://run.mocky.io/v3/480df15f-73dc-4090-93e3-50d473c2be75',
    );
    const pizzasResponseData = await pizzaResponse.json();
    const selectedPizza = pizzasResponseData.pizzas.find(
      (pizza) => Number.parseInt(pizza.id) === Number.parseInt(params.id),
    );
    if (!selectedPizza) {
      navigate('/not_found');
    }
    setPizzaDetails(selectedPizza);
    setFinalPrice(selectedPizza.price);
    setIsLoading(false);
  }, [navigate, params.id]);

  useEffect(() => {
    fetchPizzaDetails();
  }, [fetchPizzaDetails]);

  const pizzaOptions = useMemo(
    () =>
      options.map((option) => ({
        value: option.name,
        price: option.price,
        label: `${option.name} +${option.price}€`,
      })),
    [],
  );

  const onOptionsChange = useCallback(
    (values) => {
      setSelectedOptions(values);
      const price = values.reduce((previousValue, currentOption) => {
        const sum =
          Number.parseFloat(previousValue) +
          Number.parseFloat(currentOption.price);
        return sum.toFixed(1);
      }, pizzaDetails?.price);
      setFinalPrice(price);
    },
    [pizzaDetails?.price],
  );

  const onFormSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);
      const orderResponse = await fetch(
        'https://run.mocky.io/v3/cbdd6815-6cbf-4308-9369-60589896b68a',
        {
          method: 'POST',
          body: JSON.stringify({
            pizzaId: pizzaDetails.id,
            pizzaName: pizzaDetails.name,
            options: selectedOptions.map((option) => option.value),
            price: finalPrice,
          }),
        },
      );
      const orderResponseData = await orderResponse.json();

      setIsLoading(false);
      navigate(`/result/${orderResponseData.status}`);
    },
    [finalPrice, navigate, pizzaDetails.id, pizzaDetails.name, selectedOptions],
  );

  return (
    <div className="details-container">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="details-pizza-container">
          <div className="details-title">Shopping cart &nbsp; 🛒</div>
          <div className="details-pizza-info">
            <img
              className="details-pizza-image"
              src={require(`assets/${pizzaDetails.img}`)}
              alt={pizzaDetails.name}
            />
            <form className="details-pizza-description" onSubmit={onFormSubmit}>
              <div>
                <div className="details-pizza-name">{pizzaDetails.name}</div>
                <div className="details-ingredients-title">Ingredients:</div>
                <div className="details-pizza-ingredients">
                  {pizzaDetails.ingredients.join(', ')}
                </div>
                <div className="details-extras-title">
                  Extras for your delicious pizza:
                </div>
                <Select
                  placeholder="Please, select multiple extras"
                  isMulti
                  width="300px"
                  name="options"
                  options={pizzaOptions}
                  styles={customStyles}
                  theme={selectTheme}
                  onChange={onOptionsChange}
                />
              </div>
              <div className="details-price">
                <div>
                  Final price:{' '}
                  <span className="details-price-number">{finalPrice}€</span>
                </div>
                <button type="submit" className="details-order-button">
                  Order now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
