import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {Grid} from "@material-ui/core";
import {logDOM} from "@testing-library/react";



export default function BasicDatePicker(props) {
    const [value, setValue] = React.useState(null);



    return (
        <Grid style={{backgroundColor:'white',borderRadius:'5px',margin:'1vh'}} >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label={props.label}
                    value={value}
                    onChange={
                        (newValue)=>{

                            (props.label ==="PickUp-Date")?localStorage.setItem("pickUpDate",newValue):localStorage.setItem("returnDate",newValue)

                            setValue(newValue)
                        }


                    }

                    dateFormat="YYYY-MM-dd"
                    renderInput={(params) => <TextField {...params} size={'small'} style={{width:'60ch'}} />}
                />
            </LocalizationProvider>
        </Grid>

    );
}

