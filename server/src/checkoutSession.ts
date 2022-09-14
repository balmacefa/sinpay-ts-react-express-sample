import { Request, Response } from 'express';
import { IProduct } from './dataConfig';
// axios
import axios from 'axios';

export const createCheckoutSession = async (req: Request, res: Response) => {
    try {
        console.log('createCheckoutSession');

        const { products, shipping, overridePrice } = req.body;

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

        const overridePriceOrderItems = {
            name: "Override Price",
            unit_amount: overridePrice,
            quantity: 1,
            description: `Detail: Override Price`,
            sku: "overridePrice",
            category: "PHYSICAL",
        };

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

        if (overridePrice) {
            payload.currency = 'CRC';
            payload.order_items = [overridePriceOrderItems];
        }

        const getOrderTotalAmount = (order: any) => {
            let orderItemsTotal = 0;
            orderItemsTotal = order.order_items.reduce((acc: number, orderItem: any) => acc + orderItem.unit_amount * orderItem.quantity, orderItemsTotal);
            return orderItemsTotal;
        };

        payload.amount = getOrderTotalAmount(payload);

        const token = process.env.SINPAY_API_KEY;
        const auth = `App API-Key ${token}`;

        console.log('Send order to sinpay', payload);

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
        console.log('Sinpay response');
        console.log(JSON.stringify(data, null, 2));
        res.status(200).json(data);

    } catch (error: any) {
        console.error("Sinpay error:", error.message);
        res.status(500).json({ error: error.message });
    }

    // res.redirect(303, session.url);
};
