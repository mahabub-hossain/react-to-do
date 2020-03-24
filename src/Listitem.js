import React from 'react'
const Listitem =(props)=>{
    return(
        <li key={props.item.id} className="list-group-item">
            <button 
                className="btn btn-sm btn-info mr-4"
                onClick={props.editTodo}
                
                >
                u
                </button>
                {props.item.name}
                <button 
                className="btn btn-sm btn-danger ml-4"
                onClick={props.deleteTodo}
                
                >
                x
            </button>
        </li>
    )
}
export default Listitem