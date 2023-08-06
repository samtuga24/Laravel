import { Message } from "@/Components/Message";
import { SearchMessage } from "@/Components/SearchMessage";
import { SideNav } from "@/Components/SideNav";
import ProfileContext from "@/context/ProfileContext";
import { faUser, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, usePage } from "@inertiajs/react";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
export default function Notification(props) {
    const user = usePage().props
    const [sender, setSender] = useState([]);
    const [content, setContent] = useState([]);
    const { dash, setDash, auth_profile, setProfile, notification, setNotification, setting, setSetting } = useContext(ProfileContext);
    setDash(false)
    setProfile(false)
    setNotification(true);
    setSetting(false)

    useEffect(() => {
        axios.get(`/notify/load/${user.auth.user.id}`)
            .then((response) => {
                setContent(response.data.notify)
                setSender(response.data.sender)
                console.log("liked-notification", response)
            }).catch((error) => console.log(error))
    }, [])
    console.log(content[0]?.content === "followed you.")
    console.log(content[0]?.content === "liked your post.")
    console.log("sender", sender[0])
    return (
        <div className="dash-wrap">
            <div className='side-nav'><SideNav /></div>
            <div className="home">
                <div className="notify-head">Notifications</div>
                <div className="notification-wrap">
                    {sender.map((item, index) => (
                        <>
                            {content[0]?.content === "followed you." &&
                                <Link href={`/profile/${item.id}`} className="links">
                                    <div className="notification" >
                                        <div className="notification-header">
                                            <div className="notify-icon"><FontAwesomeIcon icon={faUser} /></div>
                                            <div className="notify-image"><img src={item.profile.image ? "/storage/" + item.profile.image : "/storage/profile/blank.svg"} alt="" /></div>
                                        </div>
                                        <div className="notification-content"><span className="notify-username">{item.profile.username}</span>followed you</div>
                                    </div>
                                </Link>
                            }
                            {content[0]?.content === "liked your post." &&
                                <Link href={`/profile/${item.id}`} className="links">
                                    <div className="notification">
                                        <div className="notification-header">
                                            <div className="heart-icon"><FontAwesomeIcon icon={faHeart} /></div>
                                            <div className="notify-image"><img src="/storage/profile/blank.svg" alt="" /></div>
                                        </div>
                                        <div className="notification-content"><span className="notify-username">{item.name}</span>liked your post</div>
                                        <div className="notification-post"></div>
                                    </div>
                                </Link>
                            }
                        </>
                    ))}
                </div>
            </div>
            <div className='search-message'><SearchMessage /></div>
            <Message />
        </div>
    );
}