import express from "express";
const app = express();

app.use(express.json());

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use(limiter)



const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "User API",
        version: "1.0.0",
        description: "A simple Express API that utilizes OpenAPI 3.0.0",
    },
};

const options = {
    swaggerDefinition,
    apis: ["./routers/*.js"],
};

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

import userRouter from "./routers/user.js";
app.use(userRouter);

import spacecraftsRouter from "./routers/spacecrafts.js";
app.use(spacecraftsRouter);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});