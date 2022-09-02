import { useState } from "react";
import { IProduct } from "./MockDB";
import PaymentGateway from "./PaymentGateway";


enum OrderState {
    INITIAL,
    CHECKOUT,
    COMPLETED,
    CANCEL
}

export default function RightPanel(
    {
        cart
    }: {
        cart: IProduct[],
    }
) {
    const [state, setState] = useState<OrderState>(OrderState.INITIAL);
    const [responseOrder, setResponseOrder] = useState({});

    const shippingCode = {
        code: 'SH_01',
        price: 5,
    }

    const calculateSubtotal = () => {
        var orderItemsTotal = 0;
        orderItemsTotal = cart.reduce((acc: number, orderItem: IProduct) => acc + orderItem.price * (orderItem.amount || 1), orderItemsTotal);
        return orderItemsTotal;
    };

    const calculateShipping = () => {
        return shippingCode.price;
    };

    const calculateTotal = () => {
        return calculateSubtotal() + calculateShipping();
    };

    const requestNewCheckout = () => {
        const payload = {
            products: cart,
            shipping: shippingCode,
        };

        // request new checkout
        fetch('http://localhost:4242/create_checkout_session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(res => res.json())
            .then(res => {
                setResponseOrder(res);
                setState(OrderState.CHECKOUT);
            }).catch(err => {
                console.log(err);
            }
            );
    };

    return (
        <>
            <div>
                <p className="lg:text-4xl text-3xl font-black leading-9 text-slate-700 dark:text-white">
                    Summary
                </p>
                <div className="flex items-center justify-between pt-16">
                    <p className="text-base leading-none text-slate-700 dark:text-white">
                        Subtotal
                    </p>
                    <p className="text-base leading-none text-slate-700 dark:text-white">
                        {calculateSubtotal()} USD
                    </p>
                </div>
                <div className="flex items-center justify-between pt-5">
                    <p className="text-base leading-none text-slate-700 dark:text-white">
                        Shipping
                    </p>
                    <p className="text-base leading-none text-slate-700 dark:text-white">
                        {calculateShipping()} USD
                    </p>
                </div>
            </div>
            <div className="bg-orange-300 rounded-sm ">
                <div className="flex items-center justify-between">
                    <PaymentGateway order={responseOrder} />
                </div>
            </div>
            <div>
                <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                    <p className="text-2xl leading-normal text-slate-700 dark:text-white">
                        Total
                    </p>
                    <p className="text-2xl font-bold leading-normal text-right text-slate-700 dark:text-white">
                        {calculateTotal()} USD
                    </p>
                </div>
                <button
                    onClick={() => requestNewCheckout()}
                    className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white dark:hover:bg-gray-700"
                >
                    Checkout
                </button>
            </div>
        </>
    );
}


