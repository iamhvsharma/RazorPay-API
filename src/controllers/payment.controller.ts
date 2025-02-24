import { Request, Response } from "express";
import { razorpayInstance } from "../config/razorpay.config";
import crypto, { sign } from "crypto";

export const createOrder = async (req: Request, res: Response) => {
  const { productId, amount } = req.body; // Right now I am taking amount from frontend for testing but in production we will fetch price from DB by the product id

  // Creating an Order
  const options = {
    amount: amount * 100, // As razorpay counts as 100.00 RS
    currency: "INR",
    receipt: `receipt_order_1`,
  };
  try {
    razorpayInstance.orders.create(options, (err, order) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Something went wrong",
        });
      }

      return res.status(200).json({
        success: true,
        order: order,
      });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Verification API controller
export const verifyOrder = async (req: Request, res: Response) => {
  try {
    const { order_id, payment_id, signature } = req.body;
    const secretKey = process.env.RAZORPAY_KEY_SECRET;

    // Creating hmac object
    const hmac = crypto.createHmac("sha256", secretKey);

    hmac.update(order_id + "|" + payment_id);

    // Generate signature
    const generateSignature = hmac.digest("hex");

    if (generateSignature === signature) {
      // Perform DB operations

      return res.status(200).json({
        success: true,
        msg: "Payment verified",
      });
    } else {
      return res.status(400).json({
        success: false,
        msg: "Payment verification failed",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Internal server error",
    });
  }
};
