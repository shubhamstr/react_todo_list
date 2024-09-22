import "./App.css"
import React, { useState, useEffect } from "react"
import ToDoLists from "./ToDoList"
import Modal from "react-modal"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import AddIcon from "@mui/icons-material/Add"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
}
Modal.setAppElement("#root")
function App() {
  const [val, setVal] = useState("")
  const [list, setList] = useState([])
  let subtitle
  const [modalIsOpen, setIsOpen] = React.useState(false)
  const [updateIndex, setUpdateIndex] = useState([])

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
    setVal("")
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00"
  }

  const itemVal = (event) => {
    setVal(event.target.value)
  }

  const itemValUpdate = () => {
    let arr = list
    arr[updateIndex] = val
    setList(arr)
    localStorage.setItem("reactToDOListData", JSON.stringify(arr))
    setVal("")
    closeModal()
  }

  const itemValSet = () => {
    let arr = list
    arr.push(val)
    setList(arr)
    localStorage.setItem("reactToDOListData", JSON.stringify(arr))
    setVal("")
  }

  const loadStorageTodos = () => {
    let data = JSON.parse(localStorage.getItem("reactToDOListData"))
    if (data) {
      setList(data)
    }
  }

  useEffect(() => {
    loadStorageTodos()
  }, [])

  return (
    <Container fixed>
      <Box
        sx={{
          bgcolor: "#cfe8fc",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", mt: 2 }}
          gutterBottom
        >
          To Do List
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Task"
            variant="outlined"
            onChange={itemVal}
            value={val}
            placeholder="Add a task"
          />
          <Button
            variant="contained"
            onClick={itemValSet}
            sx={{ height: "55px", ml: 2 }}
          >
            <AddIcon />
          </Button>
        </Box>
        <Box>
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
        </Box>
        <Box>
          <List>
            <ListItem>
              {list.length === 0 ? (
                <Typography variant="h6" gutterBottom>
                  No Records
                </Typography>
              ) : null}
            </ListItem>
          </List>
        </Box>
      </Box>
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
          <button className="modalBtnUpdate" onClick={itemValUpdate}>
            Update
          </button>
        </div>
      </Modal>
    </Container>
  )
}

export default App
