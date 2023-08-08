import { Footer } from '@/Components/Footer';
import { Link, Head } from '@inertiajs/react';
import { faSquareXTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default function Welcome(props) {
    const twitterClick = () =>{
        window.open('https://twitter.com/_kwusu','_blank')
    }

    const githubClick = () =>{
        window.open('https://github.com/samtuga24','_blank')
    }
    
    return (
        <>
            <Head title="Welcome" />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <div className="welcome-nav">
                    {props.auth.user ? (
                        <a
                            href={route('dashboard')}
                            className="/inks font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Dashboard
                        </a>
                    ) : (
                        <>
                            <a
                                href={route('login')}
                                className="links font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Log in
                            </a>

                            <a
                                href={route('register')}
                                className="links ml-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Register
                            </a>
                        </>
                    )}
                </div>
                <div className='welcome-body'>
                    <div className='body-header'>samwus</div>
                    <div className='socials'>
                        <FontAwesomeIcon icon={faSquareXTwitter} className='social-icon' onClick={twitterClick}/>
                        <FontAwesomeIcon icon={faGithub} className='social-icon' onClick={githubClick}/>
                        {/* <FontAwesomeIcon icon={faXTwitter} className='social-icon' /> */}
                    </div>
                </div>
                <Footer />

            </div>

        </>
    );
}
