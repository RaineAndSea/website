import { CreateOrderActions, CreateOrderData } from '@paypal/paypal-js';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_QUERY } from '../../App';
import { decodeCart } from '../../util/cookies/cart-cookies';
import { stateTaxRates } from './tax';

export const PayPalButton: React.FC<{PPCID: string | undefined}> = ({PPCID}) => {
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const cart = decodeCart();
        axios.post(`${BASE_QUERY}/products/cart-total`, { cart }).then(res => {
            setTotal(res.data.total);
        });
    }, []);

    const paypalOptions = {
        clientId: String(PPCID), // Replace with your PayPal client ID
        currency: 'USD',
        intent: 'capture'
    };

    const calculateTax = (state: string) => {
        return stateTaxRates[state];
    };

    const createOrder = async (data: CreateOrderData, actions: CreateOrderActions) => {
        const cart = decodeCart();

        const orderTotal = await axios
            .post(`${BASE_QUERY}/products/cart-total`, { cart })
            .then(res => {
                setTotal(res.data.total);
                return res.data.total;
            })
            .catch(err => {
                console.log(err);
                return -1;
            });

        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: String(orderTotal) // Initial amount before tax calculation
                    }
                }
            ]
        });
    };

    const onShippingChange = async (data: any, actions: any) => {
        const shippingAddress = data.shipping_address;
        const shippingState = shippingAddress.state;

        const cart = decodeCart();
        const orderTotal = await axios
            .post(`${BASE_QUERY}/products/cart-total`, { cart })
            .then(res => {
                setTotal(res.data.total);
                return res.data.total;
            })
            .catch(err => {
                console.log(err);
                return -1;
            });

        const taxRate = calculateTax(shippingState);
        const taxAmount = orderTotal * taxRate;
        const totalAmount = orderTotal + taxAmount;

        return actions.order.patch([
            {
                op: 'replace',
                path: "/purchase_units/@reference_id=='default'/amount",
                value: {
                    currency_code: 'USD',
                    value: totalAmount.toFixed(2),
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: orderTotal.toFixed(2)
                        },
                        tax_total: {
                            currency_code: 'USD',
                            value: taxAmount.toFixed(2)
                        }
                    }
                }
            }
        ]);
    };

    const onApprove = (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
            console.log('Transaction completed:', details);
            // Handle successful payment here
        });
    };

    return (
        <PayPalScriptProvider options={paypalOptions}>
            <div
                style={{
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <div style={{ width: '80%' }}>
                    <PayPalButtons
                        disabled={total <= 0}
                        createOrder={(data, actions) => createOrder(data, actions)}
                        onShippingChange={onShippingChange}
                        onApprove={onApprove}
                    />
                </div>
            </div>
        </PayPalScriptProvider>
    );
};
