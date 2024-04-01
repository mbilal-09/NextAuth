import User from "@/app/(models)/User";
import bcrypt from "bcrypt";

// Providers
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import AtlassianProvider from "next-auth/providers/atlassian";
import Auth0Provider from "next-auth/providers/auth0";
import DiscordProvider from "next-auth/providers/discord";
import DropboxProvider from "next-auth/providers/dropbox";
import FacebookProvider from "next-auth/providers/facebook";
import GitlabProvider from "next-auth/providers/gitlab";

export const options = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email Address:",
          type: "text",
          placeholder: "abc@gmail.com",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        try {
          const foundUser = await User.findOne({ email: credentials.email })
            .lean()
            .exec();

          if (foundUser) {
            console.log("Use exists");
            const match = await bcrypt.compare(
              credentials.password,
              foundUser.password
            );

            if (match) {
              console.log("password mashed");
              delete foundUser.password;

              foundUser["role"] = "Unverified Email";
              return foundUser;
            }
          }
        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
    GithubProvider({
      profile(profile) {
        console.log("Github Profile: ", profile);

        let userRole = "Github User";
        if (profile?.email == "bilalkhanshakir@gmail.com") {
          userRole = "admin";
        }

        return {
          ...profile,
          role: userRole,
        };
      },
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      profile(profile) {
        console.log("Google Profile: ", profile);

        let userRole = "Google User";
        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    AtlassianProvider({
      profile(profile) {
        console.log("AtLassian Profile: ", profile);

        let userRole = "Atlassian User";

        return {
          ...profile,
          role: userRole,
        };
      },
      clientId: process.env.ATLASSIAN_ID,
      clientSecret: process.env.ATLASSIAN_SECRET,
      authorization: {
        params: {
          scope:
            "write:jira-work read:jira-work read:jira-user offline_access read:me",
        },
      },
    }),
    Auth0Provider({
      profile(profile) {
        console.log("Auth0 Profile: ", profile);

        let userRole = "Auth0 User";

        return {
          ...profile,
          id: profile.sub,
          role: userRole,
        };
      },
      clientId: process.env.AUTH0_ID,
      clientSecret: process.env.AUTH0_SECRET,
      issuer: process.env.AUTH0_ISSUER,
    }),
    DiscordProvider({
      profile(profile) {
        console.log("Discord Profile: ", profile);

        let userRole = "Discord User";

        return {
          ...profile,
          role: userRole,
        };
      },
      clientId: process.env.DISCORD_ID,
      clientSecret: process.env.DISCORD_SECRET,
    }),
    DropboxProvider({
      profile(profile) {
        console.log("Dropbox Profile: ", profile);

        let userRole = "Dropbox User";

        return {
          ...profile,
          role: userRole,
        };
      },
      clientId: process.env.DROPBOX_ID,
      clientSecret: process.env.DROPBOX_SECRET,
    }),
    FacebookProvider({
      profile(profile) {
        console.log("Facebook Profile: ", profile);

        let userRole = "Facebook User";

        return {
          ...profile,
          role: userRole,
        };
      },
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    GitlabProvider({
      profile(profile) {
        console.log("Gitlab Profile: ", profile);

        let userRole = "Gitlab User";

        return {
          ...profile,
          role: userRole,
        };
      },
      clientId: process.env.GITLAB_ID,
      clientSecret: process.env.GITLAB_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;

      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;

      return session;
    },
  },
};
