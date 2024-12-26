import { NextFunction, Request, Response } from "express";

export const validateCreateSale = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { client_id, amount } = req.body;

  if (!client_id || typeof client_id !== "string") {
    res.status(400).json({ message: "Invalid or missing client_id" });
    return;
  }

  if (amount === undefined || typeof amount !== "number" || amount <= 0) {
    res.status(400).json({ message: "Invalid or missing amount" });
    return;
  }

  next();
};
