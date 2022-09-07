import {Component} from "react";
import {styleSheet} from "./style";
import {withStyles} from "@mui/styles";
import {
    Autocomplete,
    Box,
    FormControl,
    Grid,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography
} from "@mui/material";


import MyButton from "../../../component/Common/Button";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import SnackBar from "../../../component/Common/snackBar";
import * as React from "react";
import DatePicker from "../../../component/Common/DatePicker/datepicker";
import productManageService from "../../../services/productManageService";
import cartManageService from "../../../services/cartManageService";
import userRegistrationService from "../../../services/userRegistrationService";

class CartManage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            productTitle: [],
            users:[],
            formData: {
                userId: '',
                date: '',
                products: []
            }
        }

    }



    submitCart = async () => {

        let formData = this.state.formData;
        let res = await cartManageService.submitCart(formData);

        if (res.status === 200) {
            this.setState({
                alert: true,
                message: res.data.message,
                severity: 'success'
            });
            await this.loadAllProducts();

        } else {
            this.setState({
                alert: true,
                message: res.response.data.message,
                severity: 'error'
            });
        }
    }

    updateCart = async (data) => {

        let res = await cartManageService.putCart(data.id, data);

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

    deleteCart = async (data) => {

        let res = await cartManageService.deleteCart(data);

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


    loadCart = async () => {

        // let data = this.state.id;
        let res = await cartManageService.fetchASingleCart(/*data*/);

        if (res.status === 200) {
            let data = res.data.data;
            this.setState({

                formData: {
                    userId: data.user,
                    date: data.date,
                    products: data.products
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

    loadCartsLimit = async () => {

        // let data = this.state.limit;
        let res = await cartManageService.fetchAllCartsLimit(/*data*/);

        if (res.status === 200) {
            this.setState({
                allUsers: res.data.data,
            });

        } else {
            this.setState({
                alert: true,
                message: res.response.data.message,
                severity: 'error'
            });
        }
    }

    loadAllProducts= async() =>{

        let res = await productManageService.fetchAllProducts();

        if (res.status === 200) {
            this.setState({
                productTitle:res.data,
            });

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
                users:res.data,
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
        this.loadAllProducts();

    }


    render() {
        const {classes} = this.props;
        return (
            <>
                <Grid className={classes.container}>

                    <Box sx={{display: 'flex', flexWrap: 'wrap'}} justifyContent={'center'} alignItems={'center'}>

                        <Grid width="90vw" height={'80vh'} display={'flex'} justifyContent={'space-evenly'}
                              alignItems={'center'}
                              style={{backgroundColor: 'white', opacity: '93%'}}>

                            <Grid display={"flex"} width={'75vw'} height={"80vh"} justifyContent={'space-evenly'}
                                  flexDirection={'column'} alignItems={'center'}>

                                <Grid width={'92%'} display={'flex'} justifyContent={'start'}><Typography
                                    marginBottom={'2vh'} style={{fontSize: '35px',}}>Cart
                                    Manage</Typography></Grid>

                                <Grid display={"flex"} justifyContent={'center'} height={'75vh'}
                                      alignItems={'center'} marginTop={'10vh'}>

                                    <Grid display={'flex'} height={'100%'}>
                                        <ValidatorForm ref="form" className="pt-2" onSubmit={this.submitCart}>
                                            <div style={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                justifyContent: 'center'
                                            }}>

                                                <Autocomplete

                                                    onChange={(e, value, r) => {

                                                    }}
                                                    getOptionLabel={
                                                        (option) => option.username
                                                    }
                                                    id="controllable-states-demo"
                                                    options={this.state.users}
                                                    sx={{m: 1, width: '60ch'}}
                                                    size={"small"}
                                                    renderInput={(params) => <TextField {...params}
                                                                                        label="Username"
                                                                                        margin={'1vh'}/>}
                                                />

                                                <TextField
                                                    required
                                                    id="outlined-required"
                                                    label="Price"
                                                    defaultValue=""
                                                    sx={{m: 1, width: '60ch'}}
                                                    size={"small"}
                                                    validators={['required']}

                                                />

                                                <Autocomplete

                                                    onChange={(e, value, r) => {

                                                    }}
                                                    getOptionLabel={
                                                        (option) => option.title
                                                    }
                                                    id="controllable-states-demo"
                                                    options={this.state.productTitle}
                                                    sx={{m: 1, width: '60ch'}}
                                                    size={"small"}
                                                    renderInput={(params) => <TextField {...params}
                                                                                        label="Product Title"
                                                                                        margin={'1vh'}/>}
                                                />


                                                <DatePicker label={'Date'}/>

                                            </div>


                                            <Grid width={'97%'} marginTop={'15vh'} marginRight={'10vw'}
                                                  display={"flex"} justifyContent={"flex-end"}>

                                                <Grid width={'30%'} display={"flex"} alignItems={"center"}>

                                                    <MyButton label={"cancel"}
                                                              variant={'contained'} type={"submit"} style={{
                                                        backgroundColor: 'silver',
                                                        width: '45%',
                                                        margin: '1vh'
                                                    }}/>

                                                    <MyButton color={'primary'} label={"Save"}
                                                              variant={'contained'} type={"submit"}
                                                              style={{width: '45%', margin: '1vh'}}/>


                                                </Grid>


                                            </Grid>

                                        </ValidatorForm>
                                    </Grid>


                                </Grid>


                            </Grid>


                        </Grid>


                    </Box>


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

export default withStyles(styleSheet)(CartManage)