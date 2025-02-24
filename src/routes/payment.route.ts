import Razorpay from "razorpay";
import express, { Router } from "express";
import { createOrder, verifyOrder } from "../controllers/payment.controller";

const router = Router();

// Route for creating an order

// Create Order Route
router.post("/create", createOrder);

// Verify Order Route
router.post("/verify", verifyOrder);

export default router;
