"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const apollo_server_express_1 = require("apollo-server-express");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const type_graphql_1 = require("type-graphql");
const connect_redis_1 = __importDefault(require("connect-redis"));
const ioredis_1 = __importDefault(require("ioredis"));
const express_session_1 = __importDefault(require("express-session"));
const User_1 = require("./resolver/User");
const Post_1 = require("./resolver/Post");
const main = async () => {
    await typeorm_1.createConnection();
    const app = express_1.default();
    const RedisStore = connect_redis_1.default(express_session_1.default);
    const redis = new ioredis_1.default();
    app.set("trust proxy", true);
    app.use(cors_1.default({
        credentials: true,
        origin: ["https://studio.apollographql.com", "http://localhost:3000"],
    }));
    app.use(express_session_1.default({
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
    }));
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await type_graphql_1.buildSchema({
            resolvers: [User_1.UserResolver, Post_1.PostResolver],
            validate: false,
        }),
        context: ({ req, res }) => ({
            req,
            res,
            redis,
        }),
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
//# sourceMappingURL=index.js.map