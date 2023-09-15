import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
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
            avatar: { url: profile?.picture, public_id: "google-image" },
            email: profile?.email,
            provider: "google",
            username: profile?.name,
          });
          const newUser = await user.save();
          return {
            image: newUser?.image,
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
