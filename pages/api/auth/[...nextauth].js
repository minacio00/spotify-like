import NextAuth from "next-auth"
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi ,{LOGIN_URL} from "../../../lib/spotify"

async function refreshAccessToken(token){
    try {
        spotifyApi.setAccessToken(token.accessToken);
        spotifyApi.setAccessToken(token.refreshToken);
        const {body: refreshedToken} = await spotifyApi.refreshAccessToken();
        console.log("REFRESHED TOKEN IS", refreshedToken);

        return{
            ...token,
            accessToken: refreshedToken.access_Token,
            accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
            refreshToken: refreshedToken.refresh_token ?? token.refreshToken
        }
    } catch (e) {
        console.log(e);
        return {
            ...token,
            error: "RefreshAcessTokenError"
        }
    }
}
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
      signIn: '/login'
  },
  callbacks: {
      async jwt ({token, account, user}){
          if (account && user){
              return {
                ...token,
                accessToken: account.access_token,
                refreshToken: account.refresh_token,
                username: account.providerAccountId,
                accessTokenExpires: account.expires_at * 1000 // tempo em milisegundos
              }
          }

          if(Date.now() < token.accessTokenExpires){ //caso o token ainda nao tenha expirado, retorna o token antigo
            return token;
          }
          console.log("token expirado");
          return await refreshAccessToken(token);

      },
      //continuar aqui
      async session({session, token}){
        session.user.accessToken = token.accessToken; 
        session.user.refreshToken = token.refreshToken;
        session.user.username = token.username;

        return session;
      }
  }
})