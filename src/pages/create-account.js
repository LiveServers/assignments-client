import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from '@mui/material/MenuItem';
import Button from "@mui/material/Button";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from "react-redux";
import http from "../api-config";
import {setOpen} from "@/redux/reducers/backdropReducer";
import { setResponseState } from "@/redux/reducers/responseStateReducer";
import { useRouter } from "next/router";

const Account = ({isMobileTablet}) => {
    const dispatch = useDispatch();
    const {open} = useSelector((state) => state.backdropReducer);
    const router = useRouter();
    const [loginData, setLoginData] = React.useState({
        email:"",
        phoneNumber:"",
        password:""
    });
    const [createAccountData, setCreateAccountData] = React.useState({
        email:"",firstName:"",otherNames:"",phoneNumber:"",password:""
    });

    const signInToAccount = () => {
        dispatch(setOpen(true));
        http.post("api/v1/account/sign-in",{
            ...loginData
        }).then((res)=>{
            dispatch(setOpen(false));
            dispatch(setResponseState({severity:"success",message:res?.data?.headers?.customerMessage}));
            window?.localStorage?.setItem("token",res?.data?.body?.accessToken);
            setLoginData({ email:"",phoneNumber:"",password:""});
            router.push({pathname:"/",query:{referrer: router.pathname}});
        }).catch((e)=>{
            dispatch(setOpen(false));
            dispatch(setResponseState({severity:"error",message:e?.response?.data?.headers?.customerMessage}))
        });
    }

    const signUpToAccount = () => {
        dispatch(setOpen(true));
        http.post("api/v1/account/create-account",{
            ...createAccountData
        }).then((res)=>{
            dispatch(setOpen(false));
            dispatch(setResponseState({severity:"success",message:res?.data?.headers?.customerMessage}));
            window?.localStorage?.setItem("token",res?.data?.body?.accessToken);
            setCreateAccountData({ email:"",phoneNumber:"",password:""});
            router.push({pathname:"/",query:{referrer: router.pathname}});
        }).catch((e)=>{
            dispatch(setOpen(false));
            dispatch(setResponseState({severity:"error",message:e?.response?.data?.headers?.customerMessage}))
        });
    }

    const handleLoginDataChange = (e) => {
        setLoginData({...loginData,[e.target.name]:e.target.value});
    }

    const handleSignUpDataChange = (e) => {
        setCreateAccountData({...createAccountData,[e.target.name]:e.target.value});
    }

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
                <Typography variant="h4">Account</Typography>
                <Typography variant="h5" sx={{textDecoration:"underline",textAlign:"center"}}>SIGN IN</Typography>
                <Grid sx={{padding:"0 !important",margin:"0 !important"}} container direction="row" justifyContent="center"> 
                    <Grid sx={{width:"100%",padding:"0 !important",margin:"0 !important"}} item xs={8}>
                        <TextField onChange={handleLoginDataChange} value={loginData.email} name="email" variant='standard' type="email" label="Email" sx={{"& input":{color:"#757575", paddingLeft:2}, width:"100%"}} />
                    </Grid>
                </Grid>
                <Grid container direction="row" justifyContent="center"> 
                    <Grid sx={{width:"100%"}} item xs={8}>
                        <TextField onChange={handleLoginDataChange} value={loginData.phoneNumber} name="phoneNumber" variant='standard'  label="Phone Number" sx={{"& input":{color:"#757575", paddingLeft:2}, width:"100%"}} />
                    </Grid>
                </Grid>
                <Grid container direction="row" justifyContent="center"> 
                    <Grid sx={{width:"100%"}} item xs={8}>
                        <TextField onChange={handleLoginDataChange} value={loginData.password} name="password" variant='standard' type="password" label="Password" sx={{"& input":{color:"#757575", paddingLeft:2}, width:"100%"}} />
                    </Grid>
                </Grid>
                <Grid container alignItems="center" justifyContent="center" wrap="nowrap" sx={{marginTop:"30px"}}>
                    <Button sx={{fontSize:isMobileTablet && "10px", maxWidth:isMobileTablet ? "120px":"150px", minWidth:isMobileTablet ? "120px":"150px",borderRadius:0, marginRight: isMobileTablet ? "10px":"50px",backgroundColor:"#14D302",color:"#fff"}} variant="outlined" onClick={() => signInToAccount()}>Sign in</Button>
                    <Button sx={{fontSize:isMobileTablet && "10px",maxWidth:isMobileTablet ? "120px":"150px", minWidth:isMobileTablet ? "120px":"150px",borderRadius:0,color:"#000"}} variant="outlined">Forgot password</Button>
                </Grid>
                <Typography sx={{marginTop:"20px", textAlign:"center",textDecoration:"underline"}} variant="h5">CREATE ACCOUNT</Typography>
                <Grid container direction="row" justifyContent="center"> 
                    <Grid sx={{width:"100%",marginRight:"30px"}} item xs={4}>
                        <TextField onChange={handleSignUpDataChange} value={createAccountData.firstName} name="firstName" variant='standard' label="First Name" sx={{"& input":{color:"#757575", paddingLeft:2}, width:"100%"}} />
                    </Grid>
                    <Grid sx={{width:"100%"}} item xs={4}>
                        <TextField onChange={handleSignUpDataChange} value={createAccountData.otherNames} name="otherNames" variant='standard' label="Other Names" sx={{"& input":{color:"#757575", paddingLeft:2}, width:"100%"}} />
                    </Grid>
                    <Grid sx={{width:"100%"}} item xs={8}>
                        <TextField onChange={handleSignUpDataChange} value={createAccountData.email} name="email" variant='standard' type="email" label="Email" sx={{"& input":{color:"#757575", paddingLeft:2}, width:"100%"}} />
                    </Grid>
                    <Grid sx={{width:"100%"}} item xs={8}>
                        <TextField onChange={handleSignUpDataChange} value={createAccountData.phoneNumber} name="phoneNumber" variant='standard' label="Phone Number" sx={{"& input":{color:"#757575", paddingLeft:2}, width:"100%"}} />
                    </Grid>
                    <Grid sx={{width:"100%"}} item xs={8}>
                        <TextField onChange={handleSignUpDataChange} value={createAccountData.password} name="password" variant='standard' type="password" label="Password" sx={{"& input":{color:"#757575", paddingLeft:2}, width:"100%"}} />
                    </Grid>
                </Grid>
                <Grid>
                    <Button onClick={() => signUpToAccount()} variant="contained" sx={{fontSize:isMobileTablet && "10px",background:"#10CE01",color:"#fff",width:isMobileTablet ? "auto":"150px",marginTop:3}}>Create Account</Button>
                </Grid>
            </Grid>
        </>
    )
}

export default Account;