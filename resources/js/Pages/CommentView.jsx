import Comments from '@/Components/Comments';
import { Home } from '@/Components/Home';
import { Message } from '@/Components/Message';
import { SearchMessage } from '@/Components/SearchMessage';
import { SideNav } from '@/Components/SideNav';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function CommentView({post}) {
    return (
            <div className='dash-wrap'>
                <Head title="Post" />
                <div className='side-nav'><SideNav/></div>
                <div className='home'><Comments post={post}/></div>
                <div className='search-message'><SearchMessage/></div>
            </div>
    );
}
