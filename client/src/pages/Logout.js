import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MaterialProgress from '../components/ProgressBar';

export default function Logout(){

    const [ redirect, setRedirect ] = useState(false)
    const [ progressBar, setProgressBar ] = useState(true)
    let timer = setTimeout(()=>{
        setProgressBar(false)
        setRedirect(true)
    },2000)
    var token = sessionStorage.getItem('userToken')
    useEffect(()=>{
        window.scrollTo(0,0)
        return () =>{
            clearTimeout(timer)
        }
    },[redirect,timer])

    return(
        <div>
            <Header />
            {
                token !== null ? <Redirect ti='/'/> : null
            }
            <div className="logout-main">
                {
                    progressBar ? 
                    <div className="progress-bar-sticky">  
                        <MaterialProgress/>                      
                    </div> : null
                }
                {
                    redirect === true ? <Redirect to='/Login'/> : <div className="logout-main-info">Your Session getting Logged out Please wait...</div>
                }
            </div>
            <Footer />
        </div>
    )
}