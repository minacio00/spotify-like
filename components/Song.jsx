import { useRecoilState } from "recoil";
import {currentTrackIdState, isPlayingState} from "../atoms/songAtom";
import useSpotify from "../hooks/useSpotify";
import {millisToMinutesAndSeconds} from "../lib/time";

const Song = ({order, track})=> {
    const spotifyApi = useSpotify();
    const [currentTrackId, setcurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setisPlaying] = useRecoilState(isPlayingState);
    

    const playSong = () => {

        setcurrentTrackId(track.track.id);
        setisPlaying(true);
        spotifyApi.play({
          uris: [track.track.uri],
        }).then((res) => {
            
        }).catch((e) =>{ 
            alert(e + "\n You should open a spotify instance in a device")
        });
      };
        return (
            <div className="grid grid-cols-2 text-gray-500 hover:bg-gray-900 rounded-lg cursor-pointer" >
                <div className="flex items-center space-x-4"
                onClick={playSong}>
                    <p>{order+1}</p>
                    <img className="h-10 w-10"
                    src={track.track.album.images[0].url} alt="" />
                    <div>
                        <p className="w-36 lg:w-64 truncate text-white">{track.track.name}</p>
                        <p>{track.track.artists[0].name}</p>
                    </div>
                </div>
                <div className="flex items-center justify-between ml-auto md:ml-0">
                    <p className="hidden md:inline">{track.track.album.name}</p>
                    <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
                </div>
                
            </div>
        )
}

export default Song;