import Stripe from "stripe";

// Creating a new instance of the Stripe object with the provided API key and options
export const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
    apiVersion: "2024-04-10",
    typescript: true,
});
