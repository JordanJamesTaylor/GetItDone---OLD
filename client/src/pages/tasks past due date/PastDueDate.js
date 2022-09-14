/* IMPORT DEPENDENCIES */
import React from "react";
import { format } from 'date-fns';

/* IMPORT COMPONENTS */
import Task from "../../page components/tasks/Task";

export default function PastDueDate({ tasks, refresh, setRefresh}){

  const expiredTasks = tasks.map((task) => {

    const date = new Date(task.end_time);
    const checkForExpired = date - new Date();
    // Format date and time
    const formattedCalendar = format(date, 'dd/MM/yyyy');
    const formattedTime = format(date, 'H:mm');
    const formattedDate = `${formattedCalendar} at ${formattedTime}`
  
    if(checkForExpired < 0){
      return(
        <div style={{ margin: 20 }}>
          <Task 
            key={task.id} 
            id={task.id} 
            title={task.title} 
            notes={task.notes} 
            categories={task.categories} 
            priority={task.priority} 
            end_time={formattedDate} 
            expired={true}
            refresh={refresh} 
            setRefresh={setRefresh} 
          />     
        </div>
      )
    }
  });

  return(
    <div style={{ paddingLeft: "10%", paddingRight: "10%", marginLeft: "280px" }}>
      {expiredTasks}
    </div>
  )
};