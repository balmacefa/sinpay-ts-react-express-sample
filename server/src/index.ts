import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import { createCheckoutSession } from './checkoutSession'
import { orderUpdateWebhook } from './orderUpdateWebhook'


dotenv.config()

const app = express()
const port = process.env.PORT || 4242


app
  .use(morgan('dev'))
  .use(
    cors()
  )
  .use(express.json())
  .use(cookieParser())
  .get('/health', (_, res) => {
    res.status(200).json({ status: 'healthy' })
  });

// ---------------------------------------------------------------
// Routes
// ---------------------------------------------------------------

// This create a new sinpay order
app.post('/create_checkout_session', createCheckoutSession);

// This is the webhook that Sinpay will call when the order is updated
app.post('/order_update_webhook/Iv0ct5w3KQ', orderUpdateWebhook);

// ---------------------------------------------------------------
// ---------------------------------------------------------------
app.get('/', (_, res) => {
  res.redirect('/health');
});


app.listen(port, () => {
  console.log(`App started successfully on ${port}!`);
  console.log('Running', 'http://localhost:' + port);
  console.log('Listening to orders updates', '/order_update_webhook/Iv0ct5w3KQ');
});
