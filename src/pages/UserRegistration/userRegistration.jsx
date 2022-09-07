import {Component} from "react";
import {stylesheet} from "./style";
import {withStyles} from "@mui/styles";
import {Box, FormControl, Grid, InputAdornment, InputLabel, OutlinedInput, TextField, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import MyButton from "../../component/Common/Button";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import SnackBar from "../../component/Common/snackBar";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {TableCell, Tooltip} from "@material-ui/core";
import TableBody from "@mui/material/TableBody";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import userRegistrationService from "../../services/userRegistrationService";

class UserRegistration extends Component {
    constructor(props) {
        super(props);

        this.state = {


            allUsers:[],
            formData: {
                email: "John@gmail.com",
                username: "johnd",
                password: "m38rmF$",
                name: {
                    firstname: "John",
                    lastname: "Doe"
                },
                address: {
                    city: "kilcoole",
                    street: "7835 new road",
                    number: 3,
                    zipcode: "12926-3874",
                    geolocation: {
                        lat: "-37.3159",
                        long: "81.1496"
                    }
                },
                phone: "1-570-236-7033"
            },

            alert: false,
            message: '',
            severity: 'error'
        }
    }


    submitUser= async() =>{

        let formData = this.state.formData;
        let res = await userRegistrationService.submitUser(formData);

        if (res.status === 200) {
            this.setState({
                alert: true,
                message: res.data.message,
                severity: 'success'
            });
            await this.loadData();

        } else {
            this.setState({
                alert: true,
                message: res.response.data.message,
                severity: 'error'
            });
        }
    }

    updateUser= async(data) =>{

        let res = await userRegistrationService.putUser(data.id,data);

        if (res.status === 200) {
            this.setState({
                alert: true,
                message: res.data.message,
                severity: 'success'
            });
            await this.loadAllUsers();

        } else {
            this.setState({
                alert: true,
                message: res.response.data.message,
                severity: 'error'
            });
        }
    }



    deleteUser= async(data) =>{

        let res = await userRegistrationService.deleteUser(data);

        if (res.status === 200) {
            this.setState({
                alert: true,
                message: res.data.message,
                severity: 'success'
            });
            await this.loadAllUsers();

        } else {
            this.setState({
                alert: true,
                message: res.response.data.message,
                severity: 'error'
            });
        }
    }

    loadAllUsers= async() =>{

        let res = await userRegistrationService.fetchAllUsers();

        if (res.status === 200) {
            this.setState({
                allUsers:res.data.data,
            });

        } else {
            this.setState({
                alert: true,
                message: res.response.data.message,
                severity: 'error'
            });
        }
    }


    loadUser= async() =>{

        // let data = this.state.id;
        let res = await userRegistrationService.fetchASingleUser(/*data*/);

        if (res.status === 200) {
            let data = res.data.data;
            this.setState({

                formData: {
                    email: data.email,
                    username: data.username,
                    password: data.password,
                    name: {
                        firstname: data.name.firstname,
                        lastname: data.name.lastname
                    },
                    address: {
                        city: data.address.city,
                        street: data.address.street,
                        number: data.address.number,
                        zipcode: data.address.zipcode,
                        geolocation: {
                            lat:data.address.lat,
                            long:data.address.long
                        }
                    },
                    phone:data.phone
                }
            });

        } else {
            this.setState({
                alert: true,
                message: res.response.data.message,
                severity: 'error'
            });
        }
    }


    loadUsersLimit= async() =>{

        // let data = this.state.limit;
        let res = await userRegistrationService.fetchAllUsersLimit(/*data*/);

        if (res.status === 200) {
            this.setState({
                allUsers:res.data.data,
            });

        } else {
            this.setState({
                alert: true,
                message: res.response.data.message,
                severity: 'error'
            });
        }
    }


    componentDidMount() {
        this.loadAllUsers();
    }


    render() {
        const {classes} = this.props;
        return (
            <>
                <Grid className={classes.container}>

                    <Box sx={{display: 'flex', flexWrap: 'wrap'}} justifyContent={'center'}>
                        <ValidatorForm ref="form" className="pt-2" onSubmit={this.submitUser}>
                            <Grid width="90vw" height={'80vh'} display={'flex'} justifyContent={'space-evenly'}
                                  alignItems={'center'}
                                  style={{backgroundColor: 'white', opacity: '93%'}}>

                                <Grid display={"flex"} width={'75vw'} height={"80vh"} justifyContent={'space-evenly'}
                                      flexDirection={'column'} alignItems={'center'}>

                                    <Grid width={'92%'} display={'flex'} justifyContent={'start'}><Typography
                                        marginBottom={'2vh'} style={{fontSize: '35px',}}>User Registration</Typography></Grid>

                                    <Grid display={"flex"} justifyContent={'center'} height={'75vh'}
                                          alignItems={'center'} marginTop={'5vh'}>

                                        <Grid display={'flex'} height={'100%'}>
                                            <ValidatorForm ref="form" className="pt-2">
                                                <div style={{
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    justifyContent: 'center'
                                                }}>

                                                    <TextField
                                                        required
                                                        id="outlined-required"
                                                        label="First Name"
                                                        defaultValue=""
                                                        sx={{m: 1, width: '60ch'}}
                                                        size={"small"}
                                                        value={this.state.formData.name.firstname}
                                                        onChange={(e) => {
                                                            let formDataOb = this.state.formData
                                                            formDataOb.name.firstname = e.target.value
                                                            this.setState(formDataOb)
                                                        }}
                                                        validators={['required']}

                                                    />

                                                    <TextField
                                                        required
                                                        id="outlined-required"
                                                        label="Last Name"
                                                        defaultValue=""
                                                        sx={{m: 1, width: '60ch'}}
                                                        size={"small"}
                                                        value={this.state.formData.name.lastname}
                                                        onChange={(e) => {
                                                            let formDataOb = this.state.formData
                                                            formDataOb.name.lastname = e.target.value
                                                            this.setState(formDataOb)
                                                        }}
                                                        validators={['required']}

                                                    />

                                                    <TextField
                                                        required
                                                        id="outlined-required"
                                                        label="Email"
                                                        defaultValue=""
                                                        sx={{m: 1, width: '60ch'}}
                                                        size={"small"}
                                                        value={this.state.formData.email}
                                                        onChange={(e) => {
                                                            let formDataOb = this.state.formData
                                                            formDataOb.email = e.target.value
                                                            this.setState(formDataOb)
                                                        }}
                                                        validators={['required']}

                                                    />

                                                    <TextField
                                                        required
                                                        id="outlined-required"
                                                        label="Username"
                                                        defaultValue=""
                                                        sx={{m: 1, width: '60ch'}}
                                                        size={"small"}
                                                        value={this.state.formData.username}
                                                        onChange={(e) => {
                                                            let formDataOb = this.state.formData
                                                            formDataOb.username = e.target.value
                                                            this.setState(formDataOb)
                                                        }}
                                                        validators={['required']}

                                                    />

                                                    <FormControl sx={{m: 1, width: '60ch'}}
                                                                 size={"small"} variant="outlined">
                                                        <InputLabel
                                                            htmlFor="outlined-adornment-password">Password</InputLabel>
                                                        <OutlinedInput
                                                            id="outlined-adornment-password"
                                                            type={this.state.showPassword ? 'text' : 'password'}
                                                            endAdornment={
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        aria-label="toggle password visibility"
                                                                        onClick={(e) => {
                                                                            let formDataOb = this.state.formData
                                                                            formDataOb.showPassword = !formDataOb.showPassword
                                                                            this.setState(formDataOb)
                                                                        }}
                                                                        onMouseDown={(event) => {
                                                                            event.preventDefault();
                                                                        }}
                                                                        edge="end"
                                                                    >
                                                                        {this.state.showPassword ? <VisibilityOff/> :
                                                                            <Visibility/>}
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            }
                                                            label="Password"

                                                            value={this.state.formData.password}
                                                            onChange={(e) => {
                                                                let formDataOb = this.state.formData
                                                                formDataOb.password = e.target.value
                                                                this.setState(formDataOb)
                                                            }}
                                                            validators={['required']}
                                                        />
                                                    </FormControl>


                                                    <TextField
                                                        required
                                                        id="outlined-required"
                                                        label="City"
                                                        defaultValue=""
                                                        sx={{m: 1, width: '60ch'}}
                                                        size={"small"}
                                                        value={this.state.formData.address.city}
                                                        onChange={(e) => {
                                                            let formDataOb = this.state.formData
                                                            formDataOb.address.city = e.target.value
                                                            this.setState(formDataOb)
                                                        }}
                                                        validators={['required']}

                                                    />

                                                    <TextField
                                                        required
                                                        id="outlined-required"
                                                        label="Street"
                                                        defaultValue=""
                                                        sx={{m: 1, width: '60ch'}}
                                                        size={"small"}
                                                        value={this.state.formData.address.street}
                                                        onChange={(e) => {
                                                            let formDataOb = this.state.formData
                                                            formDataOb.address.street = e.target.value
                                                            this.setState(formDataOb)
                                                        }}
                                                        validators={['required']}

                                                    />

                                                    <TextField
                                                        required
                                                        id="outlined-required"
                                                        label="Street No"
                                                        defaultValue=""
                                                        sx={{m: 1, width: '60ch'}}
                                                        size={"small"}
                                                        value={this.state.formData.address.number}
                                                        onChange={(e) => {
                                                            let formDataOb = this.state.formData
                                                            formDataOb.address.number = e.target.value
                                                            this.setState(formDataOb)
                                                        }}
                                                        validators={['required']}

                                                    />

                                                    <TextField
                                                        required
                                                        id="outlined-required"
                                                        label="Zip Code"
                                                        defaultValue=""
                                                        sx={{m: 1, width: '60ch'}}
                                                        size={"small"}
                                                        value={this.state.formData.address.zipcode}
                                                        onChange={(e) => {
                                                            let formDataOb = this.state.formData
                                                            formDataOb.address.zipcode = e.target.value
                                                            this.setState(formDataOb)
                                                        }}
                                                        validators={['required']}

                                                    />


                                                    <TextField
                                                        required
                                                        id="outlined-required"
                                                        label="Lat Value"
                                                        defaultValue=""
                                                        sx={{m: 1, width: '60ch'}}
                                                        size={"small"}
                                                        value={this.state.formData.address.geolocation.lat}
                                                        onChange={(e) => {
                                                            let formDataOb = this.state.formData
                                                            formDataOb.address.geolocation.lat = e.target.value
                                                            this.setState(formDataOb)
                                                        }}
                                                        validators={['required']}

                                                    />

                                                    <TextField
                                                        required
                                                        id="outlined-required"
                                                        label="Long Value"
                                                        defaultValue=""
                                                        sx={{m: 1, width: '60ch'}}
                                                        size={"small"}
                                                        value={this.state.formData.address.geolocation.long}
                                                        onChange={(e) => {
                                                            let formDataOb = this.state.formData
                                                            formDataOb.address.geolocation.long = e.target.value
                                                            this.setState(formDataOb)
                                                        }}
                                                        validators={['required']}

                                                    />

                                                    <TextField
                                                        required
                                                        id="outlined-required"
                                                        label="Mobile No"
                                                        defaultValue=""
                                                        sx={{m: 1, width: '60ch'}}
                                                        size={"small"}
                                                        value={this.state.formData.phone}
                                                        onChange={(e) => {
                                                            let formDataOb = this.state.formData
                                                            formDataOb.phone = e.target.value
                                                            this.setState(formDataOb)
                                                        }}
                                                        validators={['required']}

                                                    />


                                                </div>

                                                <Grid width={'97%'} marginTop={'5vh'} marginRight={'10vw'}
                                                      display={"flex"} justifyContent={"flex-end"}>

                                                    <Grid width={'30%'} display={"flex"} alignItems={"center"}>

                                                        <MyButton label={"cancel"}
                                                                  variant={'contained'}  style={{
                                                            backgroundColor: 'silver',
                                                            width: '45%',
                                                            margin: '1vh'
                                                        }}/>

                                                        <MyButton color={'primary'} label={"Save"}
                                                                  variant={'contained'} type="submit"
                                                                  style={{width: '45%', margin: '1vh'}}/>


                                                    </Grid>


                                                </Grid>

                                            </ValidatorForm>
                                        </Grid>


                                    </Grid>


                                </Grid>


                            </Grid>

                        </ValidatorForm>

                    </Box>


                    <Grid>
                        <TableContainer component={Paper} style={{width: '90vw', backgroundColor: '#eeeff1'}}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">First Name</TableCell>
                                        <TableCell align="left">Last Name</TableCell>
                                        <TableCell align="left">Email</TableCell>
                                        <TableCell align="left">Username</TableCell>
                                        <TableCell align="left">Password</TableCell>
                                        <TableCell align="left">City</TableCell>
                                        <TableCell align="left">Street</TableCell>
                                        <TableCell align="left">Street No</TableCell>
                                        <TableCell align="left">Zip Code</TableCell>
                                        <TableCell align="left">Lat Value</TableCell>
                                        <TableCell align="left">Long Value</TableCell>
                                        <TableCell align="left">Mobile No</TableCell>
                                        <TableCell align="left">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                      {
                                        this.state.all.map((row) => (
                                            <TableRow onClick={() => {
                                                this.loadUser(/*row.id*/);
                                            }}>
                                                <TableCell align="left">{row.name.firstname}</TableCell>
                                                <TableCell align="left">{row.name.lastname}</TableCell>
                                                <TableCell align="left">{row.email}</TableCell>
                                                <TableCell align="left">{row.username}</TableCell>
                                                <TableCell align="left">{row.password}</TableCell>
                                                <TableCell align="left">{row.address.city}</TableCell>
                                                <TableCell align="left">{row.address.street}</TableCell>
                                                <TableCell align="left">{row.address.number}</TableCell>
                                                <TableCell align="left">{row.address.zipcode}</TableCell>
                                                <TableCell align="left">{row.address.lat}</TableCell>
                                                <TableCell align="left">{row.address.long}</TableCell>
                                                <TableCell align="left">{row.phone}</TableCell>

                                                <TableCell align="left">
                                                    <Tooltip title="Edit">
                                                        <IconButton
                                                            onClick={() => {
                                                                this.updateUser(row);
                                                            }}
                                                        >
                                                            <EditIcon color="primary" />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Delete">
                                                        <IconButton
                                                            onClick={() => {
                                                                this.deleteUser(/*row.id*/)
                                                            }}
                                                        >
                                                            <DeleteIcon color="error" />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>


                    <SnackBar
                        open={this.state.alert}
                        onClose={() => {
                            this.setState({alert: false})
                        }}
                        message={this.state.message}
                        autoHideDuration={3000}
                        severity={this.state.severity}
                        variant="filled"
                    />


                </Grid>

            </>
        )
    }
}

export default withStyles(stylesheet)(UserRegistration)