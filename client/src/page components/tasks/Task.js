/* IMOPORT DEPENDENCIES */ 
import * as React from 'react';
import Confetti from 'react-confetti'
import { useState } from 'react';

/* IMPORT MATERIAL UI COMPONENTS */
import {
  Grid,
  Checkbox,
  Paper,
  Typography,
  CardContent,
  CardActions,
  Collapse,
  Divider,
  IconButton,
} from '@mui/material'

/* IMPORT MATERIAL UI ICONS */
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

/* IMPORT CSS */
import { styled } from '@mui/material/styles';

// Image styling
const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

// Set card behaviour for displaying notes on button click
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

export default function Task({ id, title, notes, categories, priority, end_time, setRefresh, expired, shootConfetti, setShootConfetti }) {

  const [expanded, setExpanded] = useState(false);

  /* TEMP VAR -- REMOVE WHEN ABLE TO ADD FILES TO TASK */
  const image = false

  // Conditional text display priority level based on user input
  const displayPriority = () => {
    if(priority === 1){
      return(
          <Typography paragraph style={{ color: 'red' }}>Priority Level: HIGH</Typography>
      )
    }else if(priority === 2){
      return(
          <Typography paragraph style={{ color: 'blue' }}>Priority Level: MEDIUM</Typography>
      )
    }else{
      return(
          <Typography paragraph style={{ color: 'green' }}>Priority Level: LOW</Typography>
      )
    }
  }

  function displayDateTime(){
    if(expired){
      return(
        <Typography paragraph color="red">{`PAST DUE DATE ${end_time}`}</Typography>
      )
    }else if(expired === 'Today'){
      <Typography paragraph color="red">{`DUE TODAY`}</Typography>
    }else{
      return(
        <Typography paragraph>{`DUE DATE: ${end_time}`}</Typography>
      )
    };
  }

  // Remove a task from DB and UI on checkbox is clicked on task card
  function handleCheck(){
    setShootConfetti(!shootConfetti)
    
    fetch(`/tasks/${id}`, {method: 'DELETE'})
    .then(setRefresh(true))
  };

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
      <Grid 
        container 
        spacing={2} 
      >
        <Grid item>
          {image ? <Img alt="complex" src="/static/images/grid/complex.jpg" /> : <></>}      
        </Grid>
        <Grid 
          item 
          xs={12} 
          sm 
          container
        >
        <Checkbox
          icon={<CheckCircleOutlineIcon />}
          checkedIcon={<CheckCircleIcon />}
          onClick={() => handleCheck()}
        />
          <Grid 
            item 
            xs 
            container 
            direction="column" 
            spacing={2}
          >
            <Grid item xs>
              <Typography 
                gutterBottom 
                variant="subtitle1" 
                component="div"
                style={{ fontWeight: "700", marginTop: "6px"}}
              >
                {title}
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
              >
                {categories}    
              </Typography>
            </Grid>
          </Grid>          
          <Grid item>
            {displayPriority()}
          </Grid>
        </Grid>
      </Grid>
      <Grid 
        container 
        spacing={2} 
      >
        <Grid 
          item 
          xs={12}
        >
          <Typography style={{ marginTop: "6px"}} >{`Target Completion Date:`}</Typography>
        </Grid>
        <Grid 
          item 
          xs={12}
        >
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
      <Collapse 
        in={expanded} 
        timeout="auto" 
        unmountOnExit
      >
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