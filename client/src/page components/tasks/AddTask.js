/* IMPORT DEPENDENCIES */
import * as React from 'react';
import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';

/* IMPORT MATERIAL UI COMPONENTS */
import {
    Box,
    Stack,
    Grid,
    TextField,
    Button,
    Menu,
    MenuItem,
    Typography,
    ListItemText,
} from '@mui/material';

/* IMPORT MATERIAL UI ICONS */
import FlagIcon from '@mui/icons-material/Flag';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddIcon from '@mui/icons-material/Add';
import CalendarMonthSharpIcon from '@mui/icons-material/CalendarMonthSharp';
import ListAltIcon from '@mui/icons-material/ListAlt';

// Set styling for modal container 
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

export default function AddTask({ user, groupData, setModalOpen, setRefresh, setUserTasks, setAddTask, groupTasks }){

    const [title, setTitle] = useState("");
    const [notes, setNotes] = useState("");
    // eslint-disable-next-line
    const [categories, setCategories] = useState("");
    // eslint-disable-next-line
    const [tags, setTags] = useState("");
    const [priority, setPriority] = useState(0);
    const [group, setGroup] = useState(0);
    const [dateTime, setDateTime] = useState(new Date());
    const [anchorPriority, setAnchorPriority] = useState(null);
    const [anchorClock, setAnchorClock] = useState(null);
    const [anchorGroup, setAnchorGroup] = useState(null);

    // Pick which menu to open
    const openPriorityMenu = Boolean(anchorPriority);
    const openTimeDateMenu = Boolean(anchorClock);
    const openGroupMenu = Boolean(anchorGroup);

    // Add group icon displaying group title on dropdown for each user's group 
    const mappedGroups = groupData.map((mg) => {
        return(
            <MenuItem 
                onClick={() => {
                    setGroup(mg.id)    
                    setAnchorGroup(null)
                }
            }>
                <ListItemText>{mg.title}</ListItemText>
            </MenuItem>
        )
    });

    // Open priority menu
    function handlePriorityMenuClick(event) {
        setAnchorPriority(event.currentTarget);
      };
    
    // Open menu to set expiry on task
    function handleDateTimeMenuClick(event) {
      setAnchorClock(event.currentTarget);
    };

    // Open menu to assign task to a group
    function handleGroupMenuClick(event) {
        setAnchorGroup(event.currentTarget);
      };

    function handleSubmit(e){
        e.preventDefault()

        const formData = new FormData()
        formData.append("profile_id", user.id)
        
        if(title){
            formData.append("title", title)
          };
        if(notes){
            formData.append("notes", notes)
        };
        if(categories){
            formData.append("categories", categories)
        };
        if(tags){
            formData.append("tags", tags)
        };
        if(group !== 0){
            formData.append("group_id", group)
        };
        if(priority > 0){
            formData.append("priority", priority)
        };
        if(dateTime){
            formData.append("end_time", dateTime)
        };

        fetch("tasks", {
            method: "POST",
            body: formData
        }).then((r) => r.json())
        .then((data) => {
            setUserTasks(data)
            setModalOpen(false)
            setRefresh(true)
            setAddTask(false)
        })
    };

    return(
        <>
            <Box sx={boxStyle}>
                <Typography variant="h4">Add Task</Typography>
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
                <Grid 
                    item
                    fullWidth
                    justifyContent="center" 
                    spacing={2}
                >
                <Stack 
                    direction="row" 
                    justifyContent="center"
                    alignItems="center"
                >
                    <Button 
                        type="submit" 
                        variant="text" 
                        component="label"
                        onClick={handleDateTimeMenuClick}
                    >
                        <CalendarMonthSharpIcon/>
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorClock}
                        open={openTimeDateMenu}
                        onClose={() => setAnchorClock(null)}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem>
                            <DateTimePicker
                                dayPlaceholder="23"
                                monthPlaceholder="04"
                                yearPlaceholder="1995"
                                hourPlaceholder="04"
                                minutePlaceholder="58" 
                                value={dateTime} 
                                onChange={setDateTime} 
                            />
                        </MenuItem>
                    </Menu>
                    <Button 
                        id="basic-button"
                        aria-controls={openPriorityMenu ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openPriorityMenu ? 'true' : undefined}
                        onClick={handlePriorityMenuClick}
                    >
                        <FlagIcon />
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorPriority}
                        open={openPriorityMenu}
                        onClose={() => setAnchorPriority(null)}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        {/*
                        <MenuItem onClick={() => setAnchorPriority(null)}>Profile</MenuItem>
                        <MenuItem onClick={() => setAnchorPriority(null)}>My account</MenuItem>
                        <MenuItem onClick={() => setAnchorPriority(null)}>Logout</MenuItem>
                        */}
                    <MenuItem onClick={()  => {
                        setPriority(1)
                        setAnchorPriority(null);
                        }}>
                        <ListItemText>Set Priotity Level to High</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => {
                        setPriority(2)
                        setAnchorPriority(null);
                        }}>
                        <ListItemText>Set Priotity Level to Medium</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={() => {
                        setPriority(3)
                        setAnchorPriority(null);
                        }}>
                        <ListItemText>Set Priotity Level to Low</ListItemText>
                    </MenuItem>
                    </Menu>
                    <Button 
                        type="submit" 
                        variant="text" 
                        component="label" 
                        onClick={(e) => handleGroupMenuClick(e)}
                    >
                        <ListAltIcon />
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorGroup}
                        open={openGroupMenu}
                        onClose={() => setAnchorGroup(null)}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                        
                    >
                        {mappedGroups}
                    </Menu>
                    <Stack
                        style={{ marginLeft: "275px" }}
                        direction="row"
                        spacing={2}
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
                        Add Task
                        </Button>
                    </Stack>
                </Stack>
            </Grid>
            </Grid>
            </Box>
        </>
    )
};
