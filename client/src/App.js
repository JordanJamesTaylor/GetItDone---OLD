/* IMPORT DEPENDENCIES */
import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

/* IMPORT COMPONENTS */
import HeaderAndSidebar from "./page components/header & sidebar/HeaderAndSidebar"
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile"
import GroupTaskContainer from "./pages/group tasks/GroupTaskContainer";

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


  const navigate = useNavigate();

  useEffect(() => {
    setLoaded(false);
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          console.log("CURENT USER: ", user)
          console.log("CURENT USER'S TASKS: ", user.tasks)
          console.log("CURENT USER'S GROUPS: ", user.groups)
          setUser(user)
          setUserTasks(user.tasks)
          setGroupData(user.groups)
          setRefresh(false)
        });
      }
    });
    // eslint-disable-next-line
  }, [refresh]);
  
  //if (!loaded) return <></>;

  if (!user) return <Login user={user} setUser={setUser} />;
  
    return (
      <>
        <div className="App">
          <Routes>
            <Route exact path="//group-tasks" element={
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
                  <Home tasks={user.tasks} refresh={refresh} setRefresh={setRefresh} />
                </>
              } 
            />
            <Route exact path="/login" element={<Login user={user} setUser={setUser} setErrors={setErrors} />} />
          </Routes>
        </div>
    </>  
  );
}