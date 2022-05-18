import {HeartIcon, HomeIcon, LibraryIcon, PlusIcon, RssIcon, SearchIcon} from "@heroicons/react/outline"
import { useSession, signOut, getSession} from "next-auth/react";
import { useState, useEffect } from "react";
import useSpotify from "../hooks/useSpotify";
import { useRecoilState } from "recoil";
import {playlistIdState} from "../atoms/playlistAtom";

function Sidebar() {
    const {data: session, status} =  useSession();
    const spotifyApi = useSpotify();
    spotifyApi.setAccessToken(session.user.accessToken)
    const [playlists, setplaylist] = useState([]);
    const [playlistId, setplaylistId] = useRecoilState(playlistIdState);
  
    useEffect(() => {
      if(spotifyApi.getAccessToken()) {
          spotifyApi.getUserPlaylists(session).then((data) => {
              setplaylist(data.body.items);
            //   console.log(data, "teste");
          })
      }
    }, [session,spotifyApi])

    // console.log("playlisId", playlistId);
    return(
        <div className="text-gray-500
        hidden md:inline-flex
        p-5 text-xs
        lg:text-sm
        sm:max-w-[12rem]
        lg:max-w[15rem] border-r border-gray-900
        overflow-y-scroll h-screen scrollbar-hide pb-36">
            <div className="space-y-2">
                <button className="flex items-center space-x-2 hover:text-white ">
                    <HomeIcon className="h-5 w-5"/>
                    <p>Home</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <SearchIcon className="h-5 w-5"/>
                    <p>Search</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <LibraryIcon className="h-5 w-5"/>
                    <p>Library</p>
                </button>
                <hr className="border-t-[0.1px] border-gray-900" />
                <button className="flex items-center space-x-2 hover:text-white">
                    <PlusIcon className="h-5 w-5"/>
                    <p>Create playlist</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <HeartIcon className="h-5 w-5"/>
                    <p>Liked songs</p>
                </button>
                <button className="flex items-center space-x-2 hover:text-white">
                    <RssIcon className="h-5 w-5"/>
                    <p>your episodes</p>
                </button>
                <hr className="border-t-[0.1px] border-gray-900" />

                {playlists.map((lst) => (
                    <p
                    key={lst.id}
                    onClick={()=> {setplaylistId(lst.id)}}
                    className="cursor-pointer hover:text-white space-y-2">{lst.name}</p>
                ))}
                <p className="cursor-pointer hover:text-white space-y-2">Playlist</p>
            </div>
        </div>
    );
}
export default Sidebar;
Sidebar.auth = true;