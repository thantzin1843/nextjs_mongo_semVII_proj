import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";
import UserModel from "./models/UserModel";
import { connectToDB } from "./lib/db";


export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    session: {
      strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                if (credentials === null) return null;
                
                try {
                    await connectToDB();
                    const user = await UserModel.findOne({email: credentials.email})
                    console.log(user);
                    if (user) {
                        const isMatch = await bcrypt.compare(
                            credentials.password,
                            user.password
                        );

                        if (isMatch) {
                            return user;
                        } else {
                            throw new Error("Email or Password is not correct");
                        }
                    } else {
                        throw new Error("User not found");
                    }
                } catch (error) {
                    throw new Error(error);
                }
            },
        }),
        
        
    ],
      callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role; // Add role to JWT token
                // token._id = user._id;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.role = token.role; // Add role to the session
            // session.user._id = token._id; // Add user id to the session
            return session;
        },
        },
      
});