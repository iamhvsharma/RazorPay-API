import { Request } from "express";

export interface CreateOrderRequest {
    productId: string;
    amount: number;
  }
  
  export interface VerifyOrderRequest {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }
  
  export interface PaymentResponse {
    success: boolean;
    message: string;
    data?: any;
  }

  export interface CreateOrderRequest {
    productId: string;
    amount: number;
  }
  
  export interface VerifyOrderRequest {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }
  
  export type CreateOrderRequestType = Request<{}, {}, CreateOrderRequest>;
  export type VerifyOrderRequestType = Request<{}, {}, VerifyOrderRequest>;