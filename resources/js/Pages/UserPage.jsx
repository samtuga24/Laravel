import { Message } from '@/Components/Message'
import { SearchMessage } from '@/Components/SearchMessage'
import { SideNav } from '@/Components/SideNav'
import { faEnvelope, faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { faLocationDot, faCalendarDays, faLink, faXmarkCircle, faCircle, faEllipsis } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { EditModal } from '../Components/EditModal';
import React, { useState } from 'react'
import { Head, usePage } from '@inertiajs/react';
import { UserProfile } from '@/Components/UserProfile';
import axios from 'axios';
import { useEffect } from 'react';
export default function UserPage({ profile, follows }) {
    const auth = usePage().props;
    console.log(profile)
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let joined = new Date(profile[0].created_at);
    let monthJoined = month[joined.getMonth()]
    let yearJoined = joined.getFullYear();
    const [modalShow, setModalShow] = useState(false);
    const [post, setPost] = useState(true)
    const [media, setMedia] = useState(false)
    const [heart, setHeart] = useState(false)
    const [followStatus, setFollowUpdate] = useState(follows);

    const clickPost = () => {
        setPost(true)
        setMedia(false)
        setHeart(false)
    }
    const clickMedia = () => {
        setPost(false)
        setMedia(true)
        setHeart(false)
    }
    const clickLike = () => {
        setPost(false)
        setMedia(false)
        setHeart(true)
    }
    const submitFollow = (e) => {
        e.preventDefault();
        axios.post(`/follow/${profile[0].id}`).then((response) => {
            console.log("response", response.data)
            setFollowUpdate(!followStatus)
        }).catch((error) => {
            console.log(error)
        })
    }
    const calcTime = (time) => {
        const current = new Date();
        const postTime = new Date(time);
        const difference = current - postTime
        if (Math.floor(difference / 1000) <= 59) {
            return Math.floor(difference / 1000) + "s";
        }
        else if (Math.floor(difference / 1000 / 60) <= 59) {
            return Math.floor(difference / 1000 / 60) + "m";
        }

        else if (Math.floor(difference / 1000 / 60 / 60) <= 23) {
            return Math.floor(difference / 1000 / 60 / 60) + "h";
        }

        else if (Math.floor(difference / 1000 / 60 / 60 * 7) <= 7) {
            return Math.floor(difference / 1000 / 60 / 60 * 7) + "d";
        }
        else {
            return "a long time ago"
        }
    }
    // console.log("userpost",userposts)
    return (
        <div className='dash-wrap'>
            <div className='side-nav'><SideNav /></div>
            <div className='home'>
                <div className='profile-wrap'>
                    <div className='header'>
                        {profile[0].name}
                        {post && <div className='post-count'>{profile[0].user.comments.length + profile[0].user.posts.length} Posts</div>}
                        {media && <div className='post-count'>10K Media</div>}
                        {heart && <div className='post-count'>{profile[0].user.unlike.length} Likes</div>}
                    </div>
                    <div className='profile-header'><img src={profile[0].header ? "/storage/" + profile[0].header : "/storage/header/header.jpg"} alt="" /></div>
                    <div className='user-profile-image'>
                        <div className='user-image-wrap'><img src={profile[0].image ? "/storage/" + profile[0].image : "/storage/profile/blank.svg"} alt="" /></div>
                    </div>

                    {auth.auth.user.id === profile[0].id ?
                        <div className='edit-button'>
                            <button className='edit-profile' onClick={() => setModalShow(true)}>Edit profile</button>
                        </div>
                        :
                        <div className='edit-button'>
                            <button className='edit-profile' onClick={submitFollow}>{follows ? 'Following ' : 'Follow'}</button>
                            {/* <div className='profile-message'><FontAwesomeIcon icon={faEnvelope} className='' /></div> */}
                        </div>
                    }
                    {<EditModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        profile={profile}

                    />}
                    <div className='user-handle'>
                        <div className='username'>{profile[0].name}</div>
                        <div className='handle'>@{profile[0].username}</div>
                        <div className='bio'>{profile[0].bio ?? 'N/A'}</div>
                        <div className='location-wrap'>
                            {profile[0].location && <div className='location'><FontAwesomeIcon icon={faLocationDot} className='' /><span className='location-text'>{profile[0].location}</span></div>}
                            <div className='calendar'><FontAwesomeIcon icon={faCalendarDays} className='' /><span className='location-text'>Joined {monthJoined} {yearJoined}</span></div>
                            {profile[0].website && <div className='website'><FontAwesomeIcon icon={faLink} className='' /><span className=''><a href="" className='website-text'>{profile[0].website}</a></span></div>}
                        </div>
                        <div className='profile-following'>
                            <div className='ff-count'><span className='count'>{profile[0].user.following.length}</span><span className='ff'> Following</span></div>
                            <div className='ff-count'><span className='count'>{profile[0].followers.length}</span><span className='ff'> Followers</span></div>
                        </div>
                    </div>

                    <div className='profile-tabs'>
                        <div className='post-tab' onClick={clickPost}>
                            Posts
                            {post && <div className='post-tab-decoration'></div>}
                        </div>
                        <div className='media-tab' onClick={clickMedia}>
                            Media
                            {media && <div className='media-tab-decoration'></div>}
                        </div>
                        <div className='like-tab' onClick={clickLike}>
                            Likes
                            {heart && <div className='like-tab-decoration'></div>}
                        </div>
                    </div>
                    {/* {post &&

                        profile[0].map((item, index) => (
                            <div className='post-body' key={index}>
                                <div className='post-header'>
                                    <img src={item.user.profile.image ? '/storage/' + item.user.profile.image : '/storage/profile/blank.svg'} alt="" className='post-profile-image' />
                                    <div className='post-username-wrap'><span className='post-username'>{item.user.name}</span>@{item.user.username}<span className='post-time'><FontAwesomeIcon icon={faCircle} className='circle' />{calcTime(item.created_at)}</span></div>
                                    <div className='action-wrap'><FontAwesomeIcon icon={faEllipsis} className='post-action' /></div>
                                </div>
                                <div className='post-content'>
                                    <p className='user-post-content'>{item.content}</p>
                                    {item.image && <img src={`/storage/${item.image}`} alt="" />}
                                    <div className='post-comments'>
                                        <div className='comment-hover'><FontAwesomeIcon icon={faComment} className='comment-icon' /></div>
                                        <div className='like-hover' onClick={clickLike}><FontAwesomeIcon icon={faHeart} className='comment-icon' /></div>
                                    </div>
                                </div>
                            </div>
                        ))

                    } */}
                </div>
            </div>
            <div className='search-message'><SearchMessage /></div>
            <Message profile={profile} />
        </div>
    )
}
