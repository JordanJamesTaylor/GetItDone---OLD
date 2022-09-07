
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListAltIcon from '@mui/icons-material/ListAlt';

export default function GroupIcon({ group, groupClick, openGroupContextMenu }){

  return (
      <List>
        <ListItemButton 
          id={group.id} 
          value={group.title} 
          onClick={() => groupClick(group)} 
          onContextMenu ={(e) => openGroupContextMenu(e, group.id)}
        >
          <ListItem key={group.title} button disablePadding >
            <ListItemIcon>
              {<ListAltIcon />}
            </ListItemIcon>
            <ListItemText primary={group.title} />
        </ListItem>
        </ListItemButton>
      </List>
  )
};