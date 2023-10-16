import React from "react";
import {
    Document,
    Paragraph,
    PageNumber,
    Footer,
    TextRun,
    AlignmentType,
    NumberFormat,
    UnderlineType,
    Tab,
    ImageRun
  } from "docx";
import isEmpty from "lodash.isempty";

const wordDocumentGenerator = (val, position, coverPage, accountDetails, blob) => {
    const checkIfRequiredAccountFieldsArePresent = () => {
        return !isEmpty(accountDetails.firstName) && !isEmpty(accountDetails.otherNames) && !isEmpty(accountDetails.school) && !isEmpty(accountDetails.registrationNumber) && !isEmpty(accountDetails.course);
    }
    const image = new ImageRun({
        data: blob,
        transformation: {
            width: 200,
            height: 200,
        },
    });
    const wordFooterPosition = (pos) => {
        return {
            center: AlignmentType.CENTER,
            left: AlignmentType.LEFT,
            right: AlignmentType.RIGHT
        }[pos]
    }
    const paragraphData = val.map((item, index) => 
        new Paragraph({
            spacing: {after:120},
            color: "#000000",
            pageBreakBefore: index === 0,
            children:[new TextRun({text:item,size: 24})]
        }),
    )

    const coverPageOneParagraphData = () => {
        return checkIfRequiredAccountFieldsArePresent() && coverPage === "one" ? [
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children:[image]
            }),
            // new Paragraph({
            //     alignment: AlignmentType.CENTER,
            //     color: "#000000",
            //     children:[new TextRun({text:"UNIVERSITY NAME",underline:{type: UnderlineType.SINGLE}})]
            // }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                color: "#000000",
                spacing: {after:400},
                children:[new TextRun({text:accountDetails?.school,size: 24})]
            }),
            // new Paragraph({
            //     alignment: AlignmentType.CENTER,
            //     color: "#000000",
            //     spacing: {before:100},
            //     children:[new TextRun({text:"COURSE NAME",underline:{type: UnderlineType.SINGLE}})]
            // }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                color: "#000000",
                spacing: {after:400},
                children:[new TextRun({text:accountDetails?.course,size: 24})]
            }),
            // new Paragraph({
            //     alignment: AlignmentType.CENTER,
            //     color: "#000000",
            //     spacing: {before:100},
            //     children:[new TextRun({text:"STUDENT INFORMATION",underline:{type: UnderlineType.SINGLE}})]
            // }),
            new Paragraph({
                spacing: {after:400},
                children:[new TextRun({text:"STUDENT NAME:",size:24}),new TextRun({children:[new Tab(),new Tab(),new Tab(),new Tab(),new Tab(),new Tab(),new Tab(),new Tab()]}),new TextRun({text:accountDetails?.firstName.concat(" ",accountDetails?.otherNames),size:24})]
            }),
            new Paragraph({
                children:[new TextRun({text:"REGISTRATION NUMBER:",size:24}),new TextRun({children:[new Tab(),new Tab(),new Tab(),new Tab(),new Tab(),new Tab(),new Tab()]}),new TextRun({text:accountDetails?.registrationNumber, size:24})]
            })
        ] : [];
    }

    const coverPageTwoParagraphData = () => {
        return checkIfRequiredAccountFieldsArePresent() && coverPage === "two" ? [
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children:[image]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                color: "#000000",
                children:[new TextRun({text:"UNIVERSITY NAME:",size:24}),new TextRun({children:[new Tab(),new Tab(),new Tab(),new Tab()]}), new TextRun({text:accountDetails?.school, size:24})]
            }),
            new Paragraph({
                alignment: AlignmentType.LEFT,
                color: "#000000",
                spacing: {before:400},
                children:[new TextRun({text:"COURSE NAME:",size:24}),new TextRun({children:[ new Tab(),new Tab(),new Tab(),new Tab(),new Tab()]}), new TextRun({text:accountDetails?.course,size:24})]
            }),
            new Paragraph({
                alignment: AlignmentType.CENTER,
                color: "#000000",
                spacing: {before:400},
                children:[new TextRun({text:"STUDENT INFORMATION",underline:{type: UnderlineType.SINGLE},size:24})]
            }),
            new Paragraph({
                spacing: {before:400},
                children:[new TextRun({text:"STUDENT NAME:",size:24}),new TextRun({children:[new Tab(),new Tab(),new Tab(),new Tab(),new Tab(),new Tab()]}),new TextRun({text:accountDetails?.firstName.concat(" ",accountDetails?.otherNames),size:24})]
            }),
            new Paragraph({
                spacing: {before:400},
                children:[new TextRun({text:"REGISTRATION NUMBER:",size:24}),new TextRun({children:[ new Tab(),new Tab(),new Tab(),new Tab(),new Tab()]}),new TextRun({text:accountDetails?.registrationNumber,size:24})]
            })
        ]:[]
    }

    const document = new Document({
        sections:[
            {
                properties: {
                    page: {
                        pageNumbers: {
                            start: 1,
                            formatType: NumberFormat.DECIMAL,
                        },
                    },
                },
                children:[
                    ...coverPageOneParagraphData(),
                    ...coverPageTwoParagraphData(),
                    ,...paragraphData
                ],
                footers: {
                    default: new Footer({
                        children: [
                            new Paragraph({
                                alignment: wordFooterPosition(position),
                                children: [
                                    new TextRun({
                                        children: [ PageNumber.CURRENT],color:"#000000"
                                    }),
                                ],
                            }),
                        ],
                    }),
                },
            },
        ]
    });
    return document;
}

export default wordDocumentGenerator;