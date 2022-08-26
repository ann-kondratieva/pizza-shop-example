import { NotFound } from 'common/NotFound/index';
import { PizzaDetails } from 'screens/PizzaDetails/index';
import { PizzaList } from 'screens/PizzaList/index';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { OrderResult } from 'screens/OrderResult';
import { Logo } from 'common/Logo';

export const App = () => {
  return (
    <HashRouter>
      <Logo />
      <Routes>
        <Route path="/:id" element={<PizzaDetails />} />
        <Route path="/" element={<PizzaList />} />
        <Route path="/not_found" element={<NotFound />} />
        <Route path="/result/:status" element={<OrderResult />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
};
