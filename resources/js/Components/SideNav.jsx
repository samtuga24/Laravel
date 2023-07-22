import React, { useState } from 'react'
import { faHome, faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { faUser, faEnvelope, faBell } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import axios from 'axios';
export const SideNav = (props) => {
    let followingCount = props.followingCount
    let followerCount = props.followerCount
    const parsedData = usePage().props;
    const [userProfile, setUserProfile] = useState({});
    const [home, setHome] = useState(true);
    const [profile, setProfile] = useState(false);
    const [message, setMessage] = useState(false);
    const [notification, setNotification] = useState(false);
    const [setting, setSetting] = useState(false);
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


    console.log(parsedData.auth.user.profile.image)
    return (
        <div className='side-nav-wrap'>
            <div className='nav-user-profile'>
                <div className='nav-profile-image'><img src={(parsedData.auth.user.profile.image) ? "/storage/"+parsedData.auth.user.profile.image : "/storage/profile/blank.svg"} alt="" className='rounded-circle' /></div>
                <div className='nav-profile-name'>{parsedData.auth.user.profile.name}</div>
                <div className='nav-profile-handle'>@{parsedData.auth.user.profile.username}</div>
                <div className='nav-profile-following'>
                    <div className='following'><span style={{ fontWeight: '700', marginRight: '0.2vw' }}>100</span>Following</div>
                    <div className='following'><span style={{ fontWeight: '700', marginRight: '0.2vw' }}>100</span>Following</div>
                </div>
            </div>
            <div className='side-wrap'>
                <Link href='/dashboard' className='links'><div className='side-nav-list' onClick={homeClick} id={home ? 'nav-color' : null}><FontAwesomeIcon icon={faHome} /><span className='nav-label'>Home</span></div></Link>
                <Link href={`/profile/${parsedData.auth.user.id}`} className='links'><div className='side-nav-list' onClick={profileClick} id={profile ? 'nav-color' : null}><FontAwesomeIcon icon={faUser} /><span className='nav-label'>Profile</span></div></Link>

                {/* <div className='side-nav-list' onClick={messageClick} id={message ? 'nav-color' : null}><FontAwesomeIcon icon={faEnvelope} /><span className='nav-label'>Message</span></div> */}
                <div className='side-nav-list' onClick={notificationClick} id={notification ? 'nav-color' : null}><FontAwesomeIcon icon={faBell} /><span className='nav-label'>Notification</span></div>
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
