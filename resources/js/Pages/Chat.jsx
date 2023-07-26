import React from 'react'
import { faImage, faFaceSmile, faPaperPlane, faXmarkCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Message } from '@/Components/Message';
import { useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { useState } from 'react';
import axios from 'axios';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { array } from 'i/lib/util';
import { SideNav } from '@/Components/SideNav';
import { SearchMessage } from '@/Components/SearchMessage';
export default function Chat({ receiver_id, profile }) {
    const messageRef = useRef();
    const areaRef = useRef();
    const imageRef = useRef();
    let user = usePage().props
    const [message, setMessage] = useState('');
    const [emoji, setEmoji] = useState(false);
    const [keyUp, setKeyUp] = useState(false);
    const [load, setLoad] = useState([]);
    useEffect(() => {
        axios.get(`/load/${user.auth.user.id}/${receiver_id}`)
            .then((response) => setLoad(response.data))
            .catch((error) => console.log(error))
    }, [load])
    useEffect(() => {
        if (messageRef && messageRef.current) {
            messageRef.current.style.height = "0px"
            const taHeight = messageRef.current.scrollHeight;
            messageRef.current.style.height = taHeight + "px";
            areaRef.current.style.height = taHeight + "px";
        }
        if (message.trim().length > 0) {
            setKeyUp(true);
        } else {
            setKeyUp(false)
        }

    }, [message])

    const emojiClick = () => {
        setEmoji(!emoji);
    }
    let photoRef = useRef(null);
    const clickPhoto = () => {
        photoRef.current.click();
        setEmoji(false);
    }

    const onEmojiClick = (event) => {
        setMessage(prevPost => prevPost + event.emoji);
    }

    let formData = new FormData();
    formData.append('message', message);
    const sendMessage = () => {
        axios.post(`/messages/post/${receiver_id}`, formData, {
            headers: {
                'Content-Type': "multipart/form-data",
                'enctype': 'multipart/form-data'
            }
        }).then((response) => {
            setLoad(prev => [...prev, response.data]);
            setMessage(" ")
        }).catch((error) => {
            console.log(error);
        })
    }


    const onKeyPress = (e) => {
        if (e.which === 13) {
            sendMessage();
            e.preventDefault();
        }
    }

    return (
        <div className='dash-wrap'>
            <div className='side-nav'><SideNav /></div>
            <div className='home'>
                <div className='chat-body'>
                    <div className='chat-header'>
                        <div className='chat-profile-image'><img src={user.profile.image ? "/storage/" + user.profile.image : "/storage/profile/blank.svg"} alt="" /></div>
                        <div className='chat-profile-name'>
                            {profile.name}
                        </div>

                    </div>
                    <div className='display-message'>
                        {load.map((item, index) => (
                            <div className={user.auth.user.id == item.sender_id ? 'sent-wrap' : 'reply-wrap'}>{item.message}</div>
                        ))}

                    </div>
                </div>
                <div className='text-message-area'>
                    <div className='text-message-wrap' ref={areaRef}>
                        <div className='text-icon' onClick={clickPhoto}><FontAwesomeIcon icon={faImage} className='' /></div>
                        <input type="file" className='message-photo' ref={photoRef} accept='image/*' name='image' />
                        {emoji && <div className='message-emoji'><EmojiPicker height={400} width="100%" onEmojiClick={onEmojiClick} /></div>}
                        <div className='text-smile-icon' onClick={emojiClick}><FontAwesomeIcon icon={faFaceSmile} className='' /></div>
                        <div className='chat-area'>
                            <div className='message-selected-image' ref={imageRef}>
                                <img src="/storage/profile.blank.svg" alt="" />
                                <FontAwesomeIcon icon={faXmarkCircle} className='close-image' />
                            </div>
                            <textarea name="message" ref={messageRef} value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={onKeyPress} className='chat-text-area' maxLength={150} placeholder='start a new message here'>
                            </textarea>
                        </div>
                        {keyUp && <div className='text-paper-icon'><FontAwesomeIcon icon={faPaperPlane} className='' type='submit' onClick={sendMessage} /></div>}
                    </div>
                </div>
            </div>
            <div className='search-message'><SearchMessage /></div>
        </div>
    )
}
