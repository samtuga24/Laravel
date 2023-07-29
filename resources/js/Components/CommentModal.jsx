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

const submitComment = (event) =>{
  event.preventDefault();
}
  console.log("commenet-modal", post)
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
      <Modal.Body className='comment-modal-body'>
        <div className='modal-post-body'>
          <div className='post-header'>
            <Link href="#" className='links'><img src={post?.user.profile.image ? '/storage/'+ post?.user.profile.image : '/storage/profile/blank.svg'} alt="" className='post-profile-image' /></Link>
            <div className='post-username-wrap'><Link href="#" className='links'><span className='post-username'>{post?.user.profile.name}</span></Link>@{post?.user.profile.username}<span className='post-time'><FontAwesomeIcon icon={faCircle} className='circle' />2h</span></div>
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
    </Modal>
  )
}
