/* IMPORT DEPENDENCIES */
import React from "react";
import { format } from 'date-fns'

/* IMPORT COMPONENTS */
import Task from "../../page components/tasks/Task";

export default function Home({ tasks, refresh, setRefresh}){

  const mappedTasks = tasks.map((task) => {
    
    // Check for expired tasks
    let expired = false

    // Change type of date from string back to datetime
    const date = new Date(task.end_time);

    // Format datetime
    const formattedDate = format(date, 'H:mm dd/mm/yyyy');

    // Check if date is in the past
    const filteredDates = new Date(task.end_time) - new Date();
    // console.log("CHECKING FOR PAST DATE TASK: ", task.title)
    // console.log("CHECKING FOR PAST DATE: ", filteredDates)


    if(filteredDates < 0){
      expired = true
    }else{
      expired = false
    }

    return(
      <li style={{ margin: 20 }}>
        <Task 
          key={task.id} 
          id={task.id} 
          title={task.title} 
          notes={task.notes} 
          categories={task.categories} 
          priority={task.priority} 
          end_time={formattedDate} 
          expired={expired}
          refresh={refresh} 
          setRefresh={setRefresh} 
        />     
      </li>
    )
  });

  return(
    <ol>
      {mappedTasks}
    </ol>
  )
};