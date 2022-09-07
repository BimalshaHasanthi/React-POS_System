import {Component} from "react";
import {styleSheet} from "./style";
import {withStyles} from "@mui/styles";
import {
    Autocomplete,
    Box,
    FormControl,
    Grid,
    TextField,
    Typography
} from "@mui/material";
import MyButton from "../../../component/Common/Button";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import SnackBar from "../../../component/Common/snackBar";
import Button from "@mui/material/Button";
import * as React from "react";
import UploadButton from "../../../component/Common/UploadButton";

import productManageService from "../../../services/productManageService";

class ProductManage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allProducts:[],
            categories:[],
            view:'',
            formData: {
                title: '',
                price: '',
                description: '',
                image:'',
                category: ''
            }


        }
    }



    submitProduct= async() =>{

        let formData = this.state.formData;
        let res = await productManageService.submitProduct(formData);

        if (res.status === 200) {
            this.setState({
                alert: true,
                message: res.data.message,
                severity: 'success'
            });


        } else {
            this.setState({
                alert: true,
                message: res.response.message,
                severity: 'error'
            });
        }
    }

    updateProduct= async(data) =>{

        let res = await productManageService.putProduct(data.id,data);

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

    deleteProduct= async(data) =>{

        let res = await productManageService.deleteProduct(data);

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


    loadAllProductsCategories= async() =>{

        let res = await productManageService.fetchAllProductsCategories();


        if (res.status === 200) {

            this.setState({
                categories:res.data,
            });


        } else {
            this.setState({
                alert: true,
                message: res.response.data.message,
                severity: 'error'
            });
        }
    }

    loadProduct= async() =>{

        // let data = this.state.id;
        let res = await productManageService.fetchASingleProduct(/*data*/);

        if (res.status === 200) {
            let data = res.data.data;
            this.setState({

                formData: {
                    title: data.title,
                    price: data.price,
                    description:data.description,
                    image:data.image,
                    category: data.category
                },
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
        let res = await productManageService.fetchAllProductsLimit(/*data*/);

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
        this.loadAllProductsCategories();

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
                                        marginBottom={'2vh'} style={{fontSize: '35px',}}>Product
                                        Manage</Typography></Grid>

                                    <Grid display={"flex"} justifyContent={'center'} height={'75vh'}
                                          alignItems={'center'} marginTop={'5vh'}>

                                        <Grid display={'flex'} height={'100%'}>
                                            <ValidatorForm ref="form" className="pt-2" onSubmit={this.submitProduct}>
                                                <div style={{
                                                    display: 'flex',
                                                    flexWrap: 'wrap',
                                                    justifyContent: 'center'
                                                }}>

                                                    <TextField
                                                        required
                                                        id="outlined-required"
                                                        label="Title"
                                                        defaultValue=""
                                                        sx={{m: 1, width: '60ch'}}
                                                        size={"small"}
                                                        value={this.state.formData.title}
                                                        onChange={(e) => {
                                                            let formDataOb = this.state.formData
                                                            formDataOb.title = e.target.value
                                                            this.setState(formDataOb)
                                                        }}
                                                        validators={['required']}

                                                    />

                                                    <TextField
                                                        required
                                                        id="outlined-required"
                                                        label="Price"
                                                        defaultValue=""
                                                        sx={{m: 1, width: '60ch'}}
                                                        size={"small"}
                                                        value={this.state.formData.price}
                                                        onChange={(e) => {
                                                            let formDataOb = this.state.formData
                                                            formDataOb.price = e.target.value
                                                            this.setState(formDataOb)
                                                        }}
                                                        validators={['required']}

                                                    />

                                                    <Grid>

                                                        <Autocomplete

                                                            onChange={(e, value, r) => {

                                                                let formData = this.state.formData

                                                                formData.category = value

                                                                this.setState({formData})

                                                            }}
                                                            getOptionLabel={
                                                                (option) => option
                                                            }

                                                            options={this.state.categories}
                                                            sx={{m: 1, width: '60ch'}}
                                                            size={"small"}
                                                            renderInput={(params) => <TextField {...params} label="Category"/>}
                                                        />
                                                    </Grid>





                                                    <TextField
                                                        required
                                                        id="outlined-required"
                                                        label="Description"
                                                        defaultValue=""
                                                        sx={{m: 1, width: '60ch'}}
                                                        size={"small"}
                                                        multiline
                                                        rows={4}
                                                        value={this.state.formData.description}
                                                        onChange={(e) => {
                                                            let formDataOb = this.state.formData
                                                            formDataOb.description = e.target.value
                                                            this.setState(formDataOb)
                                                        }}
                                                        validators={['required']}

                                                    />

                                                </div>


                                                <Grid width={'100%'} height={'40%'} >
                                                    <Grid style={{
                                                        width: '40ch',
                                                        height:'30ch',
                                                        margin: '1vh',
                                                        marginLeft:'10vw',
                                                        border: '1px solid silver',

                                                        backgroundImage:"url(" +this.state.view+ ")",
                                                        backgroundSize: 'cover'

                                                    }}>
                                                        <div style={{backgroundColor:'silver',display:'flex',justifyContent:'center'}}><input

                                                            style={{display: 'none'}}
                                                            accept="image/*"
                                                            //className={classes.input}
                                                            id="contained-button-file01"
                                                            multiple
                                                            type="file"
                                                            onChange={(e) => {
                                                                this.setState({
                                                                    view : URL.createObjectURL(e.target.files[0])
                                                                })
                                                                let formData=this.state.formData;
                                                                formData.image= e.target.files[0];
                                                                this.setState(formData)

                                                            }}
                                                        />
                                                            <label htmlFor="contained-button-file01">
                                                                <Button variant="text" color="primary" size="small" component="span">
                                                                    <UploadButton/> Upload Image
                                                                </Button>
                                                            </label>

                                                        </div>
                                                    </Grid>


                                                </Grid>


                                                <Grid width={'97%'} marginTop={'5vh'} marginRight={'10vw'}
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

export default withStyles(styleSheet)(ProductManage)