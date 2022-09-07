import {Component} from "react";
import * as React from 'react';
import {Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {Avatar, Button, Tab, Tabs} from "@mui/material";
import ResponsiveAppBar from "../../../component/Common/AppBar/appbar";
import cartManageService from "../../../services/cartManageService";
import productManageService from "../../../services/productManageService";
import userRegistrationService from "../../../services/userRegistrationService";


class DashBoard extends Component {


    constructor(props) {
        super(props);

        this.state = {
            value:'Product',
            users:[],
            products:[],
            carts:[]


        }
    }



    loadDashBoard = async () => {

        let res = await cartManageService.fetchAllCarts();
        let res1 = await productManageService.fetchAllProducts();
        let res2 = await userRegistrationService.fetchAllUsers();

        if (res.status === 200 && res2.status === 200 && res2.status === 200) {
            this.setState({
                carts: res.data,
                users:res2.data,
                products:res1.data
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
        this.loadDashBoard();
    }

    render() {
        return (
            <Grid component={'main'} width={'100vw'} height={'100vh'} display={"flex"} flexDirection={"column"}
                  alignItems={"center"}>

                <Grid width={'98%'} margin={'4vh'}>
                    <ResponsiveAppBar/>
                </Grid>



                <Grid width={'90vw'} display={"flex"} height={"90vh"} alignItems={"center"} justifyContent={'space-evenly'} flexWrap={"wrap"}>

                    <Grid width={'28%'} height={'50%'} display={"flex"} justifyContent={'center'}
                          flexDirection={'column'}>

                        <Grid height={"30%"} style={{backgroundColor: '#0077b6'}} display={"flex"}
                              alignItems={'center'} justifyContent={'center'}>
                            <Typography style={{color: 'white',fontSize:'25px'}}>PRODUCTS</Typography>
                        </Grid>
                        <Grid height={"70%"} style={{backgroundColor: '#F8F8F8'}} display={"flex"} alignItems={'center'}
                              justifyContent={'center'}>
                            <Typography
                                style={{fontSize: '60px'}}>{this.state.products.length}</Typography>
                        </Grid>


                    </Grid>

                    <Grid width={'28%'} height={'50%'} display={"flex"} justifyContent={'center'}
                          flexDirection={'column'}>

                        <Grid height={"30%"} style={{backgroundColor: '#0077b6'}} display={"flex"}
                              alignItems={'center'} justifyContent={'center'}>
                            <Typography style={{color: 'white',fontSize:'25px'}}>CART</Typography>
                        </Grid>
                        <Grid height={"70%"} style={{backgroundColor: '#F8F8F8'}} display={"flex"} alignItems={'center'}
                              justifyContent={'center'}>
                            <Typography
                                style={{fontSize: '60px'}}>{this.state.carts.length}</Typography>
                        </Grid>


                    </Grid>

                    <Grid width={'28%'} height={'50%'} display={"flex"} justifyContent={'center'}
                          flexDirection={'column'}>

                        <Grid height={"30%"} style={{backgroundColor: '#0077b6'}} display={"flex"}
                              alignItems={'center'} justifyContent={'center'}>
                            <Typography style={{color: 'white',fontSize:'25px'}}>USERS</Typography>
                        </Grid>
                        <Grid height={"70%"} style={{backgroundColor: '#F8F8F8'}} display={"flex"} alignItems={'center'}
                              justifyContent={'center'}>
                            <Typography
                                style={{fontSize: '60px'}}>{this.state.users.length}</Typography>
                        </Grid>


                    </Grid>
                </Grid>

            </Grid>
        )
    }

}


export default DashBoard