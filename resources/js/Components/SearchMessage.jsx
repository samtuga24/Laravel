import React, { useEffect, useState } from 'react'
import { faMagnifyingGlass, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Message } from './Message';
import axios from 'axios';
import { Link } from '@inertiajs/react';
export const SearchMessage = () => {
    const [focus, setFocus] = useState(false);
    const [cancel, setCancel] = useState(false);
    const [display, setDisplay] = useState(false);
    const [name, setName] = useState('');
    const [result, setResult] = useState([]);
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
                // console.log(error);
            })
    }, [name])
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
        </div>
    )
}
