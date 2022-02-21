require("dotenv").config();
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { User } from "../entity/user.entity";

export const withGithub = async (app: any) => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENTID!,
        clientSecret: "44aeb9318a58db7ccd0014b3918db047d453b5ca",
        callbackURL: "http://localhost:4000/oauth/github",
        scope: ["user:email"],
      },
      async (accessToken: any, refreshToken: any, profile: any, done: any) => {
        let user = await User.findOne({
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
          user = await User.create({
            githubId: profile.id,
            email: profile.emails[0].value,
            displayName: profile.displayName,
          }).save();
        }

        done(null, { user, refreshToken, accessToken });
      }
    )
  );

  app.get(
    "/auth/github",
    passport.authenticate("github", { scope: ["user:email"], session: false })
  );

  app.get(
    "/oauth/github",
    passport.authenticate("github", { session: false }),
    (req: any, res: any) => {
      //@ts-ignore
      req.session.userId = req.user.user.id;

      res.redirect("http://localhost:3000/");
    }
  );
};
