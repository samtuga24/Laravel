import React, { useEffect, useRef, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { faXmark, faCamera } from '@fortawesome/free-solid-svg-icons';
import { } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { usePage } from '@inertiajs/react';
export const EditModal = (props) => {
    const auth = usePage().props
    const [header_url, setHeaderUrl] = useState(null)
    const [image_url, setImageUrl] = useState(null);
    const [error, setError] = useState([]);
    const [select, setSelect] = useState(false);
    const [selectBio, setSelectBio] = useState(false);
    const [selectLocation, setSelectLocation] = useState(false);
    const [selectWebsite, setSelectWebsite] = useState(false);
    const [resetHeader, setReset] = useState(auth.profile[0].header);
    const [resetImage, setImageReset] = useState(auth.profile[0].image);
    const headerRef = useRef(null);
    const imageRef = useRef(null);
    const nameRef = useRef(null);
    const bioRef = useRef(null);
    const locationRef = useRef(null);
    const websiteRef = useRef(null);
    const [header, setHeader] = useState([]);
    const [image, setImage] = useState([]);
    const [namecount, setNameCount] = useState(0)
    const [biocount, setBioCount] = useState(0)
    const [locationcount, setLocationCount] = useState(0)
    const [webcount, setWebCount] = useState(0)

    const [form, setForm] = useState({
        name: auth.profile[0].name,
        bio: auth.profile[0].bio ?? "",
        location: auth.profile[0].location ?? "",
        website: auth.profile[0].website ?? "",
    })

    useEffect(()=>{
        setNameCount(form.name.trim().length)
    },[form.name])
    useEffect(()=>{
        setBioCount(form.bio.trim().length)
    },[form.bio])
    useEffect(()=>{
        setLocationCount(form.location.trim().length)
    },[form.location])
    useEffect(()=>{
        setWebCount(form.website.trim().length)
    },[form.website])
    const removeHeader = () => {
        setHeader(null);
    }

    const onUpdateForm = e => {
        const newFormState = {
            ...form,
            [e.target.name]: e.target.value
        };

        setForm(newFormState);
    }

    const onChangeHeader = (event) => {
        
        if (event.target.files && event.target.files[0]) {
            setHeaderUrl(URL.createObjectURL(event.target.files[0]));
            setHeader(event.target.files[0]);
            setReset(null)
        } 
    }

    const onChangeImage = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImageUrl(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
            setImageReset(null)
        } 
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
        axios.post(`/p/${auth.profile[0].user.id}`, formData, {
            headers: {
                'Content-Type': "multipart/form-data",
                'enctype': 'multipart/form-data'
            }
        }).then((response) => {
            location.reload()
        }).catch((error) => {
            setError(error.response.data.errors)
        })
    }

    const closeModal = () =>{
        setReset(auth.profile[0].header)
    }
    let name_error = error?.name;
    let header_error = error?.header;
    let image_error = error?.image;
    let website_error = error?.website;

    return (
        <Modal
            {...props}
            dialogClassName='modal-wrap'
            scrollable={true}
            aria-labelledby="contained-modal-title-vcenter"
        >
 
            <Modal.Header className='modal-header'>
                <Modal.Title className='modal-title'>
                    <div className='close-button rounded-circle' onClick={props.onHide}><span className='list-edit-icon' onClick={closeModal}><FontAwesomeIcon icon={faXmark}/></span></div>
                    Edit profile
                </Modal.Title>
                <Button className='save-button' onClick={submitForm}>Save</Button>
            </Modal.Header>
            <Modal.Body className='modal-body'>
                <div className='form-wrap'>
                    <div className='edit-header'>
                        <img src={resetHeader ? "/storage/" + auth.profile[0].header : (header_url ?? "/storage/header/header.jpg")} alt="" />
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
                            <img src={resetImage ? "/storage/" + auth.profile[0].image : (image_url ?? "/storage/profile/blank.svg")} alt="" />
                        </div>
                        <div onClick={selectImage}>
                            <input type="file" onChange={onChangeImage} ref={imageRef} style={{ display: 'none' }} accept='image/*' />
                        </div>
                    </div>
                    <div className='profile-name-wrap'>
                        <div className='edit-form-input' id={select ? 'focus-border' : null} onClick={clickEdit}>
                            <div className={select ? 'show-label' : 'label'}>
                                <span className='label-name' id='focus-color'>Name</span><span className='input-limit-label'>{namecount}/50</span>
                            </div>
                            <input type="text" className='name-form-input' name="name" value={form.name} onChange={onUpdateForm} placeholder='Name' ref={nameRef} onBlur={() => setSelect(false)} onFocus={() => setSelect(true)} maxLength={50} />
                        </div>
                        {error?.name &&<div className='error'>{name_error}</div>}
                    </div>
                    <div className='profile-bio-wrap'>
                        <div className='edit-form-bio' id={selectBio ? 'focus-border' : null} onClick={clickBio}>
                            <div className={selectBio ? 'show-bio-label' : 'label'}>
                                <span className='label-bio' id='focus-color'>Bio</span><span className='bio-limit-label'>{biocount}/160</span>
                            </div>
                            <textarea type="url" className='bio-form-input' name='bio' value={form.bio} onChange={onUpdateForm} placeholder='Bio' maxLength={160} ref={bioRef} onBlur={() => setSelectBio(false)} onFocus={() => setSelectBio(true)}></textarea>
                        </div>
                    </div>
                    <div className='profile-name-wrap'>
                        <div className='edit-form-input' id={selectLocation ? 'focus-border' : null} onClick={clickLocation}>
                            <div className={selectLocation ? 'show-label' : 'label'}>
                                <span className='label-name' id='focus-color'>Location</span><span className='input-limit-label'>{locationcount}/30</span>
                            </div>
                            <input type="text" className='name-form-input' name='location' placeholder='Location' value={form.location} onChange={onUpdateForm} ref={locationRef} onBlur={() => setSelectLocation(false)} onFocus={() => setSelectLocation(true)} maxLength={30} />
                        </div>
                    </div>
                    <div className='profile-name-wrap'>
                        <div className='edit-form-input' id={selectWebsite ? 'focus-border' : null} onClick={clickWebsite}>
                            <div className={selectWebsite ? 'show-label' : 'label'}>
                                <span className='label-name' id='focus-color'>Website</span><span className='input-limit-label'>{webcount}/100</span>
                            </div>
                            <input type="text" className='name-form-input' name='website' placeholder='Website' value={form.website} onChange={onUpdateForm} ref={websiteRef} onBlur={() => setSelectWebsite(false)} onFocus={() => setSelectWebsite(true)} maxLength={100} />
                        </div>
                        {error?.website && <div className='error'>{website_error}</div>}
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}
