import express from "express";
import paymentRoutes from "./routes/payment.route";
import cors from "cors"
const app = express();

// Middlewares
app.use(express.json());
app.use(cors())

app.get("/check", (req, res) => {
  res.json({
    MSG: "Working fine!",
  });
});

// API Call
app.use("/api/v1/payments/order", paymentRoutes);

export { app };
