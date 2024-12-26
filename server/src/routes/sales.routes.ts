import { Request, Response, Router } from "express";
import pool from "../db";
import { validateCreateSale } from "../middlewares/validateOperations";

class SalesRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get("/", this.getAllSales);
    this.router.post("/", validateCreateSale, this.createSale);
    this.router.get("/clients/:client_id", this.getAllSalesByClient);
  }

  private async getAllSales(req: Request, res: Response): Promise<void> {
    try {
      const result = await pool.query("SELECT * FROM sales");
      res.json(result.rows);
    } catch (error) {
      console.error("Error fetching sales:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  private async getAllSalesByClient(
    req: Request,
    res: Response
  ): Promise<void> {
    const { client_id } = req.params;

    try {
      const result = await pool.query(
        "SELECT * FROM sales WHERE client_id = $1",
        [client_id]
      );
      res.json(result.rows);
    } catch (error) {
      console.error("Error fetching sales by client:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  private async createSale(req: Request, res: Response): Promise<void> {
    const { client_id, amount } = req.body;

    try {
      const result = await pool.query(
        `
      WITH last_purchase AS (
        SELECT purchase_time
        FROM sales
        WHERE client_id = $1
        ORDER BY purchase_time DESC
        LIMIT 1
      )
      INSERT INTO sales (client_id, purchase_time, amount)
      SELECT $1, NOW(), $2
      WHERE NOT EXISTS (
        SELECT 1
        FROM last_purchase
        WHERE NOW() - INTERVAL '1 minute' < last_purchase.purchase_time
      )
      RETURNING *;
      `,
        [client_id, amount]
      );

      if (result.rows.length === 0) {
        res.status(429).json({
          message: "You must wait at least 1 minute between purchases.",
        });
        return;
      }

      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error("Error creating sale:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default new SalesRoutes().router;
