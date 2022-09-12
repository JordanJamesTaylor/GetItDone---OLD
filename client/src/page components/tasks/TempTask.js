import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';


import {
    Box,
    Grid,
    TextField
} from '@mui/material';

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

export default function BasicMenu() {

    const [title, setTitle] = useState("");
    const [notes, setNotes] = useState("");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={boxStyle}>
        <Grid
            container
            xs={12}
            rowSpacing={2}
        >
                <Grid item xs={12}  >
                <TextField 
                    id="fullWidth" 
                    fullWidth 
                    variant="standard"
                    label="Give your task a title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} 
                />
                <TextField
                    id="outlined-multiline-static"
                    fullWidth
                    sx={{top: '5px'}}
                    variant="standard"
                    label="Give your task some notes..."
                    multiline
                    rows={1}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
        </Grid>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
      </Grid>
    </Box>
  );
}