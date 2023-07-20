import CircleIcon from "@mui/icons-material/Circle";
import QrCode2RoundedIcon from "@mui/icons-material/QrCode2Rounded";
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  InputLabel,
  SwipeableDrawer,
  Typography,
  styled,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import {
  Document,
  Page,
} from 'react-pdf';
import {
  StyleSheet,
  BlobProvider, 
} from "@react-pdf/renderer";
import { FC, ReactElement, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import home from "../assets/home.svg";
import leaderboard from "../assets/leaderboard.svg";
import playAgain from "../assets/playAgain.svg";
import share from "../assets/share.svg";
import ToolBar from "../layout/AppBar";
import { pageRoutes } from "../routes";
// import qBank from '../layout/Questions';
import { PDFDocumentProxy } from "pdfjs-dist/types/src/display/api";
import { QuizResult } from "../types/quiz";

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 4,
  color: "primary.main",
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

const ExhibitResult: FC<any> = (): ReactElement => {
  let navigate = useNavigate();
  const { state: content } = useLocation();
  console.log('state quiz resuktt ', content)
  const quizResult: QuizResult = content.quizResult

  const showMsg = true;

  const handleEvents = (row: any) => {
    console.log(row);
    let path = "";
    let label = row.label;
    switch (label) {
      case "Play Again":
        navigate(`${pageRoutes.EXHIBIT_DETAILS}/${content.exhibit.osid}`, {state: content.exhibit})
        break;
      case "Review Answer":
        break;
      case "Share Score":
        handleShare();
        break;
      case "Generate PDF":
        generatePdf();
        break;
      case "Home":
        path = pageRoutes.EXHIBITS_HOME;
        navigate(path);
        break;
      case "Leader Board":
        path = pageRoutes.LEADER_BOARD;
        navigate(path);
        break;
    }
  };

  const [openPdf, setStateOpen] = useState(false)
  const generatePdf = () => {
    setStateOpen(true)
  }

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      textAlign: 'center'
    },
    section: {
      flexGrow: 1,
      textAlign: 'center', 
      flexDirection:'column',
      margin: 10,
      padding: 10,
      border: '0.5px solid black'
    },
  });

  const QuestionList = () => {
    return (
      <div style={{width:'100%', textAlign:'start', marginTop:20, marginLeft:10}}>
        {content.quizConfig.questions.map((value:string, index: number) => {
          return(
            <div style={{marginTop:20}}>
              <li key={index}>
                <p>{index+1}. {value.question}</p>
                {value.options.map((opt: string, i: number) => {
                  return(
                    <div style={{marginLeft:20, margin:5, fontSize:14}}>
                      <li key={i+1}>
                        <p>{String.fromCharCode(97+i)}. {opt}</p>
                      </li>
                    </div>
                  )
                })}
                <p style={{fontSize:16}}>Correct answer: {value.answer}</p>
              </li>
            </div>
          )
        })}
      </div>
    )
  }
    
  const MyDocument = () => {
    return (<Document>
      <Page>
        <div style={styles.section}>
          <p>Exhibit</p>
          <QuestionList/>
        </div>
      </Page>
    </Document>)
  }

  const [showModal, setShowModal] = useState(false);
  const handleShare = () => {
    setShowModal(!showModal);
    console.log("share");
  };

  let listRow1 = []
  let listRow2: any[] = []
  if (quizResult?.badgeWon) {
    listRow1 = [
      { imgpath: home, label: "Home" },
      { imgpath: share, label: "Share Score" },
      { imgpath: leaderboard, label: "Leader Board" },
    ]
    listRow2 = [
      // { imgpath: pdf, label: "Generate PDF" },
    ]
  } else {
    listRow1 = [
      { imgpath: playAgain, label: "Play Again" },
      { imgpath: share, label: "Share Score" },
      { imgpath: leaderboard, label: "Leader Board" },
    ]
    listRow2 = [
      // { imgpath: pdf, label: "Generate PDF" },
      { imgpath: home, label: "Home" },
    ];
  }

  const handleLoadSuccess = (_pdf: PDFDocumentProxy, _blob: Blob | null) => {

  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "whitesmoke",
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {!openPdf ? 
      (<>
      <ToolBar
        hideBtn={false}
        show={false}
        badgeOpt={false}
        toolbarHeight={true}
      />
      <Card
        sx={{
          position: "absolute",
          width: "80%",
          height: "15%",
          top: "18%",
          left: "10%",
          transform: "translate(-0%, -50%)",
          borderRadius: "10px",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-around",
            paddingTop: "8% !important",
            paddingBottom: "0 !important",
            alignItems: "center",
            height: "100%",
          }}
        >
          {!showMsg ?
            (
              <div>
                <CircleIcon sx={{ color: "red" }} />
                13
                <InputLabel>Total Badges Earned</InputLabel>
              </div>
            ) : 
            (
              quizResult?.badgeWon ? 
              (<>
                <div>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <CircleIcon sx={{ color: "green" }} />
                    {/* <InputLabel>{quizResult.correctCount}</InputLabel> */}
                  </div>
                  <InputLabel>Correct</InputLabel>
                </div>
                <div>
                  <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <CircleIcon sx={{ color: "red" }} />
                    {/* <InputLabel>{quizResult.wrongCount}</InputLabel> */}
                  </div>
                  <InputLabel>Wrong</InputLabel>
                </div>
              </>):
              (<>
              </>)
          )}
        </CardContent>
      </Card>
      <Box sx={{ my: 30, mx: 2, color: "primary.dark", width: "100%" }}>
        {showMsg ? (
          quizResult?.badgeWon ? (<>
            <Typography
              variant="h5"
              component="h5"
              fontWeight={"bold"}
              color={"#4DD8DD"}
            >
              Congratulations !{" "}
            </Typography>
            <Typography
              variant="h5"
              component="h5"
              fontWeight={"bold"}
              color={"#4DD8DD"}
            >
              You earned a new badge!!
            </Typography>
          </>
        ) : (
          <div>
            <Typography variant="h5"
              component="h5"
              fontWeight={"bold"}
              color={"#4DD8DD"}>Unfortunately, You did not win a Badge! You can re-attempt the Quiz!</Typography>
          </div>)
        ): 
        (<></>)}
        <Box mt={2}>
          <QrCode2RoundedIcon
            fontSize="large"
            sx={{
              border: "5px solid black",
              width: "7rem",
              height: "7rem",
              color: "black",
            }}
          ></QrCode2RoundedIcon>
        </Box>
        <Grid mt={6} container spacing={3}>
          {listRow1.map((row) => (
            <Grid item xs={4}>
              <IconButton
                sx={{ flexDirection: "column" }}
                onClick={() => handleEvents(row)}
              >
                <img src={row.imgpath} />
                <InputLabel>{row.label}</InputLabel>
              </IconButton>
            </Grid>
          ))}
        </Grid>
        <Grid mt={2} container spacing={3}>
          {listRow2.map((row) => (
            <Grid item xs={4}>
              <IconButton
                sx={{ flexDirection: "column" }}
                onClick={() => handleEvents(row)}
              >
                <img src={row.imgpath} />
                <InputLabel>{row.label}</InputLabel>
              </IconButton>
            </Grid>
          ))}
        </Grid>
      </Box>
      <SwipeableDrawer
        onClose={() => setShowModal(!showModal)}
        onOpen={() => setShowModal(!showModal)}
        open={showModal}
        anchor="bottom"
        disableSwipeToOpen
      >
        <Box height={"20vh"}>
          <Box
            p={1}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Puller />
          </Box>
          <Box my={2} mx={2} sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Typography variant="h5">Share</Typography>
          </Box>
          <Box display={"flex"} justifyContent={"space-around"}>
            <FacebookShareButton
              url={"https://www.facebook.com"}
              quote={"Dummy text!"}
              hashtag="#muo"
            >
              <FacebookIcon size={40} round />
            </FacebookShareButton>
            <EmailShareButton url={"https://www.email.com"}>
              <EmailIcon size={40} round></EmailIcon>
            </EmailShareButton>
            <WhatsappShareButton title="Score" url={"https://www.whatsapp.com"}>
              <WhatsappIcon size={40} round={true} />
            </WhatsappShareButton>
            <TwitterShareButton url={"https://www.twitter.com"}>
              <TwitterIcon size={40} round />
            </TwitterShareButton>
          </Box>
        </Box>
      </SwipeableDrawer>
      </>): 
      // (<PDFViewer width={`100%`}><MyDocument/></PDFViewer>)
      (
      <BlobProvider document={<MyDocument/>}>
      {({ blob, url, loading }) => !loading ? (
              <Document file={url}
                onLoadSuccess={(pdf) => handleLoadSuccess(pdf, blob)}
                renderMode="canvas">
                <Page pageNumber={1}
                  width={window.innerWidth} />
              </Document>
            ) : null}
    </BlobProvider>)
      }
    </Box>
  );
};

export default ExhibitResult;
