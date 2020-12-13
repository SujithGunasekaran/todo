import React, { useState, useEffect, lazy, Suspense } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AddItem from '../components/AddItem';
import { v4 as uuidv4  } from 'uuid';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import '../css/home.css';
import MaterialProgressBar from '../components/ProgressBar';
import { url } from '../config';

const ToDoList = lazy(()=>import('../components/ToDoList'))


function HomeFunction(){

    const [ addItem, setAddItem ] = useState('');
    const [ editOpenClose, setEditOpenClose ] = useState(false);
    const [ editRowId, setEditRowId ] = useState('');
    const [ userTodoList, setUserTodoList ] = useState([])
    const [ updateItemInfo, setUpdateItemInfo ] = useState('')
    const [ showLoadingBar, setLoadingBar ] = useState(false)

    const token = sessionStorage.getItem('userToken');
    
    var loggedIn = false;
    if(token !== null){
        loggedIn = true
    }

    useEffect(() => {

        window.scrollTo(0,0)

        if(loggedIn === true){
            setLoadingBar(true)
            let username = localStorage.getItem('username');
            const getUserTodo =  { username : username }
            axios.post(`${url}/userTodoList/get/TodoList`,getUserTodo)
            .then((responseData) =>{
                if(responseData.status === 200){
                    let userTaskList = responseData.data;
                    setUserTodoList(userTaskList)
                    setLoadingBar(false)
                }
            })
            .catch(()=>{
                console.log("Error")
                setLoadingBar(false)
            })

        }
 
    },[loggedIn])

    

    const handleEditItem = (id,listinfo) => {
        setEditOpenClose(true);
        setEditRowId(id);
        setUpdateItemInfo(listinfo);
    }

    const handleUpdateItem = (e) =>{
        setUpdateItemInfo(e.target.value)
    }

    const handleUpdateSubmit = (e,id,completed) =>{
        e.preventDefault();
        setLoadingBar(true)
        const username = localStorage.getItem('username');
        const listinfo = updateItemInfo;
        const updateUserInfo = { username : username, id : id, info : listinfo, completed : completed }
        axios.post(`${url}/userTodoList/update/UserTodoList`,updateUserInfo)
        .then(async (responseData) => {
            if(responseData.status === 200){
                let username = localStorage.getItem('username');
                const getUserTodo =  { username : username }
                await axios.post(`${url}/userTodoList/get/TodoList`,getUserTodo)
                .then((responseData) => {
                    if(responseData.status === 200){
                        setEditOpenClose(false);
                        setEditRowId('');
                        let userTaskList = responseData.data;
                        setUserTodoList(userTaskList)
                        setLoadingBar(false)
                    }
                })
                .catch(()=>{
                    console.log("Error")
                    setLoadingBar(false)
                })
            }   
        })
        .catch(()=>{
            console.log("error")
            setLoadingBar(false)
        })
    }

    const handleAddItem = (e) =>{
        setAddItem(e.target.value)
    }

    const addToDo = (e) =>{
        e.preventDefault();
        setLoadingBar(true)
        const username = localStorage.getItem('username');
        const id = uuidv4();
        const info = addItem;
        const completed = false;
        const newUserToDoList = { username : username, id : id, info : info, completed : completed }
        axios.post(`${url}/userTodoList/add/UserTodoList`,newUserToDoList)
        .then( async (responseData)=>{
            if(responseData.status === 200){
                let username = localStorage.getItem('username');
                const getUserTodo =  { username : username }
                await axios.post(`${url}/userTodoList/get/TodoList`,getUserTodo)
                .then((responseData)=>{
                    if(responseData.status === 200){
                        setAddItem('');
                        let userTaskList = responseData.data;
                        setUserTodoList(userTaskList)
                        setLoadingBar(false)
                    }
                })
                .catch(()=>{
                    console.log("error")
                    setLoadingBar(false)
                })
            }
        })
        .catch(()=>{
            console.log("Error")
            setLoadingBar(false)
        })
    }

    const handleCompleted = (id,listinfo,completed) =>{
        setLoadingBar(true)
        const username = localStorage.getItem('username')
        const updateUserTodoList = { username : username, id : id, info : listinfo, completed : !completed }
        axios.post(`${url}/userTodoList/update/UserTodoList`,updateUserTodoList)
        .then(async (responseData) => {
            if(responseData.status === 200){
                let username = localStorage.getItem('username');
                const getUserTodo =  { username : username }
                await axios.post(`${url}/userTodoList/get/TodoList`,getUserTodo)
                .then((responseData)=>{
                    if(responseData.status === 200){
                        let userTaskList = responseData.data;
                        setUserTodoList(userTaskList)
                        setLoadingBar(false)
                    }
                })
                .catch(()=>{
                    console.log("error")
                    setLoadingBar(false)
                })
            }
        })
        .catch(()=>{
            console.log("Error")
            setLoadingBar(false)
        })

    }

    const handleDeleteList = (id) =>{
        setLoadingBar(true)
        const username = localStorage.getItem('username')
        const deleteUserTodoList = { username : username, id : id }
        axios.post(`${url}/userTodoList/delete/UserTodoList`,deleteUserTodoList)
        .then(async(responseData)=>{
            if(responseData.status === 200){
                let username = localStorage.getItem('username');
                const getUserTodo =  { username : username }
                await axios.post(`${url}/userTodoList/get/TodoList`,getUserTodo)
                .then((responseData)=>{
                    if(responseData.status === 200){
                        let userTaskList = responseData.data;
                        setUserTodoList(userTaskList);
                        setLoadingBar(false)
                    }
                })
                .catch(()=>{
                    console.log("Error")
                    setLoadingBar(false)
                })
            }
        })
        .catch(()=>{
            console.log("Error")
            setLoadingBar(false)
        })
    }

    document.title = "Todo | Home"

    if(loggedIn === false){
        return <Redirect to='/login'/>
    }
    else{
        return(
            <div>
                <Header/>
                    <div className="home-main">
                        {
                            showLoadingBar ? 
                            <div className="progress-bar-sticky">  
                                <MaterialProgressBar/>                      
                            </div> : null
                        }
                        <AddItem
                            addItem={addItem}
                            handleAddItem={handleAddItem}
                            addToDo={addToDo}
                        />
                        {
                            userTodoList.length > 0 ? 
                            <Suspense fallback={<div>Loading...</div>}>
                                <ToDoList 
                                    userTodoList={userTodoList}
                                    updateItemInfo={updateItemInfo}
                                    handleEditItem={handleEditItem}
                                    handleUpdateItem={handleUpdateItem}
                                    handleUpdateSubmit={handleUpdateSubmit}
                                    handleCompleted={handleCompleted}
                                    handleDeleteList={handleDeleteList}
                                    editRowId={editRowId}
                                    editOpenClose={editOpenClose}
                                />
                            </Suspense> : 
                            <div className="home-empty-todo">Currently you don't have any task..</div>
                        }
                    </div>
                <Footer/>
            </div>
        )
    }

}

export default HomeFunction