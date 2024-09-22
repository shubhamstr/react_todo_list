 import React, { useState, useEffect } from "react"
import ToDoLists from "./ToDoList"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import AddIcon from "@mui/icons-material/Add"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from "@mui/material/DialogTitle"

function App() {
  const [val, setVal] = useState("")
  const [list, setList] = useState([])
  const [modalIsOpen, setIsOpen] = React.useState(false)
  const [updateIndex, setUpdateIndex] = useState([])

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
    setVal("")
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
    <Container maxWidth="sm">
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
        <Box sx={{ mt: 4 }}>
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
      <Dialog
        open={modalIsOpen}
        onClose={closeModal}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault()
            const formData = new FormData(event.currentTarget)
            const formJson = Object.fromEntries(formData.entries())
            const email = formJson.email
            console.log(email)
            closeModal()
          },
        }}
      >
        <DialogTitle>Update Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            label="Task"
            type="text"
            fullWidth
            variant="standard"
            placeholder="Update a task"
            onChange={itemVal}
            value={val}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="contained" onClick={itemValUpdate}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default App
