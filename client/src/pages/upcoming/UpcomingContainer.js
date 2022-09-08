/* IMPORT DEPENDENCIES */
import { format } from 'date-fns';
import { Typography, Divider } from "@mui/material";

/* IMPORT COMPONENTS */
import Task from "../../page components/tasks/Task";

export default function UpcomingContainer({ tasks, refresh, setRefresh}){

  // Store one instance of each month from all tasks
  const taskMonths = [];
  // Check each tasks date against this array. If task's month is here and NOT in taskMonths, then add it to monthsToDisplay
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
  // Array consist of one instance of a calendar month from all tasks 
  const monthsToDisplay = [];

    function setMonths(){
      tasks.map((task) => {

        // Change type of end_time from string back to datetime
        const date = new Date(task.end_time);
      
        // const months = `${date.getMonth()} ${date.getYear()}`
        const months = `${date.getMonth()}`

        if(taskMonths[months]){
          taskMonths[parseInt(months)].push(task)
        }else{
          taskMonths[months] = [task]
        }
      
        Object.keys(taskMonths).forEach(monthString => {
            let monthNum = Number(monthString)

            if(!monthsToDisplay.includes(calendarMonths[monthNum])){
              monthsToDisplay.push(calendarMonths[monthNum])
            }
        });
      }); 
    };
    
    setMonths()

    const monthHeaderWithTasks = () => {
     return (monthsToDisplay.map((m) => {
        return(
          <>
          <Divider>
              <Typography style={{ width: '400px', fontSize: 50 }}>{`Tasks for ${m}`}</Typography>
          </Divider>
          {tasks.map((task) => {
            const date = new Date(task.end_time);
            if(date.toLocaleString('default', { month: 'long' }) === m && ((date - new Date()) > 0)){

            // Format date and time
            const formattedCalendar = format(date, 'dd/MM/yyyy');
            const formattedTime = format(date, 'H:mm');
            const formattedDate = `${formattedCalendar} by ${formattedTime}`

            return(
              <ol style={{ margin: 20 }}>
                <Task 
                  key={task.id} 
                  id={task.id} 
                  title={task.title} 
                  notes={task.notes} 
                  categories={task.categories} 
                  priority={task.priority} 
                  end_time={formattedDate}
                  expired={null}
                  refresh={refresh} 
                  setRefresh={setRefresh} 
                />     
              </ol>
          )
        }else{
          <></>
        }
      })}
          </>
        )
    }))};  

    return(
      <ol>
        {monthHeaderWithTasks()}
      </ol>
    )
};