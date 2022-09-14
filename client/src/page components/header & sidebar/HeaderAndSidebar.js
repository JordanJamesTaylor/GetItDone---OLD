/* IMPORT DEPENDENCIES */
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

/* IMPORT MATERIAL US COMPONENTS */
import { 
  Box, 
  Drawer, 
  Modal, 
  CssBaseline, 
  AppBar, 
  Toolbar, 
  Typography, 
  Divider, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  ListItemButton 
} from '@mui/material';

/* IMPORT MATERIAL UI ICONS */
import EventSharpIcon from '@mui/icons-material/EventSharp';
import CalendarMonthSharpIcon from '@mui/icons-material/CalendarMonthSharp';
import ArrowDropUpSharpIcon from '@mui/icons-material/ArrowDropUpSharp';
import ArrowDropDownSharpIcon from '@mui/icons-material/ArrowDropDownSharp';
import PortraitIcon from '@mui/icons-material/Portrait';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

/* IMPORT CUSTOM COMPONENTS */
import HeaderAvatar from './HeaderAvatar';
import AddTask from '../tasks/AddTask';
import AddGroup from '../groups/AddGroup';
import GroupIcon from '../groups/GroupIcon';
import CustomContextMenu from '../right click menu/CustomContextMenu';
import HeaderSearch from './HeaderSearch';

// Set width of tool bar
const drawerWidth = 280;

export default function HeaderAndSidebar({ setUserTasks, setGroupTasks, groupTasks, user, groupData, refresh, setRefresh, searchTask, setSearchTask }){

    const [dropDown, setDropDown] = useState(false);
    const [open, setModalOpen] = useState(false);
    const [addTask, setAddTask] = useState(false);
    const [addGroup, setAddGroup] = useState(false);
    const [showCustomContext, setShowCustomContext] = useState(false);
    const [selectedContextGroup, setSelectedContextGroup] = useState(0)
    const [contextPoints, setContextPoints] = useState({ x: 0, y: 0 })

    const navigate = useNavigate();

    useEffect(() => {
      const closeCustomContext = () => setShowCustomContext(false);
      window.addEventListener('click', closeCustomContext)

      
      // Avoids memory leaks ---- look up what that means
      return () => window.removeEventListener('click', closeCustomContext)
    }, [])

    //const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    // Open task model if user clicked task icopn 
    function openTask(){
      setAddGroup(false)
      setAddTask(true)
      setModalOpen(true)
    };

    // Open task model if user clicked group icopn 
    function openGroup(){
      setAddTask(false)
      setAddGroup(true)
      setModalOpen(true)
    };

    function openGroupContextMenu(e, id){
      setSelectedContextGroup(id)
      // Prevent right click from display default menu
      e.preventDefault();
      setShowCustomContext(true);
      // Set menu to render in the same location as the right click
      // ADD TO THE SIDE OF THE GROUP BUTTON -- NOT ON TOP OF IT, FIGURE OUT FIX
      //setContextPoints({x: e.pageX, y: e.pageY})
    };

    function groupClick(group){

      fetch(`/groups/${group.id}/tasks`)
      .then((r) => r.json())
      .then((data) => {
        setGroupTasks(data)
        navigate('/group-tasks')
      })
    };

    // Create icons for each group belonging to the user
    const mappedGroups = user.groups.map((group) => {
      return(
        <GroupIcon 
          key={group.id} 
          id={group.id} 
          group={group}
          groupClick={groupClick}
          openGroupContextMenu={openGroupContextMenu}
        />     
      )
    });

    return(
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        >
        <Toolbar style={{ background: '#01298B' }}>
          <div style={{ margin: 20 }}>
            <HeaderAvatar 
              user={user} 
              setUserTasks={setUserTasks} 
              refresh={refresh} 
              setRefresh={setRefresh} 
            />
          </div>
          <Typography variant="h6" noWrap component="div">
            {user.username}'s To-Do-List
          </Typography>
          <span style={{ width: "60%" }}>
          </span>
            <HeaderSearch tasks={user.tasks} searchTask={searchTask} setSearchTask={setSearchTask} />
        </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
        <Toolbar />
        
        <List>
        {/*CONDTIONAL FOR DISPLAYING THE TASK AND GROUP MODELS*/}
        {
          addTask ? 
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <AddTask 
                setModalOpen={setModalOpen} 
                setUserTasks={setUserTasks}
                setAddTask={setAddTask}
                setAddGroup={setAddGroup} 
                groupTasks={groupTasks}
                groupData={groupData} 
                setRefresh={setRefresh} 
                user={user}  
              />
            </Modal>
          :
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <AddGroup 
                setModalOpen={setModalOpen}
                setAddGroup={setAddGroup} 
                setRefresh={setRefresh} 
                user={user} 
              />
            </Modal>
        }    
        <ListItem key={"task"} disablePadding>
          <ListItemButton onClick={() => openTask()}>
            <ListItemIcon>
              {<TaskAltIcon />}
            </ListItemIcon>
            <ListItemText primary={"Add a Task"} />
          </ListItemButton>
        </ListItem>
          <ListItem key={"group"} disablePadding>
            <ListItemButton onClick={() => openGroup()}>
              <ListItemIcon>
                {<ListAltIcon />}
              </ListItemIcon>
            <ListItemText primary={"Add a Group"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"today"} disablePadding>
            <ListItemButton onClick={() => navigate("/")}>
              <ListItemIcon>
                {<EventSharpIcon />}
              </ListItemIcon>
            <ListItemText primary={"Today"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"upcoming"} disablePadding>
            <ListItemButton onClick={() => navigate("/upcoming")}>
              <ListItemIcon>
                {<CalendarMonthSharpIcon />}
              </ListItemIcon>
            <ListItemText primary={"Upcoming"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"past"} disablePadding>
            <ListItemButton onClick={() => navigate("/past-due-date")}>
              <ListItemIcon>
                {<ErrorOutlineOutlinedIcon />}
              </ListItemIcon>
            <ListItemText primary={"Past Due Date"} />
            </ListItemButton>
          </ListItem>
          <ListItem key={"profile"} disablePadding>
            <ListItemButton onClick={() => navigate("/profile")}>
              <ListItemIcon>
                {<PortraitIcon />}
              </ListItemIcon>
            <ListItemText primary={"Profile"} />
            </ListItemButton>
          </ListItem>
      </List>
      <Divider />
      <List>
        {/*CONDITIONAL FOR DISPLAYING GROUPS IN SIDE BAR*/}
        {
          !dropDown ? 
          <List>
            <ListItem key={"Groups"} disablePadding>
              <ListItemButton onClick={() => setDropDown(true)}>
                <ListItemIcon>
                  {<ArrowDropDownSharpIcon />}
                </ListItemIcon>
                <ListItemText primary={"Groups"} />
              </ListItemButton>
            </ListItem>
        </List>
        :
        <List>
          <ListItem key={"groups"} disablePadding>
            <ListItemButton onClick={() => setDropDown(false)}>
              <ListItemIcon>
                {<ArrowDropUpSharpIcon />}
              </ListItemIcon>
              <ListItemText primary={"Groups"} />
            </ListItemButton>
          </ListItem>
          <List>
            <>
              {mappedGroups}
              {showCustomContext && <CustomContextMenu top={contextPoints.x} left={contextPoints.y} selectedContextGroup={selectedContextGroup} setRefresh={setRefresh}/>}
            </>
          </List>
        </List>
        }
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
      </Box>
    </Box>
    )
}

