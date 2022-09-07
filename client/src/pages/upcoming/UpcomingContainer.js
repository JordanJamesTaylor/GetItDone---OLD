/* IMPORT DEPENDENCIES */
import { useState } from "react";
import { format } from 'date-fns';
import { Typography, Divider } from "@mui/material";

/* IMPORT COMPONENTS */
import Task from "../../page components/tasks/Task";

export default function UpcomingContainer({ tasks, refresh, setRefresh}){
    
    const [expired, setExpired] = useState(false);
    const [formattedDate, setFormattedDate] = useState('');

    const taskMonths = {};
    const calendarMonths = [
        'January', 
        'February', 
        'March',
        'April', 
        'May', 
        'June',
        'July', 
        'August', 
        'September', 
        'October', 
        'November', 
        'December' 
    ];
    const monthsToDisplay = [];
  
    const mappedTasks = tasks.map((task) => {
      
        // Change type of end_time from string back to datetime
        const date = new Date(task.end_time);

        // const months = `${date.getMonth()} ${date.getYear()}`
        const months = `${date.getMonth()}`

        const monthYear = `${date.getMonth()} ${date.getYear()}`

        if(taskMonths[months]){
          taskMonths[parseInt(months)].push(task)
        }else{
          taskMonths[months] = [task]
        }

        const formattedDate = format(date, 'H:mm dd/mm/yyyy');
      
        Object.keys(taskMonths).forEach(monthString => {
            let monthNum = Number(monthString)

            if(!monthsToDisplay.includes(calendarMonths[monthNum])){
              monthsToDisplay.push(calendarMonths[monthNum])
            }
        });

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

    const monthHeaderWithTasks = monthsToDisplay.map((m) => {
        return(
          <>
          <Divider>
              <Typography style={{ width: '400px', fontSize: 50 }}>{`Tasks for ${m}`}</Typography>
          </Divider>
          {mappedTasks}
          </>
        )
    });

    return(
      <ol>
        {monthHeaderWithTasks}
      </ol>
    )
}