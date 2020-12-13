import React, { Component } from 'react';
import '../css/form.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MaterialProgressBar from '../components/ProgressBar';
import { url } from '../config';

class Signup extends Component
{

    constructor(props){
        super(props);
        this.state={
            username:'',password:'',
            formField:['username','password'],
            usernameError:'',passwordError:'',
            successMessage:false,formError:'',
            showLoadingBar : false
        }
    }
    
    componentDidMount(){
        window.scrollTo(0,0)
    }

    handleInputChange = (e) =>{
        this.setState({ [e.target.name] : e.target.value })
        if(this.state.formError !== ''){
            this.setState({ formError : '' })
        }
        if([e.target.name+'Error'] !== ''){
            this.setState({ [e.target.name+'Error'] : '' })
        }
    }
    
    handleSubmit = (e) =>{
        e.preventDefault();
        var validation = this.validation();
        if(validation){
            this.setState({ showLoadingBar : true })
            const username = this.state.username;
            const password = this.state.password;
            const newUserInfo = { username : username, password : password };
            console.log(newUserInfo)
            axios.post(`${url}/userAccount/newUser/signup`,newUserInfo)
            .then((responseData)=>{
                if(responseData.status === 200){
                    this.setState({ successMessage : true, showLoadingBar : false })
                    this.resetForm()
                }
            })
            .catch(()=>{
                console.log("Error")
                this.setState({ formError : 'Username already Exist', showLoadingBar : false })
            })
        }
    }

    resetForm = () =>{
        this.setState({ username : '', password : '' })
    }

    validation = () =>{
        var validationError;
        var result = true;
        this.state.formField.map((name) =>{
            if(this.state[name] === ''){
                validationError = name+'Error';
                this.setState({ [validationError] : `Please Enter ${name}` })
                result = false;
            }
            if(name === "password"){
                if(this.state[name] === ''){
                    validationError = name+'Error';
                    this.setState({ [validationError] : `Please Enter ${name}` })
                    result = false;
                }
                if(this.state[name] !=='' && this.state[name].length < 8){
                    validationError = name+'Error';
                    this.setState({ [validationError] : 'Password  Must be atleast 8 character' })
                    result = false;
                }
            }
        })
        return result;
    }

    render()
    {
        document.title = "Todo | Signup"

        return(
            <div>
                <Header/>
                {
                    this.state.showLoadingBar ? 
                    <div className="progress-bar-sticky">  
                        <MaterialProgressBar/>                      
                    </div> : null
                }
                <div className="form-main">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-4 mx-auto">
                                <div className="form-main-container">
                                    <div className="form-main-heading">Create Account</div>
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-main-label-name">Username:</div>
                                        <input 
                                            type="text" 
                                            name="username"
                                            value={this.state.username}
                                            onChange={this.handleInputChange}
                                            className={this.state.usernameError === '' || this.state.formError === '' ? "form-main-input-field" : "form-main-error-input-field"} 
                                        />
                                        {
                                            this.state.usernameError !== ''?
                                            <div className="form-input-error">{this.state.usernameError}</div> : null
                                        }
                                        {
                                            this.state.formError !== ''?
                                            <div className="form-input-error">{this.state.formError}</div> : null
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
                                            this.state.emailError !== ''?
                                            <div className="form-input-error">{this.state.passwordError}</div> : null
                                        }
                                        <button className="form-main-button">Signup</button>
                                        {
                                            this.state.successMessage ?
                                            <div className="form-input-success-message">Accoutn Created Sccessfully <Link to='/Login'>Click here</Link> to login</div> : null
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

export default Signup