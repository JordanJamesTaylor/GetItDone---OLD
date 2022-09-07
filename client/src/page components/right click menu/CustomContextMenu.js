import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from "react-router-dom";

export default function CustomContextMenu({ top, left, selectedContextGroup, setRefresh }){

    const navigate = useNavigate();

    // top: `${top}px`,
    // left: `${left}px`,

    function deleteGroup(){
        fetch(`groups/${selectedContextGroup}`, {method: 'DELETE'})
        .then(setRefresh(true))
        .then(navigate('/'))
    };
    
    return(
        <div style={{
            borderRadius: '4px',
            padding: '10px',
            boxSizing: 'border-box',
            position: 'absolute',
            width: '200px',
            
        }}>
            <List>
            <ListItemButton onClick={() => deleteGroup()}>
                <ListItem button disablePadding >
                <ListItemIcon>
                {<DeleteForeverIcon />}
                </ListItemIcon>
                <ListItemText primary='Delete Group' />
                </ListItem>
            </ListItemButton>
            </List>
        </div>
    )
};