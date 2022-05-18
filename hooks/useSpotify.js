import { useEffect } from "react";
import {signIn, useSession} from "next-auth/react";
// import SpotifyWebApi from "spotify-web-api-node";
import spotifyApi from "../lib/spotify"

// const spotifyApi = new SpotifyWebApi({
//     clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
//     clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
//     redirectUri: process.env.REDIRECT_URI
// });

 function useSpotify() {
    const {data: session} = useSession();

    useEffect(() => {
        if (session) {
            console.log("AQUI")
            //caso o token falhe, redireciona o usuario para login
            if(session.error === "RefreshAccessTokenError"){
                signIn();
            }
            console.log(session.user.accessToken,"usespotify \n ")
            spotifyApi.setAccessToken(session.user.accessToken);
        }
    },[session])
     return spotifyApi;
}

export default useSpotify;