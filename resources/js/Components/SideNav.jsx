import React, { useState } from 'react'
import { faHome, faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faUser, faEnvelope, faBell } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import axios from 'axios';
import { Message } from './Message';
import { useContext } from 'react';
import ProfileContext from '@/context/ProfileContext';
export const SideNav = (props) => {
    const auth_user = usePage().props.auth;
    const [details, setDetails] = useState([]);
    const [user_profile, setUser] = useState([]);
    const [following, setFollowing] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [notify_count, setCount] = useState([]);
    const [userProfile, setUserProfile] = useState({});
    const {dash, setDash, auth_profile, setProfile, notification, setNotification, setting, setSetting, authenticated, setAuthenticated} = useContext(ProfileContext);

    useEffect(() => {
        axios.get(`/dashboard/${auth_user.user.id}`)
            .then((response) => {
                setDetails(response.data[0])
                setUser(response.data[0].profile)
                setFollowing(response.data[0].following)
                setFollowers(response.data[0].profile.followers)
                setAuthenticated(response.data[0].following)
            })
            .catch((error) => console.log(error))
    }, [])

    const homeClick = () => {
        setDash(true)
        setProfile(false)
        setNotification(false)
        setSetting(false)
    }

    const profileClick = () => {
        setDash(false)
        setProfile(false)
        setNotification(false)
        setSetting(false)
    }
    const notificationClick = () => {
        setDash(false)
        setProfile(false)
        setNotification(true)
        setSetting(false)
    }

    if(notification){
        axios.patch('/unread').then((response)=>{
        }).catch((error)=>{
            console.log(error)
        })
    }

    const settingsClick = () => {
        setDash(false)
        setProfile(false)
        setNotification(false)
        setSetting(true)
    }

    let followEach = [];
    followers.map((follower_item, index) => {
        following.map((following_item, item) => {
            if (follower_item.id === following_item.user_id) {
                followEach.push(follower_item);
            }
        })
    })

    useEffect(()=>{
        axios.get('/unread/notification')
            .then((response)=>{setCount(response.data)})
            .catch((error)=>{console.log(error)})
    },[notify_count])

    return (
        <div className='side-nav-wrap'>
            <div className='nav-user-profile'>
                <div className='nav-profile-image'><img src={(user_profile.image) ? "/storage/" + user_profile.image : "/storage/profile/blank.svg"} alt="" className='rounded-circle' /></div>
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
                <Link href='/dashboard' className='links'><div className='side-nav-list' onClick={homeClick} id={dash ? 'nav-color' : null}><FontAwesomeIcon icon={faHome} /><span className='nav-label'>Home</span></div></Link>
                <Link href={`/profile/${details.id}`} className='links'><div className='side-nav-list' onClick={profileClick} id={auth_profile ? 'nav-color' : null}><FontAwesomeIcon icon={faUser} /><span className='nav-label'>Profile</span></div></Link>
                <Link href='/notification' className='links'>
                    <div className='side-nav-list' onClick={notificationClick} id={notification ? 'nav-color' : null}>
                        <FontAwesomeIcon icon={faBell} />
                        <span className='nav-label'>Notification</span>
                        {notify_count.length > 0 &&<span className='notification-count'>{notify_count.length}</span>}
                    </div>
                </Link>
                <Link href={route('profile.edit')} className='links'>
                    <div className='side-nav-list' onClick={settingsClick} id={setting ? 'nav-color' : null}><FontAwesomeIcon icon={faGear} /><span className='nav-label'>Setting and privacy</span></div>
                </Link>
                <Link method="post" href={route('logout')} className='links'>
                    <div className='side-nav-list'><FontAwesomeIcon icon={faRightFromBracket} /><span className='nav-label'>Logout</span></div>
                </Link>
            </div>
        </div>
    )
}
