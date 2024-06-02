import { Toaster } from 'react-hot-toast';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { Authentication } from './modules/auth/authentication';
import { Checkout } from './modules/checkout/checkout';
import { Header } from './modules/header/header';
import { Home } from './modules/home/home';
import { Products } from './modules/products/products';
import { Notifications } from './modules/toast/toast';

export const BASE_QUERY = 'https://raine-server.vercel.app';
export const APP_BASE_QUERY = '/website';
function App() {
    return (
        <div className='App'>
            <Toaster />
            <Notifications />
            ``
            <BrowserRouter> 
                <Header />
                <Routes>
                    <Route path='/' element={<Navigate to={APP_BASE_QUERY} />} />
                    <Route path={`${APP_BASE_QUERY}/`} element={<Home />} />
                    <Route path={`${APP_BASE_QUERY}/products/:productCategory`} element={<Products />} />
                    <Route path={`${APP_BASE_QUERY}/all-products`} element={<Products />} />
                    <Route path={`${APP_BASE_QUERY}/auth`} element={<Authentication />} />
                    <Route path={`${APP_BASE_QUERY}/checkout`} element={<Checkout />} />
                    <Route path={`${APP_BASE_QUERY}/*`} element={<>shit aint implemented yet</>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
