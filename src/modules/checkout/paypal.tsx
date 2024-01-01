import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import React from 'react';

export const PayPalButton: React.FC = () => {
  const paypalOptions = {
    clientId: 'EHyHhz0QkObwxkcOoUvg_S8KeWqJ5xKhxaZF14GdfzWhdBF61aGOoFjDw-jrVfvnurVIcu-Kq6RdVt2K', // Replace with your PayPal client ID
    currency: 'USD',
    intent: 'capture',
  };

  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: '10.00', // Replace with the amount you want to charge
          },
        },
      ],
    });
  };

  const onApprove = (data: any, actions: any) => {
    return actions.order.capture().then((details: any) => {
      console.log('Transaction completed:', details);
      // Handle successful payment here
    });
  };

  return (
    <PayPalScriptProvider options={paypalOptions}>
        <div style={{display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
            <div style={{width: '80%'}}>
                <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
            </div>
        </div>
    </PayPalScriptProvider>
  );
};
