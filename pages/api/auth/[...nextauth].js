import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signIn } from "next-auth/react";
import bcrypt from "bcryptjs"
import User from "../../../models/User";
import dbConnect from "../../../util/dbConnect";
import { toast } from "react-toastify";
dbConnect()

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
    },
    async authorize(credentials, req) {

        const email = credentials.email
        const password = credentials.password
        const user = await User.findOne({email: email})

        if(!user) {
            throw new Error("Kullanıcı Bulunamadı")
        }

        if (user) {
        return signInUser({user, password});
        } else {
        return null;
        }
    },
    }),
  ],
  pages: { signIn: "oturum/giris"},
  database: process.env.MONGODB_URI,
  secret: "secret"
  
});

const signInUser = async ({user, password}) => {
    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new Error("Şifre Yanlış!")
        toast.error("Şifre Yanlış!")
    }

    return user;
}