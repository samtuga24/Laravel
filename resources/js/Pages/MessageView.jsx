import { Home } from '@/Components/Home';
import { Message } from '@/Components/Message';
import { SearchMessage } from '@/Components/SearchMessage';
import { SideNav } from '@/Components/SideNav';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Chat  from './Chat';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

export default function MessageView({profile, messages, receiver_id}) {
    console.log(messages)
    return (
        <div className='dash-wrap'>
        <div className='side-nav'><SideNav /></div>
        <div className='home'><Chat username={profile.username} image={profile.image} receiver_id={receiver_id} loadmessages={messages}/></div>
        <div className='search-message'><SearchMessage /></div>
    </div>
    );
}
