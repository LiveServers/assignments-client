import React from "react";
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import isEmpty from "lodash.isempty";
import listOfSchools from "../utils";
// with next.js, working with @react-pdf/renderer can be complicated so please follow all steps highlighed in this repo
// Create styles
const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#fff',
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 16,
        bottom: 10,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'black',
        zIndex:1002
      },
      desc:{
        fontSize: 16,
      },
      section: {
        margin: 10
      },
      coverPageOne:{
        display:"flex",
        flexDirection:"column",
        marginTop: 10
      },
      rowGrid:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        marginTop: 10
      },
      image:{
        height:200,
        width:200,
        position:"relative",
        left:0,
        right:0,
        top:0,
        alignSelf:"center"
      }
  });

const DocumentGenerate = ({pdfOrientation, data, preview, previewData,pageNumberPosition, coverPage, accountDetails}) => {
  const checkIfRequiredAccountFieldsArePresent = () => {
    return !isEmpty(accountDetails.firstName) && !isEmpty(accountDetails.otherNames) && !isEmpty(accountDetails.school) && !isEmpty(accountDetails.registrationNumber) && !isEmpty(accountDetails.course);
  }
  const pageStyleFromPosition = (position) => {
    return {
      center: {
        position: 'absolute',
        fontSize: 16,
        bottom: 10,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'black',
        zIndex:1002
      },
      left:{
        position: 'absolute',
        fontSize: 16,
        bottom: 10,
        left: 10,
        textAlign: 'center',
        color: 'black',
        zIndex:1002,
        marginLeft: 10
      },
      right:{
        position: 'absolute',
        fontSize: 16,
        bottom: 10,
        right: 10,
        textAlign: 'center',
        color: 'black',
        zIndex:1002,
        marginRight: 10
      }
    }[position]
  }
    return (
        <Document className="pdf-container" onContextMenu={(e) => e.preventDefault()}>
          {
            checkIfRequiredAccountFieldsArePresent() && coverPage && coverPage === "one" && (
              <Page orientation={pdfOrientation} size="A4" style={styles.page}>
              <Image style={styles.image} src={listOfSchools.filter(item => item.schoolName === accountDetails.school)[0].schoolImage} />
              {/* <Text style={{ textAlign:"center", fontSize: 12,textDecoration:"underline"}}>UNIVERSITY NAME</Text> */}
              <Text style={{marginTop:10, textAlign:"center", fontSize: 16, fontWeight:700}}>{accountDetails?.school}</Text>
              {/* <Text style={{marginTop:10, textAlign:"center", fontSize: 12,textDecoration:"underline",}}>COURSE NAME</Text> */}
              <Text style={{marginTop:10, textAlign:"center",fontSize: 16, fontWeight:700}}>{accountDetails?.course}</Text>
              {/* <Text style={{textDecoration:"underline",marginTop:10, textAlign:"center", fontSize: 12}}>STUDENT INFORMATION</Text> */}
              <View style={styles.coverPageOne}>
                <View style={styles.rowGrid}>
                  <Text style={{fontSize:16}}>
                    STUDENT NAME:
                  </Text>
                  <Text style={{ textAlign:"left",fontSize:16}}>
                    {accountDetails?.firstName.concat(" ",accountDetails?.otherNames)}
                  </Text>
                </View>
                <View style={styles.rowGrid}>
                  <Text style={{fontSize:16}}>
                    REGISTRATION NUMBER:
                  </Text>
                  <Text style={{ textAlign:"left",fontSize:16}}>
                    {accountDetails?.registrationNumber}
                  </Text>
                </View>
              </View>
              <Text style={pageStyleFromPosition(pageNumberPosition)} render={({ pageNumber, totalPages }) => (
                    `${pageNumber}`
              )} fixed />
            </Page> 
            )
          }
          {
            checkIfRequiredAccountFieldsArePresent() && coverPage && coverPage === "two" && (
              <Page orientation={pdfOrientation} size="A4" style={styles.page}>
              <Image style={styles.image} src={listOfSchools.filter(item => item.schoolName === accountDetails.school)[0].schoolImage} />
              <View style={styles.rowGrid}>
                <Text style={{ textAlign:"center", fontSize: 16,marginTop:10,}}>UNIVERSITY NAME:</Text>
                <Text style={{marginTop:10, textAlign:"center", fontSize: 16, fontWeight:700}}>{accountDetails?.school}</Text>
              </View>
              <View style={styles.rowGrid}>
                <Text style={{marginTop:10, textAlign:"center", fontSize: 16}}>COURSE NAME:</Text>
                <Text style={{marginTop:10, textAlign:"center",fontSize: 16, fontWeight:700}}>{accountDetails?.course}</Text>
              </View>
              <Text style={{textDecoration:"underline",marginTop:10, textAlign:"center",fontSize:12}}>STUDENT INFORMATION</Text>
              <View style={styles.coverPageOne}>
                <View style={styles.rowGrid}>
                  <Text style={{fontSize:16}}>
                    STUDENT NAME:
                  </Text>
                  <Text style={{ textAlign:"left",fontSize:16}}>
                    {accountDetails?.firstName.concat(" ",accountDetails?.otherNames)}
                  </Text>
                </View>
                <View style={styles.rowGrid}>
                  <Text style={{fontSize:16}}>
                    REGISTRATION NUMBER:
                  </Text>
                  <Text style={{ textAlign:"left",fontSize:16}}>
                    {accountDetails?.registrationNumber}
                  </Text>
                </View>
              </View>
              <Text style={pageStyleFromPosition(pageNumberPosition)} render={({ pageNumber, totalPages }) => (
                    `${pageNumber}`
              )} fixed />
            </Page> 
            )
          }
        <Page orientation={pdfOrientation} size="A4" style={styles.page}>
          {
            preview ? (
              <View style={styles.section}>
              <Text style={styles.desc}>
                  {previewData}
              </Text>
            </View>
            ):(
              <>
                        {
            Array.isArray(data) && data.length > 0 && data.map((item) => (
              (
                <View style={styles.section}>
                <Text style={styles.desc}>
                    {item}
                </Text>
              </View>
              )
            ))
          }
              </>
            )
          }
          <Text style={pageStyleFromPosition(pageNumberPosition)} render={({ pageNumber, totalPages }) => (
                `${pageNumber}`
          )} fixed />
        </Page>
      </Document>
    )
}

export default DocumentGenerate;