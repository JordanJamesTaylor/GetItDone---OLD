/* IMPORT DEPENDENCIES */
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Notifications } from 'react-push-notification';
import addNotification from 'react-push-notification';
import { ToastContainer } from "react-toastify";

/* IMPORT COMPONENTS */
import HeaderAndSidebar from "./page components/header & sidebar/HeaderAndSidebar"
import Login from "./pages/login/Login";
import Today from "./pages/today/Today";
import Profile from "./pages/profile/Profile"
import GroupTaskContainer from "./pages/group tasks/GroupTaskContainer";
import UpcomingContainer from "./pages/upcoming/UpcomingContainer";
import PastDueDate from "./pages/tasks past due date/PastDueDate";
import TempTask from "./page components/tasks/TempTask";

/* IMPORT MATERIAL UI COMPONENTS */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import CircularProgress from '@mui/material/CircularProgress';

export default function App() {

  const [user, setUser] = useState(null);
  const [groupData, setGroupData] = useState([]);
  const [groupTasks, setGroupTasks] = useState([]);
  // eslint-disable-next-line
  const [userTasks, setUserTasks] = useState([])
  // eslint-disable-next-line
  const [loaded, setLoaded] = useState(false);
  // eslint-disable-next-line
  const [errors, setErrors] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [checker, setChecker] = useState(false);

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setLoaded(true)
          setUser(user)
          setUserTasks(user.tasks)
          setGroupData(user.groups)
          setRefresh(false)
        });
      }
    });
    // eslint-disable-next-line
  }, [refresh]);
  
  function taskElapsed(){

    user.tasks.map((task) => {
      if(task.elapsed && !task.notified){
        addNotification({
          title: `${task.title}`,
          subtitle: 'Please fill it',
          message: `You need to ${task.title}`,
          theme: 'red',
          closeButton:"X",
          native: true
      })
      fetch(`/tasks/${task.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({notified: true}),
      }).then(() => setRefresh(true))
    };

    const date = new Date(task.end_time);
    const checkForExpired = date - new Date();

    if(checkForExpired < 0 && !task.elapsed){
      fetch(`/tasks/${task.id}`, {
        method: 'PATCH',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({elapsed: true}),
      }).then(() => setRefresh(true))};
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      taskElapsed()
      setChecker(!checker)
    }, 5000);
    
    return () => clearInterval(interval);
  }, [checker, user]);

  if (!user){
    return(
      <>
        <ToastContainer />
        <Login user={user} setUser={setUser} />;
      </>
    )
  }else if (!loaded){ 
    return(
    <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '200px'}}>
      <List>
        <ListItem>
          <Typography variant="h3" gutterBottom>
            We're fetching your tasks...
          </Typography>
        </ListItem>
        <ListItem>
          <CircularProgress size={200} />
        </ListItem>
      </List>
    </Box>
  );
  }else{
    taskElapsed()
    return (
      <>
        <div className="App">
          <Routes>
            <Route exact path="/group-tasks" element={
              <>
                <HeaderAndSidebar user={user} setGroupData={setGroupData} setGroupTasks={setGroupTasks} groupTasks={groupTasks} groupData={user.groups} setUserTasks={setUserTasks} refresh={refresh} setRefresh={setRefresh}  >  
                </HeaderAndSidebar>
                <GroupTaskContainer groupData={groupData} groupTasks={groupTasks} setGroupTasks={setGroupTasks} setRefresh={setRefresh} />
              </>
              } 
            />
            <Route exact path="/profile" element={
              <>
                <HeaderAndSidebar user={user} setGroupData={setGroupData} setGroupTasks={setGroupTasks} groupTasks={groupTasks} groupData={groupData} setUserTasks={setUserTasks} refresh={refresh} setRefresh={setRefresh}  >  
                </HeaderAndSidebar>
                <Profile user={user} setUser={setUser} setErrors={setErrors} />
              </>
              } 
            />
            <Route exact path="/" element={
                <>
                  <HeaderAndSidebar user={user} setGroupData={setGroupData} setGroupTasks={setGroupTasks} groupTasks={groupTasks} groupData={groupData} setUserTasks={setUserTasks} refresh={refresh} setRefresh={setRefresh} >
                  </HeaderAndSidebar>
                  <Today style={{ padding: "10px, 10px, 10px, 50px" }} tasks={user.tasks} refresh={refresh} setRefresh={setRefresh} />
                </>
              } 
            />
            <Route exact path="/upcoming" element={
                <>
                  <HeaderAndSidebar user={user} setGroupData={setGroupData} setGroupTasks={setGroupTasks} groupTasks={groupTasks} groupData={groupData} setUserTasks={setUserTasks} refresh={refresh} setRefresh={setRefresh} >
                  </HeaderAndSidebar>
                  <UpcomingContainer tasks={user.tasks} refresh={refresh} setRefresh={setRefresh} />
                </>
              } 
            />
            <Route exact path="/temp" element={
                <>
                  <TempTask />
                </>
              } 
            />
            <Route exact path="/past-due-date" element={
              <>
                <HeaderAndSidebar user={user} setUserTasks={setUserTasks} refresh={refresh} setRefresh={setRefresh} setGroupData={setGroupData} setGroupTasks={setGroupTasks} groupTasks={groupTasks} groupData={groupData}>  
                </HeaderAndSidebar>
                <PastDueDate tasks={user.tasks} setRefresh={setRefresh} />
              </>
              } 
            />
            <Route exact path="/login" element={<Login user={user} setUser={setUser} setErrors={setErrors} />} />
          </Routes>
        </div>
    </>  
  );
  }
};