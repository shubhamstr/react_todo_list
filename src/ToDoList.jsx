import React from 'react';

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
    return (
        <div className="list">
            <button key={props.index} className='button_remove' onClick={()=>{
                itemValRemove(props.index);
            }}>X</button>
            <li key={props.index + 'data'}>{props.listVal}</li>
        </div>
    )
}

export default ToDoLists;