import React from 'react';
import '../css/header.css';
import { Link } from 'react-router-dom';
import { useLogoutAction } from '../customeHooks/CustomeHooks';

export default function Header()
{
    let token = sessionStorage.getItem('userToken')
    const { logoutState } = useLogoutAction();
    let username = localStorage.getItem('username')

    return(
        <div>
            <div className="header-main">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="header-main-logo-name">To - Do</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="header-list-main-diaplay">
                                {
                                    token !== null ? 
                                    <div className="header-list-main-info"><Link to="/">Home</Link></div> : null
                                }
                                <div className="header-list-main-info"><Link to="/About">About</Link></div>
                                {
                                    token === null ?
                                    <div style={{display : 'flex'}}>
                                        <div className="header-list-main-info"><Link to="/Login">Login</Link></div>
                                        <div className="header-list-main-info"><Link to="/Signup">Signup</Link></div>
                                    </div> : null
                                }
                                {
                                    token !== null ?
                                    <div style={{display : 'flex'}}>
                                        <div className="header-list-main-username-info">Welcome, {username}</div>
                                        <div className="header-list-main-info" onClick={logoutState}><Link to='/Logout'>Logout</Link></div>
                                    </div> : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}