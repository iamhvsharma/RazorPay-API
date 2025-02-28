import { Request, response, Response } from "express";
import razorpayInstance from "../config/razorpay.config";

export const gpdailySubscription = async (req: Request, res: Response) => {
  try {
    const { amount, name, email, contact, ref } = req.body;
    const expire_by = Math.floor(Date.now() / 1000) + (30 * 60);
    const response = await razorpayInstance.paymentLink.create({
      amount: amount,
      currency: "INR",
      accept_partial: true,
      description: "For GP Daily subscription",
      customer: {
        name: name,
        email: email,
        contact: contact,
      },
      expire_by: expire_by,

      notify: {
        sms: true,
        email: true,
      },
      reference_id: ref,
      reminder_enable: true,
      notes: {
        policy_name: "Genda Phool",
      },
      callback_url: "https://www.mygendaphool.com",
      callback_method: "get",
    });

    res.status(200).send({
      MSG: "Payment Successful!",
      response: response,
    });
  } catch (error) {
    res.status(401).send({
      MSG: "Something went wrong!",
      response: error,
    });
  }
};
