import { PrismaAdapter } from "@auth/prisma-adapter";
import { UserRole } from "@prisma/client";
import NextAuth from "next-auth";
import { getUserById } from "./data/user";
import { db } from "./lib/db";
import authConfig from "./auth.config";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() },
            });
        },
    },
    callbacks: {
        // async signIn({ user }) {
        //     const existingUser = await getUserById(user.id as string);
        //     if (!existingUser || !existingUser?.emailVerified) {
        //         return false;
        //     }
        //     return true;
        // },
        async session({ token, session }) {
            if (session.user && token.sub) {
                session.user.id = token.sub;
            }
            if (session.user && token.role) {
                session.user.role = token.role as UserRole;
            }
            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);
            if (!existingUser) return token;

            token.role = existingUser.role;
            return token;
        },
    },
    // @ts-ignore
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});
