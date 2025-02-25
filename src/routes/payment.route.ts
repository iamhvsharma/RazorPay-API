import { Router } from "express";
import { createOrder, verifyOrder } from "../controllers/payment.controller";
import { validateCreateOrderRequest } from "../middlewares/validateCreateOrderRequest";
import { validateVerifyOrderRequest } from "../middlewares/validateVerifyOrderRequest";

const router = Router();

router.post("/create", validateCreateOrderRequest, createOrder);
router.post("/verify", validateVerifyOrderRequest, verifyOrder);

export default router;