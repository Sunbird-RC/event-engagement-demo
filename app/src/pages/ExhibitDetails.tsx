import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import {
  Box,
  Button,
  InputLabel,
  SwipeableDrawer,
  Typography,
  styled,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { FC, ReactElement, useState } from "react";
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
        answer: data[index],
      };
    });
    console.log('handle finish quiz ', data, 'data')
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
          <Typography variant="h6" mb={2} sx={{ color: "primary.main" }}>{exhibit?.name}</Typography>
        <Box
          border={"1px dotted #67C8D1"}
          sx={{
            position: "relative",
            borderRadius: "10px",
            boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
          }}
          mx={1}
        >
          <Box sx={{ height: "80%" }}>
            <div style={{ marginTop: "2%" }}>
              <iframe src={exhibit?.videoURL} width="95%"></iframe>
            </div>
            <Box mx={2}>
              <Typography variant="body2" color={"black"} textAlign={"justify"}>
                {exhibit?.fullDescription || exhibit?.shortDescription}
              </Typography>
            </Box>
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
          </Box>
          <Box mt={4} mb={2} display={"flex"} justifyContent={"space-around"}>
            {state?.visited ? (
              <Button
                sx={{ color: "#67C8D1", border: "1px solid #67C8D1" }}
                variant="outlined"
                onClick={toggleDrawer(true)}
              >
                Play
              </Button>
            ) : (
              <Button
                sx={{ color: "#67C8D1", border: "1px solid #67C8D1" }}
                variant="outlined"
                onClick={() => openQrcode()}
              >
                Scan QR
              </Button>
            )}
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
