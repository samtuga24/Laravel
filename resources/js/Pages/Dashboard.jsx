import { Home } from '@/Components/Home';
import { Message } from '@/Components/Message';
import { SearchMessage } from '@/Components/SearchMessage';
import { SideNav } from '@/Components/SideNav';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useEffect } from 'react';

export default function Dashboard() {
    return (
            <div className='dash-wrap'>
                <Head title="Dashboard" />
                <div className='side-nav'><SideNav/></div>
                <div className='home'><Home/></div>
                <div className='search-message'><SearchMessage/></div>
                <Message/>
            </div>

    );
}
