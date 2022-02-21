import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import session from "express-session";
import Redis from "ioredis";
import cors from "cors";
import { Context } from "./types";
import { buildSchema } from "type-graphql";
import { withGithub } from "./utils/github";

const main = async () => {
  await createConnection()
    .catch((e) => console.log(e))
    .then(() => console.log("connection success"));

  const app = express();

  const RedisStore = connectRedis(session);
  const client = new Redis();

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
      store: new RedisStore({ client, disableTouch: true }),
      cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 100 * 60 * 60 * 24 * 1000,
      },
      saveUninitialized: false,
      secret: "oiteroietrioweuiowqhwqhsdhjksndfnsd",
      resave: false,
    })
  );

  await withGithub(app);

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      validate: false,
      resolvers: [__dirname + "/resolver/**/*.js"],
    }),
    context: ({ req, res }): Context => ({ req, res }),
  });

  await apolloServer
    .start()
    .catch((e) => {
      console.log(e);
    })
    .then(() => {
      console.log("apollo server running");
    });

  apolloServer.applyMiddleware({
    app,
    path: "/",
    cors: false,
  });

  const port = (process.env.port as any) || 4000;
  app.listen(port, () => {
    console.log("listening on port " + port);
  });
};

main().catch((e) => console.log(e));
