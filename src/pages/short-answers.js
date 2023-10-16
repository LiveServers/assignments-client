import React from "react";
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Grid, Typography, Button } from '@mui/material'
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
// import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
import http from "../api-config";
import { useDispatch, useSelector } from "react-redux";
import { Packer } from "docx";
import { saveAs } from "file-saver";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {setOpen} from "@/redux/reducers/backdropReducer";
import { setResponseState } from "@/redux/reducers/responseStateReducer";
import { setAnswer } from "@/redux/reducers/chatgptReducer";
import wordDocumentGenerator from "../components/WordDocGenerator";
import MuiDialog from "@/components/MuiDialog";

const DownloadPDf = dynamic(() => import("../components/DownloadPdf"),{
  ssr: false
});

// you have to lazy load this component
const Editor = dynamic(
    () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
    { ssr: false }
  )

export default function Home({isMobileTablet}) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [mpesaOpen, setMpesaOpen] = React.useState(false);
  const [numberDialog, setNumberDialog] = React.useState(false);
  const [number, setNumber] = React.useState("");
  const [pageNumberPosition, setPageNumberPosition] = React.useState("center");
  const [coverPage, setCoverPage] = React.useState("one");
  const [modalMessage, setModalMessage] = React.useState({
    title: "",
    body: "",
    leftBtnTitle: "",
    rightBtnTitle: "",
    free: false,
    paymentstatus: false,
  });
  const [accountDetails, setAccountDetails] = React.useState({
    email:"",firstName:"",otherNames:"",school:"",country:"",registrationNumber:"",course:"",phoneNumber:""
});
  const dispatch = useDispatch();
  const data = useSelector(state => state.chatgptReducer);
  const {open} = useSelector((state) => state.backdropReducer);
  const [pdfOrientation, setPdfOrientation] = React.useState("portrait");
  const [items, setItems] = React.useState([]);
  const [value, setValue] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [editorState, setEditorState] = React.useState(data?.answer ? EditorState.createWithContent(ContentState.createFromText(data?.answer)) : EditorState.createEmpty());

  const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
  const blockValue = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
  const newBlockValueRes = blockValue.split("\n").filter(item => item !== ""); // this aids on how data is downloaded in word

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
  const onEditorStateChange = (editorValue) => {
    setEditorState(editorValue)
  }

  const handleInputFieldChange = (e) => {
    setTitle(e.target.value);
  }

  const structureChatGptQuestion = () => {
    // we'll use if else for now :(
      if(!title){
        dispatch(setResponseState({severity:"success",message:res?.data?.headers?.customerMessage}));
        return;
      }
      // if(title && items.length > 0){
      //   return title.concat(" and include points on ",items?.join(" "));
      // }
      if(title){
        return title.concat(" ","in a maximum of 100 words");
      }
  }

  const handleNext = () => {
    // we make an api call here by first appending all the user data
    //const chatgptQuestion = title.concat(" and include points on ",items?.join(" "));
    dispatch(setOpen(true));
    http.post("api/v1/chat-gpt/fetch-response",{
      question: structureChatGptQuestion(),
    }).then((res)=>{
        dispatch(setOpen(false));
        dispatch(setResponseState({severity:"success",message:res?.data?.headers?.customerMessage}));
        dispatch(setAnswer(res?.data?.body?.data));
        setEditorState(EditorState.createWithContent(ContentState.createFromText(res?.data?.body?.data)));
    }).catch((e)=>{
        dispatch(setOpen(false));
        dispatch(setResponseState({severity:"error",message:e?.response?.data?.headers?.customerMessage}));
        if(e?.response?.status === 401){
          router.push("/create-account");
          window?.localStorage?.setItem("token","");
        }
    });
  }

  const downloadWordDocument = (val, position) => {
    if(newBlockValueRes || blockValue){
      Packer.toBlob(wordDocumentGenerator(val, position, coverPage,accountDetails,"")).then(blob => {
        saveAs(blob, "result.docx");
      }).catch((e) => console.log("ERROR GENERATING WORD DOC",e));
    }
  }

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
        <Typography sx={{fontSize:"40px"}} variant='body1'>Short answer</Typography>
        <Grid item sx={{padding:"0 8%", width:"80%"}}>
        <Typography variant='body1'>1. Enter your question here:</Typography>
        <TextField name="title" value={title} onChange={handleInputFieldChange} sx={{width:"100%","& textarea":{color:"#000"},"& fieldset":{borderRadius:"0 !important",borderColor:"#000 !important"}}} multiline rows={5} variant="outlined" placeholder='Example: What is photosynthesis?' />
        </Grid>
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
                  <Grid container direction="row" wrap="nowrap" alignItems="center" sx={{marginLeft:index !== 0 && 2,marginTop:2, background:"#3799EB", padding:2,borderRadius:3,width:"auto"}}>
                  <Typography sx={{color:"#fff"}}>{val}</Typography>
                  <CloseIcon onClick={() => removeItem(index)} fontSize='small' sx={{color:"#fff"}} />
                </Grid>
                ))
              }
            </Grid>
        </Grid> */}
        <Grid>
          <Button disabled={!title} onClick={() => checkAccountDetails()} variant="contained" sx={{background:"#10CE01",color:"#fff",width:300, marginTop:2}}>Get Answer</Button>
        </Grid>
        
        <div style={{padding:"20px 8%",width:"80%",display:"flex",flexDirection:"column"}}>
        <Typography sx={{textAlign:"left",float:"left"}}>Words: {newBlockValueRes.join("").split(" ").length}</Typography>
        <Editor
            editorState={editorState}
            editorClassName="editor-class"
            onEditorStateChange={(editorValue) => onEditorStateChange(editorValue)}
            wrapperClassName={!isMobileTablet ? "wrapper-class" : "wrapper-class-mobile"}
            toolbarClassName="toolbar-class"
            toolbarStyle={{borderBottom:"1px solid #000"}}
            toolbar={{
                options: ['inline', 'list', 'textAlign'],
                blockType: {
                    inDropdown: true,
                    options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
                    // className: undefined,
                    // component: undefined,
                    // dropdownClassName: undefined,
                  },
                  fontSize: {
                    // icon: fontSize,
                    options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
                    className: undefined,
                    component: undefined,
                    dropdownClassName: undefined,
                  },
            }}
      />
        </div>
        <Grid sx={{padding:"0 8%",width:"80%"}} container direction="row" justifyContent="space-between" alignItems="center" wrap="nowrap">
                <Button onClick={() => downloadWordDocument(newBlockValueRes, "center")} sx={{width:"100%", borderRadius:"0 !important",backgroundColor:"#1890FF",color:"#fff"}} variant="outlined">Download in Word Format(DOC)</Button>
                <DownloadPDf data={newBlockValueRes} isMobileTablet={isMobileTablet} pdfOrientation={pdfOrientation} preview={false} previewData="" pageNumberPosition={pageNumberPosition} accountDetails={accountDetails} coverPage={coverPage} />
            </Grid>
      </Grid>
    </>
  )
}
