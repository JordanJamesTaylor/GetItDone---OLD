/* IMPORT DEPENDENCIES */
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

/* IMPORT COMPONENTS */
import HeaderAndSidebar from "./page components/header & sidebar/HeaderAndSidebar"
import Login from "./pages/login/Login";
import Today from "./pages/today/Today";
import Profile from "./pages/profile/Profile"
import GroupTaskContainer from "./pages/group tasks/GroupTaskContainer";
import UpcomingContainer from "./pages/upcoming/UpcomingContainer";

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

  useEffect(() => {
    setLoaded(false);
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user)
          setUserTasks(user.tasks)
          setGroupData(user.groups)
          setLoaded(true)
          setRefresh(false)
        });
      }
    });
    // eslint-disable-next-line
  }, [refresh]);
  
  // if (!loaded) return <></>;

  if (!user) return(
    <>
      <ToastContainer />
      <Login user={user} setUser={setUser} />;
    </>
  )
  
    return (
      <>
        <div className="App">
          <Routes>
            <Route exact path="/group-tasks" element={
              <>
                <HeaderAndSidebar user={user} setGroupData={setGroupData} setGroupTasks={setGroupTasks} groupTasks={groupTasks} groupData={groupData} setUserTasks={setUserTasks} refresh={refresh} setRefresh={setRefresh}  >  
                </HeaderAndSidebar>
                <GroupTaskContainer groupData={groupData} groupTasks={groupTasks} setGroupTasks={setGroupTasks} />
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
                  <Today tasks={user.tasks} refresh={refresh} setRefresh={setRefresh} />
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
            <Route exact path="/login" element={<Login user={user} setUser={setUser} setErrors={setErrors} />} />
          </Routes>
        </div>
    </>  
  );
}