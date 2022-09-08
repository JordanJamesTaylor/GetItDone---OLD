/* IMPORT DEPENDENCIES */
import { format } from 'date-fns'

/* IMPORT COMPONENTS */
import Task from "../../page components/tasks/Task";

export default function TaskContainer({ tasks, refresh, setRefresh}){
    
    const months = {}

    const mappedTasks = tasks.map((task) => {
    
    // Change type of date from string back to datetime
    const date = new Date(task.end_time)

    // Check for expired tasks
    let expired = false

    const monthYear = `${date.getMonth()} ${date.getYear()}`

    if(months[monthYear]){
      months[monthYear].push(task)
    }else{
      months[monthYear] = [task]
    }

    // Format datetime
    const formattedDate = format(date, 'dd/MM/yyyy H:mm');
    
    // Check if date is in the past
    const checkForExpired = new Date(task.end_time) - new Date();

    if(checkForExpired < 0){
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
}