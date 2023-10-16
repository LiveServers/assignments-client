import { Grid, Typography } from "@mui/material";
import React from "react";

const AppFooter = () => {
    return (
        <Grid sx={{width:"100%", backgroundColor:"#fff", position:"static",bottom:0,padding:"0 15px", marginTop:5}} container direction="column" alignItems="center" justifyContent="center" wrap="nowrap">
            <Typography sx={{color:"#000",textAlign:"center"}} variant="h4">
                Web Assignmets
            </Typography>
            <a style={{textDecoration:"none",color:"#000",marginTop:"10px",textAlign:"center"}} href="mailto:info@mysite.com">info@mysite.com</a>
            <Typography sx={{color:"#000",marginBottom:"3px",textAlign:"center",fontSize:"12px"}} variant="h5">©{new Date().getFullYear()} by Web Assignments. Created by kyole</Typography>
        </Grid>
    )
}

export default AppFooter;