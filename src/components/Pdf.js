import React from "react";
import { PDFViewer } from '@react-pdf/renderer';
import DocumentGenerate from "./DocumentGenerate";

// with next.js, working with @react-pdf/renderer can be complicated so please follow all steps highlighed in this repo
const PDFView = ({pdfOrientation,isMobileTablet,data, preview, previewData,pageNumberPosition,coverPage, accountDetails}) => {
    const [client, setClient] = React.useState(false);
    React.useEffect(()=>{
        setClient(true);
    },[pageNumberPosition]);
    return (
        <PDFViewer width={isMobileTablet ? "300" : "500"} height="400" showToolbar={false}>
            <DocumentGenerate coverPage={coverPage} data={data} pdfOrientation={pdfOrientation} preview={preview} previewData={previewData} pageNumberPosition={pageNumberPosition} isMobileTablet={isMobileTablet} accountDetails={accountDetails} />
        </PDFViewer>
    )
}

export default PDFView;