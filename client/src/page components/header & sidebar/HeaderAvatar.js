/* IMPORT DEPENDENCIES */
import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

/* IMPORT MATERIAL UI COMPONENTS */
import {
  Menu,
  MenuItem,
  Avatar,
  IconButton,
  ListItemText,
} from '@mui/material';

/* IMPORT MATERIAL UI ICONS */
import ListItemIcon from '@mui/material/ListItemIcon';
import PortraitIcon from '@mui/icons-material/Portrait';
import LogoutIcon from '@mui/icons-material/Logout';

export default function HeaderAvatar({ user }){

    const [anchorEl, setAnchorEl] = useState(null);

    const navigate = useNavigate();
    const openMenu = Boolean(anchorEl);

    // Open avatar menu
    function handleMenuClick(event) {
      setAnchorEl(event.currentTarget);
    };

    // Close avatar menu
    function handleMenuClose() {
      setAnchorEl(null);
    };

    // Logout user on avatar dropdown menu's logout button
    function handleLogout() {
      fetch(`/logout`, {method: 'DELETE'})
      .then(navigate('/login'))
    };

    // Assign avatar colour based on username
    function stringToColor(username) {
      let hash = 0;
      let i;
    
      /* eslint-disable no-bitwise */
      for (i = 0; i < username.length; i += 1) {
        hash = username.charCodeAt(i) + ((hash << 5) - hash);
      }
    
      let color = '#';
    
      for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
      }
      /* eslint-enable no-bitwise */
    
      return color;
    }
      
    // Add default avatar based on username if the user hasn't added their own avatar
    function stringAvatar(username) {
      return {
        sx: {
          bgcolor: stringToColor(username),
        },
        children: `${username.split(' ')[0][0]}${username.split(' ')[1][0]}`,
      };
    }

    return(
        <>
            <IconButton 
                id="basic-button"
                aria-controls={openMenu ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? 'true' : undefined}
                onClick={handleMenuClick}
            >
            {user.avatar_url ? 
              <Avatar
                sx={{ width: 55, height: 55 }}
                alt="Avatar"
                src={user.avatar_url}
              >
              </Avatar>
              :
              <Avatar 
                  sx={{ width:35, height:35 }}
                  {...stringAvatar(user.username)}  
              />
            }
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
              <MenuItem onClick={() => {
                setAnchorEl(null) 
                navigate('/profile')
              }}>
                  <ListItemIcon>
                      <PortraitIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Profile</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => handleLogout()}>
                  <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
              </MenuItem>
            </Menu>
        </>
    )
}