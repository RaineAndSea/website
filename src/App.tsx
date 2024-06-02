import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Authentication } from './modules/auth/authentication';
import { Checkout } from './modules/checkout/checkout';
import { Header } from './modules/header/header';
import { Home } from './modules/home/home';
import { Products } from './modules/products/products';
import { Notifications } from './modules/toast/toast';

export const BASE_QUERY = 'http://192.168.0.15:5050';
function App() {
    return (
        <div className='App'>
            <Toaster />
            <Notifications />
            ``
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/products/:productCategory' element={<Products />} />
                    <Route path='/all-products' element={<Products />} />
                    <Route path='/auth' element={<Authentication />} />
                    <Route path='/checkout' element={<Checkout />} />
                    <Route path='/*' element={<>shit aint implemented yet</>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
