import React from 'react'
import { faXmark, faCamera, faCircle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { faImage, faSmile } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Modal } from 'react-bootstrap';
import { Link } from '@inertiajs/react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
export const CommentModal = (props) => {
  let post = props.post
  let comments = props.comments
  // let comment_id;
  // let post_id;
  // if(post?.content){
  //   post_id = post?.id
  // }else{
  //   comment_id=post?.id
  // }
  console.log('comment_id',post?.id)
  console.log('comments',comments)
  // console.log('post_id',post?.id)
  const [display, setDisplay] = useState(false);
  const [comment, setContent] = useState('');
  const [image, setImage] = useState([]);
  const postRef = useRef();
  const areaRef = useRef();
  const [emoji, setEmoji] = useState(false);

  useEffect(() => {
    if (postRef && postRef.current) {
      postRef.current.style.height = "0px";
      const taHeight = postRef.current.scrollHeight;
      postRef.current.style.height = taHeight + "px";
    }
  }, [comment])
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

  const clickClose = () => {
    setImage(null)
    setDisplay(false)
    alert(display)
  }

  const clickEmoji = () => {
    setEmoji(!emoji)
  }

  const onEmojiClick = (event) => {
    setContent(prevPost => prevPost + event.emoji);
  }

  const submitComment = (event) => {
    event.preventDefault();
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
  // console.log("commenet-modal", post)
  return (
    <Modal
      {...props}
      dialogClassName='modal-comment-wrap'
      scrollable={true}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Title className='comment-modal-title'>
        <div className='close-button rounded-circle' onClick={props.onHide}><FontAwesomeIcon icon={faXmark} className='list-icon' /></div>
      </Modal.Title>
      {post?.content &&
        <Modal.Body className='comment-modal-body'>
          <div className='modal-post-body'>
            <div className='post-header'>
              <Link href="#" className='links'><img src={post?.user.profile.image ? '/storage/' + post?.user.profile.image : '/storage/profile/blank.svg'} alt="" className='post-profile-image' /></Link>
              <div className='post-username-wrap'><Link href="#" className='links'><span className='post-username'>{post?.user.profile.name}</span></Link>@{post?.user.profile.username}<span className='post-time'><FontAwesomeIcon icon={faCircle} className='circle' />{calcTime(post?.created_at)}</span></div>
            </div>
            <div className='post-content'>
              <p className='user-post-content'>{post?.content}</p>
              {post?.image && <p className='user-post-content'>{post?.image}</p>}

            </div>
          </div>
          <div className='modal-comment-form'>
            <form action={`/comment/${post?.id}`} encType='multipart/form-data' method='post' className='comment-post-form'>
              <div className='profile-icon'><img src={"/storage/profile/blank.svg"} alt="" /></div>
              <div className='post-wrap'>
                <textarea name="comment" value={comment} ref={postRef} onChange={updatePost} id="" placeholder="What's up?!" className='text-area'></textarea>
                <input type="file" name="image" id="" ref={inputRef} accept='image/*' onChange={imageChange} className='image-select' />
                {display &&
                  <div className='post-comment-image-display'>
                    <img src={image} alt="" />
                    <FontAwesomeIcon icon={faXmarkCircle} className='comment-close-image' onClick={clickClose} />
                  </div>
                }
              </div>
              <div className='post-buttons'>
                <div className='emoji-button'>
                  <div className='image-icon'><FontAwesomeIcon icon={faImage} onClick={selectFile} /></div>
                  <div className='smile-icon'><FontAwesomeIcon icon={faSmile} onClick={clickEmoji} />
                    {emoji &&
                      <div className='comment-emoji-picker'><EmojiPicker height={400} width="100%" onEmojiClick={onEmojiClick} /></div>
                    }
                  </div>
                </div>
                <div className='post-submit'><Button disabled={display || comment.trim().length > 0 ? false : true} type='submit' className='sub'>Reply</Button></div>
              </div>
            </form>
          </div>
        </Modal.Body>
      }

      {comments?.comment &&
        <Modal.Body className='comment-modal-body'>
          <div className='modal-post-body'>
            <div className='post-header'>
              <Link href="#" className='links'><img src={comments?.user.profile.image ? '/storage/' + comments?.user.profile.image : '/storage/profile/blank.svg'} alt="" className='post-profile-image' /></Link>
              <div className='post-username-wrap'><Link href="#" className='links'><span className='post-username'>{comments?.user.profile.name}</span></Link>@{comments?.user.profile.username}<span className='post-time'><FontAwesomeIcon icon={faCircle} className='circle' />{calcTime(comments?.created_at)}</span></div>
            </div>
            <div className='post-content'>
              <p className='user-post-content'>{comments?.comment}</p>
              {post?.image && <p className='user-post-content'>{post?.image}</p>}

            </div>
          </div>
          <div className='modal-comment-form'>
            <form action={`/comment/${comments?.id}/${comments?.post_id}`} encType='multipart/form-data' method='post' className='comment-post-form'>
              <div className='profile-icon'><img src={"/storage/profile/blank.svg"} alt="" /></div>
              <div className='post-wrap'>
                <textarea name="comment" value={comment} ref={postRef} onChange={updatePost} id="" placeholder="What's up?!" className='text-area'></textarea>
                <input type="file" name="image" id="" ref={inputRef} accept='image/*' onChange={imageChange} className='image-select' />
                {display &&
                  <div className='post-comment-image-display'>
                    <img src={image} alt="" />
                    <FontAwesomeIcon icon={faXmarkCircle} className='comment-close-image' onClick={clickClose} />
                  </div>
                }
              </div>
              <div className='post-buttons'>
                <div className='emoji-button'>
                  <div className='image-icon'><FontAwesomeIcon icon={faImage} onClick={selectFile} /></div>
                  <div className='smile-icon'><FontAwesomeIcon icon={faSmile} onClick={clickEmoji} />
                    {emoji &&
                      <div className='comment-emoji-picker'><EmojiPicker height={400} width="100%" onEmojiClick={onEmojiClick} /></div>
                    }
                  </div>
                </div>
                <div className='post-submit'><Button disabled={display || comment.trim().length > 0 ? false : true} type='submit' className='sub'>Reply</Button></div>
              </div>
            </form>
          </div>
        </Modal.Body>
      }
    </Modal>
  )
}
