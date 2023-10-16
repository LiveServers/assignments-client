import React from "react";
import { Grid, Typography, Button } from '@mui/material'
// import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import isEmpty from "lodash.isempty";
import { setResponseState } from "@/redux/reducers/responseStateReducer";
import { setAnswer, setWordAnswer } from "@/redux/reducers/chatgptReducer";

// lazy load module
const Editor = dynamic(
    () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
    { ssr: false }
  )

const ViewAnswer = ({isMobileTablet}) => {
    const router = useRouter();
    const data = useSelector(state => state.chatgptReducer);
    const dispatch = useDispatch();
    const [pageTitle, setPageTitle] = React.useState("");

    React.useEffect(()=>{
        if(router?.query?.referrer === "/"){
            setPageTitle("Essays");
            // handlePastedText(data?.answer)
            return;
        }
        // else if(router?.query?.referrer === "/state-and-explain"){
        //     setPageTitle("State and Explain");
        //     return;
        // }
        else{
            router.push("/");
        }
        
    },[]);

    const [editorState, setEditorState] = React.useState(data?.answer ? EditorState.createWithContent(ContentState.createFromText(data?.answer)) : EditorState.createEmpty());
    const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
    const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
    const newBlockValueRes = value.split("\n").filter(item => item !== ""); // this aids on how data is downloaded in word
    const onEditorStateChange = (editorValue) => {
        setEditorState(editorValue)
      }
    const routeToDownloadPage = () => {
      let path = {};
      if(router?.query?.referrer === "/"){
        path = {
          pathname:"/document-preview",
          query:{
            questionLink:"/",
            answerLink:"/"
          }
        }
      }else if(router?.query?.referrer === "/state-and-explain"){
        path = {
          pathname:"/document-preview",
          query:{
            questionLink:"/state-and-explain",
            answerLink:"/state-and-explain"
          }
        }
      }
      dispatch(setAnswer(value));
      dispatch(setWordAnswer(newBlockValueRes))
      router.push({...path});
    }

    const copyToClipboard = async () => {
      await navigator.clipboard.writeText(value);
      dispatch(setResponseState({severity:"success",message:"Copied text to clipboard"}));
    }
    return (
        <Grid container alignItems="center" direction="column" justifyContent="flex-start" wrap="nowrap">
            <Typography variant="h3">{pageTitle}</Typography>
            <Grid item style={{padding:"20px 8%",width:"100%",alignSelf:"center"}}>
              {
                isMobileTablet ? (
                    <Grid container alignItems= 'center' justifyContent="space-between" wrap="nowrap">
                                 <Typography component="span" sx={{cursor:"pointer",marginBottom:1.5}} onClick={() => router.back()}>Return to Question</Typography>
                <Typography component="span" sx={{marginBottom:1.5}}>Answer</Typography>
                      </Grid>
                ):(
                  <>
                  <Typography component="span" sx={{cursor:"pointer",marginBottom:1.5}} onClick={() => router.back()}>Return to Question</Typography>
                  <Typography component="span" sx={{marginBottom:1.5,marginLeft:55}}>Answer</Typography>
                  </>
                )
              }
            <Editor
              editorState={editorState}
              editorClassName="editor-class"
              onEditorStateChange={(editorValue) => onEditorStateChange(editorValue)}
              wrapperClassName="wrapper-class"
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
        </Grid>
      {
        isMobileTablet ? (
          <Grid container direction="column" alignItems="center" justifyContent="center">
              <Typography>Words: {newBlockValueRes.join("").split(" ").length}</Typography>
              <Button disabled={isEmpty(value)} onClick={() => routeToDownloadPage()} variant="contained" sx={{background:"#10CE01",color:"#fff",width:300}}>Download Answer</Button>
              <Button onClick={() => copyToClipboard()} sx={{borderRadius:3, color:"#fff", marginTop:"10px"}} variant="contained">Copy All</Button>
            </Grid>
            ):(
              <Grid container alignItems="center" justifyContent="space-between" sx={{width:"100%",padding:"10px 8%"}}>
                <Typography>Words: {newBlockValueRes.join("").split(" ").length}</Typography>
                <Button disabled={isEmpty(value)} onClick={() => routeToDownloadPage()} variant="contained" sx={{background:"#10CE01",color:"#fff",width:300}}>Download Answer</Button>
                <Button onClick={() => copyToClipboard()} sx={{borderRadius:3, color:"#fff"}} variant="contained">Copy All</Button>
              </Grid>
            )
          }
        </Grid>
    )
}

export default ViewAnswer;