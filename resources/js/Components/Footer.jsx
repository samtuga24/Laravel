import React from 'react'
import { faXTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export const Footer = () => {
  return (
    <div className='footer'>
        <div className='copy-right'>samwus&copy;{new Date().getFullYear()}</div>
    </div>
  )
}
