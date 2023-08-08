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
import { CommentModal } from './CommentModal';
import { useContext } from 'react';
import ProfileContext from '@/context/ProfileContext';
export const Home = (props) => {
    const [home, setHome] = useState(true);
    const [emoji, setEmoji] = useState(false);
    const [showContent, setShowContent] = useState(true);
    const [close, setClose] = useState(false);
    const [display, setDisplay] = useState(false);
    const [content, setContent] = useState('');
    const [image, setImage] = useState([]);
    const [posts, setPosts] = useState([]);
    const [post_id, setPostId] = useState();
    const [modal_post, setModalPost] = useState();
    const [like, setLike] = useState(false);
    const [like_action, setLikeAction] = useState([]);
    const postRef = useRef();
    const areaRef = useRef();
    const formRef = useRef();
    const buttonsRef = useRef();
    const imageRef = useRef();
    const auth_user = usePage().props.auth;
    const [modalShow, setModalShow] = useState(false);
    const {dash, setDash, auth_profile, setProfile, notification, setNotification, setting, setSetting} = useContext(ProfileContext);
    setDash(true)
    setProfile(false)
    setNotification(false);
    setSetting(false)

    const min = buttonsRef.current?.clientHeight;
    const max = imageRef.current?.clientHeight;
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
                // setLikeAction(response.data[0].unlike)
            })
            .catch((error) => console.log(error))
    }, [posts])

    


    useEffect(() => {
        if (postRef && postRef.current) {
            postRef.current.style.height = "0px";
            const taHeight = postRef.current.scrollHeight;
            postRef.current.style.height = taHeight + "px";
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

    const clickPost = (id) => {
        axios.get(`/comment/show/${id}`)
            .then((response) => {
            }).catch((error) => {
                console.log(error)
            })
    }
    const clickComment = (event, modal) => {
        event.preventDefault()
        setModalShow(true)
        setModalPost(modal)
    }

    const submitLike = (event, id,receiver) => {
        event.preventDefault();
        axios.post(`/like/${id}`)
            .then((response) => {
                setLike(!like);
            })
            .catch((error) => console.log(error))
        if (!like) {
            axios.post(`/notify/post/${receiver}/liked your post.`)
                .then((response) => {
                }).catch((error) => {
                    console.log(error)
                })
        }
    }


    return (
        <div className='home-wrap'>
            <div className='header'>Home</div>
            <div className='post-form'>
                    <form action="/post" encType='multipart/form-data' method='post' className='home-post-form'>
                        <div className='profile-icon'><img src={"/storage/profile/blank.svg"} alt="" /></div>
                        <div className='post-wrap'>
                            <textarea name="content" value={content} ref={postRef} onChange={updatePost} id="" placeholder="What's up?!" className='text-area'></textarea>
                            <input type="file" name="image" id="" ref={inputRef} accept='image/*' onChange={imageChange} className='image-select' />
                            {display &&
                                <div className='post-image-display'>
                                    <img src={image} alt=""  ref={imageRef}/>
                                    <FontAwesomeIcon icon={faXmarkCircle} className='close-image' onClick={clickClose} />
                                </div>
                            }
                        </div>
                        <div className='post-buttons' ref={buttonsRef}>
                            <div className='emoji-button'>
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
            {posts.map((item, index) => (
                <Link href={`/comment/show/${item.id}`} className='links'>
                    <div className='post-body' key={index} onClick={() => clickPost(item.id)}>
                        <div className='post-header'>
                            <Link href={`/profile/${item.user.id}`} className='links'><img src={item.user.profile.image ? '/storage/' + item.user.profile.image : '/storage/profile/blank.svg'} alt="" className='post-profile-image' /></Link>
                            <div className='post-username-wrap'><Link href={`/profile/${item.user.id}`} className='links'><span className='post-username'>{item.user.name}</span></Link>@{item.user.profile.username}<span className='post-time'><FontAwesomeIcon icon={faCircle} className='circle' />{calcTime(item.created_at)}</span></div>
                            <div className='action-wrap'><FontAwesomeIcon icon={faEllipsis} className='post-action' /></div>
                        </div>
                        <div className='post-content'>
                            {item.content && <p className='user-post-content'>{item.content}</p>}
                            {item.image && <img src={`/storage/${item.image}`} alt="" />}
                            <div className='post-comments'>
                                <div className='comment-wrap'><div className='comment-hover' onClick={(event) => clickComment(event, item)}><FontAwesomeIcon icon={faComment} className='comment-icon' /></div>{item.comments.length}</div>
                                <div className='like-wrap' id={item?.unlike[0]?.id===auth_user.user.id ? 'click-color' :null}><div className='like-hover' onClick={(event) => submitLike(event,item.id,item.user.id)}><FontAwesomeIcon icon={item?.unlike[0]?.id==auth_user.user.id ? SolidHeart : faHeart}  id={item?.unlike[0]?.id==auth_user.user.id ? 'click-color' :null}className='comment-icon' /></div>{item.unlike.length}</div>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}

            {<CommentModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                post={modal_post}
            />}
        </div>
    )
}
