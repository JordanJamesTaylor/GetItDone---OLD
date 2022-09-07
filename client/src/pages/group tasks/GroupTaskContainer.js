/* IMPORT DEPENDENCIES */
import React from "react";
import { format } from 'date-fns'

/* IMPORT COMPONENTS */
import GroupTask from "./GroupTask";

export default function GroupTaskContainer({ groupData, groupTasks }){

  const mappedTasks = groupTasks.map((group) => {
    
    // Check for expired tasks
    let expired = false

    // Change type of date from string back to datetime
    const date = new Date(group.end_time);

    // Format datetime
    const formattedDate = format(date, 'H:mm dd/mm/yyyy');

    // Check if date is in the past
    const filteredDates = new Date(group.end_time) - new Date();

    if(filteredDates < 0){
      expired = true
    }else{
      expired = false
    }

    return(
      <li style={{ margin: 20 }}>
        <GroupTask 
          key={group.id} 
          id={group.id} 
          title={group.title} 
          notes={group.notes} 
          categories={group.categories} 
          priority={group.priority} 
          end_time={formattedDate}
          expired={expired}     
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