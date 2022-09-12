/* IMPORT DEPENDENCIES */
import React from "react";

/* IMPORT COMPONENTS */
import Task from "../../page components/tasks/Task";

export default function Today({ tasks, refresh, setRefresh}){

  const today = new Date();

  const tasksForToday = tasks.map((task) => {

    const taskFullDate = new Date(task.end_time)
    const taskDay = taskFullDate.getDay()
  
    if(today.getDay() === taskDay){
      return(
        <div style={{ margin: 20 }}>
          <Task 
            key={task.id} 
            id={task.id} 
            title={task.title} 
            notes={task.notes} 
            categories={task.categories} 
            priority={task.priority} 
            end_time={'Today'} 
            expired={null}
            refresh={refresh} 
            setRefresh={setRefresh} 
          />     
        </div>
      )
    }
  });

  return(
    <div style={{ paddingLeft: "10%", paddingRight: "10%", marginLeft: "280px" }}>
      {tasksForToday}
    </div>
  )
};