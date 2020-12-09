import express from "express";
import cors from "cors";
import helmet from "helmet";

import { routes } from "./routes";

const server = express();

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use(routes);

server.listen(3333, () => console.log("Server Started"));
