import React from "react";
import Head from 'next/head'
import { Grid, Typography, Button } from '@mui/material'
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from "next/router";
import isEmpty from "lodash.isempty";
import { nanoid } from "nanoid";
import http from "../api-config";
import { useDispatch, useSelector } from "react-redux";
import {setOpen} from "@/redux/reducers/backdropReducer";
import { setResponseState } from "@/redux/reducers/responseStateReducer";
import { setAnswer } from "@/redux/reducers/chatgptReducer";
import MuiDialog from "@/components/MuiDialog";

export default function Home({isMobileTablet}) {
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [mpesaOpen, setMpesaOpen] = React.useState(false);
  const [numberDialog, setNumberDialog] = React.useState(false);
  const [number, setNumber] = React.useState("");
  const [modalMessage, setModalMessage] = React.useState({
    title: "",
    body: "",
    leftBtnTitle: "",
    rightBtnTitle: "",
    free: false,
    paymentstatus: false,
  });
  const {open} = useSelector((state) => state.backdropReducer);
  const [items, setItems] = React.useState([]);
  const [value, setValue] = React.useState("");
  const [essayData, setEssayData] = React.useState({
    title:"",
    numberOfWords: "",
    numberOfReferences: ""
  });
  const [checked, setChecked] = React.useState(false);

  const router = useRouter();
  React.useEffect(()=>{
    if(router.query.referrer === "/create-account"){
      window.location.reload();
      return;
    }
  },[]);

  const checkAccountDetails = () => {
    dispatch(setOpen(true));
    http.get("api/v1/account/account-details").then((res)=>{
        dispatch(setOpen(false));
        dispatch(setResponseState({severity:"success",message:res?.data?.headers?.customerMessage}));
        if(res?.data?.body?.isfreetrial && !res?.data?.body?.paymentstatus){
          setModalMessage({
            title: "Free Trial",
            body: "You have one free trial remaining",
            leftBtnTitle: "Cancel",
            rightBtnTitle: "Continue",
            free: true,
            paymentstatus: false,
          });
          setDialogOpen(true);
        }else if(!res?.data?.body?.isfreetrial && !res?.data?.body?.paymentstatus){
          setModalMessage({
            title: "No Free Trial",
            body: "You have exhausted your free trial. Please pay Ksh. 1 to proceed",
            leftBtnTitle: "Cancel",
            rightBtnTitle: "Continue",
            free: false,
            paymentstatus: false,
          });
          setDialogOpen(true);
        }else if(!res?.data?.body?.isfreetrial && res?.data?.body?.paymentstatus){
          handleNext();
        }
    }).catch((e)=>{
      dispatch(setOpen(false));
      dispatch(setResponseState({severity:"error",message:e?.response?.data?.headers?.customerMessage}));
      if(e?.response?.status === 401){
        router.push("/create-account");
        window?.localStorage?.setItem("token","");
      }
    });
  }

  const removeItem = (index) => {
    const temp = [...items];
    temp.splice(index, 1);
    setItems([...temp]);
  }

  const addItem = () => {
    if(value){
      setItems([...items,value]);
      setValue('');
    }
  }

  const handleInputFieldChange = (e) => {
    setEssayData({...essayData,[e.target.name]:e.target.value});
  }

  const decideApiToCall = () => {
    setNumberDialog(false);
    if(modalMessage.free && !modalMessage.paymentstatus){
      handleNext();
    }else if(!modalMessage.paymentstatus && !modalMessage.free){
      // we call the mpesa api
      setDialogOpen(false);
      dispatch(setOpen(true));
      if(number){
        http.post("api/v1/mpesa/process-payment",{
          number: `254${number}`
        }).then((res)=>{
            dispatch(setOpen(false));
            dispatch(setResponseState({severity:"success",message:res?.data?.headers?.customerMessage}));
            setMpesaOpen(true);
        }).catch((e)=>{
            dispatch(setOpen(false));
            dispatch(setResponseState({severity:"error",message:e?.response?.data?.headers?.customerMessage}));
            if(e?.response?.status === 401){
              router.push("/create-account");
              window?.localStorage?.setItem("token","");
            }
        });
      }
    }
  }

  const checkPaymentStatusAndReturnGptResult = () => {
    setMpesaOpen(false);
    handleNext();
  }

  const structureChatGptQuestion = () => {
    // we'll use if else for now :(
      if(!essayData.title){
        dispatch(setResponseState({severity:"success",message:res?.data?.headers?.customerMessage}));
        return;
      }
      if(essayData.title && essayData.numberOfWords && essayData.numberOfReferences && items.length > 0){
        return essayData.title.concat(" in ",essayData.numberOfWords," words").concat(" and include points on ",items?.join(" ")).concat(" and include ",essayData.numberOfReferences," references");
      }
      if(essayData.title && essayData.numberOfReferences && items.length > 0){
        return essayData.title.concat(" and include points on ",items?.join(" ")).concat(" and include ",essayData.numberOfReferences," references");
      }
      if(essayData.title && essayData.numberOfReferences && essayData.numberOfWords){
        return essayData.title.concat(" in ",essayData.numberOfWords," words").concat(" and include ",essayData.numberOfReferences," references");
      }
      if(essayData.title && essayData.numberOfWords){
        return essayData.title.concat(" in ",essayData.numberOfWords," words");
      }
      if(essayData.title && items.length > 0){
        return essayData.title.concat(" and include points on ",items?.join(" "));
      }
      if(essayData.title && essayData.numberOfReferences){
        return essayData.title.concat(" and include ",essayData.numberOfReferences," references");
      }
      if(essayData.title){
        return essayData.title;
      }
  }

  const handleNext = () => {
    // we make an api call here by first appending all the user data
    // we need an algorithm to structure how we send the question to chat gpt
    // const chatgptQuestion = essayData.title.concat(" in ",essayData.numberOfWords," words").concat(" and include points on ",items?.join(" ")).concat(" and include ",essayData.numberOfReferences," references"); 
    dispatch(setOpen(true));
    http.post("api/v1/chat-gpt/fetch-response",{
      question: structureChatGptQuestion(),
    }).then((res)=>{
        dispatch(setOpen(false));
        dispatch(setResponseState({severity:"success",message:res?.data?.headers?.customerMessage}));
        dispatch(setAnswer(res?.data?.body?.data));
        router.push({pathname:'/view-answer',query:{referrer:router.pathname}});
    }).catch((e)=>{
        dispatch(setOpen(false));
        dispatch(setResponseState({severity:"error",message:e?.response?.data?.headers?.customerMessage}));
        if(e?.response?.status === 401){
          router.push("/create-account");
          window?.localStorage?.setItem("token","");
        }
    });
  }

  const handleNextModal = () => {
    setDialogOpen(false);
    if(modalMessage.free && !modalMessage.paymentstatus){
      decideApiToCall();
    }else{
      setNumberDialog(true);
    }
  }

  return (
    <>
      <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
      </Backdrop>
      <MuiDialog handleNext={() => checkPaymentStatusAndReturnGptResult()} open={mpesaOpen} handleClose={() => setMpesaOpen(false)} body="Please click on confirm if you have already made the payment." title="Generate Answer" leftBtnTitle="Cancel" rightBtnTitle="Confirm" />
      <MuiDialog handleNext={() => handleNextModal()} open={dialogOpen} handleClose={() => setDialogOpen(false)} body={modalMessage.body} title={modalMessage.title} leftBtnTitle={modalMessage.leftBtnTitle} rightBtnTitle={modalMessage.rightBtnTitle} />
      <MuiDialog number={number} setNumber={setNumber} input handleNext={() => decideApiToCall()} open={numberDialog} handleClose={() => setDialogOpen(false)} body="Please enter Safaricom Mobile Number to Proceed" title="Mobile Number" leftBtnTitle="Cancel" rightBtnTitle="Continue" />
      <Head>
        <title>Web Assignments</title>
        <meta name="description" content="Created by kyole. Web Assignments" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid sx={{width:"100%"}} container direction="column" alignItems="center" wrap="nowrap" justifyContent="flex-start">
        <Typography sx={{fontSize:"40px"}} variant='body1'>Essays</Typography>
        <Grid item sx={{padding:"0 8%", width:"80%"}}>
        <Typography variant='body1'>1. Title of Essay / question:</Typography>
        <TextField name="title" value={essayData.title} onChange={handleInputFieldChange} sx={{width:"100%","& textarea":{color:"#000"},"& fieldset":{borderRadius:"0 !important",borderColor:"#000 !important"}}} multiline rows={5} variant="outlined" placeholder='Example: Write and essay about photosynthesis' />
        </Grid>
        {
          isMobileTablet ? (
            <Grid container wrap="nowrap" direction="column" alignItems="flex-start" justifyContent="flex-start" sx={{width:"80%",padding:"20px 8%"}} >
            <Typography variant='body1'>2. Number of words:</Typography>
            <TextField name="numberOfWords" value={essayData.numberOfWords} onChange={handleInputFieldChange} type="number" variant='standard' placeholder='Enter number...' sx={{width:"60%","& input":{color:"#757575", paddingLeft:2}}} />
            {/* <Typography sx={{marginTop:"10px"}}>Word will approximately range between <span style={{color:"blue"}}>490</span> and <span style={{color:"blue"}}>510</span></Typography> */}
        </Grid>
          ):(
            <Grid container wrap="nowrap" direction="row" alignItems="center" sx={{width:"80%",padding:"20px 8%"}} >
            <Typography variant='body1'>2. Number of words:</Typography>
            <TextField name="numberOfWords" value={essayData.numberOfWords} onChange={handleInputFieldChange} type="number" variant='standard' placeholder='Enter number...' sx={{width:"20%",marginLeft:3,marginRight:3,"& input":{color:"#757575", paddingLeft:2}}} />
            {/* <Typography>Word will approximately range between <span style={{color:"blue"}}>490</span> and <span style={{color:"blue"}}>510</span></Typography> */}
        </Grid>
          )
        }
        {/* <Grid container wrap="nowrap" direction="column" alignItems="flex-start" sx={{width:"100%",padding:"20px 8%"}} >
            <Typography variant='body1'>3. Any specific points you would like to be mentioned or discussed in the answer: (OPTIONAL)</Typography>
            <Grid container alignItems="center" direction="row">
            {
                isMobileTablet ? (
                  <Grid container alignItems="center" justifyContent="center" direction="column">
                    <TextField value={value} onChange={(e) => setValue(e.target.value)} variant='outlined' placeholder='Example: Carbon Dioxide, water, sunlight' sx={{width:"100%","& input":{color:"#757575", paddingLeft:2},margin:"0 !important",marginTop:"10px !important"}} />
                    <Button onClick={() => addItem()} variant='contained' sx={{marginTop:"10px",borderRadius:2}}>Add</Button>
                  </Grid>
                ):(
                  <>
                    <TextField value={value} onChange={(e) => setValue(e.target.value)} variant='outlined' placeholder='Example: Carbon Dioxide, water, sunlight' sx={{width:"20%",marginLeft:3,marginRight:3,"& input":{color:"#757575", paddingLeft:2},margin:"0 !important"}} />
                    <Button onClick={() => addItem()} variant='contained' sx={{marginLeft:5,borderRadius:2}}>Add</Button>
                  </>
                )
              }
            </Grid>
            <Grid container alignItems="flex-start" direction="row" wrap="nowrap">
              {
                items.map((val,index) => (
                  <Grid key={nanoid()} container direction="row" wrap="nowrap" alignItems="center" sx={{marginLeft:index !== 0 && 2,marginTop:2, background:"#3799EB", padding:2,borderRadius:3,width:"auto"}}>
                  <Typography sx={{color:"#fff"}}>{val}</Typography>
                  <CloseIcon onClick={() => removeItem(index)} fontSize='small' sx={{color:"#fff"}} />
                </Grid>
                ))
              }
            </Grid>
        </Grid> */}
        {
          isMobileTablet ? (
            <Grid container wrap="nowrap" direction="column" alignItems="flex-start" justifyContent="center" sx={{width:"80%",padding:"15px 8%"}} >
            <Typography variant='body1'>3. Include References in your work</Typography>
            <FormControlLabel sx={{fontSize:"10px"}} control={<Switch size="large" checked={checked} onChange={(e) => setChecked(e.target.checked)} inputProps={{ 'aria-label': 'controlled' }} sx={{transform:"scale(2)"}} />} />
            {
              checked && (
                <TextField name="numberOfReferences" value={essayData.numberOfReferences} onChange={handleInputFieldChange} type="number" variant='standard' placeholder='Enter number...' sx={{width:"100%","& input":{color:"#757575", paddingLeft:2}}} />
              )
            }
        </Grid>
          ):(
            <Grid container wrap="nowrap" direction="row" alignItems="center" justifyContent="flex-start" sx={{width:"80%",padding:"15px 8%"}} >
            <Typography variant='body1'>3. Include References in your work</Typography>
            <FormControlLabel sx={{marginLeft:2}} control={<Switch size="large" checked={checked} onChange={(e) => setChecked(e.target.checked)} inputProps={{ 'aria-label': 'controlled' }} sx={{transform:"scale(2)"}} />} />
            {
              checked && (
                <TextField name="numberOfReferences" value={essayData.numberOfReferences} onChange={handleInputFieldChange} type="number" variant='standard' placeholder='Enter number...' sx={{width:"20%",marginLeft:2,marginRight:3,"& input":{color:"#757575", paddingLeft:2}}} />
              )
            }
        </Grid>
          )
        }
        <Grid>
          <Button disabled={isEmpty(essayData.title)} variant="contained" sx={{background:"#10CE01",color:"#fff",width:isMobileTablet? 300 : 400}} onClick={() => checkAccountDetails()}>Get Answer</Button>
        </Grid>
      </Grid>
    </>
  )
}
