import React, { useEffect, useState } from 'react'
import { faMagnifyingGlass, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Message } from './Message';
import axios from 'axios';
import { Link, usePage } from '@inertiajs/react';
import { useContext } from 'react';
import ProfileContext from '@/context/ProfileContext';
export const SearchMessage = () => {
    let user = usePage().props.auth
    const [focus, setFocus] = useState(false);
    const [cancel, setCancel] = useState(false);
    const [display, setDisplay] = useState(false);
    const [name, setName] = useState('');
    const [result, setResult] = useState([]);
    const [all, setAll] = useState([]);
    const { authenticated, setAuthenticated } = useContext(ProfileContext);
    useEffect(() => {
        if (name.trim().length == 0) {
            setCancel(false);
            setDisplay(false);
        }
    }, [name]);

    useEffect(() => {
        axios.get(`/search/${name}`)
            .then((response) => {
                setResult(response.data.data);
                setDisplay(true);
            }).catch((error) => {
            })
    }, [name])
    useEffect(() => {
        axios.get('/all-users')
            .then((response) => {
                setAll(response.data)
            })
            .catch((error) => { console.log(error) })
    }, [all])
    let matchFollowers = []
    let complement = (a, b) => a.id !== b.id
    const complement_set = all.filter(b => authenticated.every(a => complement(a, b)));
    complement_set.map((item, index) => {
        if (item.user_id !== user.user.id) {
            matchFollowers.push(item)
        }
    })

    const submitFollow = (e,id) => {
        // setToggle(!toggle)
        e.preventDefault();
        axios.post(`/follow/${id}`).then((response) => {
        }).catch((error) => {
            console.log(error)
        })
        // if (!toggle) {
        //     axios.post(`/notify/post/${profile[0].id}/followed you.`)
        //         .then((response) => {
        //             console.log(response)
        //         }).catch((error) => {
        //             console.log(error)
        //         })
        // }
    }

    return (
        <div className='search-wrap'>
            <div className='search-input'>
                <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon' id={focus ? 'search-color' : null} />
                <FontAwesomeIcon icon={faXmarkCircle} className='cancel-icon' id={cancel ? 'display-cancel' : 'hide-cancel'} onClick={() => setName("")} />
                <input type="text" className='search' name="name" onChange={event => setName(event.target.value)} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} onInput={() => setCancel(true)} placeholder="Search" />
            </div>
            {display &&
                <div className='show-result'>
                    {result.map((item, index) => (
                        <Link href={`/profile/${item.id}`} className='links'>
                            <div className='result' key={index}>
                                <div className='result-list'>
                                    <div className='result-image'><img src={item.image ? '/storage/' + item.image : '/storage/profile/blank.svg'} alt="" className='rounded-circle' /></div>
                                    <div className='result-name'><span style={{ fontWeight: '600', marginRight: '0.5vw' }}>{item.user.name}
                                    </span><span className='result-handle'>@{item.username}</span></div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            }

            <div className='gallery-wrap'>
                <div className='gallery-row-1'>
                    <div className='gallery-col-1'></div>
                    <div className='gallery-col-2'></div>
                    <div className='gallery-col-3'></div>
                </div>
                <div className='gallery-row-2'>
                    <div className='row2-col-1'></div>
                    <div className='row2-col-2'></div>
                    <div className='row2-col-3'></div>
                </div>
            </div>
            <div className='who-to-follow'>
                <div className='who-header'>Who to follow</div>
                {matchFollowers.map((item, index) => (
                    <Link href={`/profile/${item.id}`} className='links'>
                        <div className='who-following-body' key={index}>
                            <div className='following-image'>
                                <img src="/storage/profile/blank.svg" alt="" />
                                <div className='following-name'>
                                    <span className='following-username'>{item.name}</span>
                                    <span className='following-handle'>@{item.username}</span>
                                </div>
                            </div>
                            <button className='who-following-button' onClick={(e) => submitFollow(e,item.id)}>Follow</button>
                        </div>
                    </Link>
                ))}
                <div className='show-more'>show more</div>
            </div>
        </div>
    )
}
