import "./App.css";
import React, { useState, useEffect } from "react";
import ToDoLists from "./ToDoList";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");
function App() {
  const [val, setVal] = useState("");
  const [list, setList] = useState([]);
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [updateIndex, setUpdateIndex] = useState([]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setVal("");
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  const itemVal = (event) => {
    setVal(event.target.value);
  };

  const itemValUpdate = () => {
    let arr = list;
    arr[updateIndex] = val;
    setList(arr);
    localStorage.setItem("reactToDOListData", JSON.stringify(arr));
    setVal("");
    closeModal();
  };

  const itemValSet = () => {
    let arr = list;
    arr.push(val);
    setList(arr);
    localStorage.setItem("reactToDOListData", JSON.stringify(arr));
    setVal("");
  };

  const loadStorageTodos = () => {
    let data = JSON.parse(localStorage.getItem("reactToDOListData"));
    if (data) {
      setList(data);
    }
  };

  useEffect(() => {
    loadStorageTodos();
  }, []);

  return (
    <>
      <div className="main_div">
        <div className="center_div">
          <h1>To Do List</h1>
          <br />
          <input
            type="text"
            placeholder="Add a items"
            onChange={itemVal}
            value={val}
          />
          <button className="button_set" onClick={itemValSet}>
            +
          </button>
          <br />
          <br />

          <ol>
            {list.map((listVal, index) => (
              <ToDoLists
                key={index}
                listVal={listVal}
                index={index}
                setList={setList}
                list={list}
                openModal={openModal}
                setVal={setVal}
                setUpdateIndex={setUpdateIndex}
              />
            ))}
            {list.length === 0 ? <li>No Records</li> : null}
          </ol>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Update Task"
        >
          <div className="headerModal">
            <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Update Task</h2>
            <button className="modalBtn" onClick={closeModal}>
              close
            </button>
          </div>
          <div className="bodyModal">
            <input
              type="text"
              placeholder="Update a item"
              onChange={itemVal}
              value={val}
            />
            <button className="modalBtnUpdate" onClick={itemValUpdate}>Update</button>
          </div>
        </Modal>
      </div>
    </>
  );
}

export default App;
