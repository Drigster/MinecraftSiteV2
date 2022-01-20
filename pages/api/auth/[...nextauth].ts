import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { compare } from 'bcrypt';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
	      const user = await prisma.user.findUnique({ 
	        where: { 
            username: credentials.username 
          },
          include: { 
            userInfo: { 
              select: { 
                regDate: true, 
                lastPlayed: true 
              } 
            },
            skin: true
          }
        })
        if (user) {
          if(await compare(credentials.password, user.password)) {
            return {
              id: user.id,
              name: user.username,
              email: user.email,
              verified: user.verified,
              userInfo: user.userInfo,
              skin: user.skin
            };
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.data = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if(token){
        session.user = token.data;
      }
      
      return session;
    },
  },
  secret: process.env.SECRET,
  jwt: {
    secret: process.env.JWT_SECRET
  },
	session: {
		strategy: "jwt"
	}
});
