import React, { useState } from 'react'
import { faAnglesUp, faAnglesDown } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import axios from 'axios';
import { useRef } from 'react';
export const Message = (props) => {
    const auth = usePage().props;
    console.log(auth.auth.user.id)
    const [auth_following, setFollowing] = useState([]);
    const [users, setUsers] = useState([]);
    const [auth_followers, setFollowers] = useState([]);

    const [notify_count, setCount] = useState([]);
    let Ids = []
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

    useEffect(() => {
        axios.get('/message/unread')
            .then((response) => { setCount(response.data) })
            .catch((error) => { console.log(error) })
    }, [notify_count])

    console.log(notify_count)


    const [message, setMessage] = useState(true);
    const [messageUp, setMessageUp] = useState(false);
    const clickUp = () => {
        setMessage(false);
        setMessageUp(true)
        setCount(0);
    }
    const clickDown = () => {
        setMessage(true);
        setMessageUp(false)
        setCount(0);
    }

    if (messageUp) {
        axios.patch('/unread/message').then((response) => {
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        axios.get('/recent')
            .then((response) => {
                console.log(response.data.recent_messages)
                setUsers(response.data.recent_messages)
            })
            .catch((error) => { console.log(error) })
    }, [users])

    console.log(users)

    const readMessage = (id) =>{
        axios.patch(`/read/message/${id}`).then((response) => {
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <>
            {message &&
                <div className='message' onClick={clickUp}>
                    <div style={{ position: 'relative', width: '100%', display: 'flex' }}>
                        Message
                        <div className='message-icon-wrap'><FontAwesomeIcon icon={faEnvelope} className='icon-angle' /></div>
                        {notify_count.length > 0 ? <div className='message-count'>{notify_count.length}</div> : null}
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
                        {users.map((item, index) => (
                            
                            <a href={`/messages/${item.user[0].user_id}`} className='links'>
                                <div>
                                    <div className='message-list' onClick={()=>readMessage(item.user[0].user_id)}>
                                        <div className='list-header'>
                                            <div className='list-image'><img src={"/storage/profile/blank.svg"} alt="" className='rounded-circle' /></div>
                                            <div className='list-name'><span style={{ fontWeight: '600', marginRight: '0.5vw' }}>{item.user[0].name}</span>@{item.user[0].username}</div>
                                        </div>
                                        <div className='list-content'>
                                            <div className='latest-message'>{item.messages}</div>
                                            {item.recent_count >0 &&<span className='chat-count'>{item.recent_count}</span>}
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            }
        </>
    )
}
