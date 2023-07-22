import React, { useEffect, useState } from 'react'
import { faMagnifyingGlass, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Message } from './Message';
import axios from 'axios';
import { Link } from '@inertiajs/react';
export const SearchMessage = () => {
    const [focus, setFocus] = useState(false);
    const [cancel, setCancel] = useState(false);
    const [search, setSearch] = useState('');
    const [result, setResult] = useState([]);
    useEffect(() => {
        if (search.trim().length == 0) {
            setCancel(false);
        }
    }, [search]);

    const sendSearch = () => {
        axios.get(`/search/${search}`)
            .then((response) => {
                setResult(response.data.search.data);
                // setResult("lol")
            }).catch((error) => {
                console.log(error);
            })
    }
    const onKeyPress = (e) => {
        if (e.which === 13) {
            sendSearch();
            e.preventDefault();
        }
    }

    console.log(result)
    return (
        <div className='search-wrap'>
            <div className='search-input'>
                <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon' id={focus ? 'search-color' : null} />
                <FontAwesomeIcon icon={faXmarkCircle} className='cancel-icon' id={cancel ? 'display-cancel' : 'hide-cancel'} />
                <input type="text" className='search' name="search" onChange={event => setSearch(event.target.value)} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} onInput={() => setCancel(true)} placeholder="Search" onKeyDown={onKeyPress} />
            </div>

            <div className='result-wrap'>
                {result.map((item, index) => (
                    <Link href={`/profile/${item.id}`} className='links'>
                        <div className='result' key={index}>
                            <div className='result-list'>
                                <div className='result-image'><img src={item.image ? '/storage/'+item.image : '/storage/profile/blank.svg'} alt="" className='rounded-circle' /></div>
                                <div className='result-name'><span style={{ fontWeight: '600', marginRight: '0.5vw' }}>{item.user.name}
                                </span>@{item.username}</div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
