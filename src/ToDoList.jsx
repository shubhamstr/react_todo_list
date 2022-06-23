import React from 'react';
import edit from './assets/edit.png'

const ToDoLists = (props) => {
    const itemValRemove = (indexList) => {
        // eslint-disable-next-line array-callback-return
        const listNew = props.list.filter((listVal, indexVal) => {
            if(indexVal !== indexList){
                return listVal;
            }
        });
        props.setList(listNew);
    }
    const itemValEdit = (indexList) => {
        // eslint-disable-next-line array-callback-return
        // const listNew = props.list.filter((listVal, indexVal) => {
        //     if(indexVal !== indexList){
        //         return listVal;
        //     }
        // });
        // props.setList(listNew);
    }
    return (
        <div className="list">
            <button key={props.index} className='button_remove' onClick={()=>{
                itemValRemove(props.index);
            }}>X</button>
            <button key={props.index} className='button_edit' onClick={()=>{
                itemValEdit(props.index);
            }}><img src={edit} className="imgEdit" alt="edit"/></button>
            <li key={props.index + 'data'}>{props.listVal}</li>
        </div>
    )
}

export default ToDoLists;