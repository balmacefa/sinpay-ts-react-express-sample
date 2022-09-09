import { Request, Response } from 'express';
import { IProduct } from './dataConfig';
// axios
import axios from 'axios';

export const createCheckoutSession = async (req: Request, _: Response) => {

    const { products, shipping } = req.body;

    const orderItems = products.map(({ id, amount, name, price, description, img }: IProduct) => ({
        name,
        unit_amount: price,
        quantity: amount,
        description: `Detail: ${description}`,
        sku: id,
        category: "PHYSICAL",
        metadata: {
            "BML_display_img": img,
        },
    }));

    const shippingItem = {
        name: 'Shipping',
        unit_amount: shipping.price,
        quantity: 1,
        description: 'Shipping',
        sku: shipping.code,
        category: 'DIGITAL',
    };

    const payload = {
        "amount": -1,
        "currency": "USD",
        "description": "Ventanilla - Cafetería Los Santos",
        "seller_referral_id": "id12345",
        "seller_invoice_id": "in case of invoice is needed - 123456",
        "order_items": [...orderItems, shippingItem],
    };

    const getOrderTotalAmount = (order: any) => {
        let orderItemsTotal = 0;
        orderItemsTotal = order.order_items.reduce((acc: number, orderItem: any) => acc + orderItem.unit_amount * orderItem.quantity, orderItemsTotal);
        return orderItemsTotal;
    };

    payload.amount = getOrderTotalAmount(payload);

    const token = `429317fa-bd81-4aee-a7d3-adc013d785c7`;
    const auth = `App API-Key ${token}`;

    try {

        const response = await axios.post(
            'http://localhost:3033/api/v1/orders',
            JSON.stringify(payload),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': auth,
                }
            }
        );
        const { data } = response;
        // todo: guardar ej de json de respuesta

        console.log("Sinpay response:", data);
    } catch (error) {
        console.log("Sinpay error:", error);
    }


    // res.redirect(303, session.url);
};
