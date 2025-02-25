import { Request, Response, NextFunction } from "express";
import { VerifyOrderRequest } from "../types/interfaces";

export const validateVerifyOrderRequest = (
  req: Request<{}, {}, VerifyOrderRequest>,
  res: Response,
  next: NextFunction
): void => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    res.status(400).json({
      success: false,
      message: "Missing required payment verification parameters"
    });
    return;
  }

  next();
};