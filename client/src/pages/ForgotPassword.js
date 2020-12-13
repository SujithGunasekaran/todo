import React, { Component } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MaterialProgressBar from '../components/ProgressBar';
import { url } from '../config';

class ForgotPassword extends Component
{

    state={
        username : '',password : '',
        usernameError : '', passwordError : '',
        formField:['username','password'],formError:'',
        currentPageIndex:0,showLoading:false,successMessage:false
    }

    componentDidMount(){
        window.scrollTo(0,0)
    }

    handleInputChange = (e) =>{
        this.setState({ [e.target.name] : e.target.value })
        if( [e.target.name+'Error'] !== ''){
            this.setState({ [e.target.name+'Error'] : '' })
        }
        if(this.state.formError !== ''){
            this.setState({ formError : '' })
        }
    }

    handleFormSubmit = (e) =>{
        e.preventDefault();
        var validation = this.validation()
        if(validation){
            if(this.state.currentPageIndex === 0){
                this.setState({ showLoading : true })
                const username = this.state.username;
                const checkUsername = { username : username }
                axios.post(`${url}/userAccount/User/checkUsername`,checkUsername)
                .then((responseData)=>{
                    if(responseData.status === 200){
                        this.setState({ currentPageIndex : this.state.currentPageIndex + 1, showLoading : false })
                    }
                })
                .catch(()=>{
                    console.log("Error")
                    this.setState({ showLoading : false, formError : "Username doesn't Exist" })
                })
            }
            if(this.state.currentPageIndex === 1){
                this.setState({ showLoading : true })
                const username = this.state.username;
                const password = this.state.password;
                const passwordUpdate = { username : username, password : password }
                axios.post(`${url}/userAccount/User/passwordReset`,passwordUpdate)
                .then((responseData)=>{
                    if(responseData.status === 200){
                        this.setState({ showLoading : false, successMessage : true })
                        this.resetInputField()
                    }
                })
                .catch(()=>{
                    console.log("error")
                    this.setState({ showLoading : false })
                })
            }
        }
    }

    resetInputField = () =>{
        this.setState({ usernaem : '', password : ''})
    }

    validation = () =>{
        let validationError;
        let result = true;
        this.state.formField.map((name)=>{
            if(this.state.currentPageIndex === 0 && name === 'username'){
                if(this.state[name] === ''){
                    validationError = name+'Error';
                    this.setState({ [validationError] : `Please Enter ${name}` })
                    result = false;
                }
            }
            if(this.state.currentPageIndex === 1 && name === 'password'){
                if(this.state[name] === ''){
                    validationError = name+'Error';
                    this.setState({ [validationError] : `Please Enter ${name}` })
                    result = false;
                }
                else if(this.state[name] !== '' && this.state[name].length < 8){
                    validationError = name+'Error';
                    this.setState({ [validationError] : 'Password must be atleast 8 character length' })
                    result = false;
                }
            }
        })
        return result
    }


    render(){
        document.title = "Todo | ForgotPassword"
        return(
            <div>
                <Header/>
                <div className="form-main">
                    {
                        this.state.showLoading ? 
                        <div className="progress-bar-sticky">  
                            <MaterialProgressBar/>                      
                        </div> : null
                    }
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-4 mx-auto">
                                <div className="form-main-container">
                                    <div className="form-main-heading">Forgot Password</div>
                                    <form>
                                        {
                                            this.state.currentPageIndex === 0 ?
                                            <div>
                                                <div className="form-main-label-name">Username:</div>
                                                <input 
                                                    type="text" 
                                                    name="username"
                                                    value={this.state.username}
                                                    onChange={this.handleInputChange}
                                                    className={this.state.usernameError === '' ? "form-main-input-field" : "form-main-error-input-field"} 
                                                />
                                                {
                                                    this.state.usernameError !== ''?
                                                    <div className="form-input-error">{this.state.usernameError}</div> : null
                                                } 
                                                {
                                                    this.state.formError !== ''?
                                                    <div className="form-input-error">{this.state.formError}</div> : null
                                                }
                                            </div>: null
                                        }
                                        {
                                            this.state.currentPageIndex === 1 ?
                                            <div>
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
                                            </div> : null
                                        }
                                        {
                                            this.state.currentPageIndex === 0 ?
                                            <div className="row">
                                                <div className="col-md-6"></div>
                                                <div className="col-md-6">
                                                    <button className="form-main-button" style={{fontSize:'14px'}} onClick={this.handleFormSubmit}>Next</button>
                                                </div>
                                            </div>:
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-input-back-button" style={{fontSize:'14px'}} onClick={()=>this.setState({ currentPageIndex : this.state.currentPageIndex - 1, successMessage : false })}>Back</div>
                                                </div>
                                                <div className="col-md-6">
                                                    <button className="form-main-button" style={{fontSize:'14px'}} onClick={this.handleFormSubmit}>Update Password</button>
                                                </div>
                                            </div>
                                        }
                                        {
                                            this.state.successMessage?
                                            <div className="form-input-success-message">Password Updated Successfully</div> : null
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

export default ForgotPassword