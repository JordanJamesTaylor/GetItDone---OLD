import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import { format } from 'date-fns'
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Set card behaviou for display notes on btn click
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

// Image styling
const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function Task({ id, title, notes, categories, priority, end_time, setRefresh, expired }) {

  const [expanded, setExpanded] = useState(false);
  
  // TEMP: Remove when file upload is functional
  const image = false
  
  /* 
  const formatCategories = categories.map((category) => {
    <h3>
      {`${category} |`}
    </h3>
  })
  */

  // Conditional text display priority level based on prop
  const displayPriority = () => {
    if(priority === 1){
      return(
        <>
          <Typography paragraph>Priority Level: HIGH</Typography>
        </>
      )
    }else if(priority === 2){
      return(
        <>
          <Typography paragraph>Priority Level: MEDIUM</Typography>
        </>
      )
    }else{
      return(
        <>
          <Typography paragraph>Priority Level: LOW</Typography>
        </>
      )
    }
  }





  function displayDateTime(){

    if(expired){
      return(
        <Typography paragraph color="red">
          {`PAST DUE DATE ${end_time}`}
        </Typography>
      )
    }else{
      return(
        <Typography paragraph>
          {`By ${end_time}`}
        </Typography>
      )
    };
  }





  // Remove a task from DB and UI on checkbox is clicked on task card
  function handleCheck(){
    fetch(`/tasks/${id}`, {method: 'DELETE'})
    .then(setRefresh(true))
  } ;

  return (
    <Paper
      sx={{
        p: 2,
        m: 'auto',
        y: 6,
        maxWidth: 1500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#1A2027' : '#F8F8FF',
      }}
    >
      <Grid container spacing={2} >
        <Grid item>
          {
            image ? <Img alt="complex" src="/static/images/grid/complex.jpg" /> : <></>
          }      
        </Grid>
        <Grid item xs={12} sm container>
        <Checkbox
          icon={<CheckCircleOutlineIcon />}
          checkedIcon={<CheckCircleIcon />}
          onClick={() => handleCheck()}
        />
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {categories}    
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            {displayPriority()}
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2} >
        <Grid item xs={12}>
          <Typography>{`Target Completion Date:`}</Typography>
        </Grid>
        <Grid item xs={12}>
          



          {displayDateTime()}





        </Grid>
      </Grid>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={() => setExpanded(!expanded)()}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
      <Divider />
        <CardContent>
          <Typography paragraph>Notes:</Typography>
          <Typography paragraph>
            {notes}
          </Typography>
        </CardContent>
      </Collapse>
    </Paper>
  );
}