/* IMPORT DEPENDENCIES */
import React from "react";
// import { format } from 'date-fns'

/* IMPORT COMPONENTS */
import GroupTask from "./GroupTask";
// import Task from "../../page components/tasks/Task";

export default function GroupTaskContainer({ groupData, groupTasks, setRefresh }){

  const mappedTasks = groupTasks.map((group) => {
    
    // Check for expired tasks
    let expired = false

    // // Change type of date from string back to datetime
    // const date = new Date(group.end_time);

    // // Format datetime
    // const formattedDate = format(date, 'H:mm dd/mm/yyyy');

    // Check if date is in the past
    const filteredDates = new Date(group.end_time) - new Date();

    if(filteredDates < 0){
      expired = true
    }else{
      expired = false
    }

    return(
      <div style={{ margin: 20 }}>
        <GroupTask 
          key={group.id} 
          id={group.id} 
          title={group.title} 
          notes={group.notes} 
          categories={group.categories} 
          priority={group.priority} 
          end_time={group.end_time}
          expired={expired}     
          setRefresh={setRefresh}
        />     
      </div>
    )
  });

  return(
    <div style={{ paddingLeft: "10%", paddingRight: "10%", marginLeft: "280px" }}>
      {mappedTasks}
    </div>
  )
};