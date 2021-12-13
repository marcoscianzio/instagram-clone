import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import { buildSchema } from "type-graphql";
import connectRedis from "connect-redis";
import { MyContext } from "./types";
import Redis from "ioredis";
import session from "express-session";
import { UserResolver } from "./resolver/User";

const main = async () => {
  await createConnection();

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.set("trust proxy", true);

  app.use(
    cors({
      credentials: true,
      origin: ["https://studio.apollographql.com", "http://localhost:3000"],
    })
  );

  app.use(
    session({
      name: "qid",
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      },
      saveUninitialized: false,
      secret: "wejwqequuropñgmbvccxsise",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ req, res, redis }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    path: "/api",
    app,
    cors: false,
  });

  const port = 4000 || process.env.port;
  app.listen(port, () => {
    console.log("Server started on " + port);
  });
};

main();
