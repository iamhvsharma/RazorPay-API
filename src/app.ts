import express from "express";
import paymentRoutes from "./routes/payment.route";
import paymentLinksRoutes from "./routes/paymentLinks.route";
import cors from "cors";
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

app.get("/check", (req, res) => {
  res.json({
    MSG: "Working fine!",
  });
});

// API Call
app.use("/api/v1/payments/order", paymentRoutes);

// GP Daily
app.use("/api/v1/gpdaily", paymentLinksRoutes);

export { app };
