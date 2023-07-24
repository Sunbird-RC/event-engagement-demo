import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import {
  Box,
  Button,
  Dialog,
  IconButton,
  ImageList,
  ImageListItem,
  InputLabel,
  Slide,
  SwipeableDrawer,
  Typography,
  styled,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { FC, ReactElement, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Quiz from "../Quiz/Quiz";
import { useExhibitsDataOnId } from "../api/exhibit";
import { useSubmitQuiz } from "../api/quiz";
import ToolBar from "../layout/AppBar";
import { pageRoutes } from "../routes";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { QuizResult } from "../types/quiz";
import QuizImg from '../assets/QuizImg.svg';
import LoadingController from "../layout/Loader";
import CancelIcon from '@mui/icons-material/Cancel';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { TransitionProps } from '@mui/material/transitions';
import FilePresentIcon from '@mui/icons-material/FilePresent';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Puller = styled(Box)(({ theme }) => ({
  width: 48,
  height: 4,
  color: "primary.main",
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
}));

const ExhibitCardDetails: FC<any> = (): ReactElement => {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log('props ', state);
  const entity = state.data;
  const imageArray = entity.imageLinks
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const navigateBack = () => {
    navigate(pageRoutes.EXHIBITS_HOME);
  };

  const { data } = useExhibitsDataOnId(state.data.osid);
  let exhibit = data;
  console.log('data ', data)
  const questionsData = exhibit?.quizConfig;

  const openQrcode = () => {
    navigate(pageRoutes.SCAN_QR, {state: {data: entity, visited: state.visited}})
  }
  const [loading, setLoading] = useState(false);
  const { mutate: submitQuiz } = useSubmitQuiz(state.data.osid);

  const handleFinishQuiz = (data: any) => {
    setLoading(!loading);
    console.log('data on click ', data);
    const answers = questionsData?.questions.map((question, index) => {
      return {
        questionOsid: question.osid,
        answer: data[index] || "",
      };
    });
    submitQuiz(answers, {
      onSuccess: (data: QuizResult) => {
        setLoading(!loading);
        navigate(pageRoutes.EXHIBIT_RESULT, {
          state: {
            quizResult: data,
            exhibit: entity
          },
        });
      }
    });
    toggleDrawer(false)();
  };

  const openLink = (pdfType: boolean) => {
    if(pdfType) {
      window.open(entity.pdfLink)
    } else {
      window.open(entity.pptLink)
    }
  }

  const [selectedImg, setSelImg] = useState({img: '', title: ''});
  const [openmodal, setOpenModal] = useState(false);
  const handleOpen = (img: any) => {
    setSelImg(img)
    setOpenModal(true)};
  const handleClose = () => {setOpenModal(false)};

  return (
    <Box
      sx={{
        flexGrow: 1,
        backgroundColor: "whitesmoke",
        display: "flex",
        justifyContent: "center",
        width: "100%", 
        height: '100%',
        overflowY:'scroll' 
      }}
    >
      <ToolBar
        show={true}
        badgeOpt={false}
        toolbarHeight={false}
        hideBtn={false}
      />
      <Box sx={{ my: 15, mx: 2, color: "primary.dark", width: "100%" }}>
        <div style={{textAlign:'start'}}>
          <ArrowBackOutlinedIcon onClick={navigateBack} sx={{color:"black"}} fontSize="medium" />
        </div>
          <Typography variant="h6" mt={-2} mb={2} sx={{ color: "primary.main" }}>{exhibit?.name}</Typography>
        <Box
          border={"1px dotted #67C8D1"}
          sx={{
            position: "relative",
            borderRadius: "10px",
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
          }}
          mx={1} mb={4}
        >
          <Box sx={{ height: "80%" }}>
            {!!exhibit?.videoURL ? (
            <div style={{ marginTop: "2%" }}>
              <iframe src={exhibit?.videoURL} width="95%"></iframe>
            </div>) : <></>}
            {imageArray.length > 0 ?
            (
            <><ImageList sx={{ width: 'auto', height: '150px', margin:'2%', display: 'flex', justifyContent:'center'}} cols={1}>
              {imageArray.map((img: any) => (
                <ImageListItem key={img}>
                  <img style={{width: '100px'}}
                    src={`${img}`}
                    srcSet={`${img}`}
                    alt='img'
                    loading="lazy"
                    onClick={() => handleOpen(img)}
                  />
                </ImageListItem>
              ))}
            </ImageList>
            <Dialog sx={{margin: '20% 3% 3% 3%'}}
              fullScreen
              open={openmodal}
              onClose={handleClose}
              TransitionComponent={Transition}
            >
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleClose}
                aria-label="close" sx={{ position: 'absolute', right: '5%' }}
              >
                <CancelIcon color="primary" />
              </IconButton>
              <img width={'100%'} style={{height:'100%'}}
                  src={`${selectedImg}`}
                  srcSet={`${selectedImg}`}
                  alt='img'
                  loading="lazy"
                />
            </Dialog></> ) : (<></>)}
            {!!entity.pdfLink ? (
              <div style={{display: 'flex', justifyContent:'space-around', alignItems:'center'}}>
                <Typography sx={{ color: "black" }}>Read more to play quiz</Typography>
                <Box mx={2} my={2}>
                    <Button
                      sx={{ color: "#67C8D1", border: "1px solid #67C8D1" }}
                      variant="outlined" startIcon={<PictureAsPdfIcon />}
                      onClick={() => openLink(true)}
                    >
                    Pdf
                  </Button>
                </Box>
              </div>
              ) : !!entity.pptLink ? 
              (<div style={{display: 'flex', justifyContent:'space-around', alignItems:'center'}}>
              <Typography sx={{ color: "black" }}>Read more to play quiz</Typography>
              <Box mx={2} my={2}>
                  <Button
                    sx={{ color: "#67C8D1", border: "1px solid #67C8D1" }}
                    variant="outlined" startIcon={<FilePresentIcon />}
                    onClick={() => openLink(false)}
                  >
                  Ppt
                </Button>
              </Box>
            </div>) : <></>}
            {!!(exhibit?.fullDescription || exhibit?.shortDescription) ? 
            (<Box mx={2}>
              <Typography variant="body2" color={"black"} textAlign={"justify"}>
                {exhibit?.fullDescription || exhibit?.shortDescription}
              </Typography>
            </Box>) : <></>}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "1rem",
                border: "1px solid #348681",
                boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                width: "60%",
                transform: "translate(25%, 0%)",
              }}
            >
              <img src={QuizImg} width={60} height={60}></img>
              <div style={{ margin: "1rem" }}>
                <Typography
                  variant="body2"
                  color={"#48DDE4"}
                  fontSize={"16px !important"}
                >
                  Quiz
                </Typography>
                <div style={{ display: "flex", color: "#999999" }}>
                  <ArticleRoundedIcon fontSize="small" />
                  <InputLabel sx={{ fontSize: "14px !important" }}>
                    5 Questions
                  </InputLabel>
                </div>
              </div>
            </Box>
            <Box mt={4} mb={2} display={"flex"} justifyContent={"space-around"}>
              {(entity?.qrRequired && !state.visited) ? (
                <Button
                  sx={{ color: "#67C8D1", border: "1px solid #67C8D1" }}
                  variant="outlined"
                  onClick={() => openQrcode()}
                >
                  Scan QR
                </Button>
              ) : (
                <Button
                  sx={{ color: "#67C8D1", border: "1px solid #67C8D1" }}
                  variant="outlined"
                  onClick={toggleDrawer(true)}
                >
                  Play
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <SwipeableDrawer
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        open={open}
        anchor="bottom"
        disableSwipeToOpen
      >
        <Box height={"60vh"}>
          <Box
            p={1}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Puller />
          </Box>
          <Box px={4}>
            {questionsData?.questions && (
              <Quiz
                questions={questionsData.questions}
                onFinish={handleFinishQuiz}
              />
            )}
          </Box>
        </Box>
      </SwipeableDrawer>
      <LoadingController loading={loading}/>
    </Box>
  );
};

export default ExhibitCardDetails;
