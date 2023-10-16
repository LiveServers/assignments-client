import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import PropTypes from "prop-types";
import {
  Divider,
  Drawer,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Link from "next/link";
import MenuItem from '@mui/material/MenuItem';
import { useDispatch } from "react-redux";
import {
  usePopupState,
  bindHover,
  bindMenu,
} from 'material-ui-popup-state/hooks'
import HoverMenu from 'material-ui-popup-state/HoverMenu'
import http from "../api-config";
import {setOpen} from "@/redux/reducers/backdropReducer";
import { setResponseState } from "@/redux/reducers/responseStateReducer";
import { useRouter } from "next/router";

function AppHeader({
  isMobileTablet,
  window: win,
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const popupState = usePopupState({ variant: 'popover', popupId: 'demoMenu' })
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const rerender = React.useRef(true);
  const [userData, setUserData] = React.useState({
    isSignedIn: false,
    userName: ""
  });

  React.useEffect(() => {
    if(rerender.current){
      http.get("api/v1/account/account-details").then((res)=>{
        setUserData({isSignedIn: true, userName:res?.data?.body?.firstname });
    }).catch((e)=>{
      if(e?.response?.status === 401){
        setUserData({isSignedIn: false, userName:"" });
        router.push("/create-account");
        window?.localStorage?.setItem("token","");
      }
    });
    rerender.current = false;
    }
  },[]);

  const logOutUser = () => {
    dispatch(setOpen(true));
    http.post("api/v1/account/log-out").then((res)=>{
        dispatch(setOpen(false));
        dispatch(setResponseState({severity:"success",message:res?.data?.headers?.customerMessage}));
        router.push("/create-account");
        window?.localStorage?.setItem("token","");
    }).catch((e)=>{
        dispatch(setOpen(false));
        dispatch(setResponseState({severity:"error",message:e?.response?.data?.headers?.customerMessage}));
    });
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Typography>Web Assignments</Typography>
      <Divider />
      <Grid sx={{paddingLeft:"9%"}} container direction="column" alignItems="flex-start" justifyContent="flex-start">
      <Link style={{textDecoration:"none",color:"#000"}} href="/" prefetch={false}>
        Essays
      </Link>
      {/* <Link style={{textDecoration:"none",color:"#000"}} href="/state-and-explain" prefetch={false}>
        State and explain
      </Link> */}
      <Link style={{textDecoration:"none",color:"#000"}} href="/short-answers" prefetch={false}>
        Short answers
      </Link>
      <Link style={{textDecoration:"none",color:"#000"}} href="/account" prefetch={false}>
        My Account
      </Link>
      <Link style={{textDecoration:"none",color:"#000"}} href="/create-account" prefetch={false}>
        Create Account
      </Link>
      {
        userData.isSignedIn && (
        <Typography onClick={() => logOutUser()}>
          Log Out 
        </Typography>
        )
      }
      </Grid>
    </Box>
  );
  const container = win !== undefined ? () => win().document.body : undefined;
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: theme.palette.grey[0],
      }}
    >
      <AppBar
        sx={{
          backgroundColor: theme.palette.grey[0],
          height: 80,
          justifyContent: "center",
          boxShadow: "none",
          borderBottom:"1px solid #1D2CF2"
        }}
        position="fixed"
      >
        <Toolbar>
          <Grid
            container
            alignItems="center"
            justifyContent="space-around"
            wrap="nowrap"
            direction="row"
          >
            <Box>
             <Typography variant="body1" sx={{color:"#000",fontSize:!isMobileTablet && "40px"}}>
                WEB ASSIGNMENTS
             </Typography>
            </Box>
            {!isMobileTablet && (
              <>
                <Box>
                  <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    wrap="nowrap"
                  >
                    <Link style={{textDecoration:"none",color:"#000", marginRight:12}} href="/" prefetch={false}>
                    Essays
                    </Link>
                    {/* <Link style={{textDecoration:"none",color:"#000", marginRight:12}} href="/state-and-explain" prefetch={false}>
                        State and explain
                    </Link> */}
                    <Link style={{textDecoration:"none",color:"#000", marginRight:12}} href="/short-answers" prefetch={false}>
                    Short answers
                    </Link>
                    <Typography {...bindHover(popupState)}  style={{textDecoration:"none",color:"#000", marginRight:12,cursor:"pointer",fontWeight:"bold"}}>
                      {userData.isSignedIn ? userData.userName : "Sign In"}
                    </Typography>
                      <HoverMenu {...bindMenu(popupState)}>
                         <Link style={{textDecoration:"none",color:"#000"}} href="/account" prefetch={false}>
                          <MenuItem>My Account</MenuItem>
                        </Link>
                        <Link style={{textDecoration:"none",color:"#000"}} href="/create-account" prefetch={false}>
                          <MenuItem>Create Account</MenuItem>
                        </Link>
                        {
                          userData.isSignedIn && (
                          <MenuItem onClick={() => logOutUser()}>
                            Log Out 
                          </MenuItem>
                          )
                        }
                        </HoverMenu>
                  </Grid>
                </Box>
              </>
            )}
            {isMobileTablet && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon sx={{ color: theme.palette.grey[900] }} />
              </IconButton>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default React.memo(AppHeader);

AppHeader.propTypes = {
  isMobileTablet: PropTypes.bool,
};