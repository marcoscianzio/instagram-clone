"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withGithub = void 0;
require("dotenv").config();
const passport_1 = __importDefault(require("passport"));
const passport_github2_1 = require("passport-github2");
const user_entity_1 = require("../entity/user.entity");
const withGithub = async (app) => {
    passport_1.default.use(new passport_github2_1.Strategy({
        clientID: process.env.GITHUB_CLIENTID,
        clientSecret: "44aeb9318a58db7ccd0014b3918db047d453b5ca",
        callbackURL: "http://localhost:4000/oauth/github",
        scope: ["user:email"],
    }, async (accessToken, refreshToken, profile, done) => {
        let user = await user_entity_1.User.findOne({
            where: [
                {
                    githubId: profile.id,
                },
                {
                    email: profile.emails[0].value,
                },
            ],
        });
        if (!user) {
            user = await user_entity_1.User.create({
                githubId: profile.id,
                email: profile.emails[0].value,
                displayName: profile.displayName,
            }).save();
        }
        done(null, { user, refreshToken, accessToken });
    }));
    app.get("/auth/github", passport_1.default.authenticate("github", { scope: ["user:email"], session: false }));
    app.get("/oauth/github", passport_1.default.authenticate("github", { session: false }), (req, res) => {
        req.session.userId = req.user.user.id;
        res.redirect("http://localhost:3000/");
    });
};
exports.withGithub = withGithub;
//# sourceMappingURL=github.js.map