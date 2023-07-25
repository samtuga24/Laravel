import { Followers } from "@/Components/Followers";
import { Message } from "@/Components/Message";
import { SearchMessage } from "@/Components/SearchMessage";
import { SideNav } from "@/Components/SideNav";

export default function FollowersPage({user,followers,following}) {
    // console.log("user",user)
    // console.log("profile", profile)
    // console.log("following",following)
    return(
        <div className='dash-wrap'>
            <div className='side-nav'><SideNav /></div>
            <div className='home'><Followers user={user} followers={followers} following={following}/></div>
            <div className='search-message'><SearchMessage /></div>
            {/* <Message profile={profile} /> */}
        </div>
    );
}