import React from 'react';
import '../css/addItem.css';

export default function AddItem(props){
    return(
        <div>
            <div className="additem-main">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-5 mx-auto">
                            <form>
                                <div className="additem-main-container">
                                    <input 
                                        type="text"
                                        name="addItem" 
                                        className="additem-main-input-field" 
                                        value={ props.addItem} 
                                        placeholder="Task for the day" 
                                        onChange={props.handleAddItem}
                                    />
                                    <button className="additem-main-input-button" onClick={props.addToDo}>Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}