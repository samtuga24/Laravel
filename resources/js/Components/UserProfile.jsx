import React, { useState } from 'react'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLocationDot, faCalendarDays, faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { EditModal } from './EditModal';
export const UserProfile = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const [post, setPost] = useState(true)
    const [media, setMedia] = useState(false)
    const [like, setLike] = useState(false)

    const clickPost = () => {
        setPost(true)
        setMedia(false)
        setLike(false)
    }
    const clickMedia = () => {
        setPost(false)
        setMedia(true)
        setLike(false)
    }
    const clickLike = () => {
        setPost(false)
        setMedia(false)
        setLike(true)
    }
    console.log(props)
    return (
        <div className='profile-wrap'>
            <div className='header'>Samtuga</div>
            <div className='profile-header'></div>
            <div className='user-profile-image'>
                <div className='user-image-wrap'><img src="" alt="" /></div>
            </div>
            <div className='edit-button'>
                <button className='edit-profile' onClick={() => setModalShow(true)}>Edit profile</button>
                <div className='profile-message'><FontAwesomeIcon icon={faEnvelope} className='' /></div>
            </div>
            
      <EditModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
            <div className='user-handle'>
                <div className='username'>Sammy</div>
                <div className='handle'>@_kwusu</div>
                <div className='bio'>This is my bio</div>
                <div className='location-wrap'>
                    <div className='location'><FontAwesomeIcon icon={faLocationDot} className='' /><span className='location-text'>Tema</span></div>
                    <div className='calendar'><FontAwesomeIcon icon={faCalendarDays} className='' /><span className='location-text'>Joined July 2023</span></div>
                    <div className='website'><FontAwesomeIcon icon={faLink} className='' /><span className=''><a href="" className='website-text'>https://www.website.com</a></span></div>
                </div>
                <div className='profile-following'>
                    <div className='ff-count'><span className='count'>100</span><span className='ff'> Following</span></div>
                    <div className='ff-count'><span className='count'>100</span><span className='ff'> Followers</span></div>
                </div>
            </div>

            <div className='profile-tabs'>
                <div className='post-tab' onClick={clickPost}>
                    Posts
                    {post && <div className='post-tab-decoration'></div>}
                </div>
                <div className='media-tab' onClick={clickMedia}>
                    Media
                    {media && <div className='media-tab-decoration'></div>}
                </div>
                <div className='like-tab' onClick={clickLike}>
                    Likes
                    {like && <div className='like-tab-decoration'></div>}
                </div>
            </div>
        </div>

    )
}
