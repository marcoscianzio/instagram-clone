import { Request, Response } from "express";
import { Session } from "express-session";
import { Redis } from "ioredis";
import { User } from "./entity/user";

export type MyContext = {
  req: Request & {
    session: Session & { userId?: number; user?: User };
  };
  res: Response;
  redis: Redis;
};
