import dotenv from "dotenv";

dotenv.config();


import Server from "./src/server";
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;
const server = new Server(port);
server.start();
