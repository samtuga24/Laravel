import React, { useState } from 'react'
import { faAnglesUp, faAnglesDown } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import axios from 'axios';
export const Message = (props) => {
    const auth = usePage().props;
    console.log("message", auth)
    const [auth_following, setFollowing] = useState([]);
    const [auth_followers, setFollowers] = useState([]);
    useEffect(() => {
        axios.get('/nav')
            .then((response) => {
                setFollowing(response.data[0].user.following)
                setFollowers(response.data[0].followers)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    console.log("auth_following", auth_following)
    console.log("auth_following", auth_followers)
    const [message, setMessage] = useState(true);
    const [messageUp, setMessageUp] = useState(false);
    const clickUp = () => {
        setMessage(false);
        setMessageUp(true)
    }
    const clickDown = () => {
        setMessage(true);
        setMessageUp(false)
    }

    let follow_match = []
    auth_following.map((following, index) => {
        auth_followers.map((followers, index) => {
            if (following.user_id === followers.id) {
                follow_match.push(following)
            }
        })
    })

    return (
        <>
            {message &&
                <div className='message' onClick={clickUp}>
                    <div style={{ position: 'relative', width: '100%', display: 'flex' }}>
                        Message
                        <div className='message-icon-wrap'><FontAwesomeIcon icon={faEnvelope} className='icon-angle' /></div>
                        <div className='message-count'>5</div>
                        <div className='icon-wrap'><FontAwesomeIcon icon={faAnglesUp} className='icon-angle' /></div>
                    </div>
                </div>
            }

            {messageUp &&
                <div className='message-up'>
                    <div className='message-up-wrap' onClick={clickDown}>
                        Message
                        <div className='icon-wrap'><FontAwesomeIcon icon={faAnglesDown} className='icon-angle' /></div>
                    </div>
                    <div style={{ marginTop: '8vh' }}>
                        {follow_match.map((index, i) => (
                            <Link href={`/messages/${index.id}`} className='links'>
                                <div key={index}>
                                    <div className='message-list' onClick={() => console.log("index")}>
                                        <div className='list-header'>
                                            <div className='list-image'><img src={index.image ? "/storage/" + index.image : "/storage/profile/blank.svg"} alt="" className='rounded-circle' /></div>
                                            <div className='list-name'><span style={{ fontWeight: '600', marginRight: '0.5vw' }}>{index.name}</span>{index.username}</div>
                                        </div>
                                        <div className='list-content'>
                                        <div className='latest-message'>giasguijshvjh</div>
                                        <span className='chat-count'>3</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            }
        </>
    )
}
