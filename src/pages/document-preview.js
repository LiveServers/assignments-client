import dynamic from "next/dynamic";
import React from "react";
import { Grid, Typography, Button } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from "next/router";
import { Packer } from "docx";
import { saveAs } from "file-saver";
import { useDispatch, useSelector } from "react-redux";
import wordDocumentGenerator from "../components/WordDocGenerator";
import {setOpen} from "@/redux/reducers/backdropReducer";
import { setResponseState } from "@/redux/reducers/responseStateReducer";
import http from "../api-config";
import isEmpty from "lodash.isempty";
import listOfSchools from "../utils";

// with next.js, working with @react-pdf/renderer can be complicated so please follow all steps highlighed in this repo
const DownloadPDf = dynamic(() => import("../components/DownloadPdf"),{
    ssr: false
});

const PdfView = dynamic(() => import("../components/Pdf"),{
    ssr: false
});

const DocumentPreview = ({isMobileTablet}) => {
    const dispatch = useDispatch();
    const {open} = useSelector((state) => state.backdropReducer);
    const data = useSelector(state => state.chatgptReducer);
    const [ _,setClient] = React.useState(false);
    const [pdfOrientation, setPdfOrientation] = React.useState("portrait");
    const [coverPage, setCoverPage] = React.useState("one");
    const router = useRouter();
    React.useEffect(()=>{
        setClient(true);
    },[]);

    const [pageTitle, setPageTitle] = React.useState("");
    const [pageNumberPosition, setPageNumberPosition] = React.useState("center");

    React.useEffect(()=>{
        let name = "";
        if(router?.query?.answerLink === "/"){
            name = "Essays";
        }
        else if(router?.query?.answerLink === "/state-and-explain"){
            name = "State and Explain";
        }else{
            router.push("/");
        }
        setPageTitle(name);
    },[router.pathname]);

    const [accountDetails, setAccountDetails] = React.useState({
        email:"",firstName:"",otherNames:"",school:"",country:"",registrationNumber:"",course:"",phoneNumber:""
    });

    const checkIfRequiredAccountFieldsArePresent = () => {
        return !isEmpty(accountDetails.firstName) && !isEmpty(accountDetails.otherNames) && !isEmpty(accountDetails.school) && !isEmpty(accountDetails.registrationNumber) && !isEmpty(accountDetails.course);
    }

    React.useEffect(() => {
        dispatch(setOpen(true));
        http.get("api/v1/account/account-details").then((res)=>{
            dispatch(setOpen(false));
            dispatch(setResponseState({severity:"success",message:res?.data?.headers?.customerMessage}));
            setAccountDetails({email:res?.data?.body?.email,firstName:res?.data?.body?.firstname,otherNames:res?.data?.body?.othernames,school:res?.data?.body?.school,country:res?.data?.body?.country,registrationNumber:res?.data?.body?.registrationnumber,course:res?.data?.body?.course,phoneNumber:res?.data?.body?.phonenumber});
        }).catch((e)=>{
            dispatch(setOpen(false));
            dispatch(setResponseState({severity:"error",message:e?.response?.data?.headers?.customerMessage}));
            if(e?.response?.status === 401){
                router.push("/create-account");
                window?.localStorage?.setItem("token","");
            }
        });
    },[]);

    const downloadWordDocument = async(val, position) => {
        await fetch(listOfSchools.filter(item => item.schoolName === accountDetails.school)[0].schoolImage).then(r => {
            const blob = r.blob();
            Packer.toBlob(wordDocumentGenerator(val, position, coverPage, accountDetails,blob)).then(blobs => {
                saveAs(blobs, "result.docx");
              }).catch((e) => console.log("ERROR GENERATING WORD DOC",e));
        }).catch(e => {
            dispatch(setResponseState({severity:"error",message:"Failed to generate school image"}));
            return;
        });
    }

    const goBackToQuestion = () => {
        let path = "";
        if(router?.query?.questionLink === "/"){
            path = "/";
        }
        else if(router?.query?.questionLink === "/state-and-explain"){
            path = "/state-and-explain";
        }
        router.push(path)
    }

    const goBackToAnswer = () => {
        let path = {};
        if(router?.query?.questionLink === "/"){
            path = {
                pathname:"/view-answer",
                query:{referrer:"/"}
            };
        }
        else if(router?.query?.questionLink === "/state-and-explain"){
            path = {
                pathname:"/view-answer",
                query:{referrer:"/state-and-explain"}
            };
        }
        router.push(path)
    }
    return (
        <>
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            <Grid sx={{padding:"0 8%"}} container alignItems="center" direction="column" justifyContent="flex-start" wrap="nowrap">
                <Typography variant="h3">{pageTitle}</Typography>
                <Grid container justifyContent="space-between" alignItems="center" wrap="nowrap" style={{padding:"10px 8% 0",width:"100%",alignSelf:"center"}}>
                    <Typography component="span" sx={{cursor:"pointer",marginBottom:1.5}} onClick={() => goBackToQuestion()}>Return to Question</Typography>
                    <Typography component="span" sx={{marginBottom:1.5}}>Confirm Details</Typography>
                    <Typography component="span" sx={{marginBottom:1.5,cursor:"pointer",}} onClick={() => goBackToAnswer()}>Return to Answer</Typography>
                </Grid>
                {
                    isMobileTablet ? (
                        <Grid sx={{border:"1px solid #000"}} direction="column" container alignItems="flex-start" justifyContent="center" wrap="nowrap">
                        <Grid sx={{paddingLeft: 10}} container direction="column" justifyContent="flex-start" alignItems="flex-start" wrap="nowrap">
                            {
                                checkIfRequiredAccountFieldsArePresent() && (
                                    <>
                                        <Typography sx={{textDecoration:"underline"}} variant="h5">Cover Page</Typography>
                                        <Typography variant="h6">Change Cover Page Style</Typography>
                                        <Grid container alignItems="center" justifyContent="flex-start" wrap="nowrap">
                                            <Button sx={{backgroundColor:coverPage === "one" && "#1890FF", cursor:"pointer",color:coverPage === "one" ? "#fff" :"#000"}} onClick={() => setCoverPage("one")}>
                                                1
                                            </Button>
                                            <Button sx={{backgroundColor:coverPage === "two" && "#1890FF", textAlign:"center", cursor:"pointer",color:coverPage === "two" ? "#fff" :"#000"}} onClick={() => setCoverPage("two")}>
                                                2
                                            </Button>
                                        </Grid>
                                    </>
                                )
                            }
                            <Typography sx={{textDecoration:"underline",marginTop:3}} variant="h5">Orientation</Typography>
                            <Grid container>
                                <Button onClick={() => setPdfOrientation("portrait")} sx={{backgroundColor:pdfOrientation === "potrait" && "#1890FF",borderRadius:"0 !important",minWidth:"80px",maxWidth:"80px",color:pdfOrientation === "potrait" ? "#fff" :"#000"}} variant="outlined">Potrait</Button>
                                <Button onClick={() => setPdfOrientation("landscape")} sx={{backgroundColor:pdfOrientation === "landscape" && "#1890FF",borderRadius:"0 !important",minWidth:"80px",maxWidth:"80px",color:pdfOrientation === "landscape" ? "#fff" :"#000"}} variant="outlined">Landscape</Button>
                            </Grid>
                            <Typography sx={{textDecoration:"underline",marginTop:3}} variant="h5">Page Numbering</Typography>
                            <Typography variant="h6">Change Page Numbering Style</Typography>
                            <Grid container alignItems="center" justifyContent="flex-start" wrap="nowrap">
                                <Button sx={{backgroundColor:pageNumberPosition === "left" && "#1890FF", cursor:"pointer",color:pageNumberPosition === "left" ? "#fff" :"#000"}} onClick={() => setPageNumberPosition("left")}>
                                    1
                                </Button>
                                <Button sx={{backgroundColor:pageNumberPosition === "center" && "#1890FF", textAlign:"center", cursor:"pointer",color:pageNumberPosition === "center" ? "#fff" :"#000"}} onClick={() => setPageNumberPosition("center")}>
                                    2
                                </Button>
                                <Button sx={{cursor:"pointer",backgroundColor:pageNumberPosition === "right" && "#1890FF", textAlign:"center",color:pageNumberPosition === "right" ? "#fff" :"#000"}} onClick={() => setPageNumberPosition("right")}>
                                3
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid container direction="column" justifyContent="flex-start" alignItems="center" wrap="nowrap">
                            <Typography sx={{textDecoration:"underline"}} variant="h5">
                                Assignment Preview
                            </Typography>
                            <PdfView coverPage={coverPage} data={data?.wordAnswer} isMobileTablet={isMobileTablet} pdfOrientation={pdfOrientation} preview previewData={data?.answer} pageNumberPosition={pageNumberPosition} accountDetails={accountDetails} />
                        </Grid>
                    </Grid>
                    ):(
                        <Grid sx={{border:"1px solid #000"}} container alignItems="flex-start" justifyContent="center" wrap="nowrap">
                        <Grid sx={{paddingLeft: 10}} container direction="column" justifyContent="flex-start" alignItems="flex-start" wrap="nowrap">
                            {
                                checkIfRequiredAccountFieldsArePresent() && (
                                    <>
                                        <Typography sx={{textDecoration:"underline"}} variant="h5">Cover Page</Typography>
                                        <Typography variant="h6">Change Cover Page Style</Typography>
                                        <Grid container alignItems="center" justifyContent="flex-start" wrap="nowrap">
                                        <Button sx={{backgroundColor:coverPage === "one" && "#1890FF", cursor:"pointer",color:coverPage === "one" ? "#fff" :"#000"}} onClick={() => setCoverPage("one")}>
                                                1
                                            </Button>
                                            <Button sx={{backgroundColor:coverPage === "two" && "#1890FF", textAlign:"center", cursor:"pointer",color:coverPage === "two" ? "#fff" :"#000"}} onClick={() => setCoverPage("two")}>
                                                2
                                            </Button>
                                        </Grid>
                                    </>
                                )
                            }
                            <Typography sx={{textDecoration:"underline",marginTop:3}} variant="h5">Orientation</Typography>
                            <Grid container>
                            <Button onClick={() => setPdfOrientation("portrait")} sx={{backgroundColor:pdfOrientation === "portrait" && "#1890FF",borderRadius:"0 !important",minWidth:"80px",maxWidth:"80px",color:pdfOrientation === "portrait" ? "#fff" :"#000"}} variant="outlined">Potrait</Button>
                                <Button onClick={() => setPdfOrientation("landscape")} sx={{backgroundColor:pdfOrientation === "landscape" && "#1890FF",borderRadius:"0 !important",minWidth:"80px",maxWidth:"80px",color:pdfOrientation === "landscape" ? "#fff" :"#000"}} variant="outlined">Landscape</Button>
                            </Grid>
                            <Typography sx={{textDecoration:"underline",marginTop:3}} variant="h5">Page Numbering</Typography>
                            <Typography variant="h6">Change Page Numbering Style</Typography>
                            <Grid container alignItems="center" justifyContent="flex-start" wrap="nowrap">
                                <Button sx={{backgroundColor:pageNumberPosition === "left" && "#1890FF", cursor:"pointer",color:pageNumberPosition === "left" ? "#fff" :"#000"}} onClick={() => setPageNumberPosition("left")}>
                                    1
                                </Button>
                                <Button sx={{backgroundColor:pageNumberPosition === "center" && "#1890FF", textAlign:"center", cursor:"pointer",color:pageNumberPosition === "center" ? "#fff" :"#000"}} onClick={() => setPageNumberPosition("center")}>
                                    2
                                </Button>
                                <Button sx={{cursor:"pointer",backgroundColor:pageNumberPosition === "right" && "#1890FF", textAlign:"center",color:pageNumberPosition === "right" ? "#fff" :"#000"}} onClick={() => setPageNumberPosition("right")}>
                                3
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid container direction="column" justifyContent="flex-start" alignItems="center" wrap="nowrap">
                            <Typography sx={{textDecoration:"underline"}} variant="h5">
                                Assignment Preview
                            </Typography>
                            <PdfView coverPage={coverPage} data={data?.wordAnswer} isMobileTablet={isMobileTablet} pdfOrientation={pdfOrientation} preview previewData={data?.answer} pageNumberPosition={pageNumberPosition} accountDetails={accountDetails} />
                        </Grid>
                    </Grid>
                    )
                }
                <Typography variant="h5">Download</Typography>
                <Grid container direction="row" justifyContent="space-between" alignItems="center" wrap="nowrap">
                    <Button onClick={() => downloadWordDocument(data?.wordAnswer, pageNumberPosition)} sx={{width:"100%", borderRadius:"0 !important",backgroundColor:"#1890FF",color:"#fff"}} variant="outlined">Download in Word Format(DOC)</Button>
                    <DownloadPDf pageNumberPosition={pageNumberPosition} data={data?.wordAnswer} isMobileTablet={isMobileTablet} pdfOrientation={pdfOrientation} preview={false} previewData={data?.answer} accountDetails={accountDetails} coverPage={coverPage} />
                </Grid>
            </Grid>
        </>
    )
}

export default DocumentPreview;