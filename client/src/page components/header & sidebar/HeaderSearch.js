import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { useNavigate } from "react-router-dom";

const filter = createFilterOptions();

export default function HeaderSearch({ tasks, searchTask, setSearchTask }) {

    let navigate = useNavigate();

    return (
        <Autocomplete
        value={searchTask}
        onChange={(event, newValue) => {
            if (typeof newValue === 'string' && newValue) {
                console.log("STRING VALUE: ", newValue)
                console.log("STRING EVENT: ", event)
                setSearchTask({
                    title: newValue,
                });
            } else if (newValue && newValue.inputValue) {
                console.log("NONE VALUE: ", newValue)
                console.log("NONE EVENT: ", event)
                // Create a new value from the user input
                setSearchTask({
                title: newValue.inputValue,
                });
            } else if(newValue === "") {
                console.log("BAD SEARCH")
                console.log(newValue)
            } else{
                console.log("OTHER", newValue)
                console.log("OTHER: ", event)
                setSearchTask(newValue);
                navigate("/searched-task")
            }
        }}
        
        // Executes with each user input
        filterOptions={(options, params) => {
            const filtered = filter(options, params);
            const { inputValue } = params;
            // Suggest the creation of a new value
            const isExisting = options.some((option) => inputValue === option.title);

            if (inputValue !== '' && !isExisting) {
                filtered.push({
                inputValue,
                title: `Add "${inputValue}"`,
                });
            }

            return filtered;
        }}

        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="free-solo-with-text-demo"
        options={tasks}

        getOptionLabel={(option) => {
            // Value selected with enter, right from the input
            if (typeof option === 'string') {
            return option;
            }
            // Add "xxx" option created dynamically
            if (option.inputValue) {
            return option.inputValue;
            }
            // Regular option
            return option.title;
        }}

        renderOption={(props, option) => <li {...props}>{option.title}</li>}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
            <TextField {...params} label="Search by task title..." style={{ background: "#52A2DA", borderRadius: "25px"}} />
        )}
        />
    );
}
