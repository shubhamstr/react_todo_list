import './App.css';
import React, { useState, useEffect } from "react";
import ToDoLists from "./ToDoList";

function App() {
  const [val, setVal] = useState('');
  const [list, setList] = useState([]);

  const itemVal = (event) => {
    setVal(event.target.value);
  }

  const itemValSet = () => {
    let arr = list;
    arr.push(val);
    setList(arr);
    localStorage.setItem("reactToDOListData", JSON.stringify(arr));
    setVal('');
  }

  const loadStorageTodos = () => {
    let data = JSON.parse(localStorage.getItem('reactToDOListData'));
    if(data){
      setList(data);
    }
  }

  useEffect(() => {
    loadStorageTodos();
  }, [])
  
  return (
    <>
      <div className="main_div">
        <div className="center_div">
            <h1>To Do List</h1>
            <br/>
            <input type="text" placeholder="Add a items" onChange={itemVal} value={val}/>
            <button className='button_set' onClick={itemValSet}>+</button>
            <br/>
            <br/>

            <ol>
            {
              list.map((listVal, index) => (
                <ToDoLists key={index} listVal={listVal} index={index} setList={setList} list={list} />
              ))
            }
            {(list.length === 0) ? <li>No Records</li> : null}
            </ol>
        </div>
      </div>
    </>
  );
}

export default App;
