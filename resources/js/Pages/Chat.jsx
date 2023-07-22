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
export const Chat = (props) => {
    const messageRef = useRef();
    const areaRef = useRef();
    let user = usePage().props
    let receiver_id = props.receiver_id
    let loadmessages = props.loadmessages
    console.log("load messages", user)
    const [message, setMessage] = useState('');
    const [emoji, setEmoji] = useState(false);
    const [keyUp, setKeyUp] = useState(false);
    const [load, setLoad] = useState();

    useEffect(()=>{

    },[])
    useEffect(() => {
        if (messageRef && messageRef.current) {
            messageRef.current.style.height = "0px";
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
        axios.post(`/messages/post/${receiver_id.id}`, formData, {
            headers: {
                'Content-Type': "multipart/form-data",
                'enctype': 'multipart/form-data'
            }
        }).then((response) => {
            setLoad(response);
            console.log(load)
            setMessage(" ")
        }).catch((error) => {
            console.log(error);
        })
    }

    const onKeyPress = (e) => {
        if(e.which === 13) {
          sendMessage();
          e.preventDefault();
        }
      }

    return (
        <div className='profile-wrap'>
            <div className='header'>Messages</div>
            <div className='chat-body'>
                <div className='chat-header'>
                    <div className='chat-profile-image'><img src={user.profile.image ? "/storage/"+user.profile.image : "/storage/profile/blank.svg"} alt="" /></div>
                    <div className='chat-profile-name'>{props.username}</div>
                </div>
                <div className='display-message'>
                    {loadmessages.map((item, index) => (
                        <div className={user.auth.user.id == item.sender_id ? 'sent-wrap' : 'reply-wrap'}>{item.message}</div>
                    ))}

                </div>
            </div>
                <div className='text-message-area'>
                    <div className='text-message-wrap' ref={areaRef}>
                        <div className='message-selected-image'>
                            <img src="" alt="" />
                            <FontAwesomeIcon icon={faXmarkCircle} className='close-image' />
                        </div>
                        <div className='text-icon' onClick={clickPhoto}><FontAwesomeIcon icon={faImage} className='' /></div>
                        <input type="file" className='message-photo' ref={photoRef} accept='image/*' name='image' />
                        {emoji && <div className='message-emoji'><EmojiPicker height={400} width="100%" onEmojiClick={onEmojiClick} /></div>}
                        <div className='text-smile-icon' onClick={emojiClick}><FontAwesomeIcon icon={faFaceSmile} className='' /></div>
                        <div className='chat-area'><textarea name="message" ref={messageRef} value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={onKeyPress} className='chat-text-area' maxLength={150} placeholder='start a new message here'></textarea></div>
                        {keyUp && <div className='text-paper-icon'><FontAwesomeIcon icon={faPaperPlane} className='' type='submit' onClick={sendMessage} /></div>}
                    </div>
                </div>
        </div>
    )
}
