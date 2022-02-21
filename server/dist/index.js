"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const connect_redis_1 = __importDefault(require("connect-redis"));
const express_session_1 = __importDefault(require("express-session"));
const ioredis_1 = __importDefault(require("ioredis"));
const cors_1 = __importDefault(require("cors"));
const type_graphql_1 = require("type-graphql");
const github_1 = require("./utils/github");
const main = async () => {
    await (0, typeorm_1.createConnection)()
        .catch((e) => console.log(e))
        .then(() => console.log("connection success"));
    const app = (0, express_1.default)();
    const RedisStore = (0, connect_redis_1.default)(express_session_1.default);
    const client = new ioredis_1.default();
    app.set("trust proxy", true);
    app.use((0, cors_1.default)({
        credentials: true,
        origin: ["https://studio.apollographql.com", "http://localhost:3000"],
    }));
    app.use((0, express_session_1.default)({
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
    }));
    await (0, github_1.withGithub)(app);
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            validate: false,
            resolvers: [__dirname + "/resolver/**/*.js"],
        }),
        context: ({ req, res }) => ({ req, res }),
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
    const port = process.env.port || 4000;
    app.listen(port, () => {
        console.log("listening on port " + port);
    });
};
main().catch((e) => console.log(e));
//# sourceMappingURL=index.js.map