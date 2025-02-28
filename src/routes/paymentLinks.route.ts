import { Router } from "express";
import { gpdailySubscription } from "../controllers/paymentLinks.controller";

const router = Router();

router.post("/subscribe", gpdailySubscription);

export default router;