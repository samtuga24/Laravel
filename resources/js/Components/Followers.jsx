import React from 'react'
import { useState } from 'react'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from '@inertiajs/react';
export const Followers = (props) => {
    let user = props.user
    let following = props.following
    let followers = props.followers
    console.log("user", user)
    console.log("followers", followers)
    console.log("following", following)
    const [followingTab, setFollowingTab] = useState(true)
    const [followersTab, setFollowersTab] = useState(false)
    const [hover, setHover] = useState(false)
    const clickFollowingTab = () => {
        setFollowingTab(true)
        setFollowersTab(false)
    }
    const clickFollowersTab = () => {
        setFollowingTab(false)
        setFollowersTab(true)
    }
    return (
        <div className='followers-wrap'>
            <div className='header-wrap'>
                <Link href={`/profile/${user.id}`} className='links'>
                    <div className='user'>
                        <div className='arrow'><FontAwesomeIcon icon={faArrowLeft} /></div>
                        <span className='user-name'>{user.name}</span>
                        <span className='follow-user-handle'>@{user.username}</span>
                    </div>
                </Link>
                <div className='followers-header'>
                    <div className='following-tab' onClick={clickFollowingTab}>
                        Following
                        {followingTab && <div className='following-tab-decoration'></div>}
                    </div>
                    <div className='following-tab' onClick={clickFollowersTab}>
                        Follwers
                        {followersTab && <div className='followers-tab-decoration'></div>}
                    </div>
                </div>
            </div>

            <div className='following-body-wrap'>
                {followingTab &&
                    following.map((item, index) => (
                        <div className='following-body' key={index}>
                            <div className='following-image'>
                                <img src="/storage/profile/blank.svg" alt="" />
                                <div className='following-name'>
                                    <span className='following-username'>{item.name}</span>
                                    <span className='following-handle'>@{item.username}</span>
                                    <span className='following-bio'>{item.bio}</span>
                                </div>
                            </div>
                            <button className='following-button' id={hover ? 'hover-color' : null} onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>{hover ? 'Unfollow' : 'Following'}</button>
                        </div>
                    ))}

            </div>



            <div className='following-body-wrap'>
                {followersTab &&
                    followers.map((item, index) => (
                        <div className='following-body' key={index}>
                            <div className='following-image'>
                                <img src="/storage/profile/blank.svg" alt="" />
                                <div className='following-name'>
                                    <span className='following-username'>{item.name}</span>
                                    <span className='following-handle'>@{item.username}</span>
                                    <span className='following-bio'>{item.bio}</span>
                                </div>
                            </div>
                            <button className='followers-button' onClick={() => alert("click me")}>Follow</button>
                        </div>
                    ))
                }
            </div>


        </div>
    )
}
