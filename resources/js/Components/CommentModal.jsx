import React from 'react'
import { faXmark, faCamera, faCircle } from '@fortawesome/free-solid-svg-icons';
// import { } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Modal } from 'react-bootstrap';
import { Link } from '@inertiajs/react';
export const CommentModal = (props) => {
  let post = props.post
  console.log("commenet-modal", post)
  return (
    <Modal
      {...props}
      dialogClassName='comment-wrap'
      scrollable={true}
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header className='modal-header'>
        <Modal.Title className='modal-title'>
          <div className='close-button rounded-circle' onClick={props.onHide}><FontAwesomeIcon icon={faXmark} className='list-icon' /></div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='comment-modal-body'>
        <div className='modal-post-body'>
          <div className='post-header'>
            <Link href="#" className='links'><img src='/storage/profile/blank.svg' alt="" className='post-profile-image' /></Link>
            <div className='post-username-wrap'><Link href="#" className='links'><span className='post-username'>samwus</span></Link>@kwusu23<span className='post-time'><FontAwesomeIcon icon={faCircle} className='circle' />2h</span></div>
          </div>
          <div className='post-content'>
            <p className='user-post-content'>jhvjhvjhvjhvjhvjhvj</p>
            {/* {item.image && <img src={`/storage/${item.image}`} alt="" />} */}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
