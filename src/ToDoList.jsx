import React from "react"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"

const ToDoLists = (props) => {
  const itemValRemove = (indexList) => {
    // eslint-disable-next-line array-callback-return
    const listNew = props.list.filter((listVal, indexVal) => {
      if (indexVal !== indexList) {
        return listVal
      }
    })
    props.setList(listNew)
    localStorage.setItem("reactToDOListData", JSON.stringify(listNew))
  }
  const itemValEdit = (indexList) => {
    console.log("edit", indexList)
    console.log(props.list[indexList])
    props.openModal()
    props.setVal(props.list[indexList])
    props.setUpdateIndex(indexList)
  }
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          bgcolor: "#cfe8fc",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <Typography variant="h6" sx={{ width: "150px" }} gutterBottom>
            {props.listVal}
          </Typography>
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                itemValEdit(props.index)
              }}
              sx={{ height: "35px", ml: 2 }}
            >
              <EditIcon />
            </Button>
            <Button
              variant="contained"
              size="small"
              color="error"
              onClick={() => {
                itemValRemove(props.index)
              }}
              sx={{ height: "35px", ml: 2 }}
            >
              <DeleteIcon />
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export default ToDoLists
