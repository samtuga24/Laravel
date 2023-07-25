import React, { useState } from 'react'
import { faHome, faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faUser, faEnvelope, faBell } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import axios from 'axios';
import { Message } from './Message';
export const SideNav = (props) => {
    const auth_user = usePage().props.auth;
    const [details, setDetails] = useState([]);
    const [user_profile, setUser] = useState([]);
    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [userProfile, setUserProfile] = useState({});

    const [home, setHome] = useState(true);
    const [profile, setProfile] = useState(false);
    const [message, setMessage] = useState(false);
    const [notification, setNotification] = useState(false);
    const [setting, setSetting] = useState(false);

    useEffect(() => {
        axios.get(`/dashboard/${auth_user.user.id}`)
            .then((response) => {
                setDetails(response.data[0])
                setUser(response.data[0].profile)
                setFollowing(response.data[0].following)
                setFollowers(response.data[0].profile.followers)
            })
            .catch((error) => console.log(error))
    }, [])

    console.log(user_profile)
    console.log(details)

    const homeClick = () => {
        setHome(true)
        setProfile(false)
        setMessage(false)
        setNotification(false)
        setSetting(false)
    }

    const profileClick = () => {
        setHome(false)
        setProfile(true)
        setMessage(false)
        setNotification(false)
        setSetting(false)
    }

    const messageClick = () => {
        setHome(false)
        setProfile(false)
        setMessage(true)
        setNotification(false)
        setSetting(false)
    }

    const notificationClick = () => {
        setHome(false)
        setProfile(false)
        setMessage(false)
        setNotification(true)
        setSetting(false)
    }

    const settingsClick = () => {
        setHome(false)
        setProfile(false)
        setMessage(false)
        setNotification(false)
        setSetting(true)
    }

    let followEach = [];
    followers.map((follower_item,index)=>{
        following.map((following_item, item)=>{
            if(follower_item.id===following_item.user_id){
                followEach.push(follower_item);
            }
        })
    })

    return (
        <div className='side-nav-wrap'>
            <div className='nav-user-profile'>
                <div className='nav-profile-image'><img src={(user_profile.image)? "/storage/"+user_profile.image : "/storage/profile/blank.svg"} alt="" className='rounded-circle' /></div>
                <div className='nav-profile-name'>{user_profile.name}</div>
                <div className='nav-profile-handle'>@{user_profile.username}</div>
                <div className='nav-profile-following'>
                    <div className='following'>
                        <Link href={`/followers/${details.id}`} className='links'>
                            <span style={{ fontWeight: '700', marginRight: '0.2vw' }}>{following.length}</span>Following
                        </Link>
                    </div>
                    <div className='following'><span style={{ fontWeight: '700', marginRight: '0.2vw' }}>{followers.length}</span>Followers</div>
                </div>
            </div>
            <div className='side-wrap'>
                <Link href='/dashboard' className='links'><div className='side-nav-list' onClick={homeClick} id={home ? 'nav-color' : null}><FontAwesomeIcon icon={faHome} /><span className='nav-label'>Home</span></div></Link>
                <Link href={`/profile/${details.id}`} className='links'><div className='side-nav-list' onClick={profileClick} id={profile ? 'nav-color' : null}><FontAwesomeIcon icon={faUser} /><span className='nav-label'>Profile</span></div></Link>
                <div className='side-nav-list' onClick={notificationClick} id={notification ? 'nav-color' : null}><FontAwesomeIcon icon={faBell} /><span className='nav-label'>Notification</span></div>
                <Link href={route('profile.edit')} className='links'>
                    <div className='side-nav-list' onClick={settingsClick} id={setting ? 'nav-color' : null}><FontAwesomeIcon icon={faGear} /><span className='nav-label'>Setting and privacy</span></div>
                </Link>
                <Link method="post" href={route('logout')} className='links'>
                    <div className='side-nav-list'><FontAwesomeIcon icon={faRightFromBracket} /><span className='nav-label'>Logout</span></div>
                </Link>
            </div>
            <Message/>
        </div>
    )
}
