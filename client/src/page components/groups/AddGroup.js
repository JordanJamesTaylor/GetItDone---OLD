import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

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
                <Grid 
                    item 
                    xs={12}  
                >
                    <TextField 
                        id="fullWidth" 
                        fullWidth 
                        variant="standard"
                        label="Add a Group Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} 
                    />
                    
                </Grid>
                <Grid 
                    item 
                    xs={4} 
                >
                    <Button 
                        type="submit" 
                        variant="outlined" 
                        component="label" 
                        placement="right"
                        onClick={() => setModalOpen(false)}
                    >
                    Cancel
                    </Button>
                </Grid>
                <Grid 
                    item 
                    xs={4} 
                >    
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
                </Grid>
                </Grid>
            </Box>
        </>
    )
}