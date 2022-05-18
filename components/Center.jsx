import { ChevronDownIcon } from "@heroicons/react/outline";
import Songs from "../components/Songs";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {shuffle} from "lodash";
import { useRecoilState } from "recoil";
import { playlistIdState, playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";

const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500"
];

const Center = () => {
    const {data: session} = useSession();
    const [color, setColor] = useState(null);
    const spotifyApi = useSpotify();
    const [playlistId, setplaylistId] = useRecoilState(playlistIdState);

    const [playlist,setplaylist] = useRecoilState(playlistState);
    useEffect(()=>{
        setColor(shuffle(colors).pop())
    },[playlistId]);
    useEffect(()=>{
        spotifyApi.getPlaylist(playlistId).then((data) => {
            setplaylist(data.body);
            // alert("aqui")
        }).catch((e) => {
            console.log(e);
        })
    },[playlistId,spotifyApi]);


    return (
        <div className="flex-grow h-screen overflow-y-scroll scrollbar-hide">
            <header className="absolute top-5 right-8">
                <div className="flex items-center 
                bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer
                rounded-full p-1 pr-2 text-white "
                onClick={()=> signOut()}>
        
                    <img className="rounded-full w-10 h-10"
                     src={session?.user.image} alt="" />
                     <h2>
                         {session?.user.name}
                     </h2>
                     <ChevronDownIcon className="h-5 w-5 text-white"/>
                </div>
            </header>

            <session className={`flex items-end space-x-7 bg-gradient-to-b
            to-black ${color} h-80 p-8 text-white`}>
                <img
                className="h-44 w-44 shadow-2xl"
                src={playlist?.images?.[0]?.url} alt=" " />
                <div>
                    <p>PLAYLIST</p>
                    <h1 className="text-2xl md:tex-3xl xl:text-5xl font-bold ">{playlist?.name}</h1>
                </div>
            </session>
            <div className="text-white">
                <Songs/>
            </div>
        </div>
    );
}
export default Center;