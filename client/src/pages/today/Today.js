/* IMPORT DEPENDENCIES */
import React from "react";

/* IMPORT COMPONENTS */
import TaskContainer from "../../page components/tasks/TaskContainer";

export default function Today({ tasks, refresh, setRefresh}){

  return(
    <TaskContainer tasks={tasks} refresh={refresh} setRefresh={setRefresh} />
  )
};