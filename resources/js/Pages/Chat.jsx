import React from 'react'
import { faImage, faFaceSmile, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
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
    const [close, setClose] = useState(false);
    const [display, setDisplay] = useState(false);
    const [image, setImage] = useState([]);
    const [image_url, setImageURL] = useState([]);
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

    const clickClose = () => {
        setClose(true)
        setImage(null)
        setDisplay(false)
    }
    const imageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
            setImageURL(URL.createObjectURL(event.target.files[0]));
            setDisplay(true);
            setKeyUp(true);
        }
    }

    // var display_message = document.querySelector('#display-message');
    // display_message.scrollTop = display_message.scrollHeight - display_message.clientHeight;

    let formData = new FormData();
    formData.append('message', message);
    formData.append('image', image)
    const sendMessage = () => {
        axios.post(`/messages/post/${receiver_id}`, formData, {
            headers: {
                'Content-Type': "multipart/form-data",
                'enctype': 'multipart/form-data'
            }
        }).then((response) => {
            setLoad(prev => [...prev, response.data]);
            setMessage(" ")
            setDisplay(false);
        }).catch((error) => {
            console.log(error);
        })
    }
    console.log(load)


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
                    <div className='display-message' id='display-message'>
                        {load.map((item, index) => (
                            <>
                                {item?.message.trim().length > 0 ?
                                    <div key={index} className={user.auth.user.id == item.sender_id ? 'sent-wrap' : 'reply-wrap'}>
                                        {item.message}
                                    </div>
                                    :
                                    null
                                }
                                {item?.image.trim().length > 0 ?
                                    <div className={user.auth.user.id == item.sender_id ? 'image-sent' : 'image-reply'}>

                                        <img src={'/storage/' + item.image} alt="" />
                                    </div>
                                    :
                                    null
                                }
                            </>
                        ))}

                    </div>
                </div>
                <div className='text-message-area' >
                    <div className='chat-wrap'>
                        {display &&
                            <div className='show-chat-image'>
                                <img src={image_url} alt="" />
                                <FontAwesomeIcon icon={faXmarkCircle} className='close-chat-image' onClick={clickClose} />
                            </div>
                        }
                        <div className='chat-action' ref={areaRef}>
                            <div className='chat-buttons'>
                                <div className='text-icon' onClick={clickPhoto}><FontAwesomeIcon icon={faImage} /></div>
                                <input type="file" className='message-photo' onChange={imageChange} ref={photoRef} accept='image/*' name='image' />
                                {emoji && <div className='message-emoji'><EmojiPicker height={400} width="100%" onEmojiClick={onEmojiClick} /></div>}
                                <div className='text-smile-icon' onClick={emojiClick}><FontAwesomeIcon icon={faFaceSmile} /></div>
                            </div>
                            <div className='chat-input'>
                                <textarea
                                    name="message" value={message}
                                    ref={messageRef}
                                    onChange={(e) => setMessage(e.target.value)} onKeyDown={onKeyPress}
                                    className='chat-text-area' maxLength={300} placeholder='start a new message here'>

                                </textarea>
                            </div>
                            {keyUp && <div className='text-paper-icon'><FontAwesomeIcon icon={faPaperPlane} className='' type='submit' onClick={sendMessage} /></div>}
                        </div>
                    </div>

                </div>
            </div>
            <div className='search-message'><SearchMessage /></div>
        </div>
    )
}
