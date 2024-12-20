import PayOS from "@payos/node";
import dotenv from 'dotenv';

dotenv.config();

const payos = new PayOS(
    process.env.PAYOS_CLIENT_ID ?? '',
    process.env.PAYOS_API_KEY ?? '',
    process.env.PAYOS_CHECKSUM_KEY ?? ''
);

export const createPaymentLink = async (orderId: number,
    amount: number,
    description: string,
    cancelUrl: string,
    returnUrl: string
) => {
    const requestData = {
        orderCode: orderId,
        amount: amount,
        description: description,
        cancelUrl: process.env.DOMAIN_URL + "/v1/api/payos" + cancelUrl,
        returnUrl: process.env.DOMAIN_URL + "/v1/api/payos" + returnUrl,
    }
    const paymentLink = await payos.createPaymentLink(requestData);
    return paymentLink;
}

export const creatPaymentLinkFE = async (orderId: number,
    amount: number,
    description: string,
    cancelUrl: string,
    returnUrl: string,
    items: {
        name: string,
        quantity: number,
        price: number,
        cvId: string
    }[]
) => {
    const requestData = {
        orderCode: orderId,
        amount: amount,
        description: description,
        items: items,
        cancelUrl: process.env.FRONTEND_URL + cancelUrl,
        returnUrl: process.env.FRONTEND_URL + returnUrl,
    }
    const paymentLink = await payos.createPaymentLink(requestData);
    return paymentLink;
}

