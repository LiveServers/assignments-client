import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from '@mui/material/MenuItem';
import Button from "@mui/material/Button";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import http from "../api-config";
import { useDispatch, useSelector } from "react-redux";
import {setOpen} from "@/redux/reducers/backdropReducer";
import { setResponseState } from "@/redux/reducers/responseStateReducer";
import listOfSchools from "../utils";
import { useRouter } from "next/router";

const Account = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const {open} = useSelector((state) => state.backdropReducer);
    const [updateAccountDetails, setUpdateAccountDetails] = React.useState({
        email:"",firstName:"",otherNames:"",school:"",country:"",registrationNumber:"",course:"",phoneNumber:""
    });

    React.useEffect(() => {
        dispatch(setOpen(true));
        http.get("api/v1/account/account-details").then((res)=>{
            dispatch(setOpen(false));
            dispatch(setResponseState({severity:"success",message:res?.data?.headers?.customerMessage}));
            setUpdateAccountDetails({email:res?.data?.body?.email,firstName:res?.data?.body?.firstname,otherNames:res?.data?.body?.othernames,school:res?.data?.body?.school,country:res?.data?.body?.country,registrationNumber:res?.data?.body?.registrationnumber,course:res?.data?.body?.course,phoneNumber:res?.data?.body?.phonenumber});
        }).catch((e)=>{
            dispatch(setOpen(false));
            dispatch(setResponseState({severity:"error",message:e?.response?.data?.headers?.customerMessage}));
            if(e?.response?.status === 401){
                router.push("/create-account");
                window?.localStorage?.setItem("token","");
            }
        });
    },[]);

    const handleUpdateDetailsChange = (e) => {
        setUpdateAccountDetails({...updateAccountDetails,[e.target.name]:e.target.value});
    }

    const updateAccountDetailsApi = () => {
        dispatch(setOpen(true));
        http.put("api/v1/account/update-account",{
            ...updateAccountDetails
        }).then((res)=>{
            dispatch(setOpen(false));
            dispatch(setResponseState({severity:"success",message:res?.data?.headers?.customerMessage}));
            setUpdateAccountDetails({email:res?.data?.body?.email,firstName:res?.data?.body?.firstname,otherNames:res?.data?.body?.othernames,school:res?.data?.body?.school,country:res?.data?.body?.country,registrationNumber:res?.data?.body?.registrationnumber,course:res?.data?.body?.course,phoneNumber:res?.data?.body?.phonenumber});
        }).catch((e)=>{
            dispatch(setOpen(false));
            dispatch(setResponseState({severity:"error",message:e?.response?.data?.headers?.customerMessage}));
            if(e?.response?.status === 401){
                router.push("/create-account");
                window?.localStorage?.setItem("token","");
            }
        });
    }

    const countries = [
        {
          value: 'Kenya',
          label: 'Kenya',
        },
        {
          value: 'Uganda',
          label: 'Uganda',
        },
        {
          value: 'Tanzania',
          label: 'Tanzania',
        },
        {
          value: 'Sudan',
          label: 'Sudan',
        },
      ];

    return (
        <>
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
              // onClick={handleClose}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            <Grid sx={{padding:"0 8%",}} container alignItems="center" direction="column" justifyContent="flex-start" wrap="nowrap">
                <Typography variant="h4">My Account</Typography>
                <Typography variant="h5">PERSONAL DETAILS</Typography>
                <Grid container direction="row" justifyContent="center"> 
                    <Grid sx={{width:"100%"}} item xs={4}>
                        <TextField name="firstName" value={updateAccountDetails.firstName} onChange={handleUpdateDetailsChange} variant='standard' label="First Name" sx={{"& input":{color:"#757575", paddingLeft:2}, width:"100%"}} />
                    </Grid>
                    <Grid sx={{width:"100%", marginLeft:2}} item xs={4}>
                        <TextField name="otherNames" value={updateAccountDetails.otherNames} onChange={handleUpdateDetailsChange} variant='standard' label="Other Names" sx={{"& input":{color:"#757575", paddingLeft:2,},width:"100%"}} />
                    </Grid>
                </Grid>
                <Grid container direction="row" justifyContent="center"> 
                    <Grid sx={{width:"100%"}} item xs={8}>
                        <TextField name="email" value={updateAccountDetails.email} onChange={handleUpdateDetailsChange} variant='standard' type="email" label="Email" sx={{"& input":{color:"#757575", paddingLeft:2}, width:"100%"}} />
                    </Grid>
                </Grid>
                <Grid container direction="row" justifyContent="center"> 
                    <Grid sx={{width:"100%"}} item xs={4}>
                        <TextField name="country" value={updateAccountDetails.country} onChange={handleUpdateDetailsChange} select variant='standard' label="Country" sx={{"& input":{color:"#757575", paddingLeft:2}, width:"100%", '& div.MuiInputBase-root':{color:"#000"}}}>
                            {countries.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid sx={{width:"100%", marginLeft:2}} item xs={4}>
                        <TextField name="phoneNumber" value={updateAccountDetails.phoneNumber} onChange={handleUpdateDetailsChange} variant='standard' label="Phone (OPTIONAL)" sx={{"& input":{color:"#757575", paddingLeft:2,},width:"100%"}} />
                    </Grid>
                </Grid>
                <Typography sx={{marginTop:2, textAlign:"center"}} variant="h5">SCHOOL DETAILS : FOR A PERSONALIZED EXPERIENCE(OPTIONAL)</Typography>
                <Grid container direction="row" justifyContent="center"> 
                    <Grid sx={{width:"100%"}} item xs={8}>
                        <TextField name="school" value={updateAccountDetails.school} onChange={handleUpdateDetailsChange} select variant='standard' label="University / Collage / Tertiary Institution (OPTIONAL)" sx={{"& input":{color:"#757575", paddingLeft:2}, width:"100%", '& div.MuiInputBase-root':{color:"#000"}}}>
                            {listOfSchools.map((option) => (
                                <MenuItem key={option.schoolName} value={option.schoolName}>
                                {option.schoolName}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid sx={{width:"100%"}} item xs={8}>
                        <TextField name="course" value={updateAccountDetails.course} onChange={handleUpdateDetailsChange} variant='standard' label="School Course (OPTIONAL)" sx={{"& input":{color:"#757575", paddingLeft:2}, width:"100%"}} />
                    </Grid>
                    <Grid sx={{width:"100%"}} item xs={8}>
                        <TextField name="registrationNumber" value={updateAccountDetails.registrationNumber} onChange={handleUpdateDetailsChange} variant='standard' label="Registration Number (OPTIONAL)" sx={{"& input":{color:"#757575", paddingLeft:2}, width:"100%"}} />
                    </Grid>
                </Grid>
                <Grid>
                    <Button onClick={() => updateAccountDetailsApi()} variant="contained" sx={{background:"#10CE01",color:"#fff",width:100,marginTop:3}}>Save</Button>
                </Grid>
            </Grid>
        </>
    )
}

export default Account;