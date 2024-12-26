import cors from "cors";
import express, { Application } from "express";
import pool from "./db";
import SalesRoutes from "./routes/sales.routes";

class Server {
  public app: Application;
  private port: number;

  constructor(port: number) {
    this.app = express();
    this.app.use(cors());
    this.port = port;
    this.config();
    this.routes();
    this.testDBConnection();
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  private routes(): void {
    this.app.use("/api/sales", SalesRoutes);
  }

  private async testDBConnection(): Promise<void> {
    try {
      const result = await pool.query("SELECT NOW()");
      console.log("Database connected:", result.rows[0].now);
    } catch (error) {
      console.error("Database connection failed:", error);
    }
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}

export default Server;
