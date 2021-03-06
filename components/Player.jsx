import useSpotify from "../hooks/useSpotify";
import { VolumeUpIcon as VolumeDownIcon } from '@heroicons/react/outline';
import { useSession } from "next-auth/react";
import {
    VolumeUpIcon,
    PauseIcon,
    PlayIcon,
    ReplyIcon,
  } from '@heroicons/react/solid';
import { useCallback, useEffect, useState } from "react";
import { atomFamily, useRecoilState } from "recoil";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import { RewindIcon, SwitchHorizontalIcon,FastForwardIcon } from "@heroicons/react/outline";
import {debounce} from "lodash"


const Player = () => {
    const spotifyApi = useSpotify();
    const {data: session, status} =  useSession();
    const [currentTrackId, setcurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setisPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = useState(50);

    const songInfo = useSongInfo();
    const fetchCurrentSong = () => {
        spotifyApi.getMyCurrentPlayingTrack().then((data) => {
            console.log("now playing", data.body?.name);
            setcurrentTrackId(data.body?.item.id);

            spotifyApi.getMyCurrentPlaybackState().then((data) => {
                setisPlaying(data.body?.isPlaying);
            })


        })
    }


    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
          if (data.body?.is_playing) {
            spotifyApi.pause();
            setisPlaying(false);
          } else {
            spotifyApi.play();
            setisPlaying(true);
          }
        });
      };


    useEffect(() => {
        if (spotifyApi.getAccessToken() &&  !currentTrackId){
            fetchCurrentSong();
            setVolume(50);
        }
    },[currentTrackIdState, spotifyApi, session])

    useEffect(() => {
      if (volume > 0 && volume < 100){
          debouncedAdjustVolume(volume);
      }
    }, [volume]);

    const debouncedAdjustVolume = useCallback(
        debounce((volume) => spotifyApi.setVolume(volume).catch((e) => {
            
        }),500), []);
    

    return(
        <div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3
         text-xs md:text-base px-2 md:px-8">
            
            <div className="flex items-center space-x-4 ">
                <img
                    className="hidden md:inline h-10 w-10"
                    src={songInfo?.album.images?.[0].url} alt="" 
                />

                <div>
                    <h3>{songInfo?.name}</h3>
                    <p>{songInfo?.artists?.[0]?.name}</p>
                </div>
            </div>
            
            <div className="flex items-center justify-evenly">
                <SwitchHorizontalIcon className="button"/>
                <RewindIcon
                // onClick={() => spotifyApi.skipToPrevious() // this used to be broken on spotify's side, it may break again 
                // }
                className= "button"/>

                {isPlaying ? (
                    <PauseIcon onClick={handlePlayPause} className="button w-10 h-10"/>): (
                        <PlayIcon onClick={handlePlayPause} className="button w-10 h-10" />
                    )
                }

                <FastForwardIcon className="button"
                // onClick={() => spotifyApi.skipToNext()}
                />
                <ReplyIcon className="button w-4"/>

            </div>
            <div className="flex items-center space-x-3 md:space-x-4 justify-end pr-5">
                <VolumeDownIcon className="button"
                onClick={() => volume > 0 && setVolume(volume-10)} />
                <input className="w-14 md:w-28" type="range"  min={0} max={100}
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                />
                <VolumeUpIcon onClick={() => volume < 100 && setVolume(volume+10)} className="button"/>
            </div>

        </div>
    )

}
export default Player;