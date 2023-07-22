import React, { useState } from 'react'
import { faAnglesUp, faAnglesDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, usePage } from '@inertiajs/react';
export const Message = (props) => {
    const auth = usePage().props;
    let profile = props.profile
    console.log("message", profile[0])
    // let following = props.following
    
    console.log("profile-message", profile[0])
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

    const checkFollowers = []
    auth.auth.user.following.map((following, i) => {
        profile[0].followers.map((followers, i) => {
            if ((following.id === followers.id)) {
                checkFollowers.push(following);
            }
        })
    })
    console.log("check",profile[0])

    return (
        <>
            {message &&
                <div className='message' onClick={clickUp}>
                    <div style={{ position: 'relative', width: '100%', display: 'flex' }}>
                        Message
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
                        {checkFollowers.map((index, i) => (
                        <Link href={`/messages/${index.id}`} className='links'>
                        <div>
                            <div className='message-list' onClick={() => console.log("index")}>
                                <div className='list-image'><img src={index.image?"/storage/"+index.image :"/storage/profile/blank.svg"} alt="" className='rounded-circle' /></div>
                                <div className='list-name'><span style={{ fontWeight: '600', marginRight: '0.5vw' }}>{index.name}</span>{index.username}</div>
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
