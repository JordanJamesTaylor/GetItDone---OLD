/* IMPORT DEPENDENCIES */
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

/* IMPORT MATERIAL UI COMPONENTS */
import {
  Stack,
  TextField,
  Button,
  Typography,
  Avatar,
  Divider,
} from '@mui/material'

export default function Profile({ user, setUser, setErrors }) {

  const [avatar, setAvatar] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("******");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");

  let navigate = useNavigate();

  // Change avatar background colour depending on username
  function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }
  
  // Deconstruct username and display first character from each word
  function stringAvatar(name) {
    return {
      sx: {
        width: 250, 
        height: 250,
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  const formData = new FormData()

  function handleSubmit(e) {
      e.preventDefault();

      if(avatar){
        formData.append("avatar", avatar)
      };
      if(username){
        formData.append("username", username)
      };
      if(email){
        formData.append("email", email)
      };
      if(password !== "******"){
        formData.append("password", password)
      };
      if(bio){
        formData.append("bio", bio)
      };

      fetch(`/profiles/info/${user.id}`, { 
        method: "PATCH",
        body: formData,
      }).then((r) => {
      if (r.ok) {
          r.json().then((user) => setUser(user));
          setErrors([])
          setAvatar("")
          setUsername("")
          setPassword("")
          setEmail("")
          setBio("")
      } else {
          r.json().then((err) => setErrors(err.errors));
      }});
  };

  function handleLogout(){
    fetch(`/logout`, {method: 'DELETE'})
    .then(navigate('/login'))
  } ;

  return (
    <>
      <Stack 
        direction="column" 
        spacing={2}
        justifyContent="center"
        alignItems="center"
      >
        <Typography 
          variant="h3" 
          gutterBottom
        >
          {`Welcome ${user.username}!`}
        </Typography>
        {user.avatar_url ? 
            <Avatar
              sx={{ width: 250, height: 250 }}
              alt="Avatar"
              src={user.avatar_url}
            >
            </Avatar>
          :
            <Avatar 
              {...stringAvatar(user.username)}   
            />
        }
        <Button 
          variant="outlined" 
          component="label"
        >
          Upload Photo
          <input hidden accept="image/" multiple type="file" onChange={(e) => setAvatar(e.target.files[0])}/>
        </Button>
        {user.bio ? 
          <Typography 
            gutterBottom 
            variant="subtitle1" 
            component="div"
          >
            {user.bio}
          </Typography>
          :
          <Typography 
            gutterBottom 
            variant="subtitle1" 
            component="div"
          >
            Add a bio and let people know a bit about you!   
          </Typography>
        }
        <Divider>Update  profile</Divider>
        <Stack
            justifyContent="center"
            alignItems="flex-start"
            spacing={1}
          >
          <Typography 
            variant="subtitle1" 
            component="div"
          >
              Update username   
          </Typography>
          <TextField 
            id="outlined-basic" 
            label={"Username"} 
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {
            password.length < 6 ? 
            <>
              <Typography 
                variant="subtitle1" 
                component="div"
              >
                Update password
              </Typography>
              <TextField
                error
                id="outlined-error-helper-text"
                helperText="Must be 6 or more characters long."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </>
            :
            <>
              <Typography 
                variant="subtitle1" 
                component="div"
              >
                Update password
              </Typography>
              <TextField 
                id="outlined-basic" 
                label="Your password" 
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
              />
            </>
          }
          <Typography 
            variant="subtitle1" 
            component="div"
          >
              Update bio
          </Typography>
          {/* 
          <Stack 
            direction="row" 
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Tiptap />
          </Stack>
          */}
          <TextField
            id="outlined-multiline-static"
            label="Bio"
            multiline
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <Button 
            type="submit" 
            variant="outlined" 
            component="label" 
            size="large" 
            onClick={(e) => handleSubmit(e)}
          >
            Save Changes
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            component="label" 
            style={{backgroundColor: "red"}} 
            size="large" 
            onClick={() => handleLogout()
          }>
            LOG OUT
          </Button>
        </Stack>
      </Stack>
    </>
  );
}