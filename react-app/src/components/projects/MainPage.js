import React from 'react';
import { useSelector } from 'react-redux'
import MainPageStatus from '../DefaultPage';
// import {useParams} from 'react-router-dom'
import './MainPage.css'

function Page(){
    const user = useSelector(state=>state.session.user)
    return (
        <>
        {!user &&
            <div className='home-Page'>
                <img width='1400px' height='550px' src='https://images.unsplash.com/photo-1533628635777-112b2239b1c7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fHRvJTIwZG8lMjBsaXN0JTIwYmFja2dyb3VuZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60'></img>
                <div className='starter-Message'>
                    <p>Welcome to AsanaList Start managing your work with yourself and colleagues</p>
                </div>
                <div className='project-Starter'>Start here</div>
            </div>
        }
        {user && <MainPageStatus />}
        <div></div>
        </>

    )
}

export default Page;
