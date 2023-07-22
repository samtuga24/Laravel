import { Home } from '@/Components/Home';
import { Message } from '@/Components/Message';
import { SearchMessage } from '@/Components/SearchMessage';
import { SideNav } from '@/Components/SideNav';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard(props) {
    const user = props.auth
    localStorage.setItem('SIGNED', JSON.stringify(user));
    console.log(user)
    return (
        // <AuthenticatedLayout
        //     auth={props.auth}
        //     errors={props.errors}
        //     // header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        // >
            <div className='dash-wrap'>
                <Head title="Dashboard" />
                <div className='side-nav'><SideNav/></div>
                <div className='home'><Home/></div>
                <div className='search-message'><SearchMessage/></div>
                {/* <Message/> */}
            </div>
        // </AuthenticatedLayout>
    );
}
