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
                setSearchTask({
                    title: newValue,
                });
            } else if (newValue && newValue.inputValue) {
                // Create a new value from the user input
                setSearchTask({
                title: newValue.inputValue,
                });
            } else if(newValue === "") {
                console.log("BAD SEARCH")
                console.log(newValue)
            } else{
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
            <TextField variant="filled" {...params} label="Search by task title..." style={{ background: "#F1F1F1" }} />
        )}
        />
    );
}
