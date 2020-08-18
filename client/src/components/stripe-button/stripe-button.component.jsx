import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

function StripeCheckoutButton({price}) {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51H94y8D9yQotBBNXUZL9LbdVPGgUsBSg9EIy8ODaLHb92FmX6Jg1SyUfF7eIXZZCXa55hlHenu8gEgQ2qRLt6a55009KKyns90';
    const onToken = token => {
        console.log(`Token is: ${token}`);
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token
            }
        }).then(response => {
            alert("Payment is successful");
        }).catch(error => {
            console.log("payment error " + JSON.stringify(error));
            alert("Something wrong with your payment");
        })
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name='Clothing App'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total price is ${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
}

export default StripeCheckoutButton;