import React, {Component} from "react";
import {stylesheet} from "./style";
import {withStyles} from "@mui/styles";
import {FormControl, Grid, InputAdornment, InputLabel, OutlinedInput, TextField, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import MyButton from "../../component/Common/Button";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import LogInService from "../../services/loginService"


class LogInIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showPassword: false,
            link: '',

            formData: {
                username: '',
                password: ''
            }
        }
    }


    logIn = async () => {

        let res = await LogInService.postUser(this.state.formData)

        if (res.status === 200) {
            this.setState({
                link: '/dashBoard',
                alert: true,
                message: res.data.message,
                severity: 'success'
            });

            console.log(this.state.link)
        } else {
            this.setState({
                alert: true,
                message: res.response.data.message,
                severity: 'error'
            });
        }

    }

    render() {
        const {classes} = this.props;
        return (
            <>
                <Grid className={classes.container}>
                    <Grid className={classes.logInBox}>
                        <Grid height={'12vh'} display={'flex'} alignItems={'flex-end'}>
                            <Typography style={{fontSize: '20px', fontWeight: 'bolder'}}>LOG IN</Typography>
                        </Grid>

                        <Grid height={'38vh'} display={'flex'} justifyContent={"center"} flexDirection={"column"}>

                            <ValidatorForm ref="form" className="pt-2" onSubmit={this.logIn}>

                                <Grid display={'flex'} alignItems={"center"} flexDirection={"column"}>
                                    <Grid width={'20vw'}>

                                        <TextField
                                            style={{margin: '1vh'}}
                                            fullWidth={true}
                                            id="outlined-basic"
                                            label="Username"
                                            variant="outlined"
                                            size={'small'}
                                            color={'success'}
                                            value={this.state.formData.username}
                                            onChange={(e) => {
                                                let formDataOb = this.state.formData
                                                formDataOb.username = e.target.value
                                                this.setState(formDataOb)
                                            }}
                                            validators={['required']}
                                        />


                                        <FormControl variant="outlined" size={'small'} fullWidth={true}
                                                     style={{margin: '1vh'}}>
                                            <InputLabel htmlFor="outlined-adornment-password"
                                                        color={'success'}>Password</InputLabel>
                                            <OutlinedInput
                                                type={this.state.showPassword ? 'text' : 'password'}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={(e) => {
                                                                let showPassword = this.state.showPassword

                                                                this.setState({showPassword: !showPassword})
                                                            }}
                                                            onMouseDown={(event) => {
                                                                event.preventDefault();
                                                            }}
                                                            edge="end"
                                                        >
                                                            {this.state.showPassword ? <VisibilityOff/> : <Visibility/>}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }

                                                label="Password"

                                                value={this.state.formData.password}
                                                onChange={(e) => {
                                                    let formDataOb = this.state.formData
                                                    this.state.formData.password = e.target.value
                                                    this.setState(formDataOb)
                                                }}
                                                validators={['required']}
                                                color={'success'}

                                            />
                                        </FormControl>

                                    </Grid>

                                    <Grid width={'20vw'}>

                                        <MyButton href={this.state.link} style={{margin: '1vh', marginTop: '4vh'}}
                                                  color={'primary'} label={"Log In"}
                                                  variant={'contained'} type={"submit"} fullWidth={true}/>


                                    </Grid>

                                </Grid>


                            </ValidatorForm>

                        </Grid>

                        <Grid height={'10vh'} display={'flex'} justifyContent={"center"}>
                            <Typography style={{fontSize: '12px'}}> Create New User Account ? <Link
                                to={'/userRegistration'}>click here</Link></Typography>
                        </Grid>

                    </Grid>


                </Grid>
            </>
        )
    }
}

export default withStyles(stylesheet)(LogInIndex)