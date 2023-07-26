import React, { useRef, useState } from 'react'
import { faAnglesUp, faXmarkCircle, faEllipsis, faCircle, faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faImage, faSmile, faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'react-bootstrap';
import EmojiPicker from 'emoji-picker-react';
import { isUndefined, set } from 'lodash';
import { Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import axios from 'axios';
export const Home = (props) => {
    const [home, setHome] = useState([]);
    const [emoji, setEmoji] = useState(false);
    const [showContent, setShowContent] = useState(true);
    const [close, setClose] = useState(false);
    const [display, setDisplay] = useState(false);
    const [content, setContent] = useState('');
    const [image, setImage] = useState([]);
    const [posts, setPosts] = useState([]);
    const [post_id, setPostId] = useState();
    const [like, setLike] = useState(false);
    const [like_action, setLikeAction] = useState([]);
    const postRef = useRef();
    const areaRef = useRef();
    const auth_user = usePage().props.auth;

    useEffect(() => {
        axios.get(`/dashboard/${auth_user.user.id}`)
            .then((response) => {
                setHome(response.data[0])
            })
            .catch((error) => console.log(error))
    }, [])

    useEffect(() => {
        axios.get("/following")
            .then((response) => {
                setPosts(response.data)
                setLikeAction(response.data[0].unlike)
            })
            .catch((error) => console.log(error))
    }, [])

    useEffect(() => {
        like_action.map((item, index) => {
            if (auth_user.user.id == item.id) {
                setLike(true);
                console.log('true')
            }
        })
    }, [])


    useEffect(() => {
        if (postRef && postRef.current) {
            postRef.current.style.height = "0px";
            const taHeight = postRef.current.scrollHeight;
            postRef.current.style.height = taHeight + "px";
            areaRef.current.style.height = taHeight + "px";
        }
    }, [content])

    const clickLike = (e) => {
        e.preventDefault();
        setLike(!like);
    }

    const clickClose = () => {
        setClose(true)
        setImage(null)
        setDisplay(false)
    }

    const clickEmoji = () => {
        setEmoji(!emoji)
    }
    const inputRef = useRef();
    const selectFile = () => {
        inputRef.current.click();
        setEmoji(false)
    }
    const imageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
            setDisplay(true);
        }
    }

    const updatePost = (event) => {
        setContent(event.target.value)
    }
    const onEmojiClick = (event) => {
        setContent(prevPost => prevPost + event.emoji);
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

        else if (Math.floor(difference / 1000 / 60 / 60 / 24) <= 7) {
            return Math.floor(difference / 1000 / 60 / 60 / 24) + "d";
        }
        else {
            return "a long time ago"
        }
    }

    const clickComment = (e) => {
        e.preventDefault()

    }

    const submitLike = (id) => {
        // e.preventDefault();
        // console.log("post-id",id)
        axios.post(`/like/${id}`)
            .then((response) => console.log("home response", response.data))
            .catch((error) => console.log(error))
        setLike(!like);
    }


    return (
        <div className='home-wrap'>
            <div className='header'>Home</div>
            <div className='post-form'>
                <div className='profile-icon'><img src={"/storage/profile/blank.svg"} alt="" /></div>
                <div className='input-form' ref={areaRef}>
                    <form action="/post" encType='multipart/form-data' method='post' style={{ position: 'relative' }}>
                        <textarea name="content" ref={postRef} value={content} onChange={updatePost} id="" placeholder="What's up?!" maxLength={200} className='text-area'></textarea>
                        {display &&
                            <div className='post-image-display'>
                                <img src={image} alt="" />
                                <FontAwesomeIcon icon={faXmarkCircle} className='close-image' onClick={clickClose} />
                            </div>
                        }
                        <div className='post-buttons'>
                            <div className='emoji-button'>
                                <input type="file" name="image" id="" ref={inputRef} accept='image/*' onChange={imageChange} className='image-select' />
                                <div className='image-icon'><FontAwesomeIcon icon={faImage} onClick={selectFile} /></div>
                                <div className='smile-icon'><FontAwesomeIcon icon={faSmile} onClick={clickEmoji} />
                                    {emoji &&
                                        <div className='emoji-picker'><EmojiPicker height={400} width="100%" onEmojiClick={onEmojiClick} /></div>
                                    }
                                </div>
                            </div>
                            <div className='post-submit'><Button disabled={display || content.trim().length > 0 ? false : true} type='submit' className='sub'>post</Button></div>
                        </div>
                    </form>
                </div>
            </div>
            {posts.map((item, index) => (

                <Link href={`/comment/show/${item.id}`} className='links'>
                    <div className='post-body' key={index}>
                        <div className='post-header'>
                            <Link href={`/profile/${item.user.id}`} className='links'><img src={item.user.profile.image ? '/storage/' + item.user.profile.image : '/storage/profile/blank.svg'} alt="" className='post-profile-image' /></Link>
                            <div className='post-username-wrap'><Link href={`/profile/${item.user.id}`} className='links'><span className='post-username'>{item.user.name}</span></Link>@{item.user.profile.username}<span className='post-time'><FontAwesomeIcon icon={faCircle} className='circle' />{calcTime(item.created_at)}</span></div>
                            <div className='action-wrap'><FontAwesomeIcon icon={faEllipsis} className='post-action' /></div>
                        </div>
                        <div className='post-content'>
                            {item.content && <p className='user-post-content'>{item.content}</p>}
                            {item.image && <img src={`/storage/${item.image}`} alt="" />}
                            <div className='post-comments'>
                                <div className='comment-wrap'><div className='comment-hover' onClick={clickComment}><FontAwesomeIcon icon={faComment} className='comment-icon' /></div>{item.comments.length}</div>
                                <div className='like-wrap'><div className='like-hover' onClick={()=>submitLike(item.id)}><FontAwesomeIcon icon={like ? SolidHeart : faHeart} beat={like ? true : false} className='comment-icon' id={like ? 'click-color' : null} /></div>{item.unlike.length}</div>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}
