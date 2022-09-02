import { Request, Response } from 'express';

export const orderUpdateWebhook = async (req: Request, res: Response) => {
    // Check the JWKS security standard before continue
    // otherwise this endpoint can be compromised.
    console.log("order update webhook called");
    console.log(req);
    console.log(res);
};
