import { Toaster } from 'react-hot-toast';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Authentication } from './modules/auth/authentication';
import { Checkout } from './modules/checkout/checkout';
import { NotFoundErrorFallback } from './modules/error/notFoundErrorFallback';
import { Header } from './modules/header/header';
import { Products } from './modules/products/products';
import { Notifications } from './modules/toast/toast';

export const BASE_QUERY = 'https://nervous-puce-sandals.cyclic.app';
function App() {
  return (
    <div className="App">
      <Toaster />
      <Notifications />
      <HashRouter>
        <Header />
        <Routes>
          <Route path='*' element={<NotFoundErrorFallback />} />
          <Route path='/products' element={<Products />} />
          <Route path='/auth' element={<Authentication />} />
          <Route path='/checkout' element={<Checkout />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
