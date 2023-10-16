import React from "react";
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import { useSelector, useDispatch } from "react-redux";
import AppFooter from "../containers/AppFooter";
import AppHeader from "../containers/AppHeader";
import { setResponseState } from "@/redux/reducers/responseStateReducer";


const MainLayout = ({children,isMobileTablet}) => {
    const {severity,message} = useSelector(state => state.responseStateReducer);
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(setResponseState({severity:"",message:""}));
    }
    setTimeout(()=>{
        handleClose();
    },6000);
    return (
        <Grid sx={{height:"100%"}} >
            <AppHeader isMobileTablet={isMobileTablet} />
            <div style={{marginTop:100}}>
                {
                    severity && message && (
                        <Alert sx={{width:"50%", float:"right"}} variant="filled" onClose={() => handleClose()} severity={severity}>{message}</Alert>
                    )
                }
            {children}
            </div>
            <AppFooter />
        </Grid>
    )
}

export default MainLayout;