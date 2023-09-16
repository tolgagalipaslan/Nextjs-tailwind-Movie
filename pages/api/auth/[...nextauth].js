import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        await dbConnect();

        const isExistUser = await User.findOne({ email: credentials?.email });

        if (credentials?.type === "register") {
          if (
            !credentials?.username ||
            !credentials?.email ||
            !credentials?.password
          ) {
            throw Error("Please fill all the form!");
          }
          if (isExistUser) {
            throw Error(
              "This email has already been used outside of the Google login."
            );
          }
          let salt = bcrypt.genSaltSync(10);
          let hashedPassword = bcrypt.hashSync(credentials?.password, salt);

          const user = new User({
            avatar: { url: "/assets/default-pp.jpg", public_id: "default" },
            email: credentials?.email,
            provider: "custom",
            username: credentials?.username,
            password: hashedPassword,
          });
          const newUser = await user.save();
          return {
            image: newUser?.avatar?.url,
            username: newUser?.username,
            email: newUser?.email,
            id: newUser?._id,
          };
        } else if (credentials?.type === "login") {
          if (!credentials?.email || !credentials?.password) {
            throw Error("Please fill all the form!");
          }

          if (!isExistUser) {
            throw Error("Email or password false");
          }

          if (
            bcrypt.compareSync(credentials?.password, isExistUser?.password)
          ) {
            return {
              image: isExistUser?.avatar?.url,
              username: isExistUser?.username,
              email: isExistUser?.email,
              id: isExistUser?._id,
            };
          }
          throw Error("Email or password false");
        }

        if (isExistUser) {
          if (isExistUser?.provider === "custom") {
            return {
              image: isExistUser?.avatar?.url,
              username: isExistUser?.username,
              email: isExistUser?.email,
              id: isExistUser?._id,
            };
          } else {
            throw Error(
              "This email has already been used outside of the Google login."
            );
          }
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
      async profile(profile) {
        await dbConnect();

        const isExistUser = await User.findOne({ email: profile?.email });
        if (isExistUser) {
          if (isExistUser?.provider === "google") {
            return {
              image: isExistUser?.avatar?.url,
              username: isExistUser?.username,
              email: isExistUser?.email,
              id: isExistUser?._id,
            };
          } else {
            throw Error(
              "This email has already been used outside of the Google login."
            );
          }
        } else {
          const user = new User({
            avatar: {
              url: profile?.picture || "/assets/default-pp.jpg",
              public_id: "google-image",
            },
            email: profile?.email,
            provider: "google",
            username: profile?.name,
          });
          const newUser = await user.save();
          return {
            image: newUser?.avatar?.url,
            username: newUser?.username,
            email: newUser?.email,
            id: newUser?._id,
          };
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn(user, account, profile) {
      // Özel oturum açma işlemlerinizi burada yapabilirsiniz

      return true;
    },
  },
  session: {
    jwt: true,
  },
};

export default NextAuth(authOptions);
