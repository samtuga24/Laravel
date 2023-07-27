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
    const { receiver, setReceiver } = useContext(ProfileContext)
    const [sender, setSender] = useState([]);
    const [content, setContent] = useState([]);
    const [notification, setNotification] = useState([]);
    console.log("notification-receiver", receiver.id)
    console.log("notification-receiver", user.auth.user.id)

    useEffect(() => {
        axios.get(`/notify/load/${user.auth.user.id}`)
            .then((response) => {
                setContent(response.data.notify)
                setSender(response.data.sender)
            }).catch((error) => console.log(error))
    }, [])
    console.log(content[0]?.content === "followed you.")
    console.log(sender[0])
    return (
        <div className="dash-wrap">
            <div className='side-nav'><SideNav /></div>
            <div className="home">
                <div className="notify-head">Notifications</div>
                <div className="notification-wrap">
                    {sender.map((item, index) => (
                        <>
                            {content[index]?.content === "followed you." &&
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
                            {content[index]?.content === "liked" &&
                                <div className="notification">
                                    <div className="notification-header">
                                        <div className="heart-icon"><FontAwesomeIcon icon={faHeart} /></div>
                                        <div className="notify-image"><img src="/storage/profile/blank.svg" alt="" /></div>
                                    </div>
                                    <div className="notification-content"><span className="notify-username">username</span>liked your tweet</div>
                                    <div className="notification-post">liked your tweet</div>
                                </div>
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