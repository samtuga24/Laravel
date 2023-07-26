import { Message } from "@/Components/Message";
import { SearchMessage } from "@/Components/SearchMessage";
import { SideNav } from "@/Components/SideNav";
import { faUser, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from "react";
export default function Notification() {
    return (
        <div className="dash-wrap">
            <div className='side-nav'><SideNav /></div>
            <div className="home">
                <div className="notify-head">Notifications</div>
                <div className="notification-wrap">
                    <div className="notification">
                        <div className="notification-header">
                            <div className="notify-icon"><FontAwesomeIcon icon={faUser} /></div>
                            <div className="notify-image"><img src="/storage/profile/blank.svg" alt="" /></div>
                        </div>
                        <div className="notification-content"><span className="notify-username">username</span>followed you</div>
                    </div>
                    <div className="notification">
                        <div className="notification-header">
                            <div className="heart-icon"><FontAwesomeIcon icon={faHeart} /></div>
                            <div className="notify-image"><img src="/storage/profile/blank.svg" alt="" /></div>
                        </div>
                        <div className="notification-content"><span className="notify-username">username</span>liked your tweet</div>
                        <div className="notification-post">liked your tweet</div>
                    </div>
                </div>
            </div>
            <div className='search-message'><SearchMessage /></div>
            <Message />
        </div>
    );
}