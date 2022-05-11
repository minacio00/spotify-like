import {HeartIcon, HomeIcon, LibraryIcon, PlusIcon, RssIcon, SearchIcon} from "@heroicons/react/outline"
function Sidebar() {
    return(
        <div className="text-gray-500 p-5 text-sm border-r border-gray-900">
            <div className="space-y-2">
                <button className="flex items-center space-x-2 hover:text-white">
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
                <p className="cursor-pointer hover:text-white space-y-2">Playlist</p>
                <p className="cursor-pointer hover:text-white space-y-2">Playlist</p>
                <p className="cursor-pointer hover:text-white space-y-2">Playlist</p>
                <p className="cursor-pointer hover:text-white space-y-2">Playlist</p>
            </div>
        </div>
    );
}
export default Sidebar;