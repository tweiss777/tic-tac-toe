import express, { Express, Request, Response, NextFunction, json } from "express";
import "dotenv/config";
import cors from "cors";
import http from 'http';
import { registerGameHandlers } from "./socket/game";
import { Socket, Server as SocketIOServer } from "socket.io";
const app: Express = express();
const port = process.env.PORT || 3000;

const server = http.createServer(app);


const socketIo = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ['GET', 'POST']
  }
})

app.use(cors());
app.use(json())


app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

socketIo.on('connection', (socket: Socket) => {
  registerGameHandlers(socketIo, socket)
})



server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
