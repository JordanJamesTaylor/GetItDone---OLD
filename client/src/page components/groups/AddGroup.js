import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Stack from '@mui/material/Stack';

const boxStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function AddGroup({ setModalOpen, setRefresh, setAddGroup, user }){

    const [title, setTitle] = useState("");

    const formData = new FormData()

    function handleSubmit(e){
        e.preventDefault()

        formData.append("profile_id", user.id)
        formData.append("title", title)

        fetch("groups", {
            method: "POST",
            body: formData
        }).then(() => {
            setModalOpen(false)
            setRefresh(true)
            setAddGroup(false)
        })
    };

    return(
        <>
            <Box sx={boxStyle}>
                <Grid
                    container
                    xs={12}
                    rowSpacing={2}
                >
                    <Typography variant="h4">Add Group</Typography>
                    <TextField 
                        id="fullWidth" 
                        fullWidth 
                        variant="standard"
                        label="Add a Group Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} 
                    />  
                </Grid>
                <Stack
                    style={{ marginLeft: "440px", marginTop: "15px" }}
                    direction="row"
                    spacing={3}
                    alignItems="center"
                    >
                    <Button 
                        type="submit" 
                        variant="outlined" 
                        component="label" 
                        placement="right"
                        startIcon={<HighlightOffIcon />}
                        onClick={() => setModalOpen(false)}
                    >
                    Cancel
                    </Button>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        component="label" 
                        placement="right"
                        startIcon={<AddIcon />}
                        onClick={(e) => handleSubmit(e)}
                    >
                    Add Group
                    </Button>
                </Stack>
            </Box>
        </>
    )
}