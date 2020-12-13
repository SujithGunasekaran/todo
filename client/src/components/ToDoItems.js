import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import DoneAllIcon from '@material-ui/icons/DoneAll';

export default function ToDoItems(props){

    return(
        <div>
            {
                (props.editRowId !== '' ? props.editRowId === props.item.id : null) && props.editOpenClose ? 
                <form>
                    <div className="todo-main-edit-item-container">
                        <input 
                            type="text"
                            name="addItem" 
                            className="additem-main-input-field" 
                            value={props.updateItemInfo}
                            placeholder="Task for the day" 
                            onChange={(e)=>props.handleUpdateItem(e)}
                        />
                        <button className="todo-main-edit-input-button" onClick={(e)=>props.handleUpdateSubmit(e,props.item.id,props.item.completed)}>Update</button>
                    </div>
                </form> :
                <div>
                    <div className="todo-main-item-container" key={props.item.id} style={props.item.completed === true ? styles.completedBorder : null}>
                        <div className="todo-main-item-info">{props.item.listinfo}</div>
                        <div className="todo-main-item-icon">
                            {
                                props.item.completed !== true ? <EditIcon className="todo-main-item-buttons" onClick={()=>props.handleEditItem(props.item.id,props.item.listinfo)} /> : null
                            }
                            {
                                props.item.completed === true ? <DoneAllIcon className="todo-main-item-buttons" onClick={()=>props.handleCompleted(props.item.id,props.item.listinfo,props.item.completed)} style={{color:'#60EE6B'}} /> : <DoneIcon onClick={()=>props.handleCompleted(props.item.id,props.item.listinfo,props.item.completed)} className="todo-main-item-buttons" />
                            }
                            <DeleteIcon className="todo-main-item-buttons" onClick={()=>props.handleDeleteList(props.item.id)}/>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

const styles = {

    completedBorder:{
        borderLeft:'5px solid #60EE6B', 
        textDecoration:'line-through',
        textDecorationColor : '#60EE6B'
    }

}