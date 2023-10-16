import React from "react";
import {usePDF} from "@react-pdf/renderer";
import Button from '@mui/material/Button';
import DocumentGenerate from "../components/DocumentGenerate"

// with next.js, working with @react-pdf/renderer can be complicated so please follow all steps highlighed in this repo
const DownloadPDf = ({data, pdfOrientation, preview, previewData, pageNumberPosition, isMobileTablet, coverPage, accountDetails}) => {
    const [instance, updateInstance] = usePDF({ document: <DocumentGenerate data={data} pdfOrientation={pdfOrientation} preview={preview} previewData={previewData} pageNumberPosition={pageNumberPosition} isMobileTablet={isMobileTablet} coverPage={coverPage} accountDetails={accountDetails} /> });
    const [client, setClient] = React.useState(false);
    React.useEffect(()=>{
        setClient(true);
        updateInstance()
    },[data, pageNumberPosition, accountDetails, coverPage]);
    if (instance.loading) return <div>Loading ...</div>;
  
    if (instance.error) return <div>Something went wrong: {error}</div>;
    return (
        <>
            <Button component="a"  href={instance.url} download="results.pdf" sx={{width:"100%", borderRadius:"0 !important",backgroundColor:"pink",color:"#000"}} variant="outlined">Download in PDF Format</Button>
        </>
    )
}

export default DownloadPDf;