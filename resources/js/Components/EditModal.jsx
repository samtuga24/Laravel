import React, { useEffect, useRef, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { faXmark, faCamera } from '@fortawesome/free-solid-svg-icons';
import { } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { usePage } from '@inertiajs/react';
export const EditModal = (props) => {
    const auth = usePage().props
    const [remove, setRemove] = useState(false);
    const [remove_url, setRemoveUrl] = useState('')
    const [show, setShow] = useState(false);
    const [header_url, setHeaderUrl] = useState('');
    const [error, setError] = useState("");
    const [select, setSelect] = useState(false);
    const [selectBio, setSelectBio] = useState(false);
    const [selectLocation, setSelectLocation] = useState(false);
    const [selectWebsite, setSelectWebsite] = useState(false);
    const headerRef = useRef(null);
    const imageRef = useRef(null);
    const nameRef = useRef(null);
    const bioRef = useRef(null);
    const locationRef = useRef(null);
    const websiteRef = useRef(null);
    const [header, setHeader] = useState(auth.auth.user.profile.header);
    const [image, setImage] = useState(auth.auth.user.profile.image);
    const [webcount, setWebcount] = useState(0);
    const [locationcount, setLocationcount] = useState(0);
    const [biocount, setBiocount] = useState(0);
    
    console.log("this is the passed data",auth.auth.user.profile.name)
    
    const [form, setForm] = useState({
        name: auth.auth.user.profile.name,
        bio: auth.auth.user.profile.bio,
        location: auth.auth.user.profile.location,
        website: auth.auth.user.profile.website,
    })

    // console.log(form)
    const removeHeader = () =>{
        setRemove(true);
        setShow(false);
        setRemoveUrl("/storage/header/headerdefault.jpg");
    }


    // useEffect(() => {
    //     setLocationcount(form.location.length);
    // }, [form.location]);

    // useEffect(() => {
    //     setBiocount(form.bio.length);
    // }, [form.bio]);

    const onUpdateForm = e => {
        const newFormState = {
            ...form,
            [e.target.name]: e.target.value
        };

        setForm(newFormState);
    }

    const onChangeHeader = (event) => {
        setHeader(event.target.files[0]);
        if (event.target.files && event.target.files[0]) {
            setHeaderUrl(URL.createObjectURL(event.target.files[0]));
            setRemove(false);
            setShow(true)
        }
    }

    const onChangeImage = (event) => {
        setImage(event.target.files[0]);
    }

    const clickWebsite = () => {
        websiteRef.current.focus();
        setSelectWebsite(true)
    }
    const clickLocation = () => {
        locationRef.current.focus();
        setSelectLocation(true)
    }
    const clickEdit = () => {
        nameRef.current.focus();
        setSelect(true)
    }

    const clickBio = () => {
        bioRef.current.focus();
        setSelectBio(true)
    }
    const selectHeader = (event) => {
        headerRef.current.click();
    }

    const selectImage = () => {
        imageRef.current.click();
    }
    let formData = new FormData();
    formData.append('header', header);
    formData.append('image', image);
    formData.append('name', form.name);
    formData.append('bio', form.bio);
    formData.append('location', form.location);
    formData.append('website', form.website);
    formData.append('_method', 'PATCH');

    const submitForm = () => {
        axios.post(`/p/${auth.auth.user.id}`, formData, {
            headers: {
                'Content-Type': "multipart/form-data",
                'enctype': 'multipart/form-data'
            }
        }).then((response) => {
        }).catch((error) => {
            setError(error.response.data.errors)
        })
    }
    console.log(webcount)
    return (
        <Modal
            {...props}
            dialogClassName='modal-wrap'
            scrollable={true}
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header className='modal-header'>
                <Modal.Title className='modal-title'>
                    <div className='close-button rounded-circle' onClick={props.onHide}><FontAwesomeIcon icon={faXmark} className='list-icon' /></div>
                    Edit profile
                </Modal.Title>
                <Button className='save-button' onClick={submitForm}>Save</Button>
            </Modal.Header>
            <Modal.Body className='modal-body'>
                <div className='form-wrap'>
                    <div className='edit-header'>
                        <img src={auth.auth.user.profile.header ? "/storage/"+auth.auth.user.profile.header : "/storage/header/header.jpg"} alt="" />
                        {/* {show && <img src={remove ? remove_url : header_url} alt="" />} */}
                        <div className='select-wrap' onClick={selectHeader}>
                            <FontAwesomeIcon icon={faCamera} className='' />
                        </div>
                        <div className='cancel-wrap' onClick={removeHeader}>
                            <FontAwesomeIcon icon={faXmark} className='' />
                        </div>
                        <input type="file" className='select-header' onChange={onChangeHeader} ref={headerRef} accept='image/*' />
                    </div>
                    <div className='edit-profile-image'>
                        <div className='profile'>
                            <div className='select-profile' onClick={selectImage}><FontAwesomeIcon icon={faCamera} className='' /></div>
                            <img src={auth.auth.user.profile.image ? "/storage/"+auth.auth.user.profile.image : "/storage/profile/blank.svg"} alt="" />
                        </div>
                        <div onClick={selectImage}>
                            <input type="file" onChange={onChangeImage} ref={imageRef} style={{ display: 'none' }} accept='image/*' />
                        </div>
                    </div>
                    <div className='profile-name-wrap'>
                        <div className='edit-form-input' id={select ? 'focus-border' : null} onClick={clickEdit}>
                            <div className={select ? 'show-label' : 'label'}>
                                <span className='label-name' id='focus-color'>Name</span><span className='input-limit-label'>0/50</span>
                            </div>
                            <input type="text" className='name-form-input' name="name" value={form.name} onChange={onUpdateForm} placeholder='Name' ref={nameRef} onBlur={() => setSelect(false)} onFocus={() => setSelect(true)} maxLength={50} />
                        </div>
                        {/* {error.name &&<div className='error'>{error.name}</div>} */}
                    </div>
                    <div className='profile-bio-wrap'>
                        <div className='edit-form-bio' id={selectBio ? 'focus-border' : null} onClick={clickBio}>
                            <div className={selectBio ? 'show-bio-label' : 'label'}>
                                <span className='label-bio' id='focus-color'>Bio</span><span className='bio-limit-label'>{biocount}/160</span>
                            </div>
                            <textarea type="url" className='bio-form-input' name='bio' value={form.bio} onChange={onUpdateForm} placeholder='Bio' maxLength={160} ref={bioRef} onBlur={() => setSelectBio(false)} onFocus={() => setSelectBio(true)}></textarea>
                        </div>
                        {/* {error.bio && <div className='error'>{error.bio}</div>} */}
                    </div>
                    <div className='profile-name-wrap'>
                        <div className='edit-form-input' id={selectLocation ? 'focus-border' : null} onClick={clickLocation}>
                            <div className={selectLocation ? 'show-label' : 'label'}>
                                <span className='label-name' id='focus-color'>Location</span><span className='input-limit-label'>{locationcount}/30</span>
                            </div>
                            <input type="text" className='name-form-input' name='location' placeholder='Location' value={form.location} onChange={onUpdateForm} ref={locationRef} onBlur={() => setSelectLocation(false)} onFocus={() => setSelectLocation(true)} maxLength={30} />
                        </div>
                        {/* {error.location && <div className='error'>{error.location}</div>} */}
                    </div>
                    <div className='profile-name-wrap'>
                        <div className='edit-form-input' id={selectWebsite ? 'focus-border' : null} onClick={clickWebsite}>
                            <div className={selectWebsite ? 'show-label' : 'label'}>
                                <span className='label-name' id='focus-color'>Website</span><span className='input-limit-label'>{webcount}/100</span>
                            </div>
                            <input type="text" className='name-form-input' name='website' placeholder='Website' value={form.website} onChange={onUpdateForm} ref={websiteRef} onBlur={() => setSelectWebsite(false)} onFocus={() => setSelectWebsite(true)} maxLength={100} />
                        </div>
                        {/* {error && <div className='error'>{error.website}</div>} */}
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}
