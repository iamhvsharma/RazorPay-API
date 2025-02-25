import { Request, Response, NextFunction } from "express";
import { CreateOrderRequest } from "../types/interfaces"

export const validateCreateOrderRequest = (
  req: Request<{}, {}, CreateOrderRequest>,
  res: Response,
  next: NextFunction
): void => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    res.status(400).json({
      success: false,
      message: "Invalid amount"
    });
    return;
  }

  next();
};