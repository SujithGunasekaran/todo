import React from 'react';
import '../css/todoList.css'
import ToDoItems from './ToDoItems';

export default function ToDoList(props){

    return(
        <div>
            <div className="todo-main">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-7 mx-auto" style={{marginBottom:'105px'}}>
                            {
                                props.userTodoList.map((itemInfo,index) => {
                                    return <ToDoItems 
                                            key={index} item={itemInfo}
                                            handleEditItem={props.handleEditItem} 
                                            editRowId={props.editRowId}
                                            handleDeleteList={props.handleDeleteList}
                                            updateItemInfo={props.updateItemInfo}
                                            handleUpdateItem={props.handleUpdateItem}
                                            handleUpdateSubmit={props.handleUpdateSubmit}
                                            editOpenClose={props.editOpenClose}
                                            handleCompleted={props.handleCompleted}
                                        /> 
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}