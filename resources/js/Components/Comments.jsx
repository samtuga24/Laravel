import { faAnglesUp, faXmarkCircle, faEllipsis, faCircle } from '@fortawesome/free-solid-svg-icons';
import { faImage, faSmile, faHeart, faComment } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'react-bootstrap';
import { useState } from 'react';
import { useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { useEffect } from 'react';
import { Link } from '@inertiajs/react';
export default function Comments(props) {
    let post = props.post;
    console.log(post[0].comments)
    const [commentCount, setCount] = useState(0);
    const [display, setDisplay] = useState(false);
    const [comment, setContent] = useState('');
    const [image, setImage] = useState([]);
    const post_comment = [post[0].comments.length];
    const post_like = [post[0].unlike.length];
    console.log("likes",post_like)
    // console.log(post_comment.length)
    const [emoji, setEmoji] = useState(false);
    const postRef = useRef();
    const areaRef = useRef();
    console.log(post_comment)
    useEffect(() => {
        if (postRef && postRef.current) {
            postRef.current.style.height = "0px";
            const taHeight = postRef.current.scrollHeight;
            postRef.current.style.height = taHeight + "px";
            areaRef.current.style.height = taHeight + "px";
        }
    }, [comment])

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
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = new Date(post[0].created_at);

    const imageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
            setDisplay(true);
        }
    }

    const updatePost = (event) => {
        setContent(event.target.value)
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

    const onEmojiClick = (event) => {
        setContent(prevPost => prevPost + event.emoji);
    }


    return (
            <div className='comment-body'>
                <div className='post-header'>
                    <img src={post[0].user.profile.image ? "/storage/" + post[0].user.profile.image : "/storage/profile/blank.svg"} alt="" className='post-profile-image' />
                    <div className='post-comment-wrap'><span className='post-username'>{post[0].user.name}</span><span className='comment-handle'>@{post[0].user.username}</span></div>
                    <div className='action-wrap'><FontAwesomeIcon icon={faEllipsis} className='post-action' /></div>
                </div>
                <div className='post-comment-comment'>
                    {post[0].content && <p className='user-post-comment'>{post[0].content}</p>}
                    {post[0].image && <img src={"/storage/" + post[0].image} alt="" />}
                    <div className='comments'>
                        {date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}<FontAwesomeIcon icon={faCircle} className='seperate-time' />{month[date.getUTCMonth()]} {date.getUTCDate()}, {date.getUTCFullYear()}
                    </div>

                    <div className='comments'>
                        <div className='comment-activity'><span className='comment-count'>{post_comment}</span>Comments</div>
                        <div className='like-activity'><span className='comment-count'>{post_like}</span>Likes</div>
                    </div>

                    <div className='comments'>
                        <div className='comment-wrap'><div className='comment-hover'><FontAwesomeIcon icon={faComment} className='comment-icon' /></div>{post_comment}</div>
                        <div className='like-wrap'><div className='like-hover'><FontAwesomeIcon icon={faHeart} className='comment-icon' /></div>{post_like}</div>
                    </div>
                </div>

                <div className='comment-form'>
                    <div className='profile-icon'><img src="/storage/profile/blank.svg" alt="" /></div>
                    <div className='input-form' ref={areaRef}>
                        <form action={"/comment/" + post[0].id} encType='multipart/form-data' method='post' style={{ position: 'relative' }}>
                            <textarea name="comment" id="" ref={postRef} value={comment} onChange={updatePost} placeholder="What's up?!" maxLength={200} className='text-area'></textarea>
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
                                <div className='post-submit'><Button disabled={display || comment.trim().length > 0 ? false : true} type='submit' className='sub'>post</Button></div>
                            </div>
                        </form>
                    </div>
                </div>

                <div className='comment-view'>
                    {post[0].comments.map((item, index) => {
                        
                        return (
                            <div className='post-body'>
                                <div className='post-header'>
                                    <Link href="#" className='links'><img src={post[0].user.profile.image ? "/storage/" + post[0].user.profile.image : "/storage/profile/blank.svg"} alt="" className='post-profile-image' /></Link>
                                    <div className='post-username-wrap'><Link href="#" className='links'><span className='post-username'>{post[0].user.name}</span></Link>@{post[0].user.username}<span className='post-time'><FontAwesomeIcon icon={faCircle} className='circle' />{calcTime(item.created_at)}</span></div>
                                    <div className='action-wrap'><FontAwesomeIcon icon={faEllipsis} className='post-action' /></div>
                                </div>
                                <div className='post-content'>
                                    <p className='user-post-content'>{item.comment}</p>
                                    <img src={item.image ? "/storage/" + item.image : null} alt="" />

                                    <div className='post-comments'>
                                        <div className='comment-wrap'><div className='comment-hover'><FontAwesomeIcon icon={faComment} className='comment-icon' /></div></div>
                                        <div className='like-wrap'><div className='like-hover'><FontAwesomeIcon icon={faHeart} className='comment-icon' /></div></div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
    );
}
