import NextAuth, { NextAuthOptions } from "next-auth";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prismadb from "@/app/libs/prismadb";
import { authOptions } from "@/app/utils/authOptions";

// export const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(prismadb),
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID as string,
//       clientSecret: process.env.GITHUB_SECRET as string,
//     }),

//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),

//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         email: { label: "email", type: "text" },
//         password: { label: "password", type: "password" },
//       },
//       async authorize(credentials, req) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Invalid Credentials");
//         }

//         const user = await prismadb.user.findUnique({
//           where: {
//             email: credentials.email,
//           },
//         });

//         if (!user || !user?.hashedPassword) {
//           throw new Error("Invalid Credentials");
//         }
//         const isCorrectPassword = await bcrypt.compare(
//           credentials.password,
//           user.hashedPassword
//         );

//         if (!isCorrectPassword) {
//           throw new Error("Invalid Credentials");
//         }
//         return user;
//       },
//     }),
//   ],
//   debug: process.env.NODE_ENV === "development",
//   session: { strategy: "jwt" },
//   secret: process.env.NEXTAUTH_NEXTAUTH_SECRET,
// };

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
