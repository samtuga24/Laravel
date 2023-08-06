import React from 'react'
import { useState } from 'react'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from '@inertiajs/react';
import { useEffect } from 'react';
export const Followers = (props) => {
    let user = props.user
    let following = props.following
    let followers = props.followers
    // console.log("user", user)
    console.log("followers", followers)
    console.log("following", following)
    const [followingTab, setFollowingTab] = useState(true)
    const [followersTab, setFollowersTab] = useState(false)
    const [hover, setHover] = useState(false)
    const [match, setMatch] = useState("")
    const clickFollowingTab = () => {
        setFollowingTab(true)
        setFollowersTab(false)
    }
    const clickFollowersTab = () => {
        setFollowingTab(false)
        setFollowersTab(true)
    }
    const mouseover = () => {
        setHover(true)
    }
    const mouseleave = () => {
        setHover(!hover)
    }

    let matchArray = []
        following.map((item, index) => {
            matchArray.push(item.id)
        })

    
    console.log(matchArray)
    console.log(matchArray.includes(5))
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
                                <img src={item.image ? '/storage/' + item.image : '/storage/profile/blank.svg'} alt="" />
                                <div className='following-name'>
                                    <span className='following-username'>{item.name}</span>
                                    <span className='following-handle'>@{item.username}</span>
                                    <span className='following-bio'>{item.bio}</span>
                                </div>
                            </div>
                            <span className='following-button'><button className='button-text'></button></span>
                        </div>
                    ))}

            </div>



            <div className='following-body-wrap'>
                {followersTab &&
                    followers.map((item, index) => (
                        <div className='following-body' key={index}>
                            <div className='following-image'>
                                <img src={item.profile.image ? '/storage/' + item.profile.image : '/storage/profile/blank.svg'} alt="" />
                                <div className='following-name'>
                                    <span className='following-username'>{item.profile.name}</span>
                                    <span className='following-handle'>@{item.profile.username}</span>
                                    <span className='following-bio'>{item.profile.bio}</span>
                                </div>
                            </div>
                            <button className={matchArray.includes(item.id) ? 'match-button' : 'followers-button'} onClick={() => alert(item.id)}>
                                {matchArray.includes(item.id) ? 'Following' : 'Follow'}
                            </button>
                        </div>
                    ))
                }
            </div>


        </div>
    )
}
