import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from "react-router-dom";

export default function CustomContextMenu({ top, left, selectedContextGroup, setRefresh }){

    const navigate = useNavigate();

    const topCord = `${top}px`
    const leftCord = `${left}px`

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
            width: '225px',
            top: topCord,
            left: leftCord
        }}>
            <List>
            <ListItemButton style={{ 
                    background: '#f8f8ff', 
                    borderRadius: '15px',
                    boxShadow: '5px 5px #888888',
                }} 
                onClick={() => deleteGroup()}>
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
