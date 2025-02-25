import razorpayInstance from "../config/razorpay.config";
import crypto from "crypto"
import { Response } from "express";
import {
  CreateOrderRequestType,
  VerifyOrderRequestType,
} from "../types/interfaces"

export const createOrder = async (
  req: CreateOrderRequestType,
  res: Response
): Promise<void> => {
  try {
    const { productId, amount } = req.body;
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpayInstance.orders.create(options);

    res.status(200).json({
      success: true,
      message: "Order created successfully",
      order: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
};

export const verifyOrder = async (
  req: VerifyOrderRequestType,
  res: Response
): Promise<void> => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const secretKey = process.env.RAZORPAY_KEY_SECRET;

    if (!secretKey) {
      throw new Error("RAZORPAY_KEY_SECRET is not configured");
    }

    const hmac = crypto.createHmac("sha256", secretKey);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generateSignature = hmac.digest("hex");

    if (generateSignature === razorpay_signature) {
       res.status(200).json({
        success: true,
        message: "Payment verified successfully",
      });
    }


    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
