import React, { Component } from 'react';
import '../css/form.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { url } from '../config';

class Login extends Component
{

    constructor(props){
        const token = sessionStorage.getItem('userToken')
        let loggedIn = false;
        if(token !== null){
            loggedIn = true
        }
        super(props);
        this.state={
            username : '',password : '',
            formList:['username','password'],
            usernameError:'',passwordError:'',
            loggedIn,formError : ''
        }
    }

    componentDidMount(){
        window.scrollTo(0,0)
    }

    handleInputChange = (e) =>{
        this.setState({ [e.target.name] : e.target.value })
        if( [e.target.name+'Error'] || this.state.formError !== '' ){
            this.setState({ [e.target.name+'Error'] : '', formError : '' })
        }
    }

    handleFormSubmit = (e) =>{
        e.preventDefault()
        let validation = this.formValidation()
        if(validation){
            console.log(url)
            const username = this.state.username;
            const password = this.state.password;
            const newInfo  = { username : username, password : password }
            axios.post(`${url}/userAccount/User/Login`,newInfo)
            .then((responseData)=>{
                if(responseData.status === 200){
                    sessionStorage.setItem('userToken','asdsajfs212u32u14gudshbhsdb%^%&^sjdhsbdfjs')
                    localStorage.setItem('username', responseData.data.username)
                    this.setState({ loggedIn : true })
                }
            })
            .catch(()=>{
                console.log("Hello")
                this.setState({ formError : 'Invalid Username or Password' })
                console.log("error")
            })

        }
    }

    formValidation = () =>{
        let result = true;
        let formError;
        this.state.formList.map((name) =>{
            if(this.state[name] === ''){
                formError = name+'Error'
                this.setState({ [formError] : `Please Enter ${name}` })
                result = false
            }
        })
        return result
    }


    render()
    {
        document.title = "Todo | Login"

        if(this.state.loggedIn === true){
            return <Redirect to='/'/>
        }
        return(
            <div>
                <Header/>
                <div className="form-main">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-4 mx-auto">
                                <div className="form-main-container">
                                    <div className="form-main-heading">Welcome to To-Do</div>
                                    <form>
                                        <div className="form-main-label-name">Username:</div>
                                        <input 
                                            type="text" 
                                            name="username"
                                            value={this.state.value}
                                            onChange={this.handleInputChange}
                                            className={this.state.usernameError === '' ? "form-main-input-field" : "form-main-error-input-field"} 
                                        />
                                        {
                                            this.state.usernameError !== ''?
                                            <div className="form-input-error">{this.state.usernameError}</div> : null
                                        }
                                        <div className="form-main-label-name">Password:</div>
                                        <input 
                                            type="password"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.handleInputChange} 
                                            className={this.state.passwordError === '' ? "form-main-input-field" : "form-main-error-input-field"}  
                                        />
                                        {
                                            this.state.passwordError !== ''?
                                            <div className="form-input-error">{this.state.passwordError}</div> : null
                                        }
                                        <div className="form-main-forgot"><Link to="/Forgotpassword">Forgot Password?</Link></div>
                                        <button className="form-main-button" onClick={this.handleFormSubmit}>Login</button>
                                        {
                                            this.state.formError !== ''?
                                            <div className="form-input-error">{this.state.formError}</div> : null
                                        }
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

export default Login