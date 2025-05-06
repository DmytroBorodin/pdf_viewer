import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    // add the property you want on `session`
    accessToken?: string;
  }

  interface User extends DefaultUser {
    // if you also want to type `user.accessToken` at sign-in
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultSession {
    // make sure your token can carry the accessToken too
    accessToken?: string;
  }
}
